import React, { useState } from 'react'
/* ------------------------------Packages----------------------------------- */


/* ------------------------------Compnents----------------------------------- */


/* ------------------------------React-icons----------------------------------- */
import "../MyAccount/myaccount.css";
import { Link } from 'react-router-dom';
import MyAccountSidebar from '../MyAccountSideBar/MyAccountSideBar';
import { API_URL,token } from '../../config/config';
import { useEffect } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";
const API_REWARD = `${API_URL}/admin/rewardpoints/getuserreward`;
const config = {
    headers: {
      "content-type": "multipart/form-data",
      // Authorization: `Bearer ${Auths} `
      Authorization: `Bearer ${token}`,
    },
  };
const MyReward = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [RewardData, setRewardData] = useState([]);
    const redeemData = [
        {
            points: "0.04",
            earned: "2.43",
            reward: "123",
            date: "21.06.2022"
        },

    ]
    const data = [
        {
            id: "1",
            emailId: "abc@gmail.com",
            points: "5"
        }
    ]
    const linkData = [
        {
            id: "1",
            emailId: "http://54.255.246.233:2000/MyAccount",
        }
    ]

const getRewards = async()=>{
    let result = await axios.get(`${API_REWARD}/${cookies.customer_id}`,config);
    if(result){
        setRewardData(result.data.list);
    }
}





useEffect(()=>{
getRewards();
},[])


    return (
        <>

            <div className='container'>
                <div className='row'>
                    <MyAccountSidebar />
                    <div className="col-md-9">
                        <div className='rewards mt-5 mb-5'>

                            <h2>My Rewards</h2>
                            {/* <h6 className='mt-4'><strong>Total Points: 0 (RS : 0.000)</strong></h6> */}

                            {/* <div className='mt-3 row'>
                                <div className='col-md-12 col-sm-12'>
                                    <p>Search</p>
                                    <div className="position-relative input-left  ">
                                        <i className="fa fa-search position-absolute search-icon"></i>
                                        <input className="form-control search-input rounded-pill w-100" type="search " placeholder='Search here...' />
                                    </div></div>
                                <div className='col-md-12 col-sm-12'>
                                    <p>Page Size</p>
                                    <select className="basic simple input-right  col-12  rounded-pill" >
                                        <option value="0" selected="selected" >0</option>
                                        <option value="5" >5</option>
                                        <option value="10" >10</option>
                                        <option value="15" >15</option>
                                    </select></div>
                            </div> */}
                            <table className='mt-4 table'>
                                <thead className='table-head'>
                                    <tr>
                                        <th className='referral-table-head'><strong>ORDER ID</strong></th>
                                        <th className='referral-table-head'><strong>EARNED POINTS</strong></th>
                                        <th className='referral-table-head'><strong>REDEEMED POINTS</strong></th>
                                        <th className='referral-table-head'><strong>EARNED DATE</strong></th>
                                    </tr>
                                </thead>
                                <tbody className='table-body '>
                                    {RewardData?.map((redeemItem) =>
                                    (
                                        <tr>
                                            <td>{redeemItem.order_id}</td>
                                            <td>{redeemItem.reward_point}</td>
                                            <td>{redeemItem.redeem_point}</td>
                                            <td>{redeemItem.createDt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </div>

                        <div className='mt-2'>
                            <h2>Referral Table</h2>
                            <table className='table'>
                                <thead className='table-head'>
                                    <tr>
                                        <th><strong>S.No</strong></th>
                                        <th><strong>Email ID</strong></th>
                                        <th><strong>Reward Points</strong></th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {data.map((item) =>
                                    (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.emailId}</td>
                                            <td>{item.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <div className='referral-link mt-2 p-4'>
                            <h2>My Referral Link</h2>
                            <table className='mt-3 table'>
                                <thead className='table-head'>
                                    <tr>
                                        <th className='referral-table-head'><strong>S.No</strong></th>
                                        <th className='referral-table-head'><strong>Referral link</strong></th>
                                        <th className='referral-table-head'><strong>Social</strong></th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {linkData.map((item) =>
                                    (
                                        <tr className='referral-icons'>
                                            <td>{item.id}</td>
                                            <td><Link to="" style={{ color: '#667292 ', fontSize: '13px', fontFamily: 'Samsung Sharp Sans Regular' }}  >{item.emailId}</Link></td>
                                            <td className="icon-pallet">
                                                <div class="social-icons">
                                                    <Link to='/' class="social-icon social-icon--twitter">
                                                        <i class="fa fa-copy"></i>
                                                        <div class="tooltip">Copy</div>
                                                    </Link>
                                                    <Link to='/' class="social-icon social-icon--instagram">
                                                        <i class="fa fa-whatsapp"></i>
                                                        <div class="tooltip">Whatsapp</div>
                                                    </Link>
                                                    <Link to='/' class="social-icon social-icon--facebook">
                                                        <i class="fa fa-facebook"></i>
                                                        <div class="tooltip">Facebook</div>
                                                    </Link>




                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <form>
                                <div className="form-check form-switch">
                                    <input className="form-check-input referral-checkbox" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Unsubscribe Here to Stop Receiving Reward Points Emails</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyReward