import { StyleSheet, Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux'

const ProfileImage = ({ user }) => {
    const image = useSelector(state => state.authReducer.profileImage)

    return (
        <View style={styles.imageProfileContainer}>
            {
                image
                    ?
                    <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                    :
                    <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
            }
        </View>
    )
}

export default ProfileImage

const styles = StyleSheet.create({
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: "#954b1a",
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    textProfilePlaceHolder: {
        color: "white",
        fontSize: 48,
    },
})