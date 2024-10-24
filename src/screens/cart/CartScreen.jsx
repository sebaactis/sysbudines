import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import CartCard from '../../components/CartCard';
import { colors } from '../../global/colors';
import { useSelector } from 'react-redux';

const CartScreen = () => {

  const cart = useSelector(state => state.cartReducer.items)
  const total = useSelector(state => state.cartReducer.total)

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Tu carrito</Text>

      <View style={styles.cartItemsContainer}>
        {cart.map(cartItem => (
          <CartCard key={cartItem.id} item={cartItem} />
        ))}
      </View>
      <Text style={styles.cartTotalPrice}>Total: ${total}</Text>
      <Pressable style={styles.cartFinalizarBtn}>
        <Text style={styles.cartFinalizarBtnText}>Finalizar Compra</Text>
      </Pressable>
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
  }
})