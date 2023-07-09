import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  defaultStyles,
  buttonTextDisabledStyles,
  buttonTextEnabledStyles,
  buttonEnabledStyles,
  buttonDisabledStyles,
} from "../../defaultStyles/defaultStyles";
import CameraShotButton from "../../svg/camera-shot-button.svg";
import CameraFlipButton from "../../svg/flip-camera.svg";
import TrashButton from "../../svg/trash.svg";

import { useNavigation } from "@react-navigation/native";

import { storage } from "../../firebase/config";
import { ref, uploadBytes, put, getDownloadURL } from "firebase/storage";
import { writeDataToFirestore } from "../../firebase/postsOperations";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/auth/authSlice";

export default function CreatePost() {
  const navigation = useNavigation();
  const user = useSelector(userSelector);

  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [photoId, setPhotoId] = useState(null);
  const [isPhotoTake, setIsPhotoTake] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const buttonTextDynamicStyles = isPhotoTake
    ? buttonTextEnabledStyles
    : buttonTextDisabledStyles;

  const buttonDynamicStyles = isPhotoTake
    ? buttonEnabledStyles
    : buttonDisabledStyles;

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const uploadPhotoToServer = async () => {
    const res = await fetch(photoUri);
    const file = await res.blob();
    const uniquePostId = Date.now().toString();
    console.log(uniquePostId);
    const storageRef = ref(storage, `postsImages/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const createPost = async () => {
    const url = await uploadPhotoToServer();
    let locationGet = await Location.getCurrentPositionAsync();
    console.log(locationGet);

    const coords = {
      latitude: locationGet.coords.latitude,
      longitude: locationGet.coords.longitude,
    };

    const newPost = {
      userId: user.uid,
      userName: user.displayName,
      id: photoId,
      name,
      place,
      photoUri,
      photoURL: url,
      location: coords,
      commentsCount: 0,
      createTime: Date.now(),
    };
    console.log(newPost);
    writeDataToFirestore(newPost);
    navigation.navigate("PostsScreen");

    setName("");
    setPlace("");
    setPhotoUri(null);
    setIsPhotoTake(false);
  };

  const clearPost = () => {
    setName("");
    setPlace("");
    if (photoId) {
      MediaLibrary.deleteAssetsAsync(photoId);
    }
    setPhotoUri(null);
    setIsPhotoTake(false);
  };

  if (hasPermission === null) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          {!isPhotoTake && (
            <View style={styles.cameraWrapper}>
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.photoView}></View>
              </Camera>
              <TouchableOpacity
                style={styles.cameraShotButton}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    setIsPhotoTake(true);
                    setPhotoUri(uri);
                    setPhotoId(asset.id);
                  }
                }}
              >
                <View>
                  <CameraShotButton />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={toggleCameraType}
              >
                <View>
                  <CameraFlipButton />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {isPhotoTake && (
            <View style={styles.cameraWrapper}>
              <Image source={photoUri} style={styles.image} />
            </View>
          )}
          <View>
            <TouchableOpacity
              onPress={() => {
                setIsPhotoTake(false);
                setPhotoUri(null);
                console.log(photoId);
                MediaLibrary.deleteAssetsAsync(photoId);
              }}
            >
              <Text style={defaultStyles.greyText}>
                {!isPhotoTake ? "Завантажте фото" : "Редагувати фото"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              source={{
                uri: photoUri,
              }}
            />
          </View>
          {/* )} */}

          <KeyboardAvoidingView
            behavior={Platform.OS == "android" ? "padding" : "height"}
            keyboardVerticalOffset={-165}
          >
            <View>
              <TextInput
                placeholder="Назва..."
                value={name}
                onChangeText={setName}
                style={defaultStyles.createPublicationInput}
                placeholderTextColor={"#BDBDBD"}
              />

              <TextInput
                placeholder="Місцевість..."
                value={place}
                onChangeText={setPlace}
                style={defaultStyles.createPublicationInput}
                placeholderTextColor={"#BDBDBD"}
              />

              <TouchableOpacity
                disabled={!isPhotoTake}
                style={[defaultStyles.button, ...buttonDynamicStyles]}
                onPress={createPost}
              >
                <Text
                  style={[defaultStyles.buttonText, ...buttonTextDynamicStyles]}
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View>
          <TouchableOpacity
            style={styles.trashButton}
            onPress={() => {
              clearPost();
            }}
          >
            <TrashButton />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },

  cameraWrapper: {
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },

  camera: {
    position: "absolute",
    top: -140,
    bottom: -140,
    right: 0,
    left: 0,
  },

  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  flipContainer: {
    position: "absolute",
    top: 10,
    right: -10,
  },

  cameraShotButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },

  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },

  button: {
    position: "absolute",
    alignSelf: "center",
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },

  image: {
    position: "absolute",
    top: -140,
    bottom: -140,
    right: 0,
    left: 0,
  },

  descriptionWrapper: {
    justifyContent: "space-between",
  },

  trashButton: {
    alignItems: "center",
    marginBottom: 22,
  },
});
