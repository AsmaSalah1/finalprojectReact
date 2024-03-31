import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./proOrder.module.css";
import { Bounce, toast } from "react-toastify";
import Loader from "../../component/loader/Loader";
function ProOrder() {
  const [loader, setLoader] = useState(true);
  const [order, setOrders] = useState([]);
  let order2 = [];
  const canselOrder = async (id) => {
    // setLoader(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/order/cancel/${id}`,
        {},
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      getOrder();
      // setOrders(data.order);
      //  console.log("cansel = ",data);
      // getOrder();
      toast.success("The order has been cansled successfully", {
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

  const getOrder = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/order`,
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      //  console.log("order==",data.orders);
      setOrders(data.orders);
      //    setOrders2(data.orders.products);
      //    console.log("data",order2);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className={style.Aall}>
        {order.length > 0 ? (
          order.map((order) => {
            {
              order2 = order.products;
            }
            return (
              <div className={style.Mycard} key={order._id}>
                <div className={style.Mycard2}>
                  <h3 className={style.status}>
                    {" "}
                    status : <span>{order.status}</span>
                  </h3>
                  <h5 className="card-title"> address: {order.address}</h5>
                  <p className="card-text"> coupon Name: {order.couponName}</p>
                  <p className="card-text"> final Price: {order.finalPrice}</p>
                  <p className="card-text">phone Number: {order.phoneNumber}</p>
                  <div>
                    <div className={style.swipers}>
                      {order2.map((order2) => {
                        //   {proId=order.products.productId  }
                        //   {console.log("id = = =",proId.description )}

                        return (
                          <>
                            <div className={style.sumSwiper}>
                              {/* <p>{order2.productId.name}</p> */}
                              <img
                                className={style.images}
                                src={order2.productId.mainImage.secure_url}
                              />
                              <h6 key={5}>quantity : {order2.quantity}</h6>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    className="btn btn-dark"
                    onClick={() => canselOrder(order._id)}
                  >
                    cansel
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className={style.hh1}>No orders Yet</h1>
        )}
      </div>
    </>
  );
}

export default ProOrder;
