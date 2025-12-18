"use client";
import React from "react";
import { socialMedia } from "@/app/data/design/socialMedia"; // بيانات تصاميم السوشيال ميديا
import DesignsGrid from "@/app/components/ui/DesignsGrid/DesignsGrid";

export default function SocialMediaDesigns() {
  return (
    <DesignsGrid
      data={socialMedia}
      title="تصاميم السوشيال ميديا"
      selectUrlPrefix="socialMediaPage"
      description="هنا ستجد مجموعة متنوعة من قوالب السوشيال ميديا المصممة بعناية لتناسب مختلف المشاريع والخدمات والمنتجات. يمكنك اختيار التصميم الذي يعكس هوية عملك ويجذب جمهورك المستهدف."
    />
  );
}
