import React, { useEffect, useState, forwardRef } from "react";
import Head from "../../../layout/head/Head";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Row, Col, RSelect, Icon, } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { messageData } from "./MessageData";
import './CouponsEdit.css';
import { useForm } from "react-hook-form";
import { Block } from "../../../components/block/Block";
import { PreviewCard } from "../../../components/preview/Preview";
import { Nav, NavItem, NavLink, TabContent, TabPane, Tooltip, Modal, ModalBody, } from "reactstrap";
import classnames from "classnames";
import { API_Product, API_Brand, API_Coupon, API_Category, API_SubCategory, API_ChildCategory, token } from "../../../Api";
import axios from "axios";
import moment from 'moment'

const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  },
};

const CouponAddEdit = () => {
  // const location = useLocation();
  const params = useParams();
  const paramID = params.id

  const [Coupon, setCoupon] = useState({
    code: '',
    discount_type: '',
    discount_percent: '',
    from_date: '',
    end_date: '',
    description: '',
    is_individual_usage: '',
    is_exclude_sale_item: '',
    is_apply_coupon_mrp_price: '',
    min_spend: '',
    max_discount_amount: '',
    product_id: '',
    exclude_product_id: '',
    product_category_id: '',
    exclude_product_category_id: '',
    brand_id: '',
    exclude_brand_id: '',
    usage_limit_per_coupon: '',
    usage_limit_per_user: '',
    shipping_method: '',
    payment_method: '',
    auto_coupon: '',
  })


  const [modalFail, setModalFail] = useState(false);

  const toggleModalFail = () => {
    // clearState();
    setModalFail(!modalFail);

  };
  const [ID, setID] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [activeIconTab, setActiveIconTab] = useState("1");
  const { errors, register, handleSubmit } = useForm();
  const [discount_type, setdiscount_type] = useState();
  const [shipping_type, setShipping_type] = useState('');
  const [ProductData, SetProductData] = useState([]);
  const [tooltipOpen1, setTooltipOpen1] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const [tooltipOpen3, setTooltipOpen3] = useState(false);
  const [tooltipOpen4, setTooltipOpen4] = useState(false);
  const [tooltipOpen6, setTooltipOpen6] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [ResMsg, setResMsg] = useState();
  const [checkedOne, setCheckedOne] = useState(0);
  const [datingTab, setdatingTab] = useState()
  const [datingFromTab, setdatingFromTab] = useState()
  const [checkedTwo, setCheckedTwo] = useState(0);
  const [checkedThree, setCheckedThree] = useState(0);
  const [isSale, setIsSale] = useState(1);
  const [readOnlyproduct, setReadOnlyProduct] = useState(false);
  const [readOnlyCategory, setReadOnlyCategory] = useState(false);
  const [readOnlysubCategory, setReadOnlysubCategory] = useState(false);
  const [readOnlychildCategory, setReadOnlychildCategory] = useState(false);
  const [readOnlyBrand, setReadOnlyBrand] = useState(false);
  const [readOnlyExCategory, setReadOnlyExCategory] = useState(false);
  const [readOnlyExsubCategory, setReadOnlyExsubCategory] = useState(false);
  const [readOnlyExchildCategory, setReadOnlyExchildCategory] = useState(false);
  const [readOnlyExBrand, setReadOnlyExBrand] = useState(false);
  const [readOnlyExcludeproduct, setReadOnlyExcludeProduct] = useState(false);
  const [Discountvalue, setDiscountvalue] = useState([
    { value: "PercentageDiscount", label: "Percentage Discount" },
    { value: "FixedCartDiscount", label: "Fixed Cart Discount" },]);
  const [Productoprator, setproductoprator] = useState();


  //onchange value

  const [IsCategory, setIsCategory] = useState();
  const [Product, setPrroduct] = useState('');
  const [exBrand, setExBrand] = useState('');
  const [IsExCategory, setIsExCategory] = useState('');
  const [IsExSubCategory, setIsExSubCategory] = useState('');
  const [IsExChildCategory, setIsExChildCategory] = useState('');
  const [product_id, setproduct_id] = useState();
  const [isDelivery, setIsDelivery] = useState('');
  const [isSPMethod, setIsSPMethod] = useState('');
  const [isPayment, setIsPayment] = useState('');

  const [product_idoptions, setproduct_idoptions] = useState([
    { value: "Oral Care", label: "Oral Care" },
    { value: "Baby Cloths", label: "Baby Cloths" },
    { value: "Motherhood", label: "Motherhood" }
  ]);
  const [exclude_product_id, setexclude_product_id] = useState();
  const [exclude_product_idoptons, setexclude_product_idoptions] = useState([
    { value: "Oral Care", label: "Oral Care" },
    { value: "Baby Cloths", label: "Baby Cloths" },
    { value: "Motherhood", label: "Motherhood" }
  ]);
  const [Categoryoperator, setCategoryoperator] = useState();
  const [Categoryoperatoroptions, setCategoryoperatoroptions] = useState([
    { value: "Johnsons", label: "Johnsons" },
    { value: "Himalayas", label: "Himalayas" },
    { value: "Johhnson & Baby", label: "Johhnson & Baby" }
  ]);
  const [ExcludeCategory, setExcludeCategory] = useState();

  const [ExcludeCategoryoptons, setExcludeCategoryoptions] = useState([
    { value: "Oral Care", label: "Oral Care" },
    { value: "Baby Cloths", label: "Baby Cloths" },
    { value: "Motherhood", label: "Motherhood" }
  ]);



  const [ShippingMethods, setShippingMethods] = useState([
    { value: "Local shipping", label: "Local shipping" },
    { value: "Same day delivery", label: "Same day delivery" },

  ]);

  const [Paymentmethods, setPaymentmethods] = useState([
    { value: "Net banking", label: "Net banking" },
    { value: "Cash On Delivery", label: "Cash On Delivery" },
    { value: "Net banking & COD", label: "Net banking & COD" },
  ]);


  useEffect(() => {
    GetEditdata();
    GetProducts();
    GetMainCate();
    GetBrand();
    GetSubCate();
    GetChildCate();
  }, []);


  // const updateOne = () => {
  //   setCheckedOne((prev) => !prev);
  // };
  const updateOne = (event) => {
    if (event.target.checked == 1) {
      setCheckedOne(event.target.checked === true ? 1 : 0);
    } else if (event.target.checked == 0) {
      setCheckedOne(0);
    }
  };
  const updateTwo = (event) => {
    if (event.target.checked == 1) {
      setCheckedTwo(event.target.checked === true ? 1 : 0);
    } else if (event.target.checked == 0) {
      setCheckedTwo(0);
    }
  };
  const updateThree = (event) => {
    if (event.target.checked == 1) {
      setCheckedThree(event.target.checked === true ? 1 : 0);
    } else if (event.target.checked == 0) {
      setCheckedThree(0);
    }
  };
  const [CheckedFour, setCheckedFour] = useState(0)
  const updateFour = (event) => {
    if (event.target.checked == 1) {
      setCheckedFour(event.target.checked === true ? 1 : 0);
    } else if (event.target.checked == 0) {
      setCheckedFour(0);
    }
  };
  const [Auto, setAuto] = useState(false)
  const updateAuto = () => {
    setAuto((prev) => !prev);
  };

  function onChangeValue(event) {
    setIsSale(event.target.value);
  }

  const handleChangeShip = (event) => {
    console.log(
      event.value
    );
    setIsSPMethod(event)
  }
  const handleChangePayment = (e) => {
    setIsPayment(e)
  }

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };
  const [couponPercent, setCouponPercent] = useState({
    PercentageDiscount: false,
    FixedCartDiscount: false,
  })

  const selectoptions = (item) => {
    const selectvalue = item.value;
    if (selectvalue === "PercentageDiscount") {
      setCouponPercent({
        PercentageDiscount: true
      })
    }
    else if (selectvalue === "FixedCartDiscount") {
      setCouponPercent({
        FixedCartDiscount: true
      })
    }
    else {
    }
  }


  const clearValue = () => {
    setReadOnlyBrand(false)
    setReadOnlyExBrand(false)
    setReadOnlyExcludeProduct(false)
    setReadOnlyCategory(false)
    setReadOnlyExCategory(false)
    setReadOnlyProduct(false)
    setReadOnlysubCategory(false)
    setReadOnlyExsubCategory(false)
    setReadOnlychildCategory(false)
    setReadOnlyExchildCategory(false)
  }
  const [IsBrand, setIsBrand] = useState('');
  const handleReadBrand = (e) => {
    const value = e
    setIsBrand(value)
    if (value) {
      setReadOnlyBrand(false)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }
  }
  const [ExProduct, setExProduct] = useState('');
  const handleReadProduct = (e) => {
    const value = e
    setPrroduct(value);
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(false)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }

  }
  const [cateVal, setCateVal] = useState('')
  const handleReadCategory = (e) => {
    setCateVal(e)
    const value = e
    setIsCategory(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(false)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }
  }
  const handleReadsetExcludeProduct = (e) => {
    const value = e
    setExProduct(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(false)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }
  }
  
  const [subCateVal, setsubCateVal] = useState('')
  const [isSubCategory, setIssubCategory] = useState('')

  const handleReadsubCategory = (e) => {
    setsubCateVal(e)
    const value = e
    setIssubCategory(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(false)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }
  }
  const [childCateVal, setchildCateVal] = useState('')
  const [ExchildCateVal, setExchildCateVal] = useState('')
  const [ischildCategory, setIschildCategory] = useState('')

  const handleReadchildCategory = (e) => {
    setchildCateVal(e)
    const value = e
    setIschildCategory(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(false)
      setReadOnlyExchildCategory(true)
    }
  }

  const handleReadExCategory = (e) => {
    const value = e
    setIsExCategory(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(false)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }
  }

  const handleReadExSubCategory = (e) => {
    const value = e
    setIsExSubCategory(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(false)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }
  }

  const handleReadExChildCategory = (e) => {
    setExchildCateVal(e)
    const value = e
    setIsExChildCategory(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(true)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(false)
    }
  }

  const handleReadExBrand = (e) => {
    const value = e
    setExBrand(value)
    if (value) {
      setReadOnlyBrand(true)
      setReadOnlyExBrand(false)
      setReadOnlyExcludeProduct(true)
      setReadOnlyCategory(true)
      setReadOnlyExCategory(true)
      setReadOnlyProduct(true)
      setReadOnlysubCategory(true)
      setReadOnlyExsubCategory(true)
      setReadOnlychildCategory(true)
      setReadOnlyExchildCategory(true)
    }
  }




  //Get Products

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

  //Category
  const [mainCate, setMainCate] = useState([])
  const [subCate, setsubCate] = useState([])
  const [childCate, setchildCate] = useState([])

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


  const GetSubCate = async () => {
    const data1 = await axios.get(API_SubCategory, config)
    const Res1 = data1.data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.subcat_id,
        label: itemsMain.subcategory_name
      }
      return datss
    })
    setsubCate(Res1);
  }
  const GetChildCate = async () => {
    const data2 = await axios.get(API_ChildCategory, config)
    const Res2 = data2.data.list.map(itemsMain => {
      const datss = {
        value: itemsMain.id,
        label: itemsMain.childcategoryname
      }
      return datss
    })
    setchildCate(Res2);
  }

  //Get Brand

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




  const dateChanged = (e) => {
    const value = e.target.value
    setdatingTab(value)
  }
  const dateChangedFrom = (e) => {
    const value = e.target.value
    setdatingFromTab(value)
  }

  const handleChangess = ({ target: { name, value } }) => {
    setCoupon({ ...Coupon, [name]: value });
  }

  const [radio, setRadio] = useState()
  const handleChangeRadio = (e) => {
    setRadio(e.target.value)
  }



  // Destructure R-select Value
  const ProdData = Product ? Product.map((das) => {
    const red = {
      type: "Product",
      id: das.value,
      name: das.label
    }
    return red
  }) : null

  const exProdData = ExProduct ? ExProduct.map((das) => {
    const red = {
      type: "Exclude Product",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const isBrandData = IsBrand ? IsBrand.map((das) => {
    const red = {
      type: "Brand",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const isExBrandData = exBrand ? exBrand.map((das) => {
    const red = {
      type: "Exclude Brand",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const isCategoryData = IsCategory ? IsCategory.map((das) => {
    const red = {
      type: "Category",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const issubCategoryData = isSubCategory ? isSubCategory.map((das) => {
    const red = {
      type: "Sub Category",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const ischildCategoryData = ischildCategory ? ischildCategory.map((das) => {
    const red = {
      type: "Child Category",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const isExCategoryData = IsExCategory ? IsExCategory.map((das) => {
    const red = {
      type: "Exclude Category",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const isExSubCategoryData = IsExSubCategory ? IsExSubCategory.map((das) => {
    const red = {
      type: "Exclude Sub Category",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const isExChildCategoryData = IsExChildCategory ? IsExChildCategory.map((das) => {
    const red = {
      type: "Exclude Child Category",
      id: das.value,
      name: das.label
    }
    return red
  }) : null
  const isDataPayment = isPayment ? isPayment.map((das) => {
    const red = {
      id: das.value,
      name: das.label
    }
    return red
  }) : null

  // const ids = isSPMethod ? isSPMethod.map((das) => {
  //   const red = {
  //     // id: das.value,
  //     name: das.label
  //   }
  //   return red
  // }) : null
  
  const ids = [{
    id : "1",
    name: isSPMethod ? isSPMethod.label : null
  }]
  
  console.log(ids, "isSPMethod");

  const GetEditdata = async () => {
    setID(paramID)
    console.log(paramID, 'paramID');
    const Result = await axios.get(`${API_Coupon}/${paramID}`, config);
    console.log(Result.data.list[0], "EDIT GET");
    setCoupon({
      ...Coupon,
      code: Result.data.list[0].code,
      description: Result.data.list[0].description,
      discount_percent: Result.data.list[0].discount_percent,
      min_spend: Result.data.list[0].min_spend,
      max_discount_amount: Result.data.list[0].max_discount_amount,
      usage_limit_per_coupon: Result.data.list[0].usage_limit_per_coupon,
      usage_limit_per_user: Result.data.list[0].usage_limit_per_user,
      is_individual_usageLimitPerUser: Result.data.list[0].is_individual_usageLimitPerUser,
    })


    const selectvalue = Result.data.list[0].discount_type;
    if (selectvalue === 0) {
      console.log("start 8")
      setCouponPercent({
        PercentageDiscount: true
      })
    }
    else if (selectvalue === 1) {
      console.log("start 9")
      setCouponPercent({
        FixedCartDiscount: true
      })
    }

    console.log("start 1")
    setdiscount_type({ value: Result.data.list[0].discount_type === 0 ? 'Percentage Discount' : "Fixed Cart Discount", label: Result.data.list[0].discount_type === 1 ? 'Fixed Cart Discount' : "Percentage Discount " })
    console.log("start 2")
    setIsSPMethod({value: Result.data.list[0].shipping_method === "Local shipping" ? "Local shipping": "Same day Shipping", label: Result.data.list[0].shipping_method === "Local shipping" ? "Local shipping": "Same day Shipping"})
    setCheckedOne(Result.data.list[0].is_individual_usage == 0 ? 0 : 1);
    console.log("start 3")
    setCheckedTwo(Result.data.list[0].is_exclude_sale_item == 0 ? 0 : 1);
    console.log("start 4")
    setCheckedThree(Result.data.list[0].is_apply_coupon_mrp_price == 0 ? 0 : 1);
    console.log("start 5")
    setCheckedFour(Result.data.list[0].auto_coupon == 0 ? 0 : 1);
    console.log("start 6")
    console.log(Result.data.list[0].product_id !== null ? Result.data.list[0].product_id : "null", "datassss")
 
    if (Result.data.list[0].product_id !== null) {
      const ProdEdit = JSON.parse(Result.data.list[0].product_id)
      if (ProdEdit ? ProdEdit.length != 0 : null) {
        console.log("start 7");
        ProdEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setPrroduct((indexss) => [...indexss, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(false)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }

    }

    // if (Result.data.list[0].shipping_method !== null) {
    //   const DeliveryEdit = JSON.parse(Result.data.list[0].shipping_method)
    //   if (DeliveryEdit ? DeliveryEdit.length != 0 : null) {
    //     console.log("start 10")
    //     DeliveryEdit.map((prodItem) => {
    //       const datas = {
    //         // type: prodItem.type,
    //         label: prodItem.name,
    //         value: prodItem.name
    //       }
    //       setIsSPMethod((indess) => [...indess, datas])
    //     })
    //   }
    // }

    if (Result.data.list[0].payment_method !== null) {
      const PaymentEdit = JSON.parse(Result.data.list[0].payment_method)
      if (PaymentEdit ? PaymentEdit.length != 0 : null) {
        PaymentEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setIsPayment((indexss) => [...indexss, datas])
        })
      }
    }

    if (Result.data.list[0].exclude_product_id !== null) {
      const ExProdEdit = JSON.parse(Result.data.list[0].exclude_product_id)
      if (ExProdEdit ? ExProdEdit.length != 0 : null) {
        ExProdEdit.map((item) => {
          const data = {
            label: item.name,
            value: item.id
          }
          setExProduct((items) => [...items, data])
        });
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(false)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }
    }

    if (Result.data.list[0].brand_id !== null) {
      const brandEdit = JSON.parse(Result.data.list[0].brand_id)
      if (brandEdit ? brandEdit.length != 0 : null) {
        brandEdit.map((item) => {
          const data = {
            label: item.name,
            value: item.id
          }
          setIsBrand((items) => [...items, data])
        });
        setReadOnlyBrand(false)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }
    }

    if (Result.data.list[0].exclude_brand_id !== null) {
      const ExBrandEdit = JSON.parse(Result.data.list[0].exclude_brand_id)
      if (ExBrandEdit ? ExBrandEdit.length != 0 : null) {
        ExBrandEdit.map((prodItem) => {
          const datas = {
            label: prodItem.name,
            value: prodItem.id
          }
          setExBrand((item) => [...item, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(false)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }
    }

    if (Result.data.list[0].product_category_id !== null) {
      const CategoryEdit = JSON.parse(Result.data.list[0].product_category_id)
      const typeCate = CategoryEdit ? CategoryEdit.map((ten) => ten.type) : null;

      if (CategoryEdit ? CategoryEdit.length != 0 && typeCate[0] === 'Category' : null) {
        CategoryEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setCateVal((item) => [...item, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(false)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }
      if (CategoryEdit ? CategoryEdit.length != 0 && typeCate[0] === 'Sub Category' : null) {
        CategoryEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setsubCateVal((item) => [...item, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(false)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }
      if (CategoryEdit ? CategoryEdit.length != 0 && typeCate[0] === 'Child Category' : null) {
        CategoryEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setchildCateVal((item) => [...item, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(false)
        setReadOnlyExchildCategory(true)
      }
    }

    if (Result.data.list[0].exclude_product_category_id !== null) {
      const ExCategoryEdit = JSON.parse(Result.data.list[0].exclude_product_category_id)
      const ExtypeCate = ExCategoryEdit ? ExCategoryEdit.map((ten) => ten.type) : null

      if (ExCategoryEdit ? ExCategoryEdit.length != 0 && ExtypeCate[0] === 'Exclude Category' : null) {
        ExCategoryEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setIsExCategory((item) => [...item, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(false)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }
      if (ExCategoryEdit ? ExCategoryEdit.length != 0 && ExtypeCate[0] === 'Exclude Sub Category' : null) {
        ExCategoryEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setIsExSubCategory((item) => [...item, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(false)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(true)
      }
      if (ExCategoryEdit ? ExCategoryEdit.length != 0 && ExtypeCate[0] === 'Exclude Child Category' : null) {
        ExCategoryEdit.map((prodItem) => {
          const datas = {
            // type: prodItem.type,
            label: prodItem.name,
            value: prodItem.id
          }
          setIsExChildCategory((item) => [...item, datas])
        })
        setReadOnlyBrand(true)
        setReadOnlyExBrand(true)
        setReadOnlyExcludeProduct(true)
        setReadOnlyCategory(true)
        setReadOnlyExCategory(true)
        setReadOnlyProduct(true)
        setReadOnlysubCategory(true)
        setReadOnlyExsubCategory(true)
        setReadOnlychildCategory(true)
        setReadOnlyExchildCategory(false)
      }
    }

    const dateing = Result.data.list[0].end_date
    const dateingFrom = Result.data.list[0].from_date
    setdatingTab(dateing.slice(0, 10));
    setdatingFromTab(dateingFrom.slice(0, 10));
  }


  // console.log(Coupon.code, "exampleTesting1");
  // console.log(Coupon.discount_percent, "exampleTesting2");
  // console.log(Coupon.description, "exampleTesting3");
  // console.log(Coupon.min_spend, "exampleTesting4");
  // console.log(Coupon.max_discount_amount, "exampleTesting5");
  // console.log(Coupon.usage_limit_per_coupon, "exampleTesting6");
  // console.log(Coupon.usage_limit_per_user, "exampleTesting7");
  // console.log(isSPMethod, "exampleTesting8");
  // console.log(datingTab, "exampleTesting9");
  // console.log(datingFromTab, "exampleTesting10");
  // console.log(Product, "exampleTesting11");
  // console.log(ExProduct, "exampleTesting12");
  // console.log(exBrand, "exampleTesting13");
  // console.log(cateVal, "exampleTesting14");
  // console.log(subCateVal, "exampleTesting15");
  // console.log(IsExCategory, "exampleTesting16");
  // console.log(childCateVal, "exampleTesting17");
  // console.log(ExchildCateVal, "exampleTesting18");
  // console.log(IsExSubCategory, "exampleTesting19");
  // console.log(IsBrand, "exampleTesting20");


  const EditCoupon = async (ID) => {
    let formData = new FormData()
    formData.append('code', Coupon.code)
    formData.append('discount_type', couponPercent.FixedCartDiscount === true ? 1 : 0)
    formData.append('from_date', datingFromTab)
    formData.append('end_date',datingTab)
    formData.append('discount_percent', Coupon.discount_percent)
    formData.append('description', Coupon.description)
    formData.append('is_individual_usage', checkedOne)
    formData.append('is_exclude_sale_item', checkedTwo)
    formData.append('is_apply_coupon_mrp_price', checkedThree)
    formData.append('min_spend', Coupon.min_spend)
    formData.append('max_discount_amount', Coupon.max_discount_amount)
    formData.append('product_id', JSON.stringify(ProdData))
    formData.append('exclude_product_id', JSON.stringify(exProdData))

    if (isCategoryData ? isCategoryData.length > 0 : null) {
      formData.append('product_category_id', JSON.stringify(isCategoryData))
    } else
      if (issubCategoryData ? issubCategoryData.length > 0 : null) {
        formData.append('product_category_id', JSON.stringify(issubCategoryData))
      } else
        if (ischildCategoryData ? ischildCategoryData.length > 0 : null) {
          formData.append('product_category_id', JSON.stringify(ischildCategoryData))
        }

    if (isExCategoryData ? isExCategoryData.length > 0 : null) {
      formData.append('exclude_product_category_id', JSON.stringify(isExCategoryData))
    } else
      if (isExSubCategoryData ? isExSubCategoryData.length > 0 : null) {
        formData.append('exclude_product_category_id', JSON.stringify(isExSubCategoryData))
      } else
        if (isExChildCategoryData ? isExChildCategoryData.length > 0 : null) {
          formData.append('exclude_product_category_id', JSON.stringify(isExChildCategoryData))
        } else {
          formData.append('exclude_product_category_id', null)
        }
    formData.append('brand_id', JSON.stringify(isBrandData))
    formData.append('exclude_brand_id', JSON.stringify(isExBrandData))
    formData.append('usage_limit_per_coupon', Coupon.usage_limit_per_coupon)
    formData.append('usage_limit_per_user', Coupon.usage_limit_per_user)
    formData.append('shipping_method', isSPMethod.value)
    formData.append('payment_method', JSON.stringify(isDataPayment))
    formData.append('auto_coupon', CheckedFour)
    await axios.put(`${API_Coupon}/${ID}`, formData, config).then((res) => {
      setResMsg(res.data.msg, 'resss');
    });
    setModalFail(true);
  }

  const create = async () => {
    let formData = new FormData()
    formData.append('code', Coupon.code)
    formData.append('discount_type', couponPercent.FixedCartDiscount === true ? 1 : 0)
    formData.append('from_date',datingFromTab)
    formData.append('end_date', datingTab)
    formData.append('discount_percent', Coupon.discount_percent)
    formData.append('description', Coupon.description)
    formData.append('is_individual_usage', checkedOne)
    formData.append('is_exclude_sale_item', checkedTwo)
    formData.append('is_apply_coupon_mrp_price', checkedThree)
    formData.append('min_spend', Coupon.min_spend)
    formData.append('max_discount_amount', Coupon.max_discount_amount)
    formData.append('product_id', JSON.stringify(ProdData))
    formData.append('exclude_product_id', JSON.stringify(exProdData))

    if (isCategoryData ? isCategoryData.length > 0 : null) {
      formData.append('product_category_id', JSON.stringify(isCategoryData))
    } else
      if (issubCategoryData ? issubCategoryData.length > 0 : null) {
        formData.append('product_category_id', JSON.stringify(issubCategoryData))
      } else
        if (ischildCategoryData ? ischildCategoryData.length > 0 : null) {
          formData.append('product_category_id', JSON.stringify(ischildCategoryData))
        }

    if (isExCategoryData ? isExCategoryData.length > 0 : null) {
      formData.append('exclude_product_category_id', JSON.stringify(isExCategoryData))
    } else
      if (isExSubCategoryData ? isExSubCategoryData.length > 0 : null) {
        formData.append('exclude_product_category_id', JSON.stringify(isExSubCategoryData))
      } else
        if (isExChildCategoryData ? isExChildCategoryData.length > 0 : null) {
          formData.append('exclude_product_category_id', JSON.stringify(isExChildCategoryData))
        } else {
          formData.append('exclude_product_category_id', null)
        }

    formData.append('brand_id', JSON.stringify(isBrandData))
    formData.append('exclude_brand_id', JSON.stringify(isExBrandData))
    formData.append('usage_limit_per_coupon', Coupon.usage_limit_per_coupon)
    formData.append('usage_limit_per_user', Coupon.usage_limit_per_user)
    formData.append('shipping_method', isSPMethod.value)
    formData.append('payment_method', JSON.stringify(isDataPayment))
    formData.append('auto_coupon', CheckedFour)
    axios.post(API_Coupon, formData, config).then((res) => {
      setResMsg(res.data.msg, 'resss');
    });
    setModalFail(true);
  }

  const onFormSubmitsvalue = (form) => {
    if (!ID) {
      create();
    }
    else {
      EditCoupon(ID)
    }
  }






  return (
    <React.Fragment>
      <Head title=" Configuration"></Head>
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
                  <span>General</span>
                </NavLink>
              </NavItem>
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
                  <span>Usage Restriction</span>
                </NavLink>
              </NavItem>
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
                  <span>Usage Limits</span>
                </NavLink>
              </NavItem>

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
                  <span>CheckOut</span>
                </NavLink>
              </NavItem>
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
                  <span>Auto apply Coupon</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "6" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("6");
                  }}
                >
                  <span>Add Payments methods</span>
                </NavLink>
              </NavItem> */}




            </Nav>
          </PreviewCard>
          <PreviewCard>
            <form onSubmit={handleSubmit(onFormSubmitsvalue)}>
              <TabContent activeTab={activeIconTab}>
                <TabPane tabId="1">
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          <h5>Coupon</h5>
                        </label>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Coupon Code
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Coupon Code"
                            name="code"
                            value={Coupon.code}
                            onChange={handleChangess}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Discount Type
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "PercentageDiscount", label: "Percentage Discount" },
                              { value: "FixedCartDiscount", label: "Fixed Cart Discount" },
                            ]}
                            value={discount_type}
                            onChange={(e) => selectoptions(e)}
                          />
                        </div>
                      </div>
                    </Col>
                    {couponPercent.PercentageDiscount ?
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="purchased">
                            {/* Coupon Amount */}
                            Coupon Percentage Discount
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter value in Percentage"
                              name="discount_percent"
                              value={Coupon.discount_percent}
                              onChange={handleChangess}
                            // defaultValue={formData.purchased}
                            />
                            {/* {errors.purchased && <span className="invalid">{errors.purchased.message}</span>} */}
                          </div>
                        </div>
                      </Col>
                      :
                      null
                    }
                    {couponPercent.FixedCartDiscount ?
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="purchased">
                            {/* Coupon Amount */}
                            Coupon Fixed Cart Discount
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter value in Rupees"
                              name="discount_percent"
                              onmousewheel="return false;" onWheelCapture={e => {
                                e.target.blur()
                              }}
                              value={Coupon.discount_percent}
                              onChange={handleChangess}
                            // defaultValue={formData.purchased}
                            />
                            {/* {errors.purchased && <span className="invalid">{errors.purchased.message}</span>} */}
                          </div>
                        </div>
                      </Col>
                      :
                      null
                    }
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          From Date
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="From Date"
                            name="from_date"
                            value={datingFromTab}
                            onChange={dateChangedFrom}
                          // defaultValue={formData.purchased}
                          />
                          {/* {errors.purchased && <span className="invalid">{errors.purchased.message}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          End Date
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="date"
                            className="form-control"
                            placeholder=" End Date"
                            name="end_date"
                            value={datingTab}
                            onChange={dateChanged}
                          // defaultValue={formData.purchased}
                          />
                          {/* {errors.purchased && <span className="invalid">{errors.purchased.message}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <label className="form-label">Coupon description</label>
                      <textarea
                        name="description"
                        value={Coupon.description}
                        placeholder="Enter Meta description"
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "This field is required" })}
                        onChange={handleChangess}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </Col>

                    <Col size="12">
                      <Button color="primary" style={{ float: "right" }} type="submit" onClick={(ev) => { ev.preventDefault(); toggleIconTab("2"); }} >
                        <span>Next</span>
                      </Button>
                    </Col>
                  </Row>

                </TabPane>
                <TabPane tabId="2">
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          <h5>usage Restrictions</h5>
                        </label>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="preview-block">
                        <label className="form-label" htmlFor="purchased">
                          Indidual Usage
                        </label>
                        <div className="g-3 align-center flex-wrap">
                          <div className="g">
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input form-control" id="customCheck6" name="is_individual_usage" checked={checkedOne}
                                onChange={updateOne} />
                              <label className="custom-control-label" htmlFor="customCheck6">
                                Individual Use&nbsp;
                                <Button id="TooltipExample1" style={{ padding: "0px" }}>?</Button>
                              </label>

                              <Tooltip
                                isOpen={tooltipOpen1}
                                placement="bottom"
                                target="TooltipExample1"
                                toggle={() => { setTooltipOpen1(!tooltipOpen1) }}>
                                Only use coupon.Don't apply rewards.
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        {/* <span>Only use coupon.Don't apply rewards.</span> */}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="preview-block">
                        <label className="form-label" htmlFor="purchased">
                          Sale Item
                        </label>
                        <div className="g-3 align-center flex-wrap">
                          <div className="g">
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input form-control" id="customCheck7" name="is_exclude_sale_item" checked={checkedTwo}
                                onChange={updateTwo} />
                              <label className="custom-control-label" htmlFor="customCheck7">
                                Exclude sale items &nbsp;
                                <Button id="TooltipExample1" style={{ padding: "0px" }}>?</Button>
                              </label>
                              <Tooltip
                                isOpen={tooltipOpen1}
                                placement="bottom"
                                target="TooltipExample1"
                                toggle={() => { setTooltipOpen1(!tooltipOpen1) }}>
                                Check this box if the coupon should not apply to items
                                on sale. Per-item coupons will only work if the item is not on sale. Per-cart coupons will only work if
                                there are items in the cart that are not on sale. (refer wordpress).
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        {/* <span>Only use coupon.Don't apply rewards.</span> */}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="preview-block">
                        <label className="form-label" htmlFor="purchased">
                          MRP Coupon
                        </label>
                        <div className="g-3 align-center flex-wrap">
                          <div className="g">
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input form-control" id="customCheck8" name="is_apply_coupon_mrp_price" checked={checkedThree}
                                onChange={updateThree} />

                              <label className="custom-control-label" htmlFor="customCheck8">
                                Apply coupon on MRP price &nbsp;
                                <Button id="TooltipExample1" style={{ padding: "0px" }}>?</Button>
                              </label>

                              <Tooltip
                                isOpen={tooltipOpen1}
                                placement="bottom"
                                target="TooltipExample1"
                                toggle={() => { setTooltipOpen1(!tooltipOpen1) }}>
                                Should the offer apply on MRP instead of sale price.                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        {/* <span>Only use coupon.Don't apply rewards.</span> */}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Minimum spend
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Minimum Spend Amount"
                            name="min_spend"
                            onmousewheel="return false;" onWheelCapture={e => {
                              e.target.blur()
                            }}
                            value={Coupon.min_spend}
                            onChange={handleChangess}

                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Maximum discount amount
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            onmousewheel="return false;" onWheelCapture={e => {
                              e.target.blur()
                            }}
                            className="form-control"
                            placeholder="Maximum discount amount"
                            name="max_discount_amount"
                            value={Coupon.max_discount_amount}
                            onChange={handleChangess}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" style={{ float: "right" }} type="button" onClick={clearValue}>
                        <span>X</span>
                      </Button>
                    </Col>
                    <Col md="6">
                      {/* <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          product_id
                        </label>
                        <div className="form-control-wrap">
                          <select class="form-control"
                            aria-label="Disabled select example"
                            disabled={readOnlyproduct}
                            onChange={handleReadProduct}
                          >
                            <option value="" selected disabled>Select Product</option>
                            {ProductData.map((item) => <option value={item.value}>{item.label}</option>)}
                          </select>
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Product
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="product_id"
                            options={ProductData}
                            onChange={handleReadProduct}
                            value={Product}
                            isDisabled={readOnlyproduct}
                            // disabled={readOnlyproduct}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      {/* <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Exclude product_id
                        </label>
                        <div className="form-control-wrap">
                          <select class="form-control"
                            aria-label="Disabled select example"
                            disabled={readOnlyExcludeproduct}
                            onChange={handleReadsetExcludeProduct}
                          >
                          </select>
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Exclude Product
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="exclude_product_id"
                            options={ProductData}
                            onChange={handleReadsetExcludeProduct}
                            value={ExProduct}
                            isDisabled={readOnlyExcludeproduct}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>



                    <Col md="4">
                      {/* <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Product Category
                        </label>
                        <div className="form-control-wrap">
                          <select class="form-control"
                            aria-label="Disabled select example"
                            disabled={readOnlyCategory}
                            onChange={handleReadCategory}
                          >
                            <option value="" selected disabled>Please select</option>
                            <optgroup label="Main Category">
                              {mainCate.map((item) => <option value={item.value}> {item.label} </option>)}
                            </optgroup>
                            <optgroup label="Sub Category">
                              {subCate.map((item) => <option value={item.value}> {item.label} </option>)}
                            </optgroup>
                            <optgroup label="Child Category">
                              {childCate.map((item) => <option value={item.value}> {item.label}</option>)}
                            </optgroup>
                          </select>
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Main Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="product_category_id"
                            options={mainCate}
                            onChange={handleReadCategory}
                            value={cateVal}
                            isDisabled={readOnlyCategory}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Sub Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="productmain_category_id"
                            options={subCate}
                            onChange={handleReadsubCategory}
                            value={subCateVal}
                            isDisabled={readOnlysubCategory}
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
                            name="product_childcategory_id"
                            options={childCate}
                            onChange={handleReadchildCategory}
                            value={childCateVal}
                            isDisabled={readOnlychildCategory}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md='4'> <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                        Exclude Category
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="exclude_product_category_id"
                          options={mainCate}
                          onChange={handleReadExCategory}
                          value={IsExCategory}
                          isDisabled={readOnlyExCategory}
                          isMulti={true}
                        />
                      </div>
                    </div></Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Exclude Sub Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="productmain_category_id"
                            options={subCate}
                            onChange={handleReadExSubCategory}
                            value={IsExSubCategory}
                            isDisabled={readOnlyExsubCategory}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Exclude Child Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="product_childcategory_id"
                            options={childCate}
                            onChange={handleReadExChildCategory}
                            value={IsExChildCategory}
                            isDisabled={readOnlyExchildCategory}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* <Col md="6"> */}
                    {/* <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Exclude Category
                        </label>
                        <div className="form-control-wrap">
                          <select class="form-control"
                            aria-label="Disabled select example"
                            disabled={readOnlyExCategory}
                            onChange={handleReadExCategory}
                          >
                            <option value="" selected disabled>Please select</option>
                            <optgroup label="Main Category">
                              {mainCate.map((item) => <option value={item.value}>{item.label}</option>)}
                            </optgroup>
                            <optgroup label="Sub Category">
                              {subCate.map((item) => <option value={item.value}>{item.label}</option>)}
                            </optgroup>
                            <optgroup label="Child Category">
                              {childCate.map((item) => <option value={item.value}>{item.label}</option>)}
                            </optgroup>
                          </select>
                        </div>
                      </div> */}

                    {/* </Col> */}

                    <Col md="6">
                      {/* <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Brand
                        </label>
                        <div className="form-control-wrap">
                          <select class="form-control"
                            aria-label="Disabled select example"
                            disabled={readOnlyBrand}
                            onChange={handleReadBrand}
                          >
                            <option value="" selected disabled>Please select</option>
                            {brandData?.map((item) => <option value={item.value}>{item.label}</option>)}
                          </select>
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Brand
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="brand_id"
                            options={brandData}
                            onChange={handleReadBrand}
                            value={IsBrand}
                            isDisabled={readOnlyBrand}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      {/* <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Exclude Brand
                        </label>
                        <div className="form-control-wrap">
                          <select class="form-control"
                            aria-label="Disabled select example"
                            disabled={readOnlyExBrand}
                            onChange={handleReadExBrand}
                          >
                            <option value="" selected disabled>Please select</option>
                            {brandData?.map((item) => <option value={item.value}>{item.label}</option>)}
                          </select>
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Exclude Brand
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="exclude_brand_id"
                            options={brandData}
                            onChange={handleReadExBrand}
                            value={exBrand}
                            isDisabled={readOnlyExBrand}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" style={{ float: "right" }} type="submit" onClick={(ev) => { ev.preventDefault(); toggleIconTab("3"); }}>
                        <span>Next</span>
                      </Button>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="3">

                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          <h5>Usage Limits </h5>
                        </label>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Limit Per Coupon
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            onmousewheel="return false;" onWheelCapture={e => {
                              e.target.blur()
                            }}
                            className="form-control"
                            placeholder="Enter Limit Per Coupon"
                            name="usage_limit_per_coupon"
                            value={Coupon.usage_limit_per_coupon}
                            onChange={handleChangess}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Limit Per User
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                             onmousewheel="return false;" onWheelCapture={e => {
                                e.target.blur()
                              }}
                            placeholder="Enter Limit Per User"
                            name="usage_limit_per_user"
                            value={Coupon.usage_limit_per_user}
                            onChange={handleChangess}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <Button color="primary" style={{ float: "right" }} type="submit" onClick={(ev) => { ev.preventDefault(); toggleIconTab("4"); }}>
                        <span>Next</span>
                      </Button>
                    </Col>
                  </Row>

                </TabPane>

                <TabPane tabId="4">
                  <Row>
                    <Col md="4" className="CheckOutHeading">
                      Shipping Methods
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <div className="form-control-wrap">
                          <RSelect
                            name="shipping_method"
                            options={[
                              { value: "Local shipping", label: "Local shipping" },
                              { value: "Same day delivery", label: "Same day delivery" },
                            ]}
                            value={isSPMethod}
                            onChange={handleChangeShip} />
                        </div>
                      </div>
                    </Col>
                    <Col md="1">
                      <div>
                        <Button id="TooltipExample4" style={{ padding: "0px" }}>?</Button>
                        <Tooltip
                          isOpen={tooltipOpen4}
                          placement="bottom"
                          target="TooltipExample4"
                          toggle={() => { setTooltipOpen4(!tooltipOpen4) }}>
                          The coupon only applies to the selected zones or shipping methods.
                        </Tooltip>
                      </div>
                    </Col>
                    <Col md="3">
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="4" className="CheckOutHeading">
                      Payment methods
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <div className="form-control-wrap">
                          <RSelect
                            // name="payment_method"
                            // isMulti={true}
                            // options={[
                            //   { value: "Net banking", label: "Net banking" },
                            //   { value: "Cash On Delivery", label: "Cash On Delivery" },
                            // ]}
                            // value={isDelivery}
                            // onChange={(e) => setIsPayment(e)}
                            name="payment_method"
                            isMulti={true}
                            options={[
                              { value: "Net Banking", label: "Net Banking" },
                              { value: "Cash On delivery", label: "Cash On delivery" },
                            ]}
                            value={isPayment}
                            onChange={handleChangePayment}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="1">
                      <div>
                        <Button id="TooltipExample6" style={{ padding: "0px" }}>?</Button>
                        <Tooltip
                          isOpen={tooltipOpen6}
                          placement="bottom"
                          target="TooltipExample6"
                          toggle={() => { setTooltipOpen6(!tooltipOpen6) }}>
                          One of these payment methods must be selected in order for this coupon to be valid.
                        </Tooltip>
                      </div>
                    </Col>

                    <Col md="3">
                    </Col>
                    <Col size="12">
                      <Button color="primary" style={{ float: "right" }} type="submit" onClick={(ev) => { ev.preventDefault(); toggleIconTab("5"); }}>
                        <span>Next</span>
                      </Button>
                    </Col>
                  </Row>

                </TabPane>
                <TabPane tabId="5">
                  <Row>
                    <Col md="2">
                      <div>
                        Auto Coupon
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="preview-block">

                        <div className="g-3 align-center flex-wrap">
                          <div className="g">
                            <div className="custom-control custom-checkbox">
                              {/* <input type="checkbox" className="custom-control-input form-control" id="customCheck9" name="is_individual_usage" checked={isChecked4} onChange={handleChangess} /> */}
                              {/* <input type="checkbox" className="custom-control-input form-control" id="customChec6" value={true} name="auto_coupon" checked={Auto}
                                onChange={updateAuto} /> */}

                              <input type="checkbox" className="custom-control-input form-control" id="customCheck9" name="auto_coupon" checked={CheckedFour}
                                onChange={updateFour} />
                              <label className="custom-control-label" htmlFor="customCheck9">
                              </label>
                            </div>
                            <div>

                              Automatically add the coupon to the cart if the restrictions are met. Please enter a description when you check this box, the description will be shown in the customer's cart if the coupon is applied.


                            </div>
                          </div>
                        </div>
                        {/* <span>Only use coupon.Don't apply rewards.</span> */}

                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" style={{ float: "right" }} type="submit">
                        <span>{!ID ? 'Save' : 'Update'} </span>
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
                {/* <TabPane tabId="6">

                </TabPane> */}


              </TabContent>
              <Modal isOpen={modalFail} toggle={toggleModalFail}>
                <ModalBody className="modal-body-lg text-center">
                  <div className="nk-modal">
                    {/* <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success"></Icon> */}
                    <Icon className={ResMsg === 'Coupon code already Exist' ? 'nk-modal-icon icon-circle icon-circle-xxl ni ni-alert bg-warning' : 'nk-modal-icon icon-circle icon-circle-xxl ni ni-check bg-success'}></Icon>
                    <h4 className="nk-modal-title">{ResMsg}</h4>
                    <div className="nk-modal-action mt-5">
                      <Link to='/dashboard/coupons'>
                        <Button color="light" size="lg" className="btn-mw mr-3" onClick={toggleModalFail}>
                          Done
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </form>
          </PreviewCard>
        </Block >
      </Content >

    </React.Fragment >
  );
};
export default CouponAddEdit;