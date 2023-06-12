import React, { useState, useContext, useEffect } from "react";
import "./Quickmodal.css";
import { Modal } from "react-bootstrap";
import { API_URL, API_CART, API_Product, token } from "../../config/config";
import { useCookies } from "react-cookie";
import axios from "axios";
import { cartContext } from "../../layout/layout";
import { useParams } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import ProductDetailsSlider from "../ProductDetailsSlider/ProductDetailsSlider";
import Loading from "../LazyLoading/Loading";
import { toast, ToastContainer } from "react-toastify";
const API_Image = `${API_URL}/Product_image`;
const Attribute_Image = `${API_URL}/Attributes_image`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const Add_Subscription = `${API_URL}/admin/productlist/addSubscription`;
const API_Attribute_Data = `${API_URL}/admin/productlist/getAttributevarityData`;
const getCart = () => {
  const products = localStorage.getItem("cartproduct");
  if (products) {
    return JSON.parse(localStorage.getItem("cartproduct"));
  } else {
    return [];
  }
};
const Quickmodel = ({ ...props }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [addtocarts, setAddtocart] = useState(getCart);
  const [Attribute, setAttribute] = useState([]);
  const [ShowMsg, setShowMsg] = useState(false);
  const [Email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [notifyBtn, setnotifyBtn] = useState(false);
  const [Attributedata, setAttributeData] = useState({
    AttributeName: "",
    AttributeType: "",
  });
  const [AttributeValue, setAttributeValue] = useState(0);
  const [Attributeid, setAttributeid] = useState(null);
  const [AttributeProduct, setAttributeProduct] = useState(null);
  const API_Attribute_Product = `${API_URL}/admin/productlist`;
  const [AttributeValueTwo, setAttributeValueTwo] = useState(null);
  const [modalShows, setModalShows] = useState(false);
  const [notify, setnotify] = useState(false);
  const AttributeValueData = (index) => {
    setAttributeValue(index);
    setAttributeid(null);
    // setShow(true)
    // else{
    //   setShow(false)
    // }
  };
  const [showDisableBtn, setDisableBtn] = useState(true);
  const show = props.show ? props.show : false;
  const [data, setData] = useState(props.datas[0]);
  const [showStock, setShowStock] = useState(false);
  const [StockMsg, setShowStockMsg] = useState(null);
  // const [datas, setData] = useState();

  const values = data.Productlist_id;
  const { addTocart } = useContext(cartContext);

  // const [showModal, setShowModal] = useState(show)
  const [getUsercart, setUsercart] = useState([]);
  // const [datas, setDatsa] = useState();

  const { GetCartdatas, toggleShows, GetCart, cart } = useContext(cartContext);

  const getAttributeData = async () => {
    const configss = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let Result = await axios.get(`${API_Attribute_Data}/${values}`, configss);
    if (Result) {
      setAttribute(Result.data.list);
      setAttributeData({
        ...Attributedata,
        AttributeName:
          Result.data.list?.length > 0
            ? Result.data.list[0].AttributeType
            : null,
      });
    }
  };

  const getUserCart = async () => {
    try {
      const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      setUsercart(Result.data.list);
    } catch (error) {}
  };
  const handleClose = () => {
    props.close(false);
  };
  const [num, setNum] = useState(1);
  const incNum = () => {
    try {
      if (data.AttributeValue?.length == 0) {
        if (data?.current_stock == 0) {
          if (data?.PreOrder == "Enable" && data?.PreOrderQuantity > 0) {
            if (data?.SoldIndividual > 0 && data?.PreOrderQuantity > 0) {
              num < data?.SoldIndividual &&
              num < 10 &&
              num < data?.PreOrderQuantity
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(
                    data?.PreOrderQuantity,
                    data?.SoldIndividual
                  );
            } else if (
              data?.SoldIndividual == 0 &&
              data?.PreOrderQuantity > 0
            ) {
              num < data?.PreOrderQuantity && num < 10
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(data?.PreOrderQuantity);
            }
          }
          // else if (data?.SoldIndividual > 0) {
          //   num < data?.SoldIndividual ? setNum(Number(num) + 1) : handleShowStcokmsg(data?.SoldIndividual, data?.SoldIndividual);
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
          if (data?.current_stock > 0 && data?.SoldIndividual > 0) {
            num < data?.SoldIndividual && num < 10 && num < data?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(data?.current_stock, data?.SoldIndividual);
          } else if (data?.current_stock > 0 && data?.SoldIndividual == 0) {
            num < 10 && num < data?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(data?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      } else if (data.AttributeValue?.length > 0) {
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
              num < Number(AttributeProduct[0]?.SoldIndividual) &&
              num < 10 &&
              num < AttributeProduct[0]?.current_stock
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
  };
  const decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    } else {
      setNum(1);
    }
  };

  const addtocartss = async () => {
    if (cookies.customer_id) {
      if (data.AttributeValue?.length > 0) {
        if (Attributeid) {
          let existprodct = cart.find(
            (curr) => curr.product_attributeid == Attributeid
          );
          if (existprodct) {
            try {
              setShowMsg(true);
              setCount(num);
              // console.log("existprodct3", existprodct.id)
              const updateCartProducts = {
                // SalePrice: data.SalePrice,
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
                  data.AttributeValue?.length > 1
                    ? `${Attributedata.AttributeName}`
                    : null,
                variant_2:
                  data.AttributeValue?.length > 1
                    ? `${Attributedata.AttributeType}`
                    : data.AttributeValue?.length == 1
                    ? `${Attributedata.AttributeType}`
                    : null,
                variant_1_name:
                  data.AttributeValue?.length > 1
                    ? `${data.AttributeValue[0].Attribute_name}`
                    : null,
                variant_2_name:
                  data.AttributeValue?.length > 1
                    ? `${data.AttributeValue[1].Attribute_name}`
                    : data.AttributeValue?.length == 1
                    ? `${data.AttributeValue[0].Attribute_name}`
                    : null,

                product_total: 0,
              };
              let Result = await axios.put(
                `${API_CART}/${existprodct.id}`,
                updateCartProducts,
                configss
              );
              if (Result) {
                handleClose();
                toggleShows();
                GetCart();
                setAttributeid(null);
                // window.location.reload(false)
              }
            } catch (error) {}
          } else {
            try {
              setShowMsg(true);
              setCount(num);
              var cartProducts = {
                // SalePrice: data.SalePrice,
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
                variant_1:
                  data.AttributeValue?.length > 1
                    ? `${Attributedata.AttributeName}`
                    : null,
                variant_2:
                  data.AttributeValue?.length > 1
                    ? `${Attributedata.AttributeType}`
                    : data.AttributeValue?.length == 1
                    ? `${Attributedata.AttributeType}`
                    : null,
                variant_1_name:
                  data.AttributeValue?.length > 1
                    ? `${data.AttributeValue[0].Attribute_name}`
                    : null,
                variant_2_name:
                  data.AttributeValue?.length > 1
                    ? `${data.AttributeValue[1].Attribute_name}`
                    : data.AttributeValue?.length == 1
                    ? `${data.AttributeValue[0].Attribute_name}`
                    : null,
                ProductQuantity: num,
                product_total: 0,
              };
              let Result = await axios.post(
                `${API_CART}`,
                cartProducts,
                configss
              );
              if (Result) {
                handleClose();
                toggleShows();
                GetCart();
                setAttributeid(null);
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
          (curr) => curr.product_id == data.Productlist_id
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
              Productid: data.Productlist_id,
              ProductQuantity: num,
              product_total: 0,
            };
            let Result = await axios.put(
              `${API_CART}/${existprodct.id}`,
              updateCartProducts,
              configss
            );
            if (Result) {
              handleClose();
              toggleShows();
              GetCart();
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
              Productid: data.Productlist_id,
              ProductQuantity: num,
              product_total: 0,
            };
            let Result = await axios.post(
              `${API_CART}`,
              cartProducts,
              configss
            );
            if (Result) {
              handleClose();
              toggleShows();
              GetCart();
            }
          } catch (error) {
            // console.log(error)
          }
        }
      }
    } else {
      handleClose();
      toggleShows();
      setShowMsg(true);
      setCount(num);
      let variant_1 =
        data.AttributeValue?.length > 1
          ? `${Attributedata.AttributeName}`
          : null;
      let variant_2 =
        data.AttributeValue?.length > 1
          ? `${Attributedata.AttributeType}`
          : data.AttributeValue?.length == 1
          ? `${Attributedata.AttributeType}`
          : null;
      let variant_1_name =
        data.AttributeValue?.length > 1
          ? `${data.AttributeValue[0].Attribute_name}`
          : null;
      let variant_2_name =
        data.AttributeValue?.length > 1
          ? `${data.AttributeValue[1].Attribute_name}`
          : data.AttributeValue?.length == 1
          ? `${data.AttributeValue[0].Attribute_name}`
          : null;
      let att = AttributeProduct?.length > 0 ? AttributeProduct[0] : null;
      addTocart(
        data,
        num,
        Attributeid,
        att,
        variant_1,
        variant_2,
        variant_1_name,
        variant_2_name
      );
      // setAttributeid(null);
    }
  };

  useEffect(() => {
    getAttributeData();
  }, []);

  const handleCloses = () => setModalShows(false);
  const handleShow = () => {
    setnotify(true);
    setModalShows(true);
  };
  const getAttributeProduct = async (id, property) => {
    setNum(1);
    setAttributeid(id);
    setAttributeData({
      ...Attributedata,
      AttributeType: property,
    });
    setDisableBtn(false);
    setnotifyBtn(false);
    const result = await axios.get(`${API_Attribute_Product}/${id}`);
    if (result) {
      // console.log(result.data.list, "111111112222");
      let value = result.data.list[0];
      setAttributeProduct(result.data.list);
      // setData(result.data.list)
      if (data.AttributeValue?.length == 0) {
        if (data?.current_stock == 0) {
          if (data?.PreOrder == "Enable" && data?.PreOrderQuantity > 0) {
            if (data?.SoldIndividual > 0 && data?.PreOrderQuantity > 0) {
              num < data?.SoldIndividual &&
              num < 10 &&
              num < data?.PreOrderQuantity
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(
                    data?.PreOrderQuantity,
                    data?.SoldIndividual
                  );
            } else if (
              data?.SoldIndividual == 0 &&
              data?.PreOrderQuantity > 0
            ) {
              num < data?.PreOrderQuantity && num < 10
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(data?.PreOrderQuantity);
            }
          }
          // else if (data?.SoldIndividual > 0) {
          //   num < data?.SoldIndividual ? setNum(Number(num) + 1) : handleShowStcokmsg(data?.SoldIndividual, data?.SoldIndividual);
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
          if (data?.current_stock > 0 && data?.SoldIndividual > 0) {
            num < data?.SoldIndividual && num < 10 && num < data?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(data?.current_stock, data?.SoldIndividual);
          } else if (data?.current_stock > 0 && data?.SoldIndividual == 0) {
            num < 10 && num < data?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(data?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      } else if (data.AttributeValue?.length > 0) {
        if (value?.current_stock == 0) {
          if (
            value?.PreOrder == "Enable" &&
            value?.PreOrderQuantity > 0
          ) {
            if (
              value?.SoldIndividual > 0 &&
              value?.PreOrderQuantity > 0
            ) {
              num < value?.SoldIndividual &&
              num < 10 &&
              num < value?.PreOrderQuantity
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(
                    value?.PreOrderQuantity,
                    value?.SoldIndividual
                  );
            } else if (
              value?.SoldIndividual == 0 &&
              value?.PreOrderQuantity > 0
            ) {
              num < value?.PreOrderQuantity && num < 10
                ? setNum(Number(num) + 1)
                : handleShowStcokmsg(value?.PreOrderQuantity);
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
            value?.current_stock > 0 &&
            Number(value?.SoldIndividual) > 0
          ) {
            num < Number(value?.SoldIndividual) &&
            num < 10 &&
            num < value?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(
                  value?.current_stock,
                  value?.SoldIndividual
                );
          } else if (
            value?.current_stock > 0 &&
            value?.SoldIndividual == 0
          ) {
            num < 10 && num < value?.current_stock
              ? setNum(Number(num) + 1)
              : handleShowStcokmsg(value?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      }
    }
  };
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const handleAttributeName = (property, index) => {
    AttributeValueData(index);
    setAttributeData({
      AttributeName: property,
    });
  };

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
        ? `Instock only ${qty} left but you can buy only ${qtys} qtys - order soon `
        : `Instock only ${qty} left - order soon`
    );
  };

  const addtocartValidation = () => {
    try {
      if (data.AttributeValue?.length == 0) {
        if (data?.current_stock == 0) {
          if (data?.PreOrder == "Enable" && data?.PreOrderQuantity > 0) {
            if (data?.SoldIndividual > 0 && data?.PreOrderQuantity > 0) {
              num <= data?.SoldIndividual &&
              num < 10 &&
              num <= data?.PreOrderQuantity
                ? addtocartss()
                : handleShowStcokmsg(
                    data?.PreOrderQuantity,
                    data?.SoldIndividual
                  );
            } else if (
              data?.SoldIndividual == 0 &&
              data?.PreOrderQuantity > 0
            ) {
              num <= data?.PreOrderQuantity && num < 10
                ? addtocartss()
                : handleShowStcokmsg(data?.PreOrderQuantity);
            }
          }
          // else if (data?.SoldIndividual > 0) {
          //   num <= data?.SoldIndividual ?  addtocartss() : handleShowStcokmsg(data?.SoldIndividual, data?.SoldIndividual);
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
          if (data?.current_stock > 0 && data?.SoldIndividual > 0) {
            num <= data?.SoldIndividual &&
            num <= 10 &&
            num <= data?.current_stock
              ? addtocartss()
              : handleShowStcokmsg(data?.current_stock, data?.SoldIndividual);
          } else if (data?.current_stock > 0 && data?.SoldIndividual == 0) {
            num <= 10 && num <= data?.current_stock
              ? addtocartss()
              : handleShowStcokmsg(data?.current_stock);
          } else {
            setShowStock(true);
            setShowStockMsg("Out of Stock");
            setnotifyBtn(true);
            setNum(0);
          }
        }
      } else if (data.AttributeValue?.length > 0) {
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
      <Modal
        className="quick-modal-backdrop"
        show={show}
        size={notify ? "md" : "lg"}
        onHide={() => handleClose()}
        // style={{ marginTop: "40px" }}
      >
        <Modal.Body className="p-md-4">
          {data ? (
            <>
              {notify ? (
                <>
                  <h6>Notify me when this product is in stock:</h6>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <label for="email">
                        <strong>Email: </strong>{" "}
                      </label>
                      <br />
                      <input
                        type="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Please enter your email id"
                        className="form-control"
                      />
                      <div className="text-center mt-3">
                        <button className="btn btn-dark notify-btn">
                          SEND
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between"></div>

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{ float: "right" }}
                    onClick={() => handleClose()}
                  ></button>

                  <div class="">
                    {ShowMsg ? (
                      <>
                        <div className="woocommerce-message message-wrapper my-2">
                          <div className="message-container container success-color medium-text-center">
                            <p
                              className="button wc-forward wp-element-button d-flex align-items-center "
                              style={{ fontSize: "17px!important" }}
                            >
                              <span>
                                <ImCheckmark className="mx-2" />
                              </span>
                              <span>{count}</span> × “
                              {data.ProductName
                                ? data.ProductName.substring(0, 15)
                                : null}
                              ...” have been added to your cart.
                            </p>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="row p-md-4">
                      <div className="col-md-6 col-12 p-sm-0">
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
                              image={data.productgalleryimages}
                              video={data.YoutubeLink}
                            />
                          </>
                        )}
                      </div>
                      <div className="col-md-6 col-12 p-sm-0">
                        <div className="">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                            style={{ paddingLeft: "1rem" }}
                          >
                            {data.ProductName}
                          </h1>
                        </div>
                        <div class="">
                          <div className="price-wrapper mt-3">
                            <p className="price product-page-price price-on-sale">
                              <del>
                                <span className="amount">
                                  <span className="currencySymbol">₹</span>
                                  {AttributeProduct?.length > 0
                                    ? AttributeProduct[0].RegularPrice
                                    : data.RegularPrice}
                                  .00
                                </span>
                              </del>
                              <ins>
                                <span className="amount">
                                  <span className="currencySymbol">₹</span>
                                  {AttributeProduct?.length > 0
                                    ? AttributeProduct[0].SalePrice
                                    : data.SalePrice}
                                  .00
                                </span>
                              </ins>
                            </p>
                          </div>
                          <div className="product-short-description">
                            <p class="DescPara">
                              <ul class="ProductDesc listpara mb-1">
                                <li>
                                  {renderHTML(
                                    data.ShortDescription
                                      ? data.ShortDescription.substring(0, 320)
                                      : null
                                  )}
                                </li>
                              </ul>
                            </p>
                          </div>
                          {/* ATTRIBUTES */}

                          {Attribute.length > 0 ? (
                            <>
                              {data.AttributeValue?.length == 1 ? (
                                <>
                                  <div className="price-wrapper mt-4">
                                    <div className="row mt-2">
                                      <h6 className="BornValue">
                                        {data.AttributeValue?.length > 0 ? (
                                          <>
                                            {data.AttributeValue[0]
                                              .Attribute_name
                                              ? data.AttributeValue[0]
                                                  .Attribute_name
                                              : null}{" "}
                                            :
                                            <span>
                                              {" "}
                                              {Attributedata.AttributeType}{" "}
                                            </span>
                                          </>
                                        ) : null}
                                      </h6>
                                      <div className="BornValue-wrapper">
                                        {Attribute.length > 0 ? (
                                          <>
                                            {Attribute.Attributeitem?.length >
                                              0 ||
                                            Attribute[AttributeValue]
                                              .Attributeitem == undefined ? (
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
                                                                      Attributeid ==
                                                                      currEle.Attributeid
                                                                        ? "pureborn-cir-img actived mx-1"
                                                                        : Number(
                                                                          currEle.current_stock
                                                                        ) == 0 &&
                                                                        Number(
                                                                          currEle.PreOrderQuantity
                                                                        ) == 0? "pureborn-cir-img mx-1 opacity-50":"pureborn-cir-img mx-1"
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
                                                                      Attributeid ==
                                                                      currEle.Attributeid
                                                                        ? "pureborn-cir actived mx-1"
                                                                        :Number(
                                                                          currEle.current_stock
                                                                        ) == 0 &&
                                                                        Number(
                                                                          currEle.PreOrderQuantity
                                                                        ) == 0?"pureborn-cir mx-1 opacity-50": "pureborn-cir mx-1"
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

                              {data.AttributeValue?.length > 1 ? (
                                <>
                                  <div className="price-wrapper mt-4">
                                    <div className="row mt-2 ">
                                      <h6 className="BornValue">
                                        {data.AttributeValue?.length > 0 ? (
                                          <>
                                            {data.AttributeValue[0]
                                              .Attribute_name
                                              ? data.AttributeValue[0]
                                                  .Attribute_name
                                              : null}{" "}
                                            :
                                            <span>
                                              {" "}
                                              {Attributedata.AttributeName}{" "}
                                            </span>
                                          </>
                                        ) : null}
                                      </h6>
                                      <div className="BornValue-wrapper">
                                        {Attribute?.map((currEle, index) => {
                                          return (
                                            <>
                                              {/* 
                                        <div className="col-md-3"> */}
                                              {currEle.img ? (
                                                <>
                                                  <span
                                                    className={
                                                      AttributeValue == index
                                                        ? "pureborn-cir-img actived mx-1"
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
                                                      AttributeValue == index
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

                              {data.AttributeValue?.length > 1 ? (
                                <>
                                  <div className="price-wrapper mt-4">
                                    <div className="row mt-2">
                                      <h6 className="BornValue">
                                        {data.AttributeValue?.length > 0 ? (
                                          <>
                                            {data.AttributeValue[1]
                                              .Attribute_name
                                              ? data.AttributeValue[1]
                                                  .Attribute_name
                                              : null}{" "}
                                            :
                                            <span>
                                              {" "}
                                              {Attributedata.AttributeType}{" "}
                                            </span>
                                          </>
                                        ) : null}
                                      </h6>
                                      <div className="BornValue-wrapper">
                                        {Attribute.length > 0 ? (
                                          <>
                                            {Attribute[AttributeValue]
                                              .Attributeitem?.length == 0 ||
                                            Attribute[AttributeValue]
                                              .Attributeitem == undefined ? (
                                              <>{null}</>
                                            ) : (
                                              <>
                                                {Attribute[
                                                  AttributeValue
                                                ].Attributeitem?.map(
                                                  (currEle, index) => {
                                                    return (
                                                      <>
                                                        {/* <div className="col-md-3"> */}
                                                        {currEle.image ? (
                                                          <>
                                                            <span
                                                              className={
                                                                Attributeid ==
                                                                currEle.Attributeid
                                                                  ? "pureborn-cir-img actived mx-1 "
                                                                  : Number(
                                                                      currEle.current_stock
                                                                    ) == 0 &&
                                                                    Number(
                                                                      currEle.PreOrderQuantity
                                                                    ) == 0
                                                                  ? "pureborn-cir-img mx-1 opacity-50"
                                                                  : "pureborn-cir-img mx-1"
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
                                                                Attributeid ==
                                                                currEle.Attributeid
                                                                  ? "pureborn-cir actived mx-1"
                                                                  :Number(currEle.current_stock)==0&&Number(currEle.PreOrderQuantity)==0?  "pureborn-cir mx-1 opacity-50":"pureborn-cir mx-1"
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

                                                        {/* </div> */}
                                                      </>
                                                    );
                                                  }
                                                )}
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
                            </>
                          ) : null}
                        </div>
                        <td>
                          <div class="cart-quantity cart__quantity">
                            <div class="counter">
                              <input
                                class="counter__input"
                                type="text"
                                value={num}
                                name="counter"
                                size="5"
                                readonly="readonly"
                              />
                              <a
                                class="counter__increment"
                                for={num}
                                onClick={incNum}
                                style={{ cursor: "pointer" }}
                              >
                                +
                              </a>
                              <a
                                class="counter__decrement"
                                for={num}
                                onClick={decNum}
                                style={{ cursor: "pointer" }}
                              >
                                &ndash;
                              </a>
                            </div>
                            {notifyBtn ? (
                              <>
                                <button
                                  onClick={handleShow}
                                  className="notify-me-btn mx-md-3 mx-2"
                                >
                                  Notify me
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="mx-md-3 mx-2  prodouctDetails__button"
                                  onClick={addtocartValidation}
                                >
                                  Add to Cart
                                </button>
                              </>
                            )}
                          </div>
                        </td>

                        {showStock ? (
                          <p className="text-danger">{StockMsg}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Quickmodel;
