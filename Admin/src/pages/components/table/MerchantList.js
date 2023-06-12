import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import Search from "@material-ui/icons/Search";
import "react-quill/dist/quill.snow.css";
import Clear from "@material-ui/icons/Clear";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
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
import {
  Badge,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
// import CustomerList from "../../panel/e-commerce/customer/CustomerList";
import axios from "axios";
import { API_URL, API_Vendor, token } from "../../../Api";
import { useHistory } from "react-router-dom";
import { version } from "react-dom";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const MerchantList = () => {
  const history = useHistory();
  const [isChecked1, setIsChecked1] = useState(true);
  const [data, setData] = useState([]);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ID, setID] = useState("");
  const [Vendor, setVendor] = useState({
    company_name: "",
    email_address: "",
    phone_number: "",
    password: "",
  });
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };

  // console.log("dataa", data);

  const [smOption, setSmOption] = useState(false);

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

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [filter, setFilter] = useState(false);
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

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    // resetForm();
  };

  useEffect(() => {
    Getdata();
  }, []);
  // const reversed = [...data].reverse();
  const Getdata = async () => {
    const data = await axios.get(`${API_Vendor}`, config);
    console.log("sssss", data);
    setData(data.data.list);
  };

  const EditTable = async (id) => {
    setID(id);
    const Result = await axios.get(`${API_Vendor}/${id}`);
    setVendor({
      ...Vendor,
      company_name: Result.data.company_name,
      Email: Result.data.Email,
      PhoneNumber: Result.data.PhoneNumber,
    });
    setView({
      add: true,
    });
  };

  const handleChangeVendor = ({ target: { name, value } }) => {
    setVendor({ ...Vendor, [name]: value });
  };

  const onFormSubmit = (form) => {
    if (ID) {
      Edit(ID);
    } else {
      Create();
    }
  };

  const Create = () => {
    let formData = new FormData();
    formData.append("company_name", Vendor.company_name);
    formData.append("email_address", Vendor.email_address);
    formData.append("phone_number", Vendor.phone_number);
    formData.append("password", Vendor.password);
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios.post(API_Vendor, formData, configs).then((res) => {
      setVendor({
        ...Vendor,
        vendor_id: "",
        company_name: "",
        email_address: "",
        phone_number: "",
        password: "",
      });

      toast.success("Successfully Created ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onFormCancel();
      Getdata();
    });
    window.location.reload();
  };
  // console.log("alertmsg", alertmsg);
  const Edit = (ID) => {
    let formData = new FormData();
    formData.append("company_name", Vendor.company_name);
    formData.append("email_address", Vendor.email_address);
    formData.append("phone_number", Vendor.phone_number);
    formData.append("password", Vendor.password);
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("form data", ...formData);

    axios.put(`${API_Brand}/${ID}`, formData, configs).then((res) => {
      setVendor({
        ...Vendor,
        vendor_id: "",
        company_name: "",
        email_address: "",
        phone_number: "",
        password: "",
      });

      toast.success("Successfully  Updated ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onFormCancel();
      Getdata();
    });
  };

  const ViewTable = (id) => {
    console.log("dsdsds", id);
    localStorage.setItem("MerchantView", id);
    history.push(`/dashboard/merchant-view`);
  };

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
  const [userDetail, setUserDetail] = useState({
   
    isActive: false,
    
  });

  const handleAttributeStatus = async (stat,active) => {
     
    var state = active === 1 ? 0 : 1;
    console.log(active,"yyyyyyyyy");
    console.log(stat.vendor_id,"yyyyyyyyy");
    const datas = await axios.put(`${API_Vendor}/status/${stat.vendor_id}`, { isActive: state },config);
    if (datas) {
      Getdata(stat.vendor_id);
    }
  };
 
  const disputesTableColumnsmain = [
    // {
    //   field: "ProfileImage",
    //   title: "Image",
    //   render: (rowData) => <img src={rowData.image} style={{ width: 50, borderRadius: "50%" }} />,
    // },
    { field: "company_name", title: "Company Name" },
    { field: "email_address", title: "Email" },
    { field: "phone_number", title: "Phone Number" },
    // { field: "password", title: "Password" },
    {
      field: "isActive",
      title: "Status",
      //   render: (row) => (<>
      //   {row.isActive===true?
      //   <Badge className="badge-sm" color="success">Active</Badge>:
      //   <Badge className="badge-sm" color="danger">In-Active</Badge>
      // }
      //   </>)
      render: (row) => {
        // console.log("row status", row);
        return (
          <Button size="sm" color={row.isActive == 1 ? "success" : "primary"} style={{ fontSize: "0.60rem" }}>
            {row.isActive == 1 ? "Approved" : "Pending Approval"}
          </Button>
        );
      },
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
                  {row.isActive ==1 ? null : 
                <li>
                    <DropdownItem tag="a"  onClick={() => handleAttributeStatus(row, row.isActive)}>
                      {/* <Icon name=""></Icon> */}
                      <span>
                        {row.isActive == 1 ? (
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
                      <span>{row.isActive == 1 ? "Pending Approval" : "Approved"}</span>
                    </DropdownItem>
                  </li>
    }
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#view"
                      onClick={() => ViewTable(row.vendor_id)}
                    >
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#view"
                      // onClick={() => ViewTable(row._id)}
                    >
                      {/* <Icon name="login"></Icon> */}
                      <Icon name="user-circle"></Icon>
                      <span>
                        <a href="http://localhost:4005/dashboard/auth-login" target="_blank" style={{ padding: "0px" }}>
                          Vendor Login
                        </a>
                      </span>
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
  const featuregetdata = async (event) => {
    if (event.target.checked) {
      const { data } = await axios.get(`${API_Vendor}`, config);
      console.log(data.list,"mmmmmmmmmmmmm ");
      let dataFeature = data.list.filter((currEle) => currEle.isActive === 0);
      setData(dataFeature);
    } else {
      Getdata();
    }
  };
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="MERCHANTS" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <div className="d-flex justify-content-end">
              <div className="custom-control custom-checkbox mx-5 mb-1">
                <input
                  type="checkbox"
                  className="custom-control-input form-control"
                  onChange={featuregetdata}
                  // checked={isChecked1}
                  id="customCheckaddress"
                />
                <label className="custom-control-label" htmlFor="customCheckaddress">
                  Pending Approval
                </label>
              </div>

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
                        <span>Add Vendor </span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </BlockHead>
          <BlockBetween></BlockBetween>
          {/* <MuiThemeProvider theme={Tabletheme()}>
            <MaterialTable
              icons={tableIcons}
              data={data}
              columns={disputesTableColumnsmain}
              title="VENDOR LIST"
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
          </MuiThemeProvider> */}
          <CustomDataTable icons={tableIcons} data={data} columns={disputesTableColumnsmain} title="VENDOR LIST" />
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
              <h5 className="title">Add Vendor</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Company Name*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="company_name"
                            value={Vendor.company_name}
                            onChange={handleChangeVendor}
                            placeholder="Enter Company Name"
                            required
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Email Address*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="email"
                            className="form-control"
                            name="email_address"
                            value={Vendor.email_address}
                            onChange={handleChangeVendor}
                            placeholder="Enter Email Address"
                            required
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Mobile Number*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="phone_number"
                            value={Vendor.phone_number}
                            onChange={handleChangeVendor}
                            placeholder="Enter Mobile Number"
                            required
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Password*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={Vendor.password}
                            onChange={handleChangeVendor}
                            placeholder="Enter Password"
                            required
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12" className="d-flex justify-content-end">
                      <Button color="primary" type="submit" size="md">
                        {/* <Icon className="plus"></Icon> */}
                        <span>SUBMIT</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default MerchantList;
