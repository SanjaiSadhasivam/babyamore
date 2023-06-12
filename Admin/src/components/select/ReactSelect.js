import React from "react";
import Select from "react-select";

const RSelect = ({ ...props }) => {
  return (
    <div className="form-control-select">
      <Select
        className={` ${props.className ? "" : ""}`}
        classNamePrefix="react-select"
        {...props}
        isOptionDisabled={props.isOptionDisabled}
      />
    </div>
  );
};

export default RSelect;
