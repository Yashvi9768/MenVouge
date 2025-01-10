import React from 'react';
import './ItemCat.css';
import { Link } from 'react-router-dom';

const ItemCat = (props) => {
    return (
        <div className='item-cat'>
            <Link to={`/categories/${props.category}`}>
                <img src={props.image} alt={props.name} style={{ borderRadius: '60px' }} />
            </Link>
            <p className="item-cat-name">{props.name}</p>
        </div>
    );
};

export default ItemCat;
