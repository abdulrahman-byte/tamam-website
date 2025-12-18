import React from "react";
import { Card, Grid, Group, Badge } from "@mantine/core";

const overline = "هويتنا";

const title = "الرؤية والرسالة";
const subtitle =
  "نقود التحول الرقمي بخبرة متعددة ونُسلم قيمة تُحدث فرقًا ملموسًا.";

export default function VisionMission() {
  return (
    <section className="py-14">
      <div>
        {/* النصوص */}
        <div className="text-center md:text-right mx-auto md:ml-auto">
          {overline && (
            <div className="mb-4 rounded-full p-2 mx-auto md:mx-0 inline-block text-md font-semibold bg-primary/10 text-primary">
              {overline}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg opacity-80 mt-2">{subtitle}</p>
          )}
        </div>

        {/* الكروت */}
        <Grid mt="md" gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card
              shadow="xs"
              radius="xl"
              className="p-6 sm:p-8 border border-slate-100 h-full"
            >
              <Group justify="space-between" className="flex-wrap">
                <h3 className="font-bold text-lg sm:text-xl">الرؤية</h3>
                <Badge variant="light" radius="sm">
                  Vision
                </Badge>
              </Group>
              <p className="opacity-80 mt-2 text-sm sm:text-base">
                أن نكون المنصة العربية الأبرز للخدمات الرقمية المتكاملة، بتجربة
                عميل سلسة ونتائج قابلة للقياس.
              </p>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card
              shadow="xs"
              radius="xl"
              className="p-6 sm:p-8 border border-slate-100 h-full"
            >
              <Group justify="space-between" className="flex-wrap">
                <h3 className="font-bold text-lg sm:text-xl">الرسالة</h3>
                <Badge variant="light" radius="sm">
                  Mission
                </Badge>
              </Group>
              <p className="opacity-80 mt-2 text-sm sm:text-base">
                تمكين الأفراد والشركات من إطلاق منتجات ومحتوى وتسويق فعال عبر
                حلول تجمع الإبداع بالتقنية.
              </p>
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
}
