"use client";
import React from "react";
import { Card, Title, Button, Badge, Group } from "@mantine/core";

const items = [
  { id: 1, title: "عنوان الكرت 1", desc: "وصف مختصر للكرت", img: "/img1.jpg", location: "السودان" },
  { id: 2, title: "عنوان الكرت 2", desc: "وصف مختصر للكرت", img: "/img2.jpg", location: "السودان" },
  { id: 3, title: "عنوان الكرت 3", desc: "وصف مختصر للكرت", img: "/img3.jpg", location: "السودان" },
  { id: 4, title: "عنوان الكرت 4", desc: "وصف مختصر للكرت", img: "/img4.jpg", location: "السودان" },
];

export default function CardsEntertainment() {
  return (
    <div>
      <Title order={2} className="mb-6">الأقسام</Title>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card key={item.id} radius="xl" shadow="md" className="p-4">
            <img src={item.img} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="font-bold text-lg mt-3">{item.title}</h3>
            <p className="text-gray-600 mt-1">{item.desc}</p>
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <Badge color="gray" variant="light">{item.location}</Badge>
              <Group>
                <Button size="xs" color="indigo">قابلني</Button>
                <Button size="xs" variant="outline" color="indigo">أرسل عبر تلجرام</Button>
              </Group>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
