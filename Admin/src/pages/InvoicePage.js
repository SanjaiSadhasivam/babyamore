import React, { useEffect, useState, forwardRef } from "react";
import User from "../images/logo-dark2x.png";
import { jsPDF } from "jspdf";

const InvoicePage = () => {

    const pdfDownload = e => {
        e.preventDefault()
        let doc = new jsPDF("landscape", 'pt', 'A4');
        doc.html(document.getElementById('pdf-view'), {
            callback: () => {
                doc.save('Invoice.pdf');
            }
        });
    }

    const thtd = {
        border: "1px solid #dddddd",
        padding: "8px",
    }

    return (
        <React.Fragment>
            <div style={{marginTop:"87px",display: "flex",justifyContent:"end",marginRight:"20px"}}>
                {/* <span className="btn btn-danger p-3 text-right" onClick={pdfDownload}>Click Invoice</span> */}
                <span className="btn btn-danger p-3 text-right">Click Invoice</span>
            </div>
            <div style={{ background: '#fff', marginTop: "50px", marginRight: "50px", marginLeft: "50px" }} id="pdf-view">
                <div className="Container row px-5 pb-5 m-0 ">
                    <div className="col-md-12">

                        <div className="row">
                            <div className="col-md-6">
                                <img src={User} style={{ width: '300px', height: '100px' }}></img>

                            </div>
                            <div className="col-md-6" style={{paddingTop:"39px"}}>
                                <h5 className="m-0 text-right">Tax Invoice/Bill of Supply/Cash Memo</h5>
                                <h6 className="m-0 text-right">(Original for Recipient)</h6>
                            </div>
                        </div>



                        <div className="row pt-4">
                            <div className="col-md-6">
                                <h5 className="m-0">Sold By :</h5>
                                <p className="m-0">KAY KAY OVERSEAS CORPORATION</p>
                                <p className="m-0">* No. 1/B, IndoSpace Logistics Park, Puduvoyal,</p>
                                <p className="m-0">Durainallur Village, Ponneri Taluk</p>
                                <p className="m-0">Thiruvalluvar, Tamil Nadu, 601206</p>
                                <p className="m-0">IN</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="m-0 text-right">Billing Address :</h6>
                                <p className="m-0 text-right">Hameedhudeen</p>
                                <p className="m-0 text-right">4th floor, New no 20, Old no 64, Venkata maistry</p>
                                <p className="m-0 text-right">street, Mannady</p>
                                <p className="m-0 text-right">CHENNAI, TAMIL NADU, 600001</p>
                                <p className="m-0 text-right">IN</p>
                                <h6 className="m-0 text-right">State/UT Code: <span className="font-weight-normal">33</span></h6>


                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <h6 className="m-0">PAN No: <span className="font-weight-normal">AACFK0693D</span></h6>
                                <h6 className="m-0">GST Registration No: <span className="font-weight-normal">33AACFK0693D1ZQ</span></h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="m-0 text-right">Shipping Address :</h6>
                                <p className="m-0 text-right">Hameedhudeen</p>
                                <p className="m-0 text-right">Hameedhudeen</p>
                                <p className="m-0 text-right">4th floor, New no 20, Old no 64, Venkata maistry</p>
                                <p className="m-0 text-right">CHENNAI, TAMIL NADU, 600001</p>
                                <p className="m-0 text-right">IN</p>
                                <h6 className="m-0 text-right">State/UT Code: <span className="font-weight-normal">33</span></h6>
                                <h6 className="m-0 text-right">Place of supply: <span className="font-weight-normal">TAMIL NADU</span></h6>
                                <h6 className="m-0 text-right">Place of delivery: <span className="font-weight-normal">TAMIL NADU</span></h6>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <h6 className="m-0">Order Number: <span className="font-weight-normal">406-9017442-1888359</span></h6>
                                <h6 className="m-0">Order Date: <span className="font-weight-normal">28.04.2022</span></h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="m-0 text-right">Invoice Number : <span className="font-weight-normal">MAA4-41190</span></h6>
                                <h6 className="m-0 text-right">Invoice Details : <span className="font-weight-normal">TN-MAA4-1306066635-2223</span></h6>
                                <h6 className="m-0 text-right">Invoice Date : <span className="font-weight-normal">28.04.2022</span></h6>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr style={{backgroundColor:"#A0A0A0",color:"black"}}>
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
                                                <td>1</td>
                                                <td className="text-break"> Philips MG5740/15, 12-in-1, Face, Hair and Body -
                                                    Multi Grooming Kit. Dual Cut Blades for Maximum
                                                    Precision, 80 Mins Run Time (Silver) | B08VK1NKTW (
                                                    B08VK1NKTW )
                                                    HSN:85103000
                                                </td>
                                                <td>₹1,852.54</td>
                                                <td>1</td>
                                                <td>₹1,852.54 </td>
                                                <td>
                                                    <span>9%</span><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                                                    <span>9%</span>
                                                </td>
                                                <td>
                                                    <span>CGST</span><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                                                    <span>SGST</span>
                                                </td>
                                                <td>
                                                    <span>₹166.73</span><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                                                    <span>₹166.73</span>
                                                </td>                                                <td>₹2,186.00</td>
                                            </tr>
                                            <tr>
                                                <th colspan="7">Total:</th>
                                                <td colspan="0" style={{backgroundColor:"#A0A0A0",color:"black"}}>₹333.46</td>
                                                <td colspan="0" style={{backgroundColor:"#A0A0A0",color:"black"}}>₹2,186.00</td>

                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <th colSpan={12}>Amount in Words : <br></br>Two Thousand One Hundred Eighty-six only</th>
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
                        <h6>Whether tax is payable under reverse charge - No</h6>
                        <div className="row">
                            <div className="col-md-12">
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>

                                    <tr style={thtd}>
                                        <td style={thtd}>
                                            <span className="font-weight-bold">Payment Transaction ID:</span><br></br>
                                            cef8PsuReMwbCmXqZhnX
                                        </td>
                                        <td style={thtd}>
                                            <span className="font-weight-bold">Date & Time: 28/04/2022, 16:45:45</span><br></br>
                                            hrs
                                        </td>
                                        <td style={thtd}>
                                            <span className="font-weight-bold">Invoice Value:</span><br></br>
                                            2,186.00
                                        </td>
                                        <td style={thtd}>
                                            <span className="font-weight-bold">Mode of Payment: Debit</span><br></br>
                                            Card
                                        </td>
                                    </tr>

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default InvoicePage;
