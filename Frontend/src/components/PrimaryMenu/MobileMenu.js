import React, { useState } from 'react';

/**---------------------------------Packages----------------------------------------- */
import { Link } from 'react-router-dom';

/**---------------------------------Icons----------------------------------------- */
import { IoReorderThreeOutline } from 'react-icons/io5';

/**---------------------------------Pages----------------------------------------- */
import './menu.css'

const MobileMenu = () => {

  //toogle state
  const [toggle, setToggle] = useState(false)

  return (
    // TODO - Mobile view Development remaing here
    <div className="mobile-menu clearfix visible-xs visible-sm">
      <IoReorderThreeOutline onClick={() => { setToggle(!toggle) }} />
    
    </div>
  );
};

export default MobileMenu;
