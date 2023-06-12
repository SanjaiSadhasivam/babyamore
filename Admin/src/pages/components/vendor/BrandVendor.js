import React, { useEffect, useState, forwardRef } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import './Profile.css'
import { useForm } from "react-hook-form";
import classNames from "classnames";
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
import axios from "axios";
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
  CustomDataTable,
  ReactDataTable,
  Row,
  RSelect,
  Col,
} from "../../../components/Component";
import { API_Brand, API_Vendor_Brand,API_URL, token } from "../../../Api";

const API_Brand_Image = `${API_URL}/Brand_view`;
import {
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form
} from "reactstrap";
import { Link } from "react-router-dom";

const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  },
};
const Brand = ({ alter, id }) => {

  const [warehouse, setwarehouse] = useState(false);
  const [emailid, setemailid] = useState(false);
  const EmailId = () => { setemailid(!emailid) };
  const [mobile, setmobile] = useState(false);
  const MobileNumber = () => { setmobile(!mobile) };
  const { errors, register, handleSubmit } = useForm();
 

  const [terms, setTerms] = useState({
    brand_id: '',
    vendor_id: "",
  });

 

  const clearState = () => {
    setTerms({
      brand_id: '',
      vendor_id: '',
    })
  }
  const ids = localStorage.getItem("MerchantView");

  useEffect(() => {
    const ids = localStorage.getItem("MerchantView");
    GetBranddata();
    overView(ids);
    getTerms(ids);
    VendorCommission();
    
  }, []);
  const items = JSON.parse(localStorage.getItem('MerchantView'));
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => {
    clearState();
  // window.location.href="/dashboard/merchant-view"  
    setModalFail(!modalFail);
  };

  const [brandandproduct, setbrandandproduct] = useState({
    brand: false,
    product: false,
  })



  const onFormSubmit = (e) => {
    Create();
    setTerms({
      brand_id: '',
      vendor_id: "",
    })
  };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  const [isBrand, setIsBrand] = useState([])
  const [Brand, setBrand] = useState('');
  const [Product, setProduct] = useState('');
  const [isProduct, setIsProduct] = useState([])

  

  const GetBranddata = async () => {
    const { data } = await axios.get(`${API_Brand}`, config)
    const Res = data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.name
      }
      return datss
    })
    setIsBrand(Res)
  }





  const [vendor, setVendor] = useState()


  const overView = async (id) => {
  
    setVendor(id)
  };

  const [resMsg, setResMsg] = useState('')
  const [res, setRes] = useState('')

  const [error, setError] = useState({
    Brand: "",
  });

  const Create = async () => {
  if(Brand != ""){
    const datass = {
      brand_id: Brand.value,
      vendor_id: vendor
    }
    axios.post(API_Vendor_Brand, datass, config).then((res) => {
      clearState();
      setTerms({
        brand_id: '',
        vendor_id: '',
      })
      clearState();
      setResMsg(res.data.msg);
      setRes(res);
      getTerms(ids);
      setModalFail(true);
      setBrand("");
    });
   
  }else{
    setError({Brand:"Brand Required"});
    
    // window.location.reload();
  }
  }
 

  const [filter, setFilter] = useState(false);
  const [smOption, setSmOption] = useState(false);

 

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

  const [getAllTerm, setgetAllTerm] = useState([]);

  
  
  const getTerms = async (id) => {
    const { data } = await axios.get(`${API_Vendor_Brand}/${id}`, config)

    setgetAllTerm(data.list);
  }
  const typeID1 = getAllTerm.filter((currEle) => (currEle.type_id === 1))
  const typeID2 = getAllTerm.filter((currEle) => (currEle.type_id === 2))
 
  const [Tables, setTables] = useState([])

  const VendorCommission = async () => {
  
  }
  const onFormCancel = () => {
    setView({ add: false, details: false, Viewdetails: false });
    getTerms(ids);
  };
  const handleAlertDelete = async () => {
    const { data } = await axios.put(`${API_Vendor_Brand}/delete/${stateID}`, { Status: 0 }, config);
    onFormCancel();
    getTerms(ids);
    // window.location.href="/dashboard/merchant-view"  
  };
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [stateID, setstateID] = useState("");
  const handleClickAlertOpen = (type, data) => {
    setView({ details: type === "remove" ? true : false });
    setstateID(data.vendor_brandid);
  };
  // const toggle = (type) => {
  //   setAddcommission(type === "add" ? true : false);
  // };

  const toggle = (type) => {
     setAddcommission(type === "add" ? true : false);
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
     
    });
  };


  const tableColumn = [
    {
      field: "brand_logo",
      title: "Logo",
      render: (rowData) => (
        <>
          {rowData.brand_logo ? (
            <img
              src={`${API_Brand_Image}/${rowData.brand_logo}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          ) : (
            <p>No Image</p>
          )}
        </>
      ),
    },
    // brandandproduct.brand ===  1  ?{ field: "prod_brand_id", title: "Brands" }:{ field: "prod_brand_id", title: "Products" },
    { field: "name", title: "Brand Name" },
    // { field: "agreement_dt", title: "Agreement Date" },
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

                <li onClick={() => handleClickAlertOpen("remove", row)}>
                    <DropdownItem tag="a">
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
  const [addcommission, setAddcommission] = useState(false);
  const EditTable = (id) => {
    // localStorage.setItem('MerchantView', id);
    // history.push(`/dashboard/merchant-view`)
  }



  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>
       


        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="my-3">
                {/* <BlockTitle tag="h4"> VENDOR LIST </BlockTitle> */}

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
                          <span>Add Brand</span>
                        </Button>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>

        
                {
                  addcommission ?
                    <>
                      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
                        <Row className="g-gs">
                          <Col md="4">
                            <FormGroup>
                              <Label className="form-label" htmlFor="fv-subject">
                              {" "}
                                Select Brand
                              </Label>
                              <div className="form-control-wrap">
                                <RSelect
                                  name="prod_brand_id"
                                  options={isBrand}
                                  onChange={(event) => setBrand(event)}
                                  value={Brand}
                                  placeholder="Select"
                                  required
                                />
                      {error.Brand ? <p style={{ color: "red" }}>{error.Brand}</p> : ""}
                              </div>
                            </FormGroup>
                          </Col>
                          
                        </Row>
                        <Row className="mt-3 mb-5">
                          <Col md="12" className="d-flex justify-content-end">
                            <FormGroup>
                              <Button color="primary" type="submit" size="md">
                                SAVE
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>
                      </Form>
                    </>
                    : <></>
                }

                




          
          <MuiThemeProvider theme={Tabletheme()}>

            <CustomDataTable
              data={getAllTerm}
              columns={tableColumn}
              title="BRAND LIST"
              filter={false}
            />
          
          </MuiThemeProvider>
        </Block>






      </React.Fragment>
      {/* add warehouse */}
    
      <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className={resMsg === 'Brand Already Exist' ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-alert-fill bg-warning" : "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"}></Icon>
              <h4 className="nk-modal-title">{resMsg || res}</h4>
              <div className="nk-modal-action mt-5">
                <Button color="light" size="lg" className="btn-mw mr-3" onClick={toggleModalFail}>
                  Done
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      {/* emilid */}
      <Modal isOpen={emailid} toggle={EmailId}>

        <ModalBody>

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div >
                  <Icon name='alert-circle' color="primary" style={{ fontSize: '60px' }}></Icon>
                </div>
                <div className="mt-2">
                  <h6>Are you sure?</h6>
                </div>
                <div className="mt-2 mb-2">
                  <p>You won't be able to revert this!?</p>
                </div>
                <Row>
                  <Col md="6" className="text-right">
                    <FormGroup>
                      <Button color="primary" size="sm">
                        Yes, delete it!
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md="6" className="text-left">
                    <FormGroup>
                      <Button color="primary" size="sm">
                        Cancle
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ModalBody>

      </Modal>

      {/* mobile */}
      <Modal isOpen={mobile} toggle={MobileNumber}>
        <ModalHeader
          toggle={MobileNumber}
          close={
            <button className="close" onClick={MobileNumber}>
              <Icon name="cross" />
            </button>
          }
        >
          Enter Your New Mobile Number
        </ModalHeader>
        <ModalBody>
          <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
            <FormGroup>

              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary" size="sm">
                Sent OTP
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
       
      </Modal>
      <Modal isOpen={view.details} toggle={() => onFormCancel()}>
            <ModalBody className="modal-body-lg text-center">
              <div className="nk-modal">
                <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
                <h4 className="nk-modal-title">Do You Want Delete!</h4>
                <div className="nk-modal-action mt-5 d-flex justify-content-around">
                  <Button color="light" size="lg" className="btn-mw mr-3" type="submit" onClick={handleAlertDelete}>
                    Confirm{" "}
                  </Button>
                  <Button
                   color="light" size="lg" className="btn-mw"
                    type="submit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      onFormCancel();
                    }}
                  >
                    {" "}
                    Cancel{" "}
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
    </div>
  );
};
export default Brand;





