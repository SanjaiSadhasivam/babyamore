import React, { useEffect, useState, forwardRef } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link, useHistory } from "react-router-dom";
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
// import User from "../../../images/avatar/b-sm.jpg"
// import LogoDark2x from "../../images/logo-dark2x.png"
import User from "../../../images/logo-dark2x.png"

//

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  RSelect,
  input,
  PreviewCard,
  ReactDataTable,
} from "../../../components/Component";

import {
  FormGroup,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownToggle,
  Form,
  Label,
  UncontrolledDropdown,
  Badge
} from "reactstrap";

import { DisputesTableDatas, disputesTableColumns2, userData } from "./TableData";
//
import { API_URL } from "../../../Api";
import axios from "axios";


const API_Key = `${API_URL}/Products_Admin`;
const API_Key_Tags = `${API_URL}/Tags_Admin`;
const API_Key_vendor = `${API_URL}/UserVendor`;
const API_Key_mainCate = `${API_URL}/Maincategory`;
const API_Key_image_Path = `${API_URL}/Maincategory_view`;
const API_Key_subcate = `${API_URL}/SubCategory`;
const API_Key_childcate = `${API_URL}/Childcategory`;
const API_Key_Brand = `${API_URL}/Brand`;
const API_Key_Attributename = `${API_URL}/AttributesName`;
const API_Key_AttributeValue = `${API_URL}/Attributes_Admin`;

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

//

//
const useStyles = makeStyles(theme => ({

}));

const bordertable = {
  border: 'transparent'
}

const Reviews = () => {
  const [active, setActive] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const Warehouse = () => { setwarehouse(!warehouse)};
  const classes = useStyles();
  const [smOption, setSmOption] = useState(false);
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState('');
  const [invoice, setinvoice] = useState(false)
 
  const history = useHistory()
  const [modalEdit, setModalEdit] = useState(false);

  const [view, setView] = useState({
    reply: false,
    edit: false,
  });

  const Invoice = () => {
    setinvoice(true)
  }

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };



  useEffect(() => {

    Getdata();

  }, []);

  const Getdata = async () => {
    setData([])
    const data = await axios.get(`${API_Key}/list`)
    // console.log("data", data.data)
    data.data.map(async (items) => {
      const Brand = await axios.get(`${API_Key_Brand}/${items.Brands}`)
      const Categories = await axios.get(`${API_Key_mainCate}/${items.MainCategory}`)
      // console.log("testt", Brand.data)
      // console.log("testt", Categories.data)
      const datss = {
        _id: items._id,
        ProductId: items.ProductId,
        ProductName: items.ProductName,
        Categories: Categories.data.CategoryName,
        Brand: Brand.data.BrandName,

        ProductType: items.ProductType,
        SKU: items.SKU,
        SalePrice: items.SalePrice,

      }
      setData((items) => [...items, datss]);
    })


  }

  // const editPopup = (data) => {
  //   setFormData({
  //     id: data.id,
  //     ProductID: data.ProductID,
  //     Order: data.Order,
  //     Date: data.Date,
  //     Product: data.Product,
  //     ProductType: data.ProductType,
  //     Warehouse: data.Warehouse,
  //     Price: data.Price,
  //     Package: data.Package,
  //     Shipping: data.Shipping,
  //     ShortDescription: data.ShortDescription,
  //     FullDescription: data.FullDescription,
  //     Status: data.Status,
  //   });
  //   setModalEdit(true);
  // };

  const EditTable = (id) => {

    // window.location.href="/dashboard/product-lists"
    history.push({ pathname: '/dashboard/product_lists_add_edit', state: id })
  }
  //
  const Tabletheme = () => createTheme({
    root: {
      "& MuiButtonBase": {
        display: 'block !important'
      }
    },

  });
  const viewDetail = () => {
    window.location.href = "product-details"
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    alert("Data Updated");
  };



  //Delete Popup
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  

  const handleClickReplyOpen = (type, id) => {
    // console.log("type",type);
    setView({
      reply: type === "reply" ? true : false,
      edit: type === "edit" ? true : false,
    });

  };



  const handleEditReview = (type) => {
    setView({
      edit: type === "edit" ? true : false,
    });
  }

  const onFormCancel = () => {
    setView({ reply: false, edit: false });
  };

  const ProductCodeColumnsData = [
    {
      ProductId: "PROD-0004",
      customername: "Jagadesh ",
      review: "Good Product",
      date: "14/09/2022",
      starrating: "2",
    },
    {
      ProductId: "PROD-0003",
      customername: "Sakthivel",
      review: "Nice experience",
      date: "14/09/2022",
      starrating: "2",
    },

  ];

  const ProductCodeColumns = [

    { field: 'ProductId', title: 'Product ID' },
    { field: 'customername', title: 'Customer Name' },
    { field: 'review', title: 'Review Message' },
    { field: 'date', title: 'Date' },
    { field: 'starrating', title: 'Star Rating' },
    // {
    //   field: "Status",
    //   title: "Status",
    //   render: (row) => <Badge color="primary">Pending</Badge>,
    // },
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
                  {/* <li onClick={() => handleClickReplyOpen("reply")}>
                    <DropdownItem
                      tag="a"
                      style={{ cursor: "pointer" }}
                    >
                      <Icon name="reply"></Icon>
                      <span>Reply</span>
                    </DropdownItem>
                  </li> */}
                  <li onClick={() => handleEditReview("edit")}>
                    <DropdownItem tag="a">
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#QuickView"
                      style={{ cursor: "pointer" }}

                    >
                      <Icon name="eye"></Icon>
                      {/* <a href="#" style={{ padding: "1px 0px 0px 5px" }}>Quick View</a> */}
                      <span> View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      // href="#remove"
                      style={{ cursor: "pointer" }}

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

  return (
    <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">

        <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable icons={tableIcons}
            // columns={ProductCodeColumns}
            // data={data}
            columns={ProductCodeColumns}
            data={ProductCodeColumnsData}

            title="REVIEWS LIST"
            options={options}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete All Rows',
                // onClick: (event, rowData) => {
                //   // Do save operation
                //   alert("delete button clicked");
                // }
              }
            ]}
          />
        </MuiThemeProvider>
      </Content>
      <Modal isOpen={view.reply} toggle={() => onFormCancel()}>
        <ModalHeader toggle={() => onFormCancel()}>Reply</ModalHeader>
        <ModalBody className="modal-body-sm text-center">
          {/* <div className="nk-modal"> */}
          <div className="d-flex justify-content-around">
            <Button color="light" size="lg" className="btn-mw" type="">
              Approved
            </Button>

            <Button
              color="light"
              size="lg"
              className="btn-mw"
            >
              Declined
            </Button>
          </div>
          {/* </div> */}
        </ModalBody>
      </Modal>

      <Modal isOpen={view.edit} toggle={() => onFormCancel()}>
        <ModalHeader toggle={() => onFormCancel()}>Review</ModalHeader>
        <ModalBody className="modal-body-sm">
          <form className="form-validate is-alter">
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <label className="form-label">Review Message</label>
                  <div className="gx-2">
                    <div>
                      <div className="form-control-wrap">
                        <textarea className="form-control" placeholder="Review Message" />
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <div className="d-flex justify-content-end mt-1">
                  <Button color="primary">
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

    </React.Fragment >
  );
};

export default Reviews;
