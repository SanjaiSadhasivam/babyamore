import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
    Icon,
    Row,
    RSelect,
    Col,
} from "../../../components/Component";
import { Link } from "react-router-dom";
import {
    Button,
    Modal,
    ModalBody,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { API_Vendor, API_Product, API_Warehouse, API_Vendor_Brand, API_Brand, API_Category, API_Discount, API_SubCategory, API_ChildCategory, token } from "../../../Api";
import { useLocation } from "react-router-dom";



const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    },
};
const AddDiscount = () => {
    const { handleSubmit } = useForm();
    const [MainCate, SetMainCate] = useState([]);
    const [branddata, Setbranddata] = useState([]);
    const [vendordata, SetVendordata] = useState([]);
    const [warehouseData, SetWarehouseData] = useState([]);
    const [ProductType, setProductType] = useState();
    const [ProductData, SetProductData] = useState([]);
    const [Product, setProduct] = useState('');
    const [Brand, setBrand] = useState('');
    const [Vendor, setVendor] = useState('');
    const [Vendored, setVendored] = useState('');
    const [prod, setProd] = useState('');
    const [Warehouse, setWarehouse] = useState('');
    const [Subcate, setSubcate] = useState([]);
    const [Childcate, setChildcate] = useState([]);
    const [MainCategory, setMainCategory] = useState('');
    const [SubCategory, setSubCategory] = useState('');
    const [ChildCategory, setChildCategory] = useState('');
    const [modalFail, setModalFail] = useState(false);

    const toggleModalFail = () => {
        clearState();
        setModalFail(!modalFail);

    };
    const location = useLocation();

    //Success Model

    const clearState = () => {
        setDiscount({
            rule_id: '',
            rule_name: '',
            rule_type: '',
            from_date: '',
            end_date: '',
            vendor_discount: '',
            babyamore_discount: '',
            total_discount: '',
            categoryid: '',
            subcategoryid: '',
            childcategoryid: '',
            brandid: '',
            vendorid: '',
            warehouseid: '',
            productid: '',
            attributeid: ''
        });
        setMainCategory('');
        setChildCategory('');
        setSubCategory('');
        setBrand('');
        setVendor('');
        setWarehouse('');
        setProduct('');
    }
    const [discount, setDiscount] = useState({
        rule_id: '',
        rule_name: '',
        rule_type: '',
        from_date: '',
        end_date: '',
        vendor_discount: '',
        babyamore_discount: '',
        total_discount: '',
        categoryid: '',
        subcategoryid: '',
        childcategoryid: '',
        brandid: '',
        vendorid: '',
        warehouseid: '',
        productid: '',
        attributeid: ''
    })
    const [Producttype, setproductType] = useState({
        category: false,
        brand: false,
        vendor: false,
        productId: false,
        warehouse: false,
        category_brand: false,
        category_vendor: false,
        brand_warehouse: false,
        vendor_Product: false,
        productId_warehouse: false,
        vendor_brand: false,
    })

    //Get main category

    const GetMainCate = async () => {
        const { data } = await axios.get(API_Category, config)
        const Res = data.list.map(itemsMain => {
            const datss = {
                value: itemsMain.id,
                label: itemsMain.category_name
            }
            return datss
        })
        SetMainCate(Res);
    }

    //Get Brand

    // const GetBrand = async () => {
    //     const { data } = await axios.get(`${API_Brand}`, config)
    //     const Res = data.list.map(itemsMain => {
    //         const datss = {
    //             value: itemsMain.id,
    //             label: itemsMain.name
    //         }
    //         return datss
    //     })
    //     Setbranddata(Res)
    // }



    // Get Vendor
    const GetVendor = async () => {
        const { data } = await axios.get(`${API_Vendor}`, config)
        const Res = data.list.map(itemsMain => {
            const datss = {
                value: itemsMain.vendor_id,
                label: itemsMain.company_name
            }
            return datss
        })
        SetVendordata(Res)
    };


    //Get Warehouse


    const GetWarehouse = async () => {
        const { data } = await axios.get(`${API_Warehouse}`, config)
        const Res = data.list.map(itemsMain => {
            const datss = {
                value: itemsMain.warehouseid,
                label: itemsMain.warehouse_name
            }
            return datss
        })
        SetWarehouseData(Res)
    }

    //Get Products
    // const GetProducts = async () => {
    //     const { data } = await axios.get(`${API_Product}`, config)

    //     const Res = data.list.map(itemsMain => {
    //         const datss = {
    //             value: itemsMain.Productlist_id,
    //             label: itemsMain.ProductName
    //         }
    //         return datss
    //     })
    //     SetProductData(Res)
    // }

    //Match Categories

    const MainCategorys = async (event) => {
        setMainCategory(event)
        setSubCategory([]);
        setSubcate([]);
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

    // Subcategory Match

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

    // on change Toggle

    const [ruleType, setRuleType] = useState([])
    const ProductTypehandlechange = (item) => {

        setProductType(item)

        const value = item.value;
        if (value === "Category") {
            setproductType({
                category: true,
            })
        } else if (value === "Brand") {
            setproductType({
                brand: true,
            })
        }
        else if (value === "Vendor") {
            setproductType({
                vendor: true,
            })
        }
        else if (value === "Warehouse") {
            setproductType({
                warehouse: true,
            })
        }
        else if (value === "productID") {
            setproductType({
                productId: true,
            })
        }
        else if (value === "Category_Brand") {
            setproductType({
                category_brand: true,
            })
        }
        else if (value === "Category_Vendor") {
            setproductType({
                category_vendor: true,
            })
        }
        else if (value === "Brand_Warehouse") {
            setproductType({
                brand_warehouse: true,
            })
        }
        else if (value === "Vendor_Warehouse") {
            setproductType({
                vendor_warehouse: true,
            })
        }
        else if (value === "vendor_Product") {
            setproductType({
                vendor_Product: true,
            })
        }
        else if (value === "Vendor_Brand") {
            setproductType({
                vendor_brand: true,
            })
        }
        else {

        }
    }


    //match vendor warehouse
    const [SelectWarehouse, setSelectWarehouse] = useState('');
    const [SelectVendor, setSelectVendor] = useState('');

    const GetVendors = async () => {
        const { data } = await axios.get(`${API_Vendor}`, config)
        data.list.map(itemsvendor => {
            const dataas = {
                value: itemsvendor.vendorid,
                label: itemsvendor.company_name
            }
            setVendored((items) => [...items, dataas]);
        })
    }

    // Vendor onchange

    const [subware, setSubware] = useState([]);

    const vendorBrandChange = async (dataas) => {
        setVendor(dataas)
        setBrand([])
        Setbranddata([])
        const brand = await axios.get(`${API_Vendor_Brand}/${dataas.value}`, config)
        const rest = brand.data.list.map((brandItem) => {
            const brandData = {
                value: brandItem.id,
                label: brandItem.name
            }
            return brandData
        })
        Setbranddata((dataas) => [...dataas, ...rest]);
    };
    const [Attribute, setAttribute] = useState([])
    const [Attr, setAttr] = useState([])

    console.log();
    const ProductChange = async (dataas) => {
        setProduct(dataas)
        setAttribute([])
        // setAttr([])
        const { data } = await axios.get(`${API_Product}/getproductvarietydata/${dataas.value}`, config)
        const rest = data.list.map((Items) => {
            console.log(Items, "Items");
            const prod = {
                value: Items.productlist_id,
                label: Items.productlist_id + "-" + Items.productname,
            }
            return prod
        })
        setAttribute(rest);
        console.log(rest, "rest");
    };

    // let varOptions = Attribute.map((item) => item.lable) 
    // console.log(varOptions, "Attribute");
    const vendorProductChange = async (dataas) => {
        setVendor(dataas)
        setProd([])
        SetProductData([])
        const data = await axios.get(`${API_Product}`, config)
        let val = data.data.list.filter((currEle) => currEle.Vendor_id == dataas.value)
        const res = val.map((itemsvendor) => {
            const waredata = {
                value: itemsvendor.Productlist_id,
                label: itemsvendor.Productlist_id + "-" + itemsvendor.ProductName
            }
            return waredata
        })
        SetProductData(res);
    };



    //match product warehouse
    const [SelectprodWarehouse, setSelectprodWarehouse] = useState('');
    const [SelectProd, setSelectProd] = useState('');

    // const GetProdSelect = async () => {
    //     const { data } = await axios.get(`${API_Product}`, config)
    //     data.list.map(itemsvendor => {
    //         const dataas = {
    //             value: itemsvendor.Productlist_id,
    //             label: itemsvendor.ProductName
    //         }
    //         setProd((items) => [...items, dataas]);
    //     })
    // }
    const [subprod, setSubprod] = useState([]);
    const ProdChange = async (dataas) => {
        setSelectProd(dataas);
        setSelectprodWarehouse([]);
        setSubprod([])
        const warehouse = await axios.get(`${API_Warehouse}/${dataas.value}`, config)
        const res = warehouse.data.list.map((wareitem) => {
            const waredata = {
                value: wareitem.warehouseid,
                label: wareitem.warehouse_name,
            }
            return waredata
        })
        setSubprod((dataas) => [...dataas, ...res]);
    };

    // Input Onchange

    const handleChangeDiscount = ({ target: { name, value } }) => {
        setDiscount({ ...discount, [name]: value });
    };

    //Discount Data get
    const [discountData, setDiscountData] = useState([])
    const [ruleID, setRuleID] = useState('RID-0001')
    const getTerms = async () => {
        const Result = await axios.get(`${API_Discount}`, config)
        setDiscountData(Result.data.list);

        var MRNID;
        if (Result.data != '') {
            var n = Result.data.list.length;
            var lastemp_code = Result.data.list[n - 1].rule_id;
            var split = lastemp_code.split("-");
            var FinalNo = Number(split[1]) + 1
            var E_code = "RID-000" + FinalNo
            MRNID = E_code;
        }
        else {
            MRNID = " MRN-001 "
        }
        setRuleID(MRNID)

    }

    let addition1 = discount.vendor_discount;
    let addition2 = discount.babyamore_discount;
    let addition = parseInt(addition1) + parseInt(addition2)



    //POST METHOD
    const [ID, setID] = useState("");

    const [ResMsg, setResMsg] = useState();

    const Create = async () => {
        let formData = new FormData()
        formData.append('rule_id', ruleID)
        formData.append('rule_name', discount.rule_name)
        formData.append('rule_type', Producttype.vendor_brand ? 1 : 2)
        formData.append('from_date', discount.from_date)
        formData.append('end_date', discount.end_date)
        formData.append('vendor_discount', discount.vendor_discount)
        formData.append('babyamore_discount', discount.babyamore_discount)
        formData.append('total_discount', addition)
        // formData.append('categoryid', JSON.stringify(MainCategory))
        // formData.append('subcategoryid', JSON.stringify(SubCategory))
        // formData.append('childcategoryid', JSON.stringify(ChildCategory))
        formData.append('productid', Product.value)
        formData.append('attributeid', JSON.stringify(Attr))
        formData.append('brandid', JSON.stringify(Brand))
        formData.append('vendorid', Vendor.value)
        // formData.append('warehouseid', JSON.stringify(Warehouse))
        axios.post(API_Discount, formData, config).then((res) => {
            setResMsg(res.data.msg, 'resss');
        });
        // window.location.reload(true);
        setModalFail(true);
    }


    //UPDATE METHOD


    const EditGetdata = async () => {
        if (location.state) {
            setID(location.state);
            const Result = await axios.get(`${API_Discount}/${location.state}`, config);
            setDiscount({
                ...discount,
                rule_id: Result.data.list[0].rule_id,
                rule_name: Result.data.list[0].rule_name,
                from_date: Result.data.list[0].from_date,
                end_date: Result.data.list[0].end_date,
                vendor_discount: Result.data.list[0].vendor_discount,
                babyamore_discount: Result.data.list[0].babyamore_discount,
                total_discount: Result.data.list[0].total_discount,
            })

            setProductType({ value: Result.data.list[0].rule_type, label: Result.data.list[0].rule_type })

            if (Result.data.list[0].brand_id.length != 0) {
                Result.data.list[0].brand_id.map((branditem) => {
                    const datas = {
                        label: branditem.label,
                        value: branditem.value
                    }

                    setBrand((indexss) => [...indexss, datas])

                })
            }
            if (Result.data.list[0].vendor_id.length != 0) {
                Result.data.list[0].vendor_id.map((vendoritem) => {
                    const datas = {
                        label: vendoritem.label,
                        value: vendoritem.value
                    }

                    setVendor((indexss) => [...indexss, datas])

                })
            }
            if (Result.data.list[0].product_id.length != 0) {
                Result.data.list[0].product_id.map((productitem) => {
                    const datas = {
                        label: productitem.label,
                        value: productitem.value
                    }

                    setProduct((indexss) => [...indexss, datas])
                })
            }
            if (Result.data.list[0].warehouse_id.length != 0) {
                Result.data.list[0].warehouse_id.map((warehouseitem) => {
                    const datas = {
                        label: warehouseitem.label,
                        value: warehouseitem.value
                    }

                    setWarehouse((indexss) => [...indexss, datas])
                })
            }
            if (Result.data.list[0].childcategory_id.length != 0) {
                Result.data.list[0].childcategory_id.map((childcategoryitem) => {
                    const datas = {
                        label: childcategoryitem.label,
                        value: childcategoryitem.value
                    }

                    setChildCategory((indexss) => [...indexss, datas])
                })
            }
            if (Result.data.list[0].subcategory_id.length != 0) {
                Result.data.list[0].subcategory_id.map((subcategoryitem) => {
                    const datas = {
                        label: subcategoryitem.label,
                        value: subcategoryitem.value
                    }

                    setSubCategory((indexss) => [...indexss, datas])
                })
            }
            if (Result.data.list[0].category_id.length != 0) {
                Result.data.list[0].category_id.map((categoryitem) => {
                    const datas = {
                        label: categoryitem.label,
                        value: categoryitem.value
                    }

                    setMainCategory((indexss) => [...indexss, datas])
                })
            }

            const value = Result.data.list[0].rule_type;
            if (value === "Category") {
                setproductType({
                    category: true,
                })
            } else if (value === "Brand") {
                setproductType({
                    brand: true,
                })
            }
            else if (value === "Vendor") {
                setproductType({
                    vendor: true,
                })
            }
            else if (value === "Warehouse") {
                setproductType({
                    warehouse: true,
                })
            }
            else if (value === "productID") {
                setproductType({
                    productId: true,
                })
            }
            else if (value === "Category_Brand") {
                setproductType({
                    category_brand: true,
                })
            }
            else if (value === "Category_Vendor") {
                setproductType({
                    category_vendor: true,
                })
            }
            else if (value === "Brand_Warehouse") {
                setproductType({
                    brand_warehouse: true,
                })
            }
            else if (value === "Vendor_Warehouse") {
                setproductType({
                    vendor_warehouse: true,
                })
            }
            else if (value === "vendor_Product") {
                setproductType({
                    vendor_Product: true,
                })
            }
            else if (value === "Vendor_Brand") {
                setproductType({
                    vendor_brand: true,
                })
            }
        }
    }

    const EditDiscount = async (ID) => {


        let formData = new FormData()
        formData.append('rule_id', ruleID)
        formData.append('rule_name', discount.rule_name)
        formData.append('rule_type', ProductType.value)
        formData.append('from_date', discount.from_date)
        formData.append('end_date', discount.end_date)
        formData.append('vendor_discount', discount.vendor_discount)
        formData.append('babyamore_discount', discount.babyamore_discount)
        formData.append('total_discount', addition)
        formData.append('categoryid', JSON.stringify(MainCategory))
        formData.append('subcategoryid', JSON.stringify(SubCategory))
        formData.append('childcategoryid', JSON.stringify(ChildCategory))
        formData.append('productid', Product.value)
        formData.append('attributeid', JSON.stringify(Attr))
        formData.append('brandid', JSON.stringify(Brand))
        formData.append('vendorid', JSON.stringify(Vendor))
        formData.append('warehouseid', JSON.stringify(Warehouse))

        await axios.put(`${API_Discount}/${ID}`, formData, config).then((res) => {
            setResMsg(res.data.msg, 'resss');
            clearState();
            setModalFail(true);
        });
    }
    //USEEFFECT

    useEffect(() => {
        // GetBrand();
        GetMainCate();
        GetVendor();
        GetWarehouse();
        // GetProducts();
        GetVendors();

        // GetProdSelect();
        getTerms();
        EditGetdata()
    }, []);

    //Handle Submit

    const onFormSubmit = (event) => {
        if (!ID) {
            Create();
        } else {
            EditDiscount(ID);
        }
        // event.target.reset();
        // event.preventDefault();
    }



    return (
        <div className="p-2" style={{ marginTop: '80px' }}>
            <h5 className="title">Discount</h5>
            <div className="mt-4">
                <form style={{ background: 'white', padding: '20px' }} onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className="mb-4">
                        <Col md="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Rule ID
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        value={ID ? discount.rule_id : ruleID}
                                        className="form-control"
                                        placeholder="Enter Rule ID"
                                        onChange={handleChangeDiscount}
                                        name="rule_id"
                                        disabled
                                    />

                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Rule Name
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Rule Name"
                                        onChange={handleChangeDiscount}
                                        value={discount.rule_name}
                                        name="rule_name"
                                    // disabled
                                    />

                                </div>
                            </div>
                        </Col>
                        {/* <Col md="3">
                            <div className="form-group">
                                <label className="form-label" htmlFor="purchased">
                                    From Date
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Enter From Date"
                                        onChange={handleChangeDiscount}
                                        name="from_date"
                                        value={discount.from_date}
                                   
                                    />
                                   

                                </div>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="form-group">
                                <label className="form-label" htmlFor="purchased">
                                    End Date
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Enter From Date"
                                        value={discount.end_date}
                                        onChange={handleChangeDiscount}
                                        name="end_date"
                                   
                                    />

                                </div>
                            </div>
                        </Col> */}
                        <Col md="4">

                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Rule Type
                                </label>
                                <div className="form-control-wrap">
                                    <RSelect
                                        name="Product"
                                        onChange={ProductTypehandlechange}
                                        options={[
                                            // { value: "Category", label: "Category" },
                                            // { value: "Brand", label: "Brand" },
                                            // { value: "Vendor", label: "Vendor" },
                                            // { value: "Warehouse", label: "Warehouse" },
                                            // { value: "productID", label: "Product ID" },
                                            // { value: "Category_Brand", label: "Category & Brand" },
                                            // { value: "Category_Vendor", label: "Category & Vendor" },
                                            // { value: "Brand_Warehouse", label: "Brand & Warehouse" },
                                            { value: "vendor_Product", label: "Vendor & ProductID" },
                                            // { value: "productID_Warehouse", label: "Product ID & Warehouse" },
                                            { value: "Vendor_Brand", label: "Vendor & Brand" },
                                        ]}
                                        value={ProductType}
                                    />
                                </div>
                            </div>

                        </Col>
                    </Row>


                    {
                        Producttype.category ?
                            <>
                                <div>
                                    <Row className="mb-4">
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    MainCategory
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="categoryid"
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
                                                    SubCategory
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="subcategoryid"
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
                                                    ChildCategory
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="childcategoryid"
                                                        options={Childcate}
                                                        onChange={(event) => setChildCategory(event)}
                                                        value={ChildCategory}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3 mb-4">
                                        {/* <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="Product"
                                                        // onChange={ProductTypehandlechange}
                                                        options={[
                                                            { value: "Vendor1", label: "Vendor 1" },
                                                            { value: "Vendor2", label: "Vendor 2" },
                                                        ]}
                                                        isMulti={true}
                                                    // value={ProductType}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                        {/* <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder="Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}

                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        disabled={true}
                                                        value={addition}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        Producttype.brand ?
                            <>
                                <div>

                                    <Row className="mb-4">
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Brand
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="brandid"
                                                        options={branddata}
                                                        onChange={(event) => setBrand(event)}
                                                        value={Brand}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                        {/* <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}

                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }
                    {
                        Producttype.vendor ?

                            <>
                                <div>
                                    <Row className="mb-4">
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="vendorid"
                                                        options={vendordata}
                                                        onChange={(event) => setVendor(event)}
                                                        value={Vendor}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>


                                    <Row className="mt-3">
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }
                    {
                        Producttype.warehouse ?

                            <>
                                <div>
                                    <Row className="mb-4">
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    WareHouses
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="warehouseid"
                                                        options={warehouseData}
                                                        onChange={(event) => setWarehouse(event)}
                                                        value={Warehouse}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        {/* <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>


                                    <Row className="mt-3">
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }


                    {
                        Producttype.productId ?
                            <>
                                <div>
                                    <Row className="mb-4">
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Product ID
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="productid"
                                                        options={ProductData}
                                                        onChange={(event) => setProduct(event)}
                                                        value={Product}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        {/* <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>


                                    <Row className="mt-3">
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        Producttype.category_brand ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    MainCategory
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="categoryid"
                                                        options={MainCate}
                                                        onChange={MainCategorys}
                                                        value={MainCategory}
                                                        isMulti={true}
                                                        fields={{ value: "value", text: "label" }}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    SubCategory
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
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    ChildCategory
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="childcategoryid"
                                                        options={Childcate}
                                                        onChange={(event) => setChildCategory(event)}
                                                        value={ChildCategory}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Brands
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="brandid"
                                                        options={branddata}
                                                        onChange={(event) => setBrand(event)}
                                                        value={Brand}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3 mb-4">
                                        {/* <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        Producttype.category_vendor ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    MainCategory
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="categoryid"
                                                        options={MainCate}
                                                        onChange={MainCategorys}
                                                        value={MainCategory}
                                                        isMulti={true}
                                                        fields={{ value: "value", text: "label" }}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    SubCategory
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
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    ChildCategory
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="childcategoryid"
                                                        options={Childcate}
                                                        onChange={(event) => setChildCategory(event)}
                                                        value={ChildCategory}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendors
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="vendorid"
                                                        options={vendordata}
                                                        onChange={(event) => setVendor(event)}
                                                        value={Vendor}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className="mt-3 mb-4">
                                        {/* <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        Producttype.brand_warehouse ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Brand
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="brandid"
                                                        options={branddata}
                                                        onChange={(event) => setBrand(event)}
                                                        value={Brand}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Warehouse
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="warehouseid"
                                                        options={warehouseData}
                                                        onChange={(event) => setWarehouse(event)}
                                                        value={Warehouse}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className="mt-3 mb-4">
                                        {/* <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        Producttype.vendor_warehouse ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="vendorid"
                                                        options={Vendored}
                                                        onChange={vendorChange}
                                                        isMulti={true}
                                                        value={SelectVendor}
                                                        fields={{ value: "value", text: "label" }}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Warehouses
                                                </label>
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

                                    </Row>
                                    <Row className="mt-3 mb-4">
                                        {/* <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }
                    {
                        Producttype.vendor_Product ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Vendor
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="vendorid"
                                                        options={vendordata}
                                                        onChange={vendorProductChange}
                                                        value={Vendor}
                                                        fields={{ value: "value", text: "label" }}
                                                    // isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Product
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="productid"
                                                        options={ProductData}
                                                        onChange={ProductChange}
                                                        value={Product}
                                                        fields={{ value: "value", text: "label" }}

                                                    // isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Variation
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="attributeid"
                                                        options={Attribute}
                                                        onChange={(event) => setAttr(event)}
                                                        value={Attr}
                                                        isMulti={true}
                                                        fields={{ value: "value", text: "label" }}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className="mt-3 mb-4">
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }
                    {
                        Producttype.vendor_brand ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Vendor
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="vendorid"
                                                        options={vendordata}
                                                        onChange={vendorBrandChange}
                                                        value={Vendor}
                                                        fields={{ value: "value", text: "label" }}
                                                    // isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Brand
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="brandid"
                                                        options={branddata}
                                                        onChange={(event) => setBrand(event)}
                                                        value={Brand}
                                                        isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className="mt-3 mb-4">
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Vendor Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        placeholder=" Vendor Discount"
                                                        onChange={handleChangeDiscount}
                                                        name="vendor_discount"
                                                        value={discount.vendor_discount}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Baby Amore Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        onChange={handleChangeDiscount}
                                                        className="form-control"
                                                        placeholder=" Baby Amore Discount"
                                                        name="babyamore_discount"
                                                        value={discount.babyamore_discount}
                                                    // onChange={handleChangeProduct}
                                                    // onChange={handleChangeProduct}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Total Discount
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="number" onmousewheel="return false;" onWheelCapture={e => {
                                                            e.target.blur()
                                                        }}

                                                        className="form-control"
                                                        onChange={handleChangeDiscount}
                                                        placeholder="Total Discount"
                                                        name="total_discount"
                                                        value={addition}

                                                    // value={Product.ProductExpiryDate}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button color="primary" type="submit">
                                                <span>SAVE</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                            :
                            <></>
                    }
                    <Modal isOpen={modalFail} toggle={toggleModalFail}>
                        <ModalBody className="modal-body-lg text-center">
                            <div className="nk-modal">
                                <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"></Icon>
                                <h4 className="nk-modal-title">{ResMsg}</h4>
                                <div className="nk-modal-action mt-5">
                                    <Link to='/dashboard/discount'>
                                        <Button color="light" size="lg" className="btn-mw mr-3" onClick={toggleModalFail}>
                                            Done
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>

                </form>

            </div>
        </div>
    );
};

export default AddDiscount;
