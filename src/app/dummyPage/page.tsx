'use client';

import React, {useEffect, useState} from 'react';
import ExhibitPreview from '../../components/userComponents/ExhibitPreview/ExhibitPreview';
import { fetchDisplays, deleteDisplay, createDisplay, updateDisplay } from '@/supabase/queries/queries';
// import { Display } from '@/types/schemaTypes';

export default function Home() {
  const [displays, setDisplays] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDisplays();
        setDisplays(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteDisplay = async (id) => {
    try {
      await deleteDisplay(id);
      // After deleting, refresh the displays list
      const data = await fetchDisplays();
      setDisplays(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateDisplay = async () => {
    const newDisplayData = {

      title: 'New Display',
      coordinates: {
        "lat": 37.25323057233323,
        "lng": -122.08556629289924
      },
      created_at: 'now',
      description: 'see if this creates',
      updated_at: 'later'
    };

    try {
      await createDisplay(newDisplayData);
      // After creating, refresh the displays list
      const data = await fetchDisplays();
      setDisplays(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDisplay = async (id) => {
    const updatedDisplayInfo = {
      // Define the updated display info here
      // For example, to update the title:
      id,
      title: 'Updated Display2 Title',
      description: 'Updated Display description',
      coordinates: {
        "lat": 40.25323057233323,
        "lng": -122.08556629289924
      }
    };

    try {
      await updateDisplay(id, updatedDisplayInfo);

	// Pass the 'id' as the first argument
      // After updating, refresh the displays list
      const data = await fetchDisplays();
      setDisplays(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <div>
    <h1>Displays</h1>
    <ul>
      {displays.map((display) => (
<li key={display.id}>
          <div>Title: {display.title}</div>
          <div>Description: {display.description}</div>
          <div>Coordinates: {display.coordinates}</div>
          <div>Updated: {display.updated_at}</div>
          <div>Creation: {display.created_at}</div>
          <button onClick={() => handleDeleteDisplay(display.id)}>Delete</button>
          <button onClick={() => handleUpdateDisplay(display.id)}>Update</button>
        </li>
        ))}
    </ul>
    <button onClick={handleCreateDisplay}>Create Display</button>
    </div>
  );
}
