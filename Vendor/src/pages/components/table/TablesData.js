import User from "../../../images/avatar/b-sm.jpg";
import User2 from "../../../images/avatar/c-sm.jpg";
import User3 from "../../../images/avatar/a-sm.jpg";
import User4 from "../../../images/avatar/d-sm.jpg";
import User6 from "../../../images/avatar/11w.png";
import User8 from "../../../images/avatar/11.png";
import User9 from "../../../images/avatar/12.png";
import User10 from "../../../images/avatar/13.png";
import User11 from "../../../images/avatar/14.png";
import User12 from "../../../images/avatar/16.png";
import User13 from "../../../images/avatar/17.png";
import User14 from "../../../images/avatar/18.png";




// import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Label, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";

import { UserAvatar, Icon } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
const iconstyle ={
  backgroundColor:"transparent"
}
export const basicData = {
  header: ["#", "First", "Last"],
  data: [
    {
      id: "1",
      first: "Mark",
      last: "Otto",
    },
    {
      id: "2",
      first: "Jacob",
      last: "Thornton",
    },
    {
      id: "3",
      first: "Larry",
      last: "the bird",
    },
  ],
};

export const dataTableColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row) => row.age,
    sortable: true,
    hide: 370,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Company",
    selector: (row) => row.company,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Salary",
    selector: (row) => row.salary,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="edit"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="eye"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="trash"></Icon>
        </DropdownItem>
      </>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const dataTableColumns2 = [
  {
    name: "User",
    selector: (row) => row.name,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.name)} image={row.image}></UserAvatar>
        <div className="user-info">
          <span className="tb-lead">
            {row.name}{" "}
            <span
              className={`dot dot-${row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
                } d-md-none ml-1`}
            ></span>
          </span>
          <span>{row.email}</span>
        </div>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Balance",
    selector: (row) => row.balance,
    minWidth: "140px",
    cell: (row) => (
      <span className="tb-amount">
        {row.balance} <span className="currency">USD</span>
      </span>
    ),
    sortable: true,
    hide: 480,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
    cell: (row) => <span>{row.phone}</span>,
    hide: "md",
  },
  {
    name: "Verified",
    selector: (row) => row.verified,
    sortable: true,
    minWidth: "170px",
    hide: "md",
    cell: (row) => (
      <ul className="list-status d-flex">
        <li>
          <Icon
            className={`text-${row.emailStatus === "success" ? "success" : row.emailStatus === "pending" ? "info" : "secondary"
              }`}
            name={`${row.emailStatus === "success"
              ? "check-circle"
              : row.emailStatus === "alert"
                ? "alert-circle"
                : "alarm-alt"
              }`}
          ></Icon>{" "}
          <span>Email</span>
        </li>
        <li>
          <Icon
            className={`text-${row.kycStatus === "success"
              ? "success"
              : row.kycStatus === "pending"
                ? "info"
                : row.kycStatus === "warning"
                  ? "warning"
                  : "secondary"
              }`}
            name={`${row.kycStatus === "success" ? "check-circle" : row.kycStatus === "pending" ? "alarm-alt" : "alert-circle"
              }`}
          ></Icon>{" "}
          <span>KYC</span>
        </li>
      </ul>
    ),
  },
  {
    name: "Last Login",
    selector: (row) => row.lastLogin,
    sortable: true,
    cell: (row) => <span>{row.lastLogin}</span>,
    hide: "lg",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    hide: "sm",
    cell: (row) => (
      <span
        className={`tb-status ml-1 text-${row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
          }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="edit"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="eye"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="trash"></Icon>
        </DropdownItem>
      </>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const DataTableData = [
  {
    id: 0,
    name: "Francine Kirby",
    age: 24,
    gender: "Message",
    company: "BUZZWORKS",
    startDate: "2017-02-17",
    salary: "$2,570.39",
  },
  {
    id: 1,
    name: "Reva Best",
    age: 40,
    gender: "Message",
    company: "MARQET",
    startDate: "2021-10-14",
    salary: "$1,488.76",
  },
  {
    id: 2,
    name: "Alexis Flores",
    age: 21,
    gender: "Message",
    company: "OBONES",
    startDate: "2020-04-28",
    salary: "$1,336.93",
  },
  {
    id: 3,
    name: "Nixon Sullivan",
    age: 30,
    gender: "Mail",
    company: "SLUMBERIA",
    startDate: "2016-10-08",
    salary: "$2,156.70",
  },
  {
    id: 4,
    name: "Foreman Wooten",
    age: 20,
    gender: "Mail",
    company: "ESCENTA",
    startDate: "2018-07-12",
    salary: "$3,057.42",
  },
  {
    id: 5,
    name: "Franco Davis",
    age: 28,
    gender: "Mail",
    company: "ZILLACON",
    startDate: "2015-10-08",
    salary: "$2,730.88",
  },
  {
    id: 6,
    name: "Bullock Kline",
    age: 32,
    gender: "Mail",
    company: "SAVVY",
    startDate: "2017-07-03",
    salary: "$2,986.05",
  },
  {
    id: 7,
    name: "Baird Coffey",
    age: 36,
    gender: "Mail",
    company: "BLEENDOT",
    startDate: "2014-01-27",
    salary: "$2,755.80",
  },
  {
    id: 8,
    name: "Eula Walters",
    age: 40,
    gender: "Message",
    company: "UXMOX",
    startDate: "2020-09-19",
    salary: "$3,302.75",
  },
  {
    id: 9,
    name: "Gaines Moss",
    age: 26,
    gender: "Mail",
    company: "INCUBUS",
    startDate: "2017-10-13",
    salary: "$3,856.24",
  },
  {
    id: 10,
    name: "Sargent Winters",
    age: 28,
    gender: "Mail",
    company: "AUSTEX",
    startDate: "2020-12-26",
    salary: "$3,668.64",
  },
  {
    id: 11,
    name: "Sybil Patton",
    age: 35,
    gender: "Message",
    company: "ZILIDIUM",
    startDate: "2020-06-19",
    salary: "$1,987.14",
  },
  {
    id: 12,
    name: "Henderson Elliott",
    age: 39,
    gender: "Mail",
    company: "ZOARERE",
    startDate: "2016-08-16",
    salary: "$1,795.31",
  },
  {
    id: 13,
    name: "Combs Irwin",
    age: 33,
    gender: "Mail",
    company: "COLAIRE",
    startDate: "2017-07-19",
    salary: "$2,396.73",
  },
  {
    id: 14,
    name: "Fleming Buchanan",
    age: 33,
    gender: "Mail",
    company: "WEBIOTIC",
    startDate: "2021-09-12",
    salary: "$3,406.96",
  },
  {
    id: 15,
    name: "Mcbride Dixon",
    age: 25,
    gender: "Mail",
    company: "ZBOO",
    startDate: "2017-12-08",
    salary: "$1,065.32",
  },
  {
    id: 16,
    name: "Nettie Greer",
    age: 32,
    gender: "Message",
    company: "QUONK",
    startDate: "2014-03-15",
    salary: "$1,558.83",
  },
  {
    id: 17,
    name: "Anita Saunders",
    age: 39,
    gender: "Message",
    company: "IDEALIS",
    startDate: "2015-07-31",
    salary: "$1,848.84",
  },
  {
    id: 18,
    name: "Darcy Mcclain",
    age: 24,
    gender: "Message",
    company: "DIGIGEN",
    startDate: "2020-02-19",
    salary: "$3,382.78",
  },
  {
    id: 19,
    name: "Jodi Knowles",
    age: 32,
    gender: "Message",
    company: "KONGENE",
    startDate: "2014-03-09",
    salary: "$1,668.05",
  },
  {
    id: 20,
    name: "Cathleen Schroeder",
    age: 21,
    gender: "Message",
    company: "TROPOLIS",
    startDate: "2014-09-28",
    salary: "$2,730.21",
  },
  {
    id: 21,
    name: "Lea Fitzgerald",
    age: 24,
    gender: "Message",
    company: "AVENETRO",
    startDate: "2015-08-17",
    salary: "$2,547.85",
  },
  {
    id: 22,
    name: "Pitts Graham",
    age: 20,
    gender: "Mail",
    company: "MALATHION",
    startDate: "2020-05-08",
    salary: "$3,538.05",
  },
  {
    id: 23,
    name: "Lane Glass",
    age: 22,
    gender: "Mail",
    company: "NETROPIC",
    startDate: "2020-01-26",
    salary: "$1,141.42",
  },
  {
    id: 24,
    name: "Tisha Cleveland",
    age: 33,
    gender: "Message",
    company: "YURTURE",
    startDate: "2020-01-11",
    salary: "$2,877.89",
  },
  {
    id: 25,
    name: "Ortiz Nguyen",
    age: 34,
    gender: "Mail",
    company: "TRIBALOG",
    startDate: "2019-07-09",
    salary: "$3,156.79",
  },
  {
    id: 26,
    name: "Katrina Alvarado",
    age: 33,
    gender: "Message",
    company: "PYRAMIA",
    startDate: "2016-07-04",
    salary: "$2,273.02",
  },
  {
    id: 27,
    name: "Craig Chang",
    age: 30,
    gender: "Mail",
    company: "COMVEYER",
    startDate: "2019-09-08",
    salary: "$3,028.17",
  },
  {
    id: 28,
    name: "Joann Short",
    age: 30,
    gender: "Message",
    company: "PRISMATIC",
    startDate: "2017-08-17",
    salary: "$2,041.14",
  },
  {
    id: 29,
    name: "Vargas Rivers",
    age: 23,
    gender: "Mail",
    company: "ELPRO",
    startDate: "2014-04-25",
    salary: "$1,906.04",
  },
  {
    id: 30,
    name: "Snow Hampton",
    age: 37,
    gender: "Mail",
    company: "SNORUS",
    startDate: "2014-11-30",
    salary: "$1,419.30",
  },
  {
    id: 31,
    name: "Ellison Pennington",
    age: 32,
    gender: "Mail",
    company: "APEX",
    startDate: "2020-02-06",
    salary: "$3,486.62",
  },
  {
    id: 32,
    name: "Kate Donaldson",
    age: 28,
    gender: "Message",
    company: "TALENDULA",
    startDate: "2021-07-05",
    salary: "$3,025.63",
  },
  {
    id: 33,
    name: "Bridges Franco",
    age: 20,
    gender: "Mail",
    company: "FURNAFIX",
    startDate: "2021-09-21",
    salary: "$1,371.72",
  },
  {
    id: 34,
    name: "Montgomery Moreno",
    age: 24,
    gender: "Mail",
    company: "ZIORE",
    startDate: "2018-08-04",
    salary: "$1,016.90",
  },
  {
    id: 35,
    name: "Meyers Barnett",
    age: 25,
    gender: "Mail",
    company: "OCEANICA",
    startDate: "2017-03-04",
    salary: "$3,804.05",
  },
  {
    id: 36,
    name: "Gertrude Glenn",
    age: 29,
    gender: "Message",
    company: "FORTEAN",
    startDate: "2018-04-19",
    salary: "$3,883.97",
  },
  {
    id: 37,
    name: "Wise Fitzpatrick",
    age: 34,
    gender: "Mail",
    company: "RODEOLOGY",
    startDate: "2017-11-08",
    salary: "$1,400.23",
  },
  {
    id: 38,
    name: "Joseph Leonard",
    age: 30,
    gender: "Mail",
    company: "QIMONK",
    startDate: "2014-12-01",
    salary: "$2,689.09",
  },
  {
    id: 39,
    name: "Booker Chambers",
    age: 24,
    gender: "Mail",
    company: "SKYPLEX",
    startDate: "2014-07-29",
    salary: "$3,949.05",
  },
  {
    id: 40,
    name: "Corrine Kerr",
    age: 35,
    gender: "Message",
    company: "FIBEROX",
    startDate: "2019-06-07",
    salary: "$2,245.15",
  },
  {
    id: 41,
    name: "Williamson Daniel",
    age: 26,
    gender: "Mail",
    company: "GREEKER",
    startDate: "2020-09-15",
    salary: "$3,814.20",
  },
  {
    id: 42,
    name: "Anthony Oneill",
    age: 36,
    gender: "Mail",
    company: "MIXERS",
    startDate: "2020-07-22",
    salary: "$1,129.99",
  },
  {
    id: 43,
    name: "Marquita Hubbard",
    age: 25,
    gender: "Message",
    company: "VELOS",
    startDate: "2015-11-19",
    salary: "$2,227.39",
  },
  {
    id: 44,
    name: "Dena Clements",
    age: 34,
    gender: "Message",
    company: "ORBEAN",
    startDate: "2020-08-31",
    salary: "$2,689.21",
  },
  {
    id: 45,
    name: "Tia Curry",
    age: 37,
    gender: "Message",
    company: "MUSAPHICS",
    startDate: "2019-04-02",
    salary: "$3,784.72",
  },
  {
    id: 46,
    name: "Rios House",
    age: 30,
    gender: "Mail",
    company: "IMPERIUM",
    startDate: "2015-08-23",
    salary: "$1,519.37",
  },
  {
    id: 47,
    name: "Whitfield Mcleod",
    age: 37,
    gender: "Mail",
    company: "SCHOOLIO",
    startDate: "2015-03-17",
    salary: "$2,365.21",
  },
  {
    id: 48,
    name: "Conrad Holt",
    age: 38,
    gender: "Mail",
    company: "MENBRAIN",
    startDate: "2020-02-01",
    salary: "$2,289.04",
  },
  {
    id: 49,
    name: "Mclaughlin Fletcher",
    age: 34,
    gender: "Mail",
    company: "SOLAREN",
    startDate: "2018-09-05",
    salary: "$1,115.62",
  },
];

//Disputes Tables Content

export const disputesTableColumnsadd2s = [

  {
    name: "  S.NO",
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: "Logo",
    selector: (row) => row.image,
   
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "  Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Email",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Country",
    selector: (row) => row.name2,
    sortable: true,
  },
  ,
  {
    name: "Status",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Brand</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Brand</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Brand</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

//Main Category List

export const disputesTableColumnsmain = [
  {
    name: " S.NO",
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.image,
  
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: " Category Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Slug Name",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Meta Title",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  // {
  //   name: "Country",
  //   selector: (row) => row.name2,
  //   sortable: true,
  // },
  // ,
  // {
  //   name: "Status",
  //   selector: (row) => row.startDate,
  //   sortable: true,
  //   hide: "md",
  // },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Category</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Category</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Category </span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];
// Sub Main Category List

export const disputesTableColumnsub = [
  {
    name: "S.No",
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.image,
    
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "Main Category",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Sub Category",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Meta Title",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  // {
  //   name: "Country",
  //   selector: (row) => row.name2,
  //   sortable: true,
  // },
  // ,
  // {
  //   name: "Status",
  //   selector: (row) => row.startDate,
  //   sortable: true,
  //   hide: "md",
  // },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Sub Category</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Sub Category</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Sub Category</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

// Child List Category


export const disputesTableColumnchild = [
  {
    name: "S.NO",
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.image,
   
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },


  {
    name: "Main Category",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Sub Category",
    selector: (row) => row.name1,
    sortable: true,
  },
  {
    name: "Child Category",
    selector: (row) => row.name2,
    sortable: true,
  },
  {
    name: "Meta Title",
    selector: (row) => row.name3,
    sortable: true,
  },

  //

  // {
  //   name: "Country",
  //   selector: (row) => row.name2,
  //   sortable: true,
  // },
  // ,
  // {
  //   name: "Status",
  //   selector: (row) => row.startDate,
  //   sortable: true,
  //   hide: "md",
  // },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Child Category</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Child Category</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Child Category</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumnstickets = [
  {
    name: "Image",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "  Subject",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Priority",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Replies",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Assigned to",
    selector: (row) => row.name2,
    sortable: true,
  },
  ,
  {
    name: "Last  Update",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Option",
    cell: (row) => (
      <>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="edit"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="eye"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="trash"></Icon>
        </DropdownItem>
      </>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumnsroles = [
  // {
  //   name: "Ifrrmage",
  //   selector: (row) => row.image,
  //   compact: true,
  //   grow: 2,
  //   style: { paddingRight: "20px", paddingLeft: "20px" },
  //   cell: (row) => (
  //     <div className="user-card mt-2 mb-2">
  //       <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
  //     </div>
  //   ),
  //   sortable: true,
  // },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    
  },


  //
  {
    name: "Role Type",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
 
  // ,
  // {
  //   name: "Status",
  //   selector: (row) => row.startDate,
  //   sortable: true,
  //   hide: "md",
  // },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit UserRole</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View UserRole</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove UserRole</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumnsvist = [
  {
    name: "Flag",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "  IP Address",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Hits",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Page Views",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Last Vist",
    selector: (row) => row.name2,
    sortable: true,
  },

  {
    name: "",
    cell: (row) => (
      <>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="edit"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="eye"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="trash"></Icon>
        </DropdownItem>
      </>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumnrefund = [
  // {
  //   name: "Image",
  //   selector: (row) => row.image,
  //   compact: true,
  //   grow: 2,
  //   style: { paddingRight: "20px", paddingLeft: "20px" },
  //   cell: (row) => (
  //     <div className="user-card mt-2 mb-2">
  //       <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
  //     </div>
  //   ),
  //   sortable: true,
  // },

  {
    name: " Order",
    selector: (row) => row.name12,
    sortable: true,
  },
  {
    name: "  Return Goods",
    selector: (row) => row.name13,
    sortable: true,
  },
  {
    name: " Order Amount",
    selector: (row) => row.name14,
    sortable: true,
  },
  {
    name: "  Refund Amount",
    selector: (row) => row.name15,
    sortable: true,
  },

  {
    name: "Status",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Created at",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Last Update",
    selector: (row) => row.name2,
    sortable: true,
  },

  {
    name: "OPTION",
    cell: (row) => (
      <>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="edit"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="eye"></Icon>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="#dropdown"
         className="p-0" style={iconstyle}
        >
          <Icon name="trash"></Icon>
        </DropdownItem>
      </>
    ),
    allowOverflow: true,
    button: true,
  },
];
export const disputesTableColumnbanner = [
  {
    name: "  S.NO",
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: "  Details",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Banner Images ",
    selector: (row) => row.image,
   
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Options",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Created at",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },

  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Banner</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Banner</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Banner</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];
export const disputesTableColumnsadd2sGro = [
  {
    name: "Background Images",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "Cover Images",
    selector: (row) => row.image1,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },
  {
    name: "  Category",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Sub-Group",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Order",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  // {
  //   name: "Country",
  //   selector: (row) => row.name2,
  //   sortable: true,
  // },
  // ,
  // {
  //   name: "Status",
  //   selector: (row) => row.startDate,
  //   sortable: true,
  //   hide: "md",
  // },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];
export const disputesTableColumnsadd2sGro21 = [
  {
    name: "Cover Images",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "Featured Images",
    selector: (row) => row.image1,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Category Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Parent",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Attributes",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Product",
    selector: (row) => row.gender1,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Listings",
    selector: (row) => row.gender2,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Orders",
    selector: (row) => row.gender3,
    sortable: true,
    hide: "sm",
  },
  // {
  //   name: "Country",
  //   selector: (row) => row.name2,
  //   sortable: true,
  // },
  // ,
  // {
  //   name: "Status",
  //   selector: (row) => row.startDate,
  //   sortable: true,
  //   hide: "md",
  // },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumnsadd2sGro2 = [
  {
    name: "Cover Images",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "  Category-Sub Group",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: " Parent",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Categories",
    selector: (row) => row.name1,
    sortable: true,
  },

  //
  {
    name: "Order",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  // {
  //   name: "Country",
  //   selector: (row) => row.name2,
  //   sortable: true,
  // },
  // ,
  // {
  //   name: "Status",
  //   selector: (row) => row.startDate,
  //   sortable: true,
  //   hide: "md",
  // },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTablesColumnsadd2s1 = [
  // {
  //   name: "Image",
  //   selector: (row) => row.image,
  //   compact: true,
  //   grow: 2,
  //   style: { paddingRight: "20px" },
  //   cell: (row) => (
  //     <div className="user-card mt-2 mb-2">
  //       <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
  //     </div>
  //   ),
  //   sortable: true,
  // },

  {
    name: " Body",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.name1,
    sortable: true,
  },
  {
    name: "Author",
    selector: (row) => row.name2,
    sortable: true,
  },
  //
  {
    name: "Created at",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  ,
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTablesColumnsadd2s = [
  {
    name: "Image",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: " ISO CODE",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "  Name",
    selector: (row) => row.name1,
    sortable: true,
  },
  {
    // name: "Status",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "No.of.Regions",
    selector: (row) => row.name2,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
  //
];

//customer list

export const disputesTableColumnsadd2s12 = [
  {
    name: "Image",
    selector: (row) => row.image,
   
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "Full  Name",
    selector: (row) => row.name1,
    sortable: true,
  },
  {
    name: " Nick Name",
    selector: (row) => row.name,
    sortable: true,
  },

  {
    name: "Email",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Order",
    selector: (row) => row.name2,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Customer</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Customer</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Customer</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];
// -----------------------------------------------------
export const disputesTableColumnsadd2s12s = [
  {
    name: "Vendor Id",
    selector: (row) => row.id,
    sortable: true,
  },

  {
    name: " Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email Id",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "MOB.NO",
    selector: (row) => row.mobile,
    sortable: true,
  },

  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },

  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Vendor</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Vendor</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Vendor</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumnsadd2s12s22 = [
  {
    name: "Image",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "Shop Name",
    selector: (row) => row.name,
    sortable: true,
  },

  {
    name: "Owner",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumns2s = [
  {
    name: "S.NO",
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: "Attribute ID",
    selector: (row) => row.id,
    sortable: true,
  },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
    hide: 370,
  },
  {
    name: "Vendor",
    selector: (row) => row.vendor,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
    hide: "md",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Attributes</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Attributes</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Attributes</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
  //
];

export const disputesTableColumnsprod = [
  {
    name: "Product",
    selector: (row) => row.company,
    sortable: true,
  },

  {
    name: "Model",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "GTIN",
    selector: (row) => row.age1,
    sortable: true,
    hide: 370,
  },

  {
    name: "QUANTITY",
    selector: (row) => row.gender1,
    sortable: true,
    hide: "sm",
  },

  {
    name: "UNIQUE PURCHASE",
    selector: (row) => row.gender21,
    sortable: true,
    hide: "md",
  },
  {
    name: "AVERAGE ",
    selector: (row) => row.gender22,
    sortable: true,
    hide: "md",
  },
  {
    name: "REVENUE",
    selector: (row) => row.gender23,
    sortable: true,
    hide: "md",
  },

  //
];

export const disputesTableColumns2sGro = [
  {
    name: " Background Image",
    selector: (row) => row.image,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: " Cover Image",
    selector: (row) => row.image19,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px", paddingLeft: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.image)} image={row.image}></UserAvatar>
      </div>
    ),
    sortable: true,
  },

  {
    name: "Category Group",
    selector: (row) => row.age,
    sortable: true,
    hide: 370,
  },

  {
    name: "Sub Group",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },

  {
    name: "Orders",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
  //
];

export const disputesTableColumns2sc = [
  {
    name: "Created at",
    selector: (row) => row.company,
    sortable: true,
  },

  {
    name: "Customer",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Items",
    selector: (row) => row.age,
    sortable: true,
    hide: 370,
  },

  {
    name: "Quantity",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },

  {
    name: "Grand Total",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumns2sc1 = [
  {
    name: "Order",
    selector: (row) => row.company,
    sortable: true,
  },

  {
    name: "Shop",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Customer",
    selector: (row) => row.age,
    sortable: true,
    hide: 370,
  },
  //
  {
    name: "Grand Total",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  //
  {
    name: "Payment",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Requested Items",
    selector: (row) => row.startDate1,
    sortable: true,
    hide: "md",
    conditionalCellStyles: [
      {
        when: (row) => row.startDate1 !== "",
        style: {
          maxWidth: "120px",
          minWidth: '120px'
        },
      },
    ],
  },
  {
    name: "Requested At",
    selector: (row) => row.startDate11,
    sortable: true,
    hide: "md",
  },
  {
    name: "Status",
    selector: (row) => row.startDate12,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumn = [
  {
    name: "Order No",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.age,
    sortable: true,
    hide: 370,
  },
  {
    name: "Product Details",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Price",
    selector: (row) => row.company,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Package",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Shipping",
    selector: (row) => row.salary,
    sortable: true,
    hide: "md",
  },
  {
    name: "Status",
    selector: (row) => row.sam,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumns = [
  {
    name: "Order No",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.age,
    sortable: true,
    hide: 370,
  },
  {
    name: "Product Details",
    selector: (row) => row.gender,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Price",
    selector: (row) => row.company,
    sortable: true,
    hide: "sm",
  },
  {
    name: "Package",
    selector: (row) => row.startDate,
    sortable: true,
    hide: "md",
  },
  {
    name: "Shipping",
    selector: (row) => row.salary,
    sortable: true,
    hide: "md",
  },
  {
    name: "Status",
    selector: (row) => row.sam,
    sortable: true,
    hide: "md",
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumns2s1 = [
  {
    name: "User",
    selector: (row) => row.name,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.name)} image={row.image}></UserAvatar>
        <div className="user-info">
          <span className="tb-lead">
            {row.name}{" "}
            <span
              className={`dot dot-${row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
                } d-md-none ml-1`}
            ></span>
          </span>
          <span>{row.email}</span>
        </div>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Balance",
    selector: (row) => row.balance,
    minWidth: "140px",
    cell: (row) => (
      <span className="tb-amount">
        {row.balance} <span className="currency">USD</span>
      </span>
    ),
    sortable: true,
    hide: 480,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
    cell: (row) => <span>{row.phone}</span>,
    hide: "md",
  },
  {
    name: "Verified",
    selector: (row) => row.verified,
    sortable: true,
    minWidth: "170px",
    hide: "md",
    cell: (row) => (
      <ul className="list-status d-flex">
        <li>
          <Icon
            className={`text-${row.emailStatus === "success" ? "success" : row.emailStatus === "pending" ? "info" : "secondary"
              }`}
            name={`${row.emailStatus === "success"
              ? "check-circle"
              : row.emailStatus === "alert"
                ? "alert-circle"
                : "alarm-alt"
              }`}
          ></Icon>{" "}
          <span>Email</span>
        </li>
        <li>
          <Icon
            className={`text-${row.kycStatus === "success"
              ? "success"
              : row.kycStatus === "pending"
                ? "info"
                : row.kycStatus === "warning"
                  ? "warning"
                  : "secondary"
              }`}
            name={`${row.kycStatus === "success" ? "check-circle" : row.kycStatus === "pending" ? "alarm-alt" : "alert-circle"
              }`}
          ></Icon>{" "}
          <span>KYC</span>
        </li>
      </ul>
    ),
  },
  {
    name: "Last Login",
    selector: (row) => row.lastLogin,
    sortable: true,
    cell: (row) => <span>{row.lastLogin}</span>,
    hide: "lg",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    hide: "sm",
    cell: (row) => (
      <span
        className={`tb-status ml-1 text-${row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
          }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const disputesTableColumns3 = [
  {
    name: "User",
    selector: (row) => row.name,
    compact: true,
    grow: 2,
    style: { paddingRight: "20px" },
    cell: (row) => (
      <div className="user-card mt-2 mb-2">
        <UserAvatar theme={row.avatarBg} text={findUpper(row.name)} image={row.image}></UserAvatar>
        <div className="user-info">
          <span className="tb-lead">
            {row.name}{" "}
            <span
              className={`dot dot-${row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
                } d-md-none ml-1`}
            ></span>
          </span>
          <span>{row.email}</span>
        </div>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Balance",
    selector: (row) => row.balance,
    minWidth: "140px",
    cell: (row) => (
      <span className="tb-amount">
        {row.balance} <span className="currency">USD</span>
      </span>
    ),
    sortable: true,
    hide: 480,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
    cell: (row) => <span>{row.phone}</span>,
    hide: "md",
  },
  {
    name: "Verified",
    selector: (row) => row.verified,
    sortable: true,
    minWidth: "170px",
    hide: "md",
    cell: (row) => (
      <ul className="list-status d-flex">
        <li>
          <Icon
            className={`text-${row.emailStatus === "success" ? "success" : row.emailStatus === "pending" ? "info" : "secondary"
              }`}
            name={`${row.emailStatus === "success"
              ? "check-circle"
              : row.emailStatus === "alert"
                ? "alert-circle"
                : "alarm-alt"
              }`}
          ></Icon>{" "}
          <span>Email</span>
        </li>
        <li>
          <Icon
            className={`text-${row.kycStatus === "success"
              ? "success"
              : row.kycStatus === "pending"
                ? "info"
                : row.kycStatus === "warning"
                  ? "warning"
                  : "secondary"
              }`}
            name={`${row.kycStatus === "success" ? "check-circle" : row.kycStatus === "pending" ? "alarm-alt" : "alert-circle"
              }`}
          ></Icon>{" "}
          <span>KYC</span>
        </li>
      </ul>
    ),
  },
  {
    name: "Last Login",
    selector: (row) => row.lastLogin,
    sortable: true,
    cell: (row) => <span>{row.lastLogin}</span>,
    hide: "lg",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    hide: "sm",
    cell: (row) => (
      <span
        className={`tb-status ml-1 text-${row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "danger"
          }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Action",
    cell: (row) => (
      <ul className="nk-tb-actions gx-1 my-n1">
      <li className="mr-n1">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="a"
            
            className="dropdown-toggle btn btn-icon btn-trigger"
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#edit"

                >
                  <Icon name="edit"></Icon>
                  <span>Edit Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#view"
                >
                  <Icon name="eye"></Icon>
                  <span>View Product</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#remove"
                >
                  <Icon name="trash"></Icon>
                  <span>Remove Product</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const DisputesTableData = [
  {
    no: 1,
    id: 10,
    name: "Wooden Toys",
    type: "Gears & Toys",
    age: "Baby Product",
    vendor: "Sathish",
    gender: "Gears & Toys",
    image: User2,
    company: "10 ",
    startDate: "2",
    salary: "ALLTER",
    sam: "Active",
    price:"₹329",
    status: "completed"
  },
  {
    no: 2,
    id: 30,
    name: "Wooden Toys",
    type: "Gears & Toys",
    age: "Baby Product",
    vendor: "Sathish",
    gender: "Gears & Toys",
    image: User2,
    company: "10 ",
    startDate: "2",
    salary: "ALLTER",
    sam: "Active",
    price:"₹329",
    status: "completed"
  },
];

export const DisputesTableProd = [
  {
    id: 1,
    name: "Full Sleeve BodySuit",
    age: "Baby Product",
    age1: "7176910644894",
    gender: "Baby ",
    gender1: "1 ",
    gender21: "12",
    gender22: "₹1400",
    gender23: "₹1200",
    image: User2,
    company: "Baby Clothes  ",
    startDate: "2",
    salary: "ALLTER",
    sam: "Active",
  },
];

export const DisputesTableDataGroup = [
  // {
  //   id: 0,
  //   name: "Francine Kirby",
  //   age: "RFD",
  //   gender: "Message",
  //   company: "BUZZWORKS",
  //   startDate: "2017-02-17",
  //   // salary: "$2,570.39",
  // },
  {
    id: 1,
    name: "Baby",
    age: "Baby Product",
    gender: "7 ",
    image: User2,
    company: "10 ",
    startDate: "2",
    salary: "ALLTER",
    sam: "Active",
  },
];

export const DisputesTableData11 = [
  {
    id: 1,
    name: "1",
    age: "Sathish",
    gender: "₹1200",
    image: User2,
    company: "10 ",
    startDate12: "Active",
    startDate: "₹1200",
    startDate21: "2",
    startDate1: "Cloth",
    startDate11: "24.04.2022",
    salary: "ALLTER",
    sam: "Active",
  },
];

export const DisputesTableDatas11 = [
  {
    id: 1,
    name: "Sathish",
    age: "Baby Product",
    gender: "19 ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Rs.2000",
    salary: "ALLTER",
    sam: "Active",
  },
];

export const DisputesTableData12 = [
  {
    no: 1,
    id: 5,
    name: "Allter",
    name1: "+91 99292 99939",
    name2: "INDIA",
    age: "Baby Product",
    gender: "info@allter.com ",
    image: User12,
    company: "4 Hour Ago",
    startDate: "ACTIVE",
    salary: "ALLTER",
    sam: "Active",
  },
  {
    no: 2,
    id: 25,
    name: "Abena",
    name1: "+91 99292 99939",
    name2: "INDIA",
    age: "Baby Product",
    gender: "care@abena.in",
    image: User13,
    company: "4 Hour Ago",
    startDate: "ACTIVE",
    salary: "Abena",
    sam: "Active",
  },
  {
    no: 3,
    id: 30,
    name: "Bloom",
    name1: "+91 99292 99939",
    name2: "INDIA",
    age: "Baby Product",
    gender: "sales@bloom.com ",
    image: User14,
    company: "4 Hour Ago",
    startDate: "ACTIVE",
    salary: "Bloom",
    sam: "Active",
  },
];
//User
export const DisputesTableData102 = [
  {
    id: 1,
    name: "PureBorn Diapers",
    name1: "987654321",
    name2: "India",
    age: "Baby Product",
    gender: "admin@babyamore.com ",
    image: User8,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];


//User
export const DisputesTableDatamain = [
  {
    no: 1,
    id: 1,
    name: "Nappy Care",
    name1: "Nappy",
    name2: "Nappy",
    age: "Baby Product",
    gender: " Nappy ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
  {
    no: 2,
    id: 1,
    name: "Nappy Care",
    name1: "Nappy",
    name2: "Nappy",
    age: "Baby Product",
    gender: " Nappy ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
  {
    no: 3,
    id: 1,
    name: "Nappy Care",
    name1: "Nappy",
    name2: "Nappy",
    age: "Baby Product",
    gender: " Nappy ",
    image: User8,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
  {
    id: 1,
    name: "Nappy Care",
    name1: "Nappy",
    name2: "Nappy",
    age: "Baby Product",
    gender: " Nappy ",
    image: User8,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
  {
    id: 1,
    name: "Nappy Care",
    name1: "Nappy",
    name2: "Nappy",
    age: "Baby Product",
    gender: " Nappy ",
    image: User9,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];

//sub

export const DisputesTableDatasub = [
  {
    no: 1,
    id: 1,
    name: "Feeding",
    name1: "Bottle Feeding",
    name2: "Admin",
    age: "Baby Product",
    gender: " Feeding  ",
    image: User8,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
  {
    id: 1,
    name: "Feeding",
    name1: "Bottle Feeding",
    name2: "Admin",
    age: "Baby Product",
    gender: " Feeding  ",
    image: User9,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
   {
    no: 2,
    id: 2,
    name: "Feeding",
    name1: "Bottle Feeding",
    name2: "Admin",
    age: "Baby Product",
    gender: " Feeding  ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];


//child List
export const DisputesTableDatachild = [
  {
    no: 1,
    id: 1,
    name: "Skin & Bath",
    name1: "Bath",
    name2: "Shampoos & Conditioner",
    name3: "Shampoos",
    age: "Baby Product",
    gender: " Nappy  ",
    image: User8,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
  {
    no: 2,
    id: 2,
    name: "Skin & Bath",
    name1: "Bath",
    name2: "Shampoos & Conditioner",
    name3: "Shampoos",
    age: "Baby Product",
    gender: " Nappy  ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
//Tickets
export const DisputesTableDatatickets = [
  {
    id: 1,
    name: "Phuket Retailer",
    name1: " Nihil omnis dicta soluta et ipsa.",
    name2: "-",
    age: "Baby Product",
    gender: "2",
    image: User2,
    company: "4 Hour Ago",
    startDate: "9 hours ago",
    salary: "ALLTER",
    sam: "Active",
  },
];
export const DisputesTableDataroles = [
  {
    id: 1,
    name: "Sathish",
    name1: "Admin User",
    name2: "Admin",
    age: "Baby Product",
    gender: "Admin",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
export const DisputesTableDataVist = [
  {
    id: 1,
    name: " 254.58.93.139",
    name1: "426	",
    name2: "3 Month Ago",
    age: "Baby Product",
    gender: "67",
    image: User6,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
export const DisputesTableDatarefund = [
  {
    id: 1,
    name: "Sathish",
    name12: "12",
    name13: "A Toddler Thing Baby Full Sleeve Bodysuit",
    name14: " ₹10200",
    name15: "₹1200",
    name1: "Pending",
    name2: "10 Minutes Ago",
    age: "Baby Product",
    gender: "12th May 2022 ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
export const DisputesTableDatabanner = [
  {
    no: 1,
    id: 1,
    name: "Fashion accessories deals Up to 36% off + free shipping",
    name1: "Group: Group 1 Columns: 4",
    name2: "Admin",
    age: "Baby Product",
    gender: "Apr 26, 2022",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
export const DisputesTableData102Gro = [
  {
    id: 1,
    name: "Baby Product",
    name1: "12",
    name2: "Admin",
    age: "Baby Product",
    gender: "10",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];

export const DisputesTableData102Gro21 = [
  {
    id: 1,
    name: "Baby Product",
    name1: "Baby",
    name2: "Admin",
    age: "Baby Product",
    gender: "5",
    gender1: "11",
    gender2: "10",
    gender3: "100",

    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];

export const DisputesTableData102Gro2 = [
  {
    id: 1,
    name: "Baby Product",
    name1: "12",
    name2: "Admin",
    age: "Baby Product",
    gender: "10",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];

export const DisputesTableDatas1021 = [
  {
    id: 1,
    name: "Black Friday Deals!",
    name1: "Shop Now",
    name2: "Admin",
    age: "Baby Product",
    gender: "4 Hours Ago",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
export const DisputesTableDatas102 = [
  {
    id: 1,
    name: "SF",
    name1: "Admin User",
    name2: "0",
    age: "Baby Product",
    gender: "admin@babyamore.com ",
    image: User6,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
export const DisputesTableData1102 = [
  {
    id: 1,
    name: "Sathish",
    name1: "Sathish",
    name2: "10",
    age: "Baby Product",
    gender: "admin@babyamore.com ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];
// --------------------------------------------------
export const DisputesTableData11021 = [
  {
    id: 2050,
    name: "Sathish",
    email: "Admin@gmail.com",
    mobile: "67898709080",
    status: "Active",
  },
];
export const DisputesTableData11021ss = [
  {
    id: 1,
    name: "Sathish",
    name1: "Admin User",
    name2: "10",
    age: "Baby Product",
    gender: "admin@demo.com ",
    image: User2,
    company: "4 Hour Ago",
    startDate: "Active",
    salary: "ALLTER",
    sam: "Active",
  },
];

//ProdList
export const DisputesTableDatas = [
  // {
  //   id: 0,
  //   name: "Francine Kirby",
  //   age: "RFD",
  //   gender: "Message",
  //   company: "BUZZWORKS",
  //   startDate: "2017-02-17",
  //   // salary: "$2,570.39",
  // },
  {
    id: 1,
    name: "2hh35",
    age: "2021-10-14",
    gender: "Water ",
    company: "150",
    startDate: "ALLTER",
    salary: "ALLTER",
    sam: "Active",
  },

  //
];
export const userData = [
  {
    id: 1,
    avatarBg: "purple",
    name: "Abu Bin Ishtiyak",
    displayName: "Ishtiak",
    dob: "10 Aug, 1980",
    role: "Customer",
    checked: false,
    email: "info@babyamore.in",
    balance: "35,040.34",
    phone: "818474958",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "10 Feb 2020",
    status: "Active",
    address: "2337 Kildeer Drive",
    state: "Kentucky",
    country: "Canada",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 2,
    avatarBg: "purple",
    image: User3,
    name: "Ashley Lawson",
    dob: "10 Sept, 1990",
    role: "Investor",
    email: "ashley@babyamore.in",
    balance: "580.00",
    checked: false,
    phone: "1243941787",
    emailStatus: "success",
    kycStatus: "pending",
    lastLogin: "07 Feb 2020",
    status: "Pending",
    country: "United States",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 3,
    avatarBg: "info",
    name: "Joe Larson",
    dob: "19 Jan, 1985",
    role: "Customer",
    email: "larson@example.com",
    balance: "32,000.34",
    checked: false,
    phone: "1686032320",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "04 Feb 2020",
    status: "Active",
    country: "England",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 4,
    avatarBg: "danger",
    name: "Jane Montgomery",
    dob: "24 April, 1985",
    role: "Subscriber",
    email: "jane84@example.com",
    balance: "0.00",
    checked: false,
    phone: "4392715360",
    emailStatus: "alert",
    kycStatus: "alert",
    lastLogin: "01 Feb 2020",
    status: "Suspend",
    country: "United States",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 5,
    avatarBg: "purple",
    name: "Frances Burns",
    dob: "30 May, 2000",
    role: "Manager",
    image: User,
    email: "frances@example.com",
    balance: "42.50",
    checked: false,
    phone: "6391303150",
    emailStatus: "pending",
    kycStatus: "error",
    lastLogin: "31 Jan 2020",
    status: "Active",
    country: "Bangladesh",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 6,
    avatarBg: "primary",
    name: "Alan Butler",
    dob: "10 Feb, 1997",
    role: "Investor",
    image: User2,
    email: "butler@example.com",
    balance: "440.34",
    checked: false,
    phone: "9633091706",
    emailStatus: "pending",
    kycStatus: "warning",
    lastLogin: "18 Jan 2020",
    status: "Inactive",
    country: "India",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 7,
    avatarBg: "warning",
    name: "Victoria Lynch",
    dob: "02 May, 1993",
    role: "Investor",
    email: "victoria@example.com",
    balance: "59,400.68",
    checked: false,
    phone: "8119854846",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "15 Jan 2020",
    status: "Active",
    country: "China",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 8,
    avatarBg: "success",
    name: "Patrick Newman",
    dob: "15 Feb, 1997",
    role: "Customer",
    email: "patrick@example.com",
    balance: "30.00",
    checked: false,
    phone: "9422384474",
    emailStatus: "success",
    kycStatus: "pending",
    lastLogin: "08 Jan 2020",
    status: "Active",
    country: "India",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 9,
    avatarBg: "purple",
    name: "Jane Harris",
    dob: "28 Feb, 1985",
    role: "Customer",
    image: User4,
    email: "harris@example.com",
    balance: "5,530.23",
    checked: false,
    phone: "1234472384",
    emailStatus: "pending",
    kycStatus: "pending",
    lastLogin: "02 Jan 2020",
    status: "Pending",
    country: "Vietnam",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 10,
    avatarBg: "purple",
    name: "Emma Walker",
    dob: "30 Dec, 1998",
    role: "Investor",
    email: "walker@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "25 Dec 2019",
    status: "Active",
    country: "United States",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 11,
    avatarBg: "pink",
    name: "Lilja Peltola",
    dob: "30 Dec, 1998",
    role: "Investor",
    email: "lilja@example.com",
    balance: "105.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "success",
    kycStatus: "pending",
    lastLogin: "25 Dec 2019",
    status: "Active",
    country: "Canada",
    designation: "Web Developer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 12,
    avatarBg: "secondary",
    name: "Annette Hunter",
    dob: "30 Dec, 1998",
    role: "Investor",
    email: "hunter@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "25 Dec 2019",
    status: "Pending",
    country: "United States",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 13,
    avatarBg: "pink",
    name: "Sara Koivisto",
    dob: "30 Dec, 1998",
    role: "Customer",
    email: "sara@example.com",
    balance: "165.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "rejected",
    kycStatus: "pending",
    lastLogin: "25 Dec 2019",
    status: "Active",
    country: "Russia",
    designation: "Web Developer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 14,
    avatarBg: "blue",
    name: "Kianna Pham",
    dob: "30 Dec, 1998",
    role: "Admin",
    email: "kiana@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "success",
    kycStatus: "rejected",
    lastLogin: "25 Dec 2019",
    status: "Suspend",
    country: "South Korea",
    designation: "Accountant",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 15,
    avatarBg: "pink",
    name: "Raymond Atkins",
    dob: "30 Dec, 1998",
    role: "Customer",
    image: User4,
    email: "sara@example.com",
    balance: "165.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "rejected",
    kycStatus: "pending",
    lastLogin: "25 Dec 2019",
    status: "Active",
    country: "Russia",
    designation: "Web Developer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 16,
    avatarBg: "blue",
    name: "Amira Talley",
    dob: "30 Dec, 1998",
    role: "Admin",
    email: "amira@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "pending",
    kycStatus: "rejected",
    lastLogin: "25 Dec 2019",
    status: "Active",
    country: "Saudi Arabia",
    designation: "Lecturer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 17,
    avatarBg: "secondary",
    name: "Lana Steiner",
    dob: "30 Dec, 1998",
    role: "Admin",
    email: "steinar@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "pending",
    kycStatus: "rejected",
    lastLogin: "25 Dec 2019",
    status: "Pending",
    country: "Latvia",
    designation: "Accountant",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 18,
    avatarBg: "warning",
    name: "Joshua Mcnair",
    dob: "30 Dec, 1998",
    image: User4,
    role: "Admin",
    email: "joshua@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "pending",
    kycStatus: "rejected",
    lastLogin: "25 Dec 2019",
    status: "Suspend",
    country: "Ireland",
    designation: "Web Developer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 19,
    avatarBg: "secondary",
    name: "Asiya Wolff",
    dob: "30 Dec, 1998",
    role: "Customer",
    email: "asia@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "25 Dec 2019",
    status: "Active",
    country: "Latvia",
    designation: "Accountant",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 20,
    avatarBg: "warning",
    name: "Fox Mccloud",
    dob: "30 Dec, 1998",
    role: "Admin",
    email: "fox@example.com",
    balance: "55.00",
    checked: false,
    phone: "4634717173",
    emailStatus: "pending",
    kycStatus: "rejected",
    lastLogin: "25 Dec 2019",
    status: "Suspend",
    country: "Ireland",
    designation: "Web Developer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
];
