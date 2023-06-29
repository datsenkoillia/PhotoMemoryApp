import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { register, logIn, logOut, authStateChanged } from "./authOperations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleFulfilledRegister = (state, { payload }) => {
  const { displayName, email, uid } = payload;
  const userData = { displayName, email, uid };
  state.userData = userData;
  // console.log("here signin");
  state.isLoggedIn = true;
};

const handleFulfilledLogin = (state, { payload }) => {
  const { displayName, email, uid } = payload;
  const userData = { displayName, email, uid };
  state.userData = userData;
  // console.log("here login");
  state.isLoggedIn = true;
  // console.log("стейт после логина", state);
};

const handleFulfilledLogout = (state) => {
  state.userData = null;
  state.isLoggedIn = false;
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
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleFulfilledRegister)
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

// export const { create, del, filtered } = authSlice.actions;
// export const { logOut } = authSlice.actions;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const userSelector = (state) => state.auth.userData;
