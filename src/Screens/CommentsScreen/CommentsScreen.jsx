import { useRoute } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";

import SendIcon from "../../svg/send.svg";

import {
  bluredInputStyles,
  focusedInputStyles,
  defaultStyles,
} from "../../defaultStyles/defaultStyles";
import CommentElement from "../../Components/CommentElement/CommentElement";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/auth/authSlice";
import {
  updateDataInFirestore,
  writeCommentToFirestore,
} from "../../firebase/postsOperations";

const CommentsScreen = () => {
  // const commentss = [
  //   {
  //     date: "2023-07-03T00:19:39.370Z",
  //     name: "Marco Streich",
  //     avatar:
  //       "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/988.jpg",
  //     text: "Reiciendis esse suscipit perferendis.",
  //     id: "3",
  //   },
  //   {
  //     date: "2023-07-03T09:50:42.800Z",
  //     name: "Erik Denesik",
  //     avatar:
  //       "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1017.jpg",
  //     text: "impedit tempora earum",
  //     id: "4",
  //   },
  //   {
  //     date: "2023-07-02T23:36:00.948Z",
  //     name: "Ellis Leannon",
  //     avatar:
  //       "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/342.jpg",
  //     text: "Beatae esse dignissimos ullam maxime nemo quaerat maiores ducimus eum.",
  //     id: "5",
  //   },
  //   {
  //     date: "2023-07-03T10:23:02.874Z",
  //     name: "Walter Koch V",
  //     avatar:
  //       "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/495.jpg",
  //     text: "Doloremque magnam perferendis adipisci doloremque at et doloremque. Ea iste hic illo distinctio. Facere illum expedita voluptas saepe aperiam expedita dolorum sunt. Earum expedita ratione voluptates fuga id tempora esse quos. At odit corrupti suscipit accusantium ratione.\nVoluptatem molestiae eligendi totam fugit itaque dolorem natus dolorem. Animi rerum repellendus maxime repudiandae qui aut minus. Enim recusandae sunt consequuntur explicabo ducimus dolorum mollitia vel reprehenderit. Nulla recusandae dolor reprehenderit ea. Assumenda nam distinctio dicta vitae ut vel animi soluta. Voluptatum quae commodi expedita iusto eaque odio voluptatibus dignissimos.\nBlanditiis eum velit labore accusamus nemo. Consequatur possimus dolores suscipit quos quia impedit aut ipsam. Magnam vel sunt. Tenetur expedita sapiente dicta facere et occaecati error perferendis. Dignissimos dolorum maiores odio nihil voluptas fuga aut debitis rem. Ipsum nemo tempore sequi inventore illo ex tempore quidem numquam.",
  //     id: "6",
  //   },
  //   {
  //     date: "2023-07-03T07:13:37.283Z",
  //     name: "Pedro Skiles",
  //     avatar:
  //       "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/48.jpg",
  //     text: "Ab minus cum accusamus hic nostrum nihil.",
  //     id: "7",
  //   },
  //   {
  //     date: "2023-07-03T13:01:01.178Z",
  //     name: "Casey Zemlak",
  //     avatar:
  //       "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1183.jpg",
  //     text: "Consectetur recusandae nisi excepturi inventore debitis. Deleniti eaque voluptas odit veniam optio. Laboriosam ipsam autem laboriosam magni hic. Tempora nobis nemo et fuga nostrum expedita aperiam voluptates. Ratione mollitia alias odio soluta rerum. Possimus consequuntur voluptatem perspiciatis dolores rem quod debitis.",
  //     id: "8",
  //   },
  //   {
  //     date: "2023-07-03T18:58:24.997Z",
  //     name: "Miss Ivan Ritchie",
  //     avatar:
  //       "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/185.jpg",
  //     text: "distinctio",
  //     id: "9",
  //   },
  // ];

  const {
    params: { photoURL, comments, postId, userName },
  } = useRoute();
  const [comment, setComment] = useState("");
  const [inputDynamicStyles, setInputDynamicStyles] =
    useState(bluredInputStyles);

  console.log(postId);

  const user = useSelector(userSelector);
  console.log(user.displayName);

  const createComment = async () => {
    const newComment = {
      comment,
      userName: user.displayName,
    };
    writeCommentToFirestore(newComment, postId);
    // updateDataInFirestore('comments', postId, newComment);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={photoURL} style={styles.image} />
        </View>
        {/* <View>
          <Text>Тут будуть коментарі</Text>
        </View> */}
        {comments.length > 0 && (
          <View style={styles.commentsContainer}>
            {comments.map((comment) => (
              <View key={comment.id}>
                <CommentElement
                  text={comment.text}
                  date={comment.date}
                  avatar={comment.avatar}
                  id={comment.id}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.commentInputWrapper}>
        <TextInput
          placeholder="Коментувати..."
          // secureTextEntry={!isShowPassword}
          value={comment}
          onChangeText={setComment}
          style={[
            defaultStyles.input,
            styles.commentInput,
            ...inputDynamicStyles,
          ]}
          placeholderTextColor={"#BDBDBD"}
          onFocus={() => setInputDynamicStyles(focusedInputStyles)}
          onBlur={() => setInputDynamicStyles(bluredInputStyles)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            console.log(`You tapped the addcoment button!`);
            createComment();
          }}
        >
          <SendIcon />
        </TouchableOpacity>
      </View>
    </>
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
    paddingBottom: 20,
  },

  imageWrapper: {
    height: 240,
    marginTop: 32,
    marginBottom: 32,
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

  commentInputWrapper: {
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  commentInput: {
    borderRadius: 34,
    paddingRight: 55,
  },

  sendButton: {
    position: "absolute",
    right: 16,
    padding: 8,
  },
});
