import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const register = createAsyncThunk(
  "auth/register",
  async ({ login, email, password, avatar }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await userUpdate({ displayName: login, photoURL: avatar });
      const user = auth.currentUser;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userAvatarUpdate = createAsyncThunk(
  "auth/avatarUpdate",
  async (avatarUrl, thunkAPI) => {
    try {
      await userUpdate({ photoURL: `${avatarUrl}` });
      const user = auth.currentUser;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userUpdate = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

// export const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };

export const checkUserState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // dispatch(authStateChanged(true));
      console.log("uid in checkState", user.uid);
      return true;
      // ...
    } else {
      // dispatch(authStateChanged(false));
      return false;
      // ...
    }
  });
};

// export const checkUserState = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const loginDB = await signInWithEmailAndPassword(auth, email, password);
      return loginDB.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
