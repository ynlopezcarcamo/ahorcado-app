import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useTema } from "../hooks/useTema";
import {
  guardarConfiguracion,
  guardarEstadisticas,
  guardarRanking,
  leerConfiguracion,
} from "../storage/almacenamiento";

export default function ConfiguracionScreen() {
  const c = useTema();
  const [sonido, setSonido] = useState(true);
  const [vibracion, setVibracion] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(true);

  useEffect(() => {
    (async () => {
      const config = await leerConfiguracion();
      setSonido(config.sonido);
      setVibracion(config.vibracion);
      setTemaOscuro(config.tema === "oscuro");
    })();
  }, []);

  async function actualizar(cambios) {
    const nueva = {
      sonido,
      vibracion,
      tema: temaOscuro ? "oscuro" : "claro",
      ...cambios,
    };
    await guardarConfiguracion(nueva);
  }

  function cambiarSonido(valor) {
    setSonido(valor);
    actualizar({ sonido: valor });
  }

  function cambiarVibracion(valor) {
    setVibracion(valor);
    actualizar({ vibracion: valor });
  }

  function cambiarTema(valor) {
    setTemaOscuro(valor);
    actualizar({ tema: valor ? "oscuro" : "claro" });
  }

  function borrarDatos() {
    Alert.alert(
      "Borrar estadísticas",
      "¿Seguro que quieres borrar todas las estadísticas?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            await guardarEstadisticas({
              jugadas: 0,
              ganadas: 0,
              perdidas: 0,
              rachaActual: 0,
              mejorRacha: 0,
            });
            await guardarRanking([]);
            Alert.alert("Listo", "Las estadísticas se borraron.");
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: c.fondo }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: c.texto }]}>Configuración</Text>

      <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
        <View style={styles.fila}>
          <Text style={[styles.filaTexto, { color: c.texto }]}>🔊 Sonido</Text>
          <Switch value={sonido} onValueChange={cambiarSonido} />
        </View>
        <View style={styles.fila}>
          <Text style={[styles.filaTexto, { color: c.texto }]}>📳 Vibración</Text>
          <Switch value={vibracion} onValueChange={cambiarVibracion} />
        </View>
        <View style={styles.fila}>
          <Text style={[styles.filaTexto, { color: c.texto }]}>🌙 Tema oscuro</Text>
          <Switch value={temaOscuro} onValueChange={cambiarTema} />
        </View>
      </View>

      <Pressable
        style={[styles.btnBorrar, { backgroundColor: c.fallo }]}
        onPress={borrarDatos}
      >
        <Text style={styles.btnBorrarText}>🗑️ Borrar estadísticas</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 24, paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  filaTexto: { fontSize: 17, fontWeight: "600" },
  btnBorrar: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnBorrarText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
