import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from '../screens/InicioScreen';
import InstruccionesScreen from '../screens/InstruccionesScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import JuegoScreen from '../screens/JuegoScreen';
import EstadisticasScreen from '../screens/EstadisticasScreen';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Instrucciones" component={InstruccionesScreen} />
      <Stack.Screen name="Categoria" component={CategoriaScreen} />
      <Stack.Screen name="Juego" component={JuegoScreen} />
      <Stack.Screen name="Estadisticas" component={EstadisticasScreen} />
      <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
    </Stack.Navigator>
  );
}
