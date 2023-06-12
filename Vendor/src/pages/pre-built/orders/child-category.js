import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import DatePicker from "react-datepicker";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import { orderData } from "./OrderData";
// import { messageData } from "../../app/messages/MessageData";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  Row,
  Col,
  RSelect,
} from "../../../components/Component";
import { getDateStructured } from "../../../utils/Utils";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, FormGroup, ModalBody } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";


const ChildCategory = () => {

//     const [data, setData] = useState(messageData);
//   const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();

  
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
      add :"",
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

  return (
    <div className="p-2" style={{marginTop: '80px'}}>
      <h5 className="title">Child Category</h5>
      <div className="mt-4">
      <form onSubmit={handleSubmit(onFormSubmit)} style={{background: 'white',padding: '20px'}}>
          <Row className="g-3 sub-cat-bg">
            
          

          <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Select Main Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Baby", label: "Baby Products" },
                              { value: "Mom", label: "Mom's Products" },
                              { value: "Child", label: "Child Products" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Select Sub Category 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Baby", label: "Baby Products" },
                              { value: "Mom", label: "Mom's Products" },
                              { value: "Child", label: "Child Products" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>


            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
                 Child Category Name*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Child Category Name"
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
                 Child Category Slug*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Child Category Slug"
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
                <label className="form-label" htmlFor="purchased">
                 Meta Title*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Meta Title"
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
              <label className="form-label">Meta Description</label>
              <textarea
                name="description"
                defaultValue={formData.description}
                placeholder="Enter Meta description"
                onChange={(e) => onInputChange(e)}
                className="form-control-xl form-control no-resize"
                ref={register({
                  required: "This field is required",
                })}
              />
              {errors.description && <span className="invalid">{errors.description.message}</span>}
            </FormGroup>
          </Col>

          <Col size="12">
                      <label className="form-label"> Upload Images </label>
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
                <span>SAVE </span>
              </Button>
            </Col>

          </Row>
        </form>
      </div>
    </div>
  );
};

export default ChildCategory;