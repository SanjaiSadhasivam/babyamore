import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
/* ------------------------------Packages----------------------------------- */
import { ToastContainer, toast } from "react-toastify";
import MyAccountSidebar from "../MyAccountSideBar/MyAccountSideBar";
import "./address.css";
import "../MyAccount/myaccount.css";
import { useCookies } from "react-cookie";
import {
  API_Order,
  token,
  API_CART,
  API_BillingAddress,
  API_BillingAddress_Userid,
  API_URL,
} from "../../config/config";
import axios from "axios";
// import { useForm } from "react-hook-form";
import Loading from "../LazyLoading/Loading";
/* ------------------------------Compnents----------------------------------- */
const API_DELETE = `${API_URL}/admin/BillingAddress/delete`;

const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Statelist = [
  {
    key: "AN",
    name: "Andaman and Nicobar Islands",
    id: 1,
  },
  {
    key: "AP",
    name: "Andhra Pradesh",
    id: 2,
  },
  {
    key: "AR",
    name: "Arunachal Pradesh",
    id: 3,
  },
  {
    key: "AS",
    name: "Assam",
    id: 4,
  },
  {
    key: "BR",
    name: "Bihar",
    id: 5,
  },
  {
    key: "CG",
    name: "Chandigarh",
    id: 6,
  },
  {
    key: "CH",
    name: "Chhattisgarh",
    id: 7,
  },
  {
    key: "DH",
    name: "Dadra and Nagar Haveli",
    id: 8,
  },
  {
    key: "DD",
    name: "Daman and Diu",
    id: 9,
  },
  {
    key: "DL",
    name: "Delhi",
    id: 10,
  },
  {
    key: "GA",
    name: "Goa",
    id: 11,
  },
  {
    key: "GJ",
    name: "Gujarat",
    id: 12,
  },
  {
    key: "HR",
    name: "Haryana",
    id: 13,
  },
  {
    key: "HP",
    name: "Himachal Pradesh",
    id: 14,
  },
  {
    key: "JK",
    name: "Jammu and Kashmir",
    id: 15,
  },
  {
    key: "JH",
    name: "Jharkhand",
    id: 16,
  },
  {
    key: "KA",
    name: "Karnataka",
    id: 17,
  },
  {
    key: "KL",
    name: "Kerala",
    id: 18,
  },
  {
    key: "LD",
    name: "Lakshadweep",
    id: 19,
  },
  {
    key: "MP",
    name: "Madhya Pradesh",
    id: 20,
  },
  {
    key: "MH",
    name: "Maharashtra",
    id: 21,
  },
  {
    key: "MN",
    name: "Manipur",
    id: 22,
  },
  {
    key: "ML",
    name: "Meghalaya",
    id: 23,
  },
  {
    key: "MZ",
    name: "Mizoram",
    id: 24,
  },
  {
    key: "NL",
    name: "Nagaland",
    id: 25,
  },
  {
    key: "OR",
    name: "Odisha",
    id: 26,
  },
  {
    key: "PY",
    name: "Puducherry",
    id: 27,
  },
  {
    key: "PB",
    name: "Punjab",
    id: 28,
  },
  {
    key: "RJ",
    name: "Rajasthan",
    id: 29,
  },
  {
    key: "SK",
    name: "Sikkim",
    id: 30,
  },
  {
    key: "TN",
    name: "Tamil Nadu",
    id: 31,
  },
  {
    key: "TS",
    name: "Telangana",
    id: 32,
  },
  {
    key: "TR",
    name: "Tripura",
    id: 33,
  },
  {
    key: "UK",
    name: "Uttar Pradesh",
    id: 34,
  },
  {
    key: "UP",
    name: "Uttarakhand",
    id: 35,
  },
  {
    key: "WB",
    name: "West Bengal",
    id: 36,
  },
];

