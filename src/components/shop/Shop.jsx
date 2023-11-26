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
        const savedCart = [];
        // step 1: get id
        for( const id in storedCart){
            // step 2: get the product by using id
            const addedProducts = products.find(product => product.id === id);
            
            if(addedProducts){
                // step 3: get the quantity o the product 
                const quantity = storedCart[id]
                addedProducts.quantity = quantity
                
                // step 4: add the added product to the saved cart
                savedCart.push(addedProducts);
            }
            // console.log(addedProducts)
        }
        // step 5: set the cart
        setCart(savedCart)
    },[products])



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