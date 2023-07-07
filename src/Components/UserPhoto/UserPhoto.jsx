import React, { useState } from "react";
import {
  noPhotoButtonStyles,
  yesPhotoButtonStyles,
} from "../../defaultStyles/defaultStyles";
// import userPhoto from "../../images/userPhoto.jpg";
import AddPhotoSVG from "../../svg/add.svg";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import ImagePickerExample from "../ImagePicker/ImagePicker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvatar,
  setAvatarUri,
  userAvatarUriSelector,
} from "../../redux/auth/authSlice";

const UserPhoto = ({ photo }) => {
  const dispatch = useDispatch();
  const avatar = useSelector(userAvatarUriSelector);

  const [isAvatar, setIsAvatar] = useState(false);
  // const [avatar, setAvatar] = useState(null);
  const [addPhotoButtonDynamicStyles, setAddPhotoButtonDynamicStyles] =
    useState(noPhotoButtonStyles);

  // const toggleUserPhoto = () => {
  //   setIsAvatar(!isAvatar);
  //   avatar
  //     ? setAddPhotoButtonDynamicStyles(noPhotoButtonStyles)
  //     : setAddPhotoButtonDynamicStyles(yesPhotoButtonStyles);
  // };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      let filename = result?.assets[0].uri.substring(
        result?.assets[0].uri.lastIndexOf("/") + 1,
        result?.assets[0].uri.length
      );

      delete result.cancelled;
      result = {
        ...result,
        name: filename,
      };
      console.log(result.assets[0].uri);
      dispatch(setAvatarUri(result.assets[0].uri));
      // setIsAvatar(true);
    } else {
      // setAvatar(null);
      setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
    }
  };

  const addOrRemoveAvatar = () => {
    // setIsAvatar(!isAvatar);
    if (!avatar) {
      pickImage();
      setAddPhotoButtonDynamicStyles(yesPhotoButtonStyles);
    } else {
      dispatch(setAvatarUri(undefined));
      setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
    }
  };

  console.log(avatar);

  return (
    <>
      <View style={styles.photoWrapper}>
        {avatar && <Image source={{ uri: avatar }} style={styles.userPhoto} />}
        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={
            addOrRemoveAvatar
            // console.log("You tapped the addphoto button!");
            // toggleUserPhoto();
            // pickImage();
            // ImagePickerExample();
          }
        >
          <AddPhotoSVG style={addPhotoButtonDynamicStyles} />
        </TouchableOpacity>
      </View>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View> */}
    </>
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
