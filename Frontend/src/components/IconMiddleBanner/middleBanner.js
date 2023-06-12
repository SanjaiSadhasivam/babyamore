import React from 'react'

/**---------------------------------Assets------------------------------------------- */
import image1 from '../../assets/images/icons/delivery.png'
import image2 from '../../assets/images/icons/customer-service.png'
import image3 from '../../assets/images/icons/rewards.png'
import image4 from '../../assets/images/icons/shopping.png'

/**---------------------------------Pages-------------------------------------------- */
import './middleBanner.css'

const MiddleBanner = () => {
    //content data
    const data = [
        {
            image: image1,
            desc: "Free delivery for ₹2000+"
        },
        {
            image: image3,
            desc: "Earn rewards"
        },
        {
            image: image4,
            desc: "Secure shopping"
        },
        {
            image: image2,
            desc: "Empathetic customer support"
        },

    ]
    return (
        <>
            <div className="middleBanner_section">
                <div className="container">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        {/* <div class="call_to_action"> */}
                        <div className="row">
                            {data.map((icon) => (
                                <div className="col-md-3 col-sm-3 col-xs-3">
                                    <div className="icon_banner_card last_single_call">
                                        <img src={icon.image} alt='IMG' />
                                        <p style={{ fontSize: '16px' }}>{icon.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* </div> */}
                    </div>

                </div>

            </div>
            <div className="icon_bottom_section">
                <div className="container-fluid">
                    <h4>Need help? Call our support team at <strong>+91 96976 12222</strong></h4>
                </div>
            </div>
        </>
    )
}

export default MiddleBanner