import React, { useEffect, useState } from "react";
import { BlogRight } from "../BlogsPage/BlogRight";
import image1 from "../../assets/images/blog/blog-3.jpg";
import "./blogView.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import SeoHelmet from "../SEOHelmetDetails/SeoHelmet";
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

const BlogView = () => {
  // const id = localStorage.getItem("BlogId");
  const { id } = useParams();
  const location = useLocation();
  const [blogView, setBlogView] = useState([]);
  const [prev, setPrev] = useState()
  const [next, setNext] = useState()

  const [blogFilter, setBlogFilter] = useState([])
  // const [metaDetails, setMetaDetails] = useState({
  //   Title: '',
  //   Description: '',
  // })

  useEffect(() => {
    blogViewData();
    nextState()
  }, [id]);

  const blogViewData = async () => {
    const { data } = await axios.get(`${API_Blog}/${id}`, configss);
    // const { result } = await axios.get(`${API_Blog}`, configss);
    // console.log("filterblogggg", data.list[0].blog_headLine)
    // setMetaDetails({
    //   Title: data.list[0].blog_headLine,
    //   Description: data.list[0].blog_description,
    // });
    setBlogView(data.list);
  };

  const nextState = async () => {
    const { data } = await axios.get(`${API_Blog}`, configss)
    let filterblog = data.list.filter((currEle) => currEle.ID != id);

    // setBlogFilter(filterblog)
    setBlogFilter(filterblog.slice(0, 2));

  }

  const goToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const blogClick = () => {
    alert("HAI");
  };

  return (
    <div>
      {/* <SeoHelmet meta={metaDetails} /> */}
      <div class="blog_card_section container mt-5">


        <div className="row col-md-12">

          {blogView.map((blogData) => {
            return (
              <div className="row border-right col-md-9">
                <div className="blog-head">
                  <h6>BLOG</h6>
                  {/* <h3>What Type Of Breast Pump Should You Choose?</h3> */}
                  <h3>{blogData.blog_headLine}</h3>

                  <hr />

                  {/* <p>POSTED ON <span style={{color: "#d26e4b"}}>SEPTEMBER 27, 2022</span> BY <span style={{color: "#d26e4b"}}> HAMEEDHUDEEN </span></p> */}

                  <p>
                    POSTED ON{" "}
                    <span style={{ color: "#d26e4b" }}>
                      {blogData.blog_ported_date}
                    </span>{" "}
                    BY{" "}
                    <span style={{ color: "#d26e4b" }}>
                      {" "}
                      {blogData.blog_author}{" "}
                    </span>
                  </p>
                </div>
                <div>
                  <img
                    src={`${API_Blog_Image}/${blogData.blog_image}`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="blog-des">
                  <p className="blog_para">
                    {renderHTML(blogData.blog_description)}
                  </p>
                  {/* <p>
                Moving entirely to solids and weaning your baby off breastmilk
                is an important milestone; both for you as a parent as well as
                for your little one. It can be an exciting and slightly
                apprehensive phase. Equipping yourself with the knowledge
                necessary to make the right choices for your baby’s weaning
                journey is the first step to success.</p>
                 <p> There is a range of
                essentials that can make this journey smooth. As your baby nears
                six months, you can slowly begin exploring the world of solid
                food with your little one. Essentials like reusable mats, bibs,
                and more are available to help mothers through this phase. Here
                are some aids you can use to make the world of solid food
                palatable, interesting and explorative for your baby!</p>
              
              <h3>High Chair</h3>
              <p>Babies are constantly distracted by everything around them. Feeding such bundles of curiosity can be quite a task especially when they aren’t used to the process. A high chair can provide an easy access and security for you to feed your baby while keeping the mess contained to one spot.</p>
              <p>When choosing a high chair, safety takes utmost priority. But safety needs to also be balanced with flexibility. Beaba Up&Down High Chair is a smart choice with its flexible six positions on any table or counter. The three-point safety harness keeps your baby stable while they’re eating.</p>
              <h3>Safe Cutlery for the Baby</h3>
              <p>Babies love to play with cutlery and are endlessly fascinated by spoons, forks and cups. Using attractive, yet safe cutlery can make mealtimes exciting and engaging. Ease of use is another aspect to consider when choosing cutlery suitable for babies. Organic, non-toxic material that is durable, environment friendly and safe would be some of the criteria to have in mind when finding cutlery for children to use.</p>
              <p>Tableware made from durable materials like the Avanchy Bamboo Training Fork  made from 100% biodegradable bamboo is a good option. They are non-toxic with a silicone tip and neck which make it easy for your baby to use without the danger of getting hurt. Dishes made from materials like Silicone provide good grip, are easy to clean and are non-toxic. EasyTots Mini Mat Silicone Suction Plate has strong suction that ensures the cup doesn’t move around easily. It also comes with a lid that deems it portable as an added convenience.</p>
              <h3>Bibs</h3>
              <p>Bibs can be life savers while feeding babies. Not only do they prevent the baby’s clothes from getting soiled, but the additional cloth absorbs liquid which prevents messes from flowing all over.  Feeding aprons, and bibs with space for holding liquid are some options available which can be explored.</p>
              <h3>Good-Quality Blender</h3>
              <p>Since your baby might still be developing teeth, a good quality blender is a must-have to make semi-solid food suitable for a baby’s developing body. You can also get creative and think of nutritious, balanced combinations like mixing lentils into a soup or blueberries with yoghurt to get your baby’s palette exposed to a wide range of tastes.</p>
              <h3>Storage Containers</h3>
              <p>It is hard to predict how much food a baby will eat at one time, so leftovers are something you will be dealing with. To avoid wastage, food containers like the B.box Insulated Food Jar can come in handy for food storage. The jar keeps the food insulated so the food remains fresh and is an ideal solution for carrying food too.</p>
              <p>As a parent, keeping your baby’s needs in mind is vital to ensure both you and your baby enjoy this phase of weaning. Arm yourself with information and stock your pantry with supplies for a hassle-free, engaging and safe feeding experience with your little one!</p>
              <p>After all, food is one of their first and most exciting new experiences in this phase, isn’t it? As a parent, you can make sure this phase of your baby’s life is loaded with nutrition, learning and lots of fun.</p>
               */}
                  <hr />
                </div>
                <hr style={{ marginTop: "4rem" }} />
                <small className="text-center mb-1 text-muted">
                  This entry was posted in{" "}
                  <span>
                    <Link to="/blog" style={{ color: "#d26e4b" }}>
                      Blog
                    </Link>
                  </span>
                  . Bookmark the{" "}
                  <span
                    style={{ color: "#d26e4b", cursor: "pointer" }}
                    onClick={goToTopButton}
                  >
                    {" "}
                    permalink
                  </span>{" "}
                  .
                </small>
                <hr
                  style={{
                    height: "3px",
                    margin: "auto",
                  }}
                />
                <div className="blog-qus">
                  <div className="blog-qus-1">
                    {" "}
                    <FaChevronLeft />{" "}
                  </div>
                  {blogFilter.length > 0 &&
                    blogFilter.map((values) => {
                      return (
                        <>
                  
                          <p className="blog-qus-1">
                            <Link to={`/blog-view/${values.ID}`}>
                              {values.blog_headLine}
                            </Link>
                          </p>
                        </>
                      );
                    })}


                  {/* 
                  {
                    blogFilter.length>0?
                    <>
                       <Link to={`/blog-view/${blogFilter[0].ID}`}>
                    {" "}
                    <p className="blog-qus-1">
                     {blogFilter[0].blog_headLine}
                    </p>{" "}
                  </Link>
                  <Link to={`/blog-view/${blogFilter[1].ID}`}>
                    {" "}
                    <p className="blog-qus-1">
                    {blogFilter[1].blog_headLine}
                    </p>{" "}
                  </Link>
                    </>:null
                  }
                */}
                  <div className="blog-qus-1">
                    {" "}
                    <FaChevronRight />{" "}
                  </div>
                </div>
                <hr style={{ marginTop: "2rem" }} />
              </div>
            );


          })}
          <BlogRight />
        </div>

      </div>
    </div>
  );
};

export default BlogView;
