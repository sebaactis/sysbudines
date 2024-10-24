import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import FlatCard from '../../components/FlatCard';
import Search from '../../components/Search';
import { BackArrow } from '../../Icons';
import { colors } from '../../global/colors';
import PressableBack from '../../components/PressableBack';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../features/shop/shopSlice';
import { useGetProductsByCategoryQuery } from '../../services/shopService';

export default function ProductsScreen({ navigation }) {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const category = useSelector(state => state.shopReducer.categorySelected);
    const { data: productsFilteredCategory, error, isLoading } = useGetProductsByCategoryQuery(category);
    const dispatch = useDispatch();

    useEffect(() => {
        if (search) {
            setProductsFiltered(productsFiltered.filter(product => product.nombre.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search])

    useEffect(() => {
        setProductsFiltered(productsFilteredCategory)
    }, [])

    const renderProductItem = ({ item }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setProduct(item.id))
                navigation.navigate('Producto')
            }} style={styles.productContainer}>
                <FlatCard style={styles.productCardItem}>
                    <View style={styles.productImageContainer}>
                        <Image
                            source={item.image}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.productsData}>
                        <Text style={styles.productName}>{item.nombre}</Text>
                        <Text style={styles.productCategoryText}>Categoria: {item.categoria}</Text>
                        <Text style={styles.productPrice}>${item.precio}</Text>
                    </View>
                </FlatCard >
            </Pressable>
        )
    }

    return (
        <View>
            <PressableBack callback={() => navigation.goBack()} />
            <Text style={styles.productosTitle}>Productos</Text>
            <Search setSearch={setSearch} />
            <FlatList
                data={productsFiltered}
                keyExtractor={prod => prod.id}
                renderItem={renderProductItem}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    productosTitle: {
        textAlign: "center",
        marginVertical: 15,
        fontSize: 20,
        fontWeight: "bold",
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
    productContainer: {
        flexBasis: "45%",
        maxWidth: "45%",
        margin: 10
    },
    productCardItem: {
        flexDirection: "column",
        alignItems: "start",
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
    }
});