import React, { useEffect, useState, useCallback, forwardRef } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { Nav, NavItem, TabContent, TabPane, Card } from "reactstrap";
import { Link, useHistory, NavLink } from "react-router-dom";
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
  CustomDataTable,
} from "../../../components/Component";
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
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { API_URL, API_Gift, token } from "../../../Api";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Giftoffers = ({ ...props }) => {
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [filter, setFilter] = useState(false);
  const history = useHistory();
  const [smOption, setSmOption] = useState(false);
  const [TokenIds, setTokenIds] = useState();
  const [userData, setUserData] = useState([]);
  const [Giftoffers, setGiftoffers] = useState({
    Buy2Get1: false,
    Product: false,
    Brand: false,
    Category: false,
  });

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const selectTab = useCallback((count) => {
    setActiveIconTab(count);
  }, []);
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
  useEffect(() => {
    GetProfile();
  }, []);
  const GetProfile = async () => {
    const datas = await axios.get(`${API_Gift}`, config);
    setUserData(datas.data.list);
  };
  const [DeleteId, setDeleteId] = useState("");
  const DeleteOpen = (id) => {
    setDeleteId(id);
    setModalFail(true);
  };

  const Deletedata = () => {
    if (DeleteId) {
      axios.put(`${API_Gift}/delete/${DeleteId}`, {}, config).then((res) => {
        GetProfile();
        setModalFail(false);
      });
    }
  };
  const disputesTableColumnsReedemPoints = [
    {
      field: "gift_id",
      title: "Gift ID",
      // render: (row) => (
      //   <NavLink to="/dashboard/orders-lists" color="primary">
      //     {row.GiftId}
      //   </NavLink>
      // ),
    },
    { field: "gift_name", title: "Gift Name" },
    { field: "gift_type", title: "Gift Type" },
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
                    <DropdownItem tag="a" onClick={() => EditTable(row.id)}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  {/* <li>
                    <DropdownItem tag="a" href="orders-lists">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    <DropdownItem tag="a" href="#remove" onClick={() => DeleteOpen(row.id)}>
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


  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };
  const onFormCancel = () => {
    setView({ add: false, details: false });
    // resetForm();
  };


  const handleBack = () => {
    localStorage.removeItem("MerchantView");
    history.push(`/dashboard/merchant-list`);
  };
  const { errors, register, handleSubmit } = useForm();
  const handleChangeGiftoffers = (item) => {
    const value = item.value;
    if (value === "Buy2Get1") {
      setGiftoffers({
        Buy2Get1: true,
      });
    }
    if (value === "Product") {
      setGiftoffers({
        Product: true,
      });
    }
    if (value === "Brand") {
      setGiftoffers({
        Brand: true,
      });
    }
    if (value === "Category") {
      setGiftoffers({
        Category: true,
      });
    }
  };
  const EditTable = (id) => {
    console.log(id, "iiiddd");
    history.push({ pathname: `/dashboard/gift_offer_add_edit`, state: id });
  };
  return (
    <React.Fragment>
      <Head title="Profile" />

      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="heading-flex justify-end">
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
                        // onClick={() => {
                        //   toggle("add");
                        // }}
                        >
                          <Icon name="plus"></Icon>
                        </Button>
                        <Link to="gift_offer_add_edit" style={{ color: "white" }}>
                          <Button
                            className="toggle d-none d-md-inline-flex"
                            color="primary"
                          // onClick={() => {
                          //   toggle("add");
                          // }}
                          >
                            <Icon name="plus"></Icon>
                            <span>Add Gift Settings</span>
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
        </Block>
        <Block size="lg" className="pt-3">
          {/* <MuiThemeProvider theme={Tabletheme()}>
            <MaterialTable
              // icons={tableIcons}
              options={options}
              data={DisputesTableDataGift}
              columns={disputesTableColumnsReedemPoints}
              title="GIFT OFFERS LIST "
            />
          </MuiThemeProvider> */}
          <CustomDataTable
            // icons={tableIcons}
            data={userData}
            columns={disputesTableColumnsReedemPoints}
            title="GIFT OFFERS LIST"
          />
        </Block>

        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon>
              <h4 className="nk-modal-title">Do you want Delete!</h4>
              {/* <div className="nk-modal-text">
                                <p className="lead">
                                    We are sorry, we were unable to process your payment. Please try after sometimes.
                                </p>
                                <p className="text-soft">If you need help please contact us at (855) 485-7373.</p>
                            </div> */}
              <div className="nk-modal-action mt-5">
                <Button color="light" size="lg" className="btn-mw mr-3" onClick={Deletedata}>
                  {" "}
                  Confirm{" "}
                </Button>
                <Button color="light" size="lg" className="btn-mw" onClick={toggleModalFail}>
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default Giftoffers;
