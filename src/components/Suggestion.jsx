import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { Row, Col } from "react-bootstrap";
import "./Suggestion.css";
import { suggestions } from "../api/user";
import FollowingBtn from "./FollowingBtn";
import { Link } from "react-router-dom";
import Search from "./Search";
import defaultPic from "../images/profile.webp";

export default function Suggestion() {
  const [bg, setBg] = useState(false);
  const [suggestedData, setSuggestedData] = useState();
  const [modalShow, setmodalshow] = useState(false);

  const suggestedUsers = async () => {
    const users = await suggestions();
    setSuggestedData(users.data);
  };
  const changeColor = () => {
    setBg(true);
    setmodalshow(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      setBg(false);
    });
    // suggestedUsers();
  }, []);

  return (
    <div>
      <div
        className={!bg ? "suggestion" : "suggestion-bg"}
        onClick={changeColor}
      >
        <span className={bg ? "search-icon-color" : "search-icon"}>
          <IoMdSearch />
        </span>
        <input type="text" placeholder="search Twitter"></input>
      </div>
      {suggestedData && suggestedData.length > 0 && (
        <div className="follow-suggestion">
          <div className="suggestion-text">You might like</div>

          {suggestedData.map((user) => {
            return (
              <Row className="p-2" key={user._id}>
                <Col lg={3}>
                  <Link to={`/profile/${user._id}`} className="Link">
                    <img
                      className="img_circle p-1"
                      src={
                        user.prof_pic && user.prof_pic.url
                          ? user.prof_pic.url
                          : defaultPic
                      }
                      alt=""
                    />
                  </Link>
                </Col>
                <Col lg={4} className="mt-1">
                  <Row className="suggestion-name">{user.name}</Row>
                  <Row className="suggestion-username">@{user.username}</Row>
                </Col>
                <FollowingBtn data={user} />
              </Row>
            );
          })}

          <p className="p-3" style={{ color: "rgb(29, 161, 242)" }}>
            Show More
          </p>
        </div>
      )}
      <div className="follow-suggestion">
        <div className="suggestion-text">Trends for you</div>
        <div className="p-2 ps-3">
          <div className="suggestion-username">Trending in Pakistan</div>
          <b>#byebyePti</b>
          <div className="suggestion-username">100k Tweets</div>
        </div>

        <div className="p-2 ps-3">
          <div className="suggestion-username">Trending in Pakistan</div>
          <b>#ja_Bajwa_ja</b>
          <div className="suggestion-username">100k Tweets</div>
        </div>

        <div className="p-2 ps-3">
          <div className="suggestion-username">Sports . Trending</div>
          <b>#PAKvsENG</b>
          <div className="suggestion-username">2,037 Tweets</div>
        </div>
        <div className="p-2 ps-3">
          <div className="suggestion-username">Trending in Pakistan</div>
          <b> #باجوہ_صاحب_جواب_دو</b>
          <div className="suggestion-username">2,037 Tweets</div>
        </div>
        <div className="p-2 ps-3">
          <div className="suggestion-username">Trending in Pakistan</div>
          <b>#عورتوں_کی_تذلیل_نامنظور</b>
          <div className="suggestion-username">37.2k Tweets</div>
        </div>
        <div className="p-2 ps-3">
          <div className="suggestion-username">Trending in Pakistan</div>
          <b>#عورتوں_کی_تذلیل_نامنظور</b>
          <div className="suggestion-username">2,037 Tweets</div>
        </div>
        <div className="p-2 ps-3">
          <div className="suggestion-username">Trending in Pakistan</div>
          <b>#TheLegendOfMaulaJutt</b>
          <div className="suggestion-username">8,091 Tweets</div>
        </div>
      </div>
      <Search show={modalShow} onHide={() => setmodalshow(false)} />
    </div>
  );
}
