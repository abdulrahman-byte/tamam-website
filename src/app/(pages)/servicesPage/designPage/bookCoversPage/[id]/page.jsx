import { bookCovers } from "@/app/data/design/bookCovers";
import DesignDetails from "@/app/components/ui/DesignDetails/DesignDetails";

// توليد المسارات الثابتة
export async function generateStaticParams() {
  const allDesigns = [];
  
  // جمع كل التصاميم من جميع الفئات
  Object.values(bookCovers).forEach((category) => {
    if (Array.isArray(category)) {
      category.forEach((design) => {
        // تأكد من أن الـ ID نصي
        allDesigns.push({
          id: design.id.toString(),
        });
      });
    }
  });
  
  console.log(`تم توليد ${allDesigns.length} مسار ثابت لأغلفة الكتب`);
  return allDesigns;
}

// Server Component
export default function BookCoverDetailPage() {
  return (
    <DesignDetails
      dataObject={bookCovers}
      sectionTitle="تصاميم أغلفة الكتب"
    />
  );
}