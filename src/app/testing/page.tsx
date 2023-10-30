// @ts-nocheck
'use client';

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { TourRow } from '../../types/types';
import {
  fetchTours,
  insertTour,
  updateTour,
  upsertTour,
  deleteTour,
} from '../../supabase/tours/queries';
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
  const [tours, setTours] = useState<TourRow[]>([]);

  useEffect(() => {
    /**
     *
     */
    async function fetchData() {
      try {
        const responseData: TourRow[] = await fetchTours();
        setTours(responseData);
        console.log('set the tours');
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteTour = async (id: number) => {
    try {
      await deleteTour(id);
      // After deleting, refresh the tour list
      const data = await fetchTours();
      setTours(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpsertTour = async () => {
    const newTourData: TourRow = {
      name: 'New tour name',
      description: 'New tour description',
      stop_count: 0,
      created_at: new Date('2023-10-13T12:34:56Z').toJSON(),
      //id
    };

    try {
      await upsertTour(newTourData);
      // After creating, refresh the tour list
      const data = await fetchTours();
      setTours(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTour = async id => {
    const updatedTourInfo: TourRow = {
      // Define the updated tour info here
      // For example, to update the text:
      id,
      name: 'Updated tour name',
      description: 'Updated tour description',
      stop_count: 0,
      created_at: new Date('2023-10-13T12:34:56Z').toJSON(),
    };

    try {
      await updateTour(id, updatedTourInfo);

      // Pass the 'id' as the first argument
      // After updating, refresh the tour list
      const data = await fetchTours();
      setTours(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Tours</h1>
      <ul style={styles.list}>
        {tours.map(tours => (
          <li style={styles.listItem} key={tours.id}>
            <div style={styles.info}>
              <div style={styles.text}>Title: {tours.text}</div>
              <div style={styles.type}>Type: {tours.type}</div>
              <div style={styles.creation}>Creation: {tours.created_at}</div>
              <button
                type="button"
                onClick={() => handleDeleteTour(tours.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => handleUpdateTour(tours.id)}
                style={styles.updateButton}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleUpsertTour}>
        Upsert Tour
      </button>
    </div>
  );
}
