"use client";
import { Button, TextInput, NumberInput, Stack, Group } from "@mantine/core";
import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = () => {
    alert("✅ تم تسجيلك في الدورة بنجاح");
  };

  return (
    <Stack gap="sm" mt="lg" className="max-w-md mx-auto">
      <TextInput
        label="الاسم"
        placeholder="اكتب اسمك"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
        required
        icon={<FaUser />}
      />
      <TextInput
        label="البريد الإلكتروني"
        placeholder="example@email.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.currentTarget.value })}
        required
        icon={<FaEnvelope />}
      />
      <NumberInput
        label="رقم الهاتف"
        placeholder="05xxxxxxxx"
        value={formData.phone}
        onChange={(val) => setFormData({ ...formData, phone: val || "" })}
        required
        icon={<FaPhone />}
      />
      <Group justify="center" mt="md">
        <Button size="md" color="primary" radius="md" onClick={handleSubmit}>
          تسجيل في الدورة
        </Button>
      </Group>
    </Stack>
  );
}
