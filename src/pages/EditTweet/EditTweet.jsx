import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateTweet } from "../../api/tweet";
import { GiCancel } from "react-icons/gi";
import { loggedInDetail } from "../../api/user";
import { useDispatch } from "react-redux";

export default function EditTweet({ show, tweet_id, caption, onHide }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ caption: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await loggedInDetail(dispatch);
    await updateTweet(tweet_id, data, dispatch);
    onHide();
  };

  const handleModalClose = () => {
    onHide();
    setData({ ...data, caption });
  };

  useEffect(() => {
    setData({ ...data, caption: caption });
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <button className="remove" onClick={handleModalClose}>
          {<GiCancel />}
        </button>
        <Modal.Title id="contained-modal-title-vcenter">Edit Tweet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="tweet">
          <div>
            <textarea
              type="text"
              placeholder="What's happening?"
              name="caption"
              onChange={(e) => handleChange(e)}
              value={data && data.caption}
              autoFocus
            />
          </div>
          <Button onClick={handleUpdate}>Update Tweet</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
