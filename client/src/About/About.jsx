import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Store/Auth';
import "../About/About.css"


const About = () => {

  const { user } = useContext(AuthContext);


  return (
    <>
      <div className='section section-about'>
        <div className="about">
        <h1>Welcome, {user ? `${user.name}` : `guest`}</h1>
        <NavLink to="/product"><button className='btn'>Go To Store</button></NavLink>
        </div>
      </div>

    </>
  )
}

export default About;

