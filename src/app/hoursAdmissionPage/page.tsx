'use client';

import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/userComponents/navBar/navBar';

function App() {
  return (
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '16px' }}>
        <h1 style={{ color: '#333333', fontSize: '2rem', fontWeight: 700 }}>
          Visit
        </h1>
        <p style={{ color: '#333333', fontSize: '1rem', fontWeight: 400 }}>
          Short summary or description of exhibit here. Short summary or
          description of exhibit here.
        </p>
        <div
          style={{
            backgroundColor: '#d7e0cc',
            borderRadius: '16px',
            padding: '16px',
            marginTop: '16px',
          }}
        >
          <h2
            style={{
              color: '#333333',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginTop: '16px',
              marginBottom: '8px',
            }}
          >
            Hours & Admission
          </h2>
          <p
            style={{
              color: '#333333',
              fontSize: '1rem',
              fontWeight: 400,
              marginBottom: '8px',
            }}
          >
            12 Airport Blvd, San Mateo, CA 94401
          </p>
          <p
            style={{
              color: '#333333',
              fontSize: '1rem',
              fontWeight: 400,
              marginBottom: '8px',
            }}
          >
            Monday-Friday | 11 a.m. - 5 p.m.
            <br />
            Saturday-Sunday | 10 a.m. - 8 p.m.
          </p>
          <p
            style={{
              color: '#333333',
              fontSize: '1rem',
              fontWeight: 400,
              marginBottom: '8px',
            }}
          >
            *Closed on holidays
          </p>
          <p
            style={{
              color: '#333333',
              fontSize: '1rem',
              fontWeight: 400,
              fontStyle: 'italic',
              marginBottom: '16px',
            }}
          >
            Additional Information here
          </p>
        </div>
        <h1
          style={{
            color: '#333333',
            fontSize: '1.5rem',
            fontWeight: 600,
            padding: '16px',
          }}
        >
          Touring
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            style={{
              backgroundColor: '#d7e0cc',
              borderRadius: '16px',
              padding: '16px',
              width: '48%',
              height: '150px',
            }}
          >
            <Link href="/siteMapPage">
              <h1
                style={{
                  color: '#333333',
                  fontSize: '1rem',
                  fontWeight: 400,
                  padding: '16px',
                }}
              >
                Site Map
              </h1>
            </Link>
          </button>
          <button
            type="button"
            style={{
              backgroundColor: '#d7e0cc',
              borderRadius: '16px',
              padding: '16px',
              width: '48%',
              height: '150px',
            }}
          >
            <Link href="/qrCodeTourPage">
              <h1
                style={{
                  color: '#333333',
                  fontSize: '1rem',
                  fontWeight: 400,
                  padding: '16px',
                }}
              >
                QR Code Tour
              </h1>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
