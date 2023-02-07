import React from "react";
import "./SidebarOptions.css";

export default function SidebarOptions(props) {
  return (
    <div>
      <div className="side_options">
        <span className={props.stylee ? props.stylee : "side-icon"}>
          {props.icon}
        </span>
        <span
          className={` d-none d-lg-inline sidebar-option ${
            props.active === props.id ? "active" : ""
          }`}
          onClick={() => props.setActive(props.id)}
        >
          {props.text}
        </span>
      </div>
    </div>
  );
}
