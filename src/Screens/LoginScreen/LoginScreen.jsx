import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback, // імпорт компонента обгортки
  Keyboard, // імпорт компонента клавіатури
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PhotoBG from "../../images/PhotoBG.png";
import AddPhotoSVG from "../../svg/add.svg";
import {
  bluredInputStyles,
  focusedInputStyles,
} from "../../constants/app_constatns";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputEmailDynamicStyles, setInputEmailDynamicStyles] =
    useState(bluredInputStyles);

  const [inputPasswordDynamicStyles, setInputPasswordDynamicStyles] =
    useState(bluredInputStyles);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={PhotoBG}
          resizeMode="cover"
          // objectFit="cover"
          style={styles.image}
        >
          <View style={styles.formwrap}>
            <Text style={styles.header}>Увійти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
                style={[styles.input, ...inputEmailDynamicStyles]}
                onFocus={() => setInputEmailDynamicStyles(focusedInputStyles)}
                onBlur={() => setInputEmailDynamicStyles(bluredInputStyles)}
              />
            </KeyboardAvoidingView>

            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  placeholder="Пароль"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={[styles.input, ...inputPasswordDynamicStyles]}
                  onFocus={() =>
                    setInputPasswordDynamicStyles(focusedInputStyles)
                  }
                  onBlur={() =>
                    setInputPasswordDynamicStyles(bluredInputStyles)
                  }
                />
                <TouchableOpacity
                  style={styles.showPassButton}
                  onPress={() => {
                    console.log("You tapped the Показати button!");
                  }}
                >
                  <Text style={styles.showPassAreaText}>Показати</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log("You tapped the Зареєстуватися button!");
              }}
            >
              <Text style={styles.buttonText}> Зареєстуватися </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.isExistAccount}
              onPress={() => {
                console.log(
                  "You tapped the Немає акаунту? Зареєструватися button!"
                );
              }}
            >
              <Text style={styles.isExistAccountText}>
                Немає акаунту?
                <Text style={styles.underlineText}> Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
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

  formwrap: {
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  header: {
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },

  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
    marginTop: 27,
  },

  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },

  isExistAccount: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },

  isExistAccountText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  underlineText: {
    textDecorationLine: "underline",
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

  showPassButton: {
    position: "absolute",
    right: 16,
    paddingVertical: 15,
  },

  showPassAreaText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default LoginScreen;
