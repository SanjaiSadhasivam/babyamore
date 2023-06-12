import React, { useEffect, useState, useCallback,forwardRef } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { Nav, NavItem, TabContent, TabPane, Card } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, NavLink } from "react-router-dom";
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
  // DisputesTableDataRewardPoints,
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

import { API_URL, API_Reward, token } from "../../../Api";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const RewardPoints = ({ ...props }) => {
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [filter, setFilter] = useState(false);
  const history = useHistory();
  const [smOption, setSmOption] = useState(false);
  const [TokenIds, setTokenIds] = useState();
  const [userData, setUserData] = useState();

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };
  const [Reward, setReward] = useState({
    // id: "",
    // purchase_amt: "",
    reward_point: "",
    reward_amt: "",
    // Order: "",
    // LinkUrl: "",
    // Status: 1
  });
  const handleChangesss = ({ target: { name, value } }) => {
    setReward({ ...Reward, [name]: value });
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
  const [data, setData] = useState([]);
  const [ID, setID] = useState("");

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

  const disputesTableColumnsRewardPoints = [
    { field: "id", title: "Reward ID" },
    // {
    //   field: "OrderID",
    //   title: "Order ID ",
    //   render: (row) => (
    //     <NavLink to="/dashboard/orders-lists" color="primary">
    //       {row.OrderID}
    //     </NavLink>
    //   ),
    // },
    // { field: "ProductName", title: "Product Name  " },
    // { field: "OrderValue", title: "Order Value" },
    // { field: "purchase_amt", title: "Purchase Amount" },
    { field: "reward_amt", title: "Reward Percent" },
    { field: "reward_point", title: "Reward Point" },
    // { field: "ExpiryDate", title: "ExpiryDate" },

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
                  <li onClick={() => handleopenview(row.id, "Viewdetails")}>
                    <DropdownItem tag="a" href="#view">
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
  // const disputesTableColumnsRewardPoints = [
  //   { field: "RewardsID", title: "Reward ID" },
  //   { field: "OrderID", title: "Order ID " },
  //   { field: "ProductName", title: "Product Name  " },
  //   { field: "OrderValue", title: "Order Value" },
  //   { field: "RewardPoint", title: "Reward Point" },
  //   { field: "ExpiryDate", title: "ExpiryDate" },

  //   {
  //     field: "",
  //     title: "Action",
  //     render: (row) => (
  //       <ul className="gx-1 my-n1">
  //         <li className="mr-n1">
  //           <UncontrolledDropdown>
  //             <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
  //               <Icon name="more-h"></Icon>
  //             </DropdownToggle>
  //             <DropdownMenu right>
  //               <ul className="link-list-opt no-bdr">
  //                 <li>
  //                   <DropdownItem tag="a" href="#edit">
  //                     <Icon name="download"></Icon>
  //                     <span>Download</span>
  //                   </DropdownItem>
  //                 </li>
  //                 <li>
  //                   <DropdownItem tag="a" href="orders-lists">
  //                     <Icon name="eye"></Icon>
  //                     <span>View</span>
  //                   </DropdownItem>
  //                 </li>
  //                 <li>
  //                   <DropdownItem tag="a" href="#remove">
  //                     <Icon name="trash"></Icon>
  //                     <span>Remove</span>
  //                   </DropdownItem>
  //                 </li>
  //               </ul>
  //             </DropdownMenu>
  //           </UncontrolledDropdown>
  //         </li>
  //       </ul>
  //     ),
  //   },
  // ];

  const DisputesTableDataRewardPoints = [
    {
      RewardsID: "RW-001",
      OrderID: "OD-001",
      // ProductName: "Diaper",
      // OrderValue: "1205",
      RewardType: "Purchase",
      CustomerID: "001",
      RewardPoint: "20",
      ExpiryDate: "12-10-2022",
    },
    {
      RewardsID: "RW-002",
      OrderID: "-",
      // ProductName: "soap",
      // OrderValue: "305",
      RewardType: "Social Media",
      CustomerID: "002",
      RewardPoint: "10",
      ExpiryDate: "20-10-2022",
    },
    {
      RewardsID: "RW-003",
      OrderID: "OD-003",
      // ProductName: "cream",
      // OrderValue: "700",
      RewardType: "Referal",
      CustomerID: "003",
      RewardPoint: "25",
      ExpiryDate: "15-9-2022",
    },
    {
      RewardsID: "RW-004",
      OrderID: "-",
      // ProductName: "Hair oil",
      // OrderValue: "1050",
      RewardType: "Review",
      CustomerID: "004",
      RewardPoint: "30",
      ExpiryDate: "18-8-2022",
    },
    {
      RewardsID: "RW-005",
      OrderID: "-",
      // ProductName: "Hair oil",
      // OrderValue: "1050",
      RewardType: "Reward Points",
      CustomerID: "005",
      RewardPoint: "35",
      ExpiryDate: "30-7-2022",
    },
  ];
  useEffect(() => {
    // const ids = localStorage.getItem("MerchantView");
    Getdata();
  }, []);
  const onFormSubmitBrand = (form) => {
    if (ID) {
        Edit(ID); 
    } else {
        Create();
    }
  };
  const Create = () => {
    let formData = new FormData();
    // formData.append("purchase_amt", Reward.purchase_amt);
    formData.append("reward_amt", Reward.reward_amt);
    formData.append("reward_point", Reward.reward_point);
   

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    
    axios.post(API_Reward, formData, configs).then((res) => {
      setReward({
        ...Reward,
        // id: "",
        // purchase_amt: "",
        reward_amt: "",
        reward_point: "",
        // Order: "",
        // LinkUrl: "",
      });
      Getdata();
      setID("");
      toast.success("Reward Created Successfully! ", {
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
    // formData.append("purchase_amt", Reward.purchase_amt);
    formData.append("reward_amt", Reward.reward_amt);
    formData.append("reward_point", Reward.reward_point);

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
   
    axios.put(`${API_Reward}/${ID}`, formData, configs).then((res) => {
      setReward({
        ...Reward,
        // id: "",
        // purchase_amt: "",
        reward_amt: "",
        reward_point: "",
        // Order: "",
        // LinkUrl: "",
      });
      Getdata();
      toast.success("Reward Updated Successfully!", {
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

  const handleClickAlertOpen = (type, id) => {
    setView({ details: type === "remove" ? true : false });
    setID(id);
  };
  const handleopen = async (id, type) => {
    setID(id)
    setView({ add: type === "edit" ? true : false });
    const { data } = await axios.get(`${API_Reward}/${ID}`, config);
    setReward({
      // id: data.list[0].id,
      // purchase_amt: data.list[0].purchase_amt,
      reward_amt: data.list[0].reward_amt,
      reward_point: data.list[0].reward_point,
    });
  };
  const handleopenview = async (id, type) => {
    setID(id);
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    const { data } = await axios.get(`${API_Reward}/${id}`, config);
    console.log(data,ID,id,type,"datadatadatatatatatatatatatatatatatata");
    setReward({
      ...Reward,
      // purchase_amt: data.list[0].purchase_amt,
      reward_amt: data.list[0].reward_amt,
      reward_point: data.list[0].reward_point,

    });

    //  onFormCancel();
  };

  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Reward}/delete/${ID}`, { status: 0 }, config);
    onFormCancel();
    Getdata();
  };
  // const reversed = [...data].reverse();
  const [toggleBtn, settoggleBtn] = useState(false)
  const Getdata = async () => {
    const Result = await axios.get(`${API_Reward}`, config);
    setData(Result.data.list);
    if(Result.data.list.length>0){
      settoggleBtn(true);
    }
    else{
      settoggleBtn(false);

    }
  };
 
  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    // setImageChange(false);
    setReward({
      ...Reward,
      // id: "",
      // purchase_amt: "",
      reward_amt: "",
      reward_point: "",
      // Order: "",
      // LinkUrl: "",
    });

  };
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

  const handleBack = () => {
    localStorage.removeItem("MerchantView");
    history.push(`/dashboard/merchant-list`);
  };
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Profile" />

      <Content page="component">
        <Block size="lg" className="mb-3">
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
                          // onClick={() => {
                          //   toggle("add");
                          // }}
                        >
                          <Icon name="plus"></Icon>
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                          disabled={toggleBtn}
                        >
                          <Icon name="plus"></Icon>
                          <span>Add Rewards Point</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
        </Block>

        {/* <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable
            options={options}
            data={DisputesTableDataRewardPoints}
            columns={disputesTableColumnsRewardPoints}
            title="REWARDS POINT"
          />
        </MuiThemeProvider> */}
        <CustomDataTable
          icons={tableIcons}
          data={data}
          columns={disputesTableColumnsRewardPoints}
          title="REWARDS POINT"
        />

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
              <h5 className="title">{ID === "" ? "Add" : "Update "} Reward Point</h5>
              <div className="mt-4">
              <form onSubmit={handleSubmit(onFormSubmitBrand)}>
                  <Row className="g-3">
                    {/* <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        Purchase Amount
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the purchase_amt"
                            value={Reward.purchase_amt}
                            onChange={handleChangesss}
                            name="purchase_amt"
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col> */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        Reward %
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the reward_point"
                            name="reward_point"
                            value={Reward.reward_point}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        Reward Amount
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the reward_amt"
                            name="reward_amt"
                            value={Reward.reward_amt}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Display Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Display Name"
                            name="displayname"
                            ref={register({ required: "This is required" })}
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
                            placeholder="Enter the Email Address"
                            name="customer"
                            ref={register({ required: "This is required" })}
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
                            name="customer"
                            ref={register({ required: "This is required" })}
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
                            type="text"
                            className="form-control"
                            name=" customer"
                            placeholder=" Enter the Mobile Number "
                            // onChange={(e) => setFormData({ ...formData, customer: e.value })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
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

                    <Col size="12">
                      <Button color="primary" type="submit">
                      <span>{ID === "" ? "SAVE" : "UPDATE"}</span>
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
              <h5 className="title">Reward View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    {/* <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Purchase Amount</span>
                      <span class="caption-text">{Reward.purchase_amt}</span>
                    </div> */}
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Reward Point</span>
                      <span class="caption-text">{Reward.reward_point}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Reward Point </span>
                      <span class="caption-text">{Reward.reward_amt}</span>
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

export default RewardPoints;
