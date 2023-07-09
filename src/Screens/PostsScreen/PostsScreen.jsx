import { View, StyleSheet, ScrollView } from "react-native";

import { PostElement } from "../../Components/PostElement/PostElement";

import UserData from "../../Components/UserData/UserData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsSelector } from "../../redux/posts/postsSlice";
import { fetchPosts } from "../../redux/posts/postsOperations";
import { isLoggedInSelector } from "../../redux/auth/authSlice";

const PostsScreen = () => {
  const posts = useSelector(postsSelector);
  const isAuth = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();

  const sortedPosts = [...posts].sort((a, b) => {
    return b.data.createTime - a.data.createTime;
  });


  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isAuth && <UserData />}
      {posts && (
        <View style={styles.postsContainer}>
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
      )}
    </ScrollView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  postsContainer: {
    paddingBottom: 100,
  },
});
