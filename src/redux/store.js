import { configureStore } from "@reduxjs/toolkit";
import {

  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { persistedAuthReducer } from "./auth/authSlice";
import { postsReducer } from "./posts/postsSlice";

const reducer = { auth: persistedAuthReducer, posts: postsReducer };

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [
      //     FLUSH,
      //     REHYDRATE,
      //     PAUSE,
      //     PERSIST,
      //     PURGE,
      //     REGISTER,
      //     "auth/login/fulfilled",
      //   ],
      // },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


