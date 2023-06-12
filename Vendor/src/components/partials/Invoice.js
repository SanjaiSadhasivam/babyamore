import React, { useEffect, useState, forwardRef } from "react";
import User from "../../images/logo-dark2x.png";
import { jsPDF } from "jspdf";

const Invoice = () => {

    const pdfDownload = e => {
        e.preventDefault()
        let doc = new jsPDF("landscape", 'pt', 'A4');
        doc.html(document.getElementById('pdf-view'), {
            callback: () => {
                doc.save('Invoice.pdf');
            }
        });
    }

    return (
        <React.Fragment>
            {/* <div style={{marginTop:"87px",display: "flex",justifyContent:"end",marginRight:"20px"}}>
                <span className="btn btn-danger p-3 text-right" onClick={pdfDownload}>Click Invoice</span>
            </div> */}
            <div className="container" style={{ background: '#fff', marginTop: "60px" }} id="pdf-view">
                <div className="row align-items-center">
                    <div className="col-md-6 text-left">
                        <img src={User} style={{ width: '700px', height: '160px' }}></img>
                    </div>
                    <div className="col-md-6 text-right ">
                        <h6>Credit Note</h6>
                        <p>(Original for Recipient)</p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 text-left">
                        <h6>Sold By:</h6>

                        <p className="text-break">
                            KAY KAY OVERSEAS CORPORATION
                            * No. 1/B, IndoSpace Logistics Park, Puduvoyal,
                            Durainallur Village, Ponneri Taluk
                            Thiruvalluvar, Tamil Nadu, 601206
                            IN

                        </p>
                    </div>
                    <div className="col-md-6 text-right ">
                        <h6>Shipping Address:</h6>
                        <p className="text-break">Hameedhudeen
                            Hameedhudeen
                            4th floor, New no 20, Old no 64, Venkata maistry
                            street, Mannady
                            CHENNAI, TAMIL NADU, 600001
                            IN
                        </p>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12 text-right">
                        <h6>State/UT Code :<span className="font-weight-normal">33</span></h6>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 text-left">
                        <h6>PAN No: <span className="font-weight-normal">AACFK0693D</span></h6>
                        <h6>GST Registration No: <span className="font-weight-normal">33AACFK0693D1ZQ</span></h6>
                    </div>
                    <div className="col-md-6 text-right">
                        <h6>Billing Address:</h6>
                        <p className="text-break"> Hameedhudeen
                            4th floor, New no 20, Old no 64, Venkata maistry
                            street, Mannady
                            CHENNAI, TAMIL NADU, 600001
                            IN</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-right">
                        <h6>State/UT Code :<span className="font-weight-normal">33</span></h6>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12 text-right">
                        <h6>Place of supply:<span className="text-uppercase font-weight-normal">TAMIL NADU</span></h6>
                        <h6>Place of delivery:<span className="text-uppercase font-weight-normal">TAMIL NADU</span></h6>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 text-left">
                        <h5>Order No: <span className="font-weight-normal">406-9017442-1888359</span></h5>
                        <h5>Original Invoice Number: <span className="font-weight-normal">MAA4-41190</span></h5>
                        <h5>Original Order Date: <span className="font-weight-normal">28.04.2022</span></h5>
                    </div>
                    <div className="col-md-6 text-right">
                        <h5>Credit Note No: <span className="font-weight-normal">MAA4-C-2554</span></h5>
                        <h5>Invoice Details: <span className="font-weight-normal">1306066635-2223</span></h5>
                        <h5>Credit Note Date: <span className="font-weight-normal">29.04.2022</span></h5>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12 ">
                        <div className="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sl.No </th>
                                        <th>Description </th>
                                        <th> Unit Price</th>
                                        <th>Quantity   </th>
                                        <th>Net Amount </th>
                                        <th>
                                            Tax Rate <br></br>
                                            CGST
                                        </th>
                                        <th>
                                            Tax Rate <br></br>
                                            SGST
                                        </th>


                                        <th>Tax
                                            Amount </th>
                                        <th>Total
                                            Amount </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1 </td>
                                        <td className="text-break"> Philips MG5740/15, 12-in-1, Face, Hair and Body -
                                            Multi Grooming Kit. Dual Cut Blades for Maximum
                                            Precision, 80 Mins Run Time (Silver) | B08VK1NKTW (
                                            B08VK1NKTW )
                                            HSN:85103000</td>
                                        <td> -₹1,852.54</td>
                                        <td>1 </td>
                                        <td>-₹1,852.54 </td>
                                        <td>  9%   </td>
                                        <td>  9%   </td>
                                        <td> -₹333.46</td>
                                        <td>-₹2,186.00 </td>
                                    </tr>
                                    <tr>
                                        <th colspan="7" rowspan="3">Total </th>
                                        <td colspan="0"> -₹333.46</td>
                                        <td colspan="0">-₹2,186.00</td>

                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th colSpan={12}>Amount in Words : Two Thousand One Hundred Eighty-six only</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className="text-right">
                                        <th colSpan={12}>
                                            <h6>For KAY KAY OVERSEAS CORPORATION:</h6>
                                            <p>Signature</p>
                                            <h6>Authorized Signatory</h6>
                                        </th>
                                    </tr>
                                </tbody>




                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Invoice;
