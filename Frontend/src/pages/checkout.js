import React, { useState, useEffect, useContext } from "react";
// import { ProgressBar, Step } from "react-step-progress-bar";
import "../assets/styles/checkout.css";
import img from "../assets/images/checkout/pay5.png";
import img2 from "../assets/images/checkout/visa1.png";
import { ToastContainer, toast } from "react-toastify";
import { cartContext } from "../layout/layout";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { FaRupeeSign, FaPen, FaTrashAlt } from "react-icons/fa";
import { MdDangerous } from 'react-icons/md';
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { API_Order, token, API_CART, API_BillingAddress_Userid, API_URL } from '../config/config'
import { useLocation } from "react-router-dom";
const API_DELETE = `${API_URL}/admin/BillingAddress/delete`;
const configss = {
  headers: {
    "Authorization": `Bearer ${token}`
  },
};

const Checkout = ({ page, onPageNumberClick }) => {
  const { cart, toggleShows, GetCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [activeAddress, setActiveAddress] = useState(true);
  const [isLocation, setisLocation] = useState([])
  const [payment, setPayment] = useState(true);
  const [localAddress, setLocalAddress] = useState([])
  const [payMethod, setPayMethod] = useState(true);
  const [isShow, setIsShow] = useState(true);
  const [isToggle, setIsToggle] = useState(3);
  const [isTrue, setIsTrue] = useState(null);
  const [isTrueCard, setIsTrueCard] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [toggle, setToggle] = useState(true);
  const [editId, setEditId] = useState(null);
  const [billing, setBilling] = useState();

  const [isAddress, setIsAddress] = useState({
    AddressType: '',

    FirstName: '',
    LastName: '',
    Email: "",
    AddressLine2: '',
    AddressLine1: '',
    Phone: '',
    LandMark: '',
    City: '',
    State: '',
    PinCode: ''
  });
  const [errors, setError] = useState("");

  // const [isUpi, setIsUpi] = useState(true);
  // const [isCOD, setIsCOD] = useState(true);

  const handleTrue = (id, data) => {
    setIsTrue(id);
    setBilling(data)



  };

  const handle1True = () => {

    setIsTrue(true);

  };

  const handleTrueCard = () => {
    setIsTrueCard(false);


  };

  const handleTrueCard1 = () => {
    setIsTrueCard(true);


  };

  const handleAddress = () => {
    navigate('/Address/2ADSD$$$SDS$%%')
    // setActiveAddress(false);
  };

  const handleEdit = (id, property) => {

    // window.location.href =`/Address/${id}`
    navigate(`/Address/${id}`, {
      state: property
    })
  }


  const handlepayment = () => {

    if (!billing) {
      setError("Please Select The Address")
    } else {
      setError("")
      setPayment(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'

      });
    }

  };




  const initpayment = () => {
    setPayment(true);
    // setError("")
    setPayMethod(true);
  };

  const handleClick = (e) => {
    setIsToggle(e);
  };
  const handleOpen = () => {
    setIsShow(false);
  };

  const initOpen = () => {
    setIsShow(true);
  };



  const [selectedClient, setSelectedClient] = useState([]);
  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
  }


  const [selectedState, setSelectedState] = useState([]);
  function handleStateChange(e) {
    setSelectedState(e.target.value);
  }


  // Onchange Start
  const handleNameChange = ({ target: { name, value } }) => {
    setIsAddress({ ...isAddress, [name]: value })
  };



  const getBillingAddress = async () => {

    let response = await axios.get(`${API_BillingAddress_Userid}/${cookies.customer_id}`);
  
    if (response) {
      setLocalAddress(response.data.list)
    }

  }












  const GetCartdata = async () => {
    if (cookies.customer_id) {
      const Result = await axios.get(
        `${API_CART}/${cookies.customer_id}`,
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      //  if(Result.data.list>0){
      //   navigate("/checkout")
      //  }
      //  else{
      //   navigate("/cart")
      //  }




    }
    else {
      navigate("/login")
    }
  };




  const CheckCart = () => {
    if (cart.length == 0) {
      navigate("/");
    }
  }
  useEffect(() => {

    if (!cookies.customer_id) {


      navigate("/login")
    }
    else {

      CheckCart()
    }
    getBillingAddress()

  }, [cart]);
  const initAddress = (event) => {



    event.preventDefault();

    // console.log("sss1")



  };

  const handlepaymentOne = async () => {
    try {
      setPayMethod(false);
      const dats = {
        userid: cookies.customer_id,
        BillingAddress: [billing],
        ShippingAddress: [billing],
        reward_points:cookies.rewardpoints?cookies.rewardpoints=="true"?true:false:false,
        manual_reward:cookies.manual_reward_points&&cookies.rewardpoints=="true"?cookies.manual_reward_points>0?cookies.manual_reward_points:0:0,
      }
      // console.log("datdatda",dats)
      const Result = await axios.post(`${API_Order}`, dats, configss);
      if (Result) {

        const value = Result.data.msg;   
        removeCookie("rewardpoints");
        removeCookie("rewardpointss");
        removeCookie("manual_reward_points");
        window.location.href = `/order-complete/${value}`;
     


      }
    } catch (error) {
      // console.log(error)
    }


  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toggle) {

      setLocalAddress(
        localAddress.map((curr) => {
          if (curr.id == editId) {
            return { ...curr, localdata: [isAddress] }
          }
          return curr;
        })
      )

      setActiveAddress(true);
      setIsAddress({
        AddressType: '',
        FirstName: '',
        LastName: '',
        Email: "",
        AddressLine2: '',
        AddressLine1: '',
        Phone: '',
        LandMark: '',
        City: '',
        State: '',
        PinCode: ''
      })



    }
    else {

      if (isAddress.FirstName.length < 2 || isAddress.LastName.length < 1) {
        setError("First Name and Last Name Minimum 4 Char")
      }
      else if (isAddress.Phone.length < 10) {
        setError("Mobile Number Minimum Length is 10")
      }
      else if (isAddress.AddressLine2.length < 5) {
        setError("Area or Colony is Required")
      }
      else if (isAddress.Email.length < 2) {
        setError("Email Address Is Required ")
      }
      else if (isAddress.City.length < 2) {
        setError("City Is Required")
      }
      else if (isAddress.AddressLine1.length < 1) {
        setError("Flat or House Number Required")
      }
      else {
        setError("");

        setActiveAddress(true);
        const alldata = {
          id: new Date().getTime().toString(),
          localdata: [isAddress]
        }
        setLocalAddress([...localAddress, alldata]);
        setIsAddress({
          AddressType: '',
          FirstName: '',
          LastName: '',
          Email: "",
          AddressLine2: '',
          AddressLine1: '',
          Phone: '',
          LandMark: '',
          City: '',
          State: '',
          PinCode: ''
        })
      }
    }



  }


  // const handleDelete = (id) => {
  //   const updateAddress = localAddress.filter((curr) => curr.id !== id);
  //   setLocalAddress(updateAddress);
  // }



  const handleDelete = async (id) => {
    try {
      const configss = {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      };
      const result = await axios.put(`${API_DELETE}/${id}`, { is_delete: 0 }, configss);
      if (result) {
        toast.success("Address Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
        });
        getBillingAddress()
      }
    } catch (error) {

    }
  }
  // console.log(billing,"localAddress")

  return (
    <div>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <div class="mainWrapper">
          <div class="statusBar">
            <span class="pBar"></span>
            <div class="node n0 done nConfirm0">
              <div class="main done m0 done nConfirm0"><TiTick className="address-tick" /></div>
              <span class="text t0 done nConfirm0">Address </span>
            </div>
            <div class={payment ? "node n1 nConfirm1" : "node n0 done nConfirm0"}>
              <div class={payment ? "main m1 nConfirm1" : "main done m0 done nConfirm0"}><TiTick className="address-tick " /></div>
              <span class={payment ? "text t1 nConfirm1" : "text t0 done nConfirm0"}> Payment</span>
            </div>
            <div class={payMethod ? "node n2 nConfirm2" : "node n0 done nConfirm0"}>
              <div class={payMethod ? "main m2 nConfirm2" : "main done m0 done nConfirm0"}><TiTick className="address-tick " /></div>
              <span class={payMethod ? "text t2 nConfirm2" : "text t0 done nConfirm0"}>Confirm</span>
            </div>
            {/* <div class="node n3 nConfirm3">
				<div class="main m3 nConfirm3"></div>
				<span class="text t3 nConfirm3"></span>
			</div>
			<div class="node n4 nConfirm4">
				<div class="main m4 nConfirm4"></div>
				<span class="text t4 nConfirm4">Complete</span>
			</div> */}
          </div>
          {/* <div class="buttonHolder">
			<div class="button b-back disabled" id="back">Back</div>
			<div class="button b-next" id="next">Next</div>
		</div> */}
        </div>
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-12" style={{ borderRight: "1px solid gainsboro" }}>
              <div
                className="card"
                style={{
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  marginBottom: "3rem",
                  padding: "10px"
                }}
              >

                {payment ? (
                  <>
                    {activeAddress ? (
                      <>
                        <button
                          className="address-btn col-3 mt-3 mx-4"
                          onClick={handleAddress}
                        >
                          ADD BILLING ADDRESS
                        </button>
                        <div className="row checkout-card">
                          <div><span className="text-danger">{errors}</span></div>
                          {
                            localAddress?.length > 0 ? localAddress.map((currEle) => {
                              return (
                                <>


                                  <div className="col-md-6">
                                    <div className={isTrue == currEle.id ? "checkout-address1" : "checkout-address2"} onClick={() => handleTrue(currEle.id, currEle)}>
                                      {/* {isLocation.map((item) =>item.fullName)} */}
                                      <div className="row">
                                        <div className="col-md-9 col-6">
                                          <h6 style={{ color: "#fc8181" }}>{currEle.first_name}</h6>
                                        </div>
                                        <div className="col-md-3 col-6 d-flex justify-content-end">

                                          <h6 className="checkout-icons">
                                            <GrEdit
                                              style={{ color: "#675d5d !importent" }} onClick={() => handleEdit(currEle.id, currEle)}
                                            />
                                          </h6>

                                          <Link>
                                            <h6 className="checkout-icons" onClick={() => handleDelete(currEle.id)}>
                                              <RiDeleteBin5Fill
                                                style={{ color: "red" }}
                                              />
                                            </h6>
                                          </Link>
                                        </div>
                                        <hr />

                                        <p className="checkout_address text-center pt-1 pb-3">
                                          <b>{`${currEle.first_name} ${currEle.last_name}`} <br />
                                            {`${currEle.street_address},`} {`${currEle.apartment_suite_unit_etc},`} <br />
                                            {`${currEle.city},`} {`${currEle.pincode},`} {`${currEle.state},`} {`${currEle.country}.`}&nbsp;{`${currEle.phonenumber}`}
                                          </b>
                                        </p>




                                      </div>

                                    </div>
                                    <div
                                      style={{
                                        marginBottom: "3rem",
                                        marginTop: "2rem",
                                      }}
                                    >
                                      {/* <p className="text-danger">{errors}</p> */}
                                    </div>
                                  </div>



                                </>
                              )
                            }) : <div className="col-md-6">
                              <div className={isTrue ? "checkout-address1" : "checkout-address2"} >
                                <div className="row">



                                  <p className="checkout_address text-center pt-1 pb-3 text-muted"><b>Add A New Address</b></p>
                                </div>
                              </div>
                            </div>
                          }



                        </div>

                        <div className="checkout-shipping d-flex justify-content-between p-2">
                          <p className="checkout_p">
                            Your pincode is closer to our warehouse you are
                            eligible for same day shipping.
                          </p>
                          <button
                            className="address-btn-continue  " style={{ background: "#fc8181" }}
                            onClick={handlepayment}
                          >

                            CONTINUE
                          </button>
                        </div>
                      </>
                    ) : (

                      <form onSubmit={handleSubmit}>
                        <div
                          className="row"
                          style={{
                            paddingTop: "30px",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                          }}
                        >
                          {/* <span className="text-center text-danger mb-2">{errors}</span> */}
                          <div className="col-md-6" style={{ width: "" }}>

                            <div className="company_name focus-visble input">
                              <select name="AddressType" value={isAddress.AddressType} onChange={handleNameChange} className="checkout_select">
                                <option value="Home">Home</option>
                                <option value="Other">Others</option>
                              </select>
                            </div>
                            <div className="company_name focus-visble input">
                              <input
                                type="text"
                                name="FirstName"
                                value={isAddress.FirstName}
                                onChange={handleNameChange}
                                className="sty1 checkout_select"
                                placeholder="First Name" required
                              />

                              <div className="company_name focus-visble input">
                                <input
                                  type="text"
                                  name="LastName"
                                  value={isAddress.LastName}
                                  onChange={handleNameChange}
                                  className="sty1 checkout_select"
                                  placeholder="Last Name" required
                                />
                              </div>
                            </div>
                            <div className="company_name focus-visble input">
                              <input
                                type="text"
                                name="Phone"
                                value={isAddress.Phone}
                                onChange={handleNameChange}
                                className="sty1 checkout_select"
                                placeholder="Mobile Number"
                              />
                            </div>
                            <div className="company_name focus-visble input">
                              <input
                                type="email"
                                name="Email"
                                value={isAddress.Email}
                                onChange={handleNameChange}
                                className="sty1 checkout_select"
                                placeholder="Email"
                              />
                            </div>
                            <div className="company_name focus-visble input">
                              <input
                                type="text"
                                name="AddressLine1"
                                value={isAddress.AddressLine1}
                                onChange={handleNameChange}
                                className="sty1 checkout_select"
                                placeholder="Flat,House no,Building,Company,Apartment"
                              />
                            </div>
                          </div>
                          <div className="col-md-6" style={{ width: "" }}>
                            <div className="company_name focus-visble input">
                              <input
                                type="text"
                                name="AddressLine2"
                                value={isAddress.AddressLine2}
                                onChange={handleNameChange}
                                className="sty1 checkout_select"
                                placeholder="Area,Colony,Street,Village"
                              />
                            </div>
                            <div className="company_name focusinitAddress-visble input">
                              <input
                                type="text"
                                name="LandMark"
                                className="sty1 checkout_select"
                                value={isAddress.LandMark}
                                onChange={handleNameChange}
                                placeholder="Landmark e.g (neat Hospital)"
                              />
                            </div>
                            <div className="company_name focus-visble input">
                              <input
                                type="text"
                                name="City"
                                value={isAddress.City}
                                onChange={handleNameChange}
                                className="sty1 checkout_select"
                                placeholder="Town/City"
                              />
                            </div>
                            <div className="company_name focus-visble input">
                              <select name="State" value={isAddress.State} onChange={handleNameChange} className="checkout_select" >
                                <option value="Tamilnadu">Tamilnadu</option>
                                <option value="Andra">Andra</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Karnataka">Karnataka</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-xs-12 col-sm-12  ">
                          {
                            toggle ? <><button
                              type="submit"
                              // onClick={initAddress}
                              className="checkout_button"
                            >
                              Save
                            </button></> : <><button
                              type="submit"
                              // onClick={initAddress}
                              className="checkout_button"
                            >
                              Update
                            </button></>
                          }
                        </div>
                      </form>
                    )}
                  </>
                ) : (
                  <>
                    <div className=" p-4  mb-6 mt-2">
                      {isShow ? (
                        <>
                          {isToggle === 1 ? (
                            <div className="cart-wrapper checkout_details1">
                              <h5 className=" p-1  mb-4">
                                Credit/Debit Card
                              </h5>
                              {/* <div className="row">
                                <div className="col-md-6 col-xs-12 col-sm-12  mb-5">
                                  <div className={isTrueCard ? "row checkour_active" : "checkout_border"} onClick={handleTrueCard}>
                                    <div className="col-md-12 col-xs-12 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-9 col-sm-8 col-xs-8"></div>
                                        <div className="col-md-3 col-sm-4 col-xs-4  d-flex justify-content-between">
                                          <Link>
                                            <h6 className="checkout-icons">
                                              <GrEdit
                                                style={{ color: "#675d5d" }}
                                              />
                                            </h6>
                                          </Link>
                                          <Link>
                                            <h6 className="checkout-icons">
                                              <RiDeleteBin5Fill
                                                style={{ color: "red" }}
                                              />
                                            </h6>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 col-xs-12 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-3 col-xs-3 col-sm-3 ">
                                          <img
                                            src={img}
                                            className="img img-responsive"
                                            style={{ width: "100%" }}
                                          />
                                        </div>
                                        <div className="col-md-9 col-xs-9 col-sm-9">
                                          <p className="checkout_address1">
                                            <b>Visa Master</b>
                                          </p>
                                          <p className="checkout_address1">
                                            xxxx - xxxx - xxxx - 8523
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6 col-xs-12 col-sm-12  mb-5">
                                  <div className={isTrueCard ?"row checkout_border": "row checkour_active" } onClick={handleTrueCard1}>
                                    <div className="col-md-12 col-xs-12 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-9 col-sm-8 col-xs-8"></div>
                                        <div className="col-md-3 col-sm-4 col-xs-4  d-flex justify-content-between">
                                          <Link>
                                            <h6 className="checkout-icons">
                                              <GrEdit
                                                style={{ color: "#675d5d" }}
                                              />
                                            </h6>
                                          </Link>
                                          <Link>
                                            <h6 className="checkout-icons">
                                              <RiDeleteBin5Fill
                                                style={{ color: "red" }}
                                              />
                                            </h6>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 col-xs-12 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-3 col-xs-3 col-sm-3 ">
                                          <img
                                            src={img}
                                            className="img img-responsive"
                                            style={{ width: "100%" }}
                                          />
                                        </div>
                                        <div className="col-md-9 col-xs-9 col-sm-9">
                                          <p className="checkout_address1">
                                            <b>Visa Master</b>
                                          </p>
                                          <p className="checkout_address1">
                                            xxxx - xxxx - xxxx - 7235
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            
                              <div className="col-md-12 col-xs-12 col-sm-12 ">
                                <button
                                  onClick={handleOpen}
                                  className="checkout_button"
                                >
                                  Add New Card
                                </button>
                              </div> */}
                              <div className="alert alert-danger d-flex justify-content-even align-items-center mt-3 mb-4" role="alert"><MdDangerous />&nbsp;Service not available now</div>
                            </div>
                          ) : null}
                          {isToggle === 2 ? (
                            <div className="cart-wrapper checkout_details1">
                              <h5 className=" p-2  mb-4">
                                Add UPI ID
                              </h5>

                              <div className="col-md-12 col-xs-12 col-sm-12  mb-5">
                                <div className="row ">
                                  <div className="col-md-12 col-xs-12 col-sm-12">
                                    <div className="row">
                                      <div className="col-md-12 col-xs-12 col-sm-12 ">
                                        {/* <div className="company_name focus-visble input">
                                          <input
                                            type="text"
                                            className="add-payment-card"
                                            placeholder="UPI ID"
                                          />
                                          <small>
                                            *UPI ID format is mobilenumber@bank
                                            or name@bank
                                          </small>
                                        </div>{" "} */}

                                        <div className="alert alert-danger d-flex justify-content-even align-items-center" role="alert"><MdDangerous />&nbsp;Service not available now</div>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {isToggle === 3 ? (
                            <div className="cart-wrapper checkout_details1">
                              <h5 className=" p-2  mb-4">
                                Your Address
                              </h5>

                              <div className="col-md-6 col-xs-12 col-sm-12  mb-5">
                                <div className="checkout-address1">
                                  <div className="row">
                                    <div className="col-md-9">
                                      <h6 style={{ color: "#fc8181" }}>{isLocation.type}</h6>
                                    </div>
                                    <div className="col-md-3 d-flex justify-content-between">
                                      {/* <Link onClick={handleAddress}>
                                        <h6 className="checkout-icons">
                                          <GrEdit
                                            style={{ color: "#675d5d !importent" }}
                                          />

                                        </h6>
                                      </Link> */}
                                      {/* <Link>
                                        <h6 className="checkout-icons">
                                          <RiDeleteBin5Fill
                                            style={{ color: "red" }}
                                          />
                                        </h6>
                                      </Link> */}
                                    </div>
                                    {/* <hr /> */}
                                    {
                                      localAddress?.length > 0 ?
                                        <>
                                          <p className="checkout_address text-center pt-1 pb-3">
                                            <b>{`${billing.first_name}`}<br />
                                              {`${billing.street_address},`} {`${billing.apartment_suite_unit_etc},`}  {`${billing.city},`} <br />
                                              {`${billing.state}.`}&nbsp;{`${cookies.phone_number}`}
                                            </b>
                                          </p>
                                          {/* <p className="checkout_address text-center pt-1 pb-3">
                                            <b>{`${billing.FirstName}`}<br />
                                              {`${billing.AddressLine1},`} {`${billing.LandMark},`} {`${billing.AddressLine2}`}<br />
                                              {`${billing.City},`} {`${billing.State}.`}&nbsp;{`${billing.Phone}`}
                                            </b>
                                          </p> */}

                                        </> : <p className="checkout_address text-center pt-1 pb-3 text-muted"><b>Add A New Address</b></p>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                          <div className="col-md-12 col-xs-12 col-sm-12  mb-5">
                            <div className="row">
                              <div className="col-md-12 col-xs-12 col-sm-12">
                                <div className="row ">
                                  <div className="col-md-12 col-xs-12 col-sm-12  mb-3  checkour_active">
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                      />
                                      <label
                                        class={isToggle === 1 ? "form-check-label form-round-btn" : "form-check-label add-check"}
                                        for="flexRadioDefault1" onClick={() => handleClick(1)}
                                      >
                                        Credit/Debit Card
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-12 col-xs-12 col-sm-12  mb-3  checkour_active">
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        checked
                                      />
                                      <label
                                        class={isToggle === 2 ? "form-check-label form-round-btn" : "form-check-label add-check"}
                                        for="flexRadioDefault2"
                                        onClick={() => handleClick(2)}
                                      >
                                        UPI
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-12 col-xs-12 col-sm-12  mb-3  checkour_active">
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        checked
                                      />
                                      <label
                                        class={isToggle === 3 ? "form-check-label form-round-btn" : "form-check-label add-check"}
                                        for="flexRadioDefault2"
                                        onClick={() => handleClick(3)}
                                      >
                                        Cash On Delivery
                                      </label>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <button className="payment-btn" onClick={initpayment}>BACK</button>
                              {/* <Link to="/order-complete" > */}
                              <button className="payment-btn" onClick={handlepaymentOne}>Order Now</button>
                              {/* </Link> */}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-md-12 col-xs-12 col-sm-12  mb-5">
                            <div className="row">
                              <div className="company_name focus-visble visa-card input mb-5" >
                                <img
                                  src={img2}
                                  className="img img-responsive"
                                />
                              </div>
                              <div className="company_name focus-visble input" style={{ padding: "16px" }}>
                                <input
                                  type="text"
                                  className="add-payment-card"
                                  placeholder="Card Number"
                                />
                              </div>
                              <div className="company_name focus-visble input" style={{ padding: "16px" }}>
                                <input
                                  type="text"
                                  className="add-payment-card"
                                  placeholder="Cardholder Name"
                                />
                              </div>
                              <div className="col-md-6 col-xs-12 col-sm-12">
                                <div className="company_name focus-visble input" style={{ padding: "10px" }}>
                                  <input
                                    type="text"
                                    className="add-payment-card"
                                    placeholder="Expiry"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-xs-12 col-sm-12">
                                <div className="company_name focus-visble input" style={{ padding: "10px" }}>
                                  <input
                                    type="text"
                                    className="add-payment-card"
                                    placeholder="Security Code"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 col-xs-12 col-sm-12  ">
                              <button
                                onClick={initOpen}
                                className="checkout_button"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {/* 
                    <div className=" p-4  mb-6 mt-4"></div> */}
                  </>
                )}
              </div>
            </div>

            {/* <div className="col-md-4  prod-left">
              <div className="cart-sidebar">
                <div
                  className="card p-4 "
                  style={{
                    border: "none",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <div className="cart_totals ">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name pro-head">
                            <i class="fa-solid ">
                              <FaRupeeSign />
                            </i>
                            Cart totals
                          </th>
                          <hr />
                        </tr>
                      </thead>
                    </table>
                    <table cellspacing="0">
                      <tbody>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td>
                            <b className="b1">₹1,651.00</b>
                          </td>
                        </tr>
                        <tr className="cart-subtotal">
                          <th>Shipping</th>
                          <td>
                            <ul style={{ listStyle: "none" }}>
                              <li>
                                Flat rate: <b className="b1">₹50.00</b>
                              </li>
                              <li>Delivery: 2 - 5 days</li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="cart-subtotal">
                          <th>Total</th>
                          <td>
                            <span>
                              <b className="b1">₹1,701.00 </b>(includes{" "}
                              <b className="b1"> ₹137.14 </b>18% IGST,{" "}
                              <b className="b1">₹80.57</b> 12% IGST estimated
                              for India)
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </div>

  );
};

export default Checkout;