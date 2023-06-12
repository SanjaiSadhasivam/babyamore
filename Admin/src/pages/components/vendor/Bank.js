import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import './Profile.css'
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Block,
  Button,
  Row,
  Col,
} from "../../../components/Component";
import { Card, CardHeader, CardFooter, Badge, Label, FormGroup, Form } from "reactstrap"
import User1 from '../../../images/avatar/a-sm.jpg'
import './Profile.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import { API_URL, token } from '../../../Api'

const API_Key = `${API_URL}/Bank`;
const API_View = `${API_URL}/Product_image`;
const API_Vendor = `${API_URL}/admin/vendors`;

const Bank = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [files, setFiles] = useState([]);
  const [files1, setFiles1] = useState([]);
  const [GSTfile, setFilesGST] = useState([]);
  const [Foodfile, setFilesFood] = useState([]);
  const { errors, register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies();
  const [IDS, setIDS] = useState();
  const [toggle, setToggle] = useState(false);
  const [Registered, setRegistered] = useState(true)
  const Registeyes = () => setRegistered(!Registered)
  //gst
  const [GSTstate, setGSt] = useState(true)
  const GST = () => setGSt(!GSTstate)
  //food
  const [tokens, settoken] = useState();
  const [Foodstate, setFoodstate] = useState(true)
  const Foodproduct = () => setFoodstate(!Foodstate)
  const [UploadCheque, setUploadCheque] = useState('');
  const [error, setError] = useState("");
  const [Bank, setBank] = useState({
    UserName: "",
    BankName: "",
    AccountNumber: "",
    BranchName: "",
    IFSCCode: "",
    Micr: "",
    SwiftCode: "",
    ConfirmAccountNumber: "",

  });
  const ids = localStorage.getItem("MerchantView");

  useEffect(() => {
   
    if (ids) {
     
      Getdata(ids)
    }
  }, []);

  const Getdata = async (ids) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    // const data = await axios.post(`${API_Key}/Vendorid`, { Vendorid: ids })
    const datas = await axios.get(`${API_Vendor}/${ids}`, config)
    if (datas) {
      const { bank_account_name, bank_name, bank_account_no, bank_branch_name, bank_ifsc_code, bank_swift_code, bank_micr_code, bank_cancelled_cheque } = datas.data.list[0];
      setBank({
        ...Bank,
        UserName: bank_account_name ? bank_account_name : null,
        BankName: bank_name ? bank_name : null,
        AccountNumber: bank_account_no ? bank_account_no : null,
        BranchName: bank_branch_name ? bank_branch_name : null,
        IFSCCode: bank_ifsc_code ? bank_ifsc_code : null,
        SwiftCode: bank_swift_code ? bank_swift_code : null,
        Micr: bank_micr_code ? bank_micr_code : null,
        ConfirmAccountNumber: bank_account_no ? bank_account_no : null,
      })
      // setIDS(data.data[0]._id)
      setFiles2([{ image: bank_cancelled_cheque }]);
    }
  }


  const onchange = ({ target: { name, value } }) => {
    setBank({ ...Bank, [name]: value });
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    if (!IDS) {
      Create();
    } else {
      Edit(IDS);
    }
  }


  const Create = async () => {
    try {
      let formData = new FormData();
      formData.append("tab_type", 3);
      formData.append("bank_account_name", Bank.UserName);
      formData.append("bank_name", Bank.BankName);
      formData.append("bank_account_no", Bank.AccountNumber);
      formData.append("bank_branch_name", Bank.BranchName);
      formData.append("bank_ifsc_code", Bank.IFSCCode);
      formData.append("bank_swift_code", Bank.SwiftCode);
      formData.append("bank_micr_code", Bank.Micr);
      // formData.append("ConfirmAccountNumber", Bank.ConfirmAccountNumber);
      formData.append("CancelledCheque", UploadCheque);
      // formData.append("Vendorid", token);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      };
      if (Bank.AccountNumber == Bank.ConfirmAccountNumber) {
        const Result = await axios.put(`${API_Vendor}/${cookies.vendor_id}`, formData, config);
        if (Result) {
          Getdata();
          setToggle(true);
          setError("");
          toast.success('Updated Successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      else {
        setError("Account number and confirm account number is not match")
      }

      // Getdata(token)
      // alert("successfully Saved")
    } catch (error) {
      toast.error('Server Error', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }



  }
  const Edit = async (IDS) => {

    let formData = new FormData();
    formData.append("UserName", Bank.UserName);
    formData.append("BankName", Bank.BankName);
    formData.append("AccountNumber", Bank.AccountNumber);
    formData.append("BranchName", Bank.BranchName);
    formData.append("IFSCCode", Bank.IFSCCode);
    formData.append("SwiftCode", Bank.SwiftCode);
    formData.append("ConfirmAccountNumber", Bank.ConfirmAccountNumber);
    formData.append("UploadCheque", UploadCheque);
    formData.append("Vendorid", token);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };


    axios.put(`${API_Key}/${IDS}`, formData, config).then((res) => {

      alert("successfully Updated")

    });


  }

  const onFormSubmit = (e) => { };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });


  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    setUploadCheque(acceptedFiles[0])
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const [files2, setFiles2] = useState([]);

  const handleDropChange2 = (acceptedFiles, set) => {
    setUploadCheque(acceptedFiles[0])
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>
        <Block className="container">
          <Form className={formClass} onSubmit={handlesubmit}>
            <Row>
              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Name of Account Holder*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
                      name="UserName"
                  
                      value={Bank.UserName}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Name of Account Holder "
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                    Bank Name*
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="Enter Bank Name" name="BankName" 
                      value={Bank.BankName}
                      onChange={onchange}
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-topics">
                    Account Number*
                  </Label>
                  <div className="form-control-wrap">
                    <div >
                      <input
                        required
                        ref={register({ required: true })}
                        type="text"
                        id="fv-full-name"
                        name="AccountNumber"
 
                        value={Bank.AccountNumber}
                        onChange={onchange}
                        className="form-control"
                        placeholder="Enter Account Number "
                      />
                      {errors.topics && <span className="invalid">This field is required</span>}
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Confirm Account Number*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
                      name="ConfirmAccountNumber"
 
                      value={Bank.ConfirmAccountNumber}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Confirm Account Number "
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                    <span className="text-danger mt-2">{error}</span>
                  </div>
                </FormGroup>
              </Col>

              <Col md="4" className="mb-3">
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                    Branch Name*
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="Enter Branch Name" name="BranchName"  
                      value={Bank.BranchName}
                      required
                      onChange={onchange} />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    RTGS/IFSC code*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
 
                      name="IFSCCode"
                      value={Bank.IFSCCode}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter RTGS/IFSC code"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                    SWIFT Code
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" name="SwiftCode"
                      value={Bank.SwiftCode} 
                      onChange={onchange} placeholder="Enter SWIFT Code"
                      required
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    MICR Code
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      // ref={register({ required: true })}
                      type="text"
           
                      name="Micr"
                      value={Bank.Micr}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter MICR Code"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>

              <Col md="4" className="mb-3">
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                    Cancelled Cheque
                  </Label>
                  <Dropzone  
                    onDrop={(acceptedFiles) => handleDropChange2(acceptedFiles, setFiles2)}
                    accept={[".jpg", ".png", ".svg"]} className="m-2 p-2"
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                          <input {...getInputProps()} />
                          {files2.length === 0 && (
                            <div className="dz-message">
                              <span className="dz-message-text">Drag & Drop to Upload File</span>
                              <span className="dz-message-or">or</span>
                              <Button color="primary"  >Upload</Button>
                            </div>
                          )}
                          {files2.map((file) => (
                            <div
                              key={file.name}
                              className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                            >
                              <div className="dz-image">
                                {(() => {
                                  if (file.image) {
                                    return <img src={`${API_View}/${file.image}`} alt="preview" />
                                  } else if (file.preview) {
                                    return <img src={file.preview} alt="preview" />
                                  } else {
                                    return (
                                      <div className="dz-message">
                                        <span className="dz-message-text">Drag & Drop to Upload File</span>
                                        <span className="dz-message-or">or</span>
                                        <Button color="primary" type="button">Upload</Button>
                                      </div>
                                    )
                                  }
                                })()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </FormGroup>
              </Col>
              <Col md="12" className="text-right">
                <FormGroup>
                  <Button color="primary"  >
                    <span>{IDS ? 'UPDATE' : 'SAVE'}</span>
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Block>

      </React.Fragment >

    </div >
  );
};
export default Bank;
