import React from 'react';
import brand_logo from './Brands-logo';
import ItemBrand from '../../Item/ItemBrand';
import './Brands.css';
import { Link } from 'react-router-dom';

const Brands = () => {
  return (
    <div className="brand">
      {brand_logo.map((item, i) => {
        return (
          <Link key={i} to={`/brands/${item.brand}`}>
            <ItemBrand id={item.id} image={item.image} brand={item.brand} />
          </Link>
        );
      })}
    </div>
  );
};

export default Brands;