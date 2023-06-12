import React, { useEffect, useState, forwardRef } from "react";
import "./Roles.css";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import MaterialTable from "material-table";
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
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
import { API_URL, token } from "../../../Api";
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

import { messageData } from "./MessageData";

import { DisputesTableDataroles, disputesTableColumnsroles, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {
  FormGroup,
  Form,
  Input,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  Badge,
} from "reactstrap";

import { useCookies } from "react-cookie";

const Role_Api = `${API_URL}/admin/userRoles`;
// const Role_img = `${API_URL}/Homepage_sec_Card_image`

const Roles = () => {
  const [User, setUser] = useState({
    role_name: "",
    isActive: null,
    categoryview: "",
    categorydelete: "",
    catalogview: "",
    catalogdelete: "",
    couponview: "",
    coupondelete: "",
    discountview: "",
    discountdelete: "",
    ordersview: "",
    ordersdelete: "",
    shippingview: "",
    shippingdelete: "",
    adminview: "",
    admindelete: "",
    pointsview: "",
    pointsdelete: "",
    giftofferview: "",
    giftofferdelete: "",
    appearanceview: "",
    appearancedelete: "",
    settingsview: "",
    settingsdelete: "",
    socialview: "",
    socialdelete: "",
    productview: "",
    productdelete: "",
    Status: "",
    user_id: "",
    createDt: "",
    modifyDt: "",
  });

  const [checkedOne, setCheckedOne] = useState(0); //cateview
  const [checkedTwo, setCheckedTwo] = useState(0); //catedelete

  const [checkedThree, setCheckedThree] = useState(0); //catalogview
  const [checkedFour, setCheckedFour] = useState(0); //catalogdelete

  const [checkedTwentyfive, setCheckedTwentyfive] = useState(0); //productview
  const [checkedTwentysix, setCheckedTwentysix] = useState(0); //productdelete

  const [checkedFive, setCheckedFive] = useState(0); //couponview
  const [checkedSix, setCheckedSix] = useState(0); //coupondelete

  const [checkedSeven, setCheckedSeven] = useState(0); // discountview
  const [checkedEight, setCheckedEight] = useState(0); // discountdelte

  const [checkedNine, setCheckedNine] = useState(0); //ordersview
  const [checkedTen, setCheckedTen] = useState(0); //ordersdelete

  const [checkedNineteen, setCheckedNineteen] = useState(0); //vendor-view - but backend not updated
  const [checkedTwenty, setCheckedTwenty] = useState(0); //vendor-delete - but backend not updated

  const [checkedThirteen, setCheckedThirteen] = useState(0); //adminview
  const [checkedFourteen, setCheckedFourteen] = useState(0); //admindelete

  const [checkedFifteen, setCheckedFifteen] = useState(0); //pointsview
  const [checkedSixteen, setCheckedSixteen] = useState(0); //pointsdelete

  const [checkedTwentyone, setCheckedTwentyone] = useState(0); //appearanceview
  const [checkedTwentytwo, setCheckedTwentytwo] = useState(0); //appearancedelete

  const [checkedEleven, setCheckedEleven] = useState(0); //shippingview
  const [checkedTwelve, setCheckedTwelve] = useState(0); //shippingdelte

  const [checkedSeventeen, setCheckedSeventeen] = useState(0); //giftofferview
  const [checkedEighteen, setCheckedEighteen] = useState(0); //giftofferdelete

  const [checkedTwentythree, setCheckedTwentythree] = useState(0); //settingsview
  const [checkedTwentyfour, setCheckedTwentyfour] = useState(0); //settingsdelete

  const [active, setActive] = useState("");
  const updateOne = (e) => {
    console.log("ischeck", e.target.checked);
    setCheckedOne(e.target.checked); //cateview
  };
  const updateTwo = () => {
    setCheckedTwo((prev1) => !prev1); //catedelete
  };
  const updateThree = () => {
    setCheckedThree((prev2) => !prev2); //catalogview
  };
  const updateFour = () => {
    setCheckedFour((prev3) => !prev3); //catalogdelete
  };
  const updateFive = () => {
    setCheckedFive((prev4) => !prev4); //couponview
  };
  const updateSix = () => {
    setCheckedSix((prev5) => !prev5); //coupondelete
  };
  const updateSeven = () => {
    setCheckedSeven((prev6) => !prev6); //discountview
  };
  const updateEight = () => {
    setCheckedEight((prev7) => !prev7); //discountdelete
  };
  const updateNine = () => {
    setCheckedNine((prev8) => !prev8); //ordersview
  };
  const updateTen = () => {
    setCheckedTen((prev9) => !prev9); //ordersdelete
  };
  const updateEleven = () => {
    setCheckedEleven((prev10) => !prev10); //shippingview
  };
  const updateTwelve = () => {
    setCheckedTwelve((prev11) => !prev11); //shippingdelete
  };
  const updateThirteen = () => {
    setCheckedThirteen((prev12) => !prev12); //adminview
  };
  const updateFourteen = () => {
    setCheckedFourteen((prev13) => !prev13); //admindelete
  };
  const updateFifteen = () => {
    setCheckedFifteen((prev14) => !prev14); //pointsview
  };
  const updateSixteen = () => {
    setCheckedSixteen((prev15) => !prev15); //pointsdelete
  };
  const updateSeventeen = () => {
    setCheckedSeventeen((prev16) => !prev16); //giftofferview
  };
  const updateEighteen = () => {
    setCheckedEighteen((prev17) => !prev17); //giftofferdelete
  };

  const updateNineteen = () => {
    setCheckedNineteen((prev18) => !prev18); //vendor-view - but backend not updated
  };

  const updateTwenty = () => {
    setCheckedTwenty((prev19) => !prev19); //vendor-delete - but backend not updated
  };

  const updateTwentyone = () => {
    setCheckedTwentyone((prev20) => !prev20); //appearanceview
  };
  const updateTwentytwo = () => {
    setCheckedTwentytwo((prev21) => !prev21); //appearancedelete
  };
  const updateTwentythree = () => {
    setCheckedTwentythree((prev22) => !prev22); //settingsview - not required
  };
  const updateTwentyfour = () => {
    setCheckedTwentyfour((prev23) => !prev23); //settingsdelete - not required
  };
  const updateTwentyfive = () => {
    setCheckedTwentyfive((prev24) => !prev24); //productview
  };
  const updateTwentysix = () => {
    setCheckedTwentysix((prev25) => !prev25); //productdelete
  };

  const handleChangeisActive = (event) => {
    setUser({
      ...User,
      isActive: event.value,
    });
    setActive({ value: event.value, label: event.label });
  };

  const [DiscountCheck, setDiscountCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [ShippingCheck, setShippingCheck] = useState({
    visible1: true,
    View: false,
    Add1: false,
    Edit: false,
    Delete: false,
  });

  const [CatlogCheck, setCatlogCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Update: false,
    Delete: false,
    Reply: false,
  });

  const [AdminCheck, setAdminCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [CouponCheck, setCouponCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Update: false,
    Delete: false,
    Reply: false,
  });

  const [OrderCheck, setOrderCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Fullfill: false,
    Cancel: false,
    Archive: false,
    Delete: false,
  });

  const [catergoryCheck, setcatergoryCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [PointsCheck, setPointsCheck] = useState({
    visible: true,
    View: false,
    Initiate: false,
    Update: false,
    Approve: false,
  });

  const [GiftOfferCheck, setGiftOfferCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
  });

  const [Appearance, setAppearance] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
    Login: false,
  });

  const [VendorCheck, setVendorCheck] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
    Login: false,
  });

  const [Settings, setSettings] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
    Login: false,
  });
  const [Social, setSocial] = useState({
    visible: true,
    View: false,
    Add: false,
    Edit: false,
    Delete: false,
    Login: false,
  });

  // const [permissions,setPermisstion]=useState([]);

  const permissions = [
    {
      model_name: "CATEGORY",
      view: catergoryCheck.View ? 1 : 0,
      edit: catergoryCheck.Delete ? 1 : 0,
    },
    {
      model_name: "CATALOG",
      view: CatlogCheck.View ? 1 : 0,
      edit: CatlogCheck.Delete ? 1 : 0,
    },
    {
      model_name: "COUPON",
      view: CouponCheck.View ? 1 : 0,
      edit: CouponCheck.Delete ? 1 : 0,
    },
    {
      model_name: "DISCOUNT",
      view: DiscountCheck.View ? 1 : 0,
      edit: DiscountCheck.Delete ? 1 : 0,
    },
    {
      model_name: "ORDERS",
      view: OrderCheck.View ? 1 : 0,
      edit: OrderCheck.Delete ? 1 : 0,
    },
    {
      model_name: "SHIPPING",
      view: ShippingCheck.View ? 1 : 0,
      edit: ShippingCheck.Delete ? 1 : 0,
    },
    {
      model_name: "ADMIN",
      view: AdminCheck.View ? 1 : 0,
      edit: AdminCheck.Delete ? 1 : 0,
    },
    {
      model_name: "POINTS",
      view: PointsCheck.View ? 1 : 0,
      edit: PointsCheck.Delete ? 1 : 0,
    },
    {
      model_name: "GIFT OFFERS",
      view: GiftOfferCheck.View ? 1 : 0,
      edit: GiftOfferCheck.Delete ? 1 : 0,
    },
    {
      model_name: "VENDORS",
      view: VendorCheck.View ? 1 : 0,
      edit: VendorCheck.Delete ? 1 : 0,
    },
    {
      model_name: "APPEARANCE",
      view: Appearance.View ? 1 : 0,
      edit: Appearance.Delete ? 1 : 0,
    },
    {
      model_name: "SETTINGS",
      view: Settings.View ? 1 : 0,
      edit: Settings.Delete ? 1 : 0,
    },
    {
      model_name: "SOCIAL",
      view: Social.View ? 1 : 0,
      edit: Social.Delete ? 1 : 0,
    },
  ];

  const [cookies, setCookie, removeCookie] = useCookies();
  const Auths = cookies.accesstoken;
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [dataList, setdataList] = useState([]);
  // const [descriptions, setdescriptions] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [BrandView, setBrandView] = useState("");
  const [ID, setID] = useState("");
  const [rating, setRating] = useState(0);
  const [state, setState] = useState({ value: null });
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });
  // const [state, setState] = useState({ value: null });
  // const handleChange = value => {
  //   setState({ value });
  // };

  const [smOption, setSmOption] = useState(false);

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

  const [filter, setFilter] = useState(false);

  const Tabletheme = () =>
    createTheme({
      root: {
        "& MuiButtonBase": {
          display: "block !important",
        },
      },
    });

  //
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: "",
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

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

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [DeleteId, setDeleteId] = useState("");
  useEffect(() => {
    GetRole();
  }, []);
  const reversed = [...dataList].reverse();
  const GetRole = async () => {
    const data = await axios.get(`${Role_Api}`, {
      headers: { Authorization: `Bearer ${token} ` },
    });
    // console.log("aaa",data.data.list[4].JSON.parse(permission))
    setdataList(data.data.list);
    console.log(data.data.list, "data.data.list");
  };

  const [DeleteTittle, setDeleteTittle] = useState("Do you want Delete!");
  const [Deleteicon, setDeleteicon] = useState(false);

  const [view, setView] = useState({
    add: false,
    details: false,
    Viewdetails: false,
  });

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...User, [name]: value });
  };

  const EditTable = async (data, type) => {
    console.log("data", data.categorydelete);
    let { role_name, role_id, categorydelete, categoryview, isActive } = data;
    setID(role_id);
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      Viewdetails: type === "Viewdetails" ? true : false,
    });

    let permiss = JSON.parse(data.permission);
    console.log("permiss", permiss);
    console.log(categoryview, "checkedOne");

    setUser({
      ...User,
      role_name: role_name,
      isActive: isActive
      // permission: "",
    });
    setActive({ label: data.isActive == 1 ? "Active" : "InActive", value: data.isActive });

    setCheckedOne(data.categoryview); //cateview
    setCheckedTwo(data.categorydelete); //catedelete

    setCheckedThree(data.catalogview); //catalogview
    setCheckedFour(data.catalogdelete); //catalogdelete

    setCheckedTwentyfive(data.productview);
    setCheckedTwentysix(data.productdelete);

    setCheckedFive(data.couponview);
    setCheckedSix(data.coupondelete);

    setCheckedSeven(data.discountview);
    setCheckedEight(data.discountdelete);

    setCheckedNine(data.ordersview);
    setCheckedTen(data.ordersdelete);

    setCheckedThirteen(data.adminview);
    setCheckedFourteen(data.admindelete);

    setCheckedFifteen(data.pointsview);
    setCheckedSixteen(data.pointsdelete);

    setCheckedTwentyone(data.appearanceview);
    setCheckedTwentytwo(data.appearancedelete);

    setCheckedEleven(data.shippingview);
    setCheckedTwelve(data.shippingdelete);

    setCheckedSeventeen(data.giftofferview);
    setCheckedEighteen(data.giftofferdelete);
    setCheckedNineteen(data.vendorview);
    setCheckedTwenty(data.vendordelete);

    setCheckedTwentythree(data.settingsview);
    setCheckedTwentyfour(data.settingsdelete);

    // catalogview: "",
    // catalogdelete: "",
    // couponview: "",
    // coupondelete: "",
    // discountview: "",
    // discountdelete: "",
    // ordersview: "",
    // ordersdelete: "",
    // shippingview: "",
    // shippingdelete: "",
    // adminview: "",
    // admindelete: "",
    // pointsview: "",
    // pointsdelete: "",
    // giftofferview: "",
    // giftofferdelete: "",
    // appearanceview: "",
    // appearancedelete: "",
    // settingsview: "",
    // settingsdelete: "",
    // socialview: "",
    // socialdelete: "",
    // productview: "",
    // productdelete: "",
    // user_id: "",
    // // Description: "",
    // // Access: "",
    // Status: "",
    // createDt: "",
    // modifyDt: "",

    // setUser({
    //   role_name: role_name,
    // });
    // setcatergoryCheck({
    //   View: permiss[0].view == 1 ? true : false,
    //   Delete: permiss[0].edit == 1 ? true : false == 1 ? true : false,
    // });
    // setCatlogCheck({
    //   View: permiss[1].view == 1 ? true : false,
    //   Delete: permiss[1].edit == 1 ? true : false,
    // });
    // setCouponCheck({
    //   View: permiss[2].view == 1 ? true : false,
    //   Delete: permiss[2].edit == 1 ? true : false,
    // });
    // setDiscountCheck({
    //   View: permiss[3].view == 1 ? true : false,
    //   Delete: permiss[3].edit == 1 ? true : false,
    // });
    // setOrderCheck({
    //   View: permiss[4].view == 1 ? true : false,
    //   Delete: permiss[4].edit == 1 ? true : false,
    // });
    // setShippingCheck({
    //   View: permiss[5].view == 1 ? true : false,
    //   Delete: permiss[5].edit == 1 ? true : false,
    // });
    // setAdminCheck({
    //   View: permiss[6].view == 1 ? true : false,
    //   Delete: permiss[6].edit == 1 ? true : false,
    // });
    // setPointsCheck({
    //   View: permiss[7].view == 1 ? true : false,
    //   Delete: permiss[7].edit == 1 ? true : false,
    // });
    // setGiftOfferCheck({
    //   View: permiss[8].view == 1 ? true : false,
    //   Delete: permiss[8].edit == 1 ? true : false,
    // });
    // setVendorCheck({
    //   View: permiss[9].view == 1 ? true : false,
    //   Delete: permiss[9].edit == 1 ? true : false,
    // });
    // setAppearance({
    //   View: permiss[10].view == 1 ? true : false,
    //   Delete: permiss[10].edit == 1 ? true : false,
    // });
    // setSettings({
    //   View: permiss[11].view == 1 ? true : false,
    //   Delete: permiss[11].edit == 1 ? true : false,
    // });
    // setSocial({
    //   View: permiss[12].view == 1 ? true : false,
    //   Delete: permiss[12].edit == 1 ? true : false,
    // });

    // setDate(Result.data.list.Dob)
    // setdescriptions(Result.data.list.Description);
  };
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token} `,
    },
  };
  const Deletedata = async () => {
    if (DeleteId) {
      let formData = new FormData();

      const Result = await axios.put(`${Role_Api}/delete/${DeleteId}`, formData, config);
      if (Result.data) {
        setDeleteTittle(Result.data.msg);
        // console.log(Result.data.msg, "Result.data.msg");
        setDeleteicon(true);
        GetRole();
        const timer = setTimeout(() => {
          setModalFail(false);
          // setDeleteicon(false);
          //
        }, 1500);

        return () => clearTimeout(timer);
      }
    }
  };

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const DeleteOpen = (data) => {
    setDeleteId(data.role_id);
    setModalFail(true);
    setDeleteicon(false);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    setcatergoryCheck({
      View: false,
      Delete: false,
    });
    setCatlogCheck({
      View: false,
      Delete: false,
    });
    setCouponCheck({
      View: false,
      Delete: false,
    });
    setDiscountCheck({
      View: false,
      Delete: false,
    });
    setOrderCheck({
      View: false,
      Delete: false,
    });
    setShippingCheck({
      View: false,
      Delete: false,
    });
    setAdminCheck({
      View: false,
      Delete: false,
    });
    setPointsCheck({
      View: false,
      Delete: false,
    });
    setGiftOfferCheck({
      View: false,
      Delete: false,
    });
    setVendorCheck({
      View: false,
      Delete: false,
    });
    setAppearance({
      View: false,
      Delete: false,
    });
    setSettings({
      View: false,
      Delete: false,
    });
    setSocial({
      View: false,
      Delete: false,
    });
    // resetForm();
    // setUser({
    //   ...User,
    //   role_name: "",
    //   permission: "",
    //   user_id: "",
    //   // Description:"",
    //   // Access:"",
    //   Status: "",
    //   createDt: "",
    //   modifyDt: "",
    // });

    setUser({
      role_name: "",
      permission: "",
      categoryview: "",
      categorydelete: "",
      catalogview: "",
      catalogdelete: "",
      couponview: "",
      coupondelete: "",
      discountview: "",
      discountdelete: "",
      ordersview: "",
      ordersdelete: "",
      shippingview: "",
      shippingdelete: "",
      adminview: "",
      admindelete: "",
      pointsview: "",
      pointsdelete: "",
      giftofferview: "",
      giftofferdelete: "",
      appearanceview: "",
      appearancedelete: "",
      settingsview: "",
      settingsdelete: "",
      socialview: "",
      socialdelete: "",
      productview: "",
      productdelete: "",
      user_id: "",
      // Description: "",
      // Access: "",
      Status: "",
      createDt: "",
      modifyDt: "",
    });

    setCheckedOne("");
    setCheckedTwo("");
    setCheckedThree("");
    setCheckedFour("");
    setCheckedFive("");
    setCheckedSix("");
    setCheckedSeven("");
    setCheckedEight("");
    setCheckedNine("");
    setCheckedTen("");
    setCheckedEleven("");
    setCheckedTwelve("");
    setCheckedThirteen("");
    setCheckedFourteen("");
    setCheckedFifteen("");
    setCheckedSixteen("");
    setCheckedSeventeen("");
    setCheckedEighteen("");
    setCheckedNineteen("");
    setCheckedTwenty("");
    setCheckedTwentyone("");
    setCheckedTwentytwo("");
    setCheckedTwentythree("");
    setCheckedTwentyfour("");
    setCheckedTwentyfive("");
    setCheckedTwentysix("");

    // setFiles1([]);
    // setImageChange(false)
    GetRole();
    // setdescriptions('');
    setID("");
  };
  // const onFormSubmit = (form) => {
  //   // const User = form;
  //   let submittedData = {
  //     id: "",
  //     Name:"",
  //     RoleType:"",
  //     Description:"",
  //     Access:"",
  //     Status:"",
  //     createDt : "",
  //     modifyDt :""
  //   };
  //   setUser([submittedData, ...User]);
  //   setView({ add: false, details: false });
  //   resetForm();
  // };

  const onFormSubmit = (event) => {
    // event.preventDefault();
    if (ID) {
      Edit(ID);
    } else {
      Create();
    }
  };
  // const UserId = cookies.user_id;
  const Create = async (e) => {
    let formData = new FormData();
    formData.append("role_name", User.role_name);
    formData.append("categoryview", checkedOne == true ? 1 : 0);
    formData.append("categorydelete", checkedTwo == true ? 1 : 0);

    formData.append("catalogview", checkedThree == true ? 1 : 0);
    formData.append("catalogdelete", checkedFour == true ? 1 : 0);

    formData.append("productview", checkedTwentyfive == true ? 1 : 0);
    formData.append("productdelete", checkedTwentysix == true ? 1 : 0);

    formData.append("couponview", checkedFive == true ? 1 : 0);
    formData.append("coupondelete", checkedSix == true ? 1 : 0);

    formData.append("discountview", checkedSeven == true ? 1 : 0);
    formData.append("discountdelete", checkedEight == true ? 1 : 0);

    formData.append("ordersview", checkedNine == true ? 1 : 0);
    formData.append("ordersdelete", checkedTen == true ? 1 : 0);

    formData.append("vendorview", checkedNineteen == true ? 1 : 0);
    formData.append("vendordelete", checkedTwenty == true ? 1 : 0);

    formData.append("adminview", checkedThirteen == true ? 1 : 0);
    formData.append("admindelete", checkedFourteen == true ? 1 : 0);

    formData.append("pointsview", checkedFifteen == true ? 1 : 0);
    formData.append("pointsdelete", checkedSixteen == true ? 1 : 0);

    formData.append("appearanceview", checkedTwentyone == true ? 1 : 0);
    formData.append("appearancedelete", checkedTwentytwo == true ? 1 : 0);

    formData.append("shippingview", checkedEleven == true ? 1 : 0);
    formData.append("shippingdelete", checkedTwelve == true ? 1 : 0);

    formData.append("giftofferview", checkedSeventeen == true ? 1 : 0);
    formData.append("giftofferdelete", checkedEighteen == true ? 1 : 0);

    formData.append("socialview", checkedTwentythree == true ? 1 : 0);
    formData.append("socialdelete", checkedTwentyfour == true ? 1 : 0);

    // formData.append("permission", JSON.stringify(permissions));
    // formData.append("Description", User.Description)
    // formData.append("Access", User.Access)
    formData.append("Status", User.Status);
    formData.append("isActive", User.isActive);
    formData.append("user_id", 1);
    // formData.append("createDt", User.createDt)
    // formData.append("gender", User.modifyDt)
    console.log(...formData, "formDataaaaaaa");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    let Result = await axios.post(Role_Api, formData, config);
    console.log("ssssss", Result);
    if (Result) {
      setUser({
        role_name: "",
        permission: "",
        categoryview: "",
        categorydelete: "",
        catalogview: "",
        catalogdelete: "",
        couponview: "",
        coupondelete: "",
        discountview: "",
        discountdelete: "",
        ordersview: "",
        ordersdelete: "",
        shippingview: "",
        shippingdelete: "",
        adminview: "",
        admindelete: "",
        pointsview: "",
        pointsdelete: "",
        giftofferview: "",
        giftofferdelete: "",
        appearanceview: "",
        appearancedelete: "",
        settingsview: "",
        settingsdelete: "",
        socialview: "",
        socialdelete: "",
        productview: "",
        productdelete: "",
        user_id: "",
        // Description: "",
        // Access: "",
        Status: "",
        createDt: "",
        modifyDt: "",
      });

      // setFiles1([]);
      setState({ right: false });
      // if (
      //   catergoryCheck.View == true ||
      //   CatlogCheck.View == true ||
      //   CouponCheck.View === true ||
      //   DiscountCheck.View === true ||
      //   OrderCheck.View === true ||
      //   ShippingCheck.View === true ||
      //   AdminCheck.View === true ||
      //   PointsCheck.View === true ||
      //   GiftOfferCheck.View === true ||
      //   VendorCheck.View === true ||
      //   Appearance.View === true ||
      //   Settings.View === true ||
      //   Social.View === true
      // ) {

      toast.success("Role Added Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCheckedOne("");
      setCheckedTwo("");
      setCheckedThree("");
      setCheckedFour("");
      setCheckedFive("");
      setCheckedSix("");
      setCheckedSeven("");
      setCheckedEight("");
      setCheckedNine("");
      setCheckedTen("");
      setCheckedEleven("");
      setCheckedTwelve("");
      setCheckedThirteen("");
      setCheckedFourteen("");
      setCheckedFifteen("");
      setCheckedSixteen("");
      setCheckedSeventeen("");
      setCheckedEighteen("");
      setCheckedNineteen("");
      setCheckedTwenty("");
      setCheckedTwentyone("");
      setCheckedTwentytwo("");
      setCheckedTwentythree("");
      setCheckedTwentyfour("");
      setCheckedTwentyfive("");
      setCheckedTwentysix("");
      GetRole();
      setUser(false);
      onFormCancel();
      setcatergoryCheck({
        View: false,
        Delete: false,
      });
      setCatlogCheck({
        View: false,
        Delete: false,
      });
      setCouponCheck({
        View: false,
        Delete: false,
      });
      setDiscountCheck({
        View: false,
        Delete: false,
      });
      setOrderCheck({
        View: false,
        Delete: false,
      });
      setShippingCheck({
        View: false,
        Delete: false,
      });
      setAdminCheck({
        View: false,
        Delete: false,
      });
      setPointsCheck({
        View: false,
        Delete: false,
      });
      setGiftOfferCheck({
        View: false,
        Delete: false,
      });
      setVendorCheck({
        View: false,
        Delete: false,
      });
      setAppearance({
        View: false,
        Delete: false,
      });
      setSettings({
        View: false,
        Delete: false,
      });
      setSocial({
        View: false,
        Delete: false,
      });
      setUser({
        role_name: "",
        permission: "",
        user_id: "",
        // Description: "",
        // Access: "",
        Status: "",
        createDt: "",
        modifyDt: "",
      });
    }
  };

  const Edit = async (id) => {
    let formData = new FormData();
    // formData.append("role_name", User.role_name);
    // formData.append("permission", JSON.stringify(permissions));
    // formData.append("Description", User.Description)
    // formData.append("Access", User.Access)
    formData.append("Status", User.Status);
    formData.append("isActive", User.isActive);
    formData.append("User_id", 1);
    // formData.append("createDt", User.createDt)
    // formData.append("gender", User.modifyDt)

    formData.append("role_name", User.role_name);
    formData.append("categoryview", checkedOne == true ? 1 : 0);
    formData.append("categorydelete", checkedTwo == true ? 1 : 0);

    formData.append("catalogview", checkedThree == true ? 1 : 0);
    formData.append("catalogdelete", checkedFour == true ? 1 : 0);

    formData.append("productview", checkedTwentyfive == true ? 1 : 0);
    formData.append("productdelete", checkedTwentysix == true ? 1 : 0);

    formData.append("couponview", checkedFive == true ? 1 : 0);
    formData.append("coupondelete", checkedSix == true ? 1 : 0);

    formData.append("discountview", checkedSeven == true ? 1 : 0);
    formData.append("discountdelete", checkedEight == true ? 1 : 0);

    formData.append("ordersview", checkedNine == true ? 1 : 0);
    formData.append("ordersdelete", checkedTen == true ? 1 : 0);

    formData.append("vendorview", checkedNineteen == true ? 1 : 0);
    formData.append("vendordelete", checkedTwenty == true ? 1 : 0);

    formData.append("adminview", checkedThirteen == true ? 1 : 0);
    formData.append("admindelete", checkedFourteen == true ? 1 : 0);

    formData.append("shippingview", checkedEleven == true ? 1 : 0);
    formData.append("shippingdelete", checkedTwelve == true ? 1 : 0);

    formData.append("pointsview", checkedFifteen == true ? 1 : 0);
    formData.append("pointsdelete", checkedSixteen == true ? 1 : 0);

    formData.append("appearanceview", checkedTwentyone == true ? 1 : 0);
    formData.append("appearancedelete", checkedTwentytwo == true ? 1 : 0);

    formData.append("giftofferview", checkedSeventeen == true ? 1 : 0);
    formData.append("giftofferdelete", checkedEighteen == true ? 1 : 0);

    formData.append("socialview", checkedTwentythree == true ? 1 : 0);
    formData.append("socialdelete", checkedTwentyfour == true ? 1 : 0);

    // formData.append("settingsview", checkedTwentyone== true ? 1 : 0);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };

    try {
      const result = axios.put(`${Role_Api}/${id}`, formData, config);
      if (result) {
        GetRole();
        onFormCancel();
        setID("");
        setcatergoryCheck({
          View: false,
          Delete: false,
        });
        setCatlogCheck({
          View: false,
          Delete: false,
        });
        setCouponCheck({
          View: false,
          Delete: false,
        });
        setDiscountCheck({
          View: false,
          Delete: false,
        });
        setOrderCheck({
          View: false,
          Delete: false,
        });
        setShippingCheck({
          View: false,
          Delete: false,
        });
        setAdminCheck({
          View: false,
          Delete: false,
        });
        setPointsCheck({
          View: false,
          Delete: false,
        });
        setGiftOfferCheck({
          View: false,
          Delete: false,
        });
        setVendorCheck({
          View: false,
          Delete: false,
        });
        setAppearance({
          View: false,
          Delete: false,
        });
        setSettings({
          View: false,
          Delete: false,
        });
        setSocial({
          View: false,
          Delete: false,
        });

        setUser({
          // role_name: "",
          // permission: "",

          // Description: "",
          // Access: "",
          // Status: "",
          // createDt: "",
          // modifyDt: "",

          user_id: "",
          role_name: "",
          permission: "",
          categoryview: "",
          categorydelete: "",
          catalogview: "",
          catalogdelete: "",
          couponview: "",
          coupondelete: "",
          discountview: "",
          discountdelete: "",
          ordersview: "",
          ordersdelete: "",
          shippingview: "",
          shippingdelete: "",
          adminview: "",
          admindelete: "",
          pointsview: "",
          pointsdelete: "",
          giftofferview: "",
          giftofferdelete: "",
          appearanceview: "",
          appearancedelete: "",
          settingsview: "",
          settingsdelete: "",
          socialview: "",
          socialdelete: "",
          productview: "",
          productdelete: "",
          user_id: "",
          // Description: "",
          // Access: "",
          Status: "",
          createDt: "",
          modifyDt: "",
        });
        GetRole();
        // setFiles1([]);
        setState({ right: false });

        toast.success("Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) { }
    // window.location.href="/dashboard/product-tags"

    setCheckedOne("");
    setCheckedTwo("");
    setCheckedThree("");
    setCheckedFour("");
    setCheckedFive("");
    setCheckedSix("");
    setCheckedSeven("");
    setCheckedEight("");
    setCheckedNine("");
    setCheckedTen("");
    setCheckedEleven("");
    setCheckedTwelve("");
    setCheckedThirteen("");
    setCheckedFourteen("");
    setCheckedFifteen("");
    setCheckedSixteen("");
    setCheckedSeventeen("");
    setCheckedEighteen("");
    setCheckedNineteen("");
    setCheckedTwenty("");
    setCheckedTwentyone("");
    setCheckedTwentytwo("");
    setCheckedTwentythree("");
    setCheckedTwentyfour("");
    setCheckedTwentyfive("");
    setCheckedTwentysix("");
    GetRole();
  };

  const [files1, setFiles1] = useState([]);

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleAttributeStatus = async (Result, stat) => {
    var state = stat === 1 ? 0 : 1;
    // const { data } = await axios.put(`${API_Tags}/tag_status/${datas.tag_id}`, {


    const { data } = await axios.put(
      `${Role_Api}/${Result.role_id}`,
      {
        isActive: state,

        role_name: Result.role_name,
        categoryview: Result.categoryview,
        catalogview: Result.catalogview,
        catalogdelete: Result.catalogdelete,
        couponview: Result.couponview,
        coupondelete: Result.coupondelete,
        discountview: Result.discountview,
        discountdelete: Result.discountdelete,
        ordersview: Result.ordersview,
        ordersdelete: Result.ordersdelete,
        shippingview: Result.shippingview,
        shippingdelete: Result.shippingdelete,
        adminview: Result.adminview,
        admindelete: Result.admindelete,
        pointsview: Result.pointsview,
        pointsdelete: Result.pointsdelete,
        giftofferview: Result.giftofferview,
        giftofferdelete: Result.giftofferdelete,
        appearanceview: Result.appearanceview,
        appearancedelete: Result.appearancedelete,
        settingsview: Result.settingsview,
        settingsdelete: Result.settingsdelete,
        socialview: Result.socialview,
        socialdelete: Result.socialdelete,
        productview: Result.productview,
        productdelete: Result.productdelete,

        // settingsdelete:Result.settingsdelete,
        // settingsdelete:Result.settingsdelete,
        // settingsdelete:Result.settingsdelete,
        // categorydelete:Result.categorydelete,
        // catalogview: Result.catalogview
        // catalogdelete:Result.catalogdelete
        // couponview: Result
        // coupondelete: Result
        // discountview: 
        // discountdelete
        // ordersview: "",
        // ordersdelete: "",
        // shippingview: "",
        // shippingdelete: "",
        // adminview: "",
        // admindelete: "",
        // pointsview: "",
        // pointsdelete: "",
        // giftofferview: "",
        // giftofferdelete: "",
        // appearanceview: "",
        // appearancedelete: "",
        // settingsview: "",
        // settingsdelete: "",
        // socialview: "",
        // socialdelete: "",
        // productview: "",
        // productdelete: "",
        // Status: "",
        // user_id: "",
        // createDt: "",
        // modifyDt: "",
      },
      config
    );

    GetRole();
  };
  const handleInActive = async (data, stat) => {
    console.log(stat, "active");
    // var state = stat === 0 ? 1 : 0;
    // let { role_id } = data;
    // console.log(role_id, "Productlist_id");
    // const { datas } = await axios.put(`${API_UserRoles}/${role_id}`, { status: state }, config);
    // if (datas) {
    //   Getdata();
    // }
  };

  const disputesTableColumnsroles = [
    // { field: "RoleName", title: "Role" },
    { field: "role_name", title: "Role Name" },
    {
      field: "isActive",
      title: "Status",
      // render: (row) => (
      //   <Badge
      //     color="primary"
      //   >
      //     Active
      //   </Badge>
      // ),
      render: (row) => {
        if (row.status === 1) {
          // setactives(row.Status)
          return (
            <Button
              size="sm"
              color={row.isActive === 1 ? "success" : "primary"}
              onClick={() => handleAttributeStatus(row, row.isActive)}
            >
              {console.log(row, "rowrow")}
              {row.isActive === 1 ? "Active" : "InActive"}
            </Button>

          );
        }
      },
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
                    <DropdownItem tag="a" onClick={() => handleAttributeStatus(row, row.isActive)}>
                      {/* <Icon name=""></Icon> */}
                      <span>
                        {row.isActive == 1 ? (
                          <>
                            <span
                              style={{
                                color: "red",
                                fontSize: "44px",
                                paddingRight: "20px",
                                position: "relative",
                                bottom: "4px",
                                left: "4px",
                              }}
                            >
                              .
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                color: "green",
                                fontSize: "44px",
                                paddingRight: "20px",
                                position: "relative",
                                bottom: "4px",
                                left: "4px",
                              }}
                            >
                              .
                            </span>
                          </>
                        )}
                      </span>
                      <span>{row.isActive == 1 ? "InActive" : "Active"}</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem tag="a" onClick={() => EditTable(row, "add")}>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  {/* <li>
                    <DropdownItem tag="a" href="#">
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li> */}
                  <li>
                    <DropdownItem tag="a" onClick={() => DeleteOpen(row)}>
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

  const resetForm = () => {
    setUser({
      ...User,
      id: null,
      Name: "",
      RoleType: "",
      // Description:"",
      Access: "",
      Status: "",
      createDt: "",
      modifyDt: "",
    });
  };

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };
  // state---------------------

  // state----------------------

  const handleprevent = () => (event) => {
    setDiscountCheck({
      ...DiscountCheck,
      visible: !DiscountCheck.visible,
      View: !DiscountCheck.View,
      Add: !DiscountCheck.Add,
      Edit: !DiscountCheck.Edit,
      Delete: !DiscountCheck.Delete,
    });
  };

  const handlechangecart = () => {
    setShippingCheck({
      ...ShippingCheck,
      visible1: !ShippingCheck.visible1,
      View1: !ShippingCheck.View1,
      Add1: !ShippingCheck.Add1,
      Edit1: !ShippingCheck.Edit1,
      Delete1: !ShippingCheck.Delete1,
    });
  };

  const handlechangeDispute = () => {
    setCatlogCheck({
      ...CatlogCheck,
      visible: !CatlogCheck.visible,
      View: !CatlogCheck.View,
      Response: !CatlogCheck.Response,
      // Edit2: !CatlogCheck.Edit2,
      Delete: !CatlogCheck.Delete,
    });
  };

  const handlechangeAdminCheck = () => {
    setAdminCheck({
      ...AdminCheck,
      visible3: !AdminCheck.visible3,
      View3: !AdminCheck.View3,
      Add3: !AdminCheck.Add3,
      Edit3: !AdminCheck.Edit3,
      Delete3: !AdminCheck.Delete3,
    });
  };

  // cotrue = () => {
  //   setCouponCheck(
  //     {
  //       ...CouponCheck,
  //       visible: !CouponCheck.visible,
  //       View: !CouponCheck.View,
  //       Add: !CouponCheck.Add,
  //       Update: !CouponCheck.Update,
  //       Delete: !CouponCheck.Delete,
  //       Reply: !CouponCheck.Reply,
  //     }
  //   )
  // }

  const handlechangeOrderCheck = () => {
    setOrderCheck({
      ...OrderCheck,
      visible5: !OrderCheck.visible5,
      View5: !OrderCheck.View5,
      Add5: !OrderCheck.Add5,
      Fullfill5: !OrderCheck.Fullfill5,
      Cancel5: !OrderCheck.Cancel5,
      Archive5: !OrderCheck.Archive5,
      Delete5: !OrderCheck.Delete5,
    });
  };

  const handlechangecatergoryCheck = () => {
    setcatergoryCheck({
      ...catergoryCheck,
      visible: !catergoryCheck.visible,
      View: !catergoryCheck.View,
      Add: !catergoryCheck.Add,
      Edit: !catergoryCheck.Edit,
      Delete: !catergoryCheck.Delete,
    });
  };

  const handlechangeRefundheck = () => {
    setPointsCheck({
      ...PointsCheck,
      visible7: !PointsCheck.visible7,
      View7: !PointsCheck.View7,
      Initiate7: !PointsCheck.Initiate7,
      Update7: !PointsCheck.Update7,
      Approve7: !PointsCheck.Approve7,
    });
  };

  const handlechangeGiftOfferCheck = () => {
    setGiftOfferCheck({
      ...GiftOfferCheck,
      visible8: !GiftOfferCheck.visible8,
      View8: !GiftOfferCheck.View8,
      Add8: !GiftOfferCheck.Add8,
      Edit8: !GiftOfferCheck.Edit8,
      Delete8: !GiftOfferCheck.Delete8,
    });
  };

  const handlechangeVendorCheck = () => {
    setVendorCheck({
      ...VendorCheck,
      visible9: !VendorCheck.visible9,
      View9: !VendorCheck.View9,
      Add9: !VendorCheck.Add9,
      Edit9: !VendorCheck.Edit9,
      Delete9: !VendorCheck.Delete9,
      Login9: !VendorCheck.Login9,
    });
  };

  // ------------------------------------------------------

  const attributeChange = (name) => (event) => {
    setcatergoryCheck({ ...catergoryCheck, [name]: event.target.checked });
  };
  const attributeChange1 = (name) => (event) => {
    setCatlogCheck({ ...CatlogCheck, [name]: event.target.checked });
  };
  const attributeChange2 = (name) => (event) => {
    setCouponCheck({ ...CouponCheck, [name]: event.target.checked });
  };
  const attributeChange3 = (name) => (event) => {
    setDiscountCheck({ ...DiscountCheck, [name]: event.target.checked });
  };
  const attributeChange4 = (name) => (event) => {
    setOrderCheck({ ...OrderCheck, [name]: event.target.checked });
  };
  const attributeChange5 = (name) => (event) => {
    setShippingCheck({ ...ShippingCheck, [name]: event.target.checked });
  };
  const attributeChange6 = (name) => (event) => {
    setAdminCheck({ ...AdminCheck, [name]: event.target.checked });
  };
  const attributeChange7 = (name) => (event) => {
    setPointsCheck({ ...PointsCheck, [name]: event.target.checked });
  };
  const attributeChange8 = (name) => (event) => {
    setGiftOfferCheck({ ...GiftOfferCheck, [name]: event.target.checked });
  };
  const attributeChange9 = (name) => (event) => {
    setVendorCheck({ ...VendorCheck, [name]: event.target.checked });
  };
  const attributeChange10 = (name) => (event) => {
    setAppearance({ ...Appearance, [name]: event.target.checked });
  };
  const attributeChange11 = (name) => (event) => {
    setSettings({ ...Settings, [name]: event.target.checked });
  };
  const attributeChange12 = (name) => (event) => {
    setSocial({ ...Social, [name]: event.target.checked });
  };
  // -------------------------------------------------------
  const handleopenview = async (type, data) => {
    setView({
      Viewdetails: type === "Viewdetails" ? true : false,
    });

    setUser({
      ...User,
      Name: data.role_name,
      // email_address: data.email_address,
      // phone_number: data.phone_number,
      // designation: data.designation,
      // role_id: data.role_id,
      // warehouse_id: data.warehouse_id,
    });
  };
  const handleDeleteRows = (event, rowData) => {
    let update = rowData.map((curreles, index) => {
      let a = {
        value: curreles.role_id,
      }
      return a;
    })
    let formData = new FormData();
    formData.append("deleteid", JSON.stringify(update));
    formData.append("type", "roles");
    try {
      axios.put(`${API_URL}/admin/BulkDelete/bulkDeletedata`, formData, config).then((res) => {

        if (res.data.statusCode == 200) {
          toast.success("Deleted Successfully! ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          GetRole();
        }
        else {
          console.log("login");
          toast.error("Something wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })

    } catch (error) {

    }
  };
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  return (
    <React.Fragment>
      <Head title="User Roles List" />
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
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <Icon name="plus" className="add-icon-default"></Icon>&nbsp;
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={() => {
                            toggle("add");
                          }}
                        >
                          <Icon name="plus" className="add-icon-default"></Icon>&nbsp;
                          <span>Add Role</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
        </Block>
        {/* 
        <MuiThemeProvider theme={Tabletheme()}>
          <MaterialTable
            icons={tableIcons}
            columns={disputesTableColumnsroles}
            data={dataList}
            title="User Roles"
            options={options}
          />
        </MuiThemeProvider> */}
        <CustomDataTable
          icons={tableIcons}
          data={reversed}
          columns={disputesTableColumnsroles}
          title="User Role List"
          actions={[
            {
              icon: "delete",
              tooltip: "Delete All Rows",
              onClick: handleDeleteRows
            },
          ]}
        />

        <Modal isOpen={view.add} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">{ID ? "Edit Role" : "Add Role"}</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Role Name*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Role Name"
                            name="role_name"
                            onChange={handleChange}
                            // ref={register({ required: "This is required" })}
                            Value={User.role_name}
                            required
                          />
                          {/* {errors.customer && <permissspan className="invalid">{errors.customer.message}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="is_active">
                          {" "}
                          Status{" "}
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            // onChange={handleStatus}
                            options={[
                              { value: "1", label: "Active" },
                              { value: "0", label: "InActive" },
                            ]}
                            name="status"
                            //value={isActive}
                            placeholder="Select"
                            required
                            onChange={handleChangeisActive}
                            value={active}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex my-3">
                    <div>
                      <h5>MODULES</h5>
                    </div>
                    <div style={{ marginLeft: "39%" }}>
                      <h5>PERMISSIONS</h5>
                    </div>
                  </div>
                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="package-fill" /> CATEGORY
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            name="categoryview"
                            value={User.categoryview}
                            checked={checkedOne}
                            onChange={(e) => updateOne(e)}
                            id="customCheck1"
                          />
                          <label className="custom-control-label" htmlFor="customCheck1">
                            View
                          </label>

                          {/* <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            id="customCheck1"
                            checked={catergoryCheck.View}
                            onChange={attributeChange("View")}
                          />
                          <label className="custom-control-label" htmlFor="customCheck1">
                            View
                          </label> */}
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            name="categorydelete"
                            value={User.categorydelete}
                            checked={checkedTwo}
                            onChange={updateTwo}
                            id="customCheck2"
                          />
                          <label className="custom-control-label" htmlFor="customCheck2">
                            Delete
                          </label>
                        </div>
                        {/* <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            id="customCheck11"
                            checked={catergoryCheck.Delete}
                            onChange={attributeChange("Delete")}
                          />
                          <label className="custom-control-label" htmlFor="customCheck11">
                            Delete
                          </label>
                        </div> */}
                      </Col>
                    </Row>
                  </div>
                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="cc-alt2-fill" /> CATALOG
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            name="catalogview"
                            className="custom-control-input form-control"
                            id="customCheck3"
                            // checked={CatlogCheck.View}
                            // onChange={attributeChange1("View")}
                            value={User.catalogview}
                            checked={checkedThree}
                            onChange={updateThree}
                          />
                          <label className="custom-control-label" htmlFor="customCheck3">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // onChange={attributeChange1("Delete")}
                            // checked={CatlogCheck.Delete}
                            id="customCheck4"
                            name="catalogdelete"
                            value={User.catalogdelete}
                            checked={checkedFour}
                            onChange={updateFour}
                          />
                          <label className="custom-control-label" htmlFor="customCheck4">
                            Delete
                          </label>
                        </div>
                        {/* <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            id="customCheck4"
                            onChange={attributeChange1("Delete")}
                            checked={CatlogCheck.Delete}
                          />
                          <label className="custom-control-label" htmlFor="customCheck4">
                            Delete
                          </label>
                        </div> */}
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="card-view" />
                            &nbsp;&nbsp;PRODUCT
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck12"
                            // onChange={attributeChange11("View")}
                            // checked={Settings.View}

                            id="customCheck25"
                            name="productview"
                            value={User.productview}
                            checked={checkedTwentyfive}
                            onChange={updateTwentyfive}
                          />
                          <label className="custom-control-label" htmlFor="customCheck25">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck122"
                            // onChange={attributeChange11("Delete")}
                            // checked={Settings.Delete}

                            id="customCheck26"
                            name="productdelete"
                            value={User.productdelete}
                            checked={checkedTwentysix}
                            onChange={updateTwentysix}
                          />
                          <label className="custom-control-label" htmlFor="customCheck26">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="activity-round-fill" /> COUPON
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck3"
                            // checked={CouponCheck.View}
                            // onChange={attributeChange2("View")}
                            id="customCheck5"
                            name="couponview"
                            value={User.couponview}
                            checked={checkedFive}
                            onChange={updateFive}
                          />
                          <label className="custom-control-label" htmlFor="customCheck5">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck33"
                            // checked={CouponCheck.Delete}
                            // onChange={attributeChange2("Delete")}

                            id="customCheck6"
                            name="coupondelete"
                            value={User.coupondelete}
                            checked={checkedSix}
                            onChange={updateSix}
                          />
                          <label className="custom-control-label" htmlFor="customCheck6">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="offer-fill" /> DISCOUNT
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck4"
                            // checked={DiscountCheck.View}
                            // onChange={attributeChange3("View")}

                            id="customCheck7"
                            name="discountview"
                            value={User.discountview}
                            checked={checkedSeven}
                            onChange={updateSeven}
                          />
                          <label className="custom-control-label" htmlFor="customCheck7">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck44"
                            // checked={DiscountCheck.Delete}
                            // onChange={attributeChange3("Delete")}

                            id="customCheck8"
                            name="discountdelete"
                            value={User.discountdelete}
                            checked={checkedEight}
                            onChange={updateEight}
                          />
                          <label className="custom-control-label" htmlFor="customCheck8">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="file-docs" /> ORDERS
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck5"
                            // checked={OrderCheck.View}
                            // onChange={attributeChange4("View")}

                            id="customCheck9"
                            name="ordersview"
                            value={User.ordersview}
                            checked={checkedNine}
                            onChange={updateNine}
                          />
                          <label className="custom-control-label" htmlFor="customCheck9">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck55"
                            // onChange={attributeChange4("Delete")}
                            // checked={OrderCheck.Delete}

                            id="customCheck10"
                            name="ordersdelete"
                            value={User.ordersdelete}
                            checked={checkedTen}
                            onChange={updateTen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck10">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="bag" /> VENDORS
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck10"
                            // onChange={attributeChange9("View")}
                            // checked={VendorCheck.View}

                            id="customCheck30"
                            name="vendorview"
                            value={User.vendorview}
                            checked={checkedNineteen}
                            onChange={updateNineteen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck30">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck100"
                            // onChange={attributeChange9("Delete")}
                            // checked={VendorCheck.Delete}

                            id="customCheck19"
                            name="vendordelete"
                            value={User.vendordelete}
                            checked={checkedTwenty}
                            onChange={updateTwenty}
                          />
                          <label className="custom-control-label" htmlFor="customCheck19">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="users-fill" /> ADMIN
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck7"
                            // onChange={attributeChange6("View")}
                            // checked={AdminCheck.View}

                            id="customCheck13"
                            name="adminview"
                            value={User.adminview}
                            checked={checkedThirteen}
                            onChange={updateThirteen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck13">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck77"
                            // onChange={attributeChange6("Delete")}
                            // checked={AdminCheck.Delete}

                            id="customCheck14"
                            name="admindelete"
                            value={User.admindelete}
                            checked={checkedFourteen}
                            onChange={updateFourteen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck14">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="coin" /> POINTS
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck8"
                            // onChange={attributeChange7("View")}
                            // checked={PointsCheck.View}

                            id="customCheck15"
                            name="pointsview"
                            value={User.pointsview}
                            checked={checkedFifteen}
                            onChange={updateFifteen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck15">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck88"
                            // onChange={attributeChange7("Delete")}
                            // checked={PointsCheck.Delete}

                            id="customCheck16"
                            name="pointsdelete"
                            value={User.pointsdelete}
                            checked={checkedSixteen}
                            onChange={updateSixteen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck16">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="growth-fill" /> APPEARANCE
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck1111"
                            // onChange={attributeChange10("View")}
                            // checked={Appearance.View}

                            id="customCheck20"
                            name="appearanceview"
                            value={User.appearanceview}
                            checked={checkedTwentyone}
                            onChange={updateTwentyone}
                          />
                          <label className="custom-control-label" htmlFor="customCheck20">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck111"
                            // onChange={attributeChange10("Delete")}
                            // checked={Appearance.Delete}

                            id="customCheck21"
                            name="appearancedelete"
                            value={User.appearancedelete}
                            checked={checkedTwentytwo}
                            onChange={updateTwentytwo}
                          />
                          <label className="custom-control-label" htmlFor="customCheck21">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="sign-dash-alt" /> SHIPPING
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck6"
                            // checked={ShippingCheck.View}
                            // onChange={attributeChange5("View")}

                            id="customCheck11"
                            name="shippingview"
                            value={User.shippingview}
                            checked={checkedEleven}
                            onChange={updateEleven}
                          />
                          <label className="custom-control-label" htmlFor="customCheck11">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck66"
                            // onChange={attributeChange5("Delete")}
                            // checked={ShippingCheck.Delete}

                            id="customCheck12"
                            name="shippingdelete"
                            value={User.shippingdelete}
                            checked={checkedTwelve}
                            onChange={updateTwelve}
                          />
                          <label className="custom-control-label" htmlFor="customCheck12">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="gift" /> GIFT OFFERS
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck9"
                            // onChange={attributeChange8("View")}
                            // checked={GiftOfferCheck.View}

                            id="customCheck17"
                            name="giftofferview"
                            value={User.giftofferview}
                            checked={checkedSeventeen}
                            onChange={updateSeventeen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck17">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck99"
                            // onChange={attributeChange8("Delete")}
                            // checked={GiftOfferCheck.Delete}

                            id="customCheck18"
                            name="giftofferdelete"
                            value={User.giftofferdelete}
                            checked={checkedEighteen}
                            onChange={updateEighteen}
                          />
                          <label className="custom-control-label" htmlFor="customCheck18">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p style={{ fontSize: "18px" }}>
                            <Icon name="setting-fill" />
                            &nbsp;&nbsp;SETTINGS
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck12"
                            // onChange={attributeChange11("View")}
                            // checked={Settings.View}

                            id="customCheck22"
                            name="settingsview"
                            value={User.settingsview}
                            checked={checkedTwentythree}
                            onChange={updateTwentythree}
                          />
                          <label className="custom-control-label" htmlFor="customCheck22">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck122"
                            // onChange={attributeChange11("Delete")}
                            // checked={Settings.Delete}

                            id="customCheck23"
                            name="settingsdelete"
                            value={User.settingsdelete}
                            checked={checkedTwentyfour}
                            onChange={updateTwentyfour}
                          />
                          <label className="custom-control-label" htmlFor="customCheck23">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div> */}

                  {/* <div className="form_container">
                    <Row>
                      <Col md="4">
                        <div>
                          <p>
                            <Icon name="book" style={{ fontSize: "20px" }} />{" "}
                            <span style={{ fontSize: "18px" }}>SOCIAL</span>
                          </p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck13"
                            // onChange={attributeChange12("View")}
                            // checked={Social.View}

                            id="customCheck24"
                            name="socialview"
                            value={User.socialview}
                            checked={checkedTwentyfour}
                            onChange={updateTwentyfour}
                          />
                          <label className="custom-control-label" htmlFor="customCheck24">
                            View
                          </label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="custom-control custom-checkbox mx-5 mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            // id="customCheck133"
                            // onChange={attributeChange12("Delete")}
                            // checked={Social.Delete}

                            id="customCheck28"
                            name="socialdelete"
                            value={User.socialdelete}
                            checked={checkedTwentyfive}
                            onChange={updateTwentyfive}
                          />
                          <label className="custom-control-label" htmlFor="customCheck28">
                            Delete
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </div> */}

                  <Col size="12" className="mt-3 p-2 d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      <span>{ID ? "UPDATE" : "SAVE"}</span>
                    </Button>
                  </Col>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={modalFail} toggle={toggleModalFail}>
          <ModalBody className="modal-body-lg text-center">
            <div className="nk-modal">
              <Icon
                className={
                  Deleteicon
                    ? "nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"
                    : "nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
                }
              ></Icon>
              {/* <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger"></Icon> */}
              <h4 className="nk-modal-title">{Deleteicon ? "Roles deleted successfully" : "Do you want delete"}</h4>
              {Deleteicon ? (
                <></>
              ) : (
                <>
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
                </>
              )}
            </div>
          </ModalBody>
        </Modal>
      </Content>
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
      />
    </React.Fragment>
  );
};
export default Roles;
