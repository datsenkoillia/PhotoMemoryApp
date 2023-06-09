import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PhotoBG from "../../images/PhotoBG.png";
import userPhoto from "../../images/userPhoto.jpg";

import {
  bluredInputStyles,
  focusedInputStyles,
  defaultStyles,
} from "../../defaultStyles/defaultStyles";


import UserPhoto from "../../Components/UserPhoto/UserPhoto";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [inputLoginDynamicStyles, setInputLoginDynamicStyles] =
    useState(bluredInputStyles);

  const [inputEmailDynamicStyles, setInputEmailDynamicStyles] =
    useState(bluredInputStyles);

  const [inputPasswordDynamicStyles, setInputPasswordDynamicStyles] =
    useState(bluredInputStyles);

  
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };


  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={PhotoBG}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={[defaultStyles.container]}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "android" ? "padding" : "height"}
              keyboardVerticalOffset={-165}
            >
              <View style={[defaultStyles.formwrap]}>
                <UserPhoto photo={userPhoto} />
                <Text style={defaultStyles.header}>Реєстрація</Text>

                <TextInput
                  placeholder="Логін"
                  value={login}
                  onChangeText={setLogin}
                  style={[defaultStyles.input, ...inputLoginDynamicStyles]}
                  onFocus={() => setInputLoginDynamicStyles(focusedInputStyles)}
                  onBlur={() => setInputLoginDynamicStyles(bluredInputStyles)}
                />

                <TextInput
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                  style={[defaultStyles.input, ...inputEmailDynamicStyles]}
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
                  onPress={() => {
                    // console.log("You tapped the Зареєстуватися button!");
                    console.log(
                      `Registration user: {login: ${login}; email: ${email}; password: ${password}}`
                    );
                    navigation.navigate("Home", {
                      screen: "PostsScreen",
                      // params: { login: login, email: email }
                    });
                  }}
                >
                  <Text style={defaultStyles.buttonText}> Зареєстуватися </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={defaultStyles.isExistAccount}
                  onPress={() => {
                    console.log("You tapped the Вже є акаунт? Увійти button!");
                    navigation.navigate("LoginScreen");
                  }}
                >
                  <Text style={defaultStyles.isExistAccountText}>
                    Вже є акаунт? Увійти
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
  addphotoWrapper: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    top: -60,
    left: 141,
    borderRadius: 16,
  },

  addPhotoButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
    // transform: [{ rotate: "-45deg" }],
  },

  userPhoto: {
    // flex: 1,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});

export default RegistrationScreen;
