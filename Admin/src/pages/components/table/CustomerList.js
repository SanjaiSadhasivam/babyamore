import React, { useEffect, useState, forwardRef } from "react";
import { DisputesTableDatacustomer } from "./TablesData";
import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import { ToastContainer, toast } from "react-toastify";
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
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

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
import { API_URL, token } from "../../../Api";
import { Link, useHistory } from "react-router-dom";
const API_Key = `${API_URL}/UserEmployee`;
// import { API_URL } from "../../../Api";
const API_Customer = `${API_URL}/admin/customers`;

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};

// import CustomerList from "../../panel/e-commerce/customer/CustomerList";
const CustomerList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
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
  let updateDelete = [];

  const handleChange = ({ target: { name, value } }) => {
    setCustomers({ ...Customers, [name]: value });
    console.log(Customers, "Customers");
  };

  useEffect(() => {
    Getdata();
  }, []);
  const reversed = [...data].reverse();
  const Getdata = async () => {
    const datas = await axios.get(`${API_Customer}`, config);
    console.log("datas", datas);
    setData(datas.data.list);
    // console.log(datas.data.list, "data.data");
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

  const [smOption, setSmOption] = useState(false);

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [view, setView] = useState({
    add: false,
    details: false,
  });

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const [Customers, setCustomers] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    password: "",
    status: 1,
  });

  const Submit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("full_name", Customers.full_name);
    formData.append("email_address", Customers.email_address);
    // formData.append("phone_number", Customers.FirstName);
    // formData.append("lastName", Customers.LastName);
    formData.append("password", Customers.password);
    formData.append("phone_number", Customers.phone_number);
    formData.append("status", Customers.status);
    // formData.append("displayname", Customers.DisplayName);
    console.log(...formData, "formdata");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        // Authorization: `Bearer ${Auths} `
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      axios.post(API_Customer, formData, config).then((res) => {
        setCustomers({
          // name: "",
          full_name: "",
          email_address: "",
          phone_number: "",
          password: "",
        });

        setView({ add: false, details: false });
        Getdata();
        toast.success("Register Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      });
      // .catch((msg) => {
      //   toast.error("server error", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: false,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      // });
    } catch (msg) {
      toast.error("server error", {
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
  };
  const ViewCustomer = async (id) => {
    history.push({ pathname: "/dashboard/admin_customer_view", state: id });
    const datass = await axios.get(`${API_Customer}/${id}`);
    setCustomers({
      Name: datass.data.Name,
      Email: datass.data.Email,
      FirstName: datass.data.FirstName,
      LastName: datass.data.LastName,
      Password: datass.data.Password,
      PhoneNumber: datass.data.PhoneNumber,
      UserType: datass.data.UserType,
      DisplayName: datass.data.DisplayName,
    });
    toggle("add");
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    // resetForm();
  };

  const disputesTableColumnsadd2s12 = [
    { field: "full_name", title: " User Name" },
    { field: "email_address", title: "Email" },
    { field: "phone_number", title: "Phone Number" },

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
                  <li>
                    <DropdownItem tag="a" onClick={() => ViewCustomer(row.customer_id)}>
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  {/* <li>
                    <DropdownItem tag="a" href="#edit" >
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li> */}

                  {/* <li>
                    <DropdownItem tag="a" href="#remove">
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

  const [files1, setFiles1] = useState([]);

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const { errors, register, handleSubmit } = useForm();

  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.customer_id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "customers");
    try { 
      axios.put(`${API_URL}/admin/BulkDelete/bulkDeletedata`, formData, config).then((res) => {
    
    if (res.data.statusCode) {
      toast.success("Deleted Suucessfully! ", {
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
  })
  .catch(function (error) {
    toast.error("Please delete subcategory first", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  });
} 

catch (error) {

}
    
  };
  return (
    <React.Fragment>
      <Head title="CUSTOMERS" />
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
                          <span>ADD CUSTOMER </span>
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
            data={data}
            columns={disputesTableColumnsadd2s12}
            title="CUSTOMERS LIST"
            options={options}
          />
        </MuiThemeProvider> */}
        <CustomDataTable
          icons={tableIcons}
          data={reversed}
          columns={disputesTableColumnsadd2s12}
          title="CUSTOMER LIST"
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
            <div className="p-2">
              <h5 className="title">Add Customer</h5>
              <div className="mt-4">
                <form onSubmit={Submit}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Full Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Full Name"
                            name="full_name"
                            value={Customers.full_name}
                            onChange={handleChange}
                            ref={register({ required: "This is required" })}
                            autoComplete="off"
                            required
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Last Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Last Name"
                            name="LastName"
                            value={Customers.LastName}
                            onChange={handleChange}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          User Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the User Name"
                            name="UserType"
                            value={Customers.UserType}
                            onChange={handleChange}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Display Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Display Name"
                            name="DisplayName"
                            value={Customers.DisplayName}
                            onChange={handleChange}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col> */}
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
                            name="email_address"
                            value={Customers.email_address}
                            onChange={handleChange}
                            autoComplete="off"
                            ref={register({ required: "This is required" })}
                            required
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
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
                            onChange={handleChange}
                            value={Customers.password}
                            autoComplete="off"
                            minLength={8}
                            maxLength={15}
                            ref={register({ required: "This is required" })}
                            required
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Mobile Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="tel"
                            className="form-control"
                            name="phone_number"
                            placeholder=" Enter the Mobile Number "
                            onChange={handleChange}
                            autoComplete="off"
                            value={Customers.phone_number}
                            minLength={10}
                            maxLength={15}
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 15);
                            }}
                            pattern="[0-9]{10}"
                            required
                          // onChange={(e) => setFormData({ ...formData, customer: e.value })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* <Col md="6">
                      <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                        <div className="d-flex justify-content-center align-items-center">
                          <input
                            type="file"
                            id="file-upload"
                            // disabled={file.length === 1}
                            name="BrandLogo"
                            className="form-control"
                            // onChange={uploadSingleFile}
                            style={{
                              border: "none",
                              opacity: "0",
                              zindex: "-1",
                              position: "absolute",
                              width: "200px",
                            }}
                          />
                          <label for="file-upload" style={{ padding: "30px" }}>
                            <Icon name="upload" style={{ fontSize: "25px" }}></Icon>Upload image
                          </label>
                        </div>
                      </div>
                    </Col> */}
                    {/* <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          First Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Full Name"
                            name="customer"
                            
                            value={Customers.FirstName}
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
                            placeholder="Enter the Full Name"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            value={Customers.LastName}
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
                            type="text"
                            className="form-control"
                            placeholder="Enter a Vaild Email Address"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            value={Customers.Email}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Password
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Password"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            value={Customers.Password}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        Phone Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" customer"
                            placeholder="Address Line 1"
                            // onChange={(e) => setFormData({ ...formData, customer: e.value })}
                            value={Customers.PhoneNumber}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        Display Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" customer"
                            placeholder="Address Line 1"
                            // onChange={(e) => setFormData({ ...formData, customer: e.value })}
                            value={Customers. DisplayName}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col> */}

                    {/* <Col size="12">
                      <label className="form-label">AVATAR</label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p>Brand Logo</p>}
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
                    </Col> */}

                    <Col size="12">
                      <Button color="primary float-right" type="submit">
                        <span>SAVE</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">FORM*</h5>
              <div className="mt-4">
                <form>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          ATTRIBUTE VALUE*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Color/Pattern", label: "Color/Pattern" },
                              { value: "Radio", label: "Radio" },
                            ]}
                          // onChange={(e) => setFormData({ ...formData, status: e.value })}
                          // defaultValue={formData.status}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          ATTRIBUTE Name
                        </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" name="customer" />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          List
                        </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" name="customer" />
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          CATEGORIES
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "On Hold", label: "On Hold" },
                              { value: "Delivered", label: "Delivered" },
                            ]}
                          // onChange={(e) => setFormData({ ...formData, status: e.value })}
                          // defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span> Save </span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
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
export default CustomerList;
