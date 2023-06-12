import React, { useEffect, useContext } from "react";
import img1 from "../assets/images/products/image (2).jpg";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import "../assets/styles/wishlist.css";
import { cartContext } from "../layout/layout";
import { API_URL, API_WISH } from "../config/config";
import axios from "axios";
const API_Image = `${API_URL}/Product_image`;

const Wishlist = () => {
  const {
    carts,
    wishlist,
    total_qty,
    removeCart,
    total_amount,
    total_items,
    GetWishlist,
    GetCartdatas,
  } = useContext(cartContext);
  const [num, setNum] = useState(1);






  const deleteWishlist = async (id) => {
    let res = await axios.put(`${API_WISH}/delete/${id}`);
    if (res) {
      GetWishlist();
    }
  }

  // console.log(
  //   wishList.map((data) => data.title),
  //   "wishList"
  // );
  // const incNum = () => {
  //   if (num < 10) {
  //     setNum(Number(num) + 1);
  //   }
  // };
  // const decNum = () => {
  //   if (num > 1) {
  //     setNum(num - 1);
  //   } else {
  //     setNum(1);
  //   }
  // };


  useEffect(() => {



  }, [])




  return (
    <div>
      <div className="flex-grow medium-text-center flex-col my-5">
        <p className="bread__crumbs__cart text-center">
          <Link to="/">
            <span className="bread__crumbs__cart__one">Home</span>
          </Link>
          <i className="fa fa-angle-right cart__right__icons"></i>
          <span className="bread__crumbs__cart__two"> Wishlist</span>
        </p>
      </div>
      <div className="container">
        <div className="row">
          {
            wishlist.length > 0 ?
            <>
               {
            wishlist.map((item) => {
              return (
                <>
              
                  <div className="col-3 col-md-4 mb-2">
                  <span className="d-flex align-items-center justify-content-center">
                          <CgCloseO className="cart__close__icons mx-2" onClick={() => deleteWishlist(item.id)} />
                          <img
                            src={`${API_Image}/${item.ProductImage}`}
                            className="image-fluid cart__image__one m-0" alt={item.ProductName}
                          />
                        </span>
                    {/* <img
                      src={`${API_Image}/${item.ProductImage}`}
                      className="image-fluid cart__image__one"
                    /> */}
                  </div>
                  <div className="col-3 col-md-4 mb-2">

                    <Link to={`/products/Starplay%20Hippo%20Pool%20with%20Cover/${item.Productlist_id}`}>
                      <p className="cart__table__title">{item.ProductName?item.ProductName.substring(0,20):null}...</p>
                    </Link>
                    <p><b> ₹{Math.round(item.SalePrice)}.00</b></p>
                  </div>
                  <div className="col-6 col-md-4 mb-2">
                    <div className="row">
                     
                      <div className="col-10 col-md-6">
                        <Link to={`/products/Starplay%20Hippo%20Pool%20with%20Cover/${item.Productlist_id}`}>
                          <button className="wishlist-btn  mb-3">View Details</button>
                        </Link>
                      </div>
                     
                      <div className="col-2 col-md-6 order-md-2 ">
                        <RiDeleteBinLine onClick={() => deleteWishlist(item.id)}
                          style={{ fontSize: "20px", textAlign: "center" }}
                        />
                      </div>
                    </div>


                  </div>
                <hr/>
                </>
              )
            })
          }
            </>:
            <>
          
        <div className="container mt-3 mb-5">
          <div className="card">       

            <div>
              {/* <td></td>
                    <td></td>
                     */}
              {/* <td className="empty-wishlist"> */}

              <h5 className="text-center mb-5">No items in wishlist</h5>
              {/* </td> */}

            </div>
          </div>

        </div>
     
            
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
