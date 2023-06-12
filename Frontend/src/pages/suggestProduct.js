import React from "react";
import "../assets/styles/suggestProduct.css";
import image from "../assets/images/suggest/bottle-image1.jpg";

const SuggestProduct = () => {
  return (
    <>
      <div className="product-suggest-head">
        <h6 className="color">BRAND/PRODUCT SUGGESTION</h6>
        <h2>Suggest a product that you’d like to see on Baby Amore.</h2>
        <p className="color">
          Need a product that is not available in India? Or want us to bring in
          a brand that you love? Send us your opinions/suggestions.
        </p>
        <p className="color">We’d be happy to bring them to your reach.</p>
      </div>
      <div className="row suggest-container">
        <div className="col-md-5 col-xs-12">
          <img
            src={image}
            alt="bottle"
            className="suggest-img img-fluid"
            //   style={{ width: "550px", height: "530px" }}
          />
        </div>
        <div className="product-suggest-form col-md-7 col-xs-12">
          <form>
            <div className="form-group full-form">
              <input
                className="form-control form-size "
                id="name"
                type="text"
                name="Name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group full-form">
              <input
                className="form-control form-size "
                id="name"
                type="text"
                name="Name"
                placeholder="Your Mobile Number"
                required
              />
            </div>
            <div className="form-group full-form">
              <input
                className="form-control form-size"
                id="email"
                type="email"
                name="Email"
                placeholder="Your Email Address"
                required
              />
            </div>
            <div className="form-group full-form">
              <textarea
                className="form-control form-size"
                rows="4"
                id="message"
                name="Message"
                placeholder="What Brand/Product do you want us to sell? "
                required
              ></textarea>
            </div>
            <input className="btn form-btn" type="submit" value="SEND" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SuggestProduct;
