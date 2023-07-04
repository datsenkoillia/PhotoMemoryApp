import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/auth/authSlice";

const CommentElement = ({ text, date, avatar, id, userId, userName }) => {
  // console.log(text);

  const { uid } = useSelector(userSelector);
  // console.log(uid);
  // console.log(userId);

  const isAuthor = uid === userId;
  // console.log(isAuthor);

  return (
    <View
      style={[
        styles.commentItemWrapper,
        isAuthor && styles.commentItemWrapperIsAuthor,
      ]}
    >
      {/* <View>
        <Text>{userName}</Text>
      </View> */}
      <View>
        <Image source={avatar} style={styles.userPhoto} />
      </View>
      <View style={styles.commentTextWrapper}>
        <Text style={styles.commentText}>{text}</Text>
        <Text
          style={[styles.commentDate, isAuthor && styles.commentDateIsAutor]}
        >
          {date}
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

  commentDateIsAutor: {
    textAlign: "left",
  },

  commentTextWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
    width: 299,
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
