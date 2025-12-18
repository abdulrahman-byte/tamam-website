import React from "react";
// import AskImg from "../../../../public/ask.gif";
import Image from "next/image";

const Ask = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-10 text-center md:text-right mt-30">
      {/* الصورة - على اليسار */}
      <div className="md:order-1">
        <Image
          className="rounded-4xl"
          src="/ask.gif"
          alt="لا توجد أسئلة"
          width={600}
          height={600}
        />
      </div>

      {/* النص - على اليمين */}
      <div className="max-w-md md:order-2">
        <h2 className="text-4xl font-bold mb-4">الأسئلة الشائعة</h2>
        <h3 className="text-lg font-semibold mb-2">لا توجد أسئلة بعد</h3>
        <p className="text-base leading-relaxed text-gray-700">
          يمكنك أن تسأل من قسم "تواصل معنا" في خانة الرسالة، وسيتم الرد على سؤالك في أقرب وقت،
          أو عبر منصات التواصل الاجتماعي الخاصة بنا.
        </p>
      </div>
    </div>
  );
};

export default Ask;
