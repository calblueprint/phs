import Image from 'next/image';
import ExhibitPreview from '@/components/userComponents/ExhibitPreview/ExhibitPreview';

export default function Home() {
  return (
    <ExhibitPreview
      name="Exhibit Name"
      location="Location description here"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      about="About this exhibit"
      topimage="/dog.jpg"
      bottomimage="/dog2.jpg"
    />
  );
}
