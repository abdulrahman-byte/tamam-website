import { Container, Box, Text } from "@mantine/core";
import { Alert } from "@mantine/core";
import { FaExclamationTriangle } from "react-icons/fa";
import { courses } from "@/app/data/courses";
import ClientCourseDetails from "./ClientCourseDetails";

// توليد المسارات الثابتة
export async function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id.toString(),
  }));
}

// وصف الصفحة للمحركات
export const metadata = {
  title: "تفاصيل الدورة",
  description: "صفحة تفاصيل الدورة مع نموذج التسجيل",
};

// Server Component بدون "use client"
export default async function CoursePage({ params }) {
  const { id } = await params;
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <Container size="lg" className="py-16 text-center">
        <Alert
          color="red"
          icon={<FaExclamationTriangle />}
          title="الكورس غير موجود"
          radius="lg"
        >
          <Text>يرجى التحقق من الرابط أو العودة للصفحة السابقة</Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-8 md:py-12 px-4">
      {/* العنوان والشعار - Server Side */}
      <Box className="flex flex-col items-center text-center mb-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {course.title}
        </div>
        <Text className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
          احصل على أفضل تدريب متخصص وطوّر مهاراتك المهنية
        </Text>
      </Box>

      {/* Client Component مع التفاعلية */}
      <ClientCourseDetails course={course} />
    </Container>
  );
}