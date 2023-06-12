import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import { API_URL, API_DASHBOARD, token } from "../../Api";
import image1 from "../../assets/images/jsTree/diapers.jpg";
import image2 from "../../assets/images/jsTree/profile.png";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API_Image = `${API_URL}/Product_image`;

const API_View = `${API_URL}/Product_image`;
const DeliveryShipment = () => {
  const [data, setData] = useState([]);
  const [shipdata, setShipdata] = useState([]);
  useEffect(() => {
    Getdata();
    Getshipdata();
  }, []);
  const Getdata = async () => {
    const Result = await axios.get(`${API_DASHBOARD}/review`, config);
    setData(Result.data.list);
  };
  const Getshipdata = async () => {
    const Result = await axios.get(`${API_DASHBOARD}/shipping`, config);
    setShipdata(Result.data.list);
  };
  console.log(data, "llllllllllllllllllll");
  console.log(shipdata, "bbbbbbbbbbbbbbb");
  return (
    <div className="container mb-4">
      <div className="d-flex justify-content-between ml-2 mr-5">
        <div className="col-md-4 card m-1 p-4">
          <h5>Same day Delivery shipments</h5>
          {shipdata.slice(0, 3).map((item, idx) => (
            <div className="d-flex mt-2">
              <img src={`${API_Image}/${item.productimage}`} alt="IMG.JPG" className="" width="50px" height="50px" />
              <div className="" style={{ width: "80%" }}>
                <p className="p-0 m-0">{item.productname}</p>
                <p className="text-muted">&#8377; {item.regularprice}</p>
              </div>
              <div className="d-flex justify-content-end float-left" style={{ width: "100%" }}>
                <div>
                  <p className="p-0 m-0">Orders</p>
                  <p className="text-muted">&#8377; {item.saleprice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-8 card m-1 p-4 review-dash">
            <h5>Recent Product Reviews</h5>
          <div className="row">
             {data.slice(0, 3).map((item, idx) => {
            return(

              <>
               <div className="col-md-3 mb-2 d-flex align-items-center justify-content-center">
              <img
                src={`${API_View}/${item.avatar}`}
                alt="shipment-user"
                className="rounded-circle"
                width="50px"
                height="50px"
              />
            </div>
            <div className="col-md-6 mb-2">
            <div>
                <p className="p-0 m-0 font-weight-bold">{item.full_name}</p>
                <p className="p-0 m-0  text-truncate" style={{ maxWidth: "450px" }}>
                  {item.comments}.
                </p>
              </div>
            </div>
            <div className="col-md-3 mb-2">
            <div className="mt-2 ">
             
             <div className="">
               <AiFillStar />
               <AiFillStar />
               <AiFillStar />
               <AiFillStar />
               <AiOutlineStar />
             </div>
           </div>
            </div>
              
              </>
            )
            })}
          </div>

         
           
      
        </div>
      </div>
    </div>
  );
};

export default DeliveryShipment;
