import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "./proile.module.css";
import ProfileComponant from "./../../component/profileComponant/ProfileComponant";
function Profile() {
  return (
    <>
      <div className={style.all}>
        <ProfileComponant />
        <Outlet />
      </div>
    </>
  );
}

export default Profile;

// <div className="profile" key={1}>
{
  /* <div className="profile-img">
                    <img src={profile.image.secure_url} alt="avatar" />
                </div> */
}
//         <h1>{profile.userName}</h1>
//         <p>{profile.email}</p>

// </div>
//
