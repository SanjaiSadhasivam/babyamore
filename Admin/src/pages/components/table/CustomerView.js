import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from "reactstrap";
import axios from "axios";
import { API_URL, token, API_Customer, API_Order, API_Reward, API_Carts, API_BillingAddress } from "../../../Api";
import { useHistory, useLocation } from "react-router-dom";
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
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { messageData } from "./MessageData";
import { DisputesTableData11 } from "./TablesData";
import {
  DisputesTableData2s11,
  DisputesTableDataRewardPoints,
  DisputesTableDataReedemPoints,
  DisputesTableDataod1,
  disputesTableColumns2,
  disputesTableColumnsdd,
  disputesTableColumnsdd1,
  userData,
} from "./TableData";
import { orderData } from "../../pre-built/orders/OrderData";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import { FormGroup, Label, Badge, Form, Input } from "reactstrap";
import { ListItemSecondaryAction } from "@material-ui/core";

const API_View = `${API_URL}/Product_image`;

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};

const CustomerView = ({ ...props }) => {
  console.log(props, "propss");
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [filter, setFilter] = useState(false);
  const history = useHistory();
  const [smOption, setSmOption] = useState(false);
  const [TokenIds, setTokenIds] = useState();
  const [userData, setUserData] = useState();
  const location = useLocation();

  useEffect(() => {
    Getdata();
    GetdataMenu();
    GetReward();
    GetCart();
    GetAddressData();
  }, []);
  const [data, setData] = useState([]);
  const Getdata = async () => {
    const datas = await axios.get(`${API_Customer}/${location.state}`, config);
    setData(datas.data.list);
  };
  const [Orders, setOrders] = useState([]);
  const GetdataMenu = async () => {
    const data = await axios.get(`${API_Order}/user/${location.state}`, config);
    setOrders(data.data.list);
  };
  const [Reward, setRewards] = useState([]);
  const GetReward = async () => {
    const Result = await axios.get(`${API_Reward}/getuserreward/${location.state}`, config);
    setRewards(Result.data.list);
  };
  const [Cartdata, setCartData] = useState([]);
  const GetCart = async () => {
    const Result = await axios.get(`${API_Carts}/${location.state}`, config);
    setCartData(Result.data.list);
  };
  const [Address, setAddress] = useState([]);
  const GetAddressData = async () => {
    const Result = await axios.get(`${API_BillingAddress}/userid/${location.state}`, config);
    setAddress(Result.data.list);
  };

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const selectTab = useCallback((count) => {
    setActiveIconTab(count);
  }, []);
  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });
  const tableIcons = {
    // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    //Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    // Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    // FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    // LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    // NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    // PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    // ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    // Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    // SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
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

  const disputesTableColumnsorder = [
    {
      field: "order_no",
      title: "Order ID",
      render: (row) => (
        <NavLink to="/dashboard/orders-lists" color="primary">
          {row.order_no}
        </NavLink>
      ),
    },
    { field: "createDt".slice(0, 10), title: "Date" },
    { field: "shippingaddress", title: "Shipping Address" },
    { field: "total", title: "Total Amount" },
    { field: "productname", title: "Product Name" },
    { field: "qty", title: "Quantity" },
    { field: "SalePrice", title: "Price" },
    { field: "Tracking", title: "Tracking Numbers" },
    {
      field: "order_status",
      title: "Order Status",
      render: (row) => <Badge color="primary">Delivered</Badge>,
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
                  <li>
                    <DropdownItem tag="a" href="#edit">
                      <Icon name="download"></Icon>
                      <span>Download</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#quickview">
                      <Icon name="eye-alt"></Icon>
                      <span>Quick View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="orders-lists">
                      <Icon name="eye"></Icon>
                      <span>Full View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#remove">
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
  const disputesTableColumns2sc = [
    { field: "ProductName", title: "Items" },
    { field: "product_quantity", title: "Quantity" },
    { field: "phone_number", title: "Mobile No" },
    { field: "SalePrice", title: "Total" },
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
                    <DropdownItem tag="a" href="#edit">
                      <Icon name="download"></Icon>
                      <span>Download</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="orders-lists">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#remove">
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
  const disputesTableColumnsRewardPoints = [
    { field: "reward_id", title: "Reward ID" },
    { field: "order_id", title: "Order ID " },
    // { field: "ProductName", title: "Product Name  " },
    // { field: "OrderValue", title: "Order Value" },
    { field: "RewardType", title: "Reward Type" },
    { field: "user_id", title: "Customer ID" },
    { field: "reward_amt", title: "Reward Point" },
    { field: "ExpiryDate", title: "ExpiryDate" },
    { field: "redeem_point", title: "Redeem Used Points" },
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
                    <DropdownItem tag="a" href="#edit">
                      <Icon name="download"></Icon>
                      <span>Download</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="orders-lists">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#remove">
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
  const disputesTableColumnsReedemPoints = [
    { field: "OrderID", title: "Order ID " },
    // { field: "ProductName", title: "Product Name  " },
    { field: "OrderValue", title: "Order Value" },
    { field: "CustomerID", title: "Customer ID" },
    { field: "RewardPoints", title: "Reward Point" },
    { field: "RedeemUsedPoints", title: "Reedem Used Points" },

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
                    <DropdownItem tag="a" href="#edit">
                      <Icon name="download"></Icon>
                      <span>Download</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="orders-lists">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#remove">
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
  useEffect(() => {
    const ids = localStorage.getItem("MerchantView");
    if (ids) {
      setTokenIds(ids);
      GetProfile(ids);
    }
  }, []);

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
  const onFormCancel = () => {
    setView({ add: false, details: false });
    // resetForm();
  };
  const GetProfile = async (ids) => {
    const datas = await axios.get(`${API_Vendor}/${ids}`);
    console.log(datas, "iiiiiiiiii");
    setUserData(datas.data);
  };

  const handleBack = () => {
    localStorage.removeItem("MerchantView");
    history.push(`/dashboard/merchant-list`);
  };

  return (
    <React.Fragment>
      <Head title="Profile" />
      <Content page="component">
        {/* <Button className="toggle d-none d-md-inline-flex" type="button" color="primary"
                    style={{ marginBottom: '10px' }} onClick={handleBack}>
                    <Icon name="arrow"></Icon>
                    Back to Vendor List
                </Button> */}
        <Block size="lg">
          <PreviewCard>
            <Nav tabs>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "1" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("1");
                  }}
                >
                  {/* <Icon name="eye" />  */}
                  <span>My Profile</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "2" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("2");
                  }}
                >
                  {/* <Icon name="wallet-saving" />  */}
                  <span>Addresses</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "3" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("3");
                  }}
                >
                  {/* <Icon name="user" />  */}
                  <span>My Order</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "4" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("4");
                  }}
                >
                  {/* <Icon name="building" />  */}
                  <span>Cart</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "5" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("5");
                  }}
                >
                  {/* <Icon name="wallet-saving" />  */}
                  <span>Reward/Redeem Points</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "6" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("6");
                  }}
                >
                  <span>Reedem Points</span>
                </NavLink>
              </NavItem> */}
            </Nav>
          </PreviewCard>

          <TabContent activeTab={activeIconTab}>
            <TabPane tabId="1" style={{ marginTop: "40px" }}>
              <Card>
                <div className="row">
                  {data.map((item) => {
                    console.log(item,"itemmmmmmmmmmmmmmmmmmm");
                    return (
                      <>
                        <div
                          className=" col-4 text-center my-5 p-2"
                          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 0px" }}
                        >
                          <img src={`${API_View}/${item.avatar}`} alt="preview" style={{ borderRadius: "50%", height: "150px", width: "150px", justifyContent: "center" }}></img>
                        </div>
                        <div className="col-6 my-5 p-2">
                          <div className="row">
                            <div className="col-md-12 dynami-details">
                              <div className="row ">
                                <div className="col-md-4">
                                  <p class="font-weight-bold">First Name :</p>
                                </div>
                                <div className="col-md-8">
                                  <p className="text-capitalize">{item.full_name}</p>
                                </div>
                              </div>
                              {/* <div className="row ">
                                <div className="col-md-4">
                                  <p className="font-weight-bold">Last Name:</p>
                                </div>
                                <div className="col-md-8">
                                  <p className="text-capitalize">Smith</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-md-4">
                                  <p className="font-weight-bold">User Name:</p>
                                </div>
                                <div className="col-md-8">
                                  <p>Leo Smith</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-md-4">
                                  <p className="font-weight-bold">Display Name:</p>
                                </div>
                                <div className="col-md-8">
                                  <p className="text-capitalize">Leo</p>
                                </div>
                              </div> */}
                              <div className="row ">
                                <div className="col-md-4">
                                  <p className="font-weight-bold">Email :</p>
                                </div>
                                <div className="col-md-8">
                                  <p className="text-capitalize">{item.email_address}</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-md-4">
                                  <p className="font-weight-bold">Mobile Number :</p>
                                </div>
                                <div className="col-md-8">
                                  <p className="text-capitalize">{item.phone_number}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </Card>
            </TabPane>

            <TabPane tabId="2" style={{ marginTop: "40px" }}>
              <div>
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
                                    <span>ADD ADDRESS </span>
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
                  {Address.map((datas) => {
                    return (
                      <>
                        <Card>
                          <div class="row m-2">
                            <div class="col-8">
                              <div class="row">
                                <div class="col-8">
                                  <div className="row">
                                    <div className="col-md-12 dynami-details">
                                      <div className="row ">
                                        <div className="col-md-4">
                                          <p class="font-weight-bold"> Name :</p>
                                        </div>
                                        <div className="col-md-8">
                                          <p className="text-capitalize">{datas.first_name} {datas.last_name}</p>
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-md-4">
                                          <p className="font-weight-bold">Mobile Number:</p>
                                        </div>
                                        <div className="col-md-8">
                                          <p className="text-capitalize">{datas.phonenumber}</p>
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-md-4">
                                          <p className="font-weight-bold"> Address:</p>
                                        </div>
                                        <div className="col-md-8">
                                          <p>{datas.street_address}</p>
                                          {/* <p># 17,3rd street,ashok Nagar, Chennai</p> */}
                                        </div>
                                      </div>

                                      <div className="row ">
                                        <div className="col-md-4">
                                          <p className="font-weight-bold"> City :</p>
                                        </div>
                                        <div className="col-md-8">
                                          <p className="text-capitalize">{datas.city}</p>
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-md-4">
                                          <p className="font-weight-bold"> State:</p>
                                        </div>
                                        <div className="col-md-8">
                                          <p className="text-capitalize">{datas.state}</p>
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-md-4">
                                          <p className="font-weight-bold">Country:</p>
                                        </div>
                                        <div className="col-md-8">
                                          <p className="text-capitalize">{datas.country}</p>
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-md-4">
                                          <p className="font-weight-bold"> Pincode:</p>
                                        </div>
                                        <div className="col-md-8">
                                          <p className="text-capitalize">{datas.pincode}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div class="col-4"> PRIMARY</div> */}
                              </div>
                            </div>
                            <div class="col-4">
                              <img src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"></img>
                            </div>
                          </div>
                        </Card>
                      </>
                    );
                  })}


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
                        <h5 className="title">FORM</h5>
                        <div className="mt-4">
                          <form>
                            <Row className="g-3">
                              <Col md="6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="customer">
                                    Name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter the  Name"
                                      name="customer"
                                    // ref={register({ required: "This is required" })}
                                    />
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
                                      placeholder="Enter the Mobile Number"
                                      name="lastname"
                                    // ref={register({ required: "This is required" })}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="customer">
                                    Addresses
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter the Address"
                                      name="username"
                                    // ref={register({ required: "This is required" })}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="customer">
                                    City
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter the City"
                                      name="displayname"
                                    // ref={register({ required: "This is required" })}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="customer">
                                    State
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter the State"
                                      name="customer"
                                    // ref={register({ required: "This is required" })}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="customer">
                                    Country
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter the Country"
                                      name="customer"
                                    // ref={register({ required: "This is required" })}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="customer">
                                    Pincode
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="number"
                                      className="form-control"
                                      name=" customer"
                                      placeholder=" Enter the Pincode "
                                    // onChange={(e) => setFormData({ ...formData, customer: e.value })}
                                    />
                                    {/* {errors.customer && <span className="invalid">{errors.customer.message}</span>} */}
                                  </div>
                                </div>
                              </Col>

                              <Col size="12">
                                <Button color="primary" type="submit">
                                  <span>SAVE</span>
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </Content>
              </div>
            </TabPane>

            <TabPane tabId="3" style={{ marginTop: "40px" }}>
              {/* <MuiThemeProvider theme={Tabletheme()}>
                <MaterialTable
                  data={DisputesTableData2s11}
                  columns={disputesTableColumnsorder}
                  options={options}
                  title="ORDER LIST"
                />
              </MuiThemeProvider> */}
              <CustomDataTable
                icons={tableIcons}
                data={Orders}
                columns={disputesTableColumnsorder}
                title="ORDER LIST"
              />
            </TabPane>
            <TabPane tabId="4" style={{ marginTop: "40px" }}>
              {/* <MuiThemeProvider theme={Tabletheme()}>
                <MaterialTable
                  options={options}
                  data={DisputesTableData11}
                  columns={disputesTableColumns2sc}
                  title="CART LIST"
                />
              </MuiThemeProvider> */}
              <CustomDataTable
                icons={tableIcons}
                data={Cartdata}
                columns={disputesTableColumns2sc}
                title="CART LIST"
              />
            </TabPane>
            <TabPane tabId="5" style={{ marginTop: "40px" }}>
              <div className="mb-3">
                <Row>
                  <Col sm="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="rewardpoints">
                        Total Rewards Points :
                      </label>
                      <div className="form-control-wrap">
                        <input id="rewardpoints" type="text" className="form-control" placeholder="" />
                      </div>
                    </div>
                  </Col>
                  <Col sm="4"></Col>
                  <Col sm="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="expiry">
                        Total Point Expiring by this month :
                      </label>
                      <div className="form-control-wrap">
                        <input id="expiry" type="text" className="form-control" placeholder="" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              {/* <MuiThemeProvider theme={Tabletheme()}>
                <MaterialTable
                  options={options}
                  data={DisputesTableDataRewardPoints}
                  columns={disputesTableColumnsRewardPoints}
                  title="REWARD POINTS"
                />
              </MuiThemeProvider> */}
              <CustomDataTable
                icons={tableIcons}
                data={Reward}
                columns={disputesTableColumnsRewardPoints}
                title="REWARD POINTS"
              />
            </TabPane>
            <TabPane tabId="6" style={{ marginTop: "40px" }}>
              {/* <MuiThemeProvider theme={Tabletheme()}>
                <MaterialTable
                  options={options}
                  data={DisputesTableDataReedemPoints}
                  columns={disputesTableColumnsReedemPoints}
                  title="REDEEM POINTS"
                />
              </MuiThemeProvider> */}
              <CustomDataTable
                icons={tableIcons}
                data={DisputesTableDataReedemPoints}
                columns={disputesTableColumnsReedemPoints}
                title="REDEEM POINTS"
              />
            </TabPane>
          </TabContent>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default CustomerView;
