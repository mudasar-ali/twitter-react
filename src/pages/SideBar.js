import React, { useState } from "react";
import SidebarOptions from "../components/SidebarOptions";
import LogOut from "../components/LogOut";
import TweetModal from "../components/TweetModal";

import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { CiHashtag } from "react-icons/ci";
import { RiNotification2Fill } from "react-icons/ri";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { FaRegListAlt, FaTwitter } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function SideBar() {
  const loginUserId = useSelector((state) => state.user.loginUserId);
  const [active, setActive] = useState(null);
  const [modalShow, setmodalshow] = useState(false);
  const sideOptions = [
    { id: 1, icon: <FaTwitter />, to: "/home", style: "side-bar-icon" },
    { id: 1, text: "Home", icon: <AiFillHome />, to: "/home" },
    { id: 2, text: "Explore", icon: <CiHashtag />, to: "#" },
    { id: 3, text: "Notifications", icon: <RiNotification2Fill />, to: "#" },
    { id: 4, text: "Message", icon: <BsFillChatSquareTextFill />, to: "#" },
    { id: 5, text: "Bookmarks", icon: <BiBookmark />, to: "#" },
    { id: 6, text: "Lists", icon: <FaRegListAlt />, to: "#" },
    {
      id: 7,
      text: "Profile",
      icon: <CgProfile />,
      to: `/profile/${loginUserId}`,
    },
    { id: 8, text: "More", icon: <CiCircleMore />, to: "#" },
  ];

  return (
    <div className="mt-3 mb-5">
      <div>
        {sideOptions.map((option) => {
          return (
            <Link
              to={option.to}
              style={{ color: "inherit", textDecoration: "inherit" }}
              key={option.id + option.text}
            >
              <SidebarOptions
                text={option.text}
                icon={option.icon}
                stylee={option.style}
                id={option.id}
                active={active}
                setActive={setActive}
              />
            </Link>
          );
        })}
      </div>
      <Container>
        <Row>
          <button
            className=" tweet-bton mt-3 mb-3"
            onClick={() => setmodalshow(true)}
          >
            Tweet
          </button>
        </Row>
        <Row>
          <LogOut />
        </Row>
      </Container>
      <TweetModal show={modalShow} onHide={() => setmodalshow(false)} />
    </div>
  );
}
