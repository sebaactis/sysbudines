import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { setProduct } from '../../features/shop/shopSlice';
import FlatCard from '../FlatCard';
import { capitalizeLetter } from '../../utils/functions';
import { colors } from '../../global/colors';

const ProductItem = ({ item, navigation }) => {

    const dispatch = useDispatch();
    

    return (
        <Pressable onPress={() => {
            dispatch(setProduct(item.id))
            navigation.navigate('Producto')
        }} style={styles.productContainer}>
            <FlatCard style={styles.productCardItem}>
                <View style={styles.productImageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.productsData}>
                    <Text style={styles.productName}>{item.nombre}</Text>
                    <Text style={styles.productCategoryText}>Categoria: {capitalizeLetter(item.categoria)}</Text>
                    <Text style={styles.productPrice}>${item.precio}</Text>
                </View>
            </FlatCard>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    productContainer: {
        flexBasis: "45%",
        maxWidth: "45%",
        margin: 10
    },
    productCardItem: {
        flexDirection: "column",
        alignItems: "start",
    },
    productImageContainer: {
        backgroundColor: colors.cardColor,
        borderRadius: 15,
        justifyContent: "center",
        marginLeft: 15,
        padding: 10
    },
    image: {
        width: 140,
        height: 140,
        alignSelf: "center"
    },
    productsData: {
        justifyContent: "center",
        marginLeft: 20,
        gap: 3
    },
    productCategoryText: {
        fontSize: 11.5,
    },
    productName: {
        fontSize: 15,
        marginTop: 4
    },
    productPrice: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
})