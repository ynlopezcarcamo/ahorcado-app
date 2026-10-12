import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_STATS = '@ahorcado_stats';
const CLAVE_RANKING = '@ahorcado_ranking';
const CLAVE_CONFIG = '@ahorcado_config';

// Lee datos de AsyncStorage con try/catch
export async function leerDatos(clave, porDefecto) {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor ? JSON.parse(valor) : porDefecto;
  } catch (error) {
    console.log('Error al leer', clave, error);
    return porDefecto;
  }
}

// Guarda datos en AsyncStorage con try/catch
export async function guardarDatos(clave, datos) {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(datos));
  } catch (error) {
    console.log('Error al guardar', clave, error);
  }
}

// Funciones específicas
export const leerEstadisticas = () =>
  leerDatos(CLAVE_STATS, { jugadas: 0, ganadas: 0, perdidas: 0, rachaActual: 0, mejorRacha: 0 });

export const guardarEstadisticas = (stats) => guardarDatos(CLAVE_STATS, stats);

export const leerRanking = () => leerDatos(CLAVE_RANKING, []);

export const guardarRanking = (ranking) => guardarDatos(CLAVE_RANKING, ranking);

export const leerConfiguracion = () =>
  leerDatos(CLAVE_CONFIG, { sonido: true, vibracion: true, tema: 'oscuro' });

export const guardarConfiguracion = (config) => guardarDatos(CLAVE_CONFIG, config);
