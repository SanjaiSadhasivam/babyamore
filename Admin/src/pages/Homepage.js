import React, { useEffect, useState, forwardRef } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import TopProducts from "../components/partials/default/top-products/TopProducts";
import Vendors from "../components/partials/default/top-products/Vendors";
import CustomerTop from "../components/partials/default/top-products/CustomerTop";

import AudienceOverview from "../components/partials/e-commerce/average-order/AudienceOverview";
import DataCard from "../components/partials/default/DataCard";
import axios from "axios";

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
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";
import DeliveryShipment from "./pre-built/deliveryShipment";
import { API_URL, API_DASHBOARD, token } from '../Api';
const API_Image = `${API_URL}/Product_image`
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Homepage = () => {
  const [data, setData] = useState({
    dailysale:"",
    monthlysale:"",
    neworders:"",
    outofstock:"",
  });


  useEffect(() => {
    Getdata();
  }, []);
  const Getdata = async () => {
    const Result = await axios.get(`${API_DASHBOARD}`, config);
    const datas=Result.data.list
    setData({
      ...data,
      dailysale:datas.dailysale[0].dailysale,
      monthlysale:datas.monthlysale[0].TotalMonthlysale,
      neworders:datas.neworders[0].neworders, 
      outofstock:datas.outofstock[0].outofstock,
    })
  };

  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 {sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div style={{width:"200px"}}>
                        <RSelect
                          options={[
                            { value: "Last 30 days", label: "Last 30 days" },
                            { value: "Last 6 months", label: "Last 6 months" },
                            { value: "Last 3 weeks", label: "Last 3 weeks" },
                          ]}
                          // defaultInputValue="Last 30 days"
                          placeholder="Last 30 days"
                        />
                      </div>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
       {data?
        <Block>
          <Row className="g-gs" >
            <Col xxl="3" sm="3" lg="3">
              <DataCard
                title="MONTHLY SALES"
                percentChange={"13"}
                up={true}
                // chart={<DefaultOrderChart />}
                amount={<a a href={`${process.env.PUBLIC_URL}/order-data`}>{data.monthlysale}</a>}
              />
            </Col>
            <Col xxl="3" sm="3" lg="3">
              <DataCard
                title="DAILY SALES"
                // chart={<DefaultRevenueChart />}
                amount={< a href={`${process.env.PUBLIC_URL}/order-data`}>{data.dailysale}</a>}
              />
            </Col>
            <Col xxl="3" sm="3" lg="3">
              <DataCard
                title="NEW ORDERS"
                percentChange={"23"}
                up={true}
                // chart={<DefaultCustomerChart />}
                amount={< a href={`${process.env.PUBLIC_URL}/order-data`}>{data.neworders} </a>}
              />
            </Col>
            <Col xxl="3" sm="3" lg="3">
              <DataCard
                title="LOW STOCK PRODUCTS"
                percentChange={"16"}
                up={true}
                // chart={<DefaultCustomerChart />}
                amount={< a href={`${process.env.PUBLIC_URL}/prod-list`}>{data.outofstock} </a>}
              />
            </Col>


            <Col xxl="6" md="8" lg="6">
              <TopProducts />
            </Col>
            <Col xxl="6" md="8" lg="6">
              <Vendors />
            </Col>
          </Row>
        </Block>:null}
      </Content>
      <DeliveryShipment />
    </React.Fragment>
  );
};
export default Homepage;
