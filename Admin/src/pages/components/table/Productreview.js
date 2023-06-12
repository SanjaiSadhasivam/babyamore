import React, { useEffect, useState, forwardRef } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { ToastContainer, toast } from "react-toastify";
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
  Badge,
} from "reactstrap";

import { DisputesTableDatas, disputesTableColumns2, userData } from "./TableData";
//
import { API_URL, token } from "../../../Api";
import axios from "axios";
import User from "../../../images/avatar/b-sm.jpg";

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

const API_Review = `${API_URL}/admin/productlist/getCommentsData`;

const API_Review_Data = `${API_URL}/admin/productlist/updateComment`;
const API_Review_Updata = `${API_URL}/admin/productlist/updateadminComment`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

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

const ProductReviews = () => {
  let updateDelete = [];
  const [active, setActive] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => {
    setwarehouse(!warehouse);
  };
  const classes = useStyles();
  const [smOption, setSmOption] = useState(false);
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState("");

  const history = useHistory();
  const [modalEdit, setModalEdit] = useState(false);

  const [review, setReview] = useState([]);

  const toggleEdit = async (type, id) => {
    console.log("idddd", id);
    setID(id);
    setModalEdit(!modalEdit);
    setView({ add: type === "edit" ? true : false });

    const { data } = await axios.get(`${API_Review}/${id}`, config);
    //console.log("data", data);

    setReviews({
      ...reviews,
      comments: data.list[0].comments,
    });
  };

  const [view, setView] = useState({
    reply: false,
    edit: false,
    add: false,
    details: false,
    Viewdetails: false,
  });

  const [ID, setID] = useState([]);
  const [reviews, setReviews] = useState({
    id: "",
    full_name: "",
    email_address: "",
    phone_number: "",
    productname: "",
    comments: "",
    reviewrating: "",
  });

  const handleCommentsChange = ({ target: { name, value } }) => {
    setReviews({ ...reviews, [name]: value });
  };

  useEffect(() => {
    Getdata();
    getReview();
  }, []);

  //Review Get Method start below
  const reversed = [...review].reverse();
  console.log(reversed, "reversed");
  const getReview = async () => {
    const reviews = await axios.get(`${API_Review}`, config);
    // console.log(reviews, "reviews");
    setReview(reviews.data.list);
  };
  //Review Get Method end above

  const Edit = () => {
    let formData = new FormData();
    // formData.append("id", id);

    formData.append("comments", reviews.comments);

    console.log("formData", ...formData);

    const { data } = axios.put(`${API_Review_Updata}/${ID}`, formData, config).then((res) => {
      console.log("datadata", data);
      setReviews({
        ...reviews,
        comments: "",
      });

      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setModalEdit(false);
      onFormCancel();
      getReview();
    });
  };

  const Getdata = async () => {
    setData([]);
    const data = await axios.get(`${API_Key}/list`);
    // console.log("data", data.data)
    data.data.map(async (items) => {
      const Brand = await axios.get(`${API_Key_Brand}/${items.Brands}`);
      const Categories = await axios.get(`${API_Key_mainCate}/${items.MainCategory}`);
      // console.log("testt", Brand.data)
      // console.log("testt", Categories.data)
      const datss = {
        _id: items._id,
        ProductId: items.ProductId,
        ProductName: items.ProductName,
        Categories: Categories.data.CategoryName,
        Brand: Brand.data.BrandName,

        ProductType: items.ProductType,
        SKU: items.SKU,
        SalePrice: items.SalePrice,
      };
      setData((items) => [...items, datss]);
    });
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

  //Delete Popup and function
  const [deleteID, setDeleteID] = useState();
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (id) => {
    //console.log(id, "setDeleteID");
    setDeleteID(id);
    setModalFail(true);
  };

  const handleAlertDelete = async () => {
    await axios.put(`${API_Review_Data}/${deleteID}`, { delete: 0 }, config).then((res) => {
      getReview();

      setModalFail(false);
    });
  };

  //View function Start below
  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });

    const { data } = await axios.get(`${API_Review}/${id}`, config);
    //console.log("dataView", data);

    setReviews({
      ...reviews,
      full_name: data.list[0].full_name,
      email_address: data.list[0].email_address,
      phone_number: data.list[0].phone_number,
      productname: data.list[0].productname,
      comments: data.list[0].comments,
      reviewrating: data.list[0].reviewrating,
    });
  };
  //View function end above

  const ActiveOpen = (id) => {
    setActive(!active);
    // console.log(active)
  };

  const [status, setStatus] = useState(0);

  const handleClickReplyOpen = (type, id) => {
    // console.log("datais",id);

    setStatus(id);
    setView({
      reply: type === "reply" ? true : false,
      edit: type === "edit" ? true : false,
    });

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
      theme="light"
    />;
  };

  const onFormCancel = () => {
    setView({ reply: false });
  };

  const handleAttributeStatus = async () => {
    const { data } = await axios.put(`${API_Review_Data}`, { Status: 1 }, config);
    Getdata();
  };

  const updateReview = async () => {
    const { data } = await axios.put(`${API_Review_Data}/${status}`, { Status: 1 }, config);
    setView({ reply: false });
    toast.success("Review Approved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getReview();
  };

  const declineReview = async () => {
    const { data } = await axios.put(`${API_Review_Data}/${status}`, { Status: 2 }, config);

    setView({ reply: false });
    toast.error("Review Declined", {
      position: "top-right",
      autoClose: 5000,
      color: "red",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getReview();
  };

  const ProductCodeColumnsData = [
    {
      Image: User,
      Name: "Vishal",
      Email: "Vishal@gmail.com",
      Number: "234567890",
      Product: "Nice Product good Quality 500gm",
      Rating: "5",
      CreatedDate: "23/02/2022 7:33am",
    },
  ];
  const ProductCodeColumns = [
    {
      field: "Image",
      title: "Image",
      render: (rowData) => <img src={rowData.Image} style={{ width: 50, borderRadius: "50%" }} />,
    },

    { field: "full_name", title: "Name" },
    { field: "email_address", title: "Email" },
    { field: "phone_number", title: "Contact" },
    { field: "productname", title: "Product" },
    { field: "reviewrating", title: "Rating" },
    { field: "comments", title: "Message" },
    { field: "createDt", title: "Created Date" },
    {
      field: "Status",
      title: "Status",
      render: (row) => {
        // console.log(row.Status ,"rowStatus ");
        if (row.Status === 0) {
          return (
            <Button
              size="sm"
              color={row.Status === 0 ? "warning" : "primary"}
              onClick={() => handleAttributeStatus(row, row.Status)}
            >
              Pending
            </Button>
          );
        } else if (row.Status === 1) {
          return (
            <Button
              size="sm"
              color={row.Status === 1 ? "success" : "primary"}
              onClick={() => handleAttributeStatus(row, row.Status)}
            >
              Approval
            </Button>
          );
        } else {
          return (
            <Button
              size="sm"
              color={row.Status === 1 ? "success" : "primary"}
              onClick={() => handleAttributeStatus(row, row.Status)}
            >
              Declined
            </Button>
          );
        }
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
                <ul className="link-list-opt no-bdr" style={{ height: "122px", overflowY: "scroll" }}>
                  <li onClick={() => handleClickReplyOpen("reply", row.id)}>
                    <DropdownItem tag="a" style={{ cursor: "pointer" }}>
                      <Icon name="reply"></Icon>
                      <span>Reply</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" onClick={() => toggleEdit("edit", row.id)}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
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




  const handleDeleteRows = async(event, rowData) => {
    console.log(rowData,"rowData");
     rowData.map((currele)=>{
       updateDelete.push({
         value:currele.id ,  
       });
     })
     let gg ={
       deleteid:updateDelete,
       type:"review"
     
     } 
       
   
 
   let res = await axios.post("dsdsdsdsdsd",gg,config);
 if(res){
   console.log("sasasas")
 }
 
 
   };






  return (
    <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <div className="row mb-2 ">
          <div className="col-md-4 ">
            <RSelect
              name="GST"
              options={[
                { value: "Approval", label: "Approval" },
                { value: "BulkApproval", label: "Bulk Approval" },
              ]}
              placeholder="Bulk Action "
            />
          </div>
        </div>

        {/* <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable
            icons={tableIcons}
            // columns={ProductCodeColumns}
            // data={data}
            columns={ProductCodeColumns}
            data={review}
            title="PRODUCT REVIEW"
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
        <CustomDataTable icons={tableIcons} data={reversed} columns={ProductCodeColumns} title="PRODUCT REVIEW"  actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows
            },
          ]}
         />
      </Content>
      <Modal isOpen={modalEdit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>Edit Comment</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={() => handleSubmit}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <label className="form-label">Comments</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <textarea
                          className="form-control"
                          name="comments"
                          value={reviews.comments}
                          onChange={handleCommentsChange}
                        />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>

              <Col size="12">
                <ul className="d-flex justify-content-between gx-4 mt-1">
                  <li></li>
                  <li>
                    <Button color="danger" className="btn" onClick={Edit}>
                      UPDATE
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
                <form >
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
            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
            <h4 className="nk-modal-title">Do you want Delete!</h4>
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

      <Modal isOpen={view.reply} toggle={() => onFormCancel()}>
        <ModalHeader toggle={() => onFormCancel()}>Review Reply</ModalHeader>
        <ModalBody className="modal-body-sm text-center">
          {/* <div className="nk-modal"> */}
          <div className="d-flex justify-content-around">
            <Button color="light" size="lg" className="btn-mw" type="" onClick={() => updateReview()}>
              Approved
            </Button>

            <Button color="light" size="lg" className="btn-mw" onClick={() => declineReview()}>
              Declined
            </Button>
          </div>
          {/* </div> */}
        </ModalBody>
      </Modal>

      {/* View Modal */}
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
            <h5 className="title">Product Reviews</h5>
            <div className="mt-4">
              <Row className="g-3">
                <Col className="row" md="12">
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Name</span>
                    <span class="caption-text">{reviews.full_name}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Email</span>
                    <span class="caption-text">{reviews.email_address}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Contact</span>
                    <span class="caption-text">{reviews.phone_number}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Product Name</span>
                    <span class="caption-text">{reviews.productname}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Message</span>
                    <span class="caption-text">{reviews.comments}</span>
                  </div>
                  <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                    <span class="sub-text">Rating</span>
                    <span class="caption-text">{reviews.reviewrating}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </ModalBody>
      </Modal>
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
        theme="light"
      />
    </React.Fragment>
  );
};

export default ProductReviews;
