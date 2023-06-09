import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const PostsScreen = () => {
  // const {
  //   params: { login, email },
  // } = useRoute();

  return (
    <View>
      <Text>PostsScreen</Text>
      {/* {login && <Text>{login}</Text>}
      {email && <Text>{email}</Text>} */}
    </View>
  );
};

export default PostsScreen;
