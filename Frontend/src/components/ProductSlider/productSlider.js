import React, { useEffect, useState } from "react";
/**---------------------------------Assets------------------------------------------- */
import image1 from "../../assets/images/categories/image(1).jpg";
import image2 from "../../assets/images/categories/image(2).jpg";
import image3 from "../../assets/images/categories/image(3).jpg";
import image4 from "../../assets/images/categories/image(4).jpg";
import image5 from "../../assets/images/categories/image(5).jpg";
import image6 from "../../assets/images/categories/image(6).jpg";
import image7 from "../../assets/images/categories/image(7).jpg";
import image8 from "../../assets/images/categories/image(8).jpg";
import image9 from "../../assets/images/categories/image(9).jpg";
import image10 from "../../assets/images/categories/image(10).jpg";

/**---------------------------------Packages----------------------------------------- */
import Slider from "react-slick";
/**---------------------------------Pages-------------------------------------------- */
import "./productSlider.css";
import { API_URL, API_Category, token, API_POPULAR_Category } from "../../config/config";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../LazyLoading/Loading";
const API_Cate_Image = `${API_URL}/Category_image`;
const API_Sub_Image = `${API_URL}/SubCategory_image`;
const API_Child_Image = `${API_URL}/ChildCategory_image`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const ProductSlider = () => {
  const [Menus, setMenus] = useState([]);
  const [fileName, setFileName] = useState("");

  const GetdataMenu = async () => {
    const data = await axios.get(`${API_POPULAR_Category}`, config);
    setMenus(data.data.list);
  };
  useEffect(() => {
    GetdataMenu();
    Getdata();
  }, []);

  // const DAtaSlider =()
  //slider settings
  var settings = {
    dots: true,
    infinite: false,
    speed: 300,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 6,
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  //image data for slider
  const images = [
    {
      image: image1,
    },
    {
      image: image2,
    },
    {
      image: image3,
    },
    {
      image: image4,
    },
    {
      image: image5,
    },
    {
      image: image6,
    },
    {
      image: image7,
    },
    {
      image: image8,
    },
    {
      image: image9,
    },
    {
      image: image10,
    },
  ];
  const navigate = useNavigate();
  const Getdata = async (data) => {
    const ID = data.popular_category_id
    const Type = data.type
    const Result = await axios.get(`${API_POPULAR_Category}/category/${Type}/${ID}`, config);
    const datas = Result.data.list[0]

    if (datas.type == 'main') {
      navigate(`/${datas.category_name?.trim().replaceAll(' ', '-')}/${datas.popular_category_id}`, { state: datas })
    } else if (datas.type == 'sub') {
      navigate(`/${datas.category_name?.trim().replaceAll(' ', '-')}/${datas.subcategory_name?.trim().replaceAll(' ', '-')}/${datas.popular_category_id}`, { state: datas.subcategory_name })
    } else {
      navigate(`/${datas.category_name?.trim().replaceAll(' ', '-')}/${datas.subcategory_name?.trim().replaceAll(' ', '-')}/${datas.childcategoryname?.trim().replaceAll(' ', '-')}/${datas.popular_category_id}`, { state: datas.childcategoryname })
    }

  };
  var loopinc = 0;
  return (
    <>
      {/* <div className="application"> */}

       {/* </div> */}
      <h3 className="section_title mt-3">Popular Categories</h3>
      <div className="productSlider">
        {
          Menus.length > 0 ?
            <>
              <Slider {...settings}>
                {Menus.length > 0 &&
                  Menus.map((data) => {
                    loopinc++;

                    return (
                      <>
                        <div className="mt-3">
                          {/* <p>{data.upload_image}</p> */}

                          <NavLink
                            // to={`/${data.CateName}/${data.type}/${data.popular_category_id}`}
                            style={{ color: "#666666", fontSize: "14px" }}
                            onClick={() => Getdata(data)}
                            state={data}
                          >

                            <img src={data.MainImage != "" ? `${API_Cate_Image}/${data.CateImg}`
                              : (data.SubImage != "" ? `${API_Sub_Image}/${data.CateImg}` :
                                `${API_Child_Image}/${data.CateImg}`)}
                              alt={data.CateImg}
                              className='categories_img img-fluid' />

                          </NavLink>
                          <p className="text-center small word">{data.CateName}</p>
                        </div>
                      </>
                    );
                  })}
                {/* {images.map(data => (

            <div>


              <img src={data.image} alt="" className='categories_img img-fluid' />
            </div>
          ))} */}
              </Slider>

            </> :
            <>

              <Loading />


            </>
        }


      </div>
    </>
  );
};

export default ProductSlider;