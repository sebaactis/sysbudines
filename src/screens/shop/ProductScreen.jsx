import { View, Text, Pressable, Image, StyleSheet, ScrollView } from 'react-native'
import { BackArrow, HeartFavorite } from '../../Icons';
import { colors } from '../../global/colors';
import PressableBack from '../../components/PressableBack';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';
import { useEffect, useState } from 'react';
import { useGetProductQuery } from '../../services/shopService';
import { ActivityIndicator } from 'react-native';
import { showToast } from '../../utils/functions';

const ProductScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const productId = useSelector(state => state.shopReducer.productId);
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
                        <Text style={styles.productCategory}>{product.categoria}</Text>
                        <Text style={styles.productPrice}>${product.precio}</Text>
                        <View style={styles.productImageCont}>
                            <Image
                                source={{ uri: product.image }}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.productDescription}>{product.descripcionLarga}</Text>
                        <Pressable onPress={() => handleAdd(product)} style={styles.carritoBtn}><Text style={styles.carritoBtnText}>Agregar al carrito</Text></Pressable>
                        <Pressable style={styles.favoritoBtn}>
                            <HeartFavorite />
                            <Text style={styles.favoritoBtnText}>Favorito</Text>
                        </Pressable>
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
    favoritoBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        paddingVertical: 16,
        borderRadius: 30,
        backgroundColor: "#005e804f",
        gap: 8
    },
    favoritoBtnText: {
        fontSize: 23,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    spinner: {
        margin: "auto"
    }
})

export default ProductScreen