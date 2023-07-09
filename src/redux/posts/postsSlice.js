import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchUserPosts } from "./postsOperations";

const handleFulfilledFetchPosts = (state, { payload }) => {
  state.posts = payload;
};

const handleFulfilledFetchUserPosts = (state, { payload }) => {
  state.userPosts = payload;
};

const initialState = {
  posts: [],
  userPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, handleFulfilledFetchPosts)
      .addCase(fetchUserPosts.fulfilled, handleFulfilledFetchUserPosts);
  },
});

export const postsReducer = postsSlice.reducer;

export const postsSelector = (state) => state.posts.posts;
export const userPostsSelector = (state) => state.posts.userPosts;
