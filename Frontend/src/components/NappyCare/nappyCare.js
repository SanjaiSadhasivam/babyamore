import { useState } from 'react'

/**---------------------------------Assets------------------------------------------- */
import image1 from '../../assets/images/products/image (1).jpg'

/**---------------------------------Packages----------------------------------------- */
import Slider from 'react-slick'
import { Link } from 'react-router-dom';

/**---------------------------------Pages-------------------------------------------- */
import './nappyCare.css'

/**---------------------------------Components--------------------------------------- */
import Card from '../Card/card';

/**---------------------------------Icons-------------------------------------------- */
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function NappyCare() {

  //Button state for next nd prev
  const [sliderRef, setSliderRef] = useState(null)

  //slider settings
  const sliderSettings = {
    arrows: false,
    slidesToShow: 6,
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  //slider data
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
  // console.log(sliderRef);
  return (
    <div className='everyNeed_container mt-5'>
      <div className='controls'>
        <h3 className='section_title'>Nappy care</h3>
        <div className='d-flex align-items-center' >
          <Link to='/'><p className='me-2 mt-2 see_title'>See all Brands</p></Link>
          <button onClick={sliderRef?.slickPrev}>
            <FaChevronLeft />
          </button>
          <button onClick={sliderRef?.slickNext}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <hr className='title_border' />
        <hr className='hr_line' />
      </div>
        {console.log(data,"sasas")}
      <Slider ref={setSliderRef} {...sliderSettings}>
        {data.map((card, index) => (
          <Card
            description={card.description}
            image={card.image}
            mrp={card.mrp}
            add
            offer
            attributes={card.AttributeValue}
            addCart={card.addCart}
            // select={card.select}
            discount={card.discount}
            price={card.price}
          />
        ))}
      </Slider>
    </div>
  )
}
