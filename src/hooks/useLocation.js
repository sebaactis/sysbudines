import { useState } from 'react'
import * as Location from 'expo-location';
import { showToast } from '../utils/functions';

const GEO_URL = process.env.EXPO_PUBLIC_GEOCODING_API_KEY

const useLocation = () => {
    const [location, setLocation] = useState(null)
    const [address, setAddress] = useState("")

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

    return { location, address, getLocation, setLocation }
}

export default useLocation