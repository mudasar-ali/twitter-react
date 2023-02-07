import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { updateUser } from "../../api/user";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { VscFileMedia } from "react-icons/vsc";
import defaultPic from "../../images/profile.webp";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";

export default function UpdateProfile({ user_data, onHide, show }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    username: "",
    prof_pic: "",
    bio: "",
  });
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const profileImage = data && data.prof_pic ? data.prof_pic : defaultPic;

  useEffect(() => {
    setData({
      ...data,
      name: user_data.name,
      username: user_data.username,
      bio: user_data.bio,
      prof_pic: user_data.prof_pic,
    });
  }, []);

  const handleModalClose = () => {
    onHide();
    setImage(undefined);
    setData({
      ...data,
      name: user_data.name,
      username: user_data.username,
      bio: user_data.bio,
      prof_pic: user_data.prof_pic,
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    onHide();
    setLoading(true);
    const form = new FormData();
    form.append("name", data.name);
    form.append("username", data.username);
    image && form.append("prof_pic", data.prof_pic);
    form.append("bio", data.bio);
    await updateUser(form, onHide, dispatch);
    setLoading(false);
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
          Update Profile
        </Modal.Title>
        <button className="remove" onClick={handleModalClose}>
          {<GiCancel />}
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          {data && (
            <div className="form-container">
              {loading && (
                <Row>
                  <Col className="text-center">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="96"
                      visible={true}
                    />
                  </Col>
                </Row>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row container">
                  <div className="col-6 mt-3">
                    <h4>Name:</h4>
                    <input
                      type="text"
                      value={data.name}
                      name="name"
                      className="input"
                      onChange={handleChange}
                    />
                    <h4>User Name:</h4>
                    <input
                      type="text"
                      value={data.username}
                      name="username"
                      className="input"
                      onChange={handleChange}
                    />
                    <h4>Bio:</h4>
                    <input
                      type="text"
                      value={data.bio}
                      name="bio"
                      className="input"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6 mt-3">
                    <div className="ms-5">
                      <Row>
                        <div className="text-center mt-5">
                          <img
                            src={image ? image : profileImage}
                            alt="no img"
                            style={{
                              border: "1px solid grey",
                              height: "200px",
                              width: "200px",
                            }}
                          ></img>
                        </div>
                      </Row>
                      <Row>
                        <label
                          htmlFor="upload-photo"
                          className="label text-center"
                        >
                          <VscFileMedia></VscFileMedia>
                        </label>
                        <input
                          type="file"
                          name="prof_pic"
                          id="upload-photo"
                          className="upload-photo"
                          onChange={(e) => {
                            setData({
                              ...data,
                              [e.target.name]: e.target.files[0],
                            });
                            setImage(URL.createObjectURL(e.target.files[0]));
                          }}
                          accept="image/*"
                        />
                      </Row>
                    </div>
                  </div>
                </div>
                <div className="m-3">
                  <Button type="submit">Update Profile</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
