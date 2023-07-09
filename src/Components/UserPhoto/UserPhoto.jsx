import React, { useEffect, useState } from "react";
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
  // Image,
  Button,
} from "react-native";
import { Image } from "expo-image";
import ImagePickerExample from "../ImagePicker/ImagePicker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  isAvatarSelector,
  isLoggedInSelector,
  setAvatar,
  setAvatarUri,
  setIsAvatar,
  userAvatarUriSelector,
  userSelector,
} from "../../redux/auth/authSlice";
import { userAvatarUpdate, userUpdate } from "../../redux/auth/authOperations";
import { auth } from "../../firebase/config";
import noPhoto from "../../images/no-photo.png";

import { storage } from "../../firebase/config";
import { ref, uploadBytes, put, getDownloadURL } from "firebase/storage";

const UserPhoto = ({ photo }) => {
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);
  const userAvatar = useSelector(userSelector);
  const isAuth = useSelector(isLoggedInSelector);

  const avatarUri = useSelector(userAvatarUriSelector);

  const isAvatar = useSelector(isAvatarSelector);
  // const [avatar, setAvatar] = useState(null);
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
      console.log('uri in pickimage:', result.assets[0].uri);
      dispatch(setAvatarUri(result.assets[0].uri));
      return result.assets[0].uri;
      // setIsAvatar(true);
    } else {
      // setAvatar(null);
      setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
      // setIsAvatar(false);
    }
  };

  // const uploadAvatarToServer = async () => {
  //   const res = await fetch(avatarUri);
  //   const file = await res.blob();
  //   const uniquePostId = Date.now().toString();
  //   console.log(uniquePostId);
  //   const storageRef = ref(storage, `avatarsImages/${uniquePostId}`);
  //   await uploadBytes(storageRef, file);
  //   const downloadURL = await getDownloadURL(storageRef);
  //   // console.log("link", downloadURL);
  //   return downloadURL;
  // };

  const uploadAvatarToServer = async (uri) => {
      console.log('here upload avatar to server', uri);
      const res = await fetch(uri);
      const file = await res.blob();
      const uniquePostId = Date.now().toString();
      console.log(uniquePostId);
      const storageRef = ref(storage, `avatarsImages/${uniquePostId}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      // console.log("link", downloadURL);
      return downloadURL;
    };

  const addOrRemoveAvatar = async () => {
    // setIsAvatar(!isAvatar);
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
      console.log("isAvatar(in isAuth):", isAvatar);
      console.log("userData.photoURL", userData.photoURL);
      if (isAvatar) {
        dispatch(userAvatarUpdate(null));
        // dispatch(setIsAvatar(false));
        // dispatch(setAvatarUri(null));
        console.log("isAvatar(in isAuth) after:", isAvatar);
        // const user = auth.currentUser;
        // console.log(user);
        // let avatarUrl;
        // await pickImage();
        if (avatarUri) {
          // avatarUrl = await uploadAvatarToServer();
          // console.log(avatarUrl);
        } else {
          // avatarUrl = "null";
        }
        // dispatch(userAvatarUpdate(avatarUrl));
        // setAddPhotoButtonDynamicStyles(yesPhotoButtonStyles);
      } else {
        // setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
        // dispatch(setIsAvatar(true));
        // let avatarUrl;
        const uri = await pickImage();
        console.log('uri', uri);
        // if (avatarUri) {
        //   console.log("avatarUri", avatarUri);
        //   avatarUrl = await uploadAvatarToServer();
        //   console.log(avatarUrl);
        // } else {
        //   avatarUrl = "null";
        // }
        const avatarUrl = await uploadAvatarToServer(uri);
        console.log(avatarUrl);
        console.log("avatarUrl", avatarUrl);
        dispatch(userAvatarUpdate(avatarUrl));
        // dispatch(setAvatarUri(null));
        // console.log("here");
        // await userAvatarUpdate(null);
        // dispatch(userAvatarUpdate("null"));
        // const user = auth.currentUser;
        // console.log(user);

        // setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
      }
    }
  };

  // let avatar;

  // useEffect(() => {
  //   if (isAuth) {
  //     if (userData.photoURL) {
  //       avatar = userData.photoURL;
  //     } else {
  //       avatar = noPhoto;
  //     }
  //   }
  // }, [userData.photoURL]);

  // console.log(avatar);
  let avatar;
  if (isAuth) {
    if (isAvatar) {
      avatar = userData.photoURL;
      //  setAddPhotoButtonDynamicStyles(yesPhotoButtonStyles);
    } else {
      avatar = noPhoto;
      //  setAddPhotoButtonDynamicStyles(noPhotoButtonStyles);
    }
  }
  console.log("isAvatar in userPhoto before render:", isAvatar);

  useEffect(() => {
    console.log("useEffect:");
    if (isAvatar) {
      console.log("useEffect: in true");
      dispatch(setIsAvatar(true));
    } else {
      console.log("useEffect: in false");
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
