import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link, useHistory } from "react-router-dom";
import {
  FormGroup,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import axios from "axios";
import AddBox from "@material-ui/icons/AddBox";
import exportFromJSON from "export-from-json";
import Papa from "papaparse";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  Icon,
  Col,
  Row,
  RSelect,
  CustomDataTable,
} from "../../../components/Component";
import { API_URL, API_Product, API_Import, token } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
const API_Filter = `${API_URL}/admin/SearchFilter/fliterdata`;
const API_Filter_Get = `${API_URL}/admin/SearchFilter/productfilter`;
const API_Image = `${API_URL}/Product_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const ProductLists = () => {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => {
    setwarehouse(!warehouse);
  };
  const [invoice, setinvoice] = useState(false);
  const [data, setData] = useState([]);
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
  let updateDelete = [];
  const Invoice = () => {
    setinvoice(true);
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  useEffect(() => {
    GetFilterListdata();
    Getdata();
  }, []);

  const Getdata = async () => {
    const { data } = await axios.get(`${API_Product}`, config);
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

  const reversed = data;

  const EditTable = (id) => {
    history.push({ pathname: "/dashboard/product_lists_add_edit", state: id });
  };

  const Variation = (id) => {
    // to="/dashboard/product_list_variation"
    history.push({ pathname: "/dashboard/product_list_variation", state: id });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Data Updated");
  };

  //Delete Popup
  const [modalFail, setModalFail] = useState(false);
  const [deleteID, setDEleteId] = useState("");
  const [deleteMul, setDeleteMul] = useState([]);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (id) => {
    setDEleteId(id);
    setModalFail(true);
  };

  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Product}/delete/${deleteID}`, {}, config);
    setModalFail(false);
    setDEleteId("");
    Getdata();
  };

  const ActiveOpen = (id) => {
    setActive(!active);
  };

  const handleAttributeStatus = async (id, stat) => {
    var state = stat === 0 ? false : true;
    const { data } = await axios.put(`${API_Product}/status/${id}`, { Status: state }, config);
    Getdata();
  };

  const tableColumn = [
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
                <ul className="link-list-opt no-bdr">
                  <li>
                    <DropdownItem tag="a" onClick={() => handleAttributeStatus(row.Productlist_id, row.Status)}>
                      <span>
                        {row.Status == true ? (
                          <span
                            style={{
                              color: "red",
                              fontSize: "44px",
                              paddingRight: "20px",
                              position: "relative",
                              bottom: "4px",
                              left: "4px",
                            }}
                          >
                            .
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "green",
                              fontSize: "44px",
                              paddingRight: "20px",
                              position: "relative",
                              bottom: "4px",
                              left: "4px",
                            }}
                            F
                          >
                            .
                          </span>
                        )}
                      </span>
                      <span>{row.Status == true ? "InActive" : "Active"}</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" onClick={() => EditTable(row.Productlist_id)}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  {/* <li>
                    <DropdownItem tag="a" >
                      <Icon name="eye"></Icon>
                      <a href="#" style={{ padding: "1px 0px 0px 5px" }}>Quick View</a>
                      <span>Open In Browser</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    <DropdownItem tag="a" onClick={() => DeleteOpen(row.Productlist_id)}>
                      <Icon name="trash"></Icon>
                      <span>Remove</span>
                    </DropdownItem>
                  </li>

                  <li>
                    <DropdownItem tag="a" href="" onClick={() => Variation(row.Productlist_id)}>
                      {/* <Link to="/dashboard/product_list_variation" style={{ margin: "0px", padding: "0px" }}> */}
                      <Icon name="swap-v"></Icon>
                      <span>Variation</span>
                      {/* </Link> */}
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

  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.Productlist_id,
      };
      return a;
    });
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "products");
    try {
      axios
        .put(`${API_URL}/admin/BulkDelete/bulkDeletedata`, formData, config)
        .then((res) => {
          if (res.data.statusCode == 200) {
            toast.success("Deleted Successfully! ", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            Getdata();
          } else {
            toast.error("Something  Wrong", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch(function (error) {
          toast.error("Please delete Child Category first", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {}
  };
  const Exportdata = () => {
    axios.get(`${API_Import}/ExportProduct`, {}, config).then((res) => {
      if (res.status == 200) {
        const data = res.data.list;
        const fileName = "Product";
        const exportType = exportFromJSON.types.csv;

        exportFromJSON({ data, fileName, exportType });

        setTimeout(() => {
          setModalFail(false);
        }, 1000);
        toast.success("File Exported  Successfully! ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Data is Empty", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  const [parsedData, setParsedData] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setParsedData(results.data);
        event.target.value = null;
      },
    });
  };

  const [ResMsg, setResMsg] = useState();
  const Importdata = () => {
    if (parsedData != "") {
      axios.post(`${API_Import}/importproduct`, parsedData).then((res) => {});
      toast.success("File Imported  Successfully! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("No File Choosen", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setParsedData("");
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
  const handleChangeWarehouse = (e) => {
    setFilterData({
      ...filterData,
      warehouse_id: e.value,
    });
  };
  const handleChangeVendor = (e) => {
    setFilterData({
      ...filterData,
      vendor_id: e.value,
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
      (filterData.product_filter ? `&prodtype=${filterData.product_filter}` : "") +
      (filterData.active_filter ? `&prodstatus=${filterData.active_filter}` : "");
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
    Getdata();
  };

  return (
    <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-content-end" style={{ marginBottom: "1.25rem", background: "" }}>
                <div className="heading-flex justify-content-end">
                  {/* <BlockTitle tag="h4">BRANDS</BlockTitle> */}
                  <div className="heading-flex justify-content-end" style={{ background: "" }}>
                    {/* <BlockTitle tag="h5">PRODUCT LIST </BlockTitle> */}
                    <div class="input-group">
                      <div class="custom-file">
                        <input
                          type="file"
                          name="file"
                          onChange={changeHandler}
                          class="custom-file-input"
                          id="inputGroupFile"
                          required
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                        <label id="fileLabel" class="custom-file-label" for="inputGroupFile">
                          Choose file
                        </label>
                      </div>
                      <div class="input-group-append">
                        <button type="submit" onClick={Importdata} class="btn btn-primary float-right mr-2">
                          Import <i class="fa fa-upload"></i>
                        </button>
                      </div>
                    </div>
                    <div className="mr-3">
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={Exportdata}
                        style={{ width: "100%" }}
                      >
                        <Icon name="arrow-to-up">&nbsp;</Icon> Export{" "}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="toggle-wrap nk-block-tools-toggle">
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
              </div>
              <div
                className="d-flex justify-content-around mb-4 bg-white p-4"
                style={{
                  boxShadow:
                    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                }}
              >
                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name=""
                    options={BrandData}
                    onChange={handleChangeBrand}
                    placeholder="Brand"
                    value={BrandData.filter(function (option) {
                      return option.value === filterData.brand_id;
                    })}
                  />
                </div>

                <div className="" style={{ width: "110px" }}>
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

                <div className="" style={{ width: "110px" }}>
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

                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="GST"
                    options={VendorData}
                    onChange={(e) => handleChangeVendor(e)}
                    // value={ATTSelectGST}
                    value={VendorData.filter(function (option) {
                      return option.value === filterData.vendor_id;
                    })}
                    placeholder="Vendor"
                  />
                </div>

                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="GST"
                    options={WarehouseData}
                    onChange={(e) => handleChangeWarehouse(e)}
                    placeholder="Warehouse"
                    value={WarehouseData.filter(function (option) {
                      return option.value === filterData.warehouse_id;
                    })}
                    // value={ATTSelectGST}
                  />
                </div>
                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="GST"
                    options={product_fil}
                    onChange={(e) => handleChangeProductFilter(e)}
                    placeholder="Product Filter"
                    // value={ATTSelectGST}
                    value={product_fil.filter(function (option) {
                      return option.value === filterData.product_filter;
                    })}
                  />
                </div>
            
                <div className="" style={{ width: "110px" }}>
                  <RSelect
                    name="GST"
                    options={active_fil}
                    onChange={(e) => handleChangeActiveFilter(e)}
                    placeholder="Active Filter"
                    value={active_fil.filter(function (option) {
                      return option.value === filterData.active_filter;
                    })}
                    // value={ATTSelectGST}
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

        <CustomDataTable
          data={data}
          columns={tableColumn}
          title="PRODUCT LIST"
          filter={false}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows,
            },
          ]}
        />
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
          Quick View
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>

      <Modal isOpen={modalFail} toggle={toggleModalFail}>
        <ModalBody className="modal-body-lg text-center">
          <div className="nk-modal">
            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
            <h5 className="nk-modal-title">Do you want Delete!</h5>
            <div className="nk-modal-action mt-5">
              <Button color="light" size="lg" className="btn-mw mr-3" onClick={() => handleAlertDelete()}>
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

export default ProductLists;
