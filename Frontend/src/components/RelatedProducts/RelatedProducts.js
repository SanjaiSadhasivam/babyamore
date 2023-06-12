import { useEffect, useState } from "react";

/**---------------------------------Assets------------------------------------------- */
import image1 from "../../assets/images/products/image (1).jpg";
import { useParams ,useLocation} from "react-router-dom";
/**---------------------------------Packages----------------------------------------- */
import Slider from "react-slick";

/**---------------------------------Pages-------------------------------------------- */
import "./RelatedProducts.css";
import axios from "axios";
import Quickmodel from "../NappyCarePage/Quickmodel";
/**---------------------------------Components--------------------------------------- */
import Card from "./../Card/card";
import SeoHelmet from "../SEOHelmetDetails/SeoHelmet";
import { API_URL, token ,API_Related_Product} from "../../config/config";

const API_Image = `${API_URL}/Product_image`;
const API_Product = `${API_URL}/admin/productlist`;
const API_category = `${API_URL}/admin/category/getmaindata`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default function RelatedProducts() {
  //button state for next nd previous
  const [sliderRef, setSliderRef] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [btnName, setbtnName] = useState("Add to Cart");
  const valuess = useParams();
  const [metaDetails, setMetaDetails] = useState({
    Title: '',
    Description: '',
  })
  // console.log("valuess", valuess.id)
  const sliderSettings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  // console.log(valuess.id, "valuessssss");
  const location = useLocation();
  const TagName = location.state
  console.log(location.state,"ppppppppppppppppp");
  const setId = async (id) => {
    const { data } = await axios.get(`${API_Product}/${id}`, config);
    // console.log("Rendering......", id);
    setModalData(data.list);
    if (data.list) {
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setModalData();
    setShowModal(false);
  };
  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    let Result = await axios.get(`${API_Product}/${valuess.id}`, config);
    // console.log("result", Result.data.list[0]);
    setMetaDetails({
      Title: Result.data.list[0].MetaTitle,
      Description: Result.data.list[0].MetaDescription,
    });

    // let tag = Result.data.list[0].ProductTags;
    let res = await axios.get(`${API_Related_Product}/${valuess.id}/${TagName}`, config);
      setData(res.data.list);

    // if (res) {
    //   let related_products = res.data.list.filter((currEle) => currEle.Productlist_id != valuess.id);

    //   setData(related_products);
    // }

  };

  // console.log(data,"mmmmmmmmmm" );
  return (
    <>
      <SeoHelmet meta={metaDetails} />

      {
        data?.length > 0 ?
          <>
            <div className="everyNeed_container mb-5">
              <div className="controls">
                {
                  data?.length > 0 ?
                    <>

                      <h3 className="section_title">Related Products</h3>
                    </> :
                    null
                }
              </div>
              <Slider ref={setSliderRef} {...sliderSettings}>
                {data.slice(0, 8).map((card, index) => {
                  console.log(card,"cccccccccccccccccccccccccccccc")
                  return (
                    <div className="card_block" style={{ border: "red" }} key={card.id}>
                      <>

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
                          // onclick={() => addtocartss(card.Productlist_id,card,card.AttributeValue)}
                          offer={card.DiscountRate}
                          text={"Add to Cart"}
                          discount={card.OfferDiscount}
                          price={card.SalePrice}
                          getId={setId}
                        />
                        {/* <Card
                      className="px-5"
                      description={item.label}
                      id={item.value}
                      // image={`${API_Image}/${item.ProductImage}`}
                      // image={image}
                      src={`${API_Image}`}
                      // mrp={item.mrp}
                      // offer
                      // add
                      // addCart={card.addCart}
                      // // select={card.select}
                      // discount={card.discount}
                      // price={price}
                    />{" "} */}
                      </>

                    </div>
                  );
                })}
              </Slider>
              {showModal ? (
                <>
                  <Quickmodel
                    show={showModal}
                    datas={modalData}
                    close={closeModal}
                  />
                </>
              ) : (
                ""
              )}
            </div>

          </> : null
      }

    </>
  );
}
