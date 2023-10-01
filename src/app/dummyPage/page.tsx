import Image from "next/image";
import ExhibitPreview from "@/components/userComponents/ExhibitPreview/ExhibitPreview";

export default function Home() {
  return (
    <ExhibitPreview
      name="Exhibit Name Ryan"
      location="location description"
      description="description"
      about="About this exhibit"
    />
  );
}
