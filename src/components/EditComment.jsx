import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { editComment } from "../api/tweet";
import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";

export default function EditComment({
  show,
  onHide,
  comment,
  tweet_id,
  comment_id,
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ text: comment });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    await editComment(tweet_id, comment_id, data, dispatch);
    onHide();
  };

  const handleModalClose = () => {
    onHide();
    setData({ ...data, text: comment });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Your Comment
        </Modal.Title>
        <button className="remove" onClick={handleModalClose}>
          {<GiCancel />}
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="comment">
          <input
            type="text"
            placeholder="Tweet Your Reply"
            name="text"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
            value={data.text}
            autoFocus
          />
        </div>
        <div className="text-end">
          <button
            onClick={handleSubmit}
            disabled={data.text === ""}
            className={data.text !== "" ? "comment-btn" : "disabled"}
          >
            update reply
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
