import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";
import { Modal, ModalBody, Button } from "react-bootstrap";
import axios from "axios";
import "../../components/ProductDetails/ProductDetails.css";
import { cartContext } from "../../layout/layout";
import { BiLinkExternal, BiMinus, BiPlus } from "react-icons/bi";
import { ImCheckmark } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import { RiCoupon3Line } from "react-icons/ri";
import empty from "../../assets/images/checkout/Empty-Cart.png";
import coinSvg from "../../assets/images/coin.svg";
import image1 from "../../assets/images/Coupon/image1.jpg";
import image2 from "../../assets/images/Coupon/image2.png";
import image3 from "../../assets/images/Coupon/image3.png";
import image4 from "../../assets/images/Coupon/image4.png";

// Icons
import {
  FaShoppingCart,
  FaCheck,
  FaPen,
  FaTrashAlt,
  FaPlus,
  FaRupeeSign,
  FaShippingFast,
  FaRegCreditCard,
} from "react-icons/fa";
// import { API_URL, API_Product, token,  } from "../../config/config";
import { AiOutlineRight } from "react-icons/ai";
import { IoMdPricetag } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import { CgCloseO, CgArrowLeft, CgCloseR } from "react-icons/cg";
import Slider from "react-slick";
import couponsImg from "../../assets/images/Coupon/vector png.png";
/**---------------------------------Assets------------------------------------------- */
import card1 from "../../assets/images/products/image (1).jpg";
import {
  API_URL,
  API_Product,
  API_CART,
  API_Coupon,
  token,
} from "../../config/config";
import { useCookies } from "react-cookie";
import Loading from "../LazyLoading/Loading";
import { useCallback } from "react";
const API_Image = `${API_URL}/Product_image`;
const API_REWARD = `${API_URL}/admin/rewardpoints/getusertotalreward`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Cart = (fullRatings, addCart, add, select) => {
  const manualReward = useRef(null);
  const [CODE, setCODE] = useState("");

  const [cartProduct, setCartProduct] = useState([]);
  const {
    carts,
    removeCart,
    total_amount,
    addTocart,
    GetCart,
    increseQty,
    GetCartdatas,
  } = useContext(cartContext);
  const [cartData, setCartData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [sub, setSub] = useState(0);
  const [RewardMaual, setRewardMaual] = useState(0);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [disabled_one, setDisabled_one] = useState(false);
  const [disabled_two, setDisabled_two] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [RewardData, setRewardData] = useState([]);
  const [show, setShow] = useState(false);
  const [couponID, setCouponID] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCouponID(id);
  };
  const [modalFail, setModalFail] = useState(false);
  console.log(
    cartData.map((item) => item.RegularPrice - item.SalePrice),
    "fail"
  );

  if (cookies.customer_id) {
    console.log(cartData, "carts");
    let value = cartData.map((item) => item.DiscountRate);
    var getValue = 0;
    for (let i = 0; i < value.length; i++) {
      getValue += value[i];
    }
    let valuesDiscount = cartData.map(
      (item) => (item.RegularPrice - item.SalePrice) * item.product_quantity
    );
    var getValueDiscount = 0;
    for (let i = 0; i < valuesDiscount.length; i++) {
      getValueDiscount += valuesDiscount[i];
    }
  } else {
    let values = carts.map((item) => item.DiscountRate);
    var getValue = 0;
    for (let i = 0; i < values.length; i++) {
      getValue += values[i];
    }
    let valuesDiscountID = carts.map(
      (item) => (item.RegularPrice - item.SalePrice) * item.ProductQuantity
    );
    var getValueDiscountID = 0;
    for (let i = 0; i < valuesDiscountID.length; i++) {
      getValueDiscountID += valuesDiscountID[i];
    }
  }

  const [upd, setUpd] = useState();
  const updating = () => {
    cartProduct.map((render) => setUpd(render.ProductQuantity));
  };

  console.log(getValueDiscount, "totals");
  const toggleModalFail = () => {
    // clearState();
    setModalFail(!modalFail);
  };
  const getCoupons = async () => {
    const Result = await axios.get(`${API_Coupon}`, configss);
    setCouponData(Result.data.list);
  };

  // const quantity = (id)=>{
  //     if(carts.length>0){
  //         let matchId = carts.find((curr)=>{
  //           return curr.productId==id;
  //         } );
  //         console.log(matchId,"baby")
  //         // setNum(matchId);
  //     }
  // }
  //slider setting
  var settings = {
    dots: true,
    autoplay: false,
    autoplaySpeed: 3500,
    infinite: true,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "theClass",
    arrows: true,
  };
  const navigate = useNavigate();
  console.log(cartData, "cartProduct");
  const [copy, setCopy] = useState(null);
  const [isInput, setIsInput] = useState(false);
  // const CODE = couponData.map((data) => data.code);

  const manualEntry = (id) => {
    setIsInput(!isInput);
  };
  console.log("1111", addTocart);

  const btnCopied = copy != null ? "Copied" : CODE;
  const ValueIns = btnCopied === "Copied" ? CODE : null;
  const [inputValue, setInputValue] = useState();
  const [inputState, setInputState] = useState();
  console.log(inputValue === "Copied" ? CODE : null, "222");
  const couponChange = ({ target: { name, value } }) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const clearCoupon = () => {
    setCODE("");
  };
  const [logss, setLogss] = useState();

  const [getById, setGetById] = useState(null);
  const [total, setTotal] = useState(null);
  const [totalLog, setTotalLog] = useState(null);
  const [totalDis, setTotalDis] = useState(null);
  // const [totalAvg, setTotalAvg] = useState(null);
  const [discType, setdiscType] = useState();

  const [isDisable, setIsDisable] = useState(false);
  const resDis = cookies.customer_id
    ? sub - (sub - (sub / 100) * getValue)
    : total_amount - (total_amount / 100) * getValue;
  // setTotalDis(resDis)
  console.log(totalLog, "resDis");
  var disAmnt = sub - getValueDiscount;
  var disAmntID = total_amount;
  console.log(
    discType === 1
      ? disAmntID - totalDis
      : disAmntID - (disAmntID / 100) * totalDis,
    "average"
  );
  var subTotal = disAmnt - (disAmnt / 100) * totalDis;
  var subTotalID = total_amount - (total_amount / 100) * totalDis;

  var totalDiscountValue = total_amount - getValueDiscountID;

  const [couponFix, setcouponFix] = useState();
  const [couponFixId, setcouponFixId] = useState();

  const couponSubmit = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toast.success("🎉 Coupon Applied !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      progress: undefined,
      // theme: "colored",
    });

    console.log(id, "poi");
    // alert(id)
    setCODE(id);
    setShow(false);
    console.log(id, "isid");
    const Result = await axios.get(`${API_Coupon}/${id}`, configss);
    setGetById(Result.data.list[0]);
    const calculate = Result.data.list[0]
      ? Result.data.list[0].discount_percent
      : null;
    const disType = Result.data.list[0]
      ? Result.data.list[0].discount_type
      : null;
    setdiscType(disType);
    console.log(Result.data.list[0], "balooon");
    setTotalDis(calculate);
    const res =
      Result.data.list[0].discount_type === 0
        ? total_amount - (total_amount / 100) * calculate
        : total_amount - calculate;
    const resLog =
      Result.data.list[0].discount_type === 0
        ? sub - (sub / 100) * calculate
        : sub - calculate;
    setTotal(res);
    setTotalLog(resLog);
    getById != null ? setIsDisable(false) : setIsDisable(true);
    const couponFixed =
      Result.data.list[0].discount_type === 0
        ? subTotalID - (subTotalID / 100) * calculate
        : subTotalID - calculate;
    const couponFixedID =
      Result.data.list[0].discount_type === 0
        ? subTotal - (subTotal / 100) * calculate
        : subTotal - calculate;
    console.log(subTotal, "0999999999999");
    console.log(subTotal - (subTotal / 100) * calculate, "00009999");
    setcouponFix(couponFixed);
    setcouponFixId(couponFixedID);

    // const average = Result.data.list[0].discount_type === 0 ? resDis - (resDis / 100) * totalDis : resDis - totalDis;
    // setTotalAvg(average)
    // if(getById !== null ){
    // }
  };
  const [couponRemove, setcouponRemove] = useState(null);

  const Remove = () => {
    setGetById(null);
  };

  console.log(getById, "kkkkkkkkkkkkkkkkkkk");
  const average = resDis - (resDis / 100) * totalDis;
  let shippingCharges = 0;
  // setTotalAvg(average)
  console.log(getById, "dat1");
  console.log(getById != null ? total : total_amount, "inputState");
  const priceRate = getById != null ? total : total_amount;
  const priceRating = getById != null ? totalLog : sub;
  console.log("float", sub - (sub / 100) * 12);

  console.log(cartProduct, "SamMon");

  console.log(
    discType === 1
      ? sub - getValueDiscount - totalDis
      : sub - getValueDiscount - ((sub - getValueDiscount) / 100) * totalDis,
    "0000900009"
  );

  console.log(couponFix, "ABE");
  console.log(couponFixId, "ABE");
  console.log(subTotal, "ABCD1 Login");
  console.log(subTotalID, "ABCD1 Logout");

  //logout
  console.log("==========");

  //login

  const dataOne = [
    {
      subtotal: "₹899.00",
      shipping: "Flat rate:₹50.00",
      shipping1: "Delivery:2-5day",
      points: "47 Points (₹47.00)",
      total: "₹949.00(includes ₹42.81 5% IGST)",
    },
  ];
  const toasty = () => {
    toast.error("Please Login", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: false,
      theme: "light",
    });
    navigate("/login");
  };
  const login = () => {
    navigate("/checkout", {
      state: showReward,
    });
  };

  // var updTTT = [];
  const [localId, setlocalId] = useState([]);
  const [cartID, setCartID] = useState();
  console.log(
    localId.map(
      (dada) => dada.RegularPrice * dada.product_quantity - dada.SalePrice
    ),
    "localId"
  );
  const [grand, setGrand] = useState();

  const GetCartdata = async () => {
    if (cookies.customer_id) {
      const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      console.log(Result, "ResultResult");
      setCartID(Result.data);
      // updTTT.push(Result.data)
      setGrand(Result.data);
      if (Result) {
        setlocalId(Result.data.list);
        let subtotal = Result.data.list.reduce((intial, curr) => {
          const { product_quantity, RegularPrice } = curr;
          let initial =
            intial + Number(product_quantity) * Number(RegularPrice);
          return initial;
        }, 0);
        console.log(subtotal, "inittttttt");
        setSub(subtotal);
        setCartData(Result.data.list);
      }
    } else {
      setCartData(carts);
    }
  };
  const [isLoading, startTransition] = React.useTransition();

  // const getGrandData = () =>{
  //   setGrand(cartID)
  // }
  console.log(cartID, "cartID");
  console.log(cartData, "cartID2");
  const removeCarts = async (productid, id) => {
    if (cookies.customer_id) {
      try {
        const Result = await axios.put(`${API_CART}/delete/${id}`, configss);
        if (Result) {
          GetCartdatas();
          // window.location.href = "/cart"
          GetCartdata();
        }
      } catch (error) {}
    } else {
      removeCart(productid);
      window.location.href = "/cart";
    }
    window.location.reload(true);
  };

  const [finalQty, setFinalQty] = useState();
  const [finalData, setFinalData] = useState();
  // var qtyFromBoth = finalQty.map((final) => final.data)
  const getQty = async () => {
    if (cookies.customer_id) {
      const Result = await axios.get(
        `${API_CART}/${cookies.customer_id}`,
        configss
      );
      var setFinalData = Result.data.list;
      let subtotal = setFinalData.reduce((intial, curr) => {
        const { product_quantity, RegularPrice } = curr;
        let initial = intial + Number(product_quantity) * Number(RegularPrice);
        return initial;
      }, 0);
      setFinalQty(subtotal);
    } else {
      // let QTY2 = carts.map((till) => (till.ProductQuantity * till.RegularPrice));
      // setFinalQty(QTY2)
      // console.log(QTY2, 'getQty');
      let subtotal = carts.reduce((intial, curr) => {
        const { ProductQuantity, RegularPrice } = curr;
        let initial = intial + Number(ProductQuantity) * Number(RegularPrice);
        return initial;
      }, 0);
      setFinalQty(subtotal);
    }
  };

  // var qtyFromBoth = finalQty.map((qty) => qty.Quantity)
  console.log(finalQty, "finalQty");

  const incNum = async (value, id, i) => {
    console.log(id.PreOrderQuantity, "vald");
    setLogss(value);
    if (cookies.customer_id) {
      console.log("testtttt 1111111111111", cartID.list);
      var qtyUpd = cartID.list;
      console.log("testtttt 22222222222", id.PreOrderQuantity);
      console.log("testtttt 333333333", "red");
      var objIndex = qtyUpd.findIndex(
        (obj) => obj.Productlist_id == id.Productlist_id
      );
      console.log("bind", objIndex);
      console.log("testtttt 333333333", id.PreOrderQuantity);
      if (
        qtyUpd[objIndex].product_quantity < 10 &&
        qtyUpd[objIndex].product_quantity < id.SoldIndividual
      ) {
        qtyUpd[objIndex].product_quantity =
          Number(qtyUpd[objIndex].product_quantity) + 1;
      }
      console.log(
        "testtttt 55555555555",
        qtyUpd[objIndex].product_quantity + 1
      );
      const updateCartProducts = {
        userid: cookies.customer_id,
        CustomerName: cookies.fullName
          ? cookies.fullName === "undefined"
            ? cookies.email_address.slice(0, cookies.email_address.indexOf("@"))
            : cookies.fullName.substring(0, 18)
          : null,
        // Attributeid: Attributeid,
        Attributeid: id.Productlist_id,
        Productid: id.Productlist_id,
        ProductQuantity: id.product_quantity,
        Status: 1,
      };
      console.log("testtttt 66666666666", id.id);
      let Results = await axios.put(
        `${API_CART}/${id.id}`,
        updateCartProducts,
        configss
      );

      if (Results) {
        GetCart();
        getQty();
      }
    } else {
      var objIndex = carts.findIndex((obj) => obj.Productid == id.Productid);
      console.log("testttttt 111111111 ", objIndex);
      if (
        carts[objIndex].ProductQuantity < 10 &&
        carts[objIndex].ProductQuantity < id.SoldIndividual
      ) {
        carts[objIndex].ProductQuantity = Number(
          carts[objIndex].ProductQuantity + 1
        );
      }
      console.log("testttttt 22222222 ", carts[objIndex].ProductQuantity);
      console.log("testttttt 33333333 ", carts);
      setFinalData(carts[objIndex].ProductQuantity);
      localStorage.setItem("localcart", JSON.stringify(carts));
      // window.location.reload(false);
      GetCart();
      GetCartdata();
      getQty();
      setCartData(carts);
    }
  };

  const decNum = async (value, id, i) => {
    console.log(id.Productlist_id, "vald");
    setLogss(value);
    if (cookies.customer_id) {
      console.log("testtttt 1111111111111", cartID.list);
      var qtyUpd = grand.list;
      console.log("testtttt 22222222222", qtyUpd);
      var objIndex = qtyUpd.findIndex(
        (obj) => obj.Productlist_id == id.Productlist_id
      );
      console.log("testtttt 333333333", objIndex);
      if (qtyUpd[objIndex].product_quantity > 1) {
        qtyUpd[objIndex].product_quantity = Number(
          qtyUpd[objIndex].product_quantity - 1
        );
      }
      console.log("testtttt 444444444", qtyUpd[objIndex].product_quantity);
      console.log("testtttt 55555555555", qtyUpd);
      const updateCartProducts = {
        userid: cookies.customer_id,
        CustomerName: cookies.fullName
          ? cookies.fullName === "undefined"
            ? cookies.email_address.slice(0, cookies.email_address.indexOf("@"))
            : cookies.fullName.substring(0, 18)
          : null,
        // Attributeid: Attributeid,
        Attributeid: id.Productlist_id,
        Productid: id.Productlist_id,
        ProductQuantity: id.product_quantity,
        Status: 1,
      };
      console.log("testtttt 66666666666", id.id);
      let Results = await axios.put(
        `${API_CART}/${id.id}`,
        updateCartProducts,
        configss
      );
      if (Results) {
        GetCart();
        getQty();
      }
    } else {
      var objIndex = carts.findIndex((obj) => obj.Productid == id.Productid);
      console.log("testttttt 111111111 ", objIndex);
      if (carts[objIndex].ProductQuantity > 1) {
        carts[objIndex].ProductQuantity = Number(
          carts[objIndex].ProductQuantity - 1
        );
      }
      console.log("testttttt 22222222 ", carts[objIndex].ProductQuantity);
      console.log("testttttt 33333333 ", carts);
      setFinalData(carts[objIndex].ProductQuantity);
      // window.location.reload(false);
      getQty();
      GetCart();
      GetCartdata();
      localStorage.setItem("localcart", JSON.stringify(carts));
    }
  };

  const handleChange = (e) => {
    if (RewardData.length > 0) {
      var abcs = RewardData[0].user_total;
    } else {
      var RewardDatas = [0];
      var abcs = parseInt(RewardDatas);
    }
    let { checked } = e.target;
    if (checked == true && e.target.value == "rewardpoints") {
      if (abcs > 0) {
        setCookie("rewardpointss", true);
        setDisabled_two(true);
        setShowRewards(true);
        setShowCoupon(false);
      } else {
        if (!toast.isActive("no_reward")) {
          toast.info("You Don't Have Reward Points!", {
            toastId: "no_reward",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            theme: "light",
            draggable: true,
            className: "notificationToolTip",
          });
        }
        setDisabled_two(true);
        removeCookie("manual_reward_points");
        removeCookie("rewardpoints");
        removeCookie("rewardpointss");
      }
    } else {
      setShowRewards(false);
      setShowReward(false);

      setDisabled_two(false);
      setShowCoupon(false);
      removeCookie("manual_reward_points");
      removeCookie("rewardpoints");
      removeCookie("rewardpointss");
    }
  };
  const handleChange_coupon = (e) => {
    let { checked } = e.target;
    if (checked == true) {
      setShowReward(false);
      setDisabled_one(true);
      setShowCoupon(true);
      removeCookie("manual_reward_points");
      removeCookie("rewardpoints");
    } else {
      setShowReward(false);
      setDisabled_one(false);
      setShowCoupon(false);
      removeCookie("manual_reward_points");
      removeCookie("rewardpoints");
    }
  };

  const getRewards = async () => {
    if (cookies.customer_id) {
      let result = await axios.get(
        `${API_REWARD}/${cookies.customer_id}`,
        configss
      );
      if (result) {
        setRewardData(result.data.list);
      }
    }
  };

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("localcart"));
    console.log(product, "productproduct");
    if (product) {
      setCartProduct(product);
    }
    GetCartdata();
    getCoupons();
    getQty();
    GetCart();
    getRewards();
    setCartData(carts);
    // getGrandData()
  }, [finalQty, getById, total_amount]);
  if (RewardData.length > 0) {
    var abcs = RewardData[0].user_total;
  } else {
    var RewardDatas = [0];
    var abcs = parseInt(RewardDatas);
  }

  console.log(manualReward, "manualReward.current.value");
  const handleSubmit = () => {
    if (RewardData.length > 0) {
      var abcs = RewardData[0].user_total;
      if (
        abcs > 0 &&
        manualReward.current.value <= abcs &&
        manualReward.current.value > 0
      ) {
        setRewardMaual(manualReward.current.value);
        setDisabled_two(true);
        setShowReward(true);
        setShowCoupon(false);
        if (!toast.isActive("designer_refresh")) {
          toast.success("🎉Reward Points Applied !", {
            toastId: "designer_refresh",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            theme: "light",
            draggable: true,
            className: "notificationToolTip",
          });
        }
        setCookie("manual_reward_points", manualReward.current.value);
        setCookie("rewardpoints", true);
      } else if (
        manualReward.current.value > abcs ||
        manualReward.current.value < 0
      ) {
        if (!toast.isActive("no_rewards")) {
          toast.info("You Don't Have More Reward Points To Apply!", {
            toastId: "no_rewards",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            theme: "light",
            draggable: true,
            className: "notificationToolTip",
          });
        }
      } else {
        if (!toast.isActive("no_reward")) {
          toast.info("You Don't Have Reward Points!", {
            toastId: "no_reward",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            theme: "light",
            draggable: true,
            className: "notificationToolTip",
          });
        }
        setDisabled_two(true);
        removeCookie("rewardpoints");
        removeCookie("manual_reward_points");
      }
    } else {
      var RewardDatas = [0];
      var abcs = parseInt(RewardDatas);
    }
  };

  return (
    <>
      {/* <div style={{ backgroundColor: "#f7f7f7" }}></div> */}
      <div className="flex-grow medium-text-center flex-col  mb-1 bred-cart">
        <p className="bread__crumbs__cart text-center">
          <Link to="/">
            <span className="bread__crumbs__cart__one bread__crumbs__cart_">
              Shopping Cart
            </span>
          </Link>
          <i className="fa fa-angle-right cart__right__icons"></i>
          <span className="bread__crumbs__cart__two bread__crumbs__cart_">
            {" "}
            Checkout details
          </span>
          <i className="fa fa-angle-right cart__right__icons"></i>
          <span className="bread__crumbs__cart__three bread__crumbs__cart_ ">
            {" "}
            Order Complete{" "}
          </span>
        </p>
      </div>
      {cartData.length === 0 ? (
        <div className="container mt-3 mb-5">
          <p className="text-muted">Your cart is currently empty !</p>
          <div className="d-flex justify-content-center">
            <img src={empty} style={{ textAlign: "center" }} />
          </div>
        </div>
      ) : (
        <>
          {cartData?.length > 0 ? (
            <>
              <div className="container ">
                <p className="cart__heading mb-3">
                  Get free shipping if you order <strong> ₹0</strong> more!
                </p>
                <div></div>
              </div>
              <section id="about">
                <form>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-7 col-md-7 mt-0 col-12 ">
                        {/* Web VIew */}
                        <div className="web-cart-view">
                          <div className="row view-cart-table">
                            <div className="mt-2  mb-2 col-4 cart-table-details">
                              Product Details
                            </div>
                            <div className="mt-2  mb-2 col-2 cart-table-details text-center">
                              Quantity
                            </div>
                            <div className="mt-2  mb-2 col-3 cart-table-details text-center">
                              Price
                            </div>
                            <div className="mt-2  mb-2 col-2 cart-table-details text-center">
                              Sub Total
                            </div>
                            <div className="mt-2  mb-2 col-1 cart-table-details"></div>
                          </div>
                          <div className="cart_side_slide">
                            {cartData.map((values, i) => {
                              return (
                                <div
                                  className="row mt-3 align-items-start cart-view-table-data "
                                  key={i}
                                >
                                  <div className="mb-3 mt-2 col-4 ">
                                    <div className="d-flex mb-2">
                                      <img
                                        src={`${API_Image}/${values.ProductImage}`}
                                        width="50px"
                                        height="50px"
                                      />

                                      {cookies.customer_id ? (
                                        <Link
                                          to={`/products/${values.ProductName}/${values.main_id}`}
                                          state={values}
                                        >
                                          <p className="ms-3 small prod-name-cart-view prime-text">
                                            {values.ProductName}
                                          </p>
                                          <div className="pl-2">
                                            {values.variant_1 ? (
                                              <>
                                                <p className="varition">
                                                  <span className="mx-2">
                                                    {values.variant_1_name}:
                                                    {values.variant_1}
                                                  </span>{" "}
                                                </p>
                                              </>
                                            ) : null}
                                            {values.variant_2 ? (
                                              <>
                                                <p className="varition">
                                                  <span className="mx-2">
                                                    {values.variant_2_name}:
                                                    {values.variant_2}
                                                  </span>{" "}
                                                </p>
                                              </>
                                            ) : null}
                                          </div>
                                        </Link>
                                      ) : (
                                        <Link
                                          to={`/products/${values.ProductName}/${values.main_id}`}
                                          state={values}
                                        >
                                          <p className="ms-3 small prod-name-cart-view prime-text">
                                            {values.ProductName}
                                          </p>
                                          <div className="ml-3">
                                            {values.variant_1 ? (
                                              <>
                                                <p className="varition">
                                                  <span className="mx-2">
                                                    {values.variant_1_name}:
                                                    {values.variant_1}
                                                  </span>{" "}
                                                </p>
                                              </>
                                            ) : null}
                                            {values.variant_2 ? (
                                              <>
                                                <p className="varition">
                                                  <span className="mx-2">
                                                    {values.variant_2_name}:
                                                    {values.variant_2}
                                                  </span>{" "}
                                                </p>
                                              </>
                                            ) : null}
                                          </div>
                                        </Link>
                                      )}
                                    </div>

                                    <span className="text-danger mt-2">
                                      {values.PreOrderQuantity === "0" &&
                                      values.current_stock === 0
                                        ? "out of stock"
                                        : null}
                                    </span>
                                  </div>
                                  <div className="mb-3  mt-2 col-2 d-flex justify-content-around align-items-center">
                                    {/* <BiMinus className='inc-cart-view' />
                                  // {cookies.customer_id ? values.product_quantity : values.ProductQuantity}
                                  <BiPlus className='dec-cart-view' /> */}
                                    {/* && values.PreOrder !== "Enable" */}
                                    {console.log(values, "ppp")}
                                    <div class="cart-quantity-cart cart__quantity">
                                      <div class="counter-cart">
                                        <input
                                          class="counter__input_cart"
                                          type="text"
                                          value={
                                            cookies.customer_id
                                              ? values.product_quantity
                                              : values.ProductQuantity
                                          }
                                          name={values.ProductQuantity}
                                          size="5"
                                          readonly="readonly"
                                        />
                                        <a
                                          className="counter__increment"
                                          data-i={i}
                                          onClick={() =>
                                            incNum(
                                              values.Productlist_id,
                                              values,
                                              i
                                            )
                                          }
                                        >
                                          +
                                        </a>
                                        <a
                                          className="counter__decrement"
                                          data-i={i}
                                          onClick={() =>
                                            decNum(
                                              values.Productlist_id,
                                              values,
                                              i
                                            )
                                          }
                                        >
                                          &ndash;
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3  mt-2 col-3 text-center">
                                    {values.DiscountRate === 0 ? (
                                      <strong className="text-muted">
                                        ₹
                                        {cookies.customer_id
                                          ? values.RegularPrice
                                          : values.RegularPrice}
                                        .00
                                      </strong>
                                    ) : (
                                      <del className="text-muted">
                                        <strong>
                                          ₹
                                          {cookies.customer_id
                                            ? values.product_quantity *
                                              values.RegularPrice
                                            : values.ProductQuantity *
                                              values.RegularPrice}
                                          .00
                                        </strong>
                                      </del>
                                    )}
                                    <br />

                                    {values.DiscountRate === 0 ? null : (
                                      <>
                                        <TbDiscount2 className="dis-icon" />
                                        &nbsp;
                                        <span className="small text-muted">
                                          {values.DiscountRate}% &nbsp;(₹ -
                                          {parseFloat(
                                            (values.RegularPrice -
                                              values.SalePrice) *
                                              (cookies.customer_id
                                                ? values.product_quantity
                                                : values.ProductQuantity)
                                          ).toFixed(2)}
                                          )
                                        </span>
                                      </>
                                    )}
                                    {/* <br />
                                    <RiCoupon3Line className='cou-icon' />&nbsp;
                                    <span className='small text-muted'>({discType === 1 ? `${totalDis === null ? "0" : '₹' + totalDis}` : `${totalDis === null ? "0" : totalDis}%`})&nbsp; </span> */}

                                    {/* <span className='small  text-muted'>
                                      ( ₹ {cookies.customer_id ?
                                        discType === 1 ? (values.SalePrice * values.product_quantity) - (values.SalePrice * values.product_quantity) - totalDis : parseFloat(- (values.SalePrice * values.product_quantity / 100) * totalDis).toFixed(2) :
                                        discType === 1 ? (values.SalePrice * values.ProductQuantity) - (values.SalePrice * values.ProductQuantity) - totalDis : parseFloat(- (values.SalePrice * values.ProductQuantity / 100) * totalDis).toFixed(2)}
                                      )</span> */}
                                  </div>
                                  <div className="mb-3  mt-2 col-2 text-center">
                                    {/* <strong className='text-center'>
                                    {getById === null ?
                                      <span className='text-center'>₹{parseFloat(cookies.customer_id ? values.SalePrice : values.SalePrice).toFixed(2)} </span> :
                                      <span className='text-center'>{parseFloat(cookies.customer_id ?
                                        discType === 1 ? values.SalePrice - totalDis : (values.SalePrice * values.product_quantity - (values.SalePrice * values.product_quantity / 100) * totalDis) :
                                        discType === 1 ? values.SalePrice - totalDis : (values.SalePrice * values.ProductQuantity - (values.SalePrice * values.ProductQuantity / 100) * totalDis)).toFixed(2)}</span>}
                                  </strong> */}
                                    <strong>
                                      ₹
                                      {values.SalePrice *
                                        (cookies.customer_id
                                          ? values.product_quantity
                                          : values.ProductQuantity)}
                                    </strong>
                                  </div>
                                  <div className="mb-3  mt-2 col-1 ">
                                    <MdDeleteOutline
                                      className="del-icons"
                                      onClick={() =>
                                        removeCarts(values.Productid, values.id)
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <Link to={"/"}>
                            <div
                              // onClick={handleShow}
                              // add={add}
                              // addCart={addCart}
                              // select={select}
                              className="mx-3 mt-5 cart__button__shopping web-cont-btn"
                            >
                              <CgArrowLeft /> Continue shopping{" "}
                            </div>
                          </Link>
                        </div>
                      </div>
                      {/* <!-- Modal --> */}
                      <Modal
                        aria-labelledby="contained-modal-title-vcenter"
                        className={
                          show === true ? "cart-view-modal" : "body-blured"
                        }
                        centered
                        show={show}
                        onHide={handleClose}
                      >
                        <div id="bg-coupon" className="h-75">
                          {/* <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header> */}

                          <div id="confettis">
                            <div className="animation-container">
                              <div className="lightning-container">
                                <div className="lightning white"></div>
                                <div className="lightning red"></div>
                              </div>
                              <div className="boom-container">
                                <div className="shape circle big white"></div>
                                <div className="shape circle white"></div>
                                <div className="shape triangle big yellow"></div>
                                <div className="shape disc white"></div>
                                <div className="shape triangle blue"></div>
                              </div>
                              <div className="boom-container second">
                                <div className="shape circle big white"></div>
                                <div className="shape circle white"></div>
                                <div className="shape disc white"></div>
                                <div className="shape triangle blue"></div>
                              </div>
                            </div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                          </div>
                          <div className="container">
                            <div
                              className="d-flex justify-content-end close-pop"
                              onClick={handleClose}
                            >
                              <IoCloseSharp />
                            </div>
                            <div style={{ display: "block" }}>
                              <div className="reveal">
                                <div class="reveal__content">
                                  Coupon Applied Successfully
                                </div>
                              </div>
                              {/* <button onClick={ () => couponSubmit(couponID)}>DONE</button> */}
                            </div>
                          </div>
                          {/* <img src={image3} alt='' width='300px'/> */}
                        </div>
                      </Modal>

                      {/* // Tab - view  */}

                      <div className="cart-responsive w-100 mt-3">
                        <hr />
                        {cartData.map((values) => (
                          <>
                            {console.log(values, "valuesvalues")}
                            <div className="d-flex w-100">
                              <div className="d-flex align-content-center me-3 justify-content-center align-items-center">
                                <button
                                  className="close-btn-tab mt-3 mx-auto"
                                  onClick={() =>
                                    removeCarts(values.Productid, values.id)
                                  }
                                >
                                  <IoCloseSharp />
                                </button>
                              </div>
                              <div className="me-3 d-block justify-content-center">
                                <img
                                  src={`${API_Image}/${values.ProductImage}`}
                                  width="150px"
                                  height="150px"
                                />
                                <br />
                                <button className="border mt-3 mx-auto qty-tab">
                                  Qty &nbsp;
                                  {cookies.customer_id
                                    ? values.product_quantity
                                    : values.ProductQuantity}
                                </button>
                              </div>
                              <div className="row w-100">
                                <div className="row">
                                  <div className="col-5  col-sm-7">
                                    <p className="tab-font  prod-cart-name">
                                      Product Name{" "}
                                    </p>
                                    <p className="tab-font">Price </p>
                                    <p className="tab-font">
                                      Discount Rate ({values.DiscountRate}%)
                                    </p>
                                    <p className="tab-font">
                                      Coupon Rate (
                                      {discType === 1
                                        ? `${
                                            totalDis === null
                                              ? "0"
                                              : "₹" + totalDis
                                          }`
                                        : `${
                                            totalDis === null ? "0" : totalDis
                                          }%`}
                                      ){" "}
                                    </p>
                                  </div>
                                  {/* <div className='col-1'>
                                    <p>:</p>
                                    <p>:</p>
                                    <p>:</p>
                                    <p>:</p>
                                  </div> */}
                                  <div className="col-6 col-sm-5">
                                    <p className="tab-font par-tab-cart prod-cart-name">
                                      : {values.ProductName}
                                    </p>
                                    <div className="tab-font">
                                      {" "}
                                      <del className="text-muted tab-font">
                                        {" "}
                                        : {values.RegularPrice}
                                      </del>{" "}
                                      | {values.SalePrice}
                                    </div>
                                    <p className=" tab-font text-danger">
                                      {" "}
                                      : -{" "}
                                      {parseFloat(
                                        values.RegularPrice - values.SalePrice
                                      ).toFixed(2)}
                                    </p>
                                    <p className="tab-font text-danger"></p>
                                    <p className="tab-font">
                                      {" "}
                                      :{" "}
                                      {cookies.customer_id
                                        ? discType === 1
                                          ? values.SalePrice *
                                              values.product_quantity -
                                            values.SalePrice *
                                              values.product_quantity -
                                            totalDis
                                          : parseFloat(
                                              -(
                                                (values.SalePrice *
                                                  values.product_quantity) /
                                                100
                                              ) * totalDis
                                            ).toFixed(2)
                                        : discType === 1
                                        ? values.SalePrice *
                                            values.ProductQuantity -
                                          values.SalePrice *
                                            values.ProductQuantity -
                                          totalDis
                                        : parseFloat(
                                            -(
                                              (values.SalePrice *
                                                values.ProductQuantity) /
                                              100
                                            ) * totalDis
                                          ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <hr className="w-75 mx-3 mt-3" />
                                <div className="col-6 tab-font">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;Sub Total
                                </div>
                                <div className="col-4 tab-font ms-4">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;:&nbsp;
                                  {getById === null ? (
                                    <span>
                                      ₹
                                      {parseFloat(
                                        cookies.customer_id
                                          ? values.SalePrice
                                          : values.SalePrice
                                      ).toFixed(2)}{" "}
                                    </span>
                                  ) : (
                                    <span>
                                      {parseFloat(
                                        cookies.customer_id
                                          ? discType === 1
                                            ? values.SalePrice - totalDis
                                            : values.SalePrice *
                                                values.product_quantity -
                                              ((values.SalePrice *
                                                values.product_quantity) /
                                                100) *
                                                totalDis
                                          : discType === 1
                                          ? values.SalePrice - totalDis
                                          : values.SalePrice *
                                              values.ProductQuantity -
                                            ((values.SalePrice *
                                              values.ProductQuantity) /
                                              100) *
                                              totalDis
                                      ).toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <hr />
                          </>
                        ))}
                        <Link to={"/"}>
                          <button className="mx-3 mt-5 cart__button__shopping">
                            <CgArrowLeft /> Continue shopping{" "}
                          </button>
                        </Link>
                      </div>

                      {/* // Mob - view */}
                      <div className="cart-res-mob mt-3">
                        <h2
                          className="pb-2"
                          style={{
                            color: "#807777!important",
                            borderBottom: "3px solid #807777",
                            fontFamily: "'Source Sans Pro', 'sans-serif'",
                            fontWeight: 900,
                            color: "#807777",
                          }}
                        >
                          PRODUCT DETAILS
                        </h2>
                        <div>
                          <div className="cart_side_slide">
                            {cartData.map((values, i) => (
                              <>
                                <div className="d-flex">
                                  <div className="me-3 position-relative">
                                    <img
                                      src={`${API_Image}/${values.ProductImage}`}
                                      width="80px"
                                      height="80px"
                                      className="mt-4 mb-3"
                                    />
                                    <div className="position-absolute start-0 top-0">
                                      {/* <button
                                        className="border mt-3 mx-auto rounded"
                                        onClick={() =>
                                          removeCarts(
                                            values.Productid,
                                            values.id
                                          )
                                        }
                                      > */}
                                      <MdDeleteForever
                                        size={20}
                                        className="text-danger"
                                        onClick={() =>
                                          removeCarts(
                                            values.Productid,
                                            values.id
                                          )
                                        }
                                      />
                                      {/* </button> */}
                                    </div>
                                    <br />
                                    <div class="cart-quantity-cart cart__quantity">
                                      <div class="counter-cart">
                                        <input
                                          class="counter__input_cart"
                                          type="text"
                                          value={
                                            cookies.customer_id
                                              ? values.product_quantity
                                              : values.ProductQuantity
                                          }
                                          name={values.ProductQuantity}
                                          size="5"
                                          readonly="readonly"
                                        />
                                        <a
                                          className="counter__increment"
                                          data-i={i}
                                          onClick={() =>
                                            incNum(
                                              values.Productlist_id,
                                              values,
                                              i
                                            )
                                          }
                                        >
                                          +
                                        </a>
                                        <a
                                          className="counter__decrement"
                                          data-i={i}
                                          onClick={() =>
                                            decNum(
                                              values.Productlist_id,
                                              values,
                                              i
                                            )
                                          }
                                        >
                                          &ndash;
                                        </a>
                                      </div>
                                    </div>
                                    {/* <div className="d-flex">
                                      <button
                                        className="border mt-3 mx-auto"
                                        onClick={() =>
                                          removeCarts(
                                            values.Productid,
                                            values.id
                                          )
                                        }
                                      >
                                        <IoCloseSharp />
                                      </button>
                                      <button className="border px-2  mt-3 mx-auto">
                                        Qty &nbsp;
                                        {cookies.customer_id
                                          ? values.product_quantity
                                          : values.ProductQuantity}
                                      </button>
                                    </div> */}
                                  </div>
                                  <div className="row justify-content-center">
                                    <div className="col-6 col-sm-3">
                                      <p className="mob-font prod-cart-name">
                                        Product Name{" "}
                                      </p>
                                      {/* <br /> */}
                                      <p className="mob-font">Price </p>

                                      <p className="mob-font">
                                        <TbDiscount2 className="dis-icon" /> (
                                        {values.DiscountRate}%)
                                      </p>
                                      <p className="mob-font">
                                        Coupon Rate (
                                        {discType === 1
                                          ? `${
                                              totalDis === null
                                                ? "0"
                                                : "₹" + totalDis
                                            }`
                                          : `${
                                              totalDis === null ? "0" : totalDis
                                            }%`}
                                        ){" "}
                                      </p>
                                    </div>
                                    {/* <div className='col-1'>
                                    <p className='mob-font'>:</p>
                                    <p className='mob-font'>:</p>
                                    <p className='mob-font'>:</p>
                                    <p className='mob-font'>:</p>
                                  </div> */}
                                    <div className="col-5">
                                      {console.log(values, "wed")}
                                      {cookies.customer_id ? (
                                        <Link
                                          to={`/products/${values.ProductName}/${values.Productlist_id}`}
                                        >
                                          <small className="mob-font par-mob-cart prod-cart-name">
                                            : {values.ProductName}{" "}
                                            {/* <span>sasasasaxasasasasasasas</span> */}
                                          </small>
                                        </Link>
                                      ) : (
                                        <Link
                                          to={`/products/${values.ProductName}/${values.Productid}`}
                                        >
                                          <p className="mob-font par-mob-cart prod-cart-name link_color">
                                            : {values.ProductName}
                                          </p>
                                        </Link>
                                      )}

                                      <div className="mob-font">
                                        {" "}
                                        <del className="text-muted ">
                                          : {values.RegularPrice}
                                        </del>{" "}
                                        | {values.SalePrice}
                                      </div>
                                      <p className="text-danger mob-font">
                                        {" "}
                                        :{" "}
                                        {parseFloat(
                                          values.SalePrice - values.RegularPrice
                                        ).toFixed(2)}
                                      </p>
                                      <p className="text-danger mob-font"></p>
                                      <p className="mob-font">
                                        {" "}
                                        :{" "}
                                        {cookies.customer_id
                                          ? discType === 1
                                            ? values.SalePrice *
                                                values.product_quantity -
                                              values.SalePrice *
                                                values.product_quantity -
                                              totalDis
                                            : parseFloat(
                                                -(
                                                  (values.SalePrice *
                                                    values.product_quantity) /
                                                  100
                                                ) * totalDis
                                              ).toFixed(2)
                                          : discType === 1
                                          ? values.SalePrice *
                                              values.ProductQuantity -
                                            values.SalePrice *
                                              values.ProductQuantity -
                                            totalDis
                                          : parseFloat(
                                              -(
                                                (values.SalePrice *
                                                  values.ProductQuantity) /
                                                100
                                              ) * totalDis
                                            ).toFixed(2)}
                                      </p>
                                    </div>
                                    <hr className="w-75 mx-3 mt-3" />
                                    <div className="col-6 mob-font p-0">
                                      &nbsp;&nbsp;Sub Total
                                    </div>
                                    {/* <div className='col-1'>-</div> */}
                                    <div className="col-4 mb-2 mob-font  p-0">
                                      &nbsp;: &nbsp;
                                      {getById === null ? (
                                        <span>
                                          ₹
                                          {parseFloat(
                                            cookies.customer_id
                                              ? values.SalePrice
                                              : values.SalePrice
                                          ).toFixed(2)}{" "}
                                        </span>
                                      ) : (
                                        <span>
                                          {parseFloat(
                                            cookies.customer_id
                                              ? discType === 1
                                                ? values.SalePrice - totalDis
                                                : values.SalePrice *
                                                    values.product_quantity -
                                                  ((values.SalePrice *
                                                    values.product_quantity) /
                                                    100) *
                                                    totalDis
                                              : discType === 1
                                              ? values.SalePrice - totalDis
                                              : values.SalePrice *
                                                  values.ProductQuantity -
                                                ((values.SalePrice *
                                                  values.ProductQuantity) /
                                                  100) *
                                                  totalDis
                                          ).toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </>
                            ))}
                          </div>
                        </div>
                        <Link to={"/"}>
                          <button className="mx-3 mt-2 cart__button__shopping">
                            <CgArrowLeft /> Continue shopping{" "}
                          </button>
                        </Link>
                      </div>
                      {isLoading ? (
                        <h6>loading ....</h6>
                      ) : (
                        <div
                          className="col-lg-5 col-md-5 col-12 adjustments "
                          style={{
                            borderLeft: "1px solid #ececec",
                            borderLeftHight: "10px",
                          }}
                        >
                          <table className="table">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="cart__table__headings"
                                  colspan="25"
                                >
                                  CART TOTALS
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {dataOne.map((valuess) => {
                                console.log(valuess, "valuesvaluesvalues");
                                return (
                                  <>
                                    <tr>
                                      <td
                                        scope="row"
                                        colspan="20"
                                        className="text-muted"
                                       
                                      >
                                        MRP Price
                                      </td>
                                      {console.log(sub, total_amount)}
                                      {/* <th className='cart__sub__headings'> ₹{cookies.customer_id ? sub : total_amount}.00 </th> */}
                                      <th className="cart__sub__headings">
                                        <span className="text-muted">
                                          {" "}
                                          ₹&nbsp;
                                          {cookies.customer_id
                                            ? parseFloat(sub).toFixed(2)
                                            : parseFloat(finalQty).toFixed(2)}
                                        </span>
                                      </th>
                                    </tr>
                                    <tr>
                                      <td
                                        scope="row"
                                        colspan="20"
                                        className="text-muted"
                                      >
                                        Discount Value
                                      </td>
                                      <th className="cart__sub__headings">
                                        {cookies.customer_id ? (
                                          // <span className='text-muted'> {getValue === 0 ? null : `${getValue}%`} &nbsp;  &nbsp;{getValue === 0 ? - getValueDiscount : ` ₹  ` + " -" + " " + `${parseFloat(resDis).toFixed(2)}`} </span>
                                          <span className="text-muted">
                                            {" "}
                                            ₹{" "}
                                            {getValueDiscount !== 0
                                              ? "-"
                                              : null}
                                            &nbsp;
                                            {getValue !== 0
                                              ? getValueDiscount.toFixed(2)
                                              : " " + resDis.toFixed(2)}{" "}
                                          </span>
                                        ) : (
                                          <span className="text-muted">
                                            {getValueDiscountID === 0
                                              ? "₹" + " " + " " + " 0.00"
                                              : `₹ - ${parseFloat(
                                                  getValueDiscountID
                                                ).toFixed(2)}`}
                                          </span>
                                        )}
                                      </th>
                                    </tr>
                                    <tr>
                                      <td
                                        scope="row"
                                        colspan="20"
                                        className="text-muted"
                                      >
                                        Coupons Value &nbsp;{" "}
                                        {getById !== null ? (
                                          <RiCoupon3Line className="cou-icon" />
                                        ) : null}{" "}
                                      </td>
                                      <th className="cart__sub__headings">
                                        {console.log(
                                          (total_amount -
                                            getValueDiscountID / 100) *
                                            totalDis,
                                          "truelancer"
                                        )}
                                        {discType === undefined ? (
                                          <span className="text-muted">
                                            ₹&nbsp; 0.00
                                          </span>
                                        ) : (
                                          <>
                                            {cookies.customer_id ? (
                                              <span className="text-muted">
                                                {totalDis === null
                                                  ? null
                                                  : discType === 1
                                                  ? `₹ ${totalDis}`
                                                  : `${totalDis}%`}{" "}
                                                &nbsp; &nbsp;₹ &nbsp; -{" "}
                                                {discType === 1
                                                  ? parseFloat(
                                                      totalDis
                                                    ).toFixed(2)
                                                  : parseFloat(
                                                      (disAmnt / 100) * totalDis
                                                    ).toFixed(2)}{" "}
                                              </span>
                                            ) : (
                                              <span className="text-muted">
                                                {totalDis === null
                                                  ? null
                                                  : discType === 1
                                                  ? `₹ ${totalDis}`
                                                  : `${totalDis}%`}{" "}
                                                &nbsp; &nbsp;₹ &nbsp; -{" "}
                                                {discType === 1
                                                  ? parseFloat(
                                                      totalDis
                                                    ).toFixed(2)
                                                  : parseFloat(
                                                      ((finalQty -
                                                        getValueDiscountID) /
                                                        100) *
                                                        totalDis
                                                    ).toFixed(2)}{" "}
                                              </span>
                                            )}
                                          </>
                                        )}
                                        {/* <span className='text-muted'> {totalDis === null ? null : discType === 1 ? `₹ ${totalDis}` : `${totalDis}%`}  &nbsp;  &nbsp;₹ &nbsp; {cookies.customer_id ? parseFloat(totalLog === null ? '0' : totalLog - sub).toFixed(2) : discType === 1 ? totalDis === null ? 'null' : - (totalDis - (disAmntID - total_amount)) : (((disAmntID - (disAmntID / 100) * totalDis) - sub) - total_amount).toFixed(2)} </span> */}
                                      </th>
                                    </tr>
                                    {/* {console.log(getById === null ?
                                        parseFloat(totalDiscountValue - totalDis).toFixed(2) :
                                        parseFloat(discType === 1 ? totalDiscountValue - totalDis : totalDiscountValue - (totalDiscountValue * totalDis) / 100).toFixed(2), "CookiesData")} */}
                                    {/* {console.log(getById !== null ? , "jill")} */}
                                    <tr>
                                      <td
                                        scope="row"
                                        colspan="20"
                                        className="text-muted"
                                      >
                                        Total
                                      </td>
                                      {console.log(
                                        discType === 1
                                          ? finalQty -
                                              getValueDiscount -
                                              totalDis
                                          : finalQty -
                                              getValueDiscount -
                                              ((finalQty - getValueDiscount) /
                                                100) *
                                                totalDis,
                                        "mainerror"
                                      )}
                                      <th className="cart__sub__headings">
                                        <span className="text-muted">
                                          ₹ &nbsp;
                                          {cookies.customer_id
                                            ? discType === 1
                                              ? parseFloat(
                                                  finalQty -
                                                    getValueDiscount -
                                                    totalDis
                                                ).toFixed(2)
                                              : (
                                                  finalQty -
                                                  getValueDiscount -
                                                  ((finalQty -
                                                    getValueDiscount) /
                                                    100) *
                                                    totalDis
                                                ).toFixed(2)
                                            : discType === 1
                                            ? parseFloat(
                                                finalQty -
                                                  getValueDiscountID -
                                                  totalDis
                                              ).toFixed(2)
                                            : parseFloat(
                                                finalQty -
                                                  getValueDiscountID -
                                                  ((finalQty -
                                                    getValueDiscountID) /
                                                    100) *
                                                    totalDis
                                              ).toFixed(2)}
                                        </span>{" "}
                                      </th>
                                    </tr>
                                    <tr>
                                      <td
                                        scope="row"
                                        colspan="20"
                                        className="text-muted"
                                      >
                                        Shipping
                                      </td>

                                      {/* <td className='cart__sub__headings'> {valuess.shipping} {valuess.shipping1}</td> */}
                                      <td className="cart__sub__headings text-muted">
                                        {" "}
                                        Flat rate:₹{shippingCharges}{" "}
                                        Delivery:2-5days
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        scope="row"
                                        colspan="20"
                                        className="text-muted"
                                      >
                                        Available Reward Amount
                                      </td>
                                      {/* {console.log("123", cartData.map((item)=> (item.Points[1])))} */}

                                      <td className="cart__sub__headings">
                                        {/* {rewardpoint} */}
                                        {cookies.customer_id ? (
                                          <>
                                            {RewardData.length > 0 ? abcs : 0}
                                          </>
                                        ) : (
                                          <>0</>
                                        )}
                                      </td>
                                    </tr>
                                    {showReward ? (
                                      <tr>
                                        <td
                                          scope="row"
                                          colspan="20"
                                          className="text-success"
                                        >
                                          <strong>
                                            Reward Points Applied!!
                                          </strong>
                                        </td>
                                        <td className="cart__sub__headings">
                                          {console.log(
                                            finalQty,
                                            "finalQty",
                                            totalDis,
                                            "totalDis",
                                            shippingCharges,
                                            "shippingCharges",
                                            getValueDiscount
                                          )}
                                          <strong>
                                            {cookies.customer_id
                                              ? showReward
                                                ? parseFloat(
                                                    Math.abs(
                                                      finalQty > abcs
                                                        ? RewardMaual
                                                        : finalQty
                                                    )
                                                  ).toFixed(0)
                                                : null
                                              : 0}
                                          </strong>
                                        </td>
                                        {/* {console.log(total_amount , "redddd")}
                                        <td className='cart__sub__headings'><strong>₹ {cookies.customer_id ? getById !== null ? parseFloat(discType === 1 ? ((sub - getValueDiscount) - totalDis) + shippingCharges : ((sub - getValueDiscount) + shippingCharges) - (((sub - getValueDiscount) / 100) * totalDis).toFixed(2)) : parseFloat(subTotal + shippingCharges).toFixed(2) :
                                          getById === null ? parseFloat((totalDiscountValue - totalDis) + shippingCharges).toFixed(2) : parseFloat(discType === 1 ? (totalDiscountValue - totalDis) + shippingCharges : (totalDiscountValue - (totalDiscountValue * totalDis) / 100) + shippingCharges).toFixed(2)}</strong></td> */}
                                      </tr>
                                    ) : null}
                                    {showReward ? (
                                      <tr>
                                        <td
                                          scope="row"
                                          colspan="20"
                                          className=""
                                        >
                                          <strong>
                                            Remaining Reward Point
                                          </strong>
                                        </td>
                                        <td className="cart__sub__headings">
                                          {console.log(
                                            finalQty,
                                            "finalQty",
                                            totalDis,
                                            "totalDis",
                                            shippingCharges,
                                            "shippingCharges",
                                            getValueDiscount
                                          )}
                                          <strong>
                                            {cookies.customer_id
                                              ? showReward && abcs
                                                ? parseFloat(
                                                    Math.abs(finalQty - abcs)
                                                  ).toFixed(0) > 0
                                                  ? parseFloat(
                                                      Math.abs(
                                                        RewardMaual > abcs
                                                          ? abcs - abcs
                                                          : abcs - RewardMaual
                                                      )
                                                    ).toFixed(0)
                                                  : 0
                                                : null
                                              : 0}
                                          </strong>
                                        </td>
                                        {/* {console.log(total_amount , "redddd")}
                                        <td className='cart__sub__headings'><strong>₹ {cookies.customer_id ? getById !== null ? parseFloat(discType === 1 ? ((sub - getValueDiscount) - totalDis) + shippingCharges : ((sub - getValueDiscount) + shippingCharges) - (((sub - getValueDiscount) / 100) * totalDis).toFixed(2)) : parseFloat(subTotal + shippingCharges).toFixed(2) :
                                          getById === null ? parseFloat((totalDiscountValue - totalDis) + shippingCharges).toFixed(2) : parseFloat(discType === 1 ? (totalDiscountValue - totalDis) + shippingCharges : (totalDiscountValue - (totalDiscountValue * totalDis) / 100) + shippingCharges).toFixed(2)}</strong></td> */}
                                      </tr>
                                    ) : null}

                                    <tr>
                                      <td scope="row" colspan="20" className="">
                                        <strong>Grand Total</strong>
                                      </td>
                                      <td className="cart__sub__headings">
                                        <strong>
                                          ₹{" "}
                                          {cookies.customer_id
                                            ? showReward && abcs
                                              ? parseFloat(
                                                  finalQty -
                                                    getValueDiscount -
                                                    totalDis +
                                                    shippingCharges -
                                                    RewardMaual >
                                                    0
                                                    ? finalQty -
                                                        getValueDiscount -
                                                        totalDis +
                                                        shippingCharges -
                                                        RewardMaual
                                                    : 0
                                                ).toFixed(2)
                                              : discType === 1
                                              ? parseFloat(
                                                  finalQty -
                                                    getValueDiscount -
                                                    totalDis +
                                                    shippingCharges
                                                ).toFixed(2)
                                              : (
                                                  finalQty -
                                                  getValueDiscount -
                                                  ((finalQty -
                                                    getValueDiscount) /
                                                    100) *
                                                    totalDis +
                                                  shippingCharges
                                                ).toFixed(2)
                                            : discType === 1
                                            ? parseFloat(
                                                finalQty -
                                                  getValueDiscountID -
                                                  totalDis +
                                                  shippingCharges
                                              ).toFixed(2)
                                            : parseFloat(
                                                finalQty -
                                                  getValueDiscountID -
                                                  ((finalQty -
                                                    getValueDiscountID) /
                                                    100) *
                                                    totalDis +
                                                  shippingCharges
                                              ).toFixed(2)}
                                        </strong>
                                      </td>
                                      {/* {console.log(total_amount , "redddd")}
                                        <td className='cart__sub__headings'><strong>₹ {cookies.customer_id ? getById !== null ? parseFloat(discType === 1 ? ((sub - getValueDiscount) - totalDis) + shippingCharges : ((sub - getValueDiscount) + shippingCharges) - (((sub - getValueDiscount) / 100) * totalDis).toFixed(2)) : parseFloat(subTotal + shippingCharges).toFixed(2) :
                                          getById === null ? parseFloat((totalDiscountValue - totalDis) + shippingCharges).toFixed(2) : parseFloat(discType === 1 ? (totalDiscountValue - totalDis) + shippingCharges : (totalDiscountValue - (totalDiscountValue * totalDis) / 100) + shippingCharges).toFixed(2)}</strong></td> */}
                                    </tr>
                                    <tr>
                                      <td scope="row" colspan="20"  style={{padding:"0.5rem 0px"}}>
                                        <input
                                          className="form-check-input mx-2"
                                          type="checkbox"
                                          value="rewardpoints"
                                          disabled={disabled_one}
                                          name="reward"
                                          onChange={(e) => handleChange(e)}
                                          onClick={(e) => handleChange(e)}
                                          checked={
                                            cookies.rewardpointss ? true : false
                                          }
                                        />
                                        <label
                                          className="form-check-label"
                                          for="flexCheckDefault"
                                        >
                                          <strong> Reward Points</strong>
                                        </label>
                                      </td>
                                      <td className="cart__sub__headings">
                                        <input
                                          className="form-check-input mx-2"
                                          type="checkbox"
                                          value="coupon"
                                          name="reward"
                                          disabled={disabled_two}
                                          onChange={(e) =>
                                            handleChange_coupon(e)
                                          }
                                        />
                                        <label
                                          className="form-check-label"
                                          for="flexCheckDefault"
                                        >
                                          <strong>Coupons</strong>
                                        </label>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>

                          {console.log(getById, "poipoipoi")}
                          {getById !== null ? (
                            <div className="d-flex justify-content-between">
                              <div>
                                <ImCheckmark className="mx-2 text-success" />
                                <strong className="text-success text-right">
                                  Coupon Applied
                                </strong>
                              </div>
                              <div>
                                <small className="text-muted">
                                  (Remove Coupon)
                                </small>{" "}
                                <button
                                  onClick={() => Remove}
                                  className="coupon-rem-btn"
                                >
                                  <MdDeleteOutline className="text-muted" />
                                </button>
                              </div>
                            </div>
                          ) : null}

                          <div>
                            <div
                              // add={add}
                              // addCart={addCart}
                              // select={select}
                              onClick={cookies.customer_id ? login : toasty}
                              className="  cart__button__proceed w-100 mt-3"
                            >
                              {" "}
                              Proceed to checkout{" "}
                            </div>
                          </div>
                          {showCoupon ? (
                            <>
                              <div className="cart__side__coupon">
                                <div className="border_bottom">
                                  <div className=" d-flex align-items-center justify-content-between pb-2">
                                    <h6 className="cart__table__headings coupon_title">
                                      <IoMdPricetag className="cart__coupon__icons" />
                                      COUPON
                                    </h6>
                                    <span
                                      className="manual-entry  text-danger"
                                      onClick={manualEntry}
                                    >
                                      Manual Coupon Apply
                                    </span>
                                  </div>
                                </div>
                                {/* <hr style={{ height: "3px" }} /> */}

                                <div id="slider-containercontainer">
                                  <Slider
                                    {...settings}
                                    className="container-boxing "
                                  >
                                    {couponData.map((data) => (
                                      <div className="">
                                        <div className="d-flex justify-content-center row">
                                          <div className="col-md-12 slider-cont">
                                            <div className="coupon p-3 bg-pink web-coupon">
                                              <div className="row no-gutters">
                                                <div className="col-4 right-side">
                                                  <div className="d-flex flex-column align-items-center">
                                                    <img
                                                      src={couponsImg}
                                                      height="120px"
                                                      width="130px"
                                                    />
                                                    {/* <span className="d-block">T-labs</span>
                                                                                            <span className="text-black-50">Shoes</span> */}
                                                  </div>{" "}
                                                </div>
                                                <div className="col-8">
                                                  <div className="row">
                                                    <div className="col-6">
                                                      <span>Promo code:</span>
                                                      <span
                                                        className="border-dot mt-2 px-3 rounded code"
                                                        type="button"
                                                        // onClick={() => { clipBoard(data.code) }}
                                                        name="code"
                                                        onClick={() =>
                                                          couponSubmit(
                                                            data.coupon_id
                                                          )
                                                        }
                                                      >
                                                        {/* {btnCopied} */}
                                                        {data.code}

                                                        {/* {coupons.code} */}
                                                      </span>
                                                    </div>
                                                    {console.log("log", data)}
                                                    <div className=" col-6 d-flex flex-row justify-content-end off">
                                                      <h1>
                                                        <span className="small">
                                                          {data.discount_type ===
                                                          0 ? (
                                                            <span>
                                                              {
                                                                data.discount_percent
                                                              }
                                                              &#37;
                                                            </span>
                                                          ) : (
                                                            <span>
                                                              &#8377;
                                                              {
                                                                data.discount_percent
                                                              }
                                                            </span>
                                                          )}
                                                        </span>
                                                      </h1>
                                                      {/* <span>OFF</span> */}
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <p className="text-center text-muted ">
                                                      Expiry Date:{" "}
                                                      {data.end_date.slice(
                                                        0,
                                                        10
                                                      )}
                                                    </p>
                                                    <BiLinkExternal
                                                      onClick={() =>
                                                        setModalFail(true)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="coupon p-3 bg-pink mob-coupon">
                                              <div className="row no-gutters">
                                                <div className="col-md-4 right-side">
                                                  <div className="d-flex flex-column align-items-center">
                                                    <img
                                                      src={couponsImg}
                                                      height="130px"
                                                      width="130px"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-md-8">
                                                  <div className="row">
                                                    <div className="col-md-5 d-flex  justify-content-between">
                                                      <div className="d-block">
                                                        <span>Promo code:</span>
                                                        <br />
                                                        <span
                                                          className="border-dot mt-2 px-3 rounded code"
                                                          type="button"
                                                          // onClick={() => { clipBoard(data.code) }}
                                                          name="code"
                                                          onClick={() =>
                                                            couponSubmit(
                                                              data.coupon_id
                                                            )
                                                          }
                                                        >
                                                          {/* {btnCopied} */}
                                                          {data.code}

                                                          {/* {coupons.code} */}
                                                        </span>
                                                      </div>
                                                      <h1>
                                                        <span className="small">
                                                          {data.discount_type ===
                                                          0 ? (
                                                            <span>
                                                              {
                                                                data.discount_percent
                                                              }
                                                              &#37;
                                                            </span>
                                                          ) : (
                                                            <span>
                                                              &#8377;
                                                              {
                                                                data.discount_percent
                                                              }
                                                            </span>
                                                          )}
                                                        </span>
                                                      </h1>
                                                    </div>
                                                    {console.log("log", data)}
                                                    <div className="col-md-5 off">
                                                      {/* <span>OFF</span> */}
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <p className="text-center text-muted ">
                                                      Expiry Date:{" "}
                                                      {data.end_date.slice(
                                                        0,
                                                        10
                                                      )}
                                                    </p>
                                                    <BiLinkExternal
                                                      onClick={() =>
                                                        setModalFail(true)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <Modal
                                          isOpen={modalFail}
                                          toggle={toggleModalFail}
                                        >
                                          <ModalBody className="modal-body-lg text-center">
                                            <div className="nk-modal">
                                              {/* <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"></Icon> */}
                                              <h4 className="nk-modal-title"></h4>
                                              <div className="nk-modal-action mt-5">
                                                <Link to="/dashboard/coupons">
                                                  <Button
                                                    color="light"
                                                    size="lg"
                                                    className="btn-mw mr-3"
                                                    onClick={toggleModalFail}
                                                  >
                                                    Done
                                                  </Button>
                                                </Link>
                                              </div>
                                            </div>
                                          </ModalBody>
                                        </Modal>
                                        {/* {isDisable === true ? null : <>
                                                                        {isInput ? (<div className='d-flex mt-3'>
                                                                            <div class="input-group">
                                                                                <input type="text" className="form-control mb-3 mt-3 coupon__input w-75" name="coupon"
                                                                                    value={CODE} id="exampleFormControlInput1 code" placeholder="Coupon Code"
                                                                                    onChange={couponChange} htmlFor="code" />
                                                                                <button type="reset" class="btn bg-transparent clearbtninput" style={{ marginLeft: '-40px', zIndex: '100' }} onClick={clearCoupon}>
                                                                                    <i class="fa fa-times"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>) : null}
                                                                        </>} */}
                                      </div>
                                    ))}
                                    {/* <div className="bg-primary">
                                                                            <h1>render</h1>
                                                                        </div>
                                                                        <div className="bg-primary">
                                                                            <h1>render</h1>
                                                                        </div> */}
                                  </Slider>

                                  {isInput ? (
                                    <div className="d-flex mt-3">
                                      <div class="input-group">
                                        <input
                                          type="text"
                                          className="form-control mb-3 mt-3 coupon__input w-75"
                                          id="exampleFormControlInput1 code"
                                          placeholder="Coupon Code"
                                          onchange={couponChange}
                                          htmlFor="code"
                                        />
                                        <button
                                          type="reset"
                                          class="btn bg-transparent clearbtninput"
                                          style={{
                                            marginLeft: "-40px",
                                            zIndex: "100",
                                          }}
                                          onClick={clearCoupon}
                                        >
                                          <i class="fa fa-times"></i>
                                        </button>
                                      </div>

                                      <input
                                        name="Apply"
                                        value="Apply"
                                        type="button"
                                        className="form-control mb-3 mt-3 coupon__input coupon__input__one text-center w-25"
                                        id="exampleFormControlInput1"
                                      />

                                      {/* <input  className=" mb-3 mt-3 coupon__input coupon__input__one w-25" placeholder="name@example.com"></input> */}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </>
                          ) : null}
                          {showRewards ? (
                            <>
                              <div className="cart__side__coupon">
                                <div className="border_bottom">
                                  <div className=" d-flex align-items-center justify-content-between pb-2">
                                    <h6 className="cart__table__headings coupon_title">
                                      <IoMdPricetag className="cart__coupon__icons" />
                                      Reward Points
                                    </h6>
                                    <span
                                      className="manual-entry  text-danger"
                                      onClick={manualEntry}
                                    >
                                      Manual Reward Points Apply
                                    </span>
                                  </div>
                                </div>
                                {/* <hr style={{ height: "3px" }} /> */}

                                <div id="slider-containercontainer">
                                  {isInput ? (
                                    <div className="d-flex mt-3">
                                      <div class="input-group">
                                        <input
                                          type="text"
                                          className="form-control mb-3 mt-3 coupon__input w-75"
                                          placeholder="Reward Points"
                                          ref={manualReward}
                                        />
                                        <button
                                          type="reset"
                                          class="btn bg-transparent clearbtninput"
                                          style={{
                                            marginLeft: "-40px",
                                            zIndex: "100",
                                          }}
                                        >
                                          <i class="fa fa-times"></i>
                                        </button>
                                      </div>

                                      <input
                                        name="Apply"
                                        value="Apply"
                                        onClick={() => handleSubmit()}
                                        type="button"
                                        className="form-control mb-3 mt-3 coupon__input coupon__input__one text-center w-25"
                                        id="exampleFormControlInput1"
                                      />

                                      {/* <input  className=" mb-3 mt-3 coupon__input coupon__input__one w-25" placeholder="name@example.com"></input> */}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </>
                          ) : null}
                          {/* {showReward ? (
                            <>
                              <div className="cart__side__coupon">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="cart__table__headings">
                                    <IoMdPricetag className="cart__coupon__icons" />
                                    Reward Points
                                  </h6>
                                  <span className="manual-entry  text-danger">
                                    {cookies.customer_id ? (
                                      <>
                                        {RewardData.length > 0
                                          ? abcs
                                          : 0}
                                      </>
                                    ) : (
                                      <>0</>
                                    )}
                                  </span>
                                </div>
                                <hr style={{ height: "3px" }} />
                              </div>
                            </>
                          ) : null} */}
                        </div>
                      )}

                      {/* <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                      /> */}
                    </div>
                  </div>
                </form>
              </section>
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
