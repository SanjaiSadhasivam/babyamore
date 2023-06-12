import React, { useEffect, useState, useRef } from "react";
import { Button, FormGroup, Modal, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useHistory, useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Row, Col, RSelect, Icon } from "../../../components/Component";
import { API_URL, API_Category, API_SubCategory, token } from "../../../Api";

const API_Image = `${API_URL}/SubCategory_image`;

import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const SubCategoryAddEdit = () => {
  const location = useLocation();
  const [TopContent, setTopContent] = useState("");
  const [BottomContent, setBottomContent] = useState("");
  const [MainCategoryName, setMainCategoryName] = useState("");
  const [MainCategoryID, setMainCategorID] = useState("");
  const [MainCate, SetMainCate] = useState("");

  const [ID, setID] = useState("");
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const [deleteimagesss, setdeleteimagesss] = useState(false);
  const [Deleteimagename, setDeleteimagename] = useState();
  const { errors, register, handleSubmit } = useForm();
  const [SubCategory, setSubCategory] = useState({
    MainCategoryId: "",
    // MainCategoryName: "",
    SubCategoryName: "",
    SubCategorySlug: "",
    MetaName: "",
    MetaDescription: "",
    TopContent: "",
    BottomContent: "",
    UploadImage: "",
    Editable: true,
  });

  useEffect(() => {
    // Getdata();
    GetMainCate();
    EditGetdata();
  }, []);

  const Getdata = async () => {
    if (location.state) {
      setID(location.state);
      const { data } = await axios.get(`${API_SubCategory}/${location.state}`, config);
      setSubCategory({
        ...SubCategory,
        MainCategoryId: data.list.MainCategoryId,
        // MainCategoryName: data.list.MainCategoryName,
        SubCategoryName: data.list.SubCategoryName,
        SubCategorySlug: data.list.SubCategorySlug,
        MetaName: data.list.MetaName,
        MetaDescription: data.list.MetaDescription,
        UploadImage: data.list.UploadImage,
        TopContent: data.list.TopContent,
        BottomContent: data.list.BottomContent,
        Editable: true,
      });
      if (data.list.UploadImage !== "") {
        setFile([data.list.UploadImage]);
      }
      setTopContent(data.list.TopContent);
      setBottomContent(data.list.BottomContent);
      setMainCategoryName({ value: data.list.MainCategoryId, label: data.list.MainCategoryName });
    }
  };

  const GetMainCate = async () => {
    SetMainCate([]);
    const { data } = await axios.get(`${API_Category}`, config);
    const res = data.list.map((itemsMain) => {
      const datas = {
        value: itemsMain.id,
        label: itemsMain.category_name,
      };
      SetMainCate((items) => [...items, datas]);
    });
  };

  const handleChangesubCate = ({ target: { name, value } }) => {
    setSubCategory({ ...SubCategory, [name]: value });
  };

  const handleChangeTop = (value) => {
    setTopContent(value);
  };

  const handleChangeBottom = (event) => {
    setBottomContent(event);
  };

  const handleChangesubCate1 = (event) => {
    setMainCategoryName([]);
    setMainCategoryName(event);
  };

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

  const [error, setError] = useState({
    MainCategoryName: "",
  });

  const Create = () => {
    if (!MainCategoryName) {

      setError({
        MainCategoryName: "Main category required",
      });
    } else if (MainCategoryName) {

      setError({
        MainCategoryName: "",
      });
    }
    if (MainCategoryName) {
      let formData = new FormData();
      formData.append("MainCategoryId", MainCategoryName.value);
      formData.append("SubCategoryName", SubCategory.SubCategoryName);
      formData.append("SubCategorySlug", SubCategory.SubCategorySlug);
      formData.append("MetaName", SubCategory.MetaName);
      formData.append("MetaDescription", SubCategory.MetaDescription);
      formData.append("TopContent", TopContent);
      formData.append("BottomContent", BottomContent);
      formData.append("Deleteimagename", deleteimagesss ? Deleteimagename : "");
      formData.append("UploadImage", SubCategory.UploadImage);
      const configs = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      axios.post(API_SubCategory, formData, configs).then((res) => {
        setSubCategory({
          ...SubCategory,
          MainCategoryId: "",
          SubCategoryName: "",
          SubCategorySlug: "",
          MetaName: "",
          MetaDescription: "",
          TopContent: "",
          BottomContent: "",
          UploadImage: "",
        });
        setBottomContent("");
        setTopContent("");
      });
      setModalFail(true);
    }
  };

  const Edit = (ID) => {
    if (!MainCategoryName) {

      setError({
        MainCategoryName: "Main category required",
      });
    } else if (MainCategoryName) {

      setError({
        MainCategoryName: "",
      });
    }
    if (MainCategoryName) {
      let formData = new FormData();
      formData.append("MainCategoryId", MainCategoryName.value);
      formData.append("SubCategoryName", SubCategory.SubCategoryName);
      formData.append("SubCategorySlug", SubCategory.SubCategorySlug);
      formData.append("MetaName", SubCategory.MetaName);
      formData.append("MetaDescription", SubCategory.MetaDescription);
      formData.append("TopContent", TopContent);
      formData.append("BottomContent", BottomContent);
      formData.append("UploadImage", SubCategory.UploadImage);

      const configs = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      axios.put(`${API_SubCategory}/${ID}`, formData, configs).then((res) => {
        setSubCategory({
          ...SubCategory,
          MainCategoryId: "",
          SubCategoryName: "",
          SubCategorySlug: "",
          MetaName: "",
          MetaDescription: "",
          TopContent: "",
          BottomContent: "",
          UploadImage: "",
        });
        setBottomContent("");
        setTopContent("");
        setModalFail(true);
      });
    }
  };
  const EditGetdata = async () => {
    if (location.state) {
      setID(location.state);
      const Result = await axios.get(`${API_SubCategory}/${location.state}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      setSubCategory({
        ...SubCategory,
        MainCategoryId: Result.data.list[0].maincategory_id,
        SubCategoryName: Result.data.list[0].subcategory_name,
        SubCategorySlug: Result.data.list[0].subcategory_slug,
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
      setMainCategoryName({ value: Result.data.list[0].maincategory_id, label: Result.data.list[0].category_name });
    }
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

  {
    /* Upload Image */
  }
  const [file, setFile] = useState([]);
  const [filesview, setFilesView] = useState("");

  // const uploadSingleFile = (acceptedFiles) => {
  //   setSubCategory({ ...SubCategory, upload_image: acceptedFiles[0] });
  //   setFilesView(true);
  //   setFile(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // };
  function uploadSingleFile(e) {

    setFile([URL.createObjectURL(e.target.files[0])]);
    setSubCategory({ ...SubCategory, UploadImage: e.target.files[0] });
    setFilesView("view");
  }

  async function deleteFile(e, img) {
    setFile([]);
    setSubCategory({ ...SubCategory, UploadImage: "" });
    setdeleteimagesss(true);
    if (ID && img) {
      const Result = await axios.put(`${API_SubCategory}/deleteSubCatImg/${ID}`, { UploadImage: img }, config);
    }
  }
  function validate() {

    if (SubCategory.UploadImage.length === 0) {
      alert("Please Upload a file");
      // inp.focus();
      return false;
    } else {
      return true;
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
      <h5 className="title"> Sub Category</h5>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3 sub-cat-bg">
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="MainCategory">
                  {" "}
                  Select Main Category*
                </label>
                <div className="form-control-wrap">
                  <RSelect
                    name="MainCategoryName"
                    value={MainCategoryName}
                    options={MainCate}
                    onChange={handleChangesubCate1}
                  />
                  {/* {errors.Maincategory && <span className="invalid" style={{ color: "red", fontSize: "11px", opacity: "0.8" }}>This is required</span>} */}
                  {error.MainCategoryName ? <p style={{ color: "red" }}>{error.MainCategoryName}</p> : ""}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                  {" "}
                  Sub Category Name*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Sub Category Name"
                    name="SubCategoryName"
                    ref={register({ required: "This is required" })}
                    value={SubCategory.SubCategoryName}
                    onChange={handleChangesubCate}
                  />
                  {errors.SubCategoryName && <span className="invalid">{errors.SubCategoryName.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="SubCategorySlug">
                  Sub Category Slug*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Sub Category Slug"
                    name="SubCategorySlug"
                    ref={register({ required: "This is required" })}
                    value={SubCategory.SubCategorySlug}
                    onChange={handleChangesubCate}
                  />
                  {errors.SubCategorySlug && <span className="invalid">{errors.SubCategorySlug.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="MetaName">
                  Meta Name*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Meta Name"
                    name="MetaName"
                    ref={register({ required: "This is required" })}
                    value={SubCategory.MetaName}
                    onChange={handleChangesubCate}
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
                  value={SubCategory.MetaDescription}
                  placeholder="Enter Meta description"
                  onChange={handleChangesubCate}
                  className="form-control-xl form-control no-resize"
                  ref={register({
                    required: "This field is required",
                  })}
                />
                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>
            <Col size="12">
              <label className="form-label">
                {" "}
                Upload Image <span style={{ fontSize: "11px" }}>(140 × 140 px)</span>{" "}
              </label>
              <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                {file.length > 0 ? (
                  file.map((item, index) => {
                    return (
                      <div key={item}>
                        <div style={{ margin: "20px" }}>
                          <span>
                            <Icon name="trash-empty-fill" onClick={() => deleteFile(index, SubCategory.UploadImage)} />
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
                                    {SubCategory.UploadImage ? (
                                      <img
                                        src={SubCategory.UploadImage && `${API_Image}/${SubCategory.UploadImage}`}
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
                    onChange={handleChangeBottom}
                    placeholder={"Write something awesome..."}
                    modules={modules1}
                    formats={formats}
                    value={BottomContent}
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
              <h4 className="nk-modal-title"> Sub Category {ID ? "Updated" : "Added"} Successfully</h4>
              <div className="nk-modal-action mt-5">
                <Link to="/dashboard/sub-category-list">
                  {" "}
                  <Button color="light" size="lg" className="btn-mw mr-3">
                    {" "}
                    Done
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

export default SubCategoryAddEdit;
