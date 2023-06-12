import React, { useEffect, useState, forwardRef } from "react";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
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

import { DisputesTableData11, disputesTableColumns2sc, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  FormGroup,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import cream from "../../../assets/images/jsTree/cream.jpg";
import diapers from "../../../assets/images/jsTree/diapers.jpg";
import nappycleaning from "../../../assets/images/jsTree/nappycleaning.jpg";

import axios from "axios";
import { useCookies } from "react-cookie";
import { API_URL, token } from "../../../Api";

const API_All_User = `${API_URL}/admin/carts`;
const API_All_User_Image = `${API_URL}/Product_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const OrdersCartList = () => {
  let updateDelete = [];
  const [data, setData] = useState(orderData);
  const [smOption, setSmOption] = useState(false);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filter, setFilter] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    customer_name: "",
    product_quantity: "",
    RegularPrice: "",
    SalePrice: "",
    HSN: "",
    SKU: "",
    EAN: "",
    ProductImage: "",
  });

  // CustomerName: "Rahul",
  //   Items: "Diapers",
  //   Quantity: "2",
  //   GrandTotal: "₹500",
  //   MobileNo: "1234567890",
  //   Address: "No.12, 1, 57th St, KK Nagar, Chennai, Tamil Nadu 600028",

  const [cookies, setCookie, removeCookie] = useCookies();

  const CookieID = cookies.user_id;
  console.log("CookieID", CookieID);

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [modalEdit, setModalEdit] = useState(false);

  const [sub, setSub] = useState(0);

  const [userAllData, setUserAllData] = useState([]);
  const [allidData, setAllIdData] = useState([]);

  //Get data using id method - View option code start
  const toggleEdit = async (user_id) => {
    console.log(user_id, "idddd");
    setModalEdit(!modalEdit);

    const { data } = await axios.get(`${API_All_User}/${user_id}`, config);
     console.log(data.list, "dataaaa");

    setAllIdData(data.list);
    // console.log(file, "fikeeeee");
    setFormData({
      ...formData,
      ProductName: data.list[0].ProductName,
      product_quantity: data.list[0].product_quantity,
      RegularPrice: data.list[0].RegularPrice,
      SalePrice: data.list[0].SalePrice,
      HSN: data.list[0].HSN,
      SKU: data.list[0].SKU,
      EAN: data.list[0].EAN,
      ProductImage: data.list[0].ProductImage,
    });
  };
  //Get data using id method - View option code end

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
  const handleDeleteRows = async (event, rowData) => {
    console.log(rowData, "rowData");
    rowData.map((currele) => {
      updateDelete.push({
        value: currele.id,
      });
    })
    let gg = {
      deleteid: updateDelete,
      type: "carts"

    }



    let res = await axios.put("dsdsdsdsdsd", gg, config);
    if (res) {
      console.log("sasasas")
    }


  };
  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });

  useEffect(() => {
    userData();
  }, []);
  const unique = [];
  
  const userData = async () => {
  const allData = await axios.get(`${API_All_User}`, config);
console.log(allData,"dddd");
  setUserAllData(allData.data.list.reverse());

    // const newData = allData.data.list.filter((ele) => {

    //   // let subtotal = allData.data.list.reduce((intial, curr) => {
    //   //   const { product_quantity, SalePrice } = curr;
    //   //   let initial = intial + Number(product_quantity) * Number(SalePrice);
    //   //   return initial;
    //   // }, 0);
      
    //   // setSub(subtotal);

    //   const equalData = unique.includes(ele.user_id);
    //   if (!equalData) {
    //     unique.push(ele.user_id);
    //     return true;
    //   }
    //   return false;
    // });
   
    
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
    setData([submittedData, ...data]);
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

  const disputesTableColumns2sc = [
    { field: "customer_name", title: "Customer Name" },
    // { field: "Items", title: "Items" },
    // { field: "Quantity", title: "Quantity" },
    { field: "phone_number", title: "Mobile No" },
    { field: "Total_Price", title: "Total" },

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
                  {/* <li>
                    <DropdownItem tag="a" href="#edit">
                      <Icon name="download"></Icon>
                      <span>Download</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    {/* <DropdownItem tag="a" href="orders-lists" onClick={toggleEdit}> */}
                    <DropdownItem tag="a" onClick={() => toggleEdit(row.user_id)}>
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>

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

  const { errors, register, handleSubmit } = useForm();

  const viewData = [
    {
      productImage: diapers,
      product: "Diapers",
      qty: 2,
      price: "INR 1200",
      Sku: "ORAJ_007",
      HSN_Code: 33061020,
      EAN: 310310339739,
    },
    {
      productImage: cream,
      product: "Cream",
      qty: 1,
      price: "INR 005",
      Sku: "YUJ_001",
      HSN_Code: 23456765,
      EAN: 23456798765,
    },
    {
      productImage: nappycleaning,
      product: "Nappycleaning",
      qty: 1,
      price: "INR 500",
      Sku: "GEBJ_003",
      HSN_Code: 653474610,
      EAN: 9775546410,
    },
  ];

  return (
    <React.Fragment>
      <Head title="CART LIST" />
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
          <BlockBetween></BlockBetween>
          {/* <PreviewCard>
            <ReactDataTable
              data={DisputesTableData11}
              columns={disputesTableColumns2sc}
              expandableRows
              pagination
              actions
            />
          </PreviewCard> */}
        </Block>

        {/* <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable
            icons={tableIcons}
            data={DisputesTableData11}
            columns={disputesTableColumns2sc}
            title="CART LIST"
            options={options}
          />
        </MuiThemeProvider> */}
        <CustomDataTable
          icons={tableIcons}
          // data={DisputesTableData11}
          data={userAllData}
          columns={disputesTableColumns2sc}
          title="CART LIST"
          actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows
            },
          ]}
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
              <h5 className="title">Form</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          ATTRIBUTE*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Color", label: "Color" },
                              { value: "Format", label: "Format" },
                              { value: "Gender", label: "Gender" },
                              { value: "Pattern", label: "Pattern" },
                              { value: "Size", label: "Size" },
                              { value: "Style", label: "Style" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          ATTRIBUTE Value*
                        </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" name=" ATTRIBUTE Value*" />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          List Order
                        </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" name="customer" />
                        </div>
                      </div>
                    </Col>

                    <Col size="12" style={{ justifyContent: "end" }}>
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Save</span>
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
                <form onSubmit={handleSubmit(onFormSubmit)}>
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
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
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
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
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

      <Modal isOpen={modalEdit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>VIEW CART LIST</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={() => handleSubmit}>
            <Row className="gx-4 gy-3">
              {/* {formData.map((data) => {
                return (
                  <> */}

              {allidData.map((currEle) => {
                return (
                  <>
                    <div className="row p-0">
                      <div className="col-md-12 d-flex justify-content-between mb-2 ">
                        <div className="prod-com d-flex ">
                          <div className="images1">
                            {/* <img src={data.productImage} className="border-radius-50 imag-view-prod border mr-2"></img> */}
                            <img
                              src={`${API_All_User_Image}/${currEle.ProductImage}`}
                              alt={currEle.customer_name}
                              className="border-radius-50 imag-view-prod border"
                            ></img>
                          </div>

                          <div className="mx-4">
                            <h5 className="mb-1 fs-6">{currEle.ProductName}</h5>
                            <h6 className="mb-1 fs-6">Quantity : {currEle.product_quantity}</h6>
                            <span>Regular Price : {currEle.RegularPrice}</span>
                            <span>Sale Price : {currEle.SalePrice}</span>

                            <span>Sku : {currEle.SKU}</span>
                            <span>HSN Code: {currEle.HSN}</span>
                            <span>EAN: {currEle.EAN}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <strong>
                          Subtotal:₹{currEle.user_id ? sub : total_amount}
                          .00
                        </strong> */}
                  </>
                );
              })}

              {/* </>
                );
              })} */}
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default OrdersCartList;