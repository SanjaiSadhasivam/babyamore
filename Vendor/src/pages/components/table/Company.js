import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
// import { API_URL } from "../../../utils/Api"
import { API_URL, token } from "../../../Api";

const API_Key = `${API_URL}/Companydetails`;
// const API_View = `${API_URL}/Maincategory_view`;
const API_Vendor = `${API_URL}/admin/vendors`;
const API_View = `${API_URL}/Product_image`;
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
} from "../../../components/Component";
import { Card, CardHeader, CardFooter, Badge, Label, FormGroup, Form } from "reactstrap";

import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

const company_Type = [
  {
    id: 1,
    name: "LLP",
  },
  {
    id: 2,
    name: "Private Limited",
  },
  {
    id: 3,
    name: "Public Limited",
  },
  {
    id: 4,
    name: "Sole Proprietorship",
  },
  {
    id: 5,
    name: "Partnership",
  },
];

const Company = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [files, setFiles] = useState([]);
  const [files1, setFiles1] = useState([]);
  const [GSTfile, setFilesGST] = useState([]);
  const [Foodfile, setFilesFood] = useState([]);
  const { errors, register, handleSubmit } = useForm();
  const [files2, setFiles2] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [cookies, setCookie] = useCookies();

  const [Registered, setRegistered] = useState(true);
  const Registeyes = () => setRegistered(true);
  const Registeyess = () => setRegistered(false);
  //gst
  const [GSTstate, setGSt] = useState(true);
  const GST = () => setGSt(true);
  const GSTS = () => setGSt(false);
  //food
  const [Foodstate, setFoodstate] = useState(true);
  const Foodproduct = () => setFoodstate(true);
  const Foodproducts = () => setFoodstate(false);
  const [IDS, setIDS] = useState();
  const [error, setError] = useState("");
  const [tokens, settoken] = useState();
  const [RegistrationCertificate, setRegistrationCertificate] = useState("");
  const [GSTRegistrationCertificate, setGSTRegistrationCertificate] = useState("");
  const [Foodimage, setFoodimage] = useState("");
  const [Pancardimages, setPancardimages] = useState("");
  const [authSing, setAuthSing] = useState("");
  const [Company, setCompany] = useState({
    NameOfBusiness: "",
    CompanyNumber: "",
    URLWebsite: "",
    Address: "",
    State: "",
    City: "",
    Street: "",
    Tan: "",
    Signatory: "",
    RegisteredCompany: true,
    GSTRegistered: true,
    FoodProduct: true,
    Pincode: "",
    LLP: 0,
    PrivateLimited: 1,
    PublicLimited: false,
    SoleProprietorship: false,
    Partnership: false,
    Others: false,
    CIN: "",
    GSTIN: "",
    PancardNumber: "",
    isActive:null,
  });

  const onFormSubmit = (e) => {};
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  useEffect(() => {
    // const TokenAccess = JSON.stringify(localStorage.getItem("accessToken"));
    if (cookies.vendor_id) {
      // setToken(Token._id)
      Getdata(cookies.vendor_id);
    }
  }, []);

  const Getdata = async (ids) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    const datas = await axios.get(`${API_Vendor}/${ids}`, config);
    
    // const data = await axios.post(`${API_Key}/Vendorid`, { Vendorid: ids })
    if (datas) {
      const {
        upload_gst_certificate,
        business_auth_sign_name,
        upload_register_certificate,
        upload_food_certificate,
        business_registered_name,
        store_name,
        gstin,
        email_address,
        phone_number,
        vendor_name,
        is_gst_registered,
        business_contact_no,
        business_address,
        business_state_id,
        business_city,
        business_street,
        is_registered_company,
        business_tan_no,
        business_auth_sign_no,
        is_selling_food,
        business_pincode,
        company_type,
        cin,
        isActive,
        business_pan,
        upload_pan,
      } = datas.data.list[0];
      setCompany({
        ...Company,
        NameOfBusiness: business_registered_name=="null"||business_registered_name=="" ? null:business_registered_name ,
        CompanyNumber: business_contact_no =="null"||business_contact_no==""? null:business_contact_no ,
        Address: business_address=="null"||business_address=="" ? null :business_address,
        State: business_state_id=="null"||business_state_id=="" ? null :business_state_id,
        City: business_city=="null"||business_city=="" ? null :business_city,
        Street: business_street=="null"||business_street=="" ? null :business_street,
        RegisteredCompany: is_registered_company=="null"||is_registered_company=="" ? null :is_registered_company==1?true:false,
        Tan: business_tan_no=="null"||business_tan_no=="" ? null :business_tan_no,
        Signatory: business_auth_sign_no=="null"||business_auth_sign_no=="" ?  null: business_auth_sign_no,
        GSTRegistered: is_gst_registered=="null"||is_gst_registered=="" ? null :is_gst_registered==1?true:false,
        FoodProduct: is_selling_food=="null"||is_selling_food=="" ? null :is_selling_food==1?true:false,
        Pincode: business_pincode=="null"||business_pincode=="" ? null : business_pincode,
        LLP: company_type=="null"||company_type=="" ? null :company_type,
        CIN: cin=="null"||cin=="" ? null :cin,
        GSTIN: gstin=="null"||gstin=="" ? null :gstin,
        PancardNumber: business_pan=="null"||business_pan=="" ? null :business_pan,
        isActive:isActive,
      });
      // setIDS(data.data[0]._id)
      setFilesGST([{ image: upload_gst_certificate }]);
      setFiles([{ image: upload_register_certificate }]);
      setFiles1([{ image: upload_pan }]);
      setFilesFood([{ image: upload_food_certificate }]);
      setFiles2([{ image: business_auth_sign_name }]);
      setRegistered(is_registered_company==1?true:false);
      setGSt(is_gst_registered==1?true:false);
      Foodproducts(is_selling_food==1?true:false )
    }
  };

  const onchange = ({ target: { name, value } }) => {
    setCompany({ ...Company, [name]: value });
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    setRegistrationCertificate(acceptedFiles[0]);
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChange1 = (acceptedFiles, set) => {
    setPancardimages(acceptedFiles[0]);
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChangeGST = (acceptedFiles, set) => {
    setGSTRegistrationCertificate(acceptedFiles[0]);
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChangeFood = (acceptedFiles, set) => {
    setFoodimage(acceptedFiles[0]);
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const handleDropChange2 = (acceptedFiles, set) => {
    setAuthSing(acceptedFiles[0]);
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handlesubmit = () => {
    if (!IDS) {
      Create();
    } else {
      Edit(IDS);
    }
  };

  const Create = async () => {
     try {
      let formData = new FormData();

      formData.append("tab_type", 2);
      formData.append("business_registered_name", Company.NameOfBusiness);
      formData.append("business_contact_no", Company.CompanyNumber);
      // formData.append("URLWebsite", Company.URLWebsite);
      formData.append("business_address", Company.Address);
      formData.append("business_state_id", Company.State);
      formData.append("business_city", Company.City);
      formData.append("business_street", Company.Street);
      formData.append("business_pincode", Company.Pincode);
      formData.append("business_tan_no", Company.Tan);
      formData.append("business_auth_sign_no", Company.Signatory);
      formData.append("is_registered_company", Company.RegisteredCompany?1:0);
      formData.append("is_gst_registered", Company.GSTRegistered?1:0);
      formData.append("is_selling_food", Company.FoodProduct?1:0);
      formData.append("company_type", Company.LLP);
      formData.append("PrivateLimited", Company.PrivateLimited);
      formData.append("PublicLimited", Company.PublicLimited);
      formData.append("SoleProprietorship", Company.SoleProprietorship);
      formData.append("Partnership", Company.Partnership);
      formData.append("Others", Company.Others);
      formData.append("cin", Company.CIN);
      formData.append("gstin", Company.GSTIN);
      formData.append("business_pan", Company.PancardNumber);
      formData.append("RegiterCertificate", RegistrationCertificate);
      formData.append("GetPan", Pancardimages);
      formData.append("GstCertificate", GSTRegistrationCertificate);
      formData.append("FoodCertificate", Foodimage);
      formData.append("AuthSignName", authSing);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      };
       const Result = await axios.put(`${API_Vendor}/${cookies.vendor_id}`, formData, config);
       setError("");
      if (Result) {
        Getdata(cookies.vendor_id);
        // setToggle(true);
     
        toast.success("Updated Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        //  Getdata(token)
      }
    } catch (error) {
      toast.error("Server Error", {
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
  };

  const Edit = async (IDS) => {
     let formData = new FormData();
    formData.append("Vendorid", token);
    formData.append("NameOfBusiness", Company.NameOfBusiness);
    formData.append("CompanyNumber", Company.CompanyNumber);
    formData.append("URLWebsite", Company.URLWebsite);
    formData.append("business_address", Company.Address);
    formData.append("business_state_id", Company.State);
    formData.append("business_city", Company.City);
    formData.append("Pincode", Company.Pincode);
    formData.append("RegisteredCompany", Company.RegisteredCompany);
    formData.append("GSTRegistered", Company.GSTRegistered);
    formData.append("is_selling_food", Company.FoodProduct);
    formData.append("LLP", Company.LLP);
    formData.append("PrivateLimited", Company.PrivateLimited);
    formData.append("PublicLimited", Company.PublicLimited);
    formData.append("SoleProprietorship", Company.SoleProprietorship);
    formData.append("Partnership", Company.Partnership);
    formData.append("Others", Company.Others);
    formData.append("CIN", Company.CIN);
    formData.append("GSTIN", Company.GSTIN);
    formData.append("PancardNumber", Company.PancardNumber);
    formData.append("RegisterImage", RegistrationCertificate);
    formData.append("PancardImage", Pancardimages);
    formData.append("GstImage", GSTRegistrationCertificate);
    formData.append("Foodimage", Foodimage);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.put(`${API_Key}/${IDS}`, formData, config).then((res) => {
      Getdata(token);
    });
  };

  const handleCompany = (id) => {
    // let val = event.target.value;
 
    setCompany({
      ...Company,
      LLP: id,
      // PrivateLimited: val,
    });
  };

  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>

        <Block className="container">
          {/* <Form className={formClass} disabled={Company.isActive==1?true:false} > */}
            <Row>
              <Col md={4} className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Name of Registered Business*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      disabled={Company.isActive==1?true:false}
                      id="fv-full-name"
                      name="NameOfBusiness"
                      value={Company.NameOfBusiness}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Name of Registered Business"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                    <span className="text-danger mt-2">{error}</span>
                  </div>
                </FormGroup>
              </Col>
              <Col md={4} className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Business Contact Number*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                    
                      type="number"
                      disabled={Company.isActive==1?true:false}
                      id="fv-full-name"
                      name="CompanyNumber"
                      value={Company.CompanyNumber}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Business Contact Number"
                      required
                      maxLength={10}
                      ref={register({ required: true })}
                      minLength={10}
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>

              <Col md={4} className="mb-3">
                <FormGroup>
                  <Label htmlFor="default-textarea" className="form-label">
                    Address*
                  </Label>
                  <div className="form-control-wrap">
                    <textarea
                      ref={register({ required: true })}
                      className="no-resize form-control"
                      type="textarea"
                      id="default-textarea"
 
                      name="Address"
                      disabled={Company.isActive==1?true:false}
                      cols="2"
                      value={Company.Address}
                      onChange={onchange}
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-topics">
                    State*
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select
                        ref={register({ required: true })}
                        name="State"              
                        value={Company.State}
                        disabled={Company.isActive==1?true:false}
                        onChange={onchange}
                        className="form-control form-select"
                        id="fv-topics"
                        placeholder="Select a option"
                        required
                      >
                        <option label="Select a state" value=""></option>
                        {Statelist.map((items) => {
                          return <option value={items.id}>{items.name}</option>;
                        })}
                      </select>
                      {errors.topics && <span className="invalid">This field is required</span>}
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    City*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                        ref={register({ required: true })}
                      name="City"
                      value={Company.City}
                      onChange={onchange}
                      type="text"
                      disabled={Company.isActive==1?true:false}
                      id="fv-full-name"
                      placeholder="Enter City"
                      className="form-control"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>

              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Street*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      name="Street"
                      value={Company.Street}
                      disabled={Company.isActive==1?true:false}
                      onChange={onchange}
                      type="text"
                      id="fv-full-name"
                      placeholder="Enter Street"
                      className="form-control"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>

              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Pincode*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      name="Pincode"
                      value={Company.Pincode}
                      disabled={Company.isActive==1?true:false}
                      onChange={onchange}
                      type="text"
                      id="fv-full-name"
                      placeholder="Enter Pincode"
                      className="form-control"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>

              <Col md="4" className="mb-3">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    PAN Number*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      name="Tan"
                      value={Company.Tan}
                      disabled={Company.isActive==1?true:false}
                      onChange={onchange}
                      type="text"
                      id="fv-full-name"
                      placeholder="Enter PAN Number"
                      className="form-control"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={4}>
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                    Name of Authorized Signatory
                  </Label>
                  <Dropzone
                    onDrop={(acceptedFiles) => handleDropChange2(acceptedFiles, setFiles2)}
                    accept={[".jpg", ".png", ".svg"]}
                    className="m-2 p-2"
                    disabled={Company.isActive==1?true:false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                          <input {...getInputProps()} />
                          {files2.length === 0 && (
                            <div className="dz-message">
                              <span className="dz-message-text">Drag & Drop a File</span>
                              <span className="dz-message-or">or</span>
                              <Button color="primary"disabled={Company.isActive==1?true:false}>
                                Upload
                              </Button>
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
                                    return <img src={`${API_View}/${file.image}`} alt="preview" />;
                                  } else if (file.preview) {
                                    return <img src={file.preview} alt="preview" />;
                                  } else {
                                    return (
                                      <div className="dz-message">
                                        <span className="dz-message-text">Drag & Drop a File</span>
                                        <span className="dz-message-or">or</span>
                                        <Button color="primary" disabled={Company.isActive==1?true:false}>
                                          Upload
                                        </Button>
                                      </div>
                                    );
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
              {/* <Col md={4}>
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                    Contact number authorized signatory
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
                              <Button color="primary">Upload</Button>
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
                                        <Button color="primary">Upload</Button>
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
              </Col> */}
              <Col md={4}>
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Contact Number*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      name="Signatory"
                      value={Company.Signatory}
                      onChange={onchange}
                      type="number"
                      disabled={Company.isActive==1?true:false}
                      id="fv-full-name"
                      placeholder="Enter Contact Number"
                      className="form-control"
                      required
                      maxLength={10}
                      ref={register({ required: true })}
                      minLength={10}
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Are You A Registered Company?*
                  </Label>
                  <ul className="custom-control-group g-3 align-center flex-wrap">
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          // ref={register({ required: true })}
                          type="radio"
                          className="custom-control-input form-control"
                          name="RegisteredCompany"
                          value={Company.RegisteredCompany}
                          onChange={(e) => setCompany({ ...Company, RegisteredCompany: true })}
                          id="reg-enable"
                          disabled={Company.isActive==1?true:false}
                          onClick={Registeyes}
                          required
                          checked={Company.RegisteredCompany?true:false}
                        />
                        <label className="custom-control-label" htmlFor="reg-enable">
                          Yes
                        </label>
                      </div>
                    </li>

                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          ref={register({ required: true })}
                          type="radio"
                          className="custom-control-input form-control"
                          name="RegisteredCompany"
                          value={Company.RegisteredCompany}
                          onChange={(e) => setCompany({ ...Company, RegisteredCompany: false })}
                          id="reg-request8"
                          disabled={Company.isActive==1?true:false}
                          onClick={Registeyess}
                          required
                          checked={Company.RegisteredCompany?false:true}
                        />
                        <label className="custom-control-label" htmlFor="reg-request8">
                          No
                        </label>
                      </div>
                    </li>
                  </ul>
                </FormGroup>
                <div className="row row m-0 p-2" style={{ backgroundColor: "#fff0f0" }}>
                  <div className="col-md-12">
                    {Registered ? (
                      <div>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <p className="form-label" htmlFor="fv-full-name">
                              Type Of The Company*
                            </p>
                          </div>
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-12 mb-1">
                                <ul>
                                  <li>
                                    <div>
                                       {company_Type.map((currEle) => {
                                        return (
                                          <>
                                            <div className="form-check">
                                              <input
                                                ref={register({ required: true })}
                                                className="form-check-input"
                                                type="radio"
                                                name="typeofcompany"
                                                value={currEle.id == Company.LLP ? currEle.id : null}
                                                checked={currEle.id == Company.LLP ? currEle.id : null}
                                                onChange={() => handleCompany(currEle.id)}
                                              />

                                              <label className="form-check-label" htmlFor="  LLP">
                                                {currEle.name}
                                              </label>
                                            </div>
                                          </>
                                        );
                                      })}

                                      {/* <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="typeofcompany"
                                          id="exampleRadios2"
                                          value={"Private Limited"}
                                          onChange={handleCompany}
                                        />
                                        <label className="form-check-label" htmlFor=" Private Limited">
                                          Private Limited
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="typeofcompany"
                                          id="exampleRadios2"
                                          value={" Public Limited"}
                                          onChange={handleCompany}
                                        />
                                        <label className="form-check-label" htmlFor="Public Limited">
                                          Public Limited
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="typeofcompany"
                                          id="exampleRadios2"
                                          value={"Sole Proprietorship"}
                                          onChange={handleCompany}
                                        />
                                        <label className="form-check-label" htmlFor=" Sole Proprietorship">
                                          Sole Proprietorship
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="typeofcompany"
                                          id="exampleRadios2"
                                          value={" Partnership"}
                                          onChange={handleCompany}
                                        />
                                        <label className="form-check-label" htmlFor="Partnership">
                                          Partnership
                                        </label>
                                      </div> */}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-12 mb-2">
                                <label className="form-label">Upload Registration Certificate</label>
                                <Dropzone
                                  onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
                                  accept={[".jpg", ".png", ".svg"]}
                                  disabled={Company.isActive==1?true:false}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <section>
                                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                                        <input {...getInputProps()} />
                                        {files.length === 0 && (
                                          <div className="dz-message">
                                            <span className="dz-message-text">Drag & Drop a File</span>
                                            <span className="dz-message-or">or</span>
                                            <Button color="primary">Upload</Button>
                                          </div>
                                        )}
                                        {files.map((file) => (
                                          <div
                                            key={file.name}
                                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                          >
                                            <div className="dz-image">
                                              {(() => {
                                                if (file.image) {
                                                  return <img src={`${API_View}/${file.image}`} alt="preview" />;
                                                } else if (file.preview) {
                                                  return <img src={file.preview} alt="preview" />;
                                                } else {
                                                  return (
                                                    <div className="dz-message">
                                                      <span className="dz-message-text">Drag & Drop a File</span>
                                                      <span className="dz-message-or">or</span>
                                                      <Button color="primary" disabled={Company.isActive==1?true:false}>
                                                        Upload
                                                      </Button>
                                                    </div>
                                                  );
                                                }
                                              })()}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </section>
                                  )}
                                </Dropzone>
                              </div>
                              <div className="col-md-12">
                                <input
                                  className="form-control"
                                  name="CIN"
                                  value={Company.CIN}
                                  disabled={Company.isActive==1?true:false}
                                  onChange={onchange}
                                  placeholder="Enter CIN"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <input
                              className="form-control"
                              name="PancardNumber"
                              value={Company.PancardNumber}
                              disabled={Company.isActive==1?true:false}
                              onChange={onchange}
                              placeholder="Enter PAN Number"
                              required
                            />
                          </div>
                          <div className="col-md-12 mb-2">
                            <label className="form-label">Upload Pancard</label>
                            <Dropzone
                              onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles, setFiles1)}
                              accept={[".jpg", ".png", ".svg"]}
                              disabled={Company.isActive==1?true:false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section>
                                  <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                                    <input {...getInputProps()} />
                                    {files1.length === 0 && (
                                      <div className="dz-message">
                                        <span className="dz-message-text">Drag & Drop a File</span>
                                        <span className="dz-message-or">or</span>
                                        <Button color="primary" disabled={Company.isActive==1?true:false}>
                                          Upload
                                        </Button>
                                      </div>
                                    )}
                                    {files1.map((file) => (
                                      <div
                                        key={file.name}
                                        className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                      >
                                        <div className="dz-image">
                                          {(() => {
                                            if (file.image) {
                                              return <img src={`${API_View}/${file.image}`} alt="preview" />;
                                            } else if (file.preview) {
                                              return <img src={file.preview} alt="preview" />;
                                            } else {
                                              return (
                                                <div className="dz-message">
                                                  <span className="dz-message-text">Drag & Drop a File</span>
                                                  <span className="dz-message-or">or</span>
                                                  <Button color="primary" disabled={Company.isActive==1?true:false}>
                                                    Upload
                                                  </Button>
                                                </div>
                                              );
                                            }
                                          })()}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Are You GST Registered?*
                  </Label>
                  <ul className="custom-control-group g-3 align-center flex-wrap">
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          ref={register({ required: true })}
                          type="radio"
                          required
                          className="custom-control-input form-control"
                          name="GSTRegistered"
                          value={Company.GSTRegistered}
                          onChange={(e) => setCompany({ ...Company, GSTRegistered: true })}
                          id="reg-enable1"
                          onClick={GST}
                          disabled={Company.isActive==1?true:false}
                          checked={Company.GSTRegistered?true:false}
                        />
                        <label className="custom-control-label" htmlFor="reg-enable1">
                          Yes
                        </label>
                      </div>
                    </li>

                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          required
                          className="custom-control-input form-control"
                          name="GSTRegistered"
                          value={Company.GSTRegistered}
                          onChange={(e) => setCompany({ ...Company, GSTRegistered: false })}
                          id="reg-request1"
                          disabled={Company.isActive==1?true:false}
                          onClick={GSTS}
                          checked={Company.GSTRegistered?false:true}
                        />
                        <label className="custom-control-label" htmlFor="reg-request1">
                          No
                        </label>
                      </div>
                    </li>
                  </ul>
                </FormGroup>
                <div className="row row m-0 p-2" style={{ backgroundColor: "#fff0f0" }}>
                  <div className="col-md-12">
                    {GSTstate ? (
                      <div>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <FormGroup>
                              <Label htmlFor="default-0" className="form-label">
                                GSTIN*
                              </Label>
                              <div className="form-control-wrap">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="default-0"
                                  name="GSTIN"
                                  disabled={Company.isActive==1?true:false}
                                  value={Company.GSTIN}
                                  onChange={onchange}
                                  placeholder="Enter GSTIN"
                                  required
                                />
                              </div>
                            </FormGroup>
                          </div>
                          <div className="col-md-12 mb-2">
                            <label className="form-label">Upload Registration Certificate</label>
                            <Dropzone
                              onDrop={(acceptedFiles) => handleDropChangeGST(acceptedFiles, setFilesGST)}
                              accept={[".jpg", ".png", ".svg"]}
                              disabled={Company.isActive==1?true:false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section>
                                  <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                                    <input {...getInputProps()} />
                                    {GSTfile.length === 0 && (
                                      <div className="dz-message">
                                        <span className="dz-message-text">Drag & Drop a File</span>
                                        <span className="dz-message-or">or</span>
                                        <Button color="primary" disabled={Company.isActive==1?true:false}>
                                          Upload
                                        </Button>
                                      </div>
                                    )}
                                    {GSTfile.map((file) => (
                                      <div
                                        key={file.name}
                                        className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                      >
                                        <div className="dz-image">
                                          {(() => {
                                            if (file.image) {
                                              return <img src={`${API_View}/${file.image}`} alt="preview" />;
                                            } else if (file.preview) {
                                              return <img src={file.preview} alt="preview" />;
                                            } else {
                                              return (
                                                <div className="dz-message">
                                                  <span className="dz-message-text">Drag & Drop a File</span>
                                                  <span className="dz-message-or">or</span>
                                                  <Button color="primary"disabled={Company.isActive==1?true:false}>
                                                    Upload
                                                  </Button>
                                                </div>
                                              );
                                            }
                                          })()}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Are You Selling Food Product ?*
                  </Label>
                  <ul className="custom-control-group g-3 align-center flex-wrap">
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          required
                          className="custom-control-input form-control"
                          name="FoodProduct"
                          disabled={Company.isActive==1?true:false}
                          value={Company.FoodProduct}
                          onChange={(e) => setCompany({ ...Company, FoodProduct: true })}
                          id="reg-enable3"
                          checked={Company.FoodProduct?true:false}
                          onClick={Foodproduct}
                        />
                        <label className="custom-control-label" htmlFor="reg-enable3">
                          Yes
                        </label>
                      </div>
                    </li>

                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          required
                          type="radio"
                          className="custom-control-input form-control"
                          name="FoodProduct"
                          disabled={Company.isActive==1?true:false}
                          value={Company.FoodProduct}
                          onChange={(e) => setCompany({ ...Company, FoodProduct: false })}
                          id="reg-request3"
                          onClick={Foodproducts}
                          checked={Company.FoodProduct?false:true}
                        />
                        <label className="custom-control-label" htmlFor="reg-request3">
                          No
                        </label>
                      </div>
                    </li>
                  </ul>
                </FormGroup>
                <div className="row m-0 p-2" style={{ backgroundColor: "#fff0f0" }}>
                  <div className="col-md-12">
                    {Foodstate ? (
                      <div>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <label className="form-label">Upload Food Certificate*</label>
                            <Dropzone
                              onDrop={(acceptedFiles) => handleDropChangeFood(acceptedFiles, setFilesFood)}
                              accept={[".jpg", ".png", ".svg"]}
                              disabled={Company.isActive==1?true:false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section>
                                  <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                                    <input {...getInputProps()} />
                                    {Foodfile.length === 0 && (
                                      <div className="dz-message">
                                        <span className="dz-message-text">Drag & Drop a File</span>
                                        <span className="dz-message-or">or</span>
                                        <Button color="primary" disabled={Company.isActive==1?true:false}>
                                          Upload
                                        </Button>
                                      </div>
                                    )}
                                    {Foodfile.map((file) => (
                                      <div
                                        key={file.name}
                                        className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                      >
                                        <div className="dz-image">
                                          {(() => {
                                            if (file.image) {
                                              return <img src={`${API_View}/${file.image}`} alt="preview" />;
                                            } else if (file.preview) {
                                              return <img src={file.preview} alt="preview" />;
                                            } else {
                                              return (
                                                <div className="dz-message">
                                                  <span className="dz-message-text">Drag & Drop a File</span>
                                                  <span className="dz-message-or">or</span>
                                                  <Button color="primary" disabled={Company.isActive==1?true:false}>Upload</Button>
                                                </div>
                                              );
                                            }
                                          })()}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            <Col md={12} className="text-right">
              <FormGroup>
                {
                  Company.isActive==1?null:


                <Button color="primary" type="submit" disabled={Company.isActive == 1 ? true : false} onClick={handlesubmit}>
                  <span>{IDS ? "UPDATE" : "SAVE"}</span>
                </Button>
                }
              </FormGroup>
            </Col>
          {/* </Form> */}
        </Block>
      </React.Fragment>
    </div>
  );
};
export default Company;
