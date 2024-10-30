import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import CartCard from '../../components/CartCard';
import { colors } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { usePostOrderMutation } from '../../services/orderService';
import { clearCart } from '../../features/cart/cartSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const CartScreen = ({ navigation }) => {

  const [triggerPost, result] = usePostOrderMutation();
  const cart = useSelector(state => state.cartReducer.items)
  const cartLength = cart.length <= 0
  const total = useSelector(state => state.cartReducer.total)
  const user = useSelector(state => state.authReducer.email)
  const dispatch = useDispatch();

  const handleCreateOrder = () => {
    triggerPost(
      {
        orderId: uuidv4(),
        cart,
        total,
        date: new Date(),
        user
      }
    )

    dispatch(clearCart())
  }


  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Tu carrito</Text>
      {cartLength
        &&
        <View style={styles.emptyCardContainer}>
          <Icon name="cart-remove" size={50} />
          <Text style={styles.cartEmptyText}>Tu carrito se encuentra vacio</Text>
        </View>
      }
      <View style={styles.cartItemsContainer}>
        {cart.map(cartItem => (
          <CartCard key={cartItem.id} item={cartItem} />
        ))}
      </View>
      {cartLength ? null : <Text style={styles.cartTotalPrice}>Total: ${total}</Text>}
      {cartLength ? null : <Pressable style={styles.cartFinalizarBtn}>
        <Text onPress={() => handleCreateOrder()} style={styles.cartFinalizarBtnText}>Finalizar Compra</Text>
      </Pressable>}
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    marginHorizontal: 14
  },
  cartTitle: {
    textAlign: 'center',
    marginVertical: 13,
    fontSize: 18
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
  emptyCardContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 30
  },
  cartEmptyText: {
    fontSize: 22,
    fontWeight: "bold"
  }
})