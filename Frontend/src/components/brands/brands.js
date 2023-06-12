import React, { useEffect, useState } from "react";
import axios from "axios";
import "./brands.css";
import { Navigate, useNavigate, NavLink, Link } from "react-router-dom";
import img1 from "../../assets/images/brands/abena-brand-logo.jpg";
import img2 from "../../assets/images/brands/ad-baby.jpg";
import img3 from "../../assets/images/brands/aleva-naturals.jpg";
import img4 from "../../assets/images/brands/Allter-logo.jpg";
import img5 from "../../assets/images/brands/aquaphor.jpg";
import img6 from "../../assets/images/brands/Avanchy-logo.jpg";
import img7 from "../../assets/images/brands/Aveeno-Baby.jpg";
import img8 from "../../assets/images/brands/toddlerthing.jpg";
import { API_URL, token, API_Brand } from "../../config/config";
const API_Brand_View = `${API_URL}/Brand_view`;

// const API_Brand = `${API_URL}/admin/brand`;
const Brands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [Brand, setBrand] = useState([]);
  const [Brandlist, setBrandlist] = useState([]);
  const [firstletter, setFirstletter] = useState("");
  const [Navallbtn, setNavallbtn] = useState("All");
  useEffect(() => {
    getBrand();
    Getbrands();
  }, []);

  const upper = [];
  const Getbrands = async () => {
    const { data } = await axios.get(`${API_Brand}`, configss);
    // console.log("brand data", data.list);
    setBrand(data.list);
    data.list.forEach((ss) => {
   
      upper.push({
        name: ss.name.charAt(0).toUpperCase() + ss.name.slice(1).toLowerCase(),
        id: ss.id,
        slug: ss.slug
      });
    });
    const Upperletter = [...new Set(upper)];
    setBrandlist(Upperletter);
    const res = Upperletter.map((first) => first.name[0]);
    const res1 = [...new Set(res)];
    // console.log(res1, "else2");
    setFirstletter(res1.sort());
  };

  const allbtn = {
    backgroundColor: "black",
    color: "white",
  };
  const alpbtn = {
    backgroundColor: "",
    color: "",
  };

  const getBrand = async () => {
    try {
      const Result = await axios.get(API_Brand, configss);
      if (Result.data.list) {
        setBrands(Result.data.list);
      
      }
    } catch (error) {
      // console.log(error)
    }
  };

  const handleCheck = async (item) => {
    // navigate(`/brand/${name}/${e.target.value}`);

    const Results = await axios.get(API_Brand, configss);
    let res = Results.data.list.filter((currEle) => {
      return currEle.id == item.id;
    });
   
  };

  const configss = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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

  const abc = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <div>
      <div>
        <section id="content">
          <div
            className="col-md-12"
            style={{
              position: "relative",
              margin: "0",
              padding: "0 15px 0px",
              width: "100%",
              paddingTop: "10px",
            }}
          >
            <header
              className="entry-header text-center"
              style={{ display: "block" }}
            >
              <h1 className="entry-title">Brands</h1>
              <div className="is-divider medium" />
              <h2 className="entry-title">Brands List</h2>
            </header>
          </div>
        </section>

        <section className="brand-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 d-inline-flex justify-content-center">
                <div id="navbar-example2" className="button__brand">
                  {firstletter.length > 0 &&
                    firstletter.map((item) => {
                      return (
                        <button
                          className="brand__update"
                          title={item}
                          // onClick={() => onclickbrand(item)}
                          //style={Navallbtn === item ? allbtn : alpbtn}
                        >
                        
                          <a href={`#${item.toLowerCase()}`}>{item}</a>{" "}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="brand-details">
          <div className="container">
            <div className="row">
              <div className="allView ">
                <div className="all-view-details">
                  <div className="brand-title-head wb-col-md-12">
                    {firstletter &&
                      firstletter.map((item) => {
                        return (
                          <>
                            <div className="wb-col-md-12">{item}</div>
                          </>
                        );
                      })}
                  </div>
                  <div className="row">
                    {firstletter &&
                      firstletter.map((currEle) => {
                        return (
                          <>
                            {
                              <div className="brand-item">
                                {/* <div className=""> */}

                                <div
                                  className="scrollspy-example d-flex flex-wrap"
                                  data-bs-spy="scroll"
                                  data-bs-target="#navbar-example2"
                                  data-bs-root-margin="0px 0px -40%"
                                  data-bs-smooth-scroll="true"
                                  tabindex="0"
                                >
                                  {brands
                                    .filter(
                                      (itemm) =>
                                        itemm.name.toLowerCase().charAt(0) ==
                                        currEle.toLowerCase()
                                    )
                                    .map((item) => {
                                      return (
                                        <>
                                        

                                          <div
                                            className="col-md-3 col-sm-3 col-xs-6 mx-md-0 mx-2 mb-md-2"
                                            // style={{ marginRight: "5rem" }}
                                            title= {item.name}
                                          >
                                            <a
                                              id={`${item.name[0].toLowerCase()}`}
                                              // href={`/brand/${item.name}/${item.id}`}
                                              href={`/brand/${item.slug != "" ? item.slug?.trim().replaceAll(' ', '-') || '' : item.name?.trim().replaceAll(' ', '-')}/${item.id}`}

                                            >
                                              <img
                                                src={`${API_Brand_View}/${item.brand_logo}`}
                                                alt={item.name}
                                                // value={item.id}
                                                style={{
                                                  width: "118px",
                                                  height: "55px",
                                                }}
                                              />
                                            </a>
                                            <div className="brand-name">
                                              <a
                                                style={{
                                                  color: "#333",
                                                  fontSize: "12px",
                                                  fontWeight: "700",
                                                  textDecoration: "none",
                                                }}
                                                // href={`/brand/${item.name}/${item.id}`}
                                                href={`/brand/${item.slug != "" ? item.slug?.trim().replaceAll(' ', '-') || '' : item.name?.trim().replaceAll(' ', '-')}/${item.id}`}

                                              >
                                                {item.name}
                                              </a>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </div>
                                {/* </div> */}
                              </div>
                            }
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Brands;
