import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomerProvider } from "../pages/panel/e-commerce/customer/CustomerContext";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";
import OrdersList1 from "../pages/Orders-List1";
import OrdersList2 from "../pages/OrdersList2";
import OrdersList3 from "../pages/OrdersList3";
import OrdersList4 from "../pages/OrdersList4";
import Sample from "../pages/Sample";


import Sales from "../pages/Sales";
import Analytics from "../pages/Analytics";
import EcomOrder from "../pages/panel/e-commerce/order/OrderDefault";
import EcomSupport from "../pages/panel/e-commerce/support/Messages";
import EcomProducts from "../pages/panel/e-commerce/product/ProductList";
import EcomCustomer from "../pages/panel/e-commerce/customer/CustomerList";
import EcomCustomerDetails from "../pages/panel/e-commerce/customer/CustomerDetails";
import EcomIntegration from "../pages/panel/e-commerce/integration/Integration";
import EcomSettings from "../pages/panel/e-commerce/settings/Settings";
import EcomDashboard from "../pages/panel/e-commerce/index";

import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Avatar from "../pages/components/Avatar";
import Badges from "../pages/components/Badges";
import Breadcrumbs from "../pages/components/Breadcrumbs";
import ButtonGroup from "../pages/components/ButtonGroup";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Carousel from "../pages/components/Carousel";
import Dropdowns from "../pages/components/Dropdowns";
import FormElements from "../pages/components/forms/FormElements";
import FormLayouts from "../pages/components/forms/FormLayouts";
import FormValidation from "../pages/components/forms/FormValidation";
import DataTablePage from "../pages/components/table/DataTable";
import DisputesTable from "../pages/components/table/DisputesTable";
import OddData from "../pages/components/table/OrdersList";
import Vist from "../pages/components/table/Vist";
import ProdList from "../pages/components/table/ProductLists";
// import Catelist from "../pages/components/table/MainCategory";
// import SubMainList from "../pages/components/table/SubCategory";
// import ChildList from "../pages/components/table/ChildCategory";
import Prod2List from "../pages/components/table/Prod2Lists";
import DateTimePicker from "../pages/components/forms/DateTimePicker";
import CardWidgets from "../pages/components/widgets/CardWidgets";
import ChartWidgets from "../pages/components/widgets/ChartWidgets";
import RatingWidgets from "../pages/components/widgets/RatingWidgets";
import SlickPage from "../pages/components/misc/Slick";
import CustomPage from "../pages/components/misc/Custom";
import SweetAlertPage from "../pages/components/misc/SweetAlert";
import BeautifulDnd from "../pages/components/misc/BeautifulDnd";
import DualListPage from "../pages/components/misc/DualListbox";
import GoogleMapPage from "../pages/components/misc/GoogleMap";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import Typography from "../pages/components/Typography";
import CheckboxRadio from "../pages/components/forms/CheckboxRadio";
import AdvancedControls from "../pages/components/forms/AdvancedControls";
import InputGroup from "../pages/components/forms/InputGroup";
import FormUpload from "../pages/components/forms/FormUpload";
import NumberSpinner from "../pages/components/forms/NumberSpinner";
import NouiSlider from "../pages/components/forms/nouislider";
import WizardForm from "../pages/components/forms/WizardForm";
import UtilBorder from "../pages/components/UtilBorder";
import UtilColors from "../pages/components/UtilColors";
import UtilDisplay from "../pages/components/UtilDisplay";
import UtilEmbeded from "../pages/components/UtilEmbeded";
import UtilFlex from "../pages/components/UtilFlex";
import UtilOthers from "../pages/components/UtilOthers";
import UtilSizing from "../pages/components/UtilSizing";
import UtilSpacing from "../pages/components/UtilSpacing";
import UtilText from "../pages/components/UtilText";





import Blank from "../pages/others/Blank";
import Faq from "../pages/others/Faq";
import Regularv1 from "../pages/others/Regular-1";
import Regularv2 from "../pages/others/Regular-2";
import Terms from "../pages/others/Terms";
import BasicTable from "../pages/components/table/BasicTable";
import SpecialTablePage from "../pages/components/table/SpecialTable";
import ChartPage from "../pages/components/charts/Charts";
import Dcharts from "../pages/components/charts/Dcharts";
import EmailTemplate from "../pages/components/email-template/Email";
import NioIconPage from "../pages/components/crafted-icons/NioIcon";
import SVGIconPage from "../pages/components/crafted-icons/SvgIcons";

