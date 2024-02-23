import React, { useState } from 'react'
import axios from "axios"
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import "../Login/Login.css"

const Login = () => {

  const nav = useNavigate()

  const [user, setUser] = useState({
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
      const { email, password } = user;
      await axios.post("http://localhost:4000/auth/login", {
        email: email,
        password: password
      }).then((res) => {
        console.log(res.data)
        setUser({ email: "", password: "" })
        if (res.status == 201) {

          // send token in the local storage 

          localStorage.setItem("token", res.data.token)

          nav("/about")
          window.location.reload();

        }
      }).catch(() => {
        alert("Login failed")
        setUser({ email: "", password: "" });
      })

      console.log(user)

    } catch (err) {
      console.log(err)
    }
  };


  return (
    <>
      <div className="login-section">
        <NavLink to="/"><ion-icon name="home"></ion-icon></NavLink>
        <div className="login-box">
          <h1 style={{ color: "blue" }}>LOGIN</h1>
          <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor="">Email:</label>
            <input type="email" placeholder='Enter Email' name='email' value={user.email} required autoComplete="off" onChange={handleChange} />
            <label htmlFor="">Password:</label>
            <input type="password" placeholder='Enter Password' name='password' value={user.password} required autoComplete="off" onChange={handleChange} />
            <input className='login-btn' type="submit" value="Login" />
          </form>
          <p>Dont Have An Account ? <span style={{ color: "blue" }}><NavLink to="/register">Sign Up</NavLink></span></p>
        </div>
      </div>
    </>
  )
};


export default Login;








