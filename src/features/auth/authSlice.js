import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
            state.token = action.payload.idToken
        },
        clearUser: (state) => {
            state.email = null
            state.token = null
        }
    }
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer