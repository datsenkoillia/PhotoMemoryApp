import React, { useEffect, useState } from "react";
import {
  noPhotoButtonStyles,
  yesPhotoButtonStyles,
} from "../../defaultStyles/defaultStyles";
import AddPhotoSVG from "../../svg/add.svg";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  isAvatarSelector,
  isLoggedInSelector,
  setAvatarUri,
  setIsAvatar,
  userAvatarUriSelector,
  userSelector,
} from "../../redux/auth/authSlice";
import { userAvatarUpdate } from "../../redux/auth/authOperations";

import noPhoto from "../../images/no-photo.png";

import { storage } from "../../firebase/config";
import { ref, uploadBytes, put, getDownloadURL } from "firebase/storage";

const UserPhoto = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);
  const isAuth = useSelector(isLoggedInSelector);
  const avatarUri = useSelector(userAvatarUriSelector);
  const isAvatar = useSelector(isAvatarSelector);

  const [addPhotoButtonDynamicStyles, setAddPhotoButtonDynamicStyles] =
    useState(noPhotoButtonStyles);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

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
      dispatch(setAvatarUri(result.assets[0].uri));
      return result.assets[0].uri;
    } else {
      setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
    }
  };

  const uploadAvatarToServer = async (uri) => {
    const res = await fetch(uri);
    const file = await res.blob();
    const uniquePostId = Date.now().toString();
    // console.log(uniquePostId);
    const storageRef = ref(storage, `avatarsImages/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const addOrRemoveAvatar = async () => {
    if (!isAuth) {
      if (!avatarUri) {
        pickImage();
        setAddPhotoButtonDynamicStyles(yesPhotoButtonStyles);
      } else {
        dispatch(setAvatarUri(null));
        setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
      }
    }
    if (isAuth) {
      if (isAvatar) {
        dispatch(userAvatarUpdate(null));
      } else {
        const uri = await pickImage();
        const avatarUrl = await uploadAvatarToServer(uri);
        dispatch(userAvatarUpdate(avatarUrl));
      }
    }
  };

  let avatar;
  if (isAuth) {
    if (isAvatar) {
      avatar = userData.photoURL;
    } else {
      avatar = noPhoto;
    }
  }

  useEffect(() => {
    if (isAvatar) {
      dispatch(setIsAvatar(true));
    } else {
      dispatch(setIsAvatar(false));
    }
  }, [isAvatar]);

  return (
    <>
      {!isAuth && (
        <View style={styles.photoWrapper}>
          {avatarUri && (
            <Image source={{ uri: avatarUri }} style={styles.userPhoto} />
          )}
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={addOrRemoveAvatar}
          >
            <AddPhotoSVG style={addPhotoButtonDynamicStyles} />
          </TouchableOpacity>
        </View>
      )}
      {isAuth && (
        <View style={styles.photoWrapper}>
          <Image source={avatar} style={styles.userPhoto} />

          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={addOrRemoveAvatar}
          >
            {isAvatar ? (
              <AddPhotoSVG style={yesPhotoButtonStyles} />
            ) : (
              <AddPhotoSVG style={noPhotoButtonStyles} />
            )}
          </TouchableOpacity>
        </View>
      )}
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
  },

  addPhotoButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },

  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});
