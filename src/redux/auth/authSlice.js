import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { register, logIn, logOut, userAvatarUpdate } from "./authOperations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleFulfilledRegister = (state, { payload }) => {
  const { displayName, email, uid, photoURL } = payload;
  const userData = { displayName, email, uid, photoURL };
  state.userData = userData;
  state.userAvatarURL = photoURL;
  state.isLoggedIn = true;
  if (photoURL) {
    state.isAvatar = true;
  }
};

const handleFulfilledLogin = (state, { payload }) => {
  const { displayName, email, uid, photoURL } = payload;
  const userData = { displayName, email, uid, photoURL };
  state.userData = userData;
  state.userAvatarURL = photoURL;
  state.isLoggedIn = true;
  if (photoURL) {
    state.isAvatar = true;
  }
};

const handleFulfilledUserAvatarUpdate = (state, { payload }) => {
  // console.log("payload", payload);

  if (!payload) {
    state.isLoggedIn = false;
    state.userAvatarUri = null;
    return;
  }
  const { displayName, email, uid, photoURL } = payload;
  const userData = { displayName, email, uid, photoURL };
  state.userData = userData;
  if (photoURL === "null") {
    state.isAvatar = false;
  } else {
    state.isAvatar = true;
  }
};

const handleFulfilledLogout = (state) => {
  state.userData = null;
  state.userAvatarURL = null;
  state.userAvatarUri = null;
  state.isLoggedIn = false;
  state.isAvatar = false;
};

const initialState = {
  userData: null,
  userAvatarUri: null,
  userAvatarURL: null,
  isLoggedIn: false,
  isAvatar: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setAvatarUri: (state, { payload }) => {
      state.userAvatarUri = payload;
    },
    setIsAvatar: (state, { payload }) => {
      state.isAvatar = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleFulfilledRegister)
      .addCase(userAvatarUpdate.fulfilled, handleFulfilledUserAvatarUpdate)
      .addCase(logIn.fulfilled, handleFulfilledLogin)
      .addCase(logOut.fulfilled, handleFulfilledLogout);
  },
});

const persistConfigAuth = {
  key: "auth",
  storage: AsyncStorage,
};

export const persistedAuthReducer = persistReducer(
  persistConfigAuth,
  authSlice.reducer
);

export const { setAvatarUri, setIsAvatar, authStateChanged } =
  authSlice.actions;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const isAvatarSelector = (state) => state.auth.isAvatar;
export const userSelector = (state) => state.auth.userData;
export const userAvatarUriSelector = (state) => state.auth.userAvatarUri;
