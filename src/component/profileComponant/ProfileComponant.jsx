import React from "react";
import { Link } from "react-router-dom";
import style from "./profileComponant.module.css";
function ProfileComponant() {
  return (
    <>
      <div className={style.sideBar}>
        <Link className={style.sideBareInfo} to="/UserProfile">
          user Information
        </Link>
        <Link className={style.sideBareInfo} to="/UserProfile/ProOrder">
          My Orders
        </Link>
      </div>
    </>
  );
}

export default ProfileComponant;
