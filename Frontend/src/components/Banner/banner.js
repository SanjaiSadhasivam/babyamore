import React from 'react';
/**---------------------------------Pages-------------------------------------------- */
import './banner.css';

/**---------------------------------Assets------------------------------------------- */
import {default as image1} from '../../assets/images/banner/image(5).jpg'

export const Banner = () => {

  return (
    <div className='d-flex justify-content-center mt-5'>
        <img src={image1} alt='' className='center_blog' />
    </div>
  )
}
