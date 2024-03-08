'use client';

import React from 'react';
import EmailPopup from '../../components/userComponents/EmailPopup/page';
import NavBar from '../../components/userComponents/navBar/navBar';

/**
 * @returns email popup
 */
export default function Home() {
  return (
    <>
    <NavBar />
    <EmailPopup backLink="/collectionsPage" />
  </>
  );
}