"use client";
import {
  Card,
  Button,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Group,
  Stack,
  Modal,
  Alert,
  Title,
  Text,
  Badge,
  Loader,
  Progress,
  Container,
  Box,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import {
  FaBox,
  FaAlignLeft,
  FaTags,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBullhorn,
  FaCreditCard,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEdit,
  FaChartLine,
  FaTarget,
  FaMoneyBill,
  FaBullseye,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function MarketingPage() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    otherCategory: "",
    duration: "",
    name: "",
    email: "",
    phone: "",
    marketingChannels: [],
    otherPlatform: "",
    paymentMethod: "",
    otherPayment: "",
    campaignGoal: "",
    otherGoal: "",
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
    if (!formData.productName.trim()) {
      return "اسم المنتج مطلوب";
    }
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
    if (formData.marketingChannels.length === 0) {
      return "يجب اختيار قناة تسويقية واحدة على الأقل";
    }
    if (!formData.paymentMethod) {
      return "يجب اختيار آلية حساب الرسوم";
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
        "service_krhqmdp",
        "template_zsb79zq",
        {
          productName: formData.productName,
          description: formData.description,
          category:
            formData.category === "Other"
              ? formData.otherCategory
              : formData.category,
          duration: formData.duration,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          marketingChannels: formData.marketingChannels.join(", "),
          otherPlatform: formData.otherPlatform,
          paymentMethod:
            formData.paymentMethod === "Other"
              ? formData.otherPayment
              : formData.paymentMethod,
          campaignGoal:
            formData.campaignGoal === "Other"
              ? formData.otherGoal
              : formData.campaignGoal,
          order_date: new Date().toLocaleString("ar-SA"),
          order_id: `MK-${Date.now().toString().slice(-8)}`,
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
      productName: "",
      description: "",
      category: "",
      otherCategory: "",
      duration: "",
      name: "",
      email: "",
      phone: "",
      marketingChannels: [],
      otherPlatform: "",
      paymentMethod: "",
      otherPayment: "",
      campaignGoal: "",
      otherGoal: "",
    });
    setError("");
  };

  const categories = [
    { value: "مطاعم", label: "مطاعم" },
    { value: "ملابس", label: "ملابس" },
    { value: "تقنية", label: "تقنية" },
    { value: "خدمات", label: "خدمات" },
    { value: "تعليم", label: "تعليم" },
    { value: "صحة", label: "صحة" },
    { value: "سياحة", label: "سياحة" },
    { value: "Other", label: "أخرى" },
  ];

  const marketingChannels = [
    { value: "Facebook", label: "فيسبوك", icon: <FaBullhorn /> },
    { value: "WhatsAppGroups", label: "واتساب - مجموعات", icon: <FaBullhorn /> },
    { value: "WhatsAppNumbers", label: "واتساب - أرقام", icon: <FaBullhorn /> },
    { value: "Instagram", label: "إنستجرام", icon: <FaBullhorn /> },
    { value: "TikTok", label: "تيك توك", icon: <FaBullhorn /> },
    { value: "Twitter", label: "تويتر", icon: <FaBullhorn /> },
    { value: "YouTube", label: "يوتيوب", icon: <FaBullhorn /> },
    { value: "Other", label: "أخرى", icon: <FaBullhorn /> },
  ];

  const campaignGoals = [
    { value: "زيادة المبيعات", label: "زيادة المبيعات" },
    { value: "زيادة المتابعين", label: "زيادة المتابعين" },
    { value: "نشر الوعي بالعلامة التجارية", label: "نشر الوعي بالعلامة التجارية" },
    { value: "إطلاق منتج جديد", label: "إطلاق منتج جديد" },
    { value: "تعزيز المشاركة", label: "تعزيز المشاركة" },
    { value: "جمع العملاء المحتملين", label: "جمع العملاء المحتملين" },
    { value: "Other", label: "أخرى" },
  ];

  const paymentMethods = [
    { value: "نسبة من المبيعات", label: "نسبة من المبيعات" },
    { value: "على عدد مبيعات معين", label: "على عدد مبيعات معين" },
    { value: "مبلغ ثابت", label: "مبلغ ثابت" },
    { value: "اشتراك شهري", label: "اشتراك شهري" },
    { value: "نسبة من الأرباح", label: "نسبة من الأرباح" },
    { value: "حزمة متكاملة", label: "حزمة متكاملة" },
    { value: "Other", label: "أخرى" },
  ];

  return (
    <Container size="lg" className="py-8 md:py-12 px-4">
      {/* العنوان والشعار */}
      <Box className="flex flex-col items-center text-center mb-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          حملة تسويقية ناجحة لمشروعك
        </div>
        <Text className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
          نوفر لك حملات تسويقية احترافية تزيد من مبيعاتك ووصول علامتك التجارية
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" className="mb-8">
        {/* مزايا الخدمة */}
        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaChartLine className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">زيادة المبيعات</Text>
            <Text size="sm" className="text-gray-600">خطط تسويقية تزيد من مبيعاتك</Text>
          </Stack>
        </Paper>

        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaBullseye className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">استهداف دقيق</Text>
            <Text size="sm" className="text-gray-600">وصل إلى جمهورك المستهدف بدقة</Text>
          </Stack>
        </Paper>

        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaMoneyBill className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">خطط مرنة</Text>
            <Text size="sm" className="text-gray-600">اختر الخطة المناسبة لميزانيتك</Text>
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
          {/* معلومات المنتج */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaBox className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">معلومات المنتج</Text>
                <Text size="sm" className="text-gray-500">أدخل معلومات المنتج أو الخدمة</Text>
              </div>
            </div>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <TextInput
                label="اسم المنتج / الخدمة"
                placeholder="أدخل اسم المنتج أو الخدمة"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.currentTarget.value })
                }
                required
                size="md"
                radius="md"
              />
              
              <Select
                label="الفئة"
                placeholder="اختر الفئة"
                data={categories}
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
                size="md"
                radius="md"
              />
            </SimpleGrid>

            {formData.category === "Other" && (
              <Box className="mt-4">
                <TextInput
                  label="الفئة الأخرى"
                  placeholder="اكتب الفئة الأخرى"
                  value={formData.otherCategory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherCategory: e.currentTarget.value,
                    })
                  }
                  size="md"
                  radius="md"
                />
              </Box>
            )}

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" className="mt-4">
              <TextInput
                label="مدة الحملة"
                placeholder="مثال: شهر واحد"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.currentTarget.value })
                }
                size="md"
                radius="md"
              />
              
              <Select
                label="هدف الحملة"
                placeholder="اختر الهدف"
                data={campaignGoals}
                value={formData.campaignGoal}
                onChange={(val) =>
                  setFormData({ ...formData, campaignGoal: val })
                }
                size="md"
                radius="md"
              />
            </SimpleGrid>

            {formData.campaignGoal === "Other" && (
              <Box className="mt-4">
                <TextInput
                  label="الهدف الآخر"
                  placeholder="اكتب الهدف الآخر"
                  value={formData.otherGoal}
                  onChange={(e) =>
                    setFormData({ ...formData, otherGoal: e.currentTarget.value })
                  }
                  size="md"
                  radius="md"
                />
              </Box>
            )}

            <Box className="mt-4">
              <Textarea
                label="الوصف المختصر"
                placeholder="وصف مختصر للمنتج أو الخدمة"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.currentTarget.value })
                }
                autosize
                minRows={3}
                size="md"
                radius="md"
              />
            </Box>
          </Box>

          {/* قنوات التسويق */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaBullhorn className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">قنوات التسويق</Text>
                <Text size="sm" className="text-gray-500">اختر القنوات التسويقية المناسبة</Text>
              </div>
            </div>

            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
              {marketingChannels.map((channel) => (
                <Paper
                  key={channel.value}
                  withBorder
                  p="md"
                  radius="md"
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.marketingChannels.includes(channel.value)
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    const currentChannels = [...formData.marketingChannels];
                    if (currentChannels.includes(channel.value)) {
                      setFormData({
                        ...formData,
                        marketingChannels: currentChannels.filter(
                          (c) => c !== channel.value
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        marketingChannels: [...currentChannels, channel.value],
                      });
                    }
                  }}
                >
                  <Stack align="center" gap="xs">
                    <div className={`text-xl ${
                      formData.marketingChannels.includes(channel.value)
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}>
                      {channel.icon}
                    </div>
                    <Text
                      size="sm"
                      fw={500}
                      className={`text-center ${
                        formData.marketingChannels.includes(channel.value)
                          ? "text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {channel.label}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>

            {formData.marketingChannels.includes("Other") && (
              <Box className="mt-4">
                <TextInput
                  label="المنصة الأخرى"
                  placeholder="اكتب المنصة الأخرى"
                  value={formData.otherPlatform}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherPlatform: e.currentTarget.value,
                    })
                  }
                  size="md"
                  radius="md"
                />
              </Box>
            )}
          </Box>

          {/* آلية الرسوم */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaMoneyBill className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">آلية الرسوم</Text>
                <Text size="sm" className="text-gray-500">اختر آلية حساب رسوم التسويق</Text>
              </div>
            </div>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
              {paymentMethods.map((method) => (
                <Paper
                  key={method.value}
                  withBorder
                  p="md"
                  radius="md"
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.paymentMethod === method.value
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: method.value })
                  }
                >
                  <Stack align="center" gap="xs">
                    <div className={`text-xl ${
                      formData.paymentMethod === method.value
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}>
                      <FaMoneyBill />
                    </div>
                    <Text
                      size="sm"
                      fw={500}
                      className={`text-center ${
                        formData.paymentMethod === method.value
                          ? "text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {method.label}
                    </Text>
                    
                    {formData.paymentMethod === method.value && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>

            {formData.paymentMethod === "Other" && (
              <Box className="mt-4">
                <TextInput
                  label="الآلية الأخرى"
                  placeholder="اكتب آلية الدفع الأخرى"
                  value={formData.otherPayment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherPayment: e.currentTarget.value,
                    })
                  }
                  size="md"
                  radius="md"
                />
              </Box>
            )}
          </Box>

          {/* بيانات التواصل */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">معلومات التواصل</Text>
                <Text size="sm" className="text-gray-500">أدخل بياناتك للتواصل معك</Text>
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
              إرسال طلب التسويق
            </Button>
            
            <Text size="sm" className="text-gray-500 mt-5">
              سنتواصل معك خلال 24 ساعة لتأكيد الطلب وتقديم الخطة التسويقية
            </Text>
          </Box>
        </Stack>
      </Card>

      {/* مودال التأكيد */}
      <Modal
        opened={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="تأكيد طلب التسويق"
        size="lg"
        centered
        radius="lg"
      >
        <Stack gap="lg">
          <Alert color="blue" icon={<FaCheckCircle />} title="الرجاء التحقق من البيانات">
            تأكد من صحة المعلومات قبل الإرسال النهائي
          </Alert>

          <SimpleGrid cols={2} spacing="md">
            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">اسم المنتج</Text>
              <Text fw={500}>{formData.productName}</Text>
            </Paper>
            
            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">الفئة</Text>
              <Text fw={500}>
                {formData.category === "Other"
                  ? formData.otherCategory
                  : formData.category}
              </Text>
            </Paper>
            
            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">اسم العميل</Text>
              <Text fw={500}>{formData.name}</Text>
            </Paper>
            
            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">البريد الإلكتروني</Text>
              <Text fw={500}>{formData.email}</Text>
            </Paper>
            
            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">رقم الهاتف</Text>
              <Text fw={500}>{formData.phone}</Text>
            </Paper>
            
            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">مدة الحملة</Text>
              <Text fw={500}>{formData.duration}</Text>
            </Paper>
          </SimpleGrid>

          <Paper withBorder p="md" radius="md" className="bg-blue-50">
            <Stack gap="xs">
              <div>
                <Text fw={600} size="sm" className="text-gray-500">القنوات التسويقية</Text>
                <Text fw={500}>{formData.marketingChannels.join(", ")}</Text>
              </div>
              {formData.otherPlatform && (
                <div>
                  <Text fw={600} size="sm" className="text-gray-500">منصة أخرى</Text>
                  <Text fw={500}>{formData.otherPlatform}</Text>
                </div>
              )}
            </Stack>
          </Paper>

          <Paper withBorder p="md" radius="md" className="bg-blue-50">
            <Stack gap="xs">
              <div>
                <Text fw={600} size="sm" className="text-gray-500">هدف الحملة</Text>
                <Text fw={500}>
                  {formData.campaignGoal === "Other"
                    ? formData.otherGoal
                    : formData.campaignGoal}
                </Text>
              </div>
              <div>
                <Text fw={600} size="sm" className="text-gray-500">آلية الرسوم</Text>
                <Text fw={500}>
                  {formData.paymentMethod === "Other"
                    ? formData.otherPayment
                    : formData.paymentMethod}
                </Text>
              </div>
            </Stack>
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
              تم استلم طلب الحملة التسويقية بنجاح وسنتواصل معك قريباً عبر البريد الإلكتروني
            </Text>
          </div>

          <Paper withBorder p="md" radius="md" className="w-full">
            <Stack gap="xs">
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-gray-500">رقم المرجع</Text>
                <Badge color="blue">MK-{Date.now().toString().slice(-8)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-gray-500">التاريخ</Text>
                <Text size="sm" fw={500}>{new Date().toLocaleString("ar-SA")}</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-gray-500">المنتج</Text>
                <Text size="sm" fw={500}>{formData.productName}</Text>
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
          <FaChartLine className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">تحليلات دقيقة</Text>
          <Text size="sm" className="text-gray-600">تقارير تفصيلية عن أداء الحملة</Text>
        </Card>
        
        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaBullseye className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">استراتيجيات مبتكرة</Text>
          <Text size="sm" className="text-gray-600">خطط تسويقية مخصصة لمشروعك</Text>
        </Card>
        
        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaCheckCircle className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">متابعة مستمرة</Text>
          <Text size="sm" className="text-gray-600">دعم فني ومتابعة خلال الحملة</Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
}