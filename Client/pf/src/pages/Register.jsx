import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import '../styles/Auth.css'
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await registerUser(formData);
      if (response.status === 200){
      localStorage.setItem("authToken", response.data.token); 
      localStorage.setItem("apiKey", response.data.apiKey);  
      console.log(response.data.token)
      console.log(response.data.apiKey)
      toast.success("Registration successful!");
      setTimeout(() => navigate('/home'), 2000);
    }} catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card shadow-lg p-4">
        <h3 className="text-center mb-4">Register</h3>
        {error && <div className="toast.sucess toast.sucess-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" name="name" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" required onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
