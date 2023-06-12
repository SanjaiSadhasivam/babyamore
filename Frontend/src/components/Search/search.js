import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
/**---------------------------------Pages-------------------------------------------- */
import "./search.css";
import { API_URL, token } from "../../config/config";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/blog/blog-3.jpg";
const Search_API = `${API_URL}/admin/SearchFilter`;
const API_Brand_Image = `${API_URL}/Brand_view`;
//serch properties make as props
const configss = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export default function SearchInput({
  label,
  pholder,
  data,
  onSelected,
  onChange,
  brands,
  topresult,
  category,
}) {
  //states for dropdown
  const [suggestions, setSugesstions] = useState(false);
  const [brandsData, setBrands] = useState([]);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const [TagName, setTagName] = useState("");

  const [datas, setDatas] = useState([]);
  const [getData, setGetData] = useState(null);
  const [categorys, setCategory] = useState([]);
  //filter for search
  const  refOne = useRef(null);
  // console.log(brands, "brands")
  const images = [
    {
      image: image1,
    },
  ];




useEffect(()=>{
document.addEventListener("click",hanldeClickOutside,true);
},[])


const hanldeClickOutside = (e)=>{
if(!refOne.current.contains(e.target)){
  setSugesstions(false);
}
}



  const handler = async (e) => {
    setGetData(e.target.value);
    if (e.target.value) {
      const result = await axios.get(
        `${Search_API}/?name=${e.target.value}`,
        configss
      );
      let category = result.data.list.CategoryData;
      let products = result.data.list.ProductData;
      let brands = result.data.list.BrandData;

      if (category || products || brands) {
        setSugesstions(true);
        setDatas(category);
        setCategory(products);
        setBrands(brands);
      }
    } else {
      setSugesstions(false);
      // setBrands([]);
      // setDatas([]);
      // setCategory([]);
    }
  };

  //Onchange event
  const handleChange = (e) => {
    const input = e.target.value;
    setTagName(e.target.value)
    setIsHideSuggs(false);
    setSelectedVal(input);
    // onChange(input);
    // setSugesstions([]);
    setBrands([]);
    setDatas([]);
    setCategory([]);
  };

  //state return value function
  const hideSuggs = (value) => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(true);
    suggestions(false);
  };

  const handleClose = ()=>{
    setSugesstions(false);
  }

  return (
    <div className="sugesstion-auto">
      <div className="form-control-auto ">
        <label htmlFor="tag-input" className="search_label">
          {label}
        </label>
        <input
          placeholder={pholder}
          type="search"
          aria-label="Search"
          value={selectedVal}
          onChange={handleChange}
          onKeyUp={handler}
          autoComplete="off"
          onClick={()=>handleClose()}
        />
        
      </div>

      <div
        className="suggestions"
        style={{ display: isHideSuggs ? "none" : "block" }}
        ref={refOne}
      >
        {suggestions ? (
          <>
            <div className="row dropdownBorder">
              <div className="col-md-6 v1">
                <h4 className="dropdownBGColor ">CATEGORY</h4>
                {datas.length > 0 ? (
                  <>
                    <div className="searchMenus">
                      {datas.map((item, idx) => {
                        return (
                          <>
                            {" "}
                            <Link
                              to={`/${item.category_name
                                ?.trim()
                                .replaceAll(" ", "-")}/${item.id}`}
                            >
                              <div className="searchMenu">
                                <div
                                  style={{ padding: "5px" }}
                                  className="Keywordfont"
                                  key={item}
                                  onClick={() => {
                                    hideSuggs(item.category_name);
                                  }}
                                >
                                  {item.category_name}
                                </div>{" "}
                                {/* <hr /> */}
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4">
                      <h6>No category found</h6>
                    </div>
                  </>
                )}

                <hr></hr>
                <div>
                  <h4 className="dropdownBGColor ">BRANDS</h4>
                  {brandsData.length > 0 ? (
                    <>
                      {brandsData.map((item, idx) => {
                        return (
                          <>
                            <Link
                              to={`/brand/${item.name
                                ?.trim()
                                .replaceAll(" ", "-")}/${item.id}`}
                            >
                              {" "}
                              <div className="searchMenu">
                                <div
                                  style={{ padding: "15px" }}
                                  className="Keywordfont"
                                  key={item}
                                  onClick={() => {
                                    hideSuggs(item.name);
                                  }}
                                >
                                  <span>{item.name}</span>
                                </div>
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className="p-4">
                        <h6>No brands found</h6>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="dropdownBGColor">PRODUCTS</h4>
                {categorys.length > 0 ? (
                  <>
                    {categorys.map((item, idx) => {
                      console.log(item,"iiiiiiiiiiiiiiiiiiiiiiiiiiii");
                      return (
                        <>
                          <Link
                            to={`/products/${item.ProductName?.trim().replaceAll(
                              " ",
                              "-"
                            )}/${item.Productlist_id}`

                          }
                          state={TagName}
                            
                          >
                            <div className="searchMenu">
                              <div
                                style={{ padding: "5px" }}
                                className="Keywordfont"
                                key={idx}
                                onClick={() => {
                                  hideSuggs(item.ProductName);
                                }}
                              >
                                {item.ProductName}
                              </div>{" "}
                              {/* <hr /> */}
                            </div>{" "}
                          </Link>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <div className="p-4">
                    <h6>No products found</h6>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}