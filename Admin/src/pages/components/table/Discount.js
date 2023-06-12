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
import Head from "../../../layout/head/Head";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { Link, useHistory } from "react-router-dom";
import Bathing from "../../../images/avatar/bath.jpg";
import BottleFeeding from "../../../images/avatar/bottle-feed.jpg";
import Diapers from "../../../images/avatar/diapers.jpg";
import OralHealth from "../../../images/avatar/oralhealth.jpg";
import { Block, BlockHead, BlockHeadContent, Icon, Row, Col, CustomDataTable } from "../../../components/Component";
import { messageData } from "./MessageData";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { API_URL, API_Discount, token } from "../../../Api";

// const API_Key = `${API_URL}/Maincategory/list`;
// const API_Key_delete = `${API_URL}/Maincategory/delete`;
// const API_Key_image_Path = `${API_URL}/Maincategory_view`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const NewDiscount = () => {
  // const [data, setData] = useState(messageData);
  let updateDelete = [];
  const [data, setData] = useState();
  const [DeleteId, setDeleteId] = useState("");
  // const [filteredTabData, setFilteredTabData] = useState(messageData);
  // const [filterTab, setFilterTab] = useState("1");
  // const [search, setOnSearch] = useState(false);
  // const [filterText, setFilterText] = useState("");
  // const [selectedId, setSelectedIt] = useState(1);
  // const [mobileView, setMobileView] = useState(false);
  // const [tabData, setTabData] = useState();
  // const [rating, setRating] = useState(0);
  // const [hover, setHover] = useState(0);
  // const [Review, setReview] = useState({
  //     reviewmsg: "",
  //     reviewname: "",
  //     reviewemail: "",
  // });
  // const [state, setState] = useState({ value: null });

  // const handleChange = (value) => {
  //     setState({ value });
  // };

  const [smOption, setSmOption] = useState(false);
  const history = useHistory();

  // const [view, setView] = useState({
  //     add: false,
  //     details: false,
  // });

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  useEffect(() => {
    Getdata();
    getTerms();
  }, []);

  const Getdata = async () => {
    const data = await axios.get(`${API_Key}`);
    setData(data.data);
  };

  const EditTable = (id, type) => {
    console.log(id, "IDSS");
    // localStorage.setItem('MainCategory', id);
    history.push({ pathname: "/dashboard/add-discount", state: id });
    // window.location.href="/dashboard/main-category"
  };

  // const ViewTable = (id) => {
  //     // localStorage.setItem('MainCategoryView', id);
  //     history.push({ pathname: '/dashboard/main-category', state: id })
  // }


  //View Popup
  const [modalview, setModalview] = useState(false);
  const [getByID, setGetByID] = useState([]);
  const toggleModalview = () => setModalview(!modalview);

  const viewlist = async (id) => {
    setModalview(true);
    const data = await axios.get(`${API_Discount}/${id}`, config);
    setGetByID(data.data.list[0]);
  };
  console.log(getByID, "getByID");
  const DeleteOpen = (id) => {
    setDeleteId(id);
    // console.log("delete id", id);
    setModalFail(true);
  };
  const Deletedata = async () => {
    if (DeleteId) {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      };
      const Result = await axios.put(`${API_Discount}/delete/${DeleteId}`, formData, config);
      setModalFail(false);
      if (Result.data) {
        //   setDeleteTittle(Result.data.msg)
        //   setDeleteicon(true)
        const timer = setTimeout(() => {
          setModalFail(false);
          // setDeleteTittle(Result.data.msg)
          Getdata();
          // setDeleteicon(false)
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  };

  // const [files1, setFiles1] = useState([]);

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
  const [discountData, setDiscountData] = useState([]);
  const reversed = [...discountData].reverse();
  const getTerms = async () => {
    const Result = await axios.get(`${API_Discount}`, config);
    setDiscountData(Result.data.list);
  };

  console.log(discountData, "discountData");

  const disputesTableColumnsmain = [
    { field: "rule_id", title: "Rule ID" },
    { field: "rule_name", title: "Rule Name" },
    { field: "total_discount", title: "Discount Value" },
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
                    <DropdownItem tag="a" href="#edit" onClick={() => EditTable(row.id)}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    <DropdownItem tag="a" href="#view" onClick={() => viewlist(row.id)}>
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#remove" onClick={() => DeleteOpen(row.id)}>
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
  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "discount");
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
          getTerms();
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
    <React.Fragment>
      <Head title="Discount List" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-content-end" style={{ paddingBottom: "1.25rem" }}>
                {/* <BlockTitle tag="h4">MAIN CATEGORY LIST </BlockTitle> */}

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
                        <Link to="add-discount" style={{ color: "white" }}>
                          <Button
                            className="toggle btn-icon d-md-none"
                            color="primary"
                            onClick={() => {
                              toggle("add");
                            }}
                            style={{ width: "130px", top: "-73px" }}
                          >
                            <Icon name="plus"></Icon>
                            Add Discount
                          </Button>
                        </Link>
                        <Link to="add-discount" style={{ color: "white" }}>
                          <Button className="toggle d-none d-md-inline-flex" color="primary" style={{ width: "100%" }}>
                            <Icon name="plus">&nbsp;</Icon>
                            Add Discount
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          {/* <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={DisputesTableDatamain}
              columns={disputesTableColumnsmain}
              expandableRows
              pagination
              actions
            />
          </PreviewCard> */}
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
                <Button color="light" size="lg" className="btn-mw mr-3" onClick={Deletedata}>
                  Confirm
                </Button>
                <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalview} toggle={toggleModalview} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a className="close">
              {" "}
              <Icon name="cross-sm" onClick={toggleModalview}></Icon>
            </a>
            <div className="p-2">
              <h6 className="title text-left">Discount</h6>
              <div className="mt-4">
                <form>
                  <Row className="g-3">
                    <Col className="row" md="12">
                      <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text" style={{ fontWeight: "bold" }}>
                          Rule ID: <br />
                          <span class="caption-text">{getByID.rule_id}</span>
                        </span>
                      </div>
                      <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text" style={{ fontWeight: "bold" }}>
                          Rule Type: <br />
                          <span class="caption-text">{getByID.rule_type}</span>
                        </span>
                      </div>
                      <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text" style={{ fontWeight: "bold" }}>
                          From Date: <br />
                          <span class="caption-text">{getByID.from_date}</span>
                        </span>
                      </div>
                      <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text" style={{ fontWeight: "bold" }}>
                          End Date: <br />
                          <span class="caption-text">{getByID.end_date}</span>
                        </span>
                      </div>
                      <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text" style={{ fontWeight: "bold" }}>
                          Vendor Discount: <br />
                          <span class="caption-text">{getByID.vendor_discount}</span>
                        </span>
                      </div>
                      <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text" style={{ fontWeight: "bold" }}>
                          Babyamore Discount: <br />
                          <span class="caption-text">{getByID.babyamore_discount}</span>
                        </span>
                      </div>

                      <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text" style={{ fontWeight: "bold" }}>
                          Total Discount: <br />
                          <span class="caption-text">{getByID.total_discount}</span>
                        </span>
                      </div>
                      {getByID.rule_id ? (
                        <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                          {" "}
                          <span class="sub-text" style={{ fontWeight: "bold" }}>
                            Brand
                            <br />
                            {getByID.brand_id.map((branditems) => {
                              console.log("testtt 1111111111111", branditems);
                              return (
                                <>
                                  <span class="caption-text">
                                    {branditems.label === null ? "_____" : branditems.label}
                                  </span>
                                  <br />
                                </>
                              );
                            })}
                          </span>
                        </div>
                      ) : null}
                      {getByID.rule_id ? (
                        <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                          {" "}
                          <span class="sub-text" style={{ fontWeight: "bold" }}>
                            Product
                            <br />
                            {getByID.product_id.map((branditems) => {
                              return (
                                <>
                                  {/* <span class="caption-text"> */}
                                    {branditems.label === null ? "_____" : branditems.label}
                                  {/* </span> */}
                                  <br />
                                </>
                              );
                            })}
                          </span>
                        </div>
                      ) : null}
                      {/* {getByID.rule_id ? (
                        <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                          {" "}
                          <span class="sub-text" style={{ fontWeight: "bold" }}>
                            Category
                            <br />
                            {getByID.category_id.map((branditems) => {
                              console.log("testtt 1111111111111", branditems);
                              return (
                                <>
                                  <span class="caption-text">
                                    {branditems.label === null ? "_____" : branditems.label}
                                  </span>
                                  <br />
                                </>
                              );
                            })}
                          </span>
                        </div>
                      ) : null}
                      {getByID.rule_id ? (
                        <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                          {" "}
                          <span class="sub-text" style={{ fontWeight: "bold" }}>
                            Sub Category
                            <br />
                            {getByID.subcategory_id.map((branditems) => {
                              console.log("testtt 1111111111111", branditems);
                              return (
                                <>
                                  <span class="caption-text">
                                    {branditems.label === null ? "_____" : branditems.label}
                                  </span>
                                  <br />
                                </>
                              );
                            })}
                          </span>
                        </div>
                      ) : null}
                      {getByID.rule_id ? (
                        <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                          {" "}
                          <span class="sub-text" style={{ fontWeight: "bold" }}>
                            Child Category
                            <br />
                            {getByID.childcategory_id.map((branditems) => {
                              console.log("testtt 1111111111111", branditems);
                              return (
                                <>
                                  <span class="caption-text">
                                    {branditems.label === null ? "_____" : branditems.label}
                                  </span>
                                  <br />
                                </>
                              );
                            })}
                          </span>
                        </div>
                      ) : null}

                      {getByID.rule_id ? (
                        <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                          {" "}
                          <span class="sub-text" style={{ fontWeight: "bold" }}>
                            Warehouse
                            <br />
                            {getByID.warehouse_id.map((branditems) => {
                              console.log("testtt 1111111111111", branditems);
                              return (
                                <>
                                  <span class="caption-text">
                                    {branditems.label === null ? "_____" : branditems.label}
                                  </span>
                                  <br />
                                </>
                              );
                            })}
                          </span>
                        </div>
                      ) : null} */}
                      {getByID.rule_id ? (
                        <div class="col-lg-4" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                          {" "}
                          <span class="sub-text" style={{ fontWeight: "bold" }}>
                            Vendor
                            <br />
                            {getByID.vendor_id.map((branditems) => {
                              console.log("testtt 1111111111111", branditems);
                              return (
                                <>
                                  <span class="caption-text">
                                    {branditems.label === null ? "_____" : branditems.label}
                                  </span>
                                  <br />
                                </>
                              );
                            })}
                          </span>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* <MuiThemeProvider theme={Tabletheme()}>
                    <MaterialTable
                        icons={tableIcons}
                        // data={data}
                        // columns={disputesTableColumnsmain}
                        data={discountData}
                        columns={disputesTableColumnsmain}
                        title="DISCOUNT LIST"
                        options={options}
                        actions={[
                            {
                                icon: 'delete',
                                tooltip: 'Delete All Rows',
                                //   onClick: (event, rowData) => {
                                //     // Do save operation
                                //     alert("delete button clicked");
                                //   }
                            }
                        ]}
                    />
                </MuiThemeProvider> */}
        <CustomDataTable icons={tableIcons} data={reversed} columns={disputesTableColumnsmain} title="DISCOUNT LIST"
          actions={[
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
export default NewDiscount;
