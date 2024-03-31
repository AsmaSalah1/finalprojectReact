import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { UserContext, useMyContex } from '../../contex/User';
import axios from 'axios';
function Navbar() {
  // const[quantity,setQuantity] =useState(0);
  const[cartProducts,setartProducts] =useState([]);
  // const {cart1}=useMyContex();
  const {userName,setUserToken,setUserName,cartNum,setcartNumber}=useContext(UserContext);
  const logOut=()=>{
    localStorage.removeItem('userToken');
    // localStorage.removeItem('cartNum');
    setcartNumber(cartNum);
    setUserToken(null);
    setUserName(null);
  }
  const getData = async () =>{
    try{
   
    const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers:{Authorization: `Tariq__${token}` },
      });
    // setQuantity(data.products.length)
    setartProducts(data.products);
  }
  catch(err){
    console.log('error',err);
  }
  }
useEffect(()=>{
  getData();
},[] );
  return (
    <>
  <nav className={`${styles.r} navbar navbar-expand-lg bg-body-tertiary sticky-top`}>
  <div className={`container-fluid ${styles.containerr}`}>
    <img className={styles.logo} src='/logo22.png'/>

    {userName?
    <>
    {/* <span className={styles.welcome}>  Welcome <span className={styles.welcomeUser}>{userName}</span></span> */}
    </>
    :<>
    
    </>
    } 
    {/* <a className="navbar-brand" href="#">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className= {`${styles.re} collapse navbar-collapse `} id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 link">
      <li className="nav-item">
          <NavLink className= {` nav-link `}
           to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={` nav-link `} aria-current="page" to="/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link `} to="/products">Products</NavLink>
        </li>
        {userName? <>
          <li className="nav-item">
          <NavLink className={`nav-link  position-relative ` } to="/cart">Cart
          <svg className={styles.svgCart} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">{/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" /></svg>
       <span  className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger `}>
 {/* {localStorage.getItem('cartNum')?localStorage.getItem('cartNum'):0} */}
{cartNum==0?0:cartNum}
  <span className="visually-hidden">unread messages</span>
</span>

          </NavLink>
        </li>     

        </>
        :
        <>
        </>}
      </ul>
      {userName? <>


   <div className="dropdown">
  <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  {userName}
  </button>
  <ul className="dropdown-menu dropdown-menu-dark">
    <li>
    <NavLink  className="dropdown-item" to="/UserProfile">Profile</NavLink>
      
      </li>
    <li>
    <NavLink onClick={logOut}  className="dropdown-item" to="/Signin">Log Out</NavLink>
      </li>
  </ul>
</div>



        {/* <NavLink onClick={logOut} className="btn btn-outline-secondary px-4 mx-2" to="/Signin">Log Out</NavLink> */}

        </>
        :
        <>
        <NavLink className={`btn btn-outline-secondary px-4 mx-2  ${styles.fontWeight}`} to="/signin">Sign in</NavLink>
<NavLink className="btn btn-outline-secondary px-4 mx-2" to="/SignUp">Sign up</NavLink>
        </>}


{/* <button type="button" className="btn btn-outline-secondary px-4 mx-2">Sign in</button>
<button type="button" className="btn btn-outline-secondary px-3 mx-2">Sign out</button> */}


    </div>
  </div>
</nav>





    </>

    )
}

export default Navbar