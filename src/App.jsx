import React, { useEffect, useState } from "react";
import Navbar from "./component/navbar/Navbar";
import Home from "./pages/home/Home";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Roots1 from "./routs/Roots1";
import Categories from "./pages/categore/Categories";
import Cards from "./pages/cards/Cards";
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import Signin from './pages/signin/Signin';
import SignUp from "./pages/signUp/SignUp";
import ProtectedRouts from './component/ProtectedRouts';
import Details from './pages/details/Details';
import Products from "./pages/Products/Products";
import ProDetails from "./pages/proDetails/ProDetails";
import ProfileComponant from "./component/profileComponant/ProfileComponant";
import UserContextProvider from './contex/User';
import SendCode from './pages/sendCode/SendCode';
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import Profile from './pages/profile/Profile';
import Order from "./pages/order/Order";
import UserInfo from "./pages/userInfo/UserInfo";
import ProOrder from "./pages/proOrder/ProOrder";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots1 />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
  
        {
          path: "/products",
          element:        
             <Products  />

        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/cart",
          element: 
          <ProtectedRouts> 
             {/* عشان ما يدخل ع صفحة الكارت الا اذا كان مسجل دخول */}
          <Cards />
        </ProtectedRouts>
        },
          {
          path: "/signin",
          element: <Signin/>,
        },{
          path: "/signUp",
          element: <SignUp/>,
        },{
          path: "/details",
          element: <Details/>,
          //   path: "/categories/:id",
          //  element: <Details/>,
        },{
          path: "/proDetails",
          element: <ProDetails/>,
         
        },{
          path: "/sendCode",
          element: <SendCode/>,
        },{
          path: "/ForgetPassword",
          element: <ForgetPassword/>,
        },{
          path: "/UserProfile",
          element: <Profile/>,
         children:[ 
            // {
            //   index:true,
            //   element: <Profile/>
            // },
            {
            path: "/UserProfile",
              element: <UserInfo/>,
          },
          {
            path: "/UserProfile/ProOrder",
            element: <ProOrder/>,
          }
          ],
        
      
        },{
          path: "/order",
          element: <Order/>,
        }
        // ,{
        //   path: "/UserInformation",
        //   element: <UserInfo/>,
        // }
        
      ],
    },
  ]);



  return (
    <>
   
    <UserContextProvider >
    <RouterProvider router={router} />

    </UserContextProvider>

      <ToastContainer />

    </>
  );
}

export default App;


