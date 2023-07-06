import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PhotoBG from "../../images/PhotoBG.png";
import LogoutIcon from "../../svg/log-out.svg";
import userPhoto from "../../images/userPhoto.jpg";
import { defaultStyles } from "../../defaultStyles/defaultStyles";

import UserPhoto from "../../Components/UserPhoto/UserPhoto";
import { logOut, userSelector } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { userPostsSelector } from "../../redux/posts/postsSlice";
import { fetchUserPosts } from "../../redux/posts/postsOperations";
import { useEffect } from "react";
import { PostElement } from "../../Components/PostElement/PostElement";

const ProfileScreen = () => {
  const posts = useSelector(userPostsSelector);
  const user = useSelector(userSelector);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
        <ScrollView>
          <View style={styles.paddingContainer}>
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
                <Text style={defaultStyles.header}>{user.displayName}</Text>
                <View>
                  {posts.map((post) => {
                    const { name, place, location, photoURL, commentsCount } =
                      post.data;
                    const { id } = post;
                    // console.log(id);
                    return (
                      <View key={id}>
                        <PostElement
                          name={name}
                          place={place}
                          location={location}
                          photoURL={photoURL}
                          commentsCount={commentsCount}
                          postId={id}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
    // zIndex: 2,
    // elevation: 3,
  },
  logoutButton: {
    position: "absolute",
    right: 16,
    top: 22,
  },

  paddingContainer: {
    paddingTop: 150,
  },
});

export default ProfileScreen;
