import React from "react";
import {
  FaFileAlt,
  FaSearch,
  FaPencilRuler,
  FaCode,
  FaPaperPlane,
  FaCogs,
} from "react-icons/fa";

const steps = [
  {
    title: "استلام الطلب",
    description:
      "نستقبل طلبك وخدماتك المطلوبة، ونجمع كل المعلومات الضرورية لبدء العمل.",
    icon: <FaFileAlt className="text-white text-lg" />,
  },
  {
    title: "تحليل الاحتياج",
    description:
      "نحلل أهدافك ومتطلباتك سواء كانت تصميم، برمجة، تسويق، أو تعليم عن بعد لضمان وضوح الرؤية.",
    icon: <FaSearch className="text-white text-lg" />,
  },
  {
    title: "مرحلة التصميم",
    description:
      "نقوم بإعداد التصاميم أو الخطط الأولية التي تناسب الخدمة المطلوبة، ونشاركها معك للمراجعة.",
    icon: <FaPencilRuler className="text-white text-lg" />,
  },
  {
    title: "مرحلة التنفيذ",
    description:
      "نبدأ في تطوير أو تنفيذ الخدمة سواء كانت برمجة، حملات تسويقية، أو إعداد محتوى تعليمي.",
    icon: <FaCogs className="text-white text-lg" />,
  },
  {
    title: "التسليم والدعم",
    description:
      "نسلم المشروع مع توفير الدعم والمتابعة لضمان رضاك وتحقيق النتائج المرجوة.",
    icon: <FaPaperPlane className="text-white text-lg" />,
  },
];

const WorkProcess = () => {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mt-20 mb-16 text-gray-800">
        خطوات تنفيذ الخدمة
      </h2>

      <div className="relative">
        {/* خط التايملاين */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-primary" />

        {/* العناصر */}
        <div className="flex flex-col gap-14">
          {steps.map((step, index) => {
            const isRight = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex items-center w-full ${
                  isRight ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-full md:w-1/2 p-6 bg-white shadow-md hover:shadow-xl rounded-xl relative transition transform hover:-translate-y-2 duration-300 ${
                    isRight ? "mr-10" : "ml-10"
                  }`}
                >
                  {/* الدائرة */}
                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 bg-primary w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-transform duration-300 hover:scale-110 ${
                      isRight ? "-right-7" : "-left-7"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* النص */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-6">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
