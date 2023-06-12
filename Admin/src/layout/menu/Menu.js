import React, { useEffect, useState } from "react";
//import menu from "./MenuData";
import { NavLink, Link } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import classNames from "classnames";

import { API_Role, API_URL, token, } from "../../Api";
import axios from "axios";
import { useCookies } from "react-cookie";
import ReactDataTable from './../../components/table/ReactDataTable';
import SortBasedOnNames from "../../helpers/sortByNames";
const Role_Api = `${API_URL}/admin/userRoles`;
const API_View = `${API_URL}/Admin_Staff`;
const API_STAFF = `${API_URL}/admin/users`

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};
var role = [];
var rolesss = false;
// console.log("ttttttt", role)
const menu = [
  {
    icon: "cart-fill",
    text: "Dashboard",
    link: "/",
  },

  (typeof role[0]?.categoryview != undefined && role[0]?.categoryview == 1 ?
    {
      icon: "package-fill",
      text: "Category",
      active: false,
      subMenu: [
        {
          text: "Main Category",
          link: "/main-category-list",
        },

        {
          text: "Sub Category",
          link: "/sub-category-list",
        },

        {
          text: "Child Category",
          link: "/child-category-list",
        },
      ],
    } : {
      icon: "package-fill",
      text: "Category",
      active: false,
      subMenu: [
        {
          text: "Main Category",
          link: "/main-category-list",
        },

        {
          text: "Sub Category",
          link: "/sub-category-list",
        },

        {
          text: "Child Category",
          link: "/child-category-list",
        },
      ],
    }),

  {
    icon: "cc-alt2-fill",
    text: "Catalog",
    active: false,
    subMenu: [
      {
        text: "Attributes",
        link: "/attr-table",
      },

      {
        text: "Brands",
        link: "/manu-table",
      },
      {
        text: "Tags",
        link: "/tags",
      },
    ],
  },

  {
    icon: "card-view",
    text: "Products",

    subMenu: [
      {
        text: "Product List",
        link: "/prod-list",
      },
      {
        text: "Stock List",
        link: "/stock-list",
      },
      {
        text: "Reviews",
        link: "/product-review",
      },
      {
        text: "Q & A",
        link: "/question-answer",
      },
      // {
      //   text: "Reviews",
      //   link: "/prod-Reviews",
      // },
      {
        text: "Subscription",
        link: "/prod-subscription",
      },
    ],
  },

  {
    icon: "activity-round-fill",
    text: "Coupon",
    link: "/coupons",
  },
  {
    icon: "offer-fill",
    text: "Discount",
    link: "/discount",
  },

  {
    icon: "file-docs",
    text: "Orders",
    active: false,
    subMenu: [
      {
        text: "Orders",
        link: "/order-data",
      },
      {
        text: "Carts",
        link: "/cart-list",
      },
      {
        text: "Cancellations",
        link: "/cancel-list",
      },
      {
        text: "Return",
        link: "/return-list",
      },
      // {
      //   text: "Settings",
      //   link: "/orders-setting",
      // },
    ],
  },

  {
    icon: "bag",
    text: "Vendors",
    active: false,
    subMenu: [
      {
        text: "Vendor List",
        link: "/merchant-list",
      },
      {
        text: "Warehouse list",
        link: "/warehouse",
      },
    ],
  },

  {
    icon: "user-c",
    text: "Customers",
    link: "/customer-list",
  },

  {
    icon: "users-fill",
    text: "Admin",

    active: false,
    subMenu: [
      {
        text: "Staff ",
        link: "/admin",
      },

      {
        text: "User Roles",
        link: "/roles",
      },
    ],
  },

  {
    icon: "coin",
    text: "Points",
    active: false,
    subMenu: [
      {
        text: "Redeem Points ",
        link: "/redeem_points",
      },
      {
        text: "Reward Points ",
        link: "/Reward-Points",
      },
      {
        text: "Settings",
        link: "/points_settings",
      },
    ],
  },

  {
    icon: "growth-fill",
    text: "Appearance",
    active: true,
    subMenu: [
      {
        text: "Banners",
        link: "/banners",
      },
      {
        text: "Popular categories",
        link: "/popular_categories",
      },

      {
        text: "Featured brands",
        link: "/featured_brands",
      },
      //   {
      //     text: "Deals of the week",
      //     link: "/deals_of_the_week",
      //   },
      //   {
      //     text: "Everyday needs",
      //     link: "/everyday_needs",
      //   },
      //   {
      //     text: "New arrivals",
      //     link: "/new_arrivals",
      //   },
      {
        text: "Home Page Section",
        link: "/home",
      },

    ],
  },
  {
    icon: "book",
    text: "Blogs",
    link: "/blog",
    active: true,
  },

  {
    icon: "sign-dash-alt",
    text: "Shipping",
    link: "/shipping",
  },
  {
    icon: "gift",
    text: "Gift Offers",
    link: "/Gift-offers",
  },
  // {
  //   icon: "",
  //   text: "Invoice",
  //   link: "/invoice_page",
  // },
  // {
  //   icon: "",
  //   text: "Credit Notes",
  //   link: "/create_notes",
  // },
];

