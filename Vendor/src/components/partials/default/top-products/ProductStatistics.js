import React, { useEffect, useState } from "react";
import { Badge, Button } from "reactstrap";
import { Card,  DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { productData, productDataSet2, productDataSet3, productDataSet4 } from "./ProductData";
import { useHistory, Link } from "react-router-dom";
import { Row, Col } from "../../../Component";
import DataCard from "../DataCard";
  

const ProductStatistics = () => {
  const [data, setData] = useState("Weekly");
  const [dataSet, setDataSet] = useState(productData);

  useEffect(() => {
    let object;
    if (data === "Daily") {
      object = productDataSet2;
    } else if (data === "Monthly") {
      object = productDataSet3;
    } else {
      object = productDataSet4;
    }
    setDataSet(object);
  }, [data]);

  const returnTotal = (n1, n2) => {
    var result = n1 * Number(n2);
    return result.toFixed(2);
  };

  return (
      <div>
    <Card>
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
              title="Total Parent Products"
              // percentChange={"19"}
              // up={false}
              // chart={<DefaultRevenueChart />}
              amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>82</a>}
            />
      </Col>
      <Col xxl="6" sm="6">
            <DataCard
              title="Total Variants Products"
              // percentChange={"19"}
              up={false}
              // chart={<DefaultRevenueChart />}
              amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>134</a>}
            />
      </Col>
      <Col xxl="6" sm="6">
            <DataCard
              title="Product Out of stock"
              // percentChange={"19"}
              up={false}
              // chart={<DefaultRevenueChart />}
              amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>50</a>}
            />
      </Col>
      <Col xxl="6" sm="6">
            <DataCard
              title="Products with stock"
              // percentChange={"19"}
              up={false}
              // chart={<DefaultRevenueChart />}
              amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>84 </a>}
            />
      </Col>
    </Row>
    </div>
  </Card>
  <Card>
    <div className="card-inner">
      <div className="card-title-group mb-2">
        <div className="card-title">
          <h6 className="title">Do you have any Questions??</h6>
          <h6 className="title" style={{color: '#fc5151'}}>We help you</h6>
          <p>you can learn more about the product features on site</p>
          <div className="d-flex justify-content-between">
          <Link to={`${process.env.PUBLIC_URL}/`}>View Section</Link>
          <Link to={`${process.env.PUBLIC_URL}/`}>Help Desk</Link>
          </div>
        </div>
      </div>
    </div>
  </Card>
  </div>
  );
};



export default ProductStatistics;
