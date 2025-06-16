import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Auth.css";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProject from "./pages/CreateProject";
import ViewProject from "./pages/ViewProject";
import Home from "./pages/Home";

const App = () =>{
  return (
    <>
    <ToastContainer position="top-right" autoClose={1000}/>

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-project" element={<CreateProject />} />
        <Route path="/view-project" element={<ViewProject />} />
        
      </Routes>
    </Router>
    </>
)}

export default App;