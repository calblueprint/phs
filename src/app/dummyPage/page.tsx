import React from 'react';
import EmailPopup from '../../components/userComponents/emailPopup/page';

/**
 * @returns email popup
 */
export default function Home() {
  return (
    <EmailPopup 
    backLink="/collectionsPage"
    />
  );
}