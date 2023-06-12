import React, { useEffect, useState, forwardRef } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
//
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
// import User from "../../../images/avatar/b-sm.jpg"
// import LogoDark2x from "../../images/logo-dark2x.png"
import User from "../../../images/logo-dark2x.png";

//

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  RSelect,
  input,
  PreviewCard,
  ReactDataTable,
  CustomDataTable,
} from "../../../components/Component";

import {
  FormGroup,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownToggle,
  Form,
  Label,
  UncontrolledDropdown,
  Badge,
} from "reactstrap";

import { DisputesTableDatas, disputesTableColumns2, userData } from "./TableData";
//
import { API_URL,token } from "../../../Api";
import axios from "axios";




const API_Key = `${API_URL}/admin/productlist/getSubscriptionData`;
const API_Key_Tags = `${API_URL}/Tags_Admin`;
const API_Key_vendor = `${API_URL}/UserVendor`;
const API_Key_mainCate = `${API_URL}/Maincategory`;
const API_Key_image_Path = `${API_URL}/Maincategory_view`;
const API_Key_subcate = `${API_URL}/SubCategory`;
const API_Key_childcate = `${API_URL}/Childcategory`;
const API_Key_Brand = `${API_URL}/Brand`;
const API_Key_Attributename = `${API_URL}/AttributesName`;
const API_Key_AttributeValue = `${API_URL}/Attributes_Admin`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
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

//

//
const useStyles = makeStyles((theme) => ({}));

const bordertable = {
  border: "transparent",
};

