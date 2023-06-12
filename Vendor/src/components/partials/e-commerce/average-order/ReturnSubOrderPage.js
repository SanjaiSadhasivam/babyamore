import React, { useState } from "react";
import { Card, Collapse } from "reactstrap";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import { withTheme } from "styled-components";
import { Badge, Button, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import User3 from "../../../../images/avatar/a-sm.jpg";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import EditorToolbar, { modules, formats } from "../../../../../src/pages/components/table/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
// import '../../../style1.css';
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
  Row,
  RSelect,
  Col,
} from "../../../Component";
import './Custom.css';
const ReturnSubOrderPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen1, setIsOpen1] = useState(true);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const [isOpen2, setIsOpen2] = useState(true);
  const toggle2 = () => setIsOpen2(!isOpen2);
  const [isOpen3, setIsOpen3] = useState(true);
  const toggle3 = () => setIsOpen3(!isOpen3);

  const f13 = {
    fontSize: "13px"
  }
  const em1 = {
    fontSize: "1em",
    textAlign: "end"
  }
  const [sendMessage, setsendMessage] = useState(false);
  const SendMessage = () => { setsendMessage(!sendMessage) };
  const { errors, register, handleSubmit } = useForm();
  const [state, setState] = useState({ value: null });
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: "",
    status: "",
    SUBJECT: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

  const pdfDownload = e => {
    e.preventDefault()
    let doc = new jsPDF("landscape", 'pt', 'A3');
    doc.html(document.getElementById('pdf-view'), {
      callback: () => {
        doc.save('test.pdf');
      }
    });
  }

  function onFormSubmit(form) {
    const { SUBJECT, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      SUBJECT: SUBJECT,
      purchased: purchased,
      total: total,
      check: false,
    };
    const resetForm = () => {
      setFormData({
        ...formData,
        id: null,
        orderId: "",
        date: new Date(),
        status: "",
        SUBJECT: "",
        purchased: "",
        total: "",
        check: false,
      });
    };

  }
  const handleChange = value => {
    setState({ value });
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
  return (
    <div>
      <Card>
        <div className="p-4">
          <Row>
            <Col md="12" className="mb-4">
              <div>
                <h5>Customer Comments</h5>
                <p>Hi, I have ordered a dress at Babyamore and I got 70% discount. The quality of the dress is very good..</p>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      <Card>
        <div className="row " >
          <div className="col-md-12">
            <div className="accordion accordian-s2 mt-2">
              <div className="accordion-item ">
                <div
                  className="accordion-head  d-flex justify-content-between"
                  onClick={toggle1}
                >
                  <p className="title d-flex" ><Icon name="user-add-fill" className="d-none"></Icon><h5 class="ml-0">Customer Details</h5></p>

                  <span style={{ cursor: 'context-menu' }}>{isOpen1 ? <Icon name="minus"></Icon> : <Icon name="plus"></Icon>}</span>
                </div>
                <Collapse
                  className="accordion-body"
                  isOpen={isOpen1}
                >
                  <div className="accordion-inner">
                    <p>
                      <img src={User3} style={{ borderRadius: '50%', width: '15%', height: '15%' }}></img>&nbsp;
                      <span>Suresh</span>
                    </p>
                    <p>
                      <b><h6>Email:</h6></b> chad.rice@hotmail.com
                    </p>
                    <p>
                      <b><h6>Phone Number:</h6></b> 6359863236
                    </p>
                    <p className="text-muted"></p>
                    <div>
                      <div>
                        <fieldset>

                          <legend style={em1} className="Adress_heading text-left"><h6>Shipping Address</h6></legend>

                          <p className="text-muted">183, Great Southern Trunk Rd, Arcot Rd, Vadapalani, Chennai, Tamil Nadu 600026, <br /> <span>Mobile: 9876543210.</span></p>
                          <p></p>
                        </fieldset>

                        <fieldset className="mt-2">
                          <legend style={em1} className="Adress_heading text-left"><h6>Billing Address</h6></legend>

                          <p className="text-muted">183, Great Southern Trunk Rd, Arcot Rd, Vadapalani, Chennai, Tamil Nadu 600026, <br /><span>Mobile: 8765432109</span></p>

                        </fieldset>

                      </div>
                    </div>
                    <ul className="d-flex list-unstyled mt-2">
                      <li><Button size="sm" color="dark" onClick={SendMessage}>SEND MESSAGE</Button></li>&nbsp;

                    </ul>
                    <div
                      style={{ padding: "20px 0px 10px 0px" }}
                    >
                      <iframe width="100%" height="150" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8358841553313!2d80.20794731622325!3d13.046116291691126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e8795da00b%3A0xf6e966bd63236620!2s18-195%2C%20Great%20Southern%20Trunk%20Rd%2C%20Sarvamangala%20Colony%2C%20Sector%2015%2C%20Ashok%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu%20600026!5e0!3m2!1sen!2sin!4v1656743025545!5m2!1sen!2sin &amp;output=embed"></iframe>
                    </div>
                    {/* <div className="row mt-2">
                    <div className="col-md-12 ">
                      <fieldset>
                        <legend style={em1} >SHIPPING ADDRESS</legend>
                      </fieldset>
                      <fieldset>
                        <legend style={em1}>SHIPPING ADDRESS</legend>
                      </fieldset>
                      <address className="mt-2">
                        995 Paucek Summit Suite 226<br></br>Rowe Port<br></br>North Malvina<br></br><br></br> 67153-8141<br></br>
                        <abbr title="Phone">P:</abbr> +1-206-766-0343
                      </address>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d65369183.36050215!2d0!3d0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1651587406199!5m2!1sen!2sus" width="275" height="200" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <fieldset>
                        <legend style={em1}>BILLING ADDRESS</legend>
                      </fieldset>
                      <small >
                        <Icon name="check-round-cut"></Icon>&nbsp;
                        <lable >SAME AS SHIPPING ADDRESS</lable>
                      </small>
                    </div>
                  </div> */}
                  </div>
                </Collapse>
              </div>


            </div>
          </div>
        </div>
      </Card>

      {/* SHIPPING CARD */}

      <Card>
        <div className="row ">
          <div className="col-md-12">
            <div className="accordion accordian-s2">
              <div className="accordion-item ">
                <div
                  className="accordion-head  d-flex justify-content-between"
                  onClick={toggle3}
                >
                  <p className="title" style={f13}><h5>Shipping</h5>  </p>

                  <span style={{ cursor: 'context-menu' }}>{isOpen3 ? <Icon name="minus"></Icon> : <Icon name="plus"></Icon>}</span>
                </div>
                <Collapse
                  className="accordion-body"
                  isOpen={isOpen3}
                >
                  <div className="accordion-inner">
                    <div>
                      <div style={{ color: "#364a63" }}>
                        <fieldset>


                          <span>Tracking ID:</span> <strong>  RR123456789CN </strong>
                          <br />
                          <span>Carrier: <strong></strong></span>
                          <br />
                          <span>Total weight: <strong>8,181 gm</strong></span>
                          <br />
                          <span><a href="#">Tracking url</a>: #</span>

                        </fieldset>

                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>


            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="row ">
          <div className="col-md-12">
            <div className="accordion accordian-s2">
              <div className="accordion-item ">
                <div
                  className="accordion-head  d-flex justify-content-between"
                  onClick={toggle2}
                >
                  <p className="title" style={f13}><h5>Return</h5> </p>

                  <span style={{ cursor: 'context-menu' }}>{isOpen2 ? <Icon name="minus"></Icon> : <Icon name="plus"></Icon>}</span>
                </div>
                <Collapse
                  className="accordion-body"
                  isOpen={isOpen2}
                >
                  <div className="accordion-inner">
                    <div>
                      <div style={{ color: "#364a63" }}>
                        <fieldset>


                          <span>Tracking ID:</span> <strong>  RR123456789CN </strong>
                          <br />
                          <span>Carrier: <strong></strong></span>
                          <br />
                          <span>Total weight: <strong>8,181 gm</strong></span>
                          <br />
                          <span><a href="#">Tracking url</a>: #</span>

                        </fieldset>

                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>


            </div>
          </div>
        </div>
      </Card>


      {/* <Card >

      <div className="accordion accordian-s2 mt-2 ">
        <div className="accordion-item ">
          <div
            className="accordion-head  d-flex justify-content-between"
            onClick={toggle2}
          >
            <p className="title" style={f13}><Icon name="user-fill"></Icon> SHIPPING</p>

            <span style={{ cursor: 'context-menu' }}>{isOpen2 ? <Icon name="minus"></Icon> : <Icon name="plus"></Icon>}</span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={isOpen2}
          >
            <div className="accordion-inner">
              <ul className="list-unstyled ">
                <li>
                  Tracking ID: RR123456789CN
                </li>
                <li>
                  Carrier:
                </li>
                <li>
                  Total weight: 7,175 gm
                </li>
                <li>
                  Tracking url: #
                </li>

              </ul>
            </div>
          </Collapse>
        </div>


      </div>
    </Card>
    <Modal isOpen={sendMessage} toggle={SendMessage}>
      <ModalHeader
        toggle={SendMessage}
        close={
          <button className="close" onClick={SendMessage}>
            <Icon name="cross" />
          </button>
        }
      >
        FORM
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">
            <Col md={12}>
              <h6>To: astroman@mayer.biz</h6>

            </Col>

            <Col md="12">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  SUBJECT*
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"

                    placeholder="SUBJECT"
                    name="SUBJECT"
                    ref={register({ required: "Please fill out this field." })}
                    defaultValue={formData.SUBJECT}
                  />
                  {errors.SUBJECT && <span className="invalid">{errors.SUBJECT.message}</span>}
                </div>
              </div>
            </Col>


            <Col size="12">
              <FormGroup>
                <label className="form-label">MESSAGE </label>
                <div className="text-editor" style={{ minHeight: '100px', }}>
                  <EditorToolbar />
                  <ReactQuill
                    theme="snow"
                    value={state.value}
                    onChange={handleChange}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}

                  />
                </div>
                {errors.description && <span className="invalid">{errors.description.message}</span>}
              </FormGroup>
            </Col>




            <Col size="12">

              <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      {...getRootProps()}
                      className="dropzone upload-zone small my-2 dz-clickable"
                    >
                      <input {...getInputProps()} />
                      {files1.length === 0 && <p>Upload</p>}
                      {files1.map((file) => (
                        <div
                          key={file.name}
                          className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                        >
                          <div className="dz-image">
                            <img src={file.preview} alt="preview" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </Dropzone>
            </Col>
            <Col>
              <small>* Required fields.</small>
            </Col>

            <Col size="12" >
              <Button color="primary" type="submit">

                <span>SAVE</span>
              </Button>
            </Col>

          </Row>
        </form>
      </ModalBody>

    </Modal> */}
    </div>
  )
}
export default ReturnSubOrderPage;
