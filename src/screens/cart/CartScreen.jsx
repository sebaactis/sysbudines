import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useMemo } from 'react'
import CartCard from '../../components/CartCard';
import { colors } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import { usePostOrderMutation } from '../../services/orderService';
import { clearCart } from '../../features/cart/cartSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { showToast } from '../../utils/functions';

const CartScreen = ({ navigation }) => {
  const cart = useSelector(state => state.cartReducer.items)
  const total = useSelector(state => state.cartReducer.total)
  const user = useSelector(state => state.authReducer.email)

  const cartEmpty = cart.length <= 0
  const shoppingImage = require('../../../assets/shoppingImage.jpeg')

  const dispatch = useDispatch();
  const [triggerPost, result] = usePostOrderMutation();

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
    showToast('success', 'Compra Finalizada! 🌟', 'Podes ver tu orden en la sección "ordenes"', 3500)
    dispatch(clearCart())
  }

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Tu carrito</Text>
      {cartEmpty
        &&
        <View style={styles.emptyCardContainer}>
          <Image style={styles.shoppingImage} source={shoppingImage} resizeMode='contain' />
          <Text style={styles.cartEmptyTextTitle}>Tu carrito está vacio</Text>
          <Text style={styles.cartEmptyTextSubTitle}>Descubrí nuestros productos</Text>
          <Pressable onPress={() => navigation.navigate("Tienda")} style={styles.cardEmptyBtn}>
            <Text style={styles.cardEmptyBtnText}>Ver Productos</Text>
          </Pressable>
        </View>
      }
      <View style={styles.cartItemsContainer}>
        {cart.map(cartItem => (
          <CartCard key={cartItem.id} item={cartItem} />
        ))}
      </View>
      {cartEmpty ? null : <Text style={styles.cartTotalPrice}>Total: ${total}</Text>}
      {cartEmpty ? null : <Pressable style={styles.cartFinalizarBtn}>
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
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
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
    gap: 13,
    marginTop: 30
  },
  cartEmptyTextTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cartEmptyTextSubTitle: {
    fontStyle: 'italic'
  },
  shoppingImage: {
    width: 400,
    height: 240,
    borderRadius: 22
  },
  cardEmptyBtn: {
    backgroundColor: colors.cardColor,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 15,
    marginTop: 12
  },
  cardEmptyBtnText: {
    fontWeight: 'bold',
  }
})