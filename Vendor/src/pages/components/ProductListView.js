import React, { useEffect, useState, forwardRef } from "react";
import Content from "../../../src/layout/content/Content"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    PreviewCard, Button, Icon, Row, Col, RSelect, Block, CustomDataTable
} from "../../../src/components/Component";
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
import User from "../../../src/images/avatar/b-sm.jpg";
import MaterialTable from 'material-table';
import { makeStyles, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
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
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import { API_URL, API_Product, API_Warehouse, API_Brand, API_Category, API_Tags, API_Attribute, API_SubCategory, API_ChildCategory, token } from "../../../src/Api";
const API_Image = `${API_URL}/Product_image`;
const API_Key_vendor = `${API_URL}/admin/vendors`;

const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    },
};

// const API_Key = `${API_URL}/create-product`;
// const API_Key_vendor = `${API_URL}/UserVendor`;


// const API_Key_AttributeValue = `${API_URL}/get-attribute/attributenames`;
// const Products_Attribute_value_get = `${API_URL}/AttributeGet/dropdown`;
// var AttributeTempARR = [];

const ProductListView = () => {

    const [attrvalue1, setattrvalue1] = useState("");
    const [attrvalue2, setattrvalue2] = useState([]);
    const [inputFields, setInputFields] = useState([]);
    const [AttributeValueInput, setAttributeValueInput] = useState([]);
    const [AttributeNameInputs, setAttributeNameInputs] = useState([]);
    const [Attdata, setAttdata] = useState([]);
    const [toggleBtn, settoggleBtn] = useState(false)


    const location = useLocation();
    // console.log("location state",location)
    const [files, setFiles] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [AttributeTabs, setAttributeTabs] = useState(false);
    const [Subattribute, setSubattribute] = useState(false);
    const [BtnSave, setBtnSave] = useState(true);
    const [filter, setFilter] = useState(false);
    // const [data, setData] = useState(messageData);
    // const [filteredTabData, setFilteredTabData] = useState(messageData);
    const [filterTab, setFilterTab] = useState("1");
    const [filterText, setFilterText] = useState("");
    const [ProductType, setProductType] = useState({ value: "", label: "" });
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
    const [files1, setFiles1] = useState([]);
    const [modalFail, setModalFail] = useState(false);
    const toggleModalFail = () => setModalFail(!modalFail);
    const [ware, setWare] = useState([]);

    const [files1ATT, setFiles1ATT] = useState([]);
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
        LowStockMessage: '',
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


    useEffect(() => {
        GetData();
    }, []);

    const GetData = async () => {
        if (location.state) {
            setID(location.state)
            console.log("location state", location.state);

            const { data } = await axios.get(`${API_Product}/${location.state}`, config);
            console.log(data, "dattttt")
            console.log("data.list[0].ProductName", data.list[0].ProductName);
            const ResultBrands = await axios.get(`${API_Brand}/${data.list[0].BrandID}`, config);
            const ResultVendor = await axios.get(`${API_Key_vendor}/${data.list[0].Vendor_id}`, config);

            console.log("ResultVendor", ResultVendor);
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
                LowStockMessage: data.list[0].LowStockMessage,
                PeriodOfTime: data.list[0].PeriodOfTime,
                SKU1: data.list[0].SKU1,
                SKU2: data.list[0].SKU2,
                YoutubeLink: data.list[0].YoutubeLink,
                ReturnDays: data.list[0].ReturnDays,
                ProductImage: data.list[0].ProductImage
            })

            setProductVariety(data.list[0].Product_variety)
            setFilesView(data.list[0].ProductImage)
            setMulImgView(data.list[0].productgalleryimages)
            setProductType({ value: data.list[0].ProductType, label: data.list[0].ProductType })
            setBrand({ value: ResultBrands.data.list[0].id, label: ResultBrands.data.list[0].name })
            setUpsellProducts(data.list[0].UpsellProducts)
            setCrossSellProducts(data.list[0].CrossSellProducts)

            setProductTags(data.list[0].ProductTags)
            setShortDescription(data.list[0].ShortDescription)
            setFullDescription(data.list[0].FullDescription)
            setTopContent(data.list[0].TopContent)
            setBottomContent(data.list[0].BottomContent)

            setSelectWarehouse(data.list[0].Warehouse)
            setTaxStatus({ value: data.list[0].TaxStatus, label: data.list[0].TaxStatus })
            setSelectGST({ value: data.list[0].GST, label: data.list[0].GST })
            const notify = data.list[0].LowStockNotification ? 'Enable' : 'Disable'
            setLowStockNotification({ value: data.list[0].LowStockNotification, label: notify })
            const order = data.list[0].PreOrder ? 'Enable' : 'Disable'
            setPreOrderAction({ value: data.list[0].PreOrder, label: order })
            const review = data.list[0].ProductReview ? 'Enable' : 'Disable'
            setProductReview({ value: data.list[0].ProductReview, label: review })
            const rule = data.list[0].ExpiryRule ? 'Enable' : 'Disable'
            setExpiryRule({ value: data.list[0].ExpiryRule, label: rule })
            const stat = data.list[0].Status ? 'Active' : 'InActive'
            setStatus({ value: data.list[0].Status, label: stat })
            const ret = data.list[0].Returnable ? 'Yes' : 'No'
            setReturnable({ value: data.list[0].Returnable, label: ret })
            setMainCategory(data.list[0].MainCategory)
            setSubCategory(data.list[0].SubCategory)
            setChildCategory(data.list[0].ChildCategory)
            setMetaDescription(data.list[0].MetaDescription)
            setSelectVendor({ value: ResultVendor.data.list[0].id, label: ResultVendor.data.list[0].company_name })
            setBtnSave(false)

            if (data.list[0].ProductType == "Simple") {
                setAttributeTabs(false)
            } else {
                setAttributeTabs(true)
            }
            if (data.list[0].Product_variety == "Sub") {
                setSubattribute(false)
                setActiveIconTab("2")
            } else {
                setSubattribute(true)
                setActiveIconTab("1")
            }


            if (data.list[0].AttributeName) {

                data.list[0].AttributeValue.map((items) => {

                    const Datas = {
                        value: items.id,
                        label: items.Attribute_name,
                        AttributeValue: items.Item
                    }
                    console.log(Datas, "AttributeValueAttributeValueAttributeValue")
                    setInputFields((item) => [...item, Datas])

                })
            }
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
    return (
        <React.Fragment>

            <Content page="component">
                <Block size="lg">
                    <PreviewCard>
                        <Nav tabs>
                            {/* {Subattribute ? */}
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
                                    <span>About Product</span>
                                </NavLink>
                            </NavItem>
                            {/* : null} */}
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
                                    <span>Product Information</span>
                                </NavLink>
                            </NavItem>
                            {/* {Subattribute ? */}
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
                                    <span>Category</span>
                                </NavLink>
                            </NavItem>
                            {/* : null} */}
                            {/* {Subattribute ? */}
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
                                    <span>Brand</span>
                                </NavLink>
                            </NavItem>
                            {/* : null} */}
                            {/* {Subattribute ? */}
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
                                    <span>SEO</span>
                                </NavLink>
                            </NavItem>
                            {/* : null} */}

                            {AttributeTabs && Subattribute ?
                                <NavItem>
                                    <NavLink
                                        tag="a"
                                        href="#tab"
                                        className={classnames({ active: activeIconTab === "6" })}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            toggleIconTab("6");
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
                                    className={classnames({ active: activeIconTab === "7" })}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        toggleIconTab("7");
                                    }}
                                >
                                    <span>Current Offers</span>
                                </NavLink>
                            </NavItem>


                        </Nav>
                    </PreviewCard>
                    <PreviewCard>

                        <TabContent activeTab={activeIconTab} >

                            <TabPane tabId="1">
                                <Row className="g-3">

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
                                                    
                                                    isDisabled={true}

                                                    value={ProductType}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> Product Name* </label>
                                            <div className="form-control-wrap">
                                                <input className="form-control" placeholder="Enter Product Name"
                                                    // name="ProductName"
                                                    // onChange={handleChangeProduct} 
                                                    value={Product.ProductName}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> Country of Origin*</label>
                                            <div className="form-control-wrap">
                                                <input className="form-control" placeholder="Enter Country of Origin"
                                                    name="CountryOfOrigin"
                                                    // onChange={handleChangeProduct} 
                                                    value={Product.CountryOfOrigin}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>


                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid"> Upsell Products </label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    name="UpsellProducts"
                                                    // options={products}
                                                    // isMulti={true}
                                                    // onChange={(event) => setUpsellProducts(event)}
                                                    value={UpsellProducts}
                                                    // readOnly
                                                    isDisabled={true}
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
                                                    // options={products}
                                                    // isMulti={true}
                                                    // onChange={(event) => setCrossSellProducts(event)}
                                                    value={CrossSellProducts}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid"> Product Tags* </label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    name="ProductTags"
                                                    // options={Tags}
                                                    // isMulti={true}
                                                    // onChange={(event) => setProductTags(event)}
                                                    value={ProductTags}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>



                                    <Col size="6">
                                        <FormGroup>
                                            <label className="form-label"> Short Description* </label>
                                            <div className="text-editor" style={{ minHeight: '100px', }}>
                                                <ReactQuill
                                                    theme="snow"
                                                    name="ShortDescription"
                                                    // onChange={(event) => setShortDescription(event)}
                                                    placeholder={"Write something awesome..."}
                                                    modules={modules}
                                                    formats={formats}
                                                    value={ShortDescription}
                                                    readOnly
                                                />
                                            </div>

                                        </FormGroup>
                                    </Col>

                                    <Col size="6">
                                        <FormGroup>
                                            <label className="form-label"> Full Description* </label>
                                            <div className="text-editor" style={{ minHeight: '100px', }}>
                                                <ReactQuill
                                                    theme="snow"
                                                    name="FullDescription"
                                                    // onChange={(event) => setFullDescription(event)}
                                                    placeholder={"Write something awesome..."}
                                                    modules={modules1}
                                                    formats={formats}
                                                    value={FullDescription}
                                                    readOnly
                                                />
                                            </div>

                                        </FormGroup>
                                    </Col>
                                    <Col size="12">
                                        <FormGroup>
                                            <label className="form-label"> Top Content </label>
                                            <div className="text-editor" style={{ minHeight: '100px', }}>
                                                <ReactQuill
                                                    theme="snow"
                                                    // onChange={(event) => setTopContent(event)}
                                                    placeholder={"Write something awesome..."}
                                                    modules={modules}
                                                    formats={formats}
                                                    value={TopContent}
                                                    name="TopContent"
                                                    readOnly
                                                />
                                            </div>
                                            {/* {errors.description && <span className="invalid">{errors.description.message}</span>} */}
                                        </FormGroup>
                                    </Col>

                                    <Col size="12">
                                        <FormGroup>
                                            <label className="form-label"> Bottom Content </label>
                                            <div className="text-editor" style={{ minHeight: '100px', }}>
                                                <ReactQuill
                                                    theme="snow"
                                                    // onChange={(event) => setBottomContent(event)}
                                                    placeholder={"Write something awesome..."}
                                                    modules={modules1}
                                                    formats={formats}
                                                    value={BottomContent}
                                                    // name="BottomContent"
                                                    readOnly
                                                />
                                            </div>
                                            {/* {errors.description && <span className="invalid">{errors.description.message}</span>} */}
                                        </FormGroup>
                                    </Col>
                                    <Col size="12">
                                        <Button
                                            color="primary"
                                            style={{ float: "right" }}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                toggleIconTab("2");
                                                window.scrollTo({ top: 0, behavior: "auto" });
                                            }}>
                                            <span>NEXT</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="2">
                                <Row className="g-3">
                                    <Col md="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="customer"><h5>Product Information</h5></label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid"> Select Vendor</label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    name="SelectVendor"
                                                    // options={Vendor}
                                                    // onChange={vendorChange}
                                                    value={SelectVendor}
                                                    fields={{ value: "value", text: "label" }}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="4" >
                                        <div className="preview-block mt-3">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox" style={{ marginTop: '22px' }}>
                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck8"
                                                            name="CatelogVisibility"
                                                            checked={Product.CatelogVisibility}
                                                            // onChange={changeVisibility}
                                                            readOnly
                                                        />
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
                                                    // name="SelectWarehouse"
                                                    // options={subware}
                                                    // isMulti={true}
                                                    // onChange={(event) => setSelectWarehouse(event)}
                                                    // onChange={subCategoryChange}
                                                    value={SelectWarehouse}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    {/* </Row> */}

                                    <Col md="4">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> HSN* </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="numbers"
                                                    className="form-control"
                                                    placeholder="Enter HSN Code"
                                                    name="HSN"
                                                    // onChange={handleChangeProduct}
                                                    value={Product.HSN}
                                                    readOnly
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
                                                    placeholder="3001-BA"
                                                    // name="SKU"
                                                    // onChange={handleChangeProduct}
                                                    value={Product.SKU}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="4">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> EAN* </label>
                                            <div className="form-control-wrap">
                                                <input className="form-control" placeholder="Enter EAN"
                                                    name="EAN"
                                                    // onChange={handleChangeProduct} 
                                                    value={Product.EAN}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> Regular Price* </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter Regular Price"

                                                    value={Product.RegularPrice}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> Sale Price* </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter Sales Price"
                                                    value={Product.SalePrice}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid">
                                                Select Tax Status*
                                            </label>
                                            <div className="form-control-wrap">
                                                <RSelect

                                                    value={TaxStatus}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid">
                                                Select GST*
                                            </label>
                                            <div className="form-control-wrap">
                                                <RSelect

                                                    value={SelectGST}
                                                    // readOnly
                                                    isDisabled={true}
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
                                                    // name="ProductLength"
                                                    // onChange={handleChangeProduct}
                                                    placeholder="Enter Length"
                                                    value={Product.ProductLength}
                                                    readOnly
                                                />

                                            </div>
                                            <div className="form-control-wrap" style={{ paddingRight: '20px', }}>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    // name="ProductBreadth"
                                                    placeholder="Enter Breadth"
                                                    // onChange={handleChangeProduct}
                                                    value={Product.ProductBreadth}
                                                    readOnly
                                                />

                                            </div>
                                            <div className="form-control-wrap" style={{ paddingRight: '20px', }}>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    // name="ProductHeight"
                                                    placeholder="Enter Height"
                                                    // onChange={handleChangeProduct}
                                                    value={Product.ProductHeight}
                                                    readOnly
                                                />

                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased">
                                                Product Weight (In Kgs)*
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter Product Weight"
                                                    // name="ProductWeight"
                                                    // onChange={handleChangeProduct}
                                                    value={Product.ProductWeight}
                                                    readOnly
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

                                                    value={LowStockNotification}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    {LowStockNotification.label === "Enable" &&
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="purchased"> Low Stock Message* </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        className="form-control"
                                                        placeholder="Low Stock Message"
                                                        // name="LowStockMessage"
                                                        // onChange={handleChangeProduct}
                                                        value={Product.LowStockMessage}
                                                        readOnly
                                                    />

                                                </div>
                                            </div>
                                        </Col>}

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> Pre-Order  </label>
                                            <div className="form-control-wrap">
                                                <RSelect

                                                    value={preOrderAction}
                                                    // readOnly
                                                    isDisabled={true}
                                                />

                                            </div>
                                        </div>
                                    </Col>
                                    {preOrderAction.label === "Enable" &&
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="purchased"> Pre-Order Stock* </label>
                                                <div className="form-control-wrap">
                                                    <input type="number" 
 onmousewheel="return false;" onWheelCapture={e => {
  e.target.blur()
}} className="form-control" placeholder="Pre-order Stock"

                                                        value={Product.PreOrderQuantity}
                                                        readOnly
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
                                                    // name="SoldIndividual"
                                                    // onChange={handleChangeProduct}
                                                    value={Product.SoldIndividual}
                                                    readOnly
                                                />

                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> Period Of Time </label>
                                            <div className="form-control-wrap">
                                                <input className="form-control" placeholder="Enter Period Of Time"
                                                    name="PeriodOfTime"
                                                    // onChange={handleChangeProduct} 
                                                    value={Product.PeriodOfTime}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>


                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid"> Product Review* </label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    // name="ProductReview"
                                                    // options={[
                                                    //     { value: "true", label: "Enable" },
                                                    //     { value: "false", label: "Disable" },
                                                    // ]}
                                                    // onChange={(event) => setProductReview(event)}
                                                    value={ProductReview}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid"> Expiry Rule* </label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    // name="ExpiryRule"
                                                    // options={[
                                                    //     { value: "true", label: "Enable" },
                                                    //     { value: "false", label: "Disable" },
                                                    // ]}
                                                    // onChange={(event) => setExpiryRule(event)}
                                                    value={ExpiryRule}
                                                    // readOnly
                                                    isDisabled={true}
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
                                                    // onChange={handleChangeProduct}
                                                    // name="PointsEarn"
                                                    value={Product.PointsEarn}
                                                    readOnly
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
                                                <input className="form-control" placeholder="Enter SKU 1"
                                                    // name="SKU1"
                                                    // onChange={handleChangeProduct}
                                                    value={Product.SKU1}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased">
                                                Supplier SKU 2*
                                            </label>
                                            <div className="form-control-wrap">
                                                <input className="form-control" placeholder="Enter Product SKU 2"
                                                    // name="SKU2"
                                                    // onChange={handleChangeProduct} 
                                                    value={Product.SKU2}
                                                    readOnly

                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased">
                                                Youtube Link
                                            </label>
                                            <div className="form-control-wrap">
                                                <input className="form-control" placeholder="Enter Product Youtube Link"
                                                    name="YoutubeLink"
                                                    // onChange={handleChangeProduct} 
                                                    value={Product.YoutubeLink}
                                                    readOnly
                                                />
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
                                                    // name=""
                                                    // options={[
                                                    //     { value: "true", label: "Yes" },
                                                    //     { value: "false", label: "No" },
                                                    // ]}
                                                    // onChange={(event) => setReturnable(event)}
                                                    value={returnable}
                                                    // readOnly
                                                    isDisabled={true}
                                                />

                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased">
                                                Return window (days)
                                            </label>
                                            <div className="form-control-wrap">
                                                <input className="form-control" placeholder="Return (days)"
                                                    // name="ReturnDays"
                                                    // onChange={handleChangeProduct} 
                                                    value={Product.ReturnDays}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased">
                                                Status
                                            </label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    // name=""
                                                    // options={[
                                                    //     { value: "true", label: "Active" },
                                                    //     { value: "false", label: "InActive" },
                                                    // ]}
                                                    // onChange={(event) => setStatus(event)}
                                                    value={status}
                                                    // readOnly
                                                    isDisabled={true}
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
                                                                    <Icon name="trash-empty-fill" />
                                                                </span>
                                                                <div>
                                                                    <img src={item} disabled alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            {file.length === 0 && (<>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <input type="file" readOnly id="file-upload" disabled className="form-control"
                                                        style={{
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
                                                        <div style={{ margin: "20px" }}>
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
                                                                    <Icon name="trash-empty-fill" />
                                                                </span>
                                                                <div>
                                                                    <img src={item} alt="" style={{ width: "100px", height: "100px", border: "5px solid #e5e9f2" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            <div className="d-flex justify-content-center align-items-center">
                                                <input type="file" id="file-upload" multiple required disabled
                                                    className="form-control" name="files"
                                                    style={{
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
                                        </Button></Col> :
                                        <Col size="12">
                                            <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("3"); }} >
                                                <span>NEXT</span>
                                            </Button>
                                            <Button color="primary" style={{ float: 'right' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("1"); }}>
                                                <span>PREV</span>
                                            </Button>
                                        </Col>}

                                </Row>
                            </TabPane>

                            <TabPane tabId="3">
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
                                                    // name="MainCategory"
                                                    // options={MainCate}
                                                    // onChange={MainCategorys}
                                                    value={MainCategory}
                                                    // readOnly
                                                    isDisabled={true}
                                                // isMulti={true}
                                                // fields={{ value: "value", text: "label" }}
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
                                                    // name="SubCategory"
                                                    // options={Subcate}
                                                    // onChange={SubCategorys}
                                                    value={SubCategory}
                                                    // readOnly
                                                    isDisabled={true}
                                                // isMulti={true}
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
                                                    // name="ChildCategory"
                                                    readOnly
                                                    // options={Childcate}
                                                    // onChange={(event) => setChildCategory(event)}
                                                    value={ChildCategory}
                                                    isDisabled={true}
                                                // isMulti={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>


                                    <Col size="12" >
                                        <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("4"); }}>
                                            <span>NEXT</span>
                                        </Button>
                                        <Button color="primary" style={{ float: 'right' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("2"); }}>
                                            <span>PREV</span>
                                        </Button>
                                    </Col>


                                </Row>
                            </TabPane>

                            <TabPane tabId="4">
                                <Row className="g-3">

                                    <Col md="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="customer"> <h5>  Brand </h5> </label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="paid"> Brand* </label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    // name="Brand"
                                                    // options={branddata}
                                                    // onChange={(event) => setBrand(event)}
                                                    value={Brand}
                                                    // readOnly
                                                    isDisabled={true}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col size="12">
                                        <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("5"); }}>
                                            <span>NEXT</span>
                                        </Button>
                                        <Button color="primary" style={{ float: 'right' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("3"); }}>
                                            <span>PREV</span>
                                        </Button>
                                    </Col>

                                </Row>
                            </TabPane>

                            <TabPane tabId="5">
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
                                                <input type="text" className="form-control"
                                                    // onChange={handleChangeProduct}
                                                    placeholder="Enter Meta Title"
                                                    // name="MetaTitle"
                                                    value={Product.MetaTitle}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="purchased"> Meta Slug* </label>
                                            <div className="form-control-wrap">
                                                <input type="text" className="form-control" placeholder="Enter Meta Slug"
                                                    name="MetaSlug"
                                                    // onChange={handleChangeProduct} 
                                                    readOnly
                                                    value={Product.MetaSlug}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col size="12">
                                        <FormGroup>
                                            <label className="form-label"> Meta Description* </label>
                                            <div className="text-editor" style={{ minHeight: '100px', }}>
                                                <ReactQuill
                                                    theme="snow"
                                                    // onChange={(event) => setMetaDescription(event)}
                                                    placeholder={"Write something awesome..."}
                                                    modules={modules}
                                                    formats={formats}
                                                    value={MetaDescription}
                                                    readOnly
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>

                                    <Col size="12">
                                        {AttributeTabs ?
                                            <>
                                                <Button color="primary" style={{ float: 'right', marginLeft: '10px' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("6"); }}>
                                                    <span>NEXT</span>
                                                </Button>
                                                <Button color="primary" style={{ float: 'right' }} onClick={(ev) => { ev.preventDefault(); toggleIconTab("4"); }}>
                                                    <span>PREV</span>
                                                </Button>
                                            </>
                                            : <Button color="primary" style={{ float: 'right' }} type="button" onClick={() => onFormSubmit(ID)}>
                                                <span>{!ID ? 'Save' : 'Update'} </span>
                                            </Button>}


                                    </Col>

                                </Row>
                            </TabPane>

                            <TabPane tabId="6"  >
                                <div className="p-2" style={{ backgroundColor: 'white', margin: '10px 20px' }}>
                                    <Row className="g-3">
                                        {/* <Col md="12">
                                            <div style={{ marginTop: "15px", display: "flex", justifyContent: "end" }}>
                                                
                                                <a href="#" disabled={toggleBtn}
                                                // onClick={handleAddFields}
                                                >
                                                    <span style={{ marginTop: "26%", background: '#FC8181', color: "white", padding: "10px", borderRadius: "4px" }}>Add Variant</span>
                                                </a>
                                            </div>
                                        </Col> */}

                                        <>
                                            {inputFields.map((inputField, index) => (

                                                <Col size="12"  >

                                                    <div style={{ border: "1px solid rgba(0, 0, 0, 0.2)", padding: "30px", borderRadius: "5px" }}>

                                                        <Row style={{ border: "1px solid red", marginTop: "30px", backgroundColor: "red" }} >

                                                            <Col lg={4} >
                                                                <div>
                                                                    <p>Attribute Type :</p>
                                                                    <RSelect
                                                                        name="Attribute_name"
                                                                        // options={Attdata}
                                                                        // onChange={option => AttibuteOnchages(option, index, "label")}
                                                                        value={inputField}
                                                                        // readOnly
                                                                        isDisabled={true}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <div className="form-control-wrap">
                                                                    <p>Attribute Value :</p>
                                                                    <RSelect

                                                                        value={inputField.AttributeValue}
                                                                        // readOnly
                                                                        isDisabled={true}
                                                                    // isMulti={true}
                                                                    />
                                                                </div>
                                                            </Col>

                                                            <Col lg={2}>

                                                                <Button color="primary" type="" style={{ marginTop: "39px" }} disabled>
                                                                    Remove
                                                                </Button>
                                                            </Col>
                                                        </Row>

                                                    </div>
                                                    <br></br>

                                                </Col>

                                            ))}
                                        </>
                                        {/* <Col size="12">
                                            <Button color="primary" style={{ float: 'right' }} type="button" onClick={() => onFormSubmit(ID)}>
                                                <span>{!ID ? 'Save' : 'Update'} </span>
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </div>

                            </TabPane>

                            <TabPane tabId="7">

                                <MuiThemeProvider theme={Tabletheme()}>
                                    <MaterialTable
                                        icons={tableIcons}
                                        columns={columns}
                                        data={datassget}
                                        title="Current Offers"
                                        options={options}
                                        actions={[
                                            {
                                                icon: 'delete',
                                                tooltip: 'Delete All Rows',
                                                //   onClick: (event, rowData) => {
                                                //     // Do save operation
                                                //     alert("delete button clicked");
                                                //   }
                                            }
                                        ]}
                                    />
                                </MuiThemeProvider>
                            </TabPane>

                        </TabContent>


                    </PreviewCard>
                </Block >
            </Content >

        </React.Fragment >
    );
};
export default ProductListView;