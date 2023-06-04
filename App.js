import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../AwesomeProject/src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../AwesomeProject/src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      {/* <Text>Illia Datsenko ReactNative blank project with Expo</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 375,
    // backgroundColor: "#fff",
    // alignItems: "flex-end",
    // justifyContent: "center",
    // flexDirection: "column-reverse",
  },
});
