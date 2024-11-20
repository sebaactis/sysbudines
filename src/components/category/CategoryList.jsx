import { Text, View, FlatList } from 'react-native'
import CategoryItem from './CategoryItem'

const CategoryList = ({categories, navigation}) => {
    return (
        <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
                <CategoryItem navigation={navigation} item={item} index={index}/>
            )}
        />
    )
}

export default CategoryList