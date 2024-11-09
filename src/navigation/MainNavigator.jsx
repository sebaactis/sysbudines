import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/userService";
import { setProfileImage, setUser } from "../features/auth/authSlice";
import { fetchSession } from "../db";


const Stack = createNativeStackNavigator()

const MainNavigator = () => {

    const user = useSelector(state => state.authReducer.email)
    const localId = useSelector(state => state.authReducer.localId)

    const dispatch = useDispatch()

    const { data: profileImage, isLoading, error } = useGetProfileImageQuery(localId)

    useEffect(() => {
        if (!user) {
            (async () => {
                try {
                    const session = await fetchSession()
                   
                    if (session.length) {
                        dispatch(setUser(session[0]))
                    }
                } catch (error) {
                    console.log("Error al obtener la sesión", error)
                }
            })()
        }
    }, [user])

    useEffect(() => {
        if (profileImage) {
            dispatch(setProfileImage(profileImage.image))
        }
    }, [profileImage])
    return (
        <NavigationContainer>
            {user ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default MainNavigator;