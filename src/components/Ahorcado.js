import { StyleSheet, Text, View } from "react-native";

export default function Ahorcado({ errores, color = "#FFFFFF" }) {
  const GROSOR = 4;

  return (
    <View style={styles.container}>
      <View style={styles.escena}>
        {/* Horca: siempre visible */}
        <View style={[styles.poste, { backgroundColor: color, width: GROSOR }]} />
        <View style={[styles.viga, { backgroundColor: color, height: GROSOR }]} />
        <View
          style={[
            styles.diagonal,
            { backgroundColor: color, height: GROSOR },
          ]}
        />
        <View
          style={[styles.cuerda, { backgroundColor: color, width: GROSOR }]}
        />

        {/* Muñeco: se agrega parte por parte */}
        {errores >= 1 && (
          <View
            style={[styles.cabeza, { borderColor: color, borderWidth: GROSOR }]}
          />
        )}
        {errores >= 2 && (
          <View
            style={[styles.torso, { backgroundColor: color, width: GROSOR }]}
          />
        )}
        {errores >= 3 && (
          <View
            style={[
              styles.brazoIzq,
              { backgroundColor: color, height: GROSOR },
            ]}
          />
        )}
        {errores >= 4 && (
          <View
            style={[
              styles.brazoDer,
              { backgroundColor: color, height: GROSOR },
            ]}
          />
        )}
        {errores >= 5 && (
          <View
            style={[
              styles.piernaIzq,
              { backgroundColor: color, height: GROSOR },
            ]}
          />
        )}
        {errores >= 6 && (
          <View
            style={[
              styles.piernaDer,
              { backgroundColor: color, height: GROSOR },
            ]}
          />
        )}
      </View>
      <Text style={[styles.errores, { color }]}>Errores: {errores}/6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 12,
  },
  escena: {
    width: 160,
    height: 170,
    position: "relative",
  },
  poste: {
    position: "absolute",
    left: 20,
    top: 10,
    height: 150,
    borderRadius: 2,
  },
  viga: {
    position: "absolute",
    left: 20,
    top: 10,
    width: 100,
    borderRadius: 2,
  },
  diagonal: {
    position: "absolute",
    left: 20,
    top: 10,
    width: 46,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
  },
  cuerda: {
    position: "absolute",
    left: 116,
    top: 10,
    height: 22,
    borderRadius: 2,
  },
  cabeza: {
    position: "absolute",
    left: 102,
    top: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  torso: {
    position: "absolute",
    left: 116,
    top: 64,
    height: 46,
    borderRadius: 2,
  },
  brazoIzq: {
    position: "absolute",
    left: 92,
    top: 74,
    width: 26,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
  },
  brazoDer: {
    position: "absolute",
    left: 118,
    top: 74,
    width: 26,
    borderRadius: 2,
    transform: [{ rotate: "-45deg" }],
  },
  piernaIzq: {
    position: "absolute",
    left: 96,
    top: 108,
    width: 26,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
  },
  piernaDer: {
    position: "absolute",
    left: 118,
    top: 108,
    width: 26,
    borderRadius: 2,
    transform: [{ rotate: "-45deg" }],
  },
  errores: {
    fontSize: 14,
    marginTop: 4,
  },
});
