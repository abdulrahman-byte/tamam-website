import { menu } from "@/app/data/design/menu";
import DesignDetails from "@/app/components/ui/DesignDetails/DesignDetails";

// توليد المسارات الثابتة
export async function generateStaticParams() {
  const allDesigns = [];
  
  // جمع كل التصاميم من جميع الفئات
  Object.values(menu).forEach((category) => {
    if (Array.isArray(category)) {
      category.forEach((design) => {
        // تأكد من أن الـ ID نصي
        allDesigns.push({
          id: design.id.toString(),
        });
      });
    }
  });
  
  console.log(`تم توليد ${allDesigns.length} مسار ثابت للقوائم`);
  return allDesigns;
}

// Server Component
export default function MenuDetailPage() {
  return (
    <DesignDetails
      dataObject={menu}
      sectionTitle="تصاميم القوائم"
    />
  );
}