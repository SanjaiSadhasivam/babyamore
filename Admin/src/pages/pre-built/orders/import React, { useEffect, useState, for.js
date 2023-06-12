import React, { useEffect, useState, forwardRef } from "react";
import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats,modulesArabic,formatsArabic } from "./EditorToolbar";
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
} from "../../../components/Component";
import { API_URL } from "../../../Api"

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
import axios from 'axios';

import {
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Badge,
  Modal,
  ModalBody,
} from "reactstrap";
import { useCookies } from 'react-cookie';

const Category = `${API_URL}/admin/category`
const API_Key = `${API_URL}/admin/productlist`;
const Category_Image = `${API_URL}/Category_image`
const API_Get_All_Brand = `${API_URL}/admin/brand`;

// const Auths = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6InNhdGhpc3NoIiwic3RhdHVzIjp0cnVlLCJpYXQiOjE2NjIzODczODh9._bYmWAIION4-u4pBvELuIFXU_yFKpEZquA023g06nds"

const Catelist = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const Auths = cookies.accesstoken
  const [isCategory, setIsCategory] = useState({
    CategoryName: "",
    CategorySlug: "",
    MetaName: "",
    MetaDescription: "",
    UploadImage: "",
    CategoryIcon: "",
    BottomContent: "",
    Topbrand: "",
    Featureproduct: "",
    createDt: "",
    modifyDt: "",
    is_active: "",
    is_delete: "",
  });
  const [ArabicCategory, setArabicCategory] = useState({
    ArCategoryName: "",
    ArCategorySlug: "",
    ArMetaName: "",
    ArMetaDescription: "",   
    ArBottomContent: "",   
   
   
  });
  const [BrandView, setBrandView] = useState('');
  const [BottomContent, setBottomContent] = useState("");
  const [BottomContentArbic, setBottomContentArbic] = useState("");
  const [DeleteTittle, setDeleteTittle] = useState("Do you want Delete!");
  const [DeleteImageTittle, setDeleteImageTittle] = useState("Do you want Delete Photo!");
  const [Deleteicon, setDeleteicon] = useState(false);
  const [ImageChange, setImageChange] = useState(false);
  const [IconChange, setIconChange] = useState(false);
  const [imageDel, setImageDel] = useState(false);
  const [iconDel, setIconDel] = useState(false);
  const [ID, setID] = useState("");
  const [DEleteId, setDEleteId] = useState('');
  const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [dataList, setdataList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [UploadImagedeleteid, setUploadImagedeleteid] = useState("");
  const [UploadICondeleteid, setUploadICondeleteid] = useState("");

  const [Review, setReview] = useState({
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });
  const [state, setState] = useState({ value: null });

  const [smOption, setSmOption] = useState(false);

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });


  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const [ImgmodalFail, setImgModalFail] = useState(false);
  const ImgtoggleModalFail = () => setImgModalFail(!ImgmodalFail);



  // UseEffect 

  useEffect(() => {
    Getdata();
    getBrand();
    getProd();
  }, []);

  const Getdata = async () => {
    const data = await axios.get(Category, { headers: { Authorization: `Bearer ${Auths} ` } })
    setdataList(data.data.list)
    // console.log("dataaaa", data);
    // if (data.data.list.Topbrand) {
    //   data.data.list.Topbrand((item) => {
    //     setTopBrands(item)
    //     console.log('loggggg', item);
    //   })
    // }
    if (data.data.list.TopBrand) {
      data.data.list.TopBrand.map((item) => {
        setTopBrands(item)
      })
    }
  }




  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setIsCategory({ ...isCategory, [name]: value });
  };


