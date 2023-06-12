import React, { useEffect, useRef } from 'react'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import { Cookies, useCookies } from "react-cookie";
export const Products = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(()=>{
    removeCookie("rewardpoints");
  },[])
  return (
    <div className='container'>
      <ProductDetails />
      <RelatedProducts />
    </div>
  )
}