const MenuHeading = ({ heading }) => {
  return (
    <li className="nk-menu-heading">
      <h6 className="overline-title text-primary-alt">{heading}</h6>
    </li>
  );
};

const MenuItem = ({ icon, link, text, sub, subPanel, panel, newTab, mobileView, sidebarToggle, badge, ...props }) => {
  let currentUrl;

  const toggleActionSidebar = (e) => {
    if (!sub && !newTab && mobileView) {
      sidebarToggle(e);
    }
  };

  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }

  const menuHeight = (el) => {
    var totalHeight = [];
    for (var i = 0; i < el.length; i++) {
      var margin =
        parseInt(window.getComputedStyle(el[i]).marginTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(el[i]).marginBottom.slice(0, -2));
      var padding =
        parseInt(window.getComputedStyle(el[i]).paddingTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(el[i]).paddingBottom.slice(0, -2));
      var height = el[i].clientHeight + margin + padding;
      totalHeight.push(height);
    }
    totalHeight = totalHeight.reduce((sum, value) => (sum += value));
    return totalHeight;
  };

  const makeParentActive = (el, childHeight) => {
    let element = el.parentElement.parentElement.parentElement;
    let wrap = el.parentElement.parentElement;
    if (element.classList[0] === "nk-menu-item") {
      element.classList.add("active");
      const subMenuHeight = menuHeight(el.parentNode.children);
      wrap.style.height = subMenuHeight + childHeight - 50 + "px";
      makeParentActive(element);
    }
  };

  useEffect(() => {
    var element = document.getElementsByClassName("nk-menu-item active current-page");
    var arrayElement = [...element];

    arrayElement.forEach((dom) => {
      if (dom.parentElement.parentElement.parentElement.classList[0] === "nk-menu-item") {
        dom.parentElement.parentElement.parentElement.classList.add("active");
        const subMenuHeight = menuHeight(dom.parentNode.children);
        dom.parentElement.parentElement.style.height = subMenuHeight + "px";
        makeParentActive(dom.parentElement.parentElement.parentElement, subMenuHeight);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const menuToggle = (e) => {
    e.preventDefault();
    var self = e.target.closest(".nk-menu-toggle");
    var parent = self.parentElement;
    var subMenu = self.nextSibling;
    var subMenuItem = subMenu.childNodes;
    var parentSiblings = parent.parentElement.childNodes;
    var parentMenu = parent.closest(".nk-menu-wrap");
    //For Sub Menu Height
    var subMenuHeight = menuHeight(subMenuItem);
    // Get parent elements
    const getParents = (el, parentSelector) => {
      parentSelector = document.querySelector(".nk-menu");
      if (parentSelector === undefined) {
        parentSelector = document;
      }
      var parents = [];
      var p = el.parentNode;
      while (p !== parentSelector) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
      }
      parents.push(parentSelector);
      return parents;
    };
    var parentMenus = getParents(self);
    if (!parent.classList.contains("active")) {
      // For Parent Siblings
      for (var j = 0; j < parentSiblings.length; j++) {
        parentSiblings[j].classList.remove("active");
        if (typeof parentSiblings[j].childNodes[1] !== "undefined") {
          parentSiblings[j].childNodes[1].style.height = 0;
        }
      }
      if (parentMenu !== null) {
        if (!parentMenu.classList.contains("sub-opened")) {
          parentMenu.classList.add("sub-opened");

          for (var l = 0; l < parentMenus.length; l++) {
            if (typeof parentMenus !== "undefined") {
              if (parentMenus[l].classList.contains("nk-menu-wrap")) {
                parentMenus[l].style.height = subMenuHeight + parentMenus[l].clientHeight + "px";
              }
            }
          }
        }
      }
      // For Current Element
      parent.classList.add("active");
      subMenu.style.height = subMenuHeight + "px";
    } else {
      parent.classList.remove("active");
      if (parentMenu !== null) {
        parentMenu.classList.remove("sub-opened");
        for (var k = 0; k < parentMenus.length; k++) {
          if (typeof parentMenus !== "undefined") {
            if (parentMenus[k].classList.contains("nk-menu-wrap")) {
              parentMenus[k].style.height = parentMenus[k].clientHeight - subMenuHeight + "px";
            }
          }
        }
      }
      subMenu.style.height = 0;
    }
  };

  const menuItemClass = classNames({
    "nk-menu-item": true,
    "has-sub": sub,
    "active current-page": currentUrl === process.env.PUBLIC_URL + link,
  });
  // console.log(link === undefined ? "empty" : link, "newTab");
  return (

    <li className={menuItemClass} onClick={(e) => toggleActionSidebar(e)}>
      {newTab ? (
        // <Link
        //   to={`${process.env.PUBLIC_URL + link}`}
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   className="nk-menu-link"
        // >
        //   {icon ? (
        //     <span className="nk-menu-icon">
        //       <Icon name={icon} />
        //     </span>
        //   ) : null}
        //   <span className="nk-menu-text">{text}</span>
        // </Link>
        <span>ReactDataTable</span>
      ) : (

        <NavLink
          to={`${process.env.PUBLIC_URL + link}`}
          className={`nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
          onClick={sub ? menuToggle : null}
        >
          {icon ? (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
          {badge && <span className="nk-menu-badge">{badge}</span>}
        </NavLink>
      )}
      {sub ? (
        <div className="nk-menu-wrap">
          <MenuSub sub={sub} sidebarToggle={sidebarToggle} mobileView={mobileView} />
        </div>
      ) : null}
    </li>
  );
};



const MenuSub = ({ icon, link, text, sub, sidebarToggle, mobileView, ...props }) => {
  return (
    <ul className="nk-menu-sub" style={props.style}>
      {sub.map((item) => (
        <MenuItem
          link={item.link}
          icon={item.icon}
          text={item.text}
          sub={item.subMenu}
          key={item.text}
          newTab={item.newTab}
          badge={item.badge}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

const Menu = ({ sidebarToggle, mobileView }) => {


  const [data, setMenuData] = useState(menu);

  const [roles, setRoles] = useState([])
  const [menuCondition, setMenuCondition] = useState([])

  const [cookies, setCookie, removeCookie] = useCookies();

  const CookieID = cookies.user_id;
  // console.log("CookieID", CookieID);
  const accesstoken = localStorage.getItem("rols");
  // console.log("getData", accesstoken);
  useEffect(() => {
    someData()
  }, [])
  const someData = async () => {
    const result = await axios.get(`${API_STAFF}/${cookies.user_id}`, config)

    // const res =result.data.list.filter((item)=>{
    //   console.log(item.user_id, 'item')
    //   return item.user_id===CookieID
    // })
    // console.log(result, "roleResult");


    setRoles({
      email: result.data.list[0].emailaddress,
      fullname: result.data.list[0].fullname,
      role_id: result.data.list[0].role_id,
      Avatar: result.data.list[0].Avatar,
    })

    let Results = await axios.get(`${Role_Api}/${result.data.list[0].role_id}`, config);
    // console.log("Results", Results.data.list[0]);
    setMenuCondition(Results.data.list[0])
    role.push(Results.data.list[0])
    // setRoless(Results.data.list)

    // JSON.parse(Results.data.list[0].permission).map((items)=>{
    //   console.log("test",items.model_name)
    // })




  }
  // console.log(menuCondition, "uuuuu");
  // { console.log("roleooo", menuCondition.catalogview === 1 ? "one visible" : "empty") }
  // if(menuCondition.catalogview === 1){
  //   const menuitemslist = [
  //     {
  //       icon: "cart-fill",
  //       text: "Dashboard",
  //       link: "/",
  //     },
  //   ]  
  // }
  // const menuitemslist = [
  //   {
  //     icon: "cart-fill",
  //     text: "Dashboard",
  //     link: "/",
  //   },

  // ...(menuCondition.catalogview === 1 ?
  //     {
  //       icon: "package-fill",
  //       text: "Category",
  //       active: false,
  //     } :
  //     {
  //       icon: "package-fill",
  //       text: "Category",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Main Category",
  //           link: "/main-category-list",
  //         },

  //         {
  //           text: "Sub Category",
  //           link: "/sub-category-list",
  //         },

  //         {
  //           text: "Child Category",
  //           link: "/child-category-list",
  //         },
  //       ],
  //     }),


  //   (typeof role[0]?.catalogview != undefined && role[0]?.catalogview == 1 ?
  //     {
  //       icon: "cc-alt2-fill",
  //       text: "Catalog",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Attributes",
  //           link: "/attr-table",
  //         },

  //         {
  //           text: "Brands",
  //           link: "/manu-table",
  //         },
  //         {
  //           text: "Tags",
  //           link: "/tags",
  //         },
  //       ],
  //     }
  //     :
  //     {
  //       icon: "cc-alt2-fill",
  //       text: "Catalog",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Attributes",
  //           link: "/attr-table",
  //         },

  //         {
  //           text: "Brands",
  //           link: "/manu-table",
  //         },
  //         {
  //           text: "Tags",
  //           link: "/tags",
  //         },
  //       ],

  //     }

  //   ),

  //   (typeof role[0]?.productview != undefined && role[0]?.productview == 1 ?
  //     {
  //       icon: "card-view",
  //       text: "Products",

  //       subMenu: [
  //         {
  //           text: "Product List",
  //           link: "/prod-list",
  //         },
  //         {
  //           text: "Stock List",
  //           link: "/stock-list",
  //         },
  //         {
  //           text: "Reviews",
  //           link: "/product-review",
  //         },
  //         {
  //           text: "Q & A",
  //           link: "/question-answer",
  //         },
  //         // {
  //         //   text: "Reviews",
  //         //   link: "/prod-Reviews",
  //         // },
  //         {
  //           text: "Subscription",
  //           link: "/prod-subscription",
  //         },
  //       ],
  //     }
  //     : {
  //       icon: "card-view",
  //       text: "Products",

  //       subMenu: [
  //         {
  //           text: "Product List",
  //           link: "/prod-list",
  //         },
  //         {
  //           text: "Stock List",
  //           link: "/stock-list",
  //         },
  //         {
  //           text: "Reviews",
  //           link: "/product-review",
  //         },
  //         {
  //           text: "Q & A",
  //           link: "/question-answer",
  //         },
  //         // {
  //         //   text: "Reviews",
  //         //   link: "/prod-Reviews",
  //         // },
  //         {
  //           text: "Subscription",
  //           link: "/prod-subscription",
  //         },
  //       ],

  //     }),

  //   (typeof role[0]?.couponview != undefined && role[0]?.couponview == 1 ?
  //     {
  //       icon: "activity-round-fill",
  //       text: "Coupon",
  //       link: "/coupons",
  //     }
  //     : {
  //       icon: "activity-round-fill",
  //       text: "Coupon",
  //       link: "/coupons",

  //     }),


  //   (typeof role[0]?.discountview != undefined && role[0]?.discountview == 1 ?
  //     {
  //       icon: "offer-fill",
  //       text: "Discount",
  //       link: "/discount",
  //     }
  //     : {
  //       icon: "offer-fill",
  //       text: "Discount",
  //       link: "/discount",
  //     }),

  //   (typeof role[0]?.ordersview != undefined && role[0]?.ordersview == 1 ?
  //     {
  //       icon: "file-docs",
  //       text: "Orders",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Orders",
  //           link: "/order-data",
  //         },
  //         {
  //           text: "Carts",
  //           link: "/cart-list",
  //         },
  //         {
  //           text: "Cancellations",
  //           link: "/cancel-list",
  //         },
  //         {
  //           text: "Return",
  //           link: "/return-list",
  //         },
  //         {
  //           text: "Settings",
  //           link: "/orders-setting",
  //         },
  //       ],
  //     }
  //     : {
  //       icon: "file-docs",
  //       text: "Orders",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Orders",
  //           link: "/order-data",
  //         },
  //         {
  //           text: "Carts",
  //           link: "/cart-list",
  //         },
  //         {
  //           text: "Cancellations",
  //           link: "/cancel-list",
  //         },
  //         {
  //           text: "Return",
  //           link: "/return-list",
  //         },
  //         {
  //           text: "Settings",
  //           link: "/orders-setting",
  //         },
  //       ],
  //     }),



  //   {
  //     icon: "bag",
  //     text: "Vendors",
  //     active: false,
  //     subMenu: [
  //       {
  //         text: "Vendor List",
  //         link: "/merchant-list",
  //       },
  //       {
  //         text: "Warehouse list",
  //         link: "/warehouse",
  //       },
  //     ],
  //   },

  //   {
  //     icon: "user-c",
  //     text: "Customers",
  //     link: "/customer-list",
  //   },


  //   (typeof role[0]?.adminview != undefined && role[0]?.adminview == 1 ?
  //     {
  //       icon: "users-fill",
  //       text: "Admin",

  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Staff ",
  //           link: "/admin",
  //         },

  //         {
  //           text: "User Roles",
  //           link: "/roles",
  //         },
  //       ],
  //     }
  //     : {
  //       icon: "users-fill",
  //       text: "Admin",

  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Staff ",
  //           link: "/admin",
  //         },

  //         {
  //           text: "User Roles",
  //           link: "/roles",
  //         },
  //       ],
  //     }
  //   ),

  //   (typeof role[0]?.pointsview != undefined && role[0]?.pointsview == 1 ?
  //     {
  //       icon: "coin",
  //       text: "Points",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Redeem Points ",
  //           link: "/redeem_points",
  //         },
  //         {
  //           text: "Reward Points ",
  //           link: "/Reward-Points",
  //         },
  //         {
  //           text: "Settings",
  //           link: "/points_settings",
  //         },
  //       ],
  //     }
  //     : {
  //       icon: "coin",
  //       text: "Points",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Redeem Points ",
  //           link: "/redeem_points",
  //         },
  //         {
  //           text: "Reward Points ",
  //           link: "/Reward-Points",
  //         },
  //         {
  //           text: "Settings",
  //           link: "/points_settings",
  //         },
  //       ],
  //     }
  //   ),


  //   (typeof role[0]?.appearanceview != undefined && role[0]?.appearanceview == 1 ?
  //     {
  //       icon: "growth-fill",
  //       text: "Appearance",
  //       active: true,
  //       subMenu: [
  //         {
  //           text: "Banners",
  //           link: "/banners",
  //         },
  //         {
  //           text: "Popular categories",
  //           link: "/popular_categories",
  //         },

  //         {
  //           text: "Featured brands",
  //           link: "/featured_brands",
  //         },
  //         //   {
  //         //     text: "Deals of the week",
  //         //     link: "/deals_of_the_week",
  //         //   },
  //         //   {
  //         //     text: "Everyday needs",
  //         //     link: "/everyday_needs",
  //         //   },
  //         //   {
  //         //     text: "New arrivals",
  //         //     link: "/new_arrivals",
  //         //   },
  //         {
  //           text: "Home Page Section",
  //           link: "/home",
  //         },

  //       ],
  //     }
  //     : {
  //       icon: "growth-fill",
  //       text: "Appearance",
  //       active: true,
  //       subMenu: [
  //         {
  //           text: "Banners",
  //           link: "/banners",
  //         },
  //         {
  //           text: "Popular categories",
  //           link: "/popular_categories",
  //         },

  //         {
  //           text: "Featured brands",
  //           link: "/featured_brands",
  //         },
  //         //   {
  //         //     text: "Deals of the week",
  //         //     link: "/deals_of_the_week",
  //         //   },
  //         //   {
  //         //     text: "Everyday needs",
  //         //     link: "/everyday_needs",
  //         //   },
  //         //   {
  //         //     text: "New arrivals",
  //         //     link: "/new_arrivals",
  //         //   },
  //         {
  //           text: "Home Page Section",
  //           link: "/home",
  //         },

  //       ],
  //     }
  //   ),

  //   {
  //     icon: "book",
  //     text: "Blogs",
  //     link: "/blog",
  //     active: true,
  //   },


  //   (typeof role[0]?.shippingview != undefined && role[0]?.shippingview == 1 ?
  //     {
  //       icon: "sign-dash-alt",
  //       text: "Shipping",
  //       link: "/shipping",
  //     }
  //     : {
  //       icon: "sign-dash-alt",
  //       text: "Shipping",
  //       link: "/shipping",
  //     }
  //   ),

  //   (typeof role[0]?.giftofferview != undefined && role[0]?.giftofferview == 1 ?
  //     {
  //       icon: "gift",
  //       text: "Gift Offers",
  //       link: "/Gift-offers",
  //     }
  //     : {
  //       icon: "gift",
  //       text: "Gift Offers",
  //       link: "/Gift-offers",
  //     }
  //   ),

  //   {
  //     icon: "",
  //     text: "Invoice",
  //     link: "/invoice_page",
  //   },

  //   {
  //     icon: "",
  //     text: "Credit Notes",
  //     link: "/create_notes",
  //   },
  // ];


  //MENUS RESTRICTIONS


  const menuitemslist = [
    {
      icon: "cart-fill",
      text: "Dashboard",
      link: "/",
    },
    (menuCondition.categoryview === 1 ?
      {
        icon: "package-fill",
        text: "Category",
        active: false,
        subMenu: [
          {
            text: "Main Category",
            link: "/main-category-list",
          },

          {
            text: "Sub Category",
            link: "/sub-category-list",
          },

          {
            text: "Child Category",
            link: "/child-category-list",
          },]
      } : 'REMOVE'),
    (menuCondition.catalogview === 1 ?
      {
        icon: "cc-alt2-fill",
        text: "Catalog",
        active: false,
        subMenu: [
          {
            text: "Attributes",
            link: "/attr-table",
          },

          {
            text: "Brands",
            link: "/manu-table",
          },
          {
            text: "Tags",
            link: "/tags",
          },
        ],
      } : 'REMOVE'),
    (menuCondition.productview === 1 ?
      {
        icon: "card-view",
        text: "Products",

        subMenu: [
          {
            text: "Product List",
            link: "/prod-list",
          },
          {
            text: "Stock List",
            link: "/stock-list",
          },
          {
            text: "Reviews",
            link: "/product-review",
          },
          {
            text: "Q & A",
            link: "/question-answer",
          },
          // {
          //   text: "Reviews",
          //   link: "/prod-Reviews",
          // },
          {
            text: "Subscription",
            link: "/prod-subscription",
          },
        ],
      }
      : 'REMOVE'),
    (menuCondition.couponview === 1 ?
      {
        icon: "activity-round-fill",
        text: "Coupon",
        link: "/coupons",
      }
      : 'REMOVE'),
    (menuCondition.discountview === 1 ?
      {
        icon: "offer-fill",
        text: "Discount",
        link: "/discount",
      }
      : 'REMOVE'),
    (menuCondition.ordersview === 1 ?
      {
        icon: "file-docs",
        text: "Orders",
        active: false,
        subMenu: [
          {
            text: "Orders",
            link: "/order-data",
          },
          {
            text: "Carts",
            link: "/cart-list",
          },
          {
            text: "Cancellations",
            link: "/cancel-list",
          },
          {
            text: "Return",
            link: "/return-list",
          },
          // {
          //   text: "Settings",
          //   link: "/orders-setting",
          // },
        ],
      }
      : 'REMOVE'),
    (menuCondition.vendorview === 1 ?
      {
        icon: "bag",
        text: "Vendors",
        active: false,
        subMenu: [
          {
            text: "Vendor List",
            link: "/merchant-list",
          },
          {
            text: "Warehouse list",
            link: "/warehouse",
          },
        ],
      }
      : 'REMOVE'),
    {
      icon: "user-c",
      text: "Customers",
      link: "/customer-list",
    },
    (menuCondition.adminview === 1 ?
      {
        icon: "users-fill",
        text: "Admin",
        active: false,
        subMenu: [
          {
            text: "Staff ",
            link: "/admin",
          },

          {
            text: "User Roles",
            link: "/roles",
          }]
      }
      : 'REMOVE'),
    (menuCondition.pointsview === 1 ?
      {
        icon: "coin",
        text: "Points",
        active: false,
        subMenu: [
          {
            text: "Redeem/Reward Points ",
            link: "/redeem_points",
          },
          // {
          //   text: "Reward Points ",
          //   link: "/Reward-Points",
          // },
          {
            text: "Settings",
            link: "/points_settings",
          },
        ],
      }
      : 'REMOVE'),
    (menuCondition.appearanceview === 1 ?
      {
        icon: "growth-fill",
        text: "Appearance",
        active: true,
        subMenu: [
          {
            text: "Banners",
            link: "/banners",
          },
          {
            text: "Popular categories",
            link: "/popular_categories",
          },
          {
            text: "Featured brands",
            link: "/featured_brands",
          },
          {
            text: "Home Page Section",
            link: "/home",
          },
        ],
      } : 'REMOVE'),
    {
      icon: "book",
      text: "Blogs",
      link: "/blog",
      active: true,
    },

    (menuCondition.shippingview === 1 ?
      {
        icon: "sign-dash-alt",
        text: "Shipping",
        link: "/shipping",
      }
      : 'REMOVE'),
    (menuCondition.giftofferview === 1 ?
      {
        icon: "gift",
        text: "Gift Offers",
        link: "/Gift-offers",
      }
      : 'REMOVE'),
    // {
    //   icon: "",
    //   text: "Invoice",
    //   link: "/invoice_page",
    // },
    // {
    //   icon: "",
    //   text: "Credit Notes",
    //   link: "/create_notes",
    // },
    // (menuCondition.socialview === 1 ?
    //   {
    //     icon: "sign-dash-alt",
    //     text: "Shipping",
    //     link: "/shipping",
    //   }
    //   : 'REMOVE'),
    // (menuCondition.settingsview === 1 ?
    //   {
    //     icon: "card-view",
    //     text: "list",
    //   }
    //   : 'REMOVE'),

  ]
  // console.log(menuitemslist.sort(SortBasedOnNames), 'heading')
//['dASHBARD','REMOVE','REMOVE']

function getMenu(){
  return menuitemslist.filter((r)=>r  !== 'REMOVE')
}

// console.log( ())
  const PanelItem = ({ icon, link, text, subPanel, index, data, setMenuData, ...props }) => {
    const menuItemClass = classNames({
      "nk-menu-item": true,
    });

    if (data === menuitemslist) {
      return (
        <li>
          <Link
            to={`${process.env.PUBLIC_URL}${link}`}
            className="nk-menu-link"
            onClick={() => setMenuData([getMenu()[index]])}
          >
            {icon ? (
              <span className="nk-menu-icon">
                <Icon name={icon} />
              </span>
            ) : null}
            <span className="nk-menu-text">{text}</span>
            <span className="nk-menu-badge">HOT</span>
          </Link>
        </li>
      );
    } else {
      return (
        <React.Fragment>
          {subPanel.map((item) => (
            <MenuItem
              key={item.text}
              link={item.link}
              icon={item.icon}
              text={item.text}
              sub={item.subMenu}
              badge={item.badge}
            />
          ))}
          <MenuHeading heading="Return to" />
          <li className={menuItemClass}>
            <Link to={`${process.env.PUBLIC_URL}/`} className="nk-menu-link" onClick={() => setMenuData(getMenu())}>
              <span className="nk-menu-icon">
                <Icon name="dashlite-alt" />
              </span>
              <span className="nk-menu-text">Main Dashboard</span>
            </Link>
          </li>
          <li className={menuItemClass}>
            <Link to={`${process.env.PUBLIC_URL}/`} className="nk-menu-link" onClick={() => setMenuData(getMenu())}>
              <span className="nk-menu-icon">
                <Icon name="layers-fill" />
              </span>
              <span className="nk-menu-text">All Components</span>
            </Link>
          </li>
        </React.Fragment>
      );
    }
  };



  useEffect(() => {
    getMenu().forEach((item, index) => {
      if (item.panel) {
        let found = item.subPanel.find((sPanel) => process.env.PUBLIC_URL + sPanel.link === window.location.pathname);
        if (found) {
          setMenuData([getMenu()[index]]);
        }
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // { console.log(menuitemslist, "head") }
  // console.log(menuitemslist.some(element => Object.values(element).some(val => val === undefined || val === "")), "reding")

  return (

    <ul className="nk-menu">
      {getMenu().map((item, index) =>
        item.heading ? (
          <MenuHeading heading={item.heading} key={item.heading} />
        ) : item.panel ? (
          <PanelItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            index={index}
            panel={item.panel}
            subPanel={item.subPanel}
            data={getMenu()}
            setMenuData={setMenuData}
            sidebarToggle={sidebarToggle}
          />
        ) : (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            sub={item.subMenu}
            badge={item.badge}
            panel={item.panel}
            subPanel={item.subPanel}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        )
      )}
    </ul>
  );
};

export default Menu;
