import axios from "axios";
import { toast } from "react-toastify";

import {
  getLoggenInUserId,
  isLoggedIn,
  request,
  loginUserData,
  userUpdate,
  userFollowings,
  userFollowers,
  userFollow,
  userUnfollow,
  notFound,
  fail,
} from "../features/user/user";
import { getTweetsData } from "../features/tweet/tweet";

export const loggedInDetail = async (dispatch) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL + "/auth/validate_token",
      {
        withCredentials: true,
      }
    );
    dispatch(isLoggedIn(res.data.success));
  } catch (err) {
    dispatch(isLoggedIn(false));
  }
};

export const registerUser = async (data) => {
  try {
    await axios.post(process.env.REACT_APP_BASE_URL + "/auth", data, {
      withCredentials: true,
    });
    toast.success("confirmation email has been sent", {
      autoClose: 3000,
    });
  } catch (error) {
    error.response.data.errors.full_messages.map((err) => {
      return toast.error(err, {
        autoClose: 5000,
      });
    });
  }
};

export const logIn = async (data, dispatch) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + "/auth/sign_in",
      data,
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    console.log(res.headers);
    localStorage.setItem("token", res.headers["authorization"].split(" ")[1]);
    localStorage.setItem("user_id", res.data.data.id);
    toast.success("Sign in successfully", {
      autoClose: 3000,
    });
    dispatch(isLoggedIn(true));
    dispatch(getLoggenInUserId(res.data.data.id));
    return "success";
  } catch (error) {
    error.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 6000,
      });
    });
  }
};

export const logoutUser = async () => {
  await axios.delete(process.env.REACT_APP_BASE_URL + "/auth/sign_out", {
    withCredentials: true,
  });
  window.localStorage.clear();
  window.location.href = "/";
  toast.success("Log out successfully", {
    autoClose: 3000,
  });
};

export const updateUser = async (data, onHide, dispatch) => {
  try {
    const res = await axios.patch(
      process.env.REACT_APP_BASE_URL + `/users/${localStorage.user_id}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch(userUpdate(res.data.user));
    toast.success(" data updated successfully", {
      autoClose: 3000,
    });

    onHide();
    return;
  } catch (error) {
    error.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 1000,
      });
    });
  }
};

export const getUserData = async (id, dispatch) => {
  dispatch(request());
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL + `/users/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(loginUserData(res.data.user));
    dispatch(getTweetsData(res.data.user.posts));
  } catch (err) {
    console.log(err);
    dispatch(notFound());
    err.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 2000,
      });
    });
  }
};

export const followUser = async (user, dispatch) => {
  try {
    await axios.post(
      process.env.REACT_APP_BASE_URL + `/users/${user}/follows`,
      {
        withCredentials: true,
      }
    );
    dispatch(userFollow(user));
    return "success";
  } catch (err) {
    dispatch(fail());
    err.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 2000,
      });
    });
  }
};

export const unFollowUser = async (user, dispatch) => {
  try {
    await axios.delete(
      process.env.REACT_APP_BASE_URL + `/users/${user}/follows/unfollow`,
      {
        withCredentials: true,
      }
    );
    dispatch(userUnfollow(user));

    return "success";
  } catch (err) {
    dispatch(fail());
    err.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 2000,
      });
    });
  }
};

export const suggestions = async () => {
  try {
    return await axios.get(
      process.env.REACT_APP_BASE_URL + "/users/suggestions",
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getFolllowing = async (id, dispatch, param) => {
  try {
    dispatch(request());
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL + `/users/${id}/follows`,
      {
        withCredentials: true,
        params: {
          option: param,
        },
      }
    );
    dispatch(userFollowings(res.data.follow_data));
  } catch (err) {
    dispatch(fail());
    err.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 2000,
      });
    });
  }
};

export const getFolllowers = async (id, disptach, param) => {
  try {
    disptach(request);
    const res = await axios.get(
      process.env.REACT_APP_BASE_URL + `/users/${id}/follows`,
      {
        withCredentials: true,
        params: {
          option: param,
        },
      }
    );

    disptach(userFollowers(res.data.follow_data));
  } catch (err) {
    disptach(fail());
    err.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 2000,
      });
    });
  }
};

export const searchUsers = async (name, tweet) => {
  try {
    return await axios.get(process.env.REACT_APP_BASE_URL + "/users/search", {
      withCredentials: true,
      params: {
        value: name,
        tweet,
      },
    });
  } catch (err) {
    err.response.data.errors.map((err) => {
      return toast.error(err, {
        autoClose: 2000,
      });
    });
  }
};

export const resetPasswordEmail = async (data) => {
  try {
    const res = await axios.post("/users/reset-password", data, {
      withCredentials: true,
    });
    toast.success(res.data, {
      autoClose: 3000,
    });
  } catch (error) {
    toast.error(error.response.data.msg, {
      autoClose: 5000,
    });
  }
};

export const resetPassword = async (id, token, data, navigate) => {
  try {
    await axios
      .post(`/users/${id}/reset-password/${token}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data, {
          autoClose: 3000,
        });
      });
    navigate("/login");
  } catch (error) {
    toast.error(error.response.data.msg, {
      autoClose: 5000,
    });
  }
};
