import React from "react";
import image from "../assets/images/partnership/mother-keeps-baby.jpg";
import "../assets/styles/productBrandPartnerships.css";

const ProductBrandPartnerships = () => {
  return (
    <div>
      <div className="container">
        <section style={{ textAlign: "center", margin: 0 }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "600",
              color: "#555",
              width: "100%",
              marginTop: 30,
              marginBottom: "0.5em",
              textRendering: "optimizeSpeed",
              fontFamily: '"Source Sans Pro", sans-serif!important',
            }}
          >
            Partnership Enquiry
          </h1>
          <div className="is-divider1" style={{ marginTop: 22 }} />
        </section>
        <div className="enquiry-head-text">
          <h5>Partnership Enquiry</h5>
          <p>
            Have a great product related to pregnancy and newborns? Is the
            product eco friendly, premium or organic and completely safe for the
            mother and the little ones to use? If yes, we’d love to partner with
            you. Please fill in the details and we will reach out to you….
          </p>
          <br />
          <p>
            “It is a smile of a <strong>baby</strong> that makes life worth
            living.”
          </p>
        </div>
        <div className="enquiry-page-img">
          <div>
            <img src={image} alt="mombaby" className="mom-and-baby" />
          </div>

          <div className="enquiry-form-card">
            <form>
              <div className="form-group enquiry-form ">
                <label for="name">Company Name (required)</label>
                <input
                  className="form-control enquiry-form-text"
                  id="name"
                  type="text"
                  name="Name"
                />
              </div>
              <div className="form-group enquiry-form">
                <label for="name">Brand (required)</label>
                <input
                  className="form-control enquiry-form-text "
                  id="name"
                  type="text"
                  name="Name"
                />
              </div>
              <div className="form-group enquiry-form">
                <label for="name">Product Category (required)</label>
                <select
                  name="country"
                  id=""
                  className="form-control enquiry-form-text"
                >
                  <option value="Diapers&Wipes" className="enquiry-form-drop">
                    Diapers & Wipes
                  </option>
                  <option
                    value="Baby food & Formula"
                    className="enquiry-form-drop"
                  >
                    Baby food & Formula
                  </option>
                  <option value="Maternity" className="enquiry-form-drop">
                    Maternity
                  </option>
                  <option
                    value="Feeding & Mealtime Essentials"
                    className="enquiry-form-drop"
                  >
                    Feeding & Mealtime Essentials
                  </option>
                  <option value="Toys & Outdoor" className="enquiry-form-drop">
                    Toys & Outdoor
                  </option>
                  <option
                    value="Home & Furniture"
                    className="enquiry-form-drop"
                  >
                    Home & Furniture
                  </option>
                  <option value="Gifts" className="enquiry-form-drop">
                    Gifts
                  </option>
                  <option value="Others" className="enquiry-form-drop">
                    Others
                  </option>
                </select>
              </div>

              <div className="form-group enquiry-form ">
                <label for="name">Contact Person Name (required)</label>
                <input
                  className="form-control enquiry-form-text"
                  id="name"
                  type="text"
                  name="Name"
                />
              </div>
              <div className="form-group enquiry-form">
                <label for="name">Contact Person Number (required)</label>
                <input
                  className="form-control enquiry-form-text "
                  id="name"
                  type="number"
                  name="Name"
                />
              </div>
              <div className="form-group enquiry-form">
                <label for="name">Contact Person Email (required)</label>
                <input
                  className="form-control enquiry-form-text"
                  id="email"
                  type="email"
                  name="Email"
                />
              </div>
              <div className="form-group enquiry-form">
                <label for="name">Your Message</label>
                <textarea
                  className="form-control enquiry-form-text"
                  rows="4"
                  id="message"
                  name="Message"
                ></textarea>
              </div>
              <div className="text-center">
                <input
                  className="btn enquiry-btn "
                  type="submit"
                  value="SEND"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBrandPartnerships;
