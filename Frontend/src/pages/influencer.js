import React from "react";
import "../assets/styles/influencer.css";
import image1 from "../assets/images/influencer/influencer-image1.jpg";
import image2 from "../assets/images/influencer/influencer-2.jpg";
import image3 from "../assets/images/influencer/influencer-3.jpg";

const Influencer = () => {
  return (
    <div>
      <div className="influencer-head">
        <h6 className="color">INFLUENCER PROGRAM</h6>
        <h1>Are You A Conscious Influencer?</h1>

        <div id="section1">

        <a href="#section2"><div class="scroll-down-arrow"></div></a>

        </div>


      </div>
      <div className="container">
      <div >
      <div id="section2" className="row">
        
        {/* <div className=" influencer-img"> */}
        <div className="col-md-4  col-sm-4">    
        <img
          src={image1}
          alt="born diapers" className="influencer-img img-fluid"
          
        />
        </div>
        <div className="col-md-4 col-sm-4">
        <img
          src={image2}
          alt="born diapers" className="influencer-center-img img-fluid"
          
        />
        </div>
        <div className="col-md-4  col-sm-4">
        <img
          src={image3}
          alt="born diapers" className=" influencer-img img-fluid"
          
        />
        </div>
        {/* </div> */}
        </div>
        </div>
        <div className="row mt-5">
            <div className="influencer-rates-text text-center col-md-3 col-sm-6 col-xs-6" >
                <h2>2019</h2>
                <p className="color">Operating for over 2 years</p>
            </div>
            <div className="influencer-rates-text text-center col-md-3 col-sm-6 col-xs-6">
                <h2>90+</h2>
                <p className="color"> Brands</p>
            </div>
            <div className="influencer-rates-text text-center col-md-3 col-sm-6 col-xs-6">
                <h2>50,000+</h2>
                <p className="color">Products sold</p>
            </div>
            <div className="influencer-rates-text text-center col-md-3 col-sm-6 col-xs-6">
                <h2>4.98/5</h2>
                <p className="color">Customer rating</p>
            </div>
        </div>

        <div className="influencer-qus">
            <p className="color">Are you a safety conscious influencer who cares about what <br />  you put on your baby’s skin?</p>
            <br />
            <p className="color">Fill in the form below to collaborate with us.</p>
        </div>
        </div>
        <div className="influencer-post-qus">
            <form className="influencer-from">
              <div className="form-group influencer-from-text">
                <label for="name">Name </label>
                <input
                  className="form-control influencer-from-input"
                  id="name"
                  type="text"
                  name="Name"
                />
              </div>
              <div className="form-group influencer-from-text">
                <label for="name">Email</label>
                <input
                  className="form-control influencer-from-input "
                  id="email"
                  type="email"
                  name="email"
                />
              </div>
            
              <div className="form-group influencer-from-text ">
                <label for="name">Mobile Number</label>
                <input
                  className="form-control influencer-from-input "
                  id="name"
                  type="text"
                  name="Name"
                />
              </div>
              <div className="form-group influencer-from-text">
                <label for="name">Social Handles</label>
                <textarea
                  className="form-control influencer-from-input "
                  rows="4"
                  id="message"
                  name="Message"
                ></textarea>
              </div>

              <div className="check-box-text" >
                <h6 className="check-box-head">Product you'd like to collab with</h6>
              <div class="custom-control custom-radio form-check-box">
            <input id="PureBorn" name="paymentMethod" type="radio" class="custom-control-input" checked required />
            <label class="custom-control-label" for="PureBorn">PureBorn</label>
          </div>
          <div class="custom-control custom-radio form-check-box">
            <input id="WaterWipes" name="paymentMethod" type="radio" class="custom-control-input" required />
            <label class="custom-control-label" for="WaterWipes">WaterWipes</label>
          </div>
          <div class="custom-control custom-radio form-check-box">
            <input id="Others" name="paymentMethod" type="radio" class="custom-control-input" required />
            <label class="custom-control-label" for="Others">Others</label>
          </div>
              </div>

              <div className="form-group influencer-from-text">
                <label for="name">Brands you have worked with</label>
                <textarea
                  className="form-control influencer-from-input "
                  rows="4"
                  id="message"
                  name="Message"
                ></textarea>
              </div>
              
              <div className="form-group influencer-from-text">
                <label for="name">Additional info (optional)</label>
                <textarea
                  className="form-control influencer-from-input "
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
  );
};

export default Influencer;
