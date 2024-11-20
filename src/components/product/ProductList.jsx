import { StyleSheet, FlatList } from 'react-native'
import ProductItem from './ProductItem'

const ProductList = ({ products, navigation }) => {

    return (
        <FlatList
            data={products}
            keyExtractor={prod => prod.id}
            renderItem={({ item }) => (
                <ProductItem item={item} navigation={navigation} />
            )}
            numColumns={2}
            style={styles.productsList}
        />
    )
}

export default ProductList

const styles = StyleSheet.create({
    productsList: {
        marginBottom: 200
    }
})