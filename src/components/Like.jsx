import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeTweet } from "../api/tweet";
import { unlikeTweet } from "../api/tweet";

import { useSelector } from "react-redux";

export default function Like({ tweet_id }) {
  const dispatch = useDispatch();
  const tweet = useSelector((state) => {
    return (
      state.tweet.tweets.find((t) => t.id === tweet_id) ||
      state.tweet.tweetDetail.tweet
    );
  });
  const loginUserId = useSelector((state) => state.user.loginUserId);
  const isLiked =
    tweet.likes && tweet.likes.some((like) => like.user_id === loginUserId);
  const likeCount = tweet.likes && tweet.likes.length;

  const likeHandle = async (id) => {
    await likeTweet(id, loginUserId, dispatch);
  };

  const unlikeHandle = async (id) => {
    await unlikeTweet(id, loginUserId, dispatch);
  };

  return (
    <div>
      <div
        className="main-div"
        onClick={
          isLiked ? () => unlikeHandle(tweet_id) : () => likeHandle(tweet_id)
        }
      >
        <div className="subb-div text-center">
          <AiOutlineHeart className={isLiked ? "like" : "icon-style"} />
          <div>{likeCount}</div>
        </div>
      </div>
    </div>
  );
}
