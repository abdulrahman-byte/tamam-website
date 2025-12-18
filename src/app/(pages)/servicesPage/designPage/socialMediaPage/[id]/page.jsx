import { socialMedia } from "@/app/data/design/socialMedia";
import DesignDetails from "@/app/components/ui/DesignDetails/DesignDetails";

// توليد المسارات الثابتة - ضروري مع output: 'export'
export async function generateStaticParams() {
  const allDesigns = [];
  
  // جمع كل التصاميم من جميع الفئات
  Object.values(socialMedia).forEach((category) => {
    category.forEach((design) => {
      // تأكد من أن الـ ID نصي
      allDesigns.push({
        id: design.id.toString(),
      });
    });
  });
  
  console.log(`تم توليد ${allDesigns.length} مسار ثابت للتصاميم`);
  return allDesigns;
}

// Server Component
export default function SocialMediaDetailPage() {
  return (
    <DesignDetails
      dataObject={socialMedia}
      sectionTitle="تصاميم السوشيال ميديا"
    />
  );
}