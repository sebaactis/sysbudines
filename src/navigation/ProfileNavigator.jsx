import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Header from '../components/Header';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name="UserProfile" component={ProfileScreen}/>
    </Stack.Navigator>
  )
}

export default ProfileNavigator