import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "../../utils/functions";

const initialState = {
    email: null,
    token: null,
    profileImage: "",
    localId: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
            state.token = action.payload.idToken
            state.localId = action.payload.localId
        },
        clearUser: (state) => {
            state.email = null
            state.token = null
            state.localId = null
            showToast('success', 'Cerraste sesión correctamente ✅', "Vuelve pronto! 👋", 1500)
        },
        setProfileImage: (state, action) => {
            state.profileImage = action.payload
        }
    }
})

export const { setUser, clearUser, setProfileImage } = authSlice.actions

export default authSlice.reducer