import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import { usePostOrderMutation } from '../../services/orderService';
import { clearCart } from '../../features/cart/cartSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { showToast } from '../../utils/functions';
import EmptyCart from '../../components/cart/EmptyCart';
import CartItemList from '../../components/cart/CartItemList';

const CartScreen = ({ navigation }) => {
  const cart = useSelector(state => state.cartReducer.items)
  const total = useSelector(state => state.cartReducer.total)
  const user = useSelector(state => state.authReducer.email)
  const cartEmpty = cart.length <= 0

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

      {cartEmpty && <EmptyCart navigation={navigation} user={user} />}

      <CartItemList cart={cart} total={total} cartEmpty={cartEmpty} createOrder={handleCreateOrder} />
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
})