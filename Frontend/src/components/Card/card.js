import React, { useEffect, useState, useContext, useCallback } from "react";
import { cartContext } from "../../layout/layout";
/**---------------------------------Pages-------------------------------------------- */
import "./card.css";
import axios from "axios";
/**---------------------------------Components--------------------------------------- */
// import Button from "../../assets/images/img/Frame_3.svg";
// import Button from "../../assets/images/img/on-time-delivery.svg";
import Button from "../../assets/images/img/same_day_delivery3.png";
// import Button from "../../assets/images/img/delivery.png";
import { WishList } from "../Wishlist/wishList";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";

/**---------------------------------Icons-------------------------------------------- */
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import {
  API_URL,
  API_Product,
  API_CART,
  token,
  API_WISH,
} from "../../config/config";
import { useCookies } from "react-cookie";
const API_Image = `${API_URL}/Product_image`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

//card properties make props
const Card = ({
  fullRatings,
  add,
  image,
  description,
  mrp,
  price,
  offer,
  attributes,
  label,
  text,
  current_stock,
  SoldIndividual,
  PreOrderQuantity,
  nameOfBtn,
  type,
  Productdata,
  PreOrder,
  // btname,
  onclick,
  discount,
  id,
  addCart,
  select,
  ratings,
  ...props
}) => {
  const handleOpen = (id) => {
    props.getId(id);
  };

  const [cartData, setCartData] = useState([]);
  const [PincodeData, setPincodeData] = useState([]);
  const [showStock, setShowStock] = useState(false);
  const [StockMsg, setShowStockMsg] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    addTocart,
    GetCartdatas,
    getCartItemsLocal,
    toggleShows,
    addcartId,
    cart_id,
    carts,
    view_cart,
    wishlist,
    GetWishlist,
    addWishlist,
    GetCart,
    cart,
    pincodeitems,
    toggleOff,
  } = useContext(cartContext);
  // const [Productdata, setData] = useState([]);

  const [num, setNum] = useState(1);
  // const [num, setID] = useState(id);
  let view = [];
  const getPincode = () => {
    if (id && pincodeitems.length > 0) {
      pincodeitems?.map((currEle) => {
        if (currEle.productid == id) {
          return setPincodeData(currEle.productid);
        }
      });
    }
  };
  const GetCartdata = async () => {
    if (id) {
      if (cookies.customer_id) {
        // const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
        //   headers: { Authorization: `Bearer ${token} ` },
        // });
        // if (Result) {
        // console.log(Result.data.list, "currEle")
        cart?.map((currEle) => {
          if (currEle.Productlist_id == id) {
            return setCartData(currEle.product_id);
          }
        });

        // }
      }
    }
  };

  const getProductList = async () => {
    if (id) {
      let result = await axios.get(`${API_Product}/${id}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });

      if (result) {
        // setData(result.data.list[0]);
      }
    }
  };

  const addtocartss = async () => {
    toggleShows();
    if (cookies.customer_id) {
      // let existprodct = getUsercart.find((curr) => curr.product_id == Productdata.Productlist_id);
      let existprodct = null;
      if (existprodct) {
      } else {
        try {
          var cartProducts = {
            // SalePrice: datas.SalePrice,
            userid: cookies.customer_id,
            CustomerName: cookies.fullName
              ? cookies.fullName === "undefined"
                ? cookies.email_address.slice(
                    0,
                    cookies.email_address.indexOf("@")
                  )
                : cookies.fullName.substring(0, 18)
              : null,
            // Attributeid: datas.Attribute,
            Productid: id,
            ProductQuantity: 1,
            product_total: 0,
          };
          // setbtnName('VIew')
          const Result = await axios.post(
            `${API_CART}`,
            cartProducts,
            configss
          );
          if (Result) {
            GetCart();

            // GetCartdatas();
            // window.location.reload(false)
          }
        } catch (error) {
          // console.log(error, 'errr')
        }
      }
    } else {
      let AttributeId = null;
      let att = null;
      addTocart(Productdata, num, AttributeId, att);
      getCartItemsLocal();
    }
  };

  const handleShowStcokmsg = () => {
    setShowStock(true);
    setShowStockMsg("Out of stock");
    // setShowStock(true);

    // setShowStockMsg(`Only ${qty} left in stock but you only add ${qtys} qtys - order soon `)
  };

  const addtocartValidation = () => {
    try {
      if (attributes?.length == 0 || type == "Simple") {
        if (current_stock == 0) {
          if (PreOrder == "Enable" && PreOrderQuantity > 0) {
            if (SoldIndividual > 0 && PreOrderQuantity > 0) {
              1 <= SoldIndividual ? addtocartss() : handleShowStcokmsg();
            } else if (SoldIndividual == 0 && PreOrderQuantity > 0) {
              1 <= PreOrderQuantity ? addtocartss() : handleShowStcokmsg();
            }
          } else {
            setShowStock(true);
            setShowStockMsg("Out of stock");
          }
        } else {
          if (current_stock > 0 && SoldIndividual > 0) {
            1 <= SoldIndividual ? addtocartss() : handleShowStcokmsg();
          } else if (
            current_stock > 0 &&
            SoldIndividual == 0 &&
            SoldIndividual == ""
          ) {
            1 <= current_stock ? addtocartss() : handleShowStcokmsg();
          } else {
            setShowStock(true);
            setShowStockMsg("Out of stock");
          }
        }
      }
    } catch (error) {
      window.location.reload(false);
    }
  };
  const rating = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <>
        <span key={index}>
          {ratings >= index + 1 ? (
            <>
              {" "}
              <AiFillStar className="rating" />
            </>
          ) : ratings >= number ? (
            <>
              {" "}
              <AiFillStar className="rating" />
            </>
          ) : (
            <>
              {" "}
              <AiOutlineStar className="outline_rating" />
            </>
          )}
        </span>
      </>
    );
  });



  useEffect(() => {
    // getProductList();
    getPincode();
    GetCartdata();
    // Getwishlist();
    // GetWishlist();
  }, [addTocart, onclick]);
  return (
    <div className="custom_card mt-3">
      <div style={{ position: "relative" }} className="hover_card_img">
        <Link
          to={`/products/${description
            ?.trim()
            .replaceAll(" ", "-")
            .replace(/[,#@]/g, "-")
            .replaceAll("--", "-")}/${id}`}
        >
          {" "}
          <img
            // src={image ? image : Productdata.ProductImage}
            // image={`${API_Image}`}
            src={`${API_Image}/${image}`}
            alt={description}
            className="custom_card_img"
          />
        </Link>
        {/* <Link
         to={`/products/${description}/${id}`}>
          {" "}
          <img
            src={image ? image : Productdata.ProductImage}
            alt="card-img"
            className="custom_card_img"
          />
        </Link> */}
        <button
          style={{
            backgroundColor: "#ff6766",
            color: "#fff",
            border: "none",
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
            padding: "3px 30px",
          }}
          type="button"
          onClick={() => handleOpen(id)}
          className="custom_card_top_button"
        >
          <span aria-label="Close">QUICK VIEW</span>
        </button>
      </div>
      <Link to={`/products/${description?.trim().replaceAll(" ", "-")}/${id}`}>
        <div className="d-flex" style={{ width: "100%" }}>
          <p className="custom_card_description ">{description}</p>
          <div className="custom_card_price">
            <p className="mrp_price text-muted">&#8377;&nbsp;{mrp}.00</p>
            <p className="card_price">
              &#8377;&nbsp;{price ? price : Productdata.SalePrice}.00
            </p>
          </div>
        </div>
        <p style={{ color: "#ff6766" }}>{label}</p>
        <div className="mx-2 mt-2">
          {rating}
          {/* {fullRatings ? (
            <div>
              <AiFillStar className="rating" />
              <AiFillStar className="rating" />
              <AiFillStar className="rating" />
              <AiFillStar className="rating" />
              <AiFillStar className="rating" />
            </div>
          ) : (
            <div>
              <AiFillStar className="rating" />
              <AiFillStar className="rating" />
              <AiFillStar className="rating" />
              <AiFillStar className="rating" />
              <AiOutlineStar className="outline_rating" />
            </div>
          )} */}

          {/* <Button
          add={add}
          addCart={addCart}
          text={text}
          select={select}
          className='card_add_btn mt-2'
        /> */}
        </div>
      </Link>
      {cookies.customer_id ? (
        <>
          {attributes?.length > 0 || type == "Variable" ? (
            <>
              <NavLink
                to={`/products/${description
                  ?.trim()
                  .replaceAll(" ", "-")}/${id}`}
              >
                <button className="cart-btn">select options</button>
              </NavLink>
            </>
          ) : (
            <>
              {cartData?.includes(id) ? (
                <>
                  <NavLink to="/cart">
                    <button className="cart-btn">
                      View Cart <AiOutlineArrowRight />
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  {showStock ? (
                    <>
                      <button className="cart-btn">{StockMsg}</button>
                    </>
                  ) : (
                    <>
                      <button
                        className="cart-btn"
                        onClick={addtocartValidation}
                      >
                        {nameOfBtn}
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {attributes?.length || type == "Variable" ? (
            <>
              <NavLink to={`/products/${description}/${id}`}>
                <button className="cart-btn">select options</button>
              </NavLink>
            </>
          ) : (
            <>
              {view_cart?.includes(id) ? (
                <>
                  {" "}
                  <NavLink to="/cart">
                    <button className="cart-btn">
                      View Cart <AiOutlineArrowRight />
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  {showStock ? (
                    <>
                      <button className="cart-btn">{StockMsg}</button>
                    </>
                  ) : (
                    <>
                      <button
                        className="cart-btn"
                        onClick={addtocartValidation}
                      >
                        {nameOfBtn}
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}

      {/* <button className='cart-btn' onClick={onclick}>{nameOfBtn}</button> */}

      <div className="offer_zone">
        <WishList id={id} />

        {offer > 0 ? (
          <div className="offer_tag">
            <p>{offer}%</p>
          </div>
        ) : null}
      </div>

      {PincodeData == id ? (
        <>
          <div className="car_box image_absolute">
            <img src={Button} className="img-fluid w-75" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Card;
