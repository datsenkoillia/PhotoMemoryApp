import { useRoute } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
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
    params: { photoURL, postId },
  } = useRoute();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [inputDynamicStyles, setInputDynamicStyles] =
    useState(bluredInputStyles);

  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const createComment = async () => {
    if (!text) {
      return;
    }

    const newComment = {
      text,
      userName: user.displayName,
      userId: user.uid,
      avatar: user.photoURL,
      createTime: Date.now(),
    };

    await writeCommentToFirestore(newComment, postId);
    setText("");
    await fetchComments();
    dispatch(fetchPosts());
    dispatch(fetchUserPosts());
  };

  const fetchComments = async () => {
    const gettedComments = await getCommentsFromFirestore(postId);

    if (gettedComments.length > 0) {
      const sortedComments = [...gettedComments].sort((a, b) => {
        return b.data.createTime - a.data.createTime;
      });
       setComments(sortedComments);
    }

    const commentsCount = { commentsCount: gettedComments.length };
    await updateDataInFirestore(`posts`, postId, commentsCount);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={photoURL} style={styles.image} />
        </View>
        {comments.length > 0 && (
          <View style={styles.commentsContainer}>
            {comments.map((comment) => {
              const { text, userName, userId, createTime, avatar } =
                comment.data;
              const { id } = comment;
              return (
                <View key={id}>
                  <CommentElement
                    text={text}
                    userName={userName}
                    userId={userId}
                    createTime={createTime}
                    avatar={avatar}
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
            // console.log(`You tapped the addcoment button!`);
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
