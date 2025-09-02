import React, { useState } from "react";
import Cookies from "js-cookie";
import{useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";


const Home = () => {
const port = import.meta.env.VITE_API_URL;
const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: ""
  });

  const [files, setFiles] = useState({
    image: null,
    pancard: null,
    addharcard: null
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selected } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selected[0] }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const res = await fetch(`${port}/api/createuser`, {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();

      if (data.success) {
        Cookies.set("token", data.token, { expires: 1 });

         toast.success("User created successfully!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(()=>{
          navigate("/login")
        },1000)

      } else {
        setMessage(data.message || "Registration failed!");
      }

      setForm({
        name: "",
        email: "",
        password: "",
        contact: "",
        address: ""
      });
      setFiles({
        image: null,
        pancard: null,
        addharcard: null
      });
    } catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <h1>Create Account</h1>

        <label htmlFor="name">Name: </label>
        <input id="name" name="name" value={form.name} type="text" onChange={handleChange} /><br /><br />

        <label htmlFor="email">Email: </label>
        <input id="email" name="email" value={form.email} type="text" onChange={handleChange} /><br /><br />

        <label htmlFor="password">Password: </label>
        <input id="password" name="password" value={form.password} type="password" onChange={handleChange} /><br /><br />

        <label htmlFor="contact">Contact: </label>
        <input id="contact" name="contact" value={form.contact} type="text" onChange={handleChange} /><br /><br />

        <label htmlFor="address">Address: </label>
        <input id="address" name="address" value={form.address} type="text" onChange={handleChange} /><br /><br />

        <label htmlFor="image">Image: </label>
        <input id="image" name="image" type="file" onChange={handleFileChange} /><br /><br />

        <label htmlFor="pancard">Pancard: </label>
        <input id="pancard" name="pancard" type="file" onChange={handleFileChange} /><br /><br />

        <label htmlFor="addharcard">Addharcard: </label>
        <input id="addharcard" name="addharcard" type="file" onChange={handleFileChange} /><br /><br />

        <button type="submit">Save</button>
      </form>

      <p>{message}</p>
      <ToastContainer/>
    </div>
  );
};

export default Home;
