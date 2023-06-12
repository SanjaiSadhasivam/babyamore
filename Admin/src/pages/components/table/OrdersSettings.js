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
import Bathing from "../../../images/avatar/bath.jpg";
import BottleFeeding from "../../../images/avatar/bottle-feed.jpg";
import Diapers from "../../../images/avatar/diapers.jpg";
import OralHealth from "../../../images/avatar/oralhealth.jpg";
import { Block, BlockHead, BlockHeadContent, Icon, Row, Col, CustomDataTable } from "../../../components/Component";
import { messageData } from "./MessageData";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import { API_URL } from "../../../Api";
import User1 from "../../../images/avatar/d-sm.jpg";
import User2 from "../../../images/avatar/c-sm-Copy.jpg";

// const API_Key = `${API_URL}/Maincategory/list`;
// const API_Key_delete = `${API_URL}/Maincategory/delete`;
// const API_Key_image_Path = `${API_URL}/Maincategory_view`;

const OrdersSettings = () => {
  // const [data, setData] = useState(messageData);
  const [data, setData] = useState();
  const [DEleteId, setDEleteId] = useState("");
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

  const [view, setView] = useState({
    add: false,
    details: false,
  });

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    // resetForm();
  };

  useEffect(() => {
    Getdata();
  }, []);

  const Getdata = async () => {
    const data = await axios.get(`${API_Key}`);
    setData(data.data);
  };

  const EditTable = (id, type) => {
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
  const toggleModalview = () => setModalview(!modalview);
  const viewlist = async (id) => {
    setModalview(true);
  };

  const DeleteOpen = (id) => {
    // setDEleteId(id)
    setModalFail(true);
  };

  const Deletedata = () => {
    // if (DEleteId) {
    //     axios.delete(`${API_Key_delete}/${DEleteId}`).then(res => {
    //         Getdata();
    //         setModalFail(false)
    //     })
    // }
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

  const AttrValueColumnsData = [
    {
      Image: User1,
      WeightInGram: "10-50 ",
      DeliveryPartnerName: "Jonny",
      // DiscountValue: "500",
    },
    {
      Image: User2,
      WeightInGram: "50-100",
      DeliveryPartnerName: "Depp",
      // DiscountValue: "500",
    },
  ];

  const disputesTableColumnsmain = [
    {
      field: "Image",
      title: "Image",
      render: (rowData) => <img src={rowData.Image} style={{ width: 50, borderRadius: "50%" }} />,
    },
    { field: "WeightInGram", title: "Weight In Gram" },
    { field: "DeliveryPartnerName", title: "Delivery Partner Name" },
    // { field: "DiscountValue", title: "Discount Value" },

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
                      href="#edit"
                      // onClick={() => EditTable(row._id)}
                    >
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      href="#view"
                      // onClick={() => viewlist(row._id)}
                    >
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      href="#remove"
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
  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const [files1, setFiles1] = useState([]);

  return (
    <React.Fragment>
      {/* <Head title="MAIN Category List" /> */}
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
                            <Icon name="plus"></Icon>Add Settings
                          </Button>
                        </Link>
                        {/* <Link to="add-discount" style={{ color: "white" }}> */}
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          style={{ width: "100%" }}
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <Icon name="plus">&nbsp;</Icon>
                          Add settings
                        </Button>
                        {/* </Link> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
        </Block>

        {/* <MuiThemeProvider theme={Tabletheme()}>
                    <MaterialTable
                        icons={tableIcons}
                        // data={data}
                        // columns={disputesTableColumnsmain}
                        data={AttrValueColumnsData}
                        columns={disputesTableColumnsmain}
                        title="SETTINGS LIST"
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
        <CustomDataTable
          icons={tableIcons}
          data={AttrValueColumnsData}
          columns={disputesTableColumnsmain}
          title="SETTINGS LIST"
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
              <h5 className="title">Add Settings</h5>
              <div className="mt-4">
                {/* <form onSubmit={handleSubmit(onFormSubmitBrand)}> */}
                <Row className="g-3">
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        Weight In Gram (From)
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          name="WeightInGramFrom"
                          placeholder="Enter Weight In Gram (From)"
                          // value={Brand.SeoDescription}
                          // onChange={handleChangesss}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        Weight In Gram (To)
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          name="WeightInGramTo"
                          placeholder="Enter Weight In Gram (To)"
                          // value={Brand.SeoDescription}
                          // onChange={handleChangesss}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        Delivery Partner Name
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          name="SeoDescription"
                          placeholder="Enter Delivery Partner Name"
                          // value={Brand.SeoDescription}
                          // onChange={handleChangesss}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col size="6">
                    <label className="form-label">Upload Image</label>
                    <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                            <input {...getInputProps()} />
                            {files1.length === 0 && <p>Upload Image</p>}
                            {files1.map((file) => (
                              <div
                                key={file.name}
                                className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                              >
                                <div className="dz-image">
                                  <img src={file.preview} alt="preview" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </Col>

                  <Col size="12" className="d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      <Icon className="plus"></Icon>
                      <span>Submit</span>
                    </Button>
                  </Col>
                </Row>
                {/* </form> */}
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default OrdersSettings;
