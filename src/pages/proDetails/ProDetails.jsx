import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Style from "./proDetails.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Bounce, toast } from "react-toastify";

import "swiper/css/navigation";
import "./proDetails.module.css";
import { Pagination, Navigation } from "swiper/modules";
import Loader from "../../component/loader/Loader";
//import './style.css'
import { UserContext, useMyContex } from "../../contex/User";
import Stars from "../../component/Stars";

function ProDetails() {
  const { cart1, setCart1 } = useMyContex();

  const { userName, setcartNumber } = useContext(UserContext);
  const [userReview, setUserReview] = useState({
    comment: "",
    rating: "",
  });
  const [details, setDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  // const {setcartNumber}=useContext(UserContext);
  const getDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search); //بترجعلي الراميترز الموجودة بالرابط
    const id = urlParams.get("id"); //بتجيب الاي دي
    //  console.log("id=",id);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    //   console.log("data",data.product  );
    await setDetails(data.product); //عشان بوخد وقت تا يجيب الداتا
    // console.log("rev",data.product.reviews);
    setReviews(data.product.reviews);
    setImages(data.product.subImages);
    setLoader(true);
  };
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      //setCart1([...cart1,details]);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      //console.log(data.cart.products.length);
      localStorage.setItem("cartNum", data.cart.products.length);
      setcartNumber(data.cart.products.length);
      // setcartNumber(data.cart.products);
      toast.success("The product has been added successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      if (err.response.data.message == "product already exists") {
        toast.error("product already exists in your cart", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          // theme: "dark",
        });
      }
    }
  };
  const createMyReview = async (id2) => {
    try {
      //console.log(userReview);
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${id2}/review`,
        userReview,
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      toast.success("Your comment has been added successfully 😄", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      getDetails();
    } catch (err) {
      //console.log(err);
      if (err.message === "Network Error") {
        toast.error("Network Error", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          // theme: "dark",
        });
      } else {
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          // theme: "dark",
        });
      }
    }
  };
  const myReview = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setUserReview({
      ...userReview,
      [name]: value,
    });
    // console.log(value);
  };
  useEffect(() => {
    getDetails();
  }, []);

  if (!loader) {
    return <Loader />;
  }
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        effect={"coverflow"}
        grabCursor={true}
        navigation={true}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        className={`mySwiper ${Style.mySwiper} `}
      >
        {images.map((img) => (
          <SwiperSlide className={Style.swiperslide} key={img.public_id}>
            <img className={Style.img2} src={img.secure_url} alt="..." />
          </SwiperSlide>
        ))}
      </Swiper>
      <h2 className={Style.addCart2}>{details.price} $ </h2>

      <button
        className={`btn btn-outline-secondary
       ${Style.addCart}`}
        onClick={() => addToCart(details._id)}
        disabled={userName ? "" : "disabled"}
      >
        {userName ? "Add to Cart" : "You must log in to add to the cart "}
      </button>

      <div className={Style.boddy}>
        {/* <div className={Style.img}>
  {images.map((img)=>(
    <img  className={Style.img2} key="1"src={img.secure_url}  alt="..." />
  ))}
 
  </div> */}

        {/* <img src={details.mainImage.secure_url}/> */}
        <div className={` ${Style.descrip} `}>
          <h4>{details.name}</h4>

          <p className="card-body">{details.description}</p>
        </div>

        <div className="d-flex justify-content-flex-start pt-3 pb-2 gap-4 flex-wrap">
          <input
            type="text"
            name="comment"
            value={userReview.comment}
            placeholder="+ Add a comment"
            className={`form-control addtxt ${Style.review1}`}
            onChange={myReview}
          />
          <input
            type="text"
            value={userReview.rating}
            name="rating"
            placeholder="+ Add a rating (from 0 to 5)"
            className={`form-control addtxt ${Style.review1}`}
            onChange={myReview}
          />
        </div>
        <button
          disabled={userName ? "" : "disabled"}
          className={`btn btn-outline-dark ${Style.review2}`}
          onClick={() => createMyReview(details._id)}
        >
          {userName
            ? " + Add  a comment "
            : "You must log in to add  a comment "}
        </button>
        {/* card */}
        <div className="d-flex flex-wrap   border-left border-right">
          {reviews.map((rev) => (
            <div className={`d-flex py-2   ${Style.k}`} key={rev._id}>
              <div className={`second py-2 px-2 ${Style.k2}`}>
                {" "}
                <span className="text1">Customer opinion : {rev.comment}</span>
                <div className="d-flex ">
                  <img
                    src={rev.createdBy.image.secure_url}
                    // "https://i.imgur.com/AgAC1Is.jpg"
                    width={33}
                  />
                  <span className="text2"> {rev.createdBy.userName}</span>
                </div>
                <div>
                  {/* <span className="text3">Customer rating : {rev.rating} </span> */}
                  <span>
                    Customer rating : <Stars reating={rev.rating} />
                  </span>
                </div>
              </div>
            </div>
            // <div className='reviews btn bg-sucsess' key={rev._id}>
            // <p>Customer opinion:{rev.comment}</p>
            // <p>Customer rating:{rev.rating}</p>
            //   </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProDetails;
