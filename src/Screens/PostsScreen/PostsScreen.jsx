import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";

import { PostElement } from "../../Components/PostElement/PostElement";

import UserData from "../../Components/UserData/UserData";

const PostsScreen = () => {
  const { params: newPost } = useRoute();
  const posts = [
    {
      id: "541",
      location: { latitude: 37.4220936, longitude: -122.083922 },
      name: "Home",
      photoUri:
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540illiadatsenko%252FAwesomeProject/Camera/543acb10-f92f-401f-a4ac-57f45fb46da9.jpg",
      place: "Here",
    },
    {
      id: "543",
      location: { latitude: 37.4220936, longitude: -122.083922 },
      name: "ewPost",
      photoUri:
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540illiadatsenko%252FAwesomeProject/Camera/7d00a39d-7a3f-4af0-9ec7-97c27cc6cba7.jpg",
      place: "Rrrr",
    },
    {
      id: "558",
      location: { latitude: 37.4220936, longitude: -122.083922 },
      name: "Yyyyyy",
      photoUri:
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540illiadatsenko%252FAwesomeProject/Camera/291c801a-bf41-44d3-a776-4629beaa050c.jpg",
      place: "Eeeeee",
    },
  ];
  // const posts = [newPost];

  return (
    // <ScrollView style={styles.container}>
    //   <UserData />
    //   {newPost && (
    //     <View style={styles.postsContainer}>
    //       {posts.map((post) => (
    //         <View key={post.id}>
    //           <PostElement
    //             name={post.name}
    //             place={post.place}
    //             location={post.location}
    //             photoUri={post.photoUri}
    //             comments={post.comments}
    //           />
    //         </View>
    //       ))}
    //     </View>
    //   )}
    // </ScrollView>

    <View style={styles.container}>
      <UserData />
      {newPost && (
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostElement
                name={item.name}
                place={item.place}
                location={item.location}
                photoUri={item.photoUri}
                comments={item.comments}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
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
