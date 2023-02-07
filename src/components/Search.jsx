import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";

import { searchUsers } from "../api/user";
import FollowingBtn from "./FollowingBtn";
import defaultPic from "../images/profile.webp";

import { useSelector } from "react-redux";

export default function Search({ show, onHide, showTweets }) {
  const loginUserId = useSelector((state) => state.user.loginUserId);
  const [search, setSearch] = useState([]);
  const [nameVal, setName] = useState("");

  useEffect(() => {
    const searchData = setTimeout(() => {
      if (nameVal) {
        searchUsers(nameVal).then((res) => {
          if (nameVal) setSearch(res.data.user);
        });
      } else {
        setSearch([]);
      }
    }, 1000);
    return () => clearTimeout(searchData);
  }, [nameVal, showTweets]);

  const handleModalClose = () => {
    onHide();
    setSearch([]);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="modal"
      aria-labelledby="contained-modal-title-vcenter"
      static
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Whom you want to find?
        </Modal.Title>
        <button className="remove" onClick={handleModalClose}>
          {<GiCancel />}
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="comment">
          <input
            type="text"
            placeholder="Search Users"
            name="name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            autoFocus
          />
        </div>
        {search.length > 0 &&
          search.map((user) => {
            return (
              <Container style={{ border: "1px solid #F0F1F1" }} key={user.id}>
                <Row className="p-2" key={user.id}>
                  <Col lg={8}>
                    <Link to={`/profile/${user.id}`} className="Link">
                      <Row>
                        <Col lg={2}>
                          <img
                            className="img_circle"
                            src={user.prof_pic || defaultPic}
                            alt=""
                          />
                        </Col>
                        <Col lg={10}>
                          <Row className="suggestion-name">{user.name}</Row>
                          <Row className="suggestion-username">
                            @{user.username}
                          </Row>
                          <Row>{user.bio}</Row>
                        </Col>
                      </Row>
                    </Link>
                  </Col>
                  <Col lg={4}>
                    {loginUserId !== user.id && <FollowingBtn data={user} />}
                  </Col>
                </Row>
              </Container>
            );
          })}
        {search.length === 0 && (
          <Row>
            <Col className="text-center suggestion-username">
              Try searching for people with name or username
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}
