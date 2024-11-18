import { View, Text, StyleSheet, FlatList } from 'react-native'
import LocationMap from './LocationMap'

const LocationList = ({ locations }) => {

    if (locations.length === 0) {
        return <Text style={styles.dontHavePlacesText}>No tienes ubicaciones actualmente ☹️</Text>
    }

    const renderPlaceItem = ({ item }) => {
        return <LocationMap item={item} />
    }

    return (
        <FlatList
            data={locations}
            keyExtractor={item => item.id}
            renderItem={renderPlaceItem}
        />
    )
}

export default LocationList

const styles = StyleSheet.create({
    dontHavePlacesText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 18,
        fontWeight: '700',
        fontStyle: 'italic'
    },
})