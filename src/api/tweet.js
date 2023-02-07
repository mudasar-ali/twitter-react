import axios from "axios";
import { toast } from "react-toastify";

import {
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
  fail,
} from "../features/tweet/tweet";

export const createTweet = async (data, dispatch) => {
  try {
    dispatch(request());
    const res = await axios.post("/tweets", data, {
      withCredentials: true,
    });
    dispatch(tweetCreate(res.data.tweet));

    toast.success("Tweet has been successfully created", {
      autoClose: 1000,
    });
    return;
  } catch (error) {
    dispatch(fail());
    error.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 5000,
      });
    });
  }
};

export const getTweets = async (dispatch) => {
  try {
    dispatch(request());
    const res = await axios.get("/tweets", {
      withCredentials: true,
    });
    dispatch(getTweetsData(res.data.tweets));
  } catch (error) {
    dispatch(fail);
    toast.error(error.response.data.msg, {
      autoClose: 2000,
    });
  }
};

export const deleteTweet = async (post, dispatch) => {
  try {
    await axios.delete(`/tweets/${post}`, {
      withCredentials: true,
    });
    dispatch(tweetDelete(post));
    toast.warning("Your tweet was deleted", {
      autoClose: 1000,
    });
  } catch (error) {
    dispatch(fail());
    error.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 5000,
      });
    });
  }
};

export const updateTweet = async (id, data, dispatch) => {
  try {
    await axios.put(`/tweets/${id}`, data, {
      withCredentials: true,
    });
    dispatch(tweetUpdate(id, data.caption));
    toast.success("update tweet", {
      autoClose: 1000,
    });
  } catch (error) {
    console.log(error);
    dispatch(fail());
    error.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 5000,
      });
    });
  }
};

export const likeTweet = async (id, user_id, dispatch) => {
  try {
    await axios.post(`/tweets/${id}/like`, {
      withCredentials: true,
    });
    dispatch(tweetLike(id, user_id));
  } catch (error) {
    toast.error(error.response.data.msg, {
      autoClose: 2000,
    });
  }
};

export const unlikeTweet = async (id, user_id, dispatch) => {
  try {
    await axios.delete(`/tweets/${id}/unlike`, {
      withCredentials: true,
    });
    dispatch(tweetUnlike(id, user_id));
  } catch (error) {
    console.log(error);
    toast.error(error, {
      autoClose: 2000,
    });
    return "err";
  }
};

export const createComment = async (tweet_id, data, dispatch) => {
  try {
    dispatch(request());
    const res = await axios.post(`/tweets/${tweet_id}/comments`, data, {
      withCredentials: true,
    });
    toast.success("Comment created", {
      autoClose: 1000,
    });
    dispatch(commentCreate(tweet_id, res.data.comment));
  } catch (error) {
    console.log(error);
    dispatch(fail());
    toast.error(
      error.response ? error.response.data.msg : "something went wrong",
      {
        autoClose: 2000,
      }
    );
  }
};

export const getTweetComments = async (id, dispatch) => {
  try {
    dispatch(request());
    const res = await axios.get(`/tweets/${id}`);
    dispatch(getCommentsOnPost(res.data.tweet, res.data.tweet.comments));
  } catch (error) {
    dispatch(fail());
  }
};

export const deleteComment = async (tweet_id, comment_id, dispatch) => {
  try {
    await axios.delete(`/tweets/${tweet_id}/comments/${comment_id}`);
    toast.warning("Comment deleted", {
      autoClose: 1000,
    });
    dispatch(commentDelete(comment_id, tweet_id));
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg, {
      autoClose: 2000,
    });
  }
};

export const editComment = async (tweet_id, comment_id, data, dispatch) => {
  try {
    await axios.put(`/tweets/${tweet_id}/comments/${comment_id}`, data, {
      withCredentials: true,
    });
    dispatch(commentUpdate(comment_id, data.text));
    toast.success("Comment updated", {
      autoClose: 1000,
    });

    return;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg, {
      autoClose: 2000,
    });
  }
};
