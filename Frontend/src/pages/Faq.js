import React from "react";
import Accordion from "../components/Accordion/accordion";
import Faq from "../components/faq/Faq";

export const Faqs = () => {
  return (
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
          Frequently Asked Questions
        </h1>
        <div className="is-divider1" style={{ marginTop: 22 }} />
      </section>
      <div className="faq-content">
        <div className="faq-content-menu">
          <a className="faq">
            <span />
          </a>
          <ul id="menu-main-menu" className="m-menu faq-margin row">
            <li className="menu-item faq-menu-item faq-menu-margin">
              <a href="#order">Order,Payment,Shipping,Returns and Refunds</a>
            </li>
            <li className="menu-item faq-menu-item faq-menu-margin">
              <a href="#reward">Reward Points and Coupons</a>
            </li>
            <li className="menu-item faq-menu-item faq-menu-margin">
              <a href="#account">Account Related Information</a>
            </li>
            <li className="menu-item faq-menu-item faq-menu-margin">
              <a href="#brand">
                Brand Collaboration / Business & Supplier Tie-ups
              </a>
            </li>
            <li className="menu-item faq-menu-item faq-menu-margin">
              <a href="#technical">Technical Help</a>
            </li>
            <li className="menu-item faq-menu-item faq-menu-margin">
              <a href="#general">General Queries </a>
            </li>
            <li className="menu-item faq-menu-item faq-menu-margin">
              <a href="#authenticity">Brand Authenticity & Genuineness</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container p-2">
      <div className="row faq-head-question">
        <div className="col-md-5 faq-left-side">
          <h1 className="faq-heading">
            Order, Payment, Shipping, Returns and Refunds
          </h1>
        </div>
        <div className="col-md-7 faq-right-side">
          <Accordion
            title="How do I participate in the Rewards Program?"
            content="Joining is easy! Create an account to get started. Once
            you’ve registered your account, you’ll automatically be
            enrolled in the Rewards Program and can take part in all
            the exciting ways we currently offer to earn points!"
          />
          <Accordion
            title="How can I earn points?"
            content="You start earning points right from the beginning of the
            registration process. You earn points every time you
            follow us, like &amp; share our products on social
            media. You earn back 5% of what you spend on shopping.
            You earn every time you write a review of a product
            you’ve used. And you earn every time you refer a
            friend*. In addition, make sure to check back often, as
            we’re adding great ways for you to earn points all the
            time! "
          />
          <Accordion
            title="What are my reward points worth?"
            content="  Glad you asked! Each and every reward point is worth 1
            Indian rupees and they can be redeemed when you make a
            purchase."
          />
          <Accordion
            title="How do I redeem my points?"
            content="You can redeem your reward points whenever you make a
            purchase."
          />
          <Accordion
            title="How do I check my points balance?"
            content="Your up-to-date points balance is always displayed on
            your My Rewards page."
          />
          <Accordion
            title="Does it cost anything to begin earning points?"
            content="Absolutely not! Sign up is 100% free, and it will never
            cost you anything to earn points. Get started today!"
          />
          <Accordion
            title="How long will it take for points to post to my account?"
            content="You should receive points in your account instantly once
            you complete a task!"
          />
          <Accordion
            title="Do my points expire?"
            content=" Reward points are valid for 60 days from the day of
            being credited."
          />
          <Accordion
            title="What happens to my points if I make a return?"
            content=" <p>Let’s say you had previously spent Rs 500 on an order
            and had earned 25 points. <br />If you decide to return
            that item, your points would also go back down to the
            points which you had before placing that order.</p>
            <p>Similarly, If you’ve used 500 points in making an order
            and later decided to cancel it, your 500 points will be
            credited back to your account.</p>"
          />
          <Accordion
            title="How do I contact support if I have questions about my points?"
            content="  Our team is ready and waiting to answer your questions
            about our rewards program!<br />Drop us an email at
            care@babyamore.in and we’ll be in touch."
          />
          <Accordion
            title="What if I don't want to receive emails regarding reward"
            content=" From time to time, you’ll receive emails related to
            reward points from us. If you’d prefer to not receive
            those types of emails anymore, Tick the checkbox saying
            “Click Here to Stop Receiving Reward Points Emails” in
            your My Rewards page."
          />
        </div>
      </div>

      <div className="row faq-head-question">
        <div className="col-md-5 faq-left-side">
          <h1 className="faq-heading">Reward Points & Coupons</h1>
        </div>

        <div className="col-md-7 faq-right-side">
          <Accordion
            title="How do I participate in the Rewards Program?"
            content="Joining is easy! Create an account to get started. Once
            you’ve registered your account, you’ll automatically be
            enrolled in the Rewards Program and can take part in all
            the exciting ways we currently offer to earn points!"
          />
          <Accordion
            title="How can I earn points?"
            content="You start earning points right from the beginning of the
            registration process. You earn points every time you
            follow us, like &amp; share our products on social
            media. You earn back 5% of what you spend on shopping.
            You earn every time you write a review of a product
            you’ve used. And you earn every time you refer a
            friend*. In addition, make sure to check back often, as
            we’re adding great ways for you to earn points all the
            time! "
          />
          <Accordion
            title="What are my reward points worth?"
            content="  Glad you asked! Each and every reward point is worth 1
            Indian rupees and they can be redeemed when you make a
            purchase."
          />
          <Accordion
            title="How do I redeem my points?"
            content="You can redeem your reward points whenever you make a
            purchase."
          />
        </div>
      </div>

      <div className="row faq-head-question">
        <div className="col-md-5 faq-left-side">
          <h1 className="faq-heading">Account Related Information</h1>
        </div>

        <div className="col-md-7 faq-right-side">
          <Accordion
            title="How do I participate in the Rewards Program?"
            content="Joining is easy! Create an account to get started. Once
            you’ve registered your account, you’ll automatically be
            enrolled in the Rewards Program and can take part in all
            the exciting ways we currently offer to earn points!"
          />
        </div>
      </div>

      <div className="row faq-head-question">
        <div className="col-md-5 faq-left-side">
          <h1 className="faq-heading">
            Brand Collaboration / Business & Supplier Tie-ups
          </h1>
        </div>

        <div className="col-md-7 faq-right-side">
          <Accordion
            title="How do I participate in the Rewards Program?"
            content="Joining is easy! Create an account to get started. Once
            you’ve registered your account, you’ll automatically be
            enrolled in the Rewards Program and can take part in all
            the exciting ways we currently offer to earn points!"
          />
          <Accordion
            title="How can I earn points?"
            content="You start earning points right from the beginning of the
            registration process. You earn points every time you
            follow us, like &amp; share our products on social
            media. You earn back 5% of what you spend on shopping.
            You earn every time you write a review of a product
            you’ve used. And you earn every time you refer a
            friend*. In addition, make sure to check back often, as
            we’re adding great ways for you to earn points all the
            time! "
          />
          <Accordion
            title="What are my reward points worth?"
            content="  Glad you asked! Each and every reward point is worth 1
            Indian rupees and they can be redeemed when you make a
            purchase."
          />
          <Accordion
            title="How do I redeem my points?"
            content="You can redeem your reward points whenever you make a
            purchase."
          />
        </div>
      </div>

      <div className="row faq-head-question">
        <div className="col-md-5 faq-left-side">
          <h1 className="faq-heading">Technical Help</h1>
        </div>

        <div className="col-md-7 faq-right-side">
          <Accordion
            title="How do I participate in the Rewards Program?"
            content="Joining is easy! Create an account to get started. Once
            you’ve registered your account, you’ll automatically be
            enrolled in the Rewards Program and can take part in all
            the exciting ways we currently offer to earn points!"
          />
          <Accordion
            title="How can I earn points?"
            content="You start earning points right from the beginning of the
            registration process. You earn points every time you
            follow us, like &amp; share our products on social
            media. You earn back 5% of what you spend on shopping.
            You earn every time you write a review of a product
            you’ve used. And you earn every time you refer a
            friend*. In addition, make sure to check back often, as
            we’re adding great ways for you to earn points all the
            time! "
          />
          <Accordion
            title="What are my reward points worth?"
            content="  Glad you asked! Each and every reward point is worth 1
            Indian rupees and they can be redeemed when you make a
            purchase."
          />
        </div>
      </div>

      <div className="row faq-head-question">
        <div className="col-md-5 faq-left-side">
          <h1 className="faq-heading">General Queries</h1>
        </div>

        <div className="col-md-7 faq-right-side">
          <Accordion
            title="How do I participate in the Rewards Program?"
            content="Joining is easy! Create an account to get started. Once
            you’ve registered your account, you’ll automatically be
            enrolled in the Rewards Program and can take part in all
            the exciting ways we currently offer to earn points!"
          />
          <Accordion
            title="How can I earn points?"
            content="You start earning points right from the beginning of the
            registration process. You earn points every time you
            follow us, like &amp; share our products on social
            media. You earn back 5% of what you spend on shopping.
            You earn every time you write a review of a product
            you’ve used. And you earn every time you refer a
            friend*. In addition, make sure to check back often, as
            we’re adding great ways for you to earn points all the
            time! "
          />
          <Accordion
            title="What are my reward points worth?"
            content="  Glad you asked! Each and every reward point is worth 1
            Indian rupees and they can be redeemed when you make a
            purchase."
          />
          <Accordion
            title="How do I redeem my points?"
            content="You can redeem your reward points whenever you make a
            purchase."
          />
          <Accordion
            title="How do I check my points balance?"
            content="Your up-to-date points balance is always displayed on
            your My Rewards page."
          />
          <Accordion
            title="Does it cost anything to begin earning points?"
            content="Absolutely not! Sign up is 100% free, and it will never
            cost you anything to earn points. Get started today!"
          />
          <Accordion
            title="How long will it take for points to post to my account?"
            content="You should receive points in your account instantly once
            you complete a task!"
          />
          <Accordion
            title="Do my points expire?"
            content=" Reward points are valid for 60 days from the day of
            being credited."
          />
        </div>
      </div>

      <div className="row faq-head-question">
        <div className="col-md-5 faq-left-side">
          <h1 className="faq-heading">Brand Authenticity & Genuineness</h1>
        </div>

        <div className="col-md-7 faq-right-side">
          <Accordion
            title="How do I participate in the Rewards Program?"
            content="Joining is easy! Create an account to get started. Once
            you’ve registered your account, you’ll automatically be
            enrolled in the Rewards Program and can take part in all
            the exciting ways we currently offer to earn points!"
          />
          <Accordion
            title="How can I earn points?"
            content="You start earning points right from the beginning of the
            registration process. You earn points every time you
            follow us, like &amp; share our products on social
            media. You earn back 5% of what you spend on shopping.
            You earn every time you write a review of a product
            you’ve used. And you earn every time you refer a
            friend*. In addition, make sure to check back often, as
            we’re adding great ways for you to earn points all the
            time! "
          />
        </div>
      </div>
      </div>
    </div>
  );
};
