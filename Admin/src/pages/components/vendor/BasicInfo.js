import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
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

} from "../../../components/Component";
import { FormGroup, Label, Input, } from "reactstrap";
import Dropzone from "react-dropzone";
import { useCookies } from 'react-cookie';
import './Profile.css'
import 'react-circular-progressbar/dist/styles.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from "reactstrap"
import axios from "axios";
// import { API_URL, token } from "../../../utils/Api"
import { API_URL, token } from '../../../Api'

const API_Key = `${API_URL}/BasicInfo`;
const API_Vendor = `${API_URL}/admin/vendors`
// const API_Vendor = `${API_URL}/UserVendor`
const API_View = `${API_URL}/Product_image`;



const BasicInfo = ({ userDetail }) => {

  const [sm, updateSm] = useState(false);
  const [tokens, setToken] = useState();
  const [IDS, setIDS] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const [tooltipOpen, settooltipOpen] = useState(false);
  const toggle2 = () => { settooltipOpen(!tooltipOpen) };
  const [StoreName, setStoreName] = useState(false);
  const toggle3 = () => { setStoreName(!StoreName) };
  const [ShopUrlName, setShopUrlName] = useState(false);
  const toggle4 = () => { setShopUrlName(!ShopUrlName) };
  const [files, setFiles] = useState([]);
  const [logo, setlogo] = useState('');
  const [cookies, setCookie] = useCookies();
  const [toggles, setToggle] = useState(false);
  const [Basic, setBasic] = useState({
    VendorId: '',
    UserName: "",
    Name: "",
    MobileNumber: "",
    StoreName: "",
    Description: "",
    ShopUrlName: "",
    email_address: "",
    phone_number:"",
    StoreLogo: "",
    CompanyName: "",
    Email: "",
    ProfileImage: ""
  });

  //file upload
  const handleDropChange = (acceptedFiles, set) => {
    setlogo(acceptedFiles[0])
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const onchange = ({ target: { name, value } }) => {
    setBasic({ ...Basic, [name]: value });
  }
  const ids = localStorage.getItem("MerchantView");
  useEffect(() => {
    // const Token = JSON.stringify(localStorage.getItem("accessToken"))
    if (ids) {
      // setToken(Token._id)
      Getdata(ids)
    }
  }, []);

  const Getdata = async (ids) => {
    // const data = await axios.post(`${API_Key}/Vendorid`, { Vendorid: ids })
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    const datas = await axios.get(`${API_Vendor}/${ids}`, config);
    if (datas) {
      const { store_url, email_address, business_registered_name, store_about, store_name, gstin, phone_number, vendor_name, store_logo } = datas.data.list[0];
      setFiles([{ image: store_logo }])
      setBasic({
        ...Basic,
        Name: vendor_name ? vendor_name : null,
        StoreName: store_name ? store_name : null,
        Description: store_about ? store_about : null,
        ShopUrlName: store_url ? store_url : null,
        StoreLogo: store_logo,
        email_address: email_address,
        phone_number:phone_number,
        CompanyName: business_registered_name ? business_registered_name : null,
        // ProfileImage: datas.data?.ProfileImage,

      })
    }

    // setIDS(data.data[0]?._id)

  }

  const handlesubmit = () => {
    if (!IDS) {
      Create();
    } else {
      Edit(IDS);
    }
  }

  const Create = async () => {

    try {
      let formData = new FormData();

      formData.append("tab_type", 1);

      formData.append("vendor_name", Basic.Name);
      formData.append("store_name", Basic.StoreName);
      formData.append("store_about", Basic.Description);
      formData.append("store_url", Basic.ShopUrlName);
      formData.append("StoreLogo", logo);


      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      };

      const datass = await axios.put(`${API_Vendor}/${cookies.vendor_id}`, formData, config);
      if (datass) {
        Getdata();
        setToggle(true);
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



        Getdata(token)
      }
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
    formData.append("vendor_name", Basic.Email);
    formData.append("MobileNumber", Basic.MobileNumber);
    formData.append("Name", Basic.CompanyName);
    formData.append("StoreName", Basic.StoreName);
    formData.append("Description", Basic.Description);
    formData.append("ShopUrlName", Basic.ShopUrlName);
    formData.append("StoreLogo", logo);
    formData.append("Vendorid", Basic.VendorId);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const datas = await axios.put(`${API_Key}/${IDS}`, formData, config)
    if (datas) {
      Getdata(token)
    };
  }

  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>


        <Block>
          <Row className="container ">
            <Col md={5} >
              <div className="p-3">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h6>Registration Details</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label pt-0">
                        Username / Email ID
                      </Label>
                      <div className="row">
                        <div className="col-md-10">
                          <div className="form-control-wrap">
                            <input className="form-control" type="text" value={Basic.email_address ? Basic.email_address : null} disabled placeholder="Username" required />

                          </div>
                        </div>
                        <div className="col-md-2">
                          {/* <Button onClick={toggle}><Icon name="edit"></Icon></Button> */}
                        </div>

                      </div>

                    </FormGroup>
                  </div>
                  {/* <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader
                      toggle={toggle}
                      close={
                        <button className="close" onClick={toggle}>
                          <Icon name="cross" />
                        </button>
                      }
                    >
                      Enter Your New Email ID
                    </ModalHeader>
                    <ModalBody>
                      <div className="row">

                        <div className="col-md-12 text-center  mb-1">
                          <input className="form-control" type="text" value={Basic.Email} placeholder="Enter Your New Email ID" />
                        </div>
                        <div className="col-md-12 text-center">
                          <Button color="primary">Send Otp</Button>
                        </div>
                      </div>
                    </ModalBody>

                  </Modal> */}
                </div>
                <div className="row mt-2">
                  <div className="col-md-10">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label pb-0">
                        Mobile Number
                      </Label>
                      <div className="row pt-0">
                        <div className="col-md-10">
                          <div className="form-control-wrap">
                            <input className="form-control" type="text" value={Basic.phone_number ? Basic.phone_number : null} id="default-0" disabled placeholder="9876543212" required />

                          </div>
                        </div>
                        <div className="col-md-2">
                          {/* <Button onClick={toggle1}><Icon name="edit"></Icon></Button> */}
                        </div>

                      </div>

                    </FormGroup>
                  </div>
                  {/* <Modal isOpen={isOpen1} toggle={toggle1}>
                    <ModalHeader
                      toggle={toggle1}
                      close={
                        <button className="close" onClick={toggle1}>
                          <Icon name="cross" />
                        </button>
                      }
                    >
                      Enter Your New Mobile Number
                    </ModalHeader>
                    <ModalBody>
                      <div className="row">

                        <div className="col-md-12 text-center  mb-1">
                          <input className="form-control" type="text" id="default-0" placeholder="Enter Your New Mobile Number" />
                        </div>
                        <div className="col-md-12 text-center">
                          <Button color="primary">Send Otp</Button>
                        </div>
                      </div>
                    </ModalBody>

                  </Modal> */}
                </div>
                <div className="row mt-2">
                  <div className="col-md-10">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label pb-0">
                        Name
                      </Label>
                      <div className="row pt-0">
                        <div className="col-md-10">
                          <div className="form-control-wrap">
                            <input className="form-control" type="text"  onChange={onchange} value={Basic.Name} name="Name" placeholder="Enter Name" required />

                          </div>
                        </div>
                        <div className="col-md-2">
                          <Button id="id"><Icon name="question"></Icon> </Button>
                          <Tooltip placement="top" isOpen={tooltipOpen} target="id" toggle={toggle2}>
                            Enter brand name for your products if you sell your own branded products
                          </Tooltip>
                        </div>

                      </div>

                    </FormGroup>
                  </div>

                </div>
              </div>
            </Col>
            <Col md={7}>
              <div className="p-3">
                <div className="row ">
                  <div className="col-md-12">
                    <h6>Store Information</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <FormGroup>
                              <Label htmlFor="default-0" className="form-label pb-0">
                                Store Name
                              </Label>
                              <div className="row pt-0">
                                <div className="col-md-10">
                                  <div className="form-control-wrap">
                                    <input className="form-control" type="text"  onChange={onchange} value={Basic.StoreName} name="StoreName" id="default-0" placeholder="Enter Store Name" required />

                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <Button id="StoreName"><Icon name="question"></Icon> </Button>
                                  <Tooltip placement="top" isOpen={StoreName} target="StoreName" toggle={toggle3}>
                                    Enter brand name for your products if you sell your own branded products
                                  </Tooltip>
                                </div>

                              </div>

                            </FormGroup>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <FormGroup>

                              <div className="row pt-0 mt-2">
                                <div className="col-md-10">
                                  <div className="form-control-wrap">
                                    <textarea className="form-control no-resize"   onChange={onchange} type="text" cols="2" value={Basic.Description} name="Description" placeholder="About Store / Company" required />

                                  </div>
                                </div>


                              </div>

                            </FormGroup>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <FormGroup>
                              <Label htmlFor="default-0" className="form-label pb-0">
                                Shop Url Name
                              </Label>
                              <div className="row pt-0">
                                <div className="col-md-10">
                                  <div className="form-control-wrap">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">
                                          https://example.com/users/
                                        </span>
                                      </div>
                                      <input type="text" className="form-control"  onChange={onchange} value={Basic.ShopUrlName} name="ShopUrlName" placeholder="Enter URL " required />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <Button id="ShopUrlName"><Icon name="question"></Icon> </Button>
                                  <Tooltip placement="top" isOpen={ShopUrlName} target="ShopUrlName" toggle={toggle4}>
                                    Enter brand name for your products if you sell your own branded products
                                  </Tooltip>
                                </div>

                              </div>

                            </FormGroup>
                          </div>

                        </div>
                      </div>








                      <div className="col-md-10 mt-2">
                        <label className="form-label">Store Logo</label>
                        <Dropzone
                          onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
                          accept={[".jpg", ".png", ".svg"]}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                                <input {...getInputProps()} />
                                {files.length === 0 && (
                                  <div className="dz-message">
                                    <span className="dz-message-text">Drag & Drop to Upload File</span>
                                    <span className="dz-message-or">or</span>
                                    <Button color="primary" >Upload</Button>
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
                                          return <img src={`${API_View}/${file.image}`} alt="preview" />
                                        } else if (file.preview) {
                                          return <img src={file.preview} alt="preview" />
                                        }

                                        else {
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


                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} className="text-right">
              <FormGroup>
                <Button color="primary"   onClick={handlesubmit}>
                  <span className="save_button">{IDS ? 'UPDATE' : 'SAVE'}</span>
                </Button>
              </FormGroup>
            </Col>
          </Row>



        </Block>

      </React.Fragment>

    </div>
  );
};
export default BasicInfo;
