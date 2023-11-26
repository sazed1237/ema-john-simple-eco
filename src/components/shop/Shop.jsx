// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import './Shop.css'
import { useEffect } from 'react';
import Product from '../Product-item/Product-item';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    
    
    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect( () => {
        const storedCart = getShoppingCart();
        console.log(storedCart)
    },[])



    const handleAddToCart = (product) =>{
        // console.log(product)
        const newCart  = [...cart, product]
        setCart(newCart)
        addToDb(product.id)
    }


    return (
        <div className="shop-container">
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product = {product}

                        handleAddToCart = {handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="orders-summary">
                <Cart cart ={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;