import ProjectCardPage from "../pages/pre-built/projects/ProjectCard";
import ProjectListPage from "../pages/pre-built/projects/ProjectList";
import ProductsListPage from "../pages/pre-built/projects/Products";
import BusinessAreaPage from "../pages/pre-built/projects/BusinessArea";
import UserListDefaultPage from "../pages/pre-built/user-manage/UserListDefault";
import LanguagesPage from "../pages/pre-built/user-manage/Languages";

import CategoriesPage from "../pages/pre-built/user-manage/Categories";
import GroupListPage from "../pages/pre-built/user-manage/GroupList";
import ManufactorPage from "../pages/pre-built/user-manage/Manufactor";
import SubGroupPage from "../pages/pre-built/user-manage/SubGroup";



import UserListRegularPage from "../pages/pre-built/user-manage/UserListRegular";
import UserContactCardPage from "../pages/pre-built/user-manage/UserContactCard";
import UserDetailsPage from "../pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "../pages/pre-built/user-manage/UserListCompact";

import UserProfileLayout from "../pages/pre-built/user-manage/UserProfileLayout";
import OrderDefault from "../pages/pre-built/orders/OrderDefault";
import AttrData from "../pages/pre-built/orders/AttrData";
import List from "../pages/pre-built/orders/List";


// import MainCategory from "../pages/pre-built/orders/main-category";
// import SubCategory from "../pages/pre-built/orders/sub-category";
// import ChildCategory from "../pages/pre-built/orders/child-category";

import VendorEdit from "../pages/app/messages/user-edit";

import PageDetails from "../pages/pre-built/orders/PagesDetails";
import Currency from "../pages/pre-built/orders/Currency";
import ProductsList from "../pages/pre-built/orders/ProductsList";
import OrderRegular from "../pages/pre-built/orders/OrderRegular";
import OrderSales from "../pages/pre-built/orders/OrderSales";
import KycListRegular from "../pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "../pages/pre-built/kyc-list-regular/kycDetailsRegular";
import ProductCard from "../pages/pre-built/products/ProductCard";
import ProductList from "../pages/pre-built/products/ProductList";
import BannersList from "../pages/pre-built/products/Banners";
import Announcements from "../pages/pre-built/products/Announcements";
import Lang from "../pages/pre-built/products/Lang";
import ProductDetails from "../pages/pre-built/products/ProductDetails";

import CaList from "../pages/components/table/OrdersCartList";
import Admin from "../pages/components/table/Admin";
import Tickets from "../pages/components/table/Tickets";
import Roles from "../pages/components/table/Roles";


import Banners from "../pages/components/table/Banners";

import Blog from "../pages/components/table/Blog";
import BlogData from "../pages/components/table/BlogData";
// blog section 


import Refunds from "../pages/components/table/Refunds";

import Annocuments from "../pages/components/table/Annocuments";
import BussinessArea1 from "../pages/components/table/BussinessArea1";

import CustomerList from "../pages/components/table/CustomerList";
import MerchantList from "../pages/components/table/MerchantList";
import VendorProfile from "../pages/components/vendor/Profile";
import ShopList from "../pages/components/table/ShopList";
import CanList from "../pages/components/table/OrdersCancelList";

import AttsData from "../pages/components/table/AttsData";
import ProductTags from "../pages/components/table/Tags";
// import NewCoupons from "../pages/components/table/Coupon";
import Prods from "../pages/components/table/Prods";
import Group from "../pages/components/table/Group";
import Group2 from "../pages/components/table/Group2";
import Category from "../pages/components/table/Category";
import ManuTable from "../pages/components/table/ManuTable";
import CouponDetails from "../pages/pre-built/marketing/CouponDetails";
import CouponsList from "../pages/pre-built/marketing/CouponsList";
import CouponSample from "../pages/pre-built/marketing/CouponSample";
import InvoiceList from "../pages/pre-built/invoice/InvoiceList";
import Attributes from "../pages/pre-built/invoice/Attributes";

