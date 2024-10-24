import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import CategoryScreen from '../screens/shop/CategoryScreen';
import ProductScreen from '../screens/shop/ProductScreen';
import ProductsScreen from '../screens/shop/ProductsScreen';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Categorias'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Categorias' component={CategoryScreen} />
      <Stack.Screen name='Productos' component={ProductsScreen} />
      <Stack.Screen name='Producto' component={ProductScreen} />
    </Stack.Navigator>
  )
}

export default ShopNavigator