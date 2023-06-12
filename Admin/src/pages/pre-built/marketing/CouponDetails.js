import React, { useState,forwardRef  } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
// import DateTimePicker from "../../components/forms/DateTimePicker";
// import Content from "../../../layout/content/Content";


import { FormGroup, Label, Input, Row, Col } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
  OverlineTitle,
  OutlinedInput,
  Icon,
} from "../../../components/Component";
import { defaultOptions, groupedData, colourData } from "./NewData";
import { RSelect } from "../../../components/Component";
import makeAnimated from "react-select/animated";




  // <input className="form-control date-picker" type="text" value={value} onChange={onChange} />

  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <div onClick={onClick} ref={ref}>
      <div className="form-icon form-icon-left">
        <Icon name="calendar"></Icon>
      </div>
      <input className="form-control date-picker" type="text" value={value} onChange={onChange} />
    </div>
  ));  
  // () => {
  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  //   );
  // };
    const CouponDetails = () => {
      const [startIconDate, setStartIconDate] = useState(new Date());
      const [endIconDate, setendIconDate] = useState(new Date());
      const [file, setFile] = useState("");
      const animatedComponents = makeAnimated();

  return (
    <React.Fragment>
      <Head title="CouponDetails" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BackTo link="/components" icon="arrow-left">
              Back
            </BackTo>
            {/* <BlockTitle tag="h2" className="fw-normal">
              Form Elements
            </BlockTitle> */}
            
          </BlockHeadContent>
        </BlockHead>

        <Row>
        <Block size="lg col-lg-8">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Edit Coupon</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <OverlineTitle tag="span" className="preview-title-md">
              {" "}
              Basic Information{" "}
            </OverlineTitle>
            <Row className="gy-4">
              <Col sm="8">
                <FormGroup>
                  <Label htmlFor="default-0" className="form-label">
                    Code
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="Input placeholder" />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="8">
                <FormGroup>
                  <Label htmlFor="default-2" className="form-label">
                    Type
                  </Label>
                    <div className="g">
                      <div className="custom-control custom-control-sm custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio7"
                        />
                        <label className="custom-control-label" htmlFor="customRadio7">
                          Percentage
                        </label>
                      </div>
                    </div>
                    <div className="g">
                      <div className="custom-control custom-control-sm custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio8"
                        />
                        <label className="custom-control-label" htmlFor="customRadio8">
                          Fixed Amount
                        </label>
                      </div>
                    </div>
                    <div className="g">
                      <div className="custom-control custom-control-sm custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio9"
                        />
                        <label className="custom-control-label" htmlFor="customRadio9">
                          Free Shipping
                        </label>
                      </div>
                    </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="default-3" className="form-label">
                    Discount Value
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-right">
                      {/* <Icon name="user" /> */}
                    </div>
                    <input className="form-control" type="text" id="default-3" placeholder="Input placeholder" />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="default-3" className="form-label">
                    Usage Limit
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-right">
                      {/* <Icon name="user" /> */}
                    </div>
                    <input className="form-control" type="text" id="default-3" placeholder="Input placeholder" />
                  </div>
                </FormGroup>
                <Row className="gy-4">
              {/* <Col sm="6" md="3">
                <div className="preview-block">
                  <span className="preview-title overline-title">Default</span>
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input form-control" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Option Label
                    </label>
                  </div>
                </div>
              </Col> */}
              <Col xl="12">
                <div className="preview-block px-0 py-0">
                  {/* <span className="preview-title overline-title">Size</span> */}
                  <div className="g-3 align-center flex-wrap">
                    <div className="g">
                      <div className="custom-control custom-control-sm custom-checkbox">
                        <input type="checkbox" className="custom-control-input form-control" id="customCheck7" />
                        <label className="custom-control-label" htmlFor="customCheck7">
                          Option Label
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              {/* <Col xl="12">
                <p className="text-soft">
                  For large or small size of <code>.custom-checkbox</code>, use <code>.custom-control-{`lg|sm`}</code>{" "}
                  with <code>.custom-control</code> className.
                </p>
              </Col> */}
            </Row>
              </Col>

              
              {/* <PreviewCard> */}
            
          {/* </PreviewCard> */}
            </Row>
          </PreviewCard>
        </Block>
        <Block size="lg col-lg-4">
         
          <PreviewCard>
            <div className="gy-4" style={{height: '440px'}}>
              <Col sm="12">
                <OverlineTitle className="preview-title">Payment Method</OverlineTitle>
                <ul className="custom-control-group custom-control-vertical w-100">
                  <li>
                    <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                      <input type="radio" className="custom-control-input" name="paymentCheck" id="paymentCheck1" />
                      <label className="custom-control-label" htmlFor="paymentCheck1">
                        {/* <Icon className="icon-lg" name="cc-paypal"></Icon> */}
                        <span>Paypal</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                      <input type="radio" className="custom-control-input" name="paymentCheck" id="paymentCheck2" />
                      <label className="custom-control-label" htmlFor="paymentCheck2">
                        {/* <Icon className="icon-lg" name="cc-mc"></Icon> */}
                        <span>Master Card</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </Col>
              <Col sm="12">
                <FormGroup>
                <Label htmlFor="default-3" className="form-label">
                    Schedule
                  </Label>  
                    <br></br>
                  <Label>Start Date</Label>
                  <div className="form-control-wrap">
                    {/* <div className="form-icon form-icon-left">
                      <Icon name="calendar"></Icon>
                    </div> */}
                    <DatePicker
                      selected={startIconDate}
                      className="form-control date-picker"
                      onChange={setStartIconDate}
                      customInput={<ExampleCustomInput />}
                    />
                  </div>
                  {/* <div className="form-note">
                    Date Format <code>mm/dd/yyyy</code>
                  </div> */}
                </FormGroup>

                <FormGroup>
                  <Label>End Date</Label>
                  <div className="form-control-wrap">
                    {/* <div className="form-icon form-icon-left">
                      <Icon name="calendar"></Icon>
                    </div> */}
                    <DatePicker
                      selected={endIconDate}
                      className="form-control date-picker"
                      onChange={setendIconDate}
                      customInput={<ExampleCustomInput />}
                    />
                  </div>
                  {/* <div className="form-note">
                    Date Format <code>mm/dd/yyyy</code>
                  </div> */}
                </FormGroup>
              </Col>

              
              {/* <PreviewCard> */}
            
          {/* </PreviewCard> */}
            </div>
          </PreviewCard>
        </Block>
       
        </Row>
      </Content>
    </React.Fragment>
  );
};

export default CouponDetails;

