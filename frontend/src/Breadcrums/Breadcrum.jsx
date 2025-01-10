import React from 'react'
import './Breadcrum.css'
import arrow from '../Admin/Dashbord/assets/arrow.png'

const Breadcrum = (props) =>{
    const {product} = props;
  return (
    <div className='breadcrum'>
      HOME <img src={arrow} alt=""/> SHOP<img src={arrow} alt=""/> {product.name}
    </div>
  )
}

export default Breadcrum
