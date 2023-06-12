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
import { API_Terms, token } from "../../../Api";
const API_term = `${API_Terms}`;

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};

const Terms = ({ alter, id }) => {
  const [cookies] = useCookies();
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

  const [filter, setFilter] = useState(false);
  const [smOption, setSmOption] = useState(false);

  const toggle = (type) => {
     setAddcommission(type === "add" ? true : false);
  };
  const vendarId = cookies.vendor_id;
  useEffect(() => {
    getTerms();
    getTermss();
  }, []);

  const [getAllTerm, setgetAllTerm] = useState([]);

  const [getAllTermm, setgetAllTermm] = useState([]);

  const getTerms = async (ids) => {
    const { data } = await axios.get(`${API_Terms}/?vendor_id=${cookies.vendor_id}&type_id=${2}`, config);
     setgetAllTerm(data.list);
  };
  const getTermss = async (ids) => {
    const { data } = await axios.get(`${API_Terms}/?vendor_id=${cookies.vendor_id}&type_id=${1}`, config);
     setgetAllTermm(data.list);
  };

  // const getTerms = async () => {
  //   const { data } = await axios.get(`${API_term}`, config);
  //   setgetAllTerm(data.list);
   // };

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
    // selection: true,
    actionsColumnIndex: false,
    addRowPosition: "first",
    exportButton: true,
    paging: true,
    pageSize: 10,
    pageSizeOptions: [10, 20],
    // displayRowCheckbox:false,
    // displaySelectAll:false,
    // adjustForCheckbox:false,
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
    // showSelectAllCheckbox: false,
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
  const [isReceive, setIsReceive] = useState(1);
  function onChangeValue(event) {
    setIsReceive(event.target.value);
  }
  return (
    <div>
      <React.Fragment>
        <Head title="Terms"></Head>
        <Block>
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
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          {isReceive == 1 ? (
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
                        data={getAllTermm}
                        columns={tableColumn}
                        title="COMMISSION LIST"
                        options={options}
                      />
                    </MuiThemeProvider>
                  </Block>
                </React.Fragment>
              </Block>
            </React.Fragment>
          ) : (
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
                        columns={tableColumn1}
                        title="COMMISSION LIST"
                        options={options}
                      />
                    </MuiThemeProvider>
                  </Block>
                </React.Fragment>
              </Block>
            </React.Fragment>
          )}
        </Block>
      </React.Fragment>
    </div>
  );
};
export default Terms;
