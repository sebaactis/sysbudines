import { StyleSheet, Text, View, TextInput } from 'react-native'

const RegisterInputContainer = ({ handleChange, formErrors }) => {
    return (
        <View style={styles.inputsCont}>
            <TextInput
                placeholder='Email'
                name='email'
                placeholderTextColor="#00000075"
                style={styles.input}
                onChangeText={(value) => handleChange('email', value)}
            />

            {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}
            <TextInput
                placeholder='Password'
                placeholderTextColor="#00000075"
                style={styles.input}
                onChangeText={(value) => handleChange('password', value)}
            />

            {formErrors.password && <Text style={styles.error}>{formErrors.password}</Text>}
            <TextInput
                placeholder='Confirm Password'
                placeholderTextColor="#00000075"
                style={styles.input}
                onChangeText={(value) => handleChange('confirmPassword', value)}
            />

            {formErrors.confirmPassword && <Text style={styles.error}>{formErrors.confirmPassword}</Text>}
        </View>
    )
}

export default RegisterInputContainer

const styles = StyleSheet.create({
    inputsCont: {
        gap: 15
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