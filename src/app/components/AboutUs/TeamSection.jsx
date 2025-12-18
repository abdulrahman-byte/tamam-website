import React from "react";
import { Card, Avatar } from "@mantine/core";

const overline = "تعرف على الفريق";
const title = "وراء الكواليس";
const subtitle = "كل الأدوار والمسؤوليات يقودها شخص واحد: عبدالرحمن محمد.";

const roles = [
  "المدير",
  "المبرمج",
  "المصمم",
  "المسوّق",
  "الممنتج",
  "الكاتب",
  "المترجم",
  "المدرب",
];

export default function TeamSection() {
  return (
    <section className="py-14">
      <div >
        {/* Section Header */}
        <div className="text-center md:text-right mx-auto md:ml-auto">
          {overline && (
            <div className="mb-4 rounded-full p-2 mx-auto md:mx-0 inline-block text-sm sm:text-md font-semibold bg-primary/10 text-primary">
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

        <div className="mt-10 flex justify-center">
          <Card
            shadow="sm"
            radius="lg"
            className="p-8 border border-slate-100 text-center transition-transform hover:scale-105 hover:shadow-lg "
          >
            <div className="flex justify-center mb-4">
              <Avatar
                radius="xl"
                size="xl"
                color="blue"
                className="font-bold text-lg bg-blue-50 rounded-lg text-primary"
              >
                AM
              </Avatar>
            </div>
            <h4 className="font-bold text-xl mb-4">عبدالرحمن محمد</h4>

            {/* Grid of roles */}
            <div className="grid grid-cols-4 gap-3 text-sm text-gray-600 mb-6">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="px-3 py-2 bg-blue-50 rounded-lg text-primary font-medium"
                >
                  {role}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
