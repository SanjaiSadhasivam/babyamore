import React, { useState,useEffect } from "react";
import image1 from '../images/nappyC.jpg';
// import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from "axios";
import { useCookies } from "react-cookie";
import { API_URL,token ,API_Dashboard} from "../Api";
const configss = {
  headers: {
    "Authorization": `Bearer ${token}`
  },
};
const API_Image = `${API_URL}/Product_image`

const DeliveryShipment = () => {
  const [shipdata, setShipdata] = useState([]);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    Getshipdata();
  }, []);
  
  const Getshipdata = async () => {
    const Result = await axios.get(`${API_Dashboard}/shipping/${cookies.vendor_id}`, configss);
    setShipdata(Result.data.list)

  };
  console.log(shipdata,"shipdatashipdatashipdatashipdata");
  return (
    <div className='container mb-4'>
      <div className='d-flex justify-content-between ml-2 mr-5'>
      
        <div className='col-md-4 card m-1 p-4'>
          <h5>Same day Delivery shipments</h5>
          {shipdata.slice(0,3).map((item, idx) => (
          <div className='d-flex mt-2'>
                  <img src={`${API_Image}/${item.productimage}`} alt="IMG.JPG" width='50px' height='50px' />
            <div className='' style={{width:"80%"}}>
              <p className='p-0 m-0'>{item.productname}</p>
              <p className='text-muted'>&#8377;{item.regularprice} </p>
            </div>
            <div className='d-flex justify-content-end float-left'style={{width:"100%"}}>
              <div>
                <p className='p-0 m-0' >Orders</p>
                <p className='text-muted'>{item.topseller}</p>
                </div>
              </div>
          </div>
          ))}
          </div>
           
          <div className='col-md-8 card m-1 p-4 review-dash'>
            <h5>Sales Return</h5>
            <div className='mt-2 d-flex align-center justify-content-between'>
              <img src={image1} alt='shipment-user' className='rounded-circle'  width='50px' height='50px' />
              <div>
                <p className='p-0 m-0 font-weight-bold'>Baby Works
</p>
                <p className='p-0 m-0  text-truncate'style={{maxWidth: "450px"}}>Irure mollit enim ea esse officia dolore mollit enim ea esse officia dolore nulla mollit excepteur.</p></div>
              <div className='d-flex justify-content-end'>
                {/* <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar /> */}
              </div>
            </div>
            <div className='mt-2 d-flex align-center justify-content-between'>
              <img src={image1} alt='shipment-user' className='rounded-circle'  width='50px' height='50px' />
              <div>
                <p className='p-0 m-0 font-weight-bold'>Baby Works
</p>
                <p className='p-0 m-0  text-truncate'style={{maxWidth: "450px"}}>Irure mollit enim ea esse officia dolore mollit enim ea esse officia dolore nulla mollit excepteur.</p></div>
              <div className='d-flex justify-content-end'>
                {/* <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar /> */}
              </div>
            </div>
            <div className='mt-2 d-flex align-center justify-content-between'>
              <img src={image1} alt='shipment-user' className='rounded-circle'  width='50px' height='50px' />
              <div>
                <p className='p-0 m-0 font-weight-bold'>Baby Works
</p>
                <p className='p-0 m-0  text-truncate'style={{maxWidth: "450px"}}>Irure mollit enim ea esse officia dolore mollit enim ea esse officia dolore nulla mollit excepteur.</p></div>
              <div className='d-flex justify-content-end'>
                {/* <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar /> */}
              </div>
            </div>
          </div>

        </div>
      </div>
      )
}

      export default DeliveryShipment