import React, { Fragment, useState, forwardRef, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import axios from "axios";

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  ReactDataTable,
  BlockBetween,
  CustomDataTable,
} from "../../../components/Component";
import { messageData } from "./MessageData";

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
import { WarehouseTableData } from "./TablesData";
import {
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  DropdownItem,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  Badge,
  Label,
  FormGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { API_WareHouse, API_Vendor, token } from "../../../Api";
import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};
const WareHousePage = ({ alter, id }) => {
  const [tableData, setTableData] = useState([]);
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
  const [modalEdit, setModalEdit] = useState(false);
  const history = useHistory();

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

  const onFormSubmit = (e) => { };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });
  const Getdata = async () => {
    const data = await axios.get(`${API_WareHouse}`, config);
    setTableData(data.data.list);
    console.log(data.data.list, "get");
  };
  // const venData = tableData.map((item)=>item.vendor_id)

  // console.log(venData, 'venData');
  const [vendar, setvendar] = useState();

  // const GetVendardata = async () => {
  //   const data = await axios.get(`${API_Vendor}/${venData}`, config)
  //   setvendar(data.data.list)
  //   console.log(`${API_Vendor}/${venData}`, 'vendar');
  // }
  // const GetVendardata = async () => {
  //   setvendar([]);
  //   const brand = await axios.get(`${API_Vendor}`, config);
  //   // console.log("brands", brand);
  //   if (brand.data) {
  //     brand.data.list.map((items) => {
  //       console.log("items", items.vendor_name);
  //       const datas = {
  //         // value: items.id,
  //         label: items.vendor_name,
  //       };
  //       setvendar((items) => [...items, datas]);
  //     });
  //   }
  // };console.log('vendar', vendar);
  // console.log(vendar.map((red) => red.label), 'vendar');
  // const venName = vendar.map((item) => item.store_name);

  const handleAttributeStatus = (id, stat) => {
    var state = stat === "Active" ? "InActive" : "Active";

    setTableData(
      tableData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            Status: state,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    Getdata();
    // GetVendardata();
  }, []);

  const disputesTableColumnsadd2s = [
    { field: "vendor_name", title: "Vendor Name" },
    { field: "warehouse_name", title: "Warehouse" },
    { field: "city", title: "Location" },
    { field: "address_line_one", title: "Address" },
    { field: "mobile", title: "Phone Numbers" },
    // {
    //   field: "status",
    //   title: "Status",
    //   render: (row) => {
    //     if (row.Status) {
    //       return (
    //         <Button size="sm" color={row.Status == "Active" ? "success" : "primary"}>
    //           {row.Status == "Active" ? "Active" : "InActive"}
    //         </Button>
    //       );
    //     }
    //   },
    // },
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
                    <DropdownItem tag="a" onClick={() => handleAttributeStatus(row.id, row.Status)}>
                      <span>
                        {row.Status == "Active" ? (
                          <>
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
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </span>
                      <span>{row.Status == "Active" ? "InActive" : "Active"}</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>

                  <li>
                    <DropdownItem tag="a" href="#edit" onClick={toggleEdit}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
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

  const handleDropChangeFood = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // const Getdata = async () => {
  //   setData([])

  //   const Result = await axios.post(`${API_Key}/list`)

  //   setData(Result.data)

  //   console.log(Result.data)
  // }

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  //
  const EditTable = (id) => {
    history.push({ pathname: "/dashboard/coupon-add_edit", state: id });
    // localStorage.setItem('Coupon', id);
    // window.location.href = "/dashboard/coupon-edit"
  };

  const [modalFail, setModalFail] = useState(false);
  const [modalview, setModalview] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const toggleModalview = () => setModalview(!modalview);
  const [DeleteId, setDeleteId] = useState("");
  const [ViewId, setViewId] = useState("");

  const viewlist = async (id) => {
    setModalview(true);
    const Result = await axios.get(`${API_Key}/${id}`);
    // console.log(Result.data, "view")
    setViewId(Result.data);
  };

  const DeleteOpen = (id) => {
    setDeleteId(id);
    setModalFail(true);
  };

  const handleAlertDelete = async () => {
    // const { data } = await axios.put(`${API_Key}/delete/${DeleteId}`);
    // console.log(data, 'delete')

    // Getdata();
    window.location.reload();
  };
  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.warehouse_id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "warehouse");
    try {
      axios.put(`${API_URL}/admin/BulkDelete/bulkDeletedata`, formData, config).then((res) => {

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
        }
        else {
          console.log("login");
          toast.error("Something Wrong", {
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

    } catch (error) {

    }
  };

  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>
        <Content page="component">
          <Block className="container mt-50">
            <div style={{ marginTop: "60px" }}>
              <CustomDataTable
                icons={tableIcons}
                data={tableData}
                columns={disputesTableColumnsadd2s}
                title="WAREHOUSE LIST"
                actions={[
                  {
                    icon: "delete",
                    tooltip: "Delete All Rows",
                    onClick: handleDeleteRows
                  },
                ]}
              />
            </div>
          </Block>
        </Content>

        <Modal isOpen={modalEdit} toggle={toggleEdit} className="modal-md">
          <ModalHeader toggle={toggleEdit}>Edit Warehouse Details</ModalHeader>
          <ModalBody>
            <form className="form-validate is-alter" onSubmit={() => handleSubmit}>
              <Row className="gx-4 gy-3">
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                      Vendor Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="vname"
                        placeholder="Enter Vendor Name"
                        defaultValue="Vendor 1"
                      />
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                      Warehouse
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name=" warehouse"
                        defaultValue="Johnsons"
                        placeholder="Enter Warehouse Name"
                      />
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                      Location
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name=" location"
                        defaultValue="Chennai"
                        placeholder="Enter Location Name"
                      />
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                      Phone Numbers
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name=" location"
                        defaultValue="9887755321"
                        placeholder="Enter Phone Numbers"
                      />
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <FormGroup>
                    <label className="form-label">Address</label>
                    <div className="gx-2">
                      <div>
                        <div className="form-control-wrap">
                          <textarea defaultValue="Nungambakkam,Chennai" className="form-control" />
                          {/* <textarea defaultValue="qwertyuiopasdfghjkzxcvbn" className="form-control" /> */}
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
                    <input type="text" id="fv-email" name="email" className="form-control" />
                    {errors.email && errors.email.type === "required" && (
                      <span className="invalid">This is required</span>
                    )}
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
                    {errors.email && errors.email.type === "required" && (
                      <span className="invalid">This is required</span>
                    )}
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
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Latitude and Longitude
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
                  <input type="checkbox" className="custom-control-input form-control" id="customCheckaddress" />
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
export default WareHousePage;
