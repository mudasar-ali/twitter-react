import React from "react";
import { Col } from "react-bootstrap";
import { followUser, unFollowUser } from "../api/user";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function FollowingBtn({ data }) {
  const dispatch = useDispatch();
  const loginUserId = useSelector((state) => state.user.loginUserId);
  const [disable, setDisable] = useState(false);
  const [buttonName, setButtonName] = useState(
    data.followers && data.followers.some((user) => user.user === loginUserId)
      ? "Following"
      : "Follow"
  );

  const [hovering, setHovering] = useState(buttonName);

  const handleFollow = (id) => {
    setDisable(true);
    followUser(id, dispatch).then((res) => {
      setDisable(false);
      if (res === "success") {
        setButtonName("Following");
        setHovering("Following");
      }
    });
  };

  const handleUnfollow = (id) => {
    setDisable(true);
    setHovering("");
    unFollowUser(id, dispatch).then((res) => {
      setDisable(false);
      if (res === "success") {
        setButtonName("Follow");
      }
    });
  };

  const handleHover = () => {
    setHovering("unfollow");
  };
  const handleMouseOut = () => {
    setHovering("Following");
  };

  return (
    <Col className="text-end">
      {data && (
        <button
          onClick={
            buttonName === "Following"
              ? () => handleUnfollow(data.id)
              : () => handleFollow(data.id)
          }
          className={
            buttonName === "Following" ? "following-btn" : "follow-btn"
          }
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
          disabled={disable}
        >
          {buttonName === "Following" ? hovering : buttonName}
        </button>
      )}
    </Col>
  );
}
