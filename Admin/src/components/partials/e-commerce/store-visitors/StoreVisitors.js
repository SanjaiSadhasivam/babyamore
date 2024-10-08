import React from "react";
import { Card } from "reactstrap";
import { Icon, TooltipComponent } from "../../../Component";
import { StoreVisitorsChart } from "../../charts/e-commerce/EcomCharts";

const StoreVisitors = () => {
  return (
    <Card className="h-100">
      <div className="nk-ecwg nk-ecwg5">
        <div className="card-inner">
          <div className="card-title-group align-start pb-3 g-2">
            <div className="card-title">
              <h6 className="title">Top Vendors</h6>
            </div>
            <div className="card-tools">
              <TooltipComponent
                id="vistorsTooltip"
                icon="help"
                iconClass="card-hint"
                text="Users of this month"
                direction="left"
              />
            </div>
          </div>
          <div className="data-group">
            <div className="data">
              <div className="title">SR Pvt</div>
              <div className="amount amount-sm">9.28K</div>
              <div className="change up">
                <Icon name="arrow-long-up"></Icon>43%
              </div>
            </div>
            <div className="data">
              <div className="title">SV Pvt</div>
              <div className="amount amount-sm">2.69K</div>
              <div className="change down">
                <Icon name="arrow-long-down"></Icon>19%
              </div>
            </div>
            <div className="data">
              <div className="title">Daily (Avg)</div>
              <div className="amount amount-sm">1.94K</div>
              <div className="change up">
                <Icon name="arrow-long-up"></Icon>35%
              </div>
            </div>
          </div>
          <div className="nk-ecwg5-ck">
            <StoreVisitorsChart />
          </div>
          <div className="chart-label-group">
            <div className="chart-label">01 Jul, 2020</div>
            <div className="chart-label">30 Jul, 2020</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default StoreVisitors;
