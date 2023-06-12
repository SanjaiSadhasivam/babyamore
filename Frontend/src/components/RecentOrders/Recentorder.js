import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import OrderDetails from "./OrderDetails";
import { token, API_Order } from "../../config/config";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Loading from "../LazyLoading/Loading";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const Recentorder = () => {
  const [Orders, setOrders] = useState([]);
  const [fileName, setFileName] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const userid = cookies.customer_id
  useEffect(() => {
    GetdataMenu();
    //   Getdata();
  }, []);
  const [show, setShow] = useState(false);
  const GetdataMenu = async () => {
    const data = await axios.get(`${API_Order}/user/${userid}`, config);
    
    setOrders(data.data.list);
  };
  const [ID, setID] = useState("")
  const handleShow = (order_no) => {
    setShow(true);
    setID(order_no);
  }
  const handleClose = () => {
    setShow(false);
    setID("");
  }
  return (
    <div>
      {
        show ?
          <>
            <OrderDetails handleClose={handleClose} userid={ID} />
          </> :
          <>
            <div className="">
              <div className="  ">
                <div className="card card-1 mb-0">
                  <div className="card-header bg-white">
                    <div className="media flex-sm-row flex-column-reverse justify-content-between  ">
                      <div className="col my-auto">
                        {" "}
                        <h4 className="mb-4 mt-2">
                          Order Details

                        </h4>{" "}
                      </div>
                      <div className="table-responsive text-nowrap">



                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          {Orders.length > 0 &&
                            Orders.map((data) => {
                              // loopinc++;
                              return (
                                <tbody>
                                  <tr>
                                    <td>{data.order_no}</td>
                                    <td>{data.createDt.slice(0, 10)}</td>
                                    <td>{data.order_status}</td>
                                    <td>
                                      <button
                                        className="btn  text-white"
                                        style={{ backgroundColor: "#FC8181" }} onClick={() => handleShow(data.order_no)}
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                        </Table>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </div>
  );
};

export default Recentorder;
