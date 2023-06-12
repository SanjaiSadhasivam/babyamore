import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import DatePicker from "react-datepicker";
import { couponData, filterCoin, filterPaymentmethod, filterStatus, filterType } from "./CouponData";
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
  DataTableBody,
  DataTable,
  RSelect,
  Button,
  Row,
  Col,
} from "../../../components/Component";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  FormGroup,
  ModalBody,
  Modal,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { getDateStructured } from "../../../utils/Utils";

const CouponList = () => {
  const [data, setData] = useState(couponData);
  const [onSearch, setonSearch] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    date: new Date(),
    status: "",
    type: "",
    endDate: new Date(),
    discount: "",
    check: false,
  });
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [sort, setSortState] = useState("");

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.ref.localeCompare(b.ref));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.ref.localeCompare(a.ref));
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = couponData.filter((item) => {
        return item.code.includes(onSearchText);
      });
      setData([...filteredObject]);
    } else {
      setData([...couponData]);
    }
  }, [onSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // selects all the orders
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      code: "",
      date: "",
      status: "",
      type: "",
      endDate: "",
      discount: "",
      check: false,
    });
  };

  // Submits form data
  const onFormSubmit = (form) => {
    // console.log(formData)
    const { type, endDate, discount } = form;
    let submittedData = {
      id: data.length + 1,
      code: formData.code,
      date: getDateStructured(formData.date),
      status: formData.status,
      type: formData.type,
      endDate: getDateStructured(formData.endDate),
      discount: formData.discount,
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

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
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
      <Head title="Order Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Coupons</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
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
                  <span>Add Coupons</span>
                </Button>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">All Coupons</h5>
                </div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <Button
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setonSearch(true);
                        }}
                        className="btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </Button>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                          <div className="dot dot-primary"></div>
                          <Icon name="filter-alt"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right className="filter-wg dropdown-menu-xl">
                          <div className="dropdown-head">
                            <span className="sub-title dropdown-title">Advanced Filter</span>
                            <div className="dropdown">
                              <Button size="sm" className="btn-icon">
                                <Icon name="more-h"></Icon>
                              </Button>
                            </div>
                          </div>
                          <div className="dropdown-body dropdown-body-rg">
                            <Row className="gx-6 gy-4">
                              <Col size="6">
                                <FormGroup>
                                  <label className="overline-title overline-title-alt">Type</label>
                                  <RSelect options={filterType} placeholder="Any Type" />
                                </FormGroup>
                              </Col>
                              <Col size="6">
                                <FormGroup>
                                  <label className="overline-title overline-title-alt">Status</label>
                                  <RSelect options={filterStatus} placeholder="Any Status" />
                                </FormGroup>
                              </Col>
                              <Col size="6">
                                <FormGroup className="form-group">
                                  <label className="overline-title overline-title-alt">Pay Currency</label>
                                  <RSelect options={filterCoin} placeholder="Any coin" />
                                </FormGroup>
                              </Col>
                              <Col size="6">
                                <FormGroup className="form-group">
                                  <label className="overline-title overline-title-alt">Method</label>
                                  <RSelect options={filterPaymentmethod} placeholder="Any Method" />
                                </FormGroup>
                              </Col>

                              <Col size="6">
                                <FormGroup>
                                  <div className="custom-control custom-control-sm custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="includeDel" />
                                    <label className="custom-control-label" htmlFor="includeDel">
                                      {" "}
                                      Including Deleted
                                    </label>
                                  </div>
                                </FormGroup>
                              </Col>

                              <Col size="12">
                                <FormGroup className="form-group">
                                  <Button type="button" className="btn btn-secondary">
                                    Filter
                                  </Button>
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                          <div className="dropdown-foot between">
                            <a
                              href="#reset"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                              className="clickable"
                            >
                              Reset Filter
                            </a>
                            <a
                              href="#save"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                            >
                              Save Filter
                            </a>
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                          <Icon name="setting"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-xs">
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
                <div className={`card-search search-wrap {onSearch && "active"}`}>
                  <div className="search-content">
                    <Button
                      onClick={() => {
                        setSearchText("");
                        setonSearch(false);
                      }}
                      className="search-back btn-icon toggle-search"
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
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
            <DataTableBody bodyclass="nk-tb-tnx">
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
                  <span className="sub-text">Code</span>
                </DataTableRow>
                <DataTableRow size="sm">
                  <span className="sub-text">Type</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Discount</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Status</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text"> Start Date</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">End Date</span>
                </DataTableRow>
                

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
                                  loadDetail(item.id);
                                  toggle("details");
                                }}
                              >
                                <Icon name="eye"></Icon>
                                <span>Coupon Details</span>
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
                                <span>Remove Coupons</span>
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
                            id={item.id + "pid-all"}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <a href="#id" onClick={(ev) => ev.preventDefault()}>
                          #{item.code}
                        </a>
                      </DataTableRow>
                      <DataTableRow size="sm">
                        <span className="tb-sub">{item.type}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-lead"> {item.discount} %</span>
                      </DataTableRow>
                      <DataTableRow>
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
                      <DataTableRow size="md">
                        <span>{item.date}</span>
                      </DataTableRow>
                      
                      <DataTableRow size="md">
                        <span >{item.endDate}</span>
                      </DataTableRow>
                      
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                       
                          {item.status !== "Delivered" && (
                            <li className="nk-tb-action-hidden" onClick={() => deleteOrder(item.id)}>
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"delivery" + item.id}
                                icon="trash"
                                direction="top"
                                text="Remove Coupon"
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
                              text="View Coupons"
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
                                      <span>Coupon Details</span>
                                    </DropdownItem>
                                  </li>
                                  {/* {item.status !== "Delivered" && (
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
                                  )} */}
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
                                      <span>Remove Coupon</span>
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
            </DataTableBody>
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
          </DataTable>
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
              <h5 className="title">Add Coupons</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">

                  <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="discount">
                          Code
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="code"
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            ref={register({ required: "This is required" })}
                            value={formData.code}
                          />
                          {errors.code && <span className="invalid">{errors.code.message}</span>}
                        </div>
                      </div>
                    </Col>

                  <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                        Type Name
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="type"
                            options={[
                              { value: "Percentage", label: "Percentage" },
                              { value: " Fixed Amount", label: " Fixed Amount" },
                              { value: " Free Shipping", label: " Free Shipping" }
                            ]}
                            onChange={(e) => setFormData({ ...formData, type: e.value })}
                            defaultValue={formData.type}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="discount">
                          Discount Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="discount"
                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                            ref={register({ required: "This is required" })}
                            value={formData.discount}
                          />
                          {errors.discount && <span className="invalid">{errors.discount.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Enable", label: "Enable" },
                              { value: "Disable", label: "Disable" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">
                          Date of order
                        </label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={formData.date}
                            className="form-control"
                            onChange={(date) => setFormData({ ...formData, date: date })}
                          />
                          {errors.date && <span className="invalid">{errors.date.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">
                          Date of End
                        </label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={formData.endDate}
                            className="form-control"
                            onChange={(date) => setFormData({ ...formData, endDate: date })}
                          />
                          {errors.endDate && <span className="invalid">{errors.endDate.message}</span>}
                        </div>
                      </div>
                    </Col>
                   

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Add Coupons</span>
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
                <h5 className="title">Coupon Details</h5>
              </div>
              
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Code Id</span>
                  <span className="caption-text">{formData.code}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Type</span>
                  <span className="caption-text">{formData.type}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Status</span>
                  <span
                    className={`dot bg-${formData.status === "Delivered" ? "success" : "warning"} d-mb-none`}
                  ></span>
                  <span
                    className={`badge badge-sm badge-dot has-bg badge-${
                      formData.status === "Delivered" ? "success" : "warning"
                    } d-none d-mb-inline-flex`}
                  >
                    {formData.status}
                  </span>
                </Col>
                
                <Col lg={6}>
                  <span className="sub-text">Discount Price</span>
                  <span className="caption-text">{formData.discount}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Start Date</span>
                  <span className="caption-text">{formData.date}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">End Date</span>
                  <span className="caption-text">{formData.endDate}</span>
                </Col>
                
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default CouponList;
