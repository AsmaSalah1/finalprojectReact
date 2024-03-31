import React, { useState } from "react";
import style from "./forgetPassword.module.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
        {
          email: user.email,
          password: user.password,
          code: user.code,
        }
      );
      toast.success("😄 The password has been changed successfully !", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/signin");
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "invalid code") {
        toast.error("invalid code", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };
  const handelChange = (e) => {
    // console.log("e= ", e.target);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log("userEmail= ", userEmail);
  };
  return (
    <>
      <div className={style.bod}>
        <div className={style.seasonone}>
          <p className={style.text__one}> forget Password ? </p>
        </div>

        {/* <h2 className={style.title3}> forget Password ? </h2> */}

        <div className={style.loginBox}>
          <form onSubmit={handelSubmit}>
            {/* <p>Please enter your email to try to change your password</p> */}
            <div className={style.userBox}>
              <label>Email</label>
              <input
                placeholder="Enter your email"
                type="email"
                value={user.email}
                name="email"
                onChange={handelChange}
              />
            </div>
            <div className={style.userBox}>
              <label>New password</label>
              <input
                placeholder="Enter the new password"
                type="password"
                value={user.password}
                name="password"
                onChange={handelChange}
              />
            </div>
            <div className={style.userBox}>
              <label>Code</label>
              <input
                placeholder="Enter the code"
                type="text"
                value={user.code}
                name="code"
                onChange={handelChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-dark s">
              submit
            </button>
            {/* {style.s} */}
            {/* <button type="submit" className="s" disabled={loder?'disabled':''}  >{!loder?'submit':<Loader/>}</button> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
