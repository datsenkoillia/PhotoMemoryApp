import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import userPhoto from "../../images/userPhoto.jpg";
import { useSelector } from "react-redux";
import { isLoggedInSelector, userSelector } from "../../redux/auth/authSlice";

const UserData = () => {
  const userData = useSelector(userSelector);
  const isAuth = useSelector(isLoggedInSelector);
  // console.log(userData.email);
  // console.log(isAuth);

  return (
    <View style={styles.userDataContainer}>
      <View>
        <Image source={userPhoto} style={styles.userPhoto} />
      </View>

      <View>
        {isAuth && <View>
          <Text style={styles.nameText}>{userData.displayName}</Text>
          {/* </View>
        <View> */}
          <Text style={styles.emailText}>{userData.email}</Text>
        </View>}
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
