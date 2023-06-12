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
import { DisputesTableDatabanner, disputesTableColumnbanner, disputesTableColumns2s1, userData } from "./TablesData";
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
} from "reactstrap";
import axios from "axios";
import { API_URL, token, API_Home_Page_Section, API_Product } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
const API_homepagesection_image = `${API_URL}/homepagesection_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [smOption, setSmOption] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [ID, setID] = useState("");
  const [files, setFiles] = useState([]);
  const [mulImgView, setMulImgView] = useState([]);
  const [multipleimage, setMultipleImage] = useState([]);
  const [deleteID, setDEleteId] = useState("");
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const [view, setView] = useState({
    add: false,
    details: false,
  });

  // const [Img, setImg] = useState([]);
  // const [upload_imagedeleteid, setupload_imagedeleteid] = useState("");
  // const [inputFields, setInputFields] = useState([{
  //     Attribute_Value: "",
  //     Attribute_ValueImg: ""
  // }]);

  // const [inputFieldsss, setInputFieldsss] = useState([{
  //     Attribute_Value: "",
  //     Attribute_ValueImg: ""
  // }]);

  // const [inputImages, setinputImages] = useState([]);
  const [filesOne, setFilesOne] = useState([]);
  const [filesTwo, setFilesTwo] = useState([]);
  const [filesThree, setFilesThree] = useState([]);
  const [filesFour, setFilesFour] = useState([]);
  const [ImageChangeOne, setImageChangeOne] = useState(false);
  const [ImageChangeTwo, setImageChangeTwo] = useState(false);
  const [ImageChangeThree, setImageChangeThree] = useState(false);
  const [ImageChangeFour, setImageChangeFour] = useState(false);
  const [HomeSection, AddHomeSection] = useState({
    id: "",
    Title: "",
    Link: "",
    BannerLink: "",
    BannerimagesOne: "",
    BannerimagesTwo: "",
    BannerimagesThree: "",
    BannerimagesFour: "",
    BannerlinkOne: "",
    BannerlinkTwo: "",
    BannerlinkThree: "",
    BannerlinkFour: "",
  });

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  useEffect(() => {
    Getdata();
    GetProduct();
  }, []);

  const Getdata = async () => {
    const Result = await axios.get(`${API_Home_Page_Section}`, config);
    // console.log("homepage", Result.data.list);
    setData(Result.data.list);
  };

  const GetProduct = async () => {
    const { data } = await axios.get(`${API_Product}`, config);
    const res = data.list.map((pro) => {
      const datas = {
        value: pro.Productlist_id,
        label: pro.ProductName,
      };
      return datas
      
    });
    setProductOptions(res);
  };
  // console.log("inputFields",inputFields)
  const handleChanges = ({ target: { name, value } }) => {
    AddHomeSection({ ...HomeSection, [name]: value });
  };

  const handleopen = async (id, type) => {
    setView({ add: type === "edit" ? true : false, Viewdetails: type === "Viewdetails" ? true : false });
    const { data } = await axios.get(`${API_Home_Page_Section}/${id}`, config);
    setID(id)
    console.log("sssssssss", id);
    // setInputFields([])
    // // setinputImages([])
    // // setInputFieldsss([])
    // data.list[0].images.map((item) => {
    //     // console.log("img", item);
    //     const Datas = {
    //         Attribute_Value: item.bannerlink,
    //         Attribute_ValueImg: item.images,
    //     };
    //     // console.log("datas", Datas)
    //     setInputFields((dat) => [...dat, Datas])

    //     // setinputImages(item.images);
    //     // setInputFieldsss((dat) => [...dat, Datas])
    // })

    AddHomeSection({
      id: data.list[0].id,
      Title: data.list[0].tittle,
      Link: data.list[0].link,
      BannerLink: data.list[0].bannerlink,
      BannerimagesOne: data.list[0].bannerimagesone,
      BannerimagesTwo: data.list[0].bannerimagestwo,
      BannerimagesThree: data.list[0].bannerimagesthree,
      BannerimagesFour: data.list[0].bannerimagesfour,
      BannerlinkOne: data.list[0].bannerlinkone,
      BannerlinkTwo: data.list[0].bannerlinktwo,
      BannerlinkThree: data.list[0].bannerlinkthree,
      BannerlinkFour: data.list[0].bannerlinkfour,
    });
    if (data.list[0].product_id.length != 0) {
      data.list[0].product_id.map((items) => {
        // console.log("before", items)
        if (items.label != null || items.value != null) {
          // console.log("after", items)
          const datass = {
            label: items.label,
            value: items.value,
          };
          setProducts((itemsdata) => [...itemsdata, datass]);
        }
      });
    }
    setFilesOne([data.list[0].bannerimagesone]);
    setFilesTwo([data.list[0].bannerimagestwo]);
    setFilesThree([data.list[0].bannerimagesthree]);
    setFilesFour([data.list[0].bannerimagesfour]);
    // setProducts(data.list[0].product_id);
    // setMulImgView(data.list[0].images)
  };

  // const Deleteiconpopup = (ev, id) => {
  //     console.log("index", id);
  //     // setInputFields[index].Attribute_ValueImg = "";
  //     inputFields[id].Attribute_ValueImg = "";
  //     setupload_imagedeleteid(id);
  //     // setImageDel(true);
  //     // setImgModalFail(true)
  //     console.log("Attribute_ValueImg", inputFields)

  //     setinputImages[id]= "";
  //     setInputFieldsss[id].Attribute_ValueImg = ""
  // };

  const handleDropChangeOne = (e) => {
    // console.log("img value",e.target.files[0]);
    AddHomeSection({ ...HomeSection, BannerimagesOne: e.target.files[0] });
    setFilesOne(e.target.files[0]);
    setImageChangeOne(true);
  };
  const handleDropChangeTwo = (e) => {
    // console.log("img value",e.target.files[0]);
    AddHomeSection({ ...HomeSection, BannerimagesTwo: e.target.files[0] });
    setFilesTwo(e.target.files[0]);
    setImageChangeTwo(true);

  };
  const handleDropChangeThree = (e) => {
    // console.log("img value",e.target.files[0]);
    AddHomeSection({ ...HomeSection, BannerimagesThree: e.target.files[0] });
    setFilesThree(e.target.files[0]);
    setImageChangeThree(true);
  };
  const handleDropChangeFour = (e) => {
    // console.log("img value",e.target.files[0]);
    AddHomeSection({ ...HomeSection, BannerimagesFour: e.target.files[0] });
    setFilesFour(e.target.files[0]);
    setImageChangeFour(true);
  };

  const onFormSubmitBrand = (form) => {
    if (HomeSection.id) {
      Edit(HomeSection.id);
    } else {
      Create();
    }
  };

  const Create = () => {
    let formData = new FormData();
    formData.append("tittle", HomeSection.Title);
    formData.append("link", HomeSection.Link);
    formData.append("productid", JSON.stringify(products));
    formData.append("bannerimagesone", HomeSection.BannerimagesOne);
    formData.append("bannerimagestwo", HomeSection.BannerimagesTwo);
    formData.append("bannerimagesthree", HomeSection.BannerimagesThree);
    formData.append("bannerimagesfour", HomeSection.BannerimagesFour);
    formData.append("bannerlinkone", HomeSection.BannerlinkOne);
    formData.append("bannerlinktwo", HomeSection.BannerlinkTwo);
    formData.append("bannerlinkthree", HomeSection.BannerlinkThree);
    formData.append("bannerlinkfour", HomeSection.BannerlinkFour);
    // formData.append("bannerlink", HomeSection.BannerLink);



    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("formdata", ...formData);

    axios.post(API_Home_Page_Section, formData, configs).then((res) => {
      AddHomeSection({
        id: "",
        Title: "",
        Link: "",
        BannerLink: "",
      });
      AddHomeSection({
        id: "",
        Title: "",
        Link: "",
        BannerLink: "",
        BannerimagesOne: "",
        BannerimagesTwo: "",
        BannerimagesThree: "",
        BannerimagesFour: "",
        BannerlinkOne: "",
        BannerlinkTwo: "",
        BannerlinkThree: "",
        BannerlinkFour: "",
      });
      setFiles([]);
      setProducts([]);
      setFilesOne([]);
      setFilesTwo([]);
      setFilesThree([]);
      setImageChangeOne(false);
      setImageChangeTwo(false);
      setImageChangeThree(false);
      setImageChangeFour(false);
      toast.success("Successfully Created ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onFormCancel();
      Getdata();
    });
  };

  const Edit = (ID) => {
    console.log(ID, "IDW");
    // setID(ID)
    let formData = new FormData();
    formData.append("tittle", HomeSection.Title);
    formData.append("link", HomeSection.Link);
    formData.append("productid", JSON.stringify(products));
    formData.append("bannerimagesone", HomeSection.BannerimagesOne);
    formData.append("bannerimagestwo", HomeSection.BannerimagesTwo);
    formData.append("bannerimagesthree", HomeSection.BannerimagesThree);
    formData.append("bannerimagesfour", HomeSection.BannerimagesFour);
    formData.append("bannerlinkone", HomeSection.BannerlinkOne);
    formData.append("bannerlinktwo", HomeSection.BannerlinkTwo);
    formData.append("bannerlinkthree", HomeSection.BannerlinkThree);
    formData.append("bannerlinkfour", HomeSection.BannerlinkFour);

    // for (var i = 0; i < inputFields.length; i++) {
    //     // console.log("imagesss",inputFields[i].Attribute_ValueImg)
    //     // console.log("valuesssss",inputFields[i].Attribute_Value)

    //     formData.append("bannerlink", inputFields[i].Attribute_Value);

    //     formData.append("bannerimages", inputFields[i].Attribute_ValueImg);
    // }

    // for (i = 0; i < inputImages.length; i++) {
    //     formData.append("bannerimages", inputImages[i]);
    // }

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("formdata", ...formData);

    axios.put(`${API_Home_Page_Section}/${ID}`, formData, configs).then((res) => {
      AddHomeSection({
        id: "",
        Title: "",
        Link: "",
        BannerLink: "",
        BannerimagesOne: "",
        BannerimagesTwo: "",
        BannerimagesThree: "",
        BannerimagesFour: "",
        BannerlinkOne: "",
        BannerlinkTwo: "",
        BannerlinkThree: "",
        BannerlinkFour: "",
      });
      setFiles([]);
      setProducts([]);
      setFilesOne([]);
      setFilesTwo([]);
      setFilesThree([]);
      setFilesFour([]);
      setImageChangeOne(false);
      setImageChangeTwo(false);
      setImageChangeThree(false);
      setImageChangeFour(false);

      toast.success("Successfully Updated ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onFormCancel();
      Getdata();
    });
  };

  // function multipleimagedelete(e, item) {
  //     // console.log("itemm", e);
  //     // console.log("e", item)
  //     const s = multipleimage.filter((item, index) => index !== e);
  //     // console.log("ss", s)
  //     setMultipleImage(s);
  //     if (files && files.length) {
  //         files.map((items) => {
  //             items.splice(e, 1);
  //         })
  //     }
  // }

  // function uploadMulitpleimage(e) {
  //     // console.log("e", e);
  //     // console.log("e.target.files", e.target.files);
  //     const selectedFiles = e.target.files;
  //     const selectedFilesArray = Array.from(selectedFiles);
  //     // console.log("selectedFilesArray", selectedFilesArray);
  //     const imagesArray = selectedFilesArray.map((file) => {
  //         return URL.createObjectURL(file);
  //     });
  //     // console.log("final link", imagesArray);
  //     setMultipleImage((previousImages) => previousImages.concat(imagesArray));
  //     setFiles([...files, selectedFilesArray]);

  //     e.target.value = "";
  // };

  const DeleteOpen = (id) => {
    setDEleteId(id);
    setModalFail(true);
  };
  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Home_Page_Section}/delete/${deleteID}`, {}, config);
    setModalFail(false);
    setDEleteId("");
    Getdata();
  };

  const DeleteimagepopupOne = (id) => {
    setImageChangeOne(true);
    setFilesOne([]);
    AddHomeSection({ ...HomeSection, BannerimagesOne: null });
  };
  const DeleteimagepopupTwo = (id) => {
    setImageChangeTwo(true);
    setFilesTwo([]);
    AddHomeSection({ ...HomeSection, BannerimagesTwo: null });
  };
  const DeleteimagepopupThree = (id) => {
    setImageChangeThree(true);
    setFilesThree([]);
    AddHomeSection({ ...HomeSection, BannerimagesThree: null });
  };
  const DeleteimagepopupFour = (id) => {
    setImageChangeFour(true);
    setFilesFour([]);
    AddHomeSection({ ...HomeSection, BannerimagesFour: null });
  };

  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    AddHomeSection({
      id: "",
      Title: "",
      Link: "",
      BannerLink: "",
      BannerimagesOne: "",
      BannerimagesTwo: "",
      BannerimagesThree: "",
      BannerimagesFour: "",
      BannerlinkOne: "",
      BannerlinkTwo: "",
      BannerlinkThree: "",
      BannerlinkFour: "",
    });
    setFiles([]);
    setProducts([]);
    setFilesOne([]);
    setFilesTwo([]);
    setFilesThree([]);
    setFilesFour([]);
    setImageChangeOne(false);
    setImageChangeTwo(false);
    setImageChangeThree(false);
    setImageChangeFour(false);
    // setMultipleImage([]);
    // setMulImgView([]);
    // setImageChange(false);
    // resetForm();
  };

  // const handleAddFields = () => {
  //     // let a = {
  //     //     id: new Date().getTime().toString(),
  //     //     Attribute_Value: "",
  //     //     Attribute_ValueImg: ""
  //     // }
  //     setInputFields([...inputFields, { Attribute_Value: "", Attribute_ValueImg: "" }]);
  // };
  // console.log("inputi", inputFields);

  // const handleRemoveFields = (index) => {
  //     const values = [...inputFields];
  //     values.splice(index, 1);
  //     setInputFields(values);

  // };

  // const handlechangeAttributeValuess = (e, index) => {
  //     // const { name, value } = e.target;
  //     // const list = [...inputFields];
  //     // list[index][name] = value;
  //     // setInputFields({
  //     //     ...inputFields,
  //     //     Attribute_Value: e.target.value
  //     // });
  //     const { name, value } = e.target;
  //     const list = [...inputFields];
  //     list[index][name] = value;
  //     setInputFields(list);
  // };

  // const handlechangeAttributeImages = (e, index) => {

  //     const { name, value } = e.target;

  //     // const list = [...inputFields];
  //     // list[index][name] = URL.createObjectURL(e.target.files[0]);
  //     // setInputFields(list);
  //     // console.log("after onchange", inputFields)

  //     const values = [...inputImages];
  //     values[index] = URL.createObjectURL(e.target.files[0]);
  //     setinputImages(values);
  //     console.log("after handlechange", inputFields)
  // };

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

  const viewimg = {
    height: "100px",
    width: "100px",
  };

  const imgdelete = {
    position: "relative",
    top: "-54px",
    left: "10px",
  };

  // console.log("inputFields.Attribute_Value",inputFields. Attribute_ValueImg)

  const bannerTable = [
    { field: "tittle", title: "Title" },
    { field: "link", title: "URL" },
    // { field: "bannerlink", title: "Banner Link" },
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
                    <DropdownItem tag="a">
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => handleopen(row.id, "Viewdetails")}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>

                  <li onClick={() => DeleteOpen(row.id)}>
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
    formData.append("type", "homepage");
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
  return (
    <React.Fragment>
      <Head title="BANNERS" />
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
              <div>
                {/* <BlockTitle tag="h4"> BANNERS </BlockTitle> */}

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
                          <span>Add Home</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>

          <MuiThemeProvider theme={Tabletheme()}>
            <MaterialTable
              icons={tableIcons}
              data={data}
              columns={bannerTable}
              title="Home Page Section"
              options={options}
              actions={[
                {
                  icon: "delete",
                  tooltip: "Delete All Rows",
                  onClick: handleDeleteRows
                },
              ]}
            />
          </MuiThemeProvider>
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
              <h5 className="title">Home</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmitBrand)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="title">
                          Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="Title"
                            id="title"
                            placeholder="Enter Title"
                            value={HomeSection.Title}
                            onChange={handleChanges}
                          // ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="url">
                          URL
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="Link"
                            placeholder="Enter URL"
                            id="url"
                            value={HomeSection.Link}
                            onChange={handleChanges}
                          // ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="productcategory">
                        {" "}
                          Product (or) Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="productid"
                            options={productOptions}
                            onChange={(event) => setProducts(event)}
                            isMulti={true}
                            value={products}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="6"></Col>
                    {/* One */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Image One
                        </label>
                        <div className="form-control-wrap">
                          {HomeSection.id ? (
                            <>
                              {HomeSection.BannerimagesOne ? (
                                <>
                                  {ImageChangeOne ? (
                                    <input
                                      type="file"
                                      onChange={(e) => handleDropChangeOne(e)}
                                      className="form-control"
                                      name="BrandLogo"
                                      title="change img"

                                    />

                                  ) : (
                                    <>
                                      <img
                                        src={`${API_homepagesection_image}/${HomeSection.BannerimagesOne}`}
                                        width="106px"
                                      />
                                      {filesOne.length > 0 &&
                                        filesOne.map((item, index) => {
                                          return (
                                            <div key={item}>
                                              <span
                                                onClick={() => DeleteimagepopupOne(item)}
                                                style={{
                                                  position: "absolute",
                                                  cursor: "pointer",
                                                  fontSize: "20px",
                                                  top: "-22px",
                                                  left: "114px",
                                                }}
                                              >
                                                <Icon name="trash"></Icon>
                                              </span>
                                            </div>
                                          );
                                        })}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    onChange={(e) => handleDropChangeOne(e)}
                                    className="form-control"
                                    name="BrandLogo"
                                    title="update img"

                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                onChange={(e) => handleDropChangeOne(e)}
                                className="form-control"
                                name="BrandLogo"
                                title="add img"

                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Bannerlink One
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChanges}
                            value={HomeSection.BannerlinkOne}
                            name="BannerlinkOne"
                            placeholder="Enter URL"

                          // ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>
                    {/* Two */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Image Two
                        </label>
                        <div className="form-control-wrap">
                          {HomeSection.id ? (
                            <>
                              {HomeSection.BannerimagesTwo ? (
                                <>
                                  {ImageChangeTwo ? (
                                    <input
                                      type="file"
                                      onChange={(e) => handleDropChangeTwo(e)}
                                      className="form-control"
                                      name="BrandLogo"
                                      title="change img"

                                    />
                                  ) : (
                                    <>
                                      <img
                                        src={`${API_homepagesection_image}/${HomeSection.BannerimagesTwo}`}
                                        width="106px"
                                      />
                                      {filesTwo.length > 0 &&
                                        filesTwo.map((item, index) => {
                                          return (
                                            <div key={item}>
                                              <span
                                                onClick={() => DeleteimagepopupTwo(item)}
                                                style={{
                                                  position: "absolute",
                                                  cursor: "pointer",
                                                  fontSize: "20px",
                                                  top: "-22px",
                                                  left: "114px",
                                                }}
                                              >
                                                <Icon name="trash"></Icon>
                                              </span>
                                            </div>
                                          );
                                        })}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    onChange={(e) => handleDropChangeTwo(e)}
                                    className="form-control"
                                    name="BrandLogo"
                                    title="update img"

                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                onChange={(e) => handleDropChangeTwo(e)}
                                className="form-control"
                                name="BrandLogo"
                                title="add img"

                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Bannerlink Two
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChanges}
                            value={HomeSection.BannerlinkTwo}
                            name="BannerlinkTwo"
                            placeholder="Enter URL"

                          // ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>
                    {/* Three */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Image Three
                        </label>
                        <div className="form-control-wrap">
                          {HomeSection.id ? (
                            <>
                              {HomeSection.BannerimagesThree ? (
                                <>
                                  {ImageChangeThree ? (
                                    <input
                                      type="file"
                                      onChange={(e) => handleDropChangeThree(e)}
                                      className="form-control"
                                      name="BrandLogo"
                                      title="change img"

                                    />
                                  ) : (
                                    <>
                                      <img
                                        src={`${API_homepagesection_image}/${HomeSection.BannerimagesThree}`}
                                        width="106px"
                                      />
                                      {filesThree.length > 0 &&
                                        filesThree.map((item, index) => {
                                          return (
                                            <div key={item}>
                                              <span
                                                onClick={() => DeleteimagepopupThree(item)}
                                                style={{
                                                  position: "absolute",
                                                  cursor: "pointer",
                                                  fontSize: "20px",
                                                  top: "-22px",
                                                  left: "114px",
                                                }}
                                              >
                                                <Icon name="trash"></Icon>
                                              </span>
                                            </div>
                                          );
                                        })}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    onChange={(e) => handleDropChangeThree(e)}
                                    className="form-control"
                                    name="BrandLogo"
                                    title="update img"

                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                onChange={(e) => handleDropChangeThree(e)}
                                className="form-control"
                                name="BrandLogo"
                                title="add img"

                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Bannerlink Three
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChanges}
                            value={HomeSection.BannerlinkThree}
                            name="BannerlinkThree"
                            placeholder="Enter URL"

                          // ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Four */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Image Four
                        </label>
                        <div className="form-control-wrap">
                          {HomeSection.id ? (
                            <>
                              {HomeSection.BannerimagesFour ? (
                                <>
                                  {ImageChangeFour ? (
                                    <input
                                      type="file"
                                      onChange={(e) => handleDropChangeFour(e)}
                                      className="form-control"
                                      name="BrandLogo"
                                      title="change img"

                                    />
                                  ) : (
                                    <>
                                      <img
                                        src={`${API_homepagesection_image}/${HomeSection.BannerimagesFour}`}
                                        width="106px"
                                      />
                                      {filesFour.length > 0 &&
                                        filesFour.map((item, index) => {
                                          return (
                                            <div key={item}>
                                              <span
                                                onClick={() => DeleteimagepopupFour(item)}
                                                style={{
                                                  position: "absolute",
                                                  cursor: "pointer",
                                                  fontSize: "20px",
                                                  top: "-22px",
                                                  left: "114px",
                                                }}
                                              >
                                                <Icon name="trash"></Icon>
                                              </span>
                                            </div>
                                          );
                                        })}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    onChange={(e) => handleDropChangeFour(e)}
                                    className="form-control"
                                    name="BrandLogo"
                                    title="update img"

                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                onChange={(e) => handleDropChangeFour(e)}
                                className="form-control"
                                name="BrandLogo"
                                title="add img"

                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Bannerlink Four
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChanges}
                            value={HomeSection.BannerlinkFour}
                            name="BannerlinkFour"
                            placeholder="Enter URL"

                          // ref={register({ required: "This is required" })}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12" className="d-flex justify-content-end">
                      <Button color="primary" type="submit">
                        <span>{HomeSection.id ? "UPDATE" : "SAVE"}</span>
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
              <h5 className="title">Home</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Title</span>
                      <span class="caption-text">{HomeSection.Title}</span>
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">URL</span>
                      <span class="caption-text">{HomeSection.Link}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Product or Category</span>
                      <span class="caption-text">
                        {products.map((item) => {
                          return (
                            <>
                              {item.label + " ,"}
                              <br />
                            </>
                          );
                        })}
                      </span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}></div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Image One</span>
                      <span class="caption-text">
                        <img src={`${API_homepagesection_image}/${HomeSection.BannerimagesOne}`} width="106px" />
                      </span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Bannerlink One</span>
                      <span class="caption-text">{HomeSection.BannerlinkOne}</span>
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Image Two</span>
                      <span class="caption-text">
                        <img src={`${API_homepagesection_image}/${HomeSection.BannerimagesTwo}`} width="106px" />
                      </span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Bannerlink Two</span>
                      <span class="caption-text">{HomeSection.BannerlinkTwo}</span>
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Image Three</span>
                      <span class="caption-text">
                        <img src={`${API_homepagesection_image}/${HomeSection.BannerimagesThree}`} width="106px" />
                      </span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Bannerlink Three</span>
                      <span class="caption-text">{HomeSection.BannerlinkThree}</span>
                    </div>

                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Image Four</span>
                      <span class="caption-text">
                        <img src={`${API_homepagesection_image}/${HomeSection.BannerimagesFour}`} width="106px" />
                      </span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Bannerlink Four</span>
                      <span class="caption-text">{HomeSection.BannerlinkFour}</span>
                    </div>

                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
              <h5 className="nk-modal-title">Do you want Delete!</h5>
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
      </Content>
    </React.Fragment>
  );
};
export default Home;