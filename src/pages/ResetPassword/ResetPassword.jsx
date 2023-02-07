import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../../api/user";

import { RotatingLines } from "react-loader-spinner";

export default function ChangePassword() {
  const param = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ password: "", rePassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(param.id, param.token, data, navigate);
    setLoading(false);
  };

  return (
    <div className="reset-password mt-5 ">
      {loading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="90"
          height="90"
          visible={true}
        />
      )}
      <div>
        <span className="icon ">
          <FaTwitter />
        </span>
      </div>
      <form className="mt-3 reset-password-input" onSubmit={handleSubmit}>
        <div className="mb-2 heading text-center">
          <h2>Reset your password</h2>
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter New Password"
            name="password"
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            value={data && data.password}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            name="rePassword"
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            value={data && data.rePassword}
          />
        </div>
        <div className="para">
          <p>
            Your password will be set accordingly so try using to make a strong
            password for your security
          </p>
        </div>
        <div className="para">
          <p>Please tap on below button to set a new password</p>
        </div>
        <div>
          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
