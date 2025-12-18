"use client";
import React from "react";
import { menu } from "@/app/data/design/menu"; // بيانات القوائم
import DesignsGrid from "@/app/components/ui/DesignsGrid/DesignsGrid";

export default function MenuDesigns() {
  return (
    <DesignsGrid
      data={menu}
      title="تصاميم القوائم (Menu)"
      selectUrlPrefix="menuPage"
      description="هنا ستجد مجموعة متنوعة من تصاميم القوائم (Menu) الخاصة بالمطاعم، الكافيهات، والفنادق. هذه التصاميم مصممة بعناية لتعرض أصناف الطعام والمشروبات بشكل أنيق وجذاب يساعد على جذب العملاء."
    />
  );
}
