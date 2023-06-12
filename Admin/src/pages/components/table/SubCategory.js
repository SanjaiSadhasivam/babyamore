import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useHistory } from "react-router-dom";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Block,
  BlockHead,
  Row,
  Col,
  BlockBetween,
  BlockHeadContent,
  Icon,
  CustomDataTable,
} from "../../../components/Component";
import { API_URL, API_SubCategory, token } from "../../../Api";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import exportFromJSON from "export-from-json";
import Papa from "papaparse";

const API_View = `${API_URL}/SubCategory_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const SubCategory = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [DeleteId, setDeleteId] = useState("");
  const [smOption, setSmOption] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
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
    Getdata();
  }, []);

  const reversed = [...data].reverse();
  const Getdata = async () => {
    const subCategoryData = await axios.get(`${API_SubCategory}`, config);
    setData(subCategoryData.data.list);
  };

  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    // setImageChange(false);
    // setFiles1([]);
  };
  const handleopenview = async (type, id) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });
    const { data } = await axios.get(`${API_SubCategory}/${id}`, config);

    setSubCategory({
      ...SubCategory,
      CategoryName: data.list[0].category_name,
      SubCategoryName: data.list[0].subcategory_name,
      SubCategorySlug: data.list[0].subcategory_slug,
      MetaName: data.list[0].meta_name,
      MetaDescription: data.list[0].meta_description,
      UploadImage: data.list[0].upload_image,
      TopContent: data.list[0].top_content,
      BottomContent: data.list[0].bottom_content,
    });
    if (data.list[0].upload_image !== "") {
      setFile([data.list[0].upload_image]);
    }
    setTopContent(data.list[0].TopContent);
    setBottomContent(data.list[0].BottomContent);
    setMainCategory({ value: data.list[0].MainCategoryId, label: data.list[0].MainCategoryName });
    setSubCategory({ value: data.list[0].SubCategoryId, label: data.list[0].SubCategoryName });
  };

  const EditTable = (id) => {
    history.push({ pathname: `/dashboard/sub-category-add-edit`, state: id });
  };

  const DeleteOpen = (id) => {
    setdeleteSuccess(false);
    setDeleteId(id);
    setModalFail(true);
  };

  // const ViewTable = (id) => {
  //   history.push({ pathname: '/dashboard/sub-category-add-edit', state: id })
  // }

  const Deletedata = () => {
    if (DeleteId) {
      axios.put(`${API_SubCategory}/delete/${DeleteId}`, {}, config).then((res) => {
        if (res.data.statusCode == 200) {
          Getdata();
          setdeleteSuccess(true);
          setTimeout(() => {
          setModalFail(false);
          }, 1000);

        } else {
        
          toast.error("Email and Password Is Wrong", {
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
      .catch(function (error) {
        toast.error("Please delete Child category First", {
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
    }
  };
  const Exportdata = () => {
    axios.get(`${API_SubCategory}/ExportSubCategory`, {}, config).then((res) => {
      console.log(res,"ooooooooooooooooooooooooo");
      if (res.status == 200) {
        const data = res.data.list;
        const fileName = "SubCategory";
        const exportType = exportFromJSON.types.csv;

        exportFromJSON({ data, fileName, exportType });

        setTimeout(() => {
          setModalFail(false);
        }, 1000);
        toast.success("File Exported  Successfully! ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Data is Empty", {
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

  };
  const [parsedData, setParsedData] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setParsedData(results.data);
        event.target.value = null;
      },
    });
  };
  const [ResMsg, setResMsg] = useState();
  const Importdata = () => {
    if (parsedData != "") {
      axios.post(`${API_SubCategory}/ImportSubCategory`, parsedData).then((res) => {
        setResMsg(res.data.msg, 'resss');
      });
      toast.success("File Imported  Successfully! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("No File Choosen", {
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

    setParsedData("");
  }
  const tableColumn = [
    {
      // field: 'upload_image',
      title: "Image",
      render: (rowData) => (
        <img
          src={`${API_View}/${rowData.upload_image}`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        ></img>
      ),
    },
    // { field: 'MainCategoryName', title: 'Main Category' },
    { field: "subcategory_name", title: "Sub Category" },
    { field: "subcategory_slug", title: "Slug" },
    { field: "meta_name", title: "Meta Name" },
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
                    <DropdownItem tag="a" onClick={() => EditTable(row.subcat_id)}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => handleopenview("Viewdetails", row.subcat_id)}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a"onClick={() => DeleteOpen(row.subcat_id)}>
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
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.subcat_id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "subcategory");
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
          toast.error("Email and Password Is Wrong", {
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
        .catch(function (error) {
          toast.error("Please delete Child Category first", {
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
  return (
    <React.Fragment>
      <Head title="Sub Category" />
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
        {/* Same as */}
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-content-end">
                {/* <BlockTitle tag="h4"> SUB CATEGORY LIST </BlockTitle> */}
                <div className="heading-flex justify-content-end">
                  {/* <BlockTitle tag="h4">BRANDS</BlockTitle> */}
                  <div className="heading-flex justify-content-end" style={{ background: "" }}>

                    {/* <BlockTitle tag="h5">PRODUCT LIST </BlockTitle> */}
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" name="file" onChange={changeHandler} class="custom-file-input" id="inputGroupFile" required accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        <label id="fileLabel"class="custom-file-label" for="inputGroupFile">Choose file</label>
                      </div>
                      <div class="input-group-append">
                        <button type="submit" onClick={Importdata} class="btn btn-primary float-right mr-2">Import <i class="fa fa-upload"></i></button>
                      </div>
                    </div>
                    <div className="mr-3">
                      <Button className="toggle d-none d-md-inline-flex" color="primary" onClick={Exportdata} style={{ width: "100%" }}>
                        <Icon name="arrow-to-up">&nbsp;</Icon> Export </Button>
                    </div>

                  </div>



                </div>
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
                  <div className="toggle-expand-content1">
                    <ul className="nk-block-tools g-3" style={{ justifyContent: "end" }}>
                      <li className="nk-block-tools-opt">
                        <Link to="sub-category-add-edit" style={{ color: "white" }}>
                          <Button
                            className="toggle btn-icon d-md-none"
                            color="primary"
                            // onClick={() => {
                            //   toggle("add");
                            // }}
                            style={{ width: "130px", top: "-73px" }}
                          >
                            <Icon name="plus"></Icon>Add Sub Category
                          </Button>
                        </Link>
                        <Link to="sub-category-add-edit" style={{ color: "white" }}>
                          <Button className="toggle d-none d-md-inline-flex" color="primary" style={{ width: "100%" }}>
                            <Icon name="plus">&nbsp;</Icon>
                            Add Sub Category
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
        </Block>

        <CustomDataTable data={reversed} columns={tableColumn} title="SUB CATEGORY LIST"
          filter={false}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows
            },
          ]}
        />

        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className={deleteSuccess ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check-thick bg-success" : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"}></Icon>
              <h4 className="nk-modal-title">{deleteSuccess ? "Sub Category Deleted Successfully" : "Do you want Delete!"}</h4>
              <div className="nk-modal-action mt-5 d-flex justify-content-around">
                {deleteSuccess ?
                  <></> :
                  <>
                    <Button color="light" size="lg" className="btn-mw" onClick={Deletedata}>
                      {" "}
                      Confirm{" "}
                    </Button>
                    <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                      {" "}
                      Cancel{" "}
                    </Button>
                  </>
                }
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
              <h5 className="title">Sub Category View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Main Category Name</span>
                      <span class="caption-text">{SubCategory.CategoryName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Sub Category Name</span>
                      <span class="caption-text">{SubCategory.SubCategoryName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Sub Category Slug</span>
                      <span class="caption-text">{SubCategory.SubCategorySlug}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text"> Description</span>
                      <span class="caption-text">{renderHTML(SubCategory.MetaDescription)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Meta Name</span>
                      <span class="caption-text">{renderHTML(SubCategory.MetaName)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Sub Category Image</span>
                      <span class="caption-text">
                        <img src={`${API_View}/${SubCategory.UploadImage}`} style={{ width: "50%" }}></img>
                      </span>
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
export default SubCategory;
