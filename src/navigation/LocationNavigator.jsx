import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LocationScreen from '../screens/location/LocationScreen';

const Stack = createNativeStackNavigator();

const LocationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='LocationS' component={LocationScreen} />
    </Stack.Navigator>
  )
}

export default LocationNavigator

const styles = StyleSheet.create({})