import InvoiceDetails from "../pages/pre-built/invoice/InvoiceDetails";
import PricingTable from "../pages/pre-built/pricing-table/PricingTable";
import GalleryPreview from "../pages/pre-built/gallery/GalleryCardPreview";
import ReactToastify from "../pages/components/misc/ReactToastify";


import AppMessages from "../pages/app/messages/ProductListAddEdit";
import AppStocks from "../pages/app/messages/Addstock";
// import CouponsEdit from "../pages/app/messages/CouponsEdit";
import ProductDetailsPage from "../pages/app/messages/product-details";
import Merchants from "../pages/app/messages/Merchant";
import System from "../pages/app/messages/System";
// import AppSettings from "../pages/app/messages/Settings";
import AppSettings from '../pages/app/messages/Settings'
import Chat from "../pages/app/chat/ChatContainer";
import Kanban from "../pages/app/kanban/Kanban";
import Inbox from "../pages/app/inbox/Inbox";
import Calender from "../pages/app/calender/Calender";
import JsTreePreview from "../pages/components/misc/JsTree";
import QuillPreview from "../pages/components/forms/rich-editor/QuillPreview";
import TinymcePreview from "../pages/components/forms/rich-editor/TinymcePreview";
import KnobPreview from "../pages/components/charts/KnobPreview";

import VendorMerchant from "../pages/components/table/VendorMerchant";
import WareHousePage from "../pages/components/table/WarehousePage";
import CancelList from "../pages/Cancel-list";
import CancelList1 from "../pages/CancelList1";

import { Form } from "reactstrap";


import AttrProductlist from "../pages/app/messages/ProductlistVariation";
import NewDiscount from "../pages/components/table/Discount";
import AddDiscount from "../pages/components/table/AddDiscount";
import StockList from "../pages/components/table/StockList";
import StockListview from "../pages/components/table/StockListview";
import AddStockList from "../pages/components/table/AddStockList";
import PopularCategories from "../pages/components/table/Popular_categories";
import FeaturedBrands from "../pages/components/table/Featured_Brands";
import DealsOfTheWeek from "../pages/components/table/Deals_of_the_week";
import NewArrivals from "../pages/components/table/New_arrivals";
import EveryDayNeeds from "../pages/components/table/Everyday_needs";

import TreeViewPage from "../pages/pre-built/orders/TreeView";
import UserView from "../pages/components/table/UserView";
import CustomerView from "../pages/components/table/CustomerView";

import MainCategory from "../pages/components/table/MainCategory";
import MainCategoryAddEdit from "../pages/pre-built/orders/MainCategoryAddEdit";
import SubCategory from "../pages/components/table/SubCategory";
import SubCategoryAddEdit from "../pages/pre-built/orders/SubCategoryAddEdit";
import ChildCategory from "../pages/components/table/ChildCategory";
import ChildCategoryAddEdit from "../pages/pre-built/orders/ChildCategoryAddEdit";
import Coupon from "../pages/components/table/Coupon";
import CouponAddEdit from "../pages/app/messages/CouponAddEdit";
import ProductLists from "../pages/components/table/ProductLists";
import Reviews from "../pages/components/table/Reviews"
import Subscription from "../pages/components/table/Subscription"
import ProductReviews from "../pages/components/table/Productreview";
import ProductListAddEdit from "../pages/app/messages/ProductListAddEdit";
import ProductlistVariation from "../pages/app/messages/ProductlistVariation";
import OrdersList from "../pages/components/table/OrdersList";
// import OrdersDataList from "../pages/components/table/OrdersDataList";
import OrdersCartList from "../pages/components/table/OrdersCartList";
import OrdersCancelList from "../pages/components/table/OrdersCancelList";
import OrdersDataList from "../pages/components/table/OrderDataList";
import OrderssDataList from "../pages/components/table/OrderDataList";
import Settings from "../pages/panel/e-commerce/settings/Settings";
import Shipping from "../pages/components/table/Shipping";
import OrdersSettings from "../pages/components/table/OrdersSettings";
import AddShipping from "../pages/components/table/AddShipping";
import FeatureBrandBanner from "../pages/components/table/FeatureBrandBanner";

