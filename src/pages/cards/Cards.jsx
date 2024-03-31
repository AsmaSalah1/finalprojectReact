import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import style from "./cart.module.css";
import { Bounce, toast } from "react-toastify";
import Loader from "./../../component/loader/Loader";
import Loader2 from "../../component/loader2/Loader2";
import { Link } from "react-router-dom";
import { UserContext } from "../../contex/User";
function Cards() {
  let totalPrice = 0;
  let totalPrice1 = 0;
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const { cartNum, setcartNumber } = useContext(UserContext);

  const [cartProducts, serCartProducts] = useState([]);
  const getData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${token}` },
      });
      // console.log(data.products.length);
      serCartProducts(data.products);
      // console.log('pro = ',cartProducts);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoader(false);
    }
  };

  const removeItem = async (productId) => {
    // console.log(productId);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        {
          productId,
        },
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      // console.log(data);
      localStorage.setItem("cartNum", data.cart.products.length);
      setcartNumber(data.cart.products.length);

      getData();
      // serCartProducts(data.cart.products);
      toast.success("The product has been cansled successfully", {
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
      console.log("error", err);
    }
  };
  const increaseQty = async (productId) => {
    setLoader2(false);

    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        {
          productId,
        },
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      // console.log(data);
      getData();
    } catch (err) {
      console.log("error", err);
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
    } finally {
      setLoader2(true);
    }
  };

  const decreaseQty = async (productId) => {
    setLoader3(false);
    //console.log('increaseQty');
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        {
          productId,
        },
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );

      getData();

      data.cart.products.map((p) => {
        if (p.quantity == 0) {
          removeItem(p.productId);
        }
      });
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoader3(true);
    }
  };

  const changePrice = () => {
    totalPrice = 0;
    cartProducts.map(
      (pro) => (totalPrice = totalPrice + pro.details.finalPrice * pro.quantity)
    );
    // details.map(item=>{
    //   totalPrice+=item.price*item.quantity;
    // })
  };
  const changePrice1 = () => {
    totalPrice1 = 0;
    cartProducts.map(
      (pro) => (totalPrice1 = totalPrice1 + pro.details.price * pro.quantity)
    );
  };
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      setcartNumber(0);
      // console.log(cartNum)
      serCartProducts([]);
      //console.log(data);
    } catch (err) {
      //console.log('error',err);
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
  };
  const clearCarts = async () => {
    // console.log(cartNum)
    // console.log("lvpfh")
    try {
      const token = localStorage.getItem(`userToken`);
      const { data } = await axios.patch(
        `https://ecommerce-node4.vercel.app/cart/clear`,
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setcartNumber(null);
      //  console.log("data")
      localStorage.setItem("cartNum", 0);
      setcartNumber(0);
      // setcartNumber(0);
      serCartProducts([]);
      toast.success("The cart has been successfully deleted 😄", {
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
  };
  useEffect(() => {
    getData();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {cartProducts.length > 0 ? (
        <div className={style.all}>
          <div className={style.carts}>
            {cartProducts.map((pro) => (
              <>
                <div className={style.cardBody}>
                  <div className={style.cardBody1}>
                    <label className={style.title}>Image</label>
                    <img
                      src={pro.details.mainImage.secure_url}
                      alt={pro.details.name}
                    />
                  </div>
                  <div className={style.cardBody1}>
                    <label className={style.title}>Product name</label>
                    <h6>{pro.details.name}</h6>
                  </div>
                  <div className={style.cardBody1}>
                    <label className={style.title}>Price $</label>
                    <p className="card-text">
                      {" "}
                      {pro.details.price * pro.quantity}{" "}
                    </p>
                  </div>
                  <div className={style.cardBody1}>
                    <label className={style.title}>Discount %</label>
                    <p className="card-text"> {pro.details.discount} </p>
                  </div>
                  <div className={style.cardBody1}>
                    <label className={style.title}>finalPrice $</label>
                    <p className="card-text">
                      {" "}
                      {pro.details.finalPrice * pro.quantity}
                    </p>
                  </div>
                  <div className={`${style.cardBody1}   `}>
                    <label className={style.title}>Quantity</label>
                    <div className="d-flex align-items-baseline  justify-content-center gap-1">
                      <button
                        onClick={() => increaseQty(pro.productId)}
                        className={style.button1}
                      >
                        {loader2 ? (
                          <svg
                            className={style.svgg}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                          </svg>
                        ) : (
                          <Loader2 />
                        )}
                      </button>
                      <p className={style.cardText}> {pro.quantity}</p>
                      <button className={style.button1}>
                        {loader3 ? (
                          <svg
                            className={style.svgg}
                            onClick={() => decreaseQty(pro.productId)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM152 232H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                          </svg>
                        ) : (
                          <Loader2 />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(pro.productId)}
                    className={`btn btn-outline-danger ${style.buttonRemove} `}
                  >
                    Remove
                  </button>{" "}
                </div>
              </>
            ))}
          </div>

          <div className={style.rightDiv}>
            <div className={style.nine}>
              <h2>
                T-Shop<span>Your Cart 🛒</span>
              </h2>
            </div>
            {changePrice()}
            {changePrice1()}
            <p className={`${style.moeny} ${style.font}`}>
              total without discount: <span>{totalPrice1} $</span>{" "}
            </p>
            <h5 className={style.moeny}>
              total with discount: <span>{totalPrice} $ </span>
            </h5>
            <button
              onClick={() => clearCarts()}
              className={` btn btn-dark ${style.button2}`}
            >
              {" "}
              clear cart
            </button>

            <Link
              to="/order"
              className={` btn btn-dark ${style.button2}`}
              disabled={cartProducts ? "disabled" : ""}
            >
              {cartProducts ? "Chekout $" : "You must insert product"}
            </Link>
          </div>
        </div>
      ) : (
        <h2 className={style.noCart}>no products in the cart</h2>
      )}
    </>
  );
}

export default Cards;
