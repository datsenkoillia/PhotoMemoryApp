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
  async ({ login, email, password }, thunkAPI) => {
    try {
      console.log(login, email, password);
      await createUserWithEmailAndPassword(auth, email, password);
      await userUpdate({ displayName: login });
      const user = auth.currentUser;
      return user
      // const x = await auth.currentUser;
      // console.log(x);
      

      // userUpdate({ displayName: login });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userUpdate = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const loginDB = await signInWithEmailAndPassword(auth, email, password);
      console.log(loginDB.user);
      // console.log(loginDB.user.email);
      return loginDB.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const userUpdate = createAsyncThunk(
//   "auth/userUpdate",
//   async (update, thunkAPI) => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         await updateProfile(user, update);
//       } catch (error) {
//         console.log(error);
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   }
// );

// const updateUserProfile = async (update) => {
//   const user = auth.currentUser;

//   // якщо такий користувач знайдений
//   if (user) {
//     // оновлюємо його профайл
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// export const logIn = createAsyncThunk(
//   "contacts/addContact",
//   async (userCredentials, thunkAPI) => {
//     try {
//       const response = await axios.post("/contacts", userCredentials);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
