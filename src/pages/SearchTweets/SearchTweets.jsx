import React, { useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import { useParams } from "react-router-dom";

import Top from "../../components/Top";
import Tweet from "../../components/Tweet";
import Suggestion from "../../components/Suggestion";
import { RotatingLines } from "react-loader-spinner";

import { searchUsers } from "../../api/user";
import { getTweetsData, request, fail } from "../../features/tweet/tweet";

import { useSelector, useDispatch } from "react-redux";

export default function SearchTweets() {
  const loginUserId = useSelector((state) => state.user.loginUserId);
  const tweetState = useSelector((state) => state.tweet);
  const { tweets, loading } = tweetState;
  const dispatch = useDispatch();
  const value = useParams().query;

  useEffect(() => {
    dispatch(request());
    searchUsers(value, "tweet").then((res) => {
      dispatch(getTweetsData(res.data.tweets));
    });
    dispatch(fail());
  }, [dispatch, value]);

  return (
    <div>
      <Row>
        <Col lg={8} sm={11} md={12}>
          <Container className="top p-2">
            <Row>
              <Col>
                <Top topField="Searched Tweet Results" />
              </Col>
              <Col className="text-end">{<BsStars />}</Col>
            </Row>
          </Container>

          <Row>
            {loading ? (
              <Col className="m-2 text-center">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="90"
                  height="90"
                  visible={true}
                />
              </Col>
            ) : tweets.length > 0 ? (
              tweets.map((tweet) => {
                console.log("here");
                return (
                  <div key={tweet.id}>
                    <Tweet
                      key={tweet.id}
                      tweet_id={tweet.id}
                      loginId={loginUserId}
                      following={tweet.user.followers.some(
                        (user) => user.user === loginUserId
                      )}
                    />
                  </div>
                );
              })
            ) : (
              <Row className="mt-5 text-center">
                <p
                  style={{
                    fontSize: "31px",
                    fontWeight: "800",
                    lineHeight: "36px",
                  }}
                >
                  Could not find any Tweet
                </p>
                <p style={{ color: "grey" }}>
                  Could not find anything. Please go back to HOME and try
                  searching something else.
                </p>
              </Row>
            )}
          </Row>
        </Col>

        <Col lg={4} className="d-none d-lg-block">
          <Suggestion />
        </Col>
      </Row>
    </div>
  );
}
