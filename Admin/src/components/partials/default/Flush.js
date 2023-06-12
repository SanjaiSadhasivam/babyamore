// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Card } from "reactstrap";
// import ReactDOM from 'react-dom';

// import {
//     Accordion,
//     AccordionItem,
//     AccordionItemHeading,
//     AccordionItemButton,
//     AccordionItemPanel,
// } from 'react-accessible-accordion';

// import { Badge, Button, FormGroup, Modal, ModalBody } from "reactstrap";



// import {
//   Block,
//   BlockHead,
//   BlockBetween,
//   BlockHeadContent,
//   BlockTitle,
//   BlockDes,
//   Icon,
//   BackTo,
//   PreviewCard,
//   ReactDataTable,
//   Row,
//   RSelect,
//   Col,
// } from "../../../components/Component";

// const Flush = () => {
//   const [data, setData] = useState(messageData);
//   const [filteredTabData, setFilteredTabData] = useState(messageData);
//   const [filterTab, setFilterTab] = useState("1");
//   const [search, setOnSearch] = useState(false);
//   const [filterText, setFilterText] = useState("");
//   const [selectedId, setSelectedIt] = useState(1);
//   const [mobileView, setMobileView] = useState(false);
//   const [tabData, setTabData] = useState();
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [Review, setReview] = useState({
//     reviewmsg: "",
//     reviewname: "",
//     reviewemail: "",
//   });

//   const [state, setState] = useState({ value: null });
//   const handleChange = (value) => {
//     setState({ value });
//   };

//   const [smOption, setSmOption] = useState(false);

//   const [onSearchText, setSearchText] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemPerPage] = useState(7);

//   // function to close the form modal
//   const onFormCancel = () => {
//     setView({ add: false, details: false,paid:false,status:false});
//     // resetForm();
//   };

//   const onFormSubmit = (form) => {
//     const { customer, purchased, total } = form;
//     let submittedData = {
//       id: data.length + 1,
//       orderId: "95981",
//       date: getDateStructured(formData.date),
//       status: formData.status,
//       customer: customer,
//       purchased: purchased,
//       total: total,
//       check: false,
//     };
//     setData([submittedData, ...data]);
//     setView({ add: false, details: false,paid:false,status:false});
//     resetForm();
//   };
//   const [formData, setFormData] = useState({
//     id: null,
//     orderId: "",
//     date: "",
//     status: "",
//     customer: "",
//     purchased: "",
//     paid: "",
//     total: "",
//     list: "",
//     add: "",
//     check: false,
//   });

//   const [files1, setFiles1] = useState([]);

//   const handleDropChange1 = (acceptedFiles) => {
//     setFiles1(
//       acceptedFiles.map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       )
//     );
//   };

//   const resetForm = () => {
//     setFormData({
//       ...formData,
//       id: null,
//       orderId: "",
//       date: new Date(),
//       status: "",
//       customer: "",
//       purchased: "",
//       total: "",
//       check: false,
//     });
//   };

//   const { errors, register, handleSubmit } = useForm();
//   const onInputChange = (e) => {
//     setFilterText(e.target.value);
//   };

//   const toggle = (type) => {
//     setView({
//       add: type === "add" ? true : false,
//       details: type === "details" ? true : false,
//       paid: type === "paid" ? true : false,
//       status: type === "status" ? true : false,
//     });
//   };

//   const [view, setView] = useState({
//     add: false,
//     details: false,
//     paid: false,
//     status: false,
//   });

//   return (

//     <div>
//     <Accordion
//       open="1"
//       toggle={function noRefCheck(){}}
//     >
//       <AccordionItem>
//         <AccordionHeader targetId="1">
//           Accordion Item 1
//         </AccordionHeader>
//         <AccordionBody accordionId="1">
//           <div></div>
//         </AccordionBody>
//       </AccordionItem>
//       <AccordionItem>
//         <AccordionHeader targetId="2">
//           Accordion Item 2
//         </AccordionHeader>
//         <AccordionBody accordionId="2">
//           <div></div>
//         </AccordionBody>
//       </AccordionItem>
//       <AccordionItem>
//         <AccordionHeader targetId="3">
//           Accordion Item 3
//         </AccordionHeader>
//         <AccordionBody accordionId="3">
//          <div></div>
     
//         </AccordionBody>
//       </AccordionItem>
//     </Accordion>
//   </div>
  
   

      

    
//   );
// };
// export default Flush;
