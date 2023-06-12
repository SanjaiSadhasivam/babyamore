import React, { useState, useReducer, createContext, useEffect, useContext } from "react";
import Cart from "../components/cart/cart";
import { WhatsAppWidget } from "react-whatsapp-widget";
import { ReactComponent as CompanyIcon } from "../assets/images/logo/Baby-Logo.svg";
import "react-whatsapp-widget/dist/index.css";
import { Footer } from "./footer/footer";
import { NavBar } from "./header/navBar";
import reducer from "../components/Reducer/reducer";
import { IoLogoWhatsapp } from "react-icons/io";
import { API_URL, API_Product, API_CART, token, API_WISH } from "../config/config";
import axios from "axios";
import { useCookies } from "react-cookie";
import { classNames } from "classnames";
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const cartContext = createContext();

const getLocalCartData = () => {
  const localcartData = JSON.parse(localStorage.getItem("localcart"));
  // console.log(localcartData, "localcartData");
  if (
    localcartData === [] ||
    localcartData === null ||
    localcartData === undefined
  ) {
    return [];
  } else {
    return localcartData;
  }
};
const viewCart = () => {
  const viewCart = JSON.parse(localStorage.getItem("viewcart"));
  // console.log(localcartData, "localcartData");
  if (viewCart === [] || viewCart === null || viewCart === undefined) {
    return [];
  } else {
    return viewCart;
  }
};


const initialstate = {
  carts: getLocalCartData(),
  total_items: 0,
  total_amount: "",
  ProductQuantity: 0,
  total_qty: 0,
  view_cart: viewCart(),
  wishlist: [],
  cart: [],
  cart_id: [],
  pincodeitems: [],
  category:[],
  brands:[],
  sub_total: 0,
  toggles: false,
  pincodebtn: false,
  modalToggle:false,
  error:false,
  // pincode:getPincodes(),
};

