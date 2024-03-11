'use client';

import React, { useEffect, useState} from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';
import { ExhibitRow } from '../../types/types';
import { fetchAllExhibits } from '../../supabase/exhibits/queries';

/**
 *
 */
function App() {
    const [exhibits, setExhibits] = useState<ExhibitRow[]>([]);
  useEffect(() => {
    // Get exhibits
    const getExhibits = async () => {
      const fetchedExhibits: ExhibitRow[] = await fetchAllExhibits();
      setExhibits(fetchedExhibits);
    };
    getExhibits(); 
  }, [exhibits]);
  return (
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '16px' }}>
        <h1 style={{ color: '#333333', fontSize: '2rem', fontWeight: 700 }}>
          Exhibits
        </h1>
      </div>
    </div>
  );
}

export default App;