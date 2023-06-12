import React from 'react';

/**---------------------------------Packages----------------------------------------- */
import { Link } from 'react-router-dom';

/**---------------------------------Pages-------------------------------------------- */
import './socialIcon.css'


export const SocialIcon = () => {
    return (
        <div className='mx-auto d-flex justify-content-center mt-2'>
            <div class="social-icons">
                <Link to='/' class="social-icon social-icon--facebook">
                    <i class="fa fa-facebook"></i>
                    <div class="tooltip">Facebook</div>
                </Link>
                <Link to='/' class="social-icon social-icon--instagram">
                    <i class="fa fa-instagram"></i>
                    <div class="tooltip">Instagram</div>
                </Link>
                <Link to='/' class="social-icon social-icon--twitter">
                    <i class="fa fa-twitter"></i>
                    <div class="tooltip">Twitter</div>
                </Link>
                <Link to='/' class="social-icon social-icon--youtube">
                    <i class="fa fa-youtube"></i>
                    <div class="tooltip">Youtube</div>
                </Link>
            </div>
        </div>
    )
}
