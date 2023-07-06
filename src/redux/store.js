import { configureStore } from "@reduxjs/toolkit";
import {
  // persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import rootReducer from "./rootReducer";
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

// export default { store, persistor };
