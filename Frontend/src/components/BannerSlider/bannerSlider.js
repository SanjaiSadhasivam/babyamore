import React, { useEffect, useState } from "react";
/**---------------------------------Assets------------------------------------------- */
import webBanner1 from "../../assets/images/banner/image(4).jpg";
import webBanner2 from "../../assets/images/banner/image(5).jpg";
import webBanner3 from "../../assets/images/banner/image(7).jpg";
import mobBanner1 from "../../assets/images/banner/mob-banner-1.jpg";
import mobBanner2 from "../../assets/images/banner/mob-banner-2.jpg";
import mobBanner3 from "../../assets/images/banner/mob-banner-3.jpg";
import { API_URL, API_Product, token, API_Brand, API_CART } from "../../config/config";
import { useCookies } from "react-cookie";
/**---------------------------------Packages----------------------------------------- */
import Slider from "react-slick";
import Carousel from "react-bootstrap/Carousel";
/**---------------------------------Pages-------------------------------------------- */
import "./bannerSlider.css";
import axios from "axios";
import Loading from "../LazyLoading/Loading";
import { NavLink } from "react-router-dom";
const API_BannerImage = `${API_URL}/admin/banner`;
const API_Image = `${API_URL}/Banner_image`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};


const getLocalCartData = () => {
  const localcartData = JSON.parse(localStorage.getItem("localcart"));
  // console.log(localcartData, "localcartData");
  if (
    localcartData === [] ||
    localcartData === null ||
    localcartData === undefined
  ) {
    return [];
  } else {
    return localcartData;
  }
};

export const BannerSlider = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [images, setImages] = useState([]);
  const [cart, setcart] = useState(getLocalCartData);

  const getBannerImage = async () => {
    try {
      const Result = await axios.get(API_BannerImage, configss);
      if (Result.data.list) {
        setImages(Result.data.list);
      }
    } catch (error) {
      // console.log(error)
    }
  };

  const pushCart = async () => {
    if (cart.length > 0 && cookies.customer_id) {
      cart.map((currEle) => {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            // Authorization: `Bearer ${Auths} `
            Authorization: `Bearer ${token}`,
          },
        };
        var cartProducts = {

          userid: cookies.customer_id,
          CustomerName: cookies.fullName
            ? cookies.fullName === "undefined"
              ? cookies.email_address.slice(0, cookies.email_address.indexOf("@"))
              : cookies.fullName.substring(0, 18)
            : null,
          Attributeid: currEle.product_attributeid?currEle.product_attributeid:null,
          Productid: currEle.Productid,
          ProductQuantity: currEle.ProductQuantity,
          product_total: 0,
        };
        let res = axios.post(`${API_CART}`, cartProducts, config);
        if (res) {
          setTimeout(() => {
            localStorage.removeItem("cartproduct");
            localStorage.removeItem("viewcart");
            localStorage.removeItem("localcart");
          }, 3000)

        }
      })

    }

  };







  useEffect(() => {
    pushCart();
    getBannerImage();
  }, []);

  //banner slider data
  // const images = [
  //     {
  //         image: webBanner1,
  //         image1: mobBanner1,
  //     },
  //     // {
  //     //     image: webBanner2,
  //     //     image1: mobBanner2,
  //     // },

  //     {
  //         image: webBanner3,
  //         image1: mobBanner3,
  //     },
  //     {
  //         image: webBanner1,
  //         image1: mobBanner1,
  //     },
  //     {
  //         image: webBanner3,
  //         image1: mobBanner2,
  //     },
  //     //     {
  //     //         image: webBanner2,
  //     //         image1: mobBanner3,
  //     //     }
  // ]

  //slider setting
  var settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3500,
    infinite: true,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "theClass",
    arrows: true,
  };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    // alert("i m clicked");
  };
  return (
    <div
      id="slider-container"
      className="max-w-lg mx-auto mt-12 bannerSlider d-block w-100"
    >
      {images?.length > 0 ? (
        <>
          <div className="webViewSlider w-100">
            <Slider {...settings}>
            
              {images.map((data) => (
                <div>
                  <NavLink to={data.LinkUrl}>
                    <img
                      src={`${API_Image}/${data.BannerImage}`}
                      alt={data.BannerName}
                      className="img-fluid benner_img w-100"
                    />
                  </NavLink>
                </div>
              ))}
            </Slider>
          </div>
          {/* <Slider {...settings} className="webViewSlider" arrows={true}>
            {images.map((data) => (
              <div>
                <NavLink to={data.LinkUrl}>
                <img
                  src={`${API_Image}/${data.BannerImage}`}
                  alt="carousel"
                  className="img-fluid benner_img w-100"
                />
                </NavLink>
              </div>
            ))}
          </Slider> */}
          <Slider {...settings} className="mobViewSlider">
            {images.map((data) => (
              <div>
                <NavLink to={data.LinkUrl}>
                  <img
                    src={`${API_Image}/${data.MobileBannerImage}`}
                    alt="carousel"
                    className="img-fluid benner_img w-100"
                  />
                </NavLink>
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};
