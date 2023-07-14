import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { isLoggedInSelector, userSelector } from "../../redux/auth/authSlice";
import { noAvatar } from "../../assets/constants/constants";

const UserData = () => {
  const userData = useSelector(userSelector);
  const isAuth = useSelector(isLoggedInSelector);

  let avatar;
  if (userData.photoURL) {
    avatar = userData.photoURL;
  } else {
    avatar = noAvatar;
  }

  return (
    <View style={styles.userDataContainer}>
      <View>
        {isAuth && <Image source={avatar} style={styles.userPhoto} />}
      </View>

      <View>
        {isAuth && (
          <View>
            <Text style={styles.nameText}>{userData.displayName}</Text>
            <Text style={styles.emailText}>{userData.email}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserData;

const styles = StyleSheet.create({
  userDataContainer: {
    paddingVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  nameText: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  emailText: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#BDBDBD",
  },
});
