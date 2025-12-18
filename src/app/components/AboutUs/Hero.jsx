import React from 'react';
import { Badge, Button, Card, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const stats = [
  { label: 'سنوات خبرة', value: '5+' },
  { label: 'مشاريع مُنجزة', value: '120+' },
  { label: 'عملاء راضون', value: '95%' },
  { label: 'تقنيات مُعتمدة', value: '20+' },
];

export default function Hero() {
  return (
    <section className="py-12 md:py-24">
      <div>
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* النصوص */}
            <div className="text-center md:text-right">
              <div
                className="mb-4 rounded-full p-2 mx-auto md:mx-0 inline-block text-md font-semibold bg-primary/10 text-primary "
              >
                من نحن
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-[1.2] mb-4">
                فريق رقمي واحد… حلول متكاملة
              </h1>
              <p className="text-base sm:text-lg md:text-xl opacity-80">
                نحن فريق من المصممين، المبرمجين، والمبدعين. نعمل بشغف لنقدم خدمات رقمية تشمل التصميم،
                البرمجة، الترجمة، التعليم، التسويق، المونتاج، الصوتيات والبيانات بجودة عالية وأسعار مناسبة.
              </p>
              <Group className="mt-6 flex justify-center md:justify-end gap-4">
              <div className='w-full flex flex-col items-center md:flex-row'>
                <Link href={'/orderPage'} className='px-4 py-2 w-fit text-center bg-primary text-white rounded-full cursor-pointer hover:scale-105 transition duration-300 hover:bg-primary/80'>
                اطلب خدمتك الان
                </Link>
                </div>
              </Group>
            </div>

            {/* الكارد للإحصائيات */}
            <Card
              shadow="sm"
              radius="xl"
              className="p-6 sm:p-8 md:p-12 bg-white/70 backdrop-blur border border-slate-100"
            >
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-4 sm:gap-6 text-center"
              >
                {stats.map((s, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold">{s.value}</div>
                      <div className="text-xs sm:text-sm md:text-base opacity-70 mt-1">{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
