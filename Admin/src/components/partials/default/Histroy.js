
import { Card } from "reactstrap";
import {Link} from "react-router-dom";
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
  import { Badge, Button,FormGroup,Modal, ModalBody,ModalHeader,ModalFooter,Collapse  } from "reactstrap";
import React,  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import User3 from "../../../images/avatar/a-sm.jpg";
import {Tooltip} from "reactstrap"


import "../../../components/partials/default/Custom.css";

const Histroy = () => {
    const [isOpen, setIsOpen] = useState("1");
      const { errors, register, handleSubmit } = useForm();

      const onFormSubmit = (form) => {
        const { customer, purchased, total } = form;
        let submittedData = {
          id: data.length + 1,
          orderId: "95981",
          date: getDateStructured(formData.date),
          status: formData.status,
          customer: customer,
          purchased: purchased,
          total: total,
          check: false,
        };
        setData([submittedData, ...data]);
        setView({ add: false, details: false });
        resetForm();
      };
      const toggle = (type) => {
        setView({
          add: type === "add" ? true : false,
          details: type === "details" ? true : false,
        });
      };
      const [files1, setFiles1] = useState([]);
  
  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
      const [formData, setFormData] = useState({
        id: null,
        orderId: "",
        date: "",
        status: "",
        customer: "",
        purchased: "",
        paid: "",
        total: "",
        list: "",
        add: "",
        check: false,
      });
     
  return (
   <div className="row">
     <div className="col-md-12">
        <Card >
          <div className="row d-inline-flex">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <ul className="list-unstyled d-flex p-3">
                    <li><Icon name="cart"></Icon></li>&nbsp;
                    <li>ORDER : #432812</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5  pt-2">
              <Button className="btn-dim" color="primary" >
                <Icon name="user-fill" />
                <span>Assign Delivery Boy</span>

              </Button>
            </div>
            <div className="col-md-3 text-left pt-3">
              <Badge color="primary">WAITING FOR PAYMENT</Badge>
            </div>

          </div>
          <span className="orderbotborder"></span>
          <div className="row ">
            <div className="col-md-12">
               <div className="p-3">
                 <div className="row ">
                   <div className="col-md-10">
                   <h5 className="text-muted">Payment: Bank Wire Transfer</h5>
                   </div>
                   <div className="col-md-2">
                   <Badge className="badge-dim badge-md" color="info"><p>Pending</p></Badge>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </Card>
        
    <Card >
    <div className="accordion accordian-s2">
        <div className="accordion-item ">
          <div
            className= "accordion-head"
            onClick={() => setIsOpen("1")}
          >
            <h6 className="title">What is Dashlite?</h6>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={isOpen === "1" ? true : false}
          >
            <div className="accordion-inner">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Collapse>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-head collapsed"
            onClick={() => setIsOpen("2")}
          >
            <h6 className="title">
              What are some of the benefits of receiving my bill electronically?
            </h6>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={isOpen === "2" ? true : false}
          >
            <div className="accordion-inner">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Collapse>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-head collapsed"
            onClick={() => setIsOpen("3")}
          >
            <h6 className="title">
              What is the relationship between Dashlite and payment?
            </h6>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={isOpen === "3" ? true : false}
          >
            <div className="accordion-inner">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Collapse>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-head collapsed"
            onClick={() => setIsOpen("4")}
          >
            <h6 className="title">What are the benefits of using Dashlite?</h6>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={isOpen === "4" ? true : false}
          >
            <div className="accordion-inner">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Collapse>
        </div>
      </div>
      
    </Card>
    
    </div>
    </div>
    
  );
};
export default Histroy;
