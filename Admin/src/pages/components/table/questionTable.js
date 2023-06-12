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
} from "reactstrap";

import { DisputesTableDatas, disputesTableColumns2, userData } from "./TableData";
//
import { API_URL, token } from "../../../Api";
import axios from "axios";
import User from "../../../images/avatar/b-sm.jpg";
import { isWidthUp } from "@material-ui/core";

const API_Key = `${API_URL}/Products_Admin`;
const API_Key_Tags = `${API_URL}/Tags_Admin`;
const API_Key_vendor = `${API_URL}/UserVendor`;
const API_Key_mainCate = `${API_URL}/Maincategory`;
const API_Key_image_Path = `${API_URL}/Maincategory_view`;
const API_Key_subcate = `${API_URL}/SubCategory`;
const API_Key_childcate = `${API_URL}/Childcategory`;
const API_Key_Brand = `${API_URL}/Brand`;
const API_Key_Attributename = `${API_URL}/AttributesName`;
const API_Key_AttributeValue = `${API_URL}/Attributes_Admin`;
const API_Questions = `${API_URL}/admin/productlist/getQaData/`;
const API_Reply = `${API_URL}/admin/productlist/updateQa`;

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

const QuestionAnswer = () => {
  let updateDelete = [];
  const [active, setActive] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => {
    setwarehouse(true);
  };
  const classes = useStyles();
  const [smOption, setSmOption] = useState(false);
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState("");
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
  const [QAdata, setQAdata] = useState([]);
  const [replyDatas, setReplyData] = useState([]);
  const [replyID, setReplyID] = useState("");
  const [view, setView] = useState(false);
  const [Deleteicon, setDeleteicon] = useState(false);

  // const [answer, setAnswer] = useState({
  //   answer: "",
  //   id: "",
  // });
  const [viewAnswer, setViewAnswer] = useState({
    full_name: "",
    product_id: "",
    productname: "",
    customer_id: "",
    question: "",
    answer: "",
    id: "",
  });
  const handleCommentsChange = ({ target: { name, value } }) => {
    setViewAnswer({ ...viewAnswer, [name]: value });
  };
  const AnswerSubmit = async () => {
    // if (viewAnswer?.length > 0) {
    let formData = new FormData();
    formData.append("answer", viewAnswer.answer);
    let Result = await axios.put(`${API_Reply}/${replyID}`, formData, config);
    console.log(replyID, "replyIDssss");
    if (Result) {
      setViewAnswer({
        ...viewAnswer,
        // id: "",
        answer: "",
      });
      Getdata();
      setModalEdit(false);
    }
    // }
  };
  const handleDeleteRows = async(event, rowData) => {
    console.log(rowData,"rowData");
     rowData.map((currele)=>{
       updateDelete.push({
         value:currele.id ,  
       });
     })
     let gg ={
       deleteid:updateDelete,
       type:"question"
     
     } 
       
   
 
   let res = await axios.post("dsdsdsdsdsd",gg,config);
 if(res){
   console.log("sasasas")
 }
 
 
   };
  const toggleClose = () => {
    setModalEdit(false);
  };
  const toggleEdit = async (id) => {
    // console.log("id", id);
    // setView({ add: type === "edit" ? true : false });
    setReplyID(id);
    console.log(replyID, "replyID");
    setModalEdit(true);
    const replyData = await axios.get(`${API_Questions}`, config);
    if (replyData) {
      let Result = replyData.data.list.filter((currEle) => {
        return currEle.id == id;
      });

      setViewAnswer({
        ...viewAnswer,
        full_name: Result[0].full_name,
        product_id: Result[0].product_id,
        productname: Result[0].productname,
        customer_id: Result[0].customer_id,
        question: Result[0].question,
        answer: Result[0].answer,
      });
      console.log("resultdssa", Result);
    }

    // const Res = Result.map((itemsMain) => {
    //   const datss = {
    //     value: itemsMain.id,
    //     label: itemsMain.question,
    //   };
    //   return datss;
    // });

    // console.log(replyDatas, "replyadata");
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    Getdata();
    // getReplydata();
  }, []);
  const reversed = [...QAdata].reverse();
  const Getdata = async () => {
    const data = await axios.get(`${API_Questions}`);
    setQAdata(data.data.list);
  };

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
    // console.log(id, "setFormData");
    setDeleteID(id);
    setModalFail(true);
    setDeleteicon(false);
  };

  const ActiveOpen = (id) => {
    setActive(!active);
    // console.log(active)
  };

  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    const replyDatass = await axios.get(`${API_Questions}`, config);
    if (replyDatass) {
      let Results = replyDatass.data.list.filter((currEle) => {
        return currEle.id == id;
      });
      console.log(Results, "ResultsResultsResults");

      setViewAnswer({
        ...viewAnswer,
        full_name: Results[0].full_name,
        product_id: Results[0].product_id,
        productname: Results[0].productname,
        customer_id: Results[0].customer_id,
        question: Results[0].question,
        answer: Results[0].answer,
      });
      console.log("resultdssa", Results[0].id);
    }
  };

  const [deleteID, setDeleteID] = useState();

  const DeleteQuestion = async (id) => {
    await axios.put(`${API_Reply}/${deleteID}`, { delete: 0 }, config).then((res) => {
      Getdata();
      setDeleteicon(true);
      setTimeout(() => {
        setModalFail(false);
      }, 1000);
    });
    // if (deleteData) {
    //   let Results = deleteData.data.list.filter((currEle) => {
    //     return currEle.id == id;
    //   });
    // }
  };
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    // setImageChange(false);
    // setFiles1([]);
  };
  const ProductCodeColumns = [
    // {
    //   field: 'Image', title: 'Image',
    //   render: (rowData) => <img src={rowData.Image} style={{ width: 50, borderRadius: "50%" }} />,
    // },
    { field: "full_name", title: "Name" },
    { field: "product_id", title: "ProductId" },
    { field: "productname", title: "ProductName" },
    { field: "customer_id", title: "CustomerId" },
    { field: "question", title: "Question" },
    { field: "answer", title: "Answer" },
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
                <ul className="link-list-opt no-bdr" style={{ height: "122px", overflowY: "scroll" }}>
                  <li>
                    <DropdownItem tag="a" onClick={() => toggleEdit(row.id)} style={{ cursor: "pointer" }}>
                      <Icon name="reply"></Icon>
                      <span>Reply</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => handleopenview("Viewdetails", row.id)}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#remove"
                      style={{ cursor: "pointer" }}
                      onClick={() => DeleteOpen(row.id)}
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

  return (
    <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        {/* <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable
            icons={tableIcons}
            // columns={ProductCodeColumns}
            // data={data}
            columns={ProductCodeColumns}
            data={QAdata}
            title="QUESTION & ANSWER"
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
        </MuiThemeProvider> */}
        <CustomDataTable icons={tableIcons} data={reversed} columns={ProductCodeColumns} title="QUESTION & ANSWER" 
         actions={[
          {
            icon: "delete",
            tooltip: "Delete All Rows",
            onClick: handleDeleteRows
          },
        ]}
        />
      </Content>
      <Modal isOpen={modalEdit} toggle={toggleClose} className="modal-md">
        <ModalHeader toggle={toggleClose}>Question & Answer</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={() => handleSubmit}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <label className="form-label">Question</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">{viewAnswer.question}</div>
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <label className="form-label">Reply Message</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <textarea
                          className="form-control"
                          name="answer"
                          value={viewAnswer.answer}
                          onChange={handleCommentsChange}
                        />
                        {console.log(viewAnswer, "viewAnswer")}
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <ul className="d-flex justify-content-between gx-4 mt-1">
                  <li></li>
                  <li>
                    <Button
                      color="primary"
                      className="btn"
                      //  onClick={toggleEdit}
                      onClick={AnswerSubmit}
                    >
                      Update
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      {/* <Modal size="lg" isOpen={warehouse} toggle={Warehouse}>
        <ModalHeader
          toggle={Warehouse}
          close={
            <button className="close" onClick={Warehouse}>
              <Icon name="cross" />
            </button>
          }
        >
          Product Review Status
        </ModalHeader>
        <ModalBody>
          <ModalBody>
            <div className="p-2">
              <div className=" ">
                <form>
                  <Row className="g-3">
                    <Col md="4">
                      <div className="preview-block">
                        <span className="preview-title overline-title">Acepted</span>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                            defaultChecked
                            className="custom-control-input form-control"
                          />
                          <label className="custom-control-label" htmlFor="customRadio1">
                            Acepted
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="preview-block">
                        <span className="preview-title overline-title">Rejected</span>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customRadio2"
                            name="customRadio"
                            className="custom-control-input form-control"
                          />
                          <label className="custom-control-label" htmlFor="customRadio2">
                            Rejected
                          </label>
                        </div>
                      </div>
                    </Col>

                    <Col size="12" style={{ justifyContent: "end" }}>
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>SAVE</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </ModalBody>
      </Modal> */}

      <Modal isOpen={modalFail} toggle={toggleModalFail}>
        <ModalBody className="modal-body-lg text-center">
          <div className="nk-modal">
            {/* <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon> */}
            <Icon
              className={
                Deleteicon
                  ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"
                  : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
              }
            ></Icon>
            {/* <h4 className="nk-modal-title">Do you want Delete!</h4> */}
            <h4 className="nk-modal-title">{Deleteicon ? "Question deleted successfully" : "Do you want to delete"}</h4>
            {/* <div className="nk-modal-text">
                <p className="lead">
                  We are sorry, we were unable to process your payment. Please try after sometimes.
                </p>
                <p className="text-soft">If you need help please contact us at (855) 485-7373.</p>
              </div> */}
            {Deleteicon ? (
              <div className="nk-modal-action mt-5 d-flex justify-content-around"></div>
            ) : (
              <div className="nk-modal-action mt-5 d-flex justify-content-around">
                <Button
                  color="light"
                  size="lg"
                  className="btn-mw"
                  style={{ left: "20px" }}
                  onClick={() => DeleteQuestion(data.id)}
                >
                  Confirm
                </Button>
                <Button color="light" size="lg" className="btn-mw" style={{ right: "20px" }} onClick={toggleModalFail}>
                  Cancel
                </Button>
              </div>
            )}

            {/* <div className="nk-modal-action mt-5">
              <Button color="light" size="lg" className="btn-mw mr-3" onClick={() => DeleteQuestion(data.id)}>
                Confirm
              </Button>
              <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                Cancel
              </Button>
            </div> */}
          </div>
        </ModalBody>
      </Modal>

      {/* View Brand Modal */}
      <Modal isOpen={view.Viewdetails} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a className="close">
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
            <h5 className="title">QUESTION & ANSWER</h5>
            <div className="mt-4">
              <Row className="g-3">
                <Col className="row" md="12">
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Name</span>
                    <span class="caption-text">{viewAnswer.full_name}</span>
                  </div>

                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Product ID</span>
                    <span class="caption-text">{viewAnswer.product_id}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Product Name</span>
                    <span class="caption-text">{viewAnswer.productname}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Customer ID</span>
                    <span class="caption-text">{viewAnswer.customer_id}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Question</span>
                    <span class="caption-text">{viewAnswer.question}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Answer</span>
                    <span class="caption-text">{viewAnswer.answer}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default QuestionAnswer;
