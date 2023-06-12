import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import {
    Block,
    BlockHead,
    BlockBetween,
    BlockHeadContent,
    BlockTitle,
    BlockDes,
    Icon,
    BackTo,
    PreviewCard,
    ReactDataTable,
    Row,
    RSelect,
    Col,
} from "../../../components/Component";
import { Badge, Button, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import cream from "../../../assets/images/jsTree/cream.jpg";
import diapers from "../../../assets/images/jsTree/diapers.jpg";
import nappycleaning from "../../../assets/images/jsTree/nappycleaning.jpg";
import { Tooltip, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";

import "../../../components/partials/default/Custom.css";

import BabyamoreLogo from "../../../images/babyamore-logo.png";

import { jsPDF } from "jspdf";

const pdfDownload = e => {
    e.preventDefault()
    let doc = new jsPDF("p", 'pt', 'a4');
    doc.html(document.getElementById('pdf-view-invoice'), {
      callback: () => {
        doc.save('test.pdf');
      }
    });
  }

const Invoice = () => {


    return (
        <div>
            <button onClick={pdfDownload}>Invoice</button>
            <div className="bg-white" style={{ padding: "120px" }} id="pdf-view-invoice">

                <div>
                    <div className="row">
                        <div className="col-lg-7 px-3 pt-1">
                            <img className="logo-dark logo-img" src={BabyamoreLogo} alt="logo" style={{ width: "330px" }} />
                        </div>
                        <div className="col-lg-5">
                            <p className="mb-0 font-weight-bold">
                                West Star Retail and Trading Private<br></br>Limited
                            </p>
                            <p className="mb-0">
                                Office No 2B, Apex Plaza, 2nd Floor,
                            </p>
                            <p className="mb-0">
                                No 3 Utharmar Gndhi Anna Salai,
                            </p>
                            <p className="mb-0">
                                Nungambakkam,
                            </p>
                            <p className="mb-0">
                                Chennai-600034,
                            </p>
                            <p className="mb-0">
                                Tamil Nadu,
                            </p>
                            <p className="mb-0">
                                9697612222,
                            </p>
                            <p className="mb-0">
                                GST:33AACCW3170E1ZO.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="row">
                        <div className="col-lg-12 mb-4"><h3>INVOICE</h3></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-7">
                            <p className="mb-0">Sagana Karunakaran</p>
                            <p className="mb-0">G14,Royal Castle Apartments</p>
                            <p className="mb-0">4th Cross, 1st Main Road Raja</p>
                            <p className="mb-0">Colony,Cantonment</p>
                            <p className="mb-0">Trichy 620001</p>
                            <p className="mb-0">Tamil Nadu</p>
                            <p className="mb-0">saganak27@gmil.com</p>
                            <p className="mb-0">7032708223</p>
                        </div>
                        <div className="col-lg-5">
                            <p className="mb-0">Invoice Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6927</p>
                            <p className="mb-0">Invoice Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;July 6,2022</p>
                            <p className="mb-0">Invoice Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;99645</p>
                            <p className="mb-0">Invoice Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;July 5, 2022</p>
                            <p className="mb-0">Invoice Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Credit Card/Debit<br></br><span style={{ position: "relative", left: "139px" }}>Card/NetBanking</span></p>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="row">
                        <div className="col-lg-12">
                            <table class="table table-borderless">
                                <thead>
                                    <tr className="thead-dark">
                                        <th scope="col" style={{ width: "60%" }}>Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: "1px solid rgb(0,0,0,0.3)" }}>

                                        <td style={{ width: "60%" }}>
                                            <p>Bambo Nature, Taped Diapers, Standard Pack-2</p>
                                            <p className="m-0"><span className="fw-bold">Bambo Nature:</span><span> 2</span></p>
                                            <p className="m-0"><span className="fw-bold">HSN Code:</span><span>96190090</span></p>
                                            <p><span className="fw-bold">EAN Code:</span ><span> 5703538244384</span></p>
                                            <p className="fw-bold">SKU: BN_032</p>
                                        </td>
                                        <td>1</td>
                                        <td>&#8377;989.00</td>

                                    </tr>
                                    <tr style={{ borderBottom: "1px solid rgb(0,0,0,0.3)", width: "60%" }}>

                                        <td style={{ width: "60%" }}>
                                            <p>The Brushies - Finger Brush - Dino</p>
                                            <p className="m-0"><span className="fw-bold">The Brushies Style:</span><span> Dino</span></p>
                                            <p className="m-0"><span className="fw-bold">HSN Code:</span><span> 96039000</span></p>
                                            <p><span className="fw-bold">EAN:</span><span> 862930000334</span></p>
                                            <p className="fw-bold">SKU: BRS_005</p>
                                        </td>
                                        <td>1</td>
                                        <td>&#8377;899.00</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-7">

                    </div>
                    <div className="col-lg-5">
                        <table className="table table-borderless">
                            <tbody>
                                <tr style={{ borderTop: "1px solid rgb(0,0,0,0.3)", borderBottom: "1px solid rgb(0,0,0,0.3)" }}>
                                    <td className="fw-bold">Subtotal</td>
                                    <td>&#8377;1,888.00</td>
                                </tr>
                                <tr style={{ borderBottom: "2px solid rgb(0,0,0)" }}>
                                    <td className="fw-bold">Shipping</td>
                                    <td>&#8377;50.00 Via Flat Rate</td>
                                </tr>
                                <tr style={{ borderBottom: "2px solid rgb(0,0,0)" }}>
                                    <td className="fw-bold">Subtotal</td>
                                    <td>
                                        <p style={{ margin: "0px" }} className="fw-bold" >&#8377;1,938.00 (includes &#8377;</p>
                                        <p style={{ margin: "0px" }} className="fw-bold">105.96 6% CGST / 6%</p>
                                        <p style={{ margin: "0px" }} className="fw-bold">SGST, &#8377;137,14 9%</p>
                                        <p style={{ margin: "0px" }} className="fw-bold">CGST / 9% SGST)</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

    );
};
export default Invoice;
