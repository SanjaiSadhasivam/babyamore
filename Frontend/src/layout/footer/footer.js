import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import { RiTrademarkFill } from "react-icons/ri";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SocialIcon } from "../../components/SocialIcons/socialIcon";
import image1 from "../../assets/images/footer/The-Economic-Times.png";
import image2 from "../../assets/images/footer/inc.png";
import image3 from "../../assets/images/footer/your-story.png";
import image4 from "../../assets/images/footer/ceo.png";
import image5 from "../../assets/images/footer/businessline.png";
import image6 from "../../assets/images/footer/Business-Fame-.png";

export const Footer = () => {
  const scrollTo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <footer class="section bg-footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="">
                <h6 class="footer-heading text-uppercase">
                  Baby Product Categories
                </h6>
                <ul class="list-unstyled footer-link mt-4">
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Baby Diapers
                    </Link>
                  </li>
                  <li>
                    <Link to="">Baby Wipes</Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Baby Cream &amp; Powder
                    </Link>
                  </li>
                  <li>
                    <Link to="">Baby Feeding</Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Baby Skin &amp; Hair Care
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Baby Oral Care
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Toys
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Clothing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="">
                <h6 class="footer-heading text-uppercase">
                  Parenting Product Categories
                </h6>
                <ul class="list-unstyled footer-link mt-4">
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Breast Pumps{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Diaper Bags
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Feminine Wash
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Maternity Wipes
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Creams &amp; Ointments for Moms
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={scrollTo}>
                      Pads for Moms
                    </Link>
                  </li>
                </ul>
              </div>
              <div class="">
                <h6 class="footer-heading text-uppercase">Parenting</h6>
                <ul class="list-unstyled footer-link mt-4">
                  <li>
                    <Link to="/blog" onClick={scrollTo}>
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link to="/mothers-journey" onClick={scrollTo}>
                      Mother’s Journey
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="">
                <h6 class="footer-heading text-uppercase ">
                  Know About Baby Amore
                </h6>
                <ul class="list-unstyled footer-link mt-4">
                  <li>
                    <Link to="/about-us" onClick={scrollTo}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="./contactus" onClick={scrollTo}>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/reward-program" onClick={scrollTo}>
                      Reward program
                    </Link>
                  </li>
                  <li>
                    <Link to="/influencer" onClick={scrollTo}>
                      Are You an Influencer?
                    </Link>
                  </li>
                  <li>
                    <Link to="/product-brand-partnerships" onClick={scrollTo}>
                      Product/Brand Partnerships
                    </Link>
                  </li>
                  <li>
                    <Link to="/suggest-product" onClick={scrollTo}>
                      Suggest a Product
                    </Link>
                  </li>
                </ul>
              </div>
              <div class="">
                <h6 class="footer-heading text-uppercase " onClick={scrollTo}>
                  Need Help?
                </h6>
                <ul class="list-unstyled footer-link mt-4">
                  <li>
                    <Link to="/frequently-asked-questions" onClick={scrollTo}>
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions" onClick={scrollTo}>
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" onClick={scrollTo}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/shipping-policy" onClick={scrollTo}>
                      Shopping Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cancellation-and-return-policy"
                      onClick={scrollTo}
                    >
                      Cancellation and Return Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="">
                <h6 class="footer-heading text-uppercase" onClick={scrollTo}>
                  Featured On
                </h6>
                <div class="mt-3">
                  <img
                    src={image1}
                    alt="feature-img"
                    className="footer_feature_img mb-4"
                  />
                  <img
                    src={image2}
                    alt="feature-img"
                    className="footer_feature_img mb-4"
                  />
                  <img
                    src={image3}
                    alt="feature-img"
                    className="footer_feature_img mb-4"
                  />
                  <img
                    src={image4}
                    alt="feature-img"
                    className="footer_feature_img mb-4"
                  />
                  <img
                    src={image5}
                    alt="feature-img"
                    className="footer_feature_img mb-4"
                  />
                  <img
                    src={image6}
                    alt="feature-img"
                    className="footer_feature_img mb-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5 mb-3">
          <div className="cash_cards">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcMastercard />
          </div>
          <p class="footer-alt mb-0 mt-3 f-14">
            Copyright 2022 &copy;{" "}
            <strong>
              Baby Amore
              <sup className="r_mark">
                <AiOutlineTrademarkCircle />{" "}
              </sup>
            </strong>
          </p>
          <p class="footer-alt">
            Baby Amore{" "}
            <sup>
              <RiTrademarkFill />
            </sup>{" "}
            is a registered trademark
          </p>
        </div>
        <SocialIcon />
      </footer>
    </>
  );
};