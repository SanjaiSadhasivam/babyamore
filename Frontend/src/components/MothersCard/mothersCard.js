import React from "react";
/**---------------------------------Pages-------------------------------------------- */
import "./mothersCard.css";

/**---------------------------------Components--------------------------------------- */
import Button from "../Button/button";

/**---------------------------------Icons-------------------------------------------- */
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const MothersCard = ({
  add,
  image,
  description,
  mrp,
  price,
  muted,
  button,
  addCart,
  select,
}) => {
  return (
    <div>
      <div className="custom_card mt-3">
        <div style={{ position: "relative" }} className="hover_card_img">
          <img src={image} alt="card-img" className="custom_card_img_mother" />
        </div>
        <div style={{ width: "100%" }}>
          <p className="custom_card_description_mother mt-2">{description}</p>
          <div className="custom_card_price d-flex">
            {muted ? (
              <p className="mrp_price text-muted">&#8377;&nbsp;{mrp}.00</p>
            ) : null}{" "}
            &nbsp;
            <p className="mother_card_price">&#8377;&nbsp;{price}.00</p>
          </div>
          <button className="mother_card_btn">{button}</button>
        </div>
        {/* <div className='mx-2 mt-2'>
        <Button
          add={add}
          addCart={addCart}
          select={select}
          className='card_add_btn mt-2'
        />
      </div> */}
      </div>
    </div>
  );
};

export default MothersCard;
