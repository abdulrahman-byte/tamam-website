"use client";
import CTASection from "@/app/components/AboutUs/CTASection";
import Hero from "@/app/components/AboutUs/Hero";
import ServicesSection from "@/app/components/AboutUs/ServicesSection";
import TeamSection from "@/app/components/AboutUs/TeamSection";
import ValuesSection from "@/app/components/AboutUs/ValuesSection";
import VisionMission from "@/app/components/AboutUs/VisionMission";
import WhyUsSection from "@/app/components/AboutUs/WhyUsSection";
import React from "react";

export default function AboutPage() {
  return (
    <main className="container mx-auto">
      <Hero />
      <VisionMission />
      <ValuesSection />
      <ServicesSection />
      <TeamSection />
      <WhyUsSection />
      <CTASection />
    </main>
  );
}
