import React, { useEffect, useState, forwardRef } from "react";

import "react-quill/dist/quill.snow.css";

import { Row, Col, RSelect, Icon } from "../../../components/Component";
// import { Button, FormGroup } from "reactstrap";


import MaterialTable from "material-table";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { Link, useHistory } from "react-router-dom";
import Bathing from "../../../images/avatar/bath.jpg";
import BottleFeeding from "../../../images/avatar/bottle-feed.jpg";
import Diapers from "../../../images/avatar/diapers.jpg"
import OralHealth from "../../../images/avatar/oralhealth.jpg"
// import { Block, BlockHead, BlockHeadContent,  } from "../../../components/Component";
import { messageData } from "./MessageData";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Button,
    Modal,
    ModalBody,
} from "reactstrap";
// import axios from "axios";
// import { API_URL } from "../../../Api";

const AddShipping = () => {

    const [smOption, setSmOption] = useState(false);
    // Material Table
    const [filter, setFilter] = useState(false);

    const [view, setView] = useState({
        add: false,
    });

    const onFormCancel = () => {
        setView({ add: false });
        // resetForm();
    };

    const toggle = (type) => {

        setView({
            add: type === "add" ? true : false,

        });
    };

    const Tabletheme = () =>
        createTheme({
            root: {
                "& MuiButtonBase": {
                    display: "block !important",
                },
            },
        });

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    };

    const options = {
        selection: true,
        actionsColumnIndex: -1,
        addRowPosition: "first",
        exportButton: true,
        paging: false,

        filtering: filter,
        filterCellStyle: {
            icon: "filter_list",
        },
        rowStyle: (x) => {
            if (x.tableData.id % 2) {
                return { backgroundColor: "rgb(242 242 242)", textAlign: "center" };
            }
        },

        textAlign: "center",
        paddingLeft: "60px",
        columnsButton: true,
        maxBodyHeight: "400px",
        headerStyle: {
            backgroundColor: "#f2f2f2",
            border: "1px solid rgb(242 242 242)",
            borderBottom: "1px solid #c5c1c1",
            position: "sticky",
            width: "auto",
        },
    };



    const AttrValueColumnsData = [
        {

            Kg: "0 - 1",
            Fees: "10",
        },
        {

            Kg: "1 - 5",
            Fees: "40",
        },

    ];

    const disputesTableColumnsmain = [

        // { field: "FessCharges", title: "Fees Charges (Kg)" },
        { field: "Kg", title: "Kg" },
        { field: "Fees", title: "Fees" },

        {
            field: "",
            title: "Action",
            render: (row) => (
                <ul className="gx-1 my-n1">
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
                                    <li>
                                        <DropdownItem
                                            tag="a"
                                        // href="#edit"
                                        // onClick={() => EditTable(row._id)}
                                        >
                                            <Icon name="edit"></Icon>
                                            <span>Edit</span>
                                        </DropdownItem>
                                    </li>

                                    <li>
                                        <DropdownItem
                                            tag="a"
                                        // href="#remove"
                                        // onClick={() => DeleteOpen(row._id)}
                                        >
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

    return (
        <div className="p-2" style={{ margin: "80px 30px 0px 30px" }}>
            <h5 className="title">Shipping</h5>
            <div className="mt-4">
                <form style={{ background: 'white', padding: '30px', marginBottom: "30px" }}>
                    <Row className="mb-4">
                        <Col md="6" className="mb-4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Delivery Partner Name
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Delivery Partner Name"
                                        name=""
                                    // disabled
                                    />

                                </div>
                            </div>
                        </Col>
                        <Col md="6" className="mb-4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Pincode
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Pincode"
                                        name=""
                                    // disabled
                                    />

                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <label className="form-label"> Delivery Partner Image </label>
                            <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                                    <input type="file" id="file-upload"
                                        // disabled={file.length === 1}
                                        name=""
                                        className="form-control"
                                        style={{
                                            border: "none",
                                            opacity: "0",
                                            zindex: "-1",
                                            position: "absolute",
                                            width: "200px"

                                        }} />
                                    {/* <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label> */}
                                </div>
                            </div>
                        </Col>

                        



                        <Col md="12" className="d-flex justify-content-end">
                            <Button color="primary" type="">
                                <span>SAVE</span>
                            </Button>
                        </Col>

                    </Row>


                </form>
            </div>

            <div className="heading-flex justify-content-end mb-3">


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
                                    <span>Add Fee</span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <MuiThemeProvider theme={Tabletheme()}>
                <MaterialTable
                    icons={tableIcons}
                    // data={data}
                    // columns={disputesTableColumnsmain}
                    data={AttrValueColumnsData}
                    columns={disputesTableColumnsmain}
                    title="SHIPPING"
                    options={options}
                    actions={[
                        {
                            icon: 'delete',
                            tooltip: 'Delete All Rows',
                            //   onClick: (event, rowData) => {
                            //     // Do save operation
                            //     alert("delete button clicked");
                            //   }
                        }
                    ]}
                />
            </MuiThemeProvider>



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
                        <h5 className="title">Add Fee</h5>
                        <div className="mt-4">
                            {/* <form onSubmit={handleSubmit(onFormSubmitBrand)}> */}

                            <Row>
                                <Col md="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="purchased">
                                            Kilogram(From)
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Kilogram(From)"
                                                name=""
                                            // onChange={handleChangeProduct}

                                            // value={Product.ProductExpiryDate}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="purchased">
                                            Kilogram(To)
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Kilogram(To)"
                                                name=""
                                            // onChange={handleChangeProduct}

                                            // value={Product.ProductExpiryDate}
                                            />

                                        </div>
                                    </div>
                                </Col>

                                <Col md="6 mt-3">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="purchased">
                                            Fee
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Fee"
                                                name=""
                                            // onChange={handleChangeProduct}

                                            // value={Product.ProductExpiryDate}
                                            />

                                        </div>
                                    </div>
                                </Col>
                                <Col md="12" className="d-flex justify-content-end mt-3">
                                    <Button color="primary" type="">
                                        <span>SAVE</span>
                                    </Button>
                                </Col>
                            </Row>

                        
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    );
};

export default AddShipping;
