import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTema } from "../hooks/useTema";

export default function InstruccionesScreen() {
  const c = useTema();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: c.fondo }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: c.texto }]}>Instrucciones</Text>

      <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
        <Text style={[styles.cardTitle, { color: c.texto }]}>🎯 Objetivo</Text>
        <Text style={[styles.cardText, { color: c.textoSuave }]}>
          Adivina la palabra oculta letra por letra antes de que se complete el
          ahorcado.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
        <Text style={[styles.cardTitle, { color: c.texto }]}>🕹️ Cómo jugar</Text>
        <Text style={[styles.cardText, { color: c.textoSuave }]}>
          • Toca las letras del teclado para adivinar.{"\n"}
          • Cada acierto revela la letra en su posición.{"\n"}
          • Cada fallo agrega una parte del muñeco.{"\n"}
          • Si cometes 6 errores, pierdes.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
        <Text style={[styles.cardTitle, { color: c.texto }]}>📊 Niveles</Text>
        <Text style={[styles.cardText, { color: c.textoSuave }]}>
          • Fácil: 4-6 letras, 2 pistas, sin tiempo.{"\n"}
          • Medio: 7-9 letras, 1 pista, sin tiempo.{"\n"}
          • Difícil: 10+ letras, sin pistas, 90 segundos.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: c.fondoCard }]}>
        <Text style={[styles.cardTitle, { color: c.texto }]}>🏆 Puntuación</Text>
        <Text style={[styles.cardText, { color: c.textoSuave }]}>
          • Letra correcta: +10 por aparición.{"\n"}
          • Letra incorrecta: -5.{"\n"}
          • Usar pista: -15.{"\n"}
          • Ganar: +50 + (vidas × 10).{"\n"}
          • Total × multiplicador del nivel.
        </Text>
      </View>
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
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  cardText: { fontSize: 15, lineHeight: 22 },
});
