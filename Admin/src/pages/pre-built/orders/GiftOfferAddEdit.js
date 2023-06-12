import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Icon, Row, Col, RSelect } from "../../../components/Component";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { API_URL, API_Product, API_Brand, API_Gift, API_Category, token } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
    Button,
    Modal,
    ModalBody,
} from "reactstrap";
const API_CATEGORY_PRODUCT = `${API_URL}/admin/category/getmaindata`
const API_BRAND_PRODUCT = `${API_URL}/admin/Brand/getBrandProductData`
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const GiftOfferAddEdit = () => {
    const [cateProduct,setCateProduct] = useState([]);
    const [brandProduct,setBrandProduct] = useState([]);
    const [Gift, setGift] = useState({
        gift_id: '',
        gift_name: '',
        gift_type: '',
        numberof_gifts: '',
        valid_from: '',
        valid_to: '',
        buy_brand: '',
        buy_category: '',
        buy_product: '',
        gift_product: '',
        gifts_to_cart: '',
        order_value: '',
        buy_one: '',
        get_one: '',
    })
    const [GIftoffer, setGiftoffer] = useState({
        count: false,
        product: false,
        category: false,
        brand: false,
        order: false,

    })
    const [Gifttype, setGifttype] = useState("");
    const location = useLocation();


    
    const ProductTypehandlechange = (event) => {
        setPrroduct("");
        setCateVal("");
        setIsBrand("");
        const value = event.value;
        setGifttype(event)
        if (value === "Count") {
            setGiftoffer({
                count: true,
            })
        } else if (value === "Product") {
            setGiftoffer({
                product: true,
            })
        }
        else if (value === "Category") {
            setGiftoffer({
                category: true,
            })
        }
        else if (value === "Brand") {
            setGiftoffer({
                brand: true,
            })
        }
        else if (value === "Order") {
            setGiftoffer({
                order: true,
            })
        }
        else {
        }
    }
    const [modalFail, setModalFail] = useState(false);

    const toggleModalFail = () => {
        // clearState();
        setModalFail(!modalFail);

    };
    const { errors, register, handleSubmit } = useForm();
    useEffect(() => {
        GetProducts();
        GetMainCate();
        GetBrand();
        EditGetdata();
    }, []);
    const [datingTab, setdatingTab] = useState()
    const [datingFromTab, setdatingFromTab] = useState()
    const handleChange = ({ target: { name, value } }) => {
        setGift({ ...Gift, [name]: value });
    };
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked22, setIsChecked22] = useState(false);
    const [isChecked3, setIsChecked3] = useState(0);

    const handleOnChange3 = (event) => {
        setIsChecked3(event.target.checked == true ? 1 : 0);
    };
    const dateChanged = (e) => {
        const value = e.target.value
        setdatingTab(value)
    }
    const dateChangedFrom = (e) => {
        const value = e.target.value
        setdatingFromTab(value)
    }
    const [ProductData, SetProductData] = useState([]);
    const GetProducts = async () => {
        const { data } = await axios.get(`${API_Product}`, config)
        const res = data.list.map((pro) => {
            const datas = {
                value: pro.Productlist_id,
                label: pro.ProductName,
            };
            SetProductData((items) => [...items, datas]);
        });
        return res
    }
    const [mainCate, setMainCate] = useState([])

    const GetMainCate = async () => {
        const { data } = await axios.get(API_Category, config)
        const Res = data.list.map(itemsMain => {
            const datss = {
                value: itemsMain.id,
                label: itemsMain.category_name
            }
            return datss
        })
        setMainCate(Res.map((item) => item));
    }
    const [brandData, setBrandData] = useState()
    const GetBrand = async () => {
        const { data } = await axios.get(`${API_Brand}`, config)
        const Res = data.list.map(itemsMain => {
            const datss = {
                value: itemsMain.id,
                label: itemsMain.name
            }
            return datss
        })
        setBrandData(Res)
    }
    const [IsBrand, setIsBrand] = useState('');
    const handleReadBrand = async(e) => {
        const value = e
        const datas = [{ value: Number(e.value) }];
        let formData = new FormData();
        formData.append("Brandid", JSON.stringify(datas));
       
        setIsBrand(value)
        const { data } = await axios.post(`${API_BRAND_PRODUCT}`,formData, config)
        const Res = data.list.map(itemsMain => {
            const datss = {
                value: itemsMain.Productlist_id,
                label: itemsMain.ProductName
            }
            return datss
        })
        setBrandProduct(Res)

    }
    const [Product, setPrroduct] = useState('');
    const handleReadProduct = (e) => {
        const value = e
        setPrroduct(value);
    }
    const [GiftProduct, setGiftPrroduct] = useState('');
    const handleReadGiftProduct = (e) => {
        const value = e
        setGiftPrroduct(value);
    }
    const [cateVal, setCateVal] = useState('')
    const handleReadCategory = async(e) => {
        setCateVal(e);
        let {data} = await axios.get(`${API_CATEGORY_PRODUCT}/${e.value}`,config);
        const rest = data.list.map((pro) => {
            const datas = {
                value: pro.Productlist_id,
                label: pro.ProductName,
            };

            return datas;
        });
        setCateProduct(rest);
        // return rest
    }

    const onFormSubmit = (event) => {
        if (!ID) {
            Create();
        } else {
            EditDiscount(ID);
        }
        // event.target.reset();
        // event.preventDefault();
    }
    const [ID, setID] = useState("");

    const [ResMsg, setResMsg] = useState();

    const Create = async () => {
        let formData = new FormData()
        formData.append('gift_id', Gift.gift_id)
        formData.append('gift_name', Gift.gift_name)
        formData.append('gift_type', Gifttype.value)
        formData.append('numberof_gifts', Gift.numberof_gifts)
        formData.append('valid_from', datingFromTab)
        formData.append('valid_to', datingTab)
        formData.append('buy_brand', IsBrand.value ? IsBrand.value : "")
        formData.append('buy_category', cateVal.value ? cateVal.value : "")
        formData.append('buy_product', Product.value)
        formData.append('gift_product', GiftProduct.value ? GiftProduct.value : "")
        formData.append('gifts_to_cart', isChecked3)
        formData.append('order_value', Gift.order_value ? Gift.order_value : "")
        formData.append('buy_one', Gift.buy_one ? Gift.buy_one : "")
        formData.append('get_one', Gift.get_one ? Gift.get_one : "")
        axios.post(API_Gift, formData, config).then((res) => {
            setResMsg(res.data.msg, 'resss');
        });
        // window.location.reload(true);
        setModalFail(true);
    }


    //UPDATE METHOD


    const EditGetdata = async () => {
        if (location.state) {
            setID(location.state);
            const Result = await axios.get(`${API_Gift}/${location.state}`, {
                headers: { Authorization: `Bearer ${token} ` },
            });

            if (Result.data.list[0].buy_product != 0 && Result.data.list[0].buy_product != "") {
                var ProductList = await axios.get(`${API_Product}/${Result.data.list[0].buy_product}`, { headers: { Authorization: `Bearer ${token} ` } })
                setPrroduct({ value: ProductList.data.list[0].Productlist_id, label: ProductList.data.list[0].ProductName })
            }
            if (Result.data.list[0].gift_product != 0 && Result.data.list[0].gift_product != "") {
                var ProductList = await axios.get(`${API_Product}/${Result.data.list[0].gift_product}`, { headers: { Authorization: `Bearer ${token} ` } })
                setGiftPrroduct({ value: ProductList.data.list[0].Productlist_id, label: ProductList.data.list[0].ProductName })
            }
            if (Result.data.list[0].buy_category != 0 && Result.data.list[0].buy_category != "") {
                var ProductList = await axios.get(`${API_Category}/${Result.data.list[0].buy_category}`, { headers: { Authorization: `Bearer ${token} ` } })
                setCateVal({ value: ProductList.data.list[0].id, label: ProductList.data.list[0].category_name })
            }
            if (Result.data.list[0].buy_brand != 0 && Result.data.list[0].buy_brand != "") {
                var ProductList = await axios.get(`${API_Brand}/${Result.data.list[0].buy_brand}`, { headers: { Authorization: `Bearer ${token} ` } })
                setIsBrand({ value: ProductList.data.list[0].id, label: ProductList.data.list[0].name })
            }
            setGift({
                ...Gift,
                gift_id: Result.data.list[0].gift_id,
                gift_name: Result.data.list[0].gift_name,
                // gift_type: Result.data.list[0].gift_type,
                orderid: Result.data.list[0].orderid,
                gifts_to_cart: Result.data.list[0].gifts_to_cart,
                numberof_gifts: Result.data.list[0].numberof_gifts,
                order_value: Result.data.list[0].order_value,
                buy_one: Result.data.list[0].buy_one,
                get_one: Result.data.list[0].get_one,
            });
            setGifttype({ value: Result.data.list[0].gift_type, label: Result.data.list[0].gift_type })
            const dateing = Result.data.list[0].valid_to
            const dateingFrom = Result.data.list[0].valid_from
            const values=Result.data.list[0].gift_type
            setdatingTab(dateing.slice(0, 10));
            setdatingFromTab(dateingFrom.slice(0, 10));
            setIsChecked3(Result.data.list[0].gifts_to_cart == 0 ? 0 : 1);
            if (values === "Count") {
                setGiftoffer({
                    count: true,
                })
            } else if (values === "Product") {
                setGiftoffer({
                    product: true,
                })
            }
            else if (values === "Category") {
                setGiftoffer({
                    category: true,
                })
            }
            else if (values === "Brand") {
                setGiftoffer({
                    brand: true,
                })
            }
            else if (values === "Order") {
                setGiftoffer({
                    order: true,
                })
            }
            else {
            }
        }
    };

    const EditDiscount = async (ID) => {
        let formData = new FormData()
        formData.append('gift_id', Gift.gift_id)
        formData.append('gift_name', Gift.gift_name)
        formData.append('gift_type', Gifttype.value)
        formData.append('numberof_gifts', Gift.numberof_gifts)
        formData.append('valid_from', datingFromTab)
        formData.append('valid_to', datingTab)
        formData.append('buy_brand', IsBrand.value ? IsBrand.value : "")
        formData.append('buy_category', cateVal.value ? cateVal.value : "")
        formData.append('buy_product', Product.value)
        formData.append('gift_product', GiftProduct.value)
        formData.append('gifts_to_cart', isChecked3)
        formData.append('order_value', Gift.order_value ? Gift.order_value : "")
        formData.append('buy_one', Gift.buy_one ? Gift.buy_one : "")
        formData.append('get_one', Gift.get_one ? Gift.get_one : "")
        await axios.put(`${API_Gift}/${ID}`, formData, config).then((res) => {
            setResMsg(res.data.msg, 'resss');
            // clearState();
            setModalFail(true);
        });
    }
    return (
        <div className="p-2" style={{ marginTop: '80px' }}>
            <h5 className="title">Gift Offer</h5>
            <div className="mt-4">
                <form style={{ background: 'white', padding: '20px' }} onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className="mb-4">
                        <Col md="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Gift ID
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="gift_id"
                                        placeholder="Enter Gift-ID"
                                        value={Gift.gift_id}
                                        onChange={handleChange}
                                        ref={register({ required: "This is required" })}
                                    />

                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Gift Name
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="gift_name"
                                        placeholder="Enter Gift Name"
                                        value={Gift.gift_name}
                                        onChange={handleChange}
                                        ref={register({ required: "This is required" })}
                                    />

                                </div>
                            </div>
                        </Col>
                        <Col md="4">

                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Gift Type
                                </label>
                                <div className="form-control-wrap">
                                    <RSelect
                                        name="gift_type"
                                        options={[
                                            { value: "Count", label: "Count" },
                                            { value: "Product", label: "Product" },
                                            { value: "Category", label: "Category" },
                                            { value: "Brand", label: "Brand" },
                                            { value: "Order", label: "Order" },
                                        ]}
                                        isDisabled={ID?true:false}
                                        value={Gifttype}
                                        onChange={ProductTypehandlechange}

                                    />
                                </div>
                            </div>

                        </Col>
                    </Row>

                    {/* <Row className="mb-4">
                        
                    </Row> */}
                    <Row>

                        <Col md="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Number of gift allowed
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="numberof_gifts"
                                        placeholder="Enter No.Of Allowed"
                                        value={Gift.numberof_gifts}
                                        onChange={handleChange}
                                        ref={register({ required: "This is required" })}
                                    />

                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Valid date from
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="valid_from"
                                        placeholder="Enter From date"
                                        value={datingFromTab}
                                        onChange={dateChangedFrom}
                                        ref={register({ required: "This is required" })}
                                    />

                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="paid">
                                    Valid date to
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="valid_to"
                                        placeholder="Enter To date"
                                        value={datingTab}
                                        onChange={dateChanged}
                                        ref={register({ required: "This is required" })}
                                    />

                                </div>
                            </div>
                        </Col>
                    </Row>

                    {
                        GIftoffer.count ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Buy Product
                                                </label>
                                                <div className="form-control-wrap">
                                                    {console.log(ProductData,"ProductDataProductData")}
                                                    <RSelect
                                                        name="buy_product"
                                                        onChange={handleReadProduct}
                                                        options={ProductData}
                                                        value={Product}
                                                    // isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Buy
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="buy_one"
                                                        placeholder="Enter Buy Count"
                                                        value={Gift.buy_one}
                                                        onChange={handleChange}
                                                        ref={register({ required: "This is required" })}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Get
                                                </label>
                                                <div className="form-control-wrap">

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="get_one"
                                                        placeholder="Enter Get Count"
                                                        value={Gift.get_one}
                                                        onChange={handleChange}
                                                        ref={register({ required: "This is required" })}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col md="12" className="d-flex justify-content-end mt-4">
                                            <Button color="primary" type="submit">
                                                <span>{ID ? "UPDATE" : "SAVE"}</span>
                                            </Button>
                                        </Col>


                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }
                    {
                        GIftoffer.product ?
                            <>
                                <div>
                                    <Row className="mb-4">
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Buy Product
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="buy_product"
                                                        onChange={handleReadProduct}
                                                        options={ProductData}
                                                        value={Product}
                                                    // isMulti={true}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Gift Product
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="gift_product"
                                                        // onChange={ProductTypehandlechange}
                                                        onChange={handleReadGiftProduct}
                                                        options={ProductData}
                                                        value={GiftProduct}
                                                    // isMulti={true}
                                                    // value={ProductType}
                                                    />
                                                </div>
                                            </div>
                                        </Col>




                                        <Col md="12" className="d-flex justify-content-end mt-4">
                                            <Button color="primary" type="submit">
                                                <span>{ID ? "UPDATE" : "SAVE"}</span>
                                            </Button>
                                        </Col>


                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }
                    {
                        GIftoffer.category ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Buy Category
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="buy_category"
                                                        onChange={handleReadCategory}
                                                        options={mainCate}
                                                        // isMulti={true}
                                                        value={cateVal}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Gift Product                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="gift_product"
                                                        // onChange={ProductTypehandlechange}
                                                        onChange={handleReadGiftProduct}
                                                        options={cateProduct}
                                                        value={GiftProduct}
                                                    // isMulti={true}
                                                    // value={ProductType}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col md="12" className="d-flex justify-content-end mt-4">
                                            <Button color="primary" type="submit">
                                                <span>{ID ? "UPDATE" : "SAVE"}</span>
                                            </Button>
                                        </Col>


                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        GIftoffer.brand ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Buy Brand
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="buy_brand"
                                                        options={brandData}
                                                        onChange={handleReadBrand}
                                                        value={IsBrand}
                                                    // isMulti={true}
                                                    // value={ProductType}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Gift Product
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="gift_product"
                                                        // onChange={ProductTypehandlechange}
                                                        onChange={handleReadGiftProduct}
                                                        options={brandProduct}
                                                        value={GiftProduct}
                                                    // isMulti={true}
                                                    // value={ProductType}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col md="12" className="d-flex justify-content-end mt-4">
                                            <Button color="primary" type="submit">
                                                <span>{ID ? "UPDATE" : "SAVE"}</span>
                                            </Button>
                                        </Col>


                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        GIftoffer.order ?
                            <>
                                <div>
                                    <Row className="mb-4">

                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Order Value Morethan
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="order_value"
                                                        placeholder="Enter Order Value"
                                                        value={Gift.order_value}
                                                        onChange={handleChange}
                                                        ref={register({ required: "This is required" })}
                                                    />

                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="paid">
                                                    Select Gift Product
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="gift_product"
                                                        // onChange={ProductTypehandlechange}
                                                        onChange={handleReadGiftProduct}
                                                        options={ProductData}
                                                        value={GiftProduct}
                                                    // isMulti={true}
                                                    // value={ProductType}
                                                    />
                                                </div>
                                            </div>
                                        </Col>


                                        <Col md="12" className="d-flex justify-content-end mt-4">
                                            <Button color="primary" type="submit">
                                                <span>{ID ? "UPDATE" : "SAVE"}</span>
                                            </Button>
                                        </Col>


                                    </Row>

                                </div>
                            </>
                            :
                            <></>
                    }
                    <Row className="mt-4 mb-5">
                        {/* <Col md="4">
                            <div className="preview-block">
                                <div className="g-3 align-center flex-wrap">
                                    <div className="g">
                                        <div className="custom-control custom-checkbox">

                                            <input type="checkbox" className="custom-control-input form-control" id="customCheck1" checked={isChecked1} onChange={(e) => handleOnChange1(e)} />

                                            <label className="custom-control-label" htmlFor="customCheck1">
                                                Is gift sale product is purchase
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md="4">

                            <div className="custom-control custom-checkbox">


                                <input type="checkbox" className="custom-control-input form-control" id="customCheck2" name="Usage" checked={isChecked22} onChange={handleOnChange22} />
                                <label className="custom-control-label" htmlFor="customCheck2">
                                    User Can Choose A Same Gifts Several Times
                                </label>
                            </div>

                        </Col> */}
                        <Col md="4">
                            <div className="preview-block">
                                <div className="g-3 align-center flex-wrap">
                                    <div className="g">
                                        <div className="custom-control custom-checkbox">


                                            <input type="checkbox" className="custom-control-input form-control" id="customCheck3" name="gifts_to_cart" checked={isChecked3} onChange={handleOnChange3} />
                                            <label className="custom-control-label" htmlFor="customCheck3">
                                                Auto Add Gifts To Cart
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Modal isOpen={modalFail} toggle={toggleModalFail}>
                        <ModalBody className="modal-body-lg text-center">
                            <div className="nk-modal">
                                <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"></Icon>
                                <h4 className="nk-modal-title">{ResMsg}</h4>
                                <div className="nk-modal-action mt-5">
                                    <Link to='/dashboard/Gift-offers'>
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

export default GiftOfferAddEdit;
