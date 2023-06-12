import React, { useEffect, useState, forwardRef } from "react";

import Content from "../../../layout/content/Content";
import { get, useForm } from "react-hook-form";
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

import MaterialTable from "material-table";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
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
import { ToastContainer, toast } from "react-toastify";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Link, useHistory } from "react-router-dom";
import { messageData } from "./MessageData";
import { Badge } from "reactstrap";
import { DisputesTableData102 } from "./TablesData";
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
import { TextField } from "@mui/material";

const Role_Api = `${API_URL}/admin/userRoles`;
const API_STAFF = `${API_URL}/admin/users`;
const API_View = `${API_URL}/User_image`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const Admin = () => {
  const history = useHistory();
  const [data, setData] = useState(messageData);
  // const [tableData, setTableData] = useState(DisputesTableData102);
  const [filter, setFilter] = useState(false);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [logo, setlogo] = useState("");
  const [ID, setID] = useState(null);
  const [staffData, setStaffData] = useState();
  const [error1, seterror1] = useState({
    roleSelect: "",
    // reviewname: "",
    // reviewemail: "",
  });

  const [staff, setStaff] = useState({
    fullname: "",
    lastname: "",
    email: "",
    Avatar: "",
    password: "",
    mobile: "",
    role_id: "",
    status: 1,
    role_name: "",
    isActive: null,
  });

  const [role, setRole] = useState([]);
  const [roleadd, setRoleadd] = useState();
  const [status, setStatus] = useState("");
  const [status1, setStatus1] = useState(1);
  const [DeleteId, setDeleteId] = useState("");
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const [DeleteTittle, setDeleteTittle] = useState("Do you want Delete!");
  const [Deleteicon, setDeleteicon] = useState(false);

  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };
  const [error, setError] = useState({
    statuss: "",
  });
  //const [active, setactive] = useState(true);

  const [smOption, setSmOption] = useState(false);

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [active, setActive] = useState("");

  const handleChangeStatus = async (event) => {
    setStaff({
      ...staff,
      isActive: event.value,
    });
    setActive({ value: event.value, label: event.label });
  };
  const [view, setView] = useState({
    add: false,
    details: false,
    view: false,
  });

  useEffect(() => {
    getData();
    GetRole();
  }, []);

  const getData = async () => {
    let Result = await axios.get(`${API_STAFF}`, config);
    console.log("resultt", Result.data.list);
    setStaffData(Result.data.list);
  };
  const GetRole = async () => {
    let Result = await axios.get(`${Role_Api}`, config);
    // console.log("aaa",data.data.list[4].JSON.parse(permission))
    // console.log("result", Result.data.list);
    const res = Result.data.list.map((item) => {
      const datas = {
        value: item.role_id,
        label: item.role_name,
      };
      setRole((item) => [...item, datas]);
    });
  };

  const toggle = (type) => {
    // setStaff({
    //   fullname: "",
    //   lastname: "",
    //   emailaddress: "",
    //   mobile: "",
    //   Avatar: "",
    //   password: "",
    //   role_id: "",
    //   status: "",
    // })
    // setlogo("");
    // setFiles([]);
    // setRoleadd();
    // setID()
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const handleStaff = ({ target: { name, value } }) => {
    console.log("asa",value)
    setStaff({ ...staff, [name]: value });
  };
  // const limit = 6;
  // const handleStaffs = (event) => {
  //   setStaff(event.target.value.slice(0, limit));
  // };
  const [isActive, setIsActive] = useState("");

  const handleStatus = (event) => {
    // setStatus(event);yy
    setStaff({
      ...staff,
      isActive: event.value,
    });
    setIsActive({ value: event.value, label: event.label });
  };
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
  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });

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

  // function to close the form modal
  const onFormCancel = () => {
    setStaff({
      fullname: "",
      lastname: "",
      emailaddress: "",
      phone: "",
      mobile: "",
      Avatar: "",
      password: "",
      role_id: "",
      role_name: "",
      isActive: "",
    });
    setStatus("");
    setlogo("");
    setFiles([]);
    setRoleadd();
    setView({ add: false, details: false, view: false });
    setID();
  };

  const handleopen = async (property, type) => {
    // console.log("property", property);
    setID(property.user_id);
    setView({
      add: type === "edit" ? true : false,
    });

    let Result = await axios.get(`${Role_Api}/${property.role_id}`, config);
    console.log(Result, "ResultResult");
    setRoleadd({ label: Result.data.list[0].role_name, value: Result.data.list[0].role_id });
    // setStatus1({ status: Result.data.list[0].status });
    setStaff({
      email: property.emailaddress,
      lastname: property.lastname,
      mobile: property.phone,
      // password: property.password,
      fullname: property.fullname,
      role_id: property.role_id,
      Avatar: property.Avatar,
      role_name: Result.data.list[0].role_name,
      isActive: property.isActive,
    });

    setFiles([{ image: property.Avatar }]);
    setActive({ label: property.isActive == 1 ? "Active" : "InActive", value: property.isActive });
  };

  const handleopenview = async (property, type) => {
    setView({
      view: type === "view" ? true : false,
    });

    console.log(property, "Result");
    let Result = await axios.get(`${Role_Api}/${property.role_id}`, config);
    setRoleadd({ label: Result.data.list[0].role_name, value: Result.data.list[0].role_id });
    setStaff({
      email: property.emailaddress,
      lastname: property.lastname,
      mobile: property.phone,
      password: property.password,
      fullname: property.fullname,
      role_id: property.role_id,
      Avatar: property.Avatar,
      role_name: Result.data.list[0].role_name,
    });

    setFiles([{ image: property.Avatar }]);
    setActive({ label: property.isActive == 1 ? "Active" : "InActive", value: property.isActive });
  };

  const onFormSubmit = async (form) => {
    if (ID) {
      // if (validate()) {
      editStaff(ID);
      // }
    } else {
      createStaff();
    }
  };

  // function validate() {
  //   // var inp = document.getElementById("upload");
  //   if (staff.length === 0) {
  //     alert("Please Upload a file");
  //     inp.focus();

  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  const createStaff = async () => {
    if (status.length === null) {
      setError({
        statuss: "required",
      });
    } else if (status.length > 0) {
      setError({
        statuss: "",
      });
    }

    if (roleadd == 0 || roleadd == null) {
      console.log(roleadd, "roleadd");
      seterror1({
        roleSelect: "Role required",
      });
    } else {
      // seterror1({
      //   roleSelect: "",
      // });
      try {
        let formData = new FormData();
        formData.append("fullname", staff.fullname);
        formData.append("lastname", staff.lastname);
        formData.append("emailaddress", staff.email);
        formData.append("phone", staff.mobile);
        formData.append("password", staff.password);
        formData.append("role_id", roleadd.value);
        formData.append("isActive", staff.isActive);
        formData.append("status", 1);
        formData.append("Avatar", logo);
        console.log("formdata", ...formData);
        let Result = await axios.post(`${API_STAFF}`, formData, config);
        if (Result) {
          setStaff({
            fullname: "",
            lastname: "",
            emailaddress: "",
            phone: "",
            mobile: "",
            Avatar: "",
            password: "",
            role_id: "",
            role_name: "",
            isActive: "",
          });
          toast.success("Staff Added Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setStatus("");
          setlogo("");
          setFiles([]);
          setRoleadd([]);
          getData();

          setID();
          setView({ add: false, details: false });
        }
      } catch (error) { }
    }
  };
  const editStaff = async (id) => {
    try {
      // const formData = new form();

      let formData = new FormData();

      formData.append("fullname", staff.fullname);
      formData.append("lastname", staff.lastname);
      formData.append("emailaddress", staff.email);
      formData.append("phone", staff.mobile);
      formData.append("password", staff.password);
      formData.append("role_id", roleadd.value);
      // formData.append("status", staff.isActive);

      formData.append("isActive", staff.isActive);
      formData.append("status", 1);
      formData.append("Avatar", logo);
      let Result = await axios.put(`${API_STAFF}/${id}`, formData, config);
      if (Result) {
        setStaff({
          fullname: "",
          lastname: "",
          emailaddress: "",
          phone: "",
          mobile: "",
          Avatar: "",
          password: "",
          role_id: "",
          status: "",
        });
        setlogo("");
        setFiles([]);
        // setRoleadd([]);
        getData();
        setID();
        setView({ add: false, details: false });
        toast.success("Staff Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteOpen = (data) => {
    setDeleteId(data.user_id);
    setModalFail(true);
    setDeleteicon(false);
  };

  const Deletedata = async () => {
    if (DeleteId) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(`${API_STAFF}/delete/${DeleteId}`, { status: 0 }, config);
      if (res) {
        setDeleteTittle(res.data.msg);
        setDeleteicon(true);
        getData();
        setTimeout(() => {
          setModalFail(false);
        }, 1000);
      }
    }
  };

  const [files, setFiles] = useState([]);

  // const [isActive, setIsActive] = useState();
  // const handleClick = () => {
  //   setIsActive(isActive);
  // };

  const handleAttributeStatus = async (Result, stat) => {
    var state = stat === 1 ? 0 : 1;
    // const { data } = await axios.put(`${API_Tags}/tag_status/${datas.tag_id}`, {
    const { data } = await axios.put(
      `${API_STAFF}/${Result.user_id}`,
      {
        isActive: state,
        fullname: Result.fullname,
        lastname: Result.lastname,
        emailaddress: Result.emailaddress,
        email: Result.emailaddress,
        lastname: Result.lastname,
        mobile: Result.phone,
        password: Result.password,
        fullname: Result.fullname,
        role_id: Result.role_id,
        Avatar: Result.Avatar,
        role_name: Result.role_name,
      },
      config
    );

    getData();
  };

  const disputesTableColumnsadd2s = [
    {
      field: "Avatar",
      title: "Image",
      render: (rowData) => (
        <img src={`${API_View}/${rowData.Avatar}`} style={{ width: 50, borderRadius: "50%" }} />
      ),
    },
    { field: "fullname", title: "Staff Name" },
    // { field: "role_id", title: "Role Name" },
    { field: "phone", title: "Phone Number" },
    { field: "emailaddress", title: "Email" },
    // { field: "Country", title: "Country" },
    {
      field: "isActive",
      title: "Status",
      render: (row) => {
        if (row.status) {
          return (
            <Button
              size="sm"
              color={row.isActive === 1 ? "success" : "primary"}
              onClick={() => handleAttributeStatus(row, row.isActive)}
            >
              {row.isActive === 1 ? "Active" : "InActive"}
            </Button>
            // <Button size="sm" color={row.status == 1 ? "success" : "primary"}>
            //   {row.status == 1 ? "Active" : "InActive"}
            // </Button>
          );
        }
      },
    },
    {
      field: "",
      title: "Action",
      render: (row) => (
        <ul className="gx-1 my-n1">
          {/* {console.log("row", row)} */}
          <li className="mr-n1">
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                <Icon name="more-h"></Icon>
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="link-list-opt no-bdr">
                  <li>
                    <DropdownItem tag="a" onClick={() => handleAttributeStatus(row, row.isActive)}>
                      {console.log("rrrrr", row)}
                      {/* <Icon name=""></Icon> */}
                      <span>
                        {row.isActive == 1 ? (
                          <>
                            <span
                              style={{
                                color: "red",
                                fontSize: "44px",
                                paddingRight: "20px",
                                position: "relative",
                                bottom: "4px",
                                left: "4px",
                              }}
                            >
                              .
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                color: "green",
                                fontSize: "44px",
                                paddingRight: "20px",
                                position: "relative",
                                bottom: "4px",
                                left: "4px",
                              }}
                            >
                              .
                            </span>
                          </>
                        )}
                      </span>
                      <span>{row.isActive == 1 ? "InActive" : "Active"}</span>
                    </DropdownItem>
                  </li>

                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#edit"
                      onClick={() => handleopen(row, "edit")}
                    >
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" onClick={() => handleopenview(row, "view")}>
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#remove"
                      onClick={() => DeleteOpen(row)}
                    >
                      <Icon name="trash"></Icon>
                      <span>Remove</span>
                    </DropdownItem>
                  </li>
                  {/* <li>
                    <DropdownItem
                    // tag="a"
                    // href="#remove"
                    >
                      <Icon name=""></Icon>
                      <span>
                        if(active == true){

                        }
                      </span>
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

  const resetForm = () => {
    setFormData({
      ...formData,
      id: null,
      orderId: "",
      date: new Date(),
      status: "",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };
  const [cls, setCls] = useState("green");

  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.user_id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "staff");
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
          getData();
        }
        else {
          console.log("login");
          toast.error("Something Wrong", {
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
      {/* <style>{`
        .red {color: red}
        .green {color: green}
      `}</style> */}
      <Head title="Staff" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-end">
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
                          <span>Add Staff </span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
        </Block>

        {/* <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable
            icons={tableIcons}
            data={staffData}
            columns={disputesTableColumnsadd2s}
            title="STAFF LIST"
            options={options}
          />
        </MuiThemeProvider> */}
        <CustomDataTable icons={tableIcons} data={staffData} columns={disputesTableColumnsadd2s}
          title="STAFF LIST"
          actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows
            },
          ]}
        />

        <Modal isOpen={view.add} className="modal-dialog-centered" size="lg">
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
            <div className="">
              <h5 className="title">{ID ? "Edit Staff" : "Add Staff"}</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          First Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the First Name"
                            name="fullname"
                            value={staff.fullname}
                            onChange={handleStaff}
                            ref={register({ required: "This is required" })}
                            // defaultValue='Micheal'
                            required
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Last Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Last Name"
                            name="lastname"
                            value={staff.lastname}
                            onChange={handleStaff}
                            ref={register({ required: "This is required" })}
                            // defaultValue='Jack'
                            required
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Email Address
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter the Email Address"
                            name="email"
                            value={staff.email}
                            onChange={handleStaff}
                            ref={register({ required: "This is required" })}
                            autoComplete="off"
                            required
                          // defaultValue='micheal@babayamore.in'
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {ID ? (
                      <>{null}</>
                    ) : (
                      <>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              Password
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the Password"
                                name="password"
                                value={staff.password}
                                onChange={handleStaff}
                                ref={register({ required: "This is required" })}
                                // minLength={8}
                                minLength={8}
                                maxLength={15}
                                autoComplete="off"
                                required

                              // defaultValue='123456'
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>
                      </>
                    )}

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Mobile Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="tel"
                            onChange={handleStaff}
                            className="form-control"
                            name="mobile"
                            value={staff.mobile}
                            // onInput={(e) => {
                            //   e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 15);
                            // }}
                            placeholder=" Enter the Mobile Number "
                            ref={register({ required: "This is required" })}
                            pattern="[0-9]{10}"
                            autoComplete="off"
                            required
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                          {/* {error1.mobile && <span className="invalid">{error1.mobile}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <label className="form-label">Upload Image</label>

                      <Dropzone
                        onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
                        accept={[".jpg", ".png", ".svg"]}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="dropzone upload-zone small dz-clickable p-0">
                              <input {...getInputProps()} />
                              {files.length === 0 && (
                                <div className="dz-message">
                                  <span className="dz-message-text">Drag & Drop a File</span>
                                  <span className="dz-message-or">or</span>
                                  <span>Upload</span>
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
                                            <span className="dz-message-text">Drag & Drop to Upload File</span>
                                            <span className="dz-message-or">or</span>
                                            <Button color="primary">Upload</Button>
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
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Select Role
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="role_id"
                            onChange={(event) => setRoleadd(event)}
                            options={role}
                            value={roleadd}
                            placeholder="Select"
                            required
                          />
                          {/* {errors.customer && <span className="invalid">{errors.customer.message}</span>} */}
                          {error1.roleSelect ? <p style={{ color: "red" }}>{error1.roleSelect}</p> : ""}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            // onChange={handleStatus}
                            options={[
                              { value: "1", label: "Active" },
                              { value: "0", label: "InActive" },
                            ]}
                            name="status"
                            //value={isActive}
                            placeholder="Select"
                            required
                            onChange={handleChangeStatus}
                            value={active}
                          />
                          {/* {errors.customer && <span className="invalid">{errors.customer.message}</span>} */}
                          {error.statuss ? <p style={{ color: "red" }}>{error.statuss}</p> : ""}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit" className="float-right" style={{ top: "5px" }}>
                        <span>{ID ? "UPDATE" : "SAVE"}</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.view} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">View Staff</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col md="6">
                    <p>First Name : {staff.fullname}</p>
                  </Col>
                  <Col md="6">
                    <p>Last Name : {staff.lastname}</p>
                  </Col>
                  <Col md="6">
                    <p>Email Address : {staff.email}</p>
                  </Col>
                  <Col md="6">
                    <p>Mobile Number : {staff.mobile}</p>
                  </Col>
                  <Col md="6">
                    <p>Role : {staff.role_name}</p>
                  </Col>
                  <Col md="6">
                    {/* <p>Status : {}</p> */}
                    {/* <span class="caption-text">{staff.isActive === 1 ? "Active" : "InActive"}</span> */}
                  </Col>
                  <Col md="6">
                    {/* {
                      files.map((files)=>{
                        return(
                          <>
                        <p> Image : <img src={`${API_View}/${files.image}`} /></p> 
                          </>
                        )

                      })
                    } */}
                    <p>
                      {" "}
                      Image : <img src={`${API_View}/${staff.Avatar}`} />
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>

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
              <h4 className="nk-modal-title">{Deleteicon ? "Staff deleted successfully" : "Do you want to delete"}</h4>
              {Deleteicon ? (
                <div className="nk-modal-action mt-5 d-flex justify-content-around"></div>
              ) : (
                <div className="nk-modal-action mt-5 d-flex justify-content-around">
                  <Button color="light" size="lg" className="btn-mw" style={{ left: "20px" }} onClick={Deletedata}>
                    Confirm
                  </Button>
                  <Button
                    color="light"
                    size="lg"
                    className="btn-mw"
                    style={{ right: "20px" }}
                    onClick={toggleModalFail}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </ModalBody>
        </Modal>
      </Content>
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
      />
    </React.Fragment>
  );
};
export default Admin;