const handleChangeArbic = ({target:{name,value}})=>{
   setArabicCategory({...ArabicCategory,[name]:value});
}



  const [brandValue, setBrandValue] = useState([])
  const [DBbrand, setDBbrand] = useState([])

  const productOnchange = (e) => {

    setIsCategory({ ...isCategory, Featureproduct: { value: e.value, label: e.label } })

  };
  const topBrandOnchange = async (event) => {
    // console.log("ttt", event.value)
    setBrandValue(event);
    setDBbrand([]);
    event.map((item) => {
      const data = { value: item.value }
      setDBbrand((item) => [...item, data])
    })
  };

  const handleChangeBottom = value => {

    setBottomContent(value);
  };
  const handleChangeBottomArbic = value => {

    setBottomContentArbic(value);
  };

  

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
      border:"1px",
      position: "sticky",
      width: "auto",
     
      
    
    },
  };


  const EditTable = async (id) => {
    const Result = await axios.get(`${Category}/${id}`, { headers: { Authorization: `Bearer ${Auths} ` } })
    // console.log("rrrrr", Result.data.list);
    setID(Result.data.list._id)
    setIsCategory({
      CategoryName: Result.data.list.CategoryName,
      CategorySlug: Result.data.list.CategorySlug,
      MetaName: Result.data.list.MetaName,
      MetaDescription: Result.data.list.MetaDescription,
      UploadImage: Result.data.list.UploadImage,
      CategoryIcon: Result.data.list.CategoryIcon,
      // Topbrand: { value: (Result.data.list.Topbrand), label: (Result.data.list.Topbrand) },
      Topbrand: Result.data.list.Topbrand,
      Featureproduct: Result.data.list.Featureproduct,
    })
   
    setFiles1([Result.data.list.UploadImage])
    setFile([Result.data.list.CategoryIcon])
    setDate(Result.data.list.Dob)
    setBottomContent(Result.data.list.BottomContent);
    setView({ add: true, details: true });

  }

  // Edit click 
  const DeleteId = async (id) => {

    let formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Auths} `
      }
    };
    const Result = await axios.put(`${Category}/delete/${DEleteId}`, formData, config)


    if (Result.data) {

      setDeleteTittle(Result.data.msg)
      setDeleteicon(true)
      Getdata();
    
      const timer = setTimeout(() => {
        setModalFail(false)
        setDeleteTittle("Do you want Delete!")
        setDeleteicon(false)
      }, 1500);
      return () => clearTimeout(timer);

    }
    window.location.href = "/dashboard/main-category-list"
  }
  const ImageDelete = async () => {
    
    let formData = new FormData();
   
    var delImagename = "";
    if(UploadImagedeleteid != ""){
      delImagename = UploadImagedeleteid;
    }
    else{
      delImagename = UploadICondeleteid;
      
    }
   
    formData.append("imageName", delImagename);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Auths} `
      }
    };
    if (ID) {
      const Result = await axios.put(`${Category}/deleteCatImg/${ID}`, formData, config)
      if (Result.data) {
        setDeleteImageTittle(Result.data.msg)
        setDeleteicon(true)
        Getdata();
        if (imageDel) {
          setFiles1([]);
          setUploadICondeleteid("")
          setImageDel(false)
        }
        if (iconDel) {
          setFile([]);
          setUploadICondeleteid("")
          setIconDel(false)
           
        }
        const timer = setTimeout(() => {
          setDeleteicon(false)
          setImgModalFail(false);
          setImageChange(false);
          setIconChange(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } else {
      if (imageDel) {
        setFiles1([]);
        setImageDel(false)
        setUploadICondeleteid('')
        setImgModalFail(false);
      }
      if (iconDel) {
        setFile([]);
        setIconDel(false)
        setUploadICondeleteid('')
        setImgModalFail(false);
      }
      else {
        // setFile([]);
        setImgModalFail(false); 
      }

    }

    // window.location.href = "/dashboard/main-category-list"
  }

  const DeletepopupOpen = (id) => {
    setDEleteId(id)
    setModalFail(true)
  }
 
  const Deleteimagepopup = (id) => {
    setUploadICondeleteid("UploadImage")
    setImageDel(true)
    setImgModalFail(true)
  }
  const DeleteimagepopupIcon = (id) => {
    setUploadICondeleteid("CategoryIcon")
    setIconDel(true)
    setImgModalFail(true)
  }
  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    // resetForm();
    // window.location.href="/dashboard/product-tags"
    setIsCategory({
      ...isCategory,
      CategoryName: "",
      CategorySlug: "",
      MetaName: "",
      MetaDescription: "",
      UploadImage: "",
      CategoryIcon: "",
      Topbrand: "",
      Featureproduct: "",
      createDt: "",
      modifyDt: "",
      is_active: "",
      is_delete: "",
    })
    setBottomContent('')
    setID('')
    setImageChange(false)
    setFiles1([]);
    setFile([]);
  };

  const onFormSubmit = (event) => {
    
    // event.preventDefault();
   if (ID) {
     Edit(ID);
   } else {
     if(validate())
 {
     Create()
 }
   }
 

};


  const Create = (e) => {

    // console.log("hhh", DBbrand);
    let formData = new FormData();
    formData.append("CategoryName", isCategory.CategoryName)
    formData.append("CategorySlug", isCategory.CategorySlug)
    formData.append("MetaName", isCategory.MetaName)
    formData.append("MetaDescription", isCategory.MetaDescription)
    formData.append("Topbrand", JSON.stringify(DBbrand))
    // formData.append("Topbrand", JSON.stringify(TopBrands));

    formData.append("Featureproduct", JSON.stringify())
    formData.append("UploadImage", isCategory.UploadImage)
    formData.append("CategoryIcon", isCategory.CategoryIcon)
    formData.append("BottomContent", BottomContent)
    // formData.append("status", isCategory.status.value)
    // Arabic Content start
    formData.append("CategoryNameArabic", ArabicCategory.ArCategoryName.value)
    formData.append("CategorySlugArabic", ArabicCategory.ArCategorySlug.value)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Auths} `
      }
    };

    try {

      axios.post(Category, formData, config).then(res => {
        Getdata();
        onFormCancel();
        setIsCategory({
          CategoryName: "",
          CategorySlug: "",
          MetaName: "",
          MetaDescription: "",
          UploadImage: "",
          CategoryIcon: "",
          BottomContent: "",
          Topbrand: "",
          Featureproduct: "",
          createDt: "",
          modifyDt: "",
          is_active: "",
          is_delete: "",
        })
        setFiles1([]);
        setFile([]);
        setState({ right: false });
        window.location.href = "/dashboard/main-category-list"
        toast.success('Category Added Successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

    } catch (error) {

    }
   
  }

  const Edit = (id) => {

    let formData = new FormData();
    formData.append("CategoryName", isCategory.CategoryName)
    formData.append("CategorySlug", isCategory.CategorySlug)
    formData.append("MetaName", isCategory.MetaName)
    formData.append("MetaDescription", isCategory.MetaDescription)
    // formData.append("Topbrand", isCategory.Topbrand.value)
    // formData.append("Topbrand", JSON.stringify(TopBrands));
    formData.append("Topbrand", TopBrands.value)

    formData.append("Featureproduct", isCategory.Featureproduct)
    formData.append("UploadImage", isCategory.UploadImage)
    formData.append("CategoryIcon", isCategory.CategoryIcon)
    formData.append("BottomContent", isCategory.BottomContent)
       // Arabic Content start
       formData.append("CategoryNameArabic", ArabicCategory.ArCategoryName.value)
       formData.append("CategorySlugArabic", ArabicCategory.ArCategorySlug.value)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Auths} `
      }
    };

    try {

      axios.put(`${Category}/${id}`, formData, config).then(res => {
        Getdata();
        onFormCancel();
        setIsCategory({
          CategoryName: "",
          CategorySlug: "",
          MetaName: "",
          MetaDescription: "",
          UploadImage: "",
          CategoryIcon: "",
          BottomContent: "",
          Topbrand: "",
          Featureproduct: "",
          createDt: "",
          modifyDt: "",
          is_active: "",
          is_delete: "",
        })
        window.location.href = "/dashboard/main-category-list"
        setFiles1([]);
        setFile([]);
        setState({ right: false });

        toast.success('Category Updated Successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

    } catch (error) {

    }

  }


  // image onchange Event
  const [files1, setFiles1] = useState([]);

  const handleDropChange1 = (acceptedFiles) => {
    setIsCategory({ ...isCategory, UploadImage: acceptedFiles[0] })
    setImageChange(true)

    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };



  // icon onchange Event

  const [file, setFile] = useState([]);
  const handleDropChange = (acceptedFile) => {
    setIsCategory({ ...isCategory, CategoryIcon: acceptedFile[0] })
    setIconChange(true)

    setFile(
      acceptedFile.map((files) =>
        Object.assign(files, {
          previews: URL.createObjectURL(files),
        })
      )
    );
  };

  // top brands Onchange 
  const [BrandList, setBrandList] = useState([]);
  const [TopBrands, setTopBrands] = useState([]);
  const [ProdList, setProdList] = useState([]);

  const getBrand = async () => {
    setBrandList([]);
    const brand = await axios.get(`${API_Get_All_Brand}`, { headers: { Authorization: `Bearer ${Auths} ` } });
    if (brand.data) {
      brand.data.list.map((items) => {
        // console.log("items", items);
        const datas = {
          value: items._id,
          label: items.Name
        }
        setBrandList((items) => [...items, datas])
      })
    }
  }
  const getProd = async () => {
    setProdList([]);
    const prod = await axios.get(`${API_Key}`, { headers: { Authorization: `Bearer ${Auths} ` } });
    if (prod.data) {
      prod.data.list.map((item1) => {
        // console.log("item1", item1);
        const datas = {
          value: item1._id,
          label: item1.ProductName

        }
        setProdList((item1) => [...item1, datas])
      })
    }
  }
  

  const disputesTableColumnsadd2s = [
    {
      field: "UserIcon",
      title: "Category Image",
      render: (rowData) => <img src={`${Category_Image}/${rowData.UploadImage}`} style={{ width: 30, borderRadius: "20%" }} />,
    },
    {
      field: "CategoryIcon",
      title: "Category Icon",
      render: (rowData) => <img src={`${Category_Image}/${rowData.CategoryIcon}`} style={{ width: 30, borderRadius: "20%" }} />,
    },
    { field: "CategoryName", title: "Category Name" },
    { field: "CategorySlug", title: "Category Slug" },
    { field: "MetaName", title: "Meta Name" },
    // { field: "MetaDescription", title: "Meta Description" },
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
                    <DropdownItem tag="a" href="#edit" onClick={() => EditTable(row._id)}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>

                  <li onClick={() => handleopenview("Viewdetails", row._id)}>
                    <DropdownItem tag="a" href="#view">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" href="#remove" onClick={() => DeletepopupOpen(row._id)}>
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



  const { errors, register, handleSubmit, getValues } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleopenview = async (type, id) => {
    const Getdata = async () => {
      const data = await axios.get(`${Category}/${id}`,{headers:{Authorization: `Bearer ${Auths} ` }});
      // console.log("mmm",data.data.list)
      setBrandView(data.data.list)
      
    }; 
    Getdata();
    
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
      
  };
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  
  function validate(){
    var inp = document.getElementById('upload');
    if(inp.files.length === 0){
        alert("Please Upload a file");
        inp.focus();

        return false;
    }
    else{
      return true;
    }
}
  return (
    <React.Fragment>
      <Head title="Category" />

      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-end">
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
                        <Button
                          className="toggle btn-icon d-md-none"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <Icon name="plus" className="add-icon-default"></Icon>&nbsp;
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <Icon name="plus" className="add-icon-default"></Icon>&nbsp;
                          <span>Add Category</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
        </Block>

        <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable
            icons={tableIcons}
            data={dataList}
            columns={disputesTableColumnsadd2s}
            title="CATEGORY LIST"
            options={options}
          />
        </MuiThemeProvider>

        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">

              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Category Form</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Category Name*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Category Name"
                            onChange={handleChange}
                            name="CategoryName"
                            ref={register({ required: "This is required" })}
                            value={isCategory.CategoryName}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Category Slug*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Category Slug"
                            onChange={handleChange}
                            name="CategorySlug"
                            ref={register({ required: "This is required" })}
                            value={isCategory.CategorySlug}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Meta Name*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Meta Name"
                            onChange={handleChange}
                            name="MetaName"
                            ref={register({ required: "This is required" })}
                            value={isCategory.MetaName}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* arbic start */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Arabic Category Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Category Name"
                            onChange={handleChangeArbic}
                            name="ArCategoryName"
                            // ref={register({ required: "This is required" })}
                             value={ArabicCategory.ArCategoryName}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                         Arabic Category Slug
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Category Slug"
                            onChange={handleChangeArbic}
                            name="ArCategorySlug"
                            // ref={register({ required: "This is required" })}
                            value={ArabicCategory.ArCategorySlug}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                   
                    {/* Arbic end */}
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Meta Description
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter the Meta Description"
                            onChange={handleChange}
                            name="MetaDescription"
                            // ref={register({ required: "This is required" })}
                            value={isCategory.MetaDescription}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    
                    <Col size="6">
                      <label className="form-label">Upload Icon*</label>
                      <Dropzone onDrop={(acceptedFile) => handleDropChange(acceptedFile)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            {file.length > 0 ? <>
                              {/* <span onClick={DeleteimagepopupIcon} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span> */}
                            </> : null}
                            <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} id="upload"/>
                              {file.length === 0 && <p>Upload</p>}
                              {file.map((files, i) => (
                                <div
                                  key={i}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  {ID ? <>
                                    {ImageChange ? <> <div className="dz-image"><img src={files.previews} alt="preview" /></div></> :
                                      <><div className="dz-image"><img src={`${Category_Image}/${files}`} alt="preview" /></div></>}
                                  </> : <>
                                    <div>
                                      <div className="dz-image">
                                        <img src={files.previews} alt="preview" />
                                      </div>
                                    </div>
                                  </>}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>

                    <Col size="6">
                      <label className="form-label">Upload Image*</label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            {files1.length > 0 ? <>
                              <span onClick={Deleteimagepopup} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                            </> : null}
                            <div {...getRootProps()}   className="dropzone upload-zone small my-2 dz-clickable">
                              <input {...getInputProps()} id="upload"  />
                            
                              {files1.length === 0 && <p>Upload</p>}
                              {files1.map((file,i) => (
                                <div
                                  key={i}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  {ID ? <>
                                    {ImageChange ? <> <div className="dz-image"><img src={file.preview} alt="preview" /></div></> :
                                      <><div className="dz-image"><img src={`${Category_Image}/${file}`} alt="preview" /></div></>}
                                  </> : <>

                                    <div>
                                      <div className="dz-image">
                                        <img src={file.preview} alt="preview" />
                                      </div>
                                    </div>
                                  </>}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>
                    <Col size="12">
                      <FormGroup>
                        <label className="form-label">Bottom Content</label>
                        <div className="text-editor" style={{ minHeight: "100px" }}>
                          <EditorToolbar />
                          <ReactQuill
                            value={BottomContent || ''}
                            theme="snow"
                            onChange={handleChangeBottom}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                            name="BottomContent"
                          />
                        </div>
                        {errors.BottomContent && <span className="invalid">{errors.BottomContent.message}</span>}
                      </FormGroup>
                    </Col>
                    {/* arbic bottom content start */}
                   
                    {/* arbic bottom content end */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="Topbrand">
                          Top Brand
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="Topbrand"
                            onChange={(event) => setBrandValue(event)}
                            options={BrandList}
                            isMulti={true}
                            // ref={register({ required: "This is required" })}
                            value={brandValue}
                          />
                          {errors.Topbrand && <span className="invalid">{errors.Topbrand.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="Featureproduct">
                          Feature Product
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            options={ProdList}
                            name="Featureproduct"
                            onChange={productOnchange}
                            value={isCategory.Featureproduct}
                          />
                          {errors.Featureproduct && <span className="invalid">{errors.Featureproduct.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" type="submit">
                        <span>{ID ? "UPDATE" : "SAVE"}</span>
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
              <h5 className="title">Category View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text mb-20">Category Name</span>
                      <span class="caption-text">{BrandView.CategoryName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Category Slug</span>
                      <span class="caption-text">{BrandView.CategorySlug}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Meta Description</span>
                      <span class="caption-text">{renderHTML(BrandView.MetaDescription)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Meta Name</span>
                      <span class="caption-text">{renderHTML(BrandView.MetaName)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Bottom Content</span>
                      <span class="caption-text">{renderHTML(BrandView.BottomContent)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Feature Product</span>
                      <span class="caption-text">{renderHTML(BrandView.Featureproduct)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Category Image</span>
                      <span class="caption-text">
                        <img src={`${Category_Image}/${BrandView.UploadImage}`} style={{ width: "50px", height: "50px" }}></img>
                      </span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Category Icon</span>
                      <span class="caption-text">
                        <img src={`${Category_Image}/${BrandView.CategoryIcon}`} style={{ width: "50px", height: "50px" }}></img>
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* delete pop start */}
        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className={Deleteicon ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success" : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"}></Icon>
              <h4 className="nk-modal-title">{DeleteTittle}</h4>
              <div className="nk-modal-text">
              </div>
              <div className="nk-modal-action mt-5">
                <Button color="light" size="lg" className="btn-mw m-1" onClick={DeleteId}>
                  Confirm
                </Button>
                <Button color="light" size="lg" className="btn-mw m-1" onClick={toggleModalFail}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* delete pop end */}

        {/* Image Delete popup satrt  */}
        <Modal isOpen={ImgmodalFail} toggle={ImgtoggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className={Deleteicon ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success" : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"}></Icon>
              <h4 className="nk-modal-title">{DeleteImageTittle}</h4>
              <div className="nk-modal-text">
                {/* <p className="lead">
                  Are you sure want to delete
                </p> */}
                {/* <p className="text-soft">If you need help please contact us at (855) 485-7373.</p> */}
              </div>
              <div className="nk-modal-action mt-5">
                <Button color="light" size="lg" className="btn-mw m-1" onClick={ImageDelete}>
                  Confirm
                </Button>
                <Button color="light" size="lg" className="btn-mw m-1" onClick={ImgtoggleModalFail}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* Image Delete popup end  */}

      </Content>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};
export default Catelist;                                                             