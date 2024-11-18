import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../global/colors'
import { useSelector } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { useGetOrdersQuery } from '../../services/orderService';
import ProfileImage from '../../components/profile/ProfileImage';
import ProfileButton from '../../components/profile/ProfileButton';
import { useProfileActions } from '../../hooks/useProfileActions';

const ProfileScreen = ({ navigation }) => {
    const user = useSelector(state => state.authReducer.email)
    const { data: orders, isLoading } = useGetOrdersQuery(user);
    const { handlePickImage, handleLogout } = useProfileActions();

    return (
        <>
            {isLoading
                ? <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />
                : <>

                    <View style={styles.profileContainer}>
                        <ProfileImage user={user} />
                        {user !== 'Invited' && <ProfileButton onPress={handlePickImage} text='Cambiar Foto' isIcon />}
                    </View>

                    <View style={styles.profileDataContainer}>
                        <Text style={styles.profileDataTitle}>Email: <Text style={styles.profileDataInfo}>{user}</Text></Text>
                        <Text style={styles.profileDataTitle}>Cantidad de ordenes: <Text style={styles.profileDataInfo}>{orders.length}</Text></Text>
                    </View>
                    {user === 'Invited' ?
                        <ProfileButton onPress={() => dispatch(setUser(''))} text="Creá tu usuario" />
                        : <ProfileButton onPress={handleLogout} text="Cerrar Sesión" />}
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
    profileDataContainer: {
        gap: 10,
        marginLeft: 45,
    },
})