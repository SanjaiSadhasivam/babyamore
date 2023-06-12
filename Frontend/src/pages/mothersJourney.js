import React from "react";
import "../assets/styles/mothersJourney.css";
import image1 from "../assets/images/mothers/mothers-img1.jpg";
import image2 from "../assets/images/mothers/pregnancy-mom-img1.jpg";
import image3 from "../assets/images/mothers/pregnancy-mom-img-2.jpg";
import image4 from "../assets/images/mothers/childbirth-img.jpg";
import image5 from "../assets/images/mothers/parent-with-baby.jpg";
import image6 from "../assets/images/mothers/baby.jpg";
import image7 from "../assets/images/mothers/baby-mom.jpg";
import Partition from "../components/partition/partition";
import MothersCard from "../components/MothersCard/mothersCard";
import card1 from "../assets/images/mothers/motherscard1.jpg";
import card2 from "../assets/images/mothers/motherscard2.jpg";
import card3 from "../assets/images/mothers/motherscard3.jpg";
import card4 from "../assets/images/mothers/motherscard4.jpg";
import card5 from "../assets/images/mothers/motherscard5.jpg";
import card6 from "../assets/images/mothers/motherscard6.jpg";
import card7 from "../assets/images/mothers/motherscard7.jpg";
import card8 from "../assets/images/mothers/motherscard8.jpg";

const MothersJourney = () => {
  //data for card
  const data = [
    {
      description: "Ad pariatur anim eiusmod velit et.",
      image: image1,
      mrp: "23,000",
      addCart: "Add to Cart",
      select: "Select Option",
      discount: "-20%",
      price: "21,000",
    },
  ];
  return (
    <div>
      <div className="mothers-child-img">
        <div>
          <img
            src={image1}
            alt="A MOTHER’S JOURNEY"
            className="mothers-child-care-img"
          />
        </div>
        <div className="mothers-child-care-text">
          <h6>A MOTHER’S JOURNEY</h6>
          <h1>
            From Pregnancy To <br /> Child Care
          </h1>
          <p>
            Pregnancy is one of the most wonderful experiences we can go
            through. For a woman to <br /> create, grow, and give birth to
            another life is rather extraordinary. Sure there’s complications,{" "}
            <br /> scares, and sickness. We have put together a compilation that
            will help you through your <br /> different stages of your
            pregnancy, so that when you feel the first moments, it’s undeniably{" "}
            <br /> magical.
          </p>{" "}
        </div>
      </div>

      <div className="container mom-img-text">
        <Partition
          titleStyle="pregnancy-head"
          paraStyle="pregnancy-para"
          imgId="mom-img"
          divTextStyle="mom-text"
          dir="ltr"
          images={image2}
          title="Third Trimester"
          des="In the third trimester of pregnancy, your baby continues to grow at a fast pace, such that she will gain about half of her weight during the final month. This is the time you will reach your final stretch.
        So we have put together the finest skin care products that will provide relief and comfort to stretched skin & help keep your skin smooth during or after pregnancy."
        />
      </div>

      <div className="row cards-of-mother">
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card1}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className=" col-lg-3 col-md-4  col-sm-6 col-xs-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-6">
          <MothersCard
            description="Mustela Maternite Stretch Marks Recovery Serum, 75 ml"
            image={card4}
            mrp="1,699.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="1,359.00"
          />
        </div>
      </div>

      <div className="row cards-of-mother">
        <div className="col-md-3 "> </div>
        <div className="col-md-3 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card5}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-md-3 col-sm-6 ">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card6}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-md-3 "> </div>
      </div>

      <div className="container mom-img-text">
        <Partition
          titleStyle="pregnancy-head"
          paraStyle="pregnancy-para"
          imgId="mom-img3"
          divTextStyle="mom-text"
          dir="rtl"
          images={image3}
          title="Hospital Bag Essentials"
          des="The closer you get to your due date, the more exciting it is to think about finally meeting your baby. so it’s worth having your baby hospital bag organized and packed around month eight of your pregnancy – just in case.."
          des2
          para="Here are our picks for your hospital bag necessities."
        />
      </div>

      <div className="row cards-of-mother">
        <h5>For Mommy</h5>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card1}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Mustela Maternite Stretch Marks Recovery Serum, 75 ml"
            image={card4}
            mrp="1,699.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="1,359.00"
          />
        </div>
      </div>

      <div className="row cards-of-mother">
        <div className="col-md-3"> </div>
        <div className="col-md-3 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card5}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-md-3 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card6}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-md-3"> </div>
      </div>

      <div className="row cards-of-mother">
        <h5>For baby</h5>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card1}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Mustela Maternite Stretch Marks Recovery Serum, 75 ml"
            image={card4}
            mrp="1,699.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="1,359.00"
          />
        </div>
      </div>
      <div className="container">
        <div className="row cards-of-mother">
          <div className="col-md-4 col-sm-6">
            <MothersCard
              description="Burt’s Bees Mama Bee Belly Butter, 185g"
              image={card5}
              mrp="23,000"
              button="Read More"
              offer
              addCart="Add to Cart"
              price="1,499.00"
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <MothersCard
              description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
              image={card6}
              mrp="23,000"
              button="Read More"
              offer
              addCart="Add to Cart"
              price="1,099.00"
            />
          </div>
          <div className="col-md-4 ">
            <MothersCard
              description="Muslin Cotton Swaddles (Pack of 2) – Buzzing Bees"
              image={card7}
              mrp="23,000"
              button="Read More"
              offer
              addCart="Add to Cart"
              price="1,099.00"
            />
          </div>
        </div>
      </div>
      <div className="container mom-img-text">
        <Partition
          titleStyle="pregnancy-head"
          paraStyle="pregnancy-para"
          imgId="mom-img"
          divTextStyle="mom-text"
          dir="ltr"
          images={image4}
          title="Postpartum Needs"
          des="You’ve finally put almost 40 weeks of pregnancy and long hours of childbirth behind you, and you’re officially a mother. Congratulations!"
          des2
          para="Now comes the transition from pregnancy to postpartum, which brings with it a variety of new symptoms. During that time, there is a lot of healing, learning, and many sleepless nights. Our recommendations will help you get through some aspects of postpartum with ease."
        />
      </div>

      <div className="row cards-of-mother">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card1}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Mustela Maternite Stretch Marks Recovery Serum, 75 ml"
            image={card4}
            mrp="1,699.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="1,359.00"
          />
        </div>
      </div>
      <div className="container">
        <div className="row cards-of-mother">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <MothersCard
              description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
              image={card6}
              mrp="23,000"
              button="Read More"
              offer
              addCart="Add to Cart"
              price="1,099.00"
            />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <div className="container mom-img-text">
        <Partition
          titleStyle="pregnancy-head"
          paraStyle="pregnancy-para"
          imgId="mom-img"
          divTextStyle="mom-text"
          dir="ltr"
          images={image5}
          title="0-6 Months Essentials"
          des="Every new parent wants to do as much as possible right when it comes to their precious newborn. It’s not an easy job to take care of a little human."
          des2
          para="While things may seem hazy at times, time will fly and when you look back you will be delighted at how fast he had grown up."
        />
      </div>

      <div className="row cards-of-mother">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card1}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Mustela Maternite Stretch Marks Recovery Serum, 75 ml"
            image={card4}
            mrp="1,699.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="1,359.00"
          />
        </div>
      </div>

      <div className="container">
        <div className="row cards-of-mother">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <MothersCard
              description="Shnuggle Baby Bath Tub"
              image={card8}
              mrp="1,399.00"
              button="Select Options"
              offer
              addCart="Add to Cart"
              price="3,149"
            />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <div className="container mom-img-text">
        <Partition
          titleStyle="pregnancy-head"
          paraStyle="pregnancy-para"
          imgId="mom-img3"
          divTextStyle="mom-text"
          dir="rtl"
          images={image6}
          title="6 Months to 1 Year Necessities"
          des="In the 6-12 months phase, your baby changes so much! It’s an entirely different experience from 0-6 months."
          des2
          para="Your baby is learning to sit up, crawl, stand and walk. He or she is trying to talk and teething more, grabbing, putting things into their mouth and throwing things, and reaching for different toys.

        Here are the baby essentials that would help you through this phase 🙂"
        />
      </div>

      <div className="row cards-of-mother">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card1}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Mustela Maternite Stretch Marks Recovery Serum, 75 ml"
            image={card4}
            mrp="1,699.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="1,359.00"
          />
        </div>
      </div>

      <div className="row cards-of-mother">
        <div className="col-md-3"></div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className="col-md-3"></div>
      </div>

      <div className="container mom-img-text">
        <Partition
          titleStyle="pregnancy-head"
          paraStyle="pregnancy-para"
          imgId="mom-img"
          divTextStyle="mom-text"
          dir="ltr"
          images={image7}
          title="1+ Year Essentials"
          des="If your baby has passed the 1 year mark, you know you are set for some new adventures. If you find yourself repeating, “No-no, don’t touch that!” “How have you outgrown this outfit already?” and “Do you need to use the potty?” you likely have a toddler in your presence."
          des2
          para="Yes, Your baby is now a toddler. Toddlerhood has its own set of fun moments and challenges. There are a few things moms can keep around the house to make life a little easier."
        />
      </div>

      <div className="row cards-of-mother">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bees Mama Bee Belly Butter, 185g"
            image={card1}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,499.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Burt’s Bee Mama Bee Nourishing Body Oil, 115ml"
            image={card2}
            mrp="23,000"
            button="Read More"
            offer
            addCart="Add to Cart"
            price="1,099.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Aleva Naturals Stretch Mark Cream for Mothers, 100 ml"
            image={card3}
            mrp="1,399.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="699.00"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <MothersCard
            description="Mustela Maternite Stretch Marks Recovery Serum, 75 ml"
            image={card4}
            mrp="1,699.00"
            button="Read More"
            muted
            offer
            addCart="Add to Cart"
            price="1,359.00"
          />
        </div>
      </div>

      <div className="container Parenting-wish">
        <p className="color">
          Babies bring so much joy into the lives of their parents. It’s so
          exciting to have a baby in the house, but it’s also exhausting and a
          ton of work. For new parents, it can be a little (or a lot) surprising
          with how much of a mess such a tiny person can make. But when you look
          from past a few years, it’s all charms & memories.
        </p>
        <h6 className="color">And finally,</h6>
        <h1>We Wish You A Happy Parenting! ????</h1>
      </div>
    </div>
  );
};

export default MothersJourney;
