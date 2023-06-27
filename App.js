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

// const AuthStack = createStackNavigator();
// const MainStack = createStackNavigator();

// const useRoute = (isLoggedIn) => {
//   if (!isLoggedIn) {
//     return (
//       <AuthStack.Navigator initialRouteName="LoginScreen">
//         <AuthStack.Screen
//           name="RegistrationScreen"
//           component={RegistrationScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//         <AuthStack.Screen
//           name="LoginScreen"
//           component={LoginScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     <MainStack.Navigator initialRouteName="LoginScreen">
//       <MainStack.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <MainStack.Screen
//         name="CreatePostsScreen"
//         component={CreatePostsScreen}
//         options={{
//           title: "Створити публікацію",
//           ...headerScreensStyles,
//         }}
//       />
//       <MainStack.Screen
//         name="MapScreen"
//         component={MapScreen}
//         options={{
//           title: "Сфотографовано тут:",
//           ...headerScreensStyles,
//         }}
//       />
//       <MainStack.Screen
//         name="CommentsScreen"
//         component={CommentsScreen}
//         options={{
//           title: "Коментарі",
//           ...headerScreensStyles,
//         }}
//       />
//     </MainStack.Navigator>
//   );
// };

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../AwesomeProject/src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../AwesomeProject/src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../AwesomeProject/src/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // const userData = useSelector(userSelector);

  // const isAuth = useSelector(isLoggedInSelector);
  // console.log(isAuth);

  // const routing = navigationRouting();
  // console.log(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NavigationRouting />
          {/* {routing} */}
          {/* <MainStack.Navigator initialRouteName="LoginScreen">
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
          </MainStack.Navigator> */}
          <StatusBar style="auto" />
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
