import React, { useEffect, useState } from "react";
//import menu from "./MenuData";
import { NavLink, Link } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import classNames from "classnames";

// import { API_Role, API_URL, token, } from "../../Api";
import axios from "axios";
import { API_URL, API_Staff, API_Role, token, API_Warehouse } from "../../Api";
const Role_Api = `${API_URL}/admin/VendorRoles`;
const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

const menu = [
  {
    icon: "cart-fill",
    text: "Dashboard",
    link: "/",
  },


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
  },

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
      {
        text: "Settings",
        link: "/orders-setting",
      },
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
  {
    icon: "",
    text: "Invoice",
    link: "/invoice_page",
  },
  {
    icon: "",
    text: "Credit Notes",
    link: "/create_notes",
  },
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
  return (
    <li className={menuItemClass} onClick={(e) => toggleActionSidebar(e)}>
      {newTab ? (
        <Link
          to={`${process.env.PUBLIC_URL + link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-menu-link"
        >
          {icon ? (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
        </Link>
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


  const [roles, setRoles] = useState({
    ProductView: false,
    OrderView: false,
    ProfileView: false,
  })


  console.log(roles.ProductView, "ggggggggggggggggg");

  useEffect(() => {
    const vID = localStorage.getItem("vendor_id");
    // console.log("vid", vID);
    setVendor(vID ? true : false);
    let staf = localStorage.getItem("staff_id");
    console.log("staff", staf)
    if (staf) {
      staff();
    }
  }, [])

  const staff = async () => {
    const staffVal = localStorage.getItem("staff_id");
    // const vendorVal = localStorage.getItem("staffVendor_id");
    const { data } = await axios.get(`${API_Staff}/${staffVal}`, config);
    const role = await axios.get(`${Role_Api}/${data.list[0].role_id}`, config);
    console.log("data", role)
    let per = JSON.parse(role.data.list[0].permission);
    console.log("per", per)
    setRoles({
      ProductView: per[0].view == 1 ? true : false,
      OrderView: per[1].view == 1 ? true : false,
      ProfileView: per[2].view == 1 ? true : false,
    })
    // setRoless(JSON.parse(role.data.list[0].permission));
    rolee.push({ per })
    // console.log("hhhhhh", JSON.parse(role.data.list[0].permission))
  }

  const menuitemslist = [
    {
      icon: "cart-fill",
      text: "Dashboard",
      link: "/",
    },

    (roles.ProductView == true ?
      {
        icon: "card-view",
        text: "Products",

        subMenu: [
          {
            text: "Product List",
            link: "/product_list",
          },
          {
            text: "Stock List",
            link: "/stock-list",
          },
        ],
      } : ""


    ),


    (roles.OrderView == true ?
      {
        icon: "file-docs",
        text: "Orders",
        active: false,
        subMenu: [
          {
            text: "Orders",
            link: "/prods-list",
          },

          {
            text: "Cancellations",
            link: "/cancel-list",
          },
          {
            text: "Return",
            link: "/return-list",
          },
        ],
      } : ""

    ),

    (roles.ProfileView == true ?
      {
        icon: "users-fill",
        text: "Profile",
        link: "/Profile",
      } : ""
    ),


    {
      icon: "",
      text: "Reports",
      // link:"",
    },

    {
      icon: "",
      text: "Credit Notes",
      link: "/Invoice",
    },


  ];
  const menuitemslists = [
    {
      icon: "cart-fill",
      text: "Dashboard",
      link: "/",
    },


    {
      icon: "card-view",
      text: "Products",

      subMenu: [
        {
          text: "Product List",
          link: "/product_list",
        },
        {
          text: "Stock List",
          link: "/stock-list",
        },
      ],
    },
    



    {
      icon: "file-docs",
      text: "Orders",
      active: false,
      subMenu: [
        {
          text: "Orders",
          link: "/prods-list",
        },

        {
          text: "Cancellations",
          link: "/cancel-list",
        },
        {
          text: "Return",
          link: "/return-list",
        },
      ],
    },




    {
      icon: "users-fill",
      text: "Profile",
      link: "/Profile",
    },



    {
      icon: "",
      text: "Reports",
      // link:"",
    },

    {
      icon: "",
      text: "Credit Notes",
      link: "/Invoice",
    },


  ];

  const PanelItem = ({ icon, link, text, subPanel, index, data, setMenuData, ...props }) => {
    const menuItemClass = classNames({
      "nk-menu-item": true,
    });

    if (data === menuitemslist) {
      return (
        <li className={menuItemClass}>
          <Link
            to={`${process.env.PUBLIC_URL}${link}`}
            className="nk-menu-link"
            onClick={() => setMenuData([menuitemslist[index]])}
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
            <Link to={`${process.env.PUBLIC_URL}/`} className="nk-menu-link" onClick={() => setMenuData(menuitemslist)}>
              <span className="nk-menu-icon">
                <Icon name="dashlite-alt" />
              </span>
              <span className="nk-menu-text">Main Dashboard</span>
            </Link>
          </li>
          <li className={menuItemClass}>
            <Link to={`${process.env.PUBLIC_URL}/`} className="nk-menu-link" onClick={() => setMenuData(menuitemslist)}>
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

  const [data, setMenuData] = useState(menuitemslist);
  const [vendor, setVendor] = useState(false);



  return (
    <ul className="nk-menu">
      {vendor ? <>

        {menuitemslists.map((item, index) =>

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
              data={menuitemslist}
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

      </> :
        <>
          {menuitemslist.map((item, index) =>

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
                data={menuitemslist}
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
        </>
      }

    </ul>
  );
};

export default Menu;
