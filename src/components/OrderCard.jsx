import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { dateOptions } from '../global/constants'



const OrderCard = ({ order, navigation }) => {

    return (
        <View style={styles.orderCardContainer}>
            <View style={styles.orderDataCont}>
                <Text style={styles.orderNumber}>Nro de órden: <Text>{order.orderId.slice(0, 8).toUpperCase()}</Text></Text>
                <Text style={styles.orderDate}>Fecha de órden: {new Date((order.date)).toLocaleString('es-Ar', dateOptions)}</Text>
                <Text style={styles.orderPrice}>Total: ${order.total}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate("Order", { orderId: order.orderId })} style={styles.orderBtn}>
                <Text style={styles.orderBtnText}>Ver detalles</Text>
            </Pressable>
        </View>
    )
}

export default OrderCard

const styles = StyleSheet.create({
    orderCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    orderDataCont: {
        gap: 3
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: '800'
    },
    orderDate: {
        color: '#595959d5',
        fontSize: 14,
    },
    orderPrice: {
        color: '#595959d5',
        fontSize: 14,
    },
    orderBtn: {
        backgroundColor: "#a7a7a749",
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 12
    },
    orderBtnText: {
        fontWeight: 'bold'
    }
})