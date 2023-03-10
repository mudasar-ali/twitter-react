import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GiCancel } from "react-icons/gi";

import { searchUsers } from "../api/user";
import FollowingBtn from "./FollowingBtn";
import defaultPic from "../images/profile.webp";

import { useDispatch, useSelector } from "react-redux";
import { getTweetsData } from "../features/tweet/tweet";

import { AudioRecorder } from "react-audio-voice-recorder";
import { Audio } from "react-loader-spinner";
import axios from "axios";

export default function Search({ show, onHide, showTweets }) {
  const loginUserId = useSelector((state) => state.user.loginUserId);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameVal, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setName("");
  };

  const searchTweet = () => {
    searchUsers(nameVal, "tweet").then((res) => {
      dispatch(getTweetsData(res.data.tweets));
      navigate(`/search_tweets/${nameVal}`);
    });
  };

  const addAudioElement = async (blob) => {
    setLoading(true);
    const form = new FormData();
    form.append("audio_file", blob);

    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + "/users/transcribe",
      form,
      {
        withCredentials: true,
      }
    );
    setName(res.data.convert_text);
    setLoading(false);
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
        <div className="comment d-flex text-between">
          <input
            type="text"
            placeholder="Search Users"
            name="name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            value={nameVal}
            autoFocus
          />
          {loading && (
            <Audio
              height="40"
              width="50"
              radius="90"
              color="blue"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          )}
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
          />
        </div>
        {search.length === 0 && nameVal !== "" ? (
          <Row>
            <Col
              onClick={searchTweet}
              className="text-center suggestion-username suggestion-hover"
            >
              Try searching for "{nameVal}"
            </Col>
          </Row>
        ) : (
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
          })
        )}
        {nameVal === "" && (
          <Row>
            <Col className="text-center suggestion-username">
              Try searching for topics and people with name and username
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}
