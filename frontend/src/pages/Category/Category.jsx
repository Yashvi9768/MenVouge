import React from 'react';
import ItemCat from '../../Item/ItemCat';
import Item from '../../Item/Item';
import { useShopContext } from '../../Context/ShopContext';
import cat_product from '../../Admin/Dashbord/assets/dataset'; 
import './Category.css';

const Category = (props) => {
    const { allProduct } = useShopContext(); // Use the context to get all products
    const selectedCategory = props.category; // Get the selected category from props

    return (
        <div className="category">
            <div className="cat-img">
                {/* Render category images */}
                {cat_product.map((catItem, i) => {
                    return (
                        <ItemCat
                            key={i}
                            category={catItem.category}
                            image={catItem.image}
                            name={catItem.Name}
                        />
                    );
                })}
            </div>
            <div className="shop-pro">
                {allProduct.map((item, i) => {
                    // Filter products based on the selected category
                    if (selectedCategory === item.category) {
                        return (
                            <Item
                                key={i}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

export default Category;
