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
import MessageItem from "./MessageItem";

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
    // const optionsss1 = [
    //   { value: 'Blue', label: 'BLUE' },
    //   { value: 'Red', label: 'RED' },
    //   { value: 'Black', label: 'BLACK' }
    // ]

    // const optionsss2 = [
    //   { value: 'XXL', label: 'XXL' },
    //   { value: 'XL', label: 'XL' },
    //   { value: 'MD', label: 'MD' },
    //   { value: 'SM', label: 'SM' },
    //   { value: 'XS', label: 'XS' }
    // ]
    // console.log("optionsss1 value",optionsss1.value)
    // const [attrvariant1, setattrvariant1] = useState(false);
    // const [attrvariant2, setattrvariant2] = useState(false);
    // const [attrvariant3, setattrvariant3] = useState(false);

    // const [attrvalue1, setattrvalue1] = useState("");
    // const [attrvalue2, setattrvalue2] = useState("");
    // const [attrvalue3, setattrvalue3] = useState("");

    // const AttrColorChange = (event) => {
    //     console.log("event value", event.value)
    //     const attrvaluee = event.value;
    //     // setattrvalue1(event.value);
    //     if (attrvaluee == "Blue") {
    //         setattrvalue1("Blue")
    //         setattrvariant1(true)
    //     }
    //     else if (attrvaluee == "Red") {
    //         setattrvalue2("Red")
    //         setattrvariant2(true)
    //     }
    //     else if (attrvaluee == "Yellow") {
    //         setattrvalue3("Yellow")
    //         setattrvariant3(true)
    //     }
    //     else {
    //         console.log("hello");
    //     }
    // }
    // const AddProduct = () => {
    //     //   // setattrvariant(true)
    //     //   // console.log("event value", event.value)
    //     //   const attrvalue1 = attrvalue1;
    //     //   const attrvalue2 = attrvalue2;
    //     //   const attrvalue3 = attrvalue3;
    //     //   if (attrvalue1 == "Blue") {
    //     //     // setattrvalue1("Blue"),
    //     //     setattrvariant1(true)
    //     //   }
    //     //   else if (attrvalue2 == "Red") {
    //     //     // setattrvalue2("Red"),
    //     //     setattrvariant2(true)
    //     //   }
    //     //   else if (attrvalue3 == "Yellow") {
    //     //     // setattrvalue3("Yellow"),
    //     //     setattrvariant3(true)
    //     //   }
    //     //   else {
    //     //     console.log("hello");
    //     //   }


    // }

    // if (optionsss1.value == "Blue") {
    //   setattrvariant(true)
    // }
    // else {
    //   setattrvariant(false)
    // }

    const location = useLocation();
    const history = useHistory()
    // const [defaultFiles, setDefaultFiles] = useState("");
    // const [defaultFiles2, setDefaultFiles2] = useState("");
    // const [files, setFiles] = useState([]);

    // const [files3, setFiles3] = useState([]);
    // const [files4, setFiles4] = useState([]);
    
    // const [AttributeTabs, setAttributeTabs] = useState(true);
    // const [BtnSave, setBtnSave] = useState(true);

    

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

    //

    // // handles ondrop function of dropzone
    // const handleDropChange = (acceptedFiles, set) => {
    //     set(
    //         acceptedFiles.map((file) =>
    //             Object.assign(file, {
    //                 preview: URL.createObjectURL(file),
    //             })
    //         )
    //     );
    // };
    // const [data, setData] = useState(messageData);
    // const [filteredTabData, setFilteredTabData] = useState(messageData);
    // const [filterTab, setFilterTab] = useState("1");
    // const [search, setOnSearch] = useState(false);
    // const [filterText, setFilterText] = useState("");
    // const [selectedId, setSelectedIt] = useState(1);
    // const [mobileView, setMobileView] = useState(false);
    // const [tabData, setTabData] = useState();
    // const [rating, setRating] = useState(0);
    // const [hover, setHover] = useState(0);
    // const [ProductType, setProductType] = useState('');
    // const [CountryofOriginpe, setCountryofOriginpe] = useState([]);
    // const [UpsellProducts, setUpsellProducts] = useState([]);
    // const [CrossSellProducts, setCrossSellProducts] = useState([]);
    // const [ProductTags, setProductTags] = useState([]);
    // const [ShortDescription, setShortDescription] = useState('');
    // const [FullDescription, setFullDescription] = useState('');
    // const [SelectVendor, setSelectVendor] = useState('');
    // const [SelectWarehouse, setSelectWarehouse] = useState('');
    // const [TaxStatus, setTaxStatus] = useState('');
    // const [SelectGST, setSelectGST] = useState('');
    // const [LowStockNotification, setLowStockNotification] = useState('');
    // const [ProductReview, setProductReview] = useState('');
    // const [ExpiryRule, setExpiryRule] = useState('');
    // const [UPLOADIMAGES, setUPLOADIMAGES] = useState('');
    // const [Galleryimages, setGalleryimages] = useState('');
    // const [MainCategory, setMainCategory] = useState('');
    // const [SubCategory, setSubCategory] = useState('');
    // const [ChildCategory, setChildCategory] = useState('');
    // const [Brand, setBrand] = useState('');
    // const [FeaturedProducts, setFeaturedProducts] = useState('');
    // const [FeaturedBrands, setFeaturedBrands] = useState('');
    // const [MetaDescription, setMetaDescription] = useState('');
    // const [AttributeName, setAttributeName] = useState('');
    // const [Product, setProduct] = useState({
    //     ProductType: '',
    //     ProductName: '',
    //     Country: '',
    //     UpsellProducts: '',
    //     CrossSellProducts: '',
    //     ProductTags: '',
    //     ShortDescription: '',
    //     FullDescription: '',
    //     SelectVendor: '',
    //     SelectWarehouse: '',
    //     HSN: '',
    //     SKU: '',
    //     RegularPrice: '',
    //     SalePrice: '',
    //     OfferDiscount: '',
    //     SelectTaxStatus: '',
    //     GST: '',
    //     ProductLength: '',
    //     ProductBreadth: '',
    //     ProductHeight: '',
    //     ProductWeight: '',
    //     ManageStock: '',
    //     UploadImages: '',
    //     Galleryimages: '',
    //     LowStockNotification: '',
    //     PreOrderQuantity: '',
    //     SoldIndividual: '',
    //     FromDate: '',
    //     EndDate: '',
    //     ProductReview: '',
    //     ProductExpiryDate: '',
    //     ExpiryRule: '',
    //     ProductEarnAmount: '',
    //     MainCategory: '',
    //     SubCategory: '',
    //     ChildCategory: '',
    //     Brands: '',
    //     MetaTitle: '',
    //     MetaSlug: '',
    //     MetaDescription: '',
    //     AttributeName: '',

    // });
    // // Attribute Product information
    // const [ATTProduct, setATTProduct] = useState({
    //     HSN: '',
    //     SKU: '',
    //     RegularPrice: '',
    //     SalePrice: '',
    //     OfferDiscount: '',
    //     ProductLength: '',
    //     ProductBreadth: '',
    //     ProductHeight: '',
    //     ProductWeight: '',
    //     ManageStock: '',
    //     PreOrderQuantity: '',
    //     SoldIndividual: '',
    //     FromDate: '',
    //     EndDate: '',
    //     ProductReview: '',
    //     ProductExpiryDate: '',
    //     ProductEarnAmount: '',




    // });
    // const [ATTSelectVendor, setATTSelectVendor] = useState('');
    // const [ATTSelectWarehouse, setATTSelectWarehouse] = useState('');
    // const [ATTTaxStatus, setATTTaxStatus] = useState('');
    // const [ATTSelectGST, setATTSelectGST] = useState('');
    // const [ATTLowStockNotification, setATTLowStockNotification] = useState('');
    // const [ATTExpiryRule, setATTExpiryRule] = useState('');
    // const [ATTProductReview, setATTProductReview] = useState('');
    // const [ATTProductImage, setATTProductImage] = useState('');
    // const [ATTProductGallery, setATTProductGallery] = useState('');
    // const [state, setState] = useState();
    // const [Tags, SetTags] = useState([]);
    // const [Vendor, SetVendor] = useState([]);
    // const [MainCate, SetMainCate] = useState([]);
    // const [Subcate, setSubcate] = useState([]);
    // const [Childcate, setChildcate] = useState([]);
    // const [branddata, Setbranddata] = useState([]);
    // const [GetAttributenames, SetGetAttributename] = useState([]);
    // const [ATTRDAT, setATTRDAT] = useState([]);
    // const [ID, setID] = useState('');
    // const [ATTRID, SetATTRID] = useState('');
    // const handleChange = value => {
    //     setState({ value });
    // };
    // const [stateshort, setStateshort] = useState();
    // const handleChangeshort = value => {
    //     setStateshort({ value });
    // };


    const { errors, register, handleSubmit } = useForm();
    // const onInputChange = (e) => {
    //     setFilterText(e.target.value);
    // };

    // const [view, setView] = useState({
    //     add: false,
    //     details: false,
    // });

    // const toggle = (type) => {
    //     setView({
    //         add: type === "add" ? true : false,
    //         details: type === "details" ? true : false,
    //         Viewdetails: type === "Viewdetails" ? true : false,
    //     });
    // };

    // const [files1, setFiles1] = useState([]);
    // const [files1ATT, setFiles1ATT] = useState([]);
    // const [files2, setFiles2] = useState([]);
    // const [files2ATT, setFiles2ATT] = useState([]);


    // useEffect(() => {
    //     Gettags();
    //     GetVendors();
    //     GetMainCate();
    //     GetBrand();
    //     GetAttributename();
    //     Getdata();
    // }, []);


    // const Getdata = async () => {

    //     if (location.state) {
    //         setID(location.state)
    //         const Result = await axios.get(`${API_Key}/${location.state}`);
    //         // console.log("resulttttt",Result);
    //         const Resultvendor = await axios.get(`${API_Key_vendor}/${Result.data.SelectVendor}`);
    //         const ResultMaincat = await axios.get(`${API_Key_mainCate}/${Result.data.MainCategory}`);
    //         const ResultSubcat = await axios.get(`${API_Key_subcate}/${Result.data.SubCategory}`);
    //         const ResultChildcat = await axios.get(`${API_Key_childcate}/${Result.data.ChildCategory}`);
    //         const ResultBrands = await axios.get(`${API_Key_Brand}/${Result.data.Brands}`);
    //         console.log("tt", Result.data)
    //         setProduct({
    //             ...Product,
    //             ProductName: Result.data.ProductName,
    //             HSN: Result.data.HSN,
    //             SKU: Result.data.SKU,
    //             RegularPrice: Result.data.RegularPrice,
    //             SalePrice: Result.data.SalePrice,
    //             OfferDiscount: Result.data.OfferDiscount,
    //             ProductLength: Result.data.ProductLength,
    //             ProductBreadth: Result.data.ProductBreadth,
    //             ProductHeight: Result.data.ProductHeight,
    //             ProductWeight: Result.data.ProductWeight,
    //             ManageStock: Result.data.ManageStock,
    //             PreOrderQuantity: Result.data.PreOrderQuantity,
    //             SoldIndividual: Result.data.SoldIndividual,
    //             FromDate: Result.data.FromDate,
    //             EndDate: Result.data.EndDate,
    //             ProductExpiryDate: Result.data.ProductExpiryDate,
    //             ProductEarnAmount: Result.data.ProductEarnAmount,
    //             MetaTitle: Result.data.MetaTitle,
    //             MetaSlug: Result.data.MetaSlug,
    //             MetaDescription: Result.data.MetaDescription,


    //         })
    //         setFiles1([{ image: Result.data.UploadImages }])
    //         setFiles2(Result.data.Galleryimages)
    //         setUPLOADIMAGES(Result.data.UploadImages)
    //         setGalleryimages(Result.data.Galleryimages)
    //         setProductType({ value: Result.data.ProductType, label: Result.data.ProductType })
    //         setCountryofOriginpe({ value: Result.data.Country, label: Result.data.Country })
    //         setUpsellProducts(Result.data.UpsellProducts)
    //         setCrossSellProducts(Result.data.CrossSellProducts)
    //         setProductTags(Result.data.ProductTags)
    //         setShortDescription(Result.data.ShortDescription)
    //         setFullDescription(Result.data.FullDescription)
    //         setSelectVendor({ value: Resultvendor.data._id, label: Resultvendor.data.CompanyName })
    //         setSelectWarehouse({ value: Result.data.SelectWarehouse, label: Result.data.SelectWarehouse })
    //         setTaxStatus({ value: Result.data.SelectTaxStatus, label: Result.data.SelectTaxStatus })
    //         setSelectGST({ value: Result.data.GST, label: Result.data.GST })
    //         setLowStockNotification({ value: Result.data.LowStockNotification, label: Result.data.LowStockNotification })
    //         setProductReview({ value: Result.data.ProductReview, label: Result.data.ProductReview })
    //         setExpiryRule({ value: Result.data.ExpiryRule, label: Result.data.ExpiryRule })
    //         setMainCategory({ value: ResultMaincat.data._id, label: ResultMaincat.data.CategoryName })
    //         setSubCategory({ value: ResultSubcat.data._id, label: ResultSubcat.data.SubCategoryName })
    //         setChildCategory({ value: ResultChildcat.data._id, label: ResultChildcat.data.ChildCategoryName })
    //         setBrand({ value: ResultBrands.data._id, label: ResultBrands.data.BrandName })
    //         setMetaDescription(Result.data.MetaDescription)
    //         setBtnSave(false)
    //         if (Result.data.AttributeName) {
    //             setATTRDAT([]);
    //             Result.data.AttributeName.map(items => {

    //                 if (items) {
    //                     setATTRDAT(datass => [...datass, items])
    //                     setAttributeName(datass => [...datass, items])
    //                 }

    //             })
    //         }


    //     }


    // }

    // const Gettags = async () => {
    //     SetTags([])
    //     const Result = await axios.get(`${API_Key_Tags}/list`)

    //     Result.data.map(itemstag => {
    //         const datss = {
    //             value: itemstag._id,
    //             label: itemstag.TagName
    //         }
    //         SetTags((items) => [...items, datss]);
    //     })
    // }

    // // function to close the form modal
    // const onFormCancel = () => {
    //     setView({ add: false, details: false });
    //     // resetForm();
    // };

    // const GetVendors = async () => {
    //     SetVendor([])
    //     const data = await axios.get(`${API_Key_vendor}/list`)
    //     data.data.map(itemsvendor => {
    //         const datss = {
    //             value: itemsvendor._id,
    //             label: itemsvendor.CompanyName
    //         }
    //         SetVendor((items) => [...items, datss]);
    //     })

    // }

    // const GetMainCate = async () => {
    //     SetMainCate([])
    //     const Results = await axios.get(`${API_Key_mainCate}/list`)
    //     console.log("resultss", Results)
    //     Results.data.map(itemsMain => {
    //         const datss = {
    //             value: itemsMain._id,
    //             label: itemsMain.CategoryName
    //         }
    //         SetMainCate((items) => [...items, datss]);
    //     })

    // }
    // const GetBrand = async () => {
    //     Setbranddata([])
    //     const Results = await axios.get(`${API_Key_Brand}/list`)

    //     Results.data.map(itemsMain => {
    //         const datss = {
    //             value: itemsMain._id,
    //             label: itemsMain.BrandName
    //         }
    //         Setbranddata((items) => [...items, datss]);
    //     })

    // }
    // const GetAttributename = async () => {
    //     SetGetAttributename([])
    //     const Results = await axios.get(`${API_Key_Attributename}`)

    //     Results.data.map(itemsMain => {
    //         const datss = {
    //             value: itemsMain._id,
    //             label: itemsMain.AttributeName
    //         }
    //         SetGetAttributename((items) => [...items, datss]);
    //     })

    // }



    const onFormSubmit = (form) => {
        // if (!ID) {
        //     Create();
        // } else {
        //     Edit(ID);
        // }



    };

    // const Create = () => {
    //     let formData = new FormData();
    //     formData.append("ProductType", ProductType.value);
    //     formData.append("ProductName", Product.ProductName);
    //     formData.append("Country", CountryofOriginpe.value);
    //     formData.append("UpsellProducts", JSON.stringify(UpsellProducts));
    //     formData.append("CrossSellProducts", JSON.stringify(CrossSellProducts));
    //     formData.append("ProductTags", JSON.stringify(ProductTags));
    //     formData.append("ShortDescription", ShortDescription);
    //     formData.append("FullDescription", FullDescription);
    //     formData.append("SelectVendor", SelectVendor.value);
    //     formData.append("SelectWarehouse", SelectWarehouse.value);
    //     formData.append("HSN", Product.HSN);
    //     formData.append("SKU", Product.SKU);
    //     formData.append("SalePrice", Product.SalePrice);
    //     formData.append("RegularPrice", Product.RegularPrice);
    //     formData.append("OfferDiscount", Product.OfferDiscount);
    //     formData.append("SoldIndividual", Product.SoldIndividual);
    //     formData.append("SelectTaxStatus", TaxStatus.value);
    //     formData.append("GST", SelectGST.value);
    //     formData.append("Brands", Brand.value);
    //     formData.append("ProductLength", Product.ProductLength);
    //     formData.append("ProductBreadth", Product.ProductBreadth);
    //     formData.append("ProductHeight", Product.ProductHeight);
    //     formData.append("ProductWeight", Product.ProductWeight);
    //     formData.append("ManageStock", Product.ManageStock);
    //     formData.append("LowStockNotification", LowStockNotification.value);
    //     formData.append("PreOrderQuantity", Product.PreOrderQuantity);
    //     formData.append("FromDate", Product.FromDate);
    //     formData.append("EndDate", Product.EndDate);
    //     formData.append("ProductReview", ProductReview.value);
    //     formData.append("ProductExpiryDate", Product.ProductExpiryDate);
    //     formData.append("ExpiryRule", ExpiryRule.value);
    //     formData.append("ProductEarnAmount", Product.ProductEarnAmount);
    //     formData.append("MainCategory", MainCategory.value);
    //     formData.append("SubCategory", SubCategory.value);
    //     formData.append("ChildCategory", ChildCategory.value);
    //     formData.append("MetaTitle", Product.MetaTitle);
    //     formData.append("MetaSlug", Product.MetaSlug);
    //     formData.append("MetaDescription", MetaDescription);
    //     formData.append("AttributeName", JSON.stringify(AttributeName));
    //     formData.append("UploadImages", UPLOADIMAGES);

    //     if (Galleryimages && Galleryimages.length) {
    //         Galleryimages.map((items) => {
    //             console.log("yy", items)
    //             formData.append("Galleryimages", items);
    //         })
    //     }

    //     const config = {
    //         headers: {
    //             "content-type": "multipart/form-data",
    //         },
    //     };

    //     axios.post(API_Key, formData, config).then((res) => {
    //         setProduct({
    //             ...Product,
    //             Product: '',
    //             ProductType: '',
    //             ProductName: '',
    //             Country: '',
    //             UpsellProducts: '',
    //             CrossSellProducts: '',
    //             ProductTags: '',
    //             ShortDescription: '',
    //             FullDescription: '',
    //             SelectVendor: '',
    //             SelectWarehouse: '',
    //             HSN: '',
    //             SKU: '',
    //             RegularPrice: '',
    //             SalePrice: '',
    //             OfferDiscount: '',
    //             SelectTaxStatus: '',
    //             GST: '',
    //             ProductLength: '',
    //             ProductBreadth: '',
    //             ProductHeight: '',
    //             ProductWeight: '',
    //             ManageStock: '',
    //             UploadImages: '',
    //             Galleryimages: '',
    //             LowStockNotification: '',
    //             PreOrderQuantity: '',
    //             SoldIndividual: '',
    //             FromDate: '',
    //             EndDate: '',
    //             ProductReview: '',
    //             ProductExpiryDate: '',
    //             ExpiryRule: '',
    //             ProductEarnAmount: '',
    //             MainCategory: '',
    //             SubCategory: '',
    //             ChildCategory: '',
    //             Brands: '',
    //             MetaTitle: '',
    //             MetaSlug: '',
    //             MetaDescription: '',
    //             AttributeName: '',
    //         });
    //         setProductType('');
    //         setCountryofOriginpe('');
    //         setUpsellProducts('');
    //         setCrossSellProducts('');
    //         setProductTags('');
    //         setShortDescription('');
    //         setFullDescription('');
    //         setSelectVendor('');
    //         setSelectWarehouse('');
    //         setTaxStatus('');
    //         setSelectGST('');
    //         setLowStockNotification('');
    //         setProductReview('');
    //         setExpiryRule('');
    //         setUPLOADIMAGES('');
    //         setGalleryimages('');
    //         setMainCategory('');
    //         setSubCategory('');
    //         setChildCategory('');
    //         setMetaDescription('');
    //         setAttributeName('');
    //         setBrand('');
    //         setBtnSave(false)

    //         window.location.href = "/dashboard/prod-list"

    //         // setATTRDAT([]);
    //         // res.data.AttributeName.map(items =>{
    //         //   console.log("ddd",items)
    //         //   setATTRDAT(datass => [...datass,items])

    //         // })

    //     });

    // }

    // const Edit = (ID) => {
    //     let formData = new FormData();
    //     formData.append("_id", ID);
    //     formData.append("ProductType", ProductType.value);
    //     formData.append("ProductName", Product.ProductName);
    //     formData.append("Country", CountryofOriginpe.value);
    //     formData.append("UpsellProducts", JSON.stringify(UpsellProducts));
    //     formData.append("CrossSellProducts", JSON.stringify(CrossSellProducts));
    //     formData.append("ProductTags", JSON.stringify(ProductTags));
    //     formData.append("ShortDescription", ShortDescription);
    //     formData.append("FullDescription", FullDescription);
    //     formData.append("SelectVendor", SelectVendor.value);
    //     formData.append("SelectWarehouse", SelectWarehouse.value);
    //     formData.append("HSN", Product.HSN);
    //     formData.append("SKU", Product.SKU);
    //     formData.append("SalePrice", Product.SalePrice);
    //     formData.append("RegularPrice", Product.RegularPrice);
    //     formData.append("OfferDiscount", Product.OfferDiscount);
    //     formData.append("SoldIndividual", Product.SoldIndividual);
    //     formData.append("SelectTaxStatus", TaxStatus.value);
    //     formData.append("GST", SelectGST.value);
    //     formData.append("Brands", Brand.value);
    //     formData.append("ProductLength", Product.ProductLength);
    //     formData.append("ProductBreadth", Product.ProductBreadth);
    //     formData.append("ProductHeight", Product.ProductHeight);
    //     formData.append("ProductWeight", Product.ProductWeight);
    //     formData.append("ManageStock", Product.ManageStock);
    //     formData.append("LowStockNotification", LowStockNotification.value);
    //     formData.append("PreOrderQuantity", Product.PreOrderQuantity);
    //     formData.append("FromDate", Product.FromDate);
    //     formData.append("EndDate", Product.EndDate);
    //     formData.append("ProductReview", ProductReview.value);
    //     formData.append("ProductExpiryDate", Product.ProductExpiryDate);
    //     formData.append("ExpiryRule", ExpiryRule.value);
    //     formData.append("ProductEarnAmount", Product.ProductEarnAmount);
    //     formData.append("MainCategory", MainCategory.value);
    //     formData.append("SubCategory", SubCategory.value);
    //     formData.append("ChildCategory", ChildCategory.value);
    //     formData.append("MetaTitle", Product.MetaTitle);
    //     formData.append("MetaSlug", Product.MetaSlug);
    //     formData.append("MetaDescription", MetaDescription);
    //     formData.append("AttributeName", JSON.stringify(AttributeName));
    //     formData.append("UploadImages", UPLOADIMAGES);
    //     if (Galleryimages && Galleryimages.length) {
    //         Galleryimages.map((items) => {
    //             formData.append("Galleryimages", items);
    //         })
    //     }


    //     const config = {
    //         headers: {
    //             "content-type": "multipart/form-data",
    //         },
    //     };

    //     axios.put(`${API_Key}/${ID}`, formData, config).then((res) => {
    //         localStorage.removeItem('Product');
    //         setProduct('');
    //         setProductType('');
    //         setCountryofOriginpe('');
    //         setUpsellProducts('');
    //         setCrossSellProducts('');
    //         setProductTags('');
    //         setShortDescription('');
    //         setFullDescription('');
    //         setSelectVendor('');
    //         setSelectWarehouse('');
    //         setTaxStatus('');
    //         setSelectGST('');
    //         setLowStockNotification('');
    //         setProductReview('');
    //         setExpiryRule('');
    //         setUPLOADIMAGES('');
    //         setGalleryimages('');
    //         setMainCategory('');
    //         setSubCategory('');
    //         setChildCategory('');
    //         setMetaDescription('');
    //         setAttributeName('');
    //         window.location.href = "/dashboard/prod-list"
    //     });
    // }

    // const onFormSubmitATT = () => {
    //     let formData = new FormData();
    //     formData.append("_id", ID);
    //     formData.append("Attrid", ATTRID);
    //     formData.append("HSN", ATTProduct.HSN);
    //     formData.append("RegularPrice", ATTProduct.RegularPrice);
    //     formData.append("SalePrice", ATTProduct.SalePrice);
    //     formData.append("OfferDiscount", ATTProduct.OfferDiscount);
    //     formData.append("ProductLength", ATTProduct.ProductLength);
    //     formData.append("ProductHeight", ATTProduct.ProductHeight);
    //     formData.append("ProductWeight", ATTProduct.ProductWeight);
    //     formData.append("ManageStock", ATTProduct.ManageStock);
    //     formData.append("PreOrderQuantity", ATTProduct.PreOrderQuantity);
    //     formData.append("SoldIndividual", ATTProduct.SoldIndividual);
    //     formData.append("FromDate", ATTProduct.FromDate);
    //     formData.append("EndDate", ATTProduct.EndDate);
    //     formData.append("ProductExpiryDate", ATTProduct.ProductExpiryDate);
    //     formData.append("ProductEarnAmount", ATTProduct.ProductEarnAmount);
    //     formData.append("SelectVendor", ATTSelectVendor.value);
    //     formData.append("SelectWarehouse", ATTSelectWarehouse.value);
    //     formData.append("TaxStatus", ATTTaxStatus.value);
    //     formData.append("SelectGST", ATTSelectGST.value);
    //     formData.append("LowStockNotification", ATTLowStockNotification.value);
    //     formData.append("ExpiryRule", ATTExpiryRule.value);
    //     formData.append("ProductReview", ATTProductReview.value);
    //     formData.append("UploadImagesAttribute", ATTProductImage);

    //     if (ATTProductGallery && ATTProductGallery.length) {
    //         ATTProductGallery.map((items) => {
    //             console.log("test", items)
    //             formData.append("GalleryimagesAttirbute", items);
    //         })
    //     }

    //     const config = {
    //         headers: {
    //             "content-type": "multipart/form-data",
    //         },
    //     };

    //     axios.put(`${API_Key}/Attributes/${ID}`, formData, config).then((res) => {
    //         onFormCancel();
    //     });
    // };

    // const onFormSubmitsvalue = (form) => {
    //     if (!Product._id) {
    //         Create();
    //     }
    //     else {
    //         Edit(Product._id)
    //     }
    // }

    // const [formData, setFormData] = useState({
    //     id: null,
    //     orderId: "",
    //     date: "",
    //     status: "",
    //     customer: "",
    //     purchased: "",
    //     paid: "",
    //     total: "",
    //     list: "",
    //     add: "",
    //     check: false,
    // });

    // const disputesTableColumnsatt = [


    //     { field: 'Attribute1', title: 'Attribute 1' },
    //     { field: 'Attribute2', title: 'Attribute 2' },
    //     // { field: 'Status', title: 'Status' },
    //     {
    //         field: "",
    //         title: "Action",
    //         render: (row) => (
    //             <ul className="gx-1 my-n1">
    //                 <li className="mr-n1">
    //                     <UncontrolledDropdown>
    //                         <DropdownToggle
    //                             tag="a"

    //                             className="dropdown-toggle btn btn-icon btn-trigger"
    //                         >
    //                             <Icon name="more-h"></Icon>
    //                         </DropdownToggle>
    //                         <DropdownMenu right>
    //                             <ul className="link-list-opt no-bdr">
    //                                 <li>
    //                                     <DropdownItem
    //                                         tag="a"
    //                                         href="#"
    //                                         onClick={() => {g
    //                                             toggle("add", row._id);

    //                                         }}
    //                                     >
    //                                         <Icon name="edit"></Icon>
    //                                         <span>Edit</span>
    //                                     </DropdownItem>
    //                                 </li>
    //                                 <li>
    //                                     <DropdownItem
    //                                         tag="a"
    //                                         href="#"
    //                                     >
    //                                         <Icon name="eye"></Icon>
    //                                         <span>View</span>
    //                                     </DropdownItem>
    //                                 </li>

    //                             </ul>
    //                         </DropdownMenu>
    //                     </UncontrolledDropdown>
    //                 </li>
    //             </ul>
    //         ),
    //     },
    // ];

    // const toggle = async (type, id) => {

    //     SetATTRID(id);
    //     if (ID) {
    //         const Result = await axios.get(`${API_Key}/${ID}`);

    //         const Attdata = Result.data.AttributeName.filter(item => item._id == id);
    //         console.log("xcxc", Attdata[0].ExpiryRule)
    //         const Resultvendor = await axios.get(`${API_Key_vendor}/${Attdata[0].SelectVendor}`);
    //         setATTProduct({
    //             ...ATTProduct,
    //             HSN: Attdata[0].HSN,
    //             SKU: Attdata[0].SKU,
    //             RegularPrice: Attdata[0].RegularPrice,
    //             SalePrice: Attdata[0].SalePrice,
    //             OfferDiscount: Attdata[0].OfferDiscount,
    //             ProductLength: Attdata[0].ProductLength,
    //             ProductBreadth: Attdata[0].ProductBreadth,
    //             ProductHeight: Attdata[0].ProductHeight,
    //             ProductWeight: Attdata[0].ProductWeight,
    //             ManageStock: Attdata[0].ManageStock,
    //             PreOrderQuantity: Attdata[0].PreOrderQuantity,
    //             SoldIndividual: Attdata[0].SoldIndividual,
    //             FromDate: Attdata[0].FromDate,
    //             EndDate: Attdata[0].EndDate,
    //             ProductReview: Attdata[0].ProductReview,
    //             ProductExpiryDate: Attdata[0].ProductExpiryDate,
    //             ProductEarnAmount: Attdata[0].ProductEarnAmount,
    //         })
    //         setATTSelectVendor({ value: Resultvendor.data._id, label: Resultvendor.data.CompanyName })
    //         setATTSelectWarehouse({ value: Attdata[0].SelectWarehouse, label: Attdata[0].SelectWarehouse })
    //         setATTTaxStatus({ value: Attdata[0].TaxStatus, label: Attdata[0].TaxStatus })
    //         setATTSelectGST({ value: Attdata[0].SelectGST, label: Attdata[0].SelectGST })
    //         setATTLowStockNotification({ value: Attdata[0].LowStockNotification, label: Attdata[0].LowStockNotification })
    //         setATTExpiryRule({ value: Attdata[0].ExpiryRule, label: Attdata[0].ExpiryRule })
    //         setATTProductReview({ value: Attdata[0].ProductReview, label: Attdata[0].ProductReview })
    //     }


    //     setView({
    //         add: type === "add" ? true : false,
    //         details: type === "details" ? true : false,
    //     });
    // };

    // const handleDropChange1 = (acceptedFiles) => {
    //     setUPLOADIMAGES(acceptedFiles[0])
    //     setFiles1(
    //         acceptedFiles.map((file) =>
    //             Object.assign(file, {
    //                 preview: URL.createObjectURL(file),
    //             })
    //         )
    //     );
    // };

    // const handleDropChangeAttproduct = (acceptedFilesAttimage) => {
    //     setATTProductImage(acceptedFilesAttimage[0])
    //     setFiles1ATT(
    //         acceptedFilesAttimage.map((file) =>
    //             Object.assign(file, {
    //                 preview: URL.createObjectURL(file),
    //             })
    //         )
    //     );
    // };

    // const handleDropChange2 = (acceptedFiles1) => {
    //     setGalleryimages(acceptedFiles1)
    //     setFiles2(
    //         acceptedFiles1.map((file) =>
    //             Object.assign(file, {
    //                 preview: URL.createObjectURL(file),
    //             })
    //         )
    //     );
    // };

    // const handleDropChangeATTPrdoctGallery = (acceptedFilesAttGall) => {
    //     setATTProductGallery(acceptedFilesAttGall)
    //     setFiles2ATT(
    //         acceptedFilesAttGall.map((file) =>
    //             Object.assign(file, {
    //                 preview: URL.createObjectURL(file),
    //             })
    //         )
    //     );
    // };

    // useEffect(() => {
    //     if (filterText !== "") {
    //         const filteredData = messageData.filter((item) => {
    //             return (
    //                 item.name.toLowerCase().includes(filterText.toLowerCase()) ||
    //                 item.messageTitle.toLowerCase().includes(filterText.toLowerCase())
    //             );
    //         });
    //         setData([...filteredData]);
    //     } else {
    //         setData(filteredTabData);
    //     }
    // }, [filterText, filterTab, filteredTabData]);

    // const onchangereview = ({ target: { name, value } }) => {
    //     setReview({ ...Review, [name]: value });
    // }

    // const ReviewClick = () => {
    //     if (Review.reviewmsg) {
    //         setReviewerror(null)
    //     } else {
    //         setReviewerror("* This field is required")
    //     }
    // }


    

    


    // Onchange Start

    // const handleChangeProduct = ({ target: { name, value } }) => {
    //     setProduct({ ...Product, [name]: value });


    // };
    // const handleChangeProductATT = ({ target: { name, value } }) => {
    //     setATTProduct({ ...ATTProduct, [name]: value });


    // };

    // const ProductTypehandlechange = (event) => {
    //     setProductType(event)

    //     if (event.value == "Simple") {
    //         setAttributeTabs(false)
    //     } else {
    //         setAttributeTabs(true)
    //     }


    // }
    // const CountryofOriginpehandlechange = (event) => {
    //     setCountryofOriginpe(event)
    // }
    // const MainCategorys = async (event) => {
    //     setMainCategory(event)
    //     setSubcate([]);
    //     const Subcat = await axios.get(`${API_Key_subcate}/maincategory/${event.value}`)
    //     console.log("subcat", Subcat);
    //     Subcat.data.map((Subitem) => {
    //         const subdat = {
    //             value: Subitem._id,
    //             label: Subitem.SubCategoryName,
    //         }
    //         setSubcate((item) => [...item, subdat]);

    //     })

    // }
    // const SubCategorys = async (event) => {
    //     setSubCategory(event)
    //     setChildcate([]);
    //     const Child = await axios.get(`${API_Key_childcate}/subcategory/${event.value}`)
    //     Child.data.map((Childitem) => {
    //         const childcat = {
    //             value: Childitem._id,
    //             label: Childitem.ChildCategoryName,
    //         }
    //         setChildcate((item) => [...item, childcat]);

    //     })

    // }

    // const AttributeOnchange = async (event) => {

    //     const Attribut = await axios.get(`${API_Key_AttributeValue}/Attrbutesvalues/${event[0].value}`)
    //     var att = Attribut.data
    //     if (event.length > 1) {
    //         const Attt = await axios.get(`${API_Key_AttributeValue}/Attrbutesvalues/${event[1].value}`)
    //         var att2 = Attt.data
    //         var arry = []
    //         var ids = 0;
    //         att.forEach((item) => {
    //             att2.forEach((ss, index) => {
    //                 ids++;
    //                 const data = {
    //                     _id: ids,
    //                     Attribute1: item.AttributeValue,
    //                     Attribute2: ss.AttributeValue,
    //                     HSN: Product.HSN,
    //                     SKU: Product.SKU,
    //                     RegularPrice: Product.RegularPrice,
    //                     SalePrice: Product.SalePrice,
    //                     OfferDiscount: Product.OfferDiscount,
    //                     ProductLength: Product.ProductLength,
    //                     ProductHeight: Product.ProductHeight,
    //                     ProductBreadth: Product.ProductBreadth,
    //                     ProductWeight: Product.ProductWeight,
    //                     ManageStock: Product.ManageStock,
    //                     PreOrderQuantity: Product.PreOrderQuantity,
    //                     SoldIndividual: Product.SoldIndividual,
    //                     FromDate: Product.FromDate,
    //                     EndDate: Product.EndDate,
    //                     ProductExpiryDate: Product.ProductExpiryDate,
    //                     ProductEarnAmount: Product.ProductEarnAmount,
    //                     SelectVendor: SelectVendor.value,
    //                     SelectWarehouse: SelectWarehouse.value,
    //                     TaxStatus: TaxStatus.value,
    //                     SelectGST: SelectGST.value,
    //                     LowStockNotification: LowStockNotification.value,
    //                     ExpiryRule: ExpiryRule.value,
    //                     ProductReview: ProductReview.value,
    //                     Productimage: '',
    //                     ProductGalleryimage: '',
    //                 }
    //                 arry.push(data)
    //             })
    //         })
    //         setAttributeName(arry)
    //     }

    // }

    // const deleteImageATTProductimage = () => {
    //     setFiles1ATT([])
    //     setATTProductImage('')
    // }
    // const deleteImageProductimage = () => {
    //     setFiles1([])
    //     setUPLOADIMAGES('')
    // }
    // const deleteImageProductgallery = () => {
    //     setFiles2([])
    //     setGalleryimages('')
    // }
    const [modalEdit, setModalEdit] = useState(false);
    const [modalview, setModalview] = useState(false);
    const [modalFail, setModalFail] = useState(false);
    const toggleModalEdit = () => setModalEdit(!modalEdit);
    const toggleModalview = () => setModalview(!modalview);
    const toggleModalFail = () => setModalFail(!modalFail);
    

    const [smOption, setSmOption] = useState(false);
   
    const EditTable = (id, type) => {
        // history.push({ pathname: '/dashboard/product-lists', state: id })
        history.push({ pathname: '/dashboard/product_lists_add_edit', state: id })
        console.log("id is",id)
        setModalEdit(true)
    }

    const viewlist = async () => {
        setModalview(true)
    }

    const DeleteOpen = () => {
        setModalFail(true);
    };
    useEffect(() => {
        Getdata();
      }, []);
    const Getdata = async () => {
        if (location.state) {
        console.log(location.state,"location.statelocation.state")       
        const  proddata = await axios.get(`${API_Product}/getproductvarietydata/${location.state}`, config)
        console.log(proddata,"mmmmmmmmmmmmmmmmmmmmmmmmmm")
       setAttrProductListColumnData(proddata.data.list);
      }
    }

    // AttrProductListColumnData = [
    //     {
    //         AttributeID: "001",
    //         AttributeType: "Blue",
    //         AttributeValue: "xxl",
    //     },
    //     {
    //         AttributeID: "002",
    //         AttributeType: "Blue",
    //         AttributeValue: "md",
    //     },
    //     {
    //         AttributeID: "003",
    //         AttributeType: "Blue",
    //         AttributeValue: "sm",
    //     },
    //     {
    //         AttributeID: "004",
    //         AttributeType: "Red",
    //         AttributeValue: "xxl",
    //     },
    //     {
    //         AttributeID: "005",
    //         AttributeType: "Red",
    //         AttributeValue: "md",
    //     },
    //     {
    //         AttributeID: "006",
    //         AttributeType: "Red",
    //         AttributeValue: "sm",
    //     },

    // ];

    const AttrProductListColumn = [
        { field: "productlist_id", title: "Variation ID" },
        { field: "AttributeType", title: "Variation Type1" },
        { field: "AttributeTypeValue", title: "Variation Type2" },
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
                                        <DropdownItem tag="a" href="#Edit" onClick={() => EditTable(row.productlist_id)}>
                                            <Icon name="edit"></Icon>
                                            <span>Edit</span>
                                        </DropdownItem>
                                    </li>
                                    {/* <li>
                                        <DropdownItem tag="a" href="#view" onClick={() => viewlist(row._id)}>
                                            <Icon name="eye"></Icon>
                                            <span>View</span>
                                        </DropdownItem>
                                    </li> */}
                                    <li>
                                        <DropdownItem tag="a" href="#remove" onClick={() => DeleteOpen(row._id)}>
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
        <React.Fragment>
            <Content page="component">
                


                <div style={{ marginTop: "", background: "white", padding: "50px" }}>
                    <MuiThemeProvider theme={Tabletheme()}>
                        <MaterialTable icons={tableIcons}
                            columns={AttrProductListColumn}
                            data={AttrProductListColumnData}
                            title="Variation List"
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
                                <form onSubmit={handleSubmit(onFormSubmit)}>
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
                                </form>
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
                                <form onSubmit={handleSubmit(onFormSubmit)}>
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
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </Content>
        </React.Fragment>

    );
};
export default ProductlistVariation;