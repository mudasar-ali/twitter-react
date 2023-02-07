import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="parent">
      <div className="not-found">
        <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
        <button onClick={() => navigate(-1)} className="comment-btn">
          Back
        </button>
      </div>
    </div>
  );
}
