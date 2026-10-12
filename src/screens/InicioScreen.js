import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTema } from "../hooks/useTema";

export default function InicioScreen({ navigation }) {
  const c = useTema();
  const [nombre, setNombre] = useState("");

  function handleJugar() {
    if (!nombre.trim()) {
      alert("Escribe tu nombre para jugar");
      return;
    }
    navigation.navigate("Categoria", { nombre });
  }

  return (
    <View style={[styles.container, { backgroundColor: c.fondo }]}>
      <Text style={[styles.title, { color: c.texto }]}>AHORCADO COLOMBIA</Text>
      <Text style={[styles.subtitle, { color: c.textoSuave }]}>
        Descubre la palabra oculta antes de que se complete el ahorcado
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: c.input, color: c.inputTexto }]}
        placeholder="Escribe tu nombre..."
        placeholderTextColor={c.textoSuave}
        value={nombre}
        onChangeText={setNombre}
      />

      <Pressable
        style={[styles.btnJugar, { backgroundColor: c.boton }]}
        onPress={handleJugar}
      >
        <Text style={[styles.btnJugarText, { color: c.botonTexto }]}>JUGAR</Text>
      </Pressable>

      <Pressable
        style={[styles.btnSecundario, { backgroundColor: c.fondoCard }]}
        onPress={() => navigation.navigate("Instrucciones")}
      >
        <Text style={[styles.btnSecundarioText, { color: c.texto }]}>
          📖 Instrucciones
        </Text>
      </Pressable>

      <Pressable
        style={[styles.btnSecundario, { backgroundColor: c.fondoCard }]}
        onPress={() => navigation.navigate("Estadisticas")}
      >
        <Text style={[styles.btnSecundarioText, { color: c.texto }]}>
          📊 Estadísticas
        </Text>
      </Pressable>

      <Pressable
        style={[styles.btnSecundario, { backgroundColor: c.fondoCard }]}
        onPress={() => navigation.navigate("Configuracion")}
      >
        <Text style={[styles.btnSecundarioText, { color: c.texto }]}>
          ⚙️ Configuración
        </Text>
      </Pressable>

      <Text style={[styles.pie, { color: c.textoSuave }]}>
        Realizado por Yineth Natalia López Cárcamo · {new Date().getFullYear()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  btnJugar: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  btnJugarText: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 2,
  },
  btnSecundario: {
    width: "80%",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  btnSecundarioText: {
    fontSize: 16,
    fontWeight: "600",
  },
  pie: {
    marginTop: 24,
    fontSize: 12,
    textAlign: "center",
  },
});
