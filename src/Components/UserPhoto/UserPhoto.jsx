import React, { useState } from "react";
import {
  noPhotoButtonStyles,
  yesPhotoButtonStyles,
} from "../../defaultStyles/defaultStyles";
// import userPhoto from "../../images/userPhoto.jpg";
import AddPhotoSVG from "../../svg/add.svg";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

const UserPhoto = ({ photo }) => {
  const [isUserPhoto, setIsUserPhoto] = useState(false);
  const [addPhotoButtonDynamicStyles, setAddPhotoButtonDynamicStyles] =
    useState(noPhotoButtonStyles);

  const toggleUserPhoto = () => {
    setIsUserPhoto(!isUserPhoto);
    isUserPhoto
      ? setAddPhotoButtonDynamicStyles(noPhotoButtonStyles)
      : setAddPhotoButtonDynamicStyles(yesPhotoButtonStyles);
  };

  return (
    <View style={styles.photoWrapper}>
      {isUserPhoto && <Image source={photo} style={styles.userPhoto} />}
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
  );
};

export default UserPhoto;

const styles = StyleSheet.create({
  photoWrapper: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    top: -60,
    left: 141,
    borderRadius: 16,
    // elevation: 3,
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
    // zIndex: 9999,
  },
});
