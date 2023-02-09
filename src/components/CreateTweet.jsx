import React, { useState } from "react";
import "./tweet.css";
import { VscFileMedia } from "react-icons/vsc";
import { GiCancel } from "react-icons/gi";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createTweet } from "../api/tweet";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function CreateTweet({ id, user_pic, onHide, loginUserId }) {
  const dispatch = useDispatch();

  const [data, setData] = useState({ caption: "" });
  const [images, setImages] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const percentage = (data.caption.replace(/\s/g, "").length * 100) / 20;
  let removeWords;
  if (percentage > 100) {
    removeWords = 20 - data.caption.replace(/\s/g, "").length;
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const removeImage = (index) => {
    // const remainingUrls = imageUrl.filter((item, e) => e !== index);
    // setImageUrl([remainingUrls]);
    // const remainingImages = images.filter((item, e) => e !== index);
    // setImages(remainingImages);
    setImageUrl([]);
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.caption === "") {
      toast.error("caption can not be blank", { autoClose: 2000 });
    }
    const form = new FormData();
    form.append("caption", data.caption);
    form.append("pictures", images);
    // images.forEach((file) => form.append("pictures", file));
    createTweet(form, dispatch).then(() => {
      setData({ ...data, caption: "" });
      onHide && onHide();
      setImageUrl([]);
      setImages([]);
    });
  };

  return (
    <Row>
      <Col lg={1}>
        <Link to={`/profile/${loginUserId}`}>
          <img className="img_circle mt-4 p-1" src={user_pic} alt="" />
        </Link>
      </Col>

      <Col lg={11}>
        <form className="tweet mt-3 ms-2">
          <span>
            <textarea
              type="textarea"
              placeholder="What's happening?"
              name="caption"
              onChange={(e) => handleChange(e)}
              value={data.caption}
              autoComplete="off"
              autoFocus
            />
          </span>
          <div className="d-flex">
            {imageUrl.length > 0 &&
              imageUrl.map((image, index) => {
                return (
                  <div key={image} className="me-2">
                    <button onClick={removeImage} className="remove">
                      {<GiCancel />}
                    </button>
                    <div className="d-flex">
                      <img
                        src={image}
                        alt="none is selected"
                        style={{ width: "185px", height: "250px" }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <hr />
          <label
            htmlFor={id}
            className={imageUrl.length >= 4 ? "disable-label" : "label"}
          >
            {<VscFileMedia />}
          </label>
          <input
            type="file"
            name="picture"
            id={id}
            className="upload-photo"
            onChange={(e) => {
              setImageUrl([
                ...imageUrl,
                URL.createObjectURL(e.target.files[0]),
              ]);
              setImages(e.target.files[0]);
            }}
            multiple
            disabled={imageUrl.length >= 4}
            accept="image/*"
          />
          <div style={{ display: "flex", float: "right" }}>
            {percentage > 0 && percentage <= 100 ? (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                }}
              >
                <CircularProgressbar value={percentage} />
              </div>
            ) : (
              <div
                style={{
                  minWidth: "30px",
                  height: "30px",
                  margin: "3px",
                  color: "red",
                }}
              >
                {removeWords}
              </div>
            )}

            <button
              type="button"
              className={
                data.caption !== "" && percentage <= 100
                  ? "tweet-btn"
                  : "disabled"
              }
              disabled={!(data.caption !== "" && percentage <= 100)}
              onClick={handleSubmit}
            >
              Tweet
            </button>
          </div>
        </form>
      </Col>
    </Row>
  );
}
