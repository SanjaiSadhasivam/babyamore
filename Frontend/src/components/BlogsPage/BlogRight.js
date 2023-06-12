import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API_URL, token } from "../../config/config";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_Blog = `${API_URL}/admin/blog`;
const API_Blog_Image = `${API_URL}/Blog_image`;

const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const BlogRight = () => {
  const { id } = useParams();
  

  const [blogFilter, setBlogFilter] = useState([]);
  const [right, setRight] = useState([]);
  useEffect(() => {
    getRightData();
    nextState();
  }, [id]);

  const nextState = async () => {
    const { data } = await axios.get(`${API_Blog}`, configss);
    setBlogFilter(data.list);
  };

  const getRightData = async () => {
    const { data } = await axios.get(`${API_Blog}`, configss);
    let fliterRight = data.list.filter((currentEle) => currentEle.ID != id);
   
    // setRight(fliterRight);

    setRight(fliterRight.slice(0, 5));
  };

  return (
    <div className="col-md-3">
      <div className="blog_page_sidebar">
        <div className="blog_categories">
          <h5 className="BlogRighthead">The Talk</h5>
          <div className="divider" />
          {right?.length > 0 ? (
              <>  <ul id="blog_categories">
              {right.length > 0 &&
                right.map((values) => {
                  return (
                    <>
                  
                      <li class="BlogListhead">
                        <Link to={`/blog-view/${values.ID}`}>
                          {values.blog_headLine}
                        </Link>
                      </li>
                    </>
                  );
                })}
  
              {/* <li class="BlogListhead">
                <a href="#">
                  Why You Should Make the Switch to Open Cup Drinking for Your
                  Baby
                </a>
              </li>
              <li class="BlogListhead">
                <a href="#">How To Choose A Feeding Bottle For Your Baby</a>
              </li>
              <li class="BlogListhead">
                <a href="#">
                  Five Tips For Feeding Children Between Two and Five Years
                </a>
              </li>
              <li class="BlogListhead">
                <a href="#">How to boost immunity in children during winter?</a>
              </li> */}
            </ul></>):(<>No Records Found</>)
          }
        
        </div>
      </div>
    </div>
  );
};
