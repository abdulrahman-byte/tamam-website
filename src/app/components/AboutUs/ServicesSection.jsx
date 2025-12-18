import React from "react";
import { Card } from "@mantine/core";
import {
  FaPaintBrush,
  FaLaptopCode,
  FaBook,
  FaChartLine,
  FaMicrophone,
} from "react-icons/fa";

const serviceBlocks = [
  {
    title: "التصميم والمونتاج",
    items: [
      "تصميم واجهات وتجارب UX/UI",
      "بوسترات ومواد دعائية",
      "مونتاج فيديو",
      "موشن جرافيك",
    ],
    icon: <FaPaintBrush className="text-xl text-primary" />,
  },
  {
    title: "البرمجة والبيانات",
    items: [
      "مواقع وتطبيقات (Next.js)",
      "واجهات إدارة وDashboards",
      "تكاملات API",
      "تحليلات البيانات",
    ],
    icon: <FaLaptopCode className="text-xl text-primary" />,
  },
  {
    title: "الترجمة والتعليم",
    items: ["ترجمة احترافية", "تعليم عن بعد", "محتوى تدريبي تفاعلي"],
    icon: <FaBook className="text-xl text-primary" />,
  },
  {
    title: "التسويق والأعمال",
    items: ["هوية رقمية", "إعلانات مدفوعة", "إدارة محتوى", "تحسين التحويلات"],
    icon: <FaChartLine className="text-xl text-primary" />,
  },
  {
    title: "الصوتيات والفيديو",
    items: ["تعليق صوتي", "بودكاست", "تحسين جودة الصوت"],
    icon: <FaMicrophone className="text-xl text-primary" />,
  },
];

const overline = "خدماتنا";
const title = "ماذا نفعل؟";
const subtitle = "نقدّم باقات عملية تغطي كامل دورة حياة المنتج والمحتوى.";

export default function ServicesSection() {
  return (
    <section className="py-14">
      <div>
        {/* Section Header */}
        <div className="text-center md:text-right mx-auto">
          {overline && (
            <div className="mb-4 rounded-full p-2 mx-auto md:mx-0 inline-block text-md font-semibold bg-primary/10 text-primary">
              {overline}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg opacity-80 mt-2">{subtitle}</p>
          )}
        </div>

        {/* Service Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {serviceBlocks.map((s, i) => (
            <Card
              key={i}
              shadow="sm"
              radius="lg"
              className="p-6 sm:p-8 h-full flex flex-col items-center text-center border border-slate-100 hover:shadow-md transition-shadow"
            >
              {/* أيقونة داخل دائرة */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 mb-4">
                {s.icon}
              </div>

              {/* العنوان */}
              <h4 className="font-bold text-base sm:text-lg mb-3">{s.title}</h4>

              {/* العناصر */}
              <ul className="space-y-2 text-center w-full">
                {s.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="opacity-80 text-sm sm:text-base leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
