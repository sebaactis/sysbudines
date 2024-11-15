import { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setProfileImage, setUser } from '../../features/auth/authSlice';
import { usePutProfileImageMutation } from '../../services/userService';
import { useGetOrdersQuery } from '../../services/orderService';
import { clearSessions } from '../../db';

const ProfileScreen = ({ navigation }) => {
    const user = useSelector(state => state.authReducer.email)
    const image = useSelector(state => state.authReducer.profileImage)
    const localId = useSelector(state => state.authReducer.localId)
    const { data: orders, isLoading } = useGetOrdersQuery(user);

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(clearUser());
        clearSessions()
            .then(() => console.log('Sesion eliminada'))
            .catch((error) => console.log("Error al eliminar la sesion"))
    }

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
        <>
            {isLoading
                ? <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />
                : <>
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
                        {user !== 'Invited' && <Pressable onPress={pickImage} style={styles.cameraIcon} >
                            <CameraIcon />
                        </Pressable >}
                    </View>

                    <View style={styles.profileDataContainer}>
                        <Text style={styles.profileDataTitle}>Email: <Text style={styles.profileDataInfo}>{user}</Text></Text>
                        <Text style={styles.profileDataTitle}>Cantidad de ordenes: <Text style={styles.profileDataInfo}>{orders.length}</Text></Text>
                    </View>
                    {user === 'Invited' ?
                        <Pressable onPress={() => dispatch(setUser(""))} style={styles.profileDataBtn}>
                            <Text style={styles.profileDataBtnText}>Creá tu usuario</Text>
                        </Pressable>
                        : <Pressable onPress={onLogout} style={styles.profileDataBtn}>
                            <Text style={styles.profileDataBtnText}>Cerrar Sesión</Text>
                        </Pressable>}
                </>}
        </>
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
    profileDataTitle: {
        paddingVertical: 16,
        fontSize: 16,
        fontWeight: "bold",
        borderBottomWidth: 0.4,
        width: 300,
    },
    profileDataInfo: {
        fontWeight: "400",
        fontStyle: 'italic'
    },
    cameraIcon: {
        marginTop: 10
    },
    profileDataContainer: {
        gap: 10,
        marginLeft: 45,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    profileDataBtn: {
        backgroundColor: colors.principal,
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 'auto',
        borderRadius: 10,
        marginBottom: 190
    },
    profileDataBtnText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    }

})