import React, { useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Button, FormGroup, Modal, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link,
} from "suneditor/src/plugins";

import { API_URL, API_Category, token, API_Product, API_Brand } from "../../../Api";
import { Row, Col, RSelect, Icon } from "../../../components/Component";

const API_Cate_Image = `${API_URL}/Category_image`;

const MainCategoryAddEdit = () => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const [DeleteTittle, setDeleteTittle] = useState("Do you want Delete!");
  const [DeleteImageTittle, setDeleteImageTittle] = useState("Do you want Delete Photo!");
  const [Deleteicon, setDeleteicon] = useState(false);
  const location = useLocation();
  const [modalFail, setModalFail] = useState(false);
  const [modalDelFail, setModalDelFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const [TopContent, setTopContent] = useState("");
  const [bottom_content, setbottom_content] = useState("");
  const [brandValue, setbrandValue] = useState([]);
  const [IconChange, setIconChange] = useState(false);
  const [Product, setProduct] = useState("");
  const [BrandList, setBrandList] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const [ID, setID] = useState("");
  const [deleteimagesss, setdeleteimagesss] = useState(false);
  const [DEleteId, setDEleteId] = useState("");
  const [ImageChange, setImageChange] = useState(false);
  const [Deleteimagename, setDeleteimagename] = useState();
  const { errors, register, handleSubmit } = useForm();
  const [ImgmodalFail, setImgModalFail] = useState(false);
  const [imageDel, setImageDel] = useState(false);
  const [iconDel, setIconDel] = useState(false);
  const [isGetBrand, setIsGetBrand] = useState([]);
  const [upload_imagedeleteid, setupload_imagedeleteid] = useState("");
  const [UploadICondeleteid, setUploadICondeleteid] = useState("");
  const ImgtoggleModalFail = () => setImgModalFail(!ImgmodalFail);
  const [MainCategory, setMainCategory] = useState({
    category_name: "",
    category_slug: "",
    meta_name: "",
    meta_description: "",
    upload_image: "",
    category_icon: "",
    bottom_content: "",
    top_content: "",
    brandid: "",
    orderid:"",
    feature_product: "",
    status: "",
  });
  const [error, setError] = useState({
    brandValue: "",
    uploadimgValue: "",

  });
  // image onchange Event
  const [files1, setFiles1] = useState([]);

  const handleDropChange1 = (acceptedFiles) => {
    setMainCategory({ ...MainCategory, upload_image: acceptedFiles[0] });
    setImageChange(true);
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  //onchange bottom content
  const [BottomContent, setBottomContent] = useState("");
 
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
      [
        {
          background: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "script",
    "direction",
    "size",
    "list",
    "bullet",
    "indent",
    "image",
    "color",
    "background",
    "link",
  ];
  const handleChangeBottom = (event) => {
    console.log("event value",event)
    setBottomContent(event);
  };
  const handleChangeTop = (event) => {
    setTopContent(event);
  };
  const [file, setFile] = useState([]);
  const handleDropChange = (acceptedFile) => {
    setMainCategory({ ...MainCategory, category_icon: acceptedFile[0] });
    setIconChange(true);

    setFile(
      acceptedFile.map((files) =>
        Object.assign(files, {
          previews: URL.createObjectURL(files),
        })
      )
    );
  };
  const handleChangemainCate = ({ target: { name, value } }) => {
    setMainCategory({ ...MainCategory, [name]: value });
  };
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };
  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });

  useEffect(() => {
    // Getdata();
    getBrand();
    EditGetdata();
    getProduct();
  }, []);

  const Getdata = async () => {
    // if (location.state) {
    setID(location.state);
    const Result = await axios.get(`${API_Category}/${location.state}`, config);

    setMainCategory({
      ...MainCategory,
      category_name: Result.data.list.category_name,
      category_slug: Result.data.list.category_slug,
      meta_name: Result.data.list.meta_name,
      orderid: Result.data.list.orderid,
      meta_description: Result.data.list.meta_description,
      upload_image: Result.data.list.upload_image,
      category_icon: Result.data.list.category_icon,
      bottom_content: Result.data.list.bottom_content,
      top_content: Result.data.list.top_content,
      brandid: Result.data.list.brandid,
      feature_product: Result.data.list.feature_product,
    });
    setBottomContent(Result.data.list.bottom_content);
    setTopContent(Result.data.list.top_content);

    // setProduct({ value: ResultBrands.data.list[0].id, label: ResultBrands.data.list[0].name })
    // setProduct({ value: Result.data.list.Productlist_id, label: Result.data.list.ProductName })
    // setbrandValue(Result.data.list.brandid)
    // setDeleteimagename(Result.data.list.upload_image)
    // setbottom_content(Result.data.list.bottom_content)
    // if (Result.data.list.brandid) {
    //   Result.data.list.brandid.map((items) => {
    //     setbrandValue(items)
    //   })
    // }
    if (Result.data.list.feature_product) {
      // axios.get(`${ProductAPI}/${Result.data.list.feature_product}`).then((res) => {
      //   setProduct({ label: res.data.ProductName, value: res.data._id })
      // })
    }

  };
  const getBrand = async () => {
    setBrandList([]);
    const brand = await axios.get(`${API_Brand}`, config);

    if (brand.data) {
      brand.data.list.map((items) => {

        const datas = {
          value: items.id,
          label: items.name,
        };
        setBrandList((items) => [...items, datas]);
      });
    }
  };

  // const getProduct = async () => {
  //   setProductList([]);
  //   const Product = await axios.get(`${API_Product}`);
  //   if (Product.data) {
  //     Product.data.map((items) => {
  //       const datas = {
  //         value: items._id,
  //         label: items.ProductName
  //       }
  //       setProductList((items) => [...items, datas])

  //     })
  //   }
  // }
  const getProduct = async () => {
    setProductList([]);
    const productData = await axios.get(`${API_Product}`, config);
    if (productData.data) {
      productData.data.list.map((item1) => {

        const datas = {
          value: item1.Productlist_id,
          label: item1.ProductName,
        };
        setProductList((item1) => [...item1, datas]);
      });
    }
  };

  const handlechangeProduct = (event) => {
    // setProduct([]);

    setProduct(event);
  };
  // const handleChangePhoto = (e) => {
  //   AddSalesRepresentative({
  //     ...SalesRepresentative,
  //     Image: e.target.files[0]
  //   });
  // };
  const brandOnchange = async (event) => {

    setbrandValue(event);
    setIsGetBrand([]);
    event.map((item) => {
      const data = { value: item.value };
      setIsGetBrand((item) => [...item, data]);

    });
  };
  const onFormSubmit = () => {
    if (ID) {
      if (validate()) {
        Edit(ID);
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
    if (MainCategory.upload_image.length === 0) {
      alert("Please Upload a  Image");
      return false;
    } else if (MainCategory.category_icon.length === 0) {
      alert("Please Upload a category_icon");
      return false;
    } else {
      return true;
    }
  }


  const Create = () => {

    if (brandValue == "") {

      setError({
        brandValue: "This is required",
      });
    } else if (brandValue != "") {

      setError({
        brandValue: "",
      });
    }

    // if (MainCategory.upload_image == "") {

    //   setError({
    //     uploadimgValue: "This is Required",
    //   });
    // } else if (MainCategory.upload_image != "") {

    //   setError({
    //     uploadimgValue: "",
    //   });
    // }

    if (brandValue.length > 0) {
      let formData = new FormData();
      formData.append("category_name", MainCategory.category_name);
      formData.append("category_slug", MainCategory.category_slug);
      formData.append("meta_name", MainCategory.meta_name);
      formData.append("orderid", MainCategory.orderid);
      formData.append("meta_description", MainCategory.meta_description);
      formData.append("upload_image", MainCategory.upload_image);
      formData.append("category_icon", MainCategory.category_icon);
      formData.append("brandid", JSON.stringify(isGetBrand));
      formData.append("feature_product", Product.value);
      formData.append("bottom_content", BottomContent);
      formData.append("top_content", TopContent);
      const configs = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post(API_Category, formData, configs).then((res) => {
        // if(res.data.statuscode == 400){
        //   toast.error("Order_ID Already Exist!", {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   });
        // }else{
        setMainCategory({
          ...MainCategory,
          category_name: "",
          category_slug: "",
          meta_name: "",
          orderid:"",
          meta_description: "",
          upload_image: "",
          category_icon: "",
          bottom_content: "",
          top_content: "",
          brandid: "",
          feature_product: "",
        });
        setFiles1([]);
        setFile([]);
        setBottomContent("");
        setTopContent("");
        // setbrandValue([])
        setModalFail(true);
        // localStorage.removeItem('MainCategoryView');
        // window.location.href = "/dashboard/main-category-list"
      // }
      });
    }
  };
  const Edit = (ID) => {

    let formData = new FormData();
    formData.append("category_name", MainCategory.category_name);
    formData.append("category_slug", MainCategory.category_slug);
    formData.append("meta_name", MainCategory.meta_name);
    formData.append("orderid", MainCategory.orderid);
    formData.append("meta_description", MainCategory.meta_description);
    formData.append("upload_image", MainCategory.upload_image);
    formData.append("category_icon", MainCategory.category_icon);
    // formData.append("brandid", brandValue.value);
    formData.append("feature_product", Product.value);
    formData.append("bottom_content", BottomContent);
    formData.append("top_content", TopContent);
    if (brandValue) {
      brandValue.map((items) => {
        formData.append("brandid", items.value);
      });
    }
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios.put(`${API_Category}/${ID}`, formData, configs).then((res) => {
      setMainCategory({
        ...MainCategory,
        category_name: "",
        category_slug: "",
        meta_name: "",
        orderid:"",
        meta_description: "",
        upload_image: "",
        category_icon: "",
        bottom_content: "",
        top_content: "",
        brandid: "",
        feature_product: "",
      });
      setbottom_content("");
      setTopContent("");
      setBottomContent("");
      setTopContent("");
      setFiles1([]);
      setFile([]);
      setModalFail(true);
      // window.location.href = "/dashboard/main-category-list";

    });
  };

  const EditGetdata = async () => {
    if (location.state) {
      setID(location.state);
      const Result = await axios.get(`${API_Category}/${location.state}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });


      if (Result.data.list[0].feature_product != 0 && Result.data.list[0].feature_product != "") {
        var ProductList = await axios.get(`${API_Product}/${Result.data.list[0].feature_product}`, { headers: { Authorization: `Bearer ${token} ` } })
        setProduct({ value: ProductList.data.list[0].Productlist_id, label: ProductList.data.list[0].ProductName })
      }


      setMainCategory({
        ...MainCategory,
        category_name: Result.data.list[0].category_name,
        category_slug: Result.data.list[0].category_slug,
        meta_name: Result.data.list[0].meta_name,
        orderid: Result.data.list[0].orderid,
        meta_description: Result.data.list[0].meta_description,
        upload_image: Result.data.list[0].upload_image,
        category_icon: Result.data.list[0].category_icon,
        // bottom_content: Result.data.list[0].bottom_content,
        brandid: Result.data.list[0].brandid,
        // feature_product: Result.data.list[0].feature_product,
      });
      setFiles1([Result.data.list[0].upload_image]);
      setFile([Result.data.list[0].category_icon]);
      setBottomContent(Result.data.list[0].bottom_content);
      setTopContent(Result.data.list[0].top_content);
      // setProduct({ value: Result.data.list[0].feature_product, label: Result.data.list[0].ProductName })

      const validation = Result.data.list[0].brandid.every((item) => item.value && item.label);
      if (validation == true) {
        setbrandValue(Result.data.list[0].brandid);
      }

      // setisEmailType({ value: Result.data.list.AllowedEMails, label: Result.data.list.AllowedEMails })
    }
  };

  // function uploadSingleFile(e) {
  //   setFile([URL.createObjectURL(e.target.files[0])]);
  //   setMainCategory({ ...MainCategory, upload_image: e.target.files[0] });
  //   setFilesView("view")
  // }

  async function deleteFile(e, img) {
    setFile([]);
    setMainCategory({ ...MainCategory, upload_image: "" });
    setdeleteimagesss(true);
    if (ID && img) {
      const Result = await axios.put(`${API_Category}/deleteCatImg/${ID}`, { upload_image: img }, config);
    }
  }

  // Edit click
  const DeleteId = async (id) => {
    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    const Result = await axios.put(`${API_Category}/delete/${DEleteId}`, formData, config);

    if (Result.data) {
      setDeleteTittle(Result.data.msg);
      setDeleteicon(true);
      Getdata();

      const timer = setTimeout(() => {
        setModalDelFail(false);
        setDeleteTittle("Do you want Delete!");
        setDeleteicon(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
    window.location.href = "/dashboard/main-category-list";
  };
  const ImageDelete = async () => {

    let formData = new FormData();

    var delImagename = "";
    var delIconname = "";
    if (upload_imagedeleteid != "") {
      delImagename = upload_imagedeleteid;
    } else {
      delIconname = UploadICondeleteid;
    }
    formData.append("imageName", delImagename);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    if (imageDel) {
      setMainCategory({
        ...MainCategory,
        upload_image: "",
      });
      setFiles1([]);
      setImageDel(false);
      setUploadICondeleteid("");
      setImgModalFail(false);

    } else {
      setImgModalFail(false);
    }
    if (iconDel) {
      setFile([]);
      setIconDel(false);
      setUploadICondeleteid("");
      setImgModalFail(false);
    } else {
      // setFile([]);
      setImgModalFail(false);
    }
    // if (ID) {
    //   const Result = await axios.put(`${API_Category}/deleteCatImg/${ID}`, formData, config)
    //   if (Result.data) {
    //     setDeleteImageTittle(Result.data.msg)
    //     setDeleteicon(true)
    //     Getdata();
    //     if (imageDel) {
    //       setFiles1([]);
    //       setUploadICondeleteid("")
    //       setImageDel(false)

    //     }
    //     if (iconDel) {
    //       setFile([]);
    //       setUploadICondeleteid("")
    //       setIconDel(false)

    //     }
    //     const timer = setTimeout(() => {
    //       setDeleteicon(false)
    //       setImgModalFail(false);
    //       setImageChange(false);
    //       setIconChange(false);
    //     }, 1500);
    //     return () => clearTimeout(timer);
    //   }
    // } else {
    //   if (imageDel) {
    //     setFiles1([]);
    //     setImageDel(false)
    //     setUploadICondeleteid('')
    //     setImgModalFail(false);
    //   }
    //   if (iconDel) {
    //     setFile([]);
    //     setIconDel(false)
    //     setUploadICondeleteid('')
    //     setImgModalFail(false);
    //   }
    //   else {
    //     // setFile([]);
    //     setImgModalFail(false);
    //   }

    // }
  };

  const Deleteimagepopup = (id) => {
    // setMainCategory({
    //   ...MainCategory,
    //   upload_image: "",
    // });
    setupload_imagedeleteid(id);
    setImageDel(true);
    setImgModalFail(true);
  };
  const DeleteimagepopupIcon = (id) => {
    setUploadICondeleteid(id);
    setIconDel(true);
    setImgModalFail(true);
  };

  {
    /* Upload Icon */
  }
  // function uploadSingleIcon(e) {
  //   setIcon([URL.createObjectURL(e.target.files[0])]);
  //   setMainCategory({ ...MainCategory, category_icon: e.target.files[0] });
  //   setIconsView("view")
  // }

  async function deleteIcon(e, img) {
    setIcon([]);
    setMainCategory({ ...MainCategory, category_icon: "" });
    if (ID && img) {
      const Result = await axios.put(`${API_Category}/deleteCatImg/${ID}`, { category_icon: img }, config);
    }
  }

  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  return (
    <div className="p-2" style={{ marginTop: "80px" }}>
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
      <h5 className="title"> Main Category</h5>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)} style={{ background: "white", padding: "20px" }}>
          <Row className="g-3">
            <Col md="4">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  {" "}
                  Category Name*{" "}
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category Name"
                    name="category_name"
                    ref={register({ required: "This is required" })}
                    value={MainCategory.category_name}
                    onChange={handleChangemainCate}
                  />
                  {errors.category_name && <span className="invalid">{errors.category_name.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="4">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                  {" "}
                  Category Slug*{" "}
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category Slug"
                    name="category_slug"
                    ref={register({ required: "This is required" })}
                    value={MainCategory.category_slug}
                    onChange={handleChangemainCate}
                  />
                  {errors.category_slug && <span className="invalid">{errors.category_slug.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="4">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                  {" "}
                  Meta Name*{" "}
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Meta Name"
                    name="meta_name"
                    ref={register({ required: "This is required" })}
                    onChange={handleChangemainCate}
                    value={MainCategory.meta_name}
                  />
                  {errors.meta_name && <span className="invalid">{errors.meta_name.message}</span>}
                </div>
              </div>
            </Col>

            <Col size="12">
              <FormGroup>
                <label className="form-label">Meta Description</label>
                <textarea
                  name="meta_description"
                  value={MainCategory.meta_description}
                  placeholder="Enter Meta description"
                  className="form-control-xl form-control no-resize"
                  onChange={handleChangemainCate}
                />
              </FormGroup>
            </Col>
            <Col size="12">
              <FormGroup>
                <label className="form-label">Top Content </label>
                {/* <div className="text-editor" style={{ minHeight: "100px" }}> */}
                {/* <ReactQuill
                  theme="snow"
                  onChange={handleChangeTop}
                  placeholder={"Write something awesome..."}
                  modules={modules}
                  formats={formats}
                  value={TopContent}
                /> */}
                <SunEditor
                  getSunEditorInstance={getSunEditorInstance}
                  value={TopContent}
                  setContents={TopContent}
                  onChange={handleChangeTop}
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
                {/* </div> */}
                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>
            <Col size="12">
              <FormGroup>
                <label className="form-label">Bottom Content </label>
                {/* <div className="text-editor" style={{ minHeight: "100px" }}> */}


                {/* <ReactQuill
                  theme="snow"
                  onChange={handleChangeBottom}
                  placeholder={"Write something awesome..."}
                  modules={modules}
                  formats={formats}
                  value={BottomContent}
                /> */}
                {/* </div> */}
                {/* <SunEditor
                  autoFocus={true}
                  lang="en"
                  setOptions={{
                    showPathLabel: false,
                    minHeight: "30vh",
                    maxHeight: "30vh",
                    placeholder: "Enter your text here!!!",
                    plugins: [
                      align,
                      font,
                      fontColor,
                      fontSize,
                      formatBlock,
                      hiliteColor,
                      horizontalRule,
                      lineHeight,
                      list,
                      paragraphStyle,
                      table,
                      template,
                      textStyle,
                      image,
                      link,
                    
                    ],
                    buttonList: [
                      ["undo", "redo"],
                      ["font", "fontSize", "formatBlock"],
                      ["paragraphStyle"],
                      [
                        // "bold",
                        // "uppercase",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript"
                      ],
                      ["fontColor", "hiliteColor"],
                      ["removeFormat"],
                      "/", // Line break
                      ["outdent", "indent"],
                      ["align", "horizontalRule", "list", "lineHeight"],
                      ["table", "link", "image"]
                    ],

                    formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
                    font: [
                      "Arial",
                      "Calibri",
                      "Comic Sans",
                      "Courier",
                      "Garamond",
                      "Georgia",
                      "Impact",
                      "Lucida Console",
                      "Palatino Linotype",
                      "Segoe UI",
                      "Tahoma",
                      "Times New Roman",
                      "Trebuchet MS"
                    ],
                    toolbar: {
                      default: 'Default',
                      save: 'Save',
                      font: 'Font',
                      formats: 'Formats',
                      fontSize: 'Size',
                      bold: 'Bold',
                      underline: 'Underline',
                      italic: 'Italic',
                      strike: 'Strike',
                      subscript: 'Subscript',
                      superscript: 'Superscript',
                      removeFormat: 'Remove Format',
                      fontColor: 'Font Color',
                      hiliteColor: 'Highlight Color',
                      indent: 'Indent',
                      outdent: 'Outdent',
                      align: 'Align',
                      alignLeft: 'Align left',
                      alignRight: 'Align right',
                      alignCenter: 'Align center',
                      alignJustify: 'Align justify',
                      list: 'List',
                      orderList: 'Ordered list',
                      unorderList: 'Unordered list',
                      horizontalRule: 'Horizontal line',
                      hr_solid: 'Solid',
                      hr_dotted: 'Dotted',
                      hr_dashed: 'Dashed',
                      table: 'Table',
                      link: 'Link',
                      math: 'Math',
                      image: 'Image',
                      video: 'Video',
                      audio: 'Audio',
                      fullScreen: 'Full screen',
                      showBlocks: 'Show blocks',
                      codeView: 'Code view',
                      undo: 'Undo',
                      redo: 'Redo',
                      preview: 'Preview',
                      print: 'print',
                      tag_p: 'Paragraph',
                      tag_div: 'Normal (DIV)',
                      tag_h: 'Header',
                      tag_blockquote: 'Quote',
                      tag_pre: 'Code',
                      template: 'Template',
                      lineHeight: 'Line height',
                      paragraphStyle: 'Paragraph style',
                      textStyle: 'Text style',
                      imageGallery: 'Image gallery',
                      mention: 'Mention'
                    },

                  }}
                  // defaultValue={BottomContent}
                  value={BottomContent}
                  setContents={BottomContent}
                  onChange={handleChangeBottom}
                /> */}

                <SunEditor
                  getSunEditorInstance={getSunEditorInstance}
                  value={BottomContent}
                  setContents={BottomContent}
                  onChange={handleChangeBottom}
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

                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>
            
           
            <Col size="6">
              {console.log("BottomContent", BottomContent)}
              <label className="form-label">
                Upload Image* <span style={{ fontSize: "11px" }}>(140 × 140 px)</span>
              </label>
              <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    {/* {files1.length > 0 ? <>
                      <span onClick={Deleteimagepopup} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                    </> : null} */}
                    {files1.length > 0 &&
                      files1.map((item, index) => {
                        return (
                          <div key={item}>
                            <span
                              onClick={() => Deleteimagepopup(item)}
                              style={{ margin: "10px", position: "absolute", cursor: "pointer", fontSize: "20px" }}
                            >
                              <Icon name="trash"></Icon>
                            </span>
                          </div>
                        );
                      })}

                    <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                      <input {...getInputProps()} id="upload" />
                      {files1.length === 0 && <p>Upload Image</p>}
                      {files1.map((file, i) => (
                        <div key={i} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                          {ID ? (
                            <>
                              {ImageChange ? (
                                <div className="dz-image">
                                  <img src={file.preview} alt="preview" />
                                </div>
                              ) : (
                                <div className="dz-image">
                                  <img src={`${API_Cate_Image}/${file}`} alt="preview" />
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div>
                                <div className="dz-image">
                                  <img src={file.preview} alt="preview" />
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
              {error.uploadimgValue ? <p style={{ color: "red" }}>{error.uploadimgValue}</p> : ""}
            </Col>
            <Col size="6">
              <label className="form-label">Upload Icon*</label>
              <Dropzone onDrop={(acceptedFile) => handleDropChange(acceptedFile)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    {/* {file.length > 0 ? <>
                      <span onClick={DeleteimagepopupIcon} style={{ margin: "10px", position: "absolute", zIndex: "70000", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                    </> : null} */}
                    {file.length > 0 &&
                      file.map((item, index) => {
                        return (
                          <div key={item}>
                            <span
                              onClick={() => DeleteimagepopupIcon(item)}
                              style={{ margin: "10px", position: "absolute", cursor: "pointer", fontSize: "20px" }}
                            >
                              <Icon name="trash"></Icon>
                            </span>
                          </div>
                        );
                      })}
                    <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                      <input {...getInputProps()} id="upload"/>
                      {errors.category_name && <span className="invalid">{errors.category_name.message}</span>}
                      {file.length === 0 && <p>Upload Icon</p>}
                      {file.map((files, i) => (
                        <div key={i} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                          {ID ? (
                            <>
                              {IconChange ? (
                                <div className="dz-image">
                                  <img src={files.previews} alt="preview" />
                                </div>
                              ) : (
                                <div className="dz-image">
                                  <img src={`${API_Cate_Image}/${files}`} alt="preview" />
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div>
                                <div className="dz-image">
                                  <img src={files.previews} alt="preview" />
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
            <Col md="4">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                  {" "}
                  Top brands*{" "}
                </label>
                <div className="form-control-wrap">

                  <RSelect
                    name="brandid"
                    onChange={brandOnchange}
                    options={BrandList}
                    isMulti={true}
                    value={brandValue}
                    datasource={MainCategory.brandid}
                    fields={{ value: "value", text: "label" }}
                  />
                  {error.brandValue ? <p style={{ color: "red" }}>{error.brandValue}</p> : ""}
                  {/* {errors.brandValue && <span className="invalid">{errors.brandValue.message}</span>} */}
                </div>
              </div>
            </Col>

            <Col md="4">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                  Featured product
                </label>
                <div className="form-control-wrap">
                  {/* <RSelect
                    name="feature_product"
                    onChange={(event) => setProduct(event)}
                    options={ProductList}
                    value={ProductList}
                  /> */}
                  <RSelect
                    name="feature_product"
                    options={ProductList}
                    onChange={handlechangeProduct}
                    value={Product}
                  />
                  {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                Order Position
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Order Position"
                    name="orderid"
                    // ref={register({ required: "This is required" })}
                    value={MainCategory.orderid}
                    onChange={handleChangemainCate}
                  />
                  {/* {error.brandValue ? <p style={{ color: "red" }}>{error.brandValue}</p> : ""} */}
                  {/* {errors.brandValue && <span className="invalid">{errors.brandValue.message}</span>} */}
                </div>
              </div>
            </Col>
            {/* <Col md="4"></Col> */}

            <Col size="12" className="d-flex justify-content-end">
              <Button color="primary" type="submit">
                {" "}
                {ID ? <span>UPDATE</span> : <span>SAVE</span>}
              </Button>
            </Col>
          </Row>
        </form>

        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"></Icon>
              <h4 className="nk-modal-title">Main Category {ID ? "Updated" : "Added"} Successfully</h4>
              <div className="nk-modal-action mt-5">
                <Link to="/dashboard/main-category-list">
                  <Button color="light" size="lg" className="btn-mw mr-3">
                    Done
                  </Button>
                </Link>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* delete pop start */}
        <Modal isOpen={modalDelFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon
                className={
                  Deleteicon
                    ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"
                    : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
                }
              ></Icon>
              <h4 className="nk-modal-title">{DeleteTittle}</h4>
              <div className="nk-modal-text"></div>
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
              <Icon
                className={
                  Deleteicon
                    ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"
                    : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
                }
              ></Icon>
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
      </div>
    </div>
  );
};

export default MainCategoryAddEdit;
