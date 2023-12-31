// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import './Shop.css'
import { useEffect } from 'react';
import Product from '../Product-item/Product-item';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



const Shop = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])


    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id
        for (const id in storedCart) {
            // step 2: get the product by using id
            const addedProducts = products.find(product => product.id === id);

            if (addedProducts) {
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
    }, [products])



    const handleAddToCart = (product) => {
        // console.log(product)

        let newCart = []
        // const newCart  = [...cart, product]
        // if product doesn't exist in the cart, then set quantity = 1;
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }

        setCart(newCart)
        addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className="shop-container">
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}

                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="orders-summary">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link to={'/orders'}>
                        <button className='btn-review-order'>
                            <span>Review Order</span>
                            <FontAwesomeIcon className='btn-clear-delete-icon' icon={faLongArrowAltRight} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;