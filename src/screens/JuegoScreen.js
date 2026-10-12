import { useEffect, useState } from "react";
import { Alert, BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import Ahorcado from "../components/Ahorcado";
import PalabraOculta from "../components/PalabraOculta";
import Teclado from "../components/Teclado";
import { PALABRAS } from "../data/palabras";
import { reproducir } from "../lib/sonidos";
import { useTema } from "../hooks/useTema";
import {
  guardarEstadisticas,
  guardarRanking,
  leerConfiguracion,
  leerEstadisticas,
  leerRanking,
} from "../storage/almacenamiento";

const MAX_ERRORES = 6;
const MULTIPLICADOR = { facil: 1, medio: 2, dificil: 3 };
const PISTAS_POR_NIVEL = { facil: 2, medio: 1, dificil: 0 };
const TIEMPO_DIFICIL = 90;

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function elegirPalabra(categoria, nivel) {
  const porNivel = PALABRAS.filter(
    (p) => p.categoria === categoria && p.nivel === nivel,
  );
  const porCategoria = PALABRAS.filter((p) => p.categoria === categoria);
  const lista =
    porNivel.length > 0
      ? porNivel
      : porCategoria.length > 0
        ? porCategoria
        : PALABRAS;
  return lista[Math.floor(Math.random() * lista.length)];
}

export default function JuegoScreen({ route, navigation }) {
  const c = useTema();
  const { categoria, nivel, nombre = "Jugador" } = route.params;

  const [palabraObj] = useState(() => elegirPalabra(categoria, nivel));
  const palabra = palabraObj?.palabra ?? "COLOMBIA";

  const [letrasAcertadas, setLetrasAcertadas] = useState([]);
  const [letrasFalladas, setLetrasFalladas] = useState([]);
  const [errores, setErrores] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [pistasUsadas, setPistasUsadas] = useState(0);
  const [tiempo, setTiempo] = useState(
    nivel === "dificil" ? TIEMPO_DIFICIL : null,
  );
  const [terminado, setTerminado] = useState(false);
  const [sonidoActivo, setSonidoActivo] = useState(true);
  const [vibracionActiva, setVibracionActiva] = useState(true);

  const palabraNormalizada = normalizar(palabra);
  const letrasUsadas = [...letrasAcertadas, ...letrasFalladas];
  const pistasDisponibles = PISTAS_POR_NIVEL[nivel] - pistasUsadas;

  const palabraCompleta = palabraNormalizada
    .split("")
    .every((letra) => letra === " " || letrasAcertadas.includes(letra));

  useEffect(() => {
    (async () => {
      const config = await leerConfiguracion();
      setSonidoActivo(config.sonido);
      setVibracionActiva(config.vibracion);
    })();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (terminado) return false;
      Alert.alert(
        "Salir de la partida",
        "¿Seguro que quieres salir? Se perderá el progreso.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Salir",
            style: "destructive",
            onPress: () => navigation.navigate("Inicio"),
          },
        ],
      );
      return true;
    });

    return () => backHandler.remove();
  }, [terminado, navigation]);

  function sonar(tipo) {
    if (sonidoActivo) reproducir(tipo);
  }

  function vibrar(tipo) {
    if (!vibracionActiva) return;
    if (tipo === "acierto") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (tipo === "error") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else if (tipo === "ganado") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }

  useEffect(() => {
    if (nivel !== "dificil" || tiempo === null || terminado) return;
    if (tiempo <= 0) {
      terminar("perdido");
      return;
    }
    const id = setTimeout(() => setTiempo((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [tiempo, nivel, terminado]);

  async function guardarPartida(resultado, total) {
    const stats = await leerEstadisticas();
    const nuevasStats = {
      ...stats,
      jugadas: stats.jugadas + 1,
      ganadas: resultado === "ganado" ? stats.ganadas + 1 : stats.ganadas,
      perdidas: resultado === "perdido" ? stats.perdidas + 1 : stats.perdidas,
      rachaActual: resultado === "ganado" ? stats.rachaActual + 1 : 0,
      mejorRacha: Math.max(
        stats.mejorRacha,
        resultado === "ganado" ? stats.rachaActual + 1 : stats.rachaActual,
      ),
    };
    await guardarEstadisticas(nuevasStats);

    if (resultado === "ganado") {
      const ranking = await leerRanking();
      const nuevoRanking = [
        ...ranking,
        {
          nombre,
          puntaje: total,
          categoria,
          nivel,
          fecha: new Date().toISOString(),
        },
      ]
        .sort((a, b) => b.puntaje - a.puntaje)
        .slice(0, 10);
      await guardarRanking(nuevoRanking);
    }
  }

  function terminar(resultado) {
    if (terminado) return;
    setTerminado(true);

    let total = puntaje;
    let mensaje = `La palabra era: ${palabra}`;

    if (resultado === "ganado") {
      const bonusVidas = (MAX_ERRORES - errores) * 10;
      const subtotal = puntaje + 50 + bonusVidas;
      total = subtotal * MULTIPLICADOR[nivel];
      mensaje = `¡Ganaste! +${total} puntos\nLa palabra era: ${palabra}`;
      sonar("victoria");
      vibrar("ganado");
    } else {
      mensaje = `¡Perdiste! Puntaje: ${puntaje}\nLa palabra era: ${palabra}`;
      sonar("derrota");
      vibrar("perdido");
    }

    guardarPartida(resultado, total);

    Alert.alert(
      resultado === "ganado" ? "¡Ganaste! 🎉" : "¡Perdiste!",
      mensaje,
      [
        { text: "Menú", onPress: () => navigation.navigate("Inicio") },
        {
          text: "Jugar de nuevo",
          onPress: () =>
            navigation.replace("Juego", { categoria, nivel, nombre }),
        },
      ],
    );
  }

  function procesarLetra(letra) {
    if (terminado) return;
    if (palabraNormalizada.includes(letra)) {
      const apariciones = palabraNormalizada
        .split("")
        .filter((l) => l === letra).length;
      setLetrasAcertadas((prev) => [...prev, letra]);
      setPuntaje((p) => p + 10 * apariciones);
      sonar("acierto");
      vibrar("acierto");
    } else {
      const nuevosErrores = errores + 1;
      setLetrasFalladas((prev) => [...prev, letra]);
      setErrores(nuevosErrores);
      setPuntaje((p) => p - 5);
      sonar("error");
      vibrar("error");
      if (nuevosErrores >= MAX_ERRORES) {
        terminar("perdido");
      }
    }
  }

  function usarPista() {
    if (pistasDisponibles <= 0 || terminado) return;
    setPistasUsadas((p) => p + 1);
    setPuntaje((p) => p - 15);
    const faltantes = palabraNormalizada
      .split("")
      .filter((l) => l !== " " && !letrasAcertadas.includes(l));
    if (faltantes.length > 0) {
      const letra = faltantes[Math.floor(Math.random() * faltantes.length)];
      setLetrasAcertadas((prev) => [...prev, letra]);
    }
  }

  useEffect(() => {
    if (palabraCompleta && !terminado) {
      terminar("ganado");
    }
  }, [palabraCompleta, terminado]);

  return (
    <View style={[styles.container, { backgroundColor: c.fondo }]}>
      <View style={styles.marcador}>
        <Text style={[styles.marcadorTexto, { color: c.texto }]}>
          Puntaje: {puntaje}
        </Text>
        {tiempo !== null && (
          <Text style={[styles.marcadorTexto, { color: c.texto }]}>
            ⏱ {tiempo}s
          </Text>
        )}
        <Text style={[styles.marcadorTexto, { color: c.texto }]}>
          Pistas: {pistasDisponibles}
        </Text>
      </View>

      <Ahorcado errores={errores} color={c.texto} />

      <PalabraOculta
        palabra={palabra}
        letrasAcertadas={letrasAcertadas}
        color={c.texto}
      />

      <Text style={[styles.pista, { color: c.textoSuave }]}>
        {palabraObj?.pista}
      </Text>

      {pistasDisponibles > 0 && (
        <Pressable
          style={[styles.btnPista, { backgroundColor: c.fondoCard }]}
          onPress={usarPista}
        >
          <Text style={[styles.btnPistaText, { color: c.texto }]}>
            💡 Usar pista (-15)
          </Text>
        </Pressable>
      )}

      <Teclado
        usadas={letrasUsadas}
        onLetra={procesarLetra}
        colorBoton={c.boton}
        colorTexto={c.botonTexto}
        colorUsada={c.fondoCard}
      />

      <Pressable
        style={[styles.btnSalir, { backgroundColor: c.fondoCard }]}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text style={[styles.btnSalirText, { color: c.texto }]}>Salir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
  },
  marcador: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  marcadorTexto: { fontSize: 15, fontWeight: "700" },
  pista: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 8,
  },
  btnPista: {
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  btnPistaText: { fontSize: 14, fontWeight: "600" },
  btnSalir: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  btnSalirText: { fontSize: 16, fontWeight: "600" },
});
