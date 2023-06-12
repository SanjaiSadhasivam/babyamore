import React, { useEffect, useState, forwardRef } from "react";
import "./Roles.css";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import MaterialTable from "material-table";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
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
import { API_URL, API_Role, token } from "../../../Api";
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
} from "../../../components/Component";

import { messageData } from "./MessageData";

import { DisputesTableDataroles, disputesTableColumnsroles, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {
  FormGroup,
  Form,
  Input,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  Badge,
} from "reactstrap";

import { useCookies } from "react-cookie";

const Role_Api = `${API_URL}/admin/VendorRoles`;
// const Role_img = `${API_URL}/Homepage_sec_Card_image`

const Roles = () => {
  const [attributeCheck, setAttributeCheck] = useState({
    visible: false,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [CartCheck, setCartCheck] = useState({
    visible1: false,
    View1: false,
    Add1: false,
    Edit1: false,
    Delete1: false,
  });

  const [DisputeCheck, setDisputeCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Update: false,
    Delete: false,
    Reply: false,
  });

  const [ManufacturerCheck, setManufacturerCheck] = useState({
    visible: false,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [MessageCheck, setMessageCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Update: false,
    Delete: false,
    Reply: false,
  });

  const [OrderCheck, setOrderCheck] = useState({
    visible: false,
    View: false,
    Add: false,
    Fullfill: false,
    Cancel: false,
    Archive: false,
    Delete: false,
  });

  const [ProductCheck, setProductCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [Refundcheck, setRefundCheck] = useState({
    visible: false,
    View: false,
    Initiate: false,
    Update: false,
    Approve: false,
  });

  const [RoleCheck, setRoleCheck] = useState({
    visible: false,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [UserCheck, setUserCheck] = useState({
    visible: false,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
    Login: false,
  });

  // const [permissions,setPermisstion]=useState([]);

  const permissions = [
    {
      model_name: "products",
      view: ProductCheck.View ? 1 : 0,
      edit: ProductCheck.Delete ? 1 : 0,
    },
    {
      model_name: "orders",
      view: DisputeCheck.View ? 1 : 0,
      edit: DisputeCheck.Delete ? 1 : 0,
    },
    {
      model_name: "profile",
      view: MessageCheck.View ? 1 : 0,
      edit: MessageCheck.Delete ? 1 : 0,
    },
  ];
  const [User, setUser] = useState({
    role_name: "",
    Status: "",
    createDt: "",
    modifyDt: "",
  });

  const [cookies, setCookie, removeCookie] = useCookies();
  const Auths = cookies.accesstoken;
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [dataList, setdataList] = useState([]);
  // const [descriptions, setdescriptions] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [BrandView, setBrandView] = useState("");
  const [ID, setID] = useState("");
  const [rating, setRating] = useState(0);
  const [state, setState] = useState({ value: null });
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });
  // const [state, setState] = useState({ value: null });
  // const handleChange = value => {
  //   setState({ value });
  // };

  const [smOption, setSmOption] = useState(false);

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

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [DeleteId, setDeleteId] = useState("");
  useEffect(() => {
    Getrole();
  }, []);

  // const GetRole = async () => {
  //   const data = await axios.get(`${Role_Api}/${cookies.vendor_id}`, {
  //     headers: { Authorization: `Bearer ${token} ` },
  //   });
  //   // console.log("aaa",data.data.list[4].JSON.parse(permission))
  //   setdataList(data.data.list);
  // };
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token} `,
    },
  };
  const Getrole = async (id) => {
    // setdataList([]);
    const data = await axios.get(`${API_Role}/?vendor_id=${cookies.vendor_id}`, config);
    setdataList(data.data.list);
  };
  const [DeleteTittle, setDeleteTittle] = useState("Do you want Delete!");
  const [Deleteicon, setDeleteicon] = useState(false);

  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...User, [name]: value });
  };

  const EditTable = async (data, type) => {
    let { role_name, role_id } = data;
    setID(role_id);
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });

    let permiss = JSON.parse(data.permission);

    setUser({
      role_name: role_name,
    });
    setProductCheck({
      View: permiss[0].view == 1 ? true : false,
      Delete: permiss[0].edit == 1 ? true : false == 1 ? true : false,
    });
    setDisputeCheck({
      View: permiss[1].view == 1 ? true : false,
      Delete: permiss[1].edit == 1 ? true : false,
    });
    setMessageCheck({
      View: permiss[2].view == 1 ? true : false,
      Delete: permiss[2].edit == 1 ? true : false,
    });
    // setDate(Result.data.list.Dob)
    // setdescriptions(Result.data.list.Description);
  };

  const Deletedata = async () => {
    const { data } = await axios.put(`${Role_Api}/delete/${DeleteId}`, { Status: 0 }, config);
    if (data) {
      onFormCancel();
      Getrole();
      setModalFail(!modalFail);
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (data) => {
    setDeleteId(data.role_id);
    setModalFail(true);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    // resetForm();
    setUser({
      ...User,
      role_name: "",
      permission: "",
      // Description:"",
      // Access:"",
      Status: "",
      createDt: "",
      modifyDt: "",
    });
    setProductCheck({
      View: false,
      Delete: false,
    });
    setDisputeCheck({
      View: false,
      Delete: false,
    });
    setMessageCheck({
      View: false,
      Delete: false,
    });
    // setFiles1([]);
    // setImageChange(false)
    Getrole();
    // setdescriptions('');
    setID("");
  };
  // const onFormSubmit = (form) => {
  //   // const User = form;
  //   let submittedData = {
  //     id: "",
  //     Name:"",
  //     RoleType:"",
  //     Description:"",
  //     Access:"",
  //     Status:"",
  //     createDt : "",
  //     modifyDt :""
  //   };
  //   setUser([submittedData, ...User]);
  //   setView({ add: false, details: false });
  //   resetForm();
  // };

  const onFormSubmit = (event) => {
    // event.preventDefault();
    if (ID) {
      Edit(ID);
    } else {
      Create();
    }
  };
  const vendarId = cookies.vendor_id;
  const Create = async (e) => {
    let formData = new FormData();
    formData.append("role_name", User.role_name);
    formData.append("permission", JSON.stringify(permissions));
    // formData.append("Description", User.Description)
    // formData.append("Access", User.Access)
    // formData.append("Status", User.Status)
    formData.append("vendor_id", vendarId);
    // formData.append("createDt", User.createDt)
    // formData.append("gender", User.modifyDt)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };

    try {
      let Result = await axios.post(Role_Api, formData, config);
      if (Result) {
        setUser({
          role_name: "",
          permission: "",
          // Description: "",
          // Access: "",
          Status: "",
          createDt: "",
          modifyDt: "",
        });
        // setFiles1([]);
        Getrole();
        // setModalFail(modalFail);
        onFormCancel();
        setState({ right: false });

        toast.success("Role Created Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        Getrole();
        setUser(false);
        onFormCancel();
      }
    } catch (error) {}
  };

  const Edit = async (id) => {
    let formData = new FormData();
    formData.append("role_name", User.role_name);
    formData.append("permission", JSON.stringify(permissions));
    formData.append("Status", User.Status);
    formData.append("vendor_id", vendarId);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };

    try {
      const result = axios.put(`${Role_Api}/${id}`, formData, config);
      if (result) {
        Getrole();
        onFormCancel();
        setID("");
        setProductCheck({
          View: false,
          Delete: false,
        });
        setDisputeCheck({
          View: false,
          Delete: false,
        });
        setMessageCheck({
          View: false,
          Delete: false,
        });
        toast.success("Role Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {}
    // window.location.href="/dashboard/product-tags"
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

  const disputesTableColumnsroles = [
    { field: "role_id", title: "Role ID" },
    { field: "role_name", title: "Role Name" },
    // { field: "permission", title: "Role permission" },
    // {
    //   field: "Status",
    //   title: "Status",
    //   render: (row) => (
    //     <Badge
    //       color="primary"
    //     >
    //       Active
    //     </Badge>
    //   ),
    // },
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
                    <DropdownItem tag="a" onClick={() => EditTable(row, "add")}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  {/* <li onClick={() => handleopenview("Viewdetails", row)}>
                    <DropdownItem tag="a"href="#remove">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    <DropdownItem tag="a" href="#remove" onClick={() => DeleteOpen(row)}>
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

  const resetForm = () => {
    setUser({
      ...User,
      id: null,
      Name: "",
      RoleType: "",
      // Description:"",
      Access: "",
      Status: "",
      createDt: "",
      modifyDt: "",
    });
  };

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };
  // state---------------------

  // state----------------------

  const handleprevent = () => (event) => {
    setAttributeCheck({
      ...attributeCheck,
      visible: !attributeCheck.visible,
      View: !attributeCheck.View,
      Add: !attributeCheck.Add,
      Edit: !attributeCheck.Edit,
      Delete: !attributeCheck.Delete,
    });
  };

  const handlechangecart = () => {
    setCartCheck({
      ...CartCheck,
      visible1: !CartCheck.visible1,
      View1: !CartCheck.View1,
      Add1: !CartCheck.Add1,
      Edit1: !CartCheck.Edit1,
      Delete1: !CartCheck.Delete1,
    });
  };

  const handlechangeDispute = () => {
    setDisputeCheck({
      ...DisputeCheck,
      visible: !DisputeCheck.visible,
      View: !DisputeCheck.View,
      Response: !DisputeCheck.Response,
      // Edit2: !DisputeCheck.Edit2,
      Delete: !DisputeCheck.Delete,
    });
  };

  const handlechangeManufacturerCheck = () => {
    setManufacturerCheck({
      ...ManufacturerCheck,
      visible3: !ManufacturerCheck.visible3,
      View3: !ManufacturerCheck.View3,
      Add3: !ManufacturerCheck.Add3,
      Edit3: !ManufacturerCheck.Edit3,
      Delete3: !ManufacturerCheck.Delete3,
    });
  };

  // cotrue = () => {
  //   setMessageCheck(
  //     {
  //       ...MessageCheck,
  //       visible: !MessageCheck.visible,
  //       View: !MessageCheck.View,
  //       Add: !MessageCheck.Add,
  //       Update: !MessageCheck.Update,
  //       Delete: !MessageCheck.Delete,
  //       Reply: !MessageCheck.Reply,
  //     }
  //   )
  // }

  const handlechangeOrderCheck = () => {
    setOrderCheck({
      ...OrderCheck,
      visible5: !OrderCheck.visible5,
      View5: !OrderCheck.View5,
      Add5: !OrderCheck.Add5,
      Fullfill5: !OrderCheck.Fullfill5,
      Cancel5: !OrderCheck.Cancel5,
      Archive5: !OrderCheck.Archive5,
      Delete5: !OrderCheck.Delete5,
    });
  };

  const handlechangeProductCheck = () => {
    setProductCheck({
      ...ProductCheck,
      visible: !ProductCheck.visible,
      View: !ProductCheck.View,
      Add: !ProductCheck.Add,
      Edit: !ProductCheck.Edit,
      Delete: !ProductCheck.Delete,
    });
  };

  const handlechangeRefundheck = () => {
    setRefundCheck({
      ...Refundcheck,
      visible7: !Refundcheck.visible7,
      View7: !Refundcheck.View7,
      Initiate7: !Refundcheck.Initiate7,
      Update7: !Refundcheck.Update7,
      Approve7: !Refundcheck.Approve7,
    });
  };

  const handlechangeRoleCheck = () => {
    setRoleCheck({
      ...RoleCheck,
      visible8: !RoleCheck.visible8,
      View8: !RoleCheck.View8,
      Add8: !RoleCheck.Add8,
      Edit8: !RoleCheck.Edit8,
      Delete8: !RoleCheck.Delete8,
    });
  };

  const handlechangeUserCheck = () => {
    setUserCheck({
      ...UserCheck,
      visible9: !UserCheck.visible9,
      View9: !UserCheck.View9,
      Add9: !UserCheck.Add9,
      Edit9: !UserCheck.Edit9,
      Delete9: !UserCheck.Delete9,
      Login9: !UserCheck.Login9,
    });
  };

  // ------------------------------------------------------

  const attributeChange = (name) => (event) => {
    // setAttributeCheck({ ...attributeCheck, [name]: event.target.checked });
    // setCartCheck({ ...CartCheck, [name]: event.target.checked });
    // setDisputeCheck({ ...DisputeCheck, [name]: event.target.checked });
    // setManufacturerCheck({ ...ManufacturerCheck, [name]: event.target.checked });
    // setMessageCheck({ ...MessageCheck, [name]: event.target.checked });
    // setOrderCheck({ ...OrderCheck, [name]: event.target.checked });
    setProductCheck({ ...ProductCheck, [name]: event.target.checked });
    // setRefundCheck({ ...Refundcheck, [name]: event.target.checked });
    // setRoleCheck({ ...RoleCheck, [name]: event.target.checked });
    // setUserCheck({ ...UserCheck, [name]: event.target.checked });
  };
  const attributeChange1 = (name) => (event) => {
    // setAttributeCheck({ ...attributeCheck, [name]: event.target.checked });
    // setCartCheck({ ...CartCheck, [name]: event.target.checked });
    setDisputeCheck({ ...DisputeCheck, [name]: event.target.checked });
    // setManufacturerCheck({ ...ManufacturerCheck, [name]: event.target.checked });
    // setMessageCheck({ ...MessageCheck, [name]: event.target.checked });
    // setOrderCheck({ ...OrderCheck, [name]: event.target.checked });
    // setProductCheck({ ...ProductCheck, [name]: event.target.checked });
    // setRefundCheck({ ...Refundcheck, [name]: event.target.checked });
    // setRoleCheck({ ...RoleCheck, [name]: event.target.checked });
    // setUserCheck({ ...UserCheck, [name]: event.target.checked });
  };
  const attributeChange2 = (name) => (event) => {
    // setAttributeCheck({ ...attributeCheck, [name]: event.target.checked });
    // setCartCheck({ ...CartCheck, [name]: event.target.checked });
    // setDisputeCheck({ ...DisputeCheck, [name]: event.target.checked });
    // setManufacturerCheck({ ...ManufacturerCheck, [name]: event.target.checked });
    setMessageCheck({ ...MessageCheck, [name]: event.target.checked });
    // setOrderCheck({ ...OrderCheck, [name]: event.target.checked });
    // setProductCheck({ ...ProductCheck, [name]: event.target.checked });
    // setRefundCheck({ ...Refundcheck, [name]: event.target.checked });
    // setRoleCheck({ ...RoleCheck, [name]: event.target.checked });
    // setUserCheck({ ...UserCheck, [name]: event.target.checked });
  };

  // -------------------------------------------------------
  const handleopenview = async (type, data) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    // const { data } = await axios.get(`${API_Staff}/${staff_id}`, config);
    // console.log(data,"ddddd");
    setUser({
      ...User,
      Name: data.role_name,
      // email_address: data.email_address,
      // phone_number: data.phone_number,
      // designation: data.designation,
      // role_id: data.role_id,
      // warehouse_id: data.warehouse_id,
    });
  };
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  return (
    <React.Fragment>
      <Head title="USER ROLES LIST" />

      <Block className="container ">
        <Row>
          <Col md={12} className="text-right mb-3">
            <div className="heading-flex justify-end">
              <div className="toggle-wrap nk-block-tools-toggle p-0">
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
                        <span>Add Role</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <MuiThemeProvider theme={Tabletheme()}>
              <MaterialTable
                icons={tableIcons}
                columns={disputesTableColumnsroles}
                data={dataList}
                title="USER ROLES LIST"
                options={options}
              />
            </MuiThemeProvider>
          </Col>
        </Row>

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
              <h5 className="title">{ID ? "Edit Role Form" : "Add Role Form"}</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Role Name*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Role Name"
                            name="role_name"
                            onChange={handleChange}
                            ref={register({ required: "This is required" })}
                            Value={User.role_name}
                            required
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex my-3">
                    <div>
                      <h5>MODULES</h5>
                    </div>
                    <div style={{ marginLeft: "39%" }}>
                      <h5>PERMISSIONS</h5>
                    </div>
                  </div>
                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="package-fill" /> PRODUCTS
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            name="categoryview"
                            // value={User.categoryview}
                            checked={ProductCheck.View}
                            onChange={attributeChange("View")}
                            id="customCheck1"
                          />
                          <label className="custom-control-label" htmlFor="customCheck1">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            name="categorydelete"
                            checked={ProductCheck.Delete}
                            onChange={attributeChange("Delete")}
                            id="customCheck2"
                          />
                          <label className="custom-control-label" htmlFor="customCheck2">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="cc-alt2-fill" /> ORDERS
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            name="catalogview"
                            className="custom-control-input form-control"
                            id="customCheck3"
                            // checked={CatlogCheck.View}
                            // onChange={attributeChange1("View")}
                            checked={DisputeCheck.View}
                            onChange={attributeChange1("View")}
                          />
                          <label className="custom-control-label" htmlFor="customCheck3">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // onChange={attributeChange1("Delete")}
                            // checked={CatlogCheck.Delete}
                            id="customCheck4"
                            name="catalogdelete"
                            checked={DisputeCheck.Delete}
                            onChange={attributeChange1("Delete")}
                          />
                          <label className="custom-control-label" htmlFor="customCheck4">
                            Delete
                          </label>
                        </div>
                        {/* <div className="custom-control custom-checkbox mx-5 mb-1">
      <input
        type="checkbox"
        className="custom-control-input form-control"
        id="customCheck4"
        onChange={attributeChange1("Delete")}
        checked={CatlogCheck.Delete}
      />
      <label className="custom-control-label" htmlFor="customCheck4">
        Delete
      </label>
    </div> */}
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="card-view" />
                            &nbsp;&nbsp; PROFILE
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck12"
                            // onChange={attributeChange11("View")}
                            // checked={Settings.View}

                            id="customCheck25"
                            name="productview"
                            checked={MessageCheck.View}
                            onChange={attributeChange2("View")}
                          />
                          <label className="custom-control-label" htmlFor="customCheck25">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck122"
                            // onChange={attributeChange11("Delete")}
                            // checked={Settings.Delete}

                            id="customCheck26"
                            name="productdelete"
                            checked={MessageCheck.Delete}
                            onChange={attributeChange2("Delete")}
                          />
                          <label className="custom-control-label" htmlFor="customCheck26">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <Col size="12" className="mt-3 p-2 d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      <span>{ID ? "UPDATE" : "SAVE"}</span>
                    </Button>
                  </Col>
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
              <h5 className="title">User Role View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-12" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Role Name</span>
                      <span class="caption-text">{User.Name}</span>
                    </div>
                    {/* <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Role Type</span>
                      <span class="caption-text">{BrandView.RoleType}</span>
                    </div> */}
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
      </Block>
    </React.Fragment>
  );
};
export default Roles;
