'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Form, Row, Col, Button } from 'react-bootstrap';
import DisplayCard from './displayCard';
import supabase from '@/supabase/client';


function App() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coordinates, setCoordinates] = useState<string>("");
  const [updated_at, setUpdated_at] = useState<string>("");
  const [created_at, setCreated_at] = useState<string>("");


  const [ displays, setDisplays] = useState([]);
  

  async function getDisplays() {
    try {
      const { data, error } = await supabase
        .from("bp-testing").select("*").limit(10)
      if (error) throw error;
      if (data != null) {
        setDisplays(data); 
      }
    } catch (error) {
      alert(error.message);
    }
  }
  useEffect(() => {
    getDisplays();
  }, [])

  async function createDisplay() {
    try {
      const { data, error } = await supabase
        .from("bp-testing")
        .insert({
          title: name,
          description,
          coordinates,
          updated: updated_at,
          created: created_at
        })
        .single()
        
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      
      <div style={{ padding: '16px' }}>
        <h1 style={{ color: '#333333', fontSize: '2rem', fontWeight: 700 }}>Displays</h1>
      </div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Create a Display</h3>
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Form.Label>Display Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
            <Form.Label>Display coordinates</Form.Label>
            <Form.Control
              type="text"
              id="coordinates"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoordinates(e.target.value)}
            />
            <Form.Label>Display Last Updated</Form.Label>
            <Form.Control
              type="text"
              id="updated_at"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdated_at(e.target.value)}
            />
            <Form.Label>Display Creation Date</Form.Label>
            <Form.Control
              type="text"
              id="created_at"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreated_at(e.target.value)}
            />
            <br />
            <Button onClick={() => createDisplay()}>Create Display</Button>
          </Col>
        </Row>
        <hr />
        <hr />
        <hr />
        <h3>Current Database Items</h3>
        <Row xs={1} lg={3} className="g-4">
          {displays.map((display) => (
            <Col>
              <DisplayCard display={display} /> 
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
