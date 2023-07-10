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
// import { authStateChanged } from "../../redux/auth/authOperations";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { checkUserState } from "../../redux/auth/authOperations";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const NavigationRouting = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const userCheck = checkUserState();
    // console.log(userCheck);
    dispatch(authStateChanged(userCheck));
  }, []);

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
