import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    loading: false,
    tweets: [],
    tweetDetail: { tweet: null, comments: [] },
    searchedTweets: [],
  },
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    getTweetsData: (state, action) => {
      Object.assign(state, { loading: false, tweets: action.payload });
    },
    tweetCreate: (state, action) => {
      const tweets = [action.payload].concat(state.tweets);
      Object.assign(state, {
        loading: false,
        tweets,
      });
    },
    tweetDelete: (state, action) => {
      const tweets =
        state.tweets.length > 0
          ? state.tweets.filter((t) => t.id !== action.payload)
          : [];
      const tweetDetail =
        state.tweetDetail.tweet && state.tweetDetail.tweet.id === action.payload
          ? { tweet: null, comments: [] }
          : state.tweetDetail;
      Object.assign(state, {
        loading: false,
        tweets,
        tweetDetail,
      });
    },
    tweetUpdate: {
      reducer: (state, action) => {
        const tweets =
          state.tweets.length > 0
            ? state.tweets.map((t) => {
                if (t.id === action.payload.id) {
                  return {
                    ...t,
                    caption: action.payload.caption,
                  };
                }

                return t;
              })
            : [];
        const tweet = state.tweetDetail.tweet
          ? {
              ...state.tweetDetail.tweet,
              caption: action.payload.caption,
            }
          : null;
        Object.assign(state, {
          loading: false,
          tweets,
          tweetDetail: {
            tweet,
            comments: state.tweetDetail.comments,
          },
        });
      },
      prepare: (id, caption) => {
        return {
          payload: {
            id,
            caption,
          },
        };
      },
    },
    tweetLike: {
      reducer: (state, action) => {
        if (state.tweets.length > 0) {
          const tweets = state.tweets.map((tweet) => {
            if (tweet.id === action.payload.tweet_id) {
              const likes = [
                {
                  user_id: action.payload.user_id,
                },
              ].concat(tweet.likes);
              return {
                ...tweet,
                likes,
              };
            }
            return tweet;
          });

          state.tweets = tweets;
        }

        if (state.tweetDetail.tweet) {
          const likes = [
            {
              user: action.payload.user_id,
              post: action.payload.tweet_id,
            },
          ].concat(state.tweetDetail.tweet.likes);
          state.tweetDetail.tweet = { ...state.tweetDetail.tweet, likes };
        }
      },
      prepare: (tweet_id, user_id) => {
        return {
          payload: {
            tweet_id,
            user_id,
          },
        };
      },
    },
    tweetUnlike: {
      reducer: (state, action) => {
        if (state.tweets.length > 0) {
          const tweets = state.tweets.map((t) => {
            if (t.id === action.payload.tweet) {
              const likes = t.likes.filter(
                (l) => l.user_id !== action.payload.user
              );
              return {
                ...t,
                likes,
              };
            }
            return t;
          });
          state.tweets = tweets;
        }

        if (state.tweetDetail.tweet) {
          const likes = state.tweetDetail.tweet.likes.filter(
            (l) => l.user !== action.payload.user
          );
          state.tweetDetail.tweet = { ...state.tweetDetail.tweet, likes };
        }
      },
      prepare: (tweet, user) => {
        return {
          payload: {
            tweet,
            user,
          },
        };
      },
    },
    getCommentsOnPost: {
      reducer: (state, action) => {
        Object.assign(state, {
          loading: false,
          tweetDetail: action.payload.tweet,
        });
      },
      prepare: (tweet, comments) => {
        return {
          payload: {
            tweet: {
              tweet,
              comments,
            },
          },
        };
      },
    },
    commentCreate: {
      reducer: (state, action) => {
        state.tweets =
          state.tweets.length > 0
            ? state.tweets.map((t) =>
                t.id === action.payload.tweet_id
                  ? {
                      ...t,
                      comments: t.comments.concat([
                        { id: action.payload.comment.id },
                      ]),
                    }
                  : t
              )
            : [];
        if (state.tweetDetail.tweet) {
          state.tweetDetail.tweet.comments = [
            { id: action.payload.comment.id },
          ].concat(state.tweetDetail.tweet.comments);
          state.tweetDetail.comments = [action.payload.comment].concat(
            state.tweetDetail.comments
          );
        }
        state.loading = false;
      },
      prepare: (tweet_id, comment) => {
        return {
          payload: {
            tweet_id,
            comment,
          },
        };
      },
    },
    commentUpdate: {
      reducer: (state, action) => {
        state.tweetDetail.comments = state.tweetDetail.comments.map(
          (comment) => {
            return comment.id === action.payload.comment_id
              ? {
                  ...comment,
                  text: action.payload.text,
                }
              : comment;
          }
        );
      },
      prepare: (comment_id, text) => {
        return {
          payload: {
            comment_id,
            text,
          },
        };
      },
    },
    commentDelete: {
      reducer: (state, action) => {
        state.tweets =
          state.tweets.length > 0
            ? state.tweets.map((t) =>
                t.id === action.payload.tweet_id
                  ? {
                      ...t,
                      comments: t.comments.filter(
                        (comment) => comment.id !== action.payload.comment_id
                      ),
                    }
                  : t
              )
            : [];
        state.tweetDetail.tweet.comments =
          state.tweetDetail.tweet.comments.filter(
            (comment) => comment.id !== action.payload.comment_id
          );
        state.tweetDetail.comments = state.tweetDetail.comments.filter(
          (comment) => comment.id !== action.payload.comment_id
        );
      },
      prepare: (comment_id, tweet_id) => {
        return {
          payload: {
            comment_id,
            tweet_id,
          },
        };
      },
    },
    searchTweets: (state, action) => {
      state.searchedTweets = action.payload;
    },
    fail: (state) => {
      Object.assign(state, { loading: false });
    },
  },
});

export const {
  request,
  getTweetsData,
  tweetCreate,
  tweetUpdate,
  tweetDelete,
  tweetLike,
  tweetUnlike,
  getCommentsOnPost,
  commentCreate,
  commentUpdate,
  commentDelete,
  searchTweets,
  fail,
} = tweetSlice.actions;
export default tweetSlice.reducer;
