import React, { useContext, useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  OverlineTitle,
  Sidebar,
  UserAvatar,
  ReactDataTable,
  PreviewAltCard,
  Progress,
  Rating,
} from "../../../components/Component";
import { useHistory } from "react-router";
import Content from "../../../layout/content/Content";
import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import ContentAlt from "../../../layout/content/ContentAlt";
import Head from "../../../layout/head/Head";
import { currentTime, findUpper, monthNames, todaysDate } from "../../../utils/Utils";
import { UserContext } from "../../pre-built/user-manage/UserContext";
import { notes } from "../../pre-built/user-manage/UserData";
import { DisputesTableDatasAttribute } from "../../components/table/TableData";

const ProductDetailsPage = ({ match }) => {
  const { contextData } = useContext(UserContext);
  const [sideBar, setSidebar] = useState(false);
  const [user, setUser] = useState();
  const [noteData, setNoteData] = useState(notes);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");
  const history = useHistory();

  const [data, setData] = useState(messageData);
  const [filterText, setFilterText] = useState("");
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [tabData, setTabData] = useState();
  const [filterTab, setFilterTab] = useState("1");

  const [modalEdit, setModalEdit] = useState(false);

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    const id = match.params.id;
    if (id !== undefined || null || "") {
      let spUser = data.find((item) => item.id === Number(id));
      setUser(spUser);
    } else {
      setUser(data[0]);
    }
  }, [match.params.id, data]);

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };

  // Attribute Table Data
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
                  <li onClick={() => editPopup(row)}>
                    <DropdownItem>
                      <Icon name="edit"></Icon>
                      <span>Edit</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem onClick={() => setModalEdit(true)}>
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
      setTabData(ParentDataTab);
    } else if (filterTab === "2") {
      setTabData(ProductInfoTab);
    } else if (filterTab === "3") {
      setTabData(CategoryTab);
    } else if (filterTab === "4") {
      setTabData(MetaTab);
    } else if (filterTab === "5") {
      setTabData(AttributeTab);
    } else {
      setTabData(reviews);
    }
  }, [filterTab]);

  // delete a note
  const deleteNote = (id) => {
    let defaultNote = noteData;
    defaultNote = defaultNote.filter((item) => item.id !== id);
    setNoteData(defaultNote);
  };

  const submitNote = () => {
    let submitData = {
      id: Math.random(),
      text: addNoteText,
      date: `${monthNames[todaysDate.getMonth()]} ${todaysDate.getDate()}, ${todaysDate.getFullYear()}`,
      time: `${currentTime()}`,
      company: "Softnio",
    };
    setNoteData([...noteData, submitData]);
    setAddNoteModal(false);
    setAddNoteText("");
  };

  const ParentDataTab = () => {
    return (
      <div className="card-inner bg-white-m-15">
        <Block>
          <BlockHead>
            <BlockTitle tag="h5">About Product</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list prod-detail-page">

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">ID</span>
                <span className="profile-ud-value">ID-1001</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Type</span>
                <span className="profile-ud-value">Simple</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Name</span>
                <span className="profile-ud-value">PureBorn Diapers</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Country of Origin</span>
                <span className="profile-ud-value">India</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Upsell Products</span>
                <span className="profile-ud-value">Napkin, Diapers</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Cross-Sell Products</span>
                <span className="profile-ud-value">Lotion</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Tags</span>
                <span className="profile-ud-value">Napkin</span>
              </div>
            </div>
          </div>
        </Block>

        <div className="nk-divider divider md"></div>

        <Block>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockTitle tag="h5">Short Description</BlockTitle>
            </BlockBetween>
          </BlockHead>
          <div className="bq-note">
            <div className="bq-note-item">
              <div className="bq-note-text">
                <p>
                  Made with organic bamboo. Each nappy contains up to 43% organic bamboo pulp. Free from heavy metals
                  and allergens. Hypoallergenic. Dermatologically tested and approved. High absorbtion organic bambo
                  core.
                </p>
              </div>
            </div>
          </div>
        </Block>

        <Block>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockTitle tag="h5">Full Description</BlockTitle>
            </BlockBetween>
          </BlockHead>
          <div className="bq-note">
            <div className="bq-note-item">
              <div className="bq-note-text">
                <p>
                  Our nappies are eco-friendly, made with organic bamboo pulp. They are free from harmful chemicals and
                  intended for use by babies and toddlers up to 2 & 1/2 years of age. Pure Born Eco-Organic Bamboo Baby
                  Nappies are ultra-soft, with a cloth-like feel to provide maximum comfort for the babies. They are
                  made with unbleached bamboo fibers in the core layer and soft non-woven fabric on both top and bottom
                  layers to provide the best comfort and protection on the most sensitive skin.
                </p>
              </div>
            </div>
          </div>
        </Block>
      </div>
    );
  };

  const ProductInfoTab = () => {
    return (
      <div className="card-inner bg-white-m-15">
        <Block>
          <BlockHead>
            <BlockTitle tag="h5">Product Information</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list prod-detail-page">

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Select Vendor</span>
                <span className="profile-ud-value">PureBorn</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Select Warehouse</span>
                <span className="profile-ud-value">Chennai</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">HSN</span>
                <span className="profile-ud-value">3001</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">SKU</span>
                <span className="profile-ud-value">3001-BA</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Regular Price</span>
                <span className="profile-ud-value">₹ 1934</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Sale Price</span>
                <span className="profile-ud-value">₹ 1534</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Offer Discount %</span>
                <span className="profile-ud-value">15%</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Status</span>
                <span className="profile-ud-value">Active</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Select Tax Status</span>
                <span className="profile-ud-value">With Tax</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">GST</span>
                <span className="profile-ud-value">12%</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product L*B*H (In CM)</span>
                <span className="profile-ud-value">12*12*18</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Weight (In Kgs)</span>
                <span className="profile-ud-value">18</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Manage Stock</span>
                <span className="profile-ud-value">20</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Low Stock Notification</span>
                <span className="profile-ud-value">Enable</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Pre-Order (Quantity)</span>
                <span className="profile-ud-value">20</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Sold Individual(Per One Order)</span>
                <span className="profile-ud-value">2</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">From Date</span>
                <span className="profile-ud-value">12-04-2022</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">End Date</span>
                <span className="profile-ud-value">12-12-2023</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Review</span>
                <span className="profile-ud-value">Enable</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Expiry Date</span>
                <span className="profile-ud-value">12-12-2023</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Expiry Rule</span>
                <span className="profile-ud-value">Enable</span>
              </div>
            </div>

            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Product Earn Amount</span>
                <span className="profile-ud-value">₹ 200</span>
              </div>
            </div>
          </div>
        </Block>

        <div className="nk-divider divider md"></div>

        <Block>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockTitle tag="h5">Upload Image</BlockTitle>
            </BlockBetween>
          </BlockHead>
          <div className="bq-note">
            <div className="bq-note-item">
              <div className="bq-note-text">
                <img
                  src="https://www.babyamore.in/wp-content/uploads/2020/08/Pureborn-Pineapple-361x400.jpg"
                  style={{ width: "200px", height: "200px", paddingRight: "10px" }}
                ></img>
                <img
                  src="https://www.babyamore.in/wp-content/uploads/2020/08/Pureborn-prints-400x400.jpg"
                  style={{ width: "200px", height: "200px" }}
                ></img>
              </div>
            </div>
          </div>
        </Block>
      </div>
    );
  };

  const CategoryTab = () => {
    return (
      <div className="card-inner bg-white-m-15">
        <Block>
          <BlockHead>
            <BlockTitle tag="h5">Category</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list prod-detail-page">
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Main Category</span>
                <span className="profile-ud-value">Nappy Care</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Sub Category</span>
                <span className="profile-ud-value">Diapers & Pants</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Child Category</span>
                <span className="profile-ud-value">Diapers</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Featured Products</span>
                <span className="profile-ud-value">Oral Care, Baby Cloths</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Featured Brands</span>
                <span className="profile-ud-value">Pure Born, Aveeno</span>
              </div>
            </div>
          </div>
        </Block>
      </div>
    );
  };

  const MetaTab = () => {
    return (
      <div className="card-inner bg-white-m-15">
        <Block>
          <BlockHead>
            <BlockTitle tag="h5">SEO</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list prod-detail-page">
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Meta Title</span>
                <span className="profile-ud-value">PureBorn</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label prod-det">Meta Slug</span>
                <span className="profile-ud-value">pure-born</span>
              </div>
            </div>
          </div>
        </Block>

        <div className="nk-divider divider md"></div>

        <Block>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockTitle tag="h5">Meta Description</BlockTitle>
            </BlockBetween>
          </BlockHead>
          <div className="bq-note">
            <div className="bq-note-item">
              <div className="bq-note-text">
                <p>
                  Made with organic bamboo. Each nappy contains up to 43% organic bamboo pulp. Free from heavy metals
                  and allergens. Hypoallergenic. Dermatologically tested and approved. High absorbtion organic bambo
                  core.
                </p>
              </div>
            </div>
          </div>
        </Block>
      </div>
    );
  };

  const AttributeTab = () => {
    return (
      <div className="card-inner bg-white-m-15">
        <Block>
          <BlockHead>
            <BlockTitle tag="h5">Attribute</BlockTitle>
          </BlockHead>

          <ReactDataTable
            data={DisputesTableDatasAttribute}
            columns={disputesTableColumnsatt}
            expandableRows
            pagination
            actions
          />
        </Block>
      </div>
    );
  };

  // const RevieweTab = () => {
  //   return (
  //     <div className="card-inner bg-white-m-15">
  //       <PreviewAltCard>
  //         <div className="rating-card text-center mb-1">
  //           <h6 className="title">Customer Review</h6>
  //           <div className="rating-wrap bg-light rating-pill my-1">
  //             <ul className="rating">
  //               <li>
  //                 <Icon name="star-fill"></Icon>
  //               </li>
  //               <li>
  //                 <Icon name="star-fill"></Icon>
  //               </li>
  //               <li>
  //                 <Icon name="star-fill"></Icon>
  //               </li>
  //               <li>
  //                 <Icon name="star-half-fill"></Icon>
  //               </li>
  //               <li>
  //                 <Icon name="star"></Icon>
  //               </li>
  //             </ul>
  //             <span className="amount">3.5 out of 5</span>
  //           </div>
  //           <span className="sub-text mt-1">40 customers ratings</span>
  //           <div className="gy-3 pt-4">
  //             <div className="progress-rating">
  //               <div className="progress-rating-title">5 star</div>
  //               <Progress value={72} color="primary" className="progress-md"></Progress>
  //               <div className="progress-rating-percent">72%</div>
  //             </div>
  //             <div className="progress-rating">
  //               <div className="progress-rating-title">4 star</div>
  //               <Progress value={58} color="primary" className="progress-md"></Progress>
  //               <div className="progress-rating-percent">58%</div>
  //             </div>
  //             <div className="progress-rating">
  //               <div className="progress-rating-title">3 star</div>
  //               <Progress value={34} color="primary" className="progress-md"></Progress>
  //               <div className="progress-rating-percent">34%</div>
  //             </div>
  //             <div className="progress-rating">
  //               <div className="progress-rating-title">2 star</div>
  //               <Progress value={18} color="primary" className="progress-md"></Progress>
  //               <div className="progress-rating-percent">18%</div>
  //             </div>
  //             <div className="progress-rating">
  //               <div className="progress-rating-title">1 star</div>
  //               <Progress value={55} color="primary" className="progress-md"></Progress>
  //               <div className="progress-rating-percent">55%</div>
  //             </div>
  //           </div>
  //         </div>
  //       </PreviewAltCard>
  //     </div>
  //   );
  // };

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
                    SEO
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

                {/* <li className={`nk-msg-menu-item ${filterTab === "6" && " active"}`} onClick={() => setFilterTab("6")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Review
                  </a>
                </li> */}
              </ul>
            </div>

            <Simplebar className="nk-msg-list">{tabData}</Simplebar>
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
export default ProductDetailsPage;