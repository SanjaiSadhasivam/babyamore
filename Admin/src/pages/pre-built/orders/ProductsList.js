import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import DatePicker from "react-datepicker";

import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import {productsData } from "./ProductsData";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  Row,
  Col,
  RSelect,
} from "../../../components/Component";
import { getDateStructured } from "../../../utils/Utils";
import Dropzone from "react-dropzone";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Label, DropdownItem, Button, Modal, ModalBody, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";



const Export = ({ data }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button className="buttons-copy buttons-html5" onClick={() => copyToClipboard()}>
              <span>Copy</span>
            </Button>
          </CopyToClipboard>{" "}
          <button className="btn btn-secondary buttons-csv buttons-html5" type="button" onClick={() => exportCSV()}>
            <span>CSV</span>
          </button>{" "}
          <button className="btn btn-secondary buttons-excel buttons-html5" type="button" onClick={() => exportExcel()}>
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data.length} rows to clipboard</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};


const ProductsList = () => {
  const [data, setData] = useState(productsData);
  const [smOption, setSmOption] = useState(false);
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
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [files, setFiles] = useState([]);
  const [files1, setFiles1] = useState([]);

  // handles ondrop function of dropzone
  const handleDropChange1 = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject =productsData.filter((item) => {
        return item.orderId.includes(onSearchText);
      });
      setData([...filteredObject]);
    } else {
      setData([...productsData]);
    }
  }, [onSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // selects all the order
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one order
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      orderId: "",
      date: "",
      status: "",
      customer: "",
      purchased: "",
      paid: "",
      total: "",
      list: "",
      add :"",
      check: false,
    });
  };

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

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setFormData(data[index]);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    resetForm();
  };

  // function to change to approve property for an item
  const markAsDelivered = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Delivered";
    setData([...newData]);
  };

  // function to delete a Order
  const deleteOrder = (id) => {
    let defaultData = data;
    defaultData = defaultData.filter((item) => item.id !== id);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteOrder = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorMarkAsDelivered = () => {
    let newData;
    newData = data.map((item) => {
      if (item.check === true) item.status = "Delivered";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Product List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle> Products </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
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
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Search by productId"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Products</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <BlockHead>
            <BlockHeadContent>
              {/* <BlockTitle tag="h4">DisputesTable with Export</BlockTitle>
              <p>
                Pass in the <code>actions</code> props to add export option to the table.
              </p> */}
              <Export data={data} />
            </BlockHeadContent>
          </BlockHead>
        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                    id="pid-all"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="pid-all"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Product ID</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span className="sub-text">Name</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">GTIN</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Categor</span>
              </DataTableRow>
              {/* <DataTableRow size="md">
                <span className="sub-text">Purchased</span>
              </DataTableRow> */}
              <DataTableRow>
                <span className="sub-text">Listing</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Added By</span>
              </DataTableRow>
              {/* <DataTableRow size="md">
                <span className="sub-text">Paid</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Status</span>
              </DataTableRow> */}
             
              
              
              

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon mr-n1">
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#markasdone"
                              onClick={(ev) => {
                                ev.preventDefault();
                                selectorMarkAsDelivered();
                              }}
                            >
                              <Icon name="truck"></Icon>
                              <span>Mark As Delivered</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#remove"
                              onClick={(ev) => {
                                ev.preventDefault();
                                selectorDeleteOrder();
                              }}
                            >
                              <Icon name="trash"></Icon>
                              <span>Remove Products</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>

            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.id}>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input form-control"
                          defaultChecked={item.check}
                          id={item.id + "oId-all"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item.id)}
                        />
                        <label className="custom-control-label" htmlFor={item.id + "oId-all"}></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <a href="#id" onClick={(ev) => ev.preventDefault()}>
                        #{item.orderId}
                      </a>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-sub">{item.customer}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>{item.date}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead"> {item.total}</span>
                    </DataTableRow>
                    {/* <DataTableRow size="md">
                      <span className="tb-sub text-primary">{item.purchased}</span>
                    </DataTableRow> */}
                    <DataTableRow size="md">
                      <span className="tb-sub text-primary">{item.list}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span className="tb-sub text-primary">{item.add}</span>
                    </DataTableRow>
                    {/* <DataTableRow>
                      <span
                        className={`dot bg-${item.Paid === "paid" ? "success" : "warning"} d-mb-none`}
                      ></span>
                      <span
                        className={`badge badge-sm badge-dot has-bg badge-${
                          item.Paid === "paid" ? "success" : "warning"
                        } d-none d-mb-inline-flex`}
                      >
                        {item.Paid}
                      </span>
                    </DataTableRow> */}
                    {/* <DataTableRow>
                      <span
                        className={`dot bg-${item.status === "Delivered" ? "success" : "warning"} d-mb-none`}
                      ></span>
                      <span
                        className={`badge badge-sm badge-dot has-bg badge-${
                          item.status === "Delivered" ? "success" : "warning"
                        } d-none d-mb-inline-flex`}
                      >
                        {item.status}
                      </span>
                    </DataTableRow>
                     */}
                   
                   
                    
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        {item.status !== "Delivered" && (
                          <li className="nk-tb-action-hidden" onClick={() => markAsDelivered(item.id)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delivery" + item.id}
                              icon="truck"
                              direction="top"
                              text="Mark as Delivered"
                            />
                          </li>
                        )}
                        <li
                          className="nk-tb-action-hidden"
                          onClick={() => {
                            loadDetail(item.id);
                            toggle("details");
                          }}
                        >
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"view" + item.id}
                            icon="eye"
                            direction="top"
                            text="View Details"
                          />
                        </li>

                       
                        
                        <li
                          className="nk-tb-action-hidden"
                          onClick={() => {
                            ev.preventDefault();
                                      deleteOrder(item.id);
                          }}
                        >
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"remove" + item.id}
                            icon="trash"
                            direction="top"
                            text="Remove Product"
                          />
                        </li>
                        
                        <li>
                          <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      loadDetail(item.id);
                                      toggle("details");
                                    }}
                                  >
                                    <Icon name="eye"></Icon>
                                    <span>Order Details</span>
                                  </DropdownItem>
                                </li>
                                {item.status !== "Delivered" && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdown"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        markAsDelivered(item.id);
                                      }}
                                    >
                                      <Icon name="truck"></Icon>
                                      <span>Mark as Delivered</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      deleteOrder(item.id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove Products</span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
          <PreviewAltCard>
            {data.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No orders found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Products</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                  <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                         Primary Category*
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
                        <label className="form-label" htmlFor="customer">
                        Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
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
                        <label className="form-label" htmlFor="purchased">
                         SKU*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="SKU"
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
                         Brand
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
                        HSN*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="HSN"
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
                         Website
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Website"
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
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <FormGroup>
                      <label className="form-label">Upload Images</label>
                      
                    </FormGroup>
                  </Col>

                  <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                        Thumbnails
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
                  <Col size="12">
                      <label className="form-label">Upload Images</label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
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

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                         Category
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Category"
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
                       Size Chart
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
                    <Col md="6">
                      {/* <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Website"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div> */}
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       Primary Variant information
                        </label>
                        {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                      Secondary Variant information
                        </label>
                        {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       Price Data
                        </label>
                        {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                      </div>
                    </Col>
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       Enter MRP*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Enter MRP"
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
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                      Enter Discount(%)*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder=" Enter Discount(%)*"
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
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                      Enter Selling Price*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder=" Enter Selling Price"
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
                    
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                         Income Tax(%)
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
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       Package Information
                        </label>
                        {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                      Enter Selling Price*
                        </label>
                        <div className="form-control-wrap" >
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder=" Enter Selling Price"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                        <div className="form-control-wrap" style={{paddingTop: '20px',}}>
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder=" Enter Selling Price"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                        <div className="form-control-wrap" style={{paddingTop: '20px',}}>
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder=" Enter Selling Price"
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
                          Define Package Weight
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Define Package Weight"
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
                         Minimum Time to keep to the Package ready for Shipping*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Time"
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
                        Number of Items in the Package
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Manufacturer Part Number"
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
                         Enter items Details in the Package
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Manufacturer Part Number"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       Specifications*
                        </label>
                        {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Enter the Country of Origin
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "EAN", label: "EAN" },
                              { value: "ISBN", label: "ISBN" },
                              { value: "ITF", label: "ITF" },
                              { value: "JAN", label: "JAN" },
                              { value: "UPC", label: "UPC" },

                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                       
                       Settings*
                        </label>
                        {/* <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Title"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div> */}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                        Actual Stock Quanity
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=" Enter Actual Stock Quanity"
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
                        Minimum Stock Quanity
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=" Enter Minimum Stock Quanity"
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
                          Customizable
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "EAN", label: "EAN" },
                              { value: "ISBN", label: "ISBN" },
                              { value: "ITF", label: "ITF" },
                              { value: "JAN", label: "JAN" },
                              { value: "UPC", label: "UPC" },

                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                    <FormGroup style={{display:'flex', justifyContent: 'space-around', marginLeft: '-22px' }}>
                    <Label htmlFor="default-2" className="form-label">
                    Status: ?
                    </Label>
                    <div className="g">
                      <div className="custom-control custom-control-sm custom-radio" >
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="radioSize"
                          id="customRadio7"
                        />
                        <label className="custom-control-label" htmlFor="customRadio7">
                          Active
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
                         Inactive
                        </label>
                      </div>
                    </div>
                    
                </FormGroup>
                      </Col>
                      <Col size="6">
                    <FormGroup style={{display:'flex', justifyContent: 'space-around', marginLeft: '-22px'  }}>
                    <Label htmlFor="default-2" className="form-label">
                   Published Status: ?
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
                        Published
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
                         Un Published
                        </label>
                      </div>
                    </div>
                    
                </FormGroup>
                      </Col>
                      <Col size="6">
                    <FormGroup style={{display:'flex', justifyContent: 'space-around', marginLeft: '-15px' }}>
                    <Label htmlFor="default-2" className="form-label">
                    Featured in Store: ?
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
                         Yes
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
                         No
                        </label>
                      </div>
                    </div>
                    
                </FormGroup>
                      </Col>

                      <Col md="6">
                        </Col>
                      <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                      Filter Tags
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=" Select Filter Tags"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    


{/* 
                    <Col size="12">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Tags
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "autem", label: "autem" },
                              { value: "commodi", label: "commodi" },
                              { value: "consectetur", label: "consectetur" },
                              { value: "consequatur", label: "consequatur" },
                              { value: "corporis", label: "corporis" },
                              { value: "culpa", label: "culpa" },
                              { value: "cumque", label: "cumque" },

                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                  <label className="form-label">Images</label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {files.length === 0 && <p>Drop some files here(You can upload a maximum of 10 images and each file size can not exceed 5000 KB)</p>}
                              {files.map((file) => (
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

              <h5 className="title">Organization</h5>

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Categories
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Harris", label: "Harris-Crooks" },
                              { value: "Nolan", label: "Bergstrom, Nolan and Roob" },
                              { value: "Jaskolski", label: "Reichel, Jaskolski" },
                              { value: "DSLR", label: "DSLR" },
                              { value: "Desktop", label: "Desktop" },

                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Request Shipping
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
                    
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                         Minimum Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            placeholder="Min Price"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                         Maximum Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            placeholder="Max Price"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <label className="form-label">Featured Images</label>
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
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

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="paid">
                          Origin
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="paid"
                            options={[
                              { value: "Afganistan", label: "Afganistan" },
                              { value: "Albania", label: "Albania" },
                              { value: "Algeria", label: "Algeria" },
                              { value: "Angola", label: "Angola" },
                              { value: "India", label: "India" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, paid: e.value })}
                            defaultValue={formData.paid}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                         Brand
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="total"
                            placeholder="Brand"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                         Model Number
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            placeholder="Model Number"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Manufacturer
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "acme", label: "acme" },
                              { value: "mueller", label: "mueller" },
                              { value: "Hayes", label: "Hayes" },
                              { value: "Hill", label: "Hill" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>*/}
                    

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Save</span>
                      </Button>
                    </Col> 
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-tnx-details mt-sm-3">
              <div className="nk-modal-head mb-3">
                <h5 className="title">Product Details</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Products Id</span>
                  <span className="caption-text">{formData.orderId}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Name</span>
                  <span className="caption-text">{formData.customer}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text"> GTIN </span>
                  <span className="caption-text">{formData.date}</span>
                </Col>
                {/* <Col lg={6}>
                  <span className="sub-text">Purchased Product</span>
                  <span className="caption-text">{formData.purchased}</span>
                </Col> */}
                
                <Col lg={6}>
                  <span className="sub-text"> Category </span>
                  <span className="caption-text">{formData.total}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text"> Listing </span>
                  <span className="caption-text">{formData.list}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text"> Added By </span>
                  <span className="caption-text">{formData.add}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default ProductsList;
