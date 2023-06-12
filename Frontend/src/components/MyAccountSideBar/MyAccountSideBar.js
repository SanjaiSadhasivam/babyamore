import React, { useState ,useEffect} from "react";
import { BsPersonCircle,BsFillCameraFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "./MyAccountSideBar.css";
import {  API_URL ,token} from "../../config/config";
import { Button, Modal, ModalBody } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "axios";

const API_View = `${API_URL}/Product_image`;
const customer_api = `${API_URL}/admin/customers`;
const config = {
  headers: {
    "content-type": "multipart/form-data",
    // Authorization: `Bearer ${Auths} ` 
    Authorization: `Bearer ${token}`,
  },
};
function MyAccountSidebar() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "",
      color: isActive ? "#fc8181" : "",
    };
  };
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
  const [ID, setID] = useState();
  
  useEffect(() => {
    getCustomerData();
    setID(cookies.customer_id);
  }, []);
  const getCustomerData = async () => {
    let res = await axios.get(`${customer_api}/${cookies.customer_id}`, config);
    if (res) {

      setFiles([{ image: res.data.list[0].avatar }]);
      // Setgetpassword(res.data.list[0].password)
    }
  };

  const Logout = () => {
    toast.success("Sign Out Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      window.location.replace("/login");
      removeCookie("email_address");
      removeCookie("fullName");
      removeCookie("accesstoken");
      removeCookie("phone_number");
      removeCookie("customer_id");
    }, 1500);
  };

  return (
    <>
      <div className="col-md-3">
        <div className="account-container-left">
          <div className="my-acc-sidebar ">
            <div class="file file--upload">
            
            
            </div>
           
            <ul className="my-acc-sidebar-name"> 
             
            
                   
                      {/* <div {...getRootProps()} className="dropzone upload-zone dz-clickable"> */}
                        {/* <input {...getInputProps()} /> */}
                         {files.length === 0 && (
                          <div className="dz-message">
                           
                <label for="input-file border-rnd">
        <BsFillCameraFill className="my-acc-icon" />
              </label>
                          
                           </div>
                        )} 
                        {files.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete d-flex"
                            
                          >
                            {/* <div className="dz-image"> */}
                              {(() => {
                                if (file.image) {
                                  return <img src={`${API_View}/${file.image}`} alt="preview"  style={{borderRadius:"50%",border:"1px solid red",height:"100px",width:"100px",objectFit:"contain"}} />;
                                } else if (file.preview) {
                                  return <img src={file.preview} alt="preview"  style={{borderRadius:"50%",border:"1px solid red",height:"100px",width:"100px",objectFit:"contain"}} />;
                                } else {
                                  return (
                                    <div className="dz-message"> 
                                      {/* <span className="dz-message-text">Drag & Drop to Upload File</span> */}
                                      {/* <span className="dz-message-or">or</span> */}
                                      {/* <Button color="primary">Upload</Button> */}
                                    </div>
                                  );
                                }
                              })()}
                            {/* </div> */}
                          </div>
                        ))}
                      {/* </div> */}
                   
                
               
            
              {/* <BsPersonCircle className="my-acc-icon" /> */}
              {/* <li>Hello <span> {cookies.fullName ? cookies.fullName === 'undefined'? cookies.cookies.email_address.slice(0, cookies.cookies.email_address.indexOf('@')): cookies.fullName.substring(0, 18) :"Sign in"} </span></li> */}
            </ul>
            {/* <div className="col-md-10 mt-2"> */}
              
              {/* </div> */}

            <ul className="my-acc-sidebar-list  list-unstyled">
              <NavLink to="/myaccount" style={navLinkStyles}>
                <div className="account-card">
                  <li>Dashboard</li>
                </div>
              </NavLink>
              <NavLink to="/recentorders" style={navLinkStyles}>
                <div className="account-card">
                  <li>Orders</li>
                </div>
              </NavLink>
              <NavLink to="/myrewards" style={navLinkStyles}>
                <div className="account-card">
                  <li>My Reward</li>
                </div>
              </NavLink>
              <NavLink to="/Address" style={navLinkStyles}>
                <div className="account-card">
                  <li>Addresses</li>
                </div>
              </NavLink>
              <NavLink to="/accountdetails" style={navLinkStyles}>
                <div className="account-card">
                  <li>Account Details </li>
                </div>
              </NavLink>
              <NavLink to="/changepassword" style={navLinkStyles}>
                <div className="account-card">
                  <li>Change Password</li>
                </div>
              </NavLink>
              <NavLink style={navLinkStyles} onClick={Logout}>
                <div className="account-card">
                  <li style={{ color: "#000" }}>Sign Out</li>
                </div>
              </NavLink>
            </ul>
          </div>
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
      </div>
    </>
  );
}

export default MyAccountSidebar;
