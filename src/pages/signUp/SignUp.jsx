import React from "react";
import { useState } from "react";
import "./signUp.css";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import Loader from "../../component/loader/Loader";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [errors, setError] = useState([]);
  const [users, setUsers] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUsers({
      ...users,
      [name]: value,
    });
  };

  const handelImageChange = (e) => {
    const { name, files } = e.target;
    setUsers({
      ...users,
      [name]: files[0], //هاد بحتوي على الصوره بحالها
    });
    //console.log(users);
  };
  const validatrData = async () => {
    const RegisterSchema = object({
      userName: string().min(4).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });
    try {
      //عملية المطابقة بتوخذ وقت
      await RegisterSchema.validate(users, { abortEarly: false }); //عشان يرجعلي كل الايرورز
      return true;
    } catch (error) {
      //  console.log("Validation Error",error.errors);
      setError(error.errors);
      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const validate = await validatrData();
    //console.log(validate);
    //لما يكون عندي فايل عشان ارسل الداتا للباك لازم اعمل:
    const formData = new FormData();
    formData.append("userName", users.userName);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("image", users.image);

    //براميتر فيه الداتا الي بدي ارسلهاform data
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData
      );
      //console.log(data);
      if (data.message === "success") {
        toast.success("😄 Account created sucssesfully !", {
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
      navigate("/signin");
    } catch (error) {
      if (error.response.data.message === "email already exists") {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="me"></div>

      <div className="bod">
        <div className="seasonone">
          <p className="text__one"> Sign Up</p>
        </div>
        {errors.length > 0
          ? errors.map((err) => (
              <div
                className="alert alert-warning alert-dismissible fade show"
                role="alert"
                key={1}
              >
                <strong>{err}</strong>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                />
              </div>
            ))
          : ""}

        <div className="login-box">
          <form onSubmit={handelSubmit}>
            <div className="user-box">
              <label>User Name</label>
              <input
                type="text"
                value={users.userName}
                name="userName"
                onChange={handelChange}
              />
            </div>

            <div className="user-box">
              <label>Email</label>
              <input
                type="email"
                value={users.email}
                name="email"
                onChange={handelChange}
              />
            </div>
            <div className="user-box">
              <label>Password</label>
              <input
                type="password"
                value={users.password}
                name="password"
                onChange={handelChange}
              />
            </div>

            <div className="user-box">
              <label>Image</label>
              <input
                type="file"
                name="image"
                className="ss"
                onChange={handelImageChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark s"
              disabled={loader ? "disabled" : ""}
            >
              {!loader ? "submit" : <Loader />}
            </button>
          </form>
        </div>
      </div>
      {/* <div className="login-box">
  <h2>Sign Up</h2>
  <form>
    <div className="user-box">
      <input type="text" name required />
      <label>Username</label>
    </div>
    <div className="user-box">
      <input type="password" name required />
      <label>Password</label>
    </div>
    <a href="#">
      <span />
      <span />
      <span />
      <span />
      Submit
    </a>
  </form>
</div> */}
    </>
  );
}

export default SignUp;
