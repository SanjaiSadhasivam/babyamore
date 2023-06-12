import React, { useState } from "react";

/**---------------------------------Packages------------------------------------------- */
import { useCookies } from "react-cookie";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

/**---------------------------------Components------------------------------------------- */
import SearchInput from "../../components/Search/search";

/**---------------------------------Css&Icons------------------------------------------- */
import { VscSearch } from "react-icons/vsc";
import "./MobileFooter.css";

const MobileFooter = ({ getCartItems, onClick, total_qty, total_items }) => {
  const [show, setShow] = useState(false);
  const [cookies] = useCookies();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="mx-auto justify-content-center text-center mobile-footer-main"
      >
        <div className="mobile-icons">
          <Link to="#" className="mobile-icon ">
            <i className="fa fa-bars" onClick={onClick}></i>
          </Link>
          <Link to="#" className="mobile-icon ">
            <i className="fa fa-shopping-basket" onClick={getCartItems}></i>
            <sup> {cookies.customer_id ? total_qty : total_items} </sup>
          </Link>

          <Link to="/wish-list" className="mobile-icon">
            <i className="fa fa-heart-o"></i>
          </Link>
          <Link to="#" className="mobile-icon">
            <i className="fa fa-search" onClick={handleShow}></i>
          </Link>
          {
            cookies.customer_id ?
              <>
                <Link to="/myaccount" className="mobile-icon">
                  <i className="fa fa-user-circle"></i>
                </Link>
              </> :
              <>
                <Link to="/login" className="mobile-icon">
                  <i className="fa fa-user-circle"></i>
                </Link>
              </>
          }

        </div>


      </div>
      {/* offcanvas for Inputbox top view start */}
      <div className="width100">
        <Offcanvas
          className="width100"
          show={show}
          onHide={handleClose}
          placement={"top"}
        >
          <Offcanvas.Header closeButton>
            {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="mt-2 search-view-ress">
              <SearchInput label={<VscSearch />} pholder="Keyword..." />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      {/* offcanvas for Inputbox top view end */}
    </>
  );
};

export default MobileFooter;
