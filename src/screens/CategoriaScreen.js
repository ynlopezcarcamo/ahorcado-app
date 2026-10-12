import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTema } from "../hooks/useTema";

const CATEGORIAS = [
  { id: "capitales", nombre: "Capitales", emoji: "🏙️" },
  { id: "animales", nombre: "Animales", emoji: "🐆" },
  { id: "frutas", nombre: "Frutas", emoji: "🥭" },
  { id: "comidas", nombre: "Comidas típicas", emoji: "🍲" },
];

const NIVELES = [
  { id: "facil", nombre: "Fácil", detalle: "4-6 letras · 2 pistas" },
  { id: "medio", nombre: "Medio", detalle: "7-9 letras · 1 pista" },
  { id: "dificil", nombre: "Difícil", detalle: "10+ letras · 90s" },
];

export default function CategoriaScreen({ route, navigation }) {
  const c = useTema();
  const [categoria, setCategoria] = useState("capitales");
  const [nivel, setNivel] = useState("facil");

  function handleJugar() {
    navigation.navigate("Juego", {
      categoria,
      nivel,
      nombre: route.params?.nombre,
    });
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: c.fondo }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: c.texto }]}>Elige tu categoría</Text>

      {CATEGORIAS.map((cat) => (
        <Pressable
          key={cat.id}
          style={[
            styles.card,
            { backgroundColor: c.fondoCard },
            categoria === cat.id && styles.cardActiva,
          ]}
          onPress={() => setCategoria(cat.id)}
        >
          <Text style={styles.cardEmoji}>{cat.emoji}</Text>
          <Text style={[styles.cardNombre, { color: c.texto }]}>
            {cat.nombre}
          </Text>
        </Pressable>
      ))}

      <Text style={[styles.title, { color: c.texto }]}>
        Nivel de dificultad
      </Text>

      {NIVELES.map((niv) => (
        <Pressable
          key={niv.id}
          style={[
            styles.card,
            { backgroundColor: c.fondoCard },
            nivel === niv.id && styles.cardActiva,
          ]}
          onPress={() => setNivel(niv.id)}
        >
          <Text style={[styles.cardNombre, { color: c.texto }]}>
            {niv.nombre}
          </Text>
          <Text style={[styles.cardDetalle, { color: c.textoSuave }]}>
            {niv.detalle}
          </Text>
        </Pressable>
      ))}

      <Pressable
        style={[styles.btnJugar, { backgroundColor: c.boton }]}
        onPress={handleJugar}
      >
        <Text style={[styles.btnJugarText, { color: c.botonTexto }]}>JUGAR</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 24, paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardActiva: {
    backgroundColor: "rgba(46,116,181,0.4)",
    borderColor: "#2E74B5",
  },
  cardEmoji: { fontSize: 28, marginRight: 12 },
  cardNombre: { fontSize: 18, fontWeight: "600" },
  cardDetalle: {
    fontSize: 13,
    marginLeft: "auto",
  },
  btnJugar: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  btnJugarText: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 2,
  },
});
