import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/cart/CartScreen';

const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
        <Stack.Screen name='CartS' component={CartScreen} />
    </Stack.Navigator>
  )
}

export default CartNavigator

const styles = StyleSheet.create({})