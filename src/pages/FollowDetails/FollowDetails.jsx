import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Container, Tooltip, OverlayTrigger } from "react-bootstrap";

import { getUserData } from "../../api/user";
import Suggestions from "../../components/Suggestion";
import FollowingBtn from "../../components/FollowingBtn";
import { getFolllowing, getFolllowers } from "../../api/user";
import Top from "../../components/Top";
import ShowCard from "../../components/ShowCard";
import defaultPic from "../../images/profile.webp";

import { RotatingLines } from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";

export default function FollowDetails() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user);
  const { data, followFollowing, loading, loginUserId } = userDetail;
  const user_id = useParams().id;
  const followDetail = useParams().followDetails;

  useEffect(() => {
    const user = async () => {
      getUserData(user_id, dispatch);

      if (followDetail === "following") {
        await getFolllowing(user_id, dispatch, followDetail);
      }
      if (followDetail === "followers") {
        await getFolllowers(user_id, dispatch, followDetail);
      }
    };
    user();
  }, [followDetail, user_id, dispatch]);

  return (
    <div>
      {data && (
        <Row>
          <Col lg={8} sm={11} md={12}>
            <Container>
              <Top
                topField={data.name}
                lowerField={`@${data.username}`}
                followDetail={followDetail}
                user_id={user_id}
              />
            </Container>

            <Container>
              <Container style={{ border: "1px solid #F0F1F1" }}>
                {loading ? (
                  <Row>
                    <Col className="m-3 text-center">
                      <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                      />
                    </Col>
                  </Row>
                ) : (
                  followFollowing.map((user) => {
                    return (
                      <Row className="p-2" key={user.id}>
                        <Col lg={2}>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                <ShowCard
                                  user={user}
                                  loginUserId={loginUserId}
                                />
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <Link to={`/profile/${user.id}`} className="Link">
                              <img
                                className="img_circle"
                                src={user.prof_pic ? user.prof_pic : defaultPic}
                                alt=""
                              />
                            </Link>
                          </OverlayTrigger>
                        </Col>
                        <Col lg={4}>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                <ShowCard
                                  user={user}
                                  loginUserId={loginUserId}
                                />
                              </Tooltip>
                            )}
                            placement="bottom"
                          >
                            <div>
                              <Row className="suggestion-name">{user.name}</Row>
                              <Row className="suggestion-username">
                                @{user.username}
                              </Row>
                            </div>
                          </OverlayTrigger>
                          <Row>{user.bio}</Row>
                        </Col>
                        {loginUserId !== user.id && (
                          <FollowingBtn data={user} />
                        )}
                      </Row>
                    );
                  })
                )}
              </Container>
            </Container>
          </Col>
          <Col lg={4} className="d-none d-lg-block">
            <Suggestions />
          </Col>
        </Row>
      )}
    </div>
  );
}
