import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { register, logIn, refreshUser } from "./authOperations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleFulfilledRegister = (state, { payload }) => {
  const { displayName, email, uid } = payload;
  const userData = { displayName, email, uid };
  // state.userName = payload.displayName;
  // state.userEmail = payload.email;
  // state.userId = payload.uid;
  state.userData = userData;
  console.log("here signin");
  // state.token = payload.token;
  state.isLoggedIn = true;
  console.log(state);
};

const handleFulfilledLogin = (state, { payload }) => {
  const { displayName, email, uid } = payload;
  const userData = { displayName, email, uid };
  // state.userName = payload.displayName;
  // state.userEmail = payload.email;
  // state.userId = payload.uid;
  state.userData = userData;
  console.log("here login");
  // console.log("here");
  // state.token = payload.token;
  state.isLoggedIn = true;
  console.log(state);
};

const handleFulfilledLogout = (state) => {
  state.userData = null;
  state.isLoggedIn = false;
  console.log("logout");
  // state.userEmail = null;
  // state.userId = null;
  // state.userName = null;
  // console.log(state.userName);
  console.log("state", state);
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
  // userName: null,
  // userEmail: null,
  // userId: null,
  userData: null,
  // token: null,
  isLoggedIn: false,
  stateChange: null,
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
    logOut: handleFulfilledLogout,
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
  whitelist: ["userData"],
};

export const persistedAuthReducer = persistReducer(
  persistConfigAuth,
  authSlice.reducer
);

// export const { create, del, filtered } = authSlice.actions;
export const { logOut } = authSlice.actions;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const userSelector = (state) => state.auth.userData;
