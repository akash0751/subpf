import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast } from 'react-toastify';
import '../styles/Auth.css'
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false)
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    try {
      const response = await loginUser(formData);
      const token = response.data.token;
        localStorage.setItem("token", token); 
        localStorage.setItem("apiKey", response.data.apiKey);  
        console.log(token)
        console.log(response.data.apiKey)
      toast.success('Login successful!');
  setTimeout(() => navigate('/'), 1000);
      // Navigate to dashboard or homepage
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card shadow-lg p-4">
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="toast.sucess toast.sucess-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" required onChange={handleChange} />
          </div>
          <button
  type="submit"
  className="btn btn-primary"
  disabled={loading}
  style={{ minWidth: '120px' }}
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Logging in...
    </>
  ) : (
    "Login"
  )}
</button>

          <p className="mt-3 text-center">
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
