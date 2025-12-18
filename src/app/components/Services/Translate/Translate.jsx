"use client";
import {
  Card,
  Button,
  TextInput,
  Select,
  Group,
  Stack,
  Radio,
  Divider,
  Modal,
  Alert,
  Title,
  Text,
  Badge,
  Loader,
  Progress,
  Accordion,
  ActionIcon,
  Tooltip,
  Container,
  Box,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLanguage,
  FaFileAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEdit,
  FaTimes,
  FaLock,
  FaGlobe,
  FaStar,
  FaShield,
  FaClock,
  FaMedal,
  FaShieldAlt,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function TranslatePage() {
  const [formData, setFormData] = useState({
    fromLang: "Ar",
    toLang: "En",
    fileType: "Word",
    name: "",
    phone: "",
    email: "",
  });

  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timer;
    if (successModal) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCloseSuccessModal();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [successModal]);

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "الاسم مطلوب";
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s]{2,}$/.test(formData.name.trim())) {
      return "الاسم يجب أن يحتوي على حروف فقط ويكون أكثر من حرفين";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return "البريد الإلكتروني غير صحيح";
    }
    // ✅ تحديث شرط رقم الهاتف
    if (!/^00\d{9,13}$/.test(String(formData.phone).trim())) {
      return "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 و يتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)";
    }
    return "";
  };

  const sendFormEmail = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setConfirmModal(false);
    setLoading(true);
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_zqvbwns",
        "template_zsb79zq",
        {
          fromLang: formData.fromLang,
          toLang: formData.toLang,
          fileType: formData.fileType,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          order_date: new Date().toLocaleString("ar-SA"),
          order_id: `TR-${Date.now().toString().slice(-8)}`,
        },
        "ZxLtSLDcogh2r5j2i"
      );
      setSuccessModal(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    setRemainingTime(10);
    setFormData({
      fromLang: "Ar",
      toLang: "En",
      fileType: "Word",
      name: "",
      phone: "",
      email: "",
    });
    setError("");
  };

  const languages = [
    { value: "Ar", label: "العربية" },
    { value: "En", label: "الإنجليزية" },
  ];

  const fileTypes = [
    { value: "Word", label: "مستند Word", icon: <FaFileAlt /> },
    { value: "PowerPoint", label: "عرض PowerPoint", icon: <FaFileAlt /> },
    { value: "PDF", label: "ملف PDF", icon: <FaFileAlt /> },
    { value: "Excel", label: "جدول Excel", icon: <FaFileAlt /> },
    { value: "Image", label: "صورة", icon: <FaFileAlt /> },
    { value: "Text", label: "نص عادي", icon: <FaFileAlt /> },
    { value: "HTML", label: "ملف HTML", icon: <FaFileAlt /> },
    { value: "Other", label: "نوع آخر", icon: <FaFileAlt /> },
  ];

  return (
    <Container size="lg" className="py-8 md:py-12 px-4">
      {/* العنوان والشعار */}
      <Box className="flex flex-col items-center text-center mb-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          احصل على ترجمة دقيقة لمستنداتك
        </div>
        <Text className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
          نترجم مستنداتك بدقة عالية مع الحفاظ على المعنى الأصلي وسرية المعلومات
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" className="mb-8">
        {/* مزايا الخدمة */}
        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaMedal className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">
              ترجمة احترافية
            </Text>
            <Text size="sm" className="text-gray-600">
              باستخدام مترجمين خبراء متخصصين
            </Text>
          </Stack>
        </Paper>

        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaShieldAlt className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">
              خصوصية تامة
            </Text>
            <Text size="sm" className="text-gray-600">
              نضمن سرية مستنداتك وبياناتك
            </Text>
          </Stack>
        </Paper>

        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaGlobe className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">
              دعم اللغتين
            </Text>
            <Text size="sm" className="text-gray-600">
              ترجمة بين العربية والإنجليزية
            </Text>
          </Stack>
        </Paper>
      </SimpleGrid>

      {/* النموذج الرئيسي */}
      <Card shadow="lg" radius="lg" withBorder className="p-6 md:p-8">
        {error && (
          <Alert
            icon={<FaExclamationTriangle />}
            title="تنبيه"
            color="red"
            radius="md"
            className="mb-6"
            onClose={() => setError("")}
            withCloseButton
          >
            {error}
          </Alert>
        )}

        <Stack gap="xl">
          {/* قسم اللغات */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaLanguage className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">
                  اختر اللغات
                </Text>
                <Text size="sm" className="text-gray-500">
                  حدد اللغة المصدر واللغة الهدف
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Box>
                <Text fw={500} className="mb-2 text-gray-700">
                  من اللغة
                </Text>
                <Select
                  data={languages}
                  value={formData.fromLang}
                  onChange={(val) =>
                    setFormData({ ...formData, fromLang: val })
                  }
                  leftSection={<FaLanguage className="text-gray-400" />}
                  size="md"
                  radius="md"
                  className="w-full"
                />
              </Box>

              <Box>
                <Text fw={500} className="mb-2 text-gray-700">
                  إلى اللغة
                </Text>
                <Select
                  data={languages}
                  value={formData.toLang}
                  onChange={(val) => setFormData({ ...formData, toLang: val })}
                  leftSection={<FaLanguage className="text-gray-400" />}
                  size="md"
                  radius="md"
                  className="w-full"
                />
              </Box>
            </div>
          </Box>

          {/* نوع الملف */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaFileAlt className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">
                  نوع الملف
                </Text>
                <Text size="sm" className="text-gray-500">
                  اختر نوع الملف المراد ترجمته
                </Text>
              </div>
            </div>
            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
              {fileTypes.map((type) => (
                <Paper
                  key={type.value}
                  withBorder
                  p="md"
                  radius="md"
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    formData.fileType === type.value
                      ? "border-blue-500 bg-blue-100 shadow-md transform scale-101"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, fileType: type.value });
                    // تأثير صوتي (اختياري)
                    if (typeof window !== "undefined") {
                      const audio = new Audio("/click-sound.mp3");
                      audio.play().catch(() => {});
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (formData.fileType !== type.value) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.fileType !== type.value) {
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <Stack align="center" gap="xs">
                    <div
                      className={`text-xl ${
                        formData.fileType === type.value
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-500"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <Text
                      size="sm"
                      fw={500}
                      className={`text-center ${
                        formData.fileType === type.value
                          ? "text-blue-700 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {type.label}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          </Box>
          
          {/* بيانات التواصل */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">
                  معلومات التواصل
                </Text>
                <Text size="sm" className="text-gray-500">
                  أدخل بياناتك للتواصل معك
                </Text>
              </div>
            </div>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
              <TextInput
                label="الاسم الكامل"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.currentTarget.value })
                }
                required
                size="md"
                radius="md"
                error={formData.name && !/^[\u0600-\u06FFa-zA-Z\s]{2,}$/.test(formData.name.trim()) ? "الاسم يجب أن يحتوي على حروف فقط ويكون أكثر من حرفين" : null}
              />

              <TextInput
                label="رقم الهاتف"
                placeholder="00xxxxxxxxxxx"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.currentTarget.value })
                }
                required
                size="md"
                radius="md"
                maxLength={15}
                error={formData.phone && !/^00\d{9,13}$/.test(String(formData.phone).trim()) ? "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 و يتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)" : null}
              />

              <TextInput
                label="البريد الإلكتروني"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.currentTarget.value })
                }
                required
                size="md"
                radius="md"
                error={formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) ? "البريد الإلكتروني غير صحيح" : null}
              />
            </SimpleGrid>
          </Box>

          {/* زر الإرسال */}
          <Box className="text-center pt-4">
            <Button
              size="lg"
              color="blue"
              radius="md"
              onClick={() => {
                const error = validateForm();
                if (error) {
                  setError(error);
                } else {
                  setConfirmModal(true);
                }
              }}
              leftSection={<FaPaperPlane />}
              loading={loading}
              className="px-12 py-3 text-lg font-semibold mb-3"
            >
              إرسال طلب الترجمة
            </Button>

            <Text size="sm" className="text-gray-500 mt-5">
              سنتواصل معك خلال 24 ساعة لتأكيد الطلب وتقديم السعر
            </Text>
          </Box>
        </Stack>
      </Card>

      {/* مودال التأكيد */}
      <Modal
        opened={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="تأكيد طلب الترجمة"
        size="lg"
        centered
        radius="lg"
      >
        <Stack gap="lg">
          <Alert
            color="blue"
            icon={<FaCheckCircle />}
            title="الرجاء التحقق من البيانات"
          >
            تأكد من صحة المعلومات قبل الإرسال النهائي
          </Alert>

          <SimpleGrid cols={2} spacing="md">
            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">
                الاسم
              </Text>
              <Text fw={500}>{formData.name}</Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">
                البريد الإلكتروني
              </Text>
              <Text fw={500}>{formData.email}</Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">
                رقم الهاتف
              </Text>
              <Text fw={500}>{formData.phone}</Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">
                نوع الملف
              </Text>
              <Text fw={500}>
                {fileTypes.find((f) => f.value === formData.fileType)?.label ||
                  formData.fileType}
              </Text>
            </Paper>
          </SimpleGrid>

          <Paper withBorder p="md" radius="md" className="bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <Text fw={600} size="sm" className="text-gray-500">
                  الترجمة من
                </Text>
                <Text fw={500}>
                  {languages.find((l) => l.value === formData.fromLang)
                    ?.label || formData.fromLang}
                </Text>
              </div>
              <FaArrowLeft className="text-blue-500" />
              <div>
                <Text fw={600} size="sm" className="text-gray-500">
                  الترجمة إلى
                </Text>
                <Text fw={500}>
                  {languages.find((l) => l.value === formData.toLang)?.label ||
                    formData.toLang}
                </Text>
              </div>
            </div>
          </Paper>

          <Group justify="center" gap="md">
            <Button
              color="blue"
              onClick={sendFormEmail}
              leftSection={<FaPaperPlane />}
              loading={isSubmitting}
              size="md"
              radius="md"
            >
              تأكيد الإرسال
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmModal(false)}
              leftSection={<FaEdit />}
              size="md"
              radius="md"
            >
              تعديل البيانات
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* مودال النجاح */}
      <Modal
        opened={successModal}
        onClose={handleCloseSuccessModal}
        title="تم إرسال الطلب بنجاح"
        centered
        radius="lg"
        withCloseButton={false}
        size="md"
      >
        <Stack gap="lg" align="center">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
              <FaCheckCircle className="text-4xl text-blue-600" />
            </div>
            <div className="text-xl font-bold text-gray-800 mb-2">
              شكراً لك {formData.name}!
            </div>
            <Text className="text-gray-600 mb-4 text-center">
              تم استلم طلب الترجمة بنجاح وسنتواصل معك قريباً عبر البريد
              الإلكتروني
            </Text>
          </div>

          <Paper withBorder p="md" radius="md" className="w-full">
            <Stack gap="xs">
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-gray-500">
                  رقم المرجع
                </Text>
                <Badge color="blue">TR-{Date.now().toString().slice(-8)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-gray-500">
                  التاريخ
                </Text>
                <Text size="sm" fw={500}>
                  {new Date().toLocaleString("ar-SA")}
                </Text>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-gray-500">
                  نوع الملف
                </Text>
                <Text size="sm" fw={500}>
                  {fileTypes.find((f) => f.value === formData.fileType)
                    ?.label || formData.fileType}
                </Text>
              </div>
            </Stack>
          </Paper>

          <Box className="w-full">
            <div className="flex items-center justify-between mb-2">
              <Text size="sm" className="text-gray-500">
                سيتم الإغلاق تلقائياً خلال
              </Text>
              <Text size="sm" fw={600} className="text-blue-600">
                {remainingTime} ثانية
              </Text>
            </div>
            <Progress
              value={((10 - remainingTime) / 10) * 100}
              size="sm"
              color="blue"
              className="w-full"
            />
          </Box>

          <Button
            color="blue"
            onClick={handleCloseSuccessModal}
            size="md"
            radius="md"
            fullWidth
            variant="light"
          >
            إغلاق
          </Button>
        </Stack>
      </Modal>

      {/* مزايا إضافية */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" className="mt-8">
        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaClock className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            تسليم سريع
          </Text>
          <Text size="sm" className="text-gray-600">
            نضمن التسليم في الوقت المتفق عليه
          </Text>
        </Card>

        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaMedal className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            جودة عالية
          </Text>
          <Text size="sm" className="text-gray-600">
            ترجمة دقيقة مع الحفاظ على المعنى
          </Text>
        </Card>

        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaCheckCircle className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            مراجعات مجانية
          </Text>
          <Text size="sm" className="text-gray-600">
            تعديلات مجانية حتى الرضا التام
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
}