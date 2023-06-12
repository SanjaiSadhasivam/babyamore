import React, { useEffect, useState, forwardRef } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link, useHistory } from "react-router-dom";
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
//
// import { Block, BlockHead, BlockHeadContent, Icon, Col, Row, RSelect, CustomDataTable } from "../../../components/Component";

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  RSelect,
  CustomDataTable,
  input,
  PreviewCard,
  ReactDataTable,
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
} from "reactstrap";

import { DisputesTableDatas, disputesTableColumns2, userData } from "./TableData";
import axios from "axios";
import { API_Product, token, API_URL } from "../../../Api";
const API_Image = `${API_URL}/Product_image`;
const API_Filter = `${API_URL}/admin/SearchFilter/fliterdata`;
const API_Filter_Get = `${API_URL}/admin/SearchFilter/productfilter`;
const API_Vendor_Brand = `${API_URL}/admin/VendorBrands`;
// const API_Brand = `${API_URL}/admin/brand`;
import { useCookies } from "react-cookie";

// const API_Key = `${API_URL}/Products_Admin`;
// const API_Key_Tags = `${API_URL}/Tags_Admin`;
// const API_Key_vendor = `${API_URL}/UserVendor`;
// const API_Key_mainCate = `${API_URL}/Maincategory`;
// const API_Key_image_Path = `${API_URL}/Maincategory_view`;
// const API_Key_subcate = `${API_URL}/SubCategory`;
// const API_Key_childcate = `${API_URL}/Childcategory`;
// const API_Key_Brand = `${API_URL}/Brand`;
// const API_Key_Attributename = `${API_URL}/AttributesName`;
// const API_Key_AttributeValue = `${API_URL}/Attributes_Admin`;

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

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const ProductListPage = () => {
  const [active, setActive] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => {
    setwarehouse(!warehouse);
  };
  const classes = useStyles();
  const [smOption, setSmOption] = useState(false);
  const [filter, setFilter] = useState(false);
  const [BrandData, setBrandData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [VendorData, setVendorData] = useState([]);
  const [WarehouseData, setWarehouseData] = useState([]);
  const product_fil = [
    { value: "simple", label: "simple" },
    { value: "variable", label: "variable" },
  ];

  const active_fil = [
    { value: "1", label: "Active" },
    { value: "0", label: "In Active" },
  ];

  const stock_fill = [
    { value: "In Stock", label: "In Stock" },
    { value: "OutOf Stock", label: "OutOf Stock" },
    { value: "Low Stock", label: "Low Stock" },
  ];
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
  const [filterData, setFilterData] = useState({
    brand_id: "",
    category_id: "",
    vendor_id: "",
    warehouse_id: "",
    stock: "",
    product_filter: "",
    active_filter: "",
  });
  const history = useHistory();
  const [modalEdit, setModalEdit] = useState(false);
  const [list, setList] = useState([]);

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    // Getdata();
    GetFilterListdata();
    GetListdata();
  }, []);

  const GetListdata = async () => {
    const { data } = await axios.get(`${API_Product}`, config);

    let val = data.list.filter((currEle) => currEle.Vendor_id == cookies.vendor_id);

    setList(val);
  };
  const GetFilterListdata = async () => {
    const { data } = await axios.get(`${API_Filter}/${cookies.vendor_id}`, config);
    const datas = await axios.get(`${API_Vendor_Brand}/${cookies.vendor_id}`,config);
    const res = datas.data.list.map((pro) => {
      const datas = {
        value: pro.brand_id,
        label: pro.name,
      };

      return setBrandData((items) => [...items, datas]);
    });
    const resCategory = data.list.category.map((pro) => {
      const datas = {
        value: pro.MainCategory_id,
        label: pro.category_name,
      };

      return setCategoryData((items) => [...items, datas]);
    });
    const resVendor = data.list.vendor.map((pro) => {
      const datas = {
        value: pro.vendor_id,
        label: pro.company_name,
      };

      return setVendorData((items) => [...items, datas]);
    });
    const resWarehouse = data.list.warehouse.map((pro) => {
      const datas = {
        value: pro.warehouse_id,
        label: pro.warehouse_name,
      };

      return setWarehouseData((items) => [...items, datas]);
    });

    // setData(data.list);
  };

  const ViewTable = (id) => {
    history.push({ pathname: "/dashboard/product_list_view", state: id });
  };
  const Variation = (id) => {
    history.push({ pathname: "/dashboard/product_list_variation", state: id });
  };

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
  const handleChangeBrand = (e) => {
    setFilterData({
      ...filterData,
      brand_id:e.value,
    });
    
  };
  const handleChangeCategory = (e) => {
    setFilterData({
      ...filterData,
      category_id:e.value,
    });
  };
  const handleChangeStock = (e) => {
    setFilterData({
      ...filterData,
      stock:e.value,
    });
  };
  const handleChangeWarehouse = (e) => {
    setFilterData({
      ...filterData,
      warehouse_id:e.value,
    });
  };
  const handleChangeProductFilter = (e) => {
    setFilterData({
      ...filterData,
      product_filter:e.value,
    });
  };
  const handleChangeActiveFilter = (e) => {
    setFilterData({
      ...filterData,
      active_filter:e.value,
    });
  };


  const handleFilter = async()=>{
    
    let Filt = API_Filter_Get + '/?' + (filterData.brand_id ? (`brandid=${filterData.brand_id}`) : '') + (filterData.category_id ? (`&cateid=${filterData.category_id}`) : '') + (cookies.vendor_id ? (`&vendorid=${cookies.vendor_id}`) : '') + (filterData.warehouse_id ? (`&warehouseid=${filterData.warehouse_id}`) : '') + (filterData.product_filter ? (`&prodtype=${filterData.product_filter}`) : '') + (filterData.active_filter ? (`&prodstatus=${filterData.active_filter}`) : '');
    let result = await axios.get(`${Filt}`,config);

    if(result.data.list){
      setList(result.data.list);
    }
  }

  const handleRefresh = ()=>{
    setFilterData({
      brand_id:"",
      active_filter:"",
      category_id:"",
      product_filter:"",
      warehouse_id:"",
      vendor_id:"",
      stock:"",
    })
    GetListdata()
  }
  const handleSubmit = () => {
    alert("Data Updated");
  };


  //   {
  //     field: 'Image',
  //     title: 'Image',
  //     render: (rowData) => <img src={rowData.Image} style={{ width: 50, borderRadius: "50%" }} />,
  //   },
  //   { field: 'ProductId', title: 'Product Id' },
  //   { field: 'ProductName', title: 'Name' },
  //   { field: 'Categories', title: 'Category' },
  //   { field: 'EAN', title: 'EAN' },
  //   { field: 'Stock', title: 'Stock' },
  //   { field: 'Brand', title: 'Brand' },
  //   { field: 'Expiry', title: 'Expiry' },
  //   { field: 'ProductType', title: 'Product Type' },

  //   { field: 'SKU', title: 'SKU' },
  //   { field: 'Supplier SKU', title: 'Supplier SKU' },
  //   { field: 'SalePrice', title: 'Sale Price' },

  //   {
  //     field: "",
  //     title: "Action",
  //     render: (row) => (
  //       <ul className="gx-1 my-n1">
  //         <li className="mr-n1">
  //           <UncontrolledDropdown>
  //             <DropdownToggle
  //               tag="a"

  //               className="dropdown-toggle btn btn-icon btn-trigger"
  //             >
  //               <Icon name="more-h"></Icon>
  //             </DropdownToggle>
  //             <DropdownMenu right>
  //               <ul className="link-list-opt no-bdr" style={{ height: "122px", overflowY: "scroll" }}>
  //                 <li>
  //                   <DropdownItem
  //                     tag="a"
  //                     onClick={() => EditTable(row._id)}

  //                   >
  //                     <Icon name="edit"></Icon>
  //                     <span>Edit</span>
  //                   </DropdownItem>
  //                 </li>

  //                 <li>
  //                   <DropdownItem
  //                     tag="a"
  //                     href="#remove"
  //                   >
  //                     <Icon name="trash"></Icon>
  //                     <span>Remove</span>
  //                   </DropdownItem>
  //                 </li>
  //                 <li>
  //                   <DropdownItem
  //                     tag="a"
  //                     href=""
  //                   >

  //                     <Link to="/dashboard/prod-list/product-lists-attr" style={{ margin: "0px", padding: "0px" }}>
  //                       <Icon name="swap-v"></Icon>
  //                       <span>Variation</span>
  //                     </Link>
  //                   </DropdownItem>
  //                 </li>
  //                 <li>
  //                   <DropdownItem
  //                     tag="a" >
  //                     <Link to="prod-list/add-stocks" style={{ padding: '0', margin: '0' }}>
  //                       <Icon name="plus"></Icon>
  //                       <span>Add Stock</span>
  //                     </Link>
  //                   </DropdownItem>
  //                 </li>
  //                 <li>
  //                   <DropdownItem
  //                     tag="a"
  //                   // href=""
  //                   >
  //                     <Icon name="eye-alt"></Icon>
  //                     <a href="#" onClick={Warehouse} style={{ padding: "1px 0px 0px 5px" }}>Quick Edit</a>
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

  //Delete Popup
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (id) => {
    // setDEleteId(id)
    setModalFail(true);
  };

  const ActiveOpen = (id) => {
    setActive(!active);
  };

  //     {

  //         Image: "",
  //         ProductId: "PROD-0004",
  //         ProductName: "Baby lotion",
  //         Categories: "Skin&Hair",
  //         EAN: "001",
  //         Stock: "5",
  //         Brand: "Aveeno",
  //         Expiry: "12/8/25",
  //         ProductType: "Simple",
  //         SKU: "SKU001",
  //         SupplierSKU: "SSKU01",
  //         Price: "200",
  //     },

  // ];
  // console.log(data,"datadatadatadatadatadatadata")/
  const ProductCodeColumns = [
    {
      field: "ProductImage",
      title: "Image",
      render: (rowData) => (
        <img src={`${API_Image}/${rowData.ProductImage}`} style={{ width: 50, borderRadius: "50%" }} />
      ),
    },
    { field: "Productlist_id", title: "Product ID" },
    { field: "ProductName", title: "Name" },
    { field: "ProductType", title: "Product Type" },
    {
      field: "MainCategory",
      title: "Category",
      render: (row) => (
        <>
          {row.MainCategory?.map((item) => {
            return <span>{item.label} &emsp;</span>;
          })}
        </>
      ),
    },
    { field: "EAN", title: "EAN" },
    { field: "current_stock", title: "Stock" },
    // { field: 'EAN', title: 'EAN' },
    // { field: 'HSN', title: 'HSN' },
    // { field: 'SKU', title: 'SKU' },
    { field: "RegularPrice", title: "Price" },
    { field: "SalePrice", title: "Sale Price" },
    {
      field: "Status",
      title: "Status",
      render: (row) => {
        return (
          <Button size="sm" color={row.Status == 1 ? "success" : "primary"}>
            {row.Status === 1 ? "Active" : "InActive"}{" "}
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
                <ul className="link-list-opt no-bdr" style={{ overflowY: "scroll" }}>
                  {/* <li>
                    <DropdownItem tag="a" onClick={() => ViewTable(row.Productlist_id)}>
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li> */}
                  {/* <li>
                                        <DropdownItem
                                            tag="a"
                                            // href="#QuickView"
                                            onClick={Warehouse}
                                        >
                                            <Icon name="eye"></Icon>
                                           
                                            <span>View</span>
                                        </DropdownItem>
                                    </li> */}

                  {/* <li>
                    <DropdownItem
                      tag="a"
                      // href="#remove"
                      onClick={() => DeleteOpen(row._id)}
                    >
                      <Icon name="trash"></Icon>
                      <span>Remove</span>
                    </DropdownItem>
                  </li> */}
                  {/* <li>
                    <DropdownItem
                      tag="a"
                      // href="#remove"
                      onClick={() => ActiveOpen(row._id)}
                    >

                      {active === true ?

                        <Icon name="bullet-fill" style={{ color: "green" }}></Icon>
                        :
                        <Icon name="bullet-fill" style={{ color: "red" }}></Icon>
                      }



                      {active === true ? <span>Active</span> : <span>In Active</span>


                      }
                    </DropdownItem>
                  </li> */}
                  <li>
                    <Link onClick={() => Variation(row.Productlist_id)} style={{ margin: "0px", padding: "0px" }}>
                      <DropdownItem
                        tag="a"
                        // href=""
                      >
                        <Icon name="swap-v"></Icon>
                        <span>Variation</span>
                      </DropdownItem>
                    </Link>
                  </li>
                  {/* <li>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <a href="#" style={{ padding: "1px 0px 0px 5px" }}>Quick View</a>
                      <span>Open In Browser</span>
                    </DropdownItem>
                  </li> */}

                  {/* <li>
                    <DropdownItem
                      tag="a" >
                      <Link to="prod-list/add-stocks" style={{ padding: '0', margin: '0' }}>
                        <Icon name="plus"></Icon>
                        <span>Add Stock</span>
                      </Link>
                    </DropdownItem>
                  </li> */}
                  {/* <li>
                    <DropdownItem
                      tag="a"
                    // href=""
                    >
                      <Icon name="eye-alt"></Icon>
                      <a onClick={Warehouse} style={{ padding: "1px 0px 0px 5px" }}>Quick Edit</a>
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

  return (
    <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              {/* <div className="heading-flex justify-content-end" style={{ marginBottom: '1.25rem', background: "" }}> */}

              {/* <BlockTitle tag="h4">PRODUCT LIST </BlockTitle> */}
              {/* <div className="mr-3">
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    onClick={""}
                    style={{ width: "100%" }}
                  >
                    <Icon name="arrow-to-down">&nbsp;</Icon>
                    Import
                  </Button>
                </div> */}
              {/* <div className="mr-3">
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    onClick={""}
                    style={{ width: "100%" }}
                  >
                    <Icon name="arrow-to-up">&nbsp;</Icon>
                    Export
                  </Button>
                </div> */}
              {/* <div className="toggle-wrap nk-block-tools-toggle">

                  <div className="toggle-expand-content1">
                    <ul className="nk-block-tools g-3" style={{ justifyContent: "end" }}>
                      <li className="nk-block-tools-opt">
                        <Link to="product_lists_add_edit" style={{ color: "white" }}>
                          <Button
                            className="toggle btn-icon d-md-none"
                            color="primary"
                            onClick={() => {
                              toggle("add");
                            }}
                            style={{ width: "110px", top: "-73px" }}
                          >
                            <AddBox />
                            <Icon name="plus"></Icon>
                            Add Product{" "}
                          </Button>
                        </Link>
                        <Link to="product_lists_add_edit" style={{ color: "white" }}>

                          <Button
                            className="toggle d-none d-md-inline-flex"
                            color="primary"
                            onClick={() => {
                              toggle("add");
                            }}
                            style={{ width: "100%" }}
                          >
                            <Icon name="plus">&nbsp;</Icon>
                            Add Product{" "}
                          </Button>
                        </Link>

                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              <div
                className="d-flex justify-content-around mb-4 bg-white p-4"
                style={{
                  boxShadow:
                    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                }}
              >
                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="brand_id"
                    options={BrandData}
                    onChange={(e)=>handleChangeBrand(e)}
                    placeholder="Brand..."
                    value={BrandData.filter(function (option) {
                      return option.value === filterData.brand_id;
                    })}
                  />
                </div>

                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="category_id"
                    options={CategoryData}
                    onChange={(e)=>handleChangeCategory(e)}
                    placeholder="Category..."
                    value={CategoryData.filter(function (option) {
                      return option.value === filterData.category_id;
                    })}
                  />
                </div>

                <div className="" style={{ width: "110px" }}>
                  <RSelect
                
                    options={stock_fill}
                    onChange={(e)=>handleChangeStock(e)}
                    name="stock"
                    // onChange={""}
                    value={stock_fill.filter(function (option) {
                      return option.value === filterData.stock;
                    })}
                    placeholder="Stock..."
                  />
                </div>

                {/* <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="GST"
                    options={[
                      { value: "Vendor 1", label: "Vendor 1" },
                      { value: "Vendor 2", label: "Vendor 2" },
                    ]}
                    onChange={""}
                    // value={ATTSelectGST}
                    placeholder="Vendor..."
                  />
                </div> */}

                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="warehouse_id"
                    options={WarehouseData}
                    onChange={(e)=>handleChangeWarehouse(e)}
                    placeholder="Warehouse..."
                    value={WarehouseData.filter(function (option) {
                      return option.value === filterData.warehouse_id;
                    })}
                  />
                </div>
                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="product_filter"
                    options={product_fil}
                    onChange={(e)=>handleChangeProductFilter(e)}
                    placeholder="Product Filter..."
                    value={product_fil.filter(function (option) {
                      return option.value === filterData.product_filter;
                    })}
                  />
                </div>
                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="active_filter"
                    options={active_fil}
                    onChange={(e)=>handleChangeActiveFilter(e)}
                    placeholder="Active Filter..."
                    value={active_fil.filter(function (option) {
                      return option.value === filterData.active_filter;
                    })}
                  />
                </div>

                <div>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    onClick={()=>handleFilter()}
                    style={{ width: "100%" }} 
                  >
                    <Icon name=""></Icon>
                    Filter
                  </Button>
                </div>

                <div>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    
                    onClick={()=>handleRefresh()}
                    style={{ width: "100%" }}
                  >
                    <Icon name=""></Icon>
                    Refresh
                  </Button>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
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
        <MuiThemeProvider theme={Tabletheme()}>
          <CustomDataTable
            icons={tableIcons}
            columns={ProductCodeColumns}
            data={list}
            // columns={ProductCodeColumns}
            // data={ProductCodeColumnsData}
            title="PRODUCT LIST"
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
        </MuiThemeProvider>
      </Content>
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
          View
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>

      <Modal isOpen={modalFail} toggle={toggleModalFail}>
        <ModalBody className="modal-body-lg text-center">
          <div className="nk-modal">
            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
            <h4 className="nk-modal-title">Do you want Delete!</h4>
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
    </React.Fragment>
  );
};

export default ProductListPage;
