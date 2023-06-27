import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PhotoBG from "../../images/PhotoBG.png";
import LogoutIcon from "../../svg/log-out.svg";
import userPhoto from "../../images/userPhoto.jpg";
import { defaultStyles } from "../../defaultStyles/defaultStyles";

import UserPhoto from "../../Components/UserPhoto/UserPhoto";
import { logOut } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
        <View style={[defaultStyles.container]}>
          <View style={[defaultStyles.formwrap, styles.contentContainer]}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                console.log("You tapped the Logout button!");
                dispatch(logOut());
                // navigation.navigate("LoginScreen");
              }}
            >
              <LogoutIcon />
            </TouchableOpacity>
            <UserPhoto photo={userPhoto} />
            <Text style={defaultStyles.header}>Natali Romanova</Text>
            <View>
              <Text>Posts</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  contentContainer: {
    minHeight: 600,
  },
  logoutButton: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});

export default ProfileScreen;
