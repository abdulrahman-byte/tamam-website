import React from "react";
import {
  FaCode,
  FaLanguage,
  FaVideo,
  FaBullhorn,
  FaChalkboardTeacher,
  FaPencilRuler,
} from "react-icons/fa";

const services = [
  {
    id: "01",
    title: "برمجة المواقع",
    description:
      "نقوم ببرمجة مواقع ويب متكاملة باستخدام أحدث التقنيات، سواء عبر أطر عمل مثل Next.js، أو منصات إدارة المحتوى مثل ووردبريس، أو أي طريقة أخرى تناسب احتياجاتك، مع ضمان أداء عالي وتجربة سلسة.",
    icon: <FaCode />,
  },
  {
    id: "02",
    title: "تصميم UI/UX",
    description:
      "تصميم واجهات مستخدم إبداعية وتجربة مستخدم محسنة تساعد في زيادة التفاعل.",
    icon: <FaPencilRuler />,
  },
  {
    id: "03",
    title: "خدمات الترجمة",
    description:
      "ترجمة احترافية للنصوص والمقالات بأكثر من لغة وفق المعايير الدولية.",
    icon: <FaLanguage />,
  },
  {
    id: "04",
    title: "مونتاج الفيديوهات",
    description: "تحرير ومونتاج فيديو احترافي للإعلانات والمحتوى الرقمي.",
    icon: <FaVideo />,
  },
  {
    id: "05",
    title: "التسويق الرقمي",
    description:
      "استراتيجيات تسويق رقمي مدروسة لزيادة الوصول وتحقيق النتائج.",
    icon: <FaBullhorn />,
  },
  {
    id: "06",
    title: "التعليم الإلكتروني",
    description: "تقديم كورسات وورش عمل عبر الإنترنت بطريقة تفاعلية.",
    icon: <FaChalkboardTeacher />,
  },
];

const DesCard = () => {
  return (
    <div className="mt-20 sm:mt-28 md:mt-32">
      <h1 className="font-bold text-center mb-10 text-2xl sm:text-3xl md:text-4xl">
        الخدمات
      </h1>

      <div
        className="container mx-auto grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-6 sm:gap-8 md:gap-10 
        mt-12 px-4 lg:px-0"
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl relative overflow-hidden 
              shadow-[0px_0px_15px_rgba(0,0,0,0.09)] 
              p-7 sm:p-8 md:p-9 
              space-y-4 
              transition duration-300 
              hover:-translate-y-2 hover:shadow-xl"
          >
            {/* الدائرة */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full absolute -left-4 -top-5 sm:-left-5 sm:-top-7">
              <p className="absolute bottom-4 sm:bottom-6 right-6 sm:right-7 text-white text-xl sm:text-2xl font-bold">
                {service.id}
              </p>
            </div>

            {/* الأيقونة */}
            <div className="text-primary text-3xl sm:text-4xl transition-transform duration-300 hover:scale-110">
              {service.icon}
            </div>

            {/* النص */}
            <h1 className="font-bold text-lg sm:text-xl">{service.title}</h1>

            <p className="text-sm sm:text-base text-zinc-500 leading-6">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesCard;
