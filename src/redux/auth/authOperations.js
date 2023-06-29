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
      return user;
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
      // console.log("єто логиндбюзер", loginDB.user);
      return loginDB.user;
    } catch (error) {
      // console.log(error);
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

// export const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };

// export const authStateChanged = createAsyncThunk(
//   "auth/stateChanged",
//   async (_, thunkAPI) => {
//     try {
//       (onChange = () => {}) => {
//         onAuthStateChanged((user) => {
//           onChange(user);
//         });
//       };
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const authStateChanged = createAsyncThunk(
//   "auth/stateChanged",
//   async (_, thunkAPI) => {

//     try {
//       (onChange = () => { }) => {

//         onAuthStateChanged((user) => {
//           onChange(user);
//         });
//       };
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const authStateChanged = createAsyncThunk(
//   "auth/stateChanged",
//   async (_, thunkAPI) => {
//     try {
//       onAuthStateChanged((user) => {
//         if (user) {
//           console.log(user);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const authStateChanged = createAsyncThunk(
//   "auth/stateChanged",
//   async (_, thunkAPI) => {
//     const user = auth.currentUser;

//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       const uid = user.uid;
//       console.log(uid);
//       // ...
//     } else {
//       console.log('no user');
//       // User is signed out
//       // ...
//     }
//   }
// );

// export const authStateChanged = () => {
//   const user = auth.currentUser;
//   if (user) {
//     try {
//       console.log(user);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
