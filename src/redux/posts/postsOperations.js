import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDataFromFirestore,
  getUserPostsFromFirestore,
} from "../../firebase/postsOperations";

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    try {
      // console.log(login, email, password);
      return await getDataFromFirestore();
      // await userUpdate({ displayName: login });
      // const user = auth.currentUser;
      // return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetch",
  async (_, thunkAPI) => {
    try {
      // console.log(login, email, password);
      return await getUserPostsFromFirestore();
      // await userUpdate({ displayName: login });
      // const user = auth.currentUser;
      // return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
