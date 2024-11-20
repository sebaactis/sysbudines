import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const LoginInputContainer = ({ setEmail, setPassword, emailError, passwordError }) => {
    return (
        <View style={styles.inputsCont}>
            <TextInput
                placeholder='Email'
                placeholderTextColor="#00000075"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
            />
            {emailError && <Text style={styles.error}>{emailError}</Text>}

            <TextInput
                placeholder='Password'
                placeholderTextColor="#00000075"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
            />

            {passwordError && <Text style={styles.error}>{passwordError}</Text>}
        </View>
    )
}

export default LoginInputContainer

const styles = StyleSheet.create({
    inputsCont: {
        gap: 15,
    },
    input: {
        backgroundColor: "#ffffffcb",
        paddingRight: 80,
        paddingLeft: 15,
        paddingVertical: 22,
        borderRadius: 30,
        textAlign: 'start'
    },
    error: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: 'red',
        fontStyle: 'italic'
      } 
})