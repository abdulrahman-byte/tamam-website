"use client";
import {
  Card,
  Button,
  TextInput,
  Group,
  Stack,
  Modal,
  Alert,
  Text,
  Badge,
  Progress,
  Box,
  Paper,
  Accordion,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBook,
  FaTag,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEdit,
  FaPaperPlane,
  FaInfoCircle,
  FaShieldAlt,
  FaPlayCircle,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function ClientCourseDetails({ course }) {
  // حساب السعر النهائي
  const discountValue = Number(course.discount) || 0;
  const hasDiscount = discountValue > 0;
  const finalPrice = hasDiscount
    ? Math.round(course.price - (course.price * discountValue) / 100)
    : course.price;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    emailjs.init("ZxLtSLDcogh2r5j2i");
  }, []);

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

  // التحقق من صحة الاسم عند التغيير
  const validateName = (name) => {
    if (!name.trim()) {
      setNameError("الاسم مطلوب");
      return false;
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s]{2,}$/.test(name.trim())) {
      setNameError("الاسم يجب أن يحتوي على حروف فقط ويكون أكثر من حرفين");
      return false;
    }
    setNameError("");
    return true;
  };

  // التحقق من صحة البريد الإلكتروني عند التغيير
  const validateEmail = (email) => {
    if (!email.trim()) {
      setEmailError("البريد الإلكتروني مطلوب");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("البريد الإلكتروني غير صحيح");
      return false;
    }
    setEmailError("");
    return true;
  };

  // التحقق من صحة رقم الهاتف عند التغيير
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      setPhoneError("رقم الهاتف مطلوب");
      return false;
    }
    // ✅ تحديث شرط رقم الهاتف - نفس الكود السابق
    if (!/^00\d{9,13}$/.test(String(phone).trim())) {
      setPhoneError("رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 و يتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateForm = () => {
    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      return "يوجد أخطاء في البيانات المدخلة";
    }
    return "";
  };

  const handleSubmit = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setConfirmModal(true);
  };

  const sendFormEmail = async () => {
    setConfirmModal(false);
    setLoading(true);
    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      name: formData.name,
      email: formData.email,
      phone: String(formData.phone || ""),
      course_id: String(course.id),
      course_title: course.title,
      course_price: course.price
        ? String(course.price.toLocaleString())
        : "غير محدد",
      course_discount: course.discount ? String(course.discount) : "0",
      course_final_price: String(finalPrice.toLocaleString()),
      course_img: course.img || "",
      course_duration: course.duration || "غير محدد",
      order_date: new Date().toLocaleString("ar-SA"),
      order_id: `CRS-${Date.now().toString().slice(-8)}`,
    };

    try {
      await emailjs.send("service_sirtj4k", "template_zsb79zq", templateParams);
      setSuccessModal(true);
    } catch (e) {
      console.error("EmailJS Error:", e);
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
      name: "",
      email: "",
      phone: "",
    });
    setError("");
    setNameError("");
    setEmailError("");
    setPhoneError("");
  };

  return (
    <>
      {/* عرض الدورة */}
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
          {/* عرض الدورة */}
          <Card.Section className="relative mb-6">
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />

            {/* شارة السعر - اليمين */}
            <div className="absolute top-4 right-4">
              <Paper
                withBorder
                className="bg-white/90 backdrop-blur-sm shadow-lg p-4 rounded-lg"
              >
                <div className="text-center">
                  {hasDiscount ? (
                    <>
                      <div className="text-2xl font-bold text-green-700">
                        {finalPrice.toLocaleString()} ج.س
                      </div>
                      <div className="text-sm text-red-600 line-through">
                        {course.price.toLocaleString()} ج.س
                      </div>
                      <Badge
                        color="red"
                        size="lg"
                        className="mt-2"
                        leftSection={<FaTag size={14} />}
                      >
                        خصم {course.discount}%
                      </Badge>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-blue-700">
                      {course.price.toLocaleString()} ج.س
                    </div>
                  )}
                </div>
              </Paper>
            </div>
          </Card.Section>

          {/* تفاصيل الدورة */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaBook className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">
                  تفاصيل الدورة
                </Text>
                <Text size="sm" className="text-gray-500">
                  معلومات شاملة عن محتويات الدورة
                </Text>
              </div>
            </div>

            {/* المدة */}
            {course.duration && (
              <Paper withBorder p="md" radius="md" className="mb-4 bg-blue-50">
                <Group>
                  <FaClock className="text-blue-500" />
                  <Text fw={500}>المدة: {course.duration}</Text>
                </Group>
              </Paper>
            )}

            {/* الوصف */}
            <Paper withBorder p="md" radius="md" className="mb-6">
              <Text className="text-gray-700 leading-relaxed">
                {course.details}
              </Text>
            </Paper>

            {/* المحتويات */}
            <Accordion
              variant="filled"
              className="border rounded-lg border-gray-200 bg-white"
            >
              <Accordion.Item value="modules">
                <Accordion.Control>
                  <Group>
                    <FaBook />
                    <Text fw={500}>محتويات الدورة</Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="xs">
                    {course.modules.map((module, index) => (
                      <Group key={index}>
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <Text>{module}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Box>

          {/* بيانات التسجيل */}
          <Box>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <Text fw={600} size="lg" className="text-gray-800">
                  نموذج التسجيل
                </Text>
                <Text size="sm" className="text-gray-500">
                  املأ بياناتك للتسجيل في الدورة
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <TextInput
                label="الاسم الكامل"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.currentTarget.value });
                  validateName(e.currentTarget.value);
                }}
                onBlur={() => validateName(formData.name)}
                required
                icon={<FaUser />}
                size="md"
                radius="md"
                error={nameError}
              />

              <TextInput
                label="البريد الإلكتروني"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.currentTarget.value });
                  validateEmail(e.currentTarget.value);
                }}
                onBlur={() => validateEmail(formData.email)}
                required
                icon={<FaEnvelope />}
                size="md"
                radius="md"
                error={emailError}
              />

              <TextInput
                label="رقم الهاتف"
                placeholder="00xxxxxxxxxxx"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  validatePhone(e.target.value);
                }}
                onBlur={() => validatePhone(formData.phone)}
                required
                icon={<FaPhone />}
                size="md"
                radius="md"
                maxLength={15}
                error={phoneError}
              />
            </div>
          </Box>

          {/* زر الإرسال */}
          <Group justify="center" mt="md">
            <Button
              size="lg"
              color="blue"
              radius="md"
              onClick={handleSubmit}
              leftSection={<FaPaperPlane />}
              loading={loading}
              className="w-full md:w-auto px-12 py-3 text-lg font-semibold"
            >
              تسجيل في الدورة
            </Button>
          </Group>

          {/* ضمان الخدمة */}
          <Alert
            color="blue"
            variant="light"
            icon={<FaShieldAlt />}
            title="ضمان الجودة"
            className="mt-4"
          >
            <Text size="sm">
              نحن نضمن جودة التدريس ومتابعة الطلاب حتى إتقان المهارات المطلوبة.
            </Text>
          </Alert>
        </Stack>
      </Card>

      {/* مزايا الدورة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaPlayCircle className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            دروس حية مباشرة
          </Text>
          <Text size="sm" className="text-gray-600">
            جلسات تفاعلية مباشرة مع المدرب
          </Text>
        </Card>

        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaChalkboardTeacher className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            تدريب عملي
          </Text>
          <Text size="sm" className="text-gray-600">
            تدريب مباشر مع مشاريع عملية
          </Text>
        </Card>

        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaUsers className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            مجتمع تعليمي تفاعلي
          </Text>
          <Text size="sm" className="text-gray-600">
            الانضمام لمجتمع طلابي لدعم التعلم
          </Text>
        </Card>
      </div>

      {/* مودال التأكيد */}
      <Modal
        opened={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="مراجعة وتأكيد البيانات"
        size="lg"
        centered
        radius="lg"
      >
        <Stack gap="lg">
          <Alert color="blue" icon={<FaInfoCircle />} title="تحقق من معلوماتك">
            يرجى التأكد من صحة المعلومات قبل الإرسال النهائي
          </Alert>

          <Accordion variant="separated" radius="md">
            <Accordion.Item value="student">
              <Accordion.Control>معلومات الطالب</Accordion.Control>
              <Accordion.Panel>
                <Stack gap="xs">
                  <div>
                    <strong>الاسم:</strong> {formData.name}
                  </div>
                  <div>
                    <strong>البريد:</strong> {formData.email}
                  </div>
                  <div>
                    <strong>الهاتف:</strong> {formData.phone}
                  </div>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="course">
              <Accordion.Control>تفاصيل الدورة</Accordion.Control>
              <Accordion.Panel>
                <Stack gap="xs">
                  <div>
                    <strong>الدورة:</strong> {course.title}
                  </div>
                  <div>
                    <strong>المدة:</strong> {course.duration || "غير محدد"}
                  </div>
                  <div>
                    <strong>السعر:</strong> {finalPrice.toLocaleString()} ج.س
                  </div>
                  {hasDiscount && (
                    <div>
                      <strong>الخصم:</strong> {course.discount}%
                    </div>
                  )}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Group justify="center" mt="lg">
            <Button
              color="blue"
              onClick={sendFormEmail}
              leftSection={<FaCheckCircle />}
              loading={isSubmitting}
              size="md"
              radius="md"
            >
              تأكيد التسجيل
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
        title="تم التسجيل بنجاح"
        centered
        radius="lg"
        withCloseButton={false}
      >
        <Stack gap="lg" align="center">
          <div className="text-center">
            <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
            <div className="text-xl font-bold text-gray-800 mb-2">
              شكراً لك {formData.name}!
            </div>
            <Text className="text-gray-600 mb-4">
              تم تسجيلك في الدورة بنجاح وسنتواصل معك قريباً عبر البريد الإلكتروني
            </Text>
          </div>

          <Card withBorder className="w-full" radius="md">
            <Stack gap="xs">
              <div>
                <strong>رقم المرجع:</strong> CRS-
                {Date.now().toString().slice(-8)}
              </div>
              <div>
                <strong>الدورة:</strong> {course.title}
              </div>
              <div>
                <strong>السعر:</strong> {finalPrice.toLocaleString()} ج.س
              </div>
              <div>
                <strong>سيتم التواصل على:</strong> {formData.email}
              </div>
            </Stack>
          </Card>

          <div className="text-center w-full">
            <Text size="sm" className="text-gray-500 mb-2">
              سيتم إغلاق هذه النافذة تلقائياً خلال
            </Text>
            <div className="text-lg font-bold text-blue-600 mb-2">
              {remainingTime} ثانية
            </div>
            <Progress
              value={((10 - remainingTime) / 10) * 100}
              size="sm"
              color="green"
            />
          </div>

          <Button
            color="blue"
            onClick={handleCloseSuccessModal}
            size="md"
            radius="md"
            fullWidth
          >
            إغلاق
          </Button>
        </Stack>
      </Modal>
    </>
  );
}