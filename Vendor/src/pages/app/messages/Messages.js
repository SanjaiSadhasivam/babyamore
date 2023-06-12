import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BlockHead, BlockHeadContent, BlockTitle, ReactDataTable, PreviewCard, Button, Icon, UserAvatar,Row,Col,RSelect,Block,DataTableHead,CodeBlock,  DataTableRow,Rating,  PreviewTable,
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


const AppMessages = () => {
  
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
              
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">

                  <Col md="12">
                      <div className="form-group">
                       
                        <label className="form-label" htmlFor="customer"><h5>About Product</h5></label>
                       
                      </div>
                    </Col>

                  <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Select Vendor*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Johnsons", label: "Johnsons" },
                              { value: "Himalayas", label: "Himalayas" },
                              { value: "Johhnson & Baby", label: "Johhnson & Baby" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col><Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                       Select Warehouse*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Chennai", label: "Chennai" },
                              { value: "Pune", label: "Pune" },
                              { value: "Bangalore", label: "Bangalore" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        ID*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="ID-1001"
                            name="purchased"
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
                        Product Type*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Simple", label: "Simple" },
                              { value: "Variable", label: "Variable" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        SKU*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="3001-BA"
                            name="purchased"
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
                        Product Name*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Name"
                            name="purchased"
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
                        Product Status*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Draft", label: "Draft" },
                              { value: "Review", label: "Review" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Product Price*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Price"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="6">
                    <FormGroup>
                      <label className="form-label"> Short Description </label>
                      <div className="text-editor" style={{minHeight: '100px',}}>

                          <ReactQuill
                            theme="snow"
                            onChange={handleChange}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                          />
                        </div>
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col size="6">
                    <FormGroup>
                      <label className="form-label"> Full Description </label>
                      <div className="text-editor" style={{minHeight: '100px',}}>
                          <ReactQuill
                            theme="snow"
                            onChange={handleChangeshort}
                            placeholder={"Write something awesome..."}
                            modules={modules1}
                            formats={formats}
                          />
                        </div>
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  
                    

                      <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Next</span>
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
                       
                        <label className="form-label" htmlFor="customer"><h5>Product Information</h5></label>
                       
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          From Date 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter From Date"
                            name="purchased"
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
                          End Date 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter End Date"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                      Offer Discount %
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Enter Offer Discount %"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Select Tax Status*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "withouttax", label: "Without Tax" },
                              { value: "withtax", label: "With Tax" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Select GST*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "ten", label: "10%" },
                              { value: "eighteen", label: "18%" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

<Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Manage Stock 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Manage Stock"
                            name="purchased"
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
                          Pre-Order (Quantity) 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Pre-Order(Quantity)"
                            name="purchased"
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
                        Low Stock Notification
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "enable", label: "Enable" },
                              { value: "disable", label: "Disable" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Sold Individual(Per One Order) 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter No. Of Products Per One Order"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>


                    <Col md="6"><label className="form-label" htmlFor="customer">
                      L*B*H (Package Volume)
                        </label>
                      <div className="form-group" style={{display: 'flex',}}>
                        
                        <div className="form-control-wrap"style={{paddingRight: '20px',}} >
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Enter Length"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                        <div className="form-control-wrap" style={{paddingRight: '20px',}}>
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Enter Breadth"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                        <div className="form-control-wrap" style={{paddingRight: '20px',}}>
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Enter Height"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Product Weight 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Product Weight"
                            name="purchased"
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
                        Product Review
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "enable", label: "Enable" },
                              { value: "disable", label: "Disable" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                         Purchase Note
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Purchase Note"
                            name="purchased"
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
                         Regular Price                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Regular Price"
                            name="purchased"
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
                         Sale Price                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Sale Price"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Next</span>
              </Button>
            </Col>  

      </Row>
      
    </div>
    )
  }

  const support = ()=>{
    return(
      <div className="p-2" style={{backgroundColor:'white', margin:'10px 20px'}}>
     
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">
         
          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>  Category </h5>
                        </label>
                      
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        MAIN CATEGORY *
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                         SUB CATEGORY *
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        CHILD CATEGORY *
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Product Expiry Date 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter From Date"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Expiry Rule
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Enale", label: "Enable" },
                              { value: "Disable", label: "Disable" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Product Earn Amount 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter From Date"
                            name="purchased"
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
                        Product Tags
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter Product Tags"
                            name="purchased"
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
                        Product Review Position
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Top", label: "Top" },
                              { value: "Bottom", label: "Bottom" },
                              { value: "Center", label: "Center" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        HSN*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter HSN Code"
                            name="purchased"
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
                        SKU*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="numbers"
                            className="form-control"
                            placeholder="Enter SKU"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      
                  <label className="form-label"> UPLOAD IMAGES </label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p>Drop some files here</p>}
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
                    <Col size="12">
              <Button color="primary" style={{float: 'right'}} type="submit">
                <span>Next</span>
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
     
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>  META Section </h5>
                        </label>
                      
                      </div>
                    </Col>

          <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
               	Meta Title 
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Meta Title"
                    name="purchased"
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
               	Meta Slug 
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Meta Slug"
                    name="purchased"
                    ref={register({ required: "This is required" })}
                    defaultValue={formData.purchased}
                  />
                  {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                </div>
              </div>
            </Col>
            
            

            <Col size="12">
                    <FormGroup>
                      <label className="form-label"> Meta Description </label>
                      <div className="text-editor" style={{minHeight: '100px',}}>

                          <ReactQuill
                            theme="snow"
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
     
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)} style={{ padding: '0px 20px'}}>
          <Row className="g-3">

          <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       <h5>Attribute</h5>
                        </label>
                      
                      </div>

                      
                    </Col>

                    

                    <Col md="4">
              <div className="form-group">
                <label className="form-label" htmlFor="purchased">
               	Attribute Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Attribute Name"
                    name="purchased"
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
                Attribute Value
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Attribute Value"
                    name="purchased"
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
               	Price
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Price"
                    name="purchased"
                    ref={register({ required: "This is required" })}
                    defaultValue={formData.purchased}
                  />
                  {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                </div>
              </div>
            </Col>

            <Col size="12">
                      
                  <label className="form-label">Upload Images</label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {files1.length === 0 && <p>Drop some files here</p>}
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

                    <Col size="12">
              <Button color="primary" type="submit">
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
                    Parent Data
                  </a>
                </li>
                
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Product Information
                  </a>
                </li>
               
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Categories
                  </a>
                </li>

                <li className={`nk-msg-menu-item ${filterTab === "4" && " active"}`} onClick={() => setFilterTab("4")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Meta Title
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "5" && " active"}`} onClick={() => setFilterTab("5")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Attribute
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
export default AppMessages;