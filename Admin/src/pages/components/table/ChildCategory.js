import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useHistory } from "react-router-dom";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Block,
  BlockHead,
  Col,
  Row,
  BlockBetween,
  BlockHeadContent,
  Icon,
  CustomDataTable,
} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { API_URL, API_ChildCategory, token } from "../../../Api";
import Head from "../../../layout/head/Head";
import exportFromJSON from "export-from-json";
import Papa from "papaparse";
const API_View = `${API_URL}/ChildCategory_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const ChildCategory = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [smOption, setSmOption] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);
  const [file, setFile] = useState([]);
  const [DEleteId, setDEleteId] = useState("");
  const toggleModalFail = () => {
    setModalFail(!modalFail);
  }
  const [ChilCategory, setChilCategory] = useState({
    ChildCategoryName: "",
    ChildCategorySlug: "",
    MetaName: "",
    MetaDescription: "",
    UploadImage: "",
  });
  useEffect(() => {
    Getdata();
  }, []);
  const reversed = [...data].reverse();
  const Getdata = async () => {
    const { data } = await axios.get(`${API_ChildCategory}`, config);
    setData(data.list);
  };

  const EditTable = (id) => {
    history.push({ pathname: "/dashboard/child-category-add-edit", state: id });
  };

  // const ViewTable = (id) => {
  //   history.push({ pathname: '/dashboard/child-category-add-edit', state: id })
  // }
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
    const { data } = await axios.get(`${API_ChildCategory}/${id}`, config);

    setChilCategory({
      ...ChilCategory,
      CategoryName: data.list[0].category_name,
      ChildCategoryName: data.list[0].childcategoryname,
      SubCategoryName: data.list[0].subcategory_name,
      ChildCategorySlug: data.list[0].childcategoryslug,
      MetaName: data.list[0].meta_name,
      MetaDescription: data.list[0].meta_description,
      UploadImage: data.list[0].upload_image,
      TopContent: data.list[0].top_content,
      BottomContent: data.list[0].BottomContent,
    });
    if (data.list[0].UploadImage !== "") {
      setFile([data.list[0].UploadImage]);
    }
    setTopContent(data.list[0].TopContent);
    setBottomContent(data.list[0].BottomContent);
    setMainCategory({ value: data.list[0].MainCategoryId, label: data.list[0].MainCategoryName });
    setSubCategory({ value: data.list[0].SubCategoryId, label: data.list[0].SubCategoryName });
  };
  // const [alaerts, setalaerts] = useState(false)
  const DeleteOpen = (id) => {
    setdeleteSuccess(false);
    setDEleteId(id);
    // setalaerts(true)
    setModalFail(true);
  };

  const Deletedata = () => {
    if (DEleteId) {
      axios.put(`${API_ChildCategory}/delete/${DEleteId}`, {}, config).then((res) => {
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
        toast.error("Please delete Product First", {
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
    axios.get(`${API_ChildCategory}/ExportChildCategory`, {}, config).then((res) => {
      console.log(res,"ooooooooooooooooooooooooo");
      if (res.status == 200) {
        const data = res.data.list;
        const fileName = "ChildCategory";
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
      axios.post(`${API_ChildCategory}/ImportChildCategory`, parsedData).then((res) => {
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
      field: "UploadImage",
      title: "Image",
      render: (rowData) => (
        <>
          {rowData.upload_image ? (
            <img src={`${API_View}/${rowData.upload_image}`} style={{ width: 50, borderRadius: "50%" }} />
          ) : (
            <p>No Image</p>
          )}
        </>
      ),
    },
    { field: "category_name", title: "Main Category" },
    { field: "subcategory_name", title: "Sub Category" },
    { field: "childcategoryname", title: "Child Category" },
    { field: "childcategoryslug", title: "Slug" },
    { field: "meta_name", title: "MetaName" },
    // { field: 'meta_description', title: 'Meta Description' },
    // { field: 'top_content', title: 'Top Content' },
    // { field: 'bottom_content', title: 'Bottom Content' },
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
                    <DropdownItem tag="a" onClick={() => EditTable(row.id)}>
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
                  <li>
                    <DropdownItem tag="a" onClick={() => DeleteOpen(row.id)}>
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
    formData.append("type", "childcategory");
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
          toast.error("Please delete Product first", {
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
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  return (
    <React.Fragment>
      <Head title="Child Category" />
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
              <div className="heading-flex justify-content-end">
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
                        <Link to="child-category-add-edit" style={{ color: "white" }}>
                          <Button
                            className="toggle btn-icon d-md-none"
                            color="primary"
                            onClick={() => {
                              toggle("add");
                            }}
                            style={{ width: "130px", top: "-73px" }}
                          >
                            <Icon name="plus"></Icon>Add Child Category
                          </Button>
                        </Link>
                        <Link to="child-category-add-edit" style={{ color: "white" }}>
                          <Button className="toggle d-none d-md-inline-flex" color="primary" style={{ width: "100%" }}>
                            <Icon name="plus">&nbsp;</Icon>
                            Add Child Category
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

        <CustomDataTable data={reversed} columns={tableColumn} title="CHILD CATEGORY LIST"
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
              <h4 className="nk-modal-title">{deleteSuccess ? "Child Category Deleted Successfully" : "Do you want Delete!"}</h4>
              <div className="nk-modal-action mt-5">
                {deleteSuccess ?
                  <></> :
                  <>
                    <Button color="light" size="lg" className="btn-mw mr-3" onClick={Deletedata}>
                      Confirm{" "}
                    </Button>
                    <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                      Cancel
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
              <h5 className="title">Child Category View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Main Category Name</span>
                      <span class="caption-text">{ChilCategory.CategoryName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">SubCategory Name</span>
                      <span class="caption-text">{ChilCategory.SubCategoryName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Child Category Name</span>
                      <span class="caption-text">{ChilCategory.ChildCategoryName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text"> Description</span>
                      <span class="caption-text">{renderHTML(ChilCategory.MetaDescription)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Meta Name</span>
                      <span class="caption-text">{renderHTML(ChilCategory.MetaName)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">child category slug</span>
                      <span class="caption-text">{renderHTML(ChilCategory.ChildCategorySlug)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Child Category Image</span>
                      <span class="caption-text">
                        <img src={`${API_View}/${ChilCategory.UploadImage}`} style={{ width: "50%" }}></img>
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
export default ChildCategory;
