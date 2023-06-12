import React, { useState } from "react";
import "./AboutUs.css";

const AboutUsPage = ({ }) => {

  return (
    <>
        <div className="img_1">
    <img src="https://www.babyamore.in/wp-content/uploads/2019/03/About-us-1.jpg" alt="babyamore" className="img-fluid" />
    <h1 className="centered dancing-font">Who We Are</h1>
    <div>
      <p id="para" className="text-left margin-mobile">Three parents with one common passion, “Babies”. We came to parenting
          the way most of
          us do — knowing nothing and learning with the flow. To help fellow
          parents in their wonderful journey, Baby Amoré was born.</p>
    </div>
  </div>
  <div className="img_1">
    <img src="https://www.babyamore.in/wp-content/uploads/2019/03/About-us-2.jpg" alt="babyamore" className="img-fluid" />
    <h1 className="centered">Our Promise</h1>
    <div>
      <p id="para" className="text-left margin-mobile">We believe that everything worth doing should be done with love. This
          philosophy has ensured all our endeavors in sourcing the best eco-friendly diapers to
          the best organic bath products as labors of love.</p>
    </div>
  </div>
  <div className="img_1">
    <img src="https://www.babyamore.in/wp-content/uploads/2019/03/About-us-3-1400x739.jpg" alt="babyamore" className="img-fluid" />
    <h1 className="centered">Our Mission</h1>
    <div>
      <p id="para" className="text-left margin-mobile">We aim to be your one stop destination for all your baby needs, lovingly curating the
          best products for your baby while also being kind to the environment.</p>
    </div>
  </div>
  <div className="img_1">
    <img src="https://www.babyamore.in/wp-content/uploads/2019/03/About-us-4-1400x788.jpg" alt="babyamore" className="img-fluid" />
    <h1 className="centered">Our Vibe</h1>
    <div>
      <p id="para" className="text-left margin-mobile">We are pretty sure that we told you that on the home page but we figured its worth
          repeating.<br></br><br></br>
          We aim for a world of fearless parenting!</p>
    </div>
  </div>

  <div className="bg_1 bg-img">
    <div className="banner-layers container">
      <div className="fill banner-link">
      </div>
      <div id="box-with-text" className="text-box banner-layer hide-for-small x100 md-x100 y50 md-y50 lg-y50 res-text">
        <div className="text-box-content text box-shadow-3">
          <div className="text-inner text-center">
            <h2 className="alt-font"><strong>Who We Are</strong></h2>
            <p id="para" className="f-16"><strong>Three parents with one common passion, “Babies”. We came to parenting
                the way most of
                us do — knowing nothing and learning with the flow. </strong><strong>To help fellow
                parents in their wonderful journey, Baby Amoré was born.</strong></p>
          </div>
        </div>
      </div>
      <div id="text-box-223107100" className="text-box banner-layer show-for-small x50 md-x50 lg-x50 y50 md-y50 lg-y50 res-text">
        <div className="text-box-content text dark">
          <div className="text-inner text-center">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg_2 bg-img">
    <div className="banner-layers container">
      <div className="fill banner-link" />
      <div id="box-with-text" className="text-box banner-layer hide-for-small x100 md-x100 y50 md-y50 lg-y40 res-text">
        <div className="text-box-content text box-shadow-3">
          <div className="text-inner text-center">
            <h2 className="alt-font"><strong>Our Promise</strong></h2>
            <p id="para" className="f-16"><strong>We believe that everything worth doing should be done with love. This
                philosophy has ensured all our endeavors in sourcing the best eco-friendly diapers to
                the best organic bath products as labors of love.</strong></p>
          </div>
        </div>
      </div>
      <div id="text-box-223107100" className="text-box banner-layer show-for-small x50 md-x50 lg-x50 y50 md-y50 lg-y50 res-text">
        <div className="text-box-content text dark">
          <div className="text-inner text-center">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg_3 bg-img">
    <div className="banner-layers container">
      <div className="fill banner-link" />
      <div id="box-with-text" className="text-box banner-layer hide-for-small x100 md-x100 y50 md-y50 lg-y50 res-text">
        <div className="text-box-content text box-shadow-3">
          <div className="text-inner text-center">
            <h2 className="alt-font"><strong>Our Mission</strong></h2>
            <p id="para" className="f-16"><strong>We aim to be your one stop destination for all your baby needs, lovingly
                curating the best products for your baby while also being kind to the
                environment.</strong></p>
          </div>
        </div>
      </div>
      <div id="text-box-223107100" className="text-box banner-layer show-for-small x50 md-x50 lg-x50 y50 md-y50 lg-y50 res-text">
        <div className="text-box-content text dark">
          <div className="text-inner text-center">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg_4 bg-img">
    <div className="banner-layers container">
      <div className="fill banner-link" />
      <div id="box-with-text" className="text-box banner-layer hide-for-small x100 md-x100 y50 md-y50 lg-y40 res-text">
        <div className="text-box-content text box-shadow-3">
          <div className="text-inner text-center">
            <h2 className="alt-font"><strong>Our Vibe</strong></h2>
            <h4 className="dance-font"><strong>"Fearless Parenting”</strong></h4>
            <p id="para" className="f-16"><strong>We are pretty sure that we told you that on the home page but we figured
                its worth repeating.<br></br><br></br>
                We aim for a world of fearless parenting!</strong></p>
          </div>
        </div>
      </div>
      <div id="text-box-223107100" className="text-box banner-layer show-for-small x50 md-x50 lg-x50 y50 md-y50 lg-y50 res-text">
        <div className="text-box-content text dark">
          <div className="text-inner text-center">
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default AboutUsPage;
