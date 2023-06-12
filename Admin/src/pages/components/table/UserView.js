import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Icon from "../../../components/icon/Icon";
import classnames from "classnames";

import { Nav, NavItem, NavLink, Button, TabContent, TabPane, Card } from "reactstrap";
// import { BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo} from "../../../components/block/Block";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,


    Row,
    Col,
    BlockBetween,

} from "../../../components/Component";
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";

import axios from "axios";
import { API_URL } from "../../../Api";
import { useHistory } from "react-router-dom";

const API_Vendor = `${API_URL}/UserVendor`

const UserView = ({ ...props }) => {

    const [activeIconTab, setActiveIconTab] = useState("1");

    const history = useHistory()

    const [TokenIds, setTokenIds] = useState();
    const [userData, setUserData] = useState();

    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    };

    const selectTab = useCallback((count) => {
        setActiveIconTab(count);
    }, []);

    useEffect(() => {
        const ids = localStorage.getItem('MerchantView');
        if (ids) {
            setTokenIds(ids)
            GetProfile(ids)
        }
    }, []);

    const GetProfile = async (ids) => {
        const datas = await axios.get(`${API_Vendor}/${ids}`)
        setUserData(datas.data)
    }

    const handleBack = () => {
        localStorage.removeItem('MerchantView');
        history.push(`/dashboard/merchant-list`)
    }


    return (
        <React.Fragment>
            <Head title="Profile" />
            <Content page="component">
                {/* <Button className="toggle d-none d-md-inline-flex" type="button" color="primary"
                    style={{ marginBottom: '10px' }} onClick={handleBack}>
                    <Icon name="arrow"></Icon>
                    Back to Vendor List
                </Button> */}
                <Block size="lg">
                    <PreviewCard>
                        <Nav tabs >
                            <NavItem>
                                <NavLink
                                    tag="a"
                                    href="#tab"
                                    className={classnames({ active: activeIconTab === "1" })}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        toggleIconTab("1");
                                    }}
                                >
                                    {/* <Icon name="eye" />  */}
                                    <span>My Profile</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {/* <NavLink
                                    tag="a"
                                    href="#tab"
                                    className={classnames({ active: activeIconTab === "2" })}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        toggleIconTab("2");
                                    }}
                                >
                                    {/* <Icon name="user" />  */}
                                    {/* <span>My Order</span>
                                </NavLink> */} 
                            </NavItem>
                            <NavItem>
                                {/* <NavLink
                                    tag="a"
                                    href="#tab"
                                    className={classnames({ active: activeIconTab === "3" })}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        toggleIconTab("3");
                                    }}
                                >
                                    {/* <Icon name="building" />  */}
                                    {/* <span>Cart</span>
                                </NavLink> */} 
                            </NavItem>
                            <NavItem>
                                {/* <NavLink
                                    tag="a"
                                    href="#tab"
                                    className={classnames({ active: activeIconTab === "4" })}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        toggleIconTab("4");
                                    }}
                                >
                                    {/* <Icon name="wallet-saving" />  */}
                                   {/* <span>Reward Points</span>
                                </NavLink> */}
                            </NavItem>
                        </Nav>
                    </PreviewCard>
                    <PreviewCard>
                        <TabContent activeTab={activeIconTab}>

                            <TabPane tabId="1">
                                {/* <Overview Tokenid={TokenIds} getTab={selectTab} /> */}
                                <Row>
                                    <Col md={4}>
                                        <Card>
                                            <Row >
                                                <Col md={12} className="text-center p-2">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4HPhCDx7WOqJfxuqh96TLbdaTUG024xXvw&usqp=CAU" style={{ borderRadius: '50%', height: '150px', width: '150px', justifyContent: 'center' }}></img>
                                                    {/*<img src={`${API_View}/${userDetail.Logo}`} style={{ borderRadius: '50%',height:'150px',width:'150px' ,justifyContent:'center'}}></img>*/}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                    <Col md={8}>

                                        <div className="row">
                                            <div className="col-md-12 dynami-details">

                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <p class="font-weight-bold">Firest Name :</p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className="text-capitalize">Leo</p>
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <p className="font-weight-bold">Last Name:</p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className="text-capitalize">Smith</p>
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <p className="font-weight-bold">User Name:</p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>Leo Smith</p>
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <p className="font-weight-bold">Display Name:</p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className="text-capitalize">Leo</p>
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <p className="font-weight-bold">Email :</p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className="text-capitalize">Leo@gmail.com</p>
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <p className="font-weight-bold">Mobile Number :</p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p className="text-capitalize">8160432754</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </TabPane>
                            <TabPane tabId="2">
                                {/* <BasicInfo getTab={selectTab} userDetail={userData} /> */}
                            </TabPane>
                            <TabPane tabId="3">
                                {/* <Company getTab={selectTab} /> */}
                            </TabPane>
                            <TabPane tabId="4">
                                {/* <Bank getTab={selectTab} /> */}
                            </TabPane>

                        </TabContent>
                    </PreviewCard>

                </Block>





            </Content>
        </React.Fragment>
    );
};

export default UserView;
