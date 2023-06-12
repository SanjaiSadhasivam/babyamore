import React, { useMemo } from "react";

/**---------------------------------Assets------------------------------------------- */
import image1 from "../../assets/images/blog/blog-3.jpg";
import image2 from "../../assets/images/blog/img-1.jpg";
import image3 from "../../assets/images/blog/img-2.jpg";
import image4 from "../../assets/images/blog/blog-4.jpg";

/**---------------------------------Packages----------------------------------------- */
import { Link, useNavigate, useParams } from "react-router-dom";

/**CRUD operation */
import axios from "axios";
import { API_URL, token } from "../../config/config";
import { useState } from "react";
import { useEffect } from "react";

const API_Blog = `${API_URL}/admin/blog`;
const API_Blog_Image = `${API_URL}/Blog_image`;

const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
let date = new Date();
let day = date.getDate();
let month = date.toLocaleDateString("en-us", { month: "short" });
let year = date.getFullYear();
let fullDate = `${day}.${month}.${year}.`;

export const BlogLeft = () => {
  const [count, setCount] = useState(1);
  const [toggleBtn, settoggleBtn] = useState(false);

  const [readMore, setReadMore] = useState(false);
  const [blogData, setBlogData] = useState([]);
  var totalss = 0;


  //Blog Cards data
  const data = [
    {
      link: "/blog-view",
      image: image1,
      header: "What Type Of Breast Pump Should You Choose?",
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

    // setBlogData(blogs.data.list.slice(0,3))
    totalss = blogs.data.list.length;
  };

  const list = Array.from({ length: blogData.length });


  const countOnPage = 8;

  const range = 2;

  const linksCount = Math.ceil(list.length / countOnPage);

  const [page, setPage] = useState(1);

  const rangeStart = useMemo(() => {
    const start = page - range;
    return start > 0 ? start : 1;
  }, [page]);

  const rangeEnd = useMemo(() => {
    const end = page + range;
    return end < linksCount ? end : linksCount;
  }, [page]);

  const pages = useMemo(() => {
    return Array.from({ length: rangeEnd }, (_, index) => index + 1).slice(
      rangeStart - 1
    );
  }, [rangeStart, rangeEnd]);

  const addnumber = () => {
    if (blogData.length <= 0) {
      setPage(page + 1);
    } else {
      // settoggleBtn(true)
      settoggleBtn(false);
    }
  };
  const setPagenations = (page) => {
    setPage(page + 1);
    setBlogData(blogData);
  };
  const navigate = useNavigate();
  const blogClick = (id) => {
    // localStorage.setItem("BlogId", id);

    navigate(`/blog-view/177`);
  };

  const { productId } = useParams();
  const thisProduct = blogData.find((prod) => prod.id === productId);
  return (
    <div className="row border-right col-md-9">
      {/* {list.slice((page - 1) * countOnPage, page * countOnPage).map((item)  */}
      {blogData
        .slice((page - 1) * countOnPage, page * countOnPage)
        .map((card) => (
          <div class="pagecolumn mt-4">
            <div class="blog_card">
              <div class="content">
                <Link to={`/blog-view/${card.ID}`}>
                  <div class="front">
                    <img
                      class="profile"
                      width="100%"
                      // src={card.image}
                      src={`${API_Blog_Image}/${card.blog_image}`}
                      alt=""
                    />
                    <div className="radius_tag">
                      <strong>{`${card.blog_ported_date
                        .substring(8, 10)
                        .split("-")}`}</strong>
                      <p className="text-center">{new Date(card.blog_ported_date).toLocaleDateString(
                          "en-US",
                          {
                            // day: "numeric",
                            month: "short",
                            // year: "numeric",
                          }
                        )}</p>
                    </div>
                    <h4>{card.blog_headLine}</h4>
                  </div>

                  <hr className="blog_hr" />
                  <p className="blog_para">{renderHTML(card.blog_summary)}</p>
                  {/* <span class="caption-text">{renderHTML(blog.blog_description)}</span> */}
                  <div class="back from-bottom">
                    <Link to="/blog-view">
                      <h4>{card.header}</h4>
                    </Link>
                    <p class="des">
                      {readMore ? (
                        <>{renderHTML(card.blog_description)}</>
                      ) : (
                        <>
                          {renderHTML(card.blog_description.substring(0, 100))}
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

      <div className="row mt-5 justify-content-center d-grid">
        <div className>
          {/* {list.slice((page - 1) * countOnPage, page * countOnPage).map((item) => {
        return <p key={item}>{item}</p>;
      })} */}
          <ul className="page-numbers nav-pagination links text-center d-flex pagination-sty">
            {pages.map((number) => {
              return (
                <li
                  aria-current="page"
                  className={number == page ? "activeButton" : ""}
                >
                  <a
                    className="page-number"
                    href="#"
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </a>
                </li>
              );
            })}

            {blogData.slice((page - 1) * page * countOnPage) != 0 ? (
              <li>
         
                {page > 4 ? (
                  <a
                    href="#"
                    className="next page-number"
                    disabled={toggleBtn}
                    onClick={() => setPage(page + 1)}
                    aria-hidden="true"
                  >
                    <i className="fa fa-angle-right" />
                  </a>
                ) : null}
              </li>
            ) : (
              ""
            )}

            {/* {
            blogData.slice((page - 1) * countOnPage, page * countOnPage) !=0 ? (<li>
            <a  href="#" className="next page-number" disabled={toggleBtn} onClick={()=>setPagenations(page)} aria-hidden="true">
              <i className="fa fa-angle-right"  />
            </a>
          </li> ) : ("")
          }  */}
          </ul>
        </div>
      </div>
    </div>
  );
};
