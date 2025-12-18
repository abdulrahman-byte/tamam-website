import React from "react";
import { Card } from "@mantine/core";
import { FaDollarSign, FaCogs, FaHeadset, FaLayerGroup } from "react-icons/fa";

const overline = "القيمة المضافة";
const title = "لماذا تختارون منصتنا؟";
const subtitle = "حلول متكاملة، سرعة في التنفيذ، وتجربة عميل تُحترم.";

const points = [
  { text: "أسعار مناسبة ومرنة", icon: <FaDollarSign /> },
  { text: "حلول متكاملة من التصميم حتى الإطلاق", icon: <FaCogs /> },
  { text: "دعم ومتابعة بعد التسليم", icon: <FaHeadset /> },
  { text: "خبرة متعددة المجالات", icon: <FaLayerGroup /> },
];

export default function WhyUsSection() {
  return (
    <section className="py-14">
      <div>
        {/* Section Header */}
        <div className="text-center md:text-right mx-auto md:ml-auto">
          {overline && (
            <div className="mb-4 rounded-full p-2 mx-auto md:mx-0 inline-block text-sm sm:text-md font-semibold bg-primary/10 text-primary">
              {overline}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg opacity-80 mt-2 text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Points */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <Card
              key={i}
              shadow="sm"
              radius="lg"
              className="p-6 sm:p-8 text-center border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* أيقونة */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-indigo-100 text-primary text-xl sm:text-2xl mx-auto mb-4">
                {p.icon}
              </div>

              {/* النص */}
              <p className="font-medium text-sm sm:text-base text-gray-700">
                {p.text}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
