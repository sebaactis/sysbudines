import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useLoginMutation } from '../../services/authService'
import { colors } from '../../global/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/auth/authSlice'

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [triggerLogin, result] = useLoginMutation()
  const dispatch = useDispatch()

  const onSubmit = () => {
    triggerLogin({ email, password })
  }

  useEffect(() => {
    if (result.status === "rejected") {
      console.log("Error al loguearse", result)
    } else if (result.status === "fulfilled") {
      console.log("Usuario logueado")
      dispatch(setUser(result.data))
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
        <Text style={styles.registerTitle}>Iniciar Sesión</Text>
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
        </View>
        <Pressable onPress={onSubmit} style={styles.registerBtn}><Text>Loguearse</Text></Pressable>
        <Text style={styles.textCuenta}>No tienes cuenta? <Text onPress={() => navigation.navigate("Register")} style={styles.subTextCuenta}>Ingresá acá</Text></Text>
      </View>
    </LinearGradient>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerTitle: {
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 20,
  },
  inputsCont: {
    gap: 15,
    width: '90%'
  },
  input: {
    backgroundColor: "#94949482",
    paddingRight: 80,
    paddingLeft: 15,
    paddingVertical: 17,
    borderRadius: 10,
    textAlign: 'start'
  },
  registerBtn: {
    backgroundColor: "#4400598b",
    paddingHorizontal: 35,
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 15
  },
  textCuenta: {
    marginTop: 20
  },
  subTextCuenta: {
    textDecorationLine: 'underline',
  }
})