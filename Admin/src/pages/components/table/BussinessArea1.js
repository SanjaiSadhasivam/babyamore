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

import { messageData } from "./MessageData";

import { DisputesTableDatas102, disputesTablesColumnsadd2s, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {  FormGroup,Label, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
const BussinessArea1 = () => {
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
    setFormData({...formData,
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

  return (
    <React.Fragment>
      <Head title="COUNTRIES " />
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
              <BlockTitle tag="h4">COUNTRIES </BlockTitle>
              {/* <p>
                Pass in the <code>actions</code> props to add export option to the table.
              </p> */}

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
                        <span>ADD COUNTRIES  </span>
                      </Button>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={DisputesTableDatas102}
              columns={disputesTablesColumnsadd2s}
              expandableRows
              pagination
              actions
            />
          </PreviewCard>
        </Block>

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
              <h5 className="title">FORM</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                  <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                         NAME*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" Enter Full Name*"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        Full Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" Enter Full Name*"
                            placeholder="Enter the Full Name"
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                         ISO Code
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" Enter Full Name*"
                            placeholder="ISO Code"
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        CALLING CODE 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" Enter Full Name*"
                            placeholder="Calling Code"

                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       CITZENSHIP 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" Enter Full Name*"
                            placeholder="Citizenship"
                          />
                        </div>
                      </div>
                    </Col>


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        CAPITAL
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" Enter Full Name*"
                            placeholder="Capital"
                          />
                        </div>
                      </div>
                    </Col>


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                       TIMEZONE* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "(UTC-12:00) International Date Line West", label: "(UTC-12:00) International Date Line West" },
                              { value: "(UTC-11:00) Coordinated Universal Time-11", label: "(UTC-11:00) Coordinated Universal Time-11" },
                              { value: "(UTC-10:00) Hawaii", label: "(UTC-10:00) Hawaii" },
                              { value: "(UTC-09:00) Alaska", label: "(UTC-09:00) Alaska" },
                              { value: "(UTC-08:00) Baja California", label: "(UTC-08:00) Baja California" },
                              { value: "(UTC-08:00) Pacific Time (US and Canada)", label: "(UTC-08:00) Pacific Time (US and Canada)" },
                              { value: "(UTC-07:00) Chihuahua, La Paz, Mazatlan", label: "(UTC-07:00) Chihuahua, La Paz, Mazatlan" },
                              { value: "(UTC-07:00) Arizona", label: "(UTC-07:00) Arizona" },
                              { value: "(UTC-07:00) Mountain Time (US and Canada)", label: "(UTC-07:00) Mountain Time (US and Canada)" },
                              { value: "(UTC-06:00) Central America", label: "(UTC-06:00) Central Time (US and Canada)" },
                              { value: "(UTC-06:00) Saskatchewan", label: "(UTC-06:00) Saskatchewan" },
                              { value: "(UTC-06:00) Guadalajara, Mexico City, Monterey", label: "(UTC-06:00) Guadalajara, Mexico City, Monterey" },
                            
                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                      CURRENCY* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "INR	Indian Rupee", label: "INR	Indian Rupee" },
                              { value: "AED	Arabic Dirham", label: "AED	Arabic Dirham" },
                              { value: "AFN	Afghani", label: "AFN	Afghani" },
                              { value: "ALL	Lek", label: "ALL	Lek" },
                              { value: "AWG	Guilder", label: "AWG	Guildere" },
                              { value: "BAM	Convertible Mark", label: "BAM	Convertible Mark" },
                              { value: "BDT	Taka", label: "BDT	Taka" },
                              { value: "BND	Brunei Dollar", label: "BND	Brunei Dollar" },
                            
                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                  
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                    
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "EEA ACTIVE", label: "EEA ACTIVE" },
                              { value: "EEA INACTIVE", label: "EEA INACTIVE" },
                            
                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                    
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: " ACTIVE", label: " ACTIVE" },
                              { value: " INACTIVE", label: " INACTIVE" },
                            
                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                  

                   
                     

                    <Col size="12" style={{justifyContent:'end'}}>
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Save</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>
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

        {/* <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">DisputesTable with custom markup</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ReactDataTable
              data={userData}
              columns={disputesTableColumns2}
              pagination
              className="nk-tb-list"
              selectableRows
            />
          </PreviewCard>
        </Block> */}
      </Content>
    </React.Fragment>
  );
};
export default BussinessArea1;
