import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/auth/authSlice";

const CommentElement = ({ text, avatar, userId, createTime }) => {
  const { uid } = useSelector(userSelector);

  const isAuthor = uid === userId;

  const commentDay = new Date(createTime).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const commentTime = new Date(createTime).toTimeString().slice(0, 5);

  const commentDate = `${commentDay}` + ` | ` + `${commentTime}`;

  return (
    <View
      style={[
        styles.commentItemWrapper,
        isAuthor && styles.commentItemWrapperIsAuthor,
      ]}
    >
      <View>
        <Image source={avatar} style={styles.userPhoto} />
      </View>
      <View
        style={[
          styles.commentTextWrapper,
          isAuthor && styles.commentTextWrapperIsAuthor,
        ]}
      >
        <Text style={styles.commentText}>{text}</Text>
        <Text
          style={[styles.commentDate, isAuthor && styles.commentDateIsAuthor]}
        >
          {commentDate}
        </Text>
      </View>
    </View>
  );
};

export default CommentElement;

const styles = StyleSheet.create({
  userDataContainer: {
    paddingVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  userPhoto: {
    width: 28,
    height: 28,
    borderRadius: 28,
  },

  imageWrapper: {
    height: 240,
    // marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },

  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },

  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    marginTop: 8,
    textAlign: "right",
    lineHeight: 13,
    color: "#BDBDBD",
  },

  commentDateIsAuthor: {
    textAlign: "left",
  },

  commentTextWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    width: 299,
  },

  commentTextWrapperIsAuthor: {
    borderTopRightRadius: 0,
  },

  commentItemWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },

  commentItemWrapperIsAuthor: {
    flexDirection: "row-reverse",
  },
});
