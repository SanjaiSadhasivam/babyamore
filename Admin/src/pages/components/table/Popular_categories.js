import React, { useEffect, useState, forwardRef } from "react";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
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
  CustomDataTable,
} from "../../../components/Component";

import { messageData } from "./MessageData";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import MaterialTable from "material-table";
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
import User2 from "../../../images/avatar/c-sm.jpg";
// import User10 from "../../../images/avatar/13.png";
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
} from "reactstrap";
import axios from "axios";
import { API_URL,API_Category,API_ChildCategory, API_SubCategory,API_Popular, token } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
const API_category_Image = `${API_URL}/Banner_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Popular = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [smOption, setSmOption] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [stateID, setstateID] = useState("");
  const [status, setStatus] = useState(1);
  const [ID, setID] = useState();
  const [IconChange, setIconChange] = useState(false);
  const [MainCategoryName,setMainCategoryName] =useState("")
  const [CategoriesId,setCategoriesId] =useState("")

  const [Popular, setPopular] = useState({
    id:"",
   OrderId:"",
   popular_category_id:""
  });
  const [filesview, setFilesView] = useState("");
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [readOnlyCategory, setReadOnlyCategory] = useState(false);
  const [readOnlysubCategory, setReadOnlysubCategory] = useState(false);
  const [readOnlychildCategory, setReadOnlychildCategory] = useState(false);
  const [IsCategory, setIsCategory] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    Getdata();
    GetMainCate();
    GetSubCate();
    GetChildCate();
  }, []);
  const clearValue = () => {
    setPopular({
      ...Popular,
      popular_category_id: "",
      OrderId:"",
    });
    setCateVal("");
    setsubCateVal("");
    setchildCateVal("");
    setReadOnlyCategory(false)
    setReadOnlysubCategory(false)
    setReadOnlychildCategory(false)
  }


  const [cateVal, setCateVal] = useState('')
  const handleReadCategory = (e) => {
    setCateVal(e)
    const value = e
    if (value) {
      setReadOnlyCategory(false)
      setReadOnlysubCategory(true)
      setReadOnlychildCategory(true) 
    }
  }
  // console.log(cateVal,"ooooooooooooooooooo")

  const [subCateVal, setsubCateVal] = useState('')
  const [isSubCategory, setIssubCategory] = useState('')
  const handleReadsubCategory = (e) => {
    setsubCateVal(e)
    const value = e
    if (value) {
      setReadOnlyCategory(true)
      setReadOnlysubCategory(false)
      setReadOnlychildCategory(true)
    }
  }
  
  const [childCateVal, setchildCateVal] = useState('')
  const [ExchildCateVal, setExchildCateVal] = useState('')
  const [ischildCategory, setIschildCategory] = useState('')
  const handleReadchildCategory = (e) => {
    setchildCateVal(e)
    const value = e
    if (value) {
      setReadOnlyCategory(true)
      setReadOnlysubCategory(true)
      setReadOnlychildCategory(false)
   
    }
  }

  const [mainCate, setMainCate] = useState([])
  const [subCate, setsubCate] = useState([])
  const [childCate, setchildCate] = useState([])
  const GetMainCate = async () => {
    const { data } = await axios.get(API_Category, config)
    const Res = data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.category_name
      }
      return datss
    })
    setMainCate(Res.map((item) => item));
  }

  const GetSubCate = async () => {
    const data1 = await axios.get(API_SubCategory, config)
    const Res1 = data1.data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.subcat_id,
        label: itemsMain.subcategory_name
      }
      return datss
    })
    setsubCate(Res1);
  }

  const GetChildCate = async () => {
    const data2 = await axios.get(API_ChildCategory, config)
    const Res2 = data2.data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.childcategoryname
      }
      return datss
    })
    setchildCate(Res2);
  }

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const handleChangesss = ({ target: { name, value } }) => {
    setPopular({ ...Popular, [name]: value });
  };

  // const reversed = [...data].reverse();
  const Getdata = async () => {
    const Result = await axios.get(`${API_Popular}`, config);
     setData(Result.data.list);
  };
  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    setPopular({
      id:"",
      popular_category_id: "",
      OrderId:"",
    });
    setCateVal("");
    setsubCateVal("");
    setchildCateVal("");
    setReadOnlyCategory(false)
    setReadOnlysubCategory(false)
    setReadOnlychildCategory(false)
    setID("");
  };
  const handleopen = async (id, type) => {
    setID(id);
     setView({ add: type === "edit" ? true : false });
    const { data } = await axios.get(`${API_Popular}/${id}`, config);
    console.log(data.list,"uuuuuuuuuu");
     setPopular({
      OrderId: data.list[0].OrderId,
      popular_category_id: data.list[0].popular_category_id,
    });
    setCateVal({ value: data.list[0].popular_category_id, label: data.list[0].category_name });
    setsubCateVal({ value: data.list[0].popular_category_id, label: data.list[0].subcategory_name });
    setchildCateVal({ value: data.list[0].popular_category_id, label: data.list[0].childcategoryname });
    if( data.list[0].category_name == null &&  data.list[0].subcategory_name == null){
      setReadOnlyCategory(true)
      setReadOnlysubCategory(true)
      setReadOnlychildCategory(false)
    }
    if( data.list[0].category_name == null &&  data.list[0].childcategoryname == null){
      setReadOnlyCategory(true)
      setReadOnlysubCategory(false)
      setReadOnlychildCategory(true)
    }
    if( data.list[0].childcategoryname == null &&  data.list[0].subcategory_name == null){
      setReadOnlyCategory(false)
      setReadOnlysubCategory(true)
      setReadOnlychildCategory(true)
    }
  };
  const onFormSubmitBrand = (form) => {
    if (ID) {
        Edit(ID);
    } else {
        Create();
    }
  };

  
  const Create = () => {
    let formData = new FormData();
    formData.append('OrderId', Popular.OrderId)
     if (cateVal) {
      formData.append('popular_category_id', cateVal.value)
      formData.append('type',"main")
    } else
      if (subCateVal) {
        formData.append('popular_category_id', subCateVal.value)
        formData.append('type',"sub")
      } else
        if (childCateVal ) {
          formData.append('popular_category_id', childCateVal.value)
          formData.append('type',"child")
        }
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
    axios.post(API_Popular, formData, configs).then((res) => {
      if (res.data.statusCode == 200) {
        setPopular({
                    ...Popular,
                    id:"",
                    popular_category_id: "",
                    OrderId:"",
                  });
                  Getdata();
        toast.success("Created Successfully!! ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onFormCancel();
      }
    })
      .catch(function (error) {
        toast.error("Order_ID Already Exist!", {
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
  } catch (error) {
  }
};


//       if(res.data.statusCode == 200){
//         setPopular({
//           ...Popular,
//           id:"",
//           popular_category_id: "",
//           OrderId:"",
//         });
//         Getdata();
      
//         toast.success("Successfully Created ", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         onFormCancel();
//       }
//     });
//     .catch(function (error) {
//       toast.error("Please delete subcategory first", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
    
// } catch (error) {

// }

// };
  console.log(IsCategory,"iiooooo");
  const Edit = (ID) => {
    console.log(ID,"IIIIIIIIIIIIIIIIII");
    let formData = new FormData();
    formData.append("id", ID);
    formData.append('OrderId', Popular.OrderId)
     if (cateVal) {
      formData.append('popular_category_id', cateVal.value)
      formData.append('type',"main")
    } else
      if (subCateVal) {
        formData.append('popular_category_id', subCateVal.value)
        formData.append('type',"sub")
      } else
        if (childCateVal ) {
          formData.append('popular_category_id', childCateVal.value)
          formData.append('type',"child")
        }
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
     axios.put(`${API_Popular}/${ID}`, formData, configs).then((res) => {
      setPopular({
        ...Popular,
        id:"",
        popular_category_id: "",
        OrderId: "",
      });
    
      toast.success("Successfully Updated ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setID("");
      Getdata();
      onFormCancel();
    });

  };

  const handleClickAlertOpen = (type, id) => {
    setView({ details: type === "remove" ? true : false });
    setstateID(id);
  };

  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    const { data } = await axios.get(`${API_Popular}/${id}`, config);
    setPopular({
      ...Popular,
      BannerName: data.list[0].BannerName,
      Order: data.list[0].Order,
    
    });
  };

  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Popular}/delete/${stateID}`, { Status: 0 }, config);
    onFormCancel();
    Getdata();
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

  const [filter, setFilter] = useState(false);
  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });

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

  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const bannerTable = [
    // { field: "SNO", title: "S.NO" },
    { field: "type", title: "Category Type" },
    { field: "CateName", title: "Category Name" },
    { field: "OrderId", title: "Category Position" },
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
                  <li onClick={() => handleopen(row.id, "edit")}>
                    <DropdownItem tag="a" href="#edit">
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

                  <li onClick={() => handleClickAlertOpen("remove", row.id)}>
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
  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "banner");
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
         
          toast.error("Somethig wrong", {
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
      <Head title="POPULAR CATEGORIES" />
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
              <div>
          

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
                    <ul className="nk-block-tools g-3" style={{ justifyContent: "end", textAlign: "end" }}>
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
                          <span>Add Popular Category</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          
          <CustomDataTable icons={tableIcons} data={data} columns={bannerTable}
            title="POPULAR CATOGORIES LISTS"
            actions={[
              {
                icon: "delete",
                tooltip: "Delete All Rows",
                onClick: handleDeleteRows
              },
            ]}
          />
        </Block>

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
              <h5 className="title">{Popular.id === "" ? "Add" : "Update "} Popular Category</h5>
              <div className="mt-4">
              <form onSubmit={handleSubmit(onFormSubmitBrand)}>
                  <Row className="g-3">
                  <Col size="12">
                      <Button color="primary" style={{ float: "right" }} type="button" onClick={clearValue}>
                        <span>X</span>
                      </Button>
                    </Col>
                  <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Main Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="product_category_id"
                            options={mainCate}
                            onChange={handleReadCategory}
                            value={cateVal}
                            isDisabled={readOnlyCategory}
                            // isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Sub Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="productmain_category_id"
                            options={subCate}
                            onChange={handleReadsubCategory}
                            value={subCateVal}
                            isDisabled={readOnlysubCategory}
                            // isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Child Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="product_childcategory_id"
                            options={childCate}
                            onChange={handleReadchildCategory}
                            value={childCateVal}
                            isDisabled={readOnlychildCategory}
                            // isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="status">
                      Order
                      </label>
                      <div className="form-control-wrap">
                      <input
                          type="text"
                          className="form-control"
                          name="OrderId"
                          placeholder="Enter Order Name"
                          value={Popular.OrderId}
                          onChange={handleChangesss}
                          ref={register({ required: "This is required" })}
                          
                        />
                      </div>
                    </div>
                  </Col>
                    <Col size="12" style={{ justifyContent: "start" }}>
                      <Button color="primary" type="submit" style={{float:"right"}}>
                        <span>{Popular.id === "" ? "SAVE" : "UPDATE"}</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

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
              <h5 className="title">Popular View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Popular Name</span>
                      <span class="caption-text">{Popular.category_name}</span>
                    </div>
                   
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Order</span>
                      <span class="caption-text">{renderHTML(Popular.OrderId)}</span>
                    </div>
                  
                  </Col>
                </Row>
              </div>
            </div>
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
      </Content>
    </React.Fragment>
  );
};
export default Popular;
