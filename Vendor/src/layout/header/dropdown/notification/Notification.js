import React, { useEffect, useRef, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, Modal, ModalBody } from "reactstrap";
import Icon from "../../../../components/icon/Icon";
// import data from "./NotificationData";
import { NavLink, useHistory,Link } from "react-router-dom";
import io from "socket.io-client";
import { API_URL, token, API_Customer, API_DELTEMESSAGE } from "../../../../Api";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Row,
  Col,
  BlockBetween,
  RSelect,
} from "../../../../components/Component";
import data from "./NotificationData";
import { MdDeleteForever } from "react-icons/md";
import '../../../../assets/style.css'
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const NotificationItem = (props) => {
  const { icon, iconStyle, text, time, id, handleGet } = props;
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();
  const deleteMessage = async (id) => {
    handleGet(id);
  };
  const CookieID = cookies.vendor_id;
  const orderpage = async (id) => {
    history.push({ pathname: "/dashboard/prods-list", state: id });

  };

  return (
    <div className="nk-notification-item" key={id} id={id}>
      <div className="nk-notification-icon">
        <Icon name={icon} className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]} />
      </div>
      <div className="nk-notification-content">
        <div className="nk-notification-text" style={{cursor:"pointer"}} onClick={()=>orderpage()}>{text}</div>
        <div className="nk-notification-time">{time}</div>
      </div>
      <div className="nk-notification-icon" onClick={() => deleteMessage(id)}>
        <MdDeleteForever size={30} className={"text-danger"} />
      </div>
    </div>
  );
};

const Notification = () => {
  const [view, setView] = useState({
    add: false,
    Viewdetails: false,
  });
  const [cookies, setCookie, removeCookie] = useCookies();
  const CookieID = cookies.vendor_id;
console.log(CookieID,"kkkkkkkkkkkkkkkkkkkkkkkk");
  let datas = [];
  const [state, setState] = useState([]);
  var socket = useRef(null);
  const onFormCancel = () => {
    setView({ add: false });
  };

  const toggle = (type) => {
    setView({
      add: type === "ViewAllMonth" ? true : false,
    });
  };

  useEffect(() => {
    try {
      getData();
      if (socket.current == null) {
        socket.current = io.connect(API_URL,{query: {
          userId:localStorage.getItem("email_address"),

       }  }  );
        socket.current.on("Data", async () => {
          const Result = await axios.get(`${API_Customer}/notify/${CookieID}`, config);
          setState(Result.data.list);
        });
      }
    } catch (error) {}
  }, [socket]);
  const getData = async () => {
    const Result = await axios.get(`${API_Customer}/notify/${CookieID}`, config);
    setState(Result.data.list);
  };
  const deleteAll = async () => {
    let res = await axios.put(`${API_DELTEMESSAGE}`, config);
    if (res) {
      getData();
    }
  };

  const handleGet = async (id) => {
    let result = await axios.put(`${API_DELTEMESSAGE}/${id}`, config);
    if (result) {
      getData();
    }
  };

  return (
    <>
      <UncontrolledDropdown className="user-dropdown">
        <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
          <div className="icon-status icon-status-info" data-count={state?state.length:0}>
            {/* <span className="icon-status icon-status-info">5</span> */}
            <Icon name="bell" />
          </div>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-xl dropdown-menu-s1 notification-blur" style={{willChange:"inherit!important"}}>
          <div className="dropdown-head">
            <span className="sub-title nk-dropdown-title">{}</span>
            <a href="#markasread" onClick={(ev) => deleteAll()}>
              Clear All
            </a>
          </div>
          <div className="dropdown-body">
            <div className="nk-notification">
              {state.reverse().map((item) => {
                return (
                  <NotificationItem
                    key={item.id}
                    id={item.id}
                    icon={"curve-down-right"}
                    iconStyle={"bg-warning-dim"}
                    text={item.notifymessage}
                    time={item.createDt}
                    handleGet={handleGet}
                  />
                );
              })}
            </div>
          </div>
          <div className="dropdown-foot center">
            <a
              href="#viewall"
              onClick={() => {
                toggle("ViewAllMonth");
              }}
            >
              View All
            </a>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
      <>
        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            .
            <a className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <>
                <h4 className="mb-3">Notification</h4>
                <Row>
                  {state.map((item) => {
                    {
                      /* // { console.log("item total", item.total) } */
                    }
                    return (
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <p>{item.createDt}</p>
                          </Col>
                          <Col md="6">
                            <p>{item.notifymessage}</p>
                          </Col>
                          <Col md="3">
                            <MdDeleteForever size={30} className={"text-danger"} onClick={() => handleGet(item.id)} />
                          </Col>
                        </Row>
                        <br></br>
                      </Col>
                    );
                  })}
                </Row>
              </>
            </div>
          </ModalBody>
        </Modal>
      </>
    </>
  );
};

export default React.memo(Notification);