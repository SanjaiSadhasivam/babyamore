import React from "react";
import "./Shipping-Policy.css";

const Shipping = ({}) => {
  return (
    <>
      <section>
        <h1 className="TermHead">Shipping Policy</h1>
        <div className="is-divider1"/>
      </section>

      <section className="TermArea">
        <div className="container">
          <p className="headie">Shipping Policy</p>
          <p className="headie1">How does the delivery process work?</p>
          <ul>
            <li className="para line-hei">
              Once our system processes your order, your products are inspected
              thoroughly to ensure they are in a perfect condition.
            </li>
            <li className="para line-hei">
              After they pass through the final round of quality check, they are
              packed and handed over to our trusted delivery partner.
            </li>
            <li className="para line-hei">
              Our delivery partners then bring the package to you at the
              earliest possible. In case, they are unable to reach your provided
              address or at a suitable time, they will contact you to resolve
              the issue.
            </li>
          </ul>
          <p className="headie1">How are items packaged?</p>
          <p className="para line-hei">
            We package our products in boxes, which are covered in a plastic
            layer. Each individual product is packaged in bubble wrap while
            fragile items like bottles are safely secured with additional bubble
            wrap.<br></br>We pride ourselves on the quality of our packaging.
            Till date, we have received minimal complaints about damaged
            products due to our packaging
          </p>
          <p className="headie1">
            What is the range of locations to which Baby Amoré ships their
            products?
          </p>
          <p className="para line-hei">Baby Amoré ships throughout India!</p>
          <p className="headie1">
            My order has been shipped. Now how can I track it?
          </p>
          <p className="para line-hei">
            Once your order has been dispatched, you will receive an email with
            the details of the tracking number and the courier company that is
            processing your order. You can track the status of your package 24
            hours after your order is dispatched from our warehouse.<br></br>
            Following are some our trusted courier partners:<br></br>
            <strong>Aramex</strong> – http://www.aramex.com/<br></br>
            <strong>Bluedart</strong> – http://www.bluedart.com/<br></br>
            <strong>DTDC</strong> – http://www.dtdc.in/<br></br>
            <strong>Delhivery</strong> – http://www.delhivery.com/
          </p>
          <p className="headie1">What is the estimated delivery time?</p>
          <p className="para line-hei">
            We dispatch most orders within 1-4 business days (excluding Sundays
            and public holidays)
          </p>
          <ul>
            <li className="para line-hei">
              Though, we keep 95% of our catalogue in our inventory, certain
              products need to be sourced directly from the brand itself so that
              we can live up to our promise of providing fresh, non-expired
              products.
            </li>
            <li className="para line-hei">
              While we are trying our best to avoid this situation, these
              products might delay your order.
            </li>
            <li className="para line-hei">
              If you are ordering our products from a Mega Sale event,
              dispatches may be a bit delayed due to increased volumes. We will
              target to dispatch all orders within 5 days of order date.
            </li>
          </ul>
          <p className="headie1">
            My order will be shipped in multiple shipments? What does this mean?
          </p>
          <p className="para line-hei">
            Don’t worry! This is a completely normal situation. This just means
            that different parts of your order may have simply been shipped from
            our different warehouse locations. Rest assured, you will only have
            to pay the shipping/CoD charge if applicable, on the first package
            you receive.
          </p>

          <p className="headie1">
            Are there any shipping charges applicable on my order?
          </p>
          <ul>
            <li className="para line-hei">
              No. We provide free shipping all over India! (Due to the current
              unforeseen circumstances prevailing due to COVID-19, we charge a
              nominal shipping charge of ₹50)
            </li>
          </ul>

          <p className="headie1">Does Baby Amoré ship outside India?</p>

          <p className="para line-hei">
            Unfortunately, Baby Amoré does not ship outside India at the moment.
            However, we are working on starting international delivery as soon
            as possible, so stay tuned!
          </p>
        </div>
      </section>
    </>
  );
};

export default Shipping;
