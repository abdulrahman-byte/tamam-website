import { FaStar, FaLock, FaBolt, FaThumbsUp } from "react-icons/fa6";
import React from "react";

const features = [
  {
    icon: <FaStar />,
    title: "جودة عالية",
    description: "نضمن تقديم خدمات ذات جودة استثنائية ترضي توقعات العملاء.",
  },
  {
    icon: <FaLock />,
    title: "أمان وخصوصية",
    description: "نحافظ على سرية بياناتك ومشاريعك بأعلى معايير الأمان.",
  },
  {
    icon: <FaBolt />,
    title: "سرعة التنفيذ",
    description: "ننفذ المشاريع بكفاءة وسرعة مع الحفاظ على الجودة.",
  },
  {
    icon: <FaThumbsUp />,
    title: "دعم مميز",
    description: "فريق دعم متعاون جاهز للرد على استفساراتك ومساعدتك في كل الأوقات.",
  },
];

const Features = () => {
  return (
    <section className="mt-24 sm:mt-28 md:mt-32">
      <div className="container mx-auto text-center px-4 sm:px-6 md:px-10">
        
        {/* العنوان */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-12 text-gray-800">
          مميزاتنا
        </h2>

        {/* الشبكة */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-4 
            gap-6 sm:gap-8 md:gap-10
          "
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                bg-white 
                p-5 sm:p-6 md:p-7 
                rounded-2xl 
                shadow-md 
                hover:shadow-2xl 
                transition 
                duration-300 
                transform 
                hover:-translate-y-2
              "
            >
              {/* الأيقونة */}
              <div className="text-primary text-4xl sm:text-5xl md:text-6xl mb-4 flex justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                {feature.icon}
              </div>

              {/* العنوان */}
              <h3 className="text-lg sm:text-xl md:text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>

              {/* الوصف */}
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-6 md:leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
