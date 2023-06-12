import React, { useEffect, useState } from "react";
import { Badge, Button } from "reactstrap";
import { Card,  DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { productData, productDataSet2, productDataSet3, productDataSet4 } from "./ProductData";
import { useHistory } from "react-router-dom";
import {

  Row,
  Col,
  PreviewCard,
  Knob
 
} from "../../components/Component";

const TopProducts = () => {
  const [data, setData] = useState("Weekly");
  const [dataSet, setDataSet] = useState(productData);
  const overviewKnob = {
    labels: ["", "", ""],
    dataUnit: "BTC",
    legend: false,
    datasets: [
      {
        borderColor: "transparent",
        backgroundColor: ["#6576ff", "#d9e5f7"],
        data: [220, 80],
      },
    ],
  };
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
    <Card className="h-100">
      <div className="card-inner">
        
     
      </div>
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">Top seller of this month</h6>
          </div>
          {/* <div className="card-tools">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"
                href="#toggle"
                onClick={(ev) => ev.preventDefault()}
                className="link link-light link-sm dropdown-indicator"
              >
                {data}
              </DropdownToggle>
              <DropdownMenu right className="dropdown-menu-sm">
                <ul className="link-list-opt no-bdr">
                  <li className={data === "Daily" ? "active" : ""}>
                    <DropdownItem
                      tag="a"
                      href="#dropdown"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setData("Daily");
                      }}
                    >
                      <span>Daily</span>
                    </DropdownItem>
                  </li>
                  <li className={data === "Weekly" ? "active" : ""}>
                    <DropdownItem
                      tag="a"
                      href="#dropdown"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setData("Weekly");
                      }}
                    >
                      <span>Weekly</span>
                    </DropdownItem>
                  </li>
                  <li className={data === "Monthly" ? "active" : ""}>
                    <DropdownItem
                      tag="a"
                      href="#dropdown"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setData("Monthly");
                      }}
                    >
                      <span>Monthly</span>
                    </DropdownItem>
                  </li>
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div> */}
        </div>
        <ul className="nk-top-products">
          {dataSet.map((item, idx) => (
            <li className="item" key={idx}>
              <div className="thumb">
                <img src={item.img} alt="" />
              </div>
              <div className="info">
                <div className="title">{item.name}</div>
                <div className="price">₹{item.price}</div>
              </div>
              <div className="total">
                <div className="amount">₹ {returnTotal(item.price, item.sold)}</div>
                <div className="count">{item.sold} Sold</div>
              </div>
            </li>
          ))}
        </ul>

        {/* <form>
           < a href={`${process.env.PUBLIC_URL}/product-list`}> <Button color="primary" onClick={() => history.push('')}>Click  to view  more products</Button> </a>
          </form> */}
        {/* <div className="pricing-action">
        <a a href={`${process.env.PUBLIC_URL}/prod-list`}><Button color="primary"> More Product</Button></a>
                      </div> */}
      </div>
      
    </Card>
  );
};



export default TopProducts;
