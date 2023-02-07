import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { deleteComment } from "../api/tweet";
import EditComment from "./EditComment";
import defaultPic from "../images/profile.webp";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { timeFormat } from "../utlis/timeFormat";

export default function ShowComments({ comment_id }) {
  const dispatch = useDispatch();
  const [modalShow, setmodalshow] = useState(false);
  const tweet = useSelector((state) => state.tweet.tweetDetail.tweet);
  const comment = useSelector((state) =>
    state.tweet.tweetDetail.comments.find(
      (comment) => comment.id === comment_id
    )
  );
  const loginUserId = useSelector((state) => state.user.loginUserId);
  const time = timeFormat(comment.created_at);

  const handleDelete = async (comment_id) => {
    await deleteComment(tweet.id, comment_id, dispatch);
  };

  return (
    <Container style={{ border: "1px solid #F0F1F1", padding: "10px" }}>
      <Row>
        <Col lg={1} md={3}>
          <Link to={`/profile/${comment.user.id}`}>
            <img
              className="img_circle"
              src={comment.user.prof_pic ? comment.user.prof_pic : defaultPic}
              alt=""
            />
          </Link>
        </Col>
        <Col lg={11} md={8}>
          <div className="d-flex">
            <div className="me-1">{comment.user.name}.</div>
            <div style={{ color: "grey" }}>
              @{tweet.user.username}. {time}
            </div>
            <Col className="text-end">
              {comment.user.id === loginUserId && (
                <Button
                  className="mx-2"
                  variant="outline-primary"
                  onClick={() => setmodalshow(true)}
                >
                  Edit
                </Button>
              )}
              {(loginUserId === tweet.user.id ||
                comment.user.id === loginUserId) && (
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(comment_id)}
                >
                  Delete
                </Button>
              )}
            </Col>
          </div>

          <Row>
            <Col className="span">Replying to @{tweet.user.username}</Col>
          </Row>

          <Row>
            <Col>{comment.text}</Col>
          </Row>

          <br />
        </Col>
      </Row>
      <EditComment
        show={modalShow}
        setmodalshow={setmodalshow}
        onHide={() => setmodalshow(false)}
        comment={comment.text}
        comment_id={comment_id}
        tweet_id={tweet.id}
      />
    </Container>
  );
}
