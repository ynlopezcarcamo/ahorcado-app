import { StyleSheet, Text, View } from "react-native";

export default function PalabraOculta({
  palabra,
  letrasAcertadas,
  color = "#FFFFFF",
}) {
  return (
    <View style={styles.container}>
      {palabra.split("").map((letra, i) => {
        const esEspacio = letra === " ";
        const esAcierto = letrasAcertadas.includes(letra);
        return (
          <View
            key={i}
            style={[styles.casilla, { borderBottomColor: color }]}
          >
            <Text style={[styles.letra, { color }]}>
              {esEspacio ? " " : esAcierto ? letra : "_"}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 16,
  },
  casilla: {
    width: 32,
    height: 44,
    margin: 3,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  letra: {
    fontSize: 28,
    fontWeight: "700",
  },
});
