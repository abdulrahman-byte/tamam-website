"use client";

import CompaniesSection from "@/app/components/Products/CompaniesSection";
import HeaderSection from "@/app/components/Products/HeaderSection";


export default function ProductsPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <HeaderSection />
        <div className="mt-20 text-xl bg-primary text-white p-6 rounded-lg text-center">
        لا يوجد شركات او متاجر منضمة الينا حتى الان اذا كنت تريد الانضمام الينا اضغط على زر انضم الان كتاجر في الاعلى
        </div>
        {/* انا قفلتها لحدي ما تنضم الينا شركات */}
        {/* <CompaniesSection /> */} 
      </div>
    </section>
  );
}
