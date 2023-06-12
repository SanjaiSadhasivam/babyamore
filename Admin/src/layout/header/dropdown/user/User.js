import React, { useState, useEffect } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { API_URL, API_Banner, token } from "../../../../Api";
const Role_Api = `${API_URL}/admin/userRoles`;
const API_View = `${API_URL}/Admin_Staff`;
const API_STAFF = `${API_URL}/admin/users`
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const User = () => {

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const [cookies, setCookie, removeCookie] = useCookies();
  const [rolename, setRolename] = useState();
  const [adminDetails, setAdminDetails] = useState();
  const [roleadd, setRoleadd] = useState();
  const [staffData, setStaffData] = useState({
    fullname: "",
    email: "",
    Avatar: "",
    role_id: "",
  });

  const CookieID = cookies.user_id;
  console.log("CookieID", CookieID);

  useEffect(() => {
    getData();
    // GetRole();
  }, [])

  const getData = async () => {
    let Result = await axios.get(`${API_STAFF}/${CookieID}`, config);
    console.log("resultt", Result.data.list);
    setAdminDetails(Result.data.list);
    setStaffData({
      email: Result.data.list[0].emailaddress,
      fullname: Result.data.list[0].fullname,
      role_id: Result.data.list[0].role_id,
      Avatar: Result.data.list[0].Avatar,
    })

    let Results = await axios.get(`${Role_Api}/${Result.data.list[0].role_id}`, config);
    setRolename(Results.data.list[0].role_name);
  }


  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userid");
    localStorage.removeItem("emailid");
    localStorage.removeItem("token");
    removeCookie("user_id")
  };
  console.log("adminDetails", adminDetails);

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          {/* <div className="user-info d-none d-md-block">
            <div className="user-status">{rolename}</div>
            <div className="user-name dropdown-indicator">{staffData.fullname}</div>
          </div> */}
          {adminDetails == undefined ?
            <>
              <div className="user-info d-none d-md-block">
                <div className="user-status">Admin</div>
                <div className="user-name dropdown-indicator">BabyAmore</div>
              </div>
            </> :
            <>
              <div className="user-info d-none d-md-block">
                <div className="user-status">{rolename}</div>
                <div className="user-name dropdown-indicator">{staffData.fullname}</div>
              </div>
            </>
          }
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        {adminDetails == undefined ? <>
          <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
            <div className="user-card sm">
              <div className="user-avatar">
                <span>B</span>
                <span>{/* <img src={`${API_View}/${staffData.Avatar}`} alt="preview" /> */}</span>
              </div>
              <div className="user-info">
                <span className="lead-text">BabyAmore</span>
                <span className="sub-text">babyamore@gmail.com</span>
              </div>
            </div>
          </div>

        </> :
          <>
            <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
              <div className="user-card sm">
                <div className="user-avatar">
                  <span>{staffData.fullname.charAt(0).toUpperCase()}</span>
                  <span>{/* <img src={`${API_View}/${staffData.Avatar}`} alt="preview" /> */}</span>
                </div>
                <div className="user-info">
                  <span className="lead-text">{staffData.fullname}</span>
                  <span className="sub-text">{staffData.email}</span>
                </div>
              </div>
            </div>
          </>
        }

        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/vendor-merchant" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            {/* <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem> */}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
