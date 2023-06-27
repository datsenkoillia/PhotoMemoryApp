import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  bluredInputStyles,
  focusedInputStyles,
  defaultStyles,
} from "../../defaultStyles/defaultStyles";
import { useNavigation } from "@react-navigation/native";

import PhotoBG from "../../images/PhotoBG.png";
import { useDispatch } from "react-redux";
// import { logIn } from "../../redux/auth/authSlice";
import { logIn } from "../../redux/auth/authOperations";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [inputEmailDynamicStyles, setInputEmailDynamicStyles] =
    useState(bluredInputStyles);

  const [inputPasswordDynamicStyles, setInputPasswordDynamicStyles] =
    useState(bluredInputStyles);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(`Login user: {login: email: ${email}; password: ${password}}`);
    const userCredentials = {
      email: email,
      password: password,
    };
    dispatch(logIn(userCredentials));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={PhotoBG}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={defaultStyles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "android" ? "padding" : "height"}
              keyboardVerticalOffset={-230}
              // style={{ flex: 1 }}
            >
              <View style={[defaultStyles.formwrap, styles.formwrap]}>
                <Text style={defaultStyles.header}>Увійти</Text>

                <TextInput
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                  style={[defaultStyles.input, ...inputEmailDynamicStyles]}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setInputEmailDynamicStyles(focusedInputStyles)}
                  onBlur={() => setInputEmailDynamicStyles(bluredInputStyles)}
                />

                <View>
                  <TextInput
                    placeholder="Пароль"
                    secureTextEntry={!isShowPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={[defaultStyles.input, ...inputPasswordDynamicStyles]}
                    placeholderTextColor={"#BDBDBD"}
                    onFocus={() =>
                      setInputPasswordDynamicStyles(focusedInputStyles)
                    }
                    onBlur={() =>
                      setInputPasswordDynamicStyles(bluredInputStyles)
                    }
                  />
                  <TouchableOpacity
                    style={defaultStyles.showPassButton}
                    onPress={() => {
                      console.log(
                        `You tapped the ${
                          !isShowPassword ? "Показати" : "Cховати"
                        } button!`
                      );
                      toggleShowPassword();
                    }}
                  >
                    <Text style={defaultStyles.showPassAreaText}>
                      {!isShowPassword ? "Показати" : "Cховати"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={defaultStyles.button}
                  onPress={
                    handleSubmit
                    //   () => {
                    //   // console.log("You tapped the Увійти button!");
                    //   console.log(
                    //     `Login user: {login: email: ${email}; password: ${password}}`
                    //   );
                    //   const userCredentials = {
                    //     email: email,
                    //     password: password,
                    //   };
                    //   dispatch(logIn(userCredentials));

                    //   // navigation.navigate("Home", {
                    //   //   screen: "PostsScreen",
                    //   //   // params: { email: email },
                    //   // });
                    // }
                  }
                >
                  <Text style={defaultStyles.buttonText}> Увійти </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={defaultStyles.isExistAccount}
                  onPress={() => {
                    console.log(
                      "You tapped the Немає акаунту? Зареєструватися button!"
                    );
                    navigation.navigate("RegistrationScreen");
                  }}
                >
                  <Text style={defaultStyles.isExistAccountText}>
                    Немає акаунту?
                    <Text style={defaultStyles.underlineText}>
                      Зареєструватися
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  formwrap: {
    paddingTop: 32,
    paddingBottom: 132,
    backgroundColor: "#FFFFFF",
  },
});

export default LoginScreen;
