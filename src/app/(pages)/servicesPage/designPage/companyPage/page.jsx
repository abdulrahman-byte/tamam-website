import DesignsGrid from "@/app/components/ui/DesignsGrid/DesignsGrid";
import { company } from "@/app/data/design/company"; // ← كائن البيانات للشركة
import React from "react";

export default function page() {
  return (
    <DesignsGrid
      data={company}
      title="التصاميم المهنية"
      selectUrlPrefix="companyPage"
      description="      هنا ستجد مجموعة متنوعة من التصاميم المهنية مثل السيرة الذاتية، بطاقات
        العمل، والشهادات. جميعها مصممة بعناية لتناسب مختلف المجالات وتظهر بشكل
        احترافي يعكس هويتك المهنية."
    />
  );
}
