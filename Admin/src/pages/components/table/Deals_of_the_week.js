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

import classnames from "classnames";

import { messageData } from "./MessageData";

import { DisputesTableDatabanner, disputesTableColumnbanner, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import { FormGroup, Label, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";


const DealsOfTheWeek = () => {

  const [activeIconTab, setActiveIconTab] = useState("1");

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const { errors, register, handleSubmit } = useForm();

  const onFormSubmitsvalue = () => {

  }

  const [section, SetSection] = useState({
    one: false,
    two: false,
    three: false,
    four: false
  });

  const handleSectionChange = (item) => {
    const sections = item.value;
    // console.log("item", sections);

    if (sections === "One") {
      SetSection({
        one: true
      })
    }
    else if (sections === "Two") {
      SetSection({
        two: true
      })
    }
    else if (sections === "Three") {
      SetSection({
        three: true
      })
    }
    else if (sections === "Four") {
      SetSection({
        four: true
      })
    }
  }


  return (
    <React.Fragment>
      <Head title="Popular Categories" />
      <Content page="component">
        <Block size="lg">
          <PreviewCard>
            <Nav tabs>

              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "1" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("1");
                  }}
                >
                  <span>Add Banner</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "2" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("2");
                  }}
                >
                  {/* <span>Add Product</span> */}
                </NavLink>
              </NavItem>

            </Nav>
          </PreviewCard>
          <PreviewCard>
            {/* <form onSubmit={handleSubmit(onFormSubmitsvalue)}> */}
            <TabContent activeTab={activeIconTab}>
              <TabPane tabId="1">
                <Row className="mb-4">
                  <Col md="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="status">
                        Select No of Sections
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="status"
                          options={[
                            { value: "One", label: "1" },
                            { value: "Two", label: "2" },
                            { value: "Three", label: "3" },
                            { value: "Four", label: "4" },
                          ]}
                          onChange={handleSectionChange}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="8">

                  </Col>
                </Row>

                {/* Label One */}
                {
                  section.one === true ?
                    <>
                      <div>
                        <Row className="mb-4">
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12" className="d-flex justify-content-end">
                            <Button color="primary" type="submit">
                              <Icon className="plus"></Icon>
                              <span>SAVE </span>
                            </Button>
                          </Col>
                        </Row>
                      </div>

                    </>
                    :
                    <>
                    </>
                }

                {/* Label Two */}

                {
                  section.two === true ?
                    <>
                      <div>
                        <Row className="mb-4">
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12" className="d-flex justify-content-end">
                            <Button color="primary" type="submit">
                              <Icon className="plus"></Icon>
                              <span>SAVE </span>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </>

                    :

                    <>

                    </>
                }


                {/* Label Three */}

                {
                  section.three === true ?
                    <>
                      <div>
                        <Row className="mb-4">
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12" className="d-flex justify-content-end">
                            <Button color="primary" type="submit">
                              <Icon className="plus"></Icon>
                              <span>SAVE </span>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </>
                    :
                    <>
                    </>
                }


                {/* Label Four */}

                {
                  section.four === true ?
                    <>
                      <div>
                        <Row className="mb-4">
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <label className="form-label">Banner Image</label>
                              <div className="d-flex justify-content-center align-items-center" style={{ border: "1px dashed #e5e9f2" }}>

                                <input type="file" id="file-upload"
                                  // disabled={file.length === 1}
                                  name="BrandLogo"
                                  className="form-control"
                                  // onChange={uploadSingleFile} 
                                  style={{
                                    border: "none",
                                    opacity: "0",
                                    zindex: "-1",
                                    position: "absolute",
                                    width: "200px"

                                  }} />
                                <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                              </div>
                            </div>

                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="customer">
                                Enter URL
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  className="form-control"
                                  name=" Enter Full Name*"
                                  placeholder="Enter URL..."
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12" className="d-flex justify-content-end">
                            <Button color="primary" type="submit">
                              <Icon className="plus"></Icon>
                              <span>SAVE </span>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </> :
                    <></>
                }

              </TabPane>
              <TabPane tabId="2">

                <Row className="mb-4">
                  <Col md="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="status">
                        Select the Product
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="status"
                          isMulti={true}
                          options={[
                            { value: "Product1", label: "Product 1" },
                            { value: "Product2", label: "Product 2" },
                            { value: "Product3", label: "Product 3" },
                            { value: "Product4", label: "Product 4" },
                          ]}
                        // onChange={handleSectionChange}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="8">

                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      <Icon className="plus"></Icon>
                      <span>SAVE </span>
                    </Button>
                  </Col>
                </Row>

              </TabPane>
            </TabContent>
            {/* </form> */}
          </PreviewCard>
        </Block>


      </Content>
    </React.Fragment>
  );
};
export default DealsOfTheWeek;
