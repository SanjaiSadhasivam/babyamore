import React from "react";
import "./partition.css";

const Partition = ({
  dir,
  images,
  title,
  des,
  images1,
  img,
  imgId,
  divTextStyle,
  titleStyle,
  paraStyle,
  para,
  des2,
}) => {
  return (
    <div>
      <div className="program-of-reward row" dir={dir}>
        <div className="col-md-6 col-sm-6 col-xs-12 reward-pic">
          <img
            src={images}
            alt="refer"
            className="reward-img img-fluid "
            id={imgId}
          />
        </div>
        <div
          className="col-md-6 col-sm-6 col-xs-12 reward-text  "
          id={divTextStyle}
        >
          <h3 className={titleStyle}>{title}</h3>
          <p className="color" id={paraStyle}>
            {des}
          </p>
          {des2 ? (
            <p className="color" id={paraStyle}>
              {para}
            </p>
          ) : null}
          {img ? (
            <img
              src={images1}
              alt="water"
              className="reward-img-paint img-fluid"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Partition;
