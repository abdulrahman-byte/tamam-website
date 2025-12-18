import React from "react";
import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function HeaderSection() {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
      <div className="text-3xl md:text-4xl font-extrabold mb-4">
        المنتجات
      </div>
      <Text className="text-gray-600 text-lg">
        المنتجات المعروضة لدينا مقدمة من شركات متعددة تنضم إلينا لعرض متاجرها 
        ومنتجاتها في منصتنا. يمكنكم أيضاً إضافة متجركم للانضمام إلى شبكتنا.
      </Text>
      <Link
        href="/joinPage"
        className="mt-6 bg-primary hover:bg-white hover:text-primary cursor-pointer transation duration-300 rounded-full py-2 px-6 w-fit text-white"
      >
        انضم الآن كتاجر
      </Link>
    </div>
  );
}
