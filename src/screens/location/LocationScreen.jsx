import LocationList from '../../components/location/LocationList';
import useLocation from '../../hooks/useLocation';
import LocationInput from '../../components/location/LocationInput';

import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../global/colors';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { useGetLocationsQuery, usePostLocationMutation } from '../../services/locationService';

import Toast from 'react-native-toast-message';
import { showToast } from '../../utils/functions';

const LocationScreen = () => {
    const user = useSelector(state => state.authReducer.email)

    const { data: fetchedLocations = [], error, isLoading, refetch } = useGetLocationsQuery(user);
    const [locations, setLocations] = useState(fetchedLocations);

    const [triggerPostLocation] = usePostLocationMutation()
    const dispatch = useDispatch()

    const savePlace = async (newPlace) => {
        try {
            await triggerPostLocation(newPlace)
            setLocations((prev) => [...prev, newPlace]);
            showToast('success', 'Dirección guardada correctamente! ✅', "", 2000)
            refetch();
        } catch (error) {
            showToast('error', 'No se pudo guardar la dirección ❌', 'Por favor intenta de nuevo', 2000)
        }
    }

    return (
        <>
            <Text style={styles.locationTitle}>Mis direcciones</Text>
            <View style={styles.locationContainer}>
                <LocationInput
                    user={user}
                    onSave={savePlace}
                />

                {isLoading && <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />}

                {(locations && !isLoading) && <LocationList locations={fetchedLocations} />}

                {user === 'Invited' &&
                    <View style={styles.noLogInContainer}>
                        <Text style={styles.noLogIn}>Debes loguearse para guardar ubicaciones</Text>
                        <Pressable onPress={() => dispatch(setUser(""))} style={styles.noLogInBtn}>
                            <Text style={styles.noLogInBtnText}>Ir al login</Text>
                        </Pressable>
                    </View>}

            </View>
        </>
    );
};

export default LocationScreen;

const styles = StyleSheet.create({
    locationContainer: {
        flex: 1,
        gap: 20
    },
    locationTitle: {
        textAlign: 'center',
        marginVertical: 15,
        fontSize: 17,
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