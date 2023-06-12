import React from 'react'
import {  useLocation,useParams } from "react-router-dom";
const OrderComplete = () => {
 
  const {name} = useParams();
  // const {id} =state;
  // console.log("params",name);
  return (
    <div>

      <div className='order-page-card'>
      <div class="success-card">
      <div>
      <div class="main-container">
	<div class="check-container">
		<div class="check-background">
			<svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
		<div class="check-shadow"></div>
	</div>
</div>


      </div>
        <h1 className='success-text'>{name}</h1> 
        
      </div>
      </div>
    
    </div>
  )
}

export default OrderComplete