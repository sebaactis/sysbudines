import { View, Text, Pressable, Image, StyleSheet, ScrollView } from 'react-native'
import { BackArrow } from '../../Icons';
import { colors } from '../../global/colors';
import PressableBack from '../../components/PressableBack';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';
import { useEffect, useState } from 'react';
import { useGetProductQuery } from '../../services/shopService';
import { ActivityIndicator } from 'react-native';
import { capitalizeLetter, showToast } from '../../utils/functions';
import { setUser } from '../../features/auth/authSlice';

const ProductScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const productId = useSelector(state => state.shopReducer.productId);
    const user = useSelector(state => state.authReducer.email);
    const { data: product, error, isLoading } = useGetProductQuery(productId);

    const handleAdd = (product) => {
        dispatch(addItem({ ...product, quantity: 1 }))
        showToast(
            'success',
            'Muy bien!',
            'El producto se ha agregado correctamente 👋',
            2000,
        );
    }

    return (
        <>
            {isLoading
                ? <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />
                :
                <ScrollView>

                    <PressableBack callback={() => navigation.goBack()} />
                    <View style={styles.productCont}>
                        <Text style={styles.productName}>{product.nombre}</Text>
                        <Text style={styles.productCategory}>{capitalizeLetter(product.categoria)}</Text>
                        <Text style={styles.productPrice}>${product.precio}</Text>
                        <View style={styles.productImageCont}>
                            <Image
                                source={{ uri: product.image }}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.productDescription}>{product.descripcionLarga}</Text>
                        {user === 'Invited' ?
                            <Pressable onPress={() => dispatch(setUser(""))} style={styles.carritoBtnNoLogin}><Text style={styles.carritoBtnTextNoLogin}>Debes loguearte para agregar productos al carrito</Text></Pressable>
                            :
                            <Pressable onPress={() => handleAdd(product)} style={styles.carritoBtn}><Text style={styles.carritoBtnText}>Agregar al carrito</Text></Pressable>}
                    </View>
                </ScrollView>}
        </>
    )
}

const styles = StyleSheet.create({
    productCont: {
        marginHorizontal: 18,
        marginVertical: 30
    },
    productCategory: {
        fontSize: 15,
        fontStyle: "italic"
    },
    productName: {
        fontSize: 22
    },
    productPrice: {
        fontSize: 22,
        fontStyle: "italic",
        marginTop: 10,
        marginBottom: 3
    },
    productImageCont: {
        backgroundColor: colors.cardColor,
        alignItems: "center",
        borderRadius: 8,
        height: 250
    },
    image: {
        width: 220,
        height: 220,
    },
    productDescription: {
        marginVertical: 10,
        lineHeight: 20,
        marginHorizontal: 4
    },
    carritoBtn: {
        justifyContent: "center",
        backgroundColor: "red",
        paddingVertical: 16,
        borderRadius: 30,
        backgroundColor: "#e2be8b",
        marginBottom: 6
    },
    carritoBtnText: {
        fontSize: 23,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    carritoBtnTextNoLogin: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    carritoBtnNoLogin: {
        justifyContent: "center",
        backgroundColor: "red",
        paddingVertical: 16,
        borderRadius: 20,
        backgroundColor: colors.cardColor,
        marginBottom: 6
    },
    spinner: {
        margin: "auto"
    }
})

export default ProductScreen