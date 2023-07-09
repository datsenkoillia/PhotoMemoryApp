import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import { headerScreensStyles } from "../../defaultStyles/headerScreensStyles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

import ToolBarGridIcon from "../../svg/toolbar-grid.svg";
import ToolBarNewIcon from "../../svg/toolbar-new-active.svg";
import ToolBarUserIcon from "../../svg/toolbar-user.svg";
import LogoutIcon from "../../svg/log-out.svg";
import BackArrowIcon from "../../svg/arrow-left.svg";

import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";

const Home = () => {
  const Tabs = createBottomTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        tabBarStyle: {
          height: 71,
          paddingHorizontal: 60,
          paddingTop: 9,
          paddingBottom: 22,
          position: "absolute",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          unmountOnBlur: true,
          title: "Публікації",
          tabBarIcon: ToolBarGridIcon,
          ...headerScreensStyles,
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => {
                // console.log("You tapped the Logout button!");
                dispatch(logOut());
              }}
            >
              <LogoutIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          unmountOnBlur: true,
          title: "Створити публікацію",

          tabBarIcon: ToolBarNewIcon,
          ...headerScreensStyles,
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => {
                // console.log("You tapped the Back button!");
                navigation.navigate("PostsScreen");
              }}
            >
              <BackArrowIcon />
            </TouchableOpacity>
          ),

          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          unmountOnBlur: true,
          title: "Профіль",
          headerShown: false,

          tabBarIcon: ToolBarUserIcon,
          ...headerScreensStyles,
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
