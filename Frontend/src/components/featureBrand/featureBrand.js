import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
/**---------------------------------Assets------------------------------------------- */
import image1 from "../../assets/images/client/image (24).jpg";
import image2 from "../../assets/images/client/image (10).jpg";
import image3 from "../../assets/images/client/image (22).jpg";
import image4 from "../../assets/images/client/image (21).jpg";
import image5 from "../../assets/images/client/image (25).jpg";
import image6 from "../../assets/images/client/image (2).jpg";

/**---------------------------------Packages----------------------------------------- */
import { Link } from "react-router-dom";

/**---------------------------------Pages-------------------------------------------- */
import "./featureBrand.css";

/**---------------------------------Icons-------------------------------------------- */
import { BsStar } from "react-icons/bs";
import { MdChevronRight } from "react-icons/md";

import { API_URL, API_Brand, token } from "../../config/config";
import Loading from "../LazyLoading/Loading";
const API_Brand_Image = `${API_URL}/Brand_view`;
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const FeatureBrand = () => {
  const [Menus, setMenus] = useState([]);
  useEffect(() => {
    GetdataMenu();
  }, []);
  const GetdataMenu = async () => {
    const { data } = await axios.get(`${API_Brand}`, configss);
    // console.log("brand data 1", data);
    setMenus(
      data.list.filter((ss) => ss.featured_brand_status === 1).slice(0, 6)
    );
  };
  // console.log("menus", Menus);
  return (
    <>
      <div className="feature_brand_section">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start align-items-center">
            <BsStar className=" title_icon" />
            <h3 className="section_title">Featured Brands</h3>
          </div>
          <div className="">
            <Link
              to="/"
              className="d-flex justify-content-start align-items-center"
            >
              <h3 className="see_title">See all Brands</h3>
              <MdChevronRight className="arrow_icon " />
            </Link>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <hr className="title_border" />
          <hr className="hr_line" />
        </div>
        <div className="brands_image_section">
          {Menus?.length > 0 ? (
            <>
              <div className="flex-container row">
                {/* {console.log("data brand_logo", Menus)} */}

                {Menus.map((data) => (
                  <>
                
                    <div className="flex-item mt-3 col-md-2 col-4">
                      <div className="feature_brand">
                        <NavLink
                          // to={`/brand/${data.name}/${data.id}`}
                          to={`/brand/${data.slug != "" ? data.slug?.trim().replaceAll(' ', '-') || '' : data.name?.trim().replaceAll(' ', '-')}/${data.id}`}
                        >

                          <img
                            src={`${API_Brand_Image}/${data.brand_logo}`}
                            alt={data.name}
                            className="img-fluid-future img-fluid"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
        </div>
      </div>
    </>
  );
};
