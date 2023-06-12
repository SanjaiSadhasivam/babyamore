import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import axios from "axios";
// import { API_URL } from "../../../../utils/Api";
import { useCookies } from "react-cookie";
// const API_Vendor = `${API_URL}/UserVendor`
import { API_URL, API_Vendor, API_Staff, token } from "../../../../Api";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const User = () => {
  const [StaffData, setStaffData] = useState({
    Staff_id: '',
    Name: '',
    EmailAddress: '',
    Role_id: '',
    Designation: ''
  });
  const [VendorData, setVendorData] = useState({
    Vendor_id: '',
    Company_name: '',
    Name: '',
    EmailAddress: '',
    Role_id: '',
    Designation: ''
  });
  const [staffID, setStaffID] = useState('');

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const [userDetail, setUserDetail] = useState({
    MobileNumber: '',
    CompanyName: '',
    Email: '',
  });
  const [vendordetail, setVendordetail] = useState('');
  const [staffdetail, setStaffdetail] = useState('');
  const [venID, setVenID] = useState();
  const [vendorID, setVendorID] = useState('');
  const [cookies, setCookie] = useCookies();
  const CookieID = cookies.vendor_id;

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("vendor_id");
    localStorage.removeItem("email_address");

    if (vendordetail) {
      localStorage.removeItem("vendor_id");
    }
    else if(staffdetail){
      localStorage.removeItem("staff_id");
    }
  };

  useEffect(() => {
    const vID = localStorage.getItem("vendor_id")
    console.log("vid",vID);
    setVenID(vID);
    let sID = localStorage.getItem("staff")
    // console.log("vID",vID);
    // setVendorID(vID);

    if (vID) {
      Getdata();
    }
    else {
      getstaff();
    }

  }, [])

  const Getdata = async () => {
    const datas = await axios.get(`${API_Vendor}/${CookieID}`, config)
    console.log("datas", datas.data.list[0].email_address)
    setVendorData({
      Vendor_id: datas.data.list[0].vendor_id,
      Company_name: datas.data.list[0].company_name,
      Name: datas.data.list[0].name,
      EmailAddress: datas.data.list[0].email_address,
      // Role_id: dat.data.list[0].role_id,
      // Designation: dat.data.list[0].designation
    });
    setVendordetail(datas.data.list)
  }

  const getstaff = async () => {

    let Staff = localStorage.getItem("staff_id");
    // let StaffDetails = JSON.parse(Staff);
    // let staffid = StaffDetails.staff_id;
    // console.log("staffdetails", StaffDetails.staff_id);
    // setStaffID(StaffDetails.staff_id);


    const dat = await axios.get(`${API_Staff}/${Staff}`, config)
    console.log("dat", dat.data);
    setStaffData({
      Staff_id: dat.data.list[0].staff_id,
      Name: dat.data.list[0].name,
      EmailAddress: dat.data.list[0].email_address,
      Role_id: dat.data.list[0].role_id,
      Designation: dat.data.list[0].designation
    });
    setStaffdetail(dat.data.list)
  }
  console.log("vendordetail", vendordetail.length);
  console.log("staff", staffdetail.length);

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
          <div className="user-info d-none d-md-block">
            {staffdetail.length != 0 &&
              <>
                <div className="user-status">Staff</div>
                {StaffData.Name && <div className="user-name dropdown-indicator">{StaffData.Name}</div>}
              </>
            }
            {vendordetail.length != 0 &&
              <>
                <div className="user-status">Vendor</div>
                {VendorData.Company_name && <div className="user-name dropdown-indicator">{VendorData.Company_name}</div>}
              </>
            }
            {vendordetail.length == 0 && staffdetail.length == 0 ?
              <>
                <div className="user-status">Vendor</div>
                <div className="user-name dropdown-indicator">BabyAmore</div>
              </>
              : <></>
            }
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              {vendordetail.length != 0 &&
                <span>{VendorData.Company_name.charAt(0).toUpperCase()}</span>
              }
              {staffdetail.length != 0 &&
                <span>{StaffData.Name.charAt(0).toUpperCase()}</span>
              }
              {vendordetail.length == 0 && staffdetail.length == 0 ? <span>B</span> : <></>}
            </div>
            <div className="user-info">
              {vendordetail.length != 0 &&
                <>
                  <span className="lead-text">{VendorData.Company_name}</span>
                  <span className="sub-text">{VendorData.EmailAddress}</span>
                </>
              }
              {staffdetail.length != 0 &&
                <>
                  <span className="lead-text">{StaffData.Name}</span>
                  <span className="sub-text">{StaffData.EmailAddress}</span>
                </>
              }
              {vendordetail.length == 0 && staffdetail.length == 0 ? <span className="lead-text">Baby Amore</span> : <></>}
            </div>
          </div>
        </div>
        {vendordetail.length != 0 || venID ?
          <>
            <div className="dropdown-inner">
              <LinkList>
                <LinkItem link="/Profile" icon="user-alt" onClick={toggle}>
                  View Profile
                </LinkItem>
              </LinkList>
            </div>
          </> : <></>
        }
        {/* {vendordetail.length == 0 &&
          <>
            <div className="dropdown-inner">
              <LinkList>
                <LinkItem link="/Profile" icon="user-alt" onClick={toggle}>
                  View Profile
                </LinkItem>
              </LinkList>
            </div>
          </>
        } */}
        <div className="dropdown-inner">
          {vendordetail.length != 0 &&
            <LinkList>
              <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
                <Icon name="signout"></Icon>
                <span>Sign Out</span>
              </a>
            </LinkList>
          }
          {staffdetail.length != 0 &&
            <LinkList>
              <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
                <Icon name="signout"></Icon>
                <span>Sign Out</span>
              </a>
            </LinkList>
          }
          {vendordetail.length == 0 && staffdetail.length == 0 ?
            <LinkList>
              <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
                <Icon name="signout"></Icon>
                <span>Sign In</span>
              </a>
            </LinkList>
            : ""
          }
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
