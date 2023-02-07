import { React } from "react";
import { logoutUser, loggedInDetail } from "../api/user";

import { useDispatch } from "react-redux";

import "./Logout.css";

export default function LogOut() {
  const dispatch = useDispatch();

  const loggingOut = async () => {
    await logoutUser();

    await loggedInDetail(dispatch);
  };
  return (
    <button className="btn btn-secondary btn-lg bton mt-3" onClick={loggingOut}>
      Log Out
    </button>
  );
}
