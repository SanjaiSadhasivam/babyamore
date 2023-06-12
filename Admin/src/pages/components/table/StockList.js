import React, { useEffect, useState, forwardRef } from "react";
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
import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { Link, useHistory } from "react-router-dom";

import {
  Block,
  BlockHead,
  BlockHeadContent,
  Icon,
  Row,
  Col,
  RSelect,
  CustomDataTable,
} from "../../../components/Component";

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { API_URL, API_Product, token } from "../../../Api";
const API_Filter = `${API_URL}/admin/SearchFilter/fliterdata`;
const API_Filter_Get = `${API_URL}/admin/SearchFilter/stockfilter`;
const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};
const StockList = () => {
  const [smOption, setSmOption] = useState(false);
  const [BrandData, setBrandData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [VendorData, setVendorData] = useState([]);
  const [WarehouseData, setWarehouseData] = useState([]);
  const stock_fill = [
    { value: "In Stock", label: "In Stock" },
    { value: "OutOf Stock", label: "OutOf Stock" },
    { value: "Low Stock", label: "Low Stock" },
  ];
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

  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });
  
  let updateDelete = [];
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  const [filter, setFilter] = useState(false);

  const EditTable = (id) => {
    history.push({ pathname: `/dashboard/stock-list-view/${id}`, state: id });
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

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (id) => {
    setModalFail(true);
  };

  const onFormCancel = () => {
    setView({ Viewdetails: false });
  };

  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  useEffect(() => {
    GetFilterListdata();
    GetListdata();
  }, []);

  const GetListdata = async () => {
    const { data } = await axios.get(`${API_Product}/getStockData`, config);
    setData(data.list);
  };
  const GetFilterListdata = async () => {
    const { data } = await axios.get(`${API_Filter}`, config);
    const res = data.list.brand.map((pro) => {
      const datas = {
        value: pro.Brandid,
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
  const [data, setData] = useState([]);
  const disputesTableColumnsmain = [
    { field: "batch_id", title: "Batch No" },
    { field: "ProductName", title: "Product" },
    { field: "warehouse_name", title: "Warehouse" },
    { field: "stockvalue", title: "Stock" },
    { field: "", title: "Expiry Date", render: (row) => <p>{row.expiry_date.slice(0, 10)}</p> },
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
                    <DropdownItem
                      tag="a"
                      // href="#edit"
                      onClick={() => EditTable(row.batch_id)}
                    >
                      <Icon name="edit"></Icon>
                      <span>View</span>
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

  const handleDeleteRows = async(events, rowData) => {
    console.log(rowData,"rowData");
    let update =   rowData.map((curreles, index) => {
      let a ={
        value:curreles.id,
      }
      return a;
    })

   
    let formData = new FormData();
    formData.append("deleteid",JSON.stringify(update));
    formData.append("type","customers");
        
    
  
    let res =await axios.put("dsdsdsdsdsd",formData,config);
  if(res){
    console.log("sasasas");
 
  } 
   };
   const handleChangeBrand = (e) => {
    setFilterData({
      ...filterData,
      brand_id: e.value,
    });
  };
  const handleChangeCategory = (e) => {
    setFilterData({
      ...filterData,
      category_id: e.value,
    });
  };
  const handleChangeStock = (e) => {
    setFilterData({
      ...filterData,
      stock: e.value,
    });
  };
  const handleChangeVendor = (e) => {
    setFilterData({
      ...filterData,
      vendor_id:e.value,
    });
  };
  const handleChangeWarehouse = (e) => {
    setFilterData({
      ...filterData,
      warehouse_id: e.value,
    });
  };
  const handleChangeProductFilter = (e) => {
    setFilterData({
      ...filterData,
      product_filter: e.value,
    });
  };
  const handleChangeActiveFilter = (e) => {
    setFilterData({
      ...filterData,
      active_filter: e.value,
    });
  };

  const handleFilter = async () => {
    let Filt =
      API_Filter_Get +
      "/?" +
      (filterData.brand_id ? `brandid=${filterData.brand_id}` : "") +
      (filterData.category_id ? `&cateid=${filterData.category_id}` : "") +
      (filterData.vendor_id ? `&vendorid=${filterData.vendor_id}` : "") +
      (filterData.warehouse_id ? `&warehouseid=${filterData.warehouse_id}` : "") +
      (filterData.product_filter ? `&prodtype=${filterData.product_filter}` : "");
    let result = await axios.get(`${Filt}`, config);

    if (result.data.list) {
      setData(result.data.list);
    }
  };

  const handleRefresh = () => {
    setFilterData({
      brand_id: "",
      active_filter: "",
      category_id: "",
      product_filter: "",
      warehouse_id: "",
      vendor_id: "",
      stock: "",
    });
    GetListdata();
  };

  return (
    <React.Fragment>
      {/* <Head title="MAIN Category List" /> */}
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-content-end" style={{ paddingBottom: "1.25rem" }}>
                {/* <BlockTitle tag="h4">MAIN CATEGORY LIST </BlockTitle> */}
                <div className="mr-3">
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    onClick={""}
                    style={{ width: "100%" }}
                  >
                    <Icon name="arrow-to-down">&nbsp;</Icon>
                    Import
                  </Button>
                </div>
                <div className="mr-3">
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    onClick={""}
                    style={{ width: "100%" }}
                  >
                    <Icon name="arrow-to-up">&nbsp;</Icon>
                    Export
                  </Button>
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
                  <div className="toggle-expand-content1">
                    <ul className="nk-block-tools g-3" style={{ justifyContent: "end" }}>
                      <li className="nk-block-tools-opt">
                        <Link to="add-stock" style={{ color: "white" }}>
                          <Button
                            className="toggle btn-icon d-md-none"
                            color="primary"
                            // onClick={() => {
                            //     toggle("add");
                            // }}
                            style={{ width: "130px", top: "-73px" }}
                          >
                            <Icon name="plus"></Icon>
                            Add Stock
                          </Button>
                        </Link>
                        <Link to="add-stock" style={{ color: "white" }}>
                          <Button className="toggle d-none d-md-inline-flex" color="primary" style={{ width: "100%" }}>
                             <Icon name="plus">&nbsp;</Icon>
                            Add Stock
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mb-4 bg-white p-4"
                style={{
                  boxShadow:
                    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                }}
              >
                <div className="" style={{ width: "130px" }}>
                  <RSelect
                    name=""
                    options={BrandData}
                    onChange={(e) => handleChangeBrand(e)}
                    placeholder="Brand"
                    value={BrandData.filter(function (option) {
                      return option.value === filterData.brand_id;
                    })}
                    // value={ATTSelectGST}
                  />
                </div>

                <div className="" style={{ width: "130px" }}>
                  <RSelect
                    name=""
                    options={CategoryData}
                    onChange={(e) => handleChangeCategory(e)}
                    placeholder="Category"
                    value={CategoryData.filter(function (option) {
                      return option.value === filterData.category_id;
                    })}
                    // value={ATTSelectGST}
                  />
                </div>

                <div className="" style={{ width: "130px" }}>
                  <RSelect
                    name="GST"
                    options={stock_fill}
                    onChange={(e) => handleChangeStock(e)}
                    // value={ATTSelectGST}
                    value={stock_fill.filter(function (option) {
                      return option.value === filterData.stock;
                    })}
                    placeholder="Stock"
                  />
                </div>

                <div className="" style={{ width: "130px" }}>
                  <RSelect
                    name="GST"
                    options={VendorData}
                    onChange={(e) => handleChangeVendor(e)}
                    value={VendorData.filter(function (option) {
                      return option.value === filterData.vendor_id;
                    })}
                    placeholder="Vendor"
                  />
                </div>

                <div className="" style={{ width: "130px" }}>
                  <RSelect
                    name="GST"
                    options={WarehouseData}
                    onChange={(e) => handleChangeWarehouse(e)}
                    placeholder="Warehouse"
                    value={WarehouseData.filter(function (option) {
                      return option.value === filterData.warehouse_id;
                    })}
                  />
                </div>

                <div>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    onClick={() => handleFilter()}
                    style={{ width: "90px", textAlign: "center", display: "flex", justifyContent: "center" }}
                  >
                    <Icon name=""></Icon>
                    Filter
                  </Button>
                </div>

                <div>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    onClick={() => handleRefresh()}
                    style={{ width: "100%" }}
                  >
                    <Icon name=""></Icon>
                    Refresh
                  </Button>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
        </Block>

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

        <CustomDataTable icons={tableIcons} data={data} columns={disputesTableColumnsmain} title="STOCK LIST"  actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows
            },
          ]}
          />
      </Content>
    </React.Fragment>
  );
};
export default StockList;
