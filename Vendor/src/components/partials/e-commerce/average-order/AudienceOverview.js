import React, { useState } from "react";
import { Card } from "reactstrap";
import DataCard from "../../default/DataCard";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon, Col, Row } from "../../../Component";
import { withTheme } from "styled-components";

const AudienceOverview = () => {

  const [auOverview, setAuOverview] = useState("month-1");
  return (

    <React.Fragment>
      <Card className="h-100">
        <div className="card-inner">
      <div className="card-title-group pb-3 g-2" >
        <div className="card-title">
          <h6 className="title">Payments</h6>
        </div>
      </div>
      <Row>
        <Col xxl="6" sm="6">
              <DataCard
                title="Today Sale Value"
                // percentChange={"19"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>0.00</a>}
              />
        </Col>
        <Col xxl="6" sm="6">
              <DataCard
                title="Total Sale Value"
                // percentChange={"19"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>56,064.00</a>}
              />
        </Col>
        <Col xxl="6" sm="6">
              <DataCard
                title="Total Payout Amount"
                // percentChange={"19"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>11,679.27</a>}
              />
        </Col>
        <Col xxl="6" sm="6">
              <DataCard
                title="Pending Payment Amount"
                // percentChange={"19"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={  < a href={`${process.env.PUBLIC_URL}/merchant-list`}>1,641.84</a>}
              />
        </Col>
      </Row>
      </div>
      </Card>
    </React.Fragment>
  );
};
export default AudienceOverview;
