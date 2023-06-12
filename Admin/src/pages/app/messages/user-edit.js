import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BlockHead, BlockBetween, BlockHeadContent, BlockTitle, ReactDataTable, PreviewCard, Button, Icon, UserAvatar,Row,Col,RSelect,Block,DataTableHead,CodeBlock,  DataTableRow,Rating,  PreviewTable,
} from "../../../components/Component";
import { DisputesTableData, DisputesTableDatasAttribute, disputesTableColumns, disputesTableColumns2, userData } from "../../components/table/TableData";
import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
import MessageItem from "./MessageItem";
import ContentAlt from "../../../layout/content/ContentAlt";
import { FormGroup,Label, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Card ,Modal, 
  ModalBody, 
  ModalHeader,  } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { DisputesTableDatas } from "../../components/table/TableData";


const VendorEdit = () => {
  
  const [defaultFiles, setDefaultFiles] = useState("");
  const [defaultFiles2, setDefaultFiles2] = useState("");
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [files4, setFiles4] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };
  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const [data, setData] = useState(messageData);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: '',
    reviewname: '',
    reviewemail: ''

  });
  const [state, setState] = useState();
  const handleChange = value => {
    setState({ value });
  };
  const [stateshort, setStateshort] = useState();
  const handleChangeshort = value => {
    setStateshort({ value });
  };

  
  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };
  

  const [files1, setFiles1] = useState([]);
  
  const onFormSubmit = (form) => {
    const { customer, purchased, list, add, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      paid: formData.paid,
      total: total,
      list: "",
      add :"",
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
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

  const disputesTableColumnsatt = [
    {
      name: "S.No",
      selector: (row) => row.No,
      sortable: true,
    },
    {
      name: "Attribute",
      selector: (row) => row.Attribute,
      sortable: true,
      hide: 370,
    },
    {
      name: "Value",
      selector: (row) => row.Value,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => (
        <ul>
          <li>
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                <Icon name="more-h"></Icon>
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="link-list-opt no-bdr">
                  <li onClick={()=>editPopup(row)}>
                    <DropdownItem>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>

                  <li >
                    <DropdownItem onClick={()=>setModalEdit(true)}>
                      <Icon name="eye"></Icon>
                      <span>View</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <Icon name="trash"></Icon>
                      <span> Remove </span>
                    </DropdownItem>
                  </li>
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </li>
        </ul>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  
  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  useEffect(() => {
    if (filterText !== "") {
      const filteredData = messageData.filter((item) => {
        return (
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.messageTitle.toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setData([...filteredData]);
    } else {
      setData(filteredTabData);
    }
  }, [filterText, filterTab, filteredTabData]);

  useEffect(() => {
    let filteredData;
    if (filterTab === "1") {
      setTabData(basic)
    } else if (filterTab === "2") {
      setTabData(formatsss)
    } else if (filterTab === "3") {
      setTabData(support)
    }
    else if (filterTab === "4") {
      setTabData(prod)
    }
    else if (filterTab === "5") {
      setTabData(AttributeTab)
    }
    else if (filterTab === "6") {
      setTabData(WarehouseTab)
    }
    else if (filterTab === "7") {
      setTabData(SettingsTab)
    }
    else if (filterTab === "8") {
      setTabData(TermsTab)
    }
    else if (filterTab === "9") {
      setTabData(StaffRoleTab)
    }
    else {
      setTabData(reviews)
    }
  }, [filterTab]);

  const onchangereview = ({ target: { name, value } }) => {
    setReview({ ...Review, [name]: value });
     


  }
  const ReviewClick = () => {
    if (Review.reviewmsg) {
      
      setReviewerror(null)

    } else {
      setReviewerror("* This field is required")
    }

  }

  
  const modules1 = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      [{ 'background': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      [{ 'background': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "script",
    "direction",
    "size",
    "list",
    "bullet",
    "indent",
    "image",
    "color",
    "background",
    "link"

  ];

  const basic = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
              
              <div >
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">

                  <Col md="12">
                      <div className="form-group">
                       
                        <label className="form-label" htmlFor="customer"><h5>Overview</h5></label>
                       
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Company Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="Nazer Enterprise"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        PAN Card
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="ABCDE1234B"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        GST No
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="33AJQPN5792F1ZR"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Store Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="Nazer Enterprise"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Email Address
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="imthad@gmail.com"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Mobile Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="9790583438"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="6">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        value="#1 Tambaram Chennai, Tambaram Chennai, Tambaram, Odisha, 600001"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col size="6">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        value="#1 Tambaram Chennai, Tambaram Chennai, Tambaram, Odisha, 600001"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  
                    

                      <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col> 
                  </Row>
                </form>
              </div>
            </div>
    )
  }

  const formatsss = ()=>{
    return(
      <div className="p-2" style={{background: 'white', margin:'10px 20px'}}>
      

      <Row className="g-3">
                  <Col md="12">
                      <div className="form-group">
                       
                        <label className="form-label" htmlFor="customer"><h5>Basic Info</h5></label>
                       
                      </div>
                    </Col>

                    

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Username
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="imthad@gmail.com"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Mobile Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="9790583438"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Hameed Imthad"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Store Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Nazer Enterprise"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Shop URL Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="https://fabpik.in/NazerEnterprise"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                        
                    <FormGroup>
                      <label className="form-label">About Store/Company</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        value="#1 Tambaram Chennai, Tambaram Chennai, Tambaram, Odisha, 600001"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  
                  <Col size="12">
                      <h6>Store Logo</h6>
                    <FormGroup>
          <div className="bq-note">
            <div className="bq-note-item">
              <div className="bq-note-text">
                <img
                  src="https://www.babyamore.in/wp-content/uploads/2020/08/Pureborn-prints-400x400.jpg"
                  style={{ width: "200px", height: "200px" }}
                ></img>
              </div>
            </div>
          </div>
          </FormGroup>
                  </Col>

                    

                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col>  

      </Row>
      
    </div>
    )
  }

  const support = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">
         
          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Company</h5>
                        </label>
                      
                      </div>
                    </Col>
                    
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Name of Business / Company
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Nazer Enterprise"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Business / Company Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Nazer Enterprise"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Website
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="babyamore.in"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="12">
                    <FormGroup>
                      <label className="form-label">Address</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        value="Office No 2B, Apex Plaza 2nd Floor, No 3 Uthamar Gandhi Salai, Nungambakkam"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                    </Col>


                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        State
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Tamil Nadu"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        City
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Chennai"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Pincode
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="600034"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col>  

             
          </Row>
        </form>
      </div>
    </div>
    )
  }
  
  const prod = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Bank Details</h5>
                        </label>
                      
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Name of Account Holder
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="Nazer Enterprise"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Bank Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
                            value="ICICI"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Account Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="000905501367"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Confirm Account Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="000905501367"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Branch Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Nungambakkam"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        IFSC Code
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="ICIC0000009"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
            
            
            
            <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col> 
          </Row>
        </form>
      </div>
    </div>
    )
  }

  const AttributeTab = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Order POC Details</h5>
                        </label>
                      
                      </div>

                      
                    </Col>

                    

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Designation
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Proprietor"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Email Address
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="imthad@gmail.com"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Mobile Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="9790583438"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Would you like to receive communication on order
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Yes", label: "Yes" },
                              { value: "No", label: "No" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col> 
            </Row>
        </form>
      </div>
    </div>
    )
  }

  const WarehouseTab = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Warehouse Details</h5>
                        </label>
                      
                      </div>

                      
                    </Col>

                    

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="MAKIMAM"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Mobile Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="9842545698"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="12">
                    <FormGroup>
                      <label className="form-label">Address</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        value="#1 Tambaram Chennai ,Tambaram Chennai, Tambaram - 600001"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                    </Col>

                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col> 
            </Row>
        </form>
      </div>
    </div>
    )
  }

  const SettingsTab = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Settings</h5>
                        </label>
                      
                      </div>

                      
                    </Col>

                    <Col md="6">
                <div className="preview-block">
                  <span className="preview-title label-sty">Enable Cash On Delivery for products?</span>
                  <div className="g-4 align-center flex-wrap">

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio7"
                        />
                        <label className="custom-control-label" htmlFor="customRadio7">
                          Yes
                        </label>
                      </div>
                    </div>

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio6"
                        />
                        <label className="custom-control-label" htmlFor="customRadio6">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md="6">
                <div className="preview-block">
                  <span className="preview-title label-sty">Shipping Model?</span>
                  <div className="g-4 align-center flex-wrap">

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio8"
                        />
                        <label className="custom-control-label" htmlFor="customRadio8">
                        Fabpik
                        </label>
                      </div>
                    </div>

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio9"
                        />
                        <label className="custom-control-label" htmlFor="customRadio9">
                        Self-Ship
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Select Categories
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "health", label: "Health & Safety" },
                              { value: "personal", label: "Personal Care" },
                              { value: "child", label: "Child Care" },
                            ]}
                            isMulti={true}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                <div className="preview-block">
                  <span className="preview-title label-sty">How do you know us?</span>
                  <div className="g-4 align-center flex-wrap">

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio10"
                        />
                        <label className="custom-control-label" htmlFor="customRadio10">
                        Social Media
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio20"
                        />
                        <label className="custom-control-label" htmlFor="customRadio20">
                        News Paper
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio11"
                        />
                        <label className="custom-control-label" htmlFor="customRadio11">
                        Referred by Friend
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio12"
                        />
                        <label className="custom-control-label" htmlFor="customRadio12">
                        Google Search
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio13"
                        />
                        <label className="custom-control-label" htmlFor="customRadio13">
                        Others
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>  

              <Col md="6">
                <div className="preview-block">
                  <span className="preview-title label-sty">What type of business is yours?</span>
                  <div className="g-4 align-center flex-wrap">

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio14"
                        />
                        <label className="custom-control-label" htmlFor="customRadio14">
                        Manufacturer
                        </label>
                      </div>
                    </div>


                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio15"
                        />
                        <label className="custom-control-label" htmlFor="customRadio15">
                        Distributor
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio16"
                        />
                        <label className="custom-control-label" htmlFor="customRadio16">
                        Importer / Exporter
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio17"
                        />
                        <label className="custom-control-label" htmlFor="customRadio17">
                        Retailer
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio18"
                        />
                        <label className="custom-control-label" htmlFor="customRadio18">
                        Individual
                        </label>
                      </div>
                    </div>

                    <div className="g" style={{width:'100%'}}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio19"
                        />
                        <label className="custom-control-label" htmlFor="customRadio19">
                        Others?
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>  

              <Col md="6">
                <div className="preview-block">
                  <span className="preview-title label-sty">Do you sell on any other platform?</span>
                  <div className="g-4 align-center flex-wrap">

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio21"
                        />
                        <label className="custom-control-label" htmlFor="customRadio21">
                        Yes
                        </label>
                      </div>
                    </div>

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio22"
                        />
                        <label className="custom-control-label" htmlFor="customRadio22">
                        No
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </Col> 

              <Col md="6">
                <div className="preview-block">
                  <span className="preview-title label-sty">Do you use any Inventory Management platform?</span>
                  <div className="g-4 align-center flex-wrap">

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio24"
                        />
                        <label className="custom-control-label" htmlFor="customRadio24">
                        Yes
                        </label>
                      </div>
                    </div>

                    <div className="g">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio23"
                        />
                        <label className="custom-control-label" htmlFor="customRadio23">
                        No
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </Col> 


              <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col> 
            </Row>
        </form>
      </div>
    </div>
    )
  }

  const TermsTab = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Commision</h5>
                        </label>
                      
                      </div>

                      
                    </Col>

                    

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Agreement Date
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="04-May-2022 06:24"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Commission Rate
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="20%"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col> 
            </Row>
        </form>
      </div>
    </div>
    )
  }

  const StaffRoleTab = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Staff Management</h5>
                        </label>
                      
                      </div>

                      
                    </Col>

                    

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Designation
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="Proprietor"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Email Address
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="imthad@gmail.com"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Mobile Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
                            value="9790583438"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Would you like to receive communication on order
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Yes", label: "Yes" },
                              { value: "No", label: "No" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Save</span>
              </Button>
            </Col> 
            </Row>
        </form>
      </div>
    </div>
    )
  }

  
  

  return (
    <React.Fragment>
      <Head title=" Configuration"></Head>
      <ContentAlt>
        <div className="nk-msg">
          <div className="nk-msg-aside hide-aside">
            <div className="nk-msg-nav">
              <ul className="nk-msg-menu">
                <li className={`nk-msg-menu-item ${filterTab === "1" && " active"}`} onClick={() => setFilterTab("1")}>
                  <a
                    href="#active"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Overview
                  </a>
                </li>
                
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Basic Info
                  </a>
                </li>
               
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Company
                  </a>
                </li>

                <li className={`nk-msg-menu-item ${filterTab === "4" && " active"}`} onClick={() => setFilterTab("4")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Bank
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "5" && " active"}`} onClick={() => setFilterTab("5")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Order POC
                  </a>
                </li>

                <li className={`nk-msg-menu-item ${filterTab === "6" && " active"}`} onClick={() => setFilterTab("6")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Warehouse
                  </a>
                </li>

                <li className={`nk-msg-menu-item ${filterTab === "7" && " active"}`} onClick={() => setFilterTab("7")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Settings
                  </a>
                </li>

                <li className={`nk-msg-menu-item ${filterTab === "8" && " active"}`} onClick={() => setFilterTab("8")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Terms
                  </a>
                </li>

                <li className={`nk-msg-menu-item ${filterTab === "9" && " active"}`} onClick={() => setFilterTab("9")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Staff & Role
                  </a>
                </li>
                
                
                
              </ul>
            </div>

            <Simplebar className="nk-msg-list">
              {tabData}
            </Simplebar>


          </div>
         
        </div>
      </ContentAlt>

      <Modal isOpen={modalEdit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>View Product Details</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={() => handleSubmit}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <div className="row">
                    <div className="col-md-4">
                      <h6>Attrbute :</h6>
                    </div>
                    <div className="col-md-4">
                   <p>color</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <h6>Value :</h6>
                    </div>
                    <div className="col-md-4">
                   <p>Red</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <h6>price :</h6>
                    </div>
                    <div className="col-md-4">
                   <p>500</p>
                    </div>
                  </div>
                
                </FormGroup>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};
export default VendorEdit;