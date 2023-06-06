import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  bluredInputStyles,
  focusedInputStyles,
  defaultStyles,
} from "../../defaultStyles/defaultStyles";

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

  return (
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
              onFocus={() => setInputPasswordDynamicStyles(focusedInputStyles)}
              onBlur={() => setInputPasswordDynamicStyles(bluredInputStyles)}
            />
            <TouchableOpacity
              style={defaultStyles.showPassButton}
              onPress={() => {
                console.log(`You tapped the ${!isShowPassword ? "Показати" : "Cховати"} button!`);
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
              // console.log("You tapped the Увійти button!");
              console.log(
                `Login user: {login: email: ${email}; password: ${password}}`
              );
            }}
          >
            <Text style={defaultStyles.buttonText}> Увійти </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={defaultStyles.isExistAccount}
            onPress={() => {
              console.log(
                "You tapped the Немає акаунту? Зареєструватися button!"
              );
            }}
          >
            <Text style={defaultStyles.isExistAccountText}>
              Немає акаунту?
              <Text style={defaultStyles.underlineText}> Зареєструватися</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  formwrap: {
    paddingTop: 32,
    paddingBottom: 132,
    backgroundColor: "#FFFFFF",
  },
});

export default LoginScreen;
