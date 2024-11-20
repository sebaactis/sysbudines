import { object, ref, string } from "yup";

export const registerSchema = object().shape({
        confirmPassword: string()
        .oneOf([ref('password'), null], "Las contraseñas deben coincidir")
        .required('La confirmacion de la contraseña es requerida'),
        password: string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener como mínimo 6 caracteres'),
        email: string()
        .required('El correo es obligatorio')
        .email('El valor ingresado no es un email')
})