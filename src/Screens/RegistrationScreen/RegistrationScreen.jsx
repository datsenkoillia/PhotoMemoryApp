import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(login);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Реєстрація</Text>
      <TextInput
        placeholder="Логін"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />
      <TextInput
        placeholder="Адреса електронної пошти"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // flex: 1,
    padding: 24,
    backgroundColor: "#FFFF00",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#ecf0f1",
    // borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    // width: 160,
    // height: 35,
    // left: calc(50% - 160/2 + 0.5),
    // top: 0,
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: 33,

    // fontFamily: 'Roboto',
    // fontStyle: normal,
    // fontWeight: 500,
    // fontSize: 30,
    // lineHeight: 35,
    // textAlign: center,
    // letterSpacing: 0.01,

    color: "#212121",
  },
  input: {
    width: 343,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    // borderStyle: 'solid',
    marginBottom: 16,
    backgroundColor: "#F6F6F6",

    // border: 1 solid '#E8E8E8',
    borderRadius: 8,
    // borderColor: "#E8E8E8",
  },
});

export default RegistrationScreen;
