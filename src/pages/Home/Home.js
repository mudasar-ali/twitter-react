import React, { useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { BsStars } from "react-icons/bs";

import CreateTweet from "../../components/CreateTweet";
import { getTweets } from "../../api/tweet";
import Tweet from "../../components/Tweet";
import { getUserData } from "../../api/user";
import Suggestion from "../../components/Suggestion";
import Top from "../../components/Top";
import defaultPic from "../../images/profile.webp";

import { useDispatch, useSelector } from "react-redux";

import { RotatingLines } from "react-loader-spinner";

export default function Home() {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.user);
  const { data, loginUserId } = loginData;
  const tweetState = useSelector((state) => state.tweet);
  const { loading, tweets } = tweetState;

  useEffect(() => {
    const userData = async () => {
      loginUserId && (await getUserData(loginUserId, dispatch));
      await getTweets(dispatch);
    };
    userData();
  }, [dispatch, loginUserId]);

  return (
    <div>
      <Row>
        <Col lg={8} sm={11} md={12}>
          {loading && (
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
          )}
          <Container className="top p-2">
            <Row>
              <Col>
                <Top topField="Home" />
              </Col>
              <Col className="text-end">{<BsStars />}</Col>
            </Row>
          </Container>

          <Container
            style={{
              borderLeft: "1px solid #F0F1F1",
              borderRight: "1px solid #F0F1F1",
            }}
          >
            <Row className="pb-2">
              <CreateTweet
                id="home"
                user_pic={(data && data.prof_pic) || defaultPic}
                loginUserId={loginUserId}
              />
            </Row>
          </Container>
          <Row>
            {tweets &&
              tweets.map((tweet) => {
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
              })}
          </Row>
        </Col>

        <Col lg={4} className="d-none d-lg-block">
          <Suggestion />
        </Col>
      </Row>
    </div>
  );
}
