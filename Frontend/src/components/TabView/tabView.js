import React from "react";
import "./tabView.css";

export default function TabBarWithRender(props) {
  const { tabs, activeTab, handleActiveTab } = props;

  return (
    <>
    <hr></hr>
      <div className="tab-view">
        {tabs.map((tab, index) => (
          <div
            className={`${activeTab === index ? "tab-btn" : ""} TabButton `}
            key={index}
            onClick={() => {handleActiveTab(index);
          
            }}
          >
            <div className="title" active={activeTab === index}>
              {tab.title}
            </div>
            <div className="Indicator" active={activeTab === index} />
          </div>
        ))}
      </div>
      <div className="tab-body-container">{tabs[activeTab].render()}</div>
    </>
  );
}