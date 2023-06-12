import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { token, API_Order, API_URL } from "../../config/config";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/images/logo/Baby-Logo.png";
import ReactDOMServer from "react-dom/server";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API_Image = `${API_URL}/Product_image`;
const API_Return = `${API_URL}/admin/returnorder`;
const API_Cancel = `${API_URL}/admin/cancelorder`;

const OrderDetails = ({ handleClose, userid }) => {
  const ID = userid;
  const [sub, setSub] = useState(0);
  const [show, setShow] = useState(false);
  const [showcancelRequest, setShowcancelRequest] = useState(true);
  const cancel_message = useRef(null);
  const [cancelShow, setcancelShow] = useState(false);
  const [ReturnData, setReturnData] = useState({
    order_id: "",
    sub_id: "",
    product_id: "",
    user_id: "",
  });

  const handleCloses = () => {
    setShow(false);
    setcancelShow(false);
    setReturnData({
      order_id: "",
      sub_id: "",
      product_id: "",
      user_id: "",
    });
  };
  const handleShow = (order_ids, sub_ids, product_ids, user_ids) => {
    setReturnData({
      ...ReturnData,
      order_id: order_ids,
      sub_id: sub_ids,
      product_id: product_ids,
      user_id: user_ids,
    });
    setShow(true);
  };
  const handleCancelOrder = (order_ids, sub_ids, product_ids, user_ids) => {
    setReturnData({
      ...ReturnData,
      order_id: order_ids,
      sub_id: sub_ids,
      product_id: product_ids,
      user_id: user_ids,
    });
    setShowcancelRequest(true);
    setcancelShow(true);
  };
  const handleRequstCancelOrder = (
    order_ids,
    sub_ids,
    product_ids,
    user_ids
  ) => {
    setReturnData({
      ...ReturnData,
      order_id: order_ids,
      sub_id: sub_ids,
      product_id: product_ids,
      user_id: user_ids,
    });
    setShowcancelRequest(false);
    setcancelShow(true);
  };

  // let subtotal = 0;
  useEffect(() => {
    Getdata();
  }, []);
  const [OrderData, setOrderData] = useState("");
  const [Infotable, setInfotable] = useState("");
  const Getdata = async () => {
    const Result = await axios.get(`${API_Order}/?id=${ID}`, config);
    if (Result.data.list.length > 0) {
      let datas = Result.data.list;
      setOrderData(datas);
      let newData = datas.map((element, index) => {
        return [
          index + 1,
          // element.invoice_number,
          `${element.productname} \n\n WubbaNub Animals : Dragon ${
            element.HSN ? "\n HSN Code : " + element.HSN : null
          } ${element.EAN ? "\n EAN : " + element.EAN : null} ${
            element.SKU ? "\n\n SKU : " + element.SKU : null
          }
          `,
          element.qty,
          element.saleprice,
          element.sub_total,
        ];
      });
      setInfotable(newData);
      let sub_total = datas.reduce((intial, element) => {
        let intials = intial + Number(element.sub_total);
        return intials;
      }, 0);

      setSub(sub_total);
    }
  };

  // const createAndDownloadPdf = () => {
  //   axios.post(`${API_Order}/exportinvoice/${ID}`, config)
  //     .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
  //     .then((res) => {
  //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

  //       saveAs(pdfBlob, 'newPdf.pdf');
  //     })
  // }
  const thtd = {
    border: "1px solid #dddddd",
    padding: "8px",
  };

  const download = async () => {
    const Result = await axios.get(`${API_Order}/exportinvoice/${ID}`, config);
    const invoice = Result.data.list;
    console.log(invoice, "OrderData1");
    if (Result.data.list.length > 0) {
      const doc = new jsPDF();

      doc.addImage(logo, "png", 14, 13, 70, 15);
      autoTable(doc, {
        margin: { top: 15, left: 15, right: 15, bottom: 10 },
        body: [
          [
            {
              content:
                "West Star Retail and Trading Private Limited" +
                "\nOffice No 2B, Apex Plaza, 2nd Floor" +
                "\nNo 3 Uthamar Gandhi, Anna Salai," +
                "\nNungambakkam," +
                "\nChennai – 600034" +
                "\nTamil Nadu" +
                "\n9697612222" +
                "\nGST: 33AACCW3170E1ZO",
              styles: {
                halign: "right",
              },
            },
          ],
        ],
        theme: "plain",
      });

      autoTable(doc, {
        margin: { top: 15, left: 14, right: 15, bottom: 10 },
        body: [
          [
            {
              content: "INVOICE",
              styles: {
                halign: "left",
                fontSize: 20,
                fontStyle: "bold",
                font: "helvetica",
              },
            },
          ],
        ],
        theme: "plain",
      });

      autoTable(doc, {
        body: [
          [
            {
              content:
                `${OrderData[0].full_name}` +
                `\n${OrderData[0].Billingaddress}`,
              styles: {
                halign: "left",
                overflow: "linebreak",
                // font: 'helvetica',
                valign: "middle",
              },
            },
            {
              content:
                `Order Number: ${OrderData[0].order_no}` +
                // `\nSub Order ID: ${invoice[0].Suborder_id}`+
                `\nInvoice Date: ${invoice[0].createDt.slice(0, 10)}` +
                `\nPayment Method: Cash on Delivery`,
              styles: {
                halign: "right",
              },
            },
          ],
        ],
        theme: "plain",
      });

      autoTable(doc, {
        head: [["S.No", "Product", "Qty", "Price", "Total"]],

        body: Infotable,
        theme: "grid",
        headStyles: {
          fillColor: "#000",
        },
      });

      autoTable(doc, {
        body: [
          [
            {
              content: `Subtotal : Rs.${Math.round(sub)}`,
              styles: {
                halign: "right",

                border: { top: 23, right: 20, bottom: 20, left: 20 },
              },
            },
          ],
          [
            {
              content: `Shipping : Free shipping`,
              styles: {
                halign: "right",
              },
            },
          ],
          [
            {
              content: `Redeemed Points Value: -Rs.${invoice[0].redeem_point}.00`,
              styles: {
                halign: "right",
              },
            },
          ],

          [
            {
              content: `Total : Rs.${Math.round(sub)}`,
              styles: {
                halign: "right",
                // lineWidth:1,
              },
            },
          ],
        ],
        theme: "plain",
      });

      autoTable(doc, {
        body: [
          [
            {
              content: "Terms & notes",
              styles: {
                fontSize: 12,
                halign: "left",
              },
            },
          ],
          [
            {
              content:
                "Abbreviations for “Cash with Order”, you expect the customer to pay when ordering from you before you start working on the project / delivering the products",
              styles: {
                halign: "left",
              },
            },
          ],
        ],
        theme: "plain",
      });
      autoTable(doc, {
        body: [
          [
            {
              content: "Thank You For Your Order",
              styles: {
                fontSize: 10,
                halign: "center",
              },
            },
          ],
        ],
        theme: "plain",
      });

      return doc.save(`${OrderData[0].order_no}`);
    }
  };

  // const download = async () => {
  //   const Result = await axios.get(`${API_Order}/exportinvoice/${ID}`, config);
  //   const invoice = Result.data.list;
  //   if (Result.data.list.length > 0) {
  //     const doc = new jsPDF();

  //     doc.addImage(logo, "png", 10, 10, 50, 20);

  //     autoTable(doc, {
  //       margin: { top: 15, left: 15, right: 15, bottom: 10 },
  //       body: [
  //         [
  //           {
  //             content: "Invoice",
  //             styles: {
  //               halign: "right",
  //               fontSize: 20,
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           // {
  //           //   content:
  //           //     "From:" +
  //           //     "\n" +
  //           //     "Anna Salai,\nNungambakkam Chennai,\nTamil Nadu 600034",
  //           //   styles: {
  //           //     halign: "left",
  //           //   },
  //           // },
  //           {
  //             content:
  //               `Order ID: ${OrderData[0].order_no}` +
  //               // `\nSub Order ID: ${invoice[0].Suborder_id}`+
  //               `\nInvoice Date: ${invoice[0].createDt.slice(0, 10)}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content:
  //               `Billing Address:` +
  //               "\n" +
  //               `\n${OrderData[0].full_name}` +
  //               `\n${OrderData[0].Billingaddress}`,
  //             styles: {
  //               halign: "left",
  //             },
  //           },
  //           {
  //             content:
  //               "Shipping Address:" +
  //               "\n" +
  //               `\n${OrderData[0].full_name}` +
  //               `\n${OrderData[0].shippingaddress}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });

  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: "Products",
  //             styles: {
  //               fontSize: 14,
  //               halign: "left",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });

  //     autoTable(doc, {
  //       head: [["S.No", "Invoice Number", "Product", "Qty", "Price", "Total"]],

  //       body: Infotable,
  //       theme: "striped",
  //       headStyles: {
  //         fillColor: "#343a40",
  //       },
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: `Sub Total : Rs.${Math.round(sub)}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],

  //         [
  //           {
  //             content: `Grand Total : Rs.${Math.round(sub)}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: "Terms & notes",
  //             styles: {
  //               fontSize: 12,
  //               halign: "left",
  //             },
  //           },
  //         ],
  //         [
  //           {
  //             content:
  //               "Abbreviations for “Cash with Order”, you expect the customer to pay when ordering from you before you start working on the project / delivering the products",
  //             styles: {
  //               halign: "left",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: "Thank You For Your Order",
  //             styles: {
  //               fontSize: 10,
  //               halign: "center",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     return doc.save(`${OrderData[0].order_no}`);
  //   }
  // };
  const [item, setItem] = useState({ kindOfStand: "", another: "another" });

  const { kindOfStand, another } = item;

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    console.log(e.target.value);
    if (value == 1) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "1",
        another: "Received Wrong Item",
      }));
    } else if (value == 2) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "2",
        another: "Product is missing in the package",
      }));
    } else if (value == 3) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "3",
        another: "Quality of the product not as expected",
      }));
    } else if (value == 4) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "4",
        another: "Received a broken/damaged item",
      }));
    }
  };
  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;
    console.log(e.target.value);
    if (value == 1) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "1",
        another: "Received Wrong Item",
      }));
    } else if (value == 2) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "2",
        another: "Product is missing in the package",
      }));
    } else if (value == 3) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "3",
        another: "Quality of the product not as expected",
      }));
    } else if (value == 4) {
      setItem((prevState) => ({
        ...prevState,
        kindOfStand: "4",
        another: "Received a broken/damaged item",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user_id", ReturnData.user_id);
    formData.append("order_id", ReturnData.order_id);
    formData.append("product_id", ReturnData.product_id);
    formData.append("sub_orderid", ReturnData.sub_id);
    formData.append("return_msg", another);

    let res = await axios.post(`${API_Return}`, formData, config);

    if (res) {
      Getdata();
      if (!toast.isActive("return")) {
        toast.success("Your Return request sent successfully,We will contact you very soon!", {
          toastId: "return",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          // pauseOnHover: true,
          theme: "light",
          closeButton: false,
          draggable: true,
          className: "notificationToolTip",
        });
      }
      setItem({
        ...item,
        another: "",
        kindOfStand: "",
      });
      setReturnData({
        order_id: "",
        sub_id: "",
        product_id: "",
        user_id: "",
      });
      handleCloses();
    }
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user_id", ReturnData.user_id);
    formData.append("order_id", ReturnData.order_id);
    formData.append("product_id", ReturnData.product_id);
    formData.append("sub_orderid", ReturnData.sub_id);
    formData.append("cancel_msg", cancel_message.current.value);
    formData.append("cancel", false);
    let res = await axios.post(`${API_Cancel}`, formData, config);

    if (res) {
      Getdata();
      if (!toast.isActive("return")) {
        toast.success("Your order has been cancelled!", {
          toastId: "return",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          // pauseOnHover: true,
          theme: "light",
          closeButton: false,
          draggable: true,
          className: "notificationToolTip",
        });
      }
      setItem({
        ...item,
        another: "",
        kindOfStand: "",
      });
      setReturnData({
        order_id: "",
        sub_id: "",
        product_id: "",
        user_id: "",
      });
      handleCloses();
    }
  };
  const handleRequestCancel = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user_id", ReturnData.user_id);
    formData.append("order_id", ReturnData.order_id);
    formData.append("product_id", ReturnData.product_id);
    formData.append("sub_orderid", ReturnData.sub_id);
    formData.append("cancel_msg", cancel_message.current.value);
    formData.append("cancel", true);

    let res = await axios.post(`${API_Cancel}`, formData, config);

    if (res) {
      Getdata();
      if (!toast.isActive("return")) {
        toast.success("Your cancel request sent successfully,We will contact you very soon!", {
          toastId: "return",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          // pauseOnHover: true,
          theme: "light",
          closeButton: false,
          draggable: true,
          className: "notificationToolTip",
        });
      }
      setItem({
        ...item,
        another: "",
        kindOfStand: "",
      });
      setReturnData({
        order_id: "",
        sub_id: "",
        product_id: "",
        user_id: "",
      });
      handleCloses();
    }
  };
  return (
    <div>
      <div className="  ">
        <div className="mb-3">
          <h5>
            <span
              onClick={() => handleClose()}
              style={{ cursor: "pointer", backgroundColor: "#FC8181" }}
              type="button"
              className="btn btn-sm text-white "
            >
              Back
            </span>
            &nbsp;/&nbsp;
            <span>Order Details</span>
          </h5>
        </div>
        <div className="card card-1 mb-0">
          <div className="card-header bg-white">
            <div className="media flex-sm-row flex-column-reverse justify-content-between  d-flex">
              <div className="col my-auto">
                {" "}
                <h4 className="mb-0">Thanks for your Order :)</h4>{" "}
              </div>
              <div className="col my-auto"></div>
              <div className="col my-auto">
                {" "}
                <button
                  className="btn text-white btn-sm"
                  onClick={() => download()}
                  style={{ backgroundColor: "#FC8181" }}
                >
                  Download Invoice
                </button>{" "}
              </div>
            </div>
          </div>
          {OrderData.length > 0 &&
            OrderData.map((data) => {
              // loopinc++;
              return (
                <div className="card-body">
                  <div className="row justify-content-between mb-3">
                    <div className="col-auto">
                      {" "}
                      <h6 className="color-1 mb-0 ">
                        Order_ID:{data.order_no}
                      </h6>{" "}
                    </div>
                    <div className="col-auto">
                      {" "}
                      <h6 className="color-1 mb-0 ">
                        Sub Order_ID:{data.Suborder_id}
                      </h6>{" "}
                    </div>
                    <div className="col-auto">
                      {" "}
                      {/* <h6 className="color-1 mb-0 ">Receipt</h6>{" "} */}
                    </div>
                    <div className="col-auto  ">
                      {" "}
                      {/* <small>Receipt Voucher : 1KAU9-84UIL</small>{" "} */}
                    </div>
                    <div className="col-auto  "> </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="card card-2 mb-0">
                        <div className="card-body">
                          <div className="media d-flex align-items-center justify-content-around">
                            <div className="sq align-self-center ">
                              {" "}
                              <img
                                className="img-fluid  my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0 mb-2"
                                src={`${API_Image}/${data.ProductImage}`}
                                width={135}
                                height={135}
                              />{" "}
                            </div>
                            <div className="media-body my-auto text-right">
                              <div className="row  my-auto flex-column flex-md-row">
                                <div className="col my-auto">
                                  {" "}
                                  <h6 className="mb-0"> {data.productname}</h6>
                                </div>

                                <div className="col my-auto">
                                  {" "}
                                  <small>Size : M</small>
                                </div>
                                <div className="col my-auto">
                                  {" "}
                                  <small>Qty : {data.qty}</small>
                                </div>
                                <div className="col my-auto">
                                  <h6 className="mb-0">₹{data.sub_total}.00</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="my-3 " />
                          <div className="row">
                            <div className="col-md-3 mb-3">
                              {/* <p>
                                <small>
                                  Track Order{" "}
                                  <span>
                                    <i
                                      className=" ml-2 fa fa-refresh"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </small>
                              </p> */}
                              {data.order_status == "Shipped" ||data.order_status == "Request For Cancel"|| data.order_status == "RTO In-transit" ||data.order_status == "Request For Cancel" || data.order_status == "Lost (AWB)" ? (
                                <>
                                  <button
                                    className="btn  text-white mt-2"
                                    style={{ backgroundColor: "#FC8181" }}
                                    disabled={data.order_status == "Request For Cancel"?true:false}
                                    onClick={() =>
                                      handleRequstCancelOrder(
                                        data.order_no,
                                        data.Suborder_id,
                                        data.product_id,
                                        data.user_id
                                      )
                                    }
                                  >
                                    Request For Cancel
                                  </button>
                                </>
                              ) : null}
                              {data.order_status == "Completed"  ? (
                                <>
                                  <button
                                    className="btn  text-white mt-2"
                                    style={{ backgroundColor: "#FC8181" }}
                                    onClick={() =>
                                      handleShow(
                                        data.order_no,
                                        data.Suborder_id,
                                        data.product_id,
                                        data.user_id
                                      )
                                    }
                                  >
                                    Return
                                  </button>
                                </>
                              ) : (
                                <>
                                  {data.order_status == "Cancel" ||data.order_status == "Cancelled" ? (
                                    <></>
                                  ) : (
                                    <>
                                      {data.order_status == "Shipped" ||data.order_status == "Request For Cancel" ||data.order_status == "RTO In-transit" || data.order_status=="Lost (AWB)"||data.order_status=="Return"||data.order_status=="Returned" ||data.order_status=="Refunded"  ? null : (
                                        <>
                                          {" "}
                                          <button
                                            className="btn  text-white mt-2"
                                            style={{
                                              backgroundColor: "#FC8181",
                                            }}
                                            onClick={() =>
                                              handleCancelOrder(
                                                data.order_no,
                                                data.Suborder_id,
                                                data.product_id,
                                                data.user_id
                                              )
                                            }
                                          >
                                            Cancel Order
                                          </button>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>

                            <div className="col mt-2">
                              <div className="row">
                                <div className="col-12 col-md-10 hh-grayBox  pb20">
                                  {
                                    data.order_status == "Cancel" ?
                                    <>
                                     <div className="row">
                                        <div
                                          className={"order-tracking completed"}
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Ordered
                                            <br />
                                            <span>{new Date(data.createDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            data.order_status == "Shipped" ||
                                            data.order_status == "Completed" ||
                                            data.order_status == 
                                              "RTO In-transit" ||data.order_status == "Cancel" || data.order_status == "Lost (AWB)"||data.order_status=="Return"||data.order_status=="Returned" || data.order_status=="Refunded" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Cancelled
                                            <br />
                                            <span>{  data.order_status == "Cancel"? new Date(data.modifyDt).toLocaleDateString():data.modifyDt==null?null:new Date(data.modifyDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                       
                                       
                                      </div>
                                    
                                    </>:null
                                  }

                                  {
                                    data.order_status == "Cancelled" ||data.order_status == "Request For Cancel"?
                                    <>
                                      <div className="row justify-content-between">
                                        <div
                                          className={"order-tracking completed"}
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Ordered
                                            <br />
                                            <span>{new Date(data.createDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            data.order_status == "Shipped" ||
                                            data.order_status == "Completed" ||
                                            data.order_status == 
                                              "RTO In-transit" ||data.order_status == "Request For Cancelled" || data.order_status == "Lost (AWB)"||data.order_status=="Return"||data.order_status=="Returned" || data.order_status=="Refunded" ||data.order_status=="Request For Cancel"
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Shipped
                                            <br />
                                            <span>{  data.order_status == "Request For Cancel"? new Date(data.shippedDt).toLocaleDateString():data.shippedDt==null?null:new Date(data.shippedDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            data.order_status == "Cancelled" || data.order_status =="Request For Cancel" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            {data.order_status == "Cancelled"?"Cancelled":data.order_status=="Request For Cancel"?"Request For Cancel":null}
                                            <br />
                                            <span>{new Date(data.modifyDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                       
                                      </div>
                                    
                                    </>:null
                                  }
                                  {data.order_status == "Cancel"||data.order_status == "Cancelled" ||data.order_status == "Request For Cancel" ? (
                                    <>
                                    {null}
                                    </>
                                  ) : (
                                    <>
                                      <div className="row justify-content-between">
                                        <div
                                          className={"order-tracking completed"}
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Ordered
                                            <br />
                                            <span>{new Date(data.createDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            data.order_status == "Shipped" ||
                                            data.order_status == "Completed" ||
                                            data.order_status == 
                                              "RTO In-transit" ||data.order_status == "Request For Cancel" || data.order_status == "Lost (AWB)"||data.order_status=="Return"||data.order_status=="Returned" || data.order_status=="Refunded" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Shipped
                                            <br />
                                            <span>{  data.order_status == "Shipped"? new Date(data.shippedDt).toLocaleDateString():data.shippedDt==null?null:new Date(data.shippedDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            data.order_status == "Completed"||data.order_status=="Return"||data.order_status=="Returned" || data.order_status=="Refunded" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            {data.order_status == "Completed"?"Delivered":data.order_status=="Return"?"Return":data.order_status=="Returned"?"Returned":data.order_status=="Refunded"?"Refunded":"Delivered"}
                                            <br />
                                            <span>{data.order_status == "Completed"?new Date(data.deliverDt).toLocaleDateString():data.order_status=="Return"?null:data.order_status=="Returned"?new Date(data.returnDt).toLocaleDateString():data.order_status=="Refunded"?new Date(data.modifyDt).toLocaleDateString():null}</span>
                                          </p>
                                        </div>
                                       
                                      </div>
                                    </>
                                  )}
                                  {data.order_status == "Return"?  <div className="text-center text-success mt-3">
                                        <h5>Your Return Request Submited Successfully</h5>
                                      </div>:null}
                                  {data.order_status == "Returned"?  <div className="text-center text-success mt-3">
                                        <h5>Your Order is Returned</h5>
                                      </div>:null}
                                  {data.order_status == "Refunded"?  <div className="text-center text-success mt-3">
                                        <h5>Your Order is Refunded</h5>
                                      </div>:null}
                                  {data.order_status == "Request For Cancel"?  <div className="text-center text-success mt-3">
                                        <h5>Your Cancel Request is Submited Successfully</h5>
                                      </div>:null}
                                </div>
                              </div>
                              {/* <div className="progress my-auto">
                          {" "}
                          <div
                            className="progress-bar progress-bar  rounded"
                            style={{ width: "62%" }}
                            role="progressbar"
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />{" "}
                        </div> */}
                              {/* <div className="media row justify-content-between ">
                          <div className="d-flex align-align-items-center justify-content-between">
                            */}

                              {/* <div className="col-auto text-right"></div> */}
                              {/* <div className="flex-col">
                              {" "}
                              <small className="text-right mr-sm-2 mr-2">
                                Order confirmed
                              </small>
                              <span className="mx-1">
                                <i className="fa fa-circle active" />
                              </span>
                            </div>
                            <div className="flex-col">
                              {" "}
                              <small className="text-right mr-sm-2 mr-2">
                                Shipped
                              </small>
                              <span className="mx-1">
                                <i className="fa fa-circle active" />
                              </span>
                            </div>
                            <div className="flex-col">
                              {" "}
                              <small className="text-right mr-sm-2 mr-2">
                                Out for delivary
                              </small>
                              <span className="mx-1">
                                <i className="fa fa-circle active" />
                              </span>
                            </div>
                            <div className="col-auto flex-col-auto">
                              <small className="text-right mr-sm-2">
                                Delivered
                              </small>
                              <span className="mx-1">
                                {" "}
                                <i className="fa fa-circle" />
                              </span>
                            </div> */}
                              {/* </div>
                        </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col">
                      <div className="row justify-content-between">
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row  d-flex align-items-center justify-content-between">
                    <div className="col-md-6 mb-3">
                      <p className="mb-1">
                        <b>Order Details</b>
                      </p>
                      <p className="mb-1">
                        {" "}
                        Invoice Number : {data.invoice_number}
                      </p>
                      <p className="mb-1">
                        Invoice Date : {data.createDt.slice(0, 10)}
                      </p>
                      {/* <p className="mb-1">Recepits Voucher:18KU-62IIK</p> */}
                    </div>
                    <div className="col-md-6  ">
                      <div className="row">
                        <div className=" text-right col-md-5 col-6">
                          <p className="mb-1">
                            <b>Total</b>
                          </p>{" "}
                        </div>
                        <div className="col-md-3 col-6">
                          {" "}
                          <p className="mb-1">₹{data.total}</p>{" "}
                        </div>
                      </div>
                      <div className="row">
                        <div className=" text-right col-md-5 col-6">
                          <p className="mb-1">
                            <b>Discount</b>
                          </p>{" "}
                        </div>
                        <div className="col-md-3 col-6">
                          {" "}
                          <p className="mb-1">₹{data.total_discount}</p>{" "}
                        </div>
                      </div>
                      <div className="row">
                        <div className=" text-right col-md-5 col-6">
                          <p className="mb-1">
                            <b>Delivery Charges</b>
                          </p>{" "}
                        </div>
                        <div className="col-md-3 col-6">
                          {" "}
                          <p className="mb-1">Free</p>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
        </div>
        {/* <hr></hr> */}
      </div>

      <Modal show={show} onHide={handleCloses}>
        <Modal.Header closeButton>
          <Modal.Title>Reason for return</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form onSubmit={(e) => handleSubmit(e)}>
              {/* <Form.Group controlId="kindOfStand"> */}
              <div className="">
                <input
                  value="1"
                  type="radio"
                  aria-label="radio 1"
                  onChange={handleChange}
                  class="form-check-input mx-4 mb-2"
                  checked={kindOfStand === "1"}
                />
                <label class="form-check-label" for="exampleRadios1">
                  Received Wrong Item
                </label>
              </div>
              <div className="">
                <input
                  value="2"
                  type="radio"
                  aria-label="radio 2"
                  label="Food"
                  class="form-check-input mx-4 mb-2"
                  onChange={handleChange}
                  checked={kindOfStand === "2"}
                />

                <label class="form-check-label" for="exampleRadios1">
                  Product is missing in the package
                </label>
              </div>
              <div className="">
                <input
                  value="3"
                  type="radio"
                  aria-label="radio 2"
                  label="Food"
                  class="form-check-input mx-4 mb-2"
                  onChange={handleChange}
                  checked={kindOfStand === "3"}
                />

                <label class="form-check-label" for="exampleRadios1">
                  Quality of the product not as expected
                </label>
              </div>
              <div className="">
                <input
                  value="4"
                  type="radio"
                  aria-label="radio 2"
                  label="Food"
                  class="form-check-input mx-4 mb-2"
                  onChange={handleChange}
                  checked={kindOfStand === "4"}
                />

                <label class="form-check-label" for="exampleRadios1">
                  Received a broken/damaged item
                </label>
              </div>

              {/* </Form.Group> */}
              <Modal.Footer>
                <button
                  className="btn  text-white mt-2"
                  style={{ backgroundColor: "#FC8181" }}
                >
                  Continue
                </button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={cancelShow} onHide={handleCloses}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showcancelRequest ? "Cancel Order" : "Request For Cancel"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form
              onSubmit={
                showcancelRequest
                  ? (e) => handleCancel(e)
                  : (e) => handleRequestCancel(e)
              }
            >
              {/* <Form.Group controlId="kindOfStand"> */}
              {/* <div className="">
                <input
                  value="1"
                  type="radio"
                  aria-label="radio 1"
                  onChange={handleChanges}
                  class="form-check-input mx-4 mb-2"
                  checked={kindOfStand === "1"}
                />
                <label class="form-check-label" for="exampleRadios1">
                 sorry
                </label>
              </div>
              <div className="">
                <input
                  value="2"
                  type="radio"
                  aria-label="radio 2"
                  label="Food"
                  class="form-check-input mx-4 mb-2"
                  onChange={handleChanges}
                  checked={kindOfStand === "2"}
                />

                <label class="form-check-label" for="exampleRadios1">
                  Product is missing in the package
                </label>
              </div>
              <div className="">
                <input
                  value="3"
                  type="radio"
                  aria-label="radio 2"
                  label="Food"
                  class="form-check-input mx-4 mb-2"
                  onChange={handleChanges}
                  checked={kindOfStand === "3"}
                />

                <label class="form-check-label" for="exampleRadios1">
                  Quality of the product not as expected
                </label>
              </div>
              <div className="">
                <input
                  value="4"
                  type="radio"
                  aria-label="radio 2"
                  label="Food"
                  class="form-check-input mx-4 mb-2"
                  onChange={handleChanges}
                  checked={kindOfStand === "4"}
                />

                <label class="form-check-label" for="exampleRadios1">
                  Received a broken/damaged item
                </label>
              </div> */}
              <div class="form-outline">
                <label class="form-label" for="textAreaExample">
                  Why You Cancel This Order
                </label>
                <textarea
                  class="form-control"
                  id="textAreaExample1"
                  rows="4"
                  ref={cancel_message}
                  required
                ></textarea>
              </div>
              {/* </Form.Group> */}
              <Modal.Footer>
                <button
                  className="btn  text-white mt-2"
                  style={{ backgroundColor: "#FC8181" }}
                >
                  Send
                </button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderDetails;
