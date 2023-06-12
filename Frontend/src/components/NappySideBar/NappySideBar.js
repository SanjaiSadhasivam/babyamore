import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
/**---------------------------------Components--------------------------------------- */
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";
// import RangeSlider from "../rangeSlider/rangeSlider";
import "./NappySideBar.css";
import { API_URL, API_Brand, API_Brand_Filter, API_Category, token } from "../../config/config";
const API_CAtegory_parms = `${API_URL}/admin/category/getmaindata`;
const API_SUbCategory = `${API_URL}/admin/subcategory/getProductSubCatData`;
const API_childCategory = `${API_URL}/admin/ChildCategory/getChildCatData`;
export const API_Sub_Category = `${API_URL}/admin/subcategory`;
export const API_Child_Category = `${API_URL}/admin/childcategory`;

const configss = {
  headers: { Authorization: `Bearer ${token}`, },
};

const NappySideBar = (props) => {
  const navigate = useNavigate();
  const { brandid, maincategoryid, subcategoryid, childcategoryid } = useParams();
  const [category, setCategory] = useState([]);
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(1000);
  const [sampledata, setsampledata] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    GetdataCategory();
    GetdataBrand();
  }, [brandid]);

  const GetdataCategory = async () => {
    const { data } = await axios.get(`${API_Category}`, configss);
    setCategory(data.list);
  };

  const GetdataBrand = async () => {
    const brand = await axios.get(`${API_Brand}`, configss);
    setBrands(brand.data.list);
  };

  const myFunction = (a, b) => {
    setMin(a);
    setMax(b);
  };

  const calculation = useMemo(() => props.ProductDAtas(sampledata), [sampledata]);
  useEffect(() => { props.PriceFilter(min, max); }, [min, max]);

  //BandCheckList
  const [checkList, setCheckList] = useState([]);
  //checked
  const [isChecked, setIschecked] = useState(true);
  const [subChecked, setsubchecked] = useState(false);
  const [isSubcat, setIsSubcat] = useState(true);
  // id
  const [categoryListId, setCategoryId] = useState(0);
  const [subCatId, setSubCatId] = useState(0);
  const [isSubcatId, setIsSubcatId] = useState(0); //id
  //Child
  const [isSubchild, setisSubchild] = useState(false);
  const [isSubchildren, setisSubchildren] = useState(false);
  //BrandRemove UseRef
  const ref = useRef([]);
  const [formkey, setFormkey] = useState(Date.now())
  const [brandAdd, setBrandAdd] = useState([])
  const [brandAddC, setBrandAddC] = useState(false)
  const [brandResultF, setBrandResultF] = useState(false);
  //ParentCheckbox
  const CheckboxClick = async (id) => {
    if (id) {
      const category = await axios.get(`${API_CAtegory_parms}/${id}`, configss);
      setsampledata(category.data.list);
      if (isChecked) {
        setCategoryId(id);
        setIschecked(true);
        setsubchecked(true);
        setIsSubcatId(0)
      }
      else {
        setCategoryId(id);
        setIschecked(true);
        setsubchecked(true);
        setIsSubcat(false);
        setSubCatId(0);
      }
    }
    setFormkey(Date.now())
    setCheckList([])
    setBrandResultF(false)
  };
  //Child Checkbox
  const CheckboxsubClick = async (subcat_id, e, parentId) => {
    if (subcat_id) {
      if (e.target.checked) {
        setisSubchild(true)
        setSubCatId(subcat_id);
        setIsSubcatId(0);
        setIschecked(false);
        setIsSubcat(true);
        const subcategory = await axios.get(`${API_SUbCategory}/${subcat_id}`, configss);
        setsampledata(subcategory.data.list);
      }
      else {
        setisSubchild(false)
        setSubCatId(0);
        setIsSubcatId(0);
        setIschecked(true);
        const category = await axios.get(`${API_CAtegory_parms}/${parentId}`, configss);
        setsampledata(category.data.list);
      }
    }
  };
  //SubChild Checkbox
  const CheckboxChildClick = async (id, e, child_id) => {
    if (id) {
      if (e.target.checked) {
        setIsSubcatId(id);
        setsubchecked(true);
        setIsSubcat(true);
        setisSubchild(false);
        setisSubchildren(true);
        const childcategory = await axios.get(`${API_childCategory}/${id}`, configss);
        setsampledata(childcategory.data.list);
      }
      else {
        setIsSubcatId(0);
        setisSubchild(true);
        setisSubchildren(true);
        const subcategory = await axios.get(`${API_SUbCategory}/${child_id}`, configss);
        setsampledata(subcategory.data.list);
      }
    }
  };

  //brand select api call
  useEffect(() => {
    async function fetchMyAPI() {
      let formData = new FormData();
      if (checkList.length > 0) {
        formData.append("Brandid", JSON.stringify(checkList));
        await axios.post(`${API_Brand_Filter}`, formData, configss).then(res => {
          navigate('/Brand/getBrandProductData/', { state: { value: res.data.list } });
        }).catch(error => {
          console.error('There was an error!', error);
        });
      }
      if (checkList.length === 0 && brandAddC && brandAdd.length === 0) {
        navigate('/Brands/')
      }
    }
    fetchMyAPI()
  }, [checkList, navigate, brandAdd, brandAddC])

  //brand checkbox add to checklist
  const handleOnChange = async (e, id) => {
    let valuess = Number(e.target.value);
    if (e.target.checked === true) {
      let obj = { value: valuess }
      const index = checkList.findIndex((ele) => ele.value === valuess)
      if (index === -1 && brandResultF && Number(brandid) > 0) {
        setCheckList([...checkList, obj, { value: Number(brandid) }]);
      }
      else {
        setCheckList([...checkList, obj]);
      }
      setBrandAdd(preData => { return [...preData, valuess] })
    }
    else {
      const item = Number(e.target.value)
      const copy_state = [...checkList]
      setCheckList(copy_state.filter(data => data.value !== item))
      setBrandResultF(false)
      setBrandAdd(preData => { return [...preData.filter(data => data !== item)] })
    }
    setCategoryId(0);
    setBrandAddC(true)
  };

  //set category's checkbox true
  useEffect(() => {
    if (maincategoryid !== undefined && maincategoryid > 0 && category.length > 0) {
      setCategoryId(Number(maincategoryid));
      setIschecked(true);
      setsubchecked(true);
      setIsSubcatId(0);
      setIsSubcat(false)
      setSubCatId(0)
      setisSubchildren(false);
      setFormkey(Date.now())
      setCheckList([])
    }
    if (subcategoryid !== undefined && subcategoryid > 0 && category.length > 0) {
      setisSubchild(true)
      setSubCatId(Number(subcategoryid));
      setIsSubcatId(0);
      setsubchecked(true);
      setIsSubcat(true);
      setIschecked(false);
      setFormkey(Date.now());
      setCheckList([])
      //setMainCategoryId
      const getSubCategory = category.map((element) => {
        return { ...element, getsubcat_result: element.getsubcat_result.filter((subElement) => subElement.subcat_id === Number(subcategoryid)) }
      })
      if (getSubCategory.length > 0) {
        for (var i = 0; getSubCategory.length > i; i++) {
          if (getSubCategory[i].getsubcat_result.length !== undefined) {
            for (var j = 0; getSubCategory[i].getsubcat_result.length > j; j++) {
              setCategoryId(getSubCategory[i].id);
            }
          }
        }
      }
    }
    if (childcategoryid !== undefined && childcategoryid > 0 && category.length > 0) {
      setIsSubcatId(Number(childcategoryid));
      setsubchecked(true);
      setIsSubcat(true);
      setisSubchild(false);
      setisSubchildren(true);
      setIschecked(false);
      setFormkey(Date.now());
      setCheckList([])
      //set MainCategory id and sub category id
      const getSubChildCategory = category.map((element) => {
        return { ...element, getsubcat_result: element.getsubcat_result.map((childElement) => { return { ...childElement, getbchildcat_result: childElement.getbchildcat_result.filter((subElement) => subElement.id === Number(childcategoryid)) } }) }
      })
      if (getSubChildCategory.length > 0 && getSubChildCategory.length !== undefined) {
        for (var l = 0; getSubChildCategory.length > l; l++) {
          if (getSubChildCategory[l].getsubcat_result.length !== undefined) {
            for (var m = 0; getSubChildCategory[l].getsubcat_result.length > m; m++) {
              if (getSubChildCategory[l].getsubcat_result[m].getbchildcat_result.length !== undefined) {
                for (var k = 0; getSubChildCategory[l].getsubcat_result[m].getbchildcat_result.length > k; k++) {
                  setCategoryId(getSubChildCategory[l].id);
                  setSubCatId(getSubChildCategory[l].getsubcat_result[m].subcat_id);
                }
              }
            }
          }
        }
      }
    }
  }, [category, maincategoryid, subcategoryid, childcategoryid])

  //BrandID Brand CheckBox
  useEffect(() => {
    if (brandid !== undefined && brandid > 0 && brands !== undefined && brands.length > 0) {
      ref.current[Number(brandid)].checked = true;
      setBrandResultF(true)
      setBrandAdd([Number(brandid)])
    }
  }, [brandid, brands])

  return (
    <>
      <div>
        <div>
          {calculation}
          <div class="table-dark">
            <h5 className="text-dark ">
              Price <hr></hr>
            </h5>
          </div>
          <div className="mb-5">
            <div className="slider-price-range mb-5 position-relative">
              <PriceRangeSlider
                min={0}
                max={20000}
                onChange={({ min, max }) => myFunction(min, max)}
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div class="table-dark">
            <h5 className="text-dark text-dark-2">
              Category<hr></hr>
            </h5>
          </div>
          <div className="text-over">
            {category.map((item, i) => (
              <>
                <div>
                  <input
                    className={`form-check-input`}
                    type="checkbox"
                    value={item.id}
                    onClick={() => CheckboxClick(item.id)}
                    checked={categoryListId === item.id ? isChecked : null}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "0.05em",
                      marginRight: "10px",
                      marginTop: "8px",
                    }}
                  />
                  <label className="form-check-label fontSize">
                    <NavLink
                      to={`/${item.category_name !== "" ? item.category_name?.trim().replaceAll(' ', '-') || '' : item.category_name?.trim().replaceAll(' ', '-')}/${item.id}`}
                      style={{ fontSize: "14px", color: categoryListId === item.id ? "#000" : "#bfbfbf", fontWeight: categoryListId === item.id ? "bold" : "400" }}
                    >
                      {item.category_name}
                    </NavLink>
                  </label>
                </div>
                {categoryListId === item.id ? (
                  <>
                    {subChecked ? (
                      <>
                        {item.getsubcat_result.map((subItem, i) => (
                          <>
                            <div className={`catAlign ${isSubchild}`}>
                              <input
                                className="form-check-input largerCheckbox"
                                type="checkbox"
                                value={subItem.subcat_id}
                                id="flexCheckDefault"
                                onClick={(e) => { CheckboxsubClick(subItem.subcat_id, e, item.id); }}
                                checked={isSubchild && subCatId === subItem.subcat_id}
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "0.05em",
                                  marginRight: "10px",
                                  marginTop: "8px",
                                }}
                              />
                              <label
                                className="form-check-label fontSize"
                                for="flexCheckDefault"
                              >
                                <NavLink
                                  to={`/${item.category_name !== "" ? item.category_name?.trim().replaceAll(' ', '-') || '' : item.category_name?.trim().replaceAll(' ', '-')}/${subItem.title !== "" ? subItem.title?.trim().replaceAll(' ', '-') || '' : subItem.title?.trim().replaceAll(' ', '-')}/${subItem.subcat_id}`}
                                  className="menu_title"
                                >
                                  <p>{subItem.title}</p>
                                </NavLink>
                              </label>
                            </div>
                            {subCatId === subItem.subcat_id ? (
                              <div className={`subCatAlign ${isSubcatId}  ${isSubcat}`}>
                                {isSubcat === true ? (
                                  <>
                                    {subItem.getbchildcat_result.map(
                                      (childItem) => {
                                        return (
                                          <div className="">
                                            <input
                                              className={`form-check-input ${childItem.id}  ${isSubcatId}`}
                                              type="checkbox"
                                              value={childItem.id}
                                              id="flexCheckDefault"
                                              style={{
                                                width: "12px",
                                                height: "12px",
                                                borderRadius: "0.05em",
                                                marginRight: "10px",
                                                marginTop: "7px",
                                              }}

                                              onClick={(e) => { CheckboxChildClick(childItem.id, e, subItem.subcat_id); }
                                              }
                                              checked={isSubchildren && isSubcatId === childItem.id}
                                            />
                                            <label
                                              className="form-check-label fontSize"
                                              for="flexCheckDefault"
                                            >
                                              <NavLink
                                                to={`/${item.category_name !== "" ? item.category_name?.trim().replaceAll(' ', '-') || '' : item.category_name?.trim().replaceAll(' ', '-')}/${subItem.title !== "" ? subItem.title?.trim().replaceAll(' ', '-') || '' : subItem.title?.trim().replaceAll(' ', '-')}/${childItem.childcategoryname !== "" ? childItem.childcategoryname?.trim().replaceAll(' ', '-') || '' : childItem.childcategoryname?.trim().replaceAll(' ', '-')}/${childItem.id}`}
                                              >
                                                <b>{childItem.childcategoryname}</b>
                                              </NavLink>
                                            </label>
                                          </div>
                                        );
                                      }
                                    )}
                                  </>
                                ) : null}
                              </div>
                            ) : null}
                          </>
                        ))}
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            ))}
          </div>
        </div>

        <div>
          <div class="table-dark">
            <h5 className="text-dark">
              Brands <hr></hr>
            </h5>
          </div>
          <div className="text-over">
            <div key={formkey} >
              {brands.map(({ id, name }, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input "
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={id}
                      onChange={e => handleOnChange(e, id)}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "0.05em",
                        marginRight: "10px",
                        marginTop: "8px",
                      }}
                      ref={(element) => { ref.current[id] = element }}
                    />
                    <label htmlFor={`custom-checkbox-${index}`} className="form-check-label fontSize">{name}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 pb-5">
          <span className="product-side-bottom">
            &#x2737; Show only products on sale
          </span>
          <br></br>
          <span className="product-side-bottom">
            &#x1F6D2; Show Sold Out products
          </span>
          <br></br>
          <span className="product-side-bottom">&#8635; Clear filters</span>
        </div>
      </div>
    </>
  );
};

export default NappySideBar;
