import React from "react";
import "./Top.css";
import { Col, Row, Container } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import FollowHeader from "./FollowHeader";
import { useNavigate, useParams } from "react-router-dom";

export default function Top({ topField, lowerField, followDetail, tweets }) {
  const navigate = useNavigate();
  const user_id = useParams().id;

  const handleClick = () => {
    if (followDetail) {
      navigate(`/profile/${user_id}`);
    }
    if (tweets >= 0) {
      navigate("/home");
    }
  };

  return (
    <Container className={lowerField && "top"}>
      <Row>
        {lowerField && (
          <Col lg={1} className="top-start" onClick={handleClick}>
            <div className="top-start-icon">{<FiArrowLeft />}</div>
          </Col>
        )}
        <Col lg={11} className="top-div">
          <p className={"top-name"}>{topField}</p>

          <p className="top-tweets  ">{lowerField}</p>
        </Col>
      </Row>
      {followDetail && (
        <Row className="mt-2">
          <FollowHeader btnName="Followers" check="followers" />
          <FollowHeader btnName="Following" check="following" />
        </Row>
      )}
    </Container>
  );
}
