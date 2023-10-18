// @ts-nocheck
'use client';

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { MediaRow } from '../../types/types';
import { createMedia, deleteMedia, fetchMedia, updateMedia } from '../../supabase/media/queries';
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
  text: {
    fontWeight: 'bold',
  },
  type: {
    marginTop: '5px',
  },
  url: {
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
  const [media, setMedia] = useState<MediaRow[]>([]);

  useEffect(() => {
    /**
     *
     */
    async function fetchData() {
      try {
        const responseData: MediaRow[] = await fetchMedia();
        setMedia(responseData);
        console.log("set the media");
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteMedia = async (id: number) => {
    try {
      await deleteMedia(id);
      // After deleting, refresh the media list
      const data = await fetchMedia();
      setMedia(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateMedia = async () => {
    const newMediaData: MediaRow = {
      text: 'New Media',
      type: 'Picture',
      url: 'https://',
      created_at: new Date('2023-10-13T12:34:56Z').toJSON(),
      //id
    };

    try {
      await createMedia(newMediaData);
      // After creating, refresh the media list
      const data = await fetchMedia();
      setMedia(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMedia = async id => {
    const updatedMediaInfo: MediaRow = {
      // Define the updated media info here
      // For example, to update the text:
      id,
      text: 'Updated Media2 Title',
      type: 'Updated picture',
      url: 'Updated https://',
      created_at: new Date('2023-10-13T12:34:56Z').toJSON(),
    };

    try {
      await updateMedia(id, updatedMediaInfo);

      // Pass the 'id' as the first argument
      // After updating, refresh the displays list
      const data = await fetchMedia();
      setMedia(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Media</h1>
      <ul style={styles.list}>
        {media.map(media => (
          <li style={styles.listItem} key={media.id}>
            <div style={styles.info}>
              <div style={styles.text}>Title: {media.text}</div>
              <div style={styles.type}>
                Type: {media.type}
              </div>
              <div style={styles.creation}>Creation: {media.created_at}</div>
              <button
                type="button"
                onClick={() => handleDeleteMedia(media.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => handleUpdateMedia(media.id)}
                style={styles.updateButton}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleCreateMedia}>
        Create Media
      </button>
    </div>
  );
}

