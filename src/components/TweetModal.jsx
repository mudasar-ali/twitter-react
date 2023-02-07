import React from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import CreateTweet from "./CreateTweet";
import { getUserData } from "../api/user";
import defaultPic from "../images/profile.webp";

import { useDispatch, useSelector } from "react-redux";

export default function TweetModal({ show, onHide }) {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.user);
  const { data, loginUserId } = loginData;
  const image = data && (data.prof_pic || defaultPic);

  useEffect(() => {
    if (show) {
      const userData = async () => {
        await getUserData(loginUserId, dispatch);
      };
      userData();
    }
  }, [dispatch, loginUserId, show]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      static
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateTweet id="modal" onHide={onHide} user_pic={image} />
      </Modal.Body>
    </Modal>
  );
}
