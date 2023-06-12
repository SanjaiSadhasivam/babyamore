import React from "react";
import { Card } from "reactstrap";
import DataCard from "./DataCard";
import { Icon, Col, Row } from "../../Component";

const ActiveUser = () => {
  return (
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">Orders</h6>
          </div>
          {/* <h6 className="no-users text-bold" style={{padding: '10px', margin: '10px'}}>148 </h6> */}
          
        </div>
      <Row>
        <Col xxl="6" sm="6">
              <DataCard
                title="Orders Today"
                // percentChange={"19"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>0 </a>}
              />
        </Col>
        <Col xxl="6" sm="6">
              <DataCard
                title="Product To ship"
                // percentChange={"19"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>0 </a>}
              />
        </Col>
        <Col xxl="6" sm="6">
              <DataCard
                title="Total Orders"
                // percentChange={"19"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>19 </a>}
              />
        </Col>
        <Col xxl="6" sm="6">
              <DataCard
                title="Total Product Delivered"
                // percentChange={"19"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>8 </a>}
              />
        </Col>
      </Row>
      </div>
    </Card>
  );
};
export default ActiveUser;
