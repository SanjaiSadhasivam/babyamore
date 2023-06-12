import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";





import { BlockHead, BlockHeadContent, BlockTitle, ReactDataTable, PreviewCard, Button, Icon, UserAvatar, Row, Col, RSelect, Block, DataTableHead, DataTableRow, } from "../../../components/Component";
import { DisputesTableData, disputesTableColumns, disputesTableColumns2, userData } from "../../components/table/TableData";
import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
import MessageItem from "./MessageItem";
import ContentAlt from "../../../layout/content/ContentAlt";
import { FormGroup, Label, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";

const Merchants = () => {
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
      setTabData(basic)
    } else if (filterTab === "2") {
      setTabData(formatsss)
    } else if (filterTab === "3") {
      setTabData(support)
    } else if (filterTab === "4") {
      setTabData(house)
    }
    else if (filterTab === "5") {
      setTabData(settings)
    }
    else if (filterTab === "6") {
      setTabData(terms)
    }
    else if (filterTab === "7") {
      setTabData(roles)
    }
    else {
      setTabData(review)
    }
  }, [filterTab]);

  const onchangereview = ({ target: { name, value } }) => {
    setReview({ ...Review, [name]: value });



  }
  const ReviewClick = () => {
    if (Review.reviewmsg) {

      setReviewerror(null)

    } else {
      setReviewerror("* This field is required")
    }

  }
  const basic = () => {
    return (
      <div className="p-2" style={{ backgroundColor: 'white', margin: '10px 20px' }}>

        <div className="mt-4">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="g-3">
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    Name of Business / Company *
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder=" Name of Business / Company *"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    Business / Company Number*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      className="form-control"
                      name="customer"
                      placeholder="Phone Number"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    Website
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder="Website"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>

              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="default-textarea" className="form-label">
                    ADDRESS
                  </Label>
                  <div className="form-control-wrap">
                    <textarea
                      className="no-resize form-control"
                      type="textarea"
                      id="default-textarea"
                      defaultValue="Address"
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="paid">
                    STATE *
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "Andhra Pradesh", label: "Andhra Pradesh" },
                        { value: "West Bengal", label: "West Bengal" },
                        { value: "Uttarakhand", label: "Uttarakhand" },
                        { value: "Uttar Pradesh", label: "Uttar Pradesh" },
                        { value: "Tripura", label: "Tripura" },
                        { value: "Tamil Nadu", label: "Tamil Nadu" },
                        { value: "Sikkim", label: "Sikkim" },
                        { value: "Punjab", label: "Punjab" },
                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>

              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    NAME
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder="Title"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    SKU*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="SKU"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="paid">
                    BRAND
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "Johnson & Johnson", label: "Johnson & Johnson" },
                        { value: "Mother Care", label: "Mother Care" },
                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    HSN*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="HSN"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    WEBSITE
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Website"
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
                  <label className="form-label">DESCRIPTION </label>
                  <div className="text-editor" style={{ minHeight: '100px', }}>
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
              <Col size="12">
                <FormGroup>
                  <label className="form-label"> <h6> UPLOAD IMAGES  </h6></label>

                </FormGroup>
              </Col>

              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="paid">
                    THUMBNAILS
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>
              <Col size="12">

                <label className="form-label"> UPLOAD IMAGES </label>
                <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className="dropzone upload-zone small my-2 dz-clickable"
                      >
                        <input {...getInputProps()} />
                        {files1.length === 0 && <p>Drop some files here</p>}
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

              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    CATEGORY
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category"
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
                  <label className="form-label" htmlFor="paid">
                    SIZE CHART
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "12 Month", label: "12 Month" },
                        { value: "06 Month", label: "06 Month" },
                        { value: "03 Month", label: "03 Month" },
                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Website"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div> */}
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    <h6>PRIMARY VARIANT INFORMATION  </h6>
                  </label>
                  {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    <h6>  SECONDARY VARIANT INFORMATION </h6>
                  </label>
                  {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    <h5>  PRICE DATA  </h5>

                  </label>
                  {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                </div>
              </Col>
              <Col md="3">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    ENTER MRP*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder="Enter MRP"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    ENTER DISCOUNT (%)*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder=" Enter Discount(%)*"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    ENTER SELLING PRICE *
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder=" Enter Selling Price"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>

              <Col md="3">
                <div className="form-group">
                  <label className="form-label" htmlFor="paid">
                    INVOICE TAX (%)
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">

                  <label className="form-label" htmlFor="customer">

                    <h5>PACKAGE INFORMATION   </h5>
                  </label>
                  {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                </div>
              </Col>
              <Col md="6"><label className="form-label" htmlFor="customer">
                ENTER L*B*H(PACKAGE VOLUME)
              </label>
                <div className="form-group" style={{ display: 'flex', }}>

                  <div className="form-control-wrap" style={{ paddingRight: '20px', }} >
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder=" Length"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                  <div className="form-control-wrap" style={{ paddingRight: '20px', }}>
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder=" Breadth"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                  <div className="form-control-wrap" style={{ paddingRight: '20px', }}>
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      placeholder=" Height"
                      onChange={(e) => onInputChange(e)}
                      ref={register({
                        required: "This field is required",
                      })}
                      defaultValue={formData.customer}
                    />
                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                  </div>
                </div>
              </Col>

              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    DeEFINE PACKAGE WEIGHT
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Define Package Weight"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    MINIMUM TIME TO KEEP TO THE PACKAGE READY FOR SHIPPING*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the Time"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    NUMBER OF ITEMS IN THE PACKAGE
                  </label>
                  <div className="form-control-wrap" style={{ marginTop: '22px', }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the Number"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    ENTER ITEMS DETAILS IN THE PACKAGE
                  </label>
                  <div className="form-control-wrap" style={{ marginTop: '22px', }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the Details"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">

                    <h5> SPECFICATIONS*  </h5>
                  </label>
                  {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="paid">
                    ENTER THE COUNTRY OF ORIGIN
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "EAN", label: "EAN" },
                        { value: "ISBN", label: "ISBN" },
                        { value: "ITF", label: "ITF" },
                        { value: "JAN", label: "JAN" },
                        { value: "UPC", label: "UPC" },

                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">

                    <h5>  SETTINGS* </h5>
                  </label>
                  {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    ACTUAL STOCK QUANITY
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" Enter Actual Stock Quanity"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>

              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    MINIMUM STOCK QUANITY
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" Enter Minimum Stock Quanity"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>


              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="paid">
                    CUSTOMIZABLE
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "EAN", label: "EAN" },
                        { value: "ISBN", label: "ISBN" },
                        { value: "ITF", label: "ITF" },
                        { value: "JAN", label: "JAN" },
                        { value: "UPC", label: "UPC" },

                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>
              <Col size="6">
                <FormGroup style={{ display: 'flex', justifyContent: 'space-around', }}>
                  <Label htmlFor="default-2" className="form-label">
                    STATUS: ?
                  </Label>
                  <div className="g">
                    <div className="custom-control custom-control-sm custom-radio" >
                      <input
                        type="radio"
                        className="custom-control-input form-control"
                        name="radioSize"
                        id="customRadio7"
                      />
                      <label className="custom-control-label" htmlFor="customRadio7">
                        Active
                      </label>
                    </div>
                  </div>
                  <div className="g">
                    <div className="custom-control custom-control-sm custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input form-control"
                        name="radioSize"
                        id="customRadio8"
                      />
                      <label className="custom-control-label" htmlFor="customRadio8">
                        Inactive
                      </label>
                    </div>
                  </div>

                </FormGroup>
              </Col>
              <Col size="6">
                <FormGroup style={{ display: 'flex', justifyContent: 'space-around', }}>
                  <Label htmlFor="default-2" className="form-label">
                    PUBLISHED STATUS?
                  </Label>
                  <div className="g">
                    <div className="custom-control custom-control-sm custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input form-control"
                        name="radioSize"
                        id="customRadio7"
                      />
                      <label className="custom-control-label" htmlFor="customRadio7">
                        Published
                      </label>
                    </div>
                  </div>
                  <div className="g">
                    <div className="custom-control custom-control-sm custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input form-control"
                        name="radioSize"
                        id="customRadio8"
                      />
                      <label className="custom-control-label" htmlFor="customRadio8">
                        Un Published
                      </label>
                    </div>
                  </div>

                </FormGroup>
              </Col>
              <Col size="6">
                <FormGroup style={{ display: 'flex', justifyContent: 'space-around', }}>
                  <Label htmlFor="default-2" className="form-label">
                    FEATURED IN STORE: ?
                  </Label>
                  <div className="g">
                    <div className="custom-control custom-control-sm custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input form-control"
                        name="radioSize"
                        id="customRadio7"
                      />
                      <label className="custom-control-label" htmlFor="customRadio7">
                        Yes
                      </label>
                    </div>
                  </div>
                  <div className="g">
                    <div className="custom-control custom-control-sm custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input form-control"
                        name="radioSize"
                        id="customRadio8"
                      />
                      <label className="custom-control-label" htmlFor="customRadio8">
                        No
                      </label>
                    </div>
                  </div>

                </FormGroup>
              </Col>

              <Col md="6">
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    FILTER TAGS
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" Select Filter Tags"
                      name="purchased"
                      ref={register({ required: "This is required" })}
                      defaultValue={formData.purchased}
                    />
                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                  </div>
                </div>
              </Col>


              <Col size="12">
              </Col>

              <Col size="4">
                <Button color="primary" type="submit">
                  <span>SAVE</span>
                </Button>
              </Col>

              {/* <Col size="6">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Previous</span>
                      </Button>
                    </Col>
                    <Col size="6" style={{ left: '415px' }}>
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Next</span>
                      </Button>
                    </Col>  */}
            </Row>
          </form>
        </div>
      </div>
    )
  }

  const formatsss = () => {
    return (
      <div className="p-2" style={{ backgroundColor: 'white', margin: '10px 20px' }}>
        <h5 className="title">PACK OF 01 </h5>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="g-3">



              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    NAME*
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the Name"
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
                  <label className="form-label">DESCRIPTION </label>
                  <div className="text-editor" style={{ minHeight: '100px', }}>
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
              <Col size="12">
                <FormGroup>
                  <label className="form-label"> <h6> UPLOAG IMAGES </h6></label>

                </FormGroup>
              </Col>

              <Col md="4" >
                <div className="form-group" style={{ left: '700px', }}>
                  <label className="form-label" htmlFor="paid">
                    THUMBNAILS
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="paid"
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                      ]}
                      onChange={(e) => setFormData({ ...formData, paid: e.value })}
                      defaultValue={formData.paid}
                    />
                  </div>
                </div>
              </Col>
              <Col size="12">

                <label className="form-label"> UPLOAD IMAGES </label>
                <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className="dropzone upload-zone small my-2 dz-clickable"
                      >
                        <input {...getInputProps()} />
                        {files1.length === 0 && <p>Drop some files here</p>}
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











              <Col size="4">
                <Button color="primary" type="submit">
                  <span>SAVE</span>
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    )
  }

  const support = () => {
    return (
      <div className="p-2" style={{ backgroundColor: 'white', margin: '10px 20px' }}>

        <div className="mt-4">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="g-3">



              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="purchased">
                    TITLE*
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
                    META KEYWORDS
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
                  <label className="form-label">DESCRIPTION</label>
                  <div className="text-editor" style={{ minHeight: '100px', }}>
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
              <Col size="6">
              </Col>














              <Col size="4">
                <Button color="primary" type="submit">
                  <span>SAVE</span>
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
    )
  }

  const house = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm">

          </BlockHead>

          <Block size="lg">

            <PreviewCard>
              <ReactDataTable data={DisputesTableData} columns={disputesTableColumns} expandableRows pagination actions />
            </PreviewCard>
          </Block>


        </Content>
      </React.Fragment>
    )
  }
  const settings = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm">

          </BlockHead>

          <Block size="lg">

            <PreviewCard>
              <ReactDataTable data={DisputesTableData} columns={disputesTableColumns} expandableRows pagination actions />
            </PreviewCard>
          </Block>


        </Content>
      </React.Fragment>
    )
  }
  const terms = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm">

          </BlockHead>

          <Block size="lg">

            <PreviewCard>
              <ReactDataTable data={DisputesTableData} columns={disputesTableColumns} expandableRows pagination actions />
            </PreviewCard>
          </Block>


        </Content>
      </React.Fragment>
    )
  }
  const roles = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm">

          </BlockHead>

          <Block size="lg">

            <PreviewCard>
              <ReactDataTable data={DisputesTableData} columns={disputesTableColumns} expandableRows pagination actions />
            </PreviewCard>
          </Block>


        </Content>
      </React.Fragment>
    )
  }


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
                    onClick={() => { setRating(index) }}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>



            <form id="ratingForm">
              <input type="hidden" name="csrfmiddlewaretoken" defaultValue="INWn7wDxlGq0JEOtUP0bK5v83DSzBjxZQzNCkALV7e0ROP6qSYfusgbWtQD3nHlT" />
              <div className="row m-0">

                <p className="review_error_msg error_msg_rating text-red" />
                <div className="col-md-12 px-0 card-body pt-4 h-100 pb-2 border-top mt-3">
                  <h5 className="pb-2 f-14 fw-600 text-grey">Review</h5>
                  <div className="login_alert">
                    <textarea rows={4} id="review" className=" w-100 border p-2 mb-3" placeholder="Write a review" name="reviewmsg" onChange={onchangereview} value={Review.reviewmsg} />
                    <p className="error_msg_comments text-red"></p>
                  </div>
                  <Col size="4">
                    <Button color="primary" type="submit">
                      <span>SAVE</span>
                    </Button>
                  </Col>
                </div>
                <p className="review_error_msg error_msg_comments text-red" />
              </div>
            </form>

          </div>
        </div>
      </div>

    )
  }

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
                    BASIC INFO
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    COMPANY
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    BANK
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "4" && " active"}`} onClick={() => setFilterTab("4")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    ORDER POC
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "5" && " active"}`} onClick={() => setFilterTab("5")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    WAREHOUSE dddd
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "6" && " active"}`} onClick={() => setFilterTab("6")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    SETTINGS
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "7" && " active"}`} onClick={() => setFilterTab("7")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    TERMS
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "8" && " active"}`} onClick={() => setFilterTab("8")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    STAFF & ROLE
                  </a>
                </li>



              </ul>
            </div>

            <Simplebar className="nk-msg-list">
              {tabData}
            </Simplebar>


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
export default Merchants;