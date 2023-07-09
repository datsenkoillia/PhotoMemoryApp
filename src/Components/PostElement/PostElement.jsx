import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";

import CommentGreyIcon from "../../svg/message-circle.svg";
import CommentOrangeIcon from "../../svg/message-circle-filled.svg";
import LocationIcon from "../../svg/map-pin.svg";

export const PostElement = ({
  name,
  place,
  location,
  photoURL,
  commentsCount,
  postId,
  userId,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.postWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={photoURL} style={styles.image} />
        </View>
        <View style={styles.postName}>
          <Text style={styles.postNameText}>
            {name ? `${name}` : "Без назви"}
          </Text>
        </View>
        <View style={styles.detailsWrap}>
          <View style={styles.commentsWrap}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CommentsScreen", {
                  photoURL,
                  postId,
                  userId,
                });
              }}
            >
              {commentsCount === 0 ? (
                <CommentGreyIcon />
              ) : (
                <CommentOrangeIcon />
              )}
            </TouchableOpacity>

            <Text
              style={[
                styles.commentText,
                commentsCount > 0 && styles.commentTextActive,
              ]}
            >
              {commentsCount}
            </Text>
          </View>
          <View style={styles.locationWrap}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MapScreen", { location, name, place });
              }}
            >
              <LocationIcon />
            </TouchableOpacity>

            <Text style={styles.locationText}>
              {place ? `${place}` : "Не зазначено"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  postWrapper: {
    marginBottom: 32,
  },

  imageWrapper: {
    height: 240,
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

  detailsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  postName: {
    marginBottom: 8,
  },

  postNameText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  commentsWrap: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },

  locationWrap: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  commentTextActive: {
    color: "#212121",
  },

  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
