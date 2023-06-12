import React, { useEffect, useState } from "react";

/**---------------------------------Package------------------------------------------- */
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";

/**---------------------------------Components------------------------------------------- */
import "./ProductDetailsSlider.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

/**---------------------------------Icons------------------------------------------- */
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/**---------------------------------Assets------------------------------------------- */
import card1 from "../../assets/images/products/play-button.png";
import card2 from "../../assets/images/products/image (2).jpg";
import card3 from "../../assets/images/products/image (3).jpg";
import video from "../../assets/images/video/video-1.mp4";

//Custom arrow function

import { API_URL } from "../../config/config";
const API_Image = `${API_URL}/Product_image`;

function Arrow(props) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char =
    props.type === "next" ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />;
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}

//slider state function

const ProductDetailsSlider = ({ ...props }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [count, setCount] = useState(1);

  const getImage = props.image || [];
  const getVideo = props.video || "";

  var data = getImage.map((item) => {
    const res = {
      image: item,
      image1: item,
    };
    return res;
  });

  data.push({
    video: "video",
    image1: getVideo,
  });

  const data1 = [
    {
      image: card1,
      image1: card1,
    },
    {
      image: card2,
      image1: card2,
    },
    {
      videoLink: "https://www.youtube.com/embed/rhxwje7ib9I",
      images: video,
    },
  ];
  //Component
  var settings = {
    speed: 500,
    slidesToShow: count,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const myCount = () => {
    if (data.length == 1) {
      setCount(1);
    } else if (data.length == 2) {
      setCount(2);
    } else if (data.length == 3) {
      setCount(3);
    } else if (data.length == 4) {
      setCount(4);
    } else if (data.length > 4) {
      setCount(5);
    }
  };
  useEffect(() => {
    myCount();
  }, [data]);

  return (
    <div className="">
      <div className="slider-section">
        <div className="main-slider">
          <Slider
            asNavFor={nav2}
            arrows={true}
            ref={(slider1) => setNav1(slider1)}
          >
          
            {data.map((main) => (
              <div className="main-slider-content">
                {main.image ? (
                  <InnerImageZoom
                  src={`${API_Image}/${main.image1}`}
                  // width={310}
                  // height={320}
                    hasSpacer={true}
                    zoomSrc={`${API_Image}/${main.image1}`}
                    zoomType="hover"
                    zoomPreload={true}
                    zoomScale={2}
                    fullscreenOnMobile={true}
                    />
                ) : (
                  // <object data="https://www.youtube.com/embed/rhxwje7ib9I" width="400" height="300" ></object>
                  <object
                    data={`${main.image1}`}
                    // width="310"
                   className=" main-slider-content"
                    // height="320"
                  ></object>
                )}
              </div>
            ))}
          </Slider>
          <div>
           
            <Slider
              className="vertical-slider vertical-slider-new"
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              // {...settings}
              
              slidesToShow={count}
              arrows={true}
              horizontal={true}
              swipeToSlide={true}
              focusOnSelect={true}
              nextArrow={<Arrow type="next" />}
              prevArrow={<Arrow type="prev" />}
            >
              {data.map((slider) => (
                <div className="vertical-slider-content">
                  {slider.image ? (
                    <img
                      src={`${API_Image}/${slider.image1}`}
                      alt=""
                      className="slider-box-image img-fluid "
                    />
                  ) : (
                    // <img src={slider.image1} alt="" className="slider-box-image" />
                    <>
                      {slider.image1 ? (
                        <>
                          <div className="d-flex align-items-center">
                            <object
                              data={`${card1}`}
                              // width="50"
                              // height="55"
                              className="img-fluid"
                            ></object>
                          </div>
                        </>
                      ) : null}
                    </>
                    // <object data={slider.image1} width="62" height="68"></object>
                  )}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSlider;
