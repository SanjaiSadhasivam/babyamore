import React, { useEffect, useState } from "react";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Link } from 'react-router-dom';

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

import { messageData } from "./MessageData";

import { DisputesTableData102,DisputesTableDatachild, disputesTableColumnchild, disputesTableColumnsub, disputesTableColumnsadd2s,disputesTableColumnsmain, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import {  FormGroup,Label, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button } from "reactstrap";
const ChildList = () => {
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
  const [state, setState] = useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };

  const [smOption, setSmOption] = useState(false);

  

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

const [view, setView] = useState({
  add: false,
  details: false,
});

const toggle = (type) => {
  setView({
    add: type === "add" ? true : false,
    details: type === "details" ? true : false,
  });
};

// function to close the form modal
const onFormCancel = () => {
  setView({ add: false, details: false });
  // resetForm();
};

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

  const resetForm = () => {
    setFormData({...formData,
      id: null,
      orderId: "",
      date: new Date(),
      status: "",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };


  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };
  
  return (
    <React.Fragment>
      <Head title="Child Category List" />
      <Content page="component">
        

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
            <div className="heading-flex">
              <BlockTitle tag="h4"> CHILD CATEGORY LIST </BlockTitle>
             
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content1" >
                  <ul className="nk-block-tools g-3" style={{justifyContent:'end'}}>
                    
                   
                   <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                       style={{width:'130px', top:'-73px'}} >
                        <Icon name="plus"></Icon><Link to='child-category' style={{color:'white'}}>Add Child Category</Link>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                       style={{width:'100%'}}>
                     
                        <Icon name="plus"></Icon>
                        <Link to='child-category' style={{color:'white'}}>
                        Add Child Category </Link>
                      </Button>
                    </li> 
                  </ul>
                </div>
              </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={DisputesTableDatachild}
              columns={disputesTableColumnchild}
              expandableRows
              pagination
              actions
            />
          </PreviewCard>
        </Block>

    
      </Content>
    </React.Fragment>
  );
};
export default ChildList;