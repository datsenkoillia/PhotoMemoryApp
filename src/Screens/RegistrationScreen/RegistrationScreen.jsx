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
} from "react-native";
import PhotoBG from "../../images/PhotoBG.png";
import userPhoto from "../../images/userPhoto.jpg";
import AddPhotoSVG from "../../svg/add.svg";
import {
  bluredInputStyles,
  focusedInputStyles,
  noPhotoButtonStyles,
  yesPhotoButtonStyles,
  defaultStyles,
} from "../../defaultStyles/defaultStyles";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isUserPhoto, setIsUserPhoto] = useState(false);

  const [inputLoginDynamicStyles, setInputLoginDynamicStyles] =
    useState(bluredInputStyles);

  const [inputEmailDynamicStyles, setInputEmailDynamicStyles] =
    useState(bluredInputStyles);

  const [inputPasswordDynamicStyles, setInputPasswordDynamicStyles] =
    useState(bluredInputStyles);

  const [addPhotoButtonDynamicStyles, setAddPhotoButtonDynamicStyles] =
    useState(noPhotoButtonStyles);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleUserPhoto = () => {
    setIsUserPhoto(!isUserPhoto);
    isUserPhoto
      ? setAddPhotoButtonDynamicStyles(noPhotoButtonStyles)
      : setAddPhotoButtonDynamicStyles(yesPhotoButtonStyles);
  };

  return (
    <View style={[defaultStyles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "android" ? "padding" : "height"}
        keyboardVerticalOffset={-165}
      >
        <View style={[defaultStyles.formwrap]}>
          <View style={styles.addphotoWrapper}>
            {isUserPhoto && (
              <Image source={userPhoto} style={styles.userPhoto} />
            )}
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={() => {
                console.log("You tapped the addphoto button!");
                toggleUserPhoto();
              }}
            >
              <AddPhotoSVG style={addPhotoButtonDynamicStyles} />
            </TouchableOpacity>
          </View>
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
              onFocus={() => setInputPasswordDynamicStyles(focusedInputStyles)}
              onBlur={() => setInputPasswordDynamicStyles(bluredInputStyles)}
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
            }}
          >
            <Text style={defaultStyles.buttonText}> Зареєстуватися </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={defaultStyles.isExistAccount}
            onPress={() => {
              console.log("You tapped the Вже є акаунт? Увійти button!");
            }}
          >
            <Text style={defaultStyles.isExistAccountText}>
              Вже є акаунт? Увійти
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
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
