"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar, FaRegUser } from "react-icons/fa";
// import errorImg from "../../../../public/imgError.png";

const testimonials = [
  // لو فاضية هيظهر "لا توجد آراء حتى الآن"
  // {
  //   name: "سارة محمد",
  //   feedback: "خدمة ممتازة وسرعة في التسليم، أنصح الجميع بالتعامل معهم.",
  //   rating: 5,
  // },
];

const Opinion = () => {
  const [openImage, setOpenImage] = useState(false);

  const handleImageClick = () => {
    setOpenImage(true);
  };

  const handleClose = () => {
    setOpenImage(false);
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 mt-30">آراء العملاء</h2>

      {testimonials.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg font-medium">لا توجد آراء حتى الآن</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-primary transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
            >
              {/* الاسم والأيقونة */}
              <div className="mb-3">
                <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <FaRegUser className="text-primary" />
                  {item.name}
                </h4>
                <div className="flex text-yellow-400 mt-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>

              {/* رأي العميل */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.feedback}
              </p>

              {/* صورة السكرينشوت */}
              <div className="cursor-pointer" onClick={handleImageClick}>
                {/* <Image
                  src={errorImg}
                  alt="screenshot"
                  width={300}
                  height={150}
                  className="w-full h-auto rounded-md border"
                /> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* نافذة تكبير الصورة */}
      {openImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="relative">
            {/* زر الإغلاق */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600 transition"
            >
              ✕
            </button>

            {/* الصورة المكبرة */}
            {/* <Image
              src={errorImg}
              alt="screenshot large"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl border-4 border-white"
            /> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Opinion;
