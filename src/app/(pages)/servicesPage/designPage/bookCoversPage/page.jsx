import DesignsGrid from "@/app/components/ui/DesignsGrid/DesignsGrid";
import { bookCovers } from "@/app/data/design/bookCovers";

export default function page() {
  return (
    <DesignsGrid
      data={bookCovers}
      title="تصاميم أغلفة الكتب"
      selectUrlPrefix="bookCoversPage"
      description="       هنا ستجد مجموعة متنوعة من قوالب أغلفة الكتب والروايات، مصممة بعناية
        لتناسب مختلف الأنواع الأدبية. اختر الغلاف الذي يعكس روح كتابك ويجذب
        القراء."
      previewTitle="معاينة الغلاف"
    />
  );
}
