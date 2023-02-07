import React from "react";
import "./tweet.css";
import { Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import { createComment } from "../api/tweet";
import defaultPic from "../images/profile.webp";

import { useSelector, useDispatch } from "react-redux";

export default function CreateComment({
  show,
  setModalShow,
  onHide,
  tweet_id,
}) {
  const dispatch = useDispatch();
  const loginUserImage = useSelector(
    (state) => state.user.data && state.user.data.prof_pic
  );

  const tweet = useSelector((state) => {
    return (
      state.tweet.tweets.find((t) => t.id === tweet_id) ||
      state.tweet.tweetDetail.tweet
    );
  });

  const [comment, setComment] = useState({
    text: "",
  });

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    await createComment(tweet_id, comment, dispatch);
    setModalShow(false);
  };
  return (
    <Modal
      className="modal"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tweet.user && (
          <Row>
            <Col lg={1}>
              <img
                className="img_circle"
                src={tweet.user.prof_pic && (tweet.user.prof_pic || defaultPic)}
                alt=""
              />
            </Col>
            <Col lg={10} className="ms-3 mt-2">
              <div className="d-flex">
                <div>
                  <b>{tweet.user.name}</b>
                </div>
                <div style={{ color: "grey" }}>@{tweet.user.username} .</div>
              </div>
              <div>{tweet.caption}</div>
              <br />
              <div style={{ color: "grey" }}>
                Replying to <span className="span">@{tweet.user.username}</span>
              </div>
              <br />
            </Col>
          </Row>
        )}

        <Row>
          <Col lg={1}>
            <img
              className="img_circle"
              src={loginUserImage || defaultPic}
              alt=""
            />
          </Col>
          <Col lg={10} className="ms-3 ">
            <div className="comment">
              <input
                type="text"
                placeholder="Tweet Your Reply"
                name="text"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                autoFocus
              />
            </div>
            <br />
            <br />
            <br />
            <div className="text-end">
              <button
                className={
                  comment.text === "" ? "comment-disable" : "comment-btn"
                }
                disabled={comment.text === ""}
                onClick={handleSubmit}
              >
                Reply
              </button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