const Layout = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const [totals, totalItems] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [productAttribute, setProduct] = useState([]);

  const addTocart = async (product, qtys, attributeid, AttributeProduct,variant_1,variant_2,variant_1_name,variant_2_name) => {
    console.log(product,"variant_1")
    let { AttributeValue } = product;
    let attproduct = AttributeProduct;
    let a = AttributeValue.length;

    dispatch({
      type: "ADD_TO_CART",
      payload: { product, qtys, a, attributeid, attproduct,variant_1,variant_2,variant_1_name,variant_2_name},
    });
  };

  const removeCart = (id) => {
    // console.log("removeitem", id)
    dispatch({
      type: "REMOVE_TO_CART",
      payload: id,
    });
  };

  const decreseQty = (qtyvalue) => {
    // console.log("hi payload", qtyvalue)
    dispatch({ type: "DECRESE_QTY", payload: qtyvalue });
  };
  const increseQty = (qtyvalue) => {
    // console.log("hi payload", qtyvalue)
    dispatch({ type: "INCRESE_QTY", payload: qtyvalue });
  };
  const GetCartdatas = async () => {
    const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
      headers: { Authorization: `Bearer ${token} ` },
    });
    if (Result) {
    
      let qtys = Result.data.list.length;
      // console.log("login click", qtys)
      dispatch({ type: "GET_CART_QTY", payload: qtys });
    }
    // totalItems(Result.data.list.length)
  };
  const GetCart = async () => {
    const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
      headers: { Authorization: `Bearer ${token} ` },
    });
    if (Result) {
      let cart = Result.data.list;
      let qtys = Result.data.list.length;
      let subtotal = cart.reduce((intial, curr) => {
        const { product_quantity, SalePrice } = curr;
        let initial = intial + Number(product_quantity) * Number(SalePrice);
        return initial;
      }, 0);
      // console.log("login click", qtys)
      dispatch({ type: "GET_CART", payload: { cart, subtotal, qtys } });
    }
    // totalItems(Result.data.list.length)
  };
  const GetWishlist = async () => {
    const Result = await axios.get(`${API_WISH}/${cookies.customer_id}`, {
      headers: { Authorization: `Bearer ${token} ` },
    });
    if (Result) {
      let data = Result.data.list;

      dispatch({ type: "GET_WISHLIST", payload: data });
    }
    // totalItems(Result.data.list.length)
  };
  const addWishlist = async (product_id, customer_id) => {
    var cartProducts = {
      // SalePrice: datas.SalePrice,
      userid: customer_id,
      CustomerName: cookies.fullName
        ? cookies.fullName === "undefined"
          ? cookies.email_address.slice(
            0,
            cookies.email_address.indexOf("@")
          )
          : cookies.fullName.substring(0, 18)
        : null,
      // Attributeid: datas.Attribute,
      Productid: product_id,
      ProductQuantity: 1,
      product_total: 0,
    };
    // setbtnName('VIew')

    const Result = await axios.post(`${API_WISH}`, cartProducts, configss);
    if (Result) {
      GetWishlist();
    }
    // totalItems(Result.data.list.length)
  };

  const getCartItemsLocal = () => {
    console.log("CART_TOTAL_PRICE");
    dispatch({ type: "CART_TOTAL_PRICE" });
  };
  const toggleShows = () => {

    dispatch({ type: "TOGGLE" });
  };
  const addcartId = (productid) => {

    dispatch({ type: "VIEW_CARTID", payload: productid });
  };
  const getPincode = async (pincode) => {

    if (pincode) {
      let result = await axios.get(`${API_URL}/admin/Billing/ShippingType/${pincode ? pincode : cookies.pincode}`);
      if (result.data.list.length > 0) {
        setCookie("pincode", pincode)
        let pinData = result.data.list;
        dispatch({ type: "PINCODE", payload: { pinData, pincode } });
      }
      else{
        dispatch({ type: "ERROR"});
      }
    }
    else {
      if (cookies.customer_id) {
        if (cookies.pincode) {
          let result = await axios.get(`${API_URL}/admin/Billing/ShippingType/${cookies.pincode}`);
          if (result.data.list.length > 0) {
            let pinData = result.data.list;
            let pincode = cookies.pincode;
            dispatch({ type: "PINCODE", payload: { pinData, pincode } });
          }
        }
        else {
          if (cookies.pincodeid) {
            let result = await axios.get(`${API_URL}/admin/Billing/ShippingType/${cookies.pincodeid}`);
            if (result.data.list.length > 0) {
              let pinData = result.data.list;
              let pincode = cookies.pincodeid;
              dispatch({ type: "USERPINCODE", payload: { pinData, pincode } });
            }
          }
        }

      }
      else {
        if (cookies.pincode) {
          let result = await axios.get(`${API_URL}/admin/Billing/ShippingType/${cookies.pincode}`);
          if (result.data.list.length > 0) {
            let pinData = result.data.list;
            let pincode = cookies.pincode;
            dispatch({ type: "PINCODE", payload: { pinData, pincode } });
          }
        }
      }
    }


  };



  const getCategory = (data)=>{
  
    dispatch({type:"SET_CATEGORY",payload:data})
  }
  const getbrands = (data)=>{
  
    dispatch({type:"SET_BRAND",payload:data})
  }

  const turnoff = () => {
    removeCookie("pincode");
    dispatch({ type: "OFF" });

  }
  const toggleOn = () => {
   
    dispatch({ type: "TOOGLEON" });

  }
  const toggleOff= () => {
   
    dispatch({ type: "TOOGLEOFF" });

  }


  useEffect(() => {
    if (cookies.customer_id) {
      GetCartdatas();
      GetWishlist();
      GetCart();

    }
    getPincode();
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem("localcart", JSON.stringify(state.carts));
    localStorage.setItem("viewcart", JSON.stringify(state.view_cart));

  }, [state.carts, state.view_cart]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // const addToCart = (data) => {
  //   setCart([...cart, { ...data, quantity: 1 }])
  // }

  return (
    <div>
      <cartContext.Provider
        value={{
          ...state,
          addTocart,
          removeCart,
          addcartId,
          decreseQty,
          increseQty,
          GetCartdatas,
          GetCart,
          getbrands,
          addWishlist,
          getCartItemsLocal,
          GetWishlist,
          toggleShows,
          getPincode,
          toggleOff,
          turnoff,
          toggleOn,
          getCategory,
        }}
      >
        <NavBar totals={totals} cart={cart} />

        {children}
        <WhatsAppWidget
          className={"whatsapp-button position-relative"}
          CompanyIcon={CompanyIcon}
          companyName={"Baby Amore"}
          phoneNumber="916381386320"
        />
        {/* <a href="#top">&uarr; Back to top &uarr;</a> */}
        {/* <a target="_blank" href="https://api.whatsapp.com/send?phone=&text=" class="whatsapp-button"><IoLogoWhatsapp /></a> */}
        <Footer />
      </cartContext.Provider>
    </div>
  );
};

export default Layout;
