import React from "react";
import { Doughnut } from "react-chartjs-2";

const Knob = ({ data, type, centerText }) => {
  return (
    <div className="nk-iv-wg511">
      <Doughnut
        data={data}
        options={{
          legend: {
            display: false,
          },
          rotation: 1 * Math.PI,
          circumference: type === "half" ? 1 * Math.PI : 2 * Math.PI,
          cutoutPercentage: 93,
          maintainAspectRatio: true,
          hover: false,
          tooltips: {
            enabled: false,
          },
        }}
      />
      <div className={`nk-iv-wg511-ck-result ${type === "full" ? "pb-4" : ""}`}>
        <div className="text-lead" style={{position:"relative",top:"14px"}}>{centerText}</div>
      </div>
    </div>
  );
};

export default Knob;
