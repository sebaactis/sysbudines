import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/userService";
import { setProfileImage, setUser } from "../features/auth/authSlice";
import { fetchSession } from "../db";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "../global/colors";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    const user = useSelector((state) => state.authReducer.email);
    const localId = useSelector((state) => state.authReducer.localId);

    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const dispatch = useDispatch();

    const { data: profileImage } = useGetProfileImageQuery(localId);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await fetchSession();
                if (session.length) {
                    dispatch(setUser(session[0]));
                }
            } catch (error) {
                console.log("Error al obtener la sesión", error);
            } finally {
                setIsCheckingSession(false);
            }
        };

        if (!user) {
            checkSession();
        } else {
            setIsCheckingSession(false);
        }
    }, [user]);

    useEffect(() => {
        if (profileImage) {
            dispatch(setProfileImage(profileImage.image));
        }
    }, [profileImage]);

    if (isCheckingSession) {

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.principal} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default MainNavigator;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
