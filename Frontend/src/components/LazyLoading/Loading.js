import React, { useEffect, useState } from 'react';
import "./loading.css";

const Loading = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setShowLoading(false)
    }, 5000)
  }, [])

  return (
    <div> <div className='d-flex align-items-center justify-content-center'>
      { 
        showLoading ?
          <>
           
              <div class="lds-heart"><div></div></div>
           
          </> :
          <>
            <h5 className="pt-5">No records found</h5>
          </> 
      }</div>
    </div>
  )
}

export default Loading