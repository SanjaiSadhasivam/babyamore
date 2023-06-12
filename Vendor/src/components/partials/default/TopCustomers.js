import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../Component";

const TopCustomers = () => {
  return (
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">Top Customers</h6>
          </div>
          <h6 className="no-users text-bold" style={{padding: '10px', margin: '10px'}}>148 </h6>
          
        </div>
        <ul className="nk-store-statistics">
          <li className="item">
            <div className="info">
              <div className="title">Active Customers</div>
            </div>
            <div className="title">Users</div>
             {/* <div className="count">1,795</div> */}
            {/* <Icon name="bag" className="bg-primary-dim"></Icon> */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Customers</div> */}
              <p>Users</p>
            </div>
            <p>40</p>
            {/* <Icon name="users" className="bg-info-dim"></Icon> */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Products</div> */}
              <p>Products</p>
            </div>
            <p>50</p>
            {/* <Icon name="box" className="bg-pink-dim"></Icon> */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Categories</div> */}
              <p>Orders</p>
            </div>
            <p>20</p>
            {/* <Icon name="server" className="bg-purple-dim"></Icon> */}
          </li>
          <li className="item">
            <div className="info">
              {/* <div className="title">Categories</div> */}
              <p>Chat</p>
            </div>
            <p>10</p>
            {/* <Icon name="server" className="bg-purple-dim"></Icon> */}
          </li>
        </ul>
      </div>
    </Card>
  );
};
export default TopCustomers;
