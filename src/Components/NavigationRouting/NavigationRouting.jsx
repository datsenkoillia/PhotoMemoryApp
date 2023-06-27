import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { useFonts } from "expo-font";
// import PhotoBG from "./src/images/PhotoBG.png";
import RegistrationScreen from "../../Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../../Screens/LoginScreen/LoginScreen";
import Home from "../../Screens/Home/Home";
import MapScreen from "../../Screens/MapScreen/MapScreen";
import CommentsScreen from "../../Screens/CommentsScreen/CommentsScreen";

// import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { headerScreensStyles } from "../../defaultStyles/headerScreensStyles";
import CreatePostsScreen from "../../Screens/CreatePostsScreen/CreatePostsScreen";
import { isLoggedInSelector } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const NavigationRouting = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);

  if (!isLoggedIn) {
    return (
      <AuthStack.Navigator initialRouteName="LoginScreen">
        <AuthStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator initialRouteName="LoginScreen">
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
  );
};

// export default navigationRouting;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  image: {
    flex: 1,
  },
});
