import { company } from "@/app/data/design/company";
import DesignDetails from "@/app/components/ui/DesignDetails/DesignDetails";

// توليد المسارات الثابتة
export async function generateStaticParams() {
  const allDesigns = [];
  
  // جمع كل التصاميم من جميع الفئات
  Object.values(company).forEach((category) => {
    if (Array.isArray(category)) {
      category.forEach((design) => {
        // تأكد من أن الـ ID نصي
        allDesigns.push({
          id: design.id.toString(),
        });
      });
    }
  });
  
  console.log(`تم توليد ${allDesigns.length} مسار ثابت للهوية التجارية`);
  return allDesigns;
}

// Server Component
export default function CompanyDetailPage() {
  return (
    <DesignDetails
      dataObject={company}
      sectionTitle="تصاميم الهوية التجارية"
    />
  );
}