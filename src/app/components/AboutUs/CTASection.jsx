import React from "react";
import { Text, Button } from "@mantine/core";

const title = "جاهز تبدأ؟";
const subtitle = "من الفكرة إلى التنفيذ… نصمم، نبرمج، ونطلق مشروعك الرقمي";

export default function CTASection() {
  return (
    <section className="py-14">
      <div>
        <div
          className="p-8 sm:p-10 md:p-14 rounded-lg bg-white border border-slate-200 hover:shadow-2xl transition-shadow duration-500"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0">
            
            {/* Text */}
            <div className="text-center md:text-right md:flex-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
                {title}
              </div>
              <Text className="text-gray-700 text-base sm:text-lg md:text-xl opacity-90">
                {subtitle}
              </Text>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button
                component="a"
                href="/contactPage"
                size="lg"
                radius="full"
                className="bg-primary text-white hover:bg-primary/80 transition-colors duration-300"
              >
                تواصل الآن
              </Button>
              <Button
                component="a"
                href="/orderPage"
                size="lg"
                radius="full"
                variant="outline"
                className="border-primary text-primary hover:bg-indigo-50 transition-colors duration-300"
              >
                اطلب الآن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
