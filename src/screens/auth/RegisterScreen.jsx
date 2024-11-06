import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useRegisterMutation } from '../../services/authService'
import { colors } from '../../global/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/auth/authSlice'
import { showToast } from '../../utils/functions'

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [triggerRegister, result] = useRegisterMutation()
  const dispatch = useDispatch()

  const onSubmit = () => {
    if (password !== confirmPassword) return showToast('error', 'Las constraseñas no coinciden 😕', 'Por favor, revise la información', 2000)
    triggerRegister({ email, password })
  }

  useEffect(() => {
    if (result.status === "rejected") {
      showToast('error', 'Error al registrarse ❌', "Por favor, intente nuevamente", 2000)
    } else if (result.status === "fulfilled") {
      showToast('success', 'Registro exitoso! ✅', 'Será redirigido en breve...', 2000)
      setTimeout(() => { dispatch(setUser(result.data)) }, 2500)
    }
  }, [result])

  return (
    <LinearGradient
      colors={[colors.principal, '#8b5100']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.registerCont}>
        <Text style={styles.registerTitle}>Crea tu cuenta ahora!</Text>
        <View style={styles.inputsCont}>
          <TextInput
            placeholder='Email'
            placeholderTextColor="#00000075"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder='Password'
            placeholderTextColor="#00000075"
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />

          <TextInput
            placeholder='Confirm Password'
            placeholderTextColor="#00000075"
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <Pressable onPress={onSubmit} style={styles.registerBtn}><Text style={styles.registerBtnText}>Registrarse</Text></Pressable>
        <Text style={styles.textCuenta}>Ya tienes una cuenta? <Text onPress={() => navigation.navigate("Login")} style={styles.subTextCuenta}>Ingresá acá</Text></Text>
      </View>
    </LinearGradient>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  registerCont: {
    justifyContent: 'center',
    marginHorizontal: 40
  },
  registerTitle: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 35,
    marginLeft: 10
  },
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
  registerBtn: {
    backgroundColor: "#f7d7ab",
    paddingHorizontal: 30,
    paddingVertical: 18,
    marginTop: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  registerBtnText: {
    fontSize: 17,
    fontWeight: '800',
  },
  textCuenta: {
    marginTop: 27,
    textAlign: 'center',
    fontSize: 15
  },
  subTextCuenta: {
    textDecorationLine: 'underline',
    color: '#f7d7ab',
    fontStyle: 'italic',
  }
})