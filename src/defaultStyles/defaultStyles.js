import { StyleSheet } from "react-native";

export const bluredInputStyles = [
  { backgroundColor: "#F6F6F6" },
  { borderColor: "#E8E8E8" },
];

export const focusedInputStyles = [
  { backgroundColor: "#FFFFFF" },
  { borderColor: "#FF6C00" },
];

export const noPhotoButtonStyles = [[{ color: "#FF6C00" }]];

export const yesPhotoButtonStyles = [
  [{ color: "#E8E8E8" }, { transform: [{ rotate: "-45deg" }] }],
];

export const buttonTextDisabledStyles = [
  {
    color: "#BDBDBD",
  },
];

export const buttonTextEnabledStyles = [
  {
    color: "#ffffff",
  },
];

export const buttonDisabledStyles = [
  {
    backgroundColor: "#F6F6F6",
  },
];

export const buttonEnabledStyles = [
  {
    backgroundColor: "#FF6C00",
  },
];

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  formwrap: {
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 66,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  header: {
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

  createPublicationInput: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  greyText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    paddingTop: 8,
    paddingBottom: 33,
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
  },

  isExistAccountText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
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

  underlineText: {
    textDecorationLine: "underline",
  },
});
