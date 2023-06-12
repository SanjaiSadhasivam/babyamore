import React, { useEffect, useState, forwardRef } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { Link, NavLink, useHistory } from "react-router-dom";
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
// import PreviewIcon from '@mui/icons-material/Preview';
import classnames from "classnames";
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
    input,
    CustomDataTable,
} from "../../../components/Component";
import {
    DisputesTableData,
    DisputesTableData2s11,
    DisputesTableDataod1,
    disputesTableColumns2,
    disputesTableColumnsdd,
    disputesTableColumnsdd1,
    userData,
} from "./TableData";
import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
import ContentAlt from "../../../layout/content/ContentAlt";
import {
    FormGroup,
    Label,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Badge,
    Modal,
    ModalBody,
    Form,
    Input,
} from "reactstrap";
import { useCookies } from "react-cookie";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL, token, API_Home_Page_Section, API_Order, API_Product } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const AllOrders = () => {

    const [OrderData, setOrderData] = useState([]);
    const [fromdate, setFromDate] = useState('')
    const [todate, setToDate] = useState('')
    const [shiptype, setShipType] = useState('')
    const [shipcompany, setShipCompany] = useState('')
    const [sku, setSku] = useState('')
    const [customers, setCustomer] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies();
    useEffect(() => {
        Getdata();
    }, []);


    const Getdata = async () => {
        // console.log("all order")
        const Result = await axios.get(`${API_Order}`, config);
        // setOrderData(Result.data.list);

        const getd = Result.data.list.filter((currEle) => currEle.vendor_id == cookies.vendor_id);
        setOrderData(getd);
    }
    const handleFromDateChange = async (e) => {
        setFromDate(e.target.value)
    }

    const handleToDateChange = (e) => {
        // console.log(e.target.value, "from date");
        // setFilterData({ ...FilterData, to_date: e.target.value })
        setToDate(e.target.value)
    }
    const handleShipmentType = (e) => {
        // console.log(e, "shipment type");
        setShipType(e)
    }
    const handleShipCmpany = (e) => {
        // console.log(e, "shipment company");
        setShipCompany(e)
    }
    const handleSku = (e) => {
        // console.log(e.target.value, "e tar");
        setSku(e.target.value)
    }
    const handleCustomer = (e) => {
        // console.log("eee", e.target.value);
        setCustomer(e.target.value)
    }

    // const handleOnchangeFilter = (e, type) => {
    //     console.log("type", type)
    //     // console.log("e",e)
    //     if (type == "fromdate") {
    //         setFromDate(e.target.value);
    //     }
    //     else if (type == "todate") {
    //         setToDate(e.target.value)
    //     }
    //     else if (type == "shippingType") {
    //         setShipType(e)
    //     }
    //     else if (type == "shippingCompany") {
    //         setShipCompany(e)
    //     }
    //     else if (type == "sku") {
    //         setSku(e.target.value)
    //     }
    //     else if (type == "customer") {
    //         setCustomer(e.target.value)
    //     }
    //     else {
    //         Getdata();
    //     }

    //     let Filt = API_Order + '/?' + (fromdate ? (`From_date=${fromdate}`) : '') + (todate ? (`&To_date=${todate}`) : '') + (sku ? (`&sku=${sku}`) : '') + (customers ? (`&sku=${customers}`) : '')
    //     console.log("Filt", Filt);

    // }
    // const handleOnchange = async (e, type) => {
    //     if (type == "fromdate") {
    //         setFromDate(e.target.value);
    //     }
    //     if(fromdate || todate || shiptype || shipcompany || sku || customers){

    //         let Filt = API_Order + '/?' + (fromdate ? (`From_date=${fromdate}`) : '') + (todate ? (`&To_date=${todate}`) : '') + (shiptype ? (`&shiptype=${shiptype.value}`) : '') + (shipcompany ? (`&shipcompany=${shipcompany.value}`) : '') + (sku ? (`&sku=${sku}`) : '') + (customers ? (`&customer=${customers}`) : '')
    //         console.log("Filt", Filt);
    //         // const Resultt = await axios.get(`${Filt}`, config);
    //         // console.log("resulttt", Resultt);
    //         // setOrderData(Resultt.data.list);
    //     }
    // }

    const GetFilterSearch = async (e) => {
        e.preventDefault();
        if (fromdate || todate || shiptype || shipcompany || sku || customers) {
            let Filt = API_Order + '/?' + (fromdate ? (`From_date=${fromdate}`) : '') + (todate ? (`&To_date=${todate}`) : '') + (shiptype ? (`&shippingtype=${shiptype.value}`) : '') + (shipcompany ? (`&shipcompany=${shipcompany.value}`) : '') + (sku ? (`&sku=${sku}`) : '') + (customers ? (`&customer=${customers}`) : '')
            // console.log("Filt", Filt);
            const Resultt = await axios.get(`${Filt}`, config);
            // setOrderData(Resultt.data.list);

            const getdd = Resultt.data.list.filter((currEle) => currEle.vendor_id == cookies.vendor_id);
            // console.log("all orders", getd)
            setOrderData(getdd);
        } else if (fromdate == "" && todate == "" && shiptype == "" && shipcompany == "" && sku == "" && customers == "") {
            Getdata();
        }
    };


    // if(fromdate && todate && shiptype && )
    const Refresh = () => {
        setFromDate("");
        setToDate("");
        setShipCompany("");
        setShipType("");
        setSku("");
        setCustomer("");
        Getdata();
      };
    const history = useHistory();
    const View = (id) => {
        history.push({ pathname: "/dashboard/orders-lists", state: id });
    };

    const handleView = (Suborder_id,order_no,product_id) => {
        const id={
            "order_no":order_no,
            "Suborder_id":Suborder_id,
            "prod_id":product_id
        }
      console.log(id,"dassssssssss")
        history.push({ pathname: "/dashboard/orders-lists1", state: id });
    };

    const [filter, setFilter] = useState(false);

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

    // Material Table
    const OrderColumn = [
        { field: "createDt", title: "Date" },

        {
            field: "order_no",
            title: "Order ID",
            render:(row)=><Link onClick={()=>View(row.order_no)}>{row.order_no}</Link>
        },
        {
            field: "Suborder_id",
            title: "Sub Order ID",
            render:(row)=><Link onClick={()=>handleView(row.Suborder_id,row.order_no,row.product_id)}>{row.Suborder_id}</Link>
        },
        { field: "productname", title: "Product Name" },
        { field: "full_name", title: "Customer Name" },
        { field: "company_name", title: "Vendor Name" },
        { field: "warehouse_name", title: "Ware House Name" },
        { field: "qty", title: "Quantity" },
        { field: "saleprice", title: "Sale Price" },
        { field: "total", title: "Total Amount" },
        { field: "shippingaddress", title: "Shipping Address" },
        { field: "Tracking", title: "Tracking Numbers" },
        { field: "Shipping_type", title: "Shipping Type" },
        { field: "ShippingCompany", title: "Shipping Company" },
        { field: "weight", title: "Item weight" },
        {
            field: "order_status",
            title: "Order Status",
            // render: (row) => <Badge color="primary">Delivered</Badge>,
        },
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
                                    <li>
                                        <DropdownItem tag="a">
                                            <Icon name="download"></Icon>
                                            <span>Download</span>
                                        </DropdownItem>
                                    </li>

                                    <li>
                                        <DropdownItem tag="a" onClick={() => View(row.order_no)}>
                                            <Icon name="eye"></Icon>
                                            <span>Full View</span>
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

    const filCol = {
        fontSize: "12px"
    }
    const fildiv = {
        width: "15%",
        marginRight: "3px"
    }
    const filSearch = {
        display: "flex",
        alignItems: "center",
        marginTop: "9px"
    }
    const formFil = {
        marginTop: "10px"
    }
    return (
        <React.Fragment>

            <form className="d-flex bg-white px-1" style={formFil} onSubmit={GetFilterSearch}>
                <div className="form-group" style={fildiv}>
                    <label className="form-label" htmlFor="fromdate" style={filCol}>
                        From Date
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Enter From date"
                            name="from_date"
                            value={fromdate}
                            onChange={(e) => handleFromDateChange(e)}
                        // onChange={(e) => handleOnchange(e, "fromdate")}
                        />
                    </div>
                </div>
                <div className="form-group" style={fildiv}>
                    <label className="form-label" htmlFor="todate" style={filCol}>
                        To Date
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Enter to date"
                            name="to_date"
                            value={todate}
                            onChange={(e) => handleToDateChange(e)}
                        // onChange={(e) => handleOnchange(e, "todate")}

                        />
                    </div>
                </div>

                <div className="" style={fildiv}>
                    <label className="form-label" htmlFor="customer" style={filCol}>
                        Shipment type
                    </label>
                    <RSelect
                        name="shipping_type"
                        options={[
                            { value: "Sameday", label: "Same Day" },
                            { value: "Normal", label: "Normal Delivery" },
                        ]}
                        // placeholder="Shipment type"
                        value={shiptype}
                        onChange={(e) => handleShipmentType(e)}
                    />
                </div>

                <div className="" style={fildiv}>
                    <label className="form-label" htmlFor="customer" style={filCol}>
                        Shipment Company
                    </label>
                    <RSelect
                        name="GST"
                        options={[
                            { value: "Express", label: "Express" },
                            { value: "Ecom", label: "Ecom" },
                            { value: "Delivery", label: "Delivery" },
                        ]}
                        value={shipcompany}
                        onChange={handleShipCmpany}
                    />
                </div>
                <div className="" style={fildiv}>
                    <label className="form-label" htmlFor="customer" style={filCol}>
                        Enter SKU
                    </label>
                    <input
                        placeholder="Enter SKU"
                        type="text"
                        className="form-control"
                        name="sku"
                        value={sku}
                        onChange={(e) => handleSku(e)}
                    />

                </div>
                <div className="" style={fildiv}>
                    <label className="form-label" htmlFor="customer" style={filCol}>
                        Search by customer
                    </label>
                    <input
                        placeholder="Customer"
                        type="text"
                        className="form-control"
                        name="customer"
                        value={customers}
                        onChange={(e) => handleCustomer(e)}
                    // onChange={(e) => handleOnchange(e, "customer")}

                    />
                </div>
                <div className="" style={filSearch}>
                    <Button color="primary" type="submit" >
                        <span>Search</span>
                    </Button>
                </div>
                <div className="ml-1" style={filSearch}>
          <Button color="primary" type="button" onClick={() => Refresh()}>
            <span>Refresh</span>
          </Button>
        </div>
            </form>


            <div className="d-flex justify-end" style={{ margin: "0px 5px 0px" }}>
                <div style={{ width: "200px" }}>
                    <RSelect
                        name="GST"
                        options={[
                            { value: "PdfInvoice", label: "Pdf Invoice" },
                            { value: "DownloadManifest", label: "Download Manifest" },
                            { value: "CSVPicklist", label: "CSVPicklist" },
                            { value: "Markasrtd", label: "Mark as rtd" },
                            { value: "RemoveOrder", label: "Remove Order" },
                        ]}
                        // placeholder="Bulk Action"
                        // defaultValue={"Bulk Actionaa"}
                        defaultValue={{ label: "Bulk Action", value: 0 }}
                    />
                </div>
            </div>
            <div style={{ margin: "10px 8px 0px" }}>

                <CustomDataTable
                    icons={tableIcons}
                    data={OrderData}
                    columns={OrderColumn}
                    title="ORDERS LIST"
                />
            </div>
        </React.Fragment>
    );
};

export default AllOrders;