import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import MainNavigator from "./src/navigation/MainNavigator";

SplashScreen.preventAutoHideAsync();

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
