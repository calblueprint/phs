import React from 'react';
import ExhibitDisplay from '../../components/userComponents/ExhibitDisplay/ExhibitDisplay';

export default function Home() {
  return (
    <ExhibitDisplay
      name="Hospital"
      location="Location description here"
      information="Information"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      relatednews="Related News"
      topimage="/Rectangle 14.png"
      media="/Rectangle 15.png"
      bottomimage="/Rectangle 16.png"
      moretext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do dolore magna aliqua."
    />
  );
}