import ReedmePoints from "../pages/components/table/Redeempoints";
import RewardPoints from "../pages/components/table/RewardPoints";

import ReturnList from "../pages/components/table/ReturnList";
import ReturnOrderList from "../pages/ReturnOrderList";
import ReturnSubOrderList from "../pages/ReturnSubOrderList";
import Giftoffers from "../pages/components/table/Giftoffers";
import InvoicePage from "../pages/InvoicePage";
import GiftOfferAddEdit from "../pages/pre-built/orders/GiftOfferAddEdit";
import CreditNotes from "../pages/CreditNotes";
import Redeempoints from "../pages/components/table/Redeempoints";
import QuestionAnswer from "../pages/components/table/questionTable";
import PointsSettings from "../pages/pre-built/orders/PointsSettings";
import Tags from "../pages/components/table/Tags";
import Home from "../pages/components/table/Home";
// import MainCategoryV2 from "../pages/components/table/MainCategoryV2";


const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/*Panel */}
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/index`} component={EcomDashboard}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/orders`} component={EcomOrder}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/currency`} component={Currency}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/products`} component={EcomProducts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/support`} component={EcomSupport}></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer`}
          render={() => (
            <CustomerProvider>
              <EcomCustomer />
            </CustomerProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer-details/:id`}
          render={(props) => (
            <CustomerProvider>
              <EcomCustomerDetails {...props} />
            </CustomerProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/settings`} component={EcomSettings}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/integration`} component={EcomIntegration}></Route>

        {/*Dashboards*/}
        <Route exact path={`${process.env.PUBLIC_URL}/sales`} component={Sales}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/analytics`} component={Analytics}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/_blank`} component={Blank}></Route>


        {/*Pre-built Pages*/}
        <Route exact path={`${process.env.PUBLIC_URL}/project-card`} component={ProjectCardPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/project-list`} component={ProjectListPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/products-list`} component={ProductsListPage}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/business-list`} component={BusinessAreaPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/announcement-list`} component={Annocuments}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/prod-list`} component={ProductLists}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/prod-Reviews`} component={Reviews}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/prod-subscription`} component={Subscription}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/product-review`} component={ProductReviews}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/question-answer`} component={QuestionAnswer}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/stock-list`} component={StockList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/stock-list-view/:id`} component={StockListview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/add-stock`} component={AddStockList}></Route>

        {/*Category Main Page*/}

        <Route exact path={`${process.env.PUBLIC_URL}/main-category-list`} component={MainCategory}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/main-category`} component={MainCategoryV2}></Route> */}
        <Route exact path={`${process.env.PUBLIC_URL}/sub-category-list`} component={SubCategory}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/child-category-list`} component={ChildCategory}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/tree-view`} component={TreeViewPage}></Route>





        <Route exact path={`${process.env.PUBLIC_URL}/user-list-compact`}
          render={() => (
            <UserContextProvider>
              <UserListCompact />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/manus-list`}
          render={() => (
            <UserContextProvider>
              <ManufactorPage />
            </UserContextProvider>
          )}
        ></Route>



        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-list-regular`}
          render={() => (
            <UserContextProvider>
              <UserListRegularPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-list-default`}
          render={() => (
            <UserContextProvider>
              <UserListDefaultPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/lang-list`}
          render={() => (
            <UserContextProvider>
              <LanguagesPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/cate-list`}
          render={() => (
            <UserContextProvider>
              <CategoriesPage />
            </UserContextProvider>
          )}
        ></Route>





        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/group-list`}
          render={() => (
            <UserContextProvider>
              <GroupListPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/subgroup-list`}
          render={() => (
            <UserContextProvider>
              <SubGroupPage />
            </UserContextProvider>
          )}
        ></Route>

        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-details-regular/:id`}
          render={(props) => (
            <UserContextProvider>
              <UserDetailsPage {...props} />
            </UserContextProvider>
          )}
        ></Route>

        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/product-details/`}
          render={(props) => (
            <UserContextProvider>
              <ProductDetailsPage {...props} />
            </UserContextProvider>
          )}
        ></Route>

        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/product-list/:id`}
          render={(props) => (
            <UserContextProvider>
              <ProductListPage {...props} />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/banner-list`}
          render={(props) => (
            <UserContextProvider>
              <BannersList {...props} />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-regular/`} component={UserProfileLayout}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/user-profile-notification/`}
          component={UserProfileLayout}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-activity/`} component={UserProfileLayout}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-setting/`} component={UserProfileLayout}></Route>
        <Route //Context api added
          exact
          path={`${process.env.PUBLIC_URL}/user-contact-card`}
          render={() => (
            <UserContextProvider>
              <UserContactCardPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-list-default`} component={OrderDefault}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/attributes-datas`} component={AttrData}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/list-default`} component={List}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pages-list-default`} component={PageDetails}></Route>


        {/* Cateogory AddEdit*/}
        <Route exact path={`${process.env.PUBLIC_URL}/main-category-add-edit`} component={MainCategoryAddEdit}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/sub-category-add-edit`} component={SubCategoryAddEdit}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/child-category-add-edit`} component={ChildCategoryAddEdit}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/products-list-default`} component={ProductsList}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/order-list-regular`} component={OrderRegular}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-list-sales`} component={OrderSales}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/coupon-list`} component={CouponsList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/coupon-sample`} component={CouponSample}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/coupon-details`} component={CouponDetails}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/kyc-list-regular`} component={KycListRegular}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/kyc-details-regular/:id`} component={KycDetailsRegular}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/product-list`} component={ProductList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/product-announcements`} component={Announcements}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/langslists`} component={Lang}></Route> */}


        <Route exact path={`${process.env.PUBLIC_URL}/vendor-edit`} component={VendorEdit}></Route>




        <Route // context api added
          exact
          path={`${process.env.PUBLIC_URL}/product-card`}
          render={(props) => (
            <ProductContextProvider>
              <ProductCard />
            </ProductContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/product-details/:id`}
          render={(props) => (
            <ProductContextProvider>
              <ProductDetails {...props} />
            </ProductContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/invoice-list`} component={InvoiceList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/attributes-list`} component={Attributes}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/invoice-details/:id`} component={InvoiceDetails}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pricing-table`} component={PricingTable}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/image-gallery`} component={GalleryPreview}></Route>

        {/*Demo Pages*/}
        <Route exact path={`${process.env.PUBLIC_URL}/pages/terms-policy`} component={Terms}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pages/faq`} component={Faq}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pages/regular-v1`} component={Regularv1}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pages/regular-v2`} component={Regularv2}></Route>

        {/*Application*/}
        <Route exact path={`${process.env.PUBLIC_URL}/product_lists_add_edit`} component={ProductListAddEdit}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/product_list_variation`} component={ProductlistVariation}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/prod-list/add-stocks`} component={AppStocks}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/coupon-add_edit`} component={CouponAddEdit}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/coupon-add_edit/:id`} component={CouponAddEdit}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/product-details`} component={ProductDetailsPage}></Route> */}
        <Route exact path={`${process.env.PUBLIC_URL}/merchants-lists`} component={Merchants}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/system-settings`} component={System}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/app-chat`} component={Chat}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/app-calender`} component={Calender}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/app-kanban`} component={Kanban}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/app-inbox`} component={Inbox}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/settings`} component={AppSettings}></Route>

        {/*Components*/}
        <Route exact path={`${process.env.PUBLIC_URL}/components`} component={Component}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/accordions`} component={Accordian}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/alerts`} component={Alerts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/avatar`} component={Avatar}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/badges`} component={Badges}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/breadcrumbs`} component={Breadcrumbs}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/button-group`} component={ButtonGroup}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/buttons`} component={Buttons}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/cards`} component={Cards}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/carousel`} component={Carousel}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/dropdowns`} component={Dropdowns}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/datetime-picker`} component={DateTimePicker}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-elements`} component={FormElements}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-layouts`} component={FormLayouts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/checkbox-radio`} component={CheckboxRadio}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/advanced-control`}
          component={AdvancedControls}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/input-group`} component={InputGroup}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-upload`} component={FormUpload}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/number-spinner`} component={NumberSpinner}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-validation`} component={FormValidation}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/modals`} component={Modals}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/pagination`} component={Pagination}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/popovers`} component={Popovers}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/progress`} component={Progress}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/spinner`} component={Spinner}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/tabs`} component={Tabs}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/toast`} component={Toast}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/tooltips`} component={Tooltips}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/typography`} component={Typography}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/noUislider`} component={NouiSlider}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/wizard-basic`} component={WizardForm}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/quill`} component={QuillPreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/tinymce`} component={TinymcePreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/widgets/cards`} component={CardWidgets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/widgets/charts`} component={ChartWidgets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/widgets/rating`} component={RatingWidgets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/slick-slider`} component={SlickPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/custom`} component={CustomPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/sweet-alert`} component={SweetAlertPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/beautiful-dnd`} component={BeautifulDnd}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/map`} component={GoogleMapPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/dual-list`} component={DualListPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/toastify`} component={ReactToastify}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/jsTree`} component={JsTreePreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-border`} component={UtilBorder}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-colors`} component={UtilColors}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-display`} component={UtilDisplay}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-embeded`} component={UtilEmbeded}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-flex`} component={UtilFlex}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-others`} component={UtilOthers}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-sizing`} component={UtilSizing}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-spacing`} component={UtilSpacing}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-text`} component={UtilText}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/table-basic`} component={BasicTable}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/table-datatable`} component={DataTablePage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/table-disputes`} component={DisputesTable}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-data`} component={OrdersList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-data-list`} component={OrderssDataList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/visitors`} component={Vist}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/attr-table`} component={AttsData}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/tags`} component={Tags}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/product-table`} component={Prods}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/coupons`} component={Coupon}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/discount`} component={NewDiscount}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/add-discount`} component={AddDiscount}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/groups-list`} component={Group}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/category-subgroup`} component={Group2}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/category`} component={Category}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/cart-list`} component={OrdersCartList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin`} component={Admin}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/roles`} component={Roles}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/tickets`} component={Tickets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin_user_view`} component={UserView}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin_customer_view`} component={CustomerView}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/banners`} component={Banners}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/blog`} component={Blog}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/blogData`} component={BlogData}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/popular_categories`} component={PopularCategories}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/featured_brands`} component={FeaturedBrands}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/deals_of_the_week`} component={DealsOfTheWeek}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/everyday_needs`} component={EveryDayNeeds}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/new_arrivals`} component={NewArrivals}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/refunds`} component={Refunds}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/country`} component={BussinessArea1}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/customer-list`} component={CustomerList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/merchant-list`} component={MerchantList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/merchant-view`} component={VendorProfile}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/shop-list`} component={ShopList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/cancel-list`} component={OrdersCancelList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/manu-table`} component={ManuTable}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/table-special`} component={SpecialTablePage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/charts/chartjs`} component={ChartPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/charts/knobs`} component={KnobPreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/email-template`} component={EmailTemplate}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/nioicon`} component={NioIconPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/svg-icons`} component={SVGIconPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/orders-lists`} component={OrdersList1}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders-lists1`} component={OrdersList2}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders-lists3`} component={OrdersList3}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders-lists4`} component={OrdersList4}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/cancel-details`} component={CancelList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/cancel-details1`} component={CancelList1}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/return_order-details`} component={ReturnOrderList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/return_sub_order_details`} component={ReturnSubOrderList}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/sample`} component={Sample}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/vendor-merchant`} component={VendorMerchant}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/WareHouse`} component={WareHousePage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders-setting`} component={OrdersSettings}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/shipping`} component={Shipping}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/add-shipping`} component={AddShipping}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/redeem_points`} component={Redeempoints}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/Reward-Points`} component={RewardPoints}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/points_settings`} component={PointsSettings}></Route>
        {/*Gift Offer */}

        <Route exact path={`${process.env.PUBLIC_URL}/Gift-offers`} component={Giftoffers}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/gift_offer_add_edit`} component={GiftOfferAddEdit}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/gift_offer_add_edit`} component={}></Route> */}

        {/* <Route exact path={`${process.env.PUBLIC_URL}/shipping`} component={Shipping}></Route> */}
        <Route exact path={`${process.env.PUBLIC_URL}/featured_brand_banner`} component={FeatureBrandBanner}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/return-list`} component={ReturnList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/invoice_page`} component={InvoicePage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/create_notes`} component={CreditNotes}></Route>


        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
