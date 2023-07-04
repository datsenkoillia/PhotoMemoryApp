import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";

import { PostElement } from "../../Components/PostElement/PostElement";

import UserData from "../../Components/UserData/UserData";
import { useEffect, useState } from "react";
import { getDataFromFirestore } from "../../firebase/postsOperations";

const PostsScreen = () => {
  // const { params: newPost } = useRoute();
  // const posts = [
  //   {
  //     comments: [],
  //     id: "664",
  //     location: { latitude: 37.4220936, longitude: -122.083922 },
  //     name: "Rrrr",
  //     photoUri:
  //       "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540illiadatsenko%252FAwesomeProject/Camera/a948d8e7-efea-47c1-86ce-7592486e0e7a.jpg",
  //     place: "Yyyy",
  //   },
  //   {
  //     comments: [],
  //     id: "665",
  //     location: { latitude: 37.4220936, longitude: -122.083922 },
  //     name: "Guudd",
  //     photoUri:
  //       "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540illiadatsenko%252FAwesomeProject/Camera/83ec3c0a-6d00-4df2-8d95-5011857ffd08.jpg",
  //     place: "Oooll",
  //   },
  //   {
  //     comments: [],
  //     id: "666",
  //     location: { latitude: 37.4220936, longitude: -122.083922 },
  //     name: "Treeee",
  //     photoUri:
  //       "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540illiadatsenko%252FAwesomeProject/Camera/8be88b38-de7f-490c-871e-0140b527d45b.jpg",
  //     place: "Uuioo",
  //   },
  // ];
  // const posts = [newPost];
  const [posts, setPosts] = useState([]);
  // const posts = getDataFromFirestore();
  // console.log(posts);
  const fetchPosts = async () => {
    const gettedPosts = await getDataFromFirestore();
    // console.log("postsArray:", posts);
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
            const { name, place, location, photoURL, comments } = post.data;
            const { id } = post;
            console.log(id);
            return (
              <View key={id}>
                <PostElement
                  name={name}
                  place={place}
                  location={location}
                  photoURL={photoURL}
                  comments={comments}
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
