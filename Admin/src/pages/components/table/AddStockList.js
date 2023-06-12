import React, { useEffect, useState, forwardRef } from "react";
import "react-quill/dist/quill.snow.css";
import {
    BlockHead, BlockHeadContent, BlockTitle, ReactDataTable, PreviewCard, Button, Icon, UserAvatar, Row, Col, RSelect, Block, DataTableHead, CodeBlock, DataTableRow, Rating, PreviewTable,
} from "../../../components/Component";
import { useForm } from "react-hook-form";
import MaterialTable from 'material-table';
import { makeStyles, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
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
import { useHistory, useLocation } from "react-router-dom";
import { API_Product, API_Stock, token } from "../../../Api";
import axios from "axios";
const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    },
};

const AddStockList = () => {
    const [list, setList] = useState([])
    const [warehouse, setwarehouse] = useState([])
    const [listprod, setlistprod] = useState("")
    const [ware, setware] = useState("")
    const Tabletheme = () => createTheme({
        root: {
            "& MuiButtonBase": {
                display: 'block !important'
            }
        },

    });
    const [Attribute, setAttribute] = useState([])
    const [stocklist, setstocklist] = useState({
        warehouseid: "",
        productid: "",
    });
    const [date, setDate] = useState('');
 
   
    useEffect(() => {
        GetListdata()
    }, []);


    const GetListdata = async () => {
        const { data } = await axios.get(`${API_Product}`, config)
        const res = data.list.map((pro) => {
            const datas = {
                value: pro.Productlist_id,
                label: pro.ProductName,
            };
            setList((items) => [...items, datas]);
        });
    };

    const productOnchange = async (event) => {
     try {
       
           setlistprod(event)
           setware([])
           setwarehouse([])
           const warehouse = await axios.get(`${API_Product}/${event.value}`, config)
           if(warehouse){
           const res = warehouse.data.list[0].Warehouse.map((wareitem) => {
               const waredata = {
                   value: wareitem.value,
                   label: wareitem.label,
               }
               setwarehouse((datas) => [...datas, waredata]);
           })
        }
     } catch (error) {
        
     }
        // setlistprod("")
      
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

    const handleChangeStock = (e) => {
       
         setDate(e.target.value);
    };

    const [data1, setData1] = useState([]);
    const [columns1, setColumns1] = useState([
        { title: 'Attribute ID', field: 'productlist_id', editable: 'never' },
        { title: 'Attribute Type 1', field: 'AttributeType', editable: 'never' },
        { title: 'Attribute Type 2', field: 'AttributeTypeValue', editable: 'never' },
        { title: 'Current Stock', field: 'current_stock' , editable: 'never' },
        { title: 'Stock Value', field: 'stock_value', editable: 'onUpdate' },
       
        // { title: 'Price', field: 'Price', editable: 'onUpdate' },
        // { title: 'Discount', field: 'Discount', editable: 'onUpdate' },
    ]);

   


    const [producttable1, setproducttable1] = useState(false);
    const [producttable2, setproducttable2] = useState(false);
 
    const [StockValue,setStock] =useState([{stock_value:0}])
      
    const Stocksubmit = async () => {
        const metaData = listprod.value
        const { data } = await axios.get(`${API_Product}/getproductvarietydata/${metaData}`, config)
        setData1(data.list)
        const Resultdata = data.list;
        if (Resultdata.length > 0) {
            Resultdata.map((items) => {
                const datass = {
                    value: items.productlist_id,
                    currentstock: items.current_stock,                    
                }
                setAttribute((item) => [...item, datass]);
            })
        }

        if (data.list.length !== 'undefined' && data.list.length > 0) {
            setproducttable1(true);
            setproducttable2(false);
        }      
    }

    const [view, setView] = useState({
        add: false,
        details: false,
    });
    const onFormCancel = () => {
        setView({ add: false, details: false, Viewdetails: false });

    };
    const { errors, register, handleSubmit } = useForm();
    const onFormSubmit = (form) => {
        Create();
    };
    

    const Create = () => {
        var Arr=[];
        if(Attribute){
            Attribute.map((itemss)=>{
             const Result = StockValue.filter(item=> item.productlist_id == itemss.value)
                const Resultsdatass ={
                    value: itemss.value,
                    currentstock: itemss.currentstock, 
                    stockvalue:  Result.length == 0 ? 0 : Result[0].stock_value,      
                }
                Arr.push(Resultsdatass)
                window.location.href = "/dashboard/stock-list"
            })}
        let formData = new FormData();
        formData.append("attributes", JSON.stringify(Arr));
        formData.append("warehouseid", ware.value);
        formData.append("productid", listprod.value);
        formData.append("expiry_date",date);
        const configs = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };
        if(Arr.length >0){
          
        axios.post(API_Stock, formData, configs).then((res) => {
            // setstocklist({
            //     ...stocklist,
            //     //   id: "",
            //     //   attributes: "",
            //     // expiry_date:"",
            //     stocklist: "",
            //     productid: "",
            // });
            // toast.success("Successfully Created ", {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
            // onFormCancel();
            //  GetListdata();
        });  
        window.location.href = "/dashboard/stock-list"
        }
        ;};
    
  

    return (
        <React.Fragment>
            <div style={{ marginTop: '80px' }} className="p-5">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="p-4 mb-5" style={{ backgroundColor: "white" }}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                                <h5>STOCK</h5>
                            </label>
                        </div>

                        <Row>
                            <Col md="4" style={{ margin: "0", padding: "0" }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="paid">
                                        Enter Product
                                    </label>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            name="Product Id"
                                            options={list}
                                            onChange={(event)=>productOnchange(event)}
                                            value={listprod}
                                            fields={{ value: "value", text: "label" }}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md="4" style={{ margin: "0", padding: "0" }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="paid">
                                        Select Warehouse
                                    </label>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            name="warehouse"
                                            options={warehouse}
                                            onChange={(event) => setware(event)}
                                            value={ware}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md="4" >
                                <div className="d-flex justify-content-end" style={{ marginTop: "30px" }}>
                                    <Button color="primary" type="button"
                                    
                                        onClick={Stocksubmit}>
                                        <span>SUBMIT</span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {
                        producttable1 ?
                            <>
                                <MuiThemeProvider theme={Tabletheme()}>
                                    <MaterialTable
                                        title="Stock List"
                                        icons={tableIcons}
                                        columns={columns1}
                                        options={options}
                                        data={data1}
                                        editable={{
                                            onRowAdd: newData =>
                                              new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                  setData1([...data1, newData]);
                                                  
                                                  resolve();
                                                }, 1000)
                                              }),
                                            onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        const dataUpdate = [...StockValue];
                                                        const index = oldData.tableData.id;
                                                        dataUpdate[index] = newData;
                                                        setStock([...dataUpdate]);
                                                        resolve();
                                                    }, 1000)
                                                }),

                                        }}


                                    />
                                </MuiThemeProvider>
                            </>
                            : <></>
                    }
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

                                        editable={{
                                            onRowAdd: newData =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        setData([...data, newData]);

                                                        resolve();
                                                    }, 1000)
                                                }),
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        const dataUpdate = [...data];
                                                        const index = oldData.tableData.id;
                                                        dataUpdate[index] = newData;
                                                        setData([...dataUpdate]);

                                                        resolve();
                                                    }, 1000)
                                                }),

                                        }}


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
                                            type="date"
                                            required
                                            className="form-control"
                                            placeholder="Enter From Date"
                                            name="ProductExpiryDate"
                                            onChange={handleChangeStock}
                                            //   ref={dateInputRef}
                                           value={date}
                                            // <p>Selected Date: {date}</p>
                                        />

                                    </div>
                                </div>
                            </Col>


                            <Col md="8">
                                <div className="d-flex justify-content-end" style={{ marginTop: "30px" }}>
                                    <Button color="primary" type="submit">
                                        <span>SAVE</span>
                                    </Button>
                                </div>
                            </Col>

                        </Row>
                    </div>
                </form>
            </div>

        </React.Fragment>
    );
};
export default AddStockList;