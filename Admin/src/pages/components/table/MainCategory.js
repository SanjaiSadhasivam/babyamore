import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import Papa from "papaparse";
import axios from "axios";
import exportFromJSON from "export-from-json";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockHead, Row, Col, BlockHeadContent, Icon, CustomDataTable } from "../../../components/Component";
import { API_URL, API_Category, token } from "../../../Api";
const API_Cate_Image = `${API_URL}/Category_image`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const MainCategory = () => {
  const [data, setData] = useState();
  const [DeleteId, setDeleteId] = useState("");
  const [smOption, setSmOption] = useState(false);
  const history = useHistory();
  const [Deleteicon, setDeleteicon] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const [MainCategory, setMainCategory] = useState({
    category_name: "",
    category_slug: "",
    meta_name: "",
    meta_description: "",
    upload_image: "",
    category_icon: "",
    bottom_content: "",
    brandid: "",
    feature_product: "",
    status: "",
  });
  useEffect(() => {
    Getdata();
  }, []);

  // const reversed = [...data].reverse();
  const Getdata = async () => {
    const data = await axios.get(`${API_Category}`, config);
    setData(data.data.list);
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
    const { data } = await axios.get(`${API_Category}/${id}`, config);

    setMainCategory({
      ...MainCategory,
      CategoryName: data.list[0].category_name,
      MainCategorySlug: data.list[0].category_slug,
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
    setSubCategory({ value: data.list[0].SubCategoryId, label: data.list[0].SubCategoryName });
  };

  const ViewTable = (id) => {
    history.push({ pathname: "/dashboard/main-category-add-edit", state: id });
  };
  const EditTable = (id) => {
    history.push({ pathname: "/dashboard/main-category-add-edit", state: id });
  };

  const DeleteOpen = (id) => {
    setdeleteSuccess(false);
    setDeleteId(id);
    setModalFail(true);
  };
  // const DeleteDataId = async (id) => {
  const Deletedata = () => {
    if (DeleteId) {
      axios.put(`${API_Category}/delete/${DeleteId}`, {}, config).then((res) => {
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
          toast.error("Please delete sub category First", {
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
    axios.get(`${API_Category}/ExportCategory/`, {}, config).then((res) => {
      if (res.status == 200) {
        const data = res.data.list;
        const fileName = "Category";
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
      axios.post(`${API_Category}/ImportCategory/`, parsedData).then((res) => {
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
      title: "Image",
      render: (rowData) => (
        <img
          src={`${API_Cate_Image}/${rowData.upload_image}`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        ></img>
      ),
    },
    { field: "category_name", title: "Category Name" },
    { field: "category_slug", title: "Slug Name" },
    { field: "meta_name", title: "Meta Name" },
    { field: "meta_description", title: "Meta Description" },
    { field: "orderid", title: "Position" },
    // { field: "bottom_content", title: "Bottom Content" },
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
                    <DropdownItem tag="a" href="#remove" onClick={() => DeleteOpen(row.id)}>
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
    formData.append("type", "maincategory");
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
      })
        .catch(function (error) {
          toast.error("Please delete subcategory first", {
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
      <Head title="Main Category" />

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
              <div className="heading-flex justify-content-end" style={{ paddingBottom: "1.25rem" }}>
                {/* <BlockTitle tag="h4">MAIN CATEGORY LIST </BlockTitle> */}
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
                        <Link to="main-category-add-edit" style={{ color: "white" }}>
                          <Button
                            className="toggle btn-icon d-md-none"
                            color="primary"
                            // onClick={() => {
                            //   toggle("add");
                            // }}
                            style={{ width: "130px", top: "-73px" }}
                          >
                            <Icon name="plus">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Icon>
                            Add Main Category
                          </Button>
                        </Link>
                        <Link to="main-category-add-edit" style={{ color: "white" }}>
                          <Button className="toggle d-none d-md-inline-flex" color="primary" style={{ width: "100%" }}>
                            <Icon name="plus">&nbsp;</Icon>
                            Add Main Category
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          {/* <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={DisputesTableDatamain}
              columns={tableColumn}
              expandableRows
              pagination
              actions
            />
          </PreviewCard> */}
        </Block>

        <CustomDataTable data={data} columns={tableColumn}
          title="MAIN CATEGORY LIST" filter={false}
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
              <h4 className="nk-modal-title">{deleteSuccess ? "Main Category Deleted Successfully" : "Do you want Delete!"}</h4>
              <div className="nk-modal-action mt-5">
                {deleteSuccess ?
                  <></> :
                  <>
                    <Button color="light" size="lg" className="btn-mw mr-3" onClick={Deletedata}>
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
              <h5 className="title">Main Category View</h5>
              <div className="mt-4">
                <Row className="g-3">
                  <Col className="row" md="12">
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Main Category Name</span>
                      <span class="caption-text">{MainCategory.CategoryName}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Main Category Slug</span>
                      <span class="caption-text">{MainCategory.MainCategorySlug}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text"> Description</span>
                      <span class="caption-text">{renderHTML(MainCategory.MetaDescription)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Meta Name</span>
                      <span class="caption-text">{renderHTML(MainCategory.MetaName)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Bottom Content</span>
                      <span class="caption-text">{renderHTML(MainCategory.BottomContent)}</span>
                    </div>
                    <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      <span class="sub-text">Main Category Image</span>
                      <span class="caption-text">
                        <img src={`${API_Cate_Image}/${MainCategory.UploadImage}`} style={{ width: "50%" }}></img>
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
export default MainCategory;
