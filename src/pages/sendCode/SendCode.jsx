import React, { useState } from "react";
import style from "./sendCode.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function SendCode() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/auth/sendcode`,
      {
        email: userEmail,
      }
    );
    toast.success("Plz check your Email !", {
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
    navigate("/ForgetPassword");
  };

  const handelChange = (e) => {
    // console.log("e= ", e.target);
    const email = e.target.value;
    // console.log("Email=", email);
    setUserEmail(email);
    // console.log("userEmail= ", userEmail);
  };
  // if(loder) {
  //   return <Loader/>;
  // }
  return (
    <>
      <div className={style.bod}>
        <div className={style.seasonone}>
          <p className={style.text__one}> forget Password ? </p>
        </div>

        {/* <h2 className={style.title3}> forget Password ? </h2> */}

        <div className={style.loginBox}>
          <form onSubmit={handelSubmit}>
            <p>Please enter your email to try to change your password</p>
            <div className={style.userBox}>
              <label>Email</label>
              <input
                type="email"
                value={userEmail}
                name="userEmail"
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

export default SendCode;
