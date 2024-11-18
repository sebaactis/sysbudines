import { useDispatch, useSelector } from "react-redux"
import { usePutProfileImageMutation } from "../services/userService"
import * as ImagePicker from 'expo-image-picker';
import { clearUser, setProfileImage } from "../features/auth/authSlice";
import { clearSessions } from "../db";

export const useProfileActions = () => {
    const dispatch = useDispatch()
    const localId = useSelector(state => state.authReducer.localId)
    const [triggerPutProfileImage] = usePutProfileImageMutation()

    const handleLogout = () => {
        dispatch(clearUser());
        clearSessions()
            .then(() => console.log('Sesion eliminada'))
            .catch((error) => console.log("Error al eliminar la sesion"))
    }

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()

        if (!granted) return false;

        return true;
    }

    const handlePickImage = async () => {

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

    return { handleLogout, handlePickImage };
}