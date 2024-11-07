import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import OrdersNavigator from './OrdersNavigator';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../global/colors';
import Header from '../components/Header';
import ProfileNavigator from './ProfileNavigator';
import LocationNavigator from './LocationNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                header: () => (<Header />),
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen
                name="Tienda"
                component={ShopNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="shopping-bag" size={32} color={focused ? colors.cardColor : colors.principal} />)
                }}
            />
            <Tab.Screen
                name="Carrito"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" size={32} color={focused ? colors.cardColor : colors.principal} />)
                }}
            />
            <Tab.Screen
                name="Ordenes"
                component={OrdersNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="clipboard-list" size={32} color={focused ? colors.cardColor : colors.principal} />)
                }} />
            <Tab.Screen
                name="Perfil"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="user-circle" size={32} color={focused ? colors.cardColor : colors.principal} />)
                }} />
            <Tab.Screen
                name="Direcciones"
                component={LocationNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="search-location" size={32} color={focused ? colors.cardColor : colors.principal} />)
                }} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 80,
        paddingTop: 7
    }
})