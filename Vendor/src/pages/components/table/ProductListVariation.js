import React, { useEffect, useState, forwardRef } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    BlockHead, BlockHeadContent, BlockTitle, ReactDataTable, PreviewCard, Button, Icon, UserAvatar, Row, Col, RSelect, Block, DataTableHead, CodeBlock, DataTableRow, Rating, PreviewTable,
} from "../../../components/Component";
import { DisputesTableData, DisputesTableDatasAttribute, disputesTableColumns, disputesTableColumns2, userData } from "../../components/table/TableData";
import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
// import MessageItem from "./MessageItem";

import ContentAlt from "../../../layout/content/ContentAlt";
import {
    FormGroup,
    Label,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Card,
    Modal,
    ModalBody,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { DisputesTableDatas } from "../../components/table/TableData";

import MaterialTable from 'material-table';
import { makeStyles, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
//
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useHistory, useLocation, Link } from "react-router-dom";
import axios from "axios";
// import { API_URL } from "../../../Api";

import { API_URL, API_Product, token } from "../../../Api";

const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    },
};

const ProductlistVariation = () => {

    const [AttrProductListColumnData, setAttrProductListColumnData] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        Getdata();
    }, []);
    const Getdata = async () => {
        if (location.state) {
            console.log("location state", location.state);
            const proddata = await axios.get(`${API_Product}/getproductvarietydata/${location.state}`, config)
            console.log(proddata.data.list, "llllll")
            setAttrProductListColumnData(proddata.data.list);
        }
    }

    const Tabletheme = () => createTheme({
        root: {
            "& MuiButtonBase": {
                display: 'block !important'
            }
        },

    });

    const [activeIconTab, setActiveIconTab] = useState("1");

    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    };

    // //
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
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    const [filter, setFilter] = useState(false);

    const options = {

        selection: true,
        actionsColumnIndex: -1,
        addRowPosition: "first",
        exportButton: true,
        paging: false,

        filtering: filter,
        filterCellStyle: {
            icon: 'filter_list',
        },
        rowStyle: x => {
            if (x.tableData.id % 2) {
                return { backgroundColor: "rgb(242 242 242)", textAlign: 'center', }
            }

        },

        textAlign: 'center',
        paddingLeft: '60px',
        columnsButton: true,
        maxBodyHeight: '400px',
        headerStyle: {
            backgroundColor: '#f2f2f2',
            border: '1px solid rgb(242 242 242)',
            borderBottom: '1px solid #c5c1c1',
            position: 'sticky',
            width: 'auto'
        }
    }



    const [modalEdit, setModalEdit] = useState(false);
    const [modalview, setModalview] = useState(false);
    const [modalFail, setModalFail] = useState(false);
    const toggleModalEdit = () => setModalEdit(!modalEdit);
    const toggleModalview = () => setModalview(!modalview);
    const toggleModalFail = () => setModalFail(!modalFail);


    const [smOption, setSmOption] = useState(false);

    
    const ViewTable = (id) => {
        // console.log("id is",id)
        history.push({ pathname: '/dashboard/product_list_view', state: id })
    }

    const viewlist = async () => {
        setModalview(true)
    }

    const DeleteOpen = () => {
        setModalFail(true);
    };



    const AttrProductListColumn = [
        { field: "productlist_id", title: "Variation ID" },
        { field: "AttributeType", title: "Variation Type1" },
        { field: "AttributeTypeValue", title: "Variation Type2" },
        // {
        //     field: "",
        //     title: "Action",
        //     render: (row) => (
                
        //         <ul className="gx-1 my-n1">
        //             {console.log("row",row)}
        //             <li className="mr-n1">
        //                 <UncontrolledDropdown>
        //                     <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
        //                         <Icon name="more-h"></Icon>
        //                     </DropdownToggle>
        //                     <DropdownMenu right>
        //                         <ul className="link-list-opt no-bdr">
        //                             {/* <li>
        //                                 <DropdownItem tag="a" href="#Edit" onClick={() => EditTable(row.productlist_id)}>
        //                                     <Icon name="edit"></Icon>
        //                                     <span>Edit</span>
        //                                 </DropdownItem>
        //                             </li> */}
        //                             {/* <li>
        //                                 <DropdownItem tag="a"  onClick={() => ViewTable(row.productlist_id)}>
        //                                     <Icon name="eye"></Icon>
        //                                     <span>View</span>
        //                                 </DropdownItem>
        //                             </li>
        //                             <li>
        //                                 <DropdownItem tag="a" href="#remove" onClick={() => DeleteOpen(row._id)}>
        //                                     <Icon name="trash"></Icon>
        //                                     <span>Remove</span>
        //                                 </DropdownItem>
        //                             </li> */}
        //                         </ul>
        //                     </DropdownMenu>
        //                 </UncontrolledDropdown>
        //             </li>
        //         </ul>
        //     ),
        // },
    ];
    return (
        <React.Fragment>
            <Content page="component">

                <div style={{ marginTop: "", background: "white", padding: "50px" }}>
                    <MuiThemeProvider theme={Tabletheme()}>
                        <MaterialTable icons={tableIcons}
                            columns={AttrProductListColumn}
                            data={AttrProductListColumnData}
                            title="Attribute List"
                            options={options}
                        />
                    </MuiThemeProvider>
                </div >

                <Modal isOpen={modalFail} toggle={toggleModalFail}>
                    <ModalBody className="modal-body-lg text-center">
                        <div className="nk-modal">
                            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
                            <h4 className="nk-modal-title">Do you want Delete!</h4>
                            <div className="nk-modal-action mt-5 d-flex justify-content-around">
                                <Button color="light" size="lg" className="btn-mw">
                                    Confirm
                                </Button>
                                <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={modalview} toggle={toggleModalview} className="modal-dialog-centered" size="lg">
                    <ModalBody>
                        <a className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={toggleModalview}
                            ></Icon>
                        </a>
                        <div className="p-2">
                            <h6 className="title text-left">Attribute</h6>
                            <div className="mt-4">
                                {/* <form onSubmit={handleSubmit(onFormSubmit)}> */}
                                <Row className="g-3">
                                    <Col className="row" md="12">
                                        <div class="col-lg-6" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                                            <span class="sub-text" style={{ fontWeight: "bold" }}> <span class="caption-text"></span></span>
                                        </div>


                                        {/* <div className="col-md-12 text-right">
                                            <Button color="light" size="lg" className="btn-mw" onClick={toggleModalview}>
                                                Cancel
                                            </Button>
                                        </div> */}
                                    </Col>

                                </Row>
                                {/* </form> */}
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={modalEdit} toggle={toggleModalEdit} className="modal-dialog-centered" size="lg">
                    <ModalBody>
                        <a className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={toggleModalEdit}
                            ></Icon>
                        </a>
                        <div className="p-2">
                            <h6 className="title text-left">Attribute</h6>
                            <div className="mt-4">
                                {/* <form onSubmit={handleSubmit(onFormSubmit)}> */}
                                <Row className="g-3">
                                    <Col className="row" md="12">
                                        <div class="col-lg-6" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                                            <span class="sub-text" style={{ fontWeight: "bold" }}> <span class="caption-text"></span></span>
                                        </div>


                                        {/* <div className="col-md-12 text-right">
                                            <Button color="light" size="lg" className="btn-mw" onClick={toggleModalview}>
                                                Cancel
                                            </Button>
                                        </div> */}
                                    </Col>

                                </Row>
                                {/* </form> */}
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </Content>
        </React.Fragment>

    );
};
export default ProductlistVariation;