import ProductA from "../../../images/product/a.png";
import ProductB from "../../../images/product/b.png";
import ProductC from "../../../images/product/c.png";
import ProductD from "../../../images/product/d.png";
import ProductE from "../../../images/product/e.png";
import ProductF from "../../../images/product/f.png";
import ProductG from "../../../images/product/g.png";
import ProductH from "../../../images/product/h.png";
import ProductI from "../../../images/product/i.png";
import ProductJ from "../../../images/product/j.png";


import ProductLGA from "../../../images/product/lg-a.jpg";
import ProductLGB from "../../../images/product/lg-b.jpg";
import ProductLGC from "../../../images/product/lg-c.jpg";
import ProductLGD from "../../../images/product/lg-d.jpg";
import ProductLGE from "../../../images/product/lg-e.jpg";
import ProductLGF from "../../../images/product/lg-f.jpg";
import ProductLGG from "../../../images/product/lg-g.jpg";
import ProductLGH from "../../../images/product/lg-h.jpg";



import User from "../../../images/avatar/b-sm.jpg";
import User2 from "../../../images/avatar/c-sm.jpg";
import User3 from "../../../images/avatar/a-sm.jpg";
import User4 from "../../../images/avatar/d-sm.jpg";



export const productData = [
  {
    id: 1,
    name: "Pink Fitness Tracker",
    img: ProductA,
    sku: "UY3749",
    price: "99.49",
    stock: 49,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 2,
    name: "Purple Smartwatch",
    img: ProductB,
    sku: "UY3750",
    price: "89.49",
    stock: 103,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Gadgets", value: "Gadgets" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 3,
    name: "Black Mi Band Smartwatch",
    img: ProductC,
    sku: "UY3751",
    price: "299.49",
    stock: 68,
    category: [
      { label: "Smartwatch", value: "Smartwatch" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: true,
    check: false,
  },
  {
    id: 4,
    name: "Black Headphones",
    img: ProductD,
    sku: "UY3752",
    price: "99.49",
    stock: 77,
    category: [
      { label: "Headphones", value: "Headphones" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 5,
    name: "Iphone 7 Headphones",
    img: ProductE,
    sku: "UY3753",
    price: "199.49",
    stock: 81,
    category: [
      { label: "Headphones", value: "Headphones" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 6,
    name: "Purple Blue Gradient iPhone Case",
    img: ProductF,
    sku: "UY3754",
    price: "29.49",
    stock: 28,
    category: [
      { label: "Case", value: "Case" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 7,
    name: "Plug In Speaker",
    img: ProductG,
    sku: "UY3755",
    price: "19.49",
    stock: 37,
    category: [
      { label: "Case", value: "Case" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 8,
    name: "Wireless Waterproof Speaker",
    img: ProductH,
    sku: "UY3756",
    price: "59.49",
    stock: 37,
    category: [
      { label: "Speaker", value: "Speaker" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 9,
    name: "AliExpress Fitness Trackers",
    img: ProductI,
    sku: "UY3758",
    price: "35.49",
    stock: 145,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 10,
    name: "Pool Party Drink Holder",
    img: ProductJ,
    sku: "UY3757",
    price: "9.49",
    stock: 73,
    category: [
      { label: "Men", value: "Men" },
      { label: "Holder", value: "Holder" },
    ],
    fav: false,
    check: false,
  },
];

export const productCardData = [
  {
    id: 0,
    img: ProductLGA,
    new: true,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGA },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    name: "Smart Watch",
    title: "Classy Modern Smart Watch",
    type: "watch",
    modelNumber: "",
    prevPrice: 350,
    newPrice: 324,
  },
  {
    id: 1,
    img: ProductLGB,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGB },
      { id: 1, img: ProductLGA },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "phone",
    modelNumber: "",
    name: "Vintage Phone",
    title: "White Vintage Phone",
    prevPrice: 209,
    newPrice: 119,
  },
  {
    id: 2,
    img: ProductLGC,
    new: false,
    hot: true,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGC },
      { id: 1, img: ProductLGA },
      { id: 2, img: ProductLGB },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "headphone",
    modelNumber: "",
    name: "Headphones",
    title: "Black Wireless Headphone",
    prevPrice: 119,
    newPrice: 89,
  },
  {
    id: 3,
    img: ProductLGD,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGD },
      { id: 1, img: ProductLGA },
      { id: 2, img: ProductLGB },
      { id: 3, img: ProductLGC },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "watch",
    modelNumber: "",
    name: "Smart Watch",
    title: "Modular Smart Watch",
    prevPrice: 169,
    newPrice: 129,
  },
  {
    id: 4,
    img: ProductLGE,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGE },
      { id: 1, img: ProductLGA },
      { id: 2, img: ProductLGB },
      { id: 3, img: ProductLGC },
      { id: 4, img: ProductLGD },
      { id: 5, img: ProductLGF },
    ],
    type: "headphone",
    modelNumber: "",
    name: "Headphone",
    title: "White Wireless Headphones",
    prevPrice: 109,
    newPrice: 78,
  },
  {
    id: 5,
    img: ProductLGF,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGF },
      { id: 1, img: ProductLGA },
      { id: 2, img: ProductLGB },
      { id: 3, img: ProductLGC },
      { id: 4, img: ProductLGD },
      { id: 5, img: ProductLGE },
    ],
    type: "phone",
    modelNumber: "",
    name: "Phone",
    title: "Black Android Phone",
    prevPrice: null,
    newPrice: 329,
  },
  {
    id: 6,
    img: ProductLGG,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGG },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "watch",
    modelNumber: "",
    name: "Smart Watch",
    title: "Modern Smart Watch",
    prevPrice: 200,
    newPrice: 179,
  },
  {
    id: 7,
    img: ProductLGH,
    new: false,
    hot: true,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGH },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "bundle",
    modelNumber: "",
    name: "Bundle",
    title: "Gadget Bundle",
    prevPrice: 609,
    newPrice: 412,
  },
  {
    id: 8,
    img: ProductLGA,
    new: true,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGA },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    name: "Modern Watch",
    title: "Modern Smart Watch",
    type: "watch",
    modelNumber: "",
    prevPrice: 350,
    newPrice: 324,
  },
  {
    id: 9,
    img: ProductLGB,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGB },
      { id: 1, img: ProductLGA },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "phone",
    modelNumber: "",
    name: "Phone",
    title: "Grey Vintage Phone",
    prevPrice: 209,
    newPrice: 119,
  },
  {
    id: 10,
    img: ProductLGF,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGF },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGG },
    ],
    type: "phone",
    modelNumber: "",
    name: "Phone",
    title: "Grey Phone",
    prevPrice: null,
    newPrice: 329,
  },
  {
    id: 11,
    img: ProductLGG,
    new: false,
    hot: false,
    like: false,
    cart: false,
    type: "watch",
    slider: [
      { id: 0, img: ProductLGG },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    modelNumber: "",
    name: "Smart Watch",
    title: "Modern Watch",
    prevPrice: 200,
    newPrice: 179,
  },
  {
    id: 12,
    img: ProductLGH,
    new: false,
    hot: true,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGH },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "bundle",
    modelNumber: "",
    name: "Quality Bundle",
    title: "Quality Gadget Bundle",
    prevPrice: 609,
    newPrice: 412,
  },
  {
    id: 13,
    img: ProductLGC,
    new: false,
    hot: true,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGC },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGH },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "headphone",
    modelNumber: "",
    name: "Headphones",
    title: "Wireless Headphone",
    prevPrice: 119,
    newPrice: 89,
  },
  {
    id: 14,
    img: ProductLGD,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGD },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGA },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "watch",
    modelNumber: "",
    name: "Watch",
    title: "Modular Watch",
    prevPrice: 169,
    newPrice: 129,
  },
  {
    id: 15,
    img: ProductLGE,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGE },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGH },
      { id: 5, img: ProductLGF },
    ],
    type: "headphone",
    modelNumber: "",
    name: "Headphone",
    title: "White Headphones",
    prevPrice: 109,
    newPrice: 78,
  },
  {
    id: 16,
    img: ProductLGF,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGF },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGG },
    ],
    type: "phone",
    modelNumber: "",
    name: "Phone",
    title: "Grey Phone",
    prevPrice: null,
    newPrice: 329,
  },
  {
    id: 17,
    img: ProductLGG,
    new: false,
    hot: false,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGG },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "watch",
    modelNumber: "",
    name: "Smart Watch",
    title: "Modern Watch",
    prevPrice: 200,
    newPrice: 179,
  },
  {
    id: 18,
    img: ProductLGH,
    new: false,
    hot: true,
    like: false,
    cart: false,
    slider: [
      { id: 0, img: ProductLGH },
      { id: 1, img: ProductLGB },
      { id: 2, img: ProductLGC },
      { id: 3, img: ProductLGD },
      { id: 4, img: ProductLGE },
      { id: 5, img: ProductLGF },
    ],
    type: "bundle",
    modelNumber: "",
    name: "Quality Bundle",
    title: "Quality Gadget Bundle",
    prevPrice: 609,
    newPrice: 412,
  },
];

