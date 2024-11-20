import { StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import CartCard from '../CartCard'
import { colors } from '../../global/colors'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../features/cart/cartSlice'

const CartItemList = ({ cart, total, cartEmpty, createOrder }) => {

    const dispatch = useDispatch();

    return (
        <ScrollView style={styles.cartTotalCheckContainer}>
            {cart.map(cartItem => (
                <CartCard key={cartItem.id} item={cartItem} />
            ))}
            {cartEmpty ? null : <Text style={styles.cartTotalPrice}>Total: ${total}</Text>}
            {cartEmpty ? null : <Pressable style={styles.cartFinalizarBtn}>
                <Text onPress={createOrder} style={styles.cartFinalizarBtnText}>Finalizar Compra</Text>
            </Pressable>}
            {cartEmpty ? null : <Pressable style={styles.cartGoEmptyBtn}>
                <Text onPress={() => dispatch(clearCart())} style={styles.cartFinalizarBtnText}>Vaciar carrito</Text>
            </Pressable>}
        </ScrollView>
    )
}

export default CartItemList

const styles = StyleSheet.create({
    cartTotalCheckContainer: {
        marginBottom: 70
    },
    cartTotalPrice: {
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 18
    },
    cartFinalizarBtn: {
        backgroundColor: colors.principal,
        padding: 14,
        borderRadius: 15
    },
    cartFinalizarBtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cartGoEmptyBtn: {
        backgroundColor: colors.cardColor,
        padding: 14,
        borderRadius: 15,
        marginTop: 15
    }
})