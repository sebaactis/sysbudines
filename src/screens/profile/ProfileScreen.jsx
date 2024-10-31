import { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../features/auth/authSlice';
import { usePutProfileImageMutation } from '../../services/userService';

const ProfileScreen = () => {
    const user = useSelector(state => state.authReducer.email)
    const image = useSelector(state => state.authReducer.profileImage)
    const localId = useSelector(state => state.authReducer.localId)
    const dispatch = useDispatch();

    const [triggerPutProfileImage, result] = usePutProfileImageMutation()

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()

        if (!granted) return false;

        return true;
    }

    const pickImage = async () => {

        const permission = await verifyCameraPermissions();

        if (permission) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.5
            })

            if (!result.canceled) {
                dispatch(setProfileImage(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfileImage({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId })
            }
        } else {
            console.log("No permitido")
        }

    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
            </View>
            <Pressable onPress={pickImage} style={styles.cameraIcon} >
                <CameraIcon />
            </Pressable >
            <Text style={styles.profileData}>Email: {user}</Text>

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: "#954b1a",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textProfilePlaceHolder: {
        color: "white",
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        marginTop: 10
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    }
})