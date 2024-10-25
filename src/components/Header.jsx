import { Image, StyleSheet, View } from "react-native";
import React from "react";
import logo from "../../assets/logoSS.png";
import { colors } from "../global/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function Header() {

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          marginTop: 20,
          borderLeftColor: "#0c8308"
        }}
        text1Style={{ fontSize: 15 }}
        text2Style={{ fontSize: 13 }}
      />
    ),
    error: (props) => (
      <ErrorToast
      {...props}
      style={{
        marginTop: 20,
        borderLeftColor: "#8c0808"
      }}
      text1Style={{ fontSize: 15 }}
      text2Style={{ fontSize: 13 }}
      />
    ),
  }

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ ...styles.headerContainer, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Image source={logo} style={styles.logoHeader} resizeMode="contain" />
      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.principal,
    height: 170,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoHeader: {
    width: 180,
    marginTop: 30
  },
  toastSuccess: {
    marginTop: 20,
    borderLeftColor: "#0c8308"
  }
});
