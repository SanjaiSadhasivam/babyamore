import React, { useEffect, useState } from "react";
import { Badge, Button } from "reactstrap";
import { Card, Modal, ModalBody } from "reactstrap";
import { productData, productDataSet2, productDataSet3, productDataSet4, productDataSet5, productDataSet7 } from "./ProductData";
import {
  Icon,
  Row,
  Col,
} from "../../../Component";
import axios from "axios";
import { API_URL, API_DASHBOARD, token } from '../../../../Api';

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API_Image = `${API_URL}/Product_image`

const Vendors = () => {
  const [data, setData] = useState([]);
  const [dataSet, setDataSet] = useState([]);


  // const [outOfStock, setOutofStock] = useState(productDataSet7);
  const [view, setView] = useState({
    add: false,
    Viewdetails: false,
  });
  useEffect(() => {
    Getdata();
  }, []);
  const Getdata = async () => {
    const Result = await axios.get(`${API_DASHBOARD}/top`, config);
    setData(Result.data.list.outofstock)
    };

  const returnTotal = (n1, n2) => {
    var result = n1 * Number(n2);
    return result.toFixed(2);
  };
  const onFormCancel = () => {
    setView({ add: false });
  };

  const toggle = (type) => {
    setView({
      add: type === "ViewAllMonth" ? true : false,
    });
  };
  return (
    <>
      <Card className="h-100">
        <div className="card-inner">
          <div className="card-title-group mb-2 d-flex justify-content-between">
            <h6 className="title">Out of stock products </h6>
            <Button color="primary" type="" onClick={() => { toggle("ViewAllMonth"); }}>
              <span>View All</span>
            </Button>
          </div>
          <ul className="nk-top-products">
            {data.slice(0,5).map((item, idx) => (
              <li className="item" key={idx}>
                <div className="thumb">
                <img src={`${API_Image}/${item.productimage}`} alt="IMG.JPG" />
                </div>
                <div className="info">
                  <div className="title">{item.productname}</div>
                  <div className="price">₹{item.regularprice}</div>
                </div>
                <div className="total">
                  <div className="amount"> ₹{item.saleprice}</div>
                  <div className="count"> Sold</div>
                </div>
              </li>
            ))}
          </ul>


        </div>

      </Card>
      <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a className="close">
            {" "}
            <Icon
              name="cross-sm"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
            ></Icon>
          </a>
          <div className="p-2">
            <>
              <h4 className="mb-3">Out of stock products</h4>
              <Row>
                {data.map((item) => {
                  // { console.log("item total", item.total) }
                  return (
                    <Col md="12">
                      <Row>
                        <Col md="3">
                        <img src={`${API_Image}/${item.productimage}`} alt="IMG.JPG" />
                        </Col>
                        <Col md="6">
                          <p>{item.productname}</p>
                          <p>₹{item.regularprice}</p>
                        </Col>
                        <Col md="3">
                          <p>₹ {item.saleprice}</p>
                          <p>Sold</p>
                        </Col>
                      </Row>
                      <br></br>
                    </Col>

                  )

                })}
              </Row>
            </>

          </div>
        </ModalBody>
      </Modal>
    </>
  );
};



export default Vendors;
