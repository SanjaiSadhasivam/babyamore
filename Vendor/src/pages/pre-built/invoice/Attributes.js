import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { UncontrolledDropdown, Modal, ModalBody, FormGroup, Form, DropdownMenu, DropdownToggle, Card, Badge, DropdownItem } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  Col,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PaginationComponent,
  RSelect,
} from "../../../components/Component";
import { Link } from "react-router-dom";

import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import Dropzone from "react-dropzone";

import { useForm } from "react-hook-form";
import { filterStatus, filterStatusattrib, filterStatusattribcate, filterStatusattribval } from "../user-manage/GroupData";
import { attributesData } from "./AttributesData";


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


const Attributes = () => {
  const [data, setData] = useState(attributesData);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("asc");

  const [modal, setModal, viewModal] = useState({
    edit: false,
    add: false,
  });

  const [modal1, setModal1, viewModal1] = useState({
    edit: false,
    add: false,
  });

  const { errors, register, handleSubmit } = useForm();

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // function to close the form modal
  const onFormCancel1 = () => {
    setModal1({ edit: false, add: false });
  };

  // Sorting data
  const sortFunc = () => {
    let defaultData = data;
    if (sort === "dsc") {
      let sortedData = defaultData.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      setData([...sortedData]);
    } else if (sort === "asc") {
      let sortedData = defaultData.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = attributesData.filter((item) => {
        return item.orderId.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...attributesData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    balance: "",
    phone: "",
    status: "Active",
  });

  

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { name, email, balance, phone } = submitData;
    let submittedData = {
      id: data.length + 1,
      avatarBg: "purple",
      name: name,
      role: "Customer",
      email: email,
      balance: balance,
      phone: phone,
      emailStatus: "success",
      kycStatus: "alert",
      lastLogin: "10 Feb 2020",
      status: formData.status,
      country: "Bangladesh",
    };

    // submit function to update a new item
  const onEditSubmit = (submitData) => {
    const { name, email, phone } = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarBg: item.avatarBg,
          name: name,
          image: item.image,
          role: item.role,
          email: email,
          balance: formData.balance,
          phone: "+" + phone,
          emailStatus: item.emailStatus,
          kycStatus: item.kycStatus,
          lastLogin: item.lastLogin,
          status: formData.status,
          country: item.country,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.name,
          email: item.email,
          status: item.status,
          phone: item.phone,
          balance: item.balance,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  const onViewClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.name,
          email: item.email,
          status: item.status,
          phone: item.phone,
          balance: item.balance,
        });
        setModal({ edit: true }, { add: true });
        setEditedId(id);
      }
    });
  };


    // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      balance: "",
      phone: "",
      status: "Active",
    });
  };

  
    setData([submittedData, ...data]);
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  return (
    <React.Fragment>
      <Head title="Attributes "></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> Attributes </BlockTitle>
              {/* <BlockDes className="text-soft">
                <p>You have total 937 Attributes Request.</p>
              </BlockDes> */}
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Button color="primary" className="toggle d-none d-md-inline-flex" onClick={() => setModal({ add: true })}>
                    <Icon name="plus"></Icon>
                    <span>Add Attribute Value</span>
                  </Button>
                </li>
                {/* <li>
                  <Button color="primary" className="toggle d-none d-md-inline-flex" onClick={() => setModal1({ add: true })}>
                    <Icon name="plus"></Icon>
                    <span>Add Attribute</span>
                  </Button>
                </li> */}
              </ul>
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
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">All Attributes  </h5>
                  </div>
                  <div className="card-tools mr-n1">
                    <ul className="btn-toolbar">
                      <li>
                        <Button onClick={toggle} className="btn-icon search-toggle toggle-search">
                          <Icon name="search"></Icon>
                        </Button>
                      </li>
                      <li className="btn-toolbar-sep"></li>
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                            <Icon name="setting"></Icon>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <ul className="link-check">
                              <li>
                                <span>Show</span>
                              </li>
                              <li className={itemPerPage === 10 ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setItemPerPage(10);
                                  }}
                                >
                                  10
                                </DropdownItem>
                              </li>
                              <li className={itemPerPage === 15 ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setItemPerPage(15);
                                  }}
                                >
                                  15
                                </DropdownItem>
                              </li>
                            </ul>
                            <ul className="link-check">
                              <li>
                                <span>Order</span>
                              </li>
                              <li className={sort === "dsc" ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setSortState("dsc");
                                    sortFunc("dsc");
                                  }}
                                >
                                  DESC
                                </DropdownItem>
                              </li>
                              <li className={sort === "asc" ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setSortState("asc");
                                    sortFunc("asc");
                                  }}
                                >
                                  ASC
                                </DropdownItem>
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                  </div>
                  <div className={`card-search search-wrap ${!onSearch ? "active" : ""}`}>
                    <div className="search-content">
                      <Button
                        className="search-back btn-icon toggle-search"
                        onClick={() => {
                          setSearchText("");
                          toggle();
                        }}
                      >
                        <Icon name="arrow-left"></Icon>
                      </Button>
                      <input
                        type="text"
                        className="form-control border-transparent form-focus-none"
                        placeholder="Search by Order Id"
                        value={onSearchText}
                        onChange={(e) => onFilterChange(e)}
                      />
                      <Button className="search-submit btn-icon">
                        <Icon name="search"></Icon>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-inner p-0">
                <table className="table table-orders">
                  <thead className="tb-odr-head">
                    <tr className="tb-odr-item">
                      <th className="tb-odr-info">
                        <span className="tb-odr-id">Attribute Type</span>
                        <span className="tb-odr-date d-none d-md-inline-block">Attribute Name</span>
                      </th>
                      <th className="tb-odr-amount">
                        <span className="tb-odr-total">Amount</span>
                        <span className="tb-odr-status d-none d-md-inline-block">Entities</span>
                      </th>
                      <th className="tb-odr-action">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody className="tb-odr-body">
                    {currentItems.length > 0
                      ? currentItems.map((item) => {
                          return (
                            <tr className="tb-odr-item" key={item.id}>
                              <td className="tb-odr-info">
                                <span className="tb-odr-id">
                                  <Link to={`${process.env.PUBLIC_URL}/invoice-details/${item.id}`}>
                                    #{item.orderId}
                                  </Link>
                                </span>
                                <span className="tb-odr-date">{item.date}</span>
                              </td>
                              <td className="tb-odr-amount">
                                <span className="tb-odr-total">
                                  <span className="amount">${item.totalAmount}</span>
                                </span>
                                <span className="tb-odr-status">
                                  <Badge
                                    color={
                                      item.status === "Complete"
                                        ? "success"
                                        : item.status === "Pending"
                                        ? "warning"
                                        : "danger"
                                    }
                                    className="badge-dot"
                                  >
                                    {item.status}
                                  </Badge>
                                </span>
                              </td>
                              <td className="tb-odr-action">
                                <div className="tb-odr-btns d-none d-sm-inline">
                                  <Link to={`${process.env.PUBLIC_URL}/invoice-print/${item.id}`} target="_blank">
                                    <Button color="primary" size="sm" className="btn-icon btn-white btn-dim">
                                      <Icon name="printer-fill"></Icon>
                                    </Button>
                                  </Link>
                                  {/* <Link to={`${process.env.PUBLIC_URL}/invoice-details/${item.id}`}> */}
                                    <Button color="primary" size="sm" className="btn btn-dim">
                                      View
                                    </Button>
                                    <Button color="primary" size="sm" className="btn btn-dim">
                                      Delete
                                    </Button>
                                  {/* </Link> */}
                                </div>
                                <Link to={`${process.env.PUBLIC_URL}/invoice-details/${item.id}`}>
                                  <Button className="btn-pd-auto d-sm-none">
                                    <Icon name="chevron-right"></Icon>
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
              <div className="card-inner">
                {currentItems.length > 0 ? (
                  <PaginationComponent
                    noDown
                    itemPerPage={itemPerPage}
                    totalItems={data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-silent">No data found</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Attribute Value</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>

                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Attribute</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatusattribval}
                          defaultValue={{ value: "", label: "Select" }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col md="8">
                    <FormGroup>
                      <label className="form-label">Attribute Value</label>
                      <input
                        className="form-control"
                        type="text"
                        name="url"
                        placeholder="Attribute Value"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>                  

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">List Order</label>
                      <input
                        className="form-control"
                        type="number"
                        name="vieworder"
                        defaultValue={formData.email}
                        placeholder="Viewing Order"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>
                  
                  
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Save
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal1.add} toggle={() => setModal1({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel1();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Attribute</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                  
                <Col md="12">
                    <FormGroup>
                      <label className="form-label">Attribute</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatusattrib}
                          defaultValue={{ value: "", label: "Select" }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col md="8">
                    <FormGroup>
                      <label className="form-label">Attribute Value</label>
                      <input
                        className="form-control"
                        type="text"
                        name="url"
                        placeholder="Attribute Value"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>                  

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">List Order</label>
                      <input
                        className="form-control"
                        type="number"
                        name="vieworder"
                        defaultValue={formData.email}
                        placeholder="Viewing Order"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Categories</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatusattribcate}
                          defaultValue={{ value: "", label: "Select" }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  
                  
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Save
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel1();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>


      </Content>
    </React.Fragment>
  );
};
export default Attributes;
