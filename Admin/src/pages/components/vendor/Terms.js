import React, { useEffect, useState, forwardRef } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import './Profile.css'
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

// import 'react-circular-progressbar/dist/styles.css';
// import Content from "../../../layout/content/Content";
// import { useForm } from "react-hook-form";
// import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
// import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
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
import "react-quill/dist/quill.snow.css";
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
  CustomDataTable,
  ReactDataTable,
  Row,
  RSelect,
  Col,
} from "../../../components/Component";
import { API_Product, API_Vendor, API_Brand, API_Vendor_Brand, API_Terms, token } from "../../../Api";
// import { messageData } from "./MessageData";

// import { DisputesTableData12, disputesTableColumnsadd2s, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form
} from "reactstrap";

const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  },
};
const Terms = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => { setwarehouse(!warehouse) };
  const [emailid, setemailid] = useState(false);
  const EmailId = () => { setemailid(!emailid) };
  const [mobile, setmobile] = useState(false);
  const MobileNumber = () => { setmobile(!mobile) };
  const { errors, register, handleSubmit } = useForm();
  // const [items, setItems] = useState([]);

  const [terms, setTerms] = useState({
    type_id: '',
    brand_ids: '',
    prod_id: "",
    agreement_dt: "",
    commission_rate: "",
  });
  const ids = localStorage.getItem("MerchantView");
  useEffect(() => {
    const ids = localStorage.getItem("MerchantView");
    GetBranddata();
    GetProductdata();
    overView(ids);
    getTerms(ids);
    getTermss(ids);
  }, []);

  const onHandlechange = ({ target: { name, value } }) => {
    setTerms({ ...terms, [name]: value });
  }
  

  const clearState = () => {
    setTerms({
      type_id: '',
      brand_ids: '',
      prod_id: "",
      agreement_dt: "",
      commission_rate: "",
    })
  }

  // const items = JSON.parse(localStorage.getItem('MerchantView'));

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => {
    clearState();
    // window.location.href="/dashboard/merchant-view"
    setModalFail(!modalFail);
  };

  const [brandandproduct, setbrandandproduct] = useState({
    brand: false,
    product: false,
  })



  const onFormSubmit = (e) => {
    Create();
    setTerms({
      type_id: '',
      brand_ids: '',
      prod_id: "",
      agreement_dt: "",
      commission_rate: "",
    })
  };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  const [isBrand, setIsBrand] = useState([])
  const [Brand, setBrand] = useState('');
  const [Product, setProduct] = useState('');
  const [isProduct, setIsProduct] = useState([])



  const GetBranddata = async () => {
    const data = await axios.get(`${API_Vendor_Brand}/${ids}`, config)
    const Res = data.data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.name
      }
      return datss
    })
    setIsBrand(Res)
  }

  const [isProd, setisProd] = useState([])
  //Get Product Data
  const GetProductdata = async () => {
    const { data } = await axios.get(`${API_Product}`, config)

    let val = data.list.filter((currEle) => currEle.Vendor_id == ids)

    const Res = val.map((itemsMain) => {
      const datss = {
        value: itemsMain.Productlist_id,
        label: itemsMain.ProductName
      }
      return datss
    })
    setIsProduct(Res)

  };




  const [vendor, setVendor] = useState()
  // Vendor details get

  const overView = async (id) => {
    setVendor(id)
  };

  const [resMsg, setResMsg] = useState('')
  const [res, setRes] = useState('')
  const [error, setError] = useState({
    Brand: "",
    Product: ""
  });



  const Create = async () => {
    if (Brand != "" || Product != "") {
      const datass = {
        type_id: brandandproduct.brand ? '1' : '2',
        brand_ids: Brand.value,
        prod_id: Product.value,
        agreement_dt: terms.agreement_dt,
        commission_rate: terms.commission_rate,
        vendor_id: vendor
      }

      axios.post(API_Terms, datass, config).then((res) => {
        clearState();
        setTerms({
          type_id: '',
          brand_ids: '',
          prod_id: "",
          agreement_dt: "",
          commission_rate: "",
        })
        setResMsg(res.data.msg);
        setRes(res);
        getTerms(ids);
        getTermss(ids);
        setModalFail(true);
        setBrand("");
        setProduct("");
      });

    } else {
      setError({
        Brand: "Brand Required",
        Product: "Product Required"
      });
    }
    // window.location.reload();
  }

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };



  const [filter, setFilter] = useState(false);
  const [smOption, setSmOption] = useState(false);

  const toggle = (type) => {
    setAddcommission(type === "add" ? true : false);
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

  const [getAllTerm, setgetAllTerm] = useState([]);

  const [getAllTermm, setgetAllTermm] = useState([]);

  const getTerms = async (ids) => {
    const { data } = await axios.get(`${API_Terms}/?vendor_id=${ids}&type_id=${2}`, config)
    setgetAllTerm(data.list);
  }
  const getTermss = async (ids) => {
    const { data } = await axios.get(`${API_Terms}/?vendor_id=${ids}&type_id=${1}`, config)
    setgetAllTermm(data.list);
  }
  const typeID1 = getAllTerm.filter((currEle) => (currEle.type_id === 1))
  const typeID2 = getAllTerm.filter((currEle) => (currEle.type_id === 2))
  const [Tables, setTables] = useState([])
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
  };

  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [stateID, setstateID] = useState("");
  const handleClickAlertOpen = (type, data) => {
    setView({ details: type === "remove" ? true : false });
    setstateID(data.commission_id);
  };
  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Terms}/delete/${stateID}`, { Status: 0 }, config);
    onFormCancel();
    getTerms(ids);
    getTermss(ids);
    // window.location.href="/dashboard/merchant-view"  
  };

  const tableColumn = [
    { field: "brand_name", title: "Brands" },
    // brandandproduct.brand ===  1  ?{ field: "prod_brand_id", title: "Brands" }:{ field: "prod_brand_id", title: "Products" },
    { field: "commission_rate", title: "Commission Rate" },
    { field: "agreement_dt", title: "Agreement Date" },
    {
      field: "",
      title: "Action",
      render: (row) => (
        <ul className="gx-1 my-n1">
          <li className="mr-n1">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"

                className="dropdown-toggle btn btn-icon btn-trigger"
              >
                <Icon name="more-h"></Icon>
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="link-list-opt no-bdr">

                  <li onClick={() => handleClickAlertOpen("remove", row)}>
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
  const tableColumn1 = [
    { field: "product_name", title: "Products" },
    //  brandandproduct.brand ===  1  ?{ field: "prod_brand_id", title: "Brands" }:{ field: "prod_brand_id", title: "Products" },
    { field: "commission_rate", title: "Commission Rate" },
    { field: "agreement_dt", title: "Agreement Date" },
    {
      field: "",
      title: "Action",
      render: (row) => (
        <ul className="gx-1 my-n1">
          <li className="mr-n1">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"

                className="dropdown-toggle btn btn-icon btn-trigger"
              >
                <Icon name="more-h"></Icon>
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="link-list-opt no-bdr">

                <li onClick={() => handleClickAlertOpen("remove", row)}>
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
  const [addcommission, setAddcommission] = useState(false);
  const EditTable = (id) => {

  }


  const selectoptions = (item) => {

    const selectvalue = item.label;
    if (selectvalue === "Brands") {

      setbrandandproduct({
        brand: true
      })
    }
    else if (selectvalue === "Products") {
      setbrandandproduct({
        product: true
      })
    }
    else {

    }
  }
  const [isReceive, setIsReceive] = useState(1);
  function onChangeValue(event) {
    setIsReceive(event.target.value);

  }


  if (isReceive == 1 ? "yes" : 'no')

    return (
      <div>
        <React.Fragment>
          <Head title="Overview"></Head>
          <Block size="lg">

            <BlockHead>
              <BlockHeadContent>
                {/* <Row className="mb-4 mt-4"> */}

                {/* </Row> */}
                <div className="my-3">

                  {/* <BlockTitle tag="h4"> VENDOR LIST </BlockTitle> */}

                  <div className="toggle-wrap nk-block-tools-toggle">
                    <Col md="3">
                      <FormGroup>
                        <ul className="custom-control-group g-3 align-center flex-wrap" onChange={onChangeValue}>
                          <li>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                value="1"
                                id="esr"
                                defaultChecked
                                // onChange={handlechange}
                                name="isReceive"
                                className="custom-control-input form-control"
                              // checked={isReceive === "1"}
                              />
                              <label className="custom-control-label" htmlFor="esr">
                                Brand
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                value="0"
                                id="tsr"
                                name="isReceive"
                                className="custom-control-input form-control"
                              // checked={isReceive === "0"}
                              />
                              <label className="custom-control-label" htmlFor="tsr">
                                Product
                              </label>
                            </div>
                          </li>
                        </ul>
                      </FormGroup>
                    </Col>
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
                            <span>Add Commission</span>
                          </Button>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockHead>

            {
              addcommission ?
                <>
                  <Row className="mb-4 mt-4">
                    <Col md={3}>
                      <div className="form-control-wrap">
                        <RSelect
                          options={[
                            { value: "Brands", label: "Brands" },
                            { value: "Products", label: "Products" },
                          ]}
                          placeholder="Select"
                          // defaultValue={event.type}
                          onChange={(e) => selectoptions(e)}
                        />
                      </div>

                    </Col>
                  </Row>
                  {
                    brandandproduct.brand ?
                      <>
                        <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
                          <Row className="g-gs">
                            <Col md="4">
                              <FormGroup>
                                <Label className="form-label" htmlFor="fv-subject">
                                  Select Brand
                                </Label>
                                <div className="form-control-wrap">
                                  <RSelect
                                    name="prod_brand_id"
                                    ref={register({ required: "This is required" })}
                                    options={isBrand}
                                    onChange={(event) => setBrand(event)}
                                    value={Brand}
                                    placeholder="Select"
                                  />
                                  {error.Brand ? <p style={{ color: "red" }}>{error.Brand}</p> : ""}
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label className="form-label" htmlFor="fv-subject">
                                  Commission Rate
                                </Label>
                                <div className="form-control-wrap">
                                  <input
                                    type="text"
                                    ref={register({ required: "This is required" })}
                                    id="fv-email"
                                    name="commission_rate"
                                    onChange={onHandlechange}
                                    value={terms.commission_rate}
                                    className="form-control"
                                    placeholder="Enter Commission Rate"

                                  />
                                  {errors.commission_rate && <span className="invalid">{errors.commission_rate.message}</span>}
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label className="form-label" htmlFor="fv-subject">
                                  Agreement Date
                                </Label>
                                <div className="form-control-wrap">
                                  <input
                                    ref={register({ required: "This is required" })}
                                    type="date"
                                    id="fv-subject"
                                    name="agreement_dt"
                                    value={terms.agreement_dt}
                                    onChange={onHandlechange}
                                    className="form-control"
                                    placeholder="Enter Brands"
                                  />
                                  {errors.agreement_dt && <span className="invalid">{errors.agreement_dt.message}</span>}
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mt-3 mb-5">
                            <Col md="12" className="d-flex justify-content-end">
                              <FormGroup>
                                <Button color="primary" size="md">
                                  SAVE
                                </Button>
                              </FormGroup>
                            </Col>

                          </Row>
                        </Form>
                      </>
                      : <></>
                  }

                  {
                    brandandproduct.product ?
                      <>
                        <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
                          <Row className="g-gs">
                            <Col md="4">
                              <FormGroup>
                                <Label className="form-label" htmlFor="fv-subject">
                                  Product Name
                                </Label>
                                <div className="form-control-wrap">
                                  <RSelect
                                    name="prod_brand_id"
                                    ref={register({ required: "This is required" })}
                                    options={isProduct}
                                    onChange={(event) => setProduct(event)}
                                    value={Product}
                                  />
                                  {error.Product ? <p style={{ color: "red" }}>{error.Product}</p> : ""}
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label className="form-label" htmlFor="fv-subject">
                                  Commission Rate
                                </Label>
                                <div className="form-control-wrap">
                                  <input
                                    type="text"
                                    id="fv-email"
                                    ref={register({ required: "This is required" })}
                                    name="commission_rate"
                                    onChange={onHandlechange}
                                    value={terms.commission_rate}
                                    className="form-control"
                                    placeholder="Enter Commission Rate"
                                  />
                                  {errors.commission_rate && <span className="invalid">{errors.commission_rate.message}</span>}
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label className="form-label" htmlFor="fv-subject">
                                  Agreement Date
                                </Label>
                                <div className="form-control-wrap">
                                  <input
                                    ref={register({ required: "This is required" })}
                                    type="date"
                                    id="fv-subject"
                                    name="agreement_dt"
                                    onChange={onHandlechange}
                                    value={terms.agreement_dt}
                                    className="form-control"
                                    placeholder="Enter Brands"
                                  />
                                  {errors.agreement_dt && <span className="invalid">{errors.agreement_dt.message}</span>}
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mt-3 mb-5">
                            <Col md="12" className="d-flex justify-content-end">
                              <FormGroup>
                                <Button color="primary" size="md">
                                  SAVE
                                </Button>
                              </FormGroup>
                            </Col>

                          </Row>
                        </Form>
                      </>
                      : <></>
                  }




                </>
                : <></>

            }
            {isReceive == 1 ?

              <MuiThemeProvider theme={Tabletheme()}>

                <CustomDataTable
                  data={getAllTermm}
                  columns={tableColumn}
                  title="COMMISSION LIST"
                  filter={false}
                />

              </MuiThemeProvider>
              :
              <MuiThemeProvider theme={Tabletheme()}>

                <CustomDataTable
                  data={getAllTerm}
                  columns={tableColumn1}
                  title="COMMISSION LIST"
                  filter={false}
                />
              </MuiThemeProvider>
            }
          </Block>






        </React.Fragment>
        {/* add warehouse */}
        <Modal size="lg" isOpen={warehouse} toggle={Warehouse}>
          <ModalHeader
            toggle={Warehouse}
            close={
              <button className="close" onClick={Warehouse}>
                <Icon name="cross" />
              </button>
            }
          >
            Add Warehouse Details
          </ModalHeader>
          <ModalBody>

            <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-gs">
                <Col md="6">
                  <FormGroup>
                    <Label className="form-label" htmlFor="fv-subject">
                      Address type/name*
                    </Label>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="text"
                        id="fv-full-name"
                        name="fullname"
                        className="form-control"

                      />
                      {errors.fullname && <span className="invalid">This field is required</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="form-label" htmlFor="fv-subject">
                      Mobile*
                    </Label>
                    <div className="form-control-wrap">
                      <input

                        type="text"
                        id="fv-email"
                        name="email"
                        className="form-control"

                      />
                      {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                      {errors.email && errors.email.type === "pattern" && (
                        <span className="invalid">{errors.email.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="form-label" htmlFor="fv-subject">
                      Alternative Mobile
                    </Label>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="text"
                        id="fv-subject"
                        name="subject"
                        className="form-control"

                      />
                      {errors.subject && <span className="invalid">This field is required</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="form-label" htmlFor="fv-email">
                      Read Me
                    </Label>
                    <div className="form-control-wrap">
                      <textarea

                        type="text"
                        id="fv-email"
                        name="email"
                        className="form-control"
                        style={{ minHeight: "30px" }}
                        placeholder="Address (House No / Flat No, Building Name, Area and Street)"
                      />
                      {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                      {errors.email && errors.email.type === "pattern" && (
                        <span className="invalid">{errors.email.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6" className="mt-1">
                  <FormGroup>

                    <div className="form-control-wrap">
                      <textarea
                        ref={register({ required: true })}
                        type="text"
                        id="fv-subject"
                        name="subject"
                        className="form-control"
                        style={{ minHeight: "30px" }}
                        placeholder="Address Line 2"
                      />
                      {errors.subject && <span className="invalid">This field is required</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6" className="pt-1 mt-0">
                  <FormGroup>
                    <Label className="form-label" htmlFor="fv-email">
                      Select State
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          ref={register({
                            required: true,
                          })}
                          className="form-control form-select"
                          id="fv-topics"
                          name="topics"
                          placeholder="Select a option"
                        >
                          <option label="Select State" value=""></option>
                          <option value="fv-gq">General Question</option>
                          <option value="fv-tq">Tachnical Question</option>
                          <option value="fv-ab">Account &amp; Billing</option>
                        </select>
                        {errors.topics && <span className="invalid">This field is required</span>}
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="form-label" htmlFor="fv-subject">
                      City*
                    </Label>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="text"
                        id="fv-full-name"
                        name="fullname"
                        className="form-control"

                      />
                      {errors.fullname && <span className="invalid">This field is required</span>}
                    </div>
                  </FormGroup>
                </Col>

                <Col md="6">
                  <FormGroup>
                    <Label className="form-label" htmlFor="fv-subject">
                      Pincode*
                    </Label>
                    <div className="form-control-wrap">
                      <input
                        ref={register({ required: true })}
                        type="text"
                        id="fv-full-name"
                        name="fullname"
                        className="form-control"

                      />
                      {errors.fullname && <span className="invalid">This field is required</span>}
                    </div>
                  </FormGroup>
                </Col>

                <Col md="12">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"

                      id="customCheckaddress"
                    />
                    <label className="custom-control-label" htmlFor="customCheckaddress">
                      Mark As Default Address
                    </label>
                  </div>
                </Col>
                <Row>
                  <Col md="6" className="text-left">
                    <FormGroup>
                      <Button color="primary" size="sm">
                        Save
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md="6" className="text-right">
                    <FormGroup>
                      <Button color="primary" size="sm">
                        Cancle
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Row>
            </Form>

          </ModalBody>

        </Modal>
        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className={resMsg === 'Commission already exist' ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-alert-fill bg-warning" : "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"}></Icon>
              <h4 className="nk-modal-title">{resMsg || res}</h4>
              <div className="nk-modal-action mt-5">
                <Button color="light" size="lg" className="btn-mw mr-3" onClick={toggleModalFail}>
                  Done
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* emilid */}
        <Modal isOpen={emailid} toggle={EmailId}>

          <ModalBody>

            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div >
                    <Icon name='alert-circle' color="primary" style={{ fontSize: '60px' }}></Icon>
                  </div>
                  <div className="mt-2">
                    <h6>Are you sure?</h6>
                  </div>
                  <div className="mt-2 mb-2">
                    <p>You won't be able to revert this!?</p>
                  </div>
                  <Row>
                    <Col md="6" className="text-right">
                      <FormGroup>
                        <Button color="primary" size="sm">
                          Yes, delete it!
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col md="6" className="text-left">
                      <FormGroup>
                        <Button color="primary" size="sm">
                          Cancle
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </ModalBody>

        </Modal>

        {/* mobile */}
        <Modal isOpen={mobile} toggle={MobileNumber}>
          <ModalHeader
            toggle={MobileNumber}
            close={
              <button className="close" onClick={MobileNumber}>
                <Icon name="cross" />
              </button>
            }
          >
            Enter Your New Mobile Number
          </ModalHeader>
          <ModalBody>
            <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>

                <div className="form-control-wrap">
                  <input
                    ref={register({ required: true })}
                    type="text"
                    id="fv-full-name"
                    name="fullname"
                    className="form-control"
                  />
                  {errors.fullname && <span className="invalid">This field is required</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button color="primary" size="sm">
                  Sent OTP
                </Button>
              </FormGroup>
            </Form>
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
      </div>
    );
};
export default Terms;





