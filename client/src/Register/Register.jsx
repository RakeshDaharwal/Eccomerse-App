import React, { useContext, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../Store/Auth';
import { NavLink } from 'react-router-dom';
import "../Register/Register.css"


const Register = () => {
  const nav = useNavigate();
  const { storeToken } = useContext(AuthContext)

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { name, email, password } = user;
      await axios.post("http://localhost:4000/auth/register", {
        name: name,
        email: email,
        password: password
      }).then((res) => {
        console.log(res.data)
        if (res.status == 201) {
          alert("user register sucessful")

          // send token in the local storage 

          storeToken(res.data.token);

          //  localStorage.setItem("token",res.data.token)

          setUser({ name: "", email: "", password: "", cpassword: "" });
          nav("/about")
          window.location.reload();

        }
      }).catch(() => {
        console.log("register failed")
        alert("user register failed")
        setUser({ name: "", email: "", password: "", cpassword: "" });
      })
      
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <div className="register-section">
        <NavLink to="/"><ion-icon name="home"></ion-icon></NavLink>
        <div className="register-box">
          <h1 style={{ color: "blue" }}>Sign Up</h1>
          <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor="">Name:</label>
            <input type="name" placeholder='Enter Name' name='name' value={user.name} required autoComplete="off" onChange={handleChange} />
            <label htmlFor="">Email:</label>
            <input type="email" placeholder='Enter Email' name='email' value={user.email} required autoComplete="off" onChange={handleChange} />
            <label htmlFor="">Password:</label>
            <input type="password" placeholder='Enter Password' name='password' value={user.password} required autoComplete="off" onChange={handleChange} />
            <input className='register-btn' type="submit" value="Sign Up" />
          </form>
          <p>Already Have An Account ? <span style={{ color: "blue" }}><NavLink to="/login">Login</NavLink></span></p>
        </div>
      </div>
    </>

  )
}

export default Register;