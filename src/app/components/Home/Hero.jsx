"use client";
import Image from "next/image";
import React from "react";
// import heroImg from "../../../../public/images/Headerimg.jpg";
import Link from "next/link";



const services = [
  { label: "تصميم", href:"/servicesPage/designPage/socialMediaPage" },
  { label: "برمجة", href: "/OrderWebPage" },
  // { label: "مونتاج",href:"/services/MontagePage" },
  { label: "ترجمة", href:"/servicesPage/translatePage" },
  { label: "تعليم", href:"/servicesPage/educationPage"  },
  { label: "تسويق", href:"/servicesPage/marketingPage" },
];

const Hero = () => {
  return (
    <div className="relative w-full container mt-6 sm:mt-10 rounded-2xl overflow-hidden 
      h-[300px] sm:h-[420px] md:h-[560px] lg:h-[650px]">

      {/* الخلفية */}
      <Image
        src="https://res.cloudinary.com/dacu2uuyw/image/upload/v1765740020/Headerimg_jps9rg.jpg"
        alt="Hero Image"
        fill
        priority
        className="object-cover brightness-50 rounded-2xl"
      />

      {/* تدرج شفاف */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      {/* المحتوى */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white 
        px-3 sm:px-6 md:px-10">

        {/* العنوان */}
        <h1
          className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-snug 
          max-w-sm sm:max-w-2xl md:max-w-4xl mb-4 sm:mb-6 drop-shadow-xl 
          bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent">
          خدمات رقمية متكاملة بجودة عالية وأسعار مناسبة
        </h1>

        {/* روابط الخدمات */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-6 sm:mb-10">

          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="text-[10px] sm:text-xs md:text-sm lg:text-base 
              px-2 sm:px-3 md:px-4 py-1 sm:py-2 
              rounded-full border border-white/40 
              hover:bg-secondary hover:border-secondary transition duration-200"
            >
              {service.label}
            </Link>
          ))}
        </div>

        {/* زر CTA */}
        <Link
          href="/orderPage"
          className="bg-secondary text-white 
          py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-10 
          rounded-full font-bold 
          text-xs sm:text-sm md:text-lg lg:text-xl
          shadow-lg hover:scale-110 hover:shadow-2xl transition duration-300"
        >
          احجز خدمتك اليوم
        </Link>
      </div>

    </div>
  );
};

export default Hero;
