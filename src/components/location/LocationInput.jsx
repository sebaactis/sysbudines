import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import useLocation from '../../hooks/useLocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { v4 as uuidv4 } from 'uuid';

const LocationInput = ({ user, onSave }) => {
    const [title, setTitle] = useState("")
    const { location, address, getLocation, setLocation } = useLocation();

    const handleSave = () => {
        if (location && title) {
            const newPlace = {
                id: uuidv4(),
                title,
                coords: location,
                address,
                user,
            };
            onSave(newPlace);
            setTitle("");
            setLocation("")
        }
    };

    return (
        <>
            {user !== 'Invited' &&
                <View style={styles.locationInputContainer}>
                    <TextInput style={styles.locationInput} placeholder="Ingresa un título" onChangeText={(text) => setTitle(text)} />
                    <Pressable onPress={getLocation}>
                        <Icon name="add-location-alt" size={32} color="orange" />
                    </Pressable>
                    <Pressable onPress={handleSave}>
                        <Icon name="add-circle-outline" size={32} color="orange" />
                    </Pressable>
                </View>}
        </>
    )
}

export default LocationInput

const styles = StyleSheet.create({
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
})