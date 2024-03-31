import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./userInfo.module.css";
import Loader from "../../component/loader/Loader";
function UserInfo() {
  const [loader, setLoader] = useState(true);
  const [profile, setProfile] = useState([]);
  const getProfile = async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      {
        headers: { Authorization: `Tariq__${token}` },
      }
    );
    //  console.log(data.user);
    setProfile(data.user);
    //  setLoader(false);
    setLoader(false);
  };
  useEffect(() => {
    getProfile();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className={style.cart}>
        <div className=" d-flex justify-content-center align-items-center ">
          <div
            className={`card mb-3 h-400 ${style.hei} d-flex justify-content-center align-items-center`}
            style={{ borderRadius: ".5rem" }}
          >
            <div className="row g-0 ">
              <div
                className="col-md-6 gradient-custom text-center"
                style={{
                  borderTopLeftRadius: ".5rem",
                  borderBottomLeftRadius: ".5rem",
                }}
              >
                <img
                  src={profile.image.secure_url}
                  //"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar"
                  className={style.avatar}
                  style={{ width: 150 }}
                />
                <h5 className={style.name}>{profile.userName}</h5>

                <i className="far fa-edit mb-5" />
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h6>Information</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Email</h6>
                      <p className="text-muted">{profile.email}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Phone</h6>
                      <p className="text-muted">123 456 789</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Link to='/userInformation'>userInformation</Link> */}
      </div>
    </>
  );
}

export default UserInfo;
