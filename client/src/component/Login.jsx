import React, { useState } from "react";
import Cookies from "js-cookie";
import{useNavigate} from "react-router-dom"

const Login = () => {
  const port = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${port}/api/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        Cookies.set("token", data.token, { expires: 1 });
        setMessage("Login successful!");

      } else {
        setMessage(data.message || "Login failed!");

        setTimeout(()=>{
        navigate("/")
      },1500);
      
      }
    
    } catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
      
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="username"
            required
          />
        </div><br/><br/>

    
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div><br/><br/>

   
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div><br/><br/>

      
        <button type="submit">Login</button><br/>
      </form>

      {message && <p>{message}</p>}<br/>


      <p>
        Don’t have an account? <a href="/">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;