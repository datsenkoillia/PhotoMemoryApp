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
import { useEffect, useState } from "react";

import SendIcon from "../../svg/send.svg";

import {
  bluredInputStyles,
  focusedInputStyles,
  defaultStyles,
} from "../../defaultStyles/defaultStyles";
import CommentElement from "../../Components/CommentElement/CommentElement";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/auth/authSlice";
import {
  getCommentsFromFirestore,
  updateDataInFirestore,
  writeCommentToFirestore,
} from "../../firebase/postsOperations";
import { fetchPosts, fetchUserPosts } from "../../redux/posts/postsOperations";

const CommentsScreen = () => {
  const {
    params: { photoURL, commentsss, postId, userName },
  } = useRoute();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [inputDynamicStyles, setInputDynamicStyles] =
    useState(bluredInputStyles);

  // console.log(postId);

  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  // console.log(user);

  const createComment = async () => {
    if (!text) {
      return;
    }
    // console.log(text);
    const newComment = {
      text,
      userName: user.displayName,
      userId: user.uid,
      createTime: Date.now(),
    };
    // console.log(newComment);
    await writeCommentToFirestore(newComment, postId);
    setText("");
    await fetchComments();
    dispatch(fetchPosts());
    dispatch(fetchUserPosts());
  };

  const fetchComments = async () => {
    const gettedComments = await getCommentsFromFirestore(postId);
    setComments(gettedComments);
    // console.log(gettedComments.length);
    const commentsCount = { commentsCount: gettedComments.length };

    await updateDataInFirestore(`posts`, postId, commentsCount);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // console.log(comments);

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
            {comments.map((comment) => {
              const {
                text,
                userName,
                userId,
                createTime,
                place,
                location,
                photoURL,
                comments,
              } = comment.data;
              // console.log(createTime);
              const { id } = comment;
              return (
                <View key={id}>
                  <CommentElement
                    text={text}
                    userName={userName}
                    userId={userId}
                    createTime={createTime}
                    // date={comment.date}
                    // avatar={comment.avatar}
                    id={id}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View style={styles.commentInputWrapper}>
        <TextInput
          placeholder="Коментувати..."
          // secureTextEntry={!isShowPassword}
          value={text}
          onChangeText={setText}
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
