import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import { useDispatch } from 'react-redux'
import { removeItem, addItem } from '../features/cart/cartSlice'

const CartCard = ({ item }) => {

    const dispatch = useDispatch();

    return (
        <View style={styles.cardItemContainer}>
            <View style={styles.cardHeaderContainer}>
                <View style={styles.cardHeaderTextGroup}>
                    <Text style={styles.cardHeaderTitle}>{item.nombre}</Text>
                    <Text style={styles.cardHeaderCategory}>{item.categoria}</Text>
                    <Text>Precio unitario: ${item.precio}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: item.image}}
                        style={styles.imageStyle}
                    />
                </View>
            </View>

            <View style={styles.cardBodyContainer}>
                <View>
                    <Text style={styles.cartBodySubText}>Subtotal: <Text style={styles.cardBodySubPrice}>${item.precio * item.quantity}</Text></Text>
                </View>
                <View style={styles.cardBodyCantidadContainer}>
                    <Pressable onPress={() => dispatch(removeItem(item))} style={styles.cantidadBtnD}>
                        <Text>-</Text>
                    </Pressable>
                    <Text>{item.quantity}</Text>
                    <Pressable onPress={() => dispatch(addItem({ ...item, quantity: 1 }))} style={styles.cantidadBtnI}>
                        <Text>+</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CartCard

const styles = StyleSheet.create({
    cardItemContainer: {
        marginTop: 20
    },
    imageContainer: {
        backgroundColor: colors.cardColor,
        alignItems: "center",
        borderRadius: 8,
    },
    imageStyle: {
        height: 100,
        width: 100,
    },
    cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardHeaderTextGroup: {
        gap: 2
    },
    cardHeaderTitle: {
        fontSize: 17,
        fontWeight: '800'
    },
    cardHeaderCategory: {
        color: "#00000086",
        fontSize: 14
    },
    cardBodyContainer: {
        flexDirection: 'row',
        marginTop: 17,
        justifyContent: 'space-between',
    },
    cardBodyCantidadContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    cantidadBtnD: {
        backgroundColor: "#46464620",
        paddingHorizontal: 11,
        paddingVertical: 3,
        borderRadius: 10
    },
    cantidadBtnI: {
        backgroundColor: "#46464620",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10
    },
    cartBodySubText: {
        fontSize: 17,
        fontVariant: 'italic',
        fontWeight: '300'
    },
    cardBodySubPrice: {
        fontWeight: '800',
        fontStyle: 'italic'
    }

})