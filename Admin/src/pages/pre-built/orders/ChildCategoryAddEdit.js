import React, { useEffect, useState ,useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, Modal, FormGroup, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { Row, Col, RSelect, Icon } from "../../../components/Component";
import { API_URL, API_Category, API_SubCategory, API_ChildCategory, token } from "../../../Api";
import CouponSample from "../marketing/CouponSample";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
const API_View = `${API_URL}/ChildCategory_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const ChildCategoryAddEdit = () => {
  const location = useLocation();
  const [MainCategory, setMainCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [TopContent, setTopContent] = useState("");
  const [BottomContent, setBottomContent] = useState("");
  const [MAINCATEGORY, setMAINCATEGORY] = useState([]);
  const [Subcate, setSubcate] = useState([]);
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const [ChilCategory, setChilCategory] = useState({
    ChildCategoryName: "",
    ChildCategorySlug: "",
    MetaName: "",
    MetaDescription: "",
    UploadImage: "",
  });
  const [error, setError] = useState({
    MainCategory: "",
    SubCategory:"",
  });
  const [ID, setID] = useState("");
  const { errors, register, handleSubmit } = useForm();
  const [file, setFile] = useState([]);
  const [filesview, setFilesView] = useState("");

  useEffect(() => {
    // Getdata();
    EditGetdata();
    MainCategoryGet();
  }, []);

  const MainCategoryGet = async () => {
    const { data } = await axios.get(`${API_Category}`, config);
    const res = data.list.map((cate) => {
      const datas = {
        value: cate.id,
        label: cate.category_name,
      };
      setMAINCATEGORY((items) => [...items, datas]);
    });
  };

  const Getdata = async () => {
    if (location.state) {
      setID(location.state);
      const { data } = await axios.get(`${API_ChildCategory}/${location.state}`, config);
      setChilCategory({
        ...ChilCategory,
        ChildCategoryName: data.list.ChildCategoryName,
        ChildCategorySlug: data.list.ChildCategorySlug,
        MetaName: data.list.MetaName,
        MetaDescription: data.list.MetaDescription,
        UploadImage: data.list.UploadImage,
        TopContent: data.list.TopContent,
        BottomContent: data.list.BottomContent,
      });
      if (data.list.UploadImage !== "") {
        setFile([data.list.UploadImage]);
      }
      setTopContent(data.list.TopContent);
      setBottomContent(data.list.BottomContent);
      setMainCategory({ value: data.list.MainCategoryId, label: data.list.MainCategoryName });
      setSubCategory({ value: data.list.SubCategoryId, label: data.list.SubCategoryName });
    }
  };

  const handleChangeshort = (value) => {
    setBottomContent(value);
  };

  const modules1 = {
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

  const onFormSubmit = (form) => {
    if (ID) {
      if (validate()) {
        Edit(ID);
      }
    } else {
      if (validate()) {
        Create();
      }
    }

    // if (!ID) {
    //   Create();
    // } else {
    //   Edit(ID);
    // }
  };

  function validate() {
    // var inp = document.getElementById("file-upload");
    if (ChilCategory.UploadImage.length === 0) {
      alert("Please Upload a file");
      // inp.focus();
      return false;
    } else {
      return true;
    }
  }

  const Create = () => {
    if (!MainCategory) {

      setError({
        MainCategory: "Main category required",
      });
    } 
    else if (!SubCategory) {

      setError({
        SubCategory: "Sub category required",
      });
    } 
    else if (MainCategory || SubCategory) {

      setError({
        MainCategory: "",
        SubCategory: "",
      });
    }
    if (MainCategory && SubCategory) {
      let formData = new FormData();
      formData.append("ChildCategoryName", ChilCategory.ChildCategoryName);
      formData.append("ChildCategorySlug", ChilCategory.ChildCategorySlug);
      formData.append("MetaName", ChilCategory.MetaName);
      formData.append("MetaDescription", ChilCategory.MetaDescription);
      formData.append("UploadImage", ChilCategory.UploadImage);
      formData.append("TopContent", TopContent);
      formData.append("MainCategoryId", MainCategory.value);
      formData.append("SubCategoryId", SubCategory.value);
      formData.append("BottomContent", BottomContent);

      const configs = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      axios.post(API_ChildCategory, formData, configs).then((res) => {
        setChilCategory({
          ...ChilCategory,
          ChildCategoryName: "",
          ChildCategorySlug: "",
          MetaName: "",
          MetaDescription: "",
          UploadImage: "",
        });
        setBottomContent("");
        setTopContent("");
        setMainCategory("");
        setSubCategory("");
        setModalFail(true);
      });
    }
  };

  const Edit = (ID) => {
    if (!MainCategory) {

      setError({
        MainCategory: "Main category required",
      });
    } 
    else if (!SubCategory) {

      setError({
        SubCategory: "Sub category required",
      });
    } 
    else if (MainCategory || SubCategory) {

      setError({
        MainCategory: "",
        SubCategory: "",
      });
    }
    if (MainCategory && SubCategory) {
      let formData = new FormData();
      formData.append("_id", ID);
      formData.append("ChildCategoryName", ChilCategory.ChildCategoryName);
      formData.append("ChildCategorySlug", ChilCategory.ChildCategorySlug);
      formData.append("MetaName", ChilCategory.MetaName);
      formData.append("MetaDescription", ChilCategory.MetaDescription);
      formData.append("UploadImage", ChilCategory.UploadImage);
      formData.append("TopContent", TopContent);
      formData.append("BottomContent", BottomContent);
      formData.append("MainCategoryId", MainCategory.value);
      formData.append("SubCategoryId", SubCategory.value);

      const configs = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      axios.put(`${API_ChildCategory}/${ID}`, formData, configs).then((res) => {
        setChilCategory({
          ...ChilCategory,
          ChildCategoryName: "",
          ChildCategorySlug: "",
          MetaName: "",
          MetaDescription: "",
          UploadImage: "",
        });
        setBottomContent("");
        setTopContent("");
        setMainCategory("");
        setSubCategory("");
        setModalFail(true);
      });
    }
  };

  const categoryChange = async (datas) => {
    setMainCategory(datas);
    setSubCategory("");
    const { data } = await axios.get(`${API_SubCategory}/category/${datas.value}`, config);
    const res = data.list.map((Subitem) => {
      const subdat = {
        value: Subitem.subcat_id,
        label: Subitem.subcategory_name,
      };
      return subdat;
    });

    setSubcate(res);
  };
  const EditGetdata = async () => {
    if (location.state) {
      setID(location.state);
      const Result = await axios.get(`${API_ChildCategory}/${location.state}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });

      setChilCategory({
        ...ChilCategory,
        ChildCategoryName: Result.data.list[0].childcategoryname,
        ChildCategorySlug: Result.data.list[0].childcategoryslug,
        MetaName: Result.data.list[0].meta_name,
        MetaDescription: Result.data.list[0].meta_description,
        UploadImage: Result.data.list[0].upload_image,
        TopContent: Result.data.list[0].top_content,
        BottomContent: Result.data.list[0].bottom_content,
        Editable: true,
      });
      setFile([Result.data.list[0].upload_image]);
      setBottomContent(Result.data.list[0].bottom_content);
      setTopContent(Result.data.list[0].top_content);
      setMainCategory({ value: Result.data.list[0].maincategory_id, label: Result.data.list[0].category_name });
      setSubCategory({ value: Result.data.list[0].subcategory_id, label: Result.data.list[0].subcategory_name });
    }
  };
  const subCategoryChange = (value) => {
    setSubCategory(value);
  };

  const handleChangeChildcate = ({ target: { name, value } }) => {
    setChilCategory({ ...ChilCategory, [name]: value });
  };

  const handleChangeTop = (value) => {
    setTopContent(value);
  };

  function uploadSingleFile(e) {
    setFile([URL.createObjectURL(e.target.files[0])]);
    setChilCategory({ ...ChilCategory, UploadImage: e.target.files[0] });
    setFilesView("view");

  }
  async function deleteFile(e, img) {
    setFile([]);
    setChilCategory({ ...ChilCategory, UploadImage: "" });
    if (ID && img) {
      const Result = await axios.put(`${API_ChildCategory}/deleteChildCatImg/${ID}`, { UploadImage: img }, config);
    }
  }
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  return (
    <div className="p-2" style={{ marginTop: "80px" }}>
      <h5 className="title">Child Category</h5>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3 sub-cat-bg">
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="paid">
                  {" "}
                  Select Main Category*{" "}
                </label>
                <div className="form-control-wrap">
                  <RSelect
                    name="MainCategory"
                    options={MAINCATEGORY}
                    ref={register({ required: "This is required" })}
                    onChange={categoryChange}
                    value={MainCategory}
                  />
                  {error.MainCategory ? <p style={{ color: "red" }}>{error.MainCategory}</p> : ""}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="paid">
                  {" "}
                  Select Sub Category*{" "}
                </label>
                <div className="form-control-wrap">
                  <RSelect
                    name="SubCategory"
                    options={Subcate}
                    ref={register({ required: "This is required" })}
                    onChange={subCategoryChange}
                    value={SubCategory}
                  />
                  {error.SubCategory ? <p style={{ color: "red" }}>{error.SubCategory}</p> : ""}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                  {" "}
                  Child Category Name*{" "}
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Child Category Name"
                    name="ChildCategoryName"
                    ref={register({ required: "This is required" })}
                    value={ChilCategory.ChildCategoryName}
                    onChange={handleChangeChildcate}
                  />
                  {errors.ChildCategoryName && <span className="invalid">{errors.ChildCategoryName.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                  {" "}
                  Child Category Slug*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Child Category Slug"
                    name="ChildCategorySlug"
                    ref={register({ required: "This is required" })}
                    value={ChilCategory.ChildCategorySlug}
                    onChange={handleChangeChildcate}
                  />
                  {errors.ChildCategorySlug && <span className="invalid">{errors.ChildCategorySlug.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="12">
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
                    name="MetaName"
                    ref={register({ required: "This is required" })}
                    value={ChilCategory.MetaName}
                    onChange={handleChangeChildcate}
                  />
                  {errors.MetaName && <span className="invalid">{errors.MetaName.message}</span>}
                </div>
              </div>
            </Col>

            <Col size="12">
              <FormGroup>
                <label className="form-label">Meta Description</label>
                <textarea
                  name="MetaDescription"
                  placeholder="Enter Meta description"
                  value={ChilCategory.MetaDescription}
                  onChange={handleChangeChildcate}
                  className="form-control-xl form-control no-resize"
                />
                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>

            <Col size="12">
              <label className="form-label">
                {" "}
                Upload Image <span style={{ fontSize: "11px" }}>(140 × 140 px)</span>
              </label>
              <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                {file.length > 0 ? (
                  file.map((item, index) => {
                    return (
                      <div key={item}>
                        <div style={{ margin: "20px" }}>
                          <span>
                            <Icon name="trash-empty-fill" onClick={() => deleteFile(index, ChilCategory.UploadImage)} />
                          </span>
                          <div>
                            {ID ? (
                              <>
                                {filesview ? (
                                  <img
                                    src={item}
                                    alt=""
                                    style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }}
                                  />
                                ) : (
                                  <>
                                    {ChilCategory.UploadImage ? (
                                      <img
                                        src={ChilCategory.UploadImage && `${API_View}/${ChilCategory.UploadImage}`}
                                        alt=""
                                        style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }}
                                      />
                                    ) : (
                                      <div className="d-flex justify-content-center align-items-center">
                                        <input
                                          type="file"
                                          id="file-upload"
                                          name="UploadImage"
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
                                src={item}
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
                      name="UploadImage"
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
            </Col>

            <Col size="12">
              <FormGroup>
                <label className="form-label"> Top Content </label>
                <div className="text-editor" style={{ minHeight: "100px" }}>
                  {/* <ReactQuill
                    theme="snow"
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                    value={TopContent}
                    // readOnly={true}
                    onChange={handleChangeTop}
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
                </div>
                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>

            <Col size="12">
              <FormGroup>
                <label className="form-label"> Bottom Content </label>
                <div className="text-editor" style={{ minHeight: "100px" }}>
                  {/* <ReactQuill
                    theme="snow"
                    onChange={handleChangeshort}
                    placeholder={"Write something awesome..."}
                    modules={modules1}
                    formats={formats}
                    value={BottomContent}
                  /> */}

                  <SunEditor
                    getSunEditorInstance={getSunEditorInstance}
                    value={BottomContent}
                    setContents={BottomContent}
                    onChange={handleChangeshort}
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
              <h4 className="nk-modal-title">Child Category {ID ? "Updated" : "Added"} Successfully</h4>
              <div className="nk-modal-action mt-5">
                <Link to="/dashboard/child-category-list">
                  {" "}
                  <Button color="light" size="lg" className="btn-mw mr-3">
                    Done{" "}
                  </Button>
                </Link>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default ChildCategoryAddEdit;
