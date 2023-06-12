import React, { useState } from "react";

/**---------------------------------Packages----------------------------------------- */
import { Link } from "react-router-dom";

/**---------------------------------Pages-------------------------------------------- */
import "./button.css";



//button properties make props


function Button({
  color,
  text,
  type,
  icon_tab,
  icon,
  addCart,
  select,
  textColor,
  leftRadius,
  add,
  rightRadius,
  border,
  fontSize,
  className,
  onClick,
  ...others
}) {



  const [show, setShow] = useState(false)


  const handleClick = () => {
    alert("hi")
    setShow(true)
  }
  return (
    <>
      <button
        style={{
          backgroundColor: color,
          color: textColor,
          border,
          fontSize,
          borderTopLeftRadius: leftRadius,
          borderTopRightRadius: rightRadius,
          ...others,

        }}
        type={type}
        className={className}
      >{text}
        {icon_tab ? (
          <>
            {/* <span onClick={handleClick}></span>      */}

            <span data-bs-toggle="modal" tabindex="-1" data-bs-target="#exampleModal" aria-label="Close" >
              QUICK VIEW
            </span>

          </>
        ) : (
          <>{add ? (
          <p className='add_btn'>{addCart}</p>
          ) :
           <p className='add_btn'>{select}</p>
          }</>
        )}
      </button>




    </>
  );
}
export default Button;
