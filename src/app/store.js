import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/user";
import tweetReducer from "../features/tweet/tweet";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweet: tweetReducer,
  },
});
