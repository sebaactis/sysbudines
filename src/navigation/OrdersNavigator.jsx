import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/cart/CartScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import OrderScreen from '../screens/orders/OrderScreen';

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='OrdersDetails' component={OrdersScreen} />
      <Stack.Screen name='Order' component={OrderScreen} />
    </Stack.Navigator>
  )
}

export default OrdersNavigator

const styles = StyleSheet.create({})