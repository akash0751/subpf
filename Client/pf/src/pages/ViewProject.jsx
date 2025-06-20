import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    tools: '',
    sourceCode: '',
    hostLink: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiKey = localStorage.getItem("apiKey"); // Store your API key in localStorage

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://subpf-1.onrender.com/api/get', {
        headers: { "x-api-key": apiKey },
        withCredentials: true
      });
      setProjects(res.data.project);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch projects. Check API key.");
    }finally {
    setLoading(false); // Stop loading
  }
  };

  useEffect(() => {
    if (apiKey) fetchProjects();
  }, [apiKey]);

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`https://subpf-1.onrender.com/api/delete/${id}`, {
          headers: { "x-api-key": apiKey },
          withCredentials: true
        });
        fetchProjects();
        toast.success("Project deleted");
      } catch {
        toast.error('Failed to delete. Check API key.');
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
      await axios.put(`https://subpf-1.onrender.com/api/update/${selected._id}`, editData, {
        headers: { "x-api-key": apiKey },
        withCredentials: true
      });
      toast.success("Project updated!");
      setShowModal(false);
      setSelected(null);
      setEditData({ title: '', description: '', tools: '', sourceCode: '', hostLink: '' });
      fetchProjects();
    } catch {
      toast.error("Failed to update. Check API key.");
    }
  };

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h3 className="mb-4">My Projects</h3>
        {loading ? (
  <div className="text-center py-5">
    <span className="spinner-border text-primary" role="status" />
    <p className="mt-2">Loading your projects...</p>
  </div>
) : (
  <>
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
  </>
)}


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
      </Container>
    </>
  );
};

export default ViewProject;
