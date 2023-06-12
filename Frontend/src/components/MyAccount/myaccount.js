import React,{useEffect, useState} from 'react';

/* ------------------------------Package----------------------------------- */
import { Link, useNavigate } from 'react-router-dom';


/* ------------------------------Components----------------------------------- */
import './myaccount.css';
import MyAccountSideBar from '../MyAccountSideBar/MyAccountSideBar';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { API_URL,token } from '../../config/config';
import { NavLink } from 'react-router-dom';

const Reward = `${API_URL}/admin/rewardpoints/getusertotalreward`;

const config = {
    headers: {
      "content-type": "multipart/form-data",
      // Authorization: `Bearer ${Auths} `
      Authorization: `Bearer ${token}`,
    },
  };
const customer_api = `${API_URL}/admin/customers`;


function MyAccount() {
    const Navigate = useNavigate();
    const [cookies, setCookie,removeCookie] = useCookies();
    const [userData,setuserData]=useState([]);
    const [RewardData,setReward]=useState([]);
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
            emailId: "http://3.90.28.81:2000/MyAccount",
        }
    ]
    const buttonData = [
        {
            name: "Recent orders",
            link:"/recentorders"
        },
        {
            name: "Wishlist",
            link:"/wish-list"
        },
        {
            name: "Recent views",
            link:"#"
        },
        {
            name: "Change Password",
            link:"/changepassword"
        }
    ]
    const redeemData = [
        {
            points: "0.04",
            earned: "2.43",
            reward: "123",
            date: "21.06.2022"
        }


    ]

    /*Active class Dashboard style code*/
    const navLinkStyles = ({ isActive }) => {

        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : '',
            color: isActive ? '#febc5b' : '',
        }
    }

const getCustomerData = async()=>{
    let res = await axios.get(`${customer_api}/${cookies.customer_id}`,config);
    let rest = await axios.get(`${Reward}/${cookies.customer_id}`,config);
    if(res){
        setuserData(res.data.list)
        setReward(rest.data.list)
    }
}
useEffect(() => {
    getCustomerData();
}, [])
const logOut = () => {
    // console.log('clicked');
    // cookies.remove()
    removeCookie("email_address");
    removeCookie("fullName");
    removeCookie("accesstoken");
    removeCookie("phone_number");
    removeCookie("customer_id");
    // navigate("/");
    window.location.href = '/login'
  };


  const handlePush = (link)=>{
    Navigate(link)
  }

    return (
        <>

            <div className='myAccount-container'>

                <div className="container">
                    <div className="row">

                        <MyAccountSideBar />

                        <div className="col-md-9 ">
                            <div className='profile-container'>
                                <p>Hello <span ><b>{userData?.length>0?userData[0].full_name:null}</b></span>  (not <span > <b>{userData?.length>0?userData[0].full_name:null}?</b></span> <a onClick={logOut} style={{cursor:"pointer"}}><span className='danger-text' > Log out </span>)</a> </p>
                                <p>From your account dashboard you can view your <Link to="" className='danger-text'>recent orders</Link>, manage your <Link to="" className='danger-text'>shipping and billing addresses</Link>, and <Link to="" className='danger-text'>edit your password and account details.</Link></p>
                                <div className='profile-button-groups' style={{ navLinkStyles }}>
                                    {buttonData.map((button) => (<button type="button" class="btn btn-outline-dark wishlink" onClick={()=>handlePush(button.link)}><p  >{button.name}</p> </button>
                                    ))}
                                </div>

                                <div className='referral-table mt-5'>

                                    <h2>Referral Table</h2>
                                    <table className='mt-3 table '>
                                        <thead className='table-head '>
                                            <tr className='mt-5'>
                                                <th className='referral-table-head mb-5'><strong>S.No</strong></th>
                                                <th className='referral-table-head'><strong>Email ID</strong></th>
                                                <th className='referral-table-head'><strong>Reward Points</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body mt-5'>
                                            {/* {data.map((item) =>
                                            ( */}
                                                <tr>
                                                    <td>{1}</td>
                                                    <td>{cookies.email_address}</td>
                                                    <td>{RewardData.length>0?RewardData[0].user_total:0}</td>
                                                </tr>
                                            {/* ))} */}
                                        </tbody>
                                    </table>

                                </div>
                                <div className='referral-link mt-5 '>

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
                                                        {/* <OverlayTrigger overlay={<Tooltip>Share via Whatsapp</Tooltip>} >
                                                            <span className="d-inline-block">
                                                                <div style={{ pointerEvents: 'none' }}>
                                                                    <RiWhatsappLine />
                                                                </div>
                                                            </span>
                                                        </OverlayTrigger> 
                                                        <OverlayTrigger overlay={<Tooltip>Share via Facebook</Tooltip>}>
                                                            <span className="d-inline-block">
                                                                <div style={{ pointerEvents: 'none' }}>
                                                                    <GrFacebookOption />
                                                                </div>
                                                            </span>
                                                        </OverlayTrigger>*/}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <div className='rewards mt-5 mb-5'>

                                    <h2>My Rewards</h2>
                                    <h6 className='mt-4'><strong>Total Points: 0 (RS : 0.000)</strong></h6>

                                    <div className='mt-3 row'>
                                        <div className='col-md-12 col-sm-12'>
                                            <p className='def-paragraph'>Search</p>
                                            <div className="position-relative input-left  ">
                                                <i className="fa fa-search position-absolute search-icon"></i>
                                                <input className="form-control search-input rounded-pill" type="search " placeholder='Search here...' />
                                            </div></div>
                                        <div className='col-md-12 col-sm-12'>
                                            <p className='def-paragraph '>Page Size</p>
                                            <select className="basic simple input-right  col-12  rounded-pill" >
                                                <option value="0" selected="selected" >0</option>
                                                <option value="5" >5</option>
                                                <option value="10" >10</option>
                                                <option value="15" >15</option>
                                            </select></div>
                                    </div>
                                    <table className='mt-4 table'>
                                        <thead className='table-head'>
                                            <tr>
                                                <th className='referral-table-head'><strong>REDEEMED POINTS</strong></th>
                                                <th className='referral-table-head'><strong>EARNED POINTS</strong></th>
                                                <th className='referral-table-head'><strong>REWARD FOR</strong></th>
                                                <th className='referral-table-head'><strong>EARNED DATE</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body '>
                                            {redeemData.map((redeemItem) =>
                                            (
                                                <tr>
                                                    <td>{redeemItem.points}</td>
                                                    <td>{redeemItem.earned}</td>
                                                    <td>{redeemItem.reward}</td>
                                                    <td>{redeemItem.date}</td>
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
                                </div> */}
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default MyAccount;