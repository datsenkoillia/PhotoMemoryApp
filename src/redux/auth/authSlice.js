import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { register, logIn, refreshUser } from "./authOperations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleFulfilledRegister = (state, { payload }) => {
  state.userName = payload.displayName;
  state.userEmail = payload.email;
  state.userId = payload.uid;
  console.log("here signin");
  // state.token = payload.token;
  state.isLoggedIn = true;
  console.log(state);
};

const handleFulfilledLogin = (state, { payload }) => {
  // state.userName = payload.displayName;
  state.userEmail = payload.email;
  state.userId = payload.uid;
  console.log("here");
  // console.log("here");
  // state.token = payload.token;
  state.isLoggedIn = true;
  console.log(state);
};

const handleFulfilledLogout = (state) => {
  state.user = { name: null, email: null };
  // state.token = null;
  state.isLoggedIn = false;
};

const handleFulfilledRefreshUser = (state, { payload }) => {
  state.user = payload;
  state.isLoggedIn = true;
  // state.isRefreshing = false;
};

// const handleRefreshUserPending = (state) => {
//   state.isRefreshing = true;
// };

// const handleRefreshUserRejected = (state) => {
//   state.isRefreshing = false;
// };

const initialState = {
  // user: { name: null, email: null },
  // user: { email: "", password: "" },
  userName: null,
  userEmail: null,
  userId: null,
  user: null,
  // token: null,
  isLoggedIn: false,
  // isRefreshing: false,
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
    logOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      console.log("logout");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleFulfilledRegister)
      .addCase(logIn.fulfilled, handleFulfilledLogin);
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
  whitelist: ["token"],
};

export const persistedAuthReducer = persistReducer(
  persistConfigAuth,
  authSlice.reducer
);

// export const { create, del, filtered } = authSlice.actions;
export const { logOut } = authSlice.actions;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const userSelector = (state) => state.auth.user;