export const categoryOptions = [
  {
    value: "Gadget",
    label: "Gadget",
  },
  {
    value: "Electronics",
    label: "Electronics",
  },
  {
    label: "Watch",
    value: "Watch",
  },
  {
    label: "Tracker",
    value: "Tracker",
  },
  {
    label: "Fitbit",
    value: "Fitbit",
  },
  {
    label: "Men",
    value: "Men",
  },
  {
    label: "Holder",
    value: "Holder",
  },
  {
    label: "Speaker",
    value: "Speaker",
  },
  {
    label: "Headphones",
    value: "Headphones",
  },
  {
    label: "Bundle",
    value: "Bundle",
  },
];



//announcements data
export const announcementsData = [
  {
    id: 1,
    name: "Priya",
    img: User2,
    sku: "3 Dec 2022",
    price: "99.49",
    stock: 103,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 2,
    name: "Varsha",
    img: User4,
    sku: "UY3750",
    price: "89.49",
    stock: 103,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Gadgets", value: "Gadgets" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 3,
    name: "Bharath",
    img: User3,
    sku: "UY3751",
    price: "299.49",
    stock: 68,
    category: [
      { label: "Smartwatch", value: "Smartwatch" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: true,
    check: false,
  },
  {
    id: 4,
    name: "Viji",
    img: User2,
    sku: "UY3752",
    price: "99.49",
    stock: 77,
    category: [
      { label: "Headphones", value: "Headphones" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 5,
    name: "Jaya",
    img:User4,
    sku: "UY3753",
    price: "199.49",
    stock: 81,
    category: [
      { label: "Headphones", value: "Headphones" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 6,
    name: "Pooja",
    img: User2,
    sku: "UY3754",
    price: "29.49",
    stock: 28,
    category: [
      { label: "Case", value: "Case" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 7,
    name: "Maha",
    img: User4,
    sku: "UY3755",
    price: "19.49",
    stock: 37,
    category: [
      { label: "Case", value: "Case" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 8,
    name: "Ramya",
    img:User2,
    sku: "UY3756",
    price: "59.49",
    stock: 37,
    category: [
      { label: "Speaker", value: "Speaker" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 9,
    name: "Aravind",
    img:User3,
    sku: "UY3758",
    price: "35.49",
    stock: 145,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 10,
    name: "Praveen",
    img: User,
    sku: "UY3757",
    price: "9.49",
    stock: 73,
    category: [
      { label: "Men", value: "Men" },
      { label: "Holder", value: "Holder" },
    ],
    fav: false,
    check: false,
  },
];

// Banners Date
export const bannerData = [
  {
    id: 1,
    name: "Pinksdd Fitness Tracker",
    img: ProductA,
    sku: "10 May 2022",
    price: "Sales",
    stock: 49,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 2,
    name: "Purple Smartwatch",
    img: ProductB,
    sku: "12 Jun 2022",
    price: "HR",
    stock: 103,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Gadgets", value: "Gadgets" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 3,
    name: "Black Mi Band Smartwatch",
    img: ProductC,
    sku: "20 OCT 2022",
    price: "Admin",
    stock: 68,
    category: [
      { label: "Smartwatch", value: "Smartwatch" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: true,
    check: false,
  },
  {
    id: 4,
    name: "Black Headphones",
    img: ProductD,
    sku: "02 Nov 2022",
    price: "Design",
    stock: 77,
    category: [
      { label: "Headphones", value: "Headphones" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 5,
    name: "Iphone 7 Headphones",
    img: ProductE,
    sku: "12 Nov 2022",
    price: "Marketing",
    stock: 81,
    category: [
      { label: "Headphones", value: "Headphones" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 6,
    name: "Purple Blue Gradient iPhone Case",
    img: ProductF,
    sku: "20 Nov 2022",
    price: "Development",
    stock: 28,
    category: [
      { label: "Case", value: "Case" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 7,
    name: "Plug In Speaker",
    img: ProductG,
    sku: "30 Nov 2022",
    price: "Sales",
    stock: 37,
    category: [
      { label: "Case", value: "Case" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 8,
    name: "Wireless Waterproof Speaker",
    img: ProductH,
    sku: "12 Dec 2022",
    price: "HR",
    stock: 37,
    category: [
      { label: "Speaker", value: "Speaker" },
      { label: "Gadgets", value: "Gadgets" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 9,
    name: "AliExpress Fitness Trackers",
    img: ProductI,
    sku: "13 Dec 2022",
    price: "Design",
    stock: 145,
    category: [
      { label: "Fitbit", value: "Fitbit" },
      { label: "Tracker", value: "Tracker" },
    ],
    fav: false,
    check: false,
  },
  {
    id: 10,
    name: "Pool Party Drink Holder",
    img: ProductJ,
    sku: "02 Dec 2022",
    price: "Sales",
    stock: 73,
    category: [
      { label: "Men", value: "Men" },
      { label: "Holder", value: "Holder" },
    ],
    fav: false,
    check: false,
  },
];






