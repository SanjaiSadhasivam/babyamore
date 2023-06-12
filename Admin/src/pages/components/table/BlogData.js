import React, { useEffect, useState } from "react";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
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



//Bleow new code 03.08.2022
import { messageData } from "./MessageData";
import { findUpper } from "../../../utils/Utils";
import { UserAvatar } from "../../../components/Component";
import User2 from "../../../images/avatar/c-sm.jpg";

import User10 from "../../../images/avatar/13.png";
import { Link, useHistory } from "react-router-dom";



import { BlogData, blogTable } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import { FormGroup, Label, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
const Blog = () => {
  const [data, setData] = useState(messageData);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: '',
    reviewname: '',
    reviewemail: ''

  });
  const [state, setState] = useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };

  const [smOption, setSmOption] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    check: false,
  });

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [view, setView] = useState({
    add: false,
    details: false,
  });

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    // resetForm();
  };

  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };
  const [files1, setFiles1] = useState([]);

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const resetForm = () => {
    setFormData({
      ...formData,
      id: null,
      orderId: "",
      date: new Date(),
      status: "",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };


  const { errors, register, handleSubmit } = useForm();

  const EditTable = (id) => {
    // localStorage.setItem('MainCategory', id);
    history.push({ pathname: '/dashboard/BlogData', state: id })
    // window.location.href="/dashboard/main-category"
  }


  const history = useHistory()

  //Blog Table 03.08.2022

  const blogTable = [
    {
      name: "  S.NO",
      selector: (row) => row.no,
      sortable: true,
    },
    {
      name: "Blogs HeadLine",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Blogs Images ",
      selector: (row) => row.image,

      cell: (row) => (
        <div className="user-card mt-2 mb-2">
          <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
        </div>
      ),
      sortable: true,
    },

    {
      name: "Blogs Date",
      selector: (row) => row.gender,
      sortable: true,
      hide: "sm",
    },

    {
      name: "Action",
      cell: (row) => (
        <ul className="nk-tb-actions gx-1 my-n1">
          <li className="mr-n1">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"

                className="dropdown-toggle btn btn-icon btn-trigger"
              >
                <Icon name="more-h"></Icon>
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="link-list-opt no-bdr">
                  <li >
                    <DropdownItem
                      tag="a"
                      onClick={() => {
                        toggle("add");
                      }}


                    >
                      <Icon name="edit"></Icon>
                      <span>Edit Blog</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      href="#view"
                      onClick={() => viewlist(row._id)}
                    >
                      <Icon name="eye"></Icon>
                      <span>View Blog</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      href="#remove"
                    >
                      <Icon name="trash"></Icon>
                      <span>Remove Blog</span>
                    </DropdownItem>
                  </li>
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </li>
        </ul>
      ),
      allowOverflow: true,
      button: true,
    },
  ];


  // Blog data 03.08.2022
  const BlogData = [
    {
      no: 1,
      id: 1,
      name: "Fashion accessories deals Up to 36% off + free shipping",
      gender: "Apr 26, 2022",
      image: User2,

    },
    {
      no: 2,
      id: 2,
      name: "Pure Burn Daipers",
      gender: "May 9, 2022",
      image: User10,

    },
  ];





  return (
    <React.Fragment>
      <Head title="Blog" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          {/* <BlockHeadContent>
            <BackTo link="/components" icon="arrow-left">
              Components
            </BackTo>
            <BlockTitle tag="h2" className="fw-normal">
              DisputesTable Example
            </BlockTitle>
            <BlockDes>
              <p className="lead">
                The tables in this section has used the{" "}
                <a href="https://react-data-table-component.netlify.app/" target="_blank" rel="noreferrer">
                  React-Data-Table-Component
                </a>{" "}
                package. Visit the{" "}
                <a href="https://react-data-table-component.netlify.app/" target="_blank" rel="noreferrer">
                  documentation
                </a>{" "}
                for further understanding. The plugin has been customized for the purpose of React Dashlite.
              </p>
            </BlockDes>
          </BlockHeadContent> */}
        </BlockHead>

        {/* <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Disputes Table Data</BlockTitle>
              <p>
                Just import <code>ReactDisputesTable</code> from <code>components</code>, it is built in for react dashlite.
              </p>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ReactDataTable data={DisputesTableData} columns={disputesTableColumns} expandableRows pagination />
          </PreviewCard>
        </Block> */}

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>

              <div className="heading-flex">
                <BlockTitle tag="h4"> Blogs </BlockTitle>

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
                          <span>Add Blogs</span>
                        </Button>
                      </li>
                      {/* <li className="nk-block-tools-opt">
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
                          toggle("details");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Attributes</span>
                      </Button>
                    </li> */}
                    </ul>
                  </div>
                </div>
              </div>

            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={BlogData}
              columns={blogTable}
              expandableRows
              pagination
              actions
            />
          </PreviewCard>
        </Block>


        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">FORM*</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          ATTRIBUTE VALUE*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Color/Pattern", label: "Color/Pattern" },
                              { value: "Radio", label: "Radio" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          ATTRIBUTE Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          List
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                          />
                        </div>
                      </div>
                    </Col>
                    {/* <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">
                          Date of order
                        </label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={formData.date}
                            className="form-control"
                            onChange={(date) => setFormData({ ...formData, date: date })}
                          />
                          {errors.date && <span className="invalid">{errors.date.message}</span>}
                        </div>
                      </div>
                    </Col> */}

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          CATEGORIES
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "On Hold", label: "On Hold" },
                              { value: "Delivered", label: "Delivered" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    {/* <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Purchased Product
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                          Total Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                        CATEGORIES
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "On Hold", label: "On Hold" },
                              { value: "Delivered", label: "Delivered" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col> */}

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span> Save </span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>









      </Content>
    </React.Fragment>
  );
};
export default Blog;
