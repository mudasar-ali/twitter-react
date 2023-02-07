import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Protected({ component }) {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login");
    }
  });

  return <div>{component}</div>;
}
