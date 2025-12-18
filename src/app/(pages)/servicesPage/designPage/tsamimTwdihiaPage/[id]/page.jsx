// import { tsamimTwdihia } from "@/app/data/design/tsamimTwdihia";
// import DesignDetails from "@/app/components/ui/DesignDetails/DesignDetails";

// // توليد المسارات الثابتة
// export async function generateStaticParams() {
//   const allDesigns = [];
  
//   // جمع كل التصاميم من جميع الفئات
//   Object.values(tsamimTwdihia).forEach((category) => {
//     if (Array.isArray(category)) {
//       category.forEach((design) => {
//         // تأكد من أن الـ ID نصي
//         allDesigns.push({
//           id: design.id.toString(),
//         });
//       });
//     }
//   });
  
//   console.log(`تم توليد ${allDesigns.length} مسار ثابت للتصاميم التوضيحية`);
//   return allDesigns;
// }

// // Server Component
// export default function TsamimTwdihiaDetailPage() {
//   return (
//     <DesignDetails
//       dataObject={tsamimTwdihia}
//       sectionTitle="تصاميم توضيحية"
//     />
//   );
// }