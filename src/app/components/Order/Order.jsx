"use client";
import React, { useState, useEffect } from "react";
import {
  Stepper,
  Button,
  Group,
  Select,
  TextInput,
  Textarea,
  Container,
  Modal,
  Card,
  Text,
  Badge,
  Loader,
  Alert,
  Grid,
  Title,
  Stack,
  Divider,
} from "@mantine/core";
import {
  FaPalette,
  FaCode,
  FaLanguage,
  FaGraduationCap,
  FaVideo,
  FaBullhorn,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPaperPlane,
  FaShoppingCart,
  FaBirthdayCake,
  FaBook,
  FaFilePowerpoint,
  FaMap,
  FaChartBar,
  FaGlobe,
  FaFileAlt,
  FaUserGraduate,
  FaFilm,
  FaAd,
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

// ================================================
// 🔵 إعدادات EmailJS - ضع معرفاتك هنا
// ================================================
const EMAILJS_SERVICE_ID = "service_0t5msy6";    // ⬅️ Service ID
const EMAILJS_TEMPLATE_ID = "template_zsb79zq";  // ⬅️ Template ID
const EMAILJS_PUBLIC_KEY = "ZxLtSLDcogh2r5j2i";    // ⬅️ Public Key

// ================================================
// 🔵 ألوان الموقع
// ================================================
const THEME = {
  primary: "#3b82f6",      // أزرق أساسي
  primaryLight: "#60a5fa",
  primaryDark: "#1d4ed8",
  gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
};

// ================================================
// 🔵 بيانات التصنيفات
// ================================================
const serviceCategories = [
  { value: "design", label: "تصميم", icon: <FaPalette />, color: "blue" },
  { value: "programming", label: "برمجة", icon: <FaCode />, color: "green" },
  { value: "translation", label: "ترجمة", icon: <FaLanguage />, color: "purple" },
  { value: "education", label: "تعليم", icon: <FaGraduationCap />, color: "orange" },
  { value: "editing", label: "مونتاج", icon: <FaVideo />, color: "red" },
  { value: "marketing", label: "تسويق", icon: <FaBullhorn />, color: "teal" },
];

const designSubcategories = [
  { value: "logos", label: "شعارات", icon: <FaPalette /> },
  { value: "posters", label: "بوستر إعلاني", icon: <FaAd /> },
  { value: "wedding", label: "دعوة زفاف", icon: <FaCalendarAlt /> },
  { value: "congrats", label: "تهنئة", icon: <FaBirthdayCake /> },
  { value: "graduation", label: "تخرج", icon: <FaUserGraduate /> },
  { value: "newborn", label: "تهنئة مواليد", icon: <FaBirthdayCake /> },
  { value: "cv", label: "سيرة ذاتية", icon: <FaUser /> },
  { value: "business", label: "بطاقة مهنية", icon: <FaShoppingCart /> },
  { value: "book", label: "أغلفة الكتب", icon: <FaBook /> },
  { value: "menu", label: "المنيو", icon: <FaShoppingCart /> },
  { value: "presentation", label: "العروض التقديمية", icon: <FaFilePowerpoint /> },
  { value: "mindmap", label: "الخرائط الذهنية", icon: <FaMap /> },
  { value: "advice", label: "تصاميم النصائح", icon: <FaChartBar /> },
  { value: "infographic", label: "الانفوجرافيك", icon: <FaChartBar /> },
];

const programmingSubcategories = [
  { value: "website", label: "برمجة مواقع الويب", icon: <FaGlobe /> },
  { value: "ecommerce", label: "المتجر إلكترونية", icon: <FaShoppingCart /> },
];

const translationSubcategories = [
  { value: "document", label: "ترجمة المستندات", icon: <FaFileAlt /> },
  { value: "website", label: "ترجمة المواقع", icon: <FaGlobe /> },
  { value: "video", label: "ترجمة الفيديوهات", icon: <FaVideo /> },
  { value: "book", label: "ترجمة الكتب", icon: <FaBook /> },
  { value: "academic", label: "ترجمة أكاديمية", icon: <FaGraduationCap /> },
];

const educationSubcategories = [
  { value: "courses", label: "دورات تعليمية", icon: <FaGraduationCap /> },
  { value: "tutoring", label: "دروس خصوصية", icon: <FaUserGraduate /> },
  { value: "workshops", label: "ورش عمل", icon: <FaUserGraduate /> },
  { value: "content", label: "محتوى تعليمي", icon: <FaBook /> },
  { value: "consulting", label: "استشارات تعليمية", icon: <FaUserGraduate /> },
];

const editingSubcategories = [
  { value: "video", label: "مونتاج الفيديو", icon: <FaFilm /> },
  { value: "photo", label: "تعديل الصور", icon: <FaPalette /> },
  { value: "audio", label: "مونتاج الصوت", icon: <FaVideo /> },
  { value: "short", label: "فيديوهات قصيرة", icon: <FaVideo /> },
  { value: "corporate", label: "فيديوهات مؤسسية", icon: <FaFilm /> },
];

const marketingSubcategories = [
  { value: "social", label: "التسويق عبر وسائل التواصل", icon: <FaBullhorn /> },
  { value: "seo", label: "تحسين محركات البحث", icon: <FaGlobe /> },
  { value: "ads", label: "الإعلانات المدفوعة", icon: <FaAd /> },
  { value: "content", label: "التسويق بالمحتوى", icon: <FaFileAlt /> },
  { value: "email", label: "التسويق بالبريد الإلكتروني", icon: <FaEnvelope /> },
  { value: "branding", label: "بناء الهوية التجارية", icon: <FaShoppingCart /> },
];

const deliveryTimes = [
  { value: "1", label: "يوم واحد", days: 1 },
  { value: "3", label: "٣ أيام", days: 3 },
  { value: "7", label: "أسبوع", days: 7 },
  { value: "14", label: "أسبوعين", days: 14 },
  { value: "30", label: "شهر", days: 30 },
  { value: "custom", label: "أخرى", days: 0 },
];

// ================================================
// 🔵 المكون الرئيسي
// ================================================
export default function Order() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  
  // أخطاء التحقق
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [formData, setFormData] = useState({
    serviceType: "",
    subcategory: "",
    deliveryTime: "",
    customDelivery: "",
    name: "",
    email: "",
    phone: "",
    details: "",
    budget: "",
    urgent: false,
  });

  // مؤقت العد التنازلي
  useEffect(() => {
    let timer;
    if (success && modalOpened) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCloseModal();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [success, modalOpened]);

  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // وظائف التحقق من الصحة
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

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      setPhoneError("رقم الهاتف مطلوب");
      return false;
    }
    if (!/^00\d{9,13}$/.test(String(phone).trim())) {
      setPhoneError("رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 و يتكون من أرقام انجليزية فقط");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateStep3 = () => {
    return !(!formData.deliveryTime);
  };

  const getSubcategories = () => {
    switch (formData.serviceType) {
      case "design": return designSubcategories;
      case "programming": return programmingSubcategories;
      case "translation": return translationSubcategories;
      case "education": return educationSubcategories;
      case "editing": return editingSubcategories;
      case "marketing": return marketingSubcategories;
      default: return [];
    }
  };

  const getServiceLabel = (value) => {
    const service = serviceCategories.find(s => s.value === value);
    return service ? service.label : "";
  };

  const getSubcategoryLabel = (value) => {
    const subcategories = getSubcategories();
    const sub = subcategories.find(s => s.value === value);
    return sub ? sub.label : "";
  };

  const handleSubmit = async () => {
    // التحقق من البيانات المطلوبة
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceType) {
      setError("⚠️ يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // التحقق من إعدادات EmailJS
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("⚠️ إعدادات البريد الإلكتروني غير مكتملة");
      return;
    }

    // التحقق من صحة البيانات
    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      setError("⚠️ يرجى تصحيح الأخطاء في البيانات المدخلة");
      return;
    }

    setLoading(true);
    setError(null);
    setModalOpened(true);

    try {
      // تهيئة EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // بيانات الإرسال
      const templateParams = {
        service_type: getServiceLabel(formData.serviceType),
        subcategory: getSubcategoryLabel(formData.subcategory),
        delivery_time: formData.deliveryTime === "custom" 
          ? formData.customDelivery 
          : deliveryTimes.find(d => d.value === formData.deliveryTime)?.label || "",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_details: formData.details || "لم يتم تقديم تفاصيل",
        budget: formData.budget || "لم يتم تحديد",
        is_urgent: formData.urgent ? "نعم" : "لا",
        submission_date: new Date().toLocaleString("ar-SA"),
        order_id: "ORD-" + Date.now().toString().slice(-8),
        timestamp: Date.now(),
      };

      // إرسال البريد
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSuccess(true);
        setRemainingTime(5); // إعادة تعيين المؤقت لـ 5 ثوانٍ
      }
    } catch (err) {
      console.error("خطأ في الإرسال:", err);
      setError("❌ حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setSuccess(false);
    setError(null);
    setRemainingTime(5);
    
    // إعادة تعيين النموذج بعد النجاح
    if (success) {
      setFormData({
        serviceType: "",
        subcategory: "",
        deliveryTime: "",
        customDelivery: "",
        name: "",
        email: "",
        phone: "",
        details: "",
        budget: "",
        urgent: false,
      });
      setActive(0);
      setNameError("");
      setEmailError("");
      setPhoneError("");
    }
  };

  const resetForm = () => {
    setFormData({
      serviceType: "",
      subcategory: "",
      deliveryTime: "",
      customDelivery: "",
      name: "",
      email: "",
      phone: "",
      details: "",
      budget: "",
      urgent: false,
    });
    setActive(0);
    setError(null);
    setNameError("");
    setEmailError("");
    setPhoneError("");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px 0" }}>
      <Container size="md">
        {/* العنوان */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title order={1} c={THEME.primary} style={{ fontFamily: "inherit", marginBottom: "10px" }}>
            اطلب خدمتك الآن
          </Title>
          <Text c="dimmed" size="lg">
            اختر الخدمة المناسبة واملأ التفاصيل للحصول على عرض سعر فوري
          </Text>
        </div>

        {/* Stepper */}
        <Card withBorder shadow="md" p="xl" radius="lg" style={{ background: "white" }}>
          <Stepper 
            active={active} 
            onStepClick={setActive}
            breakpoint="sm"
            color={THEME.primary}
            size="md"
          >
            {/* الخطوة 1: نوع الخدمة */}
            <Stepper.Step 
              label="نوع الخدمة" 
              description="اختر التصنيف الرئيسي"
              icon={<FaPalette size={18} />}
            >
              <Stack gap="md">
                <Text size="lg" fw={500}>ما هي الخدمة التي تريدها؟</Text>
                <Grid>
                  {serviceCategories.map((category) => (
                    <Grid.Col key={category.value} span={{ base: 12, sm: 6, md: 4 }}>
                      <Card
                        withBorder
                        shadow={formData.serviceType === category.value ? "md" : "sm"}
                        radius="md"
                        p="md"
                        style={{
                          cursor: "pointer",
                          borderColor: formData.serviceType === category.value ? THEME.primary : undefined,
                          background: formData.serviceType === category.value ? "#f0f7ff" : "white",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => setFormData({ ...formData, serviceType: category.value, subcategory: "" })}
                      >
                        <Group>
                          <div style={{ color: THEME.primary }}>
                            {category.icon}
                          </div>
                          <Text fw={600}>{category.label}</Text>
                        </Group>
                        {formData.serviceType === category.value && (
                          <Badge color={category.color} variant="light" mt="xs">
                            ✓ محدَد
                          </Badge>
                        )}
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            </Stepper.Step>

            {/* الخطوة 2: التصنيف الفرعي */}
            <Stepper.Step 
              label="التصنيف" 
              description="اختر الخدمة الفرعية"
              icon={<FaCode size={18} />}
            >
              <Stack gap="md">
                <Text size="lg" fw={500}>
                  {formData.serviceType ? `اختر نوع ${getServiceLabel(formData.serviceType)}` : "اختر الخدمة الفرعية"}
                </Text>
                
                {formData.serviceType ? (
                  <Grid>
                    {getSubcategories().map((sub) => (
                      <Grid.Col key={sub.value} span={{ base: 12, sm: 6, md: 4 }}>
                        <Card
                          withBorder
                          shadow={formData.subcategory === sub.value ? "md" : "sm"}
                          radius="md"
                          p="md"
                          style={{
                            cursor: "pointer",
                            borderColor: formData.subcategory === sub.value ? THEME.primary : undefined,
                            background: formData.subcategory === sub.value ? "#f0f7ff" : "white",
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => setFormData({ ...formData, subcategory: sub.value })}
                        >
                          <Group>
                            <div style={{ color: THEME.primary }}>
                              {sub.icon}
                            </div>
                            <Text fw={500} size="sm">{sub.label}</Text>
                          </Group>
                        </Card>
                      </Grid.Col>
                    ))}
                  </Grid>
                ) : (
                  <Alert color="yellow" icon={<FaExclamationTriangle />}>
                    يرجى اختيار نوع الخدمة أولاً
                  </Alert>
                )}
              </Stack>
            </Stepper.Step>

            {/* الخطوة 3: التفاصيل */}
            <Stepper.Step 
              label="التفاصيل" 
              description="مدة التسليم والميزانية"
              icon={<FaCalendarAlt size={18} />}
            >
              <Stack gap="md">
                <Text size="lg" fw={500}>تفاصيل إضافية</Text>
                
                <Select
                  label="مدة التسليم المتوقعة"
                  placeholder="اختر المدة المناسبة"
                  data={deliveryTimes.map(d => ({ value: d.value, label: d.label }))}
                  value={formData.deliveryTime}
                  onChange={(value) => setFormData({ ...formData, deliveryTime: value || "" })}
                  required
                  error={!formData.deliveryTime && active === 2 ? "هذا الحقل مطلوب" : null}
                />

                {formData.deliveryTime === "custom" && (
                  <TextInput
                    label="حدد المدة المطلوبة"
                    placeholder="مثال: 10 أيام، أسبوعين، إلخ"
                    value={formData.customDelivery}
                    onChange={(e) => setFormData({ ...formData, customDelivery: e.target.value })}
                    required
                  />
                )}

                <TextInput
                  label="الميزانية المتوقعة (اختياري)"
                  placeholder="مثال: 500,000 جنيه سوداني"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />

                <Textarea
                  label="تفاصيل إضافية عن الطلب"
                  placeholder="صف متطلباتك بالتفصيل..."
                  minRows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={formData.urgent}
                    onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                    style={{ width: "18px", height: "18px" }}
                  />
                  <label htmlFor="urgent" style={{ cursor: "pointer" }}>
                    <Text fw={500}>طلب عاجل (يحتاج أولوية)</Text>
                    <Text size="sm" c="dimmed">سيكون السعر أعلى بنسبة 20%</Text>
                  </label>
                </div>
              </Stack>
            </Stepper.Step>

            {/* الخطوة 4: بيانات العميل */}
            <Stepper.Step 
              label="البيانات" 
              description="معلومات الاتصال"
              icon={<FaUser size={18} />}
            >
              <Stack gap="md">
                <Text size="lg" fw={500}>معلومات الاتصال</Text>
                
                <TextInput
                  label="الاسم الكامل"
                  placeholder="اكتب اسمك"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (e.target.value) validateName(e.target.value);
                  }}
                  onBlur={() => validateName(formData.name)}
                  required
                  error={nameError}
                />

                <TextInput
                  label="البريد الإلكتروني"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (e.target.value) validateEmail(e.target.value);
                  }}
                  onBlur={() => validateEmail(formData.email)}
                  required
                  error={emailError}
                />

                <TextInput
                  label="رقم الهاتف"
                  placeholder="00xxxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (e.target.value) validatePhone(e.target.value);
                  }}
                  onBlur={() => validatePhone(formData.phone)}
                  required
                  error={phoneError}
                  maxLength={15}
                />
              </Stack>
            </Stepper.Step>

            {/* الخطوة 5: المراجعة */}
            <Stepper.Completed>
              <Stack gap="md">
                <Alert color="green" icon={<FaCheckCircle />}>
                  <Text fw={600}>تم إدخال جميع البيانات بنجاح</Text>
                </Alert>

                <Card withBorder p="lg">
                  <Text size="lg" fw={600} mb="md" c={THEME.primary}>
                    ملخص طلبك
                  </Text>
                  
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={500}>الخدمة:</Text>
                      <Badge color="blue" variant="light">
                        {getServiceLabel(formData.serviceType)}
                      </Badge>
                    </Group>

                    <Group justify="space-between">
                      <Text fw={500}>النوع:</Text>
                      <Text>{getSubcategoryLabel(formData.subcategory)}</Text>
                    </Group>

                    <Group justify="space-between">
                      <Text fw={500}>مدة التسليم:</Text>
                      <Text>
                        {formData.deliveryTime === "custom" 
                          ? formData.customDelivery 
                          : deliveryTimes.find(d => d.value === formData.deliveryTime)?.label}
                      </Text>
                    </Group>

                    {formData.budget && (
                      <Group justify="space-between">
                        <Text fw={500}>الميزانية:</Text>
                        <Text>{formData.budget} جنيه سوداني</Text>
                      </Group>
                    )}

                    {formData.urgent && (
                      <Group justify="space-between">
                        <Text fw={500}>نوع الطلب:</Text>
                        <Badge color="red">🚨 عاجل</Badge>
                      </Group>
                    )}

                    <Divider my="sm" />

                    <Group justify="space-between">
                      <Text fw={500}>الاسم:</Text>
                      <Text>{formData.name}</Text>
                    </Group>

                    <Group justify="space-between">
                      <Text fw={500}>البريد:</Text>
                      <Text>{formData.email}</Text>
                    </Group>

                    <Group justify="space-between">
                      <Text fw={500}>الهاتف:</Text>
                      <Text>{formData.phone}</Text>
                    </Group>
                  </Stack>
                </Card>

                <Group justify="center" mt="lg">
                  <Button 
                    color={THEME.primary} 
                    size="lg" 
                    leftSection={<FaPaperPlane />}
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    إرسال الطلب
                  </Button>
                </Group>
              </Stack>
            </Stepper.Completed>
          </Stepper>

          {/* أزرار التنقل */}
          <Group justify="space-between" mt="xl">
            <Button
              variant="default"
              onClick={prevStep}
              disabled={active === 0}
              leftSection={<FaTimes />}
            >
              رجوع
            </Button>
            
            {active !== 4 ? (
              <Button
                color={THEME.primary}
                onClick={nextStep}
                disabled={
                  (active === 0 && !formData.serviceType) ||
                  (active === 1 && !formData.subcategory) ||
                  (active === 2 && !validateStep3()) ||
                  (active === 3 && (!formData.name || !formData.email || !formData.phone || nameError || emailError || phoneError))
                }
              >
                التالي
              </Button>
            ) : (
              <Button
                color="gray"
                variant="outline"
                onClick={resetForm}
              >
                طلب جديد
              </Button>
            )}
          </Group>
        </Card>

        {/* Modal النتائج */}
        <Modal
          opened={modalOpened}
          onClose={handleCloseModal}
          title={
            <Group>
              <FaPaperPlane color={THEME.primary} />
              <Text fw={700} c={THEME.primary}>
                حالة الإرسال
              </Text>
            </Group>
          }
          radius="md"
          size="lg"
          closeOnClickOutside={false}
          closeOnEscape={!loading && !success}
          withCloseButton={!loading && !success}
        >
          <Stack gap="md">
            {loading ? (
              <>
                <div style={{ textAlign: "center" }}>
                  <Loader size="xl" color={THEME.primary} />
                  <Text mt="md" fw={500}>جاري إرسال طلبك...</Text>
                  <Text size="sm" c="dimmed" mt="xs">يرجى الانتظار</Text>
                </div>
              </>
            ) : success ? (
              <>
                <Alert
                  color="green"
                  title={
                    <Group>
                      <FaCheckCircle />
                      <Text fw={700}>تم إرسال طلبك بنجاح!</Text>
                    </Group>
                  }
                >
                  <Stack gap="xs" mt="sm">
                    <Text>
                      تم استلام طلبك بنجاح وسنتواصل معك خلال 24 ساعة على:
                    </Text>
                    <Badge
                      color="green"
                      variant="light"
                      size="lg"
                      style={{ fontSize: "14px", width: "fit-content" }}
                    >
                      {formData.email}
                    </Badge>
                    
                    <Divider my="sm" />
                    
                    <Group justify="center" mt="md">
                      <div style={{ textAlign: "center" }}>
                        <Text fw={600} size="lg" c={THEME.primary}>
                          {remainingTime}
                        </Text>
                        <Text size="sm" c="dimmed">
                          ثانية  للإغلاق التلقائي
                        </Text>
                      </div>
                    </Group>
                  </Stack>
                </Alert>
              </>
            ) : error ? (
              <Alert
                color="red"
                title={
                  <Group>
                    <FaExclamationTriangle />
                    <Text fw={700}>⚠️ حدث خطأ</Text>
                  </Group>
                }
              >
                <Text>{error}</Text>
                <Group justify="center" mt="md">
                  <Button color="red" onClick={handleCloseModal}>
                    إغلاق والمحاولة مرة أخرى
                  </Button>
                </Group>
              </Alert>
            ) : null}
          </Stack>
        </Modal>
      </Container>
    </div>
  );
}