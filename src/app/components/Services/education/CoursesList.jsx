"use client";
import { Card, Button, Grid, Stack, Badge } from "@mantine/core";
import Link from "next/link";
import { FaCheckCircle, FaClock } from "react-icons/fa";

export default function CoursesList({ courses }) {
  return (
    <Grid>
      {courses.map((course) => {
        const discountValue = Number(course.discount) || 0;
        const hasDiscount = discountValue > 0;
        const finalPrice = hasDiscount
          ? Math.round(course.price - (course.price * discountValue) / 100)
          : course.price;

        return (
          <Grid.Col key={course.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="md"
              radius="lg"
              withBorder
              className="flex flex-col h-full transition-transform hover:-translate-y-2 hover:shadow-xl relative"
            >
              {/* صورة الكورس */}
              <Card.Section>
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-[180px] object-cover"
                />
              </Card.Section>

              {/* حالة الكورس */}
              <div className="absolute top-2 left-2 z-10">
                {course.available ? (
                  <Badge color="green" leftSection={<FaCheckCircle size={14} />}>
                    متاح الآن
                  </Badge>
                ) : (
                  <Badge color="yellow" leftSection={<FaClock size={14} />}>
                    قريباً
                  </Badge>
                )}
              </div>

              {/* المحتوى */}
              <Stack gap="sm" mt="sm" className="flex-grow">
                <div className="text-lg font-bold line-clamp-2">
                  {course.title}
                </div>
                <div className="text-sm text-gray-500 line-clamp-3">
                  {course.description}
                </div>

                {/* السعر مع نفس تصميمك */}
                {course.price && (
                  <div className="flex flex-col items-center my-3">
                    {hasDiscount ? (
                      <>
                        <span className="text-red-600 line-through text-md">
                          {course.price.toLocaleString()} جنيه سوداني
                        </span>
                        <span className="text-green-700 font-bold text-md">
                          {finalPrice.toLocaleString()} جنيه سوداني
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold text-gray-800">
                        {course.price.toLocaleString()} جنيه سوداني
                      </span>
                    )}
                  </div>
                )}
              </Stack>

              {/* زر التفاصيل */}
              <Link href={`/servicesPage/educationPage/${course.id}`} className="mt-auto">
                <Button
                  fullWidth
                  radius="md"
                  className="bg-primary hover:bg-transparent hover:text-secondary text-white transition"
                >
                  سجل الآن
                </Button>
              </Link>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
