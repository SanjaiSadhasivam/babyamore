import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyAccountSidebar from "../MyAccountSideBar/MyAccountSideBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { API_URL, token, API_Register } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { BsPersonCircle,BsFillCameraFill } from "react-icons/bs";
import Dropzone from "react-dropzone";
const customer_api = `${API_URL}/admin/customers`;
const config = {
  headers: {
    "content-type": "multipart/form-data",
    // Authorization: `Bearer ${Auths} ` 
    Authorization: `Bearer ${token}`,
  },
};
// import {  API_URL} from "../../config/config";


const API_View = `${API_URL}/Product_image`;

function Accountdetails() {
  const [cnfmpasswordType, setCnfmpasswordType] = useState(false);
  const [passwordType, setpasswordType] = useState(false);

  const [getpassword, Setgetpassword] = useState("");

  const [isAdd, setIsAdd] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  // console.log("cookies id", cookies.customer_id);
  const [customerDetail, setCustomerDetail] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const [details, setDetails] = useState();
  const [files, setFiles] = useState([]);
  const [logo, setlogo] = useState("");
  const handleDropChange = (acceptedFiles, set) => {
    setlogo(acceptedFiles[0]);
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const handleChange = ({ target: { name, value } }) => {
    setCustomerDetail({ ...customerDetail, [name]: value });
  };

  const [ID, setID] = useState();


  useEffect(() => {
    getCustomerData();
    setID(cookies.customer_id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    EditDiscount(ID);
  };
  // console.log("passwordd", getpassword);
  // console.log("passworddd", customerDetail.password);

  const EditDiscount = async (ID) => {
    // console.log(ID, "1111");
    console.log(logo,"ppppppppp");
    let formData = new FormData();
    formData.append("customer_id", cookies.customer_id);
    formData.append("full_name", customerDetail.full_name);
    formData.append("email_address", customerDetail.email_address);
    formData.append("avatar", logo);
    formData.append("phone_number", customerDetail.phone_number);

   
    await axios.put(`${API_Register}/${ID}`, formData, config).then((res) => {
      // console.log(res, "09090909090");
      if (res.data.statusCode == 200) {
        toast.success("Details updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      } 
      else {

        toast.error("Invalid", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })
    console.log(formData,"formData");
  };

  // console.log("Error Hndling", details);

  const getCustomerData = async () => {
    let res = await axios.get(`${customer_api}/${cookies.customer_id}`, config);
    if (res) {
      setCustomerDetail({
        full_name: res.data.list[0].full_name,
        email_address: res.data.list[0].email_address,
        phone_number: res.data.list[0].phone_number,
        // password : res.data.list[0].password,
      });
      setFiles([{ image: res.data.list[0].avatar }]);
      Setgetpassword(res.data.list[0].password)
    }
  };

  const CnfmPwEyeIcon = {
    position: "absolute",
    right: "11px",
    bottom: "10px",
  }
  const eyeicon = {
    width: "17px",
    height: "17px",
  }
  const handleCnfmPwdIconChange = () => {
    setCnfmpasswordType(!cnfmpasswordType);
  }
  const handlePwdIconChange = () => {
    setpasswordType(!passwordType);
  }
  const cnfmpwInput = {
    height: "43px",
    paddingLeft: "10px",
    width: "100%",
    marginBottom: "0px",
  }
  // console.log("passwordType", passwordType);
  return (
    <>
      <div className="container">
        <div className="row">
          <MyAccountSidebar />

          <div className="col-md-9">
            
            <form onSubmit={handleSubmit}>
              <div className="row ">
                
              <ul className="my-acc-sidebar-name"> 
              <span style={{margin:"0px 10px 0px 15px",color:"black",fontSize:".9em",fontWeight: "bold" }}>Profile Image*</span>
             <Dropzone
                 onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
                 accept={[".jpg", ".png", ".svg"]}
               >
                 {({ getRootProps, getInputProps }) => (
                  
                     <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                       <input {...getInputProps()} />
                        {files.length === 0 && (
                         <div className="dz-message">
                          
               <label for="input-file border-rnd">
       <BsFillCameraFill className="my-acc-icon" />
             </label>
                         
                          </div>
                       )} 
                      {console.log(files,"ooooooooooo")}
                       {files.map((file) => (
                         <div
                           key={file.name}
                           className="dz-preview dz-processing dz-image-preview dz-error dz-complete d-flex"
                           
                         >
                           {/* <div className="dz-image"> */}
                             {(() => {
                               if (file.image) {
                                 return <img src={`${API_View}/${file.image}`} alt="preview" style={{borderRadius:"50%",border:"1px solid red",height:"100px",width:"100px",objectFit:"contain"}} />;
                               } else if (file.preview) {
                                 return <img src={file.preview} alt="preview"   style={{borderRadius:"50%",border:"1px solid red",height:"100px",width:"100px",objectFit:"contain"}} />;
                               } else {
                                 return (
                                   <div className="dz-message"> 
                                     {/* <span className="dz-message-text">Drag & Drop to Upload File</span> */}
                                     {/* <span className="dz-message-or">or</span> */}
                                     <Button color="primary">Upload</Button>
                                   </div>
                                 );
                               }
                             })()}
                           {/* </div> */}
                         </div>
                       ))}
                     </div>
                  
                 )}
               </Dropzone>
           
             {/* <BsPersonCircle className="my-acc-icon" /> */}
             {/* <li>Hello <span> {cookies.fullName ? cookies.fullName === 'undefined'? cookies.cookies.email_address.slice(0, cookies.cookies.email_address.indexOf('@')): cookies.fullName.substring(0, 18) :"Sign in"} </span></li> */}
           </ul>
                <div className="col-md-12 mb-3">
                  <label
                    class="form-label"
                    style={{ fontSize: ".9em", fontWeight: "bold" }}
                  >
                    Mobile Number <span style={{ color: "black" }}>*</span>
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text">91+</span>
                    <input
                      type="number"
                      onmousewheel="return false;"
                      onWheelCapture={(e) => {
                        e.target.blur();
                      }}
                      onChange={handleChange}
                      name="phone_number"
                      value={customerDetail.phone_number}
                      className="form-control form__focus"
                      placeholder="Mobile Number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                {/* <div className="col-md-6 mb-3" >
                                    <label class="form-label" style={{ fontSize: '.9em', fontWeight: 'bold' }}>First name <span style={{ color: "black" }}>*</span> </label>
                                    <input type="text" className="form-control rounded-pill form__focus" placeholder="first name" />
                                </div>
                                <div className="col-md-6 mb-3" style={{ fontSize: '.9em', fontWeight: 'bold' }}>
                                    <label class="form-label">Last name <span style={{ color: "black" }}>*</span> </label>
                                    <input type="text" className="form-control rounded-pill form__focus" placeholder="last name" />
                                </div> */}
                <div
                  className="col-md-12 mb-3"
                  style={{ fontSize: ".9em", fontWeight: "bold" }}
                >
                  <label class="form-label">
                    Full Name <span style={{ color: "black" }}>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill form__focus"
                    placeholder="Enter Your Full Name"
                    onChange={handleChange}
                    name="full_name"
                    value={customerDetail.full_name}
                  />
                  <label class="form-label text-muted">
                    <em>
                      This will be how your name will be displayed in the
                      account section and in reviews
                    </em>
                  </label>
                </div>

                <div
                  className="col-md-12 mb-3"
                  style={{ fontSize: ".9em", fontWeight: "bold" }}
                >
                  <label class="form-label">
                    Email <span style={{ color: "black" }}>*</span>{" "}
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill form__focus"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    name="email_address"
                    value={customerDetail.email_address}
                  />
                </div>
                {/* <div>
                  <span class=" text-muted" style={{ fontSize: "1em" }}>
                    <strong>PASSWORD CHANGE</strong>
                  </span>
                  <hr />
                </div> */}
                {/* <div className="col-md-12 mb-3" >
                                    <label class="form-label"><strong>Current password (leave blank to leave unchanged) </strong></label>
                                    <input type="password" className="form-control rounded-pill form__focus" placeholder="abc@gmail.com" />
                                </div> */}
                {/* <div className="col-md-12 mb-4">
                  <label class="form-label">
                    <strong>
                      New password (leave blank to leave unchanged)
                    </strong>
                  </label>
                  <div className="position-relative">
                    <input
                      type={passwordType ? "text" : "password"}
                      className="form-control rounded-pill form__focus pl-2"
                      onChange={handleChange}
                      name="password"
                      value={customerDetail.password}
                      placeholder="Enter Password"
                      style={cnfmpwInput}
                    />
                    <span style={CnfmPwEyeIcon} onClick={handlePwdIconChange}>
                      <a>
                        {passwordType ? <AiOutlineEye style={eyeicon} /> : <AiOutlineEyeInvisible style={eyeicon} />}
                      </a>
                    </span>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label class="form-label">
                    <strong>Confirm new password</strong>
                  </label>
                  <div className="position-relative">
                    <input
                      type={cnfmpasswordType ? "text" : "password"}
                      className="form-control rounded-pill form__focus pl-2"
                      onChange={handleChange}
                      name="confirm_password"
                      value={customerDetail.confirm_password}
                      placeholder="Enter Confirm Password"
                      style={cnfmpwInput}
                    />
                    <span style={CnfmPwEyeIcon} onClick={handleCnfmPwdIconChange}>
                      {cnfmpasswordType ? <AiOutlineEye style={eyeicon} /> : <AiOutlineEyeInvisible style={eyeicon} />}
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="text-center">
                <Link to="/myaccount">
                  {" "}
                  <button className="address-back-btn mx-2">Back</button>
                </Link>
                <button className="address-save-btn mx-2" type="submit">
                  Save
                </button>
              </div>

              <ToastContainer
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
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accountdetails;