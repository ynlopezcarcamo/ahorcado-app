import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTema } from "../hooks/useTema";
import { leerEstadisticas, leerRanking } from "../storage/almacenamiento";

export default function EstadisticasScreen() {
  const c = useTema();
  const [stats, setStats] = useState({
    jugadas: 0,
    ganadas: 0,
    perdidas: 0,
    mejorRacha: 0,
  });
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    (async () => {
      const s = await leerEstadisticas();
      const r = await leerRanking();
      setStats(s);
      setRanking(r);
    })();
  }, []);

  const porcentaje =
    stats.jugadas > 0 ? Math.round((stats.ganadas / stats.jugadas) * 100) : 0;

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: c.fondo }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: c.texto }]}>Estadísticas</Text>

      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
          <Text style={[styles.cardNumero, { color: c.texto }]}>
            {stats.jugadas}
          </Text>
          <Text style={[styles.cardLabel, { color: c.textoSuave }]}>
            Partidas
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
          <Text style={[styles.cardNumero, { color: c.texto }]}>
            {stats.ganadas}
          </Text>
          <Text style={[styles.cardLabel, { color: c.textoSuave }]}>
            Ganadas
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
          <Text style={[styles.cardNumero, { color: c.texto }]}>
            {stats.perdidas}
          </Text>
          <Text style={[styles.cardLabel, { color: c.textoSuave }]}>
            Perdidas
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
          <Text style={[styles.cardNumero, { color: c.texto }]}>
            {porcentaje}%
          </Text>
          <Text style={[styles.cardLabel, { color: c.textoSuave }]}>
            Victorias
          </Text>
        </View>
      </View>

      <Text style={[styles.subtitle, { color: c.texto }]}>
        Mejor racha: {stats.mejorRacha}
      </Text>

      <Text style={[styles.subtitle, { color: c.texto }]}>
        Top 10 de puntajes
      </Text>

      {ranking.length === 0 ? (
        <Text style={[styles.vacio, { color: c.textoSuave }]}>
          Aún no hay puntajes guardados.
        </Text>
      ) : (
        ranking.map((item, i) => (
          <View
            key={i}
            style={[styles.fila, { backgroundColor: c.fondoCard }]}
          >
            <Text style={[styles.filaPos, { color: c.texto }]}>{i + 1}.</Text>
            <Text style={[styles.filaNombre, { color: c.texto }]}>
              {item.nombre} · {item.categoria}
            </Text>
            <Text style={[styles.filaPuntaje, { color: c.acierto }]}>
              {item.puntaje}
            </Text>
          </View>
        ))
      )}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  cardNumero: { fontSize: 32, fontWeight: "800" },
  cardLabel: { fontSize: 14, marginTop: 4 },
  subtitle: { fontSize: 18, fontWeight: "700", marginTop: 12, marginBottom: 8 },
  vacio: { fontSize: 14, fontStyle: "italic" },
  fila: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },
  filaPos: { fontSize: 16, fontWeight: "700", width: 28 },
  filaNombre: { fontSize: 16, flex: 1 },
  filaPuntaje: { fontSize: 16, fontWeight: "700" },
});
