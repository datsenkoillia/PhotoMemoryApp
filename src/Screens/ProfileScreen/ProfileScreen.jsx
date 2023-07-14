import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

import PhotoBG from "../../images/PhotoBG.png";
import LogoutIcon from "../../svg/log-out.svg";
import { defaultStyles } from "../../defaultStyles/defaultStyles";

import UserPhoto from "../../Components/UserPhoto/UserPhoto";
import { userSelector } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { userPostsSelector } from "../../redux/posts/postsSlice";
import { fetchUserPosts } from "../../redux/posts/postsOperations";
import { useEffect } from "react";
import { PostElement } from "../../Components/PostElement/PostElement";
import { logOut } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const posts = useSelector(userPostsSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  const sortedPosts = [...posts].sort((a, b) => {
    return b.data.createTime - a.data.createTime;
  });

  useEffect(() => {
    dispatch(fetchUserPosts(user.uid));
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
        {user && (
          <ScrollView>
            <View style={styles.paddingContainer}>
              <View style={[defaultStyles.container]}>
                <View style={[defaultStyles.formwrap, styles.contentContainer]}>
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                      // console.log("You tapped the Logout button!");
                      dispatch(logOut());
                    }}
                  >
                    <LogoutIcon />
                  </TouchableOpacity>
                  <UserPhoto />
                  <Text style={defaultStyles.header}>{user.displayName}</Text>
                  <View>
                    {sortedPosts.map((post) => {
                      const { name, place, location, photoURL, commentsCount } =
                        post.data;
                      const { id } = post;
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
        )}
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
    minHeight: 800,
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
