import React, { useEffect, useState } from "react";

/**---------------------------------Assets------------------------------------------- */
import image1 from "../../assets/images/blog/blog-3.jpg";
import image2 from "../../assets/images/blog/img-1.jpg";
import image3 from "../../assets/images/blog/img-2.jpg";
import image4 from "../../assets/images/blog/blog-4.jpg";

/**---------------------------------Packages----------------------------------------- */
import { Link } from "react-router-dom";

/**---------------------------------Icons-------------------------------------------- */
import { MdChevronRight } from "react-icons/md";

/**---------------------------------Pages-------------------------------------------- */
import "./blog.css";
import axios from "axios";
import { API_URL, token } from "../../config/config";

const API_Blog = `${API_URL}/admin/blog`;
const API_Blog_Image = `${API_URL}/Blog_image`;

const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const Blog = () => {
  const [toggleBtn, settoggleBtn] = useState(false);

  const [readMore, setReadMore] = useState(false);
  const [blogData, setBlogData] = useState([]);
  var totalss = 0;
 
  //Blog Cards data
  const data = [
    {
      link: "/blog-view",
      image: image1,
      header: "What Type Of Breast Pump Should You Choooooooooose?",
      para: "Once you have a baby, there are many decisions you need to make for their healthy and safe upbringing. WhileWhile the baby’s comfort is paramount, a new mother’s convenience is equally important. Nursing a child is not always as easy as it sounds. As a mother, you will juggle multiple things like caring for your baby, family and even yourself.",
      date: "10",
      month: "Aug",
    },
    {
      link: "/blog-view",
      image: image2,
      header: "What Is A Diaper Rash? Causes, Precaution And Remedies",
      para: "Diaper rashes are a common occurrence in babies. They result from friction and irritation caused between the diaper and the skin. It is crucial to recognize that several other factors may cause a diaper rash. Do not panic if your baby develops it. A diaper rash is treatable, and you can also prevent it.",
      date: "2",
      month: "Sep",
    },
    {
      link: "/blog-view",
      image: image3,
      header: "How To Prepare A Hospital Bag: A Comprehensive Checklist",
      para: "When you enter your third trimester, the excitement of welcoming your baby tends to set in. You may start preparations by designing the nursery to welcome your newborn. Around the same time, it is essential to pack and prepare your hospital bag with all the necessary items that you may require before, during and after labour.",
      date: "23",
      month: "Mar",
    },
    {
      link: "/blog-view",
      image: image4,
      header:
        "Why You Should Make the Switch to Open Cup Drinking for Your Baby ",
      para: "At six months, several changes occur in a baby. They start teething and are gradually making a switch to solid foods. They pick up several table etiquettes when they are six months to a year old. Apart from teaching them how to eat, it is equally important to introduce to them the concept of an open cup.",
      date: "8",
      month: "Dec",
    },
  ];

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    const blogs = await axios.get(`${API_Blog}`, configss);
    
    setBlogData(blogs.data.list);

    setBlogData(blogs.data.list.slice(0, 4));
    totalss = blogs.data.list.length;
  };
  return (
    <>
      <div class="blog_card_section mt-5 mx-3">
        <div className="controls">
          <h3 className="section_title text-center">Right from the blog</h3>
          <div className="d-flex align-items-center">
            <Link
              to="/blog"
              className="d-flex justify-content-start align-items-center"
            >
              <h3 className="see_title">Go to Blog</h3>
              <MdChevronRight className="arrow_icon" />
            </Link>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <hr className="title_border" />
          <hr className="hr_line" />
        </div>
        <div className="row ">
          {blogData.map((card) => (
            <div class="column">
              <div class="blog_card">
                <div class="content">
                  <Link to={`/blog-view/${card.ID}`}>
                    <div class="front">
                      <img
                        class="profile"
                        width="100%"
                        src={`${API_Blog_Image}/${card.blog_image}`}
                        alt={card.blog_headLine}
                      />
                      <div className="radius_tag">
                        <strong>{`${card.blog_ported_date
                          .substring(8, 10)
                          .split("-")}`}</strong>
                        <p className="text-center">{`${card.blog_ported_date
                          .substring(5, 7)
                          .split("-")}`}</p>
                      </div>
                      <h4>{card.blog_headLine}</h4>
                    </div>

                    <hr className="blog_hr" />
                    <p className="blog_para">{card.para}</p>
                    <div class="back from-bottom">
                      <h4>{card.header}</h4>

                      <p class="des" >
                        {readMore ? (
                          <>{renderHTML(card.blog_description)}</>
                        ) : (
                          <>
                            {renderHTML(
                              card.blog_description
                            )}
                          </>
                        )}
                        <span
                          onClick={() => setReadMore(!readMore)}
                          style={{ float: "right" }}
                        >
                          {readMore ? "show less" : "Read more..."}
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
