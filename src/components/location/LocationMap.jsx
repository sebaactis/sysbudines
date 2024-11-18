import { StyleSheet, Text, View, } from 'react-native'
import FlatCard from '../FlatCard'
import MapView, { Marker } from 'react-native-maps';

const LocationMap = ({ item }) => { 
    return (
        <FlatCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ "latitude": item.coords.latitude, "longitude": item.coords.longitude }} title={item.title} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
        </FlatCard>
    )
}

export default LocationMap

const styles = StyleSheet.create({
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        margin: 4,
        gap: 24
    },
    mapContainer: {
        width: 120,
        height: 120,
        borderRadius: 75,
        overflow: "hidden"
    },
    map: {
        width: 120,
        height: 120,
    },
    placeDescriptionContainer: {
        width: '60%',
        padding: 8
    },
    mapTitle: {
        fontWeight: '700'
    },

})