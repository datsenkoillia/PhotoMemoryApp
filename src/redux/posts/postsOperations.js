import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataFromFirestore } from "../../firebase/postsOperations";

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
