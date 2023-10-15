'use client';

import React, { useEffect, useState } from 'react';
import { createDisplay, deleteDisplay, fetchDisplays, updateDisplay } from '../../supabase/displays/queries';
import { DisplayRow } from '../../types/types';
// import ExhibitPreview from '../../components/userComponents/ExhibitPreview/ExhibitPreview';

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '10px 0',
    padding: '10px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: '5px',
  },
  coordinates: {
    marginTop: '5px',
  },
  updated: {
    marginTop: '5px',
  },
  creation: {
    marginTop: '5px',
  },
  deleteButton: {
    marginTop: '10px',
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  updateButton: {
    marginTop: '10px',
    backgroundColor: '#0077ff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

/**
 * 
 */
export default function Home() {
  const [displays, setDisplays] = useState<DisplayRow[]>([]);

  useEffect(() => {
    /**
     *
     */
    async function fetchData() {
      try {
        const responseData: DisplayRow[]  = await fetchDisplays();
        setDisplays(responseData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteDisplay = async (id: number) => {
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
    const newDisplayData: DisplayRow = {
      title: 'New Display',
      coordinates: {
        lat: 37.25323057233323,
        lng: -122.08556629289924,
      },
      created_at: (new Date('2023-10-13T12:34:56Z')).toJSON(),
      description: 'see if this creates',
      updated_at: (new Date('2024-10-13T12:34:56Z')).toJSON(),
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

  const handleUpdateDisplay = async id => {
    const updatedDisplayInfo = {
      // Define the updated display info here
      // For example, to update the title:
      id,
      title: 'Updated Display2 Title',
      description: 'Updated Display description',
      coordinates: {
        lat: 40.25323057233323,
        lng: -122.08556629289924,
      },
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
    <div style={styles.container}>
      <h1 style={styles.header}>Displays</h1>
      <ul style={styles.list}>
        {displays.map(display => (
          <li style={styles.listItem} key={display.id}>
            <div style={styles.info}>
              <div style={styles.title}>Title: {display.title}</div>
              <div style={styles.description}>
                Description: {display.description}
              </div>
              <div style={styles.coordinates}>
                Coordinates: Latitude: {display.coordinates?.lat}, Longitude:{' '}
                {display.coordinates?.lng}
              </div>
              <div style={styles.updated}>Updated: {display.updated_at}</div>
              <div style={styles.creation}>Creation: {display.created_at}</div>
              <button
                type="button"
                onClick={() => handleDeleteDisplay(display.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => handleUpdateDisplay(display.id)}
                style={styles.updateButton}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type = "button" onClick={handleCreateDisplay}>Create Display</button>
    </div>
  );
}
