import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import Search from '../../components/Search';
import { BackArrow } from '../../Icons';
import PressableBack from '../../components/PressableBack';
import { useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../../services/shopService';
import { ActivityIndicator } from 'react-native';
import ProductList from '../../components/product/ProductList';
import { colors } from '../../global/colors';

export default function ProductsScreen({ navigation }) {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const category = useSelector(state => state.shopReducer.categorySelected);
    const { data: productsFilteredCategory, error, isLoading } = useGetProductsByCategoryQuery(category);

    useEffect(() => {
        setProductsFiltered(productsFilteredCategory)
        if (search) {
            setProductsFiltered(productsFiltered.filter(product => product.nombre.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, productsFilteredCategory])



    return (
        <>
            {isLoading ? <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} /> :
                <View>
                    <PressableBack callback={() => navigation.goBack()} />
                    <Text style={styles.productosTitle}>Productos</Text>
                    <Search setSearch={setSearch} />
                    <ProductList
                        navigation={navigation} 
                        products={productsFiltered} />
                </View>}
        </>
    )
}

const styles = StyleSheet.create({
    productosTitle: {
        textAlign: "center",
        marginTop: 5,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
});