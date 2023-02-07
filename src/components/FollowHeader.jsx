import React from "react";
import "./Top.css";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function FollowHeader({ btnName, check }) {
  const user_id = useParams().id;
  const followDetail = useParams().followDetails;
  return (
    <Col lg={6} className="text-center hover-effect">
      <Link to={`/${user_id}/${check}`} className="Link">
        <Row>
          <span
            className={
              followDetail === check ? "active-follow" : "nonactive-follow"
            }
          >
            {btnName}
          </span>
        </Row>
        <div className={followDetail === check && "botton-border"}></div>
      </Link>
    </Col>
  );
}
