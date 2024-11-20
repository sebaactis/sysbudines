import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import FlatCard from '../FlatCard';
import { setCategory } from '../../features/shop/shopSlice';
import { colors } from '../../global/colors';

const CategoryItem = ({ navigation, item, index }) => {

    const dispatch = useDispatch();

    return (
        <Pressable
            onPress={() => {
                dispatch(setCategory(item.nombre))
                navigation.navigate('Productos')
            }
            }>
            <FlatCard
                style={index % 2 === 0 ? { ...styles.row, ...styles.categoryCard } : { ...styles.rowReverse, ...styles.categoryCard }}
            >
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                <Text style={styles.cardTitle}>{item.nombre}</Text>
            </FlatCard>
        </Pressable>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    rowReverse: {
        flexDirection: "row-reverse",
    },
    categoryCard: {
        alignItems: 'center',
        backgroundColor: colors.cardColor,
        alignSelf: "center",
        width: "70%",
        marginVertical: 10,
        borderRadius: 14,
    },
    image: {
        width: 180,
        height: 180,
    },
    cardTitle: {
        fontSize: 23,
        fontStyle: "italic"
    },
})