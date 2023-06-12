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

import { DisputesTableDatabanner, disputesTableColumnbanner, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import { FormGroup, Label, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";

const FeatureBrandBanner = () => {

    const [data, setData] = useState(messageData);

    //   const [state, setState] = useState({ value: null });
    //   const handleChange = value => {
    //     setState({ value });
    //   };

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
        //     const { customer, purchased, total } = form;
        //     let submittedData = {
        //       id: data.length + 1,
        //       orderId: "95981",
        //       date: getDateStructured(formData.date),
        //       status: formData.status,
        //       customer: customer,
        //       purchased: purchased,
        //       total: total,
        //       check: false,
        //     };
        //     setData([submittedData, ...data]);
        //     setView({ add: false, details: false });
        //     resetForm();
    };
    const [files1, setFiles1] = useState([]);

    //   const handleDropChange1 = (acceptedFiles) => {
    //     setFiles1(
    //       acceptedFiles.map((file) =>
    //         Object.assign(file, {
    //           preview: URL.createObjectURL(file),
    //         })
    //       )
    //     );
    //   };

    //   const resetForm = () => {
    //     setFormData({...formData,
    //       id: null,
    //       orderId: "",
    //       date: new Date(),
    //       status: "",
    //       customer: "",
    //       purchased: "",
    //       total: "",
    //       check: false,
    //     });
    //   };


    const { errors, register, handleSubmit } = useForm();

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
    // console.log("section one", section.one)

    return (
        <React.Fragment>
            <Head title="Featured Brands" />
            <Content page="component">
                <BlockHead size="lg" wide="sm">

                </BlockHead>
                <Block size="lg">
                    <BlockHead>
                        <BlockHeadContent>

                            <div className="heading-flex d-flex justify-content-between">
                                <div>

                                    <BlockTitle tag="h4">Banner</BlockTitle>

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
                                                    <span>Add Banner</span>
                                                </Button>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </BlockHeadContent>
                    </BlockHead>
                    <BlockBetween></BlockBetween>
                    <PreviewCard>
                        <ReactDataTable
                            data={DisputesTableDatabanner}
                            columns={disputesTableColumnbanner}
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
                                {/* <form onSubmit={handleSubmit(onFormSubmit)}> */}
                                <Row className="mb-4">
                                    <Col md="6">
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
                                    <Col md="6">

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



                                {/* </form> */}
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
                                                    // onChange={(e) => setFormData({ ...formData, status: e.value })}
                                                    // defaultValue={formData.status}
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
                                                    // onChange={(e) => setFormData({ ...formData, status: e.value })}
                                                    // defaultValue={formData.status}
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
export default FeatureBrandBanner;
