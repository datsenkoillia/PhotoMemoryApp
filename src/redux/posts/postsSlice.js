import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchUserPosts } from "./postsOperations";
// import { persistReducer } from "redux-persist";
// import { register, logIn, logOut, authStateChanged } from "./authOperations";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const handleFulfilledRegister = (state, { payload }) => {
//   const { displayName, email, uid } = payload;
//   const userData = { displayName, email, uid };
//   state.userData = userData;
//   // console.log("here signin");
//   state.isLoggedIn = true;
// };

// const handleFulfilledLogin = (state, { payload }) => {
//   const { displayName, email, uid } = payload;
//   const userData = { displayName, email, uid };
//   state.userData = userData;
//   // console.log("here login");
//   state.isLoggedIn = true;
//   // console.log("стейт после логина", state);
// };

// const handleFulfilledLogout = (state) => {
//   state.userData = null;
//   state.isLoggedIn = false;
// };

// const handleFulfilledStateChange = (state, { payload }) => {
//   console.log("StateChange пейлоад", payload);
//   console.log("StateChange стейт", state);
// };

// const handleRefreshUserPending = (state) => {
//   state.isRefreshing = true;
// };

// const handleRefreshUserRejected = (state) => {
//   state.isRefreshing = false;
// };

const handleFulfilledFetchPosts = (state, { payload }) => {
  // console.log(payload);
  state.posts = payload;
};

const handleFulfilledFetchUserPosts = (state, { payload }) => {
  // console.log(payload);
  state.userPosts = payload;
};

const initialState = {
  posts: [],
  userPosts: [],
  // isLoggedIn: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    // filtered: (state, { payload }) => {
    //   state.filter = payload.toLowerCase();
    // },
    // logIn: (state, { payload }) => {
    //   state.user = payload;
    //   state.isLoggedIn = true;
    //   console.log("login");
    // },
    // logOut: handleFulfilledLogout,
    // stateChanged: authStateChanged,
    // fetchPosts: (state, { payload }) => {
    //   state.posts = payload;
    //   // state.isLoggedIn = true;
    //   console.log("reduxgetposts");
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, handleFulfilledFetchPosts)
      .addCase(fetchUserPosts.fulfilled, handleFulfilledFetchUserPosts);
    //   .addCase(logIn.fulfilled, handleFulfilledLogin)
    //   .addCase(logOut.fulfilled, handleFulfilledLogout);
    // .addCase(authStateChanged.fulfilled, handleFulfilledStateChange);
    // .addCase(logOut.fulfilled, handleFulfilledLogout);
    // .addCase(refreshUser.fulfilled, handleFulfilledRefreshUser)
    // .addCase(refreshUser.pending, handleRefreshUserPending)
    // .addCase(refreshUser.rejected, handleRefreshUserRejected)
    // .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
    // .addMatcher(
    //   (action) => action.type.endsWith("/rejected"),
    //   handleRejected
    // );
  },
});

export const postsReducer = postsSlice.reducer;

// export const { fetchPosts } = postsSlice.actions;
// export const { logOut } = authSlice.actions;
// export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const postsSelector = (state) => state.posts.posts;
export const userPostsSelector = (state) => state.posts.userPosts;
