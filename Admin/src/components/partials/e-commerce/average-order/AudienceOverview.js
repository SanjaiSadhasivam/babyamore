import React, { useState } from "react";
import { Card,Collapse } from "reactstrap";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import { withTheme } from "styled-components";
import { Badge, Button,FormGroup,Modal, ModalBody,ModalHeader,ModalFooter } from "reactstrap";

const Accordian = () => {
  const [isOpen, setIsOpen] = useState();
  return (  
    <div className="mt-2">
       <Card >
          <div className="row d-inline-flex mt-2">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <ul className="list-unstyled d-flex p-3">
                    <li><Icon name="histroy"></Icon></li>&nbsp;
                    <li>HISTORY</li>
                  </ul>
                </div>
              </div>
            </div>
           
            
            
          </div>
          <span className="orderbotborder"></span>
         
          <div className="accordion accordian-s2 mt-2">
      <div className="accordion-item ">
        <div
          className= "accordion-head d-flex justify-content-between"
          onClick={() => setIsOpen("1")}
        >
         <h6 className="title"><Icon name="check-circle"></Icon> Updated By SuperAdmin</h6>
          
          <span style={{cursor:'context-menu'}}>4 hours ago</span>
        </div>
        <Collapse
          className="accordion-body"
          isOpen={isOpen === "1" ? true : false}
        >
          
        </Collapse>
      </div>
      
      <div className="accordion-item">
        <div
          className="accordion-head collapsed d-flex justify-content-between"
          onClick={() => setIsOpen("2")}
        >
          <h6 className="title"><Icon name="check-circle"></Icon> System created This order</h6>
          <span style={{cursor:'context-menu'}}>6 hours ago</span>
        </div>
        <Collapse
          className="accordion-body"
          isOpen={isOpen === "2" ? true : false}
        >
          <div className="accordion-inner">
            <ul className="list-unstyled">
              <li >
              <p><Icon name="arrow-right-circle"></Icon>&nbsp;Nothing to show</p>
              </li>
            </ul>
          </div>
        </Collapse>
      </div>
      <div className="accordion-item">
        <div
         className="accordion-head collapsed d-flex justify-content-between"
          onClick={() => setIsOpen("3")}
        >
             <h6 className="title"><Icon name="check-circle"></Icon> System updated This order</h6>
          <span style={{cursor:'context-menu'}}>6 hours ago</span>
        </div>
        <Collapse
          className="accordion-body"
          isOpen={isOpen === "3" ? true : false}
        >
          <div className="accordion-inner">
          <ul className="list-unstyled">
              <li >
              <p><Icon name="arrow-right-circle"></Icon>&nbsp;Updated Payment Instruction: Payment instructions for Bank Wire Transfer</p>
              </li>
              <li >
              <p><Icon name="arrow-right-circle"></Icon>&nbsp;Updated Status: Waiting for payment</p>
              </li>
              <li >
              <p><Icon name="arrow-right-circle"></Icon>&nbsp;Updated Fulfilment Type: deliver</p>
              </li>
              
            </ul>
          </div>
        </Collapse>
      </div>
      <div className="accordion-item">
        <div
          className="accordion-head collapsed d-flex justify-content-between"
          onClick={() => setIsOpen("4")}
        >
           <h6 className="title"><Icon name="check-circle"></Icon> System updated This order</h6>
          <span style={{cursor:'context-menu'}}>6 hours ago</span>
        </div>
        <Collapse
          className="accordion-body"
          isOpen={isOpen === "4" ? true : false}
        >
          <div className="accordion-inner">
          <ul className="list-unstyled">
              <li >
              <p><Icon name="arrow-right-circle"></Icon>&nbsp;Changed Payment status from Unpaid to Pending</p>
              </li>
              <li >
              <p><Icon name="arrow-right-circle"></Icon>&nbsp;Updated Status: Waiting for payment</p>
              </li>
              <li >
              <p><Icon name="arrow-right-circle"></Icon>&nbsp;Updated Fulfilment Type: deliver</p>
              </li>
              
            </ul>
          </div>
        </Collapse>
      </div>
    </div>
        </Card>
        
    
    </div>
  )}
export default Accordian;
