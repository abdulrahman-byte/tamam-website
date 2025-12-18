"use client";
import {
  Card,
  Button,
  TextInput,
  NumberInput,
  Stack,
  Group,
  Modal,
  Alert,
  Textarea,
  Select,
  ColorInput,
  Title,
  Box,
  Badge,
  Loader,
  Progress,
  Accordion,
  Divider,
  Tooltip,
  ActionIcon,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaExclamationTriangle,
  FaAlignLeft,
  FaPalette,
  FaTag,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaPlus,
  FaPaperPlane,
  FaInfoCircle,
  FaShieldAlt,
  FaLock,
  FaFileAlt,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function DesignDetails({ dataObject, sectionTitle }) {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);

  const design = Object.values(dataObject)
    .flat()
    .find((d) => String(d.id) === decodedId);

  if (!design) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-2xl font-bold text-red-600 mb-4">
          التصميم غير موجود
        </div>
        <p className="text-gray-600">
          يرجى التحقق من الرابط أو العودة للصفحة السابقة
        </p>
      </div>
    );
  }

  // حساب السعر النهائي
  const calculateFinalPrice = () => {
    if (!design.price) return 0;
    if (design.discount) {
      return design.price - (design.price * design.discount) / 100;
    }
    return design.price;
  };

  const finalPrice = calculateFinalPrice();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    changes: "",
  });

  const [colors, setColors] = useState([{ color: "#3B82F6", target: "" }]);
  const [error, setError] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // ✅ تحديث شرط رقم الهاتف ليبدأ بـ 00 ويتكون من 9-13 رقم بعد 00
    if (!/^00\d{9,13}$/.test(String(formData.phone).trim())) {
      return "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 و يتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)";
    }
    if (!formData.description.trim()) {
      return "الوصف مطلوب";
    }
    if (colors.some((c) => !c.color || !c.target)) {
      return "يجب تحديد العنصر لكل لون";
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
      description: formData.description,
      changes: formData.changes,
      design_id: String(design.id),
      design_title: design.title,
      design_price: design.price
        ? String(design.price.toLocaleString())
        : "غير محدد",
      design_discount: design.discount ? String(design.discount) : "0",
      design_final_price: String(finalPrice.toLocaleString()),
      design_img: design.img || "",
      design_video: design.video || "",
      design_pdf: design.pdf || "",
      section_title: sectionTitle,
      colors_text: colors
        .map((c, i) => `اللون ${i + 1}: ${c.color} | العنصر: ${c.target}`)
        .join("\n"),
      colors_json: JSON.stringify(colors, null, 2),
      order_date: new Date().toLocaleString("ar-SA"),
      order_id: `DES-${Date.now().toString().slice(-8)}`,
    };

    try {
      await emailjs.send("service_bw4m3xt", "template_zsb79zq", templateParams);
      setSuccessModal(true);
    } catch (e) {
      console.error("EmailJS Error:", e);
      setError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const addColorField = () => {
    setColors([...colors, { color: "#3B82F6", target: "" }]);
  };

  const removeColorField = (index) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
    }
  };

  const updateColor = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    setRemainingTime(10);
    // إعادة تعيين النموذج
    setFormData({
      name: "",
      email: "",
      phone: "",
      description: "",
      changes: "",
    });
    setColors([{ color: "#3B82F6", target: "" }]);
  };

  const elementOptions = [
    { value: "background", label: "الخلفية" },
    { value: "text", label: "النصوص والعناوين" },
    { value: "borders", label: "الإطارات" },
    { value: "shapes", label: "الأشكال" },
    { value: "icons", label: "الأيقونات" },
    { value: "img", label: "الصورة الرئيسية" },
  ];

  return (
    <div className="container mx-auto py-8 max-w-4xl px-4">
      {/* رأس الصفحة */}
      <div className="mb-8 text-center">
        <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {design.title}
        </div>
        <div className="text-lg text-gray-600 mb-6">{sectionTitle}</div>
      </div>

      {/* معاينة التصميم */}
      <Card radius="lg" withBorder className="mb-8 overflow-hidden shadow-lg">
        <div className="relative">
          {design.img && (
            <img
              src={design.img}
              alt={design.title}
              className="w-full max-h-[600px] object-contain rounded-lg"
              loading="lazy"
            />
          )}
          {design.video && (
            <video
              src={design.video}
              controls
              className="w-full max-h-[600px] object-contain rounded-lg"
            />
          )}
          {design.pdf && (
            <iframe
              src={design.pdf}
              className="w-full h-[500px] rounded-lg"
              title={`PDF Preview - ${design.title}`}
            />
          )}

          {/* شارة السعر */}
          <div className="absolute top-4 right-4">
            <Card withBorder className="bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="text-center">
                {design.discount ? (
                  <>
                    <div className="text-2xl font-bold text-green-700">
                      {finalPrice.toLocaleString()} ج.س
                    </div>
                    <div className="text-sm text-red-600 line-through">
                      {design.price.toLocaleString()} ج.س
                    </div>
                    <Badge color="red" size="lg" className="mt-2">
                      خصم {design.discount}%
                    </Badge>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-blue-700">
                    {design.price.toLocaleString()} ج.س
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* نموذج الطلب */}
      <Card radius="lg" withBorder className="shadow-xl">
        <div className="mb-6">
          <div className="text-2xl font-bold text-blue-600 text-center mb-2">
            تخصيص التصميم
          </div>
          <p className="text-gray-600 text-center">
            املأ النموذج أدناه لتخصيص التصميم حسب متطلباتك
          </p>
        </div>

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

        <Stack gap="lg">
          {/* بيانات العميل */}
          <div className=" p-4 rounded-lg border border-blue-100">
            <div
              order={3}
              className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2"
            >
              <FaUser />
              بيانات العميل
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="الاسم الكامل"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.currentTarget.value })
                }
                required
                icon={<FaUser />}
                size="md"
                radius="md"
                error={formData.name && !/^[\u0600-\u06FFa-zA-Z\s]{2,}$/.test(formData.name.trim()) ? "الاسم يجب أن يحتوي على حروف فقط ويكون أكثر من حرفين" : null}
              />

              <TextInput
                label="البريد الإلكتروني"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.currentTarget.value })
                }
                required
                icon={<FaEnvelope />}
                size="md"
                radius="md"
                error={formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) ? "البريد الإلكتروني غير صحيح" : null}
              />

              <TextInput
                label="رقم الهاتف"
                placeholder="00xxxxxxxxxxx"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                icon={<FaPhone />}
                size="md"
                radius="md"
                maxLength={15}
                error={formData.phone && !/^00\d{9,13}$/.test(String(formData.phone).trim()) ? "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 و يتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)" : null}
              />
            </div>
          </div>

          {/* تفاصيل المشروع */}
          <div className=" p-4 rounded-lg border border-blue-100">
            <div className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <FaFileAlt />
              تفاصيل المشروع
            </div>

            <Textarea
              label="وصف المشروع"
              placeholder="صف مشروعك بالتفصيل..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.currentTarget.value })
              }
              required
              minRows={4}
              icon={<FaAlignLeft />}
              size="md"
              radius="md"
            />

            <Textarea
              label="التعديلات المطلوبة"
              placeholder="ما هي التغييرات التي تحتاجها؟ (نصوص، أحجام، مواضع، إلخ)"
              value={formData.changes}
              onChange={(e) =>
                setFormData({ ...formData, changes: e.currentTarget.value })
              }
              minRows={3}
              className="mt-4"
              size="md"
              radius="md"
            />
          </div>

          {/* اختيار الألوان */}
          <div className=" p-4 rounded-lg border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <FaPalette />
                اختيار الألوان
              </div>
              <Tooltip label="أضف لون جديد" withArrow>
                <ActionIcon
                  color="blue"
                  variant="light"
                  size="lg"
                  onClick={addColorField}
                >
                  <FaPlus />
                </ActionIcon>
              </Tooltip>
            </div>

            <div className="space-y-4">
              {colors.map((color, index) => (
                <Card key={index} withBorder className="p-4" radius="md">
                  <Group align="flex-end" grow>
                    <div className="flex items-center gap-4">
                  
                      <div className="flex-1">
                        <ColorInput
                        className=""
                          label={`اللون ${index + 1}`}
                          value={color.color}
                          onChange={(value) =>
                            updateColor(index, "color", value)
                          }
                          withPicker
                          size="sm"
                          radius="md"
                        />
                      </div>
                    </div>

                    <Select
                      label="العنصر"
                      placeholder="اختر العنصر"
                      data={elementOptions}
                      value={color.target}
                      onChange={(value) => updateColor(index, "target", value)}
                      size="sm"
                      radius="md"
                    />

                    <Tooltip label="حذف اللون" withArrow>
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeColorField(index)}
                        disabled={colors.length === 1}
                        size="lg"
                      >
                        <FaTrash />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Card>
              ))}
            </div>
          </div>

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
              إرسال الطلب
            </Button>
          </Group>

          {/* ضمان الخصوصية */}
          <Alert
            color="blue"
            variant="light"
            icon={<FaLock />}
            title="خصوصية بياناتك"
            className="mt-4"
          >
            <Text size="sm">
              نحن نحافظ على سرية معلوماتك ولا نشاركها مع أي جهة خارجية.
            </Text>
          </Alert>
        </Stack>
      </Card>

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
            <Accordion.Item value="customer">
              <Accordion.Control>معلومات العميل</Accordion.Control>
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

            <Accordion.Item value="project">
              <Accordion.Control>تفاصيل المشروع</Accordion.Control>
              <Accordion.Panel>
                <Stack gap="xs">
                  <div>
                    <strong>الوصف:</strong> {formData.description}
                  </div>
                  {formData.changes && (
                    <div>
                      <strong>التعديلات:</strong> {formData.changes}
                    </div>
                  )}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="design">
              <Accordion.Control>تفاصيل التصميم</Accordion.Control>
              <Accordion.Panel>
                <Stack gap="xs">
                  <div>
                    <strong>التصميم:</strong> {design.title}
                  </div>
                  <div>
                    <strong>القسم:</strong> {sectionTitle}
                  </div>
                  <div>
                    <strong>السعر:</strong> {finalPrice.toLocaleString()} ج.س
                  </div>
                  {design.discount && (
                    <div>
                      <strong>الخصم:</strong> {design.discount}%
                    </div>
                  )}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="colors">
              <Accordion.Control>الألوان المختارة</Accordion.Control>
              <Accordion.Panel>
                <Stack gap="xs">
                  {colors.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: c.color }}
                      />
                      <span>
                        <strong>لون {i + 1}:</strong> {c.color}
                      </span>
                      <span className="text-gray-600">({c.target})</span>
                    </div>
                  ))}
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
      >
        <Stack gap="lg" align="center">
          <div className="text-center">
            <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
            <div className="text-xl font-bold text-gray-800 mb-2">
              شكراً لك {formData.name}!
            </div>
            <Text className="text-gray-600 mb-4">
              تم استلام طلبك بنجاح وسنتواصل معك قريباً عبر البريد الإلكتروني
            </Text>
          </div>

          <Card withBorder className="w-full" radius="md">
            <Stack gap="xs">
              <div>
                <strong>رقم المرجع:</strong> DES-
                {Date.now().toString().slice(-8)}
              </div>
              <div>
                <strong>التصميم:</strong> {design.title}
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

      {/* معلومات إضافية */}
      <Card radius="lg" withBorder className="mt-8 flex flex-col items-center bg-gray-50">
        <Group justify="apart">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-blue-500" />
            <div>
              <Text size="sm" fw={500}>
                ضمان الخصوصية
              </Text>
              <Text size="xs" c="dimmed">
                بياناتك محمية بالكامل
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500" />
            <div>
              <Text size="sm" fw={500}>
                جودة مضمونة
              </Text>
              <Text size="xs" c="dimmed">
                نسلم العمل بأعلى جودة
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-purple-500" />
            <div>
              <Text size="sm" fw={500}>
                دعم فني
              </Text>
              <Text size="xs" c="dimmed">
                متاح للرد على استفساراتك
              </Text>
            </div>
          </div>
        </Group>
      </Card>
    </div>
  );
}