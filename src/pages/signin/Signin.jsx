import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { object, string } from "yup";
import Loader from "../../component/loader/Loader";
import { UserContext } from "../../contex/User";
import "./signIn.css";
function Signin() {
  const { setUserToken } = useContext(UserContext);
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

  const validatrData = async () => {
    const logInSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20).required(),
    });
    try {
      //عملية المطابقة بتوخذ وقت
      await logInSchema.validate(users, { abortEarly: false }); //عشان يرجعلي كل الايرورز
      return true;
    } catch (error) {
      // console.log("Validation Error",error.errors);
      setError(error.errors);
      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = await validatrData();
    //لما يكون عندي فايل عشان ارسل الداتا للباك لازم اعمل:
    //براميتر فيه الداتا الي بدي ارسلهاform data
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        users
      );
      if (data.message === "success") {
        toast.success("😄 You have been logged in successfully", {
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
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
      }
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "plz confirm your email") {
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
      } else if (error.response.data.message === "data invalid") {
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
  if (loader) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <div className="me"></div>

      <div className="bod">
        <div className="seasonone">
          <p className="text__one"> Sign In </p>
        </div>

        {console.log(errors)}
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
            <Link className="sendCodeLink" to="/sendCode">
              Forget Password ?
            </Link>
            <button
              type="submit"
              className="btn btn-outline-dark s "
              disabled={loader ? "disabled" : ""}
            >
              {!loader ? "Log in" : <Loader />}
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
  //    const [error,setError]=useState([]);
  //     const [users,setUsers]=useState({
  //         userName:'',
  //         email:'',
  //         password:'',
  //         image:''
  //     });
  //     const  handelChange=(e)=>{
  //         const {name,value} = e.target;
  //         setUsers({
  //             ...users,
  //             [name]:value
  //         });
  //     };

  //     const handelSubmit= async(e)=>{
  //         e.preventDefault();
  //         const validate=await validatrData();
  // console.log(validate);
  //         //براميتر فيه الداتا الي بدي ارسلها
  //         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`);
  //         console.log(data);
  //     }

  //     const validatrData= async()=>{

  //       const signInSchema=object({
  //           email:string().email().required(),
  //           password:string().min(8).max(20).required(),
  //       });
  //       try{
  //   //عملية المطابقة بتوخذ وقت
  //   await signInSchema.validate(users,{abortEarly:false});
  //   return true;
  //       }
  //       catch(error){
  //           console.log("Validation Error",error.errors);
  //           setError(error.errors);
  //           return false;
  //       }

  //     };

  //   return (
  //     <>

  //      {error.length>0?error.map(err =>
  // <div className="alert alert-warning alert-dismissible fade show" role="alert" key={1}>
  //   <strong>{err}</strong>
  //   <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
  // </div>
  //     ):''}

  //      <form onSubmit={handelSubmit}>

  //         <label>Email</label>
  //         <input type="email" value={users.email} name="email" onChange={handelChange}/>

  //         <label>Password</label>
  //         <input type="password" value={users.password} name='password' onChange={handelChange}/>

  //          <button type='submit'>submit</button>
  //               </form>

  //     </>
  //   )
}

export default Signin;
