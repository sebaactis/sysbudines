import { ActivityIndicator, Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useGetOrderQuery } from '../../services/orderService';
import { dateOptions } from '../../global/constants';
import { colors } from '../../global/colors';
import { FlatList } from 'react-native';
import PressableBack from '../../components/PressableBack';

const OrderScreen = ({ route, navigation }) => {

    const { orderId } = route.params;
    const { data: order, error, isLoading, refetch } = useGetOrderQuery(orderId);

    const renderCartItem = ({ item }) => {
        return (
            <View style={styles.cartItemCont}>
                <View style={styles.cartItemImageCont}>
                    <Image source={{ uri: item.image }} style={styles.imageStyle} resizeMethod='contain' />
                    <View style={styles.cartItemImageContTexts}>
                        <Text style={styles.cartItemTitle}>{item.nombre}</Text>
                        <Text style={styles.cartItemSubItem}>{item.descripcionCorta}</Text>
                        <Text style={styles.cartItemSubItem}>Cantidad: {item.quantity}</Text>
                    </View>
                </View>
                <Text style={styles.cartItemPrecio}>${item.precio}</Text>
            </View>
        )
    }

    return (
        <>
            <PressableBack callback={() => navigation.goBack()} />
            {isLoading
                ? <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />
                : <View style={styles.orderCont}>

                    <Text style={styles.orderTitle}>Detalle de orden</Text>
                    <View style={styles.detailsOrderCont}>
                        <View style={styles.detailsOrderSubCont}>
                            <Text style={styles.detailsOrderTitle}>Orden ID</Text>
                            <Text style={styles.detailsOrderItem}>{order.orderId.slice(0, 8).toUpperCase()}</Text>
                        </View>
                        <View style={styles.detailsOrderSubCont}>
                            <Text style={styles.detailsOrderTitle}>Fecha</Text>
                            <Text style={styles.detailsOrderItem}>{new Date((order.date)).toLocaleString('es-Ar', dateOptions)}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsOrderContNoBod}>
                        <View style={styles.detailsOrderSubCont}>
                            <Text style={styles.detailsOrderTitle}>Items</Text>
                            <Text style={styles.detailsOrderItem}>{order.cart.length}</Text>
                        </View>
                        <View style={styles.detailsOrderSubCont}>
                            <Text style={styles.detailsOrderTitle}>Total</Text>
                            <Text style={styles.detailsOrderItem}>${order.total}</Text>
                        </View>
                    </View>

                    <View>
                        <FlatList
                            data={order.cart}
                            keyExtractor={item => item.id}
                            renderItem={renderCartItem}
                        />
                    </View>
                </View>}
        </>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    orderCont: {
        marginHorizontal: 30,
        gap: 15,
        marginBottom: 20
    },
    orderTitle: {
        textAlign: 'center',
        marginTop: 14,
        marginBottom: 15,
        fontWeight: '800',
        fontSize: 20
    },
    detailsOrderCont: {
        flexDirection: 'row',
        gap: 100,
        borderBottomWidth: 0.8,
        borderTopWidth: 0.8,
        paddingVertical: 20,
        borderBottomColor: "#00000031",
        borderTopColor: "#00000031"
    },
    detailsOrderContNoBod: {
        flexDirection: 'row',
        gap: 134,
        marginBottom: 5
    },
    detailsOrderTitle: {
        opacity: 0.5,
        fontSize: 16
    },
    detailsOrderItem: {
        fontStyle: 'italic',
        fontSize: 16
    },
    imageStyle: {
        height: 90,
        width: 90,
        marginLeft: -10
    },
    cartItemImageCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    cartItemCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cartItemPrecio: {
        marginTop: 21,
        fontStyle: 'italic',
        fontSize: 16
    },
    cartItemImageContTexts: {
        gap: 5
    },
    cartItemTitle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    cartItemSubItem: {
        fontSize: 14,
        opacity: 0.5
    }
})