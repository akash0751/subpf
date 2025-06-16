import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      
      <NavBar />
      <div className="container d-flex flex-column align-items-center justify-content-center py-5">
        <h2 className="mb-4">Project Guide</h2>
        <div className="d-grid gap-3 col-6 mx-auto">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/add-project")}
          >
            Add Project
          </button>
          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate("/view-project")}
          >
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
