import { useContext, useEffect, useState } from "react";
/**---------------------------------Packages----------------------------------------- */
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import featured from "../../assets/images/products/image (1).jpg";
import client from "../../assets/images/client/image (4).jpg";
import {
  API_URL,
  API_Brand,
  API_Category,
  token,
  API_Product,
} from "../../config/config";
import "./menu.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { cartContext } from "../../layout/layout";
const API_Brand_Image = `${API_URL}/Brand_view`;
const API_Product_Image = `${API_URL}/Product_image`;

// import img1 from "../../assets/images/brandimages/img1.jpg";
// import img2 from "../../assets/images/brandimages/img2.jpg";
// import img3 from "../../assets/images/brandimages/img3.jpg";
// import img4 from "../../assets/images/brandimages/img4.jpg";
// import img5 from "../../assets/images/brandimages/img5.jpg";
// import img6 from "../../assets/images/brandimages/img6.jpg";

const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const PrimaryMenu = ({ menus }) => {
  //state for navbar class
  const {getCategory,getbrands} = useContext(cartContext);
  const [navbar, setNavbar] = useState(false);
  const [Menus, setMenus] = useState([]);
  const [Brand, setBrand] = useState([]);
  const [Brandlist, setBrandlist] = useState([]);
  const [firstletter, setFirstletter] = useState("");
  const [ProdData, setProdData] = useState("");
  const [Navallbtn, setNavallbtn] = useState("All");
  const [prodListId, setProdId] = useState(0);
  //scroll sticky function
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    changeBackground();
    GetProdData();
    GetdataMenu();
    // GetdataSub()
    // GetdataChild()
    Getbrand();

    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  }, []);

  const GetProdData = async (item) => {
    const Prod = await axios.get(`${API_Product}`, configss);
    setProdData(Prod.data.list);
  };

  const GetdataMenu = async () => {
    const { data } = await axios.get(`${API_Category}`, configss);
    getCategory(data.list)
    setMenus(data.list);
  };
  // const GetdataSub = async () => {
  //   const { data } = await axios.get(`${API_SubCategory}`, configss)
  //   setMenus(data.list)
  // }
  // const GetdataChild = async () => {
  //   const { data } = await axios.get(`${API_ChildCategory}`, configss)
  //   setMenus(data.list)
  // }

  const upper = [];

  const Getbrand = async () => {
    const { data } = await axios.get(`${API_Brand}`, configss);
    getbrands(data.list)
    setBrand(data.list);
    data.list.forEach((ss) => {
      upper.push({
        name: ss.name.charAt(0).toUpperCase() + ss.name.slice(1).toLowerCase(),
        id: ss.id,
        brand_logo: ss.brand_logo,
        slug: ss.slug
      });
    });
    const Upperletter = [...new Set(upper)];
    setBrandlist(Upperletter);
    const res = Upperletter.map((first) => first.name[0]);
    const res1 = [...new Set(res)];

    setFirstletter(res1.sort());
  };

  Brand.forEach((ss) => {
    upper.push({
      name: ss.name.charAt(0).toUpperCase() + ss.name.slice(1).toLowerCase(),
      id: ss.id,
      brand_logo: ss.brand_logo,
    });
  });

  const onclickbrand = (data) => {
    if (data === "All") {
      setBrandlist(upper);
      setNavallbtn("All");
    } else {
      const res = upper.filter(
        (item) => item.name.charAt(0).toUpperCase() === data.toString()
      );

      setBrandlist(res);
      setNavallbtn(data);
    }
  };

  const allbtn = {
    backgroundColor: "black",
    color: "white",
  };
  const alpbtn = {
    backgroundColor: "",
    color: "",
  };
  const handleMenu = () => {
    // window.location.reload()
    window.location.href();
  };
  // const AllBrandName = ["A Toddler Thing", "A+D", "Abena", "Agu Baby", "Avanchy", "Aveeno Baby", "B.Box", "Baby Works", "Babyganics", "A Toddler Thing", "A+D", "Abena", "Agu Baby", "Avanchy", "Aveeno Baby", "B.Box", "Baby Works", "Babyganics"];

  // const AllBrandStartLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  return (
    <nav
      className={
        navbar ? "mainmenu__nav Active" : "mainmenu__nav hidden-xs hidden-sm"
      }
    >
      {/* header menu */}
      <ul className="main__menu">
        <li className="drop">
          <div className="d-flex">
            <Link to={`/brands`} className="p-0 ">
              <p className="text-muted small">Brands</p>
            </Link>
            <MdKeyboardArrowDown style={{ marginTop: "3px" }} />
          </div>
          <div className="">
            <ul
              className={
                navbar
                  ? "dropdown dropdown-hover-bg brand_dropdown_navbar"
                  : "dropdown dropdown-hover-bg brand_dropdown_navbaract"
              }
            >
              <div className="cat_mega_menu cat_mega_menu_brand">
                <div className="row">
                  <div className="col-lg-4 col-md-5 col-sm-5">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 brand-upd-page-tab-btn">
                        <div className="row">
                          <div className="col-lg-3 col-md-3 col-sm-3 brand-upd-page-tab-all-text-btn">
                            <button
                              className="brand-upd-page-btn-all brand_activebtn"
                              onClick={() => onclickbrand("All")}
                              style={Navallbtn === "All" ? allbtn : alpbtn}
                            >
                              ALL
                            </button>
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-9 brand-upd-page-tab-all-btn">
                            <div className="row">
                              {firstletter.length > 0 &&
                                firstletter.map((item) => {
                                  {
                                  }
                                  return (
                                    <button
                                      className="brand-upd-page-btn-a col-lg-2 brand_activebtn"
                                      title={item}
                                      onClick={() => onclickbrand(item)}
                                      style={
                                        Navallbtn === item ? allbtn : alpbtn
                                      }
                                    >
                                      {item}
                                    </button>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 brand-upd-page-tab-view-content">
                        <div className="brand-upd-page-tab-view-content-scrollbar">
                         
                          {Brandlist?.sort((a,b)=>a.name.localeCompare(b.name)).map((ele) => {
                            return (
                              <>
                           
                                <NavLink
                                  to={`/brand/${ele.slug != "" ? ele.slug?.trim().replaceAll(' ', '-') || '' : ele.name?.trim().replaceAll(' ', '-')}/${ele.id}`}
                                  onClick={() => window.location.href()}
                                >
                                  <div>{ele.name}</div>
                                </NavLink>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-7 col-sm-7 nav-brand-all-img-display">
                    <div className="row brand-upd-page-tab-img-view">
                      {Brandlist.map((data) => {
                        return (
                          <div
                            className="col-lg-3"
                            style={{ marginBottom: "30PX" }}
                          >
                            <NavLink
                              to={`/brand/${data.slug != "" ? data.slug?.trim().replaceAll(' ', '-') || '' : data.name?.trim().replaceAll(' ', '-')}/${data.id}`}
                              onClick={() => window.location.href()}
                            >
                              <img
                                src={`${API_Brand_Image}/${data.brand_logo}`}
                                className="img-fluid" alt={data.name}
                              ></img>
                            </NavLink>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </li>
        {Menus.length > 0 &&
          Menus.map((menu, i) => (
            <li key={i} className="drop">
              <div className="d-flex">
                <NavLink
                  to={`/${menu.category_slug != "" ? menu.category_slug.trim().replaceAll(' ', '-') : menu.category_name.trim().replaceAll(' ', '-')}/${menu.id}`} state={menu}
                  style={{ color: "#666666", fontSize: "14px" }}
                // onClick={handleMenu()}
                // onClick={() => window.location.href()}
                >
                  {menu.category_name}
                </NavLink>
                <MdKeyboardArrowDown style={{ marginTop: "3px" }} />
              </div>
              {/* mega dropdown menu */}
              {menu?.getsubcat_result.length > 0 && (
                <div className="">
                  <ul
                    className={
                      navbar
                        ? "dropdown mega_dropdown"
                        : "dropdown mega_dropdown menu-scroll"
                    }
                  >
                    <div className="d-flex" style={{overflowY:"scroll",maxHeight:"350px"}}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {menu.getsubcat_result.map((megaMenu, ii) => {
                          // {console.log("megaMenu.subcategoryslug" , megaMenu.subcategoryslug);}
                          return (
                            <li key={ii} style={{ width: "50%" }}>
                              <Link
                                to={`/${menu.category_name.trim().replaceAll(' ', '-')}/${megaMenu.subcategoryslug != '' ? megaMenu.subcategoryslug.trim().replace(/[&#]/g, '').replaceAll(' ', '-').replaceAll('--', '-') : megaMenu.title.trim().replaceAll('&', '').replaceAll(' ', '-').replaceAll('--', '-')}/${megaMenu.subcat_id}`}                                // onClick={() => window.location.href()}
                                state={megaMenu.title}
                                className="menu_title"
                              >
                                {megaMenu.title}
                              </Link>
                              {megaMenu.getbchildcat_result.length > 0 && (
                                <ul className="mega__item">
                                  {megaMenu.getbchildcat_result.map(
                                    (megamenuItem, iii) => (
                                      <li key={iii}>
                                        <Link
                                          to={`/${menu.category_name.trim().replaceAll(' ', '-')}/${megaMenu.title.trim().replaceAll('&', '').replaceAll(' ', '-').replaceAll('--', '-')}/${megamenuItem.childcategoryslug == "" ? megamenuItem.childcategoryname.trim().replaceAll('&', '').replaceAll(' ', '-').replaceAll('--', '-') : megamenuItem.childcategoryslug?.trim().replaceAll('&', '').replaceAll(' ', '-').replaceAll('--', '-') || ''}/${megamenuItem.id}`}                                          // onClick={() => window.location.href()}
                                          state={megamenuItem.childcategoryname}
                                        >
                                          {megamenuItem.childcategoryname}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </div>
                      <div style={{ width: "50%" }}>
                        <p className="featured">Featured Products</p>
                        {menu.feature_products?.length > 0 &&
                          menu.feature_products.map((item1) => {
                      
                            return (
                              <>
                                <div>
                                  {ProdData &&
                                    ProdData.filter(
                                      (currEle) =>
                                        currEle.Productlist_id === item1.id
                                    ).map((currEle) => {
                                      return (
                                        <>
                                          <NavLink
                                            to={`/products/${currEle.ProductName}/${item1.id}`}
                                            onClick={() =>
                                              window.location.href()
                                            }
                                          >
                                            <img
                                              alt={item1.FeatureLogo}
                                              src={`${API_Product_Image}/${item1.FeatureLogo}`}
                                              className="future_brand_img"
                                            />
                                            <div className="FetureProductStyle">
                                              {currEle.ProductName}
                                            </div>
                                          </NavLink>
                                        </>
                                      );
                                    })}
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                    {/* <div className="d-flex align-items-center" style={{ position: "absolute", bottom: "30px" }}> */}
                    <div
                      className="d-flex align-items-center"
                      style={{ position: "absolute", bottom: "0px" }}
                    >
                      <p className="topbrand">Top Brands</p>
                      {menu?.top_brands?.length > 0 &&
                        menu?.top_brands.slice(0, 5).map((item) => {
                          return (
                            <>
                              <NavLink
                                to={`/brand/top brands/${item.id}`}
                                onClick={() => window.location.href()}
                              >
                                <img
                                  alt={item.BrandLogo}
                                  src={`${API_Brand_Image}/${item.BrandLogo}`}
                                  className="topbrand_img"
                                />
                              </NavLink>
                            </>
                          );
                        })}
                    </div>
                  </ul>
                </div>
              )}
            </li>
          ))}
        <p>
          <div className="d-flex">
            <Link to="/blog" style={{ color: "#666666", fontSize: "14px" }}>
              Blog
            </Link>
            {/* <MdKeyboardArrowDown style={{ marginTop: "3px" }} /> */}
          </div>
        </p>
      </ul>
    </nav>
  );
};

export default PrimaryMenu;
