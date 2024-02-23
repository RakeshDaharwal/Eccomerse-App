
import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from '../Store/Auth';
import "../Home/Home.css";
import Img from "../Img/Shoping.png"

const Home = () => {

    const { isLoggedIn } = useContext(AuthContext);

    return (
        <>
            <div className="home-section">
                <div className="hero-box">
                    <div className="header">
                        <div className="logo">MERN.</div>
                        <ul>
                            {
                                isLoggedIn ? (
                                    <li><NavLink to="/logout"><button className='btn'>LOGOUT</button></NavLink></li>
                                ) : (
                                    <>
                                        <li><NavLink to="/login"><button className='btn'>LOGIN</button></NavLink></li>
                                        <li><NavLink to="/register"><button className='btn'>SIGNUP</button></NavLink></li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                    <div className="hero-section grid grid-two-columns">
                        <div className="hero-data">
                            <h1>LOOK OUR NEW COLLECTIONS</h1>
                            {
                                isLoggedIn ? (
                                    <NavLink to="/about"><button className='btn'>SHOP NOW</button></NavLink>
                                ) : (
                                    <NavLink to="/login"><button className='btn'>SHOP NOW</button></NavLink>
                                )
                            }
                        </div>
                        <div className="hero-img">
                            <img src={Img} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;