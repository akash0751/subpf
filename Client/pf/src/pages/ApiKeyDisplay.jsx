import React, { useEffect, useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const ApiKeyDisplay = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('apiKey');
    setApiKey(key || '');
  }, []);

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <Card className="p-4 shadow-sm">
          <h4 className="mb-3">🔑 Your API Key</h4>
          {apiKey ? (
            <Alert variant="success">
              <code>{apiKey}</code>
            </Alert>
          ) : (
            <Alert variant="danger">API Key not found. Please log in first.</Alert>
          )}
        </Card>
        <Card>
            <h5>Fetch Function : https://subpf-1.onrender.com/api/get</h5>
        </Card>
      </Container>
    </>
  );
};

export default ApiKeyDisplay;
