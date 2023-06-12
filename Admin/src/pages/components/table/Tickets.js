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

import { DisputesTableDatatickets, disputesTableColumnstickets, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {  FormGroup,Label, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
const Tickets = () => {
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
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };
  
  return (
    <React.Fragment>
      <Head title="Users" />
      <Content page="component">
        

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">OPEN TICKETS</BlockTitle>
             
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
                 
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={DisputesTableDatatickets}
              columns={disputesTableColumnstickets}
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
                  <Col md="8">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        Full Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Full Name"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       STATUS* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                           
                            
                            options={[
                              { value: "ACTIVE", label: "ACTIVE" },
                              { value: "INACTIVE", label: "INACTIVE" },
                            
                              
                            ]}
                            name="customer"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                            
                          />
                        </div>
                        {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                      </div>
                    </Col>
                  <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       NICE NAME*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                           
                            placeholder="Enter the Nice Name"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                         
                          />
                            {errors.customer && <span className="invalid">{errors.customer.message}</span>}

                        </div>
                       
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        EMAIL ADDRESS
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                           
                            placeholder="Enter a Vaild Email Address"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                          />
                           {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        PASSWORD*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            
                            placeholder="Password"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                          />
                           {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                         Confirm PASSWORD*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            
                            placeholder="Confirm Password"
                            name="customer"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                      ROLE* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                           
                         
                            options={[
                              { value: "ADMIN", label: "ADMIN" },
                              { value: "SUPER ADMIN", label: "SUPER ADMIN" },
                            
                              
                            ]}
                            name="status"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.status}
                          />
                           {errors.status && <span className="invalid">{errors.status.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">
                          Date of Birth
                        </label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={formData.date}
                            className="form-control"
                            ref={register({ required: "This is required" })}
                            onChange={(e) => setFormData({ ...formData, date: e.value })}
                            defaultValue={formData.date}

                          />
                          {errors.date && <span className="invalid">{errors.date.message}</span>}
                        </div>
                      </div>
                    </Col>



                     <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                      GENDER* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            
                            options={[
                              { value: "MALE", label: "MALE" },
                              { value: "FEMALE", label: "FEMALE" },
                            
                              
                            ]}
                            name= "status"
                            
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                            {errors.status && <span className="invalid">{errors.status.message}</span>}
                        </div>
                      </div>
                    </Col>


                    
                   
                    <Col size="12">
                    <FormGroup>
                      <label className="form-label">DESCRIPTION </label>
                      <div className="text-editor" style={{minHeight: '100px',}}>
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


                  <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        ADDRESS LINE 1*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" customer"
                            placeholder="Address Line 1"
                            onChange={(e) => setFormData({ ...formData, customer: e.value })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}

                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        ADDRESS LINE 2*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            
                            placeholder="Address Line 2"
                            name="customer"
                            onChange={(e) => setFormData({ ...formData, customer: e.value })}
                            defaultValue={formData.customer}
                          />
                           {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        CITY
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" customer"
                             placeholder="City"
                             onChange={(e) => setFormData({ ...formData, customer: e.value })}
                             defaultValue={formData.customer}

                          />
                           {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       ZIP/POSTAL CODE
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" customer"
                            placeholder="Zip/Postal Code"
                            onChange={(e) => setFormData({ ...formData, customer: e.value })}
                            defaultValue={formData.customer}

                              />
                            {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        PHONE
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" customer"
                            placeholder=" Phone Number"
                            onChange={(e) => setFormData({ ...formData, customer: e.value })}
                            defaultValue={formData.customer}
                          />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}

                         
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                     COUNTRY* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "INDIA", label: "INDIA" },
                              { value: "CHINA", label: "CHINA" },
                              { value: "AFRICA", label: "AFRICA" },
                              { value: "LONDON", label: "LONDON" },
                            
                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                             {errors.status && <span className="invalid">{errors.status.message}</span>}

                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                     
                        STATE/PROVINCE/REGION* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "TAMIL NADU", label: "TAMIL NADU" },
                              { value: "DELHI", label: "DELHI" },
                            
                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                                                      {errors.status && <span className="invalid">{errors.status.message}</span>}

                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      
                  <label className="form-label">AVATAR</label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p>Brand Logo</p>}
                              {files1.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>
                     

                    <Col size="12" >
                      <Button color="primary" type="submit">
                      
                        <span>SAVE</span>
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
export default Tickets;
