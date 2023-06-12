import React, { useEffect, useState, forwardRef } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { NavLink } from "react-router-dom";
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

// import PreviewIcon from '@mui/icons-material/Preview';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

import {
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  ReactDataTable,
  PreviewCard,
  Button,
  Icon,
  UserAvatar,
  Row,
  Col,
  RSelect,
  Block,
  DataTableHead,
  DataTableRow,
  input
} from "../../../components/Component";

import {
  DisputesTableData,
  DisputesTableData2s11,
  DisputesTableDataod1,
  disputesTableColumns2,
  disputesTableColumnsdd,
  disputesTableColumnsdd1,
  userData,
} from "./TableData";

import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";

import ContentAlt from "../../../layout/content/ContentAlt";
import {
  FormGroup,
  Label,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Badge,
  Modal,
  ModalBody,
  Form,
  Input
} from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";



const OrderssDataList = () => {

  const [filter, setFilter] = useState(false);

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
  return (
    <React.Fragment>

      <div style={{ maxWidth: '100%', marginTop: "180px",marginLeft:"60px",marginRight:"60px" }}>
        <MaterialTable
          columns={[
            { title: 'Order Id', field: 'OrderId' },
            { title: 'Vendor Name', field: 'VendorName' },
            { title: 'Warehouse Name', field: 'WarehouseName' },
            { title: 'Image', field: 'Image' },
            { title: 'Product Name', field: 'ProductName' },
            { title: 'Quantity', field: 'Quantity' },
            { title: 'Date', field: 'Date' },
            { title: 'Tracking Number', field: 'TrackingNumber' },
            { title: 'Shipping Address', field: 'ShippingAddress' },
            { title: 'Price', field: 'Price' },
            {
              field: "Status",
              title: "Order Status",
              render: (row) => (
                <Badge
                  color="primary"
                >
                  Delivered
                </Badge>
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
            }
          ]}
          data={[
            {
              OrderId: '0D_001_001',
              VendorName: "Johny",
              WarehouseName: "DHL",
              Image: <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTxceWso1-MvyJzfumkckcgjCzk8S0l_3hrZH1DfqzPafwhbyZriMVs-cUjHboB&usqp=CAc"></img>,
              ProductName: "pampers diapers",
              Quantity: "2", Date: "09-08-2022",
              TrackingNumber: "BA-001 ",
              ShippingAddress: " No.12, 1, 57th St, ECR, Tamil Nadu 600083",
              Price: "500 ",
              OrderStatus: " ",
              Action: " "
            },

            {
              OrderId: '0D_001_002',
              VendorName: "Depp",
              WarehouseName: "XPO",
              Image: <img src="https://rukminim1.flixcart.com/image/612/612/juh9ksw0/soap/r/q/s/2-75-moisturizing-baby-bathing-soap-bar-ph-5-5-with-goat-milk-original-imaffhc9cdagzybm.jpeg?q=70"></img>,
              ProductName: "baby soap",
              Quantity: "3",
              Date: "15-08-2022",
              TrackingNumber: "BA-002 ",
              ShippingAddress: " 57th St, Nungambakkam, Chennai - 600083",
              Price: "300 ",
              OrderStatus: " ",
              Action: " "
            }
          ]}
          title="Order List Data"
          options={options}
          icons={tableIcons}
        />
      </div>
    </React.Fragment>
  );
};
export default OrderssDataList;