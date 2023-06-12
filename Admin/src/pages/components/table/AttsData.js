import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
const API_Att_Image = `${API_URL}/Attributes_image`;
 import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  Icon,
  Row,
  RSelect,
  Col,
  CustomDataTable,
} from "../../../components/Component";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { token, API_Attribute, API_URL } from "../../../Api";

const API_Attribute_Image = `${API_URL}/Attribute_image/`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const AttsData = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  // const [cookies, setCookie, removeCookie] = useCookies();
  const Auths = cookies.accesstoken;
  const [data, setData] = useState();
  const [Attdata, setAttdata] = useState([]);
  const [smOption, setSmOption] = useState(false);
  const [DeleteImageTittle, setDeleteImageTittle] = useState("Do you want Delete Photo!");
  const [state, setstate] = useState("");
  const [stateID, setstateID] = useState("");
  const [value, setValue] = useState();
  const [upload_imagedeleteid, setupload_imagedeleteid] = useState("");
  const [imageDel, setImageDel] = useState(false);
  const [Attributevalueget, setAttributevalueget] = useState([]);
  const [ID, setID] = useState("");
  const [Attribute, AddAttribute] = useState({
    id: "",
    Attribute_Value: "",
    isActive: true,
  });
  const [UploadImagedeleteid, setUploadImagedeleteid] = useState("");
  const [Attributevalue, AddAttributevalue] = useState({
    id: "",
    Attribute_name: "",
    AttributeNameId: "",
    Attributes: [],
  });
  const [Status, setStatus] = useState();
  const [AttributesName, setAttributesName] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    check: false,
  });
  const [DeleteTittle, setDeleteTittle] = useState("Do you want Delete!");
  const ImgtoggleModalFail = () => setImgModalFail(!ImgmodalFail);

  const [ImgmodalFail, setImgModalFail] = useState(false);
  const [inputFields, setInputFields] = useState([{ Attribute_Value: "", Attribute_ValueImg: "", catlog_id: "" }]);
  const [inputImages, setinputImages] = useState([]);
  const [Deleteicon, setDeleteicon] = useState(false);
  const [view, setView] = useState({
    add: false,
    details: false,
    delete: false,
    Viewdetails: false,
  });
  const [DeleteId, setDeleteId] = useState("");

  useEffect(() => {
    // GetAttributeData();
    Getdata();
  }, []);
  const reversed = [...Attdata].reverse();

  const Getdata = async () => {
    const Result = await axios.get(`${API_Attribute}`, config);
    var ATTVAL = [];
    // if (Result.data.list) {
     setAttdata(Result.data.list);
     //   setAttdata(Result.data.list)
    //   const newData = Result.data.list.map((item) => {
    //     var att = []
    //     for (var val in item.Name[0].Attributes) {
    //       const dat = {
    //         Image: item.Name[0].Attributes[val],
    //         Value: item.Name[0].Attributes[val].Values[0]
    //       }
    //       att.push(dat)
    //     }
    //     const Getdata = {
    //       id: item._id,
    //       AttributeName: item.Name[0].Name,
    //       AttributeNameId: item.Name[0]._id,
    //       Attributes: att
    //     }
    //     return Getdata
    //   })
    //   setAttdata(newData)
    // }
  };

  const handlechanges = ({ target: { name, value } }) => {
    setAttributesName(value);
  };

  const handlechangeAttributeValuess = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const handlechangeAttributeImages = (e, index) => {
    const values = [...inputImages];
    values[index] = e.target.files[0];
    setinputImages(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { Attribute_Value: "", Attribute_ValueImg: "" }]);
  };

  const handleRemoveFields = (catlog_id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.catlog_id === catlog_id),
      1
    );
    setInputFields(values);
  };

  const Deleteiconpopup = (ev, id) => {
    inputFields[id].Attribute_ValueImg = "";
    setupload_imagedeleteid(id);
    setImageDel(true);
    // setImgModalFail(true)
  };

  const ImageDelete = async () => {
    let formData = new FormData();
    var delImagename = "";
    var delIconname = "";
    if (upload_imagedeleteid != "") {
      delImagename = upload_imagedeleteid;
    }
    formData.append("imageName", delImagename);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    if (imageDel) {
      setinputImages([]);
      setImageDel(false);
      setImgModalFail(false);
    } else {
      setImgModalFail(false);
    }
  };

  const Deleteimagepopup = (id) => {
    setUploadImagedeleteid("UploadImage");
    setImageDel(true);
    setImgModalFail(true);
  };

  // const ImageDelete = async () => {
  //   let formData = new FormData();
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //       'Authorization': `Bearer ${token} `
  //     }
  //   };
  //   if (ID) {
  //     setInputFields({
  //       ...inputFields,
  //       Attribute_ValueImg: ""
  //     })
  //   } else {
  //     setImgModalFail(false);
  //   }
  // }

  const GetAttributeData = async (ids) => {
    setAttributevalueget([]);
    const Attr = await axios.get(`${API_Attribute}`, config);

    Attr.data.map((Attrs) => {
      const data = {
        value: Attrs._id,
        label: Attrs.Attribute_Value,
      };
      setAttributevalueget((datass) => [...datass, data]);
    });
  };

  const handleopen = async (id, type) => {
     setID(id);
    setInputFields([]);
    const Result = await axios.get(`${API_Attribute}/${id}`, config);
     if (Result.data.list != "") {
      Result.data.list.map((MainItem, Index) => {
         setAttributesName(MainItem.Attribute_name);
        MainItem.Item.map((AttVALIMG) => {
           const Datas = {
            catlog_id: AttVALIMG.catlog_id,
            Attribute_Value: AttVALIMG.Attribute_Value,
            Attribute_ValueImg: AttVALIMG.Attribute_ValueImg,
          };
           setInputFields((item) => [...item, Datas]);
         });
      });
    }
    setView({
      add: type === "add" ? true : false,
    });

    const Getdata = async () => {
      const Result = await axios.get(`${API_Attribute}/${id}`);
      const attribute_value = await axios.get(`${API_Attribute}/${Result.data.list[0].Attribute_Value}`);
      const newcat = { value: attribute_value.data.id, label: attribute_value.data.Attribute_Value };
      setValue(newcat);
       AddAttributevalue({
        id: Result.data.id,
        Attribute_Value: Result.data.list.Attribute_Value,
        AttributeName: Result.data.list.Attribute_name,
      });
    };
    Getdata();
  };

  const handleopenview = async (type, id) => {
 
    setID(id);
    setInputFields([]);
    const Result = await axios.get(`${API_Attribute}/${id}`, config);
     if (Result.data.list != "") {
      Result.data.list.map((MainItem, Index) => {
         setAttributesName(MainItem.Attribute_name);
        MainItem.Item.map((AttVALIMG) => {
          const Datas = {
            // id:AttVALIMG.Attribute_id,
            Attribute_Value: AttVALIMG.Attribute_Value,
            Attribute_ValueImg: AttVALIMG.Attribute_ValueImg,
          };
           setInputFields((item) => [...item, Datas]);
         });
      });
    }
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    Getdata();
    setValue("");
    setData("");
   };
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const handleClickAlertOpen = (type, id) => {
    setView({ delete: type === "add" ? true : false });
    // setstateID(id);
    setDeleteId(id);
    setModalFail(true);
  };

  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Attribute}/delete/${stateID}`, {}, config);
    onFormCancel();
    Getdata();
  };

  const tableColumn = [
    { field: "Attribute_name", title: "Attribute Name" },
    {
      field: "",
      title: "Attribute Value",
      render: (rowData) => (
        <div>
           {rowData.Item.map((Items, keys) => (
            <>
               <>
                {keys > 0 ? "," : ""}
                {Items.Attribute_Value}{" "}
              </>
            </>
          ))}
        </div>
      ),
    },
    {
      field: "",
      title: "Action",
      render: (row) => (
        <ul className="gx-1 my-n1">
          <li className="mr-n1">
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                <Icon name="more-h"></Icon>
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="link-list-opt no-bdr">
                  <li onClick={() => handleopen(row.id, "add")}>
                    <DropdownItem tag="a">
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => handleopenview("Viewdetails", row.id)}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  {/* <li onClick={() => handleClickAlertOpen("add", row.id)}>
                    <DropdownItem tag="a">
                      <Icon name="trash"></Icon>
                      <span>Remove</span>
                    </DropdownItem>
                  </li> */}
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </li>
        </ul>
      ),
    },
  ];

 

  const onFormSubmitsvalue = (form) => {
    if (ID) {
      EditAttributevalue(ID);

    } else {
      
        createAttributevalue();
  
    }
  };

  const createAttributevalue = async () => {
    var i = 0;

    let formData = new FormData();
    formData.append("Status", Attribute.isActive);
    formData.append("Attribute_name", AttributesName);
    for (i = 0; i < inputFields.length; i++) {
      formData.append("Attribute_Value", inputFields[i].Attribute_Value);
    }
    for (i = 0; i < inputImages.length; i++) {
      formData.append("AttributeValueImg", inputImages[i]);
    }

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };

   
    if (inputFields.length == 1) {
      toast.warn("Please Upload Minimum Two Attributes", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      axios.post(API_Attribute, formData, configs).then((res) => {
        onFormCancel();
        Getdata();
        setID("");
        setInputFields([{ Attribute_Value: "", Attribute_ValueImg: "" }]);
        setinputImages([]);

        toast.success("Attributes Added Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
    // }

  };

  const EditAttributevalue = async (id) => {
    var i = 0;

    let formData = new FormData();
    formData.append("Status", Attribute.isActive);
    formData.append("Attribute_name", AttributesName);
    
    for (i = 0; i < inputFields.length; i++) {
       formData.append("Attribute_Value", JSON.stringify(inputFields[i]));
      formData.append("catlog_id", inputFields[i].catlog_id);
    }
    for (i = 0; i < inputImages.length; i++) {
      formData.append("AttributeValueImg", inputImages[i]);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Auths} `,
      },
    };
 
    if (inputFields.length == 1) {
      toast.warn("Please Upload Minimum Two Attribute", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      axios.put(`${API_Attribute}/${id}`, formData, config).then((res) => {
        // history.push('/dashboard/attr-table')
        onFormCancel();
        Getdata();
        setID("");
        setInputFields([{ Attribute_Value: "", Attribute_ValueImg: "" }]);
        setinputImages([]);
        toast.success("Attribute Updated Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
    setValue();
    // window.location.reload();
  };
  const Deletedata = async () => {
    if (DeleteId) {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${Auths} `,
        },
      };
      const Result = await axios.put(`${API_Attribute}/delete/${DeleteId}`, formData, config);
      if (Result.data.list) {
        setDeleteTittle(Result.data.msg);
        setDeleteicon(true);
        const timer = setTimeout(() => {
          setModalFail(false);
          setDeleteTittle(Result.data.msg);
          Getdata();
          setDeleteicon(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
      history.push("/dashboard/attr-table");
    }
  };

  

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      delete: type === "delete" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setID("");
    setAttributesName("");
    setInputFields([{ Attribute_Value: "", Attribute_ValueImg: "" }]);
    
    setView({ add: false, details: false, delete: false });
  };

  const { errors, register, handleSubmit } = useForm();



  return (
    <React.Fragment>
      <Head title="Attribute" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="d-flex justify-content-end">
                <div className="toggle-wrap nk-block-tools-toggle" style={{ paddingBottom: "1.25rem" }}>
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
                          <Icon name="plus" className="add-icon-default"></Icon>&nbsp;
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <Icon name="plus" className="add-icon-default"></Icon>&nbsp;
                          <span>Add Attribute</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
        </Block>
        <CustomDataTable data={reversed} columns={tableColumn} title="ATTRIBUTES LIST" filter={false} />

        {/* Add new Modal */}
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
              <h5 className="title">{ID? "Edit":"Add"} Attribute</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmitsvalue)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          {" "}
                          Attribute Name{" "}
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="AttributesName"
                            onChange={handlechanges}
                            className="form-control"
                            ref={register({ required: "This is required" })}
                            value={AttributesName}
                            placeholder="Attribute Name"
                          />
                          {errors.AttributesName && <span className="invalid">{errors.AttributesName.message}</span>}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {inputFields.map((inputField, index) => (
                    <div key={inputField.id}>
                       <Row className="g-3">
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              {" "}
                              Attribute Value{" "}
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handlechangeAttributeValuess(e, index)}
                                value={inputField.Attribute_Value}
                                name="Attribute_Value"
                                placeholder="Attribute Value"
                                ref={register({ required: "This is required" })}
                              />
                              {errors.Attribute_Value && (
                                <span className="invalid">{errors.Attribute_Value.message}</span>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              {" "}
                              Attribute Image{" "}
                            </label>
                            <div className="form-control-wrap">
                              {ID ? (
                                <>
                                  {inputField.Attribute_ValueImg ? (
                                    <>
                                      <img src={`${API_Att_Image}/${inputField.Attribute_ValueImg}`} width="40%" />

                                      <span
                                        onClick={(e) => Deleteiconpopup(e, index)}
                                        style={{
                                          margin: "10px",
                                          position: "absolute",
                                          zIndex: "70000",
                                          cursor: "pointer",
                                          fontSize: "20px",
                                        }}
                                      >
                                        <Icon name="trash"></Icon>
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <input
                                        id="upload"
                                        type="file"
                                        onChange={(e) => handlechangeAttributeImages(e, index)}
                                        className="form-control"
                                        name="Attribute_ValueImg"
                                      
                                      />
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <input
                                    id="upload"
                                    type="file"
                                    onChange={(e) => handlechangeAttributeImages(e, index)}
                                    className="form-control"
                                    name="Attribute_ValueImg"
                                  
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col md="2" className="d-flex align-items-end justify-content-between">
                          <Button
                            color="primary"
                            disabled={inputFields.length === 1}
                            onClick={() => handleRemoveFields(inputField.catlog_id)}
                          >
                            {" "}
                            -{" "}
                          </Button>
                          <Button color="primary" onClick={handleAddFields}>
                            {" "}
                            +{" "}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Col size="12" className="mm d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      {" "}
                      <span>{ID ? "UPDATE" : "SUBMIT"} </span>{" "}
                    </Button>
                  </Col>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* View Modal */}
        <Modal isOpen={view.Viewdetails} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
            <div className="p-4">
              <div>
                <h6 className="title text-left">Attribute</h6>
                <form>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          {" "}
                          Attribute Name
                        </label>
                        <div className="form-control-wrap">
                          {AttributesName}
                          {/* <input type='text' className="form-control" onChange={(e) => handlechangeAttributeValuess(e, index)} */}
                          {/* value= name="AttributeValue" placeholder="Attribute Value" */}
                          {/* /> */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {inputFields.map((inputField, index) => (
                    <div key={inputField.id}>
                       <Row className="g-3">
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              {" "}
                              Attribute Value{" "}
                            </label>
                            <div className="form-control-wrap">
                              {inputField.Attribute_Value}
                              {/* <input type='text' className="form-control" onChange={(e) => handlechangeAttributeValuess(e, index)} */}
                              {/* value= name="AttributeValue" placeholder="Attribute Value" */}
                              {/* /> */}
                            </div>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              {" "}
                              Attribute Image{" "}
                            </label>
                            <div className="form-control-wrap">
                              {inputField.Attribute_ValueImg ? (
                                <>
                                  <img src={`${API_Att_Image}/${inputField.Attribute_ValueImg}`} width="40%" />

                                  {/* <span onClick={Deleteiconpopup} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span> */}
                                </>
                              ) : (
                                <>
                                  {/* <input type='file' onChange={(e) => handlechangeAttributeImages(e, index)} */}
                                  {/* className="form-control" name="AttributeImages" /> */}
                                </>
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon
                className={
                  Deleteicon
                    ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"
                    : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
                }
              ></Icon>
              <h4 className="nk-modal-title">{DeleteTittle}</h4>
              <div className="nk-modal-action mt-5 d-flex justify-content-around">
                <Button color="light" size="lg" className="btn-mw" onClick={Deletedata}>
                  Confirm
                </Button>
                <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* Image Delete popup satrt  */}
        <Modal isOpen={ImgmodalFail} toggle={ImgtoggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon
                className={
                  Deleteicon
                    ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"
                    : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
                }
              ></Icon>
              <h4 className="nk-modal-title">{DeleteImageTittle}</h4>
              <div className="nk-modal-text">
                {/* <p className="lead">
                  Are you sure want to delete
                </p> */}
                {/* <p className="text-soft">If you need help please contact us at (855) 485-7373.</p> */}
              </div>
              <div className="nk-modal-action mt-5">
                <Button color="light" size="lg" className="btn-mw m-1" onClick={ImageDelete}>
                  Confirm
                </Button>
                <Button color="light" size="lg" className="btn-mw m-1" onClick={ImgtoggleModalFail}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
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
      </Content>
    </React.Fragment>
  );
};
export default AttsData;
