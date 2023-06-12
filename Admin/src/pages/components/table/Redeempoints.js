import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";

import classnames from "classnames";
import { Nav, NavItem, TabContent, TabPane, Card } from "reactstrap";
import axios from "axios";
import { API_URL, API_Reward, token } from "../../../Api";
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

import { orderData } from "../../pre-built/orders/OrderData";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
} from "reactstrap";

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

const Redeempoints = ({ ...props }) => {
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [filter, setFilter] = useState(false);
  const history = useHistory();

  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditReply, setModalEditReply] = useState(false);

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  const toggleEditReply = () => {
    setModalEditReply(!modalEditReply);
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

    useEffect(() => {
      // const ids = localStorage.getItem("MerchantView");
      Getdata();
    }, []);
    const Getdata = async () => {
      const Result = await axios.get(`${API_Reward}/getuserreward`, config);
      console.log(Result,"Result");
      setData(Result.data.list);
    };
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

  const DisputesTableDataReedemPoints = [
    {
      OrderID: "OD-001",
      // ProductName: "Disper",
      OrderValue: "1205",
      CustomerID: "001",
      RewardPoint: "12",
      ReedemUsedPoints: "02",
    },
    {
      OrderID: "OD-002",
      // ProductName: "Soap",
      OrderValue: "1000",
      CustomerID: "002",
      RewardPoint: "10",
      ReedemUsedPoints: "06",
    },
    {
      OrderID: "OD-003",
      // ProductName: "Cream",
      OrderValue: "1323",
      CustomerID: "003",
      RewardPoint: "20",
      ReedemUsedPoints: "11",
    },
    {
      OrderID: "OD-004",
      // ProductName: "Hair Oil",
      OrderValue: "400",
      CustomerID: "004",
      RewardPoint: "07",
      ReedemUsedPoints: "02",
    },
  ];

  const disputesTableColumnsReedemPoints = [
    {
      field: "OrderID",
      title: "Order ID",
      render: (row) => (
        <NavLink to="/dashboard/orders-lists" color="primary">
          {row.order_id}
        </NavLink>
      ),
    },
    // { field: "ProductName", title: "Product Name" },
    { field: "purchase_amt", title: "Order Value" },
    { field: "user_id", title: "Customer ID" },
    { field: "reward_point", title: "Reward Point" },
    { field: "reward_amt", title: "Reward Amount" },
    { field: "redeem_point", title: "Reedem Used Points" },

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
                  <li onClick={() => "reply"}>
                    <DropdownItem tag="a" onClick={toggleEditReply} style={{ cursor: "pointer" }}>
                      <Icon name="reply"></Icon>
                      <span>Reply</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" onClick={toggleEdit} style={{ cursor: "pointer" }}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#remove"
                    >
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

  return (
    <React.Fragment>
      <Head title="Profile" />
      <Content page="component">
        <Block size="lg">
          {/* <MuiThemeProvider theme={Tabletheme()}>
            <MaterialTable
              options={options}
              data={DisputesTableDataReedemPoints}
              columns={disputesTableColumnsReedemPoints}
              title="REDEEM POINT"
            />
          </MuiThemeProvider> */}
          <CustomDataTable
            icons={tableIcons}
            data={data}
            columns={disputesTableColumnsReedemPoints}
            title="REDEEM POINT"
          />
        </Block>
      </Content>
      <Modal isOpen={modalEdit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>Reedem</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter">
            <Row className="">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    Reward Point
                  </label>
                  <div className="form-control-wrap">
                    <input type="numbers" className="form-control" placeholder="Enter Reward Point" name="" />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    Reedem Used Points
                  </label>
                  <div className="form-control-wrap">
                    <input type="numbers" className="form-control" placeholder="Reedem Used Points" name="" />
                  </div>
                </div>
              </Col>
              <Col size="12" className="d-flex justify-content-end mt-2">
                <Button color="primary">Update</Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalEditReply} toggle={toggleEditReply} className="modal-md">
        <ModalHeader toggle={toggleEditReply}>Reply</ModalHeader>
        <ModalBody>
          <Row className="">
            <Col size="12" className="mt-2">
              <FormGroup>
                <label className="form-label">Reply Message</label>
                <div className="gx-2">
                  <div>
                    <div className="form-control-wrap">
                      <textarea className="form-control" />
                    </div>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col size="12" className="d-flex justify-content-end mt-2">
              <Button color="primary">Save</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Redeempoints;
