import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";

import OrderPages from "../components/partials/e-commerce/average-order/OrderPages";

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
} from "../components/Component";
import Status4 from "../components/partials/default/Status4";


const OrdersList4 = () => { 
  const [sm, updateSm] = useState(false);
  const [isOpen, setIsOpen] = useState("1");
  return (
    <React.Fragment>
      <Head title="Orders Details"></Head>
      <Content>
        <Block>
          <Row>
            <Col lg={8}>
            <Status4 />
                    
           </Col>
            <Col lg={4}>
              <OrderPages />
            </Col>
          </Row> 
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default OrdersList4;
