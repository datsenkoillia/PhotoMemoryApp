import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import RegistrationScreen from "../../Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../../Screens/LoginScreen/LoginScreen";
import Home from "../../Screens/Home/Home";
import MapScreen from "../../Screens/MapScreen/MapScreen";
import CommentsScreen from "../../Screens/CommentsScreen/CommentsScreen";

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { headerScreensStyles } from "../../defaultStyles/headerScreensStyles";
import CreatePostsScreen from "../../Screens/CreatePostsScreen/CreatePostsScreen";
import {
  authStateChanged,
  isLoggedInSelector,
} from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const NavigationRouting = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("lnlogin", user.uid);
  //       dispatch(authStateChanged(user));
  //     } else {
  //       console.log("lnlogin", "noUser");
  //       dispatch(authStateChanged(false));
  //     }
  //   });
  // }, []);

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

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
