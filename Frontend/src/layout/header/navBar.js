import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "../layout";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
/**---------------------------------Assets------------------------------------------- */
import "./navBar.css";
import logo from "../../assets/images/logo/Baby-Logo.svg";
import axios from "axios";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
/**---------------------------------Packages------------------------------------------- */
import { Link, useNavigate, NavLink } from "react-router-dom";

/**---------------------------------Components------------------------------------------ */
import SearchInput from "../../components/Search/search";

/**---------------------------------Pages------------------------------------------ */
import { TopNav } from "./topNav";

/**---------------------------------Icons----------------------------------------------- */
import { VscSearch } from "react-icons/vsc";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoCloseCircleOutline, IoReorderThreeOutline } from "react-icons/io5";
import primaryMenus from "../../data/menus.json";
import Spinner from "react-bootstrap/Spinner";
import { useCookies } from "react-cookie";
import { FaUserAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import PrimaryMenu from "../../components/PrimaryMenu";
import MobileMenu from "../../components/PrimaryMenu/MobileMenu";
import DemoCart from "../../components/cart/demoCart";
// import { Megamenu } from "../../components/Menu/menu";
import {
  API_URL,
  API_Brand,
  API_Product,
  API_CART,
  API_Register,
  token,
} from "../../config/config";
import MobileFooter from "../../components/MobileFooter/MobileFooter";
const API_Image = `${API_URL}/Product_image`;
const API_Category = `${API_URL}/admin/category/subchilddata`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const NavBar = ({ totals }) => {
  //For serch suggestions
  const data = [
    "diapers",
    "napkins",
    "wipes",
    "cloths",
    "bed",
    "feeding",
    "skip hop",
  ];
  const brandss = [
    "skip hop",
    "jole",
    "Baby works",
    "boon",
    "brush baby",
    "summer infant",
    "jj cole",
    "RYCO",
    "malarkey kids",
    "nap",
    "bed",
  ];
  const topresult = [
    "diapers",
    "napkins",
    "wipes",
    "cloths",
    "bed",
    "feeding",
    "skip hop",
    "jole",
    "Baby works",
    "boon",
    "brush baby",
    "summer infant",
    "jj cole",
    "RYCO",
    "malarkey kids",
    "nap",
  ];
  const categorys = [
    "diapers",
    "napkins",
    "wipes",
    "cloths",
    "bed",
    "feeding",
    "skip hop",
  ];
  const {
    carts,
    total_qty,
    error,
    removeCart,
    brands,
    total_amount,
    cart,
    total_items,
    GetCart,
    GetCartdatas,
    toggleOn,
    modalToggle,
    sub_total,
    category,
    toggles,
    toggleShows,
    pincodebtn,
    getPincode,
    turnoff,
    toggleOff,
  } = useContext(cartContext);
  const [toggleshow, setToggleshow] = useState(false);
  const [pincodeValue, setpincodeValue] = useState("");
  const [togglebtn, setTogglebtn] = useState(false);
  const [Menus, setMenus] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [sub, setSub] = useState(0);
  const navigate = useNavigate();

  const [customerName, SetCustomername] = useState("");
  const [show, setShow] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [total, totalItems] = useState(0);
  const GetCartdata = async () => {
    // console.log(cookies.customer_id, "cookies")
    const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
      headers: { Authorization: `Bearer ${token} ` },
    });
    // let total_cart_items = Result.data.list.reduce((intial, curr) => {
    //   const { product_quantity } = curr;
    //   let initial = intial + Number(product_quantity);
    //   return initial
    // }, 0);

    let subtotal = Result.data.list.reduce((intial, curr) => {
      const { product_quantity, SalePrice } = curr;
      let initial = intial + Number(product_quantity) * Number(SalePrice);
      return initial;
    }, 0);
    setSub(subtotal);
    // totalItems(total_cart_items)
    setCartData(Result.data.list);
  };

  // offcanvas
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const [Brand, setBrand] = useState([]);

  const getSelectedVal = (value) => {
    // console.log(value);
  };
  const [bas, setBas] = useState(false);
  const getChanges = (value) => {
    // console.log(value);
  };
  const [toggle, setToggle] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [firstletter, setFirstletter] = useState("");
  const [Brandlist, setBrandlist] = useState([]);
  const [Navallbtn, setNavallbtn] = useState("All");
  const [Error, setError] = useState("");
  const upper = [];

  const onclickbrand = (data) => {
    if (data === "All") {
      setBrandlist(upper);
      setNavallbtn("All");
    } else {
      const res = upper.filter(
        (item) => item.name.charAt(0).toUpperCase() === data.toString()
      );
      setBrandlist(res);
      setNavallbtn(data);
    }
  };
  const allbtn = {
    backgroundColor: "black",
    color: "white",
  };
  const alpbtn = {
    backgroundColor: "",
    color: "",
  };

  const Getbrand = async () => {
    const { data } = await axios.get(`${API_Brand}`, configss);
    // console.log("brand data", data.list);
    setBrand(data.list);
    data.list.forEach((ss) => {
      upper.push({
        name: ss.name.charAt(0).toUpperCase() + ss.name.slice(1).toLowerCase(),
        id: ss.id,
        slug: ss.slug,
      });
    });
    const Upperletter = [...new Set(upper)];
    setBrandlist(Upperletter);
    const res = Upperletter.map((first) => first.name[0]);
    const res1 = [...new Set(res)];
    // console.log(res1, "else2")
    setFirstletter(res1.sort());
  };
  Brand.forEach((ss) => {
    upper.push({
      name: ss.name.charAt(0).toUpperCase() + ss.name.slice(1).toLowerCase(),
      id: ss.id,
    });
  });

  const getProducts = () => {
    const product = JSON.parse(localStorage.getItem("cartproduct"));
    if (product) {
      setCartProduct(product);
    }
  };

  // console.log("qweqeqe", cookies);
  // const [InCart, setInCart]=useState([]);

  // const postData = () => axios.post(API_CART, {carts}, configss)
  // .then(response => setInCart(response.data));
  // console.log("JB----------->",InCart);

  const logOut = () => {
    // console.log('clicked');

    document.cookie = "customer_id" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "fullName" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "accesstoken" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "phone_number" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "pincodeid" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "pincode" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // cookies.remove()
    removeCookie("email_address");
    removeCookie("fullName");
    removeCookie("accesstoken");
    removeCookie("phone_number");
    removeCookie("customer_id");
    removeCookie("pincodeid");
    removeCookie("pincode");
    // navigate("/");
    window.location.href = "/login";
  };

  const GetdataMenu = async () => {
    const { data } = await axios.get(`${API_Category}`, configss);
    setMenus(data.list);
  };

  // console.log(
  //   "12345",

  //   Menus.map((item) => item)
  // );
  useEffect(() => {
    CustomerDetails();
    GetdataMenu();
    Getbrand();
    const product = JSON.parse(localStorage.getItem("cartproduct"));
    if (product) {
      setCartProduct(product);
    }
    // if (cookies.customer_id) {
    //   GetCartdata()
    // }
    // setTimeout(()=> setAlert(true), 1000)
    // postData()
  }, [cartData]);

  const CustomerDetails = async () => {
    // console.log("hi")
    const { data } = await axios.get(
      `${API_Register}/${cookies.customer_id}`,
      configss
    );
    // console.log("dataaa", data.list[0].full_name);
    SetCustomername(data.list[0].full_name);
  };

  const [alert, setAlert] = useState(false);
  const toast = () => {
    navigate("/login");
  };
  const login = () => {
  removeCookie("rewardpoints");
    toggleShows();
    handleClose();
    navigate("/checkout");
  };


  const getCartItems = () => {
    toggleShows();
    // console.log(cartData, "navabr cart")
    if (cookies.customer_id) {
      // GetCartdata();
      totalItems(cartData.length);
    } else {
      totalItems(total_items);
      setCartData(carts);
    }
  };
  const removeCarts = async (productid, id) => {
    // toggleShow();

    if (cookies.customer_id) {
      try {
        const Result = await axios.put(`${API_CART}/delete/${id}`, configss);
        if (Result) {
          // setShow(true);
          GetCart();
          // GetCartdatas();
          if (cookies.customer_id) {
            // GetCartdata();
            totalItems(cartData.length);
          } else {
            totalItems(total_items);
            setCartData(carts);
          }

          // window.location.reload(false)
        }
      } catch (error) {}
    } else {
      removeCart(productid);
      // window.location.reload(false)
    }
  };

  const handleToggleClose = () => {
    toggleOff();
    setpincodeValue("");
    setError("");
    // setTogglebtn(false);
  };

  const handleTogleChange = (e) => {
    if (e.target.checked == true) {
      // setTogglebtn(true);
      toggleOn();
      // setToggleshow(true);
    } else {
      turnoff();

      setTogglebtn(false);
      window.location.reload(false);
      // setToggleshow(false);
    }
  };
  const togglemodal = {
    // backgroundColor : "red",
  };
  const handleValue = (e) => {
    e.preventDefault();
    if (pincodeValue.length == 6 || pincodeValue.length == 5) {
      // setTogglebtn(true);
      getPincode(pincodeValue);
    } else {
      setError("please enter valid pincode");
    }
  };

  return (
    <>
      <TopNav />
      <div className="hide">
        <div className="header_section web_view_header display-flex p-3">
          <div className="logo_section">
            <Link to="/">
              <img src={logo} alt="Brand-logo" className="brand_logo" />
            </Link>
          </div>
          <SearchInput
            label={<VscSearch />}
            pholder="Search for products,brands and categories"
            data={data}
            brands={brands}
            topresult={topresult}
            category={category}
            onSelected={getSelectedVal}
            onChange={getChanges}
          />

          <div className="display-flex ">
            <div className="toggle-relative position-relative">
              {/* <span>pincode</span> */}
              <label class="custom-control-label text-muted" for="darkSwitch">
                Same Day Delivery{" "}
              </label>
              <div className="text-center">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  class="form-check-input"
                  onChange={(e) => handleTogleChange(e)}
                  checked={pincodebtn} // label="Check this switch"
                />
              </div>

              <div className="toggle-absolute">
                <Modal
                  show={modalToggle}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  onHide={handleToggleClose}
                  className="togglemodal"
                  style={togglemodal}
                >
                  <Modal.Header
                    closeButton
                    className="text-white"
                  ></Modal.Header>
                  <Modal.Body className="">
                    <p className="text-white my-2">
                      Please Enter your pincode for same day delivery
                    </p>
                    <div className="position-relative ">
                      <Form>
                        <Form.Control
                          type="text"
                          placeholder="Enter Pincode"
                          className="toggleInput"
                          minLength={6}
                          value={pincodeValue}
                          maxLength={6}
                          onChange={(e) => setpincodeValue(e.target.value)}
                          required
                        />
                        <button
                          className="toggle-btn-css"
                          type="submit"
                          onClick={(e) => handleValue(e)}
                        >
                          <AiOutlineArrowRight className="search_icon_pincode" />
                        </button>
                      </Form>
                      <p className="text-white">
                        {error
                          ? "Same day delivery option is not available for this pincode "
                          : pincodebtn == true
                          ? null
                          : Error}
                      </p>
                      <p className="text-white">{}</p>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>{" "}
            &nbsp;<span className="line_bar">|</span>&nbsp;
            <div className="dropdown">
              <p className="login_register dropdown-toggle">
                {/* <Link to="/login">{cookies? cookies.Pr: Login / Register}</Link> */}
                <Link to={cookies.customer_id ? "/" : "/login"}>
                  {/* {cookies.fullName ? (
                    cookies.fullName === "undefined" ? (
                      <>
                        {cookies.email_address
                          .slice(0, cookies.email_address.indexOf("@"))
                          .toUpperCase()}
                        &nbsp;&nbsp;
                        <FaUserAlt />
                      </>
                    ) : (
                      cookies.fullName.substring(0, 18)
                    )
                  ) : (
                    " Login / Register"
                  )}{" "} */}
                  {customerName != "" ? (
                    <>
                      {customerName} &nbsp;&nbsp;
                      <FaUserAlt />
                    </>
                  ) : (
                    <>Login / Register</>
                  )}
                </Link>
              </p>
              {cookies.customer_id ? (
                <ul class="dropdown-menu">
                  <li>
                    <Link to="/myaccount" class="dropdown-item">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/wish-list" class="dropdown-item">
                      WishList
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" onClick={logOut}>
                      Signout
                    </a>
                  </li>
                </ul>
              ) : null}
            </div>
            &nbsp;<span className="line_bar">|</span>&nbsp;
            <div
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i
                class="fa fa-shopping-basket bascket-icon"
                aria-hidden="false"
                onClick={getCartItems}
              ></i>
              <sup> {cookies.customer_id ? total_qty : total_items} </sup>
            </div>
            <Offcanvas
              show={toggles}
              onHide={toggleShows}
              placement={"end"}
              backdrop={true}
              // backdrop="static"
              scroll={false}
              className="navBar_size"
            >
              <Offcanvas.Header closeButton>
                <h5
                  className="offcanvas-title text-center"
                  id="offcanvasRightLabel"
                >
                  CART
                </h5>
              </Offcanvas.Header>

              <div className="offcanvas-body cart-scroll pb-5">
                {cookies.customer_id ? (
                  <>
                    <div className="cart_scroll">
                      {cart?.length > 0 ? (
                        <>
                          {cart.map((currEle) => {
                            return (
                              <>
                                <div className="my-cart-box cart-box">
                                  <div className=" row">
                                    <div className="col-lg-4 col-4">
                                      <div className="cart-ad add-to-cart">
                                        <div className="image-cart image-cart-shadow">
                                          <div>
                                            <img
                                              src={`${API_Image}/${currEle.ProductImage}`}
                                              width="100%"
                                              alt={currEle.ProductName}
                                            />
                                          </div>
                                          {/* <DemoCart cart={} /> */}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-6  col-6 add-cart">
                                      <NavLink
                                        to={`/products/${currEle.ProductName?.trim(
                                          ""
                                        ).replaceAll(" ", "-")}/${
                                          currEle.main_id
                                        }`}
                                        onClick={toggleShows} state={currEle}
                                      >
                                        <p className="brand_name">
                                          {currEle.ProductName}
                                        </p>
                                      </NavLink>
                                      {/* <small>
                                        A TODDLER THING SIZE: 0 - 3 M A TODDLER
                                        THING PRINT: DOG{" "}
                                      </small> */}

                                      {currEle.variant_1 ? (
                                        <p style={{ color: "#918989" }}>
                                          {currEle.variant_1_name}:{currEle.variant_1}
                                        </p>
                                      ) : null}

                                      {/* <small>
                                        A TODDLER THING SIZE: 0 - 3 M A TODDLER
                                        THING PRINT: DOG WALK FS HSN CODE:
                                        611120
                                      </small> */}
                                      {currEle.variant_2 ? (
                                        <p style={{ color: "#918989" }}>
                                          <>{currEle.variant_2_name}:{currEle.variant_2}</>{" "}
                                        </p>
                                      ) : null}
                                      <p>
                                        <strong>
                                          {cookies.customer_id
                                            ? currEle.product_quantity
                                            : currEle.ProductQuantity}{" "}
                                          × ₹{currEle.SalePrice}.00
                                        </strong>{" "}
                                      </p>
                                    </div>

                                    <div className="col-lg-2 col-2 ">
                                      <IoCloseCircleOutline
                                        onClick={() =>
                                          removeCarts(
                                            currEle.Productid,
                                            currEle.id
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <hr
                                  className="hr__line"
                                  // style={{ marginTop: "2px" }}
                                />
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <p className="text-center text-muted">
                          Your cart is Empty !
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cart_scroll">
                      {carts?.length > 0 ? (
                        <>
                          {carts.map((currEle) => {
                            return (
                              <>
                                <div className="cart-scroll">
                                  <div className="my-cart-box cart-box">
                                    <div className=" row">
                                      <div className="col-lg-4 col-4">
                                        <div className="cart-ad add-to-cart">
                                          <div className="image-cart image-cart-shadow">
                                            <div>
                                              <img
                                                src={`${API_Image}/${currEle.ProductImage}`}
                                                width="100%"
                                                alt={currEle.ProductName}
                                              />
                                            </div>
                                            {/* <DemoCart cart={} /> */}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6  col-6 add-cart">
                                        <NavLink
                                          to={`/products/${currEle.ProductName?.trim(
                                            ""
                                          ).replaceAll(" ", "-")}/${
                                            currEle.main_id
                                          }`}
                                          onClick={toggleShows} state={currEle}
                                        >
                                          <p className="brand_name">
                                            {currEle.ProductName}
                                          </p>
                                        </NavLink>
                                        {currEle.variant_1 ? (
                                          <p style={{ color: "#918989" }}>
                                              {currEle.variant_1_name}:{currEle.variant_1}
                                          </p>
                                        ) : null}

                                        {/* <small>
                                        A TODDLER THING SIZE: 0 - 3 M A TODDLER
                                        THING PRINT: DOG WALK FS HSN CODE:
                                        611120
                                      </small> */}
                                        {currEle.variant_2 ? (
                                          <>
                                            {" "}
                                            <p style={{ color: "#918989" }}>
                                            {currEle.variant_2_name}:{currEle.variant_2}
                                            </p>{" "}
                                          </>
                                        ) : null}
                                        <p>
                                          <strong>
                                            {cookies.customer_id
                                              ? currEle.product_quantity
                                              : currEle.ProductQuantity}{" "}
                                            × ₹{currEle.SalePrice}.00
                                          </strong>{" "}
                                        </p>
                                      </div>
                                      <div className="col-lg-2 col-2 ">
                                        <IoCloseCircleOutline
                                          onClick={() =>
                                            removeCarts(
                                              currEle.Productid,
                                              currEle.id
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <hr
                                    className="hr__line"
                                    // style={{ marginTop: "2px" }}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <p className="text-center text-muted">
                          Your cart is Empty !
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="mt-4">
                  <div className="row align-items-center mb-2">
                    <div className="col-12 cart__total m-0">
                      <p>
                        <strong>
                          Subtotal:₹
                          {cookies.customer_id
                            ? Math.round(sub_total)
                            : Math.round(total_amount)}
                          .00
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="shopping__cart ">
                        <Link to="/Cart" onClick={()=>removeCookie("rewardpoints")}
  >
                          <button
                            className="shopping__cart__buttons"
                            onClick={toggleShows}
                          >
                            View Cart
                          </button>
                        </Link>

                        {cart?.length > 0 ? (
                          <>
                            <div
                              className="shopping__cart__buttons"
                              onClick={cookies.customer_id ? login : toast}
                            >
                              Checkout
                            </div>
                            {alert ? (
                              <div class="alert alert-success" role="alert">
                                This is a success alert—check it out!
                              </div>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                    </div>
                    {/*   */}
                  </div>
                </div>
              </div>
            </Offcanvas>
            {/* <Link to="/addtocart"><i class="fa fa-shopping-basket bascket-icon" aria-hidden="true"></i></Link> */}
          </div>
        </div>
      </div>
      <div className="mobile_view_header">
        <div className="top-logo">
          <div className="mob-menu">
            <IoReorderThreeOutline
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </div>

          <Link to="/">
            <img
              src={logo}
              alt="Brand-logo"
              className="mob_brand_logo display-flex"
            />
          </Link>
          <div className="mob-bascket">
            <i
              class="fa fa-shopping-basket bascket-icon"
              onClick={getCartItems}
            ></i>
            <sup> {cookies.customer_id ? total_qty : total_items} </sup>
          </div>
        </div>
      </div>
      <div className="">
        <div className="d-flex align-items-center justify-content-center d-md-none ">
          <div className="toggle-relative position-relative">
            <label class="custom-control-label" for="darkSwitch">
              Same Day Delivery{" "}
            </label>
            <div className="text-center">
              <Form.Check
                type="switch"
                id="custom-switch"
                class="form-check-input"
                onChange={(e) => handleTogleChange(e)}
                checked={pincodebtn} // label="Check this switch"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 search-view-res">
        <SearchInput
          label={<VscSearch />}
          pholder="Keyword..."
          data={data}
          onSelected={getSelectedVal}
          onChange={getChanges}
        />
      </div>

      {toggle ? (
        <nav id="mobile_dropdown" className="h-100">
          <ul>
            <div role="navigation" class="menumob">
              <ul>
                {/* <li><a href="#">Brands</a></li> */}
                <li class="menu-hasdropdown text-muted small">
                  <a>
                    <label
                      title="toggle menu"
                      for="brands"
                      className="subMobMenu"
                    >
                      <Link to={"/brands"} className="m-0 p-0 text__colors">
                        Brands
                      </Link>
                      <label title="toggle menu" for="brands">
                        <MdOutlineKeyboardArrowDown
                          className="arrowicon text-muted small"
                          style={{ fontSize: "1em" }}
                        />
                      </label>
                    </label>
                  </a>
                  <input type="checkbox" id="brands" />
                  <ul class="menumob-dropdown">
                    <div className="mobbrandview">
                      <div className="row ">
                        <div className="col-3 brand-upd-page-tab-all-text-btn text-center">
                          <button
                            className="brand-upd-page-btn-all brand_activebtn d-flex align-items-center mx-auto text-center"
                            onClick={() => onclickbrand("All")}
                            style={Navallbtn === "All" ? allbtn : alpbtn}
                          >
                            <p className="text-center"> ALL</p>
                          </button>
                        </div>
                        <div className="col-9 brand-upd-page-tab-all-btn p-2">
                          <div className="flex-wrap">
                            {firstletter.length > 0 &&
                              firstletter.map((item) => {
                                // { console.log(item, "else1") }
                                return (
                                  <button
                                    className="brand-upd-page-btn-a col-lg-2 brand_activebtn"
                                    title={item}
                                    onClick={() => onclickbrand(item)}
                                    style={Navallbtn === item ? allbtn : alpbtn}
                                  >
                                    {item}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      <div className="brand-upd-page-tab-view-content-scrollbar">
                        <div className="small brandnameresult p-4">
                          {Brandlist.map((ele) => {
                            return (
                              <>
                                <NavLink
                                  to={`/brand/${
                                    ele.slug != ""
                                      ? ele.slug?.trim().replaceAll(" ", "-") ||
                                        ""
                                      : ele.name?.trim().replaceAll(" ", "-")
                                  }/${ele.id}`}
                                  onClick={() => {
                                    setToggle(!toggle);
                                  }}
                                >
                                  <p>{ele.name}</p>
                                </NavLink>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
                {Menus.map((menu) => (
                  <li class="menumob-hasdropdown">
                    <a>
                      <label
                        href="#"
                        title="toggle menu"
                        for={menu.id}
                        className="subMobMenu"
                      >
                        <NavLink
                          to={`/${
                            menu.category_slug != ""
                              ? menu.category_slug.trim().replaceAll(" ", "-")
                              : menu.category_name.trim().replaceAll(" ", "-")
                          }/${menu.id}`}
                          state={menu}
                          className="p-0"
                          onClick={() => {
                            setToggle(!toggle);
                          }}
                        >
                          <p
                            title="toggle menu"
                            for={menu.id}
                            className="text-muted small"
                          >
                            {menu.category_name}
                          </p>
                        </NavLink>
                        <label title="toggle menu" for="about">
                          <MdOutlineKeyboardArrowDown className="arrowicon text-muted small" />
                          {/* <AiOutlineClose className="closeicon"/> */}
                        </label>
                      </label>
                    </a>
                    <input type="checkbox" id={menu.id} />
                    {menu?.getsubcat_result.length > 0 && (
                      <ul class="menumob-dropdown">
                        {menu.getsubcat_result.map((megaMenu, ii) => (
                          <>
                            {/* <li><a href="">{megaMenu.title}</a></li> */}
                            <li class="menumob-hasdropdown menumob-hasflyout">
                              <a>
                                <label
                                  title="toggle menu"
                                  for={megaMenu.subcat_id}
                                  className="subMobMenu"
                                >
                                  <Link
                                    to={`/${menu.category_name
                                      .trim()
                                      .replaceAll(" ", "-")}/${
                                      megaMenu.subcategoryslug != ""
                                        ? megaMenu.subcategoryslug
                                            .trim()
                                            .replace(/[&#]/g, "")
                                            .replaceAll(" ", "-")
                                            .replaceAll("--", "-")
                                        : megaMenu.title
                                            .trim()
                                            .replaceAll("&", "")
                                            .replaceAll(" ", "-")
                                            .replaceAll("--", "-")
                                    }/${megaMenu.subcat_id}`}
                                    className="p-0 "
                                    onClick={() => {
                                      setToggle(!toggle);
                                    }}
                                  >
                                    <p className="text-muted small">
                                      {megaMenu.title}
                                    </p>
                                  </Link>
                                  <label
                                    title="toggle menu"
                                    for={megaMenu.subcat_id}
                                  >
                                    <MdOutlineKeyboardArrowDown className="arrowicon text-muted small" />
                                  </label>
                                </label>
                              </a>
                              <input type="checkbox" id={megaMenu.subcat_id} />
                              {megaMenu.getbchildcat_result.length > 0 && (
                                <ul class="menumob-dropdown">
                                  {megaMenu.getbchildcat_result.map(
                                    (megamenuItem, iii) => (
                                      <li className=" small">
                                        <a href="">
                                          <NavLink
                                            className="p-0 text-muted"
                                            to={`/${menu.category_name
                                              .trim()
                                              .replaceAll(
                                                " ",
                                                "-"
                                              )}/${megaMenu.title
                                              .trim()
                                              .replaceAll("&", "")
                                              .replaceAll(" ", "-")
                                              .replaceAll("--", "-")}/${
                                              megamenuItem.childcategoryslug ==
                                              ""
                                                ? megamenuItem.childcategoryname
                                                    .trim()
                                                    .replaceAll("&", "")
                                                    .replaceAll(" ", "-")
                                                    .replaceAll("--", "-")
                                                : megamenuItem.childcategoryslug
                                                    ?.trim()
                                                    .replaceAll("&", "")
                                                    .replaceAll(" ", "-")
                                                    .replaceAll("--", "-") || ""
                                            }/${megamenuItem.id}`}
                                            onClick={() => {
                                              setToggle(!toggle);
                                            }}
                                          >
                                            {megamenuItem.childcategoryname}
                                          </NavLink>{" "}
                                        </a>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          </>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    to="/blog"
                    style={{ color: "#666666", fontSize: "14px" }}
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* {Menus.map((menu) => ( */}
            {/* // <li className="mobile-view-list">
              //   <Link to="/">{menu.category_name}</Link> 
              //   <div class="dropdown">
              //   {menu.getsubcat_result.map((megaMenu, ii) => { */}
            {/* //     <>
              //     <Link to="/">{megaMenu.title}</Link>
              //     <div class="dropdown-content">
              //       <Link to="/">Diapers & Pants</Link>
              //       <Link to="/">Cream & Powders</Link>
              //       <Link to="/">Nappy Cleaning</Link>
              //     </div>
              //     </>
              //   })}
              //   </div>
              // </li> */}
            {/* // ))} */}
            {/* <li className="mobile-view-list">
               
              </li> */}
          </ul>
        </nav>
      ) : null}

      {/* {
        isShow ? (
          <nav id="mobile_dropdown">
            <ul>
              <li className="mobile-view-list">
                <Link to="/">Home</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="/">Brands</Link>
              </li>
              <li className="mobile-view-list">
                <div class="dropdown">
                  <Link to="/">NappyCare</Link>
                  <div class="dropdown-content">
                    <Link to="/">Diapers & Pants</Link>
                    <Link to="/">Cream & Powders</Link>
                    <Link to="/">Nappy Cleaning</Link>
                  </div>
                </div>
              </li>

              <li className="mobile-view-list">
                <Link to="/">Feeding</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="/">Skin&Hair</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="/">OralCare</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="/">BabyClothes</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="/">Gears&Toys</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="/">Motherhood</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="#">Blog</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="#">Offers</Link>
              </li>
              <li className="mobile-view-list">
                <Link to="/">contact</Link>
              </li>
            </ul>
          </nav>

        ) : null
      } */}
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* main-nav-section */}
      <PrimaryMenu />
      <MobileFooter
        getCartItems={getCartItems}
        total_item={total_items}
        total_qty={total_qty}
        onClick={() => {
          setToggle(!toggle);
          window.scrollTo({ top: -4, behavior: "auto" });
        }}
      />
    </>
  );
};
