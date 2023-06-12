import React, { useEffect, useState } from "react";
// import {RSelect, Icon } from "../../../components/Component";
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { API_URL, API_Reward, token } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const PointsSettings = () => {
    const { errors, register, handleSubmit } = useForm();
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked22, setIsChecked22] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    const handleOnChange1 = (event) => {
        setIsChecked1(event.target.checked);
        // console.log("checkbox1", event.target.checked)
    };

    const handleOnChange22 = (event) => {
        setIsChecked22(event.target.checked);
        // console.log("checkbox22", event.target.checked)
    };

    const handleOnChange3 = (event) => {
        setIsChecked3(event.target.checked);
        // console.log("checkbox3", event.target.checked)
    };
    const [Reward, setReward] = useState({
        id: "",
        // purchase_amt: "",
        reward_point: "",
        reward_amt: "",
        // expiry_date:""
        // Order: "",
        // LinkUrl: "",
        // Status: 1
      });
      useEffect(() => {
        // const ids = localStorage.getItem("MerchantView");
        Getdata();
      }, []);
     
     
      const Edit = (ID) => {
        let formData = new FormData();
        // formData.append("purchase_amt", Reward.purchase_amt);
        formData.append("reward_amt", Reward.reward_amt);
        formData.append("reward_point", Reward.reward_point);
        formData.append("expiry_date", datingFromTab);
        const configs = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
       
        axios.put(`${API_Reward}/${ID}`, formData, configs).then((res) => {
          setReward({
            ...Reward,
            id: "",
            // purchase_amt: "",
            reward_amt: "",
            reward_point: "",
            expiry_date:""
            // Order: "",
            // LinkUrl: "",
          });
          Getdata();
          toast.success("Reward Updated Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        
        //   onFormCancel();
        });
        // }
      };
    const [datingFromTab, setdatingFromTab] = useState()
    const dateChangedFrom = (e) => {
        const value = e.target.value
        setdatingFromTab(value)
    }
      const handleChangesss = ({ target: { name, value } }) => {
        setReward({ ...Reward, [name]: value });
      };
      const [data, setData] = useState([]);
      const [ID, setID] = useState("");
      const Getdata = async () => {
        const Result = await axios.get(`${API_Reward}`, config);
        const {reward_amt,reward_point,expiry_date,id}= Result.data.list[0];
        setID(id);
        setReward({
            ...Reward,
            reward_point:reward_point,
            reward_amt:reward_amt,
            // expiry_date:expiry_date,
            // id:ID,
        });
        setdatingFromTab(expiry_date.slice(0,10))
      };
    const [setting, setSettings] = useState({
        purchase: false,
        socialmedia: false,
        referal: false,
        review: false,
        rewardpoints: false
    });

    const ClickCard = (type) => {
        setSettings({
            purchase: type == "purchase" ? true : false,
            socialmedia: type == "socialmedia" ? true : false,
            referal: type == "referal" ? true : false,
            review: type == "review" ? true : false,
            rewardpoints: type == "rewardpoints" ? true : false,
        });
    }
    return (
<React.Fragment>
<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ backgroundColor: "crimson" }}
      />
      <ToastContainer />
        <div style={{ marginTop: "70px" }}>
            <div className="m-5">
                <h5>Reward Types </h5>
                <Row className="mt-3">
                    <Col sm="4">
                        <Card className="p-4 text-center" onClick={() => ClickCard("purchase")} style={{ cursor: "pointer" }}>
                            {/* <div className="col-sm-3 p-4 m-5 bg-white text-center"> */}
                            Purchase
                            {/* </div> */}
                        </Card>
                    </Col>
                    {/* <Col sm="4">
                        <Card className="p-4 text-center" onClick={() => ClickCard("socialmedia")} style={{ cursor: "pointer" }}>
                            Social Media
                        </Card>
                    </Col> */}
                    {/* <Col sm="4">
                        <Card className="p-4 text-center" onClick={() => ClickCard("referal")} style={{ cursor: "pointer" }}>
                            Referal
                        </Card>
                    </Col> */}
                    {/* <Col sm="4 mt-4">
                        <Card className="p-4 text-center" onClick={() => ClickCard("review")} style={{ cursor: "pointer" }}>
                            Review
                        </Card>
                    </Col> */}
                    <Col sm="4">
                        <Card className="p-4 text-center" onClick={() => ClickCard("rewardpoints")} style={{ cursor: "pointer" }}>
                            {/* <div className="col-sm-3 p-4 m-5 bg-white text-center"> */}
                            Reward Points
                            {/* </div> */}
                        </Card>
                    </Col>
                    {/* <Col md="3" className="bg-white p-4 m-5 text-center" onClick={() => EditTable()}>
                        Social Media
                    </Col>
                    <Col md="3" className="bg-white p-4 m-5 text-center">
                        Referal
                    </Col>
                    <Col md="3" className="bg-white p-4 m-5 text-center">
                        Review
                    </Col>
                    <Col md="3" className="bg-white p-4 m-5 text-center">
                        Reward Points Value
                    </Col> */}
                </Row>
            </div>

            {
                setting.purchase ?
                    <>
                        <Row className="m-5 bg-white p-4">
                            <Col sm="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="purchase">
                                        No of Percentage
                                    </label>
                                    <div className="form-control-wrap">
                                    <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the reward_point"
                            name="reward_point"
                            value={Reward.reward_point}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}

                                    </div>
                                </div>
                            </Col>
                            <Col sm="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="expirydate">
                                        Expiry Date
                                    </label>
                                    <div className="form-control-wrap">
                                    <input
                            type="DATE"
                            className="form-control"
                            placeholder="Enter the reward_point"
                            name="expiry_date"
                            value={datingFromTab}
                            onChange={dateChangedFrom}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}

                                    </div>
                                </div>
                            </Col>

                            {/* <Col sm="12" className="mt-4">
                                <Row>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">

                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck1" checked={isChecked1} onChange={(e) => handleOnChange1(e)} />

                                                        <label className="custom-control-label" htmlFor="customCheck1">
                                                            Reward points cannot be used alongside with coupons
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="4">

                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input form-control" id="customCheck2" name="Usage" checked={isChecked22} onChange={handleOnChange22} />
                                            <label className="custom-control-label" htmlFor="customCheck2">
                                                Points cannot be redeemed on an item that are on sale
                                            </label>
                                        </div>

                                    </Col>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck3" name="Usage" checked={isChecked3} onChange={handleOnChange3} />
                                                        <label className="custom-control-label" htmlFor="customCheck3">
                                                            Reward points are not issued for purchasing sale items
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col> */}

                            <Col size="12" className="d-flex justify-content-end mt-4">
                                {/* <Button color="primary" type="submit" onClick={Edit}>
                                    UPDATE
                                </Button> */}
                            </Col>
                        </Row>
                    </>
                    :
                    <>

                    </>
            }

            {/* {
                setting.socialmedia ?
                    <>
                        <Row className="m-5 bg-white p-4">
                            <Col sm="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="purchase">
                                        Reward Points for each share
                                    </label>
                                    <div className="form-control-wrap">
                                        <input
                                            id="purchase"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Reward Points"
                                        // name="CategorySlug"
                                        // ref={register({ required: "This is required" })}
                                        // value={MainCategory.CategorySlug}
                                        // onChange={handleChangemainCate}
                                        />

                                    </div>
                                </div>
                            </Col>

                            <Col sm="12" className="mt-4">
                                <Row>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">

                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck1" checked={isChecked1} onChange={(e) => handleOnChange1(e)} />

                                                        <label className="custom-control-label" htmlFor="customCheck1">
                                                            Reward points cannot be used alongside with coupons
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="4">

                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input form-control" id="customCheck2" name="Usage" checked={isChecked22} onChange={handleOnChange22} />
                                            <label className="custom-control-label" htmlFor="customCheck2">
                                                Points cannot be redeemed on an item that are on sale
                                            </label>
                                        </div>

                                    </Col>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck3" name="Usage" checked={isChecked3} onChange={handleOnChange3} />
                                                        <label className="custom-control-label" htmlFor="customCheck3">
                                                            Reward points are not issued for purchasing sale items
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size="12" className="d-flex justify-content-end mt-4">
                                <Button color="primary" type="submit">
                                    UPDATE
                                </Button>
                            </Col>
                        </Row>
                    </>
                    :
                    <>

                    </>
            } */}

            {/* {
                setting.referal ?
                    <>
                        <Row className="m-5 bg-white p-4">
                            <Col sm="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="purchase">
                                        Reward Points for each referal
                                    </label>
                                    <div className="form-control-wrap">
                                        <input
                                            id="purchase"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Reward Points"
                                        // name="CategorySlug"
                                        // ref={register({ required: "This is required" })}
                                        // value={MainCategory.CategorySlug}
                                        // onChange={handleChangemainCate}
                                        />

                                    </div>
                                </div>
                            </Col>

                            <Col sm="12" className="mt-4">
                                <Row>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">

                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck1" checked={isChecked1} onChange={(e) => handleOnChange1(e)} />

                                                        <label className="custom-control-label" htmlFor="customCheck1">
                                                            Reward points cannot be used alongside with coupons
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="4">

                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input form-control" id="customCheck2" name="Usage" checked={isChecked22} onChange={handleOnChange22} />
                                            <label className="custom-control-label" htmlFor="customCheck2">
                                                Points cannot be redeemed on an item that are on sale
                                            </label>
                                        </div>

                                    </Col>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck3" name="Usage" checked={isChecked3} onChange={handleOnChange3} />
                                                        <label className="custom-control-label" htmlFor="customCheck3">
                                                            Reward points are not issued for purchasing sale items
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size="12" className="d-flex justify-content-end mt-4">
                                <Button color="primary" type="submit">
                                    UPDATE
                                </Button>
                            </Col>
                        </Row>
                    </>
                    :
                    <>

                    </>
            } */}

            {/* {
                setting.review ?
                    <>
                        <Row className="m-5 bg-white p-4">
                            <Col sm="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="purchase">
                                        Reward Points for each review
                                    </label>
                                    <div className="form-control-wrap">
                                        <input
                                            id="purchase"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Reward Points"
                                        // name="CategorySlug"
                                        // ref={register({ required: "This is required" })}
                                        // value={MainCategory.CategorySlug}
                                        // onChange={handleChangemainCate}
                                        />

                                    </div>
                                </div>
                            </Col>

                            <Col sm="12" className="mt-4">
                                <Row>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">

                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck1" checked={isChecked1} onChange={(e) => handleOnChange1(e)} />

                                                        <label className="custom-control-label" htmlFor="customCheck1">
                                                            Reward points cannot be used alongside with coupons
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="4">

                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input form-control" id="customCheck2" name="Usage" checked={isChecked22} onChange={handleOnChange22} />
                                            <label className="custom-control-label" htmlFor="customCheck2">
                                                Points cannot be redeemed on an item that are on sale
                                            </label>
                                        </div>

                                    </Col>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck3" name="Usage" checked={isChecked3} onChange={handleOnChange3} />
                                                        <label className="custom-control-label" htmlFor="customCheck3">
                                                            Reward points are not issued for purchasing sale items
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size="12" className="d-flex justify-content-end mt-4">
                                <Button color="primary" type="submit">
                                    UPDATE
                                </Button>
                            </Col>
                        </Row>
                    </>
                    :
                    <>

                    </>
            } */}

            {
                setting.rewardpoints ?
                    <>
                        <Row className="m-5 bg-white p-4">
                            <Col sm="4">
                                {/* <Row>
                                    <Col sm="4">
                                        1 Reward Points :
                                    </Col>
                                    <Col sm="4">
                                        <input
                                            id="purchase"
                                            type="text"
                                            className="form-control"
                                            placeholder="1 Reward Points"
                                        // name="CategorySlug"
                                        // ref={register({ required: "This is required" })}
                                        // value={MainCategory.CategorySlug}
                                        // onChange={handleChangemainCate}
                                        />
                                    </Col>
                                    <Col sm="2">
                                    Rupees
                                    </Col>
                                </Row> */}
                                <div className="form-group">
                                    <label className="form-label" htmlFor="purchase">
                                        1 Reward Points
                                    </label>
                                    <div className="form-control-wrap">
                                    <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the reward_amt"
                            name="reward_amt"
                            value={Reward.reward_amt}
                            onChange={handleChangesss}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                                       

                                    </div>
                                    
                                </div>
                                {/* <span>Rupees</span> */}
                            </Col>

                            {/* <Col sm="12" className="mt-4">
                                <Row>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">

                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck1" checked={isChecked1} onChange={(e) => handleOnChange1(e)} />

                                                        <label className="custom-control-label" htmlFor="customCheck1">
                                                            Reward points cannot be used alongside with coupons
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md="4">

                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input form-control" id="customCheck2" name="Usage" checked={isChecked22} onChange={handleOnChange22} />
                                            <label className="custom-control-label" htmlFor="customCheck2">
                                                Points cannot be redeemed on an item that are on sale
                                            </label>
                                        </div>

                                    </Col>
                                    <Col md="4">
                                        <div className="preview-block">
                                            <div className="g-3 align-center flex-wrap">
                                                <div className="g">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input form-control" id="customCheck3" name="Usage" checked={isChecked3} onChange={handleOnChange3} />
                                                        <label className="custom-control-label" htmlFor="customCheck3">
                                                            Reward points are not issued for purchasing sale items
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col> */}

                            <Col size="12" className="d-flex justify-content-end mt-4">
                            <Button color="primary" type="submit" onClick={()=>Edit(ID)}>
                                    UPDATE
                                </Button>
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                        {/* rewardpoints error */}
                    </>
            }
        </div>
        </React.Fragment>
    )
    
};

export default PointsSettings;
