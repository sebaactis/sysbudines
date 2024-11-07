import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import MainNavigator from "./src/navigation/MainNavigator";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { init } from "./src/db";

SplashScreen.preventAutoHideAsync();

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

init()
  .then(() => console.log('Iniciando DB'))
  .catch(err => {
    console.log("Error inicializando DB")
    console.log(err.message)
  })

export default function App() {

  const [loaded, error] = useFonts({
    'Khand-Regular': require('./assets/fonts/Khand-Regular.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    if (error) {
      console.error('Error loading fonts', error);
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.appCont}>
          <MainNavigator />
          <Toast config={toastConfig} />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  appCont: {
    flex: 1,
    fontFamily: 'Khand-Regular',
  }
});
