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

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../AwesomeProject/src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../AwesomeProject/src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../AwesomeProject/src/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="LoginScreen">
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
          options={{
            title: "Створити публікацію",
            ...headerScreensStyles,
          }}
        />
        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            title: "Сфотографовано тут:",
            ...headerScreensStyles,
          }}
        />
        <MainStack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            title: "Коментарі",
            ...headerScreensStyles,
          }}
        />
      </MainStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  image: {
    flex: 1,
  },
});
