import React, { useEffect, useState, forwardRef } from "react";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  BackTo,
  PreviewCard,
  ReactDataTable,
  Row,
  RSelect,
  Col,
  CustomDataTable,
} from "../../../components/Component";

import { messageData } from "./MessageData";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import User2 from "../../../images/avatar/c-sm.jpg";
// import User10 from "../../../images/avatar/13.png";
import { DisputesTableDatabanner, disputesTableColumnbanner, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import axios from "axios";
import { API_URL, API_Banner, token } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
const API_Banner_Image = `${API_URL}/Banner_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Banners = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [smOption, setSmOption] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [stateID, setstateID] = useState("");
  const [status, setStatus] = useState(1);
  const [IconChange, setIconChange] = useState(false);
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

  const [Banner, AddBanner] = useState({
    id: "",
    BannerName: "",
    BannerImage: "",
    MobileBannerImage: "",
    Order: "",
    LinkUrl: "",
    // Status: 1
  });
  const [ImageChange, setImageChange] = useState(false);
  const [filesview, setFilesView] = useState("");
  const [view, setView] = useState({
    add: false,
    details: false,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    Getdata();
  }, []);
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const handleChangesss = ({ target: { name, value } }) => {
    AddBanner({ ...Banner, [name]: value });
  };

  const handleopen = async (id, type) => {
    setView({ add: type === "edit" ? true : false });
    const { data } = await axios.get(`${API_Banner}/${id}`, config);
    // console.log("sssssssss", data);
    AddBanner({
      id: data.list[0].id,
      BannerImage: data.list[0].BannerImage,
      MobileBannerImage: data.list[0].MobileBannerImage,
      BannerName: data.list[0].BannerName,

      Order: data.list[0].Order,
      LinkUrl: data.list[0].LinkUrl,
    });
    // if (data.list[0].MobileBannerImage !== "") {
    //   setFile([data.list[0].MobileBannerImage]);
    // }
    setFile([data.list[0].MobileBannerImage]);
    setFiles1([data.list[0].BannerImage]);
    if (data.list[0].id) {
      setImageChange(false);
    }
  };

  const onFormSubmitBrand = (form) => {
    // if (!Banner.id) {
    //   Create();
    // } else {
    //   Edit(Banner.id);
    // }
    if (Banner.id) {
      if (validate()) {
        Edit(Banner.id);
      }
    } else {
      if (validate()) {
        Create();
      }
    }
  };
  function validate() {
    if (Banner.BannerImage.length === 0) {
      alert("Please Upload a Banner Image");
      return false;
    } else if (Banner.MobileBannerImage.length === 0) {
      alert("Please Upload a Mobile Banner Image");
      return false;
    } else {
      return true;
    }
  }

  const Create = () => {
    let formData = new FormData();
    formData.append("BannerName", Banner.BannerName);
    formData.append("BannerImage", Banner.BannerImage);
    formData.append("MobileBannerImage", Banner.MobileBannerImage);
    formData.append("Order", Banner.Order);
    formData.append("LinkUrl", Banner.LinkUrl);

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("brand formdata", ...formData);
    // if (Banner.BannerImage == "") {
    //   // console.log("img is empty")
    //   alert("Please Upload Image*");
    //   // setAlertmsg(true);
    // } else if (Banner.BannerImage !== "") {
    // setAlertmsg(false);
    axios.post(API_Banner, formData, configs).then((res) => {
      AddBanner({
        ...Banner,
        id: "",
        BannerName: "",
        BannerImage: "",
        MobileBannerImage: "",
        Order: "",
        LinkUrl: "",
      });
      Getdata();
      setFiles1([]);
      setFile([]);
      setFilesView("");
      toast.success("Banner Created Successfully! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onFormCancel();
    });
    // }
  };
  // console.log("alertmsg", alertmsg);
  const Edit = (ID) => {
    let formData = new FormData();
    formData.append("id", ID);
    formData.append("BannerName", Banner.BannerName);
    formData.append("MobileBannerImage", Banner.MobileBannerImage);
    formData.append("BannerImage", Banner.BannerImage);
    formData.append("Order", Banner.Order);
    formData.append("LinkUrl", Banner.LinkUrl);
    formData.append("Status", status);

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("brand formdata", ...formData);
    // if (Banner.BannerImage == "") {
    //   // console.log("img is empty")
    //   alert("Please Upload Image*");
    //   // setAlertmsg(true);
    // } else if (Banner.BannerImage !== "") {
    // setAlertmsg(false);
    axios.put(`${API_Banner}/${ID}`, formData, configs).then((res) => {
      AddBanner({
        ...Banner,
        id: "",
        BannerName: "",
        MobileBannerImage: "",
        BannerImage: "",
        Order: "",
        LinkUrl: "",
      });

      setFiles1([]);
      setFile([]);
      setFilesView("");
      toast.success("Banner Updated Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      Getdata();
      onFormCancel();
    });
    // }
  };

  const handleClickAlertOpen = (type, id) => {
    setView({ details: type === "remove" ? true : false });
    setstateID(id);
  };

  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    const { data } = await axios.get(`${API_Banner}/${id}`, config);
    AddBanner({
      ...Banner,
      BannerName: data.list[0].BannerName,
      BannerImage: data.list[0].BannerImage,
      MobileBannerImage: data.list[0].MobileBannerImage,
      Order: data.list[0].Order,
      LinkUrl: data.list[0].LinkUrl,
    });

    //  onFormCancel();

    setFiles1([data.list[0].BannerImage]);
  };

  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Banner}/delete/${stateID}`, { Status: 0 }, config);
    onFormCancel();
    Getdata();
  };
  const reversed = [...data].reverse();
  const Getdata = async () => {
    const Result = await axios.get(`${API_Banner}`, config);
    console.log("dddddddddddd", Result.data.list);
    setData(Result.data.list);
  };
 
  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    setImageChange(false);
    AddBanner({
      ...Banner,
      id: "",
      BannerName: "",
      BannerImage: "",
      MobileBannerImage: "",
      Order: "",
      LinkUrl: "",
    });

    setFiles1([]);
    setFile([]);
    setFilesView("");
    // resetForm();
  };
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const [filter, setFilter] = useState(false);

  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });

  //

  const options = {
    selection: true,
    actionsColumnIndex: -1,
    addRowPosition: "first",
    exportButton: true,
    paging: false,

    filtering: filter,
    filterCellStyle: {
      icon: "filter_list",
    },
    rowStyle: (x) => {
      if (x.tableData.id % 2) {
        return { backgroundColor: "rgb(242 242 242)", textAlign: "center" };
      }
    },

    textAlign: "center",
    paddingLeft: "60px",
    columnsButton: true,
    maxBodyHeight: "400px",
    headerStyle: {
      backgroundColor: "#f2f2f2",
      border: "1px solid rgb(242 242 242)",
      borderBottom: "1px solid #c5c1c1",
      position: "sticky",
      width: "auto",
    },
  };

 
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  const handleDropChange2 = (e) => {
    // console.log("img value",e.target.files[0]);
    AddBanner({ ...Banner, MobileBannerImage: e.target.files[0] });
    // setImageChange(true)
    setFiles1(e.target.files[0]);
  };

  const [files1, setFiles1] = useState([]);
  const handleDropChange = (acceptedFiles) => {
    AddBanner({ ...Banner, BannerImage: acceptedFiles[0] });
    setImageChange(true);
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const [file, setFile] = useState([]);
  const handleDropChange1 = (acceptedFile) => {
    AddBanner({ ...Banner, MobileBannerImage: acceptedFile[0] });
    setIconChange(true);
    setFile(
      acceptedFile.map((files) =>
        Object.assign(files, {
          previews: URL.createObjectURL(files),
        })
      )
    );
  };
  

  const Deleteimagepopup = async (id) => {
  
    if (Banner.id && id) {
      const Result = await axios.put(`${API_Banner}/${Banner.id}`, { BannerImage: id }, config);
    }
    setImageChange(true);
    setFiles1([]);
    AddBanner({ ...Banner, BannerImage: "" });
  };



  const bannerTable = [
    // { field: "SNO", title: "S.NO" },
    { field: "BannerName", title: "Banner Name" },
    {
      field: "MobileBannerImage",

      title: " Mobile Banner Images",
      render: (rowData) => (
        <img
          src={`${API_Banner_Image}/${rowData.MobileBannerImage}`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "BannerImages",

      title: "Banner Images",
      render: (rowData) => (
        <img
          src={`${API_Banner_Image}/${rowData.BannerImage}`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "Order", title: "Image Position" },
    { field: "LinkUrl", title: "Link URL" },

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
                  <li onClick={() => handleopen(row.id, "edit")}>
                    <DropdownItem tag="a" href="#edit">
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

                  <li onClick={() => handleClickAlertOpen("remove", row.id)}>
                    <DropdownItem tag="a">
                      <Icon name="trash"></Icon>
                      <span>Remove</span>
                    </DropdownItem>
                  </li>
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </li>
        </ul>
      ),
    },
  ];
  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "banner");
    try {
      axios.put(`${API_URL}/admin/BulkDelete/bulkDeletedata`, formData, config).then((res) => {

        if (res.data.statusCode == 200) {
          toast.success("Deleted Successfully! ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          Getdata();
        }
        else {
          console.log("login");
          toast.error("Somethig wrong", {
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

    } catch (error) {

    }
  };
  return (
    <React.Fragment>
      <Head title="BANNERS" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div>
                {/* <BlockTitle tag="h4"> BANNERS </BlockTitle> */}

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
                    <ul className="nk-block-tools g-3" style={{ justifyContent: "end", textAlign: "end" }}>
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
                          <span>Add Banner</span>
                        </Button>
                      </li>
                      {/* <li className="nk-block-tools-opt">
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
                          toggle("details");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Attributes</span>
                      </Button>
                    </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          
          <CustomDataTable icons={tableIcons} data={reversed} columns={bannerTable}
            title="BANNER LISTS"
            actions={[
              {
                icon: "delete",
                tooltip: "Delete All Rows",
                onClick: handleDeleteRows
              },
            ]}
          />
        </Block>

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
              <h5 className="title">{Banner.id === "" ? "Add" : "Update "} Banner</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmitBrand)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Banner Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="BannerName"
                            placeholder="Enter Banner Name"
                            value={Banner.BannerName}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <label className="form-label">Upload BannerImage</label>
                      <Dropzone onDrop={(acceptedFile) => handleDropChange(acceptedFile)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            {/* {files1.length > 0 ? <>
                      <span onClick={Deleteimagepopup} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                    </> : null} */}
                            {files1.length > 0 &&
                              files1.map((item, index) => {
                                return (
                                  <div key={item}>
                                    <span
                                      onClick={() => Deleteimagepopup(item)}
                                      style={{
                                        margin: "10px",
                                        position: "absolute",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <Icon name="trash"></Icon>
                                    </span>
                                  </div>
                                );
                              })}

                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} id="upload" />
                              {files1.length === 0 && <p>Upload Image</p>}
                              {files1.map((files, i) => (
                                <div key={i} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                                  {console.log(files, "files")}
                                  {Banner.id ? (
                                    <>
                                      {ImageChange ? (
                                        <div className="dz-image">
                                          <img src={files.preview} alt="preview" />
                                        </div>
                                      ) : (
                                        <div className="dz-image">
                                          <img src={`${API_Banner_Image}/${files}`} alt="preview" />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <div className="dz-image">
                                          <img src={files.preview} alt="preview" />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>
                    <Col size="6">
                      <label className="form-label">
                        Upload Mobile Image* <span style={{ fontSize: "11px" }}>(140 × 140 px)</span>
                      </label>

                      <Dropzone onDrop={(acceptedFile) => handleDropChange1(acceptedFile)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            {/* {files1.length > 0 ? <>
                      <span onClick={Deleteimagepopup} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                    </> : null} */}
                            {file.length > 0 &&
                              file.map((item, index) => {
                                return (
                                  <div key={item}>
                                    {console.log(item, "files")}
                                    <span
                                      onClick={() => Deleteimagepopup(item)}
                                      style={{
                                        margin: "10px",
                                        position: "absolute",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <Icon name="trash"></Icon>
                                    </span>
                                  </div>
                                );
                              })}

                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} id="upload" />
                              {file.length === 0 && <p>Upload Image</p>}
                              {file.map((file, i) => (
                                <div key={i} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                                  {Banner.id ? (
                                    <>
                                      {IconChange ? (
                                        <div className="dz-image">
                                          <img src={file.previews} alt="preview" />
                                        </div>
                                      ) : (
                                        <div className="dz-image">
                                          <img src={`${API_Banner_Image}/${file}`} alt="preview" />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <div className="dz-image">
                                          <img src={file.previews} alt="preview" />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          ORDER
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="Order"
                            placeholder="Enter Order Name"
                            value={Banner.Order}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          LINK URL
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="LinkUrl"
                            placeholder="Enter Link Url"
                            value={Banner.LinkUrl}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12" style={{ justifyContent: "end" }}>
                      <Button color="primary" type="submit">
                        <span>{Banner.id === "" ? "SAVE" : "UPDATE"}</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.Viewdetails} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a className="close">
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
              <h5 className="title">Banner View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Banner Name</span>
                      <span class="caption-text">{Banner.BannerName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Banner Image</span>
                      <span class="caption-text">
                        <img src={`${API_Banner_Image}/${Banner.BannerImage}`} style={{ width: "50%" }}></img>
                      </span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Order</span>
                      <span class="caption-text">{renderHTML(Banner.Order)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Link Url</span>
                      <span class="caption-text">{renderHTML(Banner.LinkUrl)}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={view.details} toggle={() => onFormCancel()}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
              <h4 className="nk-modal-title">Do You Want Delete!</h4>
              <div className="nk-modal-action mt-5 d-flex justify-content-around">
                <Button color="light" size="lg" className="btn-mw" type="submit" onClick={handleAlertDelete}>
                  Confirm{" "}
                </Button>
                <Button
                  color="light"
                  size="lg"
                  className="btn-mw"
                  type="submit"
                  onClick={(ev) => {
                    ev.preventDefault();
                    onFormCancel();
                  }}
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default Banners;
