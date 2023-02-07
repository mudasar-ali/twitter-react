import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import "./VerifyEmail.css";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const url = window.location.href.split("/")[4];

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        await axios.get(`/auth/${url}`, {
          withCredentials: true,
        });
        toast.success("Email confirmed successfully", {
          autoClose: 3000,
        });
      } catch (error) {
        error.response.data.errors.map((err) => {
          return toast.error(err, {
            autoClose: 3000,
          });
        });
      }
    };
    verifyEmailUrl();
  }, [url]);

  return (
    <div>
      <div className="containerr">
        <img src={success} alt="success_img" className="success_img" />
        <h1>Email verified successfully</h1>
        <Link to="/login">
          <button className="green_btnn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