const subscription = () => {
  let updateDelete = [];
  const [active, setActive] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => {
    setwarehouse(!warehouse);
  };
  const classes = useStyles();
  const [smOption, setSmOption] = useState(false);
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState([]);
  const [invoice, setinvoice] = useState(false);
  const [formData, setFormData] = useState({
    Image: "",
    ProductName: "",
    CategoryName: "",
    BrandName: "",
    Tags: "",
    Price: "",
    Stock: "",
    SKU: "",
    ProductCode: "",
    ProductCode1: "",
    ExpiryDate: "",
    SEOName: "",
    Status: "",
  });
  const history = useHistory();
  const [modalEdit, setModalEdit] = useState(false);

  const Invoice = () => {
    setinvoice(true);
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  useEffect(() => {
    Getdata();
  }, []);

  const Getdata = async () => {
    
    const data = await axios.get(`${API_Key}`,configss);
    if(data){
      console.log("ddda",data)
      setData(data.data.list);
    }

    // console.log("data", data.data)
    // data.data.map(async (items) => {
    //   const Brand = await axios.get(`${API_Key_Brand}/${items.Brands}`);
    //   const Categories = await axios.get(`${API_Key_mainCate}/${items.MainCategory}`);
    //   // console.log("testt", Brand.data)
    //   // console.log("testt", Categories.data)
    //   const datss = {
    //     _id: items._id,
    //     ProductId: items.ProductId,
    //     ProductName: items.ProductName,
    //     Categories: Categories.data.CategoryName,
    //     Brand: Brand.data.BrandName,

    //     ProductType: items.ProductType,
    //     SKU: items.SKU,
    //     SalePrice: items.SalePrice,
    //   };
    //   setData((items) => [...items, datss]);
    // });
  };

  // const editPopup = (data) => {
  //   setFormData({
  //     id: data.id,
  //     ProductID: data.ProductID,
  //     Order: data.Order,
  //     Date: data.Date,
  //     Product: data.Product,
  //     ProductType: data.ProductType,
  //     Warehouse: data.Warehouse,
  //     Price: data.Price,
  //     Package: data.Package,
  //     Shipping: data.Shipping,
  //     ShortDescription: data.ShortDescription,
  //     FullDescription: data.FullDescription,
  //     Status: data.Status,
  //   });
  //   setModalEdit(true);
  // };

  const EditTable = (id) => {
    // window.location.href="/dashboard/product-lists"
    history.push({ pathname: "/dashboard/product_lists_add_edit", state: id });
  };
  //
  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });
  const viewDetail = () => {
    window.location.href = "product-details";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    alert("Data Updated");
  };

  //Delete Popup
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (id) => {
    // setDEleteId(id)
    setModalFail(true);
  };

  const ActiveOpen = (id) => {
    setActive(!active);
    // console.log(active)
  };

  const ProductCodeColumnsData = [
    {
      ProductId: "PROD-0004",
      customerid: "qwertyu ",
      CustomerName: "John",
      date: "14/09/2022",
    },
    {
      ProductId: "PROD-0003",
      customerid: "ytrew",
      CustomerName: "Micheal",
      date: "14/09/2022",
    },
  ];
  const reversed = [...ProductCodeColumnsData].reverse();
  const ProductCodeColumns = [
    { field: "product_id", title: "Product ID" },
    { field: "productname", title: "Product Name" },
    { field: "customer_id", title: "Customer ID" },
    { field: "full_name", title: "Customer Name" },
    { field: "phone_number", title: "Customer Phone" },
    // { field: "date", title: "Date" },

    {
      field: "aaa",
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
                    <DropdownItem
                      tag="a"
                      // onClick={toggleEdit}
                      style={{cursor: "pointer"}}
                    >
                      <Icon name="reply"></Icon>
                      <span>Reply</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                    // href="#QuickView"
                    style={{cursor: "pointer"}}

                    >
                      <Icon name="eye"></Icon>
                      <a href="#" style={{ padding: "1px 0px 0px 5px" }}>Quick View</a>6
                      <span> View</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#remove"
                      style={{ cursor: "pointer" }}

                      // onClick={() => DeleteOpen(row._id)}
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

  const handleDeleteRows = async(event, rowData) => {
    console.log(rowData,"rowData");
     rowData.map((currele)=>{
       updateDelete.push({
         value:currele.product_id ,  
       });
     })
     let gg ={
       deleteid:updateDelete,
       type:"subscription"
     
     } 
       
   
 
   let res = await axios.post("dsdsdsdsdsd",gg,configss);
 if(res){
   console.log("sasasas")
 }
 
 
   };


  return (
    <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <Block size="lg">
          <BlockHead></BlockHead>
          {/* <PreviewCard>
         
            <ReactDataTable
              data={DisputesTableDatas}
              columns={disputesTableColumns}
              selectableRows={true}
              expandableRows
              pagination
              actions
            />
          </PreviewCard> */}
        </Block>
        {/* <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable icons={tableIcons}
            // columns={ProductCodeColumns}
            // data={data}
            columns={ProductCodeColumns}
            data={ProductCodeColumnsData}

            title="SUBSCRIPTION   LIST"
            options={options}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete All Rows',
                // onClick: (event, rowData) => {
                //   // Do save operation
                //   alert("delete button clicked");
                // }
              }
            ]}
          />
        </MuiThemeProvider> */}
        <CustomDataTable icons={tableIcons} data={data} columns={ProductCodeColumns} title="SUBSCRIPTION LIST" 
        actions={[
          {
            icon: "delete",
            tooltip: "Delete All Rows",
            onClick: handleDeleteRows
          },
        ]}
        />
      </Content>
      {/* <Content >
        <div className="container" style={{ background: '#fff' }}>
          <div className="row align-items-center">
            <div className="col-md-6 text-left">
              <img src={User} style={{ width: '700px', height: '160px' }}></img>
            </div>
            <div className="col-md-6 text-right ">
              <h6>Credit Note</h6>
              <p>(Original for Recipient)</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 text-left">
              <h6>Sold By:</h6>

              <p className="text-break">
                KAY KAY OVERSEAS CORPORATION
                * No. 1/B, IndoSpace Logistics Park, Puduvoyal,
                Durainallur Village, Ponneri Taluk
                Thiruvalluvar, Tamil Nadu, 601206
                IN

              </p>
            </div>
            <div className="col-md-6 text-right ">
              <h6>Shipping Address:</h6>
              <p className="text-break">Hameedhudeen
                Hameedhudeen
                4th floor, New no 20, Old no 64, Venkata maistry
                street, Mannady
                CHENNAI, TAMIL NADU, 600001
                IN
              </p>
            </div>

          </div>
          <div className="row">
            <div className="col-md-12 text-right">
              <h6>State/UT Code :<span className="font-weight-normal">33</span></h6>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 text-left">
              <h6>PAN No: <span className="font-weight-normal">AACFK0693D</span></h6>
              <h6>GST Registration No: <span className="font-weight-normal">33AACFK0693D1ZQ</span></h6>
            </div>
            <div className="col-md-6 text-right">
              <h6>Billing Address:</h6>
              <p className="text-break"> Hameedhudeen
                4th floor, New no 20, Old no 64, Venkata maistry
                street, Mannady
                CHENNAI, TAMIL NADU, 600001
                IN</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-right">
              <h6>State/UT Code :<span className="font-weight-normal">33</span></h6>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-right">
              <h6>Place of supply:<span className="text-uppercase font-weight-normal">TAMIL NADU</span></h6>
              <h6>Place of delivery:<span className="text-uppercase font-weight-normal">TAMIL NADU</span></h6>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 text-left">
              <h5>Order No: <span className="font-weight-normal">406-9017442-1888359</span></h5>
              <h5>Original Invoice Number: <span className="font-weight-normal">MAA4-41190</span></h5>
              <h5>Original Order Date: <span className="font-weight-normal">28.04.2022</span></h5>
            </div>
            <div className="col-md-6 text-right">
              <h5>Credit Note No: <span className="font-weight-normal">MAA4-C-2554</span></h5>
              <h5>Invoice Details: <span className="font-weight-normal">1306066635-2223</span></h5>
              <h5>Credit Note Date: <span className="font-weight-normal">29.04.2022</span></h5>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 ">
              <div className="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sl.No </th>
                      <th>Description </th>
                      <th> Unit Price</th>
                      <th>Quantity   </th>
                      <th>Net Amount </th>
                      <th>
                        Tax Rate <br></br>
                        CGST
                      </th>
                      <th>
                        Tax Rate <br></br>
                        SGST
                      </th>


                      <th>Tax
                        Amount </th>
                      <th>Total
                        Amount </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 </td>
                      <td className="text-break"> Philips MG5740/15, 12-in-1, Face, Hair and Body -
                        Multi Grooming Kit. Dual Cut Blades for Maximum
                        Precision, 80 Mins Run Time (Silver) | B08VK1NKTW (
                        B08VK1NKTW )
                        HSN:85103000</td>
                      <td> -₹1,852.54</td>
                      <td>1 </td>
                      <td>-₹1,852.54 </td>
                      <td>  9%   </td>
                      <td>  9%   </td>
                      <td> -₹333.46</td>
                      <td>-₹2,186.00 </td>
                    </tr>
                    <tr>
                      <th colspan="7" rowspan="3">Total </th>
                      <td colspan="0"> -₹333.46</td>
                      <td colspan="0">-₹2,186.00</td>

                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th colSpan={12}>Amount in Words : Two Thousand One Hundred Eighty-six only</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="text-right">
                      <th colSpan={12}>
                        <h6>For KAY KAY OVERSEAS CORPORATION:</h6>
                        <p>Signature</p>
                        <h6>Authorized Signatory</h6>
                      </th>
                    </tr>
                  </tbody>




                </table>
              </div>
            </div>
          </div>
        </div>
      </Content> */}
      <Modal isOpen={modalEdit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>Edit Product</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={() => handleSubmit}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <label className="form-label" htmlFor="event-title">
                    Image
                  </label>
                  <div className="form-control-wrap">
                    <input type="text" id="event-title" readOnly value={formData.ProductID} className="form-control" />
                  </div>
                </FormGroup>
              </Col>
              <Col size="6">
                <FormGroup>
                  <label className="form-label">Name</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.ProductID}
                          onChange={handleChange}
                          name="ProductID"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col size="6">
                <FormGroup>
                  <label className="form-label">Category</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Order}
                          onChange={handleChange}
                          name="Order"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">Brand</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Date}
                          onChange={handleChange}
                          name="Date"
                          type="date"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">Tags</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Product}
                          onChange={handleChange}
                          name="Product"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">Price</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.ProductType}
                          onChange={handleChange}
                          name="ProductType"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">Stock</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Warehouse}
                          onChange={handleChange}
                          name="Warehouse"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">SKU</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Price}
                          onChange={handleChange}
                          name="Price"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">Product Code</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Package}
                          onChange={handleChange}
                          name="Package"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">Product Code2</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Shipping}
                          onChange={handleChange}
                          name="Shipping"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="6">
                <FormGroup>
                  <label className="form-label">Expiry</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <input
                          value={formData.Status}
                          onChange={handleChange}
                          name="Status"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="12">
                <FormGroup>
                  <label className="form-label">SEO Slug</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <textarea
                          value={formData.ShortDescription}
                          onChange={handleChange}
                          name="ShortDescription"
                          type="text"
                          className="form-control"
                        ></textarea>
                        {/* <input value={formData.ShortDescription} onChange={handleChange} name='ShortDescription' type="text" className="form-control" /> */}
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="12">
                <FormGroup>
                  <label className="form-label">Full Description</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <textarea
                          value={formData.FullDescription}
                          onChange={handleChange}
                          name="FullDescription"
                          type="text"
                          className="form-control"
                        ></textarea>
                        {/* <input value={formData.FullDescription} onChange={handleChange} name='FullDescription' type="text" className="form-control" /> */}
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="12">
                <ul className="d-flex justify-content-between gx-4 mt-1">
                  <li></li>
                  <li>
                    <Button color="danger" className="btn-dim" onClick={toggleEdit}>
                      Update
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Modal size="lg" isOpen={warehouse} toggle={Warehouse}>
        <ModalHeader
          toggle={Warehouse}
          close={
            <button className="close" onClick={Warehouse}>
              <Icon name="cross" />
            </button>
          }
        >
          Quick View
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>

      <Modal isOpen={modalFail} toggle={toggleModalFail}>
        <ModalBody className="modal-body-lg text-center">
          <div className="nk-modal">
            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
            <h5 className="nk-modal-title">Do you want Delete!</h5>
            {/* <div className="nk-modal-text">
                <p className="lead">
                  We are sorry, we were unable to process your payment. Please try after sometimes.
                </p>
                <p className="text-soft">If you need help please contact us at (855) 485-7373.</p>
              </div> */}
            <div className="nk-modal-action mt-5">
              <Button color="light" size="lg" className="btn-mw mr-3">
                Confirm
              </Button>
              <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal size="xl" isOpen={invoice} toggle={""} className="modal-md">
        <ModalHeader toggle={""}>Invoice</ModalHeader>
        <ModalBody className="modal-body-lg"></ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default subscription;
