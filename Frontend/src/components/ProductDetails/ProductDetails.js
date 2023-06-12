import React, { useState, useEffect, useContext } from "react";
import {
  Route,
  Link,
  Routes,
  useParams,
  NavLink,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { Button, Modal, ModalBody } from "react-bootstrap";
/**---------------------------------Components-------------------------------------------- */
import ProductDetailsSlider from "../ProductDetailsSlider/ProductDetailsSlider";
import "./ProductDetails.css";
import { cartContext } from "../../layout/layout";
import SeoHelmet from "../SEOHelmetDetails/SeoHelmet";
/**---------------------------------Icons-------------------------------------------- */
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import { FaArrowRight } from "react-icons/fa";
import TabBarWithRender from "../TabView/tabView";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BiSearchAlt2 } from "react-icons/bi";
import NappySideBar from "../NappySideBar/NappySideBar";
/**---------------------------------Assets------------------------------------------- */

import {
  API_URL,
  API_CART,
  API_Product,
  token,
  API_Brand,
} from "../../config/config";
import SearchInput from "../Search/search";
import { VscSearch } from "react-icons/vsc";
import Loading from "../LazyLoading/Loading";

import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Attribute_Image = `${API_URL}/Attributes_image`;
const API_Brand_Image = `${API_URL}/Brand_view`;
const API_Attribute_Data = `${API_URL}/admin/productlist/getAttributevarityData`;
const API_Attribute_Product = `${API_URL}/admin/productlist`;
const API_Question = `${API_URL}/admin/productlist/addQa/`;
const API_QuestionData = `${API_URL}/admin/productlist/getQaData`;
const API_Att_Image = `${API_URL}/Attributes_image`;
const API_Review = `${API_URL}/admin/productlist/addComments`;
const API_Review_Get = `${API_URL}/admin/productlist/getCommentsData`;
const API_Customer = `${API_URL}/admin/customers`;
const Add_Subscription = `${API_URL}/admin/productlist/addSubscription`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const getCart = () => {
  const products = localStorage.getItem("cartproduct");
  if (products) {
    return JSON.parse(localStorage.getItem("cartproduct"));
  } else {
    return [];
  }
};

const ProductDetails = ({ fullRatings, addCart, add, select }) => {
  const location = useLocation().state;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [getUsercart, setUsercart] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [Email, setEmail] = useState("");
  const { cart, toggleShows, GetCart } = useContext(cartContext);
  const [AttributeValue, setAttributeValue] = useState(0);
  const [show, setShow] = useState(true);
  const [showDisableBtn, setDisableBtn] = useState(true);
  const [Attribute, setAttribute] = useState([]);
  const [AttributeValueTwo, setAttributeValueTwo] = useState(null);
  const [Attributeid, setAttributeid] = useState(null);
  const [AttributeProduct, setAttributeProduct] = useState(null);
  const { GetCartdatas } = useContext(cartContext);
  const [modalShow, setModalShow] = useState(false);
  const [notifyBtn, setnotifyBtn] = useState(false);
  const [ShowMsg, setShowMsg] = useState(false);
  const [StockMsg, setShowStockMsg] = useState(null);
  const [showStock, setShowStock] = useState(false);
  const [count, setCount] = useState(0);

  const { addTocart } = useContext(cartContext);
  const [datas, setData] = useState();
  const [Attributedata, setAttributeData] = useState({
    AttributeName: "",
    AttributeType: "",
  });
  const [metaDetails, setMetaDetails] = useState({
    Title: "",
    Description: "",
  });

  const [brands, setBrands] = useState([]);
  const [addtocarts, setAddtocart] = useState(getCart);
  const valuess = useParams();
  const [customerData, setCustomerData] = useState([]);

  const [num, setNum] = useState(1);

  const [view, setView] = useState(false);
  const [showData, setShowData] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState({
    Productid: "",
    customerid: "",
    question: "",
  });
  const [Test, setTest] = useState({
    testValue: "",
    testId: "",
  });

  const [review, setReview] = useState("");
  const [Avg, setAvg] = useState();
  const incNum = () => {
    try {
      if (datas.AttributeValue?.length == 0) {
        if (datas?.current_stock == 0) {
          if (datas?.PreOrder == "Enable" && datas?.PreOrderQuantity > 0) {
            if (datas?.SoldIndividual > 0 && datas?.PreOrderQuantity > 0) {
              num < datas?.SoldIndividual &&
              num < 10 &&
              num < datas?.PreOrderQuantity
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(
                    datas?.PreOrderQuantity,
                    datas?.SoldIndividual
                  );
            } else if (
              datas?.SoldIndividual == 0 &&
              datas?.PreOrderQuantity > 0
            ) {
              num < datas?.PreOrderQuantity && num < 10
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(datas?.PreOrderQuantity);
            }
          }
          // else if (datas?.SoldIndividual > 0) {
          //   num < datas?.SoldIndividual ? setNum(Number(num) + 1) : handleShowStcokmsg(datas?.SoldIndividual, datas?.SoldIndividual);
          // }
          else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
            // toast.info("No Stock Available", {
            //   position: "top-right",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: false,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });
          }
        } else {
          if (datas?.current_stock > 0 && datas?.SoldIndividual > 0) {
            num < datas?.SoldIndividual &&
            num < 10 &&
            num < datas?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(datas?.current_stock, datas?.SoldIndividual);
          } else if (datas?.current_stock > 0 && datas?.SoldIndividual == 0) {
            num < 10 && num < datas?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(datas?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      } else if (datas.AttributeValue?.length > 0) {
        if (Attributeid) {
          if (AttributeProduct[0]?.current_stock == 0) {
            if (
              AttributeProduct[0]?.PreOrder == "Enable" &&
              AttributeProduct[0]?.PreOrderQuantity > 0
            ) {
              if (
                AttributeProduct[0]?.SoldIndividual > 0 &&
                AttributeProduct[0]?.PreOrderQuantity > 0
              ) {
                num < AttributeProduct[0]?.SoldIndividual &&
                num < 10 &&
                num < AttributeProduct[0]?.PreOrderQuantity
                  ? setNum(Number(num) + 1)
                  : handleShowStcokmsg(
                      AttributeProduct[0]?.PreOrderQuantity,
                      AttributeProduct[0]?.SoldIndividual
                    );
              } else if (
                AttributeProduct[0]?.SoldIndividual == 0 &&
                AttributeProduct[0]?.PreOrderQuantity > 0
              ) {
                num < AttributeProduct[0]?.PreOrderQuantity && num < 10
                  ? setNum(Number(num) + 1)
                  : handleShowStcokmsg(AttributeProduct[0]?.PreOrderQuantity);
              }
            } else {
              setShowStock(true);
              setShowStockMsg("Out of Stock");
              setnotifyBtn(true);
              setNum(0);
              // toast.info("No Stock Available", {
              //   position: "top-right",
              //   autoClose: 1000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: false,
              //   draggable: true,
              //   progress: undefined,
              //   theme: "light",
              // });
            }
          } else {
            if (
              AttributeProduct[0]?.current_stock > 0 &&
              Number(AttributeProduct[0]?.SoldIndividual) > 0
            ) {
              num < Number(AttributeProduct[0]?.SoldIndividual) && num < 10
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(
                    AttributeProduct[0]?.current_stock,
                    AttributeProduct[0]?.SoldIndividual
                  );
            } else if (
              AttributeProduct[0]?.current_stock > 0 &&
              AttributeProduct[0]?.SoldIndividual == 0
            ) {
              num < 10 && num < AttributeProduct[0]?.current_stock
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(AttributeProduct[0]?.current_stock);
            } else {
              setShowStock(true);
              setShowStockMsg("Out of Stock");
              setnotifyBtn(true);
              setNum(0);
            }
          }
        } else {
          if (!toast.isActive("designer_refresh")) {
            toast.info(
              "Please select some product options before adding this product to your cart",
              {
                toastId: "designer_refresh",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                // pauseOnHover: true,
                draggable: true,
                className: "notificationToolTip",
              }
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log(Attributedata, "Attributedata", Attribute);
    // if (num < 10) {
    //   num<AttributeProduct[0]?.current_stock?setNum(Number(num) + 1):setNum(AttributeProduct[0]?.current_stock)
    //   // setNum(Number(num) + 1);
    // }
  };
  const decNum = () => {
    console.log(num,"numer");
    if (num > 1) {
      setNum(num - 1);
    } else 
    if (num != 0) {
      setNum(1);
    }else {
      setNum(0);
    }
  };
  const handleClose = () => {
    setModalShow(false);
    setAttributeid("");
    setEmail("");
  };
  const handleShow = () => setModalShow(true);
  // const getUserCart = async () => {
  //   try {
  //     const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
  //       headers: { Authorization: `Bearer ${token} ` },
  //     });
  //     setUsercart(Result.data.list);
  //   } catch (error) { }
  // };

  const Getdata = async (id) => {
    const data = await axios.get(`${API_Product}/${id}`, configss);
    console.log(data,"pppppppppppppppppppppppppppppppp");
    console.log("dataa", data.data.list[0]);
    setMetaDetails({
      Title: data.data.list[0].MetaTitle,
      Description: data.data.list[0].MetaDescription,
    });
    if (data.data.list[0].BrandID) {
      const Result = await axios.get(
        `${API_Brand}/${data.data.list[0].BrandID}`,
        configss
      );
      setBrands(Result.data.list[0]);
    }
    setData(data.data.list[0]);
  };

  const getAttributeData = async () => {
    let Result = await axios.get(
      `${API_Attribute_Data}/${valuess.id}`,
      configss
    );
    if (Result) {
      setAttribute(Result.data.list);
      setAttributeData({
        ...Attributedata,
        AttributeName:
          Result.data.list?.length > 0
            ? Result.data.list[0].AttributeType
            : null,
      });
      // console.log(Result.data.list, "dadadad");
    }
  };

  const GetActive = async () => {
    if (location) {
      if (location.variant_1 && location.variant_2) {
        const result = await axios.get(
          `${API_Attribute_Product}/${location.product_attributeid}`
        );
        if (result) {
          // console.log(result.data.list, "111111112222");
          setAttributeProduct(result.data.list);
          // setData(result.data.list)
        }
        setAttributeData({
          AttributeName: location.variant_2,
          AttributeType: location.variant_1,
        });
        setTest({
          ...Test,
          testValue: location.variant_2,
          testId: location.variant_1,
        });
        setAttributeData({
          ...Attributedata,
          AttributeType: location.variant_2,
          AttributeName: location.variant_1,
        });

        setAttributeid(Number(location.product_attributeid));
      } else {
        const result = await axios.get(
          `${API_Attribute_Product}/${location.product_attributeid}`
        );
        if (result) {
          // console.log(result.data.list, "111111112222");
          setAttributeProduct(result.data.list);
          // setData(result.data.list)
        }
        setTest({
          ...Test,
          testValue: location.variant_2,
        });
        setAttributeData({
          ...Attributedata,
          AttributeType: location.variant_2,
        });
        setAttributeid(Number(location.product_attributeid));
      }
    }
  };

  useEffect(() => {
    // GetdataBrand()
    showsDatas();
    getAttributeData();
    // getQAdata();
    Getdata(valuess.id);
    GetActive();
    if (cookies.customer_id) {
      getCustomerdata();
    }
  }, [valuess.id]);

  const getCustomerdata = async () => {
    try {
      const cusData = await axios.get(
        `${API_Customer}/${cookies.customer_id}`,
        configss
      );
      setCustomerData(cusData.data.list);
    } catch (error) {}
  };
 
  const addtocartss = async () => {
    try {
      if (cookies.customer_id) {
        if (datas.AttributeValue?.length > 0) {
          if (Attributeid) {
            let existprodct = cart.find(
              (curr) => curr.product_attributeid == Attributeid
            );
            if (existprodct) {
              setShowMsg(true);
              setCount(num);
              try {
                // console.log("existprodct3", existprodct.id)
                const updateCartProducts = {
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
                  Attributeid: Attributeid,
                  variant_1:
                    datas.AttributeValue?.length > 1
                      ? `${datas.AttributeValue[0].Attribute_name}:${Attributedata.AttributeName}`
                      : null,
                  variant_2:
                    datas.AttributeValue?.length > 1
                      ? `${datas.AttributeValue[1].Attribute_name}:${Attributedata.AttributeType}`
                      : datas.AttributeValue?.length == 1
                      ? `${datas.AttributeValue[0].Attribute_name}:${Attributedata.AttributeType}`
                      : null,
                      variant_1_name:
                      datas.AttributeValue?.length > 1
                        ? `${datas.AttributeValue[0].Attribute_name}`
                        : null,
                    variant_2_name:
                      datas.AttributeValue?.length > 1
                        ? `${datas.AttributeValue[1].Attribute_name}`
                        : datas.AttributeValue?.length == 1
                        ? `${datas.AttributeValue[0].Attribute_name}`
                        : null,
                  Productid: Attributeid,
                  ProductQuantity: num,
                  product_total: 0,
                };
                let Result = await axios.put(
                  `${API_CART}/${existprodct.id}`,
                  updateCartProducts,
                  configss
                );
                if (Result) {
                  toggleShows();
                  GetCart();
                  // getUserCart();
                  // GetCartdatas();
                  setAttributeid(null);
                  // window.location.reload(false)
                }
              } catch (error) {}
            } else {
              try {
                setShowMsg(true);
                setCount(num);
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
                  Attributeid: Attributeid,
                  Productid: Attributeid,
                  ProductQuantity: num,
                  variant_1:
                    datas.AttributeValue?.length > 1
                      ? `${Attributedata.AttributeName}`
                      : null,
                  variant_2:
                    datas.AttributeValue?.length > 1
                      ? `${Attributedata.AttributeType}`
                      : datas.AttributeValue?.length == 1
                      ? `${Attributedata.AttributeType}`
                      : null,
                      variant_1_name:
                      datas.AttributeValue?.length > 1
                        ? `${datas.AttributeValue[0].Attribute_name}`
                        : null,
                    variant_2_name:
                      datas.AttributeValue?.length > 1
                        ? `${datas.AttributeValue[1].Attribute_name}`
                        : datas.AttributeValue?.length == 1
                        ? `${datas.AttributeValue[0].Attribute_name}`
                        : null,
                  product_total: 0,
                };
                let Result = await axios.post(
                  `${API_CART}`,
                  cartProducts,
                  configss
                );
                if (Result) {
                  toggleShows();
                  GetCart();
                  // getUserCart();
                  setAttributeid(null);
                  // GetCartdatas();
                }
              } catch (error) {
                // console.log(error)
              }
            }
          } else {
            if (!toast.isActive("designer_refresh")) {
              toast.info(
                "Please select some product options before adding this product to your cart",
                {
                  toastId: "designer_refresh",
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  // pauseOnHover: true,
                  draggable: true,
                  className: "notificationToolTip",
                }
              );
            }
          }
        } else {
          let existprodct = cart.find(
            (curr) => curr.product_id == datas.Productlist_id
          );
          if (existprodct) {
            try {
              setShowMsg(true);
              setCount(num);
              // console.log("existprodct3", existprodct.id)
              const updateCartProducts = {
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
                Attributeid: Attributeid,
                Productid: datas.Productlist_id,
                ProductQuantity: num,
                product_total: 0,
              };
              let Result = await axios.put(
                `${API_CART}/${existprodct.id}`,
                updateCartProducts,
                configss
              );
              if (Result) {
                toggleShows();
                GetCart();
                // getUserCart();
                // GetCartdatas();
                // window.location.reload(false)
              }
            } catch (error) {}
          } else {
            try {
              setShowMsg(true);
              setCount(num);
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
                Attributeid: Attributeid,
                Productid: datas.Productlist_id,
                ProductQuantity: num,
                product_total: 0,
              };
              let Result = await axios.post(
                `${API_CART}`,
                cartProducts,
                configss
              );
              if (Result) {
                toggleShows();
                GetCart();
                // getUserCart();
                // GetCartdatas();
              }
            } catch (error) {
              // console.log(error)
            }
          }
        }
      } else {
        setShowMsg(true);
        setCount(num);
        toggleShows();
        let variant_1 =
          datas.AttributeValue?.length > 1
            ? `${Attributedata.AttributeName}`
            : null;
        let variant_2 =
          datas.AttributeValue?.length > 1
            ? `${Attributedata.AttributeType}`
            : datas.AttributeValue?.length == 1
            ? `${Attributedata.AttributeType}`
            : null;
        let variant_1_name=datas.AttributeValue?.length > 1
              ? `${datas.AttributeValue[0].Attribute_name}`
              : null;
        let variant_2_name =datas.AttributeValue?.length > 1
              ? `${datas.AttributeValue[1].Attribute_name}`
              : datas.AttributeValue?.length == 1
              ? `${datas.AttributeValue[0].Attribute_name}`
              : null;
        // let variant_1 =
        //   datas.AttributeValue?.length > 1
        //     ? `${datas.AttributeValue[0].Attribute_name}:${Attributedata.AttributeName}`
        //     : null;
        // let variant_2 =
        //   datas.AttributeValue?.length > 1
        //     ? `${datas.AttributeValue[1].Attribute_name}:${Attributedata.AttributeType}`
        //     : datas.AttributeValue?.length == 1
        //     ? `${datas.AttributeValue[0].Attribute_name}:${Attributedata.AttributeType}`
        //     : null;

        let att = AttributeProduct?.length > 0 ? AttributeProduct[0] : null;
        addTocart(datas, num, Attributeid, att, variant_1, variant_2,variant_1_name,variant_2_name);

        // setAttributeid(null);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const [changetab, setChangeTab] = useState(0);
  const handleActiveTab = (activePage) => {
    setChangeTab(activePage);
    // console.log(activePage, "activePage");
    if (activePage == 2) {
      getQAdata();
    }
    if (activePage == 1) {
      showsDatas();
    }
  };

  console.log(datas, "cookies");

  function Arrow(props) {
    let className = props.type === "next" ? "nextArrow" : "prevArrow";
    className += " arrow arrows";
    const char =
      props.type === "next" ? (
        <MdKeyboardArrowRight />
      ) : (
        <MdKeyboardArrowLeft />
      );
    return (
      <span className={className} onClick={props.onClick}>
        {char}
      </span>
    );
  }
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });
  // console.log("bbbbbbrrrrrrr", brands)

  const AttributeValueData = (index) => {
    setAttributeValue(index);
    setAttributeid(null);
    // setShow(true)
    // else{
    //   setShow(false)
    // }
  };

  const getAttributeProduct = async (id, property) => {
    setNum(1);
    setShowStock(false);
    setAttributeid(id);
    setTest({
      testValue: "",
      testId: "",
    });
    setAttributeData({
      ...Attributedata,
      AttributeType: property,
    });

    setDisableBtn(false);
    setnotifyBtn(false);
    const result = await axios.get(`${API_Attribute_Product}/${id}`);
    if (result) {
      let AttriProduct = result.data.list[0];
      console.log(result.data.list, "111111112222");
      setAttributeProduct(result.data.list);
      // check outof stock
      if (datas.AttributeValue?.length == 0) {
        if (datas?.current_stock == 0) {
          if (datas?.PreOrder == "Enable" && datas?.PreOrderQuantity > 0) {
            if (datas?.SoldIndividual > 0 && datas?.PreOrderQuantity > 0) {
              num < datas?.SoldIndividual &&
              num < 10 &&
              num < datas?.PreOrderQuantity
                ? setNum(Number(1))
                : handleShowStcokmsg(
                    datas?.PreOrderQuantity,
                    datas?.SoldIndividual
                  );
            } else if (
              datas?.SoldIndividual == 0 &&
              datas?.PreOrderQuantity > 0
            ) {
              num < datas?.PreOrderQuantity && num < 10
                ? setNum(Number(1))
                : handleShowStcokmsg(datas?.PreOrderQuantity);
            }
          }
          // else if (datas?.SoldIndividual > 0) {
          //   num < datas?.SoldIndividual ? setNum(Number(num) + 1) : handleShowStcokmsg(datas?.SoldIndividual, datas?.SoldIndividual);
          // }
          else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
            // toast.info("No Stock Available", {
            //   position: "top-right",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: false,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });
          }
        } else {
          if (datas?.current_stock > 0 && datas?.SoldIndividual > 0) {
            num < datas?.SoldIndividual &&
            num < 10 &&
            num < datas?.current_stock
              ? setNum(Number(1))
              : handleShowStcokmsg(datas?.current_stock, datas?.SoldIndividual);
          } else if (datas?.current_stock > 0 && datas?.SoldIndividual == 0) {
            num < 10 && num < datas?.current_stock
              ? setNum(Number(1))
              : handleShowStcokmsg(datas?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      } else if (datas.AttributeValue?.length > 0) {
        if (AttriProduct?.current_stock == 0) {
          if (
            AttriProduct?.PreOrder == "Enable" &&
            AttriProduct?.PreOrderQuantity > 0
          ) {
            if (
              AttriProduct?.SoldIndividual > 0 &&
              AttriProduct?.PreOrderQuantity > 0
            ) {
              num < AttriProduct?.SoldIndividual &&
              num < 10 &&
              num < AttriProduct?.PreOrderQuantity
                ? setNum(Number(1))
                : handleShowStcokmsg(
                    AttriProduct?.PreOrderQuantity,
                    AttriProduct?.SoldIndividual
                  );
            } else if (
              AttriProduct?.SoldIndividual == 0 &&
              AttriProduct?.PreOrderQuantity > 0
            ) {
              num < AttriProduct?.PreOrderQuantity && num < 10
                ? setNum(Number(1))
                : handleShowStcokmsg(AttriProduct?.PreOrderQuantity);
            }
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
            // toast.info("No Stock Available", {
            //   position: "top-right",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: false,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });
          }
        } else {
          if (
            AttriProduct?.current_stock > 0 &&
            Number(AttriProduct?.SoldIndividual) > 0
          ) {
            num < Number(AttriProduct?.SoldIndividual) && num < 10
              ? setNum(Number(1))
              : handleShowStcokmsg(
                  AttriProduct?.current_stock,
                  AttriProduct?.SoldIndividual
                );
          } else if (
            AttriProduct?.current_stock > 0 &&
            AttriProduct?.SoldIndividual == 0
          ) {
            num < 10 && num < AttriProduct?.current_stock
              ? setNum(Number(1))
              : handleShowStcokmsg(AttriProduct?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      }

      //end out of stock
      // setData(result.data.list)
    }
  };

  const [viewAnswer, setViewAnswer] = useState([]);

  const [QAdata, setQAdata] = useState([]);

  // console.log(datas.Productlist_id, "datasdatas");

  const getQAdata = async () => {
    const configss = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const Resultsss = await axios.get(`${API_QuestionData}`, configss);

    let res = Resultsss.data.list.filter(
      (currEle) => currEle.product_id == datas.Productlist_id
    );
    setViewAnswer(res.reverse());
  };

  const onFormCancel = () => {
    setView(false);
  };

  const handleOpen = () => {
    setView(false);
  };

  const QuestionSubmit = async (id) => {
    if (questionAnswer?.length > 0) {
      let local = {
        Productid: id,
        customerid: cookies.customer_id,
        question: questionAnswer,
      };
      let Result = await axios.post(`${API_Question}`, local, configss);
      if (Result) {
        setQuestionAnswer({
          ...questionAnswer,
          question: "",
        });
        setView(!view);
      }
    }
  };

  const handleReviews = async (id) => {
    if (review) {
      let local = {
        Productid: id,
        customerid: cookies.customer_id,
        comments: review,
        reviewrating: currentValue,
      };

      let results = await axios.post(`${API_Review}`, local, configss);

      //console.log(results, "results");
      if (results) {
        setReview({
          ...review,
          comments: "",
        });
        setCurrentValue("");
        setHoverValue("");
        // setView(!view);
        setDisabled(true);
      }

      toast.success("Comment sent successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const showsDatas = async () => {
    const datass = await axios.get(`${API_Review_Get}`, configss);
    let res = datass.data.list.filter(
      (currEle) => currEle.Productid == datas.Productlist_id
    );

    const total = datass.data.list.reduce(
      (previousValue, currentValue, index) => {
        return previousValue + parseInt(currentValue.reviewrating);
      },
      0
    );
    // console.log("total", total);
    const avg = parseInt(total / datass.data.list.length);
    // console.log("avg", avg);
    setAvg(avg);

    setShowData(res);
    // console.log(res, "ssssss");
  };

  const handleAttributeName = (property, index) => {
    AttributeValueData(index);
    setAttributeData({
      AttributeName: property,
    });
    setTest({
      testId: "",
      testValue: "",
    });
  };

  //new code reviews

  const colors = {
    orange: "#ff6766",
    grey: "#A9A9A9",
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "0.3em",
    },
  };

  const stars = Array(5).fill(0);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    // console.log("values", value);
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const rating = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <>
        <span key={index}>
          {Avg >= index + 1 ? (
            <>
              {" "}
              <AiFillStar className="rating" />
            </>
          ) : Avg >= number ? (
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

  const getNotify = (id, property) => {
    setAttributeid(id);
    setAttributeData({
      ...Attributedata,
      AttributeType: property,
    });

    setnotifyBtn(true);
    toast.info("No Stock Available", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("email", Email);
    formData.append("Productid", Attributeid);
    formData.append("customerid", cookies.customer_id);
    let result = await axios.post(`${Add_Subscription}`, formData, configss);
    if (result) {
      toast.info("We will notify you through via email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail("");
      setAttributeid("");
      handleClose();
    }
  };
  const handleShowStcokmsg = (qty, qtys) => {
    // setNum(Number(qtys));
    setShowStock(true);

    setShowStockMsg(
      qtys
        ? `Instock only ${qty} left but you can buy only ${
            qtys > 10 ? 10 : qtys
          } qtys - order soon `
        : `Instock only ${qty} left - order soon`
    );
  };

  const addtocartValidation = () => {
    try {
      if (datas.AttributeValue?.length == 0) {
        if (datas?.current_stock == 0) {
          if (datas?.PreOrder == "Enable" && datas?.PreOrderQuantity > 0) {
            if (datas?.SoldIndividual > 0 && datas?.PreOrderQuantity > 0) {
              num <= datas?.SoldIndividual &&
              num <= 10 &&
              num <= datas?.PreOrderQuantity
                ? addtocartss()
                : handleShowStcokmsg(
                    datas?.PreOrderQuantity,
                    datas?.SoldIndividual
                  );
            } else if (
              datas?.SoldIndividual == 0 &&
              datas?.PreOrderQuantity > 0
            ) {
              num <= datas?.PreOrderQuantity && num <= 10
                ? addtocartss()
                : handleShowStcokmsg(datas?.PreOrderQuantity);
            }
          }
          // else if (datas?.SoldIndividual > 0) {
          //   num <= datas?.SoldIndividual ?  addtocartss() : handleShowStcokmsg(datas?.SoldIndividual, datas?.SoldIndividual);
          // }
          else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
            // toast.info("No Stock Available", {
            //   position: "top-right",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: false,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });
          }
        } else {
          if (datas?.current_stock > 0 && datas?.SoldIndividual > 0) {
            num <= datas?.SoldIndividual &&
            num <= 10 &&
            num <= datas?.current_stock
              ? addtocartss()
              : handleShowStcokmsg(datas?.current_stock, datas?.SoldIndividual);
          } else if (datas?.current_stock > 0 && datas?.SoldIndividual == 0) {
            num <= 10 && num <= datas?.current_stock
              ? addtocartss()
              : handleShowStcokmsg(datas?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      } else if (datas.AttributeValue?.length > 0) {
        if (Attributeid) {
          if (AttributeProduct[0]?.current_stock == 0) {
            if (
              AttributeProduct[0]?.PreOrder == "Enable" &&
              AttributeProduct[0]?.PreOrderQuantity > 0
            ) {
              if (
                AttributeProduct[0]?.SoldIndividual > 0 &&
                AttributeProduct[0]?.PreOrderQuantity > 0
              ) {
                num <= AttributeProduct[0]?.SoldIndividual &&
                num <= 10 &&
                num <= AttributeProduct[0]?.PreOrderQuantity
                  ? addtocartss()
                  : handleShowStcokmsg(
                      AttributeProduct[0]?.PreOrderQuantity,
                      AttributeProduct[0]?.SoldIndividual
                    );
              } else if (
                AttributeProduct[0]?.SoldIndividual == 0 &&
                AttributeProduct[0]?.PreOrderQuantity > 0
              ) {
                num <= AttributeProduct[0]?.PreOrderQuantity && num <= 10
                  ? addtocartss()
                  : handleShowStcokmsg(AttributeProduct[0]?.PreOrderQuantity);
              }
            } else {
              setShowStock(true);
              setShowStockMsg("Out of Stock");
              setnotifyBtn(true);
              setNum(0);
              // toast.info("No Stock Available", {
              //   position: "top-right",
              //   autoClose: 1000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: false,
              //   draggable: true,
              //   progress: undefined,
              //   theme: "light",
              // });
            }
          } else {
            if (
              AttributeProduct[0]?.current_stock > 0 &&
              Number(AttributeProduct[0]?.SoldIndividual) > 0
            ) {
              num <= Number(AttributeProduct[0]?.SoldIndividual) &&
              num <= 10 &&
              num <= AttributeProduct[0]?.current_stock
                ? addtocartss()
                : handleShowStcokmsg(
                    AttributeProduct[0]?.current_stock,
                    AttributeProduct[0]?.SoldIndividual
                  );
            } else if (
              AttributeProduct[0]?.current_stock > 0 &&
              AttributeProduct[0]?.SoldIndividual == 0
            ) {
              num <= 10 && num <= AttributeProduct[0]?.current_stock
                ? addtocartss()
                : handleShowStcokmsg(AttributeProduct[0]?.current_stock);
            } else {
              setShowStock(true);
              setShowStockMsg("Out of Stock");
              setnotifyBtn(true);
              setNum(0);
            }
          }
        } else {
          if (!toast.isActive("designer_refresh")) {
            toast.info(
              "Please select some product options before adding this product to your cart",
              {
                toastId: "designer_refresh",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                // pauseOnHover: true,
                draggable: true,
                className: "notificationToolTip",
              }
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      {/* <div>
              <a
                class="text-center"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <h6 className="text-center mb-3 mt-3">
                  {" "}
                  <RiEqualizerLine />
                  REFINE
                </h6>
              </a>
              <div
                class="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div class="offcanvas-body">
                  <NappySideBar PriceFilter={PriceFilter} />
                </div>
              </div>
        </div> */}
      <SeoHelmet meta={metaDetails} />
      {datas ? (
        <>
          <div>
            {ShowMsg ? (
              <>
                <div className="woocommerce-message message-wrapper my-2">
                  <div className="message-container container success-color medium-text-center">
                    <p className="button wc-forward wp-element-button d-flex align-items-center">
                      <span>
                        <ImCheckmark className="mx-2" />
                      </span>
                      <span>{count}</span> × “
                      {datas.ProductName
                        ? datas.ProductName.substring(0, 6)
                        : null}
                      ...” have been added to your cart.
                    </p>
                  </div>
                </div>
              </>
            ) : null}

            <p className="ProductHead text-center">
              {renderHTML(datas.TopContent)}
            </p>

            <div className="row mb-5">
              <div className="col-md-5 col-sm-6 col-xs-12 slider_section_hover">
                {AttributeProduct?.length > 0 ? (
                  <>
                    <ProductDetailsSlider
                      image={AttributeProduct[0].productgalleryimages}
                      video={AttributeProduct[0].YoutubeLink}
                    />
                    {/* <img
                      src={`${API_Image}/${AttributeProduct[0].ProductImage}`}
                      className="img-fluid"
                    /> */}
                  </>
                ) : (
                  <>
                    <ProductDetailsSlider
                      image={datas.productgalleryimages}
                      video={datas.YoutubeLink}
                    />
                  </>
                )}
              </div>

              <div className="col-md-7 col-sm-6 col-xs-12">
                <div className="bread_box mt-4">
                  <ul className="breadcrumb d-flex">
                    <li className="bread_head">
                      <a href="#">
                        {/* {datas.MainCategory}<span className="divider1">/</span> */}
                      </a>
                    </li>
                    <li className="bread_head">
                      <a href="#">
                        {/* {datas.SubCategory.label} <span className="divider1">/</span> */}
                      </a>
                    </li>
                    <li className="bread_head">
                      {/* <a href="#"> {datas.ChildCategory.label}</a> */}
                    </li>
                  </ul>
                </div>
                {/* 
                {datas.MainCategory &&
                  datas.SubCategory &&
                  datas.ChildCategory ? (
                  <>
                    <h6 className="nappy__title text-muted">
                      {datas.MainCategory[0].label} /{" "}
                      {datas.SubCategory[0].label} /{" "}
                      {datas.ChildCategory[0].label}
                    </h6>
                  </>
                ) : null} */}

                <div className="product_detail_heading">
                  <div className="detail_heading_left">
                    <h3 className="product_title">
                      {" "}
                      {AttributeProduct?.length > 0
                        ? AttributeProduct[0].ProductName
                        : datas.ProductName}
                    </h3>
                    <div className="mt-2">
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
                          <span className="NoReview">
                            (10 customer reviews)
                          </span>
                        </div>
                      )} */}

                      {rating}
                    </div>

                    <div className="price-wrapper mt-3">
                      <p className="price product-page-price price-on-sale">
                        <del>
                          <span className="amount">
                            <span className="currencySymbol">₹</span>
                            {AttributeProduct?.length > 0
                              ? AttributeProduct[0].RegularPrice
                              : datas.RegularPrice}
                            .00
                          </span>
                        </del>
                        <ins>
                          <span className="amount">
                            <span className="currencySymbol">₹</span>
                            {AttributeProduct?.length > 0
                              ? AttributeProduct[0].SalePrice
                              : datas.SalePrice}
                            .00
                          </span>
                        </ins>
                      </p>
                    </div>

                    {/* arribute 0 */}
                    {/* <br /> */}

                    {/* {
                      datas.AttributeValue?.length > 0 ?
                        <>
                              <div className="row">
                          <div className="price-wrapper mt-2">
                            <div className="purebornvalue">
                              <div className="row mb-3">
                                {
                                  Attribute.map((currEle) => {
                                    return (
                                      <>
                                      <div className="col-md-6 mb-3">
                                      <h6 className="BornValue">
                                          {currEle.AttributeType} :<span> { } </span>
                                        </h6>

                                          <span className={AttributeValue == currEle.productlist_id ? "pureborn-cir actived mx-1" : "pureborn-cir mx-1"} onClick={() => setAttributeValue(currEle.productlist_id)}>{currEle.AttributeTypeValue}</span>
                                      </div>
                                       



                                    </>
                              )
                            })
                          }
                          </div>
                          </div>

                            </div>

                          </div>

                        </> : null
                    } */}
                    {/* {console.log(datas, "productdatasasas")} */}
                    {/* single attribute */}
                    {/* {datas.AttributeValue?.length == 1 ? (
                      <>
                        <div className="price-wrapper mt-4">
                          <div className="row mt-2 d-block">
                            <h6 className="BornValue">
                              {datas.AttributeName?.length > 0 ? (
                                <>
                                  {datas.AttributeName[0].Attribute_name
                                    ? datas.AttributeName[0].Attribute_name 
                                    : null}{" "}
                                  :<span> {Attributedata.AttributeName} </span>
                                </>
                              ) : null}
                            </h6>
                          </div>
                        </div>
                      </>
                    ) : null} */}

                    {datas.AttributeValue?.length == 1 ? (
                      <>
                        <div className="price-wrapper mt-4">
                          <div className="row mt-2">
                            <h6 className="BornValue p-0">
                              {datas.AttributeValue?.length > 0 ? (
                                <>
                                  {datas.AttributeValue[0].Attribute_name
                                    ? datas.AttributeValue[0].Attribute_name
                                    : null}
                                  :
                                  <span>
                                    {" "}
                                    {Test.testValue
                                      ? Test.testValue
                                      : Attributedata.AttributeType}{" "}
                                  </span>
                                </>
                              ) : null}
                            </h6>
                            <div className="BornValue_wrapper_mobile p-0">
                              {console.log(Attribute, "Attribute")}
                              {Attribute.length > 0 ? (
                                <>
                                  {Attribute.Attributeitem?.length > 0 ||
                                  Attribute[AttributeValue].Attributeitem ==
                                    undefined ? (
                                    <>{null}</>
                                  ) : (
                                    <>
                                      {Attribute.map((curr) => {
                                        return (
                                          <>
                                            {curr.Attributeitem?.map(
                                              (currEle, index) => {
                                                return (
                                                  <>
                                                    {currEle.image ? (
                                                      <>
                                                        <span
                                                          className={
                                                            Test.testValue
                                                              ? Test.testValue?.trim() ===
                                                                currEle.AttributeValue?.trim()
                                                                ? "pureborn-cir-img actived mx-1"
                                                                : "pureborn-cir-img mx-1"
                                                              : Attributeid ==
                                                                currEle.Attributeid
                                                              ? "pureborn-cir-img actived mx-1 "
                                                              :Number(currEle.current_stock)==0&&Number(currEle.PreOrderQuantity)==0? "pureborn-cir-img mx-1 opacity-50":"pureborn-cir-img mx-1"
                                                          }
                                                          onClick={() =>
                                                            getAttributeProduct(
                                                              currEle.Attributeid,
                                                              currEle.AttributeValue
                                                            )
                                                          }
                                                        >
                                                          <span class="tooltiptext">
                                                            {
                                                              currEle.AttributeValue
                                                            }
                                                          </span>
                                                          <img
                                                            src={`${Attribute_Image}/${currEle.image}`}
                                                            className="img-fluid"
                                                          />
                                                        </span>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <span
                                                          className={
                                                            Test.testValue
                                                              ? Test.testValue?.trim() ===
                                                                currEle.AttributeValue?.trim()
                                                                ? "pureborn-cir actived mx-1"
                                                                : "pureborn-cir mx-1"
                                                              : Attributeid ==
                                                                currEle.Attributeid
                                                              ? "pureborn-cir actived mx-1"
                                                              :Number(currEle.current_stock)==0&&Number(currEle.PreOrderQuantity)==0?  "pureborn-cir mx-1 opacity-50": "pureborn-cir mx-1"
                                                          }
                                                          onClick={() =>
                                                            getAttributeProduct(
                                                              currEle.Attributeid,
                                                              currEle.AttributeValue
                                                            )
                                                          }
                                                        >
                                                          {
                                                            currEle.AttributeValue
                                                          }
                                                        </span>
                                                      </>
                                                    )}
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        );
                                      })}
                                    </>
                                  )}
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {/* single attribute end*/}

                    {/* two attributes */}

                    {datas.AttributeValue?.length > 1 ? (
                      <>
                        <div className="price-wrapper mt-4">
                          <div className="row mt-2 ">
                            <h6 className="BornValue p-0">
                              {datas.AttributeValue?.length > 0 ? (
                                <>
                                  {datas.AttributeValue[0].Attribute_name
                                    ? datas.AttributeValue[0].Attribute_name
                                    : null}{" "}
                                  :
                                  <span>
                                    {" "}
                                    {Test.testId
                                      ? Test.testId
                                      : Attributedata.AttributeName}
                                  </span>
                                </>
                              ) : null}
                            </h6>
                            <div className="BornValue_wrapper_mobile p-0">
                              {Attribute?.map((currEle, index) => {
                                console.log(currEle, "currElessssss");
                                return (
                                  <>
                                    {/* 
                                        <div className="col-md-3"> */}
                                    {currEle.img ? (
                                      <>
                                        <span
                                          className={
                                            Test.testId
                                              ? Test.testId?.trim() ===
                                                currEle.AttributeType?.trim()
                                                ? "pureborn-cir-img actived mx-1"
                                                : "pureborn-cir-img mx-1"
                                              : AttributeValue == index
                                              ? "pureborn-cir-img actived mx-1 "
                                              : "pureborn-cir-img mx-1"
                                          }
                                          onClick={() =>
                                            handleAttributeName(
                                              currEle.AttributeType,
                                              index
                                            )
                                          }
                                        >
                                          <span class="tooltiptext">
                                            {currEle.AttributeType}
                                          </span>

                                          <img
                                            src={`${Attribute_Image}/${currEle.img}`}
                                            className="img-fluid"
                                          />
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span
                                          className={
                                            Test.testId
                                              ? Test.testId?.trim() ===
                                                currEle.AttributeType?.trim()
                                                ? "pureborn-cir actived mx-1"
                                                : "pureborn-cir mx-1"
                                              : AttributeValue == index
                                              ? "pureborn-cir actived mx-1"
                                              : "pureborn-cir mx-1"
                                          }
                                          onClick={() =>
                                            handleAttributeName(
                                              currEle.AttributeType,
                                              index
                                            )
                                          }
                                        >
                                          {currEle.AttributeType}
                                        </span>
                                      </>
                                    )}

                                    {/* </div> */}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {datas.AttributeValue?.length > 1 ? (
                      <>
                        <div className="price-wrapper mt-4">
                          <div className="row mt-2">
                            <h6 className="BornValue p-0">
                              {datas.AttributeValue?.length > 0 ? (
                                <>
                                  {datas.AttributeValue[1].Attribute_name
                                    ? datas.AttributeValue[1].Attribute_name
                                    : null}{" "}
                                  :
                                  <span>
                                    {" "}
                                    {Test.testId
                                      ? Test.testValue
                                      : Attributedata.AttributeType}{" "}
                                  </span>
                                </>
                              ) : null}
                            </h6>
                            <div className="BornValue_wrapper_mobile p-0">
                              {Attribute.length > 0 ? (
                                <>
                                  {Attribute[AttributeValue].Attributeitem
                                    ?.length == 0 ||
                                  Attribute[AttributeValue].Attributeitem ==
                                    undefined ? (
                                    <>{null}</>
                                  ) : (
                                    <>
                                      {Attribute[
                                        AttributeValue
                                      ].Attributeitem?.map((currEle, index) => {
                                        {console.log(currEle,"currElecurrElecurrElecurrEle")}
                                        return (
                                          <>
                                            {/* <div className="col-md-3"> */}
                                            {currEle.image ? (
                                              <>
                                                <span
                                                  className={
                                                    Test.testValue
                                                      ? Test.testValue?.trim() ===
                                                        currEle.AttributeValue?.trim()
                                                        ? "pureborn-cir-img actived mx-1"
                                                        : "pureborn-cir-img mx-1"
                                                      : Attributeid ==
                                                        currEle.Attributeid
                                                      ? "pureborn-cir-img actived mx-1 "
                                                      :Number(currEle.current_stock)==0&&Number(currEle.PreOrderQuantity)==0?  "pureborn-cir-img mx-1 opacity-50":"pureborn-cir-img mx-1"
                                                  }
                                                  onClick={() =>
                                                    getAttributeProduct(
                                                      currEle.Attributeid,
                                                      currEle.AttributeValue
                                                    )
                                                  }
                                                >
                                                  <span class="tooltiptext opacity-100">
                                                    {currEle.AttributeValue}
                                                  </span>
                                                  <img
                                                    src={`${Attribute_Image}/${currEle.image}`}
                                                    className={Number(currEle.current_stock)==0&&Number(currEle.PreOrderQuantity)==0?"img-fluid opacity-50": "img-fluid"}
                                                  />
                                                </span>
                                              </>
                                            ) : (
                                              <>
                                                <span
                                                  className={
                                                    Test.testValue
                                                      ? Test.testValue?.trim() ===
                                                        currEle.AttributeValue?.trim()
                                                        ? "pureborn-cir actived mx-1"
                                                        : "pureborn-cir mx-1"
                                                      : Attributeid ==
                                                        currEle.Attributeid
                                                      ? "pureborn-cir actived mx-1"
                                                      :Number(currEle.current_stock)==0&&Number(currEle.PreOrderQuantity)==0? "pureborn-cir mx-1 opacity-50":"pureborn-cir mx-1"
                                                  }
                                                  onClick={() =>
                                                    getAttributeProduct(
                                                      currEle.Attributeid,
                                                      currEle.AttributeValue
                                                    )
                                                  }
                                                >
                                                  {currEle.AttributeValue}
                                                </span>
                                              </>
                                            )}
                                          </>
                                        );
                                      })}
                                    </>
                                  )}
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {/* end two attributes */}

                    {/* arribute 0  end*/}

                    {/* arribute 1 */}
                    {/* {
                      datas.AttributeValue?.length > 1 ?
                        <>
                          <div className="price-wrapper mt-2 ">
                            <div className="purebornvalue">
                              <h6 className="BornValue">
                                {datas.AttributeValue[1].Attribute_name} :<span> {AttributeValueTwo} </span>
                              </h6>
                              <div className="row">
                                <div className="">
                                  {
                                    datas.AttributeValue[1].Item.map((currEle) => {
                                      return (
                                        <>
                                          <span className={AttributeValueTwo == currEle.label ? "pureborn-cir actived mx-1" : "pureborn-cir mx-1"} onClick={() => setAttributeValueTwo(currEle.label)}>{currEle.label}</span>
                                        </>
                                      )
                                    })
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}



                        </> : null




                    } */}

                    {/* arribute 1  end*/}

                    {/* <div className="price-wrapper mt-3">
                  <div className="purebornvalue">
                    <h6 className="BornValue">
                    
                    </h6>
                    <div className="pureborn-mar">
                      <span className="pureborn-cir">{datas.SoldIndividual}</span>
                      <div class="tooltip">Instagram</div>
                    </div>
                  </div>
                  <div className="purebornvalue">
                    <h6 className="BornValue">PureBorn Prints</h6>
                    <div className="pureborn-mar">
                      <img
                        className="printImage"
                    
                      />
                    </div>
                  </div>
                </div> */}

                    <div className="cart-quantity">
                      {/* <div className="input-group-prepend">
                    <button
                      className="cart-minus minus-left"
                      type="button"
                      onClick={decNum}
                    >
                      <span>-</span>
                    </button>
                  </div>
                  <input type="text" class="form-control" value={num} />
                  <div className="input-group-prepend">
                    <button
                      className="cart-minus plus-left"
                      type="button"
                      onClick={incNum}
                    >
                      <span>+</span>
                    </button>
                  </div> */}
                      {/* {console.log(datas, "sasasasas")} */}
                      <div class="counter">
                        <input
                          class="counter__input"
                          type="text"
                          value={num}
                          name="counter"
                          size="5"
                          readonly="readonly"
                        />
                        <Link class="counter__increment" to="" onClick={incNum}>
                          +
                        </Link>
                        <Link class="counter__decrement" to="" onClick={decNum}>
                          -
                          {/* &ndash; */}
                        </Link>
                      </div>
                      {/* <button
                    add={add}
                    addCart={addCart}
                    select={select}
                    className="mx-3  prodouctDetails__button"
                  >
                 
                    Add to Cart
                  </button> */}
                      {/* <button className="btn btn-success" onClick={addtocartss}> Add to Cart</button> */}
                      {/* <button className="btn" onClick={addtocartss}
                    style={{
                      backgroundColor: "#fc8181",
                      borderRadius: "20px",
                      marginLeft: "10px"
                    }}> Add to Cart</button> */}
                      {notifyBtn ? (
                        <>
                          <button
                            onClick={handleShow}
                            className="notify-me-btn mx-3"
                          >
                            Notify me
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="mx-3  prodouctDetails__button"
                            onClick={addtocartValidation}
                          >
                            Add to Cart
                          </button>
                        </>
                      )}

                      {/* <button
                        className="prodouctDetails__button "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Notify Me
                      </button> */}
                    </div>
                    {showStock ? (
                      <p className="text-danger">{StockMsg}</p>
                    ) : null}

                    <p className="add_btn">{addCart} </p>
                  </div>
                </div>
                <div className="product-short-description">
                  <p class="DescPara">
                    <ul class="ProductDesc listpara mt-3 list-unstyled">
                      <li>{renderHTML(datas.ShortDescription)}</li>
                    </ul>
                  </p>
                </div>
                {brands ? (
                  <>
                    <p style={{ fontSize: 17, color: "#555555b5" }}>
                      View all products under:{" "}
                      <NavLink
                        to={`/brand/${brands.name}/${brands.id}`}
                        className="brand_name"
                      >
                        {brands.name}
                      </NavLink>
                    </p>
                  </>
                ) : null}

                {/* {brands.map((brand) => {
              console.log(brand, 'jafgbc')
              return (
                <img
                  className="printImage"
                  src={`brand.brand_logo`}
                />
                )
              })} */}
                {/* {console.log(brands,"brandssss")} */}
                {brands ? (
                  <>
                    <NavLink
                      to={`/brand/${brands.name}/${brands.id}`}
                      style={{ color: "#d26e4b" }}
                    >
                      {/* {brands.name} */}

                      <img
                        height="90px"
                        // style={{borderRadius:"50%"}}
                        width="90px"
                        src={`${API_Brand_Image}/${brands.brand_logo}`}
                        alt={`${brands.brand_logo}`}
                      />
                    </NavLink>
                  </>
                ) : null}
              </div>
            </div>

            <Modal
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={modalShow}
              className="pb-5"
            >
              <Modal.Header className="py-2" closeButton onHide={handleClose}>
                <h3 className="p-0"> Coming Soon!</h3>
              </Modal.Header>
              <Modal.Body className="py-1 mb-2">
                <h4>Notify me when this product is in stock:</h4>
                <form onSubmit={handleSubmit}>
                  <label for="email">
                    <strong>Email: </strong>{" "}
                  </label>

                  <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Please enter your email id"
                    className="notify-email"
                  />
                  {/* <br /> */}
                  <div className="pt-4 d-flex justify-content-center">
                    <button className="btn btn-dark notify-btn" type="submit">
                      SEND
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>

          <TabBarWithRender
            activeTab={changetab}
            handleActiveTab={handleActiveTab}
            tabs={[
              {
                title: "Description",
                render: () => (
                  <div className="mt-4">
                    {/* <p className="DescPara">
                  <img
                    className="DescImg"
                    src={`${API_Image}/${datas.ProductImage}`}
                  />
                </p> */}

                    <p className="DescPara">
                      {renderHTML(datas.FullDescription)}
                    </p>

                    <p className="mt-2 mb-2">
                      {renderHTML(datas.BottomContent)}
                    </p>

                    {/* <p className="DescPara">
                  <strong>
                    <em>Features:</em>
                  </strong>
                </p> */}
                    {/* <p className="DescPara">
                  <ul>
                    <li>
                      Made with soft materials on the inner and outer layer of
                      the nappy which feels smooth against baby’s delicate skin
                    </li>
                    <li>
                      They are hypoallergenic, made with organic bamboo. Each
                      nappy contains up to 43% organic bamboo pulp
                    </li>
                    <li>Free from heavy metals and allergens.</li>
                    <li>
                      The organic bamboo pulp absorption core of our nappies
                      offers maximum absorption to keep your baby’s bottom dry
                      enabling fewer nappy changes and more quality time
                      together.
                    </li>
                    <li>
                      Not a single tree is harmed while manufacturing our
                      nappies
                    </li>
                    <li>Dermatologically tested and approved</li>
                    <li>
                      Printed in trendy designs to make nappy change time fun.
                    </li>
                    <li>
                      The Bamboo pulp used in our nappies is sourced from
                      FSC(Forest Stewardship Council) certified, managed
                      forests.
                    </li>
                    <li>
                      Flexible and snug fitting, allowing free movement, maximum
                      comfortability and optimal performance.
                    </li>
                    <li>
                      PETA Vegan & Cruelty Free and V-Label certified. They are
                      free from any ingredient of animal origin. They are free
                      from being tested on animals.
                    </li>
                    <li>
                      Pure Born nappies maintain your child’s comfort during
                      fun-filled days and sleepy nights
                    </li>
                    <li>
                      The color changing Wetness indicator lines act as an
                      indicator for parents that a diaper needs changing.
                    </li>
                  </ul>
                </p> */}
                    {/* {datas.map((country) => {
                  console.log(country, 'country') */}
                    {/* return ( */}
                    {/* <h6 className="mt-5">
                  {datas.CountryofOrigin}
                </h6> */}

                    <p className="DescPara">
                      COUNTRY OF ORIGIN: &nbsp;
                      <strong>{datas.CountryofOrigin}</strong>
                    </p>
                    {/* ) */}
                    {/* })} */}
                    <hr className="mt-md-5 mt-sm-1" />
                  </div>
                ),
              },

              {
                title: "Reviews",
                render: () => (
                  <div>
                    <div className="row col-md-12 mt-4">
                      {/* <h3 class="review_title text-center">Reviews</h3> */}

                      <div className="col-md-7">
                        <h3 class="review_title">Reviews</h3>
                        {/* <div>There are no reviews yet.</div> */}
                        <div className={showData.length>0?"review_box overflow-auto":"review_box_height overflow-auto"}>
                          {
                           showData.length>0?
                           <>
                             <ol className="comments pl-0">
                            <li className="User_Review">
                              <div className="ReviewItem d-flex align-top">
                                <div className="UserAvatar">
                                  {/* <img
                                  className="AvatarBorder"
                                  src="https://secure.gravatar.com/avatar/627a0aa15af6724a9c791453be74dd37?s=60&d=mm&r=g"
                                /> */}
                                </div>

                                <div className="UserReview">
                                  
                                    <>
                                       {showData.map((data) => {
                                    let {
                                      comments,
                                      full_name,
                                      createDt,
                                      reviewrating,
                                      Status,
                                    } = data;

                                    return (
                                      <>
                                        <div>
                                          {Status === 1 ? (
                                            <div>
                                              {reviewrating < 2 &&
                                              reviewrating > 0 ? (
                                                <>
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              {reviewrating < 3 &&
                                              reviewrating > 1 ? (
                                                <>
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              {reviewrating < 4 &&
                                              reviewrating >= 3 ? (
                                                <>
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              {reviewrating < 5 &&
                                              reviewrating >= 4 ? (
                                                <>
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />

                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              {reviewrating >= 5 ? (
                                                <>
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />

                                                  <FaStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              {reviewrating == "NaN" ||
                                              reviewrating < 1 ? (
                                                <>
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                  <AiOutlineStar
                                                    style={{ color: "#ff6766" }}
                                                  />
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              {/* <span>
                                              {reviewrating}
                                              <FaStar
                                                style={{ color: "#ff6766" }}
                                                className="mb-1 mx-2"
                                              >
                                                {reviewrating}{" "}
                                              </FaStar>
                                              Star
                                            </span> */}
                                              <p className="UserName">
                                                <strong>{full_name}</strong>
                                                <span className="ReviewDash">
                                                  –
                                                </span>
                                                <span className="ReviewDate">
                                                  {/* {createDt.substring(0, 10)} */}

                                                  {new Date(
                                                    createDt
                                                  ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                      day: "numeric",
                                                      month: "short",
                                                      year: "numeric",
                                                    }
                                                  )}
                                                </span>
                                              </p>
                                              <div className="ReviewbyUser mb-3">
                                                <p>{comments}</p>
                                              </div>
                                            </div>
                                          ) : null}
                                        </div>
                                      </>
                                    );
                                  })}
                                    
                                   
                                    </>
                                  
                               
                                </div>
                              </div>
                            </li>

                            {/* <li className="User_Review">
                            <div className="ReviewItem d-flex align-top">
                              <div className="UserAvatar">
                                <img
                                  className="AvatarBorder"
                                  src="https://secure.gravatar.com/avatar/627a0aa15af6724a9c791453be74dd37?s=60&d=mm&r=g"
                                />
                              </div>
                              <div className="UserReview">
                                <div>
                                  {fullRatings ? (
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
                                  )}
                                </div>
                                <p className="UserName">
                                  <strong>fazlunnachi</strong>
                                  <span className="ReviewDash">–</span>
                                  <span className="ReviewDate">
                                    September 23, 2020
                                  </span>
                                </p>
                                <div className="ReviewbyUser mb-3">
                                  <p>
                                    It’s a best quality to use.wonderfull
                                    prints.The sheets are very soft enough and
                                    has smooth texture..Best for babies
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li> */}
                            {/* 
                          <li className="User_Review">
                            <div className="ReviewItem d-flex align-top">
                              <div className="UserAvatar">
                                <img
                                  className="AvatarBorder"
                                  src="https://secure.gravatar.com/avatar/627a0aa15af6724a9c791453be74dd37?s=60&d=mm&r=g"
                                />
                              </div>
                              <div className="UserReview">
                                <div>
                                  {fullRatings ? (
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
                                  )}
                                </div>
                                <p className="UserName">
                                  <strong>fazlunnachi</strong>
                                  <span className="ReviewDash">–</span>
                                  <span className="ReviewDate">
                                    September 23, 2020
                                  </span>
                                </p>
                                <div className="ReviewbyUser mb-3">
                                  <p>
                                    It’s a best quality to use.wonderfull
                                    prints.The sheets are very soft enough and
                                    has smooth texture..Best for babies
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li> */}

                            {/* <li className="User_Review">
                        <div className="ReviewItem d-flex align-top">
                          <div className="UserAvatar">
                            <img
                              className="AvatarBorder"
                              src="https://secure.gravatar.com/avatar/627a0aa15af6724a9c791453be74dd37?s=60&d=mm&r=g"
                            />
                          </div>
                          <div className="UserReview">
                            <div>
                              {fullRatings ? (
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
                              )}
                            </div>
                            <p className="UserName">
                              <strong>fazlunnachi</strong>
                              <span className="ReviewDash">–</span>
                              <span className="ReviewDate">
                                September 23, 2020
                              </span>
                            </p>
                            <div className="ReviewbyUser mb-3">
                              <p>
                                It’s a best quality to use.wonderfull prints.The
                                sheets are very soft enough and has smooth
                                texture..Best for babies
                              </p>
                            </div>
                          </div>
                        </div>
                      </li> */}

                            {/* <li className="User_Review">
                        <div className="ReviewItem d-flex align-top">
                          <div className="UserAvatar">
                            <img
                              className="AvatarBorder"
                              src="https://secure.gravatar.com/avatar/627a0aa15af6724a9c791453be74dd37?s=60&d=mm&r=g"
                            />
                          </div>
                          <div className="UserReview">
                            <div>
                              {fullRatings ? (
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
                              )}
                            </div>
                            <p className="UserName">
                              <strong>fazlunnachi</strong>
                              <span className="ReviewDash">–</span>
                              <span className="ReviewDate">
                                September 23, 2020
                              </span>
                            </p>
                            <div className="ReviewbyUser mb-3">
                              <p>
                                It’s a best quality to use.wonderfull prints.The
                                sheets are very soft enough and has smooth
                                texture..Best for babies
                              </p>
                            </div>
                          </div>
                        </div>
                      </li> */}
                          </ol>
                           
                           </>:<>
                           <div className="text-center pt-5">
<h6>No Review & Ratings</h6>

                           </div>
                           </> 
                          }
                        
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="review__star">
                          <h3 class="review_title">Ratings</h3>
                          <div style={styles.container}>
                            {/* <h2>Star Ratings</h2> */}

                            <div style={styles.stars}>
                              {stars.map((_, index) => {
                                return (
                                  <FaStar
                                    key={index}
                                    size={24}
                                    style={{
                                      marginRight: 10,
                                      cursor: "pointer",
                                    }}
                                    color={
                                      (hoverValue || currentValue) > index
                                        ? colors.orange
                                        : colors.grey
                                    }
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() =>
                                      handleMouseOver(index + 1)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          {/* <AiOutlineStar className="outline_rating" />
                          <AiOutlineStar className="outline_rating" />
                          <AiOutlineStar className="outline_rating" />
                          <AiOutlineStar className="outline_rating" />
                          <AiOutlineStar className="outline_rating" /> */}
                        </div>
                        <h6 className="mb-3  review_title ">Comments</h6>
                        {/* <div className="ReviewForm AddInfoTab">
                          <p class="CustomerReviewForm">
                            Write your comment..
                            Only logged in customers who have purchased this
                            product may leave a review.
                          </p>
                        </div> */}

                        <div className="gx-2">
                          <div>
                            <div className="form-control-wrap ">
                              <textarea  maxlength="150"
                                placeholder="Write your comment..."
                                className="form-control text__area overflow-hidden"
                                name="review"
                                value={review.comments}
                                onChange={(e) => setReview(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className="mt-2 prodouctDetails__button"
                          onClick={() => handleReviews(datas.Productlist_id)}
                          disabled={disabled}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                ),
              },
              {
                title: "Customer Q&A",
                render: () => (
                  <div>
                    <div className="row col-md-12 mt-4">
                      <div className="col-md-7">
                        <form role="search" style={{ width: "100%" }}>
                          <div class="input-group">
                            {/* <input
                              // type="search"
                              placeholder="Ask Your Question"
                              className="form-control text__areaQA"
                              name="questionAnswer"
                              value={questionAnswer.question}
                              onChange={(e) =>
                                setQuestionAnswer(e.target.value)
                              }
                            /> */}
                            <input
                              placeholder="Ask Your Question..."
                              className="form-control text__areaQA"
                              name="questionAnswer"
                              value={questionAnswer.question}
                              onChange={(e) =>
                                setQuestionAnswer(e.target.value)
                              }
                            />
                            <button
                              type="button"
                              className="SubmitButton"
                              // onClick={() =>
                              //   QuestionSubmit(datas.Productlist_id)
                              // }

                              onClick={() =>
                                QuestionSubmit(datas.Productlist_id)
                              }
                            >
                              <FaArrowRight size="20px" />
                            </button>
                          </div>
                        </form>
                        {/* new modal start below */}
                        <Modal
                          show={view}
                          // fullscreen={fullscreen}
                          onHide={() => setView(!view)}
                          centered
                        >
                          <Modal.Header
                            closeButton
                            style={{ borderBottom: "white" }}
                          ></Modal.Header>
                          <Modal.Body>
                            <TiTick className="tick__mark" />
                            <h3
                              style={{
                                textAlign: "center",
                                marginBottom: "20px",
                              }}
                            >
                              Question Sent Successfully
                            </h3>
                            <div
                              style={{
                                textAlign: "center",
                                marginBottom: "20px",
                              }}
                            >
                              Will notify you when someone answers your
                              question...
                            </div>
                          </Modal.Body>
                        </Modal>
                        {/* new modal end above */}
                        <h3 class="review_title mb-2 mt-3">
                          Questions and Answers
                        </h3>
                        <br />{" "}
                        <div className="review_box overflow-auto">
                          <div style={{ borderBottom: "1px dashed #80808091" }}>
                            <>
                              {viewAnswer.map((item) => {
                                return (
                                  <>
                                    {/* {console.log(item.answer, "itemitem")} */}
                                    {item.answer !== null ? (
                                      <>
                                        <h6 className="textAlign_QA">
                                          <strong>Q: {item.question}</strong>
                                        </h6>
                                        <p style={{ margin: "5px" }}>
                                          <strong>A:</strong> {item.answer}
                                        </p>
                                        <p
                                          className="mb-3"
                                          style={{ margin: "5px" }}
                                        >
                                          By{" "}
                                          <span style={{ color: "#fc8181" }}>
                                            {" "}
                                            BabyAmore{" "}
                                          </span>{" "}
                                          Customer on
                                          <span>
                                            {" "}
                                            {new Date(
                                              item.createDt.slice(0, 10)
                                            ).toLocaleDateString("en-US", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                            })}
                                          </span>
                                        </p>
                                      </>
                                    ) : null}
                                  </>
                                );
                              })}
                            </>
                          </div>
                        </div>
                        {/* <br />
                        <div style={{ borderBottom: "1px dashed #80808091" }}>
                          <h6>
                            <strong>
                              Q: Refund is still missing after 4 days of
                              cancellation, please help{" "}
                            </strong>
                          </h6>
                          <p>
                            <strong>A:</strong> Don't warry aa jaye ga
                          </p>
                          <p className="mb-3">
                            By{" "}
                            <span style={{ color: "#fc8181" }}>
                              {" "}
                              BabyAmore{" "}
                            </span>{" "}
                            Customer on 9 june, 2022
                          </p>
                        </div>
                        <br />
                        <div style={{ borderBottom: "1px dashed #80808091" }}>
                          <h6>
                            <strong>Q: i want cash on delivery</strong>
                          </h6>
                          <p>
                            <strong>A:</strong> yes I also
                          </p>
                          <p className="mb-3">
                            By{" "}
                            <span style={{ color: "#fc8181" }}>
                              {" "}
                              BabyAmore{" "}
                            </span>{" "}
                            Customer on 9 September, 2022
                          </p>
                        </div>
                        <br /> */}
                      </div>
                      <div className="col-md-5"></div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </>
      ) : (
        <Loading />
      )}

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </>
  );
};

export default ProductDetails;