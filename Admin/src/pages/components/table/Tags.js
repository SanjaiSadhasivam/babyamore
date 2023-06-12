import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  Icon,
  Row,
  RSelect,
  Col,
  CustomDataTable,
} from "../../../components/Component";

import { API_Tags, token,API_URL } from "../../../Api";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Tags = () => {
  let updateDelete = [];
  const [smOption, setSmOption] = useState(false);
  const [status, setStatus] = useState("");
  const [ID, setID] = useState("");
  const [data, setData] = useState([]);
  const [DeleteId, setDeleteId] = useState("");
  const { errors, register, handleSubmit } = useForm();

  const [Tags, setTags] = useState({
    TagName: "",
    TagSlug: "",
    TagStatus: null,
    Status: 1,
    // is_active: true,
  });

  const [view, setView] = useState({ add: false, Viewdetails: false });

  useEffect(() => {
    Getdata();
  }, []);
  const reversed = [...data].reverse();
  const Getdata = async () => {
    const { data } = await axios.get(`${API_Tags}`, config);
    setData(data.list);
  };

  const toggle = (type) => {
    setTags({
      ...Tags,
      TagName: "",
      TagSlug: "",
      TagStatus: null,
      // is_active: true,
    });
    setID("");
    setStatus("");
    setView({
      add: type === "add" ? true : false,
      Viewdetails: type === "details" ? true : false,
    });
  };

  const handleChangesubTags = ({ target: { name, value } }) => {
    setTags({ ...Tags, [name]: value });
  };

  const handleChangeStatus = async (event) => {
    setTags({
      ...Tags,
      TagStatus: event.value,
    });
    setStatus({ value: event.value, label: event.label });
  };

  const onFormSubmit = (form) => {
    if (!ID) {
      Create();
    } else {
      Edit(ID);
    }
  };

  const Create = () => {
    axios.post(API_Tags, Tags, config).then((res) => {
      setTags({
        ...Tags,
        TagName: "",
        TagSlug: "",
        TagStatus: null,
        // is_active: true,
      });
      setStatus("");
      setID("");
      toast.success("Successfully Created ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      Getdata();
      onFormCancel();
    });
  };

  const Edit = (ID) => {
    axios.put(`${API_Tags}/${ID}`, Tags, config).then((res) => {
      setTags({
        ...Tags,
        TagName: "",
        TagSlug: "",
        TagStatus: null,
        // is_active: true,
      });
      setStatus("");
      setID("");
      toast.success("Successfully  Updated ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      Getdata();
      onFormCancel();
    });
  };

  const Deletedata = () => {
    if (DeleteId) {
      axios.put(`${API_Tags}/delete/${DeleteId}`, {}, config).then((res) => {
        Getdata();
        setModalFail(false);
      });
    }
  };

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (id) => {
    setDeleteId(id);
    setModalFail(true);
  };

  const EditTable = async (id, type) => {
    setView({ add: type === "add" ? true : false });
    const list = data.find((ss) => ss.tag_id === id);

    // const {data} = await axios.get(`${API_Tags}/${id}`,config);

    setID(id);
    setTags({
      ...Tags,
      TagName: list.tag_name,
      TagSlug: list.tag_slug,
      TagStatus: list.tag_status,
      // is_active: list.is_active,
    });
    setStatus({ value: list.tag_status, label: list.tag_status === 1 ? "active" : "Inactive" });
  };

  const handleopenview = async (type, id) => {
    setView({ Viewdetails: type === "Viewdetails" ? true : false });
    const Result = data.find((ss) => ss.tag_id === id);
    // const Result = await axios.get(`${API_Tags}/${id}`,config);
    setTags({
      ...Tags,
      TagName: Result.tag_name,
      TagSlug: Result.tag_slug,
      TagStatus: Result.tag_status,
      // is_active: Result.is_active,
    });
  };
  const onFormCancel = () => {
    setView({ add: false, details: false, successmsg: false });
  };

  const handleAttributeStatus = async (datas, stat) => {
    var state = stat === 1 ? 0 : 1;
    // const { data } = await axios.put(`${API_Tags}/tag_status/${datas.tag_id}`, {
    const { data } = await axios.put(
      `${API_Tags}/${datas.tag_id}`,
      {
        TagStatus: state,
        TagName: datas.tag_name,
        TagSlug: datas.tag_slug,
      },
      config
    );
    Getdata();
  };

  const tableColumn = [
    { field: "tag_name", title: "Tags" },
    { field: "tag_slug", title: "Slug" },
    {
      field: "tag_status",
      title: "Status",
      render: (row) => {
        return (
          <Button
            size="sm"
            color={row.tag_status === 1 ? "success" : "primary"}
            onClick={() => handleAttributeStatus(row, row.tag_status)}
          >
            {row.tag_status === 1 ? "Active" : "InActive"}
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
                <ul className="link-list-opt no-bdr" style={{ overflowY: "scroll", height: "130px" }}>
                  <li>
                    <DropdownItem tag="a" onClick={() => handleAttributeStatus(row, row.tag_status)}>
                      <span>
                        {row.tag_status === 1 ? (
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
                      <span>{row.tag_status === 1 ? "InActive" : "Active"}</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => EditTable(row.tag_id, "add")}>
                    <DropdownItem tag="a">
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li onClick={() => handleopenview("Viewdetails", row.tag_id)}>
                    <DropdownItem tag="a">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" onClick={() => DeleteOpen(row.tag_id)}>
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
   let update =  rowData.map((currele, index) => {
    let a ={
      value:currele.tag_id,
    }
    return a;
  })
  console.log(JSON.stringify(update),"iiiiiio");
  let formData = new FormData();
  formData.append("deleteid",JSON.stringify(update));
  formData.append("type","tags");
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
        toast.error("Somethig wrong", {
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
      <Head title="Attributes" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-content-end">
                <div className="toggle-wrap nk-block-tools-toggle mb-3">
                  <a
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
                          <span>Add Tag</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
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
              </div>
            </BlockHeadContent>
          </BlockHead>
        </Block>

        <CustomDataTable data={reversed} columns={tableColumn} title="TAG LIST" filter={false}    actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows
            },
          ]}/>

        {/* Add modal */}
        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Tag</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="TagName">
                          {" "}
                          Tag Name{" "}
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="TagName"
                            placeholder="Enter Tag Name"
                            value={Tags.TagName}
                            onChange={handleChangesubTags}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.TagName && <span className="invalid">{errors.TagName.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="TagSlug">
                          {" "}
                          Tag Slug{" "}
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="TagSlug"
                            placeholder="Enter Tag Slug"
                            value={Tags.TagSlug}
                            onChange={handleChangesubTags}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.TagSlug && <span className="invalid">{errors.TagSlug.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="is_active">
                          {" "}
                          Status{" "}
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            options={[
                              { value: 1, label: "Active" },
                              { value: 0, label: "InActive" },
                            ]}
                            onChange={handleChangeStatus}
                            value={status}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12" className="d-flex justify-content-end">
                      <Button color="primary" type="submit">
                        {" "}
                        {/* <span>SUBMIT</span>{" "} */}
                        <span>{ID === "" ? "SAVE" : "UPDATE"}</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* View modal */}
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
              <h6 className="title text-left">Tags</h6>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col className="row" md="12">
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Tag Name</span>
                        <span class="caption-text">{Tags.TagName}</span>
                      </div>
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Tag Slug</span>
                        <span class="caption-text">{Tags.TagSlug}</span>
                      </div>
                      <div class="col-lg-6" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                        <span class="sub-text">Status</span>
                        <span class="caption-text">{Tags.TagStatus === 1 ? "Active" : "InActive"}</span>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Delete modal */}
        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
              <h4 className="nk-modal-title">Do you want Delete!</h4>
              <div className="nk-modal-action mt-5 d-flex justify-content-around">
                <Button color="light" size="lg" className="btn-mw" onClick={Deletedata}>
                  {" "}
                  Confirm{" "}
                </Button>
                <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default Tags;
