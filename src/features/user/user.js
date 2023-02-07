import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: undefined,
    error: undefined,
    followFollowing: [],
    loginUserId: undefined,
    loggedIn: undefined,
  },
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    getLoggenInUserId: (state) => {
      state.loginUserId = parseInt(localStorage.user_id);
    },
    isLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    loginUserData: (state, action) => {
      Object.assign(state, { loading: false, data: action.payload });
    },
    userUpdate: (state, action) => {
      state.data = action.payload;
    },
    userFollowings: (state, action) => {
      state.loading = false;
      state.followFollowing = action.payload;
    },
    userFollowers: (state, action) => {
      state.loading = false;
      state.followFollowing = action.payload;
    },
    userFollow: (state, action) => {
      state.data.followers = state.data.followers.concat({
        id: action.payload,
      });
    },
    userUnfollow: (state, action) => {
      state.data.followers = state.data.followers.filter(
        (t) => t.id !== action.payload
      );
    },
    notFound: (state, action) => {
      state.data = undefined;
      Object.assign(state, { loading: false, error: action.payload });
    },
    fail: (state, action) => {
      Object.assign(state, { loading: false, error: action.payload });
    },
  },
});

export const {
  request,
  isLoggedIn,
  getLoggenInUserId,
  loginUserData,
  userUpdate,
  userFollowings,
  userFollowers,
  userFollow,
  userUnfollow,
  notFound,
  fail,
} = userSlice.actions;
export default userSlice.reducer;
