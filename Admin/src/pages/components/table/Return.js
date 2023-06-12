import React, { useEffect, useState, forwardRef } from "react";
import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import { Link, NavLink, useHistory } from "react-router-dom";
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
import axios from "axios";
import { API_URL, API_Return, token } from "../../../Api";
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

import {
  DisputesTableData11,
  DisputesTableCancelData1,
  disputesTableColumns2sc1,
  disputesTableColumns2s1,
  userData,
} from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  Badge,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};
const Return = () => {
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
  };

  // Material Table

  const [filter, setFilter] = useState(false);

  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });

    const history = useHistory();
    const View = (id) => {
      history.push({ pathname: "/dashboard/orders-lists", state: id });
  };
  const handleView = (Suborder_id,order_no,row_id,product_id) => {
      const id={
          "order_no":order_no,
          "Suborder_id":Suborder_id,
          "row_id":row_id,
          "prod_id":product_id

      }
    console.log(id,"dassssssssss")
      history.push({ pathname: "/dashboard/orders-lists1", state: id });
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
  // Material Table
  const [data, setData] = useState([]);

    useEffect(() => {
      // const ids = localStorage.getItem("MerchantView");
      Getdata();
    }, []);
    const Getdata = async () => {
      const Result = await axios.get(`${API_Return}`, config);
      console.log(Result,"Result");
      setData(Result.data.list);
    };
  const disputesTableColumnsCancel = [
    
    { field: "order_no", title: "Order ID" , render:row=><Link  onClick={()=>View(row.order_no)} >{row.order_no}</Link>},
    { field: "Suborder_id", title: "Sub-Order ID", render:row=><Link  onClick={()=>handleView(row.Suborder_id,row.order_no,row.id,row.product_id)} >{row.Suborder_id}</Link> },
    { field: "full_name", title: "Customer Name" },
    { field: "invoice_number", title: "Invoice Number" },
    { field: "company_name", title: "Vendor Name" },
    { field: "Return date", title: "Return Date" },
    { field: "Address", title: "Shipping Address" },
    { field: "total", title: "Total Amount" },
    { field: "ProductName", title: "Product Name" },
    { field: "SKU", title: "SKU" },
    { field: "qty", title: "Quantity" },
    { field: "SalePrice", title: "Price" },
    { field: "Tracking", title: "Tracking Numbers" },
    { field: "warehouse_name", title: "Ware House Name" },
    { field: "Shipping_type", title: "Shipping Type" },
    { field: "shipping_company", title: "Shipping Company" },
    {
      field: "order_status",
      title: "Order Status",
      // render: (row) => <Badge color="primary">Delivered</Badge>,
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
                    <DropdownItem tag="a"  onClick={() => View(row.order_no)}>
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

  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false,
    };
    // setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
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

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      
      <div className="d-flex bg-white px-1">
        <div className="form-group" style={{ width: "160px", margin: "10px" }}>
          <label className="form-label" htmlFor="fromdate">
            From Date
          </label>
          <div className="form-control-wrap">
            <input
              type="date"
              className="form-control"
              placeholder="Enter From date"
              id="fromdate"
              name="Fromdate"
              // ref={register({ required: "This is required" })}
              // value={MainCategory.CategoryName}
              // onChange={handleChangemainCate}
            />
            {/* {errors.CategoryName && <span className="invalid">{errors.CategoryName.message}</span>} */}
          </div>
        </div>
        <div className="form-group" style={{ width: "160px", margin: "10px" }}>
          <label className="form-label" htmlFor="todate">
            To Date
          </label>
          <div className="form-control-wrap">
            <input
              type="date"
              className="form-control"
              placeholder="Enter From date"
              id="dateto"
              name="Todate"
              // ref={register({ required: "This is required" })}
              // value={MainCategory.CategoryName}
              // onChange={handleChangemainCate}
            />
            {/* {errors.CategoryName && <span className="invalid">{errors.CategoryName.message}</span>} */}
          </div>
        </div>

        <div className="" style={{ width: "160px", margin: "10px" }}>
          <label className="form-label" htmlFor="customer">
            Shipment type
          </label>
          <RSelect
            name=""
            options={[
              { value: "Sameday", label: "Same Day" },
              { value: "NormalDelivery", label: "Normal Delivery" },
            ]}
            onChange={""}
            placeholder="Shipment type"
            // value={ATTSelectGST}
          />
        </div>

        <div className="" style={{ width: "200px", margin: "10px" }}>
          <label className="form-label" htmlFor="customer">
            Shipment Company
          </label>
          <RSelect
            name="GST"
            options={[
              { value: "Express", label: "Express" },
              { value: "Ecom", label: "Ecom" },
              { value: "Delivery", label: "Delivery" },
            ]}
            // onChange={""}
            // value={ATTSelectGST}
            placeholder="Shipment Company"
          />
        </div>
        <div className="" style={{ width: "200px", margin: "10px" }}>
          <label className="form-label" htmlFor="customer">
            Enter SKU
          </label>
          <Input placeholder="Enter SKU" />
        </div>
        <div className="" style={{ width: "200px", margin: "10px" }}>
          <label className="form-label" htmlFor="customer">
            Search by customer
          </label>
          <Input placeholder="Search by customer" />
        </div>
      </div>
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
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
              </div>
            </BlockHeadContent>
          </BlockHead>
        </Block>

        {/* <MuiThemeProvider theme={Tabletheme()}>
                    <MaterialTable
                        icons={tableIcons}
                        data={DisputesTableCancelData1}
                        columns={disputesTableColumnsCancel}
                        title="RETURN LIST"
                        options={options}
                    />
                </MuiThemeProvider> */}
        <CustomDataTable
          icons={tableIcons}
          data={data}
          columns={disputesTableColumnsCancel}
          title="RETURN LIST"
        />
      </Content>
    </React.Fragment>
  );
};
export default Return;
