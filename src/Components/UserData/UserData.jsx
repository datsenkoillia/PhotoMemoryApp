import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import userPhoto from "../../images/userPhoto.jpg";

const UserData = () => {
  return (
    <View style={styles.userDataContainer}>
      <View>
        <Image source={userPhoto} style={styles.userPhoto} />
      </View>

      <View>
        <View>
          <Text style={styles.nameText}>Name Surname</Text>
          {/* </View>
        <View> */}
          <Text style={styles.emailText}>mail@mail.com</Text>
        </View>
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
