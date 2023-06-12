import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../Component";

const ActiveUser = () => {
  return (
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">TOP CUSTOMERS</h6>
          </div>
          <h6 className="no-users text-bold" style={{padding: '10px', margin: '10px'}}>148 </h6>
          
        </div>



        
        <ul className="nk-store-statistics">
          <li className="item">
            <div className="info">
              <div className="title"> Name</div>
            </div>
            <div className="title">Order</div>
             {/* <div className="count">1,795</div> */}
             <div className="title">Revenue</div>
             {/* <Icon name="bag" className="bg-primary-dim"></Icon>  */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Customers</div> */}
              <p>Sam</p>
            </div>
            <p>  20</p>
            <p>₹1200  </p>
             {/* <Icon name="users"  className="sign-dash-alt"></Icon>  */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Products</div> */}
              <p>Sathish</p>
            </div>
            <p>50</p>
            <p>₹1800  </p>
            {/* <Icon name="box" className="bg-pink-dim"></Icon>  */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Categories</div> */}
              <p>Dhivya</p>
            </div>
            <p>20</p>
            <p>₹1000  </p>
            {/* <Icon name="server" className="bg-purple-dim"></Icon> */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Categories</div> */}
              <p>Deepan</p>
            </div>
            <p>10</p>
            <p>₹900  </p>
             {/* <Icon name="server" className="bg-purple-dim"></Icon>  */}
          </li>
        </ul>
      </div>
    </Card>
  );
};
export default ActiveUser;
