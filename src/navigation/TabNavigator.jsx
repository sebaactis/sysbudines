import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import OrdersNavigator from './OrdersNavigator';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../global/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar
                }}
            >
                <Tab.Screen
                    name="Shop"
                    component={ShopNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (<Icon name="shopping-bag" size={32} color={focused ? colors.cardColor : colors.principal} />)
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" size={32} color={focused ? colors.cardColor : colors.principal} />)
                    }}
                />
                <Tab.Screen
                    name="Orders"
                    component={OrdersNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (<Icon name="clipboard-list" size={32} color={focused ? colors.cardColor : colors.principal} />)
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 80,
        paddingTop: 7
    }
})