import React, { useEffect } from 'react'
import { Helmet } from "react-helmet";

/**---------------------------------Components--------------------------------------- */
import BabyCloths from '../components/BabyCloths/babyCloths'
import { Banner } from '../components/Banner/banner'
import { BannerSlider } from '../components/BannerSlider/bannerSlider'
import { Blog } from '../components/Blog/blog'
import { Deal } from '../components/Deal/deal'
import EveryNeeds from '../components/EveryNeed/everyNeeds'
import { FeatureBrand } from '../components/featureBrand/featureBrand'
import FeedingEssential from '../components/FeedingEssential/feeingEssential'
import ForMothers from '../components/ForMothers/forMothers'
import GearsToys from '../components/GearsToys/gearsToys'
import MiddleBanner from '../components/IconMiddleBanner/middleBanner'
import NappyCare from '../components/NappyCare/nappyCare'
import NewArrivals from '../components/NewArrivals/newArrivals'
import OralCare from '../components/OralCare/oralCare'
import ProductSlider from '../components/ProductSlider/productSlider'
import Summary from '../components/ProductSummary/productSummary'
import SkinHair from '../components/SkinHair/skinHair'
import TellUs from '../components/TellUs/tellUs'
import Testiomonials from '../components/Testimonial/testimonial'
import TopSelling from '../components/TopSelling/topSelling'
import { Cookies, useCookies } from "react-cookie";
const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(()=>{
    removeCookie("rewardpoints");
  },[])
  return (

    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Baby Amore</title>
        <link rel="canonical" href="http://babyamore.in" />
      </Helmet>
      <BannerSlider />
      <ProductSlider />
      <FeatureBrand />
      <Deal />

      {/* <NewArrivals/>
      <TopSelling />
      <NappyCare />
      <Banner />
      <FeedingEssential/>
      <SkinHair/>
      <OralCare/>
      <BabyCloths/>
      <GearsToys/>
      <ForMothers/> */}
      <Blog />
      <Testiomonials />
      <TellUs />
      <MiddleBanner />
      <Summary />

    </div>
  )
}

export default Home