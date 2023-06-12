import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { Link } from 'react-router-dom';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";


import { Modal, ModalBody } from "reactstrap";



import { BlockHead, BlockHeadContent, BlockTitle, ReactDataTable, PreviewCard, Button, Icon, UserAvatar,Row,Col,RSelect,Block,DataTableHead,  DataTableRow, } from "../../../components/Component";
import { messageData } from "./MessageData";
import { DisputesTableDatas, DisputesTableData, disputesTableCol, disputesTableCol12, disputesTableCol2, disputesTableColumns, disputesTableColumns2, userData } from "./TableData";

import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
import ContentAlt from "../../../layout/content/ContentAlt";
import { FormGroup,Label, UncontrolledDropdown,DropdownToggle } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";

const Ticketss = () => {
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
    reviewmsg: '',
    reviewname: '',
    reviewemail: ''

  });
  const [state, setState] = useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };

  const [smOption, setSmOption] = useState(false);

  
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  
// function to close the form modal
const onFormCancel = () => {
  setView({ add: false, details: false });
  // resetForm();
};
  
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
      add :"",
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
      setTabData(basic)
    } else if (filterTab === "2") {
      setTabData(support)
    } else if (filterTab === "3") {
      setTabData(  formatsss )
    } else if (filterTab === "4") {
      setTabData(order)
    }
    // else {
    //   setTabData(review)
    // }
  }, [filterTab]);

  const onchangereview = ({ target: { name, value } }) => {
    setReview({ ...Review, [name]: value });
     


  }
  const ReviewClick = () => {
    if (Review.reviewmsg) {
      
      setReviewerror(null)

    } else {
      setReviewerror("* This field is required")
    }

  }
  const basic = ()=>{
    return(
   <div>
     <h1>No NOTIFICATION Available!</h1>
   </div>
    )
  }

  const formatsss = ()=>{
    return(
     <div>
       <h4> No Docs Found </h4>
       <Row className="gy-4">
 <Col md="3" sm="6">
   <div className="preview-block">
     <span className="preview-title overline-title">Default</span>
     <div className="custom-control custom-switch">
       <input type="checkbox" className="custom-control-input form-control" id="customSwitch1" />
       <label className="custom-control-label" htmlFor="customSwitch1">
         Switch
       </label>
     </div>
   </div>
 </Col>
 </Row>
        </div>
 



    )
  }
  
  const support = ()=>{
    return(
      <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
        </BlockHead>


        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
              {/* <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                 
                </a> */}


            <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div
                  className="toggle-expand-content"
                  style={{ display: smOption ? "block" : "none", justifyContent: "end" }}
                >
                  <ul className="nk-block-tools g-3" style={{ justifyContent: "end" }}>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>RAISE TICKETS  </span>
                      </Button>
                    </li>
                   
                  </ul>
                </div>
              </div>
                  
            
              </div>



              <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add  New Tickets</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
             
                  <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                    
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" MANUFACTURE NAME**"
                            placeholder="Tittle for the issue"
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                    <FormGroup>
                      <label className="form-label"> </label>
                      <div className="text-editor" style={{minHeight: '100px',}}>
                          <EditorToolbar />
                          <ReactQuill
                            theme="snow"
                            value={state.value}
                            onChange={handleChange}
                            placeholder={"Description"}
                            modules={modules}
                            formats={formats}
                          />
                        </div>
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                      Category*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: " Order & Shipping", label: " Order & Shipping" },
                              { value: "Refunds & Exchange", label: "Refunds & Exchange" },
                              { value: " Product Help", label: " Product Help" },
                              { value: " Technical Issue", label: " Technical Issue" },
                              { value: " Payments & Commission", label: " Payments & Commission" },
                              { value: "Others", label:"Others"},

                            
                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
            
            <label className="form-label"> UPLOAD IMAGES </label>
            <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className="dropzone upload-zone small my-2 dz-clickable"
                  >
                    <input {...getInputProps()} />
                    {files1.length === 0 && <p>Drop some files here</p>}
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

                  

                    <Col size="12" style={{justifyContent:'end'}}>
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>SAVE</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

            </BlockHeadContent>
            
          </BlockHead>
          




          <PreviewCard>
            <ReactDataTable data={DisputesTableDatas} columns={disputesTableCol12} expandableRows pagination actions />
          </PreviewCard>
        </Block>

 
      </Content>
    </React.Fragment>
    )
  }

  const order = ()=>{
    return(
      <div>
         <h4> No Video Found </h4>
      </div>
    )
  }

  
  
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
                  <Icon name="snapchat"></Icon>
                    NOTIFICATION
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                   TICKETS
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#stared"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                   TRAINING DOCUMENTS
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "4" && " active"}`} onClick={() => setFilterTab("4")}>
                  <a
                    href="#all"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                   VIDEOS
                  </a>
                </li>
                {/* <li className={`nk-msg-menu-item ${filterTab === "5" && " active"}`} onClick={() => setFilterTab("5")}>
                  <a
                    href="#something"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                   REVIEWS 
                  </a>
                </li> */}

              </ul>
            </div>

            <Simplebar className="nk-msg-list">
              {tabData}
            </Simplebar>


          </div>
          {/*nk-aside*/}
          {/* <MessageItem
            id={selectedId}
            onClosed={onClosed}
            data={data}
            setMobileView={setMobileView}
            mobileView={mobileView}
          /> */}
        </div>
      </ContentAlt>
    </React.Fragment>
  );
};
export default Ticketss;