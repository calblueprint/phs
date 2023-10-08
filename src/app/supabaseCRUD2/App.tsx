"use client";

import React, { useState, useEffect } from 'react';
import supabase from '@/supabase/client';
import './App.css';


function App() {
    const [displays, setDisplays] = useState([]);
    const [dis, setDis] = useState({
      title: '',
      description: '',
      coordinates: '',
      update: '',
      creation: '',
    });
    const [dis2, setDis2] = useState({
      id: null,
      title: '',
      description: '',
      coordinates: '',
      update: '',
      creation: '',
    });
  
    // Add a new state variable to track the currently edited item
    const [editingDisplayId, setEditingDisplayId] = useState(null);
  
    useEffect(() => {
      fetchDisplays();
    }, []);
  
    async function fetchDisplays() {
      const { data, error } = await supabase.from('countries').select('*');
      if (error) {
        console.error(error);
      } else {
        setDisplays(data);
      }
    }
  
    function handleChange(event) {
      setDis((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
      }));
    }
  
    function handleChange2(event) {
      setDis2((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
      }));
    }
  
    async function createDisplay(event) {
    event.preventDefault();
    const { data, error } = await supabase
      .from('countries')
      .upsert([
        {
          title: dis.title,
          description: dis.description,
          coordinates: dis.coordinates,
          updated: dis.update,
          creation: dis.creation,
        },
      ], { onConflict: ['id'] });
  
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      fetchDisplays();
      setDis({
        title: '',
        description: '',
        coordinates: '',
        update: '',
        creation: '',
      });
    }
  }
  
  
    async function deleteDisplay(displayId) {
      const { data, error } = await supabase
        .from('countries')
        .delete()
        .eq('id', displayId);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        fetchDisplays();
      }
    }
  
    // Function to handle the "Edit" button click
    function editDisplay(displayId) {
      setEditingDisplayId(displayId);
      // Find the item to edit and populate dis2 with its values
      const displayToEdit = displays.find((display) => display.id === displayId);
      if (displayToEdit) {
        setDis2({
          id: displayToEdit.id,
          title: displayToEdit.title,
          description: displayToEdit.description,
          coordinates: displayToEdit.coordinates,
          update: displayToEdit.updated,
          creation: displayToEdit.creation,
        });
      }
    }
  
    async function updateDisplay() {
      const { data, error } = await supabase
        .from('countries')
        .update({
          title: dis2.title,
          description: dis2.description,
          coordinates: dis2.coordinates,
          updated: dis2.update,
          creation: dis2.creation,
        })
        .eq('id', dis2.id);
  
      fetchDisplays();
  
      if (error) {
        console.log(error);
      }
  
      if (data) {
        console.log(data);
      }
  
      // Clear editing state after saving
      setEditingDisplayId(null);
      setDis2({
        id: null,
        title: '',
        description: '',
        coordinates: '',
        update: '',
        creation: '',
      });
    }
  
    return (
      <div>
        {/* FORM 1 */}
        <form onSubmit={createDisplay}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={dis.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={dis.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Coordinates"
            name="coordinates"
            value={dis.coordinates}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Update"
            name="update"
            value={dis.update}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Creation"
            name="creation"
            value={dis.creation}
            onChange={handleChange}
          />
          <button type="submit">Create</button>
        </form>
  
        {/* FORM 2 */}
        {editingDisplayId !== null && (
          <form onSubmit={updateDisplay}>
            <input type="hidden" name="id" value={dis2.id} />
            <input
              type="text"
              name="title"
              value={dis2.title}
              onChange={handleChange2}
            />
            <input
              type="text"
              name="description"
              value={dis2.description}
              onChange={handleChange2}
            />
            <input
              type="text"
              name="coordinates"
              value={dis2.coordinates}
              onChange={handleChange2}
            />
            <input
              type="text"
              name="update"
              value={dis2.update}
              onChange={handleChange2}
            />
            <input
              type="text"
              name="creation"
              value={dis2.creation}
              onChange={handleChange2}
            />
            <button type="submit">Save Changes</button>
          </form>
        )}
  
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Coordinates</th>
              <th>Updated</th>
              <th>Creation</th>
              <th>Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {displays.map((display) => (
              <tr key={display.id}>
                <td>{display.id}</td>
                <td>{display.title}</td>
                <td>{display.description}</td>
                <td>{display.coordinates}</td>
                <td>{display.updated}</td>
                <td>{display.creation}</td>
                <td>
                  <button onClick={() => deleteDisplay(display.id)}>Delete</button>
                  {/* Render "Edit" button conditionally based on editingDisplayId */}
                  {editingDisplayId === display.id ? (
                    <button onClick={updateDisplay}>Save</button>
                  ) : (
                    <button onClick={() => editDisplay(display.id)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default App;
  