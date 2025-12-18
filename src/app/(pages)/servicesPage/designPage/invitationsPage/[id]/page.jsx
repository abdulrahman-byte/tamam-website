import { invitations } from "@/app/data/design/invitations";
import DesignDetails from "@/app/components/ui/DesignDetails/DesignDetails";

// توليد المسارات الثابتة
export async function generateStaticParams() {
  const allDesigns = [];
  
  // جمع كل التصاميم من جميع الفئات
  Object.values(invitations).forEach((category) => {
    if (Array.isArray(category)) {
      category.forEach((design) => {
        // تأكد من أن الـ ID نصي
        allDesigns.push({
          id: design.id.toString(),
        });
      });
    }
  });
  
  console.log(`تم توليد ${allDesigns.length} مسار ثابت للدعوات`);
  return allDesigns;
}

// Server Component
export default function InvitationDetailPage() {
  return (
    <DesignDetails
      dataObject={invitations}
      sectionTitle="تصاميم الدعوات"
    />
  );
}