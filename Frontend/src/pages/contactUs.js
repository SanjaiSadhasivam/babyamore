import React from "react";
import "../assets/styles/contactUs.css";
import { BiBuildingHouse, BiMessageRoundedDots } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <>
      <section>
        <h1 className="TermHead">Contact Us</h1>
        <div className="is-divider1" />
      </section>

      <div className="container">
        <div className="row form-row">
          <div className="col-md-8 form-box">
            <form>
              <div className="form-group">
                <label for="name">Your Name (required)</label>
                <input
                  className="form-control form-box-border"
                  id="name"
                  type="text"
                  name="Name"
                />
              </div>
              <div className="form-group">
                <label for="email">Your Email (required)</label>
                <input
                  className="form-control form-box-border"
                  id="email"
                  type="email"
                  name="Email"
                />
              </div>
              <div className="form-group">
                <label for="message">Your Message (required)</label>
                <textarea
                  className="form-control form-box-border" rows="4"
                  id="message"
                  name="Message"
                ></textarea>
              </div>
              <input className="btn btn-click" type="submit" value="Submit" />
            </form>
          </div>
        
          <div className="col-md-4  office-contact-details">
            <div className="contact-page-icon">
              <BiBuildingHouse />
              
            </div>
            <div className="contact-page-text">
                <h4>Head Office</h4>
                <h6>West Star Retail and Trading Private Limited</h6>
                <p>Office No 2B, Apex Plaza, 2nd Floor No 3 Uthamar<br /> Gandhi, Anna Salai, Nungambakkam, Chennai,<br /> Tamil Nadu 600034</p>
            </div>
            <div className="contact-page-icon-2">
              <BsFillTelephoneFill />
              <BiMessageRoundedDots />
            </div>
            <div className="contact-page-text">
                <h4>Phone</h4>
                <p>Landline: 044 48514937 <br />
                    Mobile: +91 96976 12222</p>
            </div>

            <div className="contact-page-icon-3">
              <MdEmail />
            </div>
            <div className="contact-page-text">
                <h4>Email</h4>
                <p className="mail-contact">care@babyamore.in</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
