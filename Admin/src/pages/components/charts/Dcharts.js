import React from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BackTo,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
  LineChartExample,
  Row,
  Col,
  BarChartExample,
  PieChartExample,
  DoughnutExample,
  PolarExample,
} from "../../../components/Component";
import {
  barChartData,
  barChartMultiple,
  barChartStacked,
  filledLineChart,
  solidLineChart,
  straightLineChart,
  doughnutChartData,
  polarChartData,
} from "./ChartData";

const Dcharts = () => {
  return (
    <React.Fragment>
      <Head title="Chart Js" />
      <Content page="component">
       

         

       

        <Block size="lg">
          
          <Row className="g-gs">
            
            
            <Col md={12}>
              <PreviewCard>
               
                <div className="nk-ck-sm">
                  <PolarExample data={polarChartData} />
                </div>
              </PreviewCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Dcharts;
