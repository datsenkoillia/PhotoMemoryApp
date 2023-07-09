import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDataFromFirestore,
  getUserPostsFromFirestore,
} from "../../firebase/postsOperations";

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    try {
      return await getDataFromFirestore();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetch",
  async (userId, thunkAPI) => {
    try {
      return await getUserPostsFromFirestore(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
