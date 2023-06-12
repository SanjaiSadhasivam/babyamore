import React, { useEffect, useState } from "react";
import { Card, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, Modal, ModalBody } from "reactstrap";
import { productData, productDataSet2, productDataSet3, productDataSet4, productDataSet6 } from "./ProductData";
import axios from "axios";
import { API_URL, API_DASHBOARD, token } from '../../../../Api';
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
  RSelect
} from "../../../Component";
const API_Image = `${API_URL}/Product_image`

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const TopProducts = () => {
  const [data, setData] = useState([]);
  const [dataSet, setDataSet] = useState("");

  const [viewMonth, setViewMonth] = useState("");

  const [view, setView] = useState({
    add: false,
    Viewdetails: false,
  });

  useEffect(() => {
    Getdata();
  }, []);
  const Getdata = async () => {
    const Result = await axios.get(`${API_DASHBOARD}/top`, config);
    setData(Result.data.list.topseller)
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
            <h6 className="title">Top seller of this month</h6>
            <Button color="primary" type="" onClick={() => { toggle("ViewAllMonth"); }}>
              <span>View All</span>
            </Button>
          </div>
          <ul className="nk-top-products">
            {data.slice(0,5).map((item) => (
              <li className="item" >
                <div className="thumb">
                  <img src={`${API_Image}/${item.productimage}`} alt="prod.jpg" />
                </div>
                <div className="info">
                  <div className="title">{item.productname}</div>
                  <div className="price">₹ {item.regularprice}</div>
                </div>
                <div className="total">
                  <div className="amount">₹ {item.saleprice}</div>
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
            <h4 className="mb-3">Top seller of this month</h4>
              <Row>
               { data.map((item) => {
                  {/* // { console.log("item total", item.total) } */}
                   return ( 
                    <Col md="12">
                      <Row>
                        <Col md="3">
                          <img src={`${API_Image}/${item.productimage}`} alt="IMG.JPG" />
                        </Col>
                        <Col md="6">
                          <p>{item.productname}</p>
                          <p>₹ {item.regularprice}</p>
                        </Col>
                        <Col md="3">
                          <p>₹ {item.saleprice}</p>
                          <p> Sold</p>
                        </Col>
                      </Row>
                      <br></br>
                    </Col>
                   )
               }) }

               
              </Row>
            </>

          </div>
        </ModalBody>
      </Modal>
    </>
  );
};



export default TopProducts;
