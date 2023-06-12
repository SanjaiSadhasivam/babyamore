import React, { useEffect, useState, forwardRef } from "react";
import moment from 'moment'

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
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
  CustomDataTable,
} from "../../../components/Component";

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

import { ProductTagsData, userData, CouponCodeData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import { Link, useHistory } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {
  API_Product,
  API_Brand,
  API_Coupon,
  API_Category,
  API_SubCategory,
  API_ChildCategory,
  token,
} from "../../../Api";
import axios from "axios";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Coupon = () => {
  const [data, setData] = useState(orderData);

  const [smOption, setSmOption] = useState(false);
  const history = useHistory();
  // const [formData, setFormData] = useState({
  //   id: null,
  //   orderId: "",
  //   date: new Date(),
  //   status: "",
  //   customer: "",
  //   purchased: "",
  //   paid: "",
  //   total: "",
  //   check: false,
  // });

  // const [onSearchText, setSearchText] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemPerPage] = useState(7);

  // const [view, setView] = useState({
  //   add: false,
  //   details: false,
  //   views: false
  // });

  // const toggle = (type) => {
  //   setView({
  //     add: type === "add" ? true : false,
  //     details: type === "details" ? true : false,
  //     views: type === "add" ? true : false,
  //   });
  // };

  //
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

  useEffect(() => {
    Getdata();
  }, []);

  const Getdata = async () => {
    setData([]);
    const Result = await axios.post(`${API_Key}/list`);
    setData(Result.data);

    // console.log(Result.data)
  };
  const [filter, setFilter] = useState(false);

  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });

  //
  const EditTable = (id) => {
    console.log(id, "iiiddd");
    history.push({ pathname: `/dashboard/coupon-add_edit/${id}`, state: id });
  };

  const [modalFail, setModalFail] = useState(false);
  const [modalview, setModalview] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const toggleModalview = () => setModalview(!modalview);
  const [DeleteId, setDeleteId] = useState("");
  const [ViewId, setViewId] = useState("");

  const [GetById, setGetById] = useState();
  const viewlist = async (id) => {
    console.log(id);
    const Result = await axios.get(`${API_Coupon}/${id}`, config);
    console.log(Result.data.list[0], "view");
    setGetById(Result.data.list[0]);
    setModalview(true);
  };

  const DeleteOpen = (id) => {
    setDeleteId(id);
    setModalFail(true);
  };

  const handleAlertDelete = async () => {
    // const { data } = await axios.put(`${API_Coupon}/delete/${DeleteId}`);
    // // console.log(data, 'delete')
    // Getdata();
    // window.location.reload()
    if (DeleteId) {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      };
      const Result = await axios.put(`${API_Coupon}/delete/${DeleteId}`, formData, config);
      setModalFail(false);
      window.location.reload(true);
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

  // const onFormSubmit = (form) => {
  //   if (!ID) {
  //     Create();
  //   } else {
  //     Edit(ID);
  //   }
  // };

  // const Create = () => {
  //   let formData = new FormData();
  //   formData.append("TagName", Tags.TagName);
  //   formData.append("TagSlug", Tags.TagSlug);
  //   formData.append("Status", Tags.Status);

  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   axios.post(API_Key, formData, config).then((res) => {
  //     setTags({
  //       ...Tags,
  //       TagName: "",
  //       TagSlug: "",
  //       Status: "",
  //     });
  //   });
  //   Getdata();
  //   onFormCancel();
  // };

  // const ProductTagsColumn = [
  //   { field: "CouponCode", title: "Coupon Code" },
  //   { field: "DiscountType", title: "Discount Type" },
  //   { field: "CouponAmount", title: "Coupon Amount" },
  //   { field: "CouponExpiryDate", title: "End Date" },

  //   {
  //     field: "",
  //     title: "Action",
  //     render: (row) => (
  //       <ul className="gx-1 my-n1">
  //         <li className="mr-n1">
  //           <UncontrolledDropdown>
  //             <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
  //               <Icon name="more-h"></Icon>
  //             </DropdownToggle>
  //             <DropdownMenu right>
  //               <ul className="link-list-opt no-bdr">
  //                 <li>
  //                   <DropdownItem tag="a" href="coupon-edit" onClick={()=> EditTable(row._id)}>
  //                     <Icon name="edit"></Icon>
  //                     <span>Edit</span>
  //                   </DropdownItem>
  //                 </li>
  //                 <li>
  //                   <DropdownItem tag="a" onClick={() => viewlist(row._id)}>
  //                     <Icon name="eye"></Icon>
  //                     <span>View</span>
  //                   </DropdownItem>
  //                 </li>
  //                 <li>
  //                   <DropdownItem tag="a" href="#remove" onClick={()=> DeleteOpen(row._id)}>
  //                     <Icon name="trash"></Icon>
  //                     <span>Remove</span>
  //                   </DropdownItem>
  //                 </li>
  //               </ul>
  //             </DropdownMenu>
  //           </UncontrolledDropdown>
  //         </li>
  //       </ul>
  //     ),
  //   },
  // ];
  const [tableDatas, settableDatas] = useState([]);
  const reversed = [...tableDatas].reverse();
  const getCoupons = async () => {
    const Result = await axios.get(`${API_Coupon}`, config);
    settableDatas(Result.data.list);
    // console.log(Result.data.list.map((item) => item.product_id), "Result.data.list");
    // const res = Result.data.list.map((pro) => {
    //   const datas = [{
    //     code: pro.code,
    //     discount_percent: pro.discount_percent,
    //     end_date: pro.end_date,
    //     discount_type: pro.discount_type === 1 ?"Fixed Cart Discount" : "Percentage Discount"
    //   }];
    //   settableDatas(datas);
    // });
    // return res
  };

  const vars = tableDatas.map((item) => item.product_id)
  // console.log(JSON.parse(vars), "tableDatas");

  const AttrValueColumnsData = [
    {
      CouponCode: "1AS23F",
      DiscountType: "PROD-0004",
      CouponAmount: "200",
      CouponExpiryDate: "24-3-23",
    },
  ];
  useEffect(() => {
    getCoupons();
  }, []);

  console.log(
    tableDatas.map((item) => (item.discount_type === 1 ? "yes" : "no")),
    "22222"
  );
  // const dataDate = tableDatas.map((item) => moment(item.from_date).format("YYYY-MM-DD"))
  const dates = tableDatas.map((mapy) => mapy.end_date)
  console.log(dates, "avc");
  // var day = moment(rowData.EventDate).format("YYYY-MM-DD");

  const ProductTagsColumn = [
    { field: "code", title: "Coupon Code" },
    { field: "", title: "Discount Type", render: (row) => <p>{row.discount_type === 1 ? "Fixed Cart Discount" : "Percentage Discount"}</p> },
    { field: "discount_percent", title: "Coupon Percentage" },
    { field: "", title: "End Date", render: (row) => <p>{row.end_date.slice(0, 10)}</p> },
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
                    <DropdownItem tag="a" onClick={() => EditTable(row.coupon_id)}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#" onClick={() => viewlist(row.coupon_id)}>
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#" onClick={() => DeleteOpen(row.coupon_id)}>
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

  // function to close the form modal
  // const onFormCancel = () => {
  //   setView({ add: false, details: false });
  //   // resetForm();
  // };

  // const resetForm = () => {
  //   setFormData({
  //     ...formData,
  //     id: null,
  //     orderId: "",
  //     date: new Date(),
  //     status: "",
  //     customer: "",
  //     purchased: "",
  //     total: "",
  //     check: false,
  //   });
  // };

  // const { errors, register, handleSubmit } = useForm();
  const handleDeleteRows = (event, rowData) => {
    // console.log(rowData,"yyyyyyyy")
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.coupon_id,
      }
      return a;
    })
    console.log(update, "yyyyyyyy")
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "coupon");
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
          getCoupons();
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
      <Head title="Coupons" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-content-end">
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
                  <div
                    className="toggle-expand-content"
                    style={{ display: smOption ? "block" : "none", justifyContent: "end" }}
                  >
                    <ul className="nk-block-tools g-3" style={{ justifyContent: "end" }}>
                      <li className="nk-block-tools-opt">
                        <Link to={"coupon-add_edit"}>
                          <Button
                            className="toggle btn-icon d-md-none"
                            color="primary"
                          // onClick={() => {
                          //   toggle("add");
                          // }}
                          >
                            <Icon name="plus"></Icon>
                          </Button>
                        </Link>
                        <Link to={"coupon-add_edit"}>
                          <Button
                            className="toggle d-none d-md-inline-flex"
                            color="primary"
                          // onClick={() => {
                          //   toggle("details");
                          // }}
                          >
                            <Icon name="plus"></Icon>
                            <span>Add Coupon</span>
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>

          {/* <MuiThemeProvider theme={Tabletheme()}>
            <MaterialTable
              icons={tableIcons}
              // columns={ProductTagsColumn}
              // data={data}
              columns={ProductTagsColumn}
              data={tableDatas}
              title="COUPONS LIST"
              options={options}
              actions={[
                {
                  icon: 'delete',
                  tooltip: 'Delete All Rows',
                  // onClick: (event, rowData) => {
                  //   // Do save operation
                  //   alert("delete button clicked");
                  // }
                }
              ]}
            />
          </MuiThemeProvider> */}
          <CustomDataTable icons={tableIcons} data={reversed} columns={ProductTagsColumn}
            title="COUPONS LIST"
            actions={[
              {
                icon: "delete",
                tooltip: "Delete All Rows",
                onClick: handleDeleteRows
              },
            ]}
          />
        </Block>

        {/* <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Coupon</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Coupon Code
                        </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" name="customer" placeholder="Enter Tag Name" />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Offer Price or %
                        </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" name="customer" placeholder="Enter Tag Slug" />
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12" className="text-center">
                      <Button color="primary" type="submit">
                        <span>SUBMIT</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal> */}

        {/* <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
              <h5 className="title text-center">STATUS UPDATE</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Coupon Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" },
                            ]}
                            name="customer"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                          />
                        </div>
                        {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                      </div>
                    </Col>

                    <Col size="12" className="text-center">
                      <Button color="primary" type="submit">
                        <span> UPDATE </span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal> */}
        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
              <h4 className="nk-modal-title">Do you want Delete!</h4>
              <div className="nk-modal-action mt-5 d-flex justify-content-around">
                <Button color="light" size="lg" className="btn-mw" onClick={handleAlertDelete}>
                  Confirm
                </Button>
                <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {console.log(GetById, "GetById")}
        <Modal isOpen={modalview} toggle={toggleModalview} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a className="close">
              {" "}
              <Icon name="cross-sm" onClick={toggleModalview}></Icon>
            </a>
            <div className="p-2">
              <h6 className="title text-left">Coupons</h6>
              <div className="mt-4">
                {/* <form onSubmit={handleSubmit(onFormSubmit)}> */}
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Coupon Code: <br />
                        <span class="caption-text">{GetById ? GetById.code : ""}</span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.CouponCode}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Discount Type: <br />
                        <span class="caption-text">
                          {GetById
                            ? GetById.discount_type === 1
                              ? "Percentage Discount"
                              : "Fixed Cart Discount"
                            : null}
                        </span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.DiscountType}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Discount Percentage: <br />
                        <span class="caption-text">{GetById ? GetById.discount_percent : null}</span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.CouponAmount}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Coupon Expiry Date: <br />
                        <span class="caption-text">{GetById ? GetById.from_date : null}</span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.CouponExpiryDate}</span> */}
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Coupon Expiry Date: <br />
                        <span class="caption-text">{GetById ? GetById.end_date : null}</span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.CouponExpiryDate}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Minimum spend: <br />
                        <span class="caption-text">{GetById ? GetById.min_spend : null}</span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.Minimumspend}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Maximum Spend: <span class="caption-text">{GetById ? GetById.max_discount_amount : null}</span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.MinOrderAmount}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Products :<br />
                        <span class="caption-text"></span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.ProductsOperator}</span> */}
                    </div>

                    {/* <div class="col-lg-6" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                        <span class="sub-text">Discount Type :</span>
                        <span class="caption-text"></span>
                        {/* <span class="caption-text">{ViewId.DiscountType}</span> */}
                    {/* </div> */}

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Exclude Products: <br />
                        <span class="caption-text"></span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.Products}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Category:<span class="caption-text"></span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.ExcludeProducts}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Exclude Category: <span class="caption-text"></span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.CategoriesOperator}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Brand: <span class="caption-text"></span>
                      </span>
                      <span class="caption-text"></span>
                      {/* <span class="caption-text">{ViewId.ProductCategory}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Exclude Brand: <span class="caption-text"></span>
                      </span>
                      {/* <span class="caption-text"></span> */}
                      {/* <span class="caption-text">{ViewId.ExcludeCategory}</span> */}
                    </div>

                    {/* <div class="col-lg-6" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                        <span class="sub-text">Categories Operator: Himalayas</span>
                        <span class="caption-text"></span>
                        {/* <span class="caption-text">{ViewId.CategoriesOperator}</span> */}
                    {/* </div> */}

                    {/* <div class="col-lg-6" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                        <span class="sub-text">Product Category: </span>
                        <span class="caption-text"></span>
                        {/* <span class="caption-text">{ViewId.ProductCategory}</span> */}
                    {/* </div> */}

                    {/* <div class="col-lg-6" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                        <span class="sub-text">Exclude Category:</span>
                        <span class="caption-text">{ViewId.ExcludeCategory}</span>
                      </div> */}

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Individual Usage: <br />
                        <span class="caption-text">{GetById ? GetById.is_individual_usage : null}</span>
                      </span>

                      {/* <span class="caption-text">{ViewId.AllowedEMails}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Usage Limit Per Coupon: <br />
                        <span class="caption-text">{GetById ? GetById.usage_limit_per_coupon : null}</span>
                      </span>
                      {/* <span class="caption-text">{ViewId.UsageLimitPerCoupon}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Usage Limit Per User : <br />
                        <span class="caption-text">{GetById ? GetById.usage_limit_per_user : null}</span>
                      </span>
                      {/* <span class="caption-text">{ViewId.LimitusagetoXitems}</span> */}
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Usage Limit Per User: <br />
                        <span class="caption-text">11</span>
                      </span>
                      {/* <span class="caption-text">{ViewId.UsageLimitPerUser}</span> */}
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        is_exclude_sale_item : <br />
                        <span class="caption-text">{GetById ? GetById.is_exclude_sale_item : null}</span>
                      </span>
                      {/* <span class="caption-text">{ViewId.UsageLimitPerUser}</span> */}
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Apply MRP price : <br />
                        <span class="caption-text">{GetById ? GetById.is_apply_coupon_mrp_price : null}</span>
                      </span>
                      {/* <span class="caption-text">{ViewId.UsageLimitPerUser}</span> */}
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text" style={{ fontWeight: "bold" }}>
                        Auto Coupon : <br />
                        <span class="caption-text">
                          {GetById ? (GetById.auto_coupon === 1 ? "true" : "false") : null}
                        </span>
                      </span>
                      {/* <span class="caption-text">{ViewId.UsageLimitPerUser}</span> */}
                    </div>

                    <div className="col-md-12 text-right">
                      <Button color="light" size="lg" className="btn-mw" onClick={toggleModalview}>
                        Cancel
                      </Button>
                    </div>
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
export default Coupon;
