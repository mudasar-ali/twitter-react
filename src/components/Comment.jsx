import { FaRegComment } from "react-icons/fa";
import React, { useState } from "react";
import CreateComment from "./CreateComment";
import { useSelector } from "react-redux";

export default function Comment({ tweet_id }) {
  const tweet = useSelector((state) => {
    return (
      state.tweet.tweets.find((t) => t.id === tweet_id) ||
      state.tweet.tweetDetail.tweet
    );
  });
  const commentCount = tweet.comments && tweet.comments.length;
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <div className="main-div" onClick={() => setModalShow(true)}>
        <div className="subb-div text-center">
          <FaRegComment className="icon-style" />
          <div>{commentCount}</div>
        </div>
      </div>

      <CreateComment
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
        tweet_id={tweet_id}
      />
    </div>
  );
}
