import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

import {
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  ReactDataTable,
  PreviewCard,
  Button,
  Icon,
  UserAvatar,
  Row,
  Col,
  RSelect,
  Block,
  DataTableHead,
  DataTableRow,
} from "../../../components/Component";

import {
  DisputesTableData,
  DisputesTableData2s11,
  DisputesTableDataod1,
  disputesTableColumns2,
  disputesTableColumnsdd,
  disputesTableColumnsdd1,
  userData,
} from "../../components/table/TableData";

import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";

import ContentAlt from "../../../layout/content/ContentAlt";
import { FormGroup, Label, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";

const OddData = () => {
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
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };

  const [files1, setFiles1] = useState([]);

  const onFormSubmit = (form) => {
    const { customer, purchased, list, add, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      paid: formData.paid,
      total: total,
      list: "",
      add: "",
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };

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

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  useEffect(() => {
    if (filterText !== "") {
      const filteredData = messageData.filter((item) => {
        return (
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.messageTitle.toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setData([...filteredData]);
    } else {
      setData(filteredTabData);
    }
  }, [filterText, filterTab, filteredTabData]);

  useEffect(() => {
    let filteredData;
    if (filterTab === "1") {
      setTabData(order);
    } else if (filterTab === "2") {
      setTabData(order1);
    } else if (filterTab === "3") {
      setTabData(order2);
    } else if (filterTab === "4") {
      setTabData(support);
    } else {
      setTabData(review);
    }
  }, [filterTab]);

  const onchangereview = ({ target: { name, value } }) => {
    setReview({ ...Review, [name]: value });
  };

  const ReviewClick = () => {
    if (Review.reviewmsg) {
      setReviewerror(null);
    } else {
      setReviewerror("* This field is required");
    }
  };

  const disputesTableColumns = [
    {
      name: "Order No",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.age,
      sortable: true,
      hide: 370,
    },
    {
      name: "Customer",
      selector: (row) => row.startDate,
      sortable: true,
      hide: "md",
    },
    {
      name: "Grand Total",
      selector: (row) => row.gender,
      sortable: true,
      hide: "sm",
    },
    
    {
      name: "Payment",
      selector: (row) => row.salary1,
      sortable: true,
      hide: "md",
    },
    {
      name: "Status",
      selector: (row) => row.sam,
      sortable: true,
      hide: "md",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
        <DropdownItem
            tag="a" href="#dropdown"
            onClick={(ev) => {
              ev.preventDefault();
              handleButtonClick(row.id);
            }}
          >
            <Icon name="edit"></Icon>
          </DropdownItem>
        <DropdownItem
            tag="a" href="#dropdown"
            onClick={(ev) => {
              ev.preventDefault();
              handleButtonClick(row.id);
            }}
          >
            <Icon name="eye"></Icon>
          </DropdownItem>
          <DropdownItem
            tag="a" href="#dropdown"
            onClick={(ev) => {
              ev.preventDefault();
              handleButtonClick(row.id);
            }}
          >
            <Icon name="trash"></Icon>
          </DropdownItem>
        </>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  const handleButtonClick = () => {};

  const support = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="g-3">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    Title*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="N/A"
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
                  <label className="form-label" htmlFor="purchased">
                    Meta Keywords
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="N/A"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>

              <Col size="12">
                <FormGroup>
                  <label className="form-label">Description</label>
                  <div className="text-editor" style={{ minHeight: "100px" }}>
                    <EditorToolbar />
                    <ReactQuill
                      theme="snow"
                      value={state.value}
                      onChange={handleChange}
                      placeholder={"Write something awesome..."}
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                  {errors.description && <span className="invalid">{errors.description.message}</span>}
                </FormGroup>
              </Col>
              <Col size="6"></Col>

              {/* <Col size="4">
              <Button color="primary" type="submit">
                <Icon className="plus"></Icon>
                <span>Pr</span>
              </Button>
            </Col>  */}
              <Col size="4">
                <Button color="primary" type="submit">
                  <span>Save</span>
                </Button>
              </Col>

              {/* <Col size="4">
              <Button color="primary" type="submit">
                <Icon className="plus"></Icon>
                <span>Save</span>
              </Button>
            </Col>  */}
            </Row>
          </form>
        </div>
      </div>
    );
  };

  const order = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm"></BlockHead>

          <Block size="lg">
            <PreviewCard>
              <ReactDataTable
                data={DisputesTableData2s11}
                columns={disputesTableColumnsdd}
                expandableRows
                pagination
                actions
              />
            </PreviewCard>
          </Block>
        </Content>
      </React.Fragment>
    );
  };

  const order1 = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm"></BlockHead>

          <Block size="lg">
            <PreviewCard>
              <ReactDataTable
                data={DisputesTableDataod1}
                columns={disputesTableColumnsdd1}
                expandableRows
                pagination
                actions
              />
            </PreviewCard>
          </Block>
        </Content>
      </React.Fragment>
    );
  };

  const order2 = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm"></BlockHead>

          <Block size="lg">
            <PreviewCard>
              <ReactDataTable
                data={DisputesTableData}
                columns={disputesTableColumns}
                expandableRows
                pagination
                actions
              />
            </PreviewCard>
          </Block>
        </Content>
      </React.Fragment>
    );
  };

  const review = () => {
    return (
      <div>
        <div className=" mob-card">
          <div className="border-bottom card-body p-3 position-relative">
            <h5 className="pb-2 f-14 fw-600 text-grey">Rate this product</h5>

            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => {
                      setRating(index);
                    }}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>

            <form id="ratingForm">
              <input
                type="hidden"
                name="csrfmiddlewaretoken"
                defaultValue="INWn7wDxlGq0JEOtUP0bK5v83DSzBjxZQzNCkALV7e0ROP6qSYfusgbWtQD3nHlT"
              />
              <div className="row m-0">
                <p className="review_error_msg error_msg_rating text-red" />
                <div className="col-md-12 px-0 card-body pt-4 h-100 pb-2 border-top mt-3">
                  <h5 className="pb-2 f-14 fw-600 text-grey">Review</h5>
                  <div className="login_alert">
                    <textarea
                      rows={4}
                      id="review"
                      className=" w-100 border p-2 mb-3"
                      placeholder="Write a review"
                      name="reviewmsg"
                      onChange={onchangereview}
                      value={Review.reviewmsg}
                    />
                    <p className="error_msg_comments text-red"></p>
                  </div>
                  <Col size="4">
                    <Button color="primary" type="submit">
                      <span>Save</span>
                    </Button>
                  </Col>
                </div>
                <p className="review_error_msg error_msg_comments text-red" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const onSearchBack = () => {
    setOnSearch(false);
    setFilterText("");
  };

  const onClosed = (id) => {
    let newData = data;
    const index = newData.findIndex((item) => item.id === id);
    newData[index].closed = true;
    setData([...newData]);
  };

  const onMessageClick = (id) => {
    setSelectedIt(id);
    if (window.innerWidth <= 990) {
      setMobileView(true);
    }
  };

  return (
    <React.Fragment>
      <Head title=" Configuration"></Head>
      <ContentAlt>
        <div className="nk-msg">
          <div className="nk-msg-aside hide-aside">
            <div className="nk-msg-nav">
              <ul className="nk-msg-menu">
                <li className={`nk-msg-menu-item ${filterTab === "1" && " active"}`} onClick={() => setFilterTab("1")}>
                  <a
                    href="#active"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    All Orders
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    UnPaid
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#stared"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Unfulfilled
                  </a>
                </li>
                {/* <li className={`nk-msg-menu-item ${filterTab === "4" && " active"}`} onClick={() => setFilterTab("4")}>
                  <a
                    href="#all"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Orders
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "5" && " active"}`} onClick={() => setFilterTab("5")}>
                  <a
                    href="#something"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Reviews
                  </a>
                </li> */}
              </ul>
            </div>

            <Simplebar className="nk-msg-list">{tabData}</Simplebar>
          </div>
          {/*nk-aside*/}
          {/* <MessageItem
            id={selectedId}
            onClosed={onClosed}
            data={data}
            setMobileView={setMobileView}
            mobileView={mobileView}
          /> */}
        </div>
      </ContentAlt>
    </React.Fragment>
  );
};
export default OddData;
