import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";
import { Image } from "expo-image";



const CommentsScreen = () => {
  const {
    params: { photoUri, comments },
  } = useRoute();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={photoUri} style={styles.image} />
      </View>
      <View><Text>Тут будуть коментарі</Text></View>
      {comments.length > 0 && (
        <View style={styles.commentsContainer}>
          {comments.map((comment) => (
            <View key={comment.id}>
              <CommentElement text={comment.text} date={comment.date} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  commentsContainer: {
    paddingBottom: 100,
  },

  imageWrapper: {
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },

  image: {
    position: "absolute",
    top: -140,
    bottom: -140,
    right: 0,
    left: 0,
  },
});

