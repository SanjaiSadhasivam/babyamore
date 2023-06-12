import React from "react";
import Partition from "../components/partition/partition";
import image from "../assets/images/reward/reward1.png";
import images1 from "../assets/images/reward/brush-paint.png";
import image2 from "../assets/images/reward/reward-2.jpg";
import image3 from "../assets/images/reward/reward-3.png";
import image4 from "../assets/images/reward/reward-4.jpeg";
import image5 from "../assets/images/reward/reward-5.jpg";

import { BannerSlider } from "../components/BannerSlider/bannerSlider";
import Accordion from "../components/Accordion/accordion";

const Rewardprogram = () => {
  return (
    <>
      <BannerSlider />
      <Partition
        dir="ltr"
        images={image}
        title="Reward Points"
        des="At Baby Amoré, we believe in giving back to the community. As a customer, you get rewarded for  
        every action you take. The points can be redeemed on your next purchase."
        img
        images1={images1}
      />

      <Partition
        dir="rtl"
        images={image2}
        title="Shop to earn"
        des="Get 5% cashback as reward points on all of your orders"
      />

      <Partition
        dir="ltr"
        images={image3}
        title="Like, Share, Tweet to earn"
        des="Get rewarded 5 points for following us on social media. You also get rewarded every time you share or tweet our product in your social profile."
      />

      <Partition
        dir="rtl"
        images={image4}
        title="Refer to earn"
        des="Refer a friend and earn 100 Reward Points once they complete a purchase."
      />

      <Partition
        dir="ltr"
        images={image5}
        title="Review to earn"
        des="Earn 5 Reward Points every time you review a product. Share opinions, experiences you’ve had with the product."
      />

      <div className="container">
        <div>
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
        </div>
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

      <div className="container">
        <div>
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
              Terms & Conditions
            </h1>
            <div className="is-divider1" style={{ marginTop: 22 }} />
          </section>
        </div>
        <div className="trems-para color">
          <p>*Reward points cannot be used alongside with coupons.</p>
          <p>*Points cannot be redeemed on an item that are on sale.</p>
          <p> *Reward points are not issued for purchasing sale items.</p>
        </div>
      </div>
    </>
  );
};

export default Rewardprogram;