const Address = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const proper = useLocation().state;
  const [isAdd, setIsAdd] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [addresss, setAddress] = useState([]);
  const [ID, setID] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  // const { errors, register } = useForm();
  const [userAddress, setuserAddress] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    streetAddress: "",
    apartment: "",
    city: "",
    pincode: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      handleEdit(proper);
    }
    getAddress();
  }, []);

  const getAddress = async () => {
    if (cookies.customer_id) {
      let result = await axios.get(
        `${API_BillingAddress_Userid}/${cookies.customer_id}`
      );
      if (result) {
        setAddress(result.data.list);
       
      }
    }
  };

  const handleChangeAddress = ({ target: { name, value } }) => {
    setuserAddress({ ...userAddress, [name]: value });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  const createUserAddress = async () => {
    try {
      const configss = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let formData = new FormData();
      formData.append("first_name", userAddress.firstName);
      formData.append("last_name", userAddress.lastName);
      formData.append("country", userAddress.country);
      formData.append("street_address", userAddress.streetAddress);
      formData.append("apartment_suite_unit_etc", userAddress.apartment);
      formData.append("city", userAddress.city);
      formData.append("state", userAddress.state);
      formData.append("pincode", userAddress.pincode);
      formData.append("phonenumber", userAddress.phone);
      formData.append("email_address", userAddress.email);
      formData.append("user_id", cookies.customer_id);

      const Result = await axios.post(API_BillingAddress, formData, configss);
      if (Result) {
        if (id) {
          navigate("/checkout")
        } else {
          scrollToTop();
          toast.success("Address Added Successfully", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
          });
          setIsAdd(false);
          getAddress();
          setuserAddress({
            ...userAddress,
            firstName: "",
            lastName: "",
            country: "",
            streetAddress: "",
            apartment: "",
            city: "",
            email: "",
            phone: "",
            pincode: "",
            state: "",
          });
        }


      }
    } catch (error) { }
  };
  const handleEdit = async (property) => {
    try {
      let {
        first_name,
        last_name,
        country,
        street_address,
        apartment_suite_unit_etc,
        city,
        state,
        pincode,
        phonenumber,
        email_address,
        id,
      } = property;
      setID(id);
      setuserAddress({
        ...userAddress,
        firstName: first_name,
        lastName: last_name,
        country: country,
        streetAddress: street_address,
        apartment: apartment_suite_unit_etc,
        city: city,
        email: email_address,
        phone: phonenumber,
        pincode: pincode,
        state: state,
      });
      setIsAdd(true);
    } catch (error) { }
  };

  const handleEditAddress = async () => {
    let formData = new FormData();
    formData.append("first_name", userAddress.firstName);
    formData.append("last_name", userAddress.lastName);
    formData.append("country", userAddress.country);
    formData.append("street_address", userAddress.streetAddress);
    formData.append("apartment_suite_unit_etc", userAddress.apartment);
    formData.append("city", userAddress.city);
    formData.append("state", userAddress.state);
    formData.append("pincode", userAddress.pincode);
    formData.append("phonenumber", userAddress.phone);
    formData.append("email_address", userAddress.email);
    formData.append("user_id", cookies.customer_id);

    const Result = await axios.put(
      `${API_BillingAddress}/${ID}`,
      formData,
      configss
    );
    if (Result) {
      if (id) {
        navigate('/checkout')
      }
      else {
        scrollToTop();
        setIsAdd(false);
        getAddress();
        setID("");
        removeCookie("rewardpoints");
      }

    }
  };

  const handleDelete = async (id) => {
    try {
      const configss = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.put(
        `${API_DELETE}/${id}`,
        { is_delete: 0 },
        configss
      );
      if (result) {
        toast.success("Address Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
        });
        getAddress();
      }
    } catch (error) { }
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    if (ID) {
      handleEditAddress();
    } else {
      createUserAddress();
    }
  };

  const handleBack = () => {
    setuserAddress({
      ...userAddress,
      firstName: "",
      lastName: "",
      country: "",
      streetAddress: "",
      apartment: "",
      city: "",
      email: "",
      phone: "",
      pincode: "",
      state: "",
    });
    setIsAdd(false);
    setID("");
  };

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const form__data = [
    {
      fname: "Rajesh",
      lname: "Saran",
      mails: "info@babymore.com",
      phones: "9876543210",
      addressOne: "No.3, ABC Street ",
      addressTwo: "Chennai,Tamil Nadu",
      place: "Nungambakkam",
      rcvdName: "Mr.Rajesh Saran",
    },
  ];


  const scrollTotops = () => {
    window.scrollTo({ top: 20, behavior: "smooth" })
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <MyAccountSidebar />
          <div className="col-md-9 wl-main">
            {isAdd ? (
              <div className="address mt-3 p-4">

                <form onSubmit={(e) => handlesubmit(e)}>
                  <div className="row">
                    {/* <div className="col-md-12 mb-3" >
                                        <form>
                                            <label for="exampleInputEmail1" class="form-label">Identifier / Name (Examples: "Office address," "Mary Jones," "MJ 2145," etc.) <span style={{ color: "red" }}>*</span></label>
                                            <input type="email" className="form-control rounded-pill form__focus" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </form>
                                        <div class="input-group mb-3">
                                            <div class="my-3">

                                                <input class="form-check-input mb-2 mx-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                <label for="exampleInputEmail1" class="form-label">Make this address the default billing address (optional)</label>
                                            </div>

                                        </div>
                                    </div> */}
                    <div className="col-md-6 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        First name <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"

                        className="form-control rounded-pill form__focus"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleChangeAddress}
                        value={userAddress.firstName}
                        name="firstName"
                        required
                      />

                    </div>
                    {/* <div className="col-md-12 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                      First name <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill form__focus"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleChangeAddress}
                        value={userAddress.firstName}
                        name="firstName"
                        required
                      />
                    </div>
 */}











                    <div className="col-md-6 mb-3">
                      <label for="exampleInputEmail2" class="form-label">
                        Last name <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill form__focus"
                        id="exampleInputEmail2"
                        aria-describedby="emailHelp"
                        onChange={handleChangeAddress}
                        value={userAddress.lastName}
                        name="lastName"
                        required

                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="exampleInputEmail3" class="form-label">
                        Select a country <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        className="form-select rounded-pill form__focus"
                        id="floatingSelect"

                        aria-label="Floating label select example"
                        onChange={handleChangeAddress}
                        value={userAddress.country}
                        name="country"
                        required
                      >
                        <option selected>select</option>
                        <option value="India">India</option>
                        {/* <option value="2">Two</option>
                                                <option value="3">Three</option> */}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        State <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        className="form-select rounded-pill form__focus"
                        id="floatingSelect"

                        aria-label="Floating label select example"
                        onChange={handleChangeAddress}
                        value={userAddress.state}
                        name="state"
                        required
                      >
                        <option selected>Andhara Pradesh</option>
                        {Statelist.map((currEle) => {
                          return (
                            <>
                              <option value={currEle.name} required>
                                {currEle.name}
                              </option>
                            </>
                          );
                        })}
                        <option value="2">Bihar</option>
                        <option value="3">Haryana</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Street address <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill form__focus"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="House number and street name"
                        onChange={handleChangeAddress}
                        value={userAddress.streetAddress}
                        name="streetAddress"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Apartment, suite, unit, etc. (optional){" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill form__focus"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Apartment, suite, unit, etc. (optional) "
                        onChange={handleChangeAddress}
                        value={userAddress.apartment}
                        name="apartment"
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        City <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill form__focus"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleChangeAddress}
                        value={userAddress.city}
                        name="city"
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        PIN Code <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill form__focus"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleChangeAddress}
                        value={userAddress.pincode}
                        name="pincode"
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Phone <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill form__focus"
                        aria-describedby="emailHelp"
                        onChange={handleChangeAddress}
                        value={userAddress.phone}
                        name="phone"
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Email address <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-pill form__focus"
                        aria-describedby="emailHelp"
                        onChange={handleChangeAddress}
                        value={userAddress.email}
                        name="email"
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleBack()}
                        className="address-back-btn mx-2" type="button"
                      >
                        Back
                      </button>
                      <button className="address-save-btn mx-2" type="submit">
                        {ID ? "Update" : "Save"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mt-4 m-3">
                <p style={{ fontFamily: "Samsung Sharp Sans Regular" }}>
                  Latest Used Addresses
                </p>
                {/* <h6 style={{ fontFamily: 'Samsung Sharp Sans Bold' }}>Billing Address</h6> */}
                {/* <button className="add-address-btn" onClick={() => { setIsAdd(true) }} style={{ fontFamily: 'Samsung Sharp Sans Bold' }}>Add</button> */}

                {/* <p className="addres-text-area text-muted mt-2" style={{ fontFamily: 'Samsung Sharp Sans Regular' }}>You have not set up this type of address yet.
                                </p> */}
                <div className="container p-0">
                  <div className="row">

                    {
                      addresss?.length > 0 ?
                        addresss.map((values) => {
                          return (
                            <>
                              <div className="col-md-6 mb-4 col-12">
                                <form>
                                  <div>
                                    {" "}
                                    <span
                                      style={{
                                        fontFamily: "Samsung Sharp Sans Bold",
                                      }}
                                    >
                                      Billing Address{" "}
                                    </span>{" "}
                                    <span
                                      style={{
                                        float: "right",
                                        fontFamily: "Samsung Sharp Sans Bold",
                                        color: "#fc8181",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <span
                                        onClick={() => {
                                          handleDelete(values.id);
                                        }}
                                      >
                                        Delete
                                      </span>{" "}
                                      |{" "}
                                      <span onClick={() => handleEdit(values)}>
                                        Edit
                                      </span>
                                    </span>
                                  </div>
                                  <div className="address-text-area">
                                    <strong>
                                      {values.first_name} {values.last_name}
                                    </strong>{" "}
                                    <br /> <br />
                                    <h6>
                                      {values.first_name} {values.last_name},
                                    </h6>
                                    <span>{values.street_address},</span> <br />
                                    <span>
                                      {values.apartment_suite_unit_etc},
                                    </span>{" "}
                                    <br />
                                    <span>{values.city},</span> <br />
                                    <span>{values.state},</span> <br />
                                    <span>{values.phonenumber},</span> <br />
                                    <span>{values.email_address}.</span> <br />
                                  </div>
                                </form>
                              </div>
                            </>
                          );
                        })
                        :
                       <>
                       <div className="mt-4 d-flex align-items-center justify-content-center">

                       <h5>No records found add the address</h5>


                       </div>
                       </>

                    }

                    {/* <div className="col-md-6  mb-4" >
                                            <form>
                                                {
                                                    form__data.map((values) => {
                                                        return (
                                                            <>
                                                                <div>  <span style={{ fontFamily: 'Samsung Sharp Sans Bold' }}>Shipping Address </span> <span style={{ float: 'right', fontFamily: 'Samsung Sharp Sans Bold', color: '#fc8181', cursor: 'pointer' }}>Duplicate | Delete | Edit</span></div>

                                                                <div className='address-text-area'>
                                                                    <strong>{values.rcvdName}</strong> <br /><br />
                                                                    <h6>{values.fname} {values.lname},</h6>
                                                                    <span>{values.addressOne},</span> <br />
                                                                    <span>{values.addressTwo},</span> <br />
                                                                    <span>{values.place},</span> <br />
                                                                    <span>{values.phones},</span> <br />
                                                                    <span>{values.mails}.</span> <br />
                                                                </div>

                                                            </>
                                                        )

                                                    })
                                                }

                                            </form>
                                        </div> */}
                  </div>
                </div>

                <button
                  className="add-billing-address-btn"
                  type="button"
                  onClick={() => {
                    setIsAdd(true);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                      /* you can also use 'auto' behaviour
                         in place of 'smooth' */
                    });
                  }}
                >
                  Add New Address
                </button>
              </div>
            )}
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
    </>
  );
};

export default Address;
