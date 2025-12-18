"use client";
import React, { useState } from "react";
import { Card, Button, Modal, Pagination } from "@mantine/core";
import Link from "next/link";

export default function DesignsGrid({
  data,
  title,
  description,
  selectUrlPrefix,
}) {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [opened, setOpened] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const categories = ["الكل", ...Object.keys(data)];

  const filteredDesigns =
    selectedCategory === "الكل"
      ? Object.values(data).flat()
      : data[selectedCategory];

  const itemsPerPage = 16;
  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);

  const paginatedDesigns = filteredDesigns.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // الخطوات ثابتة
  const steps = [
    "اختر الفئة المناسبة.",
    "اختر القالب المناسب لك من خلال زر اختيار.",
    "سيتم نقلك إلى صفحة تعبئة البيانات (الاسم، البريد، إلخ).",
    "سيتم تعديل التصميم بالكامل حسب طلبك واحتياجاتك.",
    "بعد ذلك تتم عملية الدفع ثم استلام التصميم النهائي.",
  ];

  return (
    <div className="container mx-auto py-10">
      {/* العنوان */}
      <h1 className="text-3xl font-bold text-center mb-6 black">{title}</h1>

      {/* الوصف */}
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      {/* خطوات الاستخدام ثابتة */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          خطوات الاستخدام
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-800">
          {steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>

      {/* أزرار الفلترة */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "filled" : "light"}
            color="blue"
            onClick={() => {
              setSelectedCategory(cat);
              setActivePage(1);
            }}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* التصاميم */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
        {paginatedDesigns.map((design) => (
          <Card
            key={design.id}
            shadow="sm"
            radius="lg"
            className="relative overflow-hidden group"
          >
            {/* صورة / فيديو / PDF */}
            <div className="w-full h-60">
              {design.img ? (
                <img
                  src={design.img}
                  alt={design.title}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : design.video ? (
                <video
                  src={design.video}
                  className="w-full h-full object-cover rounded-md"
                  muted
                  autoPlay
                  loop
                />
              ) : design.pdf ? (
                <iframe
                  src={design.pdf}
                  className="w-full h-full rounded-md"
                  title="PDF preview"
                />
              ) : null}
            </div>

            {/* عنوان + السعر + أزرار */}
            <div className="p-3 text-center flex flex-col justify-between h-[150px]">
              <div>
                <h3 className="font-semibold">{design.title}</h3>

                {design.price && (
                  <div className="flex flex-col items-center my-3 min-h-[50px]">
                    {design.discount ? (
                      <>
                        <span className="text-red-600 line-through text-md">
                          {design.price} جنيه سوداني
                        </span>
                        <span className="text-green-700  text-md">
                          {Math.round(
                            design.price -
                              (design.price * design.discount) / 100
                          )}{" "}
                          جنيه سوداني
                        </span>
                      </>
                    ) : (
                      <span className=" text-md text-gray-800">
                        {design.price} جنيه سوداني
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* الأزرار */}
              <div className="flex gap-2 justify-center mt-auto">
                {selectUrlPrefix ? (
                  <Link
                    href={`/servicesPage/designPage/${selectUrlPrefix}/${encodeURIComponent(
                      design.id
                    )}`}
                  >
                    <Button color="blue" radius="md">
                      اختيار
                    </Button>
                  </Link>
                ) : (
                  <Button
                    color="blue"
                    radius="md"
                    onClick={() => console.log("Selected:", design)}
                  >
                    اختيار
                  </Button>
                )}

                <Button
                  variant="outline"
                  color="blue"
                  radius="md"
                  onClick={() => {
                    setPreviewItem(design);
                    setOpened(true);
                  }}
                >
                  معاينة
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* أزرار الصفحات */}
 {/* الشاشات الكبيرة */}
<div className="hidden sm:flex justify-center mt-10">
  <Pagination
    total={totalPages}
    value={activePage}
    onChange={setActivePage}
    color="blue"
    radius="md"
    size="lg"
  />
</div>

{/* الشاشات الصغيرة */}
<div className="flex sm:hidden justify-center mt-10 overflow-x-auto">
  <div className="flex flex-nowrap">
    <Pagination
      total={totalPages}
      value={activePage}
      onChange={setActivePage}
      color="blue"
      radius="md"
      size="sm"
      className="whitespace-nowrap"
    />
  </div>
</div>


      {/* نافذة المعاينة */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg"
        centered
        title="معاينة التصميم"
      >
        {previewItem?.img && (
          <img
            src={previewItem.img}
            alt={previewItem.title}
            className="w-full h-auto object-contain rounded-lg"
          />
        )}
        {previewItem?.video && (
          <video
            src={previewItem.video}
            className="w-full h-auto rounded-lg"
            controls
            autoPlay
          />
        )}
        {previewItem?.pdf && (
          <iframe
            src={previewItem.pdf}
            className="w-full h-[80vh] rounded-lg"
            title="PDF preview"
          />
        )}
      </Modal>
    </div>
  );
}
