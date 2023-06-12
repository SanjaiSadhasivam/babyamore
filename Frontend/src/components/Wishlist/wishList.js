import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../layout/layout";
import { useCookies } from "react-cookie";
import {
  API_URL,
  API_Product,
  API_CART,
  token,
  API_WISH,
} from "../../config/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
/**---------------------------------Pages-------------------------------------------- */
import "./wishList.css";
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const WishList = ({ className, id }) => {
  const {
    addTocart,
    GetCartdatas,
    getCartItemsLocal,
    carts,
    view_cart,
    wishlist,
    addWishlist,
    GetWishlist,
  } = useContext(cartContext);
  const toastId = React.useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [wishlistData, setWishlistData] = useState([]);
  let navigate = useNavigate();
  const GetWishlists = () => {
    wishlist.map((currEle) => {
      if (currEle.Productlist_id == id) {
        return setWishlistData(currEle.product_id);
      }
    });
  };

  const handleWishlist = async (_id) => {
    let exit = wishlist.find((currEle) => currEle.Productlist_id == _id);

    if (exit) {
      let res = await axios.put(`${API_WISH}/delete/${exit.id}`);
      if (res) {
        if (!toast.isActive("wish_remove")) {
          toast.success("Removed from your wishlist", {
            toastId: "wish_remove",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            theme: "light",
            closeButton: false,
            draggable: true,
            className: "notificationToolTip",
          });
        }

        setTimeout(() => {
          GetWishlist();
          window.location.reload(false);
        }, 2000);
      }
    } else {
      var cartProducts = {
        userid: cookies.customer_id,
        CustomerName: cookies.fullName
          ? cookies.fullName === "undefined"
            ? cookies.email_address.slice(0, cookies.email_address.indexOf("@"))
            : cookies.fullName.substring(0, 18)
          : null,

        Productid: _id,
        ProductQuantity: 0,
        product_total: 0,
      };

      const Result = await axios.post(`${API_WISH}`, cartProducts, configss);
      if (Result) {
        if (!toast.isActive("wish_add")) {
            toast.success("Added to your wishlist", {
              toastId: "wish_add",
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              // pauseOnHover: true,
              theme: "light",
              closeButton: false,
              draggable: true,
              className: "notificationToolTip",
            });
          }
        

        GetWishlist();
      }
      // addWishlist(id, cookies.customer_id)
    }
  };

  useEffect(() => {
    GetWishlists();
  }, [wishlist]);

  return (
    // BUG - a bug needs to be fixed
    <>
      <label for="checkbox" className={className}>
        <div className="wishlist_label">
          {cookies.customer_id ? (
            <>
              {wishlistData?.includes(id) ? (
                <>
                  <input type="checkbox" id="checkbox" className="" />
                  <div className="heart" onClick={() => handleWishlist(id)}>
                    <svg viewBox="0 0 544.582 544.582" className={"svg_fill"}>
                      <path
                        d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                      />
                    </svg>
                    {/* <svg viewBox="0 0 544.582 544.582" className={'svg_fill'}>
                                                    <path d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"/>
                                                </svg> */}
                  </div>
                </>
              ) : (
                <>
                  <input type="checkbox" id="checkbox" className="" />
                  <div className="heart" onClick={() => handleWishlist(id)}>
                    <svg viewBox="0 0 544.582 544.582" className={"svg"}>
                      <path
                        d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                      />
                    </svg>
                    {/* <svg viewBox="0 0 544.582 544.582" className={'svg'}>
                                                    <path d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"/>
                                                </svg> */}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {/* <Link to={"/login"}> */}
              <input type="checkbox" id="checkbox" className="" />
              <div className="heart" onClick={() => navigate("/login")}>
                <svg viewBox="0 0 544.582 544.582" className={"svg"}>
                  <path
                    d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                  />
                </svg>
              </div>
              {/* </Link> */}
            </>
          )}
        </div>
      </label>
    </>
  );
};
