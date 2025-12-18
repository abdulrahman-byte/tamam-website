// "use client";
// import React from "react";

// const works = [
//   {
//     title: "التصميم",
//     description: "تصاميم مبتكرة تناسب مختلف الاحتياجات والأذواق.",
//     projects: ["شعار متجر إلكتروني", "تصميم بطاقة عمل", "هوية بصرية"],
//   },
//   {
//     title: "البرمجة",
//     description: "تطوير مواقع وتطبيقات باستخدام أحدث التقنيات.",
//     projects: ["موقع عقاري", "لوحة تحكم", "API لإدارة الطلبات"],
//   },
//   {
//     title: "المونتاج",
//     description: "تحرير فيديوهات بجودة عالية تناسب جميع المنصات.",
//     projects: ["إعلان قصير", "مقطع تعليمي", "ريلز إنستغرام"],
//   },
//   {
//     title: "الكتابة",
//     description: "محتوى جذاب ودقيق لمواقع التواصل والمدونات.",
//     projects: ["مقال تقني", "منشور إنستغرام", "وصف منتج"],
//   },
//   {
//     title: "التعليم",
//     description: "تجهيز مواد تعليمية ودورات عن بعد.",
//     projects: ["دورة تصميم", "عرض تقديمي", "كتيب PDF"],
//   },
// ];

// const Projects = () => {
//   return (
//     <section className="container mx-auto px-4 ">
//       <h2 className="text-3xl font-bold text-center mt-30 mb-12">أعمالنا</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {works.map((work, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow-xl p-6 flex flex-col justify-between border border-gray-100"
//           >
//             <div>
//               <h3 className="text-xl font-bold text-primary mb-2">{work.title}</h3>
//               <p className="text-gray-600 mb-4">{work.description}</p>

//               {/* Uiverse style container */}
//               <div className="container2">
//                 {work.projects.map((proj, i) => (
//                   <div key={i} className="card2">
//                     <p className="title2">{proj}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* زر المزيد */}
//             <div className="mt-6 text-center">
//               <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition">
//                 المزيد
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Projects;
