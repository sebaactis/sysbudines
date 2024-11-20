import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/auth/authSlice';
import { colors } from '../../global/colors';

const EmptyCart = ({ navigation, user }) => {

    const shoppingImage = require('../../../assets/shoppingImage.jpeg')
    const dispatch = useDispatch();

    return (
        <View style={styles.emptyCardContainer}>
            <Image style={styles.shoppingImage} source={shoppingImage} resizeMode='contain' />
            <Text style={styles.cartEmptyTextTitle}>Tu carrito está vacio</Text>
            <Text style={styles.cartEmptyTextSubTitle}>Descubrí nuestros productos</Text>
            <Pressable onPress={() => navigation.navigate("Tienda")} style={styles.cardEmptyBtn}>
                <Text style={styles.cardEmptyBtnText}>Ver Productos</Text>
            </Pressable>

            {user === 'Invited' && <Pressable onPress={() => dispatch(setUser(""))} style={styles.cardEmptyBtn}>
                <Text style={styles.cardEmptyBtnText}>Iniciar sesion para comprar</Text>
            </Pressable>}
        </View>
    )
}

export default EmptyCart

const styles = StyleSheet.create({
    emptyCardContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 13,
        marginTop: 30
      },
      shoppingImage: {
        width: 400,
        height: 240,
        borderRadius: 22
      },
      cartEmptyTextTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      cartEmptyTextSubTitle: {
        fontStyle: 'italic'
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
      },
})