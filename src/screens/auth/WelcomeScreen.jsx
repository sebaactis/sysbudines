import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../global/colors'
import logo from "../../../assets/logoSS.png";
import Icon from 'react-native-vector-icons/FontAwesome'

const WelcomeScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={[colors.principal, '#8b5100']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.logoCont}>
                <Image source={logo} style={styles.logoHeader} resizeMode="contain" />
            </View>
            <Text style={styles.welcomeText}>Hola! Bienvenido</Text>
            <Text style={styles.welcomeSubText}>Bienvenido a nuestra tienda de comida saludable!</Text>
            <View style={styles.btnCont}>
                <Pressable onPress={() => navigation.navigate('Login')} style={styles.welcomeBtn}>
                    <Text style={styles.welcomeBtnText}>Login</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Register')} style={styles.welcomeBtn}>
                    <Text style={styles.welcomeBtnText}>Registrarse</Text>
                </Pressable>
            </View>
            <View style={styles.welcomeRedes}>
                <Text style={styles.redesText}>Nuestras redes</Text>
                <Icon onPress={() => Linking.openURL('https://www.instagram.com/sysbudines/')} name="instagram" size={34} />
            </View>
        </LinearGradient>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        alignItems: 'center',
        gap: 30

    },
    logoCont: {
        height: 330
    },
    logoHeader: {
        width: 240
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: '800'
    },
    welcomeSubText: {
        fontSize: 18,
        textAlign: 'center'
    },
    btnCont: {
        gap: 13,
        marginTop: 5
    },
    welcomeBtn: {
        backgroundColor: "#f7d7ab",
        paddingHorizontal: 80,
        paddingVertical: 17,
        alignItems: 'center',
        borderRadius: 30
    },
    welcomeBtnText: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    welcomeRedes: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    redesText: {
        fontSize: 13,
        fontStyle: 'italic',
    }
})