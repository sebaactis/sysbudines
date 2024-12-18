import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useLoginMutation } from '../../services/authService'
import { colors } from '../../global/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/auth/authSlice'
import Toast from 'react-native-toast-message'
import { showToast } from '../../utils/functions'
import { insertSession } from '../../db'
import { loginSchema } from '../../validations/loginSchema'
import LoginInputContainer from '../../components/auth/login/LoginInputContainer'

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [triggerLogin, result] = useLoginMutation()
  const dispatch = useDispatch()

  const onSubmit = async () => {
    try {
      setEmailError("")
      setPasswordError("")

      await loginSchema.validate({ email, password })

      triggerLogin({ email, password })

    } catch (error) {

      if (error.path === 'email') {
        setEmailError(error.message)
      }

      if (error.path === 'password') {
        setPasswordError(error.message)
      }
    }

  }

  useEffect(() => {
    if (result.status === "rejected") {

      showToast('error', 'Error al internar loguearse! ❌', `Motivo: ${result.error.data.error.errors[0].message}`, 2500)
    }
    else if (result.status === "fulfilled") {
      showToast('success', 'Logueo exitoso! ✅', "Ingresaras en un momento", 2500)
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken
      }).then(result => console.log(result)).catch(error => console.log(error.message))
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
        <View style={styles.titlesCont}>
          <Text style={styles.registerTitle}>Bienvenido/a de nuevo!</Text>
          <Text style={styles.registerSubTitle}>Iniciar Sesión para continuar</Text>
        </View>

        <LoginInputContainer
          setEmail={setEmail}
          setPassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
        />

        <Pressable onPress={onSubmit} style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>Login</Text>
        </Pressable>
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
  },
  registerCont: {
    justifyContent: 'center',
    marginHorizontal: 40
  },
  titlesCont: {
    marginBottom: 30
  },
  registerTitle: {
    fontWeight: '800',
    fontSize: 23,
    marginBottom: 10,
  },
  registerSubTitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
    fontStyle: 'italic',
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