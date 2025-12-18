"use client";

import CardsEntertainment from "@/app/components/Entertainment/CardsEntertainment";
import HeaderEntertainment from "@/app/components/Entertainment/HeaderSection";

export default function EntertainmentPage() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header (Movies + Courses + Books) */}
        <HeaderEntertainment />

        {/* Cards Section */}
        <CardsEntertainment />
      </div>
    </section>
  );
}
