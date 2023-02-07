import React, { useState } from "react";
import "./ResetPasswordEmail.css";
import { FaTwitter } from "react-icons/fa";

import { resetPasswordEmail } from "../../api/user";

import { RotatingLines } from "react-loader-spinner";

export default function ResetPassword() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPasswordEmail(email);
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
            type="email"
            placeholder="Enter mail to reset password"
            name="email"
            onChange={(e) => {
              setEmail({ ...email, [e.target.name]: e.target.value });
            }}
            value={email && email.email}
          />
        </div>
        <div className="para">
          <p>
            you are receiving this email because you requested a password reset
            for your account
          </p>
        </div>
        <div className="para">
          <p>
            Please tap on below button to receive link for setting new password
          </p>
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
