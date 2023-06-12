import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Dropzone from "react-dropzone";
import { useCookies } from "react-cookie";

import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormGroup,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  Alert,
} from "reactstrap";

import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  Icon,
  Row,
  Col,
  CustomDataTable,
} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { API_URL, API_Brand, token } from "../../../Api";

const API_Brand_Image = `${API_URL}/Brand_view`;
const API_Brand_Feature = `${API_URL}/admin/brand/featurebrandstatus`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const FeaturedBrands = () => {
  const [Brand, AddBrand] = useState({
    id: "",
    BrandName: "",
    BrandSlug: "",
    BrandMetaName: "",
    // Description: "",
    BrandLogo: "",
    TopContent: "",
    BottomContent: "",
    SeoTitle: "",
    // Description: "",
    SeoDescription: "",
    IsFeatured: "",
    isActive: "",
    // Status: 1
  });

  const [smOption, setSmOption] = useState(false);
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const [status, setStatus] = useState(1);
  const [Stateshort, setStateshort] = useState("");
  const [TopContent, setTopContent] = useState("");
  const [BottomContent, setBottomContent] = useState("");
  const [ID, setID] = useState("");
  const [stateID, setstateID] = useState("");
  const [filesview, setFilesView] = useState("");
  // const [alertmsg, setAlertmsg] = useState(true);

  {
    /*Image */
  }
  const [files1, setFiles1] = useState([]);
  const [ImageChange, setImageChange] = useState(false);
  const [upload_imagedeleteid, setupload_imagedeleteid] = useState("");
  const [imageDel, setImageDel] = useState(false);
  const [ImgmodalFail, setImgModalFail] = useState(false);
  const ImgtoggleModalFail = () => setImgModalFail(!ImgmodalFail);
  const [Deleteicon, setDeleteicon] = useState(false);
  const [DeleteImageTittle, setDeleteImageTittle] = useState("Do you want Delete Photo!");

  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });

  useEffect(() => {
    Getdata();
  }, []);

  const reversed = [...data].reverse();
  const Getdata = async () => {
    const Result = await axios.get(`${API_Brand}`, config);
    // console.log("brand get data", Result.data.list);
    let filter = Result.data.list.filter((curr) => curr.isfeatured_brand == 1);
    setData(filter);
    console.log(data, "dataaaa");
  };

  const handleChangeshort = (value) => {
    setStateshort(value);
    // console.log(value, "valuevalue");
  };

  const handleChangeTop = (value) => {
    setTopContent(value);
  };

  const handleChangeBottom = (value) => {
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

  const modules2 = {
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

  const toggle = (type) => {
    AddBrand({
      id: "",
      BrandName: "",
      BrandSlug: "",
      // Description: '',
      BrandLogo: "",
      TopContent: "",
      BottomContent: "",
      SeoTitle: "",
      SeoDescription: "",
      IsFeatured: "",
    });
    setFile("");
    setFilesView("");
    setStateshort("");
    setTopContent("");
    setBottomContent("");
    setIsChecked2(false);
    setCount(0);
    setFiles1([]);
    setImageChange(false);
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  const handleAttributeStatus = async (id, stat) => {
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    var state = stat === 1 ? 0 : 1;
    let formData = new FormData();
    formData.append("featured_brand_status", state);

    const Result = await axios.put(`${API_Brand_Feature}/${id}`, formData, configs);
    if (Result) {
      Getdata();
    }
  };

  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    setImageChange(false);
    // setFiles1([]);
  };

  const tableColumn = [
    {
      field: "brand_logo",
      title: "Logo",
      render: (rowData) => (
        <>
          {rowData.brand_logo ? (
            <img
              src={`${API_Brand_Image}/${rowData.brand_logo}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          ) : (
            <p>No Image</p>
          )}
        </>
      ),
    },
    {
      field: "name",
      title: "BrandName",
    },
    {
      field: "isfeatured_brand",
      title: "Featured",
      render: (row) => (
        <>
          {row.isfeatured_brand == 1 ? <Icon name="star-fill" style={{ color: "red", paddingLeft: "20px" }} /> : <></>}
        </>
      ),
    },
    { field: "slug", title: "Slug" },
    { field: "seo_title", title: "Seo Title" },
    {
      field: "tag_status",
      title: "Status",
      render: (row) => {
        return (
          <Button
            size="sm"
            color={row.featured_brand_status === 1 ? "success" : "primary"}
          // onClick={() => handleAttributeStatus(row, row.tag_status)}
          >
            {row.featured_brand_status === 1 ? "Active" : "InActive"}
          </Button>
        );
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
                <ul className="link-list-opt no-bdr">
                  <li>
                    <DropdownItem tag="a" onClick={() => handleAttributeStatus(row.id, row.featured_brand_status)}>
                      <span>
                        {row.featured_brand_status === 1 ? (
                          <>
                            <span
                              style={{
                                color: "red",
                                fontSize: "44px",
                                paddingRight: "20px",
                                position: "relative",
                                bottom: "4px",
                                left: "4px",
                              }}
                            >
                              .
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                color: "green",
                                fontSize: "44px",
                                paddingRight: "20px",
                                position: "relative",
                                bottom: "4px",
                                left: "4px",
                              }}
                            >
                              .
                            </span>
                          </>
                        )}
                      </span>
                      <span>{row.featured_brand_status === 1 ? "InActive" : "Active"}</span>
                    </DropdownItem>
                  </li>
                  {/* <li onClick={() => handleopen(row.id, "edit")}>
                    <DropdownItem tag="a">
                      <Icon name="edit"></Icon>
                      <span>Status</span>
                    </DropdownItem>
                  </li> */}
                  <li onClick={() => handleopenview("Viewdetails", row.id)}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  {/* <li onClick={() => handleClickAlertOpen("remove", row.id)}>
                    <DropdownItem tag="a">
                      <Icon name="trash"></Icon>
                      <span>Remove</span>
                    </DropdownItem>
                  </li> */}
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </li>
        </ul>
      ),
    },
  ];

  const handleChangesss = ({ target: { name, value } }) => {
    AddBrand({ ...Brand, [name]: value });
  };

  const handleopen = async (id, type) => {
    setView({ add: type === "edit" ? true : false });
    const { data } = await axios.get(`${API_Brand}/${id}`, config);
    AddBrand({
      id: data.list[0].id,
      isActive: data.list[0].isfeatured_brand,
    });
  };

  const onFormSubmitBrand = (form) => {
    if (!Brand.id) {
      Create();
    } else {
      Edit(Brand.id);
    }
  };

  const Create = () => {
    let formData = new FormData();
    formData.append("Name", Brand.BrandName);
    formData.append("Slug", Brand.BrandSlug);
    formData.append("BrandMetaName", Brand.BrandMetaName);
    formData.append("SeoTitle", Brand.SeoTitle);
    formData.append("TopContent", TopContent);
    formData.append("BottomContent", BottomContent);
    formData.append("BrandLogo", Brand.BrandLogo);
    // formData.append("Description", Stateshort);
    formData.append("SeoDescription", Brand.SeoDescription);
    formData.append("Isfeaturedbrand", count);

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("brand formdata", ...formData);
    if (Brand.BrandLogo == "") {
      // console.log("img is empty")
      alert("Please Upload Image*");
      // setAlertmsg(true);
    } else if (Brand.BrandLogo !== "") {
      // setAlertmsg(false);
      axios.post(API_Brand, formData, configs).then((res) => {
        AddBrand({
          ...Brand,
          id: "",
          BrandName: "",
          BrandSlug: "",
          BrandMetaName: "",
          // Description: "",
          BrandLogo: "",
          TopContent: "",
          BottomContent: "",
          SeoTitle: "",
          SeoDescription: "",
          IsFeatured: "",
        });
        setBottomContent("");
        setTopContent("");
        setStateshort("");
        setIsChecked2(false);
        setCount(0);
        setFile("");
        setFiles1([]);
        setFilesView("");
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
    }
  };
  // console.log("alertmsg", alertmsg);
  const Edit = (ID) => {
    let formData = new FormData();
    // formData.append("id", ID);
    // formData.append("Name", Brand.BrandName);
    // formData.append("Slug", Brand.BrandSlug);
    // // formData.append("Description", Stateshort);
    // formData.append("SeoTitle", Brand.SeoTitle);
    // formData.append("TopContent", TopContent);
    // formData.append("BottomContent", BottomContent);
    // formData.append("BrandLogo", Brand.BrandLogo);
    // formData.append("SeoDescription", Brand.SeoDescription);
    // formData.append("Status", status);
    formData.append("featured_brand_status", Brand.isActive);

    // formData.append("IsFeatured", isChecked2);
    // formData.append("Isfeaturedbrand", count);
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("form data", ...formData);
    if (Brand.BrandLogo === "") {
      alert("Please Upload Image*");
    } else if (Brand.BrandLogo !== "") {
      axios.put(`${API_Brand_Feature}/${ID}`, formData, configs).then((res) => {
        AddBrand({
          ...Brand,
          id: "",
          BrandName: "",
          BrandSlug: "",
          BrandMetaName: "",
          // Description: "",
          BrandLogo: "",
          TopContent: "",
          BottomContent: "",
          SeoTitle: "",
          IsFeatured: "",
          isActive: "",
        });
        setBottomContent("");
        setTopContent("");
        setStateshort("");
        setFile("");
        setFiles1([]);
        setFilesView("");
        setIsChecked2(false);
        setCount(0);

        toast.success("Successfully  Updated ", {
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
    }
  };

  const handleClickAlertOpen = (type, id) => {
    setView({ details: type === "remove" ? true : false });
    setstateID(id);
  };

  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    const { data } = await axios.get(`${API_Brand}/${id}`, config);
    AddBrand({
      ...Brand,
      BrandName: data.list[0].name,
      BrandSlug: data.list[0].slug,
      // Description: data.list[0].description,
      BrandLogo: data.list[0].brand_logo,
      TopContent: data.list[0].top_content,
      BottomContent: data.list[0].bottom_content,
      SeoTitle: data.list[0].seo_title,
      SeoDescription: data.list[0].seo_description,
    });
    setBottomContent(data.list[0].bottom_content);
    setTopContent(data.list[0].top_content);
    setStateshort(data.list[0].description);
    setFiles1([data.list[0].brand_logo]);
  };

  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Brand}/delete/${stateID}`, { Status: 0 }, config);
    onFormCancel();
    Getdata();
  };

  const { errors, register, handleSubmit } = useForm();
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  const handleOnChange2 = (event) => {
    if (event.target.checked == true) {
      setIsChecked2(event.target.checked);
      setCount(1);
    } else if (event.target.checked == false) {
      setCount(0);
      setIsChecked2(false);
    }
  };

  const featuregetdata = async (event) => {
    if (event.target.checked) {
      const { data } = await axios.get(`${API_Brand}`, config);
      // console.log("feature data", data.list);
      let dataFeature = data.list.filter((currEle) => currEle.isfeatured_brand === 1);
      setData(dataFeature);
    } else {
      Getdata();
    }
  };
  // const handleDropChange1 = (acceptedFiles) => {
  //   console.log("acceptfiles",acceptedFiles);
  //   AddBrand({ ...Brand, BrandLogo: acceptedFiles[0] });
  //   setImageChange(true)
  //   setFiles1(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // };

  const handleDropChange1 = (e) => {
    // console.log("img value",e.target.files[0]);
    AddBrand({ ...Brand, BrandLogo: e.target.files[0] });
    // setImageChange(true)
    setFiles1(e.target.files[0]);
  };

  const Deleteimagepopup = async (id) => {
    // console.log("idaaa", id);
    if (Brand.id && id) {
      const Result = await axios.put(`${API_Brand}/deleteBrandImg/${Brand.id}`, { BrandLogo: id }, config);
    }
    setImageChange(true);
    setFiles1([]);
    AddBrand({ ...Brand, BrandLogo: "" });
  };

  return (
    <React.Fragment>
      <Head title="Manufactures" />
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

              <div className="heading-flex justify-content-end">
                {/* <BlockTitle tag="h4">BRANDS</BlockTitle> */}
                {/* <div className="custom-control custom-checkbox mx-5 mb-1">
                <input
                  type="checkbox"
                  className="custom-control-input form-control"
                  onChange={featuregetdata}
                  id="customCheckaddress"
                />
                <label className="custom-control-label" htmlFor="customCheckaddress">
                  Show Featured brands only{" "}
                </label>
              </div> */}

                <div className="toggle-wrap nk-block-tools-toggle">
                  <a
                    href="#more"
                    className="btn btn-icon btn-trigger toggle-expand mr-n1"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSmOption(!smOption);
                    }}
                  >
                    {" "}
                    <Icon name="more-v"></Icon>{" "}
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
                          <Icon name="plus"></Icon>
                        </Button>
                        {/* <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <Icon name="plus"></Icon>
                          <span>Add Brand</span>
                        </Button> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
        </Block>

        <CustomDataTable data={reversed} columns={tableColumn} title="FEATURED BRANDS LIST" filter={false} />

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
              <h5 className="title">{Brand.id === "" ? "" : "Update "} Brand</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmitBrand)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Brand Name*{" "}
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="BrandName"
                            placeholder="Enter Brand Name"
                            value={Brand.BrandName}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.BrandName && <span className="invalid">{errors.BrandName.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Brand Slug*{" "}
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="BrandSlug"
                            placeholder="Enter Brand Slug"
                            value={Brand.BrandSlug}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.BrandSlug && <span className="invalid">{errors.BrandSlug.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* <Col size="12">
                    <FormGroup>
                      <label className="form-label">Brand Description </label>
                      <div className="text-editor" style={{ minHeight: "100px" }}>
                        <ReactQuill
                          theme="snow"
                          value={Stateshort}
                          onChange={handleChangeshort}
                          placeholder={"Write something awesome..."}
                          modules={modules}
                          formats={formats}
                        />
                      </div>
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col> */}

                    {/* <Col size="12">
                    <label className="form-label">Upload Image*</label>
                    <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          {files1.length > 0 &&
                            files1.map((item, index) => {
                              return (
                                <div key={item}>
                                  <span onClick={() => Deleteimagepopup(item)} style={{ margin: "10px", position: "absolute", zIndex: "0", cursor: "pointer", fontSize: "20px" }}><Icon name="trash"></Icon></span>
                                </div>
                              );
                            })}

                          <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
                            <input {...getInputProps()} id="upload" />

                            {files1.length === 0 && <p>Upload</p>}
                            {files1.map((file, i) => (

                              <div
                                key={i}
                                className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                              >
                                {Brand.id ? <>
                                  {console.log("brand id", Brand.id)}
                                  {ImageChange ? <div className="dz-image"><img src={file.preview} alt="preview" title="first" /></div> :
                                    <div className="dz-image"><img src={`${API_Brand_Image}/${file}`} alt="preview" /></div>}
                                </> : <>
                                  <div>
                                    <div className="dz-image">
                                      <img src={file.preview} alt="preview" title="second" />
                                    </div>
                                  </div>
                                </>}
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </Col> */}
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          {" "}
                          Upload Image* <span style={{ fontSize: "11px" }}>(125 × 58 px)</span>
                        </label>
                        <div className="form-control-wrap">
                          {Brand.id ? (
                            <>
                              {Brand.BrandLogo ? (
                                <>
                                  {ImageChange ? (
                                    <input
                                      type="file"
                                      onChange={(e) => handleDropChange1(e)}
                                      className="form-control"
                                      name="BrandLogo"
                                      title="change img"
                                    />
                                  ) : (
                                    <>
                                      <img src={`${API_Brand_Image}/${Brand.BrandLogo}`} width="106px" />
                                      {files1.length > 0 &&
                                        files1.map((item, index) => {
                                          return (
                                            <div key={item}>
                                              <span
                                                onClick={() => Deleteimagepopup(item)}
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
                                    onChange={(e) => handleDropChange1(e)}
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
                                onChange={(e) => handleDropChange1(e)}
                                className="form-control"
                                name="BrandLogo"
                                title="add img"
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Col>

                    <Col size="6">
                      <FormGroup>
                        <label className="form-label">Top Content </label>
                        <div className="text-editor" style={{ minHeight: "100px" }}>
                          <ReactQuill
                            theme="snow"
                            value={TopContent}
                            onChange={handleChangeTop}
                            placeholder={"Write something awesome..."}
                            modules={modules1}
                            formats={formats}
                          />
                        </div>
                        {errors.description && <span className="invalid">{errors.description.message}</span>}
                      </FormGroup>
                    </Col>

                    <Col size="6">
                      <FormGroup>
                        <label className="form-label">Bottom Content </label>
                        <div className="text-editor" style={{ minHeight: "100px" }}>
                          <ReactQuill
                            theme="snow"
                            value={BottomContent}
                            onChange={handleChangeBottom}
                            placeholder={"Write something awesome..."}
                            modules={modules2}
                            formats={formats}
                          />
                        </div>
                        {errors.description && <span className="invalid">{errors.description.message}</span>}
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Brand SEO Title*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="SeoTitle"
                            placeholder="Enter SEO Title"
                            value={Brand.SeoTitle}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.SeoTitle && <span className="invalid">{errors.SeoTitle.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Brand SEO Description
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="SeoDescription"
                            placeholder="Enter SEO Description"
                            value={Brand.SeoDescription}
                            onChange={handleChangesss}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="preview-block">
                        <div className="g-3 align-center flex-wrap">
                          <div className="g">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input form-control"
                                id="customCheck8"
                                name="Usage"
                                checked={isChecked2}
                                onChange={handleOnChange2}
                              />
                              <label className="custom-control-label" htmlFor="customCheck8">
                                Is Featured Brand
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col size="12" style={{ justifyContent: "end" }}>
                      <Button color="primary" type="submit">
                        <span>{Brand.id === "" ? "SAVE" : "UPDATE"}</span>
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
              <h5 className="title">Brand</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Brand Name</span>
                      <span class="caption-text">{Brand.BrandName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Brand Slug</span>
                      <span class="caption-text">{Brand.BrandSlug}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Brand Description</span>
                      <span class="caption-text">{renderHTML(Brand.Description)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Brand Top Content</span>
                      <span class="caption-text">{renderHTML(Brand.TopContent)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Brand Bottom Content</span>
                      <span class="caption-text">{renderHTML(Brand.BottomContent)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Brand Brand Logo</span>
                      <span class="caption-text">
                        <img src={`${API_Brand_Image}/${Brand.BrandLogo}`} style={{ width: "50%" }}></img>
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Delete Brand Modal */}
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

        {/*img delete */}
        {/* <Modal isOpen={ImgmodalFail} toggle={ImgtoggleModalFail}>
        <ModalBody className="modal-body-lg text-center">
          <div className="nk-modal">
            <Icon className={Deleteicon ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success" : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"}></Icon>
            <h4 className="nk-modal-title">{DeleteImageTittle}</h4>
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
      </Modal> */}
        {/* {
        alertmsg ?
          <>
           <div class="alert alert-icon alert-primary" role="alert">    <em class="icon ni ni-alert-circle"></em>     <strong>Order has been placed</strong>. Your will be redirect for make your payment. </div>
          </> : 
          <>
          {console.log("error")}
          </>
      } */}
      </Content>
    </React.Fragment>
  );
};
export default FeaturedBrands;
