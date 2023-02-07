import React from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import defaultPic from "../images/profile.webp";
import FollowingBtn from "./FollowingBtn";

export default function ShowCard({ user, loginUserId }) {
  return (
    <Container>
      <Row className="pt-2">
        <Col lg={6} className="text-start">
          <Link to={`/profile/${user.id}`} className="Link">
            <img
              className="img_circle"
              src={user.prof_pic || defaultPic}
              alt=""
            />
          </Link>
        </Col>
        <Col lg={6}>
          {loginUserId !== user.id && <FollowingBtn data={user} />}
        </Col>
      </Row>
      <Row className="text-start">
        <b>{user.name}</b>
      </Row>
      <Row className="text-start ps-2" style={{ color: "grey" }}>
        @{user.username}
      </Row>
      <Row className="ps-2 pt-3 pb-3">Tm Na chorna mje</Row>
      <div className="d-flex ">
        <div className="following me-3">
          <b>
            <span className=" me-1">{user.followings.length}</span>
          </b>
          <span className="top-tweets">Followings</span>
        </div>
        <div className="following">
          <b>
            <span className=" me-1">{user.followers.length}</span>
          </b>
          <span className="top-tweets">Followers</span>
        </div>
      </div>
    </Container>
  );
}
