import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

import { deleteTweet } from "../api/tweet";
import EditTweet from "../pages/EditTweet/EditTweet";
import Like from "./Like";
import Comment from "./Comment";
import ShowCard from "./ShowCard";

import FollowingBtn from "./FollowingBtn";
import defaultPic from "../images/profile.webp";
import { useDispatch, useSelector } from "react-redux";
import { timeFormat } from "../utlis/timeFormat";

export default function Tweet({ loginId, tweet_id, following, profile }) {
  const tweet = useSelector((state) => {
    return (
      state.tweet.tweets.find((t) => t.id === tweet_id) ||
      state.tweet.tweetDetail.tweet
    );
  });
  const dispatch = useDispatch();
  const [modalShow, setmodalshow] = useState(false);
  const time = timeFormat(tweet && tweet.created_at);

  const handleDelete = async () => {
    await deleteTweet(tweet_id, dispatch);
  };

  return (
    <div>
      {tweet && tweet.user && (
        <Container style={{ border: "1px solid #F0F1F1" }}>
          <Row className="my-2 ">
            <Col lg={1} md={2}>
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => (
                  <Tooltip {...props}>
                    <ShowCard user={tweet.user} loginUserId={loginId} />
                  </Tooltip>
                )}
                placement="bottom"
              >
                <Link to={`/profile/${tweet.user.id}`} className="Link">
                  <img
                    className="img_circle p-1"
                    src={tweet.user.prof_pic || defaultPic}
                    alt=""
                  />
                </Link>
              </OverlayTrigger>
            </Col>
            <Col lg={11} md={8} xs={12}>
              <div className="d-flex  ps-3">
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>
                      <ShowCard user={tweet.user} loginUserId={loginId} />
                    </Tooltip>
                  )}
                  placement="bottom"
                >
                  <Link to={`/profile/${tweet.user.id}`} className="Link">
                    <div className="d-flex">
                      <div className="me-1">
                        <b>{tweet.user.name} </b>
                      </div>
                      <div style={{ color: "grey" }}>
                        @{tweet.user.username}
                      </div>
                    </div>
                  </Link>
                </OverlayTrigger>
                <div style={{ color: "grey" }}> .{time}</div>

                {tweet.user && loginId === tweet.user.id && (
                  <Col className="text-end">
                    <Button
                      className="mx-2"
                      variant="outline-primary"
                      onClick={() => setmodalshow(true)}
                    >
                      Edit
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Col>
                )}
                {!profile && loginId !== tweet.user.id && !following && (
                  <Col className="text-end">
                    <FollowingBtn data={tweet.user} />
                  </Col>
                )}
              </div>

              <Link to={`/tweet/${tweet.id}`} className="Link ">
                <Row className="ps-3 ">
                  <Col>{tweet.caption}</Col>
                </Row>
                {/* <Row>
                  {tweet.pictures.length > 1 ? (
                    <Carousel>
                      {tweet.pictures.map((image) => {
                        return (
                          <Carousel.Item key={image._id}>
                            <img
                              className="img-height"
                              src={image.url}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  ) : (
                    tweet.pictures.length === 1 && (
                      <img
                        className="img-height"
                        src={tweet.pictures[0].url}
                        alt="First slide"
                      />
                    )
                  )}
                </Row> */}
                {tweet.pictures && (
                  <img
                    className="img-height mb-2"
                    src={tweet.pictures}
                    alt="no pic"
                  />
                )}
              </Link>
              <br />

              <Row className=" md-ps-0 ps-3 mb-4">
                <Col lg={6} md={6} xs={5}>
                  <Like tweet_id={tweet_id} />
                </Col>
                <Col lg={6} md={6} xs={5}>
                  <Comment tweet_id={tweet_id} />
                </Col>
              </Row>
            </Col>
          </Row>

          <EditTweet
            show={modalShow}
            onHide={() => setmodalshow(false)}
            caption={tweet.caption}
            tweet_id={tweet_id}
          />
        </Container>
      )}
    </div>
  );
}
