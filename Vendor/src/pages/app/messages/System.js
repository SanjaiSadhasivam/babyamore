import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./custom.css";
import User from "../../../images/avatar/b-sm.jpg";
import User2 from "../../../images/avatar/c-sm.jpg";
import User6 from "../../../images/avatar/icon.png";
import User7 from "../../../images/avatar/12.png";

import {
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  ReactDataTable,
  PreviewCard,
  Button,
  Icon,
  UserAvatar,
  Row,
  Col,
  RSelect,
  Block,
  DataTableHead,
  DataTableRow,
} from "../../../components/Component";
import {
  DisputesTableData,
  disputesTableColumns,
  disputesTableColumns2,
  userData,
} from "../../components/table/TableData";
import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
import MessageItem from "./MessageItem";
import ContentAlt from "../../../layout/content/ContentAlt";
import { FormGroup, Label, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";

const System = () => {
  const [data, setData] = useState(messageData);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });
  const [state, setState] = useState({ value: null });

  const [textView, setTextView] = useState(false);
  const [textView1, setTextView1] = useState(false);
  const [textView2, setTextView2] = useState(false);

  const handleChange = (value) => {
    setState({ value });
  };

  const copy = async () => {
    await navigator.clipboard.writeText('Rwxb7L8XQ8r8lx6aPdwrcpAAGRz2xEmG');
    setTextView(true)
  } 
  const copy1 = async () => {
    await navigator.clipboard.writeText('njbhgfd4d56787654');
    setTextView1(true)
  }

  const copy2= async () => {
    await navigator.clipboard.writeText('13243576890uiytrgfsddfgh');
    setTextView2(true)
  }

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };

  const [files1, setFiles1] = useState([]);

  const onFormSubmit = (form) => {
    const { customer, purchased, list, add, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      paid: formData.paid,
      total: total,
      list: "",
      add: "",
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: "",
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  useEffect(() => {
    if (filterText !== "") {
      const filteredData = messageData.filter((item) => {
        return (
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.messageTitle.toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setData([...filteredData]);
    } else {
      setData(filteredTabData);
    }
  }, [filterText, filterTab, filteredTabData]);

  useEffect(() => {
    let filteredData;
    if (filterTab === "1") {
      setTabData(basic);
    } else if (filterTab === "2") {
      setTabData(formatsss);
    } else if (filterTab === "3") {
      setTabData(support);
    } else if (filterTab === "4") {
      setTabData(order);
    } else {
      setTabData(review);
    }
  }, [filterTab]);

  const onchangereview = ({ target: { name, value } }) => {
    setReview({ ...Review, [name]: value });
  };
  const ReviewClick = () => {
    if (Review.reviewmsg) {
      setReviewerror(null);
    } else {
      setReviewerror("* This field is required");
    }
  };
  const basic = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        <h5 className="title">Basic Information</h5>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="g-3">
              <Col md="8">
                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="customer">
                      MARKETPLACE NAME:
                    </label>
                  </Col>
                  <Col md="9">
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="customer"
                        placeholder="zCart"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </Col>
                </Row>

                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="customer">
                      MARKETPLACE NAME:
                    </label>
                  </Col>
                  <Col md="9">
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="customer"
                        placeholder="zCart"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </Col>
                </Row>

                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="customer">
                      SLOGAN:
                    </label>
                  </Col>
                  <Col md="9">
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="customer"
                        placeholder="A Nice and Meaningful Tag Line"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </Col>
                </Row>

                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="customer">
                      *LEGAL NAME:
                    </label>
                  </Col>
                  <Col md="9">
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="customer"
                        placeholder="ZCart Inc"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </Col>
                </Row>

                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="paid">
                      *BUSINESS AREA:*
                    </label>
                  </Col>

                  <Col md="9">
                    <div className="form-control-wrap">
                      <RSelect
                        name="paid"
                        options={[
                          { value: "Worldwide", label: "Active" },
                          { value: "Active Bussiness Only", label: "Inactive" },
                        ]}
                        onChange={(e) => setFormData({ ...formData, paid: e.value })}
                        defaultValue={formData.paid}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="paid">
                      *TIMEZONE:
                    </label>
                  </Col>

                  <Col md="9">
                    <div className="form-control-wrap">
                      <RSelect
                        name="paid"
                        options={[
                          { value: "UTC", label: "UTC" },
                          { value: "UTC 2", label: "UTC 2" },
                        ]}
                        onChange={(e) => setFormData({ ...formData, paid: e.value })}
                        defaultValue={formData.paid}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="paid">
                      *DEFAULT LANGUAGE:
                    </label>
                  </Col>

                  <Col md="9">
                    <div className="form-control-wrap">
                      <RSelect
                        name="paid"
                        options={[
                          { value: "English", label: "English" },
                          { value: "Tamil", label: "Tamil" },
                        ]}
                        onChange={(e) => setFormData({ ...formData, paid: e.value })}
                        defaultValue={formData.paid}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="m-1">
                  <Col md="3">
                    <label className="form-label" htmlFor="paid">
                      *CURRENCY:
                    </label>
                  </Col>

                  <Col md="9">
                    <div className="form-control-wrap">
                      <RSelect
                        name="paid"
                        options={[
                          { value: "Aruban florin – Aruba", label: "Aruban florin – Aruba" },
                          { value: "Forint – Hungary", label: "Forint – Hungary" },
                        ]}
                        onChange={(e) => setFormData({ ...formData, paid: e.value })}
                        defaultValue={formData.paid}
                      />
                    </div>
                  </Col>

                 
                  <Row className="m-1">
                    <Col md="12">
                      <label className="form-label">BRAND LOGO</label>
                    </Col>
                    <Col md="9">
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p> BRAND LOGO</p>}
                              {files1.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>
                  </Row>
                  <Row className="m-1">
                    <Col md="12">
                      <label className="form-label"> ICON</label>
                    </Col>
                    <Col md="9">
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p> Pick an icon </p>}
                              {files1.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>
                  </Row>
                  <Row className="m-1">
                    <Col md="12">
                      <label className="form-label">TRUST BADGE</label>
                    </Col>
                    <Col md="9">
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p>  Upload  your trust badges</p>}
                              {files1.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>
                  </Row>
                </Row>
              </Col>
              {/* //end of row 6 */}

              <Col md="4"  className="sdk">
                <Row>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                        MAINTENANCE MODE
                      </label>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round" />
                      </label>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="form-group  sdwe1">
                      <label className="form-label" htmlFor="customer">
                        ADDRESS
                      </label>
                      <div className="form-control-wrap">
                        <ul>
                          <li> Platform Address</li>
                          <li>Hollywood,</li>
                          <li> Merton 63585</li>
                          <li> United States </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Col size="4" className="sds1">
                <Button color="primary" type="submit">
                  <span>UPDATE</span>
                </Button>
              </Col>
                
                  <Row>
                <Col md="6">
                    <div className="form-group d-flex justify-center">
                      <label className="form-label" htmlFor="customer">
                        Icons
                      </label>
                      <div className="form-control-wrap">
                       <img src={User} />
                      </div>
                    </div>
                  </Col>
                </Row>
                
                <Row>
                <Col md="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        Icons
                      </label>
                      <div className="form-control-wrap">
                       <img src={User6} />
                      </div>
                    </div>
                  </Col>
                </Row>
                  <Row>
                <Col md="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        Icons
                      </label>
                      <div className="form-control-wrap">
                       <img src={User6} />
                      </div>
                    </div>
                  </Col>
                </Row>
               
              </Col>

              <Col size="4" className="sds">
                <Button color="primary" type="submit">
                  <span>UPDATE</span>
                </Button>
              </Col>

            
            </Row>
          </form>
        </div>
      </div>
    );
  };

  const formatsss = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
      
        <div className="mt-4">

         

          <Row className="g-3 sws" >
              <Col md="4" className="sdwe">
              <Button color="primary" type="submit" style={{paddingLeft:"20px"}}>
                  <span> Modify Environment File </span>
                </Button>
                <br></br>
                <p>Be careful when working with .env file. This the main configuration file and the system will break down if you do anything wrong here. Take a backup every time you want to make any modification.
You can't revert this action.</p>
                </Col>
                <Col md="4" className="sdwe">
                <Button color="primary" type="submit">
                  <span>Import Demo Contents </span>
                </Button>
                <br></br>
                <p>Importing demo contents will remove all data from the database and reset all configurations except the file (the .env and other config files in configs/ directory) configurations . The system will go back to a fresh installation.
You can't revert this action.</p>
                </Col>
                <Col md="4" className="sdwe">
                <Button color="primary" type="submit">
                  <span>Take a Break</span>
                </Button>
                <br></br>
                <p>  You can take a database backup snapshot. Make sure you have configured the backup preferences before take this action. Make sure the mysqldump is installed on your server. Check the documentation for help..</p>
                </Col>
                </Row>

              <br></br>
              <br></br>


              <hr></hr>

                <Row>
            <Col md="8">
              <p> 
                APPLICATION KEY</p>
              <div className="d-flex">
              <input type="password" className="form-control" value='Rwxb7L8XQ8r8lx6aPdwrcpAAGRz2xEmG' readOnly style={{width:'80%'}} />
              {textView ?<button className="form-control" style={{width:'20%'}}>Copied</button>:
              <button className="form-control" onClick={copy} style={{width:'20%'}}>Copy</button>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <p> 
                APPLICATION KEY</p>
              <div className="d-flex">
              <input type="password" className="form-control" value='65432wsdfghgfds3' readOnly style={{width:'80%'}} />
              {textView1 ?<button className="form-control" style={{width:'20%'}}>Copied</button>:
              <button className="form-control" onClick={copy1} style={{width:'20%'}}>Copy</button>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <p> 
                APPLICATION KEY</p>
              <div className="d-flex">
              <input type="password" className="form-control" value='432frdsdvvc' readOnly style={{width:'80%'}} />
              {textView2 ?<button className="form-control" style={{width:'20%'}}>Copied</button>:
              <button className="form-control" onClick={copy2} style={{width:'20%'}}>Copy</button>}
              </div>
            </Col>
          </Row>
         
        

           <br></br>
           <br></br>
           
              <Col size="4">
                <Button  className="sqa" color="ash" type="submit">
                  <span>SHOW</span>
                </Button>
                
                <Button color="primary" type="submit">
                  <span>REGENERATE KEY</span>
                </Button>
              </Col>
             
          
          
        </div>
      </div>
    );
  };

  

  const onSearchBack = () => {
    setOnSearch(false);
    setFilterText("");
  };

  const onClosed = (id) => {
    let newData = data;
    const index = newData.findIndex((item) => item.id === id);
    newData[index].closed = true;
    setData([...newData]);
  };

  const onMessageClick = (id) => {
    setSelectedIt(id);
    if (window.innerWidth <= 990) {
      setMobileView(true);
    }
  };

  return (
    <React.Fragment>
      <Head title=" Configuration"></Head>
      <ContentAlt>
        <div className="nk-msg">
          <div className="nk-msg-aside hide-aside">
            <div className="nk-msg-nav">
              <ul className="nk-msg-menu">
                <li className={`nk-msg-menu-item ${filterTab === "1" && " active"}`} onClick={() => setFilterTab("1")}>
                  <a
                    href="#active"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    GENERAL SETTINGS 
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    ENVIRONMENT CONFIG 
                  </a>
                </li>
              </ul>
            </div>

            <Simplebar className="nk-msg-list">{tabData}</Simplebar>
          </div>
       
        </div>
      </ContentAlt>
    </React.Fragment>
  );
};
export default System;
