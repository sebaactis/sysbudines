import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
};

const OrderCard = ({ order }) => {
    return (
        <View style={styles.orderCardContainer}>
            <View style={styles.orderDataCont}>
                <Text style={styles.orderNumber}>Order Number: <Text>{order.orderId.slice(0, 8).toUpperCase()}</Text></Text>
                <Text style={styles.orderDate}>Order Date: {new Date((order.date)).toLocaleString('es-Ar', dateOptions)}</Text>
                <Text style={styles.orderPrice}>Total: ${order.total}</Text>
            </View>
            <Pressable style={styles.orderBtn}>
                <Text style={styles.orderBtnText}>View details</Text>
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