'use client';
import React, {useEffect, useState} from 'react';
// import ExhibitPreview from ‘../../components/userComponents/ExhibitPreview/ExhibitPreview’;
import { fetchMedia, deleteMedia, createMedia, updateMedia } from '../../supabase/queries_media/media';
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
    backgroundColor: '#FF0000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  updateButton: {
    marginTop: '10px',
    backgroundColor: '#0077FF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};
export default function Home() {
  const [media, setMedia] = useState([]);
  useEffect(() => {
    async function fetchMedia() {
      try {
        const data = await fetchMedia();
        setMedia(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMedia();
  }, []);
  const handleDeleteMedia = async (id: number) => {
    try {
      await deleteMedia(id);
      // After deleting, refresh the displays list
      const data = await fetchMedia();
      setMedia(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateMedia = async () => {
    console.log(“yo”);
    const newMediaData = {
      title: 'New Media',
      coordinates: {
        "lat": 37.25323057233323,
        "lng": -122.08556629289924
      },
      created_at: 'now',
      description: 'see if this creates',
      updated_at: 'later'
    };
    try {
      await createMedia(newMediaData);
      // After creating, refresh the displays list
      const data = await fetchMedia();
      setMedia(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateMedia = async (id) => {
    const updatedMediaInfo = {
      // Define the updated display info here
      // For example, to update the title:
      id,
      title: 'Updated Media2 Title',
      description: 'Updated Media description',
      coordinates: {
        "lat": 40.25323057233323,
        "lng": -122.08556629289924
      }
    };
    try {
      await updateMedia(id, updatedMediaInfo);
  // Pass the ‘id’ as the first argument
      // After updating, refresh the displays list
      const data = await fetchMedia();
      setMedia(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Displays</h1>
      <ul style={styles.list}>
        {displays.map((display) => (
          <li style={styles.listItem} key={display.id}>
            <div style={styles.info}>
              <div style={styles.title}>Title: {display.title}</div>
              <div style={styles.description}>Description: {display.description}</div>
              <div style={styles.coordinates}>
                Coordinates: Latitude: {display.coordinates.lat}, Longitude: {display.coordinates.lng}
              </div>
              <div style={styles.updated}>Updated: {display.updated_at}</div>
              <div style={styles.creation}>Creation: {display.created_at}</div>
              <button onClick={() => handleDeleteDisplay(display.id)} style={styles.deleteButton}>
                Delete
              </button>
              <button onClick={() => handleUpdateDisplay(display.id)} style={styles.updateButton}>
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateDisplay}>Create Display</button>
    </div>
  );
}