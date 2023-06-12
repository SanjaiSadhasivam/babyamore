import { useState } from 'react'

/**---------------------------------Assets------------------------------------------- */
import image1 from '../../assets/images/products/image (1).jpg'

/**---------------------------------Packages----------------------------------------- */
import Slider from 'react-slick'

/**---------------------------------Pages-------------------------------------------- */
import './everyNeeds.css'

/**---------------------------------Components--------------------------------------- */
import Card from './../Card/card';

import Quickmodel from '../NappyCarePage/Quickmodel';
import axios from "axios";
import {
  API_Product,
  token,
} from "../../config/config";

const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default function EveryNeeds(Product) {


  //button state for next nd previous
  const [sliderRef, setSliderRef] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [btnName, setbtnName] = useState("Add to Cart");
  const [modalData, setModalData] = useState();

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
          // infinite: true,
          // dots: true,
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
          slidesToShow: 2,
          slidesToScroll: 2,
          // infinite: true,
          // dots: true,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  //card data
  const data = [
    {
      description: "Ad pariatur anim eiusmod velit et.",
      image: image1,
      mrp: "23,000",
      addCart: 'Add to Cart',
      select: 'Select Option',
      discount: '-20%',
      price: '21,000'
    },
    {
      description: "Ad pariatur anim eiusmod velit et.",
      image: image1,
      mrp: "23,000",
      addCart: 'Add to Cart',
      select: 'Select Option',
      discount: '-20%',
      price: '21,000'
    },
    {
      description: "Ad pariatur anim eiusmod velit et.",
      image: image1,
      mrp: "23,000",
      addCart: 'Add to Cart',
      select: 'Select Option',
      discount: '-20%',
      price: '21,000'
    },
    {
      description: "Ad pariatur anim eiusmod velit et.",
      image: image1,
      mrp: "23,000",
      addCart: 'Add to Cart',
      select: 'Select Option',
      discount: '-20%',
      price: '21,000'
    },
  ]
  const setId = async (id) => {

    const { data } = await axios.get(`${API_Product}/${id}`, configss);
    // console.log("Rendering......", data);
    setModalData(data.list);
    if (data.list) {
      setShowModal(true);
    }
    setShowModal(true);

  };

  const closeModal = () => {
    setModalData();
    setShowModal(false);
  };
  // console.log("productttt", Product)
  return (
    <div className='everyNeed_container'>
      <div className='controls'>
        {/* <h3 className='section_title'>Everyday Needs</h3> */}
      </div>

      <div style={{ position: 'relative' }} className="mt-2">
        <hr className='title_border' />

        <hr className='hr_line' />
      </div>

      <Slider {...settings}>
        {Product.Product.map((item) => {

          return (
            <>
              {/* {  console.log(item,"cardhome")} */}

              {item.product_item.map((card, index) => {

                return (
                  <Card
                    index={index}
                    Productdata={card.product_item}
                    description={card.product_item.ProductName}
                    image={card.ProductImage}
                    mrp={card.product_item.RegularPrice}
                    offer={card.product_item.DiscountRate}
                    add
                    type={card.product_item.ProductType}
                    // addCart={card.addCart}
                    // select={card.select}
                    // discount={card.discount}
                    current_stock={card.product_item.current_stock}
                    PreOrder={card.product_item.PreOrder}
                    SoldIndividual={card.product_item.SoldIndividual}
                    PreOrderQuantity={card.product_item.PreOrderQuantity}
                    attributes={card.product_item.AttributeValue}
                    nameOfBtn={btnName}
                    price={card.product_item.SalePrice}
                    id={card.product_item.Productlist_id}
                    getId={setId}
                  />
                )


              })}
            </>
          )

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
  )
}
