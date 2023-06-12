import React, { useEffect, useState } from "react";
import { Badge, Button } from "reactstrap";
import { Card,  DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { productData, productDataSet2, productDataSet3, productDataSet4 } from "./ProductData";
import { useHistory } from "react-router-dom";
  

const TopProducts = () => {
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
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">Last 10 Days Statistics</h6>
          </div>
          <div className="card-tools">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"
                href="#toggle"
                onClick={(ev) => ev.preventDefault()}
                className="link link-light link-sm dropdown-indicator"
              >
              </DropdownToggle>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      
    </Card>
  );
};



export default TopProducts;
