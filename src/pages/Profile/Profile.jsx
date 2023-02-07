import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import Suggestions from "../../components/Suggestion";
import "./Profile.css";
import Tweet from "../../components/Tweet";

import { getUserData } from "../../api/user";
import { Link, useParams } from "react-router-dom";
import FollowingBtn from "../../components/FollowingBtn";
import Top from "../../components/Top";
import defaultPic from "../../images/profile.webp";

import { RotatingLines } from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const loginData = useSelector((state) => state.user);
  const { loginUserId, data } = loginData;
  const tweets = useSelector((state) => state.tweet.tweets);

  const dispatch = useDispatch();

  const user_id = useParams().id;
  const [modalShow, setmodalshow] = useState(false);
  const [loadingg, setLoading] = useState(false);

  useEffect(() => {
    const user = async () => {
      setLoading(true);
      await getUserData(user_id, dispatch);
      setLoading(false);
    };
    user();
  }, [dispatch, user_id]);

  return (
    <Row>
      <Col lg={8}>
        {data ? (
          <Container>
            {tweets.length > 0 && (
              <Top
                topField={data.name}
                lowerField={`${tweets.length} Tweets`}
                tweets={tweets.length}
              />
            )}

            <Container style={{ border: "1px solid #F0F1F1" }}>
              <Row>
                <img
                  src={data.prof_pic || defaultPic}
                  style={{
                    height: "250px",
                    objectFit: "fit",
                    objectPosition: "100% 100%",
                  }}
                  alt="no img"
                />
              </Row>
              <Row className="my-4 d-flex justify-content-between">
                <Col>
                  <b>{data.name} </b>
                  <p style={{ color: "grey" }}>@{data.username}</p>
                </Col>
                {loginUserId === data.id && (
                  <Col className="text-end">
                    <button
                      onClick={() => setmodalshow(true)}
                      className="btn btn-transparent btn-sm edit-btn"
                    >
                      <b>Edit Profile</b>
                    </button>
                  </Col>
                )}
                {loginUserId !== data.id && <FollowingBtn data={data} />}
                <p>{data.bio && data.bio}</p>
                <div className="d-flex ">
                  <Link to={`/${user_id}/following`} className="Link">
                    <div className="following me-3">
                      <b>
                        <span className=" me-1">{data.followings.length}</span>
                      </b>
                      <span className="top-tweets">Followings</span>
                    </div>
                  </Link>
                  <Link to={`/${user_id}/followers`} className="Link">
                    <div className="following">
                      <b>
                        <span className=" me-1">{data.followers.length}</span>
                      </b>
                      <span className="top-tweets">Followers</span>
                    </div>
                  </Link>
                </div>
              </Row>
              <span className="tweets-span">Tweets</span>
            </Container>
            <Row>
              {loadingg ? (
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
              ) : (
                tweets.map((post) => {
                  return (
                    <div key={post.id}>
                      <Tweet
                        tweet_id={post.id}
                        loginId={loginUserId}
                        profile="profile"
                      />
                    </div>
                  );
                })
              )}
            </Row>

            <UpdateProfile
              show={modalShow}
              onHide={() => setmodalshow(false)}
              user_data={data}
            />
          </Container>
        ) : (
          <Col className="">
            <Top topField="profile" lowerField="not found" />
            <Container style={{ border: "1px solid #F0F1F1" }}>
              <Row>
                <div
                  style={{
                    height: "250px",
                    background: "lightgrey",
                  }}
                />
              </Row>
            </Container>
            <div className="mt-3">
              <b>@Twitter_User</b>
            </div>
            <Row className="mt-5 text-center">
              <p
                style={{
                  fontSize: "31px",
                  fontWeight: "800",
                  lineHeight: "36px",
                }}
              >
                This account doesn’t exist
              </p>
              <p style={{ color: "grey" }}>Try searching for another.</p>
            </Row>
          </Col>
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block">
        <Suggestions />
      </Col>
    </Row>
  );
}
