import React, { useEffect, useState } from "react";
import { Badge, Button } from "reactstrap";
import { Card,  DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { productData, productDataSet2, productDataSet3, productDataSet4, productDataSet5 } from "./ProductData";
import { useHistory } from "react-router-dom";
import Simplebar from "simplebar-react";
import Head from "../../../../layout/head/Head";
import ContentAlt from "../../../../layout/content/ContentAlt";
import Content from "../../../../layout/content/Content";
import {messageData} from "../../../../pages/app/messages/MessageData";
import { useForm } from "react-hook-form";
import { BlockHead,
  BlockHeadContent,
  BlockTitle,
  ReactDataTable,
  PreviewCard,
  Icon,
  UserAvatar,
  Row,
  Col,
  RSelect,
  Block,
  DataTableHead,
  DataTableRow, } from "../../../Component";

  import {
    DisputesTableData,
    DisputesTableData2s11,
    DisputesTableDataod1,
    disputesTableColumns2,
    disputesTableColumnsdd,
    disputesTableColumnsdd1,
    userData,
  } from "../../../../pages/components/table/TableData";
  

const ShippingList = () => {
  const [data, setData] = useState("Weekly");
  const [dataSet, setDataSet] = useState(productData); 
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [filterText, setFilterText] = useState("");
  const [tabData, setTabData] = useState();

  useEffect(() => {
    let object;
    if (data === "Daily") {
      object = productDataSet2;
    } else if (data === "Monthly") {
      object = productDataSet3;
    } else {
      object = productDataSet5;
    }
    setDataSet(object);
  }, [data]);

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
      setTabData(order);
    } else if (filterTab === "2") {
      setTabData(order1);
    } else if (filterTab === "3") {
      setTabData(order2);
    } else if (filterTab === "4") {
      setTabData(support);
    } else {
      setTabData(review);
    }
  }, [filterTab]);

  const returnTotal = (n1, n2) => {
    var result = n1 * Number(n2);
    return result.toFixed(2);
  };

  const disputesTableColumns = [
    {
      name: "Order No",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.age,
      sortable: true,
      hide: 370,
    },
    {
      name: "Customer",
      selector: (row) => row.startDate,
      sortable: true,
      hide: "md",
    },
    {
      name: "Grand Total",
      selector: (row) => row.gender,
      sortable: true,
      hide: "sm",
    },
    
    {
      name: "Payment",
      selector: (row) => row.salary1,
      sortable: true,
      hide: "md",
    },
    {
      name: "Status",
      selector: (row) => row.sam,
      sortable: true,
      hide: "md",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
        <DropdownItem
            tag="a" href="#dropdown"
            onClick={(ev) => {
              ev.preventDefault();
              handleButtonClick(row.id);
            }}
          >
            <Icon name="edit"></Icon>
          </DropdownItem>
        <DropdownItem
            tag="a" href="#dropdown"
            onClick={(ev) => {
              ev.preventDefault();
              handleButtonClick(row.id);
            }}
          >
            <Icon name="eye"></Icon>
          </DropdownItem>
          <DropdownItem
            tag="a" href="#dropdown"
            onClick={(ev) => {
              ev.preventDefault();
              handleButtonClick(row.id);
            }}
          >
            <Icon name="trash"></Icon>
          </DropdownItem>
        </>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  const order = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          {/* <BlockHead size="lg" wide="sm"></BlockHead> */}

          <Block size="lg">
            <PreviewCard>
              <ReactDataTable
                data={DisputesTableData2s11}
                columns={disputesTableColumnsdd}
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
  const order1 = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          {/* <BlockHead size="lg" wide="sm"></BlockHead> */}

          <Block size="lg">
            <PreviewCard>
              <ReactDataTable
                data={DisputesTableDataod1}
                columns={disputesTableColumnsdd1}
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
  
  const order2 = () => {
    return (
      <React.Fragment>
        <Head title="Disputes Table" />
        <Content page="component">
          {/* <BlockHead size="lg" wide="sm"></BlockHead> */}

          <Block size="lg">
            <PreviewCard>
              <ReactDataTable
                data={DisputesTableData}
                columns={disputesTableColumns}
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

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };
  return (
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title"> Products </h6>
          </div>
          <div className="card-tools">
            <p><a href="#">View All Products</a></p>
          </div>
        </div>
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
                    Top Selling Products
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Featured Products
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#stared"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Latest Products
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#stared"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    Top Rated Products
                  </a>
                </li>
              </ul>
            </div>

            <Simplebar className="nk-msg-list">{tabData}</Simplebar>
          </div>
        </div>
      </ContentAlt>
    </React.Fragment>
      </div>
      
    </Card>
    
  );
};



export default ShippingList;
