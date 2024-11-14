import { object, string } from "yup";

export const loginSchema = object().shape({
    password: string().required("La contraseña es obligatoria"),
    email: string().required("El email es obligatorio")
})