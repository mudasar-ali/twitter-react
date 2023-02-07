import React, { useEffect } from "react";
import Signup from "./pages/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/LogIn";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import TweetComment from "./pages/TweetComment/TweetComment";
import { PageNotFound } from "./pages/PageNOtFound/PageNotFound";
import Protected from "./Protected";
import UnProtected from "./UnProtected";
import FollowDetails from "./pages/FollowDetails/FollowDetails";
import SideBar from "./pages/SideBar";
import { Row, Col, Container } from "react-bootstrap";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ResetPassword from "./pages/ResetPasswordEmail/ResetPasswordEmail";
import ChangePassword from "./pages/ResetPassword/ResetPassword";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { loggedInDetail } from "./api/user";
import { getLoggenInUserId } from "./features/user/user";

const HandleRoutes = () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    loggedInDetail(dispatch);
  }, [dispatch]);
  useEffect(() => {
    dispatch(getLoggenInUserId());
  }, [dispatch, loggedIn]);
  return (
    <Router>
      <Container>
        <Row>
          {loggedIn === true && (
            <Col lg={2} md={3} xs={3}>
              <div className="fixed">
                <SideBar />
              </div>
            </Col>
          )}
          <Col lg={10} md={8} xs={9}>
            <Routes>
              {loggedIn === true ? (
                <Route path="/" element={<Protected component={<Home />} />} />
              ) : (
                <Route
                  path="/"
                  element={<UnProtected component={<Login />} />}
                />
              )}
              <Route
                path="/signup"
                element={<UnProtected component={<Signup />} />}
              />
              <Route
                path="/login"
                element={<UnProtected component={<Login />} />}
              />

              <Route
                path="/auth/:confirmation"
                element={<UnProtected component={<VerifyEmail />} />}
              />
              <Route
                path="/users/:id/reset-password/:token"
                element={<UnProtected component={<ChangePassword />} />}
              />
              <Route
                path="/reset-password"
                element={<UnProtected component={<ResetPassword />} />}
              />
              <Route
                path="/profile/:id"
                element={<Protected component={<Profile />} />}
              />
              <Route
                path="/home"
                element={<Protected component={<Home />} />}
              />
              <Route
                path="/tweet/:id"
                element={<Protected component={<TweetComment />} />}
              />
              <Route
                path="/:id/:followDetails"
                element={<Protected component={<FollowDetails />} />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default HandleRoutes;
