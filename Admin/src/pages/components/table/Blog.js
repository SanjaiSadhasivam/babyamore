import React, { useEffect, useState, forwardRef, useRef } from "react";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import { UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import User2 from "../../../images/avatar/c-sm.jpg";
import User10 from "../../../images/avatar/13.png";
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

import { messageData } from "./MessageData";

import { BlogData, blogTable, disputesTableColumns2s1, userData } from "./TablesData";
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
  Table,
  Badge,
} from "reactstrap";
import axios from "axios";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { API_URL, token } from "../../../Api";

const API_Blog = `${API_URL}/admin/blog`;
const API_Blog_Image = `${API_URL}/Blog_image`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Blog = () => {
  const [ImageChange, setImageChange] = useState(false);
  const [data, setData] = useState(messageData);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };

  const [smOption, setSmOption] = useState(false);

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const [file, setFile] = useState([]);
  const [filesview, setFilesView] = useState("");
  const [deleteImage, setDeleteImage] = useState(false);
  const [Deleteimagename, setDeleteimagename] = useState();
  const [blog, setBlog] = useState({
    ID: "",
    blog_headLine: "",
    blog_summary: "",
    blog_image: "",
    blog_ported_date: "",
    blog_author: "",
    blog_description: "",
  });
  const [descriptionContent, setdescriptionContent] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [ID, setID] = useState("");
  const [stateID, setstateID] = useState("");
  const [DeleteId, setDeleteId] = useState("");

  //Read function start below - Get
  // console.log("descriptionContent",descriptionContent);
  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    const blogs = await axios.get(`${API_Blog}`, config);
    console.log("blogsData", blogs.data.list);
    setBlogData(blogs.data.list);
  };
  //Read function end above - Get

  //Post function start below
  const Create = async () => {
    try {
      let formData = new FormData();
      formData.append("blog_headLine", blog.blog_headLine);
      formData.append("blog_summary", blog.blog_summary);
      formData.append("blog_image", blog.blog_image);
      formData.append("blog_ported_date", blog.blog_ported_date);
      formData.append("blog_author", blog.blog_author);
      formData.append("blog_description", descriptionContent);
      //console.log("formData", ...formData);
      formData.append("Deleteimagename", deleteImage ? Deleteimagename : "");
      let Result = await axios.post(`${API_Blog}`, formData, config);
      if (Result) {
        setBlog({
          ID: "",
          blog_headLine: "",
          blog_summary: "",
          blog_ported_date: "",
          blog_author: "",
          blog_description: "",
          blog_image: "",
          Deleteimagename: "",
        });
        setFiles1([]);
        setdescriptionContent("");
        setFile([]);
        toast.success("Blog Added Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setView(false);
        getBlogData();
      }
    } catch (error) { }

    // axios.post(API_Blog, formData, config).then((res) => {
    //   setBlog({
    //     ...blog,
    //     ID: "",
    //     blog_headLine: "",
    //     blog_summary: "",
    //     blog_ported_date: "",
    //     blog_author: "",
    //     blog_description: "",
    //     blog_image: "",
    //     Deleteimagename: "",
    //   });
    //   setFiles1([]);
    //   setdescriptionContent("");
    //   setFile([]);
    //   toast.success("Successfully Created ", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   setView(false);
    //   getBlogData();
    // });
  };
  const reversed = [...blogData].reverse();
  console.log(reversed, "reversed");
  const handleChangeBlog = ({ target: { name, value } }) => {
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeDesc = (value) => {
    setdescriptionContent(value);
    // console.log(event, "input value");
  };

  // const onFormSubmit = (form) => {
  //  if (!ID) {
  //     Create();
  //   } else {
  //     Edit(ID);
  //   }
  // };

  // const onFormSubmit = (form) => {
  //   if (!ID) {
  //     Create();
  //   } else {
  //     Edit(ID);
  //   }
  // };

  // const onFormSubmit = (form) => {
  //   if (!blog.ID) {
  //     Create();
  //   } else {
  //     Edit(blog.ID);
  //   }
  // };

  const onFormSubmit = () => {
    if (blog.ID) {
      if (validate()) {
        Edit(blog.ID);
      }
    } else {
      if (validate()) {
        Create();
      }
    }
  };

  // if (!ID) {
  //   Create();
  // } else {
  //   Edit(ID);
  // }

  function validate() {
    // var inp = document.getElementById("upload");
    if (blog.blog_image.length == 0) {
      alert("Please Upload a file");
      // inp.focus();

      return false;
    } else {
      return true;
    }
  }

  const handleopen = async (type, ID) => {
    console.log("idddd", ID);
    setView({ add: type === "edit" ? true : false });
    const Results = await axios.get(`${API_Blog}/${ID}`, config);

    console.log("data", data);
    setBlog({
      ...blog,
      ID: Results.data.list[0].ID,
      blog_headLine: Results.data.list[0].blog_headLine,
      blog_summary: Results.data.list[0].blog_summary,
      blog_image: Results.data.list[0].blog_image,
      blog_ported_date: Results.data.list[0].blog_ported_date,
      blog_author: Results.data.list[0].blog_author,
      blog_description: Results.data.list[0].blog_description,
    });

    setdescriptionContent(Results.data.list[0].blog_description);
    setFile([Results.data.list[0].blog_image]);

    if (Results.data.list[0].blog_image !== "") {
      setFile([Results.data.list[0].blog_image]);
    }
    setModalFail(false);
    if (Results.data.list[0].ID) {
      setImageChange(false);
    }
  };

  const Edit = (ID) => {
    console.log("dddddd", ID);
    let formData = new FormData();
    formData.append("ID", ID);

    formData.append("blog_headLine", blog.blog_headLine);
    formData.append("blog_summary", blog.blog_summary);
    formData.append("blog_image", blog.blog_image);
    formData.append("blog_ported_date", blog.blog_ported_date);
    formData.append("blog_author", blog.blog_author);
    formData.append("blog_description", descriptionContent);
    formData.append("Deleteimagename", deleteImage ? Deleteimagename : "");
    console.log("formData", ...formData);

    axios.put(`${API_Blog}/${ID}`, formData, config).then((res) => {
      setBlog({
        ...blog,
        ID: "",
        blog_headLine: "",
        blog_summary: "",
        blog_image: "",
        blog_ported_date: "",
        blog_author: "",
        Deleteimagename: "",
        blog_description: "",
      });
      setFile([]);
      setdescriptionContent("");
      setModalFail(false);
      setFiles1([]);

      toast.success("Blog Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onFormCancel();
      getBlogData();
    });
  };

  //View function Start below
  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    const { data } = await axios.get(`${API_Blog}/${id}`, config);
    console.log("dataaa", data);
    setBlog({
      ...blog,
      blog_headLine: data.list[0].blog_headLine,
      blog_summary: data.list[0].blog_summary,
      blog_author: data.list[0].blog_author,
      blog_description: data.list[0].blog_description,
      blog_image: data.list[0].blog_image,
    });
    if (data.list[0].upload_image !== "") {
      setFile([data.list[0].upload_image]);
    }
  };

  //View function end

  //Delete Function start below.
  const deleteBlog = (ID) => {
    // console.log(ID,"blogID");

    setDeleteId(ID);
    setModalFail(true);
  };

  const DeleteBlogdata = async () => {
    if (DeleteId) {
      axios.put(`${API_Blog}/delete/${DeleteId}`, {}, config).then((res) => {
        getBlogData();
        setModalFail(false);
      });
    }
    toast.success("Blog Deleted Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //Delete Function end.

  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    check: false,
  });

  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });

  // const [views, setViews] = useState({
  //   addd: false,
  //   detailss: false,
  // });

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

  //

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

  const toggle = (type) => {
    // setBlog({
    //   ID: "",
    //   blog_headLine: "",
    //   blog_summary: "",
    //   blog_image: "",
    //   blog_ported_date: "",
    //   blog_author: "",
    //   blog_description: "",
    // });
    // setdescriptionContent("");
    // setFiles1([]);
    // setImageChange(false);
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  // const toggleOne = (type) => {
  //   setViews({
  //     addd: type === "addd" ? true : false,
  //     detailss: type === "detailss" ? true : false,
  //   });
  // };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    // resetForm();
    setImageChange(false);
    setBlog({
      ID: "",
      blog_headLine: "",
      blog_summary: "",
      blog_ported_date: "",
      blog_author: "",
      blog_description: "",
      blog_image: "",
      Deleteimagename: "",
    });
    setFiles1([]);
    setdescriptionContent();
    setFile([]);
  };

  // const onFormCancels = () => {
  //   setViews({ addd: false, detailss: false });
  //   // resetForm();
  // };

  // const onFormSubmit = (form) => { 20.12.2022
  //   const { customer, purchased, total } = form;
  //   let submittedData = {
  //     id: data.length + 1,
  //     orderId: "95981",
  //     date: getDateStructured(formData.date),
  //     status: formData.status,
  //     customer: customer,
  //     purchased: purchased,
  //     total: total,
  //     check: false,
  //   };
  //   setData([submittedData, ...data]);
  //   setView({ add: false, details: false });
  //   setViews({ addd: false, detailss: false });

  //   resetForm();
  // };
  const [files1, setFiles1] = useState([]);

  // const handleDropChange1 = (acceptedFiles) => {
  //   setFiles1(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // };

  const Deleteimagepopup = (id) => {
    setupload_imagedeleteid(id);
    setImageDel(true);
    setImgModalFail(true);
  };
  const handleDropChange1 = (acceptedFiles) => {
    setBlog({ ...blog, blog_image: acceptedFiles[0] });
    setImageChange(true);
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const resetForm = () => {
    setFormData({
      ...formData,
      id: null,
      orderId: "",
      date: new Date(),
      status: "",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };

  const EditTable = async (id, type) => {
    setView({
      add: type === "add" ? true : false,
      // details: true
    });
  };
  const { errors, register, handleSubmit } = useForm();

  // const [blog, setBlog] = useState({
  //   blog_headLine: "",
  //   blog_summary: "",
  //   blog_image: "",
  //   blog_ported_date: "",
  //   blog_author: "",
  //   blog_description: "",
  // });

  // const uploadSingleFile = (e) => {
  //   setFile([URL.createObjectURL(e.target.files[0])]);
  //   setBlog({ ...blog, blog_image: e.target.files[0] });
  //   setFilesView("view");
  // };
  const uploadSingleFile = (acceptedFiles) => {
    setBlog({ ...blog, blog_image: acceptedFiles[0] });
    setImageChange(true);
    setFile(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const deleteFile = async (img) => {
    console.log(img, "img");
    setFile([]);
    setBlog({ ...blog, blog_image: "" });
    setDeleteImage(true);
    if (ID && img) {
      // axios.put(`${API_Blog}/delete/${DeleteId}`, {}, config).then((res) =>
      const deleteResult = await axios.put(`${API_Blog_Image}/delete/${ID}`, { blog_image: img }, config);
    }
    console.log("deleteResult", deleteResult);
  };

  // async function deleteFile(e, img) {

  //   setSubCategory({ ...SubCategory, UploadImage: "" });
  //   setdeleteimagesss(true);
  //   if (ID && img) {
  //     const Result = await axios.put(`${API_SubCategory}/deleteSubCatImg/${ID}`, { UploadImage: img }, config);
  //   }
  // }
  function validate() {
    if (blog.blog_image.length === 0) {
      alert("Please Upload a file");

      return false;
    } else {
      return true;
    }
  }

  const blogTableColumnsData = [
    {
      SNO: "1",
      BlogsHeadLine: "Fashion accessories deals Up to 36% off + free shipping",
      Image: User2,
      BlogsDate: "Apr 26, 2022",
    },
    {
      SNO: "2",
      BlogsHeadLine: "Pure Burn Daipers",
      Image: User10,
      BlogsDate: "May 9, 2022",
    },
  ];

  const blogTable = [
    { field: "ID", title: "S.No" },
    { field: "blog_headLine", title: "Blog HeadLine" },
    // { field: "Image", title: "Blogs Images" },
    {
      //field: "blog_image",
      title: "Blog Image",
      render: (rowData) => (
        <>
          {rowData.blog_image ? (
            <img
              src={`${API_Blog_Image}/${rowData.blog_image}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          ) : (
            <p>No Image</p>
          )}
        </>
      ),
    },

    { field: "blog_ported_date", title: "Blog Date" },

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
                  <li onClick={() => handleopen("edit", row.ID)}>
                    <DropdownItem tag="a">
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => handleopenview("Viewdetails", row.ID)}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>

                  <li>
                    <DropdownItem tag="a" href="#remove" onClick={() => deleteBlog(row.ID)}>
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
        value: curreles.ID,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "blog");
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
          getBlogData();
        }
        else {
          console.log("login");
          toast.error("Something wrong", {
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
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  return (
    <React.Fragment>
      <Head title="Blogs" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
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
              <div className="heading-flex d-flex justify-content-end">
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
                    className="toggle-expand-content d-flex justify-content-end"
                    style={{ display: smOption ? "block" : "none" }}
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
                          <span>Add Blog</span>
                        </Button>
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
              data={blogData}
              columns={blogTable}
              // data={AttrValueColumnsData}
              title="BLOG LIST"
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
          <CustomDataTable icons={tableIcons} data={reversed} columns={blogTable}
            title="BLOG LIST"
            actions={[
              {
                icon: "delete",
                tooltip: "Delete All Rows",
                onClick: handleDeleteRows
              },
            ]}
          />
        </Block>

        {/* Delete Brand Modal */}

        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
              <h4 className="nk-modal-title">Do you want Delete!</h4>
              <div className="nk-modal-action mt-5 d-flex justify-content-around">
                <Button color="light" size="lg" className="btn-mw" onClick={DeleteBlogdata}>
                  {" "}
                  Confirm{" "}
                </Button>
                <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Add new Brand Modal */}
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
              <h5 className="title">{blog.ID === "" ? "" : "Update "} Blog</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Blog HeadLine
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="blog_headLine"
                            value={blog.blog_headLine}
                            placeholder="Enter the Blog HeadLine"
                            onChange={handleChangeBlog}
                            required
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Blog Summary
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="blog_summary"
                            value={blog.blog_summary}
                            placeholder="Enter the Summary"
                            onChange={handleChangeBlog}
                            required
                          />
                        </div>
                      </div>
                    </Col>

                    {/* <Col size="12">
                      <label className="form-label">Blog Image</label>

                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p>Blog Image</p>}
                              {files1.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                    <img src={`${API_Blog_Image}/${blog.blog_image}`} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            {files1.length > 0 ? <>
                      <span onClick={Deleteimagepopup} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                    </> : null}
                            {files1.length > 0 &&
                              files1.map((item, index) => {
                                return (
                                  <div key={item}>
                                    <span
                                      onClick={() => Deleteimagepopup(item)}
                                      style={{
                                        marginLeft: "4px",
                                        position: "absolute",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                        marginTop: "-5px",
                                      }}
                                    >
                                      <Icon name="trash"></Icon>
                                    </span>
                                  </div>
                                );
                              })}
                          </section>
                        )}
                      </Dropzone>
                    </Col> */}
                    <Col size="12">
                      <label className="form-label">Blog Image</label>
                      <Dropzone onDrop={(acceptedFile) => uploadSingleFile(acceptedFile)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            {/* {file.length > 0 ? <>
                      <span onClick={DeleteimagepopupIcon} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                    </> : null} */}
                            {file.length > 0 &&
                              file.map((item, index) => {
                                return (
                                  <div key={item}>
                                    {/* <span
                              onClick={() => DeleteimagepopupIcon(item)}
                              style={{ margin: "10px", position: "absolute", cursor: "pointer", fontSize: "20px" }}
                            >
                              <Icon name="trash"></Icon>
                            </span> */}
                                  </div>
                                );
                              })}
                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} id="upload" />
                              {file.length === 0 && <p>Upload Image</p>}
                              {file.map((files, i) => (
                                <div key={i} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                                  {blog.ID ? (
                                    <>
                                      {filesview ? (
                                        <div className="dz-image">
                                          <img src={files.preview} alt="preview" />
                                        </div>
                                      ) : (
                                        <div className="dz-image">
                                          <img src={`${API_Blog_Image}/${files}`} alt="preview" />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <div className="dz-image">
                                          <img src={files.preview} alt="preview" />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>

                    {/* <Col size="12">
                      <label className="form-label">
                        {" "}
                        Blog Image <span style={{ fontSize: "11px" }}></span>{" "}
                      </label>
                      <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                        {file.length > 0 ? (
                          file.map((item, index) => {
                            console.log("item", item);
                            return (
                              <div key={item}>
                                <div style={{ margin: "20px" }}>
                                  <span>
                                    <Icon name="trash-empty-fill" onClick={() => deleteFile(index, blog.blog_image)} />
                                  </span>
                                  <div>
                                    {ID ? (
                                      <>
                                        {filesview ? (
                                          <img
                                            src={item}
                                            alt="ddddd"
                                            style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }}
                                          />
                                        ) : (
                                          <>
                                            {blog.blog_image ? (
                                              <img
                                                src={blog.blog_image && `${API_Blog}/${blog.blog_image}`}
                                                alt=""
                                                style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }}
                                              />
                                            ) : (
                                              <div className="d-flex justify-content-center align-items-center">
                                                <input
                                                  type="file"
                                                  id="file-upload"
                                                  name="blog_image"
                                                  className="form-control"
                                                  onChange={uploadSingleFile}
                                                  style={{
                                                    border: "none",
                                                    opacity: "0",
                                                    zindex: "-1",
                                                    position: "absolute",
                                                    width: "200px",
                                                  }}
                                                />
                                                <label for="file-upload" style={{ padding: "30px" }}>
                                                  <Icon name="upload" style={{ fontSize: "25px" }}></Icon>Upload image
                                                </label>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <img
                                        src={blog.blog_image && `${API_Blog}/${blog.blog_image}`}
                                        alt=""
                                        style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="d-flex justify-content-center align-items-center">
                            <input
                              type="file"
                              id="file-upload"
                              disabled={file.length === 1}
                              name="blog_image"
                              className="form-control"
                              onChange={uploadSingleFile}
                              style={{
                                border: "none",
                                opacity: "0",
                                zindex: "-1",
                                position: "absolute",
                                width: "200px",
                              }}
                            />
                            <label for="file-upload" style={{ padding: "30px" }}>
                              <Icon name="upload" style={{ fontSize: "25px" }}></Icon>Upload image
                            </label>
                          </div>
                        )}
                      </div>
                    </Col> */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Blog Ported Date
                        </label>
                        <div className="form-control-wrap form-control-wrap__one ">
                          <input
                            // style={{ color: "#b6c6e3" }}
                            type="date"
                            className="form-control"
                            placeholder="Enter From Date"
                            name="blog_ported_date"
                            value={blog.blog_ported_date}
                            onChange={handleChangeBlog}
                            required
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Blog Author
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="blog_author"
                            value={blog.blog_author}
                            placeholder="Enter the Author Name"
                            onChange={handleChangeBlog}
                            required
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <FormGroup>
                        <label className="form-label">Blog Description </label>
                        <div className="text-editor text-editor__one" style={{ minHeight: "100px" }}>
                          {/* <EditorToolbar /> */}
                          {/* <ReactQuill
                            theme="snow"
                            onChange={handleChangeDesc}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                            value={descriptionContent}
                            required
                            name="blog_description"
                          //  style={{color:"#b6c6e3"}}
                          /> */}

                          <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            // value={descriptionContent}
                            setContents={descriptionContent}
                            onChange={handleChangeDesc}
                            // onImageUploadBefore={handleImageUploadBefore}
                            // onImageUpload={handleImageUpload}
                            placeholder={"Write something awesome..."}
                            setOptions={{
                              // minHeight: "20vh",
                              // maxHeight: "20vh",
                              buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ["paragraphStyle", "blockquote"],
                                [
                                  "bold",
                                  "underline",
                                  "italic",
                                  "strike",
                                  "subscript",
                                  "superscript",
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["outdent", "indent"],

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                ["imageGallery"], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"],

                                // ['save', 'template'],
                                // '/', Line break
                              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                            }}
                          />
                        </div>
                        {errors.description && <span className="invalid">{errors.description.message}</span>}
                      </FormGroup>
                    </Col>

                    <Col size="12" style={{ justifyContent: "center" }}>
                      <Button className="float-right" color="primary" type="submit">
                        {blog.ID === "" ? "SAVE" : "UPDATE"}
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
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
              <h5 className="title">Blog</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Blog HeadLine</span>
                      <span class="caption-text">{blog.blog_headLine}</span>
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Blog Summary</span>
                      <span class="caption-text">{blog.blog_summary}</span>
                    </div>
                    {/* <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Blog Description</span>
                      <span class="caption-text">{renderHTML(blog.blog_description)}</span>

                    </div>
                    */}

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Blog Image</span>
                      <span class="caption-text">
                        <>
                          {blog.blog_image ? (
                            <img
                              src={`${API_Blog_Image}/${blog.blog_image}`}
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                            />
                          ) : (
                            <p>No Image</p>
                          )}
                        </>
                      </span>
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Blog Author</span>
                      <span class="caption-text">{blog.blog_author}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default Blog;
