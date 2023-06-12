import React from 'react'

/**---------------------------------Packages----------------------------------------- */
import { Link } from 'react-router-dom'

/**---------------------------------Pages-------------------------------------------- */
import './tellUs.css'

const TellUs = () => {
    return (
        <div className="tellUs_section">
            <div className="container-fluid">
                <h2 style={{ marginBottom: 40,fontSize:'26px' }}>Have a product suggestion?</h2>
                <Link to="/" style={{ marginBottom: 40,fontSize:'20px' }}>Tell us here</Link>
            </div>
        </div>

    )
}

export default TellUs