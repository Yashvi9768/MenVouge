import React from 'react'
import './ItemBrand.css'
import { Link } from 'react-router-dom'

const ItemBrand = (props) => {
  return (
    <div className='item-brand'>
      <Link to={`/brands/${props.brand}`}>
      <img src={props.image} alt="" />
      </Link>
    </div>
  )
}

export default ItemBrand