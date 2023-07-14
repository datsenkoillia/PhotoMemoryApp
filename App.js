import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import { NavigationRouting } from "./src/Components/NavigationRouting/NavigationRouting";

import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NavigationRouting />
          <StatusBar style="dark" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
