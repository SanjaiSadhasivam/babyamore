import React, { useEffect, useState, forwardRef } from "react";

import "react-quill/dist/quill.snow.css";
import {
    BlockHead, BlockHeadContent, BlockTitle, ReactDataTable, PreviewCard, Button, Icon, UserAvatar, Row, Col, RSelect, Block, DataTableHead, CodeBlock, DataTableRow, Rating, PreviewTable,
} from "../../../components/Component";
import { ToastContainer, toast } from "react-toastify";
import MaterialTable from 'material-table';
import { makeStyles, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {
    FormGroup,
    Form,
    Input,
    Label,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Modal,
    ModalBody,
    Badge,
} from "reactstrap";
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
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API_URL, API_Product,API_Stock_update, token, API_Warehouse } from "../../../Api";
import axios from "axios";



const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    },
};

const AddStockListView = () => {

    const { errors, register, handleSubmit } = useForm();
    const [list, setList] = useState([])

    const [listprod, setlistprod] = useState([])
    const params = useParams();
    const paramsID = params.id;
    const Tabletheme = () => createTheme({
        root: {
            "& MuiButtonBase": {
                display: 'block !important'
            }
        },

    });
    const [stocklist, setstocklist] = useState({
        stockvalue: "",
        stockmessage: "",
    });
    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    };
    useEffect(() => {
        GetListdata();
    }, []);
   
    const [view, setView] = useState({
        add: false,
        details: false,
        delete: false,
        Viewdetails: false,
      });
      const [ID, setID] = useState("");
     const handleopenview = async (id) => {
      
        setID(id)
       setModalFail(true)
    }
      // function to close the form modal
  const onFormCancel = () => {
    setstocklist({
        stockvalue: "",
        stockmessage: "",
    })
    setID("");
  
    setView({ add: false, details: false, delete: false });
  };

    const onFormSubmit = (form) => {
        if (ID) {
            Edit(ID);
        }
    };

    const Edit = (id) => {
        let formData = new FormData();
        formData.append("stockvalue", stocklist.stockvalue);
        formData.append("stockmessage", stocklist.stockmessage);
        formData.append("id",ID);
        const configs = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };     
        axios.put(`${API_Stock_update}/${id}`, formData, configs).then((res) => {   
            onFormCancel(); 
            setModalFail(false);
            GetListdata();
            toast.success("Attributes Added Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        });  
        // window.location.href = `/dashboard/stock-list-view/${list.batchid}` 
        };

    const GetListdata = async () => {
        const Result = await axios.get(`${API_Product}/getStockData/${paramsID}`, config)
        setlistprod(Result.data.list)
        if (Result.data.list != "") {
            Result.data.list.map(async (MainItem, Index) => {
                const Datas = {
                    attributeid: MainItem.productlist_id,
                    batchid: MainItem.batch_id,
                    warehousename: MainItem.warehouse_name,
                    currentstock: MainItem.current_stock,
                    stockvalue: MainItem.stock_value,
                    productname: MainItem.productname,
                    expirydate: MainItem.expiry_date,
                };
                setList(Datas);
            });
        }

    }



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
   
    const disputesTableColumnsmain = [
        { title: 'Attribute ID', field: 'productlist_id' },
        { title: 'Attribute Type 1', field: 'AttributeType2' },
        { title: 'Attribute Type 2', field: 'AttributeType1' },
        { title: 'Current Stock', field: 'current_stock' },
        { title: 'Stock Value', field: 'stock_value' },
        {
            field: "",
            title: "Action",
            render: (row) => (
                <ul className="gx-1 my-n1">
                    <li className="mr-n1">
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                <li onClick={() => handleopenview(row.id)}>
                                        <DropdownItem tag="a" >
                                            <Icon name="edit"></Icon>
                                            <span>Edit</span>
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


    const [producttable, setproducttable] = useState(false);
    const ProductID = (item) => {
        const ProductId = item.value;

        if (ProductId === "Test1" || "Test2" || "Test3") {
            setproducttable(true)
        }
        else {

            setproducttable(false);
        }
    }

    const [producttable1, setproducttable1] = useState(false);
    const [producttable2, setproducttable2] = useState(false);

    const StockProductID2 = (item) => {
        const ProductId2 = item.value;

        setstocklist({
            ...stocklist,
            warehouse: ProductId2,
        })
    }
    const [modalFail, setModalFail] = useState(false);
    const toggleModalFail = () => setModalFail(!modalFail);
    const handleChangeStock = ({ target: { name, value } }) => {
        setstocklist({ ...stocklist, [name]: value });
    };
    return (
        <React.Fragment>
            <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ backgroundColor: "crimson" }}
      />
      <ToastContainer />
            <div style={{ marginTop: '80px' }} className="p-5">
                <div className="p-4 mb-5" style={{ backgroundColor: "white" }}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                            <h5>STOCK</h5>
                        </label>
                    </div>

                    <Row>
                        <Col md="4" style={{ margin: "0", padding: "0" }}>
                            <div className="form-control-wrap">
                                <label className="form-label" htmlFor="paid">
                                    Batch Number
                                </label>
                                <input
                                    readOnly
                                    type="text"
                                    value={list.batchid}

                                    className="form-control"

                                    name="ProductExpiryDate"

                                />

                            </div>
                        </Col>
                        <Col md="4" style={{ margin: "0", padding: "0" }}>
                            <div className="form-control-wrap">
                                <label className="form-label" htmlFor="paid">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={list.productname}

                                    className="form-control"
                                    // placeholder="Enter From Date"
                                    name="ProductExpiryDate"

                                />

                            </div>
                        </Col>
                        <Col md="4" style={{ margin: "0", padding: "0" }}>
                            <div className="form-control-wrap">
                                <label className="form-label" htmlFor="paid">
                                    WareHouse Name
                                </label>
                                <input
                                    readOnly
                                    value={list.warehousename}
                                    type="text"
                                    className="form-control"
                                    // placeholder="Enter From Date"
                                    name="ProductExpiryDate"

                                />

                            </div>
                        </Col>

                    </Row>
                </div>

                <Modal isOpen={modalFail} toggle={toggleModalFail}>
                    <ModalBody className="modal-body text-center">
                        <div className="d-flex justify-content-between">

                            <h5>Edit</h5>
                            <a href="#cancel" className="close">
                                {" "}
                                <Icon
                                    name="cross-sm"
                                    onClick={() => {
                                        setModalFail(false)
                                    }}
                                ></Icon>
                            </a>
                        </div>
                        <Form onSubmit={handleSubmit(onFormSubmit)}>
                            <Row className="mt-5">
                                <Col md="12">
                                    <FormGroup>
                                        <Label className="form-label d-flex justify-content-start" htmlFor="fv-subject">
                                            No.of Product Stocks
                                        </Label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="fv-subject"
                                                value={stocklist.stockvalue}
                                                name="stockvalue"
                                                onChange={handleChangeStock}
                                                className="form-control"
                                                placeholder="Enter No. of stock                                                 "
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="12" className='mt-3'>
                                    <FormGroup>
                                        <Label className="form-label d-flex justify-content-start" htmlFor="fv-subject">
                                            Removing Message
                                        </Label>
                                        <div className="form-control-wrap">
                                            <textarea
                                                type="text"
                                                id="fv-subject"
                                                value={stocklist.stockmessage}
                                                name="stockmessage"
                                                onChange={handleChangeStock}
                                                className="form-control"
                                                placeholder="Enter a message"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md="12" className="d-flex justify-content-end mt-4 ">
                                        <Button color="primary" type='submit' size="sm">
                                            SUBMIT
                                        </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
                <MuiThemeProvider theme={Tabletheme()}>
                    <MaterialTable
                        title="Stock List"
                        icons={tableIcons}
                        columns={disputesTableColumnsmain}
                        options={options}
                        data={listprod}

                        editable={{


                        }}


                    />
                </MuiThemeProvider>
                {/* </>
                        : <></>
                } */}
                {
                    producttable2 ?
                        <>
                            <MuiThemeProvider theme={Tabletheme()}>
                                <MaterialTable
                                    title="Stock List"
                                    icons={tableIcons}
                                    columns={columns2}
                                    options={options}
                                    data={data2}




                                />
                            </MuiThemeProvider>
                        </>
                        : <></>
                }
                <div className="p-4 mt-5 mb-3" style={{ backgroundColor: "white" }}>
                    <Row>


                        <Col md="4" style={{ margin: "0", padding: "0" }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="purchased">
                                    Product Expiry Date
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-control"
                                        placeholder="Enter From Date"
                                        name="ProductExpiryDate"
                                        value={list.expirydate}
                                    />

                                </div>
                            </div>
                        </Col>



                    </Row>
                </div>
            </div>

        </React.Fragment>
    );
};
export default AddStockListView;




