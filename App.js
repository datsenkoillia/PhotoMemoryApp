import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFonts } from "expo-font";
import PhotoBG from "./src/images/PhotoBG.png";
import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import Home from "./src/Screens/Home/Home";
import MapScreen from "./src/Screens/MapScreen/MapScreen";
import CommentsScreen from "./src/Screens/CommentsScreen/CommentsScreen";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { headerScreensStyles } from "./src/defaultStyles/headerScreensStyles";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen/CreatePostsScreen";
import { NavigationRouting } from "./src/Components/NavigationRouting/NavigationRouting";

import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { isLoggedInSelector, userSelector } from "./src/redux/auth/authSlice";

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
          <StatusBar style='inverted' />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   // },
//   image: {
//     flex: 1,
//   },
// });
