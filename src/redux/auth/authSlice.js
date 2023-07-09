import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import {
  register,
  logIn,
  logOut,
  userAvatarUpdate,
  authStateChanged,
} from "./authOperations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleFulfilledRegister = (state, { payload }) => {
  const { displayName, email, uid, photoURL } = payload;
  const userData = { displayName, email, uid, photoURL };
  state.userData = userData;
  state.userAvatarURL = photoURL;
  // console.log("here signin");
  state.isLoggedIn = true;
  if (photoURL) {
    state.isAvatar = true;
  }
};

const handleFulfilledUserAvatarUpdate = (state, { payload }) => {
  console.log('payload', payload);
  const { displayName, email, uid, photoURL } = payload;
  const userData = { displayName, email, uid, photoURL };
  state.userData = userData;
  state.userAvatarURL = photoURL;
  if (photoURL === 'null') {
    console.log('photoURL === null', photoURL === 'null');
    state.isAvatar = false;
  } else {
    state.isAvatar = true;
  }
};

const handleFulfilledLogin = (state, { payload }) => {
  const { displayName, email, uid, photoURL } = payload;
  const userData = { displayName, email, uid, photoURL };
  state.userData = userData;
  state.userAvatarURL = photoURL;
  // console.log("here login");
  state.isLoggedIn = true;
  if (photoURL) {
    state.isAvatar = true;
  }
  // console.log("стейт после логина", state);
};

const handleFulfilledLogout = (state) => {
  state.userData = null;
  state.userAvatar = null;
  state.userAvatarUri = null;
  state.isLoggedIn = false;
  state.isAvatar = false;
  // dispatch(setAvatarUri(null));
  // console.log("handleFulfilledLogout");
};

const handleFulfilledStateChange = (state, { payload }) => {
  console.log("StateChange пейлоад", payload);
  console.log("StateChange стейт", state);
};

const handleRefreshUserPending = (state) => {
  state.isRefreshing = true;
};

const handleRefreshUserRejected = (state) => {
  state.isRefreshing = false;
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
    // logIn: (state, { payload }) => {
    //   state.user = payload;
    //   state.isLoggedIn = true;
    //   console.log("login");
    // },
    // logOut: handleFulfilledLogout,
    // stateChanged: authStateChanged,
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleFulfilledRegister)
      .addCase(userAvatarUpdate.fulfilled, handleFulfilledUserAvatarUpdate)
      .addCase(logIn.fulfilled, handleFulfilledLogin)
      .addCase(logOut.fulfilled, handleFulfilledLogout);
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

const persistConfigAuth = {
  key: "auth",
  storage: AsyncStorage,
  // whitelist: ["userData"],
};

export const persistedAuthReducer = persistReducer(
  persistConfigAuth,
  authSlice.reducer
);

export const { setAvatarUri } = authSlice.actions;
export const { setIsAvatar } = authSlice.actions;
// export const { logOut } = authSlice.actions;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const isAvatarSelector = (state) => state.auth.isAvatar;
export const userSelector = (state) => state.auth.userData;
export const userAvatarUriSelector = (state) => state.auth.userAvatarUri;
export const userAvatarURLSelector = (state) => state.auth.userAvatarURL;
