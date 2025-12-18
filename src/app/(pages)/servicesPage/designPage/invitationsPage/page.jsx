import DesignsGrid from "@/app/components/ui/DesignsGrid/DesignsGrid";
import { invitations } from "@/app/data/design/invitations"; // ← بيانات الدعوات
import React from "react";

export default function InvitationsPage() {
  return (
    <DesignsGrid
      data={invitations}
      title="قوالب الدعوات الإلكترونية"
        selectUrlPrefix="invitationsPage"
      description={`هنا ستجد مجموعة متنوعة من قوالب الدعوات الإلكترونية المصممة بعناية لتناسب مختلف المناسبات مثل حفلات الزفاف، أعياد الميلاد، الاجتماعات الرسمية والمناسبات الخاصة. اختر الدعوة التي تعكس أجواء مناسبتك وتجذب المدعوين بطريقة أنيقة واحترافية.`}
    />
  );
}
