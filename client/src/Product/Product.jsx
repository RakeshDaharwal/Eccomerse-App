
import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import axios from "axios";
import "../Product/Product.css"
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Store/Auth';

const Product = () => {

    const { isLoggedIn } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    

    const fecthData = async () => {
        const res = await axios.get("https://fakestoreapi.com/products");
        console.log(res.data)
        setProducts(res.data)
    }

    useEffect(() => {
        fecthData();
    }, []);


    const handleAdd = (a) => {
        console.log(a)
    };


    return (
        <>

            {
                isLoggedIn ? (
                    <>
                        <div className="head">
                            <div className="logo">STORE</div>
                            <ul>
                                <li><NavLink className="nav-links" to="/">Home</NavLink></li>
                                <li><NavLink className="nav-links" to="/cart">Cart</NavLink></li>
                            </ul>
                        </div>
                        <div className='section section-product'>
                            <div className='container grid grid-three-column'>
                                {products.map((curElem) => (
                                    <div className='card' key={curElem.id} >
                                        <img src={curElem.image} alt="" />
                                        <h4>{curElem.title}</h4>
                                        <h3>{curElem.price} $</h3>
                                        <button className='btn' onClick={() => handleAdd(curElem)}>Add To Cart</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>

                ) : (
                    <>
                        <div className="login-first">
                            <h1>Login First</h1>
                            <NavLink to="/login"><button className='btn'>Login</button></NavLink>
                        </div>
                    </>
                )
            }
        </>
    )
};

export default Product;



