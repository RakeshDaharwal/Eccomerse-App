import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState("")
  


  const storeToken = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("token", serverToken)
  }


  // LOGOUT CODE 

  const logoutUser = () => {
    setToken("")
    return localStorage.removeItem("token");
  }

  // agar token hai toh true aur agar nahi hai toh false 

  const isLoggedIn = !!token;
  // console.log(isLoggedIn)



  // JWT AUTHENTICATION - to get the  login user data 


  const userAuthentication = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      // console.log(data.userData)
      setUser(data.userData)

    }
    catch (err) {
      console.log(err)
    }
  };


  useEffect(() => {
    userAuthentication();
  }, [])



  return <AuthContext.Provider value={{ isLoggedIn, storeToken, logoutUser, user }}>
    {children}
  </AuthContext.Provider>
}















