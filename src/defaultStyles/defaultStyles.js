import { StyleSheet } from "react-native";

export const bluredInputStyles = [
  { backgroundColor: "#F6F6F6" },
  { borderColor: "#E8E8E8" },
];

export const focusedInputStyles = [
  { backgroundColor: "#FFFFFF" },
  { borderColor: "#FF6C00" },
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

  image: {
    flex: 1,
    justifyContent: "flex-end",
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

  underlineText: {
    textDecorationLine: "underline",
  },
});