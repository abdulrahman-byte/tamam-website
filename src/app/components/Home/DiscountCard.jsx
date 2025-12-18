import React from "react";

// بيانات الخصومات حسب نوع الخدمة
const discountItems = [
  {
    id: 1,
    category: "برمجة المواقع",
    percentage: "60%",
    expiryDate: "16 مارس 2026",
    link: "/OrderWebPage", // صفحة البرمجة
  },
  {
    id: 2,
    category: "تصميم السير الذاتيه",
    percentage: "50%",
    expiryDate: "16 مارس 2026",
    link: "/servicesPage/designPage/companyPage",
  },
  {
    id: 3,
    category: "الكورسات",
    percentage: "30%",
    expiryDate: "16 مارس 2026",
    link: "/servicesPage/educationPage",
  },
  // {
  //   id: 4,
  //   category: "المونتاج",
  //   percentage: "40%",
  //   expiryDate: "16 مارس 2026",
  //   link: "/servicesPage/MontagePage",
  // },
  {
    id: 5,
    category: "التسويق الرقمي",
    percentage: "10%",
    expiryDate: "16 مارس 2026",
    link: "/servicesPage/marketingPage",
  },
];

// مكون واحد فقط يعرض جميع الكروت
const DiscountCards = () => {
  return (
    <div className="flex flex-col items-center gap-6 container">
      <h2 className="text-3xl font-bold text-center mt-30 mb-6">التخفيضات</h2>

      {/* كروت الخصومات */}
      <div className="flex flex-wrap justify-center gap-6">
        {discountItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden relative w-64 p-6 bg-gray-50 rounded-2xl text-primary flex flex-col justify-end items-center gap-2 transition duration-300"
          >
            <svg
              className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current"
              height="100"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 100 100"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="svg-stroke-primary"
                d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              />
            </svg>

            <div className="flex flex-col items-center">
              <p className="text-xl font-extrabold">{item.category}</p>
              <p className="text-xs">خصم حتى</p>
            </div>

            <span className="font-extrabold text-6xl -skew-x-12 -skew-y-12 -mt-1 mb-3">
              {item.percentage}
            </span>

            <a
              href={item.link}
              className="z-10 px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-300 cursor-pointer"
            >
              اطلب الآن
            </a>

            <p className="text-xs">*الأسعار قد تختلف</p>
            <p className="text-xs text-gray-400 mb-2">ينتهي في: {item.expiryDate}</p>
          </div>
        ))}
      </div>

      {/* <button className="px-6 py-3 bg-primary text-white rounded-full hover:bg-sky-400 transition cursor-pointer">
        المزيد
      </button> */}
    </div>
  );
};

export default DiscountCards;
