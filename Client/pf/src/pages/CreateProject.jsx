import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
const CreateProject = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    tools: '',
    sourceCode: '',
    hostLink: '',
  });
 const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token")|| localStorage.getItem('authToken');

      await axios.post(
        'https://subpf-1.onrender.com/api/add',
        form,
        {
          headers: { "authorization": `Bearer ${token}` },
          withCredentials:true
        }
      );

      toast.success("Project created!");
      setForm({ title: '', description: '', tools: '', sourceCode: '', hostLink: '' });
      navigate('/view-project')
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Login to Add Product");
    }
  };

  return (
    <>
    <NavBar />
    <Container className="my-5">
      <Card className="p-4 shadow-lg">
        <h3 className="mb-4">Create Project</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={form.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tools</Form.Label>
            <Form.Control name="tools" value={form.tools} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Source Code Link</Form.Label>
            <Form.Control name="sourceCode" value={form.sourceCode} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hosted Link</Form.Label>
            <Form.Control name="hostLink" value={form.hostLink} onChange={handleChange} />
          </Form.Group>

          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </Card>
    </Container></>
  );
};

export default CreateProject;
