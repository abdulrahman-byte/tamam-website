import React from "react";
import Image from "next/image";
// import aboutImg from "../../../../public/AboutUsImg.png";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="bg-white mt-20 sm:mt-28 md:mt-32">
      <div
        className="
          container mx-auto 
          flex flex-col-reverse md:flex-row 
          items-center 
          gap-10 lg:gap-16 
          px-5 md:px-0
        "
      >
        {/* النص */}
   <div
  className="
    w-full md:w-1/2 
    text-center md:text-right
    flex flex-col items-center md:items-start
  "
>
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
    من نحن؟
  </h2>

  <p className="text-gray-600 leading-loose text-base sm:text-lg mb-6 max-w-lg md:max-w-full">
    نحن فريق متميز من المصممين، المبرمجين، والمبدعين، نعمل بشغف لتقديم
    خدمات رقمية متكاملة تشمل التصميم، البرمجة، الترجمة، التعليم،
    التسويق والمونتاج، بجودة عالية وأسعار مناسبة.
  </p>

  <Link
    href="/contactPage"
    className="
      inline-block 
      bg-secondary 
      hover:bg-transparent 
      hover:text-secondary 
      text-white 
      py-3 px-8 
      rounded-full 
      font-bold 
      transition 
      duration-200 
      border-2 border-secondary 
      hover:scale-105
    "
  >
    تواصل معنا
  </Link>
</div>


        {/* الصورة */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/AboutUsImg.png"
            alt="من نحن"
            width={600}
            height={600}
            className="w-full max-w-[420px] md:max-w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
