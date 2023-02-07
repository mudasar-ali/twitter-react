import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function UnProtected({ component }) {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn === true) {
      navigate("/home");
    }
  });
  return <div>{component}</div>;
}
