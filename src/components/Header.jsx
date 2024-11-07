import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import React from "react";
import logo from "../../assets/logoSS.png";
import { colors } from "../global/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { clearUser } from "../features/auth/authSlice";
import { clearSessions } from "../db";

export default function Header() {

  const insets = useSafeAreaInsets();
  const user = useSelector(state => state.authReducer.email)
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearUser());
    clearSessions()
      .then(() => console.log('Sesion eliminada'))
      .catch((error) => console.log("Error al eliminar la sesion"))
  }

  return (
    <View
      style={{ ...styles.headerContainer, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Image source={logo} style={styles.logoHeader} resizeMode="contain" />
      {user && <Pressable style={styles.logoutIcon} onPress={onLogout}><Icon  name="logout" size={34} color="#fff" /></Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.principal,
    height: 170,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoHeader: {
    width: 180,
    marginTop: 30
  },
  toastSuccess: {
    marginTop: 20,
    borderLeftColor: "#0c8308"
  },
  logoutIcon: {
    marginLeft: 33,
    marginRight: 20,
    backgroundColor: '#00000073',
    padding: 5,
    borderRadius: 50
  }
});
