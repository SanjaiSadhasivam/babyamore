import React from "react";

/**---------------------------------Pages-------------------------------------------- */
import "./BlogsPage.css";
import { BlogLeft } from "./BlogLeft";
import { BlogRight } from "./BlogRight";

export const BlogsPage = () => {
  return (
    <>
      <div class="blog_card_section container mt-5">
        <div className="row col-md-12">
          <BlogLeft />
          <BlogRight />
        </div>
      </div>
    </>
  );
};
