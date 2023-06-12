import React, { useEffect, useState, forwardRef, useRef } from "react";
import Content from "../../../layout/content/Content";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PreviewCard, Button, Icon, Row, Col, RSelect, Block, CustomDataTable
} from "../../../components/Component";
import { messageData } from "./MessageData";
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
  TabPane,
  Badge
} from "reactstrap";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";

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
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Link, useLocation } from "react-router-dom";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from "axios";
import { API_URL, API_Product, API_Warehouse, API_Vendor_Brand, API_Brand, API_Category, API_Tags, API_Attribute, API_SubCategory, API_ChildCategory, token } from "../../../Api";
import User from "../../../images/avatar/b-sm.jpg";
const API_Image = `${API_URL}/Product_image`

const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  },
};

const API_Key = `${API_URL}/create-product`;
// const API_Key_vendor = `${API_URL}/UserVendor`;
const API_Key_vendor = `${API_URL}/admin/vendors`;

const API_Key_AttributeValue = `${API_URL}/get-attribute/attributenames`;
const Products_Attribute_value_get = `${API_URL}/AttributeGet/dropdown`;
var AttributeTempARR = [];

const ProductListAddEdit = () => {

  const [attrvalue1, setattrvalue1] = useState("");
  const [attrvalue2, setattrvalue2] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [AttributeValueInput, setAttributeValueInput] = useState([]);
  const [AttributeNameInputs, setAttributeNameInputs] = useState([]);
  const [Attdata, setAttdata] = useState([]);
  const AttrColorChange = async (event) => {

    const attrvaluee = event.value;
    // setattrvalue1(event.value);
    if (attrvaluee) {

      const datss = await axios.post(`${API_Key_AttributeValue}`, { _id: event.value })
      setattrvalue2([]);
      datss.data.map((items) => {
        // console.log("rrr", items)
        items.AttributeValue.map(attr => {
          const datas = {
            value: attr._id,
            label: attr.AttributeValue
          }
          setattrvalue2(items => [...items, datas])
        })
      })
      setattrvalue1(datss.data[0])

      // setattrvariant1(true)
    }

    else {
      console.log("hello");
    }
  }

  const location = useLocation();
  const [files, setFiles] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [AttributeTabs, setAttributeTabs] = useState(false);
  const [Subattribute, setSubattribute] = useState(false);
  const [BtnSave, setBtnSave] = useState(true);
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState(messageData);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [filterText, setFilterText] = useState("");
  const [ProductType, setProductType] = useState({ value: "Simple", label: "Simple" });
  const [CountryofOriginpe, setCountryofOriginpe] = useState([]);
  const [UpsellProducts, setUpsellProducts] = useState([]);
  const [CrossSellProducts, setCrossSellProducts] = useState([]);
  const [ProductTags, setProductTags] = useState([]);
  const [ShortDescription, setShortDescription] = useState('');
  const [ProductVariety, setProductVariety] = useState('');
  const [FullDescription, setFullDescription] = useState('');
  const [TopContent, setTopContent] = useState('');
  const [BottomContent, setBottomContent] = useState('');
  const [warehousee, setWarehousee] = useState("")
  const [SelectVendor, setSelectVendor] = useState('');
  const [SelectWarehouse, setSelectWarehouse] = useState('');
  const [TaxStatus, setTaxStatus] = useState('');
  const [SelectGST, setSelectGST] = useState('');
  const [LowStockNotification, setLowStockNotification] = useState('');
  const [preOrderAction, setPreOrderAction] = useState("");
  const [ProductReview, setProductReview] = useState('');
  const [ExpiryRule, setExpiryRule] = useState('');
  const [status, setStatus] = useState('');
  const [returnable, setReturnable] = useState('');
  const [UPLOADIMAGES, setUPLOADIMAGES] = useState('');
  const [Galleryimages, setGalleryimages] = useState('');
  const [MainCategory, setMainCategory] = useState('');
  const [SubCategory, setSubCategory] = useState('');
  const [ChildCategory, setChildCategory] = useState('');
  const [toggleBtn, settoggleBtn] = useState(false)
  const [Brand, setBrand] = useState('');
  const [MetaDescription, setMetaDescription] = useState('');
  const [AttributeName, setAttributeName] = useState('');
  const [AttributeValue, setAttributeValue] = useState([]);
  const [ATTSelectVendor, setATTSelectVendor] = useState('');
  const [ATTSelectWarehouse, setATTSelectWarehouse] = useState('');
  const [ATTTaxStatus, setATTTaxStatus] = useState('');
  const [ATTSelectGST, setATTSelectGST] = useState('');
  const [ATTLowStockNotification, setATTLowStockNotification] = useState('');
  const [ATTExpiryRule, setATTExpiryRule] = useState('');
  const [ATTProductReview, setATTProductReview] = useState('');
  const [ATTProductImage, setATTProductImage] = useState('');
  const [ATTProductGallery, setATTProductGallery] = useState('');
  const [Tags, SetTags] = useState([]);
  const [Vendor, SetVendor] = useState([]);
  const [MainCate, SetMainCate] = useState([]);
  const [Subcate, setSubcate] = useState([]);
  const [Childcate, setChildcate] = useState([]);
  const [branddata, Setbranddata] = useState([]);
  const [products, setProducts] = useState([]);
  const [attrvariant1, setattrvariant1] = useState(false);
  const [GetAttributenames, SetGetAttributename] = useState([]);
  const [ATTRDAT, setATTRDAT] = useState([]);
  const [ID, setID] = useState('');
  const [ATTRID, SetATTRID] = useState('');
  const [AttributesValuesFinal, setAttributesValuesFinal] = useState([]);
  const { errors, register, handleSubmit } = useForm();
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);
  const [file, setFile] = useState([]);
  const [multipleimage, setMultipleImage] = useState([])
  const [mulImgView, setMulImgView] = useState([]);
  const [filesview, setFilesView] = useState('');
  const [AttributelValues, setAttributelValues] = useState([]);
  const [Product, setProduct] = useState({
    ProductType: '',
    CountryOfOrigin: '',
    ProductName: '',
    ProductImage: '',
    Country: '',
    UpsellProducts: '',
    CrossSellProducts: '',
    ProductTags: '',
    ShortDescription: '',
    FullDescription: '',
    SelectVendor: '',
    SelectWarehouse: '',
    CatelogVisibility: false,
    EAN: '',
    LowStockQuandity: '',
    PeriodOfTime: '',
    SKU1: '',
    SKU2: '',
    YoutubeLink: '',
    ReturnDays: '',
    HSN: '',
    SKU: '',
    RegularPrice: '',
    SalePrice: '',
    OfferDiscount: '',
    TaxStatus: '',
    GST: '',
    ProductLength: '',
    ProductBreadth: '',
    ProductHeight: '',
    ProductWeight: '',
    ManageStock: '',
    UploadImages: '',
    Galleryimages: '',
    LowStockNotification: '',
    PreOrderQuantity: '',
    SoldIndividual: '',
    FromDate: '',
    EndDate: '',
    ProductReview: '',
    ProductExpiryDate: '',
    ExpiryRule: '',
    PointsEarn: '',
    MainCategory: '',
    SubCategory: '',
    ChildCategory: '',
    Brands: '',
    MetaTitle: '',
    MetaSlug: '',
    MetaDescription: '',
    AttributeName: '',
  });

  const clearState = () => {
    setProduct({
      ...Product,
      Product: '',
      ProductType: '',
      ProductName: '',
      Country: '',
      UpsellProducts: '',
      CrossSellProducts: '',
      ProductTags: '',
      ShortDescription: '',
      FullDescription: '',
      SelectVendor: '',
      SelectWarehouse: '',
      HSN: '',
      SKU: '',
      RegularPrice: '',
      SalePrice: '',
      OfferDiscount: '',
      TaxStatus: '',
      GST: '',
      ProductLength: '',
      ProductBreadth: '',
      ProductHeight: '',
      ProductWeight: '',
      ManageStock: '',
      UploadImages: '',
      Galleryimages: '',
      LowStockNotification: '',
      PreOrderQuantity: '',
      SoldIndividual: '',
      FromDate: '',
      EndDate: '',
      ProductReview: '',
      ProductExpiryDate: '',
      ExpiryRule: '',
      PointsEarn: '',
      MainCategory: '',
      SubCategory: '',
      ChildCategory: '',
      Brands: '',
      MetaTitle: '',
      MetaSlug: '',
      MetaDescription: '',
      AttributeName: '',
      ProductImage: '',
      CatelogVisibility: false,
      EAN: '',
      LowStockQuandity: '',
      PeriodOfTime: '',
      SKU1: '',
      SKU2: '',
      YoutubeLink: '',
      ReturnDays: '',
    });
    setFilesView('');
    setProductType('');
    setMulImgView([])
    setFiles([])
    setCountryofOriginpe('');
    setUpsellProducts('');
    setCrossSellProducts('');
    setProductTags('');
    setShortDescription('');
    setFullDescription('');
    setSelectVendor('');
    setSelectWarehouse('');
    setTaxStatus('');
    setSelectGST('');
    setLowStockNotification('');
    setProductReview('');
    setExpiryRule('');
    setUPLOADIMAGES('');
    setGalleryimages('');
    setMainCategory('');
    setSubCategory('');
    setChildCategory('');
    setMetaDescription('');
    setAttributeName('');
    setBrand('');
    setBtnSave(false)
  }
  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  const Tabletheme = () => createTheme({
    root: {
      "& MuiButtonBase": {
        display: 'block !important'
      }
    },

  });
  // const tabsel="1"
  const [activeIconTab, setActiveIconTab] = useState("1");

  // if (Subattribute){
  //   activeIconTab="2"
  //  }else{
  //   // console.log("FALSEFALSEFALSEFALSEFALSE")
  //   // tabsel=1

  //  }

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  //
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

  useEffect(() => {
    if (location.state) {

    } else {
      setSubattribute(true);
    }
    // GetTags();
    GetVendors();
    GetdataAttribute();
    GetProduct();
    GetMainCate();
    // GetBrand();
    GetAttributename();
    GetData();

  }, []);


  const GetData = async () => {
    if (location.state) {
      setID(location.state)
      const { data } = await axios.get(`${API_Product}/${location.state}`, config);
      console.log(data, "dattttt")
      const ResultBrands = await axios.get(`${API_Brand}/${data.list[0].BrandID}`, config);
      const ResultVendor = await axios.get(`${API_Key_vendor}/${data.list[0].Vendor_id}`, config);

      // console.log("ResultVendor", ResultVendor);
      setProduct({
        ...Product,
        ProductName: data.list[0].ProductName,
        CountryOfOrigin: data.list[0].CountryofOrigin,
        HSN: data.list[0].HSN,
        SKU: data.list[0].SKU,
        RegularPrice: data.list[0].RegularPrice,
        SalePrice: data.list[0].SalePrice,
        OfferDiscount: data.list[0].OfferDiscount,
        ProductLength: data.list[0].ProductLength,
        ProductBreadth: data.list[0].ProductBreadth,
        ProductHeight: data.list[0].ProductHeight,
        ProductWeight: data.list[0].ProductWeight,
        ManageStock: data.list[0].ManageStock,
        PreOrderQuantity: data.list[0].PreOrderQuantity,
        SoldIndividual: data.list[0].SoldIndividual,
        FromDate: data.list[0].FromDate,
        EndDate: data.list[0].EndDate,
        ProductExpiryDate: data.list[0].ProductExpiryDate,
        PointsEarn: data.list[0].Points,
        MetaTitle: data.list[0].MetaTitle,
        MetaSlug: data.list[0].MetaSlug,
        MetaDescription: data.list[0].MetaDescription,
        CatelogVisibility: data.list[0].CatelogVisibility,
        EAN: data.list[0].EAN,
        LowStockQuandity: data.list[0].LowStockQuandity,
        PeriodOfTime: data.list[0].PeriodOfTime,
        SKU1: data.list[0].SKU1,
        SKU2: data.list[0].SKU2,
        YoutubeLink: data.list[0].YoutubeLink,
        ReturnDays: data.list[0].ReturnDays,
        ProductImage: data.list[0].ProductImage,
        ProductTags: data.list[0].ProductTags
      })
      // setFile([data.list.ProductImage])
      // setMultipleImage(data.list.ProductGalleryImages)
      setProductVariety(data.list[0].Product_variety)
      setFilesView(data.list[0].ProductImage)
      setMulImgView(data.list[0].productgalleryimages)
      setProductType({ value: data.list[0].ProductType, label: data.list[0].ProductType })
      setBrand({ value: ResultBrands.data.list[0].id, label: ResultBrands.data.list[0].name })
      setSelectVendor({ value: ResultVendor.data.list[0].vendor_id, label: ResultVendor.data.list[0].company_name })

      setUpsellProducts(data.list[0].UpsellProducts)
      setCrossSellProducts(data.list[0].CrossSellProducts)
      // console.log(data.list[0].ProductTags)
      // setProductTags(data.list[0].ProductTags)
      setShortDescription(data.list[0].ShortDescription)
      setFullDescription(data.list[0].FullDescription)
      setTopContent(data.list[0].TopContent)
      setBottomContent(data.list[0].BottomContent)
      // setSelectVendor({ value: Resultvendor.data._id, label: Resultvendor.data.CompanyName })
      setSelectWarehouse(data.list[0].Warehouse)
      data.list[0].TaxStatus == "" ? "" : setTaxStatus({ value: data.list[0].TaxStatus, label: data.list[0].TaxStatus })
      data.list[0].GST == "" ? "" : setSelectGST({ value: data.list[0].GST, label: data.list[0].GST })
      data.list[0].LowStockNotification == "" ? "" : setLowStockNotification({ value: data.list[0].LowStockNotification, label: data.list[0].LowStockNotification })
      // const order = data.list[0].PreOrder ==true  ? 'Enable' : 'Disable'
      data.list[0].PreOrder == "" ? "" : setPreOrderAction({ value: data.list[0].PreOrder, label: data.list[0].PreOrder })
      // const review = data.list[0].ProductReview==true ? 'Enable' : 'Disable'
      data.list[0].ProductReview == "" ? "" : setProductReview({ value: data.list[0].ProductReview, label: data.list[0].ProductReview })
      // const rule = data.list[0].ExpiryRule==true ? 'Enable' : 'Disable'
      data.list[0].ExpiryRule == "" ? "" : setExpiryRule({ value: data.list[0].ExpiryRule, label: data.list[0].ExpiryRule })
      const stat = data.list[0].Status == 1 ? 'Active' : 'InActive'
      data.list[0].Status == "" ? "" : setStatus({ value: stat, label: stat })
      // const ret = data.list[0].Returnable==true ? 'Yes' : 'No'
      data.list[0].Returnable == "" ? "" : setReturnable({ value: data.list[0].Returnable, label: data.list[0].Returnable })
      setMainCategory(data.list[0].MainCategory)
      setSubCategory(data.list[0].SubCategory)
      setChildCategory(data.list[0].ChildCategory)
      setMetaDescription(data.list[0].MetaDescription)
      setBtnSave(false)
      if (data.list[0].ProductType == "Simple") {
        setAttributeTabs(false)
      } else {
        setAttributeTabs(true)
      }
      if (data.list[0].Product_variety == "Sub") {
        setSubattribute(false)
        setActiveIconTab("1")
      } else {
        setSubattribute(true)
        setActiveIconTab("1")
      }
      // activeIconTab="2"
      // console.log(Subattribute,"truetruetruetruetruetrue")

      if (data.list[0].AttributeName) {
        // //   // setATTRDAT([]);
        // data.list[0].AttributeName.map(items => {

        //   if (items) {
        //     // console.log(items.Attribute_name,"datatatataatataatata")
        //     const Datas = {
        //       value: items.id,
        //       label: items.Attribute_name
        //     }
        //     // setInputFields((item)=>[...item, Datas])
        //   }
        // })
        data.list[0].AttributeValue.map((items) => {

          const Datas = {
            value: items.id,
            label: items.Attribute_name,
            AttributeValue: items.Item
          }
          // console.log(Datas, "AttributeValueAttributeValueAttributeValue")
          setInputFields((item) => [...item, Datas])
          // setAttributesValuesFinal(items.Item)
          // setAttributesValuesFinal((item)=>[...item, items.Item])
        })
      }
    }
  }

  const GetdataAttribute = async () => {
    setAttdata([])
    const Result = await axios.get(`${API_Attribute}`, config)

    // console.log("tttttt",Result.data)
    if (Result.data) {
      Result.data.list.map((Attributeitem) => {
        const Getdatas = {
          value: Attributeitem.id,
          label: Attributeitem.Attribute_name
        }
        // console.log("ssss", Getdatas)
        setAttdata((datass) => [...datass, Getdatas]);
      })
    }
  };
  // const GetTags = async () => {
  //   const { data } = await axios.get(`${API_Tags}`, config)
  //   const res = data.list.map(itemstag => {
  //     const datss = {
  //       value: itemstag.tag_id,
  //       label: itemstag.tag_name
  //     }
  //     return datss
  //   })
  //   // setProductTags((items) => [...items, datas])
  //   SetTags(res)
  // }

  const GetProduct = async () => {
    const { data } = await axios.get(`${API_Product}`, config)
    // const newData = data.list.filter(ss => ss.Status === true)
    const res = data.list.map(itemstag => {
      const datss = {
        value: itemstag.Productlist_id,
        label: itemstag.ProductName
      }
      // console.log(datss, "upselllllllllllllllllllll")
      return datss
    })
    setProducts(res)
  }

  const AttibuteValuesOnchages = async (inputField, e, index, Attribute_value) => {
    const values = [...inputFields];
    let att = {};
    e.map((items) => {
      if (items.Attributeid !== undefined) {
        att = { label: items.Attribute_name, value: items.Attributeid }
      } else if (inputField !== undefined) {
        att = { label: inputField.label, value: inputField.value }
      }

    })

    const arrobj = [
      {
        "value": att.value,
        "label": att.label,
        "AttributeValue": [e]
      }
    ]
    values[index] = arrobj
    setInputFields(values);
    // console.log(values, "lllllllllllllllll")
  }
  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    clearState()
    // resetForm();
  };

  const GetVendors = async () => {
    const { data } = await axios.get(`${API_Key_vendor}`, config)
    // console.log("dddddddd", data);
    data.list.map(itemsvendor => {
      const dataas = {
        value: itemsvendor.vendor_id,
        label: itemsvendor.company_name
      }
      SetVendor((items) => [...items, dataas]);
    })
  }
  const [subware, setSubware] = useState([]);
  const vendorChange = async (dataas) => {
    setSelectVendor(dataas);
    setSelectWarehouse([]);
    setSubware([])
    setBrand([])
    Setbranddata([])
    const warehouse = await axios.get(`${API_Warehouse}/${dataas.value}`, config)
    const res = warehouse.data.list.map((wareitem) => {
      const waredata = {
        value: wareitem.warehouse_id,
        label: wareitem.warehouse_name,
      }
      return waredata
    })
    setSubware((dataas) => [...dataas, ...res]);

    const brand = await axios.get(`${API_Vendor_Brand}/${dataas.value}`, config)
    // console.log(brand, "iiiiiiiiiiiiii")
    const rest = brand.data.list.map((brandItem) => {
      const brandData = {
        value: brandItem.id,
        label: brandItem.name,
      }
      return brandData
    })
    Setbranddata((dataas) => [...dataas, ...rest]);
  };


  const GetMainCate = async () => {
    const { data } = await axios.get(`${API_Category}`, config)
    const Res = data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.category_name
      }
      return datss
    })
    SetMainCate(Res);
  }

  // const GetBrand = async () => {
  //   const { data } = await axios.get(`${API_Brand}`, config)
  //   const Res = data.list.map(itemsMain => {
  //     const datss = {
  //       value: itemsMain.id,
  //       label: itemsMain.name
  //     }
  //     return datss
  //   })
  //   Setbranddata(Res)
  // }

  const GetAttributename = async () => {
    const { data } = await axios.get(`${API_Attribute}`, config)
    // console.log("Attribute", data.list);
    const res = data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.AttributeName
      }
      return datss
    })
    SetGetAttributename(res);
  }

  const onFormSubmit = (form) => {
    // console.log(ID, "llllllllllllllllllllll")
    if (!ID) {
      CreateProduct();
    } else {
      EditProduct(ID);
    }
  };

  const CreateProduct = () => {
    let formData = new FormData();
    formData.append("ProductType", ProductType.value);
    formData.append("ProductName", Product.ProductName);
    formData.append("CountryOfOrigin", Product.CountryOfOrigin);
    formData.append("UpsellProducts", JSON.stringify(UpsellProducts));
    formData.append("CrossSellProducts", JSON.stringify(CrossSellProducts));
    formData.append("ProductTags", Product.ProductTags);
    formData.append("ShortDescription", ShortDescription);
    formData.append("FullDescription", FullDescription);
    formData.append("TopContent", TopContent);
    formData.append("BottomContent", BottomContent);
    formData.append("Vendor", SelectVendor.value);
    // formData.append("Vendor", JSON.stringify(SelectVendor));
    formData.append("CatelogVisibility", Product.CatelogVisibility);
    formData.append("Warehouse", JSON.stringify(SelectWarehouse));
    formData.append("HSN", Product.HSN);
    formData.append("SKU", Product.SKU);
    formData.append("EAN", Product.EAN);
    formData.append("SalePrice", Product.RegularPrice);
    formData.append("RegularPrice", Product.RegularPrice);
    formData.append("OfferDiscount", Product.OfferDiscount);
    formData.append("SoldIndividual", Product.SoldIndividual);
    formData.append("TaxStatus", TaxStatus.value == undefined ? "" : (TaxStatus.value));
    formData.append("GST", SelectGST.value == undefined ? "" : (SelectGST.value));
    formData.append("Brand", Brand.value);
    formData.append("Length", Product.ProductLength);
    formData.append("Breadth", Product.ProductBreadth);
    formData.append("Height", Product.ProductHeight);
    formData.append("Weight", Product.ProductWeight);
    formData.append("ManageStock", Product.ManageStock);
    formData.append("LowStockNotification", LowStockNotification.value == undefined ? "" : LowStockNotification.value);
    formData.append("PreOrder", preOrderAction.value == undefined ? "" : preOrderAction.value);
    formData.append("LowStockQuandity", Product.LowStockQuandity);
    formData.append("PreOrderQuantity", Product.PreOrderQuantity);
    formData.append("PeriodOfTime", Product.PeriodOfTime);
    formData.append("ProductReview", ProductReview.value == undefined ? "" : ProductReview.value);
    formData.append("ProductExpiryDate", Product.ProductExpiryDate);
    formData.append("ExpiryRule", ExpiryRule.value == undefined ? "" : ExpiryRule.value);
    formData.append("Points", Product.PointsEarn);
    formData.append("YoutubeLink", Product.YoutubeLink);
    formData.append("SKU1", Product.SKU1);
    formData.append("SKU2", Product.SKU2);
    formData.append("ReturnDays", Product.ReturnDays);
    formData.append("Returnable", returnable.value == undefined ? "" : returnable.value);
    formData.append("MainCategory", JSON.stringify(MainCategory));
    formData.append("SubCategory", JSON.stringify(SubCategory));
    formData.append("ChildCategory", JSON.stringify(ChildCategory));
    formData.append("MetaTitle", Product.MetaTitle);
    formData.append("MetaSlug", Product.MetaSlug);
    formData.append("MetaDescription", MetaDescription);
    // formData.append("AttributeName", JSON.stringify(AttributelValues));
    formData.append("ProductImage", Product.ProductImage);
    // console.log(inputFields, "Attributename")
    for (var i = 0; i < inputFields.length; i++) {
      for (var j = 0; j < inputFields[i].length; j++) {
        // console.log(inputFields[i][j].AttributeValue, "Attributename")
        formData.append("AttributeName", JSON.stringify(inputFields[i][j].label));
        inputFields[i][j].AttributeValue.map((items) => {
          formData.append("AttributeValue", JSON.stringify(items))
        })
      }

    }
    for (var i = 0; i < files.length; i++) {
      for (var j = 0; j < files[i].length; j++) {
        // console.log(files[i][j],"ooo")
        formData.append("ProductGalleryImages", files[i][j]);

      }

    }

    // if (files && files.length) {
    //   files[0].map((items) => {
    //     // formData.append("ProductGalleryImages", items);
    //     console.log(items,"ooo")

    //   })
    // }

    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    };

    axios.post(API_Product, formData, configs).then((res) => {
      clearState();
      // window.location.href = "/dashboard/prod-list"
      // window.location.reload();
      // setATTRDAT([]);
      // res.data.AttributeName.map(items =>{
      //   console.log("ddd",items)
      //   setATTRDAT(datass => [...datass,items])

      // })
    });
    window.location.href = "/dashboard/prod-list"
  }

  const EditProduct = (ID) => {
    let formData = new FormData();
    formData.append("ProductType", ProductType.value);
    formData.append("ProductVariety", ProductVariety);
    formData.append("ProductName", Product.ProductName);
    formData.append("CountryOfOrigin", Product.CountryOfOrigin);
    formData.append("UpsellProducts", JSON.stringify(UpsellProducts));
    formData.append("CrossSellProducts", JSON.stringify(CrossSellProducts));
    formData.append("ProductTags", Product.ProductTags);
    formData.append("ShortDescription", ShortDescription);
    formData.append("FullDescription", FullDescription);
    formData.append("TopContent", TopContent);
    formData.append("BottomContent", BottomContent);
    formData.append("Vendor", SelectVendor.value);
    // formData.append("Vendor", JSON.stringify(SelectVendor));
    formData.append("CatelogVisibility", Product.CatelogVisibility);
    formData.append("Warehouse", JSON.stringify(SelectWarehouse));
    formData.append("HSN", Product.HSN);
    formData.append("SKU", Product.SKU);
    formData.append("EAN", Product.EAN);
    formData.append("SalePrice", Product.RegularPrice);
    formData.append("RegularPrice", Product.RegularPrice);
    formData.append("OfferDiscount", Product.OfferDiscount);
    formData.append("SoldIndividual", Product.SoldIndividual);
    formData.append("TaxStatus", TaxStatus.value == undefined ? "" : TaxStatus.value);
    formData.append("GST", SelectGST.value == undefined ? "" : SelectGST.value);
    formData.append("Brand", Brand.value);
    formData.append("Length", Product.ProductLength);
    formData.append("Breadth", Product.ProductBreadth);
    formData.append("Height", Product.ProductHeight);
    formData.append("Weight", Product.ProductWeight);
    formData.append("ManageStock", Product.ManageStock);
    formData.append("LowStockNotification", LowStockNotification.value == undefined ? "" : LowStockNotification.value);
    formData.append("PreOrder", preOrderAction.value == undefined ? "" : preOrderAction.value);
    formData.append("LowStockQuandity", Product.LowStockQuandity);
    formData.append("PreOrderQuantity", Product.PreOrderQuantity);
    formData.append("PeriodOfTime", Product.PeriodOfTime);
    formData.append("ProductReview", ProductReview.value == undefined ? "" : ProductReview.value);
    formData.append("ProductExpiryDate", Product.ProductExpiryDate);
    formData.append("ExpiryRule", ExpiryRule.value == undefined ? "" : ExpiryRule.value);
    formData.append("Points", Product.PointsEarn);
    formData.append("YoutubeLink", Product.YoutubeLink);
    formData.append("SKU1", Product.SKU1);
    formData.append("SKU2", Product.SKU2);
    formData.append("ReturnDays", Product.ReturnDays);
    formData.append("Returnable", returnable.value == undefined ? "" : returnable.value);
    formData.append("MainCategory", JSON.stringify(MainCategory));
    formData.append("SubCategory", JSON.stringify(SubCategory));
    formData.append("ChildCategory", JSON.stringify(ChildCategory));
    formData.append("MetaTitle", Product.MetaTitle);
    formData.append("MetaSlug", Product.MetaSlug);
    formData.append("MetaDescription", MetaDescription);
    // formData.append("AttributeName", JSON.stringify(AttributelValues));
    formData.append("ProductImage", Product.ProductImage);
    // for (var i = 0; i < inputFields.length; i++) {
    //   console.log(inputFields[i], "Attributename")
    //   formData.append("AttributeName", JSON.stringify(inputFields[i].Attribute_name))
    //   // formData.append("catlog_id",  inputFields[i].catlog_id);
    // }

    // for (var i = 0; i < AttributesValuesFinal.length; i++) {
    //   console.log(AttributesValuesFinal, "AttributeValue")
    //   formData.append("AttributeValue", JSON.stringify(AttributesValuesFinal[i]))
    //   // formData.append("catlog_id",  inputFields[i].catlog_id);
    // }
    inputFields.map((items) => {
      //  console.log(items, "llllllllllllllllllllllll")
      formData.append("AttributeValue", JSON.stringify(items.AttributeValue) == undefined ? '[]' : JSON.stringify(items.AttributeValue))

    })
    for (var i = 0; i < inputFields.length; i++) {
      for (var j = 0; j < inputFields[i].length; j++) {
        formData.append("AttributeName", JSON.stringify(inputFields[i][j].value))

        inputFields[i][j].AttributeValue.map((items) => {
          // console.log(items, "ooo")
          formData.append("AttributeValue", JSON.stringify(items))
        })
      }

    }
    // inputFields.map((items) => {
    //   console.log(items,"ooo")   
    //           })
    for (var i = 0; i < files.length; i++) {
      for (var j = 0; j < files[i].length; j++) {
        // console.log(files[i][j],"ooo")
        formData.append("ProductGalleryImages", files[i][j]);

      }

    }

    // if (files && files.length) {
    //   files.map((items) => {
    //     formData.append("ProductGalleryImages", items);
    //   })
    // }


    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    };

    axios.put(`${API_Product}/${ID}`, formData, configs).then((res) => {
      clearState()
      window.location.href = "/dashboard/prod-list"
    });
  }

  useEffect(() => {
    if (filterText !== "") {
      const filteredData = messageData.filter((item) => {
        return (
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.messageTitle.toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setData([...filteredData]);
    } else {
      setData(filteredTabData);
    }
  }, [filterText, filterTab, filteredTabData]);


  const modules1 = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      [{ 'background': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      [{ 'background': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "script",
    "direction",
    "size",
    "list",
    "bullet",
    "indent",
    "image",
    "color",
    "background",
    "link"

  ];

  // Onchange Start
  const handleChangeProduct = ({ target: { name, value } }) => {
    setProduct({ ...Product, [name]: value });
  };
  const handleChangeProductt = (event) => {
    setProduct(event);
  };

  const ProductTypeChange = (event) => {
    setProductType(event)
    if (event.value == "Simple") {
      setAttributeTabs(false)
    } else {
      setAttributeTabs(true)
    }
  }

  const MainCategorys = async (event) => {

    setMainCategory(event)
    setSubCategory([]);
    setSubcate([]);
    setChildCategory([]);
    event.map(async (item) => {
      const Subcat = await axios.get(`${API_SubCategory}/category/${item.value}`, config)
      const res = Subcat.data.list.map((Subitem) => {
        const subdat = {
          value: Subitem.subcat_id,
          label: Subitem.subcategory_name,
        }
        return subdat
      })
      setSubcate((item) => [...item, ...res]);
    })
  }

  const SubCategorys = async (event) => {
    setSubCategory(event)
    setChildcate([]);
    setChildCategory([])
    event.map(async (item) => {
      const Subcat = await axios.get(`${API_ChildCategory}/subcategory/${item.value}`, config)
      const res = Subcat.data.list.map((Subitem) => {
        const subdat = {
          value: Subitem.id,
          label: Subitem.childcategoryname,
        }
        return subdat
      })
      setChildcate((item) => [...item, ...res]);
    })
  }


  const ATT = [];

  const AttibuteOnchages = async (event, index, name) => {
    setAttributeValueInput([]);
    setAttributeNameInputs([])
    const attrvaluee = event.value;
    if (attrvaluee) {

      const Result = await axios.get(`${API_Attribute}/${attrvaluee}`, config)

      Result.data.list.map((items) => {
        // console.log("sss", Result.data.list)
        const OnAttName = {
          value: items.id,
          label: items.Attribute_name
        }
        items.Item.map((Attrivall) => {
          const datasAttriName = {
            value: Attrivall.catlog_id,
            label: Attrivall.Attribute_Value,
            Attributeid: items.id,
            Attribute_name: items.Attribute_name

          }
          setAttributeValueInput(items => [...items, datasAttriName]);
        })

      })
      // /setattrvalue1(datss.data[0])
      const value = event;
      const list = [...inputFields];
      list[index] = value;
      // console.log(list, "lissssssssssst")
      setInputFields(list);
    }

  }


  function uploadSingleFile(e) {
    setFile([URL.createObjectURL(e.target.files[0])]);
    setProduct({ ...Product, ProductImage: e.target.files[0] });
  }


  function uploadMulitpleimage(e) {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFilesArray, "oooo")
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setMultipleImage((previousImages) => previousImages.concat(imagesArray));
    setFiles([...files, selectedFilesArray]);

    e.target.value = "";
  };
  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
  }

  function multipleimagedelete(e, item) {
    const s = multipleimage.filter((item, index) => index !== e);
    setMultipleImage(s);
    const foo = files.splice(e, 1);
    // console.log(files,"ssssssssssssssssss")

    if (files && files.length) {
      files.map((items) => {
        items.splice(e, 1);
        // console.log(files,"filesfilesfilesfiles")
      })
    }
  }

  const columns =
    [
      {
        field: 'Image',
        title: 'Image',
        render: (rowData) => <img src={rowData.Image} style={{ width: 50, borderRadius: "50%" }} />,
      },
      { field: 'ProductId', title: 'Product Id' },
      { field: 'ProductName', title: 'Name' },
      {
        field: 'CorrentOffers', title: 'Current Offers',
        render: (row) => <Badge color='primary'>{row.CorrentOffers}</Badge>
      },
      {
        field: "aaa",
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
                  <ul className="link-list-opt no-bdr" style={{ height: "122px", overflowY: "scroll" }}>
                    <li>
                      <DropdownItem
                        tag="a"
                        onClick={''}

                      >
                        <Icon name="edit"></Icon>
                        <span>Edit</span>
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        tag="a"
                        // href="#QuickView"
                        onClick={''}
                      >
                        <Icon name="eye"></Icon>
                        {/* <a href="#" style={{ padding: "1px 0px 0px 5px" }}>Quick View</a> */}
                        <span>Quick View</span>
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        tag="a"
                        // href="#remove"
                        onClick={''}
                      >
                        <Icon name="trash"></Icon>
                        <span>Remove</span>
                      </DropdownItem>
                    </li>


                    <li>
                      <DropdownItem
                        tag="a" onClick={''}>

                        <Icon name="plus"></Icon>
                        <span>invoice</span>

                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        tag="a"
                      // href=""
                      >
                        <Icon name="eye-alt"></Icon>
                        <a onClick={''} style={{ padding: "1px 0px 0px 5px" }}>Quick Edit</a>
                      </DropdownItem>
                    </li>

                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
          </ul>
        ),
      },
    ]

  const datassget = [
    {
      Image: User,
      ProductId: "PROD-0004",
      ProductName: "Baby lotion",
      CorrentOffers: "50%"
    }
  ]

  const changeVisibility = (event) => {
    setProduct({ ...Product, CatelogVisibility: event.target.checked })
  };

  const [saveBtn, setSaveBtn] = useState(false)
  const handleAddFields = () => {
    if (inputFields.length >= 2) {
      settoggleBtn(true);
    }
    else {
      setInputFields([...inputFields, { id: '' }])
      setSaveBtn(true);
    }
    // setAttributesValuesFinal([...AttributesValuesFinal,{Attributeid:''}])
  }

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    const AttriValue = [...AttributelValues];
    // console.log("nnnn",AttriValue)
    // console.log("iddd",id)
    values.splice(values.findIndex(value => value.id === id), 1);
    AttriValue.splice(AttriValue.findIndex(value => value.id === id), 1);
    // console.log("nnnn111111",AttriValue)
    settoggleBtn(false)
    setInputFields(values);
    setAttributelValues(AttriValue);
  }

  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };


  return (
    <React.Fragment>
      <Modal isOpen={modalEdit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>View Product Details</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={() => handleSubmit}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <div className="row">
                    <div className="col-md-4">
                      <h6>Attrbute :</h6>
                    </div>
                    <div className="col-md-4">
                      <p>color</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <h6>Value :</h6>
                    </div>
                    <div className="col-md-4">
                      <p>Red</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <h6>price :</h6>
                    </div>
                    <div className="col-md-4">
                      <p>500</p>
                    </div>
                  </div>

                </FormGroup>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Content page="component">
        <Block size="lg">
          <PreviewCard>
            <Nav tabs>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "1" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("1");
                  }}
                >
                  <span>Product Information</span>
                </NavLink>
              </NavItem>
              {Subattribute ?
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: activeIconTab === "2" })}
                    onClick={(ev) => {
                      ev.preventDefault();
                      toggleIconTab("2");
                    }}
                  >
                    <span>About Product</span>
                  </NavLink>
                </NavItem>
                : null}


              {Subattribute ?
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: activeIconTab === "3" })}
                    onClick={(ev) => {
                      ev.preventDefault();
                      toggleIconTab("3");
                    }}
                  >
                    <span>SEO</span>
                  </NavLink>
                </NavItem>
                : null}

              {AttributeTabs && Subattribute ?
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: activeIconTab === "4" })}
                    onClick={(ev) => {
                      ev.preventDefault();
                      toggleIconTab("4");
                    }}
                  >
                    <span>Attribute</span>
                  </NavLink>
                </NavItem>
                : null}
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "5" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("5");
                  }}
                >
                  <span>Current Offers</span>
                </NavLink>
              </NavItem>


            </Nav>
          </PreviewCard>
          <PreviewCard>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <TabContent activeTab={activeIconTab} >


                <TabPane tabId="1">
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer"><h5>Product Information</h5></label>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Product Name* </label>
                        <div className="form-control-wrap">
                          <input className="form-control" placeholder="Enter Product Name" name="ProductName" ref={register({ required: "This is required" })}
                            onChange={handleChangeProduct} value={Product.ProductName} />
                        </div>
                      </div>
                    </Col>
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Select Vendor</label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="SelectVendor"
                            options={Vendor}
                            onChange={vendorChange}
                            value={SelectVendor}
                            fields={{ value: "value", text: "label" }}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="3" >
                      <div className="preview-block mt-3">
                        <div className="g-3 align-center flex-wrap">
                          <div className="g">
                            <div className="custom-control custom-checkbox" style={{ marginTop: '22px' }}>
                              <input type="checkbox" className="custom-control-input form-control" id="customCheck8" name="CatelogVisibility" checked={Product.CatelogVisibility} onChange={changeVisibility} />
                              <label className="custom-control-label" htmlFor="customCheck8"> Catalog Visibility</label>
                            </div>
                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Select Warehouse </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="SelectWarehouse"
                            options={subware}
                            isMulti={true}
                            onChange={(event) => setSelectWarehouse(event)}
                            // onChange={subCategoryChange}
                            value={SelectWarehouse}
                          />
                        </div>
                      </div>
                    </Col>
                    {/* </Row> */}

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Regular Price* </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Regular Price"
                            onChange={handleChangeProduct}
                            name="RegularPrice"
                            value={Product.RegularPrice}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Sale Price* </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                            onChange={handleChangeProduct}
                            readOnly
                            name="SalePrice"
                            value={Product.SalePrice}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> HSN* </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="HSN"
                            onChange={handleChangeProduct}
                            value={Product.HSN}
                          />
                        </div>
                      </div>
                    </Col>


                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          SKU*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter SKU Code"
                            name="SKU"
                            onChange={handleChangeProduct}
                            value={Product.SKU}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> EAN* </label>
                        <div className="form-control-wrap">
                          <input className="form-control" placeholder="Enter EAN Code" name="EAN"
                            onChange={handleChangeProduct} value={Product.EAN} />
                        </div>
                      </div>
                    </Col>


                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Select Tax Status*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="TaxStatus"
                            options={[
                              { value: "Without Tax", label: "Without Tax" },
                              { value: "With Tax", label: "With Tax" },
                            ]}
                            onChange={(event) => setTaxStatus(event)}
                            value={TaxStatus}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Select GST*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="GST"
                            options={[
                              { value: "0", label: "0%" },
                              { value: "0.1", label: "0.1%" },
                              { value: "0.25 ", label: "0.25%" },
                              { value: "1", label: "1%" },
                              { value: "1.5", label: "1.5%" },
                              { value: "3", label: "3%" },
                              { value: "5", label: "5%" },
                              { value: "6", label: "6%" },
                              { value: "7.5", label: "7.5%" },
                              { value: "12", label: "12%" },
                              { value: "14", label: "14%" },
                              { value: "18", label: "18%" },
                              { value: "28", label: "28%" },
                            ]}
                            onChange={(event) => setSelectGST(event)}
                            value={SelectGST}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Product Weight (In Kgs)*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Product Weight"
                            name="ProductWeight"
                            onChange={handleChangeProduct}
                            value={Product.ProductWeight}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6"><label className="form-label" htmlFor="customer">
                      Product L*B*H (In CM)*
                    </label>
                      <div className="form-group" style={{ display: 'flex', }}>

                        <div className="form-control-wrap" style={{ paddingRight: '20px', }} >
                          <input
                            type="number"
                            className="form-control"
                            name="ProductLength"
                            onChange={handleChangeProduct}
                            placeholder="Enter Length"
                            value={Product.ProductLength}
                          />

                        </div>
                        <div className="form-control-wrap" style={{ paddingRight: '20px', }}>
                          <input
                            type="number"
                            className="form-control"
                            name="ProductBreadth"
                            placeholder="Enter Breadth"
                            onChange={handleChangeProduct}
                            value={Product.ProductBreadth}
                          />

                        </div>
                        <div className="form-control-wrap" style={{ paddingRight: '20px', }}>
                          <input
                            type="number"
                            className="form-control"
                            name="ProductHeight"
                            placeholder="Enter Height"
                            onChange={handleChangeProduct}
                            value={Product.ProductHeight}
                          />

                        </div>
                      </div>
                    </Col>



                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Low Stock Notification
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="LowStockNotification"
                            options={[
                              { value: "Enable", label: "Enable" },
                              { value: "Disable", label: "Disable" },
                            ]}
                            onChange={(event) => setLowStockNotification(event)}
                            value={LowStockNotification}
                          />
                        </div>
                      </div>
                    </Col>
                    {LowStockNotification.label === "Enable" &&
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="purchased"> Low Stock Quantity* </label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              placeholder="Low Stock Quandity"
                              name="LowStockQuandity"
                              onChange={handleChangeProduct}
                              value={Product.LowStockQuandity}
                            />

                          </div>
                        </div>
                      </Col>}

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Pre-Order  </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="Pre-Order Quantity"
                            options={[
                              { value: "Enable", label: "Enable" },
                              { value: "Disable", label: "Disable" },
                            ]}
                            onChange={(event) => setPreOrderAction(event)}
                            value={preOrderAction}
                          />

                        </div>
                      </div>
                    </Col>
                    {preOrderAction.label === "Enable" &&
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="purchased"> Pre-Order Stock* </label>
                          <div className="form-control-wrap">
                            <input type="number" className="form-control" placeholder="Pre-order Stock"
                              name="PreOrderQuantity"
                              onChange={handleChangeProduct}
                              value={Product.PreOrderQuantity}
                            />

                          </div>
                        </div>
                      </Col>}


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Sold Individual(Per One Order)*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            className="form-control"
                            placeholder="Enter No. Of Products Per One Order"
                            name="SoldIndividual"
                            onChange={handleChangeProduct}
                            value={Product.SoldIndividual}
                          />

                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Period Of Time </label>
                        <div className="form-control-wrap">
                          <input className="form-control" placeholder="Enter Period Of Time" name="PeriodOfTime"
                            onChange={handleChangeProduct} value={Product.PeriodOfTime} />
                        </div>
                      </div>
                    </Col>


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Product Review* </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="ProductReview"
                            options={[
                              { value: "Enable", label: "Enable" },
                              { value: "Disable", label: "Disable" },
                            ]}
                            onChange={(event) => setProductReview(event)}
                            value={ProductReview}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Expiry Rule* </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="ExpiryRule"
                            options={[
                              { value: "Enable", label: "Enable" },
                              { value: "Disable", label: "Disable" },
                            ]}
                            onChange={(event) => setExpiryRule(event)}
                            value={ExpiryRule}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Points Earned for Purchasing This Product
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Point Earned"
                            onChange={handleChangeProduct}
                            name="PointsEarn"
                            value={Product.PointsEarn}
                          />

                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Supplier SKU 1*
                        </label>
                        <div className="form-control-wrap">
                          <input className="form-control" placeholder="Enter SKU 1" name="SKU1"
                            onChange={handleChangeProduct} value={Product.SKU1} />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Supplier SKU 2*
                        </label>
                        <div className="form-control-wrap">
                          <input className="form-control" placeholder="Enter Product SKU 2" name="SKU2"
                            onChange={handleChangeProduct} value={Product.SKU2} />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Youtube Link
                        </label>
                        <div className="form-control-wrap">
                          <input className="form-control" placeholder="Enter Product Youtube Link" name="YoutubeLink"
                            onChange={handleChangeProduct} value={Product.YoutubeLink} />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Is the Product Returnable?
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name=""
                            options={[
                              { value: "Yes", label: "Yes" },
                              { value: "No", label: "No" },
                            ]}
                            onChange={(event) => setReturnable(event)}
                            value={returnable}
                          />

                        </div>
                      </div>
                    </Col>
                    {returnable.label === "Yes" &&
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="purchased">
                            Return window (days)
                          </label>
                          <div className="form-control-wrap">
                            <input className="form-control" placeholder="Enter Return Days" name="ReturnDays"
                              onChange={handleChangeProduct} value={Product.ReturnDays} />
                          </div>
                        </div>
                      </Col>
                    }
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name=""
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "InActive", label: "InActive" },
                            ]}
                            onChange={(event) => setStatus(event)}
                            value={status}
                          />

                        </div>
                      </div>
                    </Col>

                    {/* start images */}
                    <Col size="6">
                      <label className="form-label"> Product Images </label>
                      <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                        {file.length > 0 &&
                          file.map((item, index) => {
                            return (
                              <div key={item}>
                                <div style={{ margin: "20px" }} >
                                  <span>
                                    <Icon name="trash-empty-fill" onClick={() => deleteFile(index)} />
                                  </span>
                                  <div>
                                    <img src={item} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {file.length === 0 && (<>
                          <div className="d-flex justify-content-center align-items-center">
                            <input type="file" id="file-upload" disabled={file.length === 1} className="form-control"
                              onChange={uploadSingleFile} style={{
                                border: "none",
                                opacity: "0",
                                zindex: "-1",
                                position: "absolute",
                                width: "200px"
                              }} />
                            <label for="file-upload" style={{ padding: "30px" }}><Icon name="upload" style={{ fontSize: "25px" }} ></Icon>Upload image</label>
                          </div></>)}

                      </div>
                    </Col>

                    {/* Existing Image */}
                    <Col size="6">
                      {ID ? <>
                        <label className="form-label"> Existing Image</label>
                        <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                          {filesview !== '' ?
                            <div >
                              <div style={{ margin: "20px" }} >
                                <div>
                                  <img src={`${API_Image}/${filesview}`} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                                </div>
                              </div>
                            </div> : null}
                        </div>
                      </> : null}
                    </Col>

                    {/* Gallery Images */}
                    <Col size="12">
                      <label className="form-label"> Product Gallery Images &emsp;
                        {ID ? <span style={{ fontSize: '10px', color: 'red' }}>By Adding New Images, Existing Images will be Deleted***</span> : null} </label>
                      <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                        {multipleimage.length > 0 &&
                          multipleimage.map((item, index) => {
                            return (
                              <div key={item}>
                                <div style={{ margin: "20px" }} >
                                  <span>
                                    <Icon name="trash-empty-fill" onClick={() => multipleimagedelete(index, item)} />
                                  </span>
                                  <div>
                                    <img src={item} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        <div className="d-flex justify-content-center align-items-center">
                          <input type="file" id="file-upload" multiple required disabled={multipleimage.length === 20}
                            className="form-control" name="files"
                            onChange={uploadMulitpleimage} style={{
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

                    {/* Existing Gallery Image */}
                    <Col size="12">
                      {ID ? <>
                        <label className="form-label"> Existing Gallery Images </label>
                        <div className=" d-flex " style={{ border: "1px dashed #e5e9f2" }}>
                          {mulImgView.length > 0 &&
                            mulImgView.map((item, index) => {
                              return (
                                <div key={item}>
                                  <div style={{ margin: "20px" }} >
                                    <div>
                                      <img src={`${API_Image}/${item}`} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </> : null}
                    </Col>
                    {!Subattribute ?
                      <Col size="12">
                        <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); onFormSubmit(ID) }} >
                          <span>Update</span>
                        </Button></Col>
                      :
                      <Col size="12">
                        <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("2"); window.scrollTo({ top: 0, behavior: "auto" }); }} >
                          <span>NEXT</span>
                        </Button>

                      </Col>}

                  </Row>
                </TabPane>

                <TabPane tabId="2">
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          <h5>  Category </h5>
                        </label>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Main Category*
                        </label>
                        <div className="form-control-wrap">
                          {/* {console.log(MainCategory,"MainCategoryMainCategory")} */}
                          <RSelect
                            name="MainCategory"
                            options={MainCate}
                            onChange={MainCategorys}
                            value={MainCategory}
                            isMulti={true}
                            fields={{ value: "value", text: "label" }}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Sub Category*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="SubCategory"
                            options={Subcate}
                            onChange={SubCategorys}
                            value={SubCategory}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Child Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="ChildCategory"
                            options={Childcate}
                            onChange={(event) => setChildCategory(event)}
                            value={ChildCategory}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer"><h5>{ID ? 'Edit ' : ''}About Product</h5></label>
                      </div>
                    </Col>

                    <Col md="6" >
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Product Type* </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="Product"
                            onChange={ProductTypeChange}
                            options={[
                              { value: "Simple", label: "Simple" },
                              { value: "Variable", label: "Variable" },
                            ]}
                            value={ProductType}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Select Brand* </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="Brand"
                            options={branddata}
                            onChange={(event) => setBrand(event)}
                            value={Brand}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Country of Origin*</label>
                        <div className="form-control-wrap">
                          <input className="form-control" placeholder="Enter Country of Origin" name="CountryOfOrigin"
                            onChange={handleChangeProduct} value={Product.CountryOfOrigin} />
                        </div>
                      </div>
                    </Col>


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Upsell Products </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="UpsellProducts"
                            options={products}
                            isMulti={true}
                            onChange={(event) => setUpsellProducts(event)}
                            value={UpsellProducts}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Cross-Sell Products </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="CrossSellProducts"
                            options={products}
                            isMulti={true}
                            onChange={(event) => setCrossSellProducts(event)}
                            value={CrossSellProducts}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid"> Product Tags* </label>
                        <div className="form-control-wrap">
                        <input className="form-control" placeholder="Enter Product Name" 
                            // isMulti={true}
                            name="ProductTags"
                            onChange={handleChangeProduct}
                            value={Product.ProductTags}
                          />
                        </div>
                      </div>
                    </Col>



                    <Col size="6">
                      <FormGroup>
                        <label className="form-label"> Short Description* </label>
                        <div className="text-editor" style={{ minHeight: '100px', }}>
                          {/* <ReactQuill
                            theme="snow"
                            name="ShortDescription"
                            onChange={(event) => setShortDescription(event)}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                            value={ShortDescription}
                          /> */}

                          <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            value={ShortDescription}
                            setContents={ShortDescription}
                            onChange={(event) => setShortDescription(event)}
                            // onImageUploadBefore={handleImageUploadBefore}
                            // onImageUpload={handleImageUpload}
                            placeholder={"Write something awesome..."}
                            setOptions={{
                              // minHeight: "20vh",
                              // maxHeight: "20vh",
                              buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ["paragraphStyle", "blockquote"],
                                [
                                  "bold",
                                  "underline",
                                  "italic",
                                  "strike",
                                  "subscript",
                                  "superscript",
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["outdent", "indent"],

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                ["imageGallery"], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"],

                                // ['save', 'template'],
                                // '/', Line break
                              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                            }}
                          />
                        </div>

                      </FormGroup>
                    </Col>

                    <Col size="6">
                      <FormGroup>
                        <label className="form-label"> Full Description* </label>
                        <div className="text-editor" style={{ minHeight: '100px', }}>
                          {/* <ReactQuill
                            theme="snow"
                            name="FullDescription"
                            onChange={(event) => setFullDescription(event)}
                            placeholder={"Write something awesome..."}
                            modules={modules1}
                            formats={formats}
                            value={FullDescription}
                          /> */}

                          <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            value={FullDescription}
                            setContents={FullDescription}
                            onChange={(event) => setFullDescription(event)}
                            // onImageUploadBefore={handleImageUploadBefore}
                            // onImageUpload={handleImageUpload}
                            placeholder={"Write something awesome..."}
                            setOptions={{
                              // minHeight: "20vh",
                              // maxHeight: "20vh",
                              buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ["paragraphStyle", "blockquote"],
                                [
                                  "bold",
                                  "underline",
                                  "italic",
                                  "strike",
                                  "subscript",
                                  "superscript",
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["outdent", "indent"],

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                ["imageGallery"], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"],

                                // ['save', 'template'],
                                // '/', Line break
                              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                            }}
                          />
                        </div>

                      </FormGroup>
                    </Col>
                    <Col size="12">
                      <FormGroup>
                        <label className="form-label"> Top Content </label>
                        <div className="text-editor" style={{ minHeight: '100px', }}>
                          {/* <ReactQuill
                            theme="snow"
                            onChange={(event) => setTopContent(event)}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                            value={TopContent}
                            name="TopContent"
                          /> */}
                          <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            value={TopContent}
                            setContents={TopContent}
                            onChange={(event) => setTopContent(event)}
                            // onImageUploadBefore={handleImageUploadBefore}
                            // onImageUpload={handleImageUpload}
                            placeholder={"Write something awesome..."}
                            setOptions={{
                              // minHeight: "20vh",
                              // maxHeight: "20vh",
                              buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ["paragraphStyle", "blockquote"],
                                [
                                  "bold",
                                  "underline",
                                  "italic",
                                  "strike",
                                  "subscript",
                                  "superscript",
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["outdent", "indent"],

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                ["imageGallery"], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"],

                                // ['save', 'template'],
                                // '/', Line break
                              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                            }}
                          />
                        </div>
                        {errors.description && <span className="invalid">{errors.description.message}</span>}
                      </FormGroup>
                    </Col>

                    <Col size="12">
                      <FormGroup>
                        <label className="form-label"> Bottom Content </label>
                        <div className="text-editor" style={{ minHeight: '100px', }}>
                          {/* <ReactQuill
                            theme="snow"
                            onChange={(event) => setBottomContent(event)}
                            placeholder={"Write something awesome..."}
                            modules={modules1}
                            formats={formats}
                            value={BottomContent}
                            name="BottomContent"
                          /> */}
                          <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            value={BottomContent}
                            setContents={BottomContent}
                            onChange={(event) => setBottomContent(event)}
                            // onImageUploadBefore={handleImageUploadBefore}
                            // onImageUpload={handleImageUpload}
                            placeholder={"Write something awesome..."}
                            setOptions={{
                              // minHeight: "20vh",
                              // maxHeight: "20vh",
                              buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ["paragraphStyle", "blockquote"],
                                [
                                  "bold",
                                  "underline",
                                  "italic",
                                  "strike",
                                  "subscript",
                                  "superscript",
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["outdent", "indent"],

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                ["imageGallery"], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"],

                                // ['save', 'template'],
                                // '/', Line break
                              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                            }}
                          />
                        </div>
                        {errors.description && <span className="invalid">{errors.description.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col size="12">

                      <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("3"); window.scrollTo({ top: 0, behavior: "auto" }); }} >
                        <span>NEXT</span>
                      </Button>
                      <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("1"); window.scrollTo({ top: 0, behavior: "auto" }); }} >
                        <span>PREV</span>
                      </Button>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="3">
                  <Row className="g-3">

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer"> <h5> SEO </h5> </label>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Meta Title* </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" onChange={handleChangeProduct}
                            placeholder="Enter Meta Title" name="MetaTitle" value={Product.MetaTitle} />
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased"> Meta Slug* </label>
                        <div className="form-control-wrap">
                          <input type="text" className="form-control" placeholder="Enter Meta Slug" name="MetaSlug"
                            onChange={handleChangeProduct} value={Product.MetaSlug} />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <FormGroup>
                        <label className="form-label"> Meta Description* </label>
                        <div className="text-editor" style={{ minHeight: '100px', }}>
                          {/* <ReactQuill
                            theme="snow"
                            onChange={(event) => setMetaDescription(event)}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                            value={MetaDescription}
                          /> */}

                          <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            value={MetaDescription} 
                            setContents={MetaDescription}
                            onChange={(event) => setMetaDescription(event)}
                            // onImageUploadBefore={handleImageUploadBefore}
                            // onImageUpload={handleImageUpload}
                            placeholder={"Write something awesome..."}
                            setOptions={{
                              // minHeight: "20vh",
                              // maxHeight: "20vh",
                              buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ["paragraphStyle", "blockquote"],
                                [
                                  "bold",
                                  "underline",
                                  "italic",
                                  "strike",
                                  "subscript",
                                  "superscript",
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["outdent", "indent"],

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                ["imageGallery"], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"],

                                // ['save', 'template'],
                                // '/', Line break
                              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                            }}
                          />
                        </div>
                      </FormGroup>
                    </Col>

                    <Col size="12">
                      {AttributeTabs ?
                        <>
                          <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("4"); }}>
                            <span>NEXT</span>
                          </Button>
                          <Button color="primary" style={{ float: 'right' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("2"); window.scrollTo({ top: 0, behavior: "auto" }); }}>
                            <span>PREV</span>
                          </Button>
                        </>
                        : <Button color="primary" style={{ float: 'right' }} type="button" onClick={() => onFormSubmit(ID)}>
                          <span>{!ID ? 'SAVE' : 'UPDATE'} </span>
                        </Button>}


                      {/* {!AttributeTabs ? 
                        <Button color="primary" style={{ float: 'right' }} type="submit">
                        {!ID ?<span>Save</span> : <span>Update</span>}
                        </Button>
                        :null } 
                      {!BtnSave ? 
                        <Button color="primary" style={{ float: 'right' }} type="submit">
                        {ID ?<span>Update</span> : <span>Save</span>}
                        </Button>
                        :null }  */}

                    </Col>

                  </Row>
                </TabPane>

                <TabPane tabId="4"  >
                  <div className="p-2" style={{ backgroundColor: 'white', margin: '10px 20px' }}>
                    <Row className="g-3">
                      <Col size="12">
                        <a href="#" onClick={handleAddFields}><Button color="primary" style={{ float: 'right' }} type="button" disabled={toggleBtn}>
                          <Icon name="plus"></Icon><span>Add Variant</span>
                        </Button></a>
                      </Col>

                      <>
                        {inputFields.map((inputField, index) => (

                          <Col size="12"  >

                            <div style={{ border: "1px solid rgba(0, 0, 0, 0.2)", padding: "30px", borderRadius: "5px" }}>
                              {/* {console.log(inputField, "inputFieldinputField")} */}
                              <Row style={{ border: "1px solid red", marginTop: "30px", backgroundColor: "red" }} >

                                <Col lg={4} >
                                  <div>
                                    <p>Attribute Type </p>
                                    <RSelect
                                      name="Attribute_name"
                                      options={Attdata}
                                      onChange={option => AttibuteOnchages(option, index, "label")}
                                      value={inputField}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="form-control-wrap">
                                    <p>Attribute Value </p>
                                    <RSelect
                                      name="Attribute_value"
                                      options={AttributeValueInput}
                                      onChange={(e) => AttibuteValuesOnchages(inputField, e, index, "Attribute_value")}
                                      //  value={inputitem}
                                      value={inputField.AttributeValue}
                                      isMulti={true}
                                    />
                                  </div>
                                </Col>
                                {/* ))} */}
                                <Col lg={2}>
                                  {/* <Button color="primary" type="button" value="btn" style={{ marginTop: "39px" }}
                                            onClick={handleAddAttribute}
                                             >
                                            Add
                                          </Button> */}
                                  <Button color="primary" type="" value="btn" style={{ marginTop: "39px" }} disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                                    Remove
                                  </Button>
                                </Col>
                              </Row>

                            </div>
                            <br></br>

                          </Col>

                        ))}
                      </>
                      <Col size="12">
                        <Button color="primary" style={{ float: 'right' }} type="button" onClick={() => onFormSubmit(ID)}>
                          <span>{!ID ? 'SAVE' : 'UPDATE'} </span>
                        </Button>
                      </Col>
                    </Row>
                  </div>

                </TabPane>

                <TabPane tabId="5">
                  <MuiThemeProvider theme={Tabletheme()}>
                    <MaterialTable icon={tableIcons}

                      columns={columns}
                      data={datassget}
                      title="Current Offers"
                      options={options}
                    />
                  </MuiThemeProvider>

                </TabPane>

              </TabContent>
            </form>
            <Modal isOpen={modalFail} toggle={toggleModalFail}>
              <ModalBody className="modal-body-lg text-center">
                <div className="nk-modal">
                  <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"></Icon>
                  <h4 className="nk-modal-title">Categories {ID ? "Updated" : "Added"} Successfully</h4>
                  <div className="nk-modal-action mt-5">
                    <Link to="/dashboard/main-category-list"><Button color="light" size="lg" className="btn-mw mr-3">
                      Done
                    </Button></Link>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </PreviewCard>
        </Block >
      </Content >

    </React.Fragment >
  );
};
export default ProductListAddEdit;