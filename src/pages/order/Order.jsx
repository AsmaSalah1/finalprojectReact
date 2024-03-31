import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import style from "./order.module.css";
import Loader from "../../component/loader/Loader";
import { Bounce, toast } from "react-toastify";
import { number, object, string } from "yup";
import { UserContext } from "../../contex/User";

function Order() {
  const {setcartNumber}=useContext(UserContext);
  
  const [orders, setOrders] = useState([]);
  const [cartProducts, serCartProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [errors, setError] = useState([]);
  let totalPrice1 = 0;
  const [users, setUsers] = useState({
    couponName: "",
    address: "",
    phone: "",
  });
  const validatrData = async () => {
    const RegisterSchema = object({
      address: string().required(),
      phone: string().required(),
    });
    try {
      //عملية المطابقة بتوخذ وقت
      await RegisterSchema.validate(users, { abortEarly: false }); //عشان يرجعلي كل الايرورز
      return true;
    } catch (error) {
      // console.log("Validation Error",error.errors);
      setError(error.errors);

      errors.map((e) =>
        toast.error(e, {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      );

      return false;
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();
    const validate = await validatrData();
    //console.log(validate);
    if (validate) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/order`,
          users,
          {
            headers: {
              Authorization: `Tariq__${localStorage.getItem("userToken")}`,
            },
          }
        );
        setcartNumber(0);
        localStorage.setItem("cartNum", 0);
        //console.log("createOrder",data);
        if (data.message === "success") {
          toast.success("😄 Your order has been confirmed !", {
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
      } catch (err) {
        toast.error(err.response.data.message, {
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
    }
  };
  const getOrder = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/order`,
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${token}` },
      });
      // console.log(data.products);
      serCartProducts(data.products);
      // console.log('pro = ',cartProducts);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoader(false);
    }
  };

  const changePrice1 = () => {
    totalPrice1 = 0;
    cartProducts.map(
      (pro) =>
        (totalPrice1 = totalPrice1 + pro.details.finalPrice * pro.quantity)
    );
  };
  useEffect(() => {
    getOrder();
    getData();
  }, []);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUsers({
      ...users,
      [name]: value,
    });
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className={style.body}>
        <div className={style.nine}>
          <h3>
            T-Shop<span>Create Order</span>
          </h3>
        </div>

        <div className={style.swiperr}>
          {cartProducts.map((pro) => (
            <>
              <div className={style.cardBody}>
                <div className={style.cardBody1}>
                  <img
                    src={pro.details.mainImage.secure_url}
                    alt={pro.details.name}
                  />
                </div>
                <div className={`${style.cardBody1}   `}>
                  <label className={style.title}>Quantity : </label>
                  <p className={style.cardText}> {pro.quantity}</p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className={style.price4}>
          {changePrice1()}
          <h2> total price : {totalPrice1} $ </h2>
        </div>

        <div className={style.loginBox}>
          <form onSubmit={createOrder}>
            <div className={style.userBox}>
              <label className={style.labeel}>couponName</label>
              <input
                type="text"
                value={users.couponName}
                name="couponName"
                onChange={handelChange}
                placeholder="- optional -"
              />
            </div>
            <div className={style.userBox}>
              <label>address</label>
              <input
                type="text"
                value={users.address}
                name="address"
                onChange={handelChange}
                placeholder="- Enter your address  -"
                required
              />
            </div>
            <div className={style.userBox}>
              <label>phone</label>
              <input
                type="phone"
                value={users.phone}
                name="phone"
                onChange={handelChange}
                placeholder="- Enter your phone Number  -"
                required
              />
            </div>
            <button
              className="btn btn-outline-dark onClick"
              onClick={createOrder}
            >
              Create my Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Order;
