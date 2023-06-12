const menu = [
  // {
  //   heading: "Use-case preview",
  // },
  // {
  // icon: "bag",
  // text: "E-Commerce Panel",
  // link: "/ecommerce/index",
  // panel: true,
  // newTab: true,
  // subPanel: [
  //   {
  //     icon: "dashboard-fill",
  //     text: "Dashboard",
  //     link: "/ecommerce/index",
  //   },
  //   {
  //     icon: "bag-fill",
  //     text: "Orders",
  //     link: "/ecommerce/orders",
  //   },
  //   {
  //     icon: "package-fill",
  //     text: "Products",
  //     link: "/ecommerce/products",
  //   },
  //   {
  //     icon: "users-fill",
  //     text: "Customers",
  //     link: "/ecommerce/customer",
  //   },
  //   {
  //     icon: "chat-fill",
  //     text: "Support",
  //     link: "/ecommerce/support",
  //   },
  //   {
  //     icon: "opt-alt-fill",
  //     text: "Settings",
  //     link: "/ecommerce/settings",
  //   },

  // {
  //   icon: "server-fill",
  //   text: "Integration",
  //   link: "/ecommerce/integration",
  // },
  //   ],
  // },
  // {
  //   heading: "Dashboard",
  // },
  {
    icon: "cart-fill",
    text: "Dashboard",
    link: "/",
    // active: false,
  },
  // {
  //   icon: "activity-round-fill",
  //   text: "Sales",
  //   link: "/sales",
  // },
  //  {
  //    icon: "growth-fill",
  //  text: "Analytics",
  //    link: "/analytics",
  //  },
  // {
  //   heading: "",
  // },
  // {
  //   icon: "tile-thumb-fill",
  //   text: "Projects",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Project Cards",
  //       link: "/project-card",
  //     },
  //     {
  //       text: "Project List",
  //       link: "/project-list",
  //     },
  //   ],
  // },
  // {
  //   icon: "package-fill",
  //   text: "Category",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Main",
  //       link: "/main-category-list",
  //     },
  //     {
  //       text: "Sub-category",
  //       link: "/sub-category-list",
  //     },
  //     {
  //       text: "Child-Category",
  //       link: "/child-category-list",
  //     },
  //   ],
  // },

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

  // {
  //   icon: "card-view",
  //   text: "Payments",
  //   link: "/payments-list",

  // },

  // {
  //   icon: "file-docs",
  //   text: "Orders",
  //   link:"/prods-list",
  // },
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

  // {
  //   icon: "package-fill",
  //   text: "Store",
  //   link:"/stores-list",
  // },
  // active: false,
  // subMenu: [
  //   // {
  //   //   text: "Categories",
  //   //   // link: "/user-list-default",
  //   //   subMenu: [
  //   //             {
  //   //               text: "Group",
  //   //               link: "/groups-list",
  //   //               // badge: "new",
  //   //             },
  //   //             {
  //   //               text: "Sub-Group",
  //   //               link: "/category-subgroup",
  //   //               // badge: "new",
  //   //             },
  //   //             {
  //   //               text: "Categories",
  //   //               link: "/category",
  //   //               // badge: "new",
  //   //             },
  //   //           ]

  //   // },
  //   {
  //     text: "Attributes",
  //     link: "/attr-table",
  //   },
  //   // {
  //   //   text: "Products",
  //   //   link: "/app-messages",
  //   // },
  //   {
  //     text: "Manufactures",
  //     link: "/manu-table",
  //   },
  // ],

  // {
  //   icon: "file-docs",
  //   text: "Orders",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Orders",
  //       link: "/order-data",
  //     },
  //     {
  //       text: "Carts",
  //       link: "/cart-list",
  //     },
  //     {
  //       text: "Cancellations",
  //       link: "/cancel-list",
  //     },
  //   ],
  // },
  // {
  //   icon: "users-fill",
  //   text: "Admin",
  //   // link: "/user-list-regular",
  //   active: false,
  //    subMenu: [
  //     {
  //       text: "Users ",
  //       link: "/admin",
  //     },
  //     {
  //       text: "Customers  ",
  //       link: "/customer-list",
  //     },

  // {
  //   text: "User List - Compact",
  //   link: "/user-list-compact",
  // },
  // {
  //   text: "User Details - Regular",
  //   link: "/user-details-regular/1",
  // },
  // {
  //   text: "User Profile - Regular",
  //   link: "/user-profile-regular",
  // },
  // {
  //   text: "User Contact - Card",
  //   link: "/user-contact-card",
  //     // },
  //    ],
  // },
  // {
  //   icon: "bag",
  //   text: "Vendors",
  //   // link: "/user-list-regular",
  //   active: false,
  //    subMenu: [
  // {
  //   text: "User List ",
  //   link: "/user-list-default",
  // },
  // {
  //   text: "Customer List",
  //   link: "/user-list-regular",
  // },
  // {
  //   text: "Merchants",
  //   link: "/merchant-list",
  // },
  // {
  //   text: "Shops",
  //   link: "/shop-list",
  // },
  // {
  //   text: "User Details - Regular",
  //   link: "/user-details-regular/1",
  // },
  // {
  //   text: "User Profile - Regular",
  //   link: "/user-profile-regular",
  // },
  // {
  //   text: "User Contact - Card",
  //   link: "/user-contact-card",
  // },
  //    ],
  // },
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
  // {
  //   icon: "tile-thumb-fill",
  //   text: "Support Desk",
  //   link:"/profile",

  // },
  // {
  //   icon: "growth-fill",
  //   text: "Apperance",
  //   active: true,
  //   subMenu: [
  // {
  //   text: "Themes",
  //   link: "/components/misc/slick-slider",
  // },
  // {
  //   text: "Banners",
  //   link: "/banners",
  // },
  // {
  //   text: "Sliders",
  //   link: "/components/misc/slick-slider",
  // },
  // {
  //   text: "Custom Css",
  //   link: "/components/misc/custom",
  // },
  //   ],
  // },
  // {
  //   icon: "grid-alt-fill",
  //   text: "Promotions",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Promotions",
  //       link: "/components/form-elements",
  //     },
  //     // {
  //     //   text: "Packages",
  //     //   link: "/user-list-default",
  //     // },

  //   ],
  // },
  // {
  //   icon: "files-fill",
  //   text: "Settings",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "User Roles",
  //       link: "/roles",
  //     },
  //     {
  //       text: "System Settings",
  //       link: "/system-settings",
  //     },
  //     {
  //       text: "Configurations",
  //       link: "/settings",
  //     },
  //     {
  //       text: "Announcements",
  //       link: "/announcement-list",
  //     },
  //     {
  //       text: "Business Areas",
  //       link: "/country",
  //     },
  // {
  //   text: "Currencies",
  //   link: "/currency",
  // },
  // {
  //   text: "Languages",
  //   link: "/lang-list",
  // },
  //   ],
  // },
  // {
  //   icon: "layers-fill",
  //   text: "Utilities",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Email Templates",
  //       link: "/app-inbox",
  //     },
  //     {
  //       text: "Pages",
  //       link: "/pages-list-default",
  //     },
  //     {
  //       text: "Blogs",
  //       link: "/product-details/0",
  //     },
  //     {
  //       text: "Faq",
  //       link: "/pages/faq",
  //     },
  //   ],
  // },

  // {
  //   icon: "card-view",
  //   text: "Reports",
  //   active: false,
  //   subMenu:
  //   [
  // {
  //   text:"Orders",
  //   link:"/orders-lists",
  // },
  // {
  //   text: "Performances",
  //   link:"/sample",
  //   // link: "/ecommerce/index",
  // },
  // {
  //   text: "Vistors",
  //   link: "/visitors",
  // },
  // {
  //   text: "Sales",
  //   link: "/product-details/0",
  //   subMenu: [
  //             {
  //               text: "Orders",
  //               link: "/sales",
  // badge: "new",
  // },
  // {
  //   text: "Products",
  //   link: "/product-table",
  // badge: "new",
  // },
  // {
  //   text: "Payments",
  //   link: "/charts/chartjs",
  // badge: "new",
  //                 },
  //               ]
  //     },
  //   ],
  // },

  // {
  //   icon: "card-view",
  //   text: "Products",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Product List",
  //       link: "/product-list",
  //     },
  //     {
  //       text: "Product Card",
  //       link: "/product-card",
  //     },
  //     {
  //       text: "Product Details",
  //       link: "/product-details/0",
  //     },
  //   ],
  // },

  // {
  //   icon: "cc-alt2-fill",
  //   text: "Marketing",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Coupon List",
  //       link: "/coupon-list",
  //     },
  //     {
  //       text: "Coupon Details",
  //       link: "/coupon-details",
  //     },
  // {
  //   text: "Coupon Sample",
  //   link: "/coupon-sample",
  // },
  //   ],
  // },
  // {
  //   icon: "img",
  //   text: "Image Gallery",
  //   link: "/image-gallery",
  // },
  // {
  //   icon: "file-docs",
  //   text: "Invoice",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Invoice List",
  //       link: "/invoice-list",
  //     },
  //     {
  //       text: "Invoice Details",
  //       link: "/invoice-details/1",
  //     },
  //   ],
  // },
  // {
  //   icon: "file-docs",
  //   text: "AML / KYCs",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "KYC List - Regular",
  //       link: "/kyc-list-regular",
  //     },
  //     {
  //       text: "KYC Details - Regular",
  //       link: "/kyc-details-regular/UD01544",
  //     },
  //   ],
  // },
  // {
  //   icon: "view-col",
  //   text: "Pricing Table",
  //   link: "/pricing-table",
  // },
  // {
  //   icon: "grid-alt-fill",
  //   text: "Applications",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Messages",
  //       link: "/app-messages",
  //     },
  //     {
  //       text: "Chats / Messenger",
  //       link: "/app-chat",
  //     },
  //     {
  //       text: "Inbox / Mail",
  //       link: "/app-inbox",
  //       badge: "new",
  //     },
  // {
  //   text: "Calendar",
  //   link: "/app-calender",
  // },
  // {
  //   text: "Kanban Board",
  //   link: "/app-kanban",
  //   badge: "new",
  //     // },
  //   ],
  // },

  // {
  //   heading: "Misc Pages",
  // },
  // {
  //   icon: "light-fill",
  //   text: "Auth Pages",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Login / Signin",
  //       link: "/auth-login",
  //       newTab: true,
  //     },
  //     {
  //       text: "Register / Signup",
  //       link: "/auth-register",
  //       newTab: true,
  //     },
  //     {
  //       text: "Forgot Password",
  //       link: "/auth-reset",
  //       newTab: true,
  //     },
  //     {
  //       text: "Success / Confirm",
  //       link: "/auth-success",
  //       newTab: true,
  //     },
  //   ],
  // },
  // {
  //   icon: "files-fill",
  //   text: "Error Pages",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "404 Classic",
  //       link: "/errors/404-classic",
  //       newTab: true,
  //     },
  //     {
  //       text: "504 Classic",
  //       link: "/errors/504-classic",
  //       newTab: true,
  //     },
  //     {
  //       text: "404 Modern",
  //       link: "/errors/404-modern",
  //       newTab: true,
  //     },
  //     {
  //       text: "504 Modern",
  //       link: "/errors/504-modern",
  //       newTab: true,
  //     },
  //   ],
  // },
  // {
  //   icon: "files-fill",
  //   text: "Other Pages",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Blank / Startup",
  //       link: "/_blank",
  //     },
  //     {
  //       text: "Faqs / Help",
  //       link: "/pages/faq",
  //     },
  //     {
  //       text: "Terms / Policy",
  //       link: "/pages/terms-policy",
  //     },
  //     {
  //       text: "Regular Page - v1",
  //       link: "/pages/regular-v1",
  //     },
  //     {
  //       text: "Regular Page - v2",
  //       link: "/pages/regular-v2",
  //     },
  // ],
  //},
  // {
  //   heading: "Components",
  // },
  // {
  //   icon: "layers-fill",
  //   text: "Ui Elements",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Alerts",
  //       link: "/components/alerts",
  //     },
  //     {
  //       text: "Accordions",
  //       link: "/components/accordions",
  //     },
  //     {
  //       text: "Avatar",
  //       link: "/components/avatar",
  //       badge: "new",
  //     },
  //     {
  //       text: "Badges",
  //       link: "/components/badges",
  //     },
  //     {
  //       text: "Buttons",
  //       link: "/components/buttons",
  //     },
  //     {
  //       text: "Button Group",
  //       link: "/components/button-group",
  //     },
  //     {
  //       text: "Breadcrumbs",
  //       link: "/components/breadcrumbs",
  //     },
  //     {
  //       text: "Cards",
  //       link: "/components/cards",
  //     },
  //     {
  //       text: "Carousel",
  //       link: "/components/carousel",
  //     },
  //     {
  //       text: "Dropdowns",
  //       link: "/components/dropdowns",
  //     },
  //     {
  //       text: "Modals",
  //       link: "/components/modals",
  //     },
  //     {
  //       text: "Pagination",
  //       link: "/components/pagination",
  //     },
  //     {
  //       text: "Popovers",
  //       link: "/components/popovers",
  //     },
  //     {
  //       text: "Progress",
  //       link: "/components/progress",
  //     },
  //     {
  //       text: "Spinner",
  //       link: "/components/spinner",
  //     },
  //     {
  //       text: "Tabs",
  //       link: "/components/tabs",
  //     },
  //     {
  //       text: "Toast",
  //       link: "/components/toast",
  //     },
  //     {
  //       text: "Typography",
  //       link: "/components/typography",
  //       badge: "new",
  //     },
  //     {
  //       text: "Tooltips",
  //       link: "/components/tooltips",
  //     },
  //     {
  //       text: "Utilities",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Borders",
  //           link: "/components/util-border",
  //         },
  //         {
  //           text: "Colors",
  //           link: "/components/util-colors",
  //         },
  //         {
  //           text: "Display",
  //           link: "/components/util-display",
  //         },
  //         {
  //           text: "Embeded",
  //           link: "/components/util-embeded",
  //         },
  //         {
  //           text: "Flex",
  //           link: "/components/util-flex",
  //         },
  //         {
  //           text: "Text",
  //           link: "/components/util-text",
  //         },
  //         {
  //           text: "Sizing",
  //           link: "/components/util-sizing",
  //         },
  //         {
  //           text: "Spacing",
  //           link: "/components/util-spacing",
  //         },
  //         {
  //           text: "Others",
  //           link: "/components/util-others",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   icon: "dot-box-fill",
  //   text: "Crafted Icons",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "SVG Icon-Exclusive",
  //       link: "/svg-icons",
  //     },
  //     {
  //       text: "Nioicon - HandCrafted",
  //       link: "/nioicon",
  //     },
  //   ],
  // },
  // {
  //   icon: "table-view-fill",
  //   text: "Tables",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Basic Tables",
  //       link: "/table-basic",
  //     },
  //     {
  //       text: "Special Tables",
  //       link: "/table-special",
  //     },
  //     {
  //       text: "DataTables",
  //       link: "/table-datatable",
  //       badge: "new",
  //     },
  //   ],
  // },
  // {
  //   icon: "view-group-fill",
  //   text: "Forms",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Form Elements",
  //       link: "/components/form-elements",
  //     },
  //     {
  //       text: "Checkbox Radio",
  //       link: "/components/checkbox-radio",
  //     },
  //     {
  //       text: "Input Group",
  //       link: "/components/input-group",
  //       badge: "new",
  //     },
  //     {
  //       text: "Form Upload",
  //       link: "/components/form-upload",
  //       badge: "new",
  //     },
  //     {
  //       text: "Advanced Controls",
  //       link: "/components/advanced-control",
  //       badge: "new",
  //     },
  //     {
  //       text: "Form Layouts",
  //       link: "/components/form-layouts",
  //     },
  //     {
  //       text: "Form Validation",
  //       link: "/components/form-validation",
  //     },
  //     {
  //       text: "Date Time Picker",
  //       link: "/components/datetime-picker",
  //     },
  //     {
  //       text: "Number Spinner",
  //       link: "/components/number-spinner",
  //       badge: "new",
  //     },
  //     {
  //       text: "noUiSlider",
  //       link: "/components/nouislider",
  //       badge: "new",
  //     },
  //     {
  //       text: "Wizard Basic",
  //       link: "/components/wizard-basic",
  //       badge: "new",
  //     },
  //     {
  //       text: "Rich Editor",
  //       active: false,
  //       subMenu: [
  //         {
  //           text: "Quill",
  //           link: "/components/quill",
  //           badge: "new",
  //         },
  //         {
  //           text: "Tinymce",
  //           link: "/components/tinymce",
  //           badge: "new",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   icon: "pie-fill",
  //   text: "Charts",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Chart Js",
  //       link: "/charts/chartjs",
  //     },
  //     {
  //       text: "Knobs",
  //       link: "/charts/knobs",
  //       badge: "new",
  //     },
  //   ],
  // },
  // {
  //   icon: "puzzle",
  //   text: "Widgets",
  //   subMenu: [
  //     {
  //       text: "Card Widgets",
  //       link: "/components/widgets/cards",
  //       badge: "new",
  //     },
  //     {
  //       text: "Chart Widgets",
  //       link: "/components/widgets/charts",
  //       badge: "new",
  //     },
  //     {
  //       text: "Rating Widgets",
  //       link: "/components/widgets/rating",
  //       badge: "new",
  //     },
  //   ],
  // },
  // {
  //   icon: "block-over",
  //   text: "Miscellaneous",
  //   subMenu: [
  //     {
  //       text: "Slick Sliders",
  //       link: "/components/misc/slick-slider",
  //     },
  //     {
  //       text: "JsTree",
  //       link: "/components/misc/jsTree",
  //       badge: "new",
  //     },
  //     {
  //       text: "React Toastify",
  //       link: "/components/misc/toastify",
  //       badge: "new",
  //     },
  //     {
  //       text: "Sweet Alert",
  //       link: "/components/misc/sweet-alert",
  //       badge: "new",
  //     },
  //     {
  //       text: "React DualListBox",
  //       link: "/components/misc/dual-list",
  //       badge: "new",
  //     },
  //     {
  //       text: "React Beautiful Dnd",
  //       link: "/components/misc/beautiful-dnd",
  //       badge: "new",
  //     },
  //     {
  //       text: "Google Map",
  //       link: "/components/misc/map",
  //       badge: "new",
  //     },
  //   ],
  // },
  // {
  //   icon: "tag-alt-fill",
  //   text: "Email Template",
  //   link: "/email-template",
  //   active: "false",
  // },
];
export default menu;
