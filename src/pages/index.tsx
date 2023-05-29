import React from "react";

import SectionHeader from "@/components/Home/SectionHeader";
import SectionWork from "@/components/Home/SectionWork";
import SectionChoose from "@/components/Home/SectionChoose";
import SectionUsing from "@/components/Home/SectionUsing";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  return (
    <div>
      <SectionHeader />
      <SectionWork />
      <SectionChoose />
      <SectionUsing />
      <Footer />
    </div>
  );
}
