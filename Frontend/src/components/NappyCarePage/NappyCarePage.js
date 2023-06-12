import React from "react";
import { useEffect, useContext, useState, useMemo } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { RiEqualizerLine } from "react-icons/ri";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { cartContext } from "../../layout/layout";
import axios from "axios";

/**---------------------------------Components--------------------------------------- */
import { BannerSlider } from "../BannerSlider/bannerSlider";
// import { NappySideBar } from "../NappySideBar/NappySideBar";
import NappySideBar from "../NappySideBar/NappySideBar";
import Card from "./../Card/card";
import { Helmet } from "react-helmet";
import SeoHelmet from "../SEOHelmetDetails/SeoHelmet";
/**---------------------------------Pages-------------------------------------------- */
import "./NappyCarePage.css";
import Cart from "../cart/cart";
import ProductDetailsSlider from "../ProductDetailsSlider/ProductDetailsSlider";
import Quickmodel from "./Quickmodel";
import Slider from "react-slick";
import {
  API_URL,
  API_CART,
  API_Product,
  token,
  API_Brand,
  API_MAIN_Category,
  API_POPULAR_Category,
  API_Child_Category,
  API_Sub_Category,
  API_Brand_Filter,
} from "../../config/config";
import Loading from "../LazyLoading/Loading";
const API_Image = `${API_URL}/Product_image`;
const API_CAtegory = `${API_URL}/admin/category/getmaindata`;
const API_SUbCategory = `${API_URL}/admin/subcategory/getProductSubCatData`;
const API_childCategory = `${API_URL}/admin/ChildCategory/getChildCatData`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const getCart = () => {
  const products = localStorage.getItem("cartproduct");
  if (products) {
    return JSON.parse(localStorage.getItem("cartproduct"));
  } else {
    return [];
  }
};
const NappyCarePage = ({ addCart, add, select }) => {
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });
  const {
    brandname,
    brandid,
    maincategoryname,
    popular_category_id,
    type,
    maincategoryid,
    subcategoryid,
    childcategoryname,
    childcategoryid,
    subcategoryname,
  } = useParams();
  const location = useLocation();
  const [productData, setData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [productDatas, setDatas] = useState();
  const [brand, setBrand] = useState([]);
  const [filerProduct, setFilterProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [modalData, setModalData] = useState();
  const [btnName, setbtnName] = useState("Add to Cart");
  const [addtocarts, setAddtocart] = useState(getCart);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [brandnameshow, setBrandNameshow] = useState("");
  const [MainCatName, setMainCatName] = useState("");
  const [metaDetails, setMetaDetails] = useState({
    Title: "",
    Description: "",
  });
  const [topContent, settopContent] = useState();
  const [childtopContent, setchildtopContent] = useState();
  const [bottomContent, setbottomContent] = useState();
  const [subbottomContent, setsubbottomContent] = useState();
  const [childbottomContent, setchildbottomContent] = useState();
  const [mainTopcontent, setMainTopcontent] = useState();
  const [modalShows, setModalShows] = useState(false);
  const [getUsercart, setUsercart] = useState([]);
  const [toggleBtn, settoggleBtn] = useState(false);
  const { addTocart, GetCartdatas, getCartItemsLocal, GetCart, cart } =
    useContext(cartContext);
  const [num, setNum] = useState(1);
  const [page, setPage] = useState(1);
  const countOnPage = 15;
  const range = 2;

  const list = Array.from({ length: productData.length });

  const linksCount = Math.ceil(list.length / countOnPage);
  const rangeStart = useMemo(() => {
    const start = page - range;
    return start > 0 ? start : 1;
  }, [page]);

  const rangeEnd = useMemo(() => {
    const end = page + range;
    return end < linksCount ? end : linksCount;
  }, [page]);

  const pages = useMemo(() => {
    return Array.from({ length: rangeEnd }, (_, index) => index + 1).slice(
      rangeStart - 1
    );
  }, [rangeStart, rangeEnd]);

  const incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  const decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Getdata();
    if (cookies.customer_id) {
      getUserCart();
    }
   

    removeCookie("rewardpoints");

    localStorage.setItem("cartproduct", JSON.stringify(addtocarts));
  }, [
    brandid,
    subcategoryid,
    childcategoryid,
    maincategoryid,
    popular_category_id,
    type,
    location.state,
  ]);

  const Getdata = async () => {
    try {
      if (brandid) {
        const datas = [{ value: Number(brandid) }];
        let formData = new FormData();
        formData.append("Brandid", JSON.stringify(datas));
        const { data } = await axios.post(
          `${API_Brand_Filter}`,
          formData,
          configss
        );
        setData(data.list);
        let filterdatas = [];
        const brandMeta = await axios.get(`${API_Brand}/${brandid}`, configss);

        setBrandNameshow(brandMeta.data.list[0].name);
        setMetaDetails({
          Title: brandMeta.data.list[0].seo_title,
          Description: brandMeta.data.list[0].seo_description,
        });
        setFilterProduct(data.list);
        GetdataBrand();
      } else if (maincategoryid) {
        try {
          const category = await axios.get(
            `${API_CAtegory}/${maincategoryid}`,
            configss
          );

          let main = category.data.list.reverse();
          getMain();
          setData(main);
          setFilterProduct(main);
          GetdataBrand();
        } catch (error) {}
      } else if (subcategoryid) {
        try {
          const Subcategory = await axios.get(
            `${API_SUbCategory}/${subcategoryid}`,
            configss
          );
          let sub = Subcategory.data.list.reverse();
          // window.location.reload()
          getSub();
          setData(sub);
          setFilterProduct(sub);
          GetdataBrand();
        } catch (error) {}
      } else if (childcategoryid) {
        try {
          const childCategory = await axios.get(
            `${API_childCategory}/${childcategoryid}`,
            configss
          );
          let child = childCategory.data.list.reverse();
          getChild();
          setData(child);
          setFilterProduct(child);
          GetdataBrand();
        } catch (error) {}
      } else if (location.state.value) {
        try {
          let brandFilterData = location.state.value;

          setData([]);
          setData(brandFilterData);
          setFilterProduct(brandFilterData);
          GetdataBrand();
          getChild();
    
        } catch (error) {}
      }
    } catch (error) {}
  };

  const getMain = async () => {
    const mainCategoryBot = await axios.get(
      `${API_MAIN_Category}/${maincategoryid}`,
      configss
    );
    // console.log("mainCategoryBot", mainCategoryBot.data.list[0].category_name)
    setMetaDetails({
      Title: mainCategoryBot.data.list[0].meta_name,
      Description: mainCategoryBot.data.list[0].meta_description,
    });
    setMainCatName(mainCategoryBot.data.list[0].category_name);
    setbottomContent(mainCategoryBot.data.list[0].bottom_content);
    setMainTopcontent(mainCategoryBot.data.list[0].top_content);
  };
  const getSub = async () => {
    const subCategoryBot = await axios.get(
      `${API_Sub_Category}/${subcategoryid}`,
      configss
    );
    setMetaDetails({
      Title: subCategoryBot.data.list[0].meta_name,
      Description: subCategoryBot.data.list[0].meta_description,
    });
    setsubbottomContent(subCategoryBot.data.list[0].bottom_content);
    settopContent(subCategoryBot.data.list[0].top_content);
  };
  const getChild = async () => {
    const childCategoryBot = await axios.get(
      `${API_Child_Category}/${childcategoryid}`,
      configss
    );
    setMetaDetails({
      Title: childCategoryBot.data.list[0].meta_name,
      Description: childCategoryBot.data.list[0].meta_description,
    });
    setchildbottomContent(childCategoryBot.data.list[0].bottom_content);
    setchildtopContent(childCategoryBot.data.list[0].top_content);
  };
  const GetdataBrand = async () => {
    const brand = await axios.get(`${API_Brand}`, configss);

    if (brand.data.list) {
      const brand_Result = brand.data.list.filter(
        (currEle) => currEle.id == brandid
      );

      setBrand(brand_Result);
    }
  };
  const getUserCart = async () => {
    try {
      const Result = await axios.get(`${API_CART}/${cookies.customer_id}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      GetCart();
      setUsercart(Result.data.list);
    } catch (error) {}
  };
  const addtocartss = async () => {};
  const setId = async (id) => {
    const { data } = await axios.get(`${API_Product}/${id}`, configss);
    setModalData(data.list);
    if (data.list) {
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setModalData();
    setShowModal(false);
  };
  const priceSort = (e) => {
    let Prodcts = productData;

    let value = e.target.value;
    if (value == "lowtohigh") {
      let result = Prodcts.sort((a, b) => a.SalePrice - b.SalePrice);
      setData([...result]);
    }
    if (value == "hightolow") {
      let result = Prodcts.sort((a, b) => b.SalePrice - a.SalePrice);

      setData([...result]);
    }
    if (value == "a-z") {
      let result = Prodcts.sort((a, b) =>
        a.ProductName.localeCompare(b.ProductName)
      );
      setData([...result]);
    }
    if (value == "z-a") {
      let result = Prodcts.sort((a, b) =>
        b.ProductName.localeCompare(a.ProductName)
      );
      setData([...result]);
    }
  };

  const PriceFilter = (min, max) => {
    let Prodcts = [...productData];
    let filter = [...filerProduct];
    if (min >= 0 || max <= 20000) {
      let result = filter.filter(
        (currEle) => currEle.SalePrice >= min && currEle.SalePrice <= max
      );
      setData([...result]);
    } else {
      setData(Prodcts);
    }
  };

  const ProductDAtas = (data) => {
    setData(data);
    setFilterProduct(data);
  };

  const handlePagecount = (number) => {
    addtocartss();
    setPage(number);
    // GetCart();
  };

  const handlePagecountpluse = (page) => {
    // GetCart()
    addtocartss();
    setPage(page + 1);
  };
  return (
    <>
      <SeoHelmet meta={metaDetails} />
      {/* <BannerSlider /> */}
      <div className="container mt-2 mb-2 ">
        {brandid ? (
          <>
            {brand.map((curr) => {
              return (
                <>
                  {brand.length < 0 ? (
                    <>
                      <div className="topContent">
                        {renderHTML(curr.top_content)}
                      </div>
                    </>
                  ) : (
                    <div>{renderHTML(curr.top_content)}</div>
                  )}
                </>
              );
            })}
          </>
        ) : null}
        {maincategoryid ? (
          <>
            {maincategoryid.length < 0 ? (
              <div className="topContent w-100">{renderHTML(mainTopcontent)}</div>
            ) : (
              <div className="maincategory_top_content">{renderHTML(mainTopcontent)}</div>
            )}
          </>
        ) : null}
        {subcategoryid ? (
          <>
            {subcategoryid.length < 0 ? (
              <div className="topContent">{renderHTML(topContent)}</div>
            ) : (
              <div className="maincategory_top_content">{renderHTML(topContent)}</div>
            )}
          </>
        ) : null}

        {childcategoryid ? (
          <>
            {childcategoryid.length < 0 ? (
              <div className="topContent">{renderHTML(childtopContent)}</div>
            ) : (
              <div className="maincategory_top_content">{renderHTML(childtopContent)}</div>
            )}

            {}
          </>
        ) : null}
      </div>
      <div className="container nappy__container">
        <div className="nappy-lap-view">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start align-items-center cursor-pointer text-muted">
              {brandname ? (
                <h6 className="nappy__title text-muted">
                  {brandname
                    ? `brands / ${brandnameshow ? brandnameshow : ""}`
                    : "Nappy Care"}
                </h6>
              ) : null}
              {maincategoryid ? (
                <h6 className="nappy__title text-muted">
                  {MainCatName ? ` ${MainCatName}` : "Nappy Care"}
                </h6>
              ) : null}
              {maincategoryname != undefined &&
              subcategoryname != undefined &&
              childcategoryname == undefined ? (
                <>
                  <h6 className="nappy__title text-muted">
                    {maincategoryname
                      ? ` ${maincategoryname.replaceAll("-", " ")}`
                      : "Nappy Care"}
                  </h6>
                  <h6 className="nappy__title text-muted">
                    {subcategoryname
                      ? `/ ${location.state ? location.state : null}`
                      : "Nappy Care"}
                  </h6>
                </>
              ) : null}

              {maincategoryname != undefined &&
              subcategoryname != undefined &&
              childcategoryname != undefined ? (
                <>
                  <h6 className="nappy__title text-muted">
                    {maincategoryname
                      ? ` ${maincategoryname.replaceAll("-", " ")}`
                      : "Nappy Care"}
                  </h6>
                  <h6 className="nappy__title text-muted">
                    {subcategoryname
                      ? `/ ${subcategoryname.replaceAll("-", " ")}`
                      : "Nappy Care"}
                  </h6>
                  <h6 className="nappy__title text-muted">
                    {childcategoryname
                      ? `/ ${location.state ? location.state : null}`
                      : "Nappy Care"}
                  </h6>
                </>
              ) : null}
            </div>
            <div>
              <div className="d-flex justify-content-start align-items-center">
                <p className="showing__title">
                  Showing{" "}
                  {productData.length > 0 ? (
                    <>1-{productData.length}</>
                  ) : (
                    <span>0</span>
                  )}{" "}
                  results
                </p>
                <select
                  className="form-select nappy__seletion"
                  aria-label="Default select example"
                  onChange={priceSort}
                >
                  <option selected>Default sorting</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="lowtohigh">Sort by price:low to high</option>
                  <option value="hightolow">Sort by price:high to low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="nappy-mobile-view">
          <div className="">
            <div className="d-flex justify-content-center mt-2 mb-2">
              {brandname ? (
                <h6 className="nappy__title text-center text-muted">
                  {brandname ? `brands / ${brandname?.trim("").replaceAll("-"," ")}` : "Nappy Care"}
                </h6>
              ) : null}
              {maincategoryname ? (
                <h6 className="nappy__title text-center text-muted">
                  {maincategoryname ? ` ${maincategoryname?.trim("").replaceAll("-"," ")}` : "Nappy Care"}
                </h6>
              ) : null}
              {subcategoryname ? (
                <h6 className="nappy__title text-center text-muted">
                  {subcategoryname ? `/ ${subcategoryname?.trim("").replaceAll("-"," ")}` : "Nappy Care"}
                </h6>
              ) : null}
              {childcategoryname ? (
                <h6 className="nappy__title text-center text-muted">
                  {childcategoryname ? `/ ${childcategoryname?.trim("").replaceAll("-"," ")}` : "Nappy Care"}
                </h6>
              ) : null}
            </div>

            <div>
              <a
                class="text-center"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <h6 className="text-center mb-3 mt-3">
                  {" "}
                  <RiEqualizerLine />
                  REFINE
                </h6>
              </a>
              <div
                class="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasExample"
                data-bs-backdrop="true"
                data-bs-scroll="false"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div class="offcanvas-header justify-content-end">
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="offcanvas-body scroll_body">
                  <NappySideBar
                    PriceFilter={PriceFilter}
                    ProductDAtas={ProductDAtas}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-start align-items-center">
                <select
                  className="form-select nappy-seletion-mobile-view"
                  aria-label="Default select example"
                  onClick={priceSort}
                >
                  <option selected>Default sorting</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="lowtohigh">Sort by price:low to high</option>
                  <option value="hightolow">Sort by price:high to low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-3 nappy-lap-view ">
            <NappySideBar
              PriceFilter={PriceFilter}
              ProductDAtas={ProductDAtas}
            />
          </div>
          <div className="col-md-9 d-flex flex-wrap align-items-start justify-content-start">
            {productData?.length > 0 ? (
              <>
                {productData.length > 0 &&
                  productData
                    .slice((page - 1) * countOnPage, page * countOnPage)
                    .map((card, index) => (
                      <div className="col-lg-4" key={index}>
                        <Card
                          index={index}
                          Productdata={card}
                          id={card.Productlist_id}
                          description={card.ProductName}
                          image={`${card.ProductImage}`}
                          mrp={card.RegularPrice}
                          // addCart={card}
                          attributes={card.AttributeValue}
                          nameOfBtn={btnName}
                          current_stock={card.current_stock}
                          PreOrder={card.PreOrder}
                          SoldIndividual={card.SoldIndividual}
                          PreOrderQuantity={card.PreOrderQuantity}
                          onclick={() => addtocartss}
                          offer={card.DiscountRate}
                          text={"Add to Cart"}
                          discount={card.OfferDiscount}
                          price={card.SalePrice}
                          getId={setId}
                          // type={card.ProductType}
                          cartData={cartData}
                          ratings={card.Ratings?card.Ratings[0].AverageRating:0}
                        />
                      </div>
                    ))}
              </>
            ) : (
              <>
                <Loading />
              </>
            )}
          </div>
        </div>
        <div className="row mt-0 justify-content-center d-grid mb-3">
          {productData.length > 10 ? (
            <>
              <div className="col-md-12 d-flex align-items-center justify-content-center">
                <ul className="page-numbers nav-pagination links text-center d-flex pagination-sty">
                  {pages.map((number) => {
                    return (
                      <li
                        aria-current="page"
                        className={number == page ? "activeButton" : ""}
                      >
                        <a
                          className="page-number"
                          href="#"
                          onClick={() => handlePagecount(number)}
                        >
                          {number}
                        </a>
                      </li>
                    );
                  })}

                  {productData.slice((page - 1) * page * countOnPage) != 0 ? (
                    <li>
                      {page < 2 ? (
                        <a
                          href="#"
                          className="next page-number"
                          disabled={toggleBtn}
                          onClick={() => handlePagecountpluse(page)}
                          aria-hidden="true"
                        >
                          <i className="fa fa-angle-right" />
                        </a>
                      ) : null}
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </>
          ) : null}

          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-center">
              {maincategoryid ? (
                <div className="text-left mt-3 col-md-12 maincategory_top_content">
                  {renderHTML(bottomContent)}
                </div>
              ) : null}
              {subcategoryid ? (
                <div className="text-center maincategory_top_content">
                  {renderHTML(subbottomContent)}
                </div>
              ) : null}
              {childcategoryid ? (
                <div className="text-center maincategory_top_content">
                  {renderHTML(childbottomContent)}
                </div>
              ) : null}
              <br />
              {brand.length > 0 ? (
                <>
                  {brand.map((curr) => {
                    return (
                      <div style={{ marginTop: "25rem" }} className="maincategory_top_content">
                        {renderHTML(curr.bottom_content)}
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      {showModal ? (
        <>
          <Quickmodel show={showModal} datas={modalData} close={closeModal} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NappyCarePage;
