import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { Link } from 'react-router-dom';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";





import { BlockHead, BlockHeadContent, BlockTitle,PreviewAltCard,CodeBlock, Rating, ReactDataTable, PreviewCard, Button, Icon, UserAvatar,Row,Col,RSelect,Block,DataTableHead,  DataTableRow, } from "../../../components/Component";
import { messageData } from "./MessageData";
import { DisputesTableDatas,DisputesTableDatastore, disputesRate, disputesTableColpay,   disputesTableCollist, DisputesTableDatastore2, disputesTableColpro, disputesTableColso2,  disputesTableColstore, DisputesTableData, disputesTableCol,disputesTableCol2, disputesTableColumns, disputesTableColumns2, userData, } from "./TableData";

import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
import ContentAlt from "../../../layout/content/ContentAlt";
import { FormGroup,Label, Progress, UncontrolledDropdown,DropdownToggle } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";

const Payments = () => {
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

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  
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
      setTabData(support)
    } else if (filterTab === "3") {
      setTabData(  formatsss )
    } else if (filterTab === "4") {
      setTabData(order)
    }
    else {
      setTabData(review)
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
  const basic = ()=>{
    return(
        <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          <BlockHead size="lg" wide="sm">
          </BlockHead>
  
  
          <Block size="lg">
            <BlockHead>
              <BlockHeadContent>
                <div className="toggle-wrap nk-block-tools-toggle">
                {/* <a
                    href="#more"
                    className="btn btn-icon btn-trigger toggle-expand mr-n1"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSmOption(!smOption);
                    }}
                  >
                   
                  </a> */}
  
  
                    
                
                </div>
  
  
  
  
              </BlockHeadContent>
              
            </BlockHead>
            
  
  
  
  
            <PreviewCard>
              <ReactDataTable data={DisputesTableDatastore} columns={disputesTableColpay} expandableRows pagination actions />
            </PreviewCard>
          </Block>
  
   
        </Content>
      </React.Fragment>
      
    )
  }

//   const formatsss = ()=>{
//     return(
//         <React.Fragment>
//       <Head title="Disputes Table" />
//       <Content page="component">
//         <BlockHead size="lg" wide="sm">
//         </BlockHead>


//         <Block size="lg">
//           <BlockHead>
//             <BlockHeadContent>
//               <div className="toggle-wrap nk-block-tools-toggle">
//               {/* <a
//                   href="#more"
//                   className="btn btn-icon btn-trigger toggle-expand mr-n1"
//                   onClick={(ev) => {
//                     ev.preventDefault();
//                     setSmOption(!smOption);
//                   }}
//                 >
                 
//                 </a> */}


                  
             
//               </div>




//             </BlockHeadContent>
            
//           </BlockHead>
          




//           <PreviewCard>
//             <ReactDataTable data={DisputesTableDatastore2} columns={disputesTableColso2} expandableRows pagination actions />
//           </PreviewCard>
//         </Block>

 
//       </Content>
//     </React.Fragment>
    
//     )
//   }
  
  const support = ()=>{
    return(
      <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
        </BlockHead>


        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
              {/* <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                 
                </a> */}


        
              </div>




            </BlockHeadContent>
            
          </BlockHead>
          




          <PreviewCard>
            <ReactDataTable data={DisputesTableDatas} columns={ disputesTableCollist} expandableRows pagination actions />
          </PreviewCard>
        </Block>

 
      </Content>
    </React.Fragment>
    )
  }

  const order = ()=>{
    return(
      <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
         
        </BlockHead>

        <Block size="lg">

          <PreviewCard>
            <ReactDataTable data={DisputesTableData} columns={disputesRate} expandableRows pagination actions />
          </PreviewCard>
        </Block>

        
      </Content>
    </React.Fragment>
    )
  }

  const review = ()=>{
    return(
<div>

</div>
   
    )
  }
  
  const onSearchBack = () => {
    setOnSearch(false);
    setFilterText("");
  };

  const onClosed = (id) => {
    let newData = data;
    const index = newData.findIndex((item) => item.id === id);
    newData[index].closed = true;
    setData([...newData]);
  };

  const onMessageClick = (id) => {
    setSelectedIt(id);
    if (window.innerWidth <= 990) {
      setMobileView(true);
    }
  };

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
                Order Commission Data
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                 Payout Data
                  </a>
                </li>
              

              </ul>
            </div>

            <Simplebar className="nk-msg-list">
              {tabData}
            </Simplebar>


          </div>
          {/*nk-aside*/}
          {/* <MessageItem
            id={selectedId}
            onClosed={onClosed}
            data={data}
            setMobileView={setMobileView}
            mobileView={mobileView}
          /> */}
        </div>
      </ContentAlt>
    </React.Fragment>
  );
};
export default Payments;