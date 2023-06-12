import React, { useEffect, useState } from "react";

/**---------------------------------Icons----------------------------------------- */
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
/**---------------------------------Pages-------------------------------------------- */
import "./testimonial.css";

/**---------------------------------Pkg-------------------------------------------- */
import axios from "axios";
import { API_URL, token } from "../../config/config";

/**---------------------------------API & Configs-------------------------------------------- */
const API_Review_Get = `${API_URL}/admin/productlist/getCommentsData`;

const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Testiomonials = () => {
  const [showReview, setShowReview] = useState([]);
  const [avg, setAvg] = useState();
  useEffect(() => {
    showReviewsData();
  }, []);

  const showReviewsData = async (id) => {
    const reviewsData = await axios.get(`${API_Review_Get}`, configss);
  
    setShowReview(reviewsData.data.list);

    const total = reviewsData.data.list.reduce(
      (previousValue, currentValue, index) => {
        return previousValue + parseInt(currentValue.reviewrating);
      },
      0
    );
    const average = parseInt(total / reviewsData.data.list.length);
    // console.log("avg", avg);
    setAvg(average);
  };

  return (
    <div className="testimonial_section mx-3 mt-md-5 m-0">
      <div className="d-flex justify-content-between">
        <h3 className="section_title mb-4">What our customers say</h3>
      </div>
      <div style={{ position: "relative" }}>
        <hr className="title_border" />
        <hr className="hr_line" />
      </div>
      <div className="testimonial_container mt-3">
        <div className=" testimonial_area  textimonial_box">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row space-16">&nbsp;</div>
                <div className="row">
                  {showReview.slice(0, 3).map((review) => {
                    let { comments, full_name, reviewrating, Status } = review;
                    return (
                      <>
                      {Status === 1 ? (
                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                          <div className="thumbnail card w-100 h-100 card-design m-0">
                            {/* <div className="star-rating text-center">
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                        </div>
                                        <h4 id="thumbnail-label" style={{ textAlign: 'center' }}><i>Seriously impressed!</i></h4>
                                        <div className="thumbnail-description smaller" style={{ textAlign: 'center', marginBottom: 40, color: '#777', fontSize: '13px' }}><i>I am seriously
                                            impressed with Babyamore for delivering my order so quickly. Kudos team. So
                                            happy to have found a good seller for baby products</i>
                                        </div>
                                        <h4 id="thumbnail-label" style={{ textAlign: 'center' }}><b>Meenaakshi Venkhataraman</b></h4> */}
                            
                              <div>
                                <div className="star-rating text-center">
                                  {reviewrating < 2 && reviewrating > 0 ? (
                                    <>
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {reviewrating < 3 && reviewrating > 1 ? (
                                    <>
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {reviewrating < 4 && reviewrating >= 3 ? (
                                    <>
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {reviewrating < 5 && reviewrating >= 4 ? (
                                    <>
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />

                                      <AiOutlineStar
                                        style={{ color: "#ff6766" }}
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {reviewrating >= 5 ? (
                                    <>
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />

                                      <FaStar style={{ color: "#ff6766" }} />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {reviewrating == "NaN" || reviewrating < 1 ? (
                                    <>
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                      <FaStar style={{ color: "#ff6766" }} />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <h4
                                  id="thumbnail-label"
                                  style={{ textAlign: "center" }}
                                >
                                  {/* <i>Seriously impressed!</i> */}
                                </h4>
                                <div
                                  className="thumbnail-description smaller"
                                  style={{
                                    textAlign: "center",
                                    marginBottom: 40,
                                    color: "#777",
                                    fontSize: "13px",
                                  }}
                                >
                                  <i>{comments}</i>
                                </div>
                                <h4
                                  id="thumbnail-label"
                                  style={{ textAlign: "center" }}
                                >
                                  <b>{full_name}</b>
                                </h4>
                              </div>
                           
                          </div>
                        </div>
                         ) : null}
                      </>
                    );
                  })}
                </div>
                {/* <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="thumbnail card-design">
                                        <div className="star-rating text-center">
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                        </div>
                                        <h4 id="thumbnail-label" style={{ textAlign: 'center' }}><i>Never failed to deliver!</i>
                                        </h4>
                                        <div className="thumbnail-description smaller" style={{ textAlign: 'center', marginBottom: 25, color: '#777', fontSize: '13px' }}><i>I first came
                                            across Baby Amore in a pop-up conducted by Miniroo at Chennai. I was
                                            pregnant then. So I was looking to buy things for the baby’s arrival. I have
                                            to say I have been hooked on to them since then. I delivered during the peak
                                            of pandemic and lockdowns. But Baby Amore has never failed to deliver on
                                            time. Whatever my requirements were, they were always readily available and
                                            helped me out, answered my queries, and suggests products according to my
                                            requirement. My baby just completed 17 months now and our association with
                                            Baby Amore continues till date. Thank you Baby Amore.</i></div>
                                        <h4 id="thumbnail-label" style={{ textAlign: 'center' }}><b>Saindhavi Prakash</b> / Singer</h4>
                                    </div>
                                </div>
                                <div className=" col-lg-4 col-md-12 col-sm-12">
                                    <div className="thumbnail card-design">
                                        <div className="star-rating text-center">
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                            <AiFillStar className='rating' />
                                        </div>
                                        <h4 id="thumbnail-label" style={{ textAlign: 'center' }}><i>An amazing experience!</i>
                                        </h4>
                                        <div className="thumbnail-description smaller" style={{ textAlign: 'center', marginBottom: 40, color: '#777', fontSize: '13px' }}><i>From the
                                            service to their packaging and the products, it was overall an amazing
                                            experience. A special thanks to Ramya who made sure that all my doubts were
                                            resolved. Thankyou!</i></div>
                                        <h4 id="thumbnail-label" style={{ textAlign: 'center' }}><b>Sumreen Wani</b></h4>
                                    </div>
                                </div> */}
              </div>
              <div className="col-md-2">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testiomonials;
