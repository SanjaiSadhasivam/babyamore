import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/**--------------------------Components---------------------------------- */
import { ToastContainer, toast } from "react-toastify";

import MyAccountSidebar from '../MyAccountSideBar/MyAccountSideBar';
// import './recentorders.css'
import axios from "axios";
import { useCookies } from "react-cookie";
import { API_URL, token } from "../../config/config";

const API_ChangePassword = `${API_URL}/admin/customers/updatepassword`;
const config = {
    headers: {
        "content-type": "multipart/form-data",
        // Authorization: `Bearer ${Auths} `
        Authorization: `Bearer ${token}`,
    },
};
function ChangePassword() {

    const [passwordType, setpasswordType] = useState(false);
    const [cnfmpasswordType, setCnfmpasswordType] = useState(false);

    const [newpassword, setNewpassword] = useState("");
    const [Comfirmpassword, setComfirmpassword] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies();
    // console.log("cookies id", cookies.customer_id);
    // const handleChange = ({ target: { name, value } }) => {
    //     // setCustomerDetail({ ...customerDetail, [name]: value });
    // };
    const handleCnfmPwdIconChange = () => {
        setCnfmpasswordType(!cnfmpasswordType);
    }

    const handlePwdIconChange = () => {
        setpasswordType(!passwordType);
    }
    const handleChangeNewpassword = (e) => {
        // console.log("new", e.target.value);
        setNewpassword(e.target.value);
    }

    const handleChangeConfirmpassword = (e) => {
        // console.log("confirm", e.target.value);
        setComfirmpassword(e.target.value);
    }
    const Submit = async (e) => {
       
        // const password = newpassword;
        // console.log("password",password);
        // if (newpassword != Comfirmpassword) {
        //     toast.warn("Password doesn't match", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        // }
        // else {
        //     // alert("password successfully updated")
        //     const { data } = await axios.put(`${API_Password_Change}/${CookieID}`, { password: password }, config);
        //     if(data){
        //         setNewpassword("");
        //         setComfirmpassword("");
        //         toast.success("Password updated Successfully", {
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: false,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     }

        // }
        let formData = new FormData();
        formData.append("password", newpassword);
        formData.append("confirm_password", Comfirmpassword);
        // console.log("formdata",...formData)
        await axios.put(`${API_ChangePassword}/${cookies.customer_id}`, formData, config).then((res) => {
            // console.log(res, "09090909090");
            if (res.data.statusCode == 200) {
                setNewpassword("");
                setComfirmpassword("");
                toast.success("Password Updated Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // window.location.reload();
            }
        }).catch(function (error) {
            toast.warn("Passwords must be same", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
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

    const cnfmpwInput = {
        height: "43px",
        paddingLeft: "15px",
        width: "100%",
        marginBottom: "0px",
    }
    return (
        <>

            <div className='container'>
                <form className="form">
                      <div className='row'>
                    <MyAccountSidebar />
                    <div className='col-md-9 mt-5 mb-3 container'>
                        <div className='p-3'>

                            <div>
                                <h4 className='mr-5 text-bold'><strong>Change Password</strong></h4>
                            </div>

                            <div className='row mt-4'>
                                <div className="col-md-12 mb-4">
                                    <label class="form-label">
                                        <strong>
                                            New password
                                        </strong>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type={passwordType ? "text" : "password"}
                                            className="form-control rounded-pill form__focus pl-2"
                                            onChange={(e) => handleChangeNewpassword(e)}
                                            name="password"
                                            value={newpassword}
                                            minLength={8}
                                            // maxLength={15}
                                            autocomplete="false"
                                            placeholder="Enter Password"
                                            style={cnfmpwInput}
                                            required
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
                                            onChange={(e) => handleChangeConfirmpassword(e)}
                                            name="confirm_password"
                                            value={Comfirmpassword}
                                            minLength={8}
                                            // maxLength={15}
                                            placeholder="Enter Confirm Password"
                                            style={cnfmpwInput}
                                            autocomplete="false"
                                            required
                                        />
                                        <span style={CnfmPwEyeIcon} onClick={handleCnfmPwdIconChange}>
                                            {cnfmpasswordType ? <AiOutlineEye style={eyeicon} /> : <AiOutlineEyeInvisible style={eyeicon} />}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button className="address-back-btn mx-2" type="button" onClick={Submit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                </form>

              
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
                ></ToastContainer>
            </div>


        </>
    );
}

export default ChangePassword;