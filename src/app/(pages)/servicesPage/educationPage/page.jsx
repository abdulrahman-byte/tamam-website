"use client";
import { useState } from "react";
import { courses } from "@/app/data/courses";
import EducationHeader from "@/app/components/Services/education/EducationHeader";
import CoursesList from "@/app/components/Services/education/CoursesList";

export default function EducationPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");

  const categories = ["الكل", ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(c =>
    (category === "الكل" || c.category === category) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10">
      <EducationHeader
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      <CoursesList courses={filteredCourses} />
    </div>
  );
}
