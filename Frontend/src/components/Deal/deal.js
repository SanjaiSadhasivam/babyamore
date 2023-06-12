import React, { useEffect, useState, } from 'react';

/**---------------------------------Assets------------------------------------------- */
import image1 from '../../assets/images/deals/Aveeno-20-off-mini-banner.jpg';
import image2 from '../../assets/images/deals/Nuvita-Big-Slide.jpg';
import image3 from '../../assets/images/deals/Spectra-Big-Slide-717x400.jpg';

/**---------------------------------Packages----------------------------------------- */
import { Link } from "react-router-dom";

/**---------------------------------Pages-------------------------------------------- */
import './deal.css';

/**---------------------------------Icons-------------------------------------------- */
import { AiOutlineHeart } from 'react-icons/ai';
import { MdChevronRight } from 'react-icons/md';
import EveryNeeds from '../EveryNeed/everyNeeds';
import axios from "axios";
import { API_URL, token, API_Home_Page_Section, API_Product } from "../../config/config";
const API_homepagesection_image = `${API_URL}/homepagesection_image`;
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const Deal = () => {

    const [data, setData] = useState([]);
    // const [showModal, setShowModal] = useState(false);
    //image data 
    // const deal = [
    //     {
    //         image: image3
    //     },
    //     {
    //         image: image1
    //     },
    //     {
    //         image: image2
    //     },
    // ]

    useEffect(() => {
        Getdata();
        // GetProduct();
    }, []);

    const Getdata = async () => {
        const Result = await axios.get(`${API_Home_Page_Section}`, config);
      
        // if(Result.data.list.length > 0){
        //     Result.data.list.map((items)=>{
        //         console.log("yy",items)
        //         var ATT=[];
        //         items.product_id.map(async(productitems)=>{
        //             if(productitems.value){

        //                 const ResultProduct = await axios.get(`${API_Product}/${productitems.value}`, config);

        //                         ATT.push(ResultProduct.data.list)
        //                             console.log("homepage", ResultProduct.data.list);
        //             }

        //         })
        //         const homepages ={
        //             tittle:items.tittle,
        //             link:items.link,
        //             bannerimagesone:items.bannerimagesone,
        //             bannerimagesthree:items.bannerimagesthree,
        //             bannerimagestwo:items.bannerimagestwo,
        //             bannerlinkone:items.bannerlinkone,
        //             bannerlinktwo:items.bannerlinktwo,
        //             bannerlinkthree:items.bannerlinkthree,
        //             Product : ATT
        //         }

        // // setData((itemshome)=>[...itemshome, homepages]);

        //     })
        // }
        setData(Result.data.list);

    };

    // const setId = async (id) => {
    //     const { data } = await axios.get(`${API_Product}/${id}`, configss);
    //     // console.log("Rendering......", id);
    //     setModalData(data.list);
    //     if (data.list) {
    //         setShowModal(true);
    //     }
    // };

    // const closeModal = () => {
    //     setModalData();
    //     setShowModal(false);
    // };

    return (
        <div className='deal_section'>
            {data.length > 0 ? <>
                {
                    data?.map((homeitems) => {
                        return (
                            <>
                            
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex justify-content-start align-items-center'>
                                        <AiOutlineHeart className=' title_icon' />
                                        <h3 className='section_title'>{homeitems.tittle}</h3>
                                    </div>
                                    {
                                        homeitems.link?
                                        <><div>
                                        <Link to={homeitems.link} title={homeitems.link} className='d-flex justify-content-start align-items-center'><h3 className='see_title'>See all</h3><MdChevronRight className='arrow_icon' /></Link>
                                    </div></>:null
                                    }
                                    
                                </div>
                                {
                                    homeitems.bannerimagesone=="" && (homeitems.bannerimagestwo == "" && homeitems.bannerimagesthree == "" && homeitems.bannerimagesfour == "")?
                                    null :   <> <div style={{ position: 'relative' }}>
                                    <hr className='title_border' />
                                    <hr className='hr_line' />
                                </div></>
                                }
                               


                                <div className={homeitems.bannerimagesone=="" && (homeitems.bannerimagestwo == "" && homeitems.bannerimagesthree == "" && homeitems.bannerimagesfour == "")?"deal_cards":"deal_cards mb-2"}>

                                    {homeitems.bannerimagesone && (homeitems.bannerimagestwo == "" && homeitems.bannerimagesthree == "" && homeitems.bannerimagesfour == "") ?

                                        <>
                                            <div className="row">
                                                <div className='col-md-12 col-12'>
                                                    <a href={homeitems.bannerlinkone} target="_blank">
                                                        <img src={`${API_homepagesection_image}/${homeitems.bannerimagesone}`} className='deal_card_image card_img_col img-fluid' />

                                                    </a>
                                                </div>
                                            </div>
                                        </> : null
                                    }


                                    {homeitems.bannerimagesone && homeitems.bannerimagestwo && homeitems.bannerimagesthree == "" && homeitems.bannerimagesfour == "" ? <>
                                        <div className='row'>
                                            <div className="col-md-6 col-6">
                                                <a href={homeitems.bannerlinkone} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagesone}`} alt='' className='deal_card_image card_img_col img-fluid' />

                                                </a>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <a href={homeitems.bannerlinktwo} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagestwo}`} alt='' className='deal_card_image card_img_col img-fluid' />
                                                </a>
                                            </div>
                                        </div>
                                    </> : null}

                                    {homeitems.bannerimagesone && homeitems.bannerimagestwo && homeitems.bannerimagesthree && homeitems.bannerimagesfour == "" ? <>
                                        <div className='row'>
                                            <div className="col-md-4 col-12 pb-2">
                                                <a href={homeitems.bannerlinkone} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagesone}`} alt='' className='deal_card_image card_img_col img-fluid' />

                                                </a> </div>
                                            <div className="col-md-4 col-12 pb-2">
                                                <a href={homeitems.bannerlinktwo} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagestwo}`} alt='' className='deal_card_image card_img_col img-fluid' />
                                                </a>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <a href={homeitems.bannerlinkthree} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagesthree}`} alt='' className='deal_card_image card_img_col img-fluid' />
                                                </a>
                                            </div>
                                        </div>
                                    </> : null}

                                    {homeitems.bannerimagesone && homeitems.bannerimagestwo && homeitems.bannerimagesthree && homeitems.bannerimagesfour ? <>
                                        <div className='row'>
                                            <div className="col-md-3 col-6 pb-2">
                                                <a href={homeitems.bannerlinkone} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagesone}`} alt='' className='deal_card_image card_img_col img-fluid' />

                                                </a> </div>
                                            <div className="col-md-3 col-6 pb-2">
                                                <a href={homeitems.bannerlinktwo} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagestwo}`} alt='' className='deal_card_image card_img_col img-fluid' />
                                                </a>
                                            </div>
                                            <div className="col-md-3 col-6 pb-2">
                                                <a href={homeitems.bannerlinkthree} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagesthree}`} alt='' className='deal_card_image card_img_col img-fluid' />
                                                </a>
                                            </div>
                                            <div className="col-md-3 col-6 pb-2">
                                                <a href={homeitems.bannerlinkfour} target="_blank">
                                                    <img src={`${API_homepagesection_image}/${homeitems.bannerimagesfour}`} alt='' className='deal_card_image card_img_col img-fluid' />
                                                </a>
                                            </div>
                                        </div>
                                    </> : null}

                                </div>
                                {/* {console.log("homeitems.product_res", homeitems.product_id)} */}
                                <EveryNeeds Product={homeitems.product_res} />
                                <br />
                                {/* <EveryNeeds Product={homeitems.product_id} /> */}
                            </>
                        )
                    })
                }
            </> : null}

            {/* {showModal ? (
                <>
                    <Quickmodel
                        show={showModal}
                        datas={modalData}
                        close={closeModal}
                    />
                </>
            ) : (
                ""
            )} */}

        </div>
    )
}
