import React, { Fragment, useState, useEffect, forwardRef } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
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
import { useHistory } from "react-router-dom";
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
  ReactDataTable,
} from "../../../components/Component";
import {
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  Badge,
  Label,
  FormGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { useCookies } from "react-cookie";

import User1 from "../../../images/avatar/a-sm.jpg";
import { RSelect } from "../../../components/Component";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import axios from "axios";
// import { API_URL } from "../../../utils/Api"
import { API_URL, API_Staff, API_Role, token, API_Warehouse } from "../../../Api";
import { data } from "../../panel/e-commerce/integration/IntegrationData";
// import { API_WareHouse } from "../../../../../Admin/src/Api";

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};

const StaffManagement = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [warehouse, setwarehouse] = useState([]);
  const Warehouse = () => {
    setwarehouse(!warehouse);
  };
  const [emailid, setemailid] = useState(false);
  const EmailId = () => {
    setemailid(!emailid);
  };
  const [mobile, setmobile] = useState(false);
  const [stateID, setstateID] = useState("");
  const MobileNumber = () => {
    setmobile(!mobile);
  };
  const { errors, register, handleSubmit } = useForm();
  // const { errors, register, handleSubmit } = useForm();
  const [smOption, setSmOption] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [data, setData] = useState([]);
  const [dataList, setdataList] = useState([]);
  const [ID, setID] = useState("");
  const [Staff, setStaff] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    password: "",
    designation: "",
    warehouse_id: "",
    role_id: "",
  });
  const [Staffview, setStaffview] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    password: "",
    designation: "",
    warehouse_id: "",
    role_id: "",
  });
  // const toggle = () => { setIsOpen(!isOpen) };

  const [view, setView] = useState({
    add: false,
    details: false,
  });

  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  useEffect(() => {
    // const vendarId = cookies.vendor_id
    Getdata();
    Getrole();
    getware(vendarId);
  }, []);
  const vendarId = cookies.vendor_id;
  const Getdata = async (id) => {
    const data = await axios.get(`${API_Staff}/?vendor_id=${vendarId}`, config);

    setData(data.data.list);
  };

  const [role, setRole] = useState("");
  const Getrole = async (id) => {
    // setdataList([]);
    const data = await axios.get(`${API_Role}`, config);
    let Result = data.data.list.filter((currEle) => {
      return currEle.vendor_id == vendarId;
    });
    const Res = Result.map((itemsMain) => {
      const datss = {
        value: itemsMain.role_id,
        label: itemsMain.role_name,
      };
      return datss;
    });
    setdataList(Res);
  };

  const handleChangeStaff = ({ target: { name, value } }) => {
    setStaff({ ...Staff, [name]: value });
  };

  const [WareHouseList, setWareHouseList] = useState([]);

  const getware = async (id) => {
    const ware = await axios.get(`${API_Warehouse}`, config);

    let Result = ware.data.list.filter((currEle) => {
      return currEle.vendor_id == vendarId;
    });

    const Res = Result.map((itemsMain) => {
      const datss = {
        value: itemsMain.warehouse_id,
        label: itemsMain.warehouse_name,
      };
      return datss;
    });
    setWareHouseList(Res);
  };

  const onFormSubmit = (form) => {
    if (ID) {
      Edit(ID);
    } else {
      Create();
    }
  };

  const Create = async () => {
    Getdata(vendarId);
    let formData = new FormData();
    formData.append("name", Staff.name);
    formData.append("email_address", Staff.email_address);
    formData.append("phone_number", Staff.phone_number);
    formData.append("password", Staff.password);
    formData.append("designation", Staff.designation);
    formData.append("role_id", role.value);
    formData.append("warehouse_id", JSON.stringify(warehouse));
    formData.append("vendor_id", vendarId);

    axios.post(API_Staff, formData, config).then((res) => {
      setStaff({
        name: "",
        phone_number: "",
        email_address: "",
        password: "",
        designation: "",
        role_id: "",
        warehouse_id: "",
      });
      setwarehouse([]);
      setRole([]);
      setStaff(false);
      onFormCancel();
      Getdata();
      toast.success("Staff Created Successfully ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const Edit = (ID) => {
    let formData = new FormData();
    formData.append("name", Staff.name);
    formData.append("email_address", Staff.email_address);
    formData.append("phone_number", Staff.phone_number);
    formData.append("password", Staff.password);
    formData.append("designation", Staff.designation);
    formData.append("role_id", Staff.role_id);
    formData.append("warehouse_id", JSON.stringify(warehouse));
    formData.append("vendor_id", vendarId);
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios.put(`${API_Staff}/${ID}`, formData, configs).then((res) => {
      setStaff({
        name: "",
        phone_number: "",
        email_address: "",
        password: "",
        designation: "",
        role_id: "",
        warehouse_id: "",
      });
      setwarehouse([]);
      setRole([]);
      setStaff(false);
      onFormCancel();
      Getdata();
      toast.success("Staff Updated Successfully ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
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
    paging: true,
    pageSize: 10,
    pageSizeOptions: [10, 20],

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

  const handleopenview = async (type, data) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    // const { data } = await axios.get(`${API_Staff}/${staff_id}`, config);

    setStaffview({
      ...Staffview,
      Name: data.name,
      email_address: data.email_address,
      phone_number: data.phone_number,
      designation: data.designation,
      role_id: data.role_id,
      warehouse_id: data.warehouse_id,
    });
  };

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    setID("");
    setwarehouse([]);
    setStaff({
      ...Staff,
      name: "",
      phone_number: "",
      email_address: "",
      password: "",
      designation: "",
      role_id: "",
      warehouse_id: "",
    });
  };

  const handleopen = async (data, type) => {
    setView({ add: type === "edit" ? true : false });
    setID(data.staff_id);
    if (data.role_id != 0 && data.role_id != "") {
      const Rolelist = await axios.get(`${API_Role}/${data.role_id}`, config);
      setRole({ value: Rolelist.data.list[0].role_id, label: Rolelist.data.list[0].role_name })
    }
    // const valid
    // setwarehouse(JSON.parse(data.warehouse_id));
    setStaff({
      ...Staff,
      name: data.name,
      email_address: data.email_address,
      phone_number: data.phone_number,
      // warehouse_id: ,
      designation: data.designation,
      role_id: data.role_id,
    });
    // setRole({ value: data.role_id, label: data.role_name });
    // setwarehouse({ value: data.warehouse_id, label: data.warehouse_name });
  };

  const handleClickAlertOpen = (type, data) => {
    setView({ details: type === "remove" ? true : false });
    setstateID(data.staff_id);
  };
  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Staff}/delete/${stateID}`, { Status: 0 }, config);
    toast.success("Deleted Successfully ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    onFormCancel();
    Getdata();
  };

  const staffmanagementTable = [
    { field: "staff_id", title: "ID" },
    { field: "name", title: "Staff Name" },
    { field: "email_address", title: "Email Address" },
    // { field: "warehouse_id", title: "Warehouse_ID" },
    { field: "phone_number", title: "Phone Number" },
    { field: "designation", title: "Designation" },
    // { field: "role_id", title: "Role" },

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
                  <li onClick={() => handleopen(row, "edit")}>
                    <DropdownItem tag="a" href="#edit">
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => handleopenview("Viewdetails", row)}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>

                  <li onClick={() => handleClickAlertOpen("remove", row)}>
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
  //   const FormValidationComponent = ({ alter, id }) => {
  //     const { errors, register, handleSubmit } = useForm();
  //     const onFormSubmit = (e) => {};
  //     const formClass = classNames({
  //       "form-validate": true,
  //       "is-alter": alter,
  //     });
  //   }

  // const dataTableColumns = [
  //   {
  //     name: "ID",
  //     selector: (row) => row.name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Name",
  //     selector: (row) => row.age,
  //     sortable: true,

  //   },
  //   {
  //     name: "EmailAddress",
  //     selector: (row) => row.gender,
  //     sortable: true,

  //   },
  //   {
  //     name: "Phonenumber",
  //     selector: (row) => row.company,
  //     sortable: true,

  //   },
  //   {
  //     name: "Designation",
  //     selector: (row) => row.startDate,
  //     sortable: true,

  //   },
  //   {
  //     name: "Roles",
  //     selector: (row) => row.salary,
  //     sortable: true,

  //   },
  //   {
  //     name: "Action",
  //     selector: (row) => row.salary,
  //     sortable: true,

  //   },
  // ];

  // const DataTableData = [
  //   {
  //     ID: 1,
  //     Name: "Francine Kirby",
  //     EmailAddress: "info@gmail.com",
  //     Phonenumber: "7896541236",
  //     Designation: "BUZZWORKS",
  //     Roles: "2017-02-17",
  //     Action: "Active",
  //   },

  // ];
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>

        <Block className="container ">
          <Row>
            <Col md={12} className="text-right mb-3">
              {/* <Button color="primary" onClick={toggle}><Icon name="plus"></Icon>&nbsp;Add New Staff</Button> */}
              <div className="heading-flex d-flex justify-content-end">
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
                    className="toggle-expand-content d-flex justify-content-end"
                    style={{ display: smOption ? "block" : "none" }}
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
                          <span>Add Staff</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12}>
              {/* <ReactDataTable data={DataTableData} columns={dataTableColumns} pagination actions /> */}
              <MuiThemeProvider theme={Tabletheme()}>
                <MaterialTable
                  icons={tableIcons}
                  data={data}
                  columns={staffmanagementTable}
                  title="STAFF LIST"
                  options={options}
                  actions={[
                    {
                      icon: "delete",
                      tooltip: "Delete All Rows",
                      // onClick: (event, rowData) => {
                      //   // Do save operation
                      //   alert("delete button clicked");
                      // }
                    },
                  ]}
                />
              </MuiThemeProvider>
            </Col>
          </Row>
          <hr></hr>
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
                <h5 className="title"> {ID ? " Edit Staff Details" : "Add Staff"}</h5>
                <div className="mt-4">
                  <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className="g-gs">
                      <Col md="6">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-full-name">
                            Full Name
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              ref={register({ required: true })}
                              type="text"
                              value={Staff.name}
                              id="fv-full-name"
                              onChange={handleChangeStaff}
                              name="name"
                              className="form-control"
                              placeholder="Enter Full Name"
                              required
                            />
                            {console.log(Staff.name, "Staff.name")}

                            {errors.fullname && <span className="invalid">This field is required</span>}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-email">
                            Email Address
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              required
                              ref={register({
                                required: true,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                              type="email"
                              value={Staff.email_address}
                              onChange={handleChangeStaff}
                              id="fv-email"
                              name="email_address"
                              className="form-control"
                              placeholder="Enter Email Address"
                            />
                            {errors.email && errors.email.type === "required" && (
                              <span className="invalid">This is required</span>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                              <span className="invalid">{errors.email.message}</span>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-password">
                            Password
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              type="password"
                              id="fv-password"
                              value={Staff.password}
                              onChange={handleChangeStaff}
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
                            />
                            {/* {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                            {errors.email && errors.email.type === "pattern" && (
                              <span className="invalid">{errors.email.message}</span>
                            )} */}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-subject">
                            Mobile Number
                          </Label>
                          <div className="form-control-wrap">
                            <input
                    
                              type="number"
                              id="fv-subject"
                              value={Staff.phone_number}
                              onChange={handleChangeStaff}
                              name="phone_number"
                              className="form-control"
                              placeholder="Enter Mobile Number"
                              required
                              maxLength={10}
                              ref={register({ required: true })}
                              minLength={10}
                            />
                            {errors.subject && <span className="invalid">This field is required</span>}
                          </div>
                        </FormGroup>
                      </Col>
                      {/* <Col md="12">
                        <Label className="form-label" htmlFor="fv-subject">
                          Address
                        </Label>
                        <div className="form-control-wrap">
                          <textarea
                            ref={register({ required: true })}
                            type="text"
                            id="fv-subject"
                            name="subject"
                            className="form-control"
                            placeholder="Enter Address"
                          />
                          {errors.subject && <span className="invalid">This field is required</span>}
                        </div>
                      </Col> */}
                      <Col md="6" className="mt-0 pt-0">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-subject">
                            Designation
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              ref={register({ required: true })}
                              type="text"
                              onChange={handleChangeStaff}
                              id="fv-subject"
                              name="designation"
                              value={Staff.designation}
                              className="form-control"
                              placeholder="Enter Designation"
                            />
                            {errors.subject && <span className="invalid">This field is required</span>}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-message">
                            Select Warehouse
                          </Label>
                          <div className="form-control-wrap">
                            <RSelect
                              name="warehouse_id"
                              onChange={(event) => setwarehouse(event)}
                              options={WareHouseList}
                              isMulti={true}
                              ref={register({ required: "This is required" })}
                              value={warehouse}
                              placeholder="Select"
                            />
                            {errors.message && <span className="invalid">This field is required</span>}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-message">
                            Select Role
                          </Label>
                          <div className="form-control-wrap">
                            <RSelect
                              name="role_id"
                              onChange={(event) => setRole(event)}
                              options={dataList}
                              ref={register({ required: "This is required" })}
                              value={role}
                              placeholder="Select"
                            />
                            {errors.message && <span className="invalid">This field is required</span>}
                          </div>
                        </FormGroup>
                      </Col>
                      {/* <Col md="12">
                        <FormGroup>
                          <Label className="form-label" htmlFor="fv-topics">
                            Select Role
                          </Label>
                          <div className="form-control-wrap">
                            <div className="form-control-select">
                              <select
                                ref={register({
                                  required: true,
                                })}
                                className="form-control form-select"
                                id="fv-topics"
                                name="topics"
                                placeholder="Select a option"
                              >
                                <option label="No Result Found" value="">No Result Found</option>

                              </select>
                              {errors.topics && <span className="invalid">This field is required</span>}
                            </div>
                          </div>
                        </FormGroup>
                      </Col> */}
                      <Col md="12">
                        <FormGroup>
                          <Button color="primary" size="md" type="submit" className="float-right">
                            {ID ? "UPDATE" : "SAVE"}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
              {/* </div> */}
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
                <h5 className="title">Staff Details</h5>
                <div className="mt-4">
                  <Row className="g-3">
                    <Col className="row" md="12">
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Staff Name</span>
                        <span class="caption-text">{Staffview.Name}</span>
                      </div>
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Email</span>
                        <span class="caption-text">{renderHTML(Staffview.email_address)}</span>
                      </div>
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Phone</span>
                        <span class="caption-text">{renderHTML(Staffview.phone_number)}</span>
                      </div>
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Designation</span>
                        <span class="caption-text">{renderHTML(Staffview.designation)}</span>
                      </div>
                      {/* <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Role</span>
                        <span class="caption-text">{renderHTML(Staffview.role_id)}</span>
                      </div>
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Warehouse</span>
                        <span class="caption-text">{renderHTML(Staffview.warehouse_id)}</span>
                      </div> */}
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
        </Block>
      </React.Fragment>
    </div>
  );
};
export default StaffManagement;
