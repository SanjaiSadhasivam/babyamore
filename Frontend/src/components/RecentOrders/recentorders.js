import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**--------------------------Components---------------------------------- */
import Recentorders from "../RecentOrders/Recentorder"
import MyAccountSidebar from '../MyAccountSideBar/MyAccountSideBar';
import './recentorders.css'
import {  token, API_Order } from "../../config/config";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../LazyLoading/Loading";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
function RecentOrders() {
    


    return (
        <>

            <div className='container'>
                <div className='row'>
                    <MyAccountSidebar />
                    <div className='col-md-9 mt-5 mb-3 container'>
                        {/* <div className='p-3'>
                            <div>
                                <div>
                                    <h4 className='mr-5'>Recent Orders</h4>
                                </div>

                            </div>

                            <div>
                                <div>

                                    <div className='mt-5'>
                                        <p className='text-center mb-5' style={{ fontFamily: "Source Sans Pro, sans- serif" }}> No order has been made yet.</p>
                                        <Link to="/Products">
                                            <button className="recent-card-btn">
                                                Browse Products
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div> */}
                        <Recentorders />
                    </div>

                </div>

            </div>


        </>
    );
}

export default RecentOrders;