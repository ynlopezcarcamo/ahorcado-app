import { Pressable, StyleSheet, Text, View } from 'react-native';

const FILAS = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
  ['Ñ', 'O', 'P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z'],
];

// Teclado A-Z + Ñ
export default function Teclado({ usadas, onLetra }) {
  return (
    <View style={styles.container}>
      {FILAS.map((fila, i) => (
        <View key={i} style={styles.fila}>
          {fila.map((letra) => {
            const usada = usadas.includes(letra);
            return (
              <Pressable
                key={letra}
                style={[styles.tecla, usada && styles.teclaUsada]}
                onPress={() => !usada && onLetra(letra)}
                disabled={usada}
              >
                <Text style={[styles.teclaTexto, usada && styles.teclaTextoUsada]}>
                  {letra}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  fila: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  tecla: {
    width: 40,
    height: 44,
    borderRadius: 6,
    backgroundColor: '#2E74B5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  teclaUsada: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  teclaTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  teclaTextoUsada: {
    color: 'rgba(255,255,255,0.4)',
  },
});
