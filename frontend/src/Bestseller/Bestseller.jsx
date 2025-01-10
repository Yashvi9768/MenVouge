import React from 'react'
import './Bestseller.css'
import data_product from '../Admin/Dashbord/assets/data'
import Item from '../Item/Item'

const Bestseller = () => {
  return (
    <div className='bestseller'>
      <h1>BESTSELLER</h1>
        <div className='item-img'>
          {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
          })}
        </div>
    </div>
  )
}

export default Bestseller
