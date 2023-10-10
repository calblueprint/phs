
import React from 'react';
import ExhibitPreview from '../../components/userComponents/ExhibitPreview/ExhibitPreview';

export default function Home() {
  return (
    <ExhibitPreview
      name="Exhibit Name"
      location="Location description here"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      about="Click below to learn more"
      topimage="/Rectangle 12.png"
      bottomimage="/Rectangle 10.png"
      href="/dummyPage2"
    />
  );
}
