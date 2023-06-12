import React, { Fragment, useState, forwardRef, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { useCookies } from "react-cookie";
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
  ReactDataTable,
  Row,
  RSelect,
  Col,
} from "../../../components/Component";
const API_Brand_Image = `${API_URL}/Brand_view`;
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
  Form,
} from "reactstrap";
import { API_Terms, API_Vendor_Brand, token, API_URL } from "../../../Api";
const API_term = `${API_Terms}`;

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};

const Brand = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => {
    setwarehouse(!warehouse);
  };
  const [emailid, setemailid] = useState(false);
  const EmailId = () => {
    setemailid(!emailid);
  };
  const [mobile, setmobile] = useState(false);
  const MobileNumber = () => {
    setmobile(!mobile);
  };
  const { errors, register, handleSubmit } = useForm();
  // const [items, setItems] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [terms, setTerms] = useState({
    type_id: "",
    prod_brand_id: "",
    agreement_dt: "",
    commission_percent: "",
  });

  const onHandlechange = ({ target: { name, value } }) => {
    setTerms({ ...terms, [name]: value });
   };

  const clearState = () => {
    setTerms({
      type_id: "",
      prod_brand_id: "",
      agreement_dt: "",
      commission_percent: "",
    });
  };

  useEffect(() => {
    const ids = localStorage.getItem("MerchantView");
    GetBranddata();
    GetProductdata();
    overView(ids);
    getTerms();
    VendorCommission();
    // getProd();
    // getBrand();
  }, []);
  const items = JSON.parse(localStorage.getItem("MerchantView"));
   const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => {
    clearState();
    setModalFail(!modalFail);
  };

  const [brandandproduct, setbrandandproduct] = useState({
    brand: false,
    product: false,
  });

  const onFormSubmit = (e) => {
    Create();
    setTerms({
      type_id: "",
      prod_brand_id: "",
      agreement_dt: "",
      commission_percent: "",
    });
  };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  const [isBrand, setIsBrand] = useState([]);
  const [Brand, setBrand] = useState("");
  const [Product, setProduct] = useState("");
  const [isProduct, setIsProduct] = useState([]);

  const GetBranddata = async () => {
    const { data } = await axios.get(`${API_Brand}`, config);
    const Res = data.list.map((itemsMain) => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.name,
      };
      return datss;
    });
    setIsBrand(Res);
  };

  const [isProd, setisProd] = useState([]);
  //Get Product Data
  const GetProductdata = async () => {
    const { data } = await axios.get(`${API_Product}`, config);
     const Res = data.list.map((itemsMain) => {
      const datss = {
        value: itemsMain.Productlist_id,
        label: itemsMain.ProductName,
      };
      return datss;
    });
    setIsProduct(Res);
    setisProd(Res);
  };

  const [vendor, setVendor] = useState();
  // Vendor details get

  const overView = async (id) => {
     // const over = await axios.get(`${API_Vendor}/${id}`, config);
    // setVendor(over.data.list[0].vendor_id);
    setVendor(id);
  };

  const [resMsg, setResMsg] = useState("");
  const [res, setRes] = useState("");

  const Create = async () => {
    const datass = {
      type_id: brandandproduct.brand ? "1" : "2",
      prod_brand_id: Brand.value || Product.value,
      agreement_dt: terms.agreement_dt,
      commission_percent: terms.commission_percent,
      vendor_id: vendor,
    };
     axios.post(API_Terms, datass, config).then((res) => {
      clearState();
      setTerms({
        type_id: "",
        prod_brand_id: "",
        agreement_dt: "",
        commission_percent: "",
      });
      clearState();
      setResMsg(res.data.msg);
      setRes(res);
    });
    setTerms({
      type_id: "",
      prod_brand_id: "",
      agreement_dt: "",
      commission_percent: "",
    });
    setModalFail(true);
    // window.location.reload();
  };

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

  const handleDropChange1 = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChangeGST = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChangeFood = (acceptedFiles, set) => {
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

  const getTerms = async (id) => {
    const { data } = await axios.get(`${API_Vendor_Brand}/${cookies.vendor_id}`, config);
     setgetAllTerm(data.list);
  };
  const typeID1 = getAllTerm.filter((currEle) => currEle.type_id === 1);
  const typeID2 = getAllTerm.filter((currEle) => currEle.type_id === 2);

 
   const [Tables, setTables] = useState([]);

  const VendorCommission = async () => {
    // setTables(getAllTerm)
  };
 
  const tableColumn = [
    {
      field: "brand_logo",
      title: "Logo",
      render: (rowData) => (
        <>
          {rowData.brand_logo ? (
            <img
              src={`${API_Brand_Image}/${rowData.brand_logo}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          ) : (
            <p>No Image</p>
          )}
        </>
      ),
    },
    // brandandproduct.brand ===  1  ?{ field: "prod_brand_id", title: "Brands" }:{ field: "prod_brand_id", title: "Products" },
    { field: "name", title: "Brand Name" },
    // { field: "agreement_dt", title: "Agreement Date" },
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
                    <DropdownItem tag="a" href="" onClick={() => EditTable(row._id)}>
                      <Icon name="eye"></Icon>
                      <span>Edit</span>
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
  const [addcommission, setAddcommission] = useState(false);
  const EditTable = (id) => {
    // localStorage.setItem('MerchantView', id);
    // history.push(`/dashboard/merchant-view`)
  };

  const selectoptions = (item) => {
     const selectvalue = item.label;
    if (selectvalue === "Brands") {
       setbrandandproduct({
        brand: true,
      });
    } else if (selectvalue === "Products") {
       setbrandandproduct({
        product: true,
      });
    } else {
     }
  };
   return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>
        <Block size="lg">
          <React.Fragment>
            <Head title="Terms"></Head>
            <Block>
              <MuiThemeProvider theme={Tabletheme()}>
                <MaterialTable
                  icons={tableIcons}
                  // data={data}
                  data={getAllTerm}
                  columns={tableColumn}
                  title="BRAND LIST"
                  options={options}
                />
              </MuiThemeProvider>
            </Block>
          </React.Fragment>
        </Block>
      </React.Fragment>
      {/* add warehouse */}

      <Modal isOpen={modalFail} toggle={toggleModalFail}>
        <ModalBody className="modal-body-lg text-center">
          <div className="nk-modal">
            <Icon
              className={
                resMsg === "Commission already exist"
                  ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-alert-fill bg-warning"
                  : "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"
              }
            ></Icon>
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
                <div>
                  <Icon name="alert-circle" color="primary" style={{ fontSize: "60px" }}></Icon>
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
    </div>
  );
};
export default Brand;
