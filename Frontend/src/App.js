import React from 'react';
/**---------------------------------Component------------------------------------------- */
import Layout from './layout/layout';

/**---------------------------------Packages------------------------------------------- */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './assets/styles/style.css'
/**---------------------------------Assets------------------------------------------- */
import './assets/styles/style.css'

/**---------------------------------Pages------------------------------------------- */
import Home from './pages/home';
import { Products } from './pages/products';
import { AboutUs } from './pages/aboutus';
import { BlogPage } from './pages/blog';
import { Terms } from './pages/TermsandConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CancellationReturnPolicy } from './pages/CancellationReturnPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import Cart from '../src/components/cart/cart'
import { Faqs } from './pages/Faq'
import NappyCarePage from './components/NappyCarePage/NappyCarePage';
import MyAccount from './components/MyAccount/myaccount';
import RecentOrders from './components/RecentOrders/recentorders';
import AddtoCart from './components/AddtoCart/addtocart';

import MyReward from './components/MyRewards/myrewards';
import Address from './components/Address/address';
import Accountdetails from './components/AccountDetails/accountdetails';
import ContactUs from './pages/contactUs';
import Rewardprogram from './pages/rewardprogram';
import SuggestProduct from './pages/suggestProduct';
import ProductBrandPartnerships from './pages/productBrandPartnerships';
import Influencer from './pages/influencer';
import MothersJourney from './pages/mothersJourney';
import Login from './pages/login';
import OtpLogin from './pages/otplogin';
import RegisterPage from './pages/registerPage';
// import AddtoCartProvider from './components/context/addtocarts';
import Checkout from './pages/checkout';
import OrderComplete from './pages/orderComplete';
import ScrollTop from './components/ScrollTop';
import ScrollButton from './components/ScrollTop/scrollTopBtn';
import Brands from './components/brands/brands';
import BlogView from './components/blogView/blogView';
import BlogOne from './components/BlogsPage/BlogOne';
import BlogTwo from './components/BlogsPage/BlogTwo';
import { useEffect } from 'react';
import Wishlist from './pages/wishlist';
import ChangePassword from './components/ChangePassword/ChangePassword';

function App() {


  React.useEffect(() => {
    // window.scrollTo(0, 0);
    // window.scrollTo(0, document.body.scrollHeight);
  }, [])
  
  return (
    <>
      <div className="App">

        <BrowserRouter>
        
            <Layout>
          <ScrollTop />
          <ScrollButton />

              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/products/:name/:id" element={<Products />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/blog" element={<BlogPage />}></Route>
                <Route path="/blog-view/:id" element={<BlogView />}></Route>
                <Route path="/mothers-journey" element={<MothersJourney />}></Route>
                <Route path="/terms-and-conditions" element={<Terms />}></Route>
                <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
                <Route path="/cancellation-and-return-policy" element={<CancellationReturnPolicy />}></Route>
                <Route path="/shipping-policy" element={<ShippingPolicy />}></Route>
                <Route path="/frequently-asked-questions" element={<Faqs />}></Route>
                <Route path="/nappycarepage" element={<NappyCarePage />}></Route>
                <Route path="/Brand/getBrandProductData" element={<NappyCarePage />}></Route>
                <Route path="/brand/:brandname/:brandid" element={<NappyCarePage />}></Route>
                <Route path="/:maincategoryname/:maincategoryid" element={<NappyCarePage />}></Route>
                <Route path="/:maincategoryname/:subcategoryname/:subcategoryid" element={<NappyCarePage />}></Route>
                <Route path="/:maincategoryname/:subcategoryname/:childcategoryname/:childcategoryid" element={<NappyCarePage />}></Route>
                <Route path="/myaccount" element={<MyAccount />}></Route>
                <Route path="/recentOrders" element={<RecentOrders />}></Route>
                <Route path="/myrewards" element={<MyReward />}></Route>
                <Route path="/reward-program" element={<Rewardprogram />}></Route>
                <Route path="/influencer" element={<Influencer />}></Route>
                <Route path="/product-brand-partnerships" element={<ProductBrandPartnerships />}></Route>
                <Route path="/suggest-product" element={<SuggestProduct />}></Route>
                <Route path="/order-complete/:name" element={<OrderComplete />} />
                <Route path="/address" element={<Address />}></Route>
                <Route path="/address/:id" element={<Address />}></Route>
                <Route path="/addtocart" element={<AddtoCart />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/contactus" element={<ContactUs />}></Route>
                <Route path="/accountdetails" element={<Accountdetails />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otplogin" element={<OtpLogin />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/address" element={<Address />} />
                <Route path="/address/checkout/:id" element={<Address />} />
                <Route path="/brands" element={<Brands />} />

                {/* static page two */}
                <Route path="/blog-one" element={<BlogOne />}></Route>
                <Route path="/blog-two" element={<BlogTwo />}></Route>
                <Route path="/wish-list" element={<Wishlist />}></Route>
              </Routes>
            </Layout>
        </BrowserRouter>
      </div></>
  );
}

export default App;