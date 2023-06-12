import React, { Fragment, useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import './Profile.css'

import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    Button,
    Row,
    Col,
    BlockBetween,
    RSelect
} from "../../../components/Component";
import { Card, CardHeader, CardFooter, Badge } from "reactstrap"
import { FormGroup, Label, Input, Form } from "reactstrap";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import User1 from '../../../images/avatar/a-sm.jpg'
import './Profile.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from "reactstrap"
import { useCookies } from "react-cookie";
import axios from "axios";
import { API_URL, API_Banner, token } from "../../../Api";
const Role_Api = `${API_URL}/admin/userRoles`;
const API_View = `${API_URL}/Admin_Staff`;
const API_STAFF = `${API_URL}/admin/users`;
const API_Password_Change = `${API_URL}/admin/users/passwordchange`;
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const ChangePassword = () => {

    const [passState, setPassState] = useState(false);
    const [passState1, setPassState1] = useState(false);

    const [newpassword, setNewpassword] = useState("");
    const [Comfirmpassword, setComfirmpassword] = useState("");
    const [cookies, setCookie] = useCookies();

    const CookieID = cookies.user_id;
    // console.log("CookieID1", CookieID);

    const handleChangeNewpassword = (e) => {
        // console.log("new", e.target.value);
        setNewpassword(e.target.value)
    }

    const handleChangeConfirmpassword = (e) => {
        // console.log("confirm", e.target.value);
        setComfirmpassword(e.target.value)
    }

    const Submit = async () => {
        const password = newpassword;
        // console.log("password",password);
        if (newpassword != Comfirmpassword) {
            toast.warn("Password doesn't match", {
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
        else {
            // alert("password successfully updated")
            const { data } = await axios.put(`${API_Password_Change}/${CookieID}`, { password: password }, config);
            if(data){
                setNewpassword("");
                setComfirmpassword("");
                toast.success("Password updated Successfully", {
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
            
        }
    };

    const box = {
        width: "50%",
        margin: "auto",
        padding: "24px",
        boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)"
    }


    return (
        <div>
            <React.Fragment>
                <Head title="ChangePassword"></Head>


                <Block>
                    <div>
                        {/* <Form className="is-alter"> */}
                        <div style={box}>
                            <Row className="g-4">
                                <Col md="12">
                                    <FormGroup>
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="password">
                                                New Password
                                            </label>
                                        </div>
                                        <div className="form-control-wrap">
                                            <a
                                                href="#password"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    setPassState(!passState);
                                                }}
                                                className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                                            >
                                                <Icon name="eye" className="passcode-icon icon-show"></Icon>

                                                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                            </a>
                                            <input
                                                type={passState ? "text" : "password"}
                                                name="newpassword"
                                                onChange={(e) => handleChangeNewpassword(e)}
                                                value={newpassword}
                                                autoComplete="do-not-autofill"
                                                // ref={register({ required: "This field is required" })}
                                                placeholder="Enter your new password"
                                                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                                                required
                                            />

                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="12">
                                    <FormGroup>
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="password">
                                                Confirm Password
                                            </label>
                                        </div>
                                        <div className="form-control-wrap">
                                            <a
                                                href="#password"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    setPassState1(!passState1);
                                                }}
                                                className={`form-icon lg form-icon-right passcode-switch ${passState1 ? "is-hidden" : "is-shown"}`}
                                            >
                                                <Icon name="eye" className="passcode-icon icon-show"></Icon>

                                                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                            </a>
                                            <input
                                                type={passState1 ? "text" : "password"}
                                                name="confirmpassword"
                                                onChange={(e) => handleChangeConfirmpassword(e)}
                                                value={Comfirmpassword}
                                                autoComplete="do-not-autofill"
                                                // ref={register({ required: "This field is required" })}
                                                placeholder="Enter your confirm password"
                                                className={`form-control-lg form-control ${passState1 ? "is-hidden" : "is-shown"}`}
                                                required
                                            />

                                        </div>
                                    </FormGroup>
                                </Col>

                                <Col md="12" className="d-flex justify-content-end">
                                    <FormGroup>
                                        <Button size="lg" className="btn-block" type="submit" color="primary" onClick={Submit}>
                                            SAVE
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        {/* </Form> */}
                    </div>

                </Block>

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
            </React.Fragment>

        </div>
    );
};
export default ChangePassword;
