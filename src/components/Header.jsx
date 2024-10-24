import { Image, StyleSheet, View } from "react-native";
import React from "react";
import logo from "../../assets/logoSS.png";
import { colors } from "../global/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{...styles.headerContainer, paddingTop: insets.top, paddingBottom: insets.bottom}}
    >
      <Image source={logo} style={styles.logoHeader} resizeMode="contain" />
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
});
