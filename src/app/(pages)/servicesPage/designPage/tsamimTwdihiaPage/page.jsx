"use client";
import React from "react";
import { tsamimTwdihia } from "@/app/data/design/tsamimTwdihia"; // بيانات التصاميم التوضيحية
import DesignsGrid from "@/app/components/ui/DesignsGrid/DesignsGrid";

export default function TsamimTwdihia() {
  return (
    <DesignsGrid
      data={tsamimTwdihia}
      title="التصاميم التوضيحية"
      description="هنا ستجد مجموعة متنوعة من التصاميم التوضيحية التي تساعدك على عرض أفكارك ومشاريعك بشكل بصري جذاب وواضح. هذه التصاميم مناسبة للعروض التقديمية، الشروحات، والمواد التعليمية."
      selectUrlPrefix="tsamimTwdihiaPage"
    />
  );
}
