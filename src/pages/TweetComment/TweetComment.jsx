import React from "react";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getTweetComments } from "../../api/tweet";
import { getUserData } from "../../api/user";
import "./TweetComment.css";
import Tweet from "../../components/Tweet";
import ShowComments from "../../components/showComments";
import { useNavigate } from "react-router-dom";
import Suggestions from "../../components/Suggestion";

import { useSelector, useDispatch } from "react-redux";

export default function TweetComment() {
  const tweet_id = useParams().id;
  const dispatch = useDispatch();
  const commentState = useSelector((state) => state.tweet.tweetDetail);
  const { tweet, comments } = commentState;
  const loginData = useSelector((state) => state.user);
  const { loginUserId, data } = loginData;

  const navigate = useNavigate();

  useEffect(() => {
    const tweetData = async () => {
      await getTweetComments(tweet_id, dispatch);
      await getUserData(loginUserId, dispatch);
    };
    tweetData();
  }, [dispatch, tweet_id, loginUserId]);

  return (
    <div>
      <Row>
        <Col lg={8} sm={11} md={12}>
          <Row className="pt-3 pb-3 header">
            <Col lg={2}>
              <button onClick={() => navigate(-1)} className="comment-btn">
                Back
              </button>
            </Col>
            <Col lg={10}>
              <b>Tweet</b>
            </Col>
          </Row>
          <Row>
            {tweet && data && (
              <Tweet
                key={tweet.id}
                tweet_id={tweet.id}
                loginId={loginUserId}
                following={
                  tweet.user.followers &&
                  tweet.user.followers.some((user) => user.id === loginUserId)
                }
              />
            )}
            {tweet && tweet.comments.length > 0 && (
              <p className="span mt-3">
                <b>All replyies to @{tweet && tweet.user.username}</b>
              </p>
            )}
            {comments &&
              comments.map((comment) => {
                return (
                  <ShowComments key={comment.id} comment_id={comment.id} />
                );
              })}
          </Row>
        </Col>
        <Col lg={4} className="d-none d-lg-block">
          <Suggestions />
        </Col>
      </Row>
    </div>
  );
}
