import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import FlatCard from '../../components/FlatCard';
import MapView, { Marker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { showToast } from '../../utils/functions';
import { useGetLocationsQuery, usePostLocationMutation } from '../../services/locationService';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../global/colors';
import { setUser } from '../../features/auth/authSlice';

const GEO_URL = process.env.EXPO_PUBLIC_GEOCODING_API_KEY

const LocationScreen = () => {

    const user = useSelector(state => state.authReducer.email)
    const { data: fetchedLocations = [], error, isLoading, refetch } = useGetLocationsQuery(user);

    const [locations, setLocations] = useState(fetchedLocations);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("")
    const [title, setTitle] = useState("")

    const [triggerPostLocation, result] = usePostLocationMutation()

    const dispatch = useDispatch()

    const renderPlaceItem = ({ item }) => (
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

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            return false;
        }
        return true;
    };

    const getLocation = async () => {

        const permissionOk = await getPermissions()
        if (!permissionOk) {
            setErrorMsg('Permission to access location was denied');
        } else {
            showToast('info', "Obteniendo su localización actual...", "Aguarde un momento por favor", 2000)
            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GEO_URL}`
                );
                const data = await response.json()

                if (data.status === 'OK') {
                    const formattedAddress = data.results[0].formatted_address;
                    setAddress(formattedAddress)
                } else {
                    console.log('Error en geocodificación inversa:', data.error_message)
                }
                showToast("success", "¡Ubicación obtenida!", "", 2000)
            } else {
                setErrorMsg('Error getting location');
                showToast("error", "No se pudo obtener la ubicación", "", 2000)
            }

            setLocation(location.coords);
        }
    }

    const savePlace = async () => {
        if (location && title) {

            const newPlace = {
                id: uuidv4(),
                title,
                coords: {
                    latitude: location.latitude,
                    longitude: location.longitude
                },
                address,
                user
            };

            try {

                await triggerPostLocation(newPlace)
                setLocations((prev) => [...prev, newPlace]);
                setTitle("");
                setLocation("");
            } catch (error) {
                console.error("Error al subir la ubicación a Firebase:", error);
            }
        }
    }

    return (
        <>
            <Text style={styles.locationTitle}>Mis direcciones</Text>
            <View style={styles.locationContainer}>

                {user !== 'Invited' && <View style={styles.locationInputContainer}>
                    <TextInput style={styles.locationInput} placeholder="Ingresa un título" onChangeText={(text) => setTitle(text)} />
                    <Pressable onPress={getLocation}>
                        <Icon name="add-location-alt" size={32} color="orange" />
                    </Pressable>
                    <Pressable onPress={savePlace}>
                        <Icon name="add-circle-outline" size={32} color="orange" />
                    </Pressable>
                </View>}
                {locations.length <= 0 && <Text style={styles.dontHavePlacesText}>No tienes ubicaciones actualmente ☹️</Text>}
                {isLoading && <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />}
                {locations && <FlatList
                    data={locations}
                    keyExtractor={item => item.id}
                    renderItem={renderPlaceItem}
                />}
                {user === 'Invited' &&
                    <View style={styles.noLogInContainer}>
                        <Text style={styles.noLogIn}>Debes loguearse para guardar ubicaciones</Text>
                        <Pressable onPress={() => dispatch(setUser(""))} style={styles.noLogInBtn}><Text style={styles.noLogInBtnText}>Ir al login</Text></Pressable>
                    </View>}
            </View>
        </>
    );
};

export default LocationScreen;

const styles = StyleSheet.create({
    locationContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 20
    },
    locationTitle: {
        textAlign: 'center',
        marginVertical: 15,
        fontSize: 17,
    },
    locationInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    locationInput: {
        backgroundColor: '#9f9f9f38',
        paddingLeft: 15,
        width: 170,
        borderRadius: 10,
        paddingVertical: 20,
        flex: 0.8
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
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
    mapTitle: {
        fontWeight: '700'
    },
    placeDescriptionContainer: {
        width: '60%',
        padding: 8
    },
    dontHavePlacesText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 18,
        fontWeight: '700',
        fontStyle: 'italic'
    },
    noLogInContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 35
    },
    noLogIn: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    noLogInBtn: {
        backgroundColor: colors.principal,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10
    },
    noLogInBtnText: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
});