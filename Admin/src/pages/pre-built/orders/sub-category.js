import React, { useEffect, useState } from "react";
// import { messageData } from "../../app/messages/MessageData";
import { Row, Col, RSelect, Icon } from "../../../components/Component";
import { Button, FormGroup } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { API_URL } from "../../../Api";
import { useHistory, useLocation } from "react-router-dom";

// const API_Key = `${API_URL}/Subcategory`;
// const API_Key_mainCate = `${API_URL}/Maincategory/list`;
// const API_MainCate = `${API_URL}/Maincategory`;
// const API_View = `${API_URL}/Subcategory_view`;

const API_Key = `${API_URL}/create-subcategory`;
const API_Key_mainCate = `${API_URL}/get-all-maincategory/name`;
const API_Edit = `${API_URL}/edit-subcategory`;
const API_View = `${API_URL}/get-a-subcategory`;
const API_Image = `${API_URL}/subcategory-images`;
const SubCategory = () => {

  const location = useLocation();
  const history = useHistory()
  const [file, setFile] = useState([]);
  const [filesview, setFilesView] = useState('');
  const [filterText, setFilterText] = useState("");
  const [TopContent, setTopContent] = useState("");
  const [BottomContent, setBottomContent] = useState("");
  const [MainCategoryName, setMainCategoryName] = useState("");
  const [MainCategoryId, setMainCategoryId] = useState("");
  const [MainCategory, setMainCategory] = useState("");
  const [MainCate, SetMainCate] = useState("");
  const [ID, setID] = useState("");
  const [deleteimage, setdeleteimage] = useState(false);
  const [SubCategory, setSubCategory] = useState({
    MainCategoryId: "",
    MainCategoryName: "",
    SubCategoryName: "",
    SubCategorySlug: "",
    MetaName: "",
    MetaDescription: "",
    TopContent: "",
    BottomContent: "",
    Topbrand: "",
    SubCategoryImages: "",
    Editable: true,
  });

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
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

  const handleChangesubCate1 = (value) => {

    setMainCategoryName({ value: value.value, label: value.label });
    // console.log("yyy", value)
  };

  const onFormSubmit = (form) => {
    if (!ID) {
      Create();
    } else {
      Edit(ID);
    }
  };


  const Create = () => {
    // console.log("sdfs", MainCategory)
    let formData = new FormData();
    formData.append("MainCategoryId", MainCategoryName.value);
    formData.append("SubCategoryName", SubCategory.SubCategoryName);
    formData.append("SubCategorySlug", SubCategory.SubCategorySlug);
    formData.append("MetaName", SubCategory.MetaName);
    formData.append("MetaDescription", SubCategory.MetaDescription);
    formData.append("TopContent", TopContent);
    formData.append("BottomContent", BottomContent);
    formData.append("SubCategoryImage", SubCategory.SubCategoryImages);
    // console.log(SubCategory.SubCategoryImages)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(API_Key, formData, config).then((res) => {
      // console.log("succesfully created");
      setSubCategory({
        ...SubCategory,
        MainCategoryId: "",
        SubCategoryName: "",
        SubCategorySlug: "",
        MetaName: "",
        MetaDescription: "",
        TopContent: "",
        BottomContent: "",
        SubCategoryImages: "",
      });
      setBottomContent("");
      setTopContent("");
    });
    window.location.href = `${process.env.PUBLIC_URL}/sub-category-list`;
  };

  const Edit = (ID) => {

    let formData = new FormData();
    formData.append("MainCategoryId", SubCategory.MainCategoryId);
    formData.append("SubCategoryName", SubCategory.SubCategoryName);
    formData.append("SubCategorySlug", SubCategory.SubCategorySlug);
    formData.append("MetaName", SubCategory.MetaName);
    formData.append("MetaDescription", SubCategory.MetaDescription);
    formData.append("TopContent", TopContent);
    formData.append("BottomContent", BottomContent);
    formData.append("SubCategoryImage", SubCategory.SubCategoryImages);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.put(`${API_Edit}/${ID}`, formData, config).then((res) => {
      setSubCategory({
        ...SubCategory,
        MainCategoryId: "",
        SubCategoryName: "",
        SubCategorySlug: "",
        MetaName: "",
        MetaDescription: "",
        TopContent: "",
        BottomContent: "",
        SubCategoryImages: "",
      });
      setBottomContent("");
      setTopContent("");
      window.location.href = `${process.env.PUBLIC_URL}/sub-category-list`;
    });

  }

  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: "",
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

  const handleChange = (value) => {
    setState({ value });
  };

  const handleChangeshort = (value) => {
    setStateshort({ value });
  };

  useEffect(() => {
    Getdata();
    GetMainCate();
  }, []);


  const Getdata = async () => {
    if (location.state) {

      setID(location.state);
      const Result = await axios.get(`${API_View}/${location.state}`);
      // console.log("main", Result)
      setSubCategory({
        ...SubCategory,
        MainCategoryId: Result.data.MainCategoryId,
        MainCategoryName: Result.data.MainCategoryName,
        SubCategoryName: Result.data.SubCategoryName,
        SubCategorySlug: Result.data.SubCategorySlug,
        MetaName: Result.data.MetaName,
        MetaDescription: Result.data.MetaDescription,
        SubCategoryImages: Result.data.SubCategoryImage,
        TopContent: Result.data.TopContent,
        BottomContent: Result.data.BottomContent,
        
        Editable: true,
      });
   
      setFile([ Result.data.SubCategoryImage ])
      setTopContent(Result.data.TopContent)
      setBottomContent(Result.data.BottomContent)
      setMainCategoryName({ value: Result.data.MainCategoryId, label: Result.data.MainCategoryName })


      // console.log("asdas",file)



    }
  };

  

  const GetMainCate = async () => {


    const Results = await axios.get(`${API_Key_mainCate}`)
    
    Results.data.map(itemsMain => {
      const datss = {
        value: itemsMain._id,
        label: itemsMain.CategoryName
      }
      SetMainCate((items) => [...items, datss]);

    })

    // console.log(MainCate)
  }

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

  const handleDropChange1 = (acceptedFiles) => {
    setSubCategory({ ...SubCategory, SubCategoryImages: acceptedFiles[0] });
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const deleteImage = () => {
    setFiles1([])
    setSubCategory({
      ...SubCategory,
      SubCategoryImages: "",
    })
  }
  function uploadSingleFile(e) {
   
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
    // console.log( e.target.files[0] , "test")
    setSubCategory({ ...SubCategory, SubCategoryImages: e.target.files[0] });
    setFilesView("view")
   
  }
  function deleteFile(e) {
   
    const s = file.filter((item, index) => index !== e);
    // console.log(s)
    setSubCategory({ ...SubCategory, SubCategoryImages:""})
    // console.log("SubCategoryImages",setSubCategory.SubCategoryImages)
    setFile(s);
  }
  
  return (
    <div className="p-2" style={{ marginTop: "80px" }}>
      <h5 className="title"> Sub Category</h5>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3 sub-cat-bg">
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="MainCategory">
                  Select Main Category*
                </label>
                <div className="form-control-wrap">
                  <RSelect
                    name="MainCategoryName"
                    value={MainCategoryName}
                    options={MainCate}
                    onChange={handleChangesubCate1}
                  />
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
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
                  {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
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
                  {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
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
                  {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
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
              <label className="form-label"> Upload Images</label>
              {/*
             <Dropzone
                onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}
                name="SubCategoryImages"
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                      <input {...getInputProps()} />
                      {files1.length === 0 && <p>Drop some files here</p>}
                      {files1.map((file) => (
                        <div key={file.name} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                          <div className="dz-image">
                            {(() => {
                              if (file.image) {
                                return <img src={`${API_View}/${file.image}`} alt="preview" />
                              } else if (file.preview) {
                                return <img src={file.preview} alt="preview" />
                              }
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Button color="primary" type="button" onClick={deleteImage}>Delete Image</Button>
                    </div>
                  </section>
                )}
              </Dropzone>*/}
              
          
                <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                  
                  {file.length > 0 &&
                    file.map((item, index) => {
                      // console.log(item)
                      return (
                        <div key={item}>

                          <div style={{ margin: "20px" }} >
                            <span>
                              <Icon name="trash-empty-fill" onClick={() => deleteFile(index)} />
                            </span>

                            <div>
                           
                              {ID ? 
                              <>
                             
                             {filesview ?
                                <>
                                
                               
                             <img src={item} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                             </>    :
                            <>
                            {SubCategory.SubCategoryImages? 
                          <>
                        
                             <img src={SubCategory.SubCategoryImages  && `${API_Image}/${SubCategory.SubCategoryImages}`} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                             </>  : 
                             
                             <div className="d-flex justify-content-center align-items-center">

                          <input type="file" id="file-upload"
 
                          name="SubCategoryImages"
                          className="form-control"
                          onChange={uploadSingleFile} style={{
                          border: "none",
                          opacity: "0",
                           zindex: "-1",
                           position: "absolute",
                            width: "200px"

                           }} />
                          <label for="file-upload" style={{ padding: "30px" }}>
                            <Icon name="upload" style={{ fontSize: "25px" }} >
                              </Icon>Upload image</label>
                          </div>}
                          
                            </> 
                           
                           }
                            </>
                              :
                              <img src={item} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                              
                              }
                              
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {file.length === 0 && (<>
                    <div className="d-flex justify-content-center align-items-center">

                      <input type="file" id="file-upload"
                        disabled={file.length === 1}
                        name="SubCategoryImages"
                        className="form-control"
                        onChange={uploadSingleFile} style={{
                          border: "none",
                          opacity: "0",
                          zindex: "-1",
                          position: "absolute",
                          width: "200px"

                        }} />
                      <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                    </div></>)}

                </div>



            </Col>

            <Col size="12">
              <FormGroup>
                <label className="form-label"> Top Content </label>
                <div className="text-editor" style={{ minHeight: "100px" }}>
                  <ReactQuill
                    theme="snow"
                    onChange={handleChangeTop}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                    value={TopContent}
                  />
                </div>
                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>

            <Col size="12">
              <FormGroup>
                <label className="form-label"> Bottom Content </label>
                <div className="text-editor" style={{ minHeight: "100px" }}>
                  <ReactQuill
                    theme="snow"
                    onChange={handleChangeBottom}
                    placeholder={"Write something awesome..."}
                    modules={modules1}
                    formats={formats}
                    value={BottomContent}
                  />
                </div>
                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>

            <Col size="4">

              <Button color="primary" type="submit">
                {ID ? <span>UPDATE</span> : <span>SAVE</span>}
              </Button>

            </Col>

          </Row>
        </form>
      </div>
    </div>
  );
};

export default SubCategory;
