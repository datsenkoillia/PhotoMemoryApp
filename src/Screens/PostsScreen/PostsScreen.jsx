import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";

import { PostElement } from "../../Components/PostElement/PostElement";

import UserData from "../../Components/UserData/UserData";
import { useEffect, useState } from "react";
import { getDataFromFirestore } from "../../firebase/postsOperations";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const gettedPosts = await getDataFromFirestore();

    setPosts(gettedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("posts", posts);

  return (
    <ScrollView style={styles.container}>
      <UserData />
      {posts && (
        <View style={styles.postsContainer}>
          {posts.map((post) => {
            const { name, place, location, photoURL, commentsCount } =
              post.data;
            const { id } = post;
            console.log(id);
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
      {/* {posts && (
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id}>
              <PostElement
                name={post.name}
                place={post.place}
                location={post.location}
                photoURL={post.photoURL}
                comments={post.comments}
              />
            </View>
          ))}
        </View>
      )} */}
    </ScrollView>

    // <View style={styles.container}>
    //   <UserData />
    //   {newPost && (
    //     <View style={styles.postsContainer}>
    //       <FlatList
    //         data={posts}
    //         renderItem={({ item }) => (
    //           <PostElement
    //             name={item.name}
    //             place={item.place}
    //             location={item.location}
    //             photoUri={item.photoUri}
    //             comments={item.comments}
    //           />
    //         )}
    //         keyExtractor={(item) => item.id.toString()}
    //       />
    //     </View>
    //   )}
    // </View>
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
