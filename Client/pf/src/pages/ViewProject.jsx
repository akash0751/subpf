import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import {toast} from 'react-toastify';
import NavBar from '../components/NavBar';

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', tools: '', sourceCode: '', hostLink: '' });
  const [showModal, setShowModal] = useState(false);
 
  const token = localStorage.getItem("token") || localStorage.getItem('authToken');
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id; // Assuming your token payload includes { id, email, ... }

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/get', {
        headers: { "authorization": `Bearer ${token}` },
        withCredentials:true
      });
      // Filter by logged-in user's ID
      const userProjects = res.data.project.filter(project => project.user === userId);
      setProjects(userProjects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`http://localhost:3000/api/delete/${id}`, {
          headers: { "authorization": `Bearer ${token}` },
          withCredentials:true
        });
        fetchProjects();
      } catch{
        toast.error('Login to delete');
      }
    }
  };

  const handleEdit = (project) => {
    setSelected(project);
    setEditData(project);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateProject = async () => {
    try {
      await axios.put(`http://localhost:3000/api/update/${selected._id}`, editData, {
        headers: { "authorization": `Bearer ${token}` },
        withCredentials:true
      });
      toast.success("Project updated!");
      setShowModal(false);
      setSelected(null);
      setEditData({ title: '', description: '', tools: '', sourceCode: '', hostLink: '' });
      fetchProjects();
    } catch{
      toast.error("Login to update");
    }
  };

  return (
    <>
    <NavBar />
    <Container className="my-5">
      <h3 className="mb-4">My Projects</h3>
      
      {projects.length === 0 && <p>No projects found.</p>}
      {projects.map(project => (
        <Card className="mb-3 p-3 shadow-sm" key={project._id}>
          <h5>{project.title}</h5>
          <p>{project.description}</p>
          <p><strong>Tools:</strong> {project.tools}</p>
          <a href={project.sourceCode} target="_blank" rel="noreferrer">Source</a> |{' '}
          <a href={project.hostLink} target="_blank" rel="noreferrer">Live</a>
          <div className="mt-2">
            <Button variant="warning" size="sm" onClick={() => handleEdit(project)}>Edit</Button>{' '}
            <Button variant="danger" size="sm" onClick={() => deleteProject(project._id)}>Delete</Button>
          </div>
        </Card>
      ))}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Edit Project</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={editData.title} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" value={editData.description} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Tools</Form.Label>
              <Form.Control name="tools" value={editData.tools} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Source Code</Form.Label>
              <Form.Control name="sourceCode" value={editData.sourceCode} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Host Link</Form.Label>
              <Form.Control name="hostLink" value={editData.hostLink} onChange={handleEditChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={updateProject}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Container></>
  );
};

export default ViewProject;
