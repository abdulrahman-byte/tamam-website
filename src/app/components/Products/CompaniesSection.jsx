"use client";
import React, { useState } from "react";
import { Card, Button, Text, Badge } from "@mantine/core";
import Image from "next/image";

const companies = [
  {
    id: 1,
    name: "متجر التقنية الحديثة",
    description: "أحدث الإلكترونيات والأجهزة الذكية بأسعار مميزة.",
    location: "الرياض، السعودية",
    logo: "/company1.png",
    category: "إلكترونيات",
  },
  {
    id: 2,
    name: "أزياء العالمية",
    description: "أحدث صيحات الموضة والملابس العصرية.",
    location: "دبي، الإمارات",
    logo: "/company2.png",
    category: "ملابس",
  },
  {
    id: 3,
    name: "سوبر ماركت الفرات",
    description: "مواد غذائية طازجة وجودة مضمونة يومياً.",
    location: "الخرطوم، السودان",
    logo: "/company3.png",
    category: "أغذية",
  },
  {
    id: 4,
    name: "إكسسوارات روز",
    description: "إكسسوارات نسائية راقية وحديثة.",
    location: "جدة، السعودية",
    logo: "/company4.png",
    category: "إكسسوارات",
  },
]; // نخليها فاضية عشان ما يظهروا الشركات الفيك

const categories = ["الكل", "إلكترونيات", "ملابس", "أغذية", "إكسسوارات"];

export default function CompaniesSection() {
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredCompanies =
    activeCategory === "الكل"
      ? companies
      : companies.filter((c) => c.category === activeCategory);

  return (
    <div className="mt-30">
      {/* الفلاتر */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            variant={activeCategory === cat ? "filled" : "light"}
            color="indigo"
            radius="xl"
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* بطاقات الشركات أو رسالة الانضمام */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Card
              key={company.id}
              radius="xl"
              shadow="md"
              className="p-6 flex flex-col justify-between bg-white hover:shadow-lg transition"
            >
              {/* صورة الشركة */}
              <div className="flex justify-center mb-4">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={100}
                  height={100}
                  className="rounded-full border"
                />
              </div>

              {/* اسم + وصف */}
              <div className="text-center mb-4">
                <div className="text-xl font-bold mb-2">{company.name}</div>
                <Text className="text-gray-600 text-sm">
                  {company.description}
                </Text>
              </div>

              {/* أسفل البطاقة */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t">
                <Badge color="gray" variant="light">
                  {company.location}
                </Badge>
                <Button
                  size="sm"
                  radius="xl"
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  تسوّق الآن
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card
            radius="xl"
            shadow="md"
            className="p-6 flex flex-col justify-between bg-white text-center"
          >
            <Text className="text-lg font-bold mb-4 text-indigo-700">
              لا يوجد شركات منضمة إلينا حتى الآن
            </Text>
            <Text className="text-gray-600 mb-6">
              انضم الآن لعرض منتجاتك وخدماتك على منصتنا.
            </Text>
            <Button
              size="md"
              radius="xl"
              className="bg-indigo-600 text-white hover:bg-indigo-700 mx-auto"
            >
              انضم إلينا
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
