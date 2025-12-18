import React from "react";
import { Card } from "@mantine/core";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaMedal,
  FaRegClock,
  FaEye,
  FaSyncAlt,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const values = [
  {
    title: "الإبداع",
    desc: "نحوّل الأفكار إلى تجارب رقمية مُلهمة.",
    icon: <FaLightbulb className="text-xl text-primary" />,
  },
  {
    title: "الجودة",
    desc: "معايير تنفيذ عالية واهتمام بالتفاصيل.",
    icon: <FaMedal className="text-xl text-primary" />,
  },
  {
    title: "الالتزام",
    desc: "مواعيد واضحة وتسليمات موثوقة.",
    icon: <FaRegClock className="text-xl text-primary" />,
  },
  {
    title: "الشفافية",
    desc: "تواصل صريح ومسارات عمل واضحة.",
    icon: <FaEye className="text-xl text-primary" />,
  },
  {
    title: "التطوير المستمر",
    desc: "نتعلم ونختبر لنحقق أفضل نتيجة.",
    icon: <FaSyncAlt className="text-xl text-primary" />,
  },
];

const overline = "ما الذي يميزنا";
const title = "قيمنا الأساسية";
const subtitle = "أسس نلتزم بها في كل مشروع وشراكة.";

export default function ValuesSection() {
  return (
    <section className="py-14">
      <div>
        {/* العناوين */}
        <div className="text-center md:text-right mx-auto md:ml-auto">
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

        {/* الكروت */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Card
                shadow="sm"
                radius="lg"
                className="p-6 sm:p-8 h-full flex flex-col items-center text-center border border-slate-100 hover:shadow-md transition-shadow"
              >
                {/* أيقونة داخل دائرة */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 mb-4">
                  {v.icon}
                </div>

                {/* العنوان */}
                <h4 className="font-bold text-base sm:text-lg mb-2">{v.title}</h4>

                {/* الوصف */}
                <p className="opacity-80 text-sm sm:text-base leading-relaxed">
                  {v.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
