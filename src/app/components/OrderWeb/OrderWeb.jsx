"use client";
import React, { useState } from "react";
import {
  Card,
  Button,
  Title,
  Text,
  Stack,
  Group,
  Progress,
  Badge,
  TextInput,
  Textarea,
  Accordion,
  Grid,
  Chip,
  Modal,
  Tooltip,
  Alert,
  Loader,
} from "@mantine/core";
import {
  FaCode,
  FaRocket,
  FaLaptopCode,
  FaCheckCircle,
  FaGlobe,
  FaShoppingCart,
  FaPenFancy,
  FaChartLine,
  FaKey,
  FaLanguage,
  FaTable,
  FaFileCode,
  FaTerminal,
  FaMoneyBill,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCogs,
  FaUtensils,
  FaListAlt,
  FaIdBadge,
  FaBriefcase,
  FaBookOpen,
  FaNewspaper,
  FaGraduationCap,
  FaBullhorn,
  FaComments,
  FaHandsHelping,
  FaCalendarAlt,
  FaUserAlt,
  FaCamera,
  FaPlane,
  FaHome,
  FaHeartbeat,
  FaFootballBall,
  FaMusic,
  FaVideo,
  FaGamepad,
  FaLandmark,
  FaMoneyBillWave,
  FaAdjust,
  FaFileAlt,
  FaPalette,
  FaLink,
  FaUsers,
  FaStickyNote,
  FaExclamationTriangle,
  FaPaperPlane,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

// ================================================
// 🔵 1. إعدادات EmailJS - ضع معرفاتك هنا
// ================================================
// ① Service ID: ادخل إلى dashboard.emailjs.com → Email Services → انسخ Service ID
// ② Template ID: ادخل إلى Email Templates → اختر قالب أو أنشئ جديد → انسخ Template ID
// ③ Public Key: Account → انسخ Public Key
const EMAILJS_SERVICE_ID = "service_jc66los"; // ⬅️ ضع Service ID هنا
const EMAILJS_TEMPLATE_ID = "template_zsb79zq"; // ⬅️ ضع Template ID هنا
const EMAILJS_PUBLIC_KEY = "ZxLtSLDcogh2r5j2i"; // ⬅️ ضع Public Key هنا

// ================================================
// 🔵 2. لوحة الألوان الجديدة (طيف أزرق)
// ================================================
const BLUE_THEME = {
  primary: "#3b82f6", // أزرق أساسي
  primaryLight: "#60a5fa", // أزرق فاتح
  primaryDark: "#1d4ed8", // أزرق داكن
  gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  cardBg: "#ffffff", // خلفية البطاقات
  textDark: "#1e293b", // نص داكن
  textLight: "#64748b", // نص فاتح
  success: "#10b981", // أخضر للنجاح
  warning: "#f59e0b", // برتقالي للتحذير
  error: "#ef4444", // أحمر للخطأ
};

/* بيانات العرض */
// const showcaseProjects = [
//   {
//     id: 1,
//     title: "E-Commerce Pro",
//     description: "متجر سريع مع خصائص دفع وتعدد لغات",
//     tech: ["Next.js", "Stripe", "Mantine", "i18n"],
//   },
//   {
//     id: 2,
//     title: "Company Landing",
//     description: "صفحة شركة أنيقة قابلة للتخصيص",
//     tech: ["Next.js", "SEO", "Mantine"],
//   },
//   {
//     id: 3,
//     title: "Admin Dashboard",
//     description: "لوحة تحكم بصرية لعرض البيانات والتقارير",
//     tech: ["Next.js", "Charts", "Mantine"],
//   },
// ];

/* خيارات الباني */
const siteTypes = [
  { value: "ecommerce", label: "متجر إلكتروني", icon: <FaShoppingCart /> },
  { value: "blog", label: "مدونة", icon: <FaPenFancy /> },
  { value: "company", label: "موقع شركة", icon: <FaGlobe /> },
  { value: "dashboard", label: "لوحة تحكم", icon: <FaChartLine /> },
  { value: "restaurant", label: "موقع مطعم", icon: <FaUtensils /> },
  { value: "menu", label: "منيو إلكتروني", icon: <FaListAlt /> },
  { value: "cv", label: "سيرة ذاتية إلكترونية", icon: <FaIdBadge /> },
  { value: "portfolio", label: "معرض أعمال", icon: <FaBriefcase /> },
  { value: "magazine", label: "مجلة إلكترونية", icon: <FaBookOpen /> },
  { value: "news", label: "موقع إخباري", icon: <FaNewspaper /> },
  { value: "education", label: "موقع تعليمي", icon: <FaGraduationCap /> },
  { value: "landing", label: "صفحة هبوط", icon: <FaBullhorn /> },
  { value: "forum", label: "منتدى", icon: <FaComments /> },
  { value: "nonprofit", label: "مؤسسة غير ربحية", icon: <FaHandsHelping /> },
  { value: "event", label: "فعاليات / مؤتمر", icon: <FaCalendarAlt /> },
  { value: "personal", label: "موقع شخصي", icon: <FaUserAlt /> },
  { value: "photography", label: "موقع تصوير فوتوغرافي", icon: <FaCamera /> },
  { value: "travel", label: "موقع سياحة وسفر", icon: <FaPlane /> },
  { value: "realestate", label: "موقع عقارات", icon: <FaHome /> },
  { value: "healthcare", label: "موقع صحي / عيادة", icon: <FaHeartbeat /> },
  { value: "sports", label: "موقع رياضي / نادي", icon: <FaFootballBall /> },
  { value: "music", label: "موقع موسيقى / فرقة", icon: <FaMusic /> },
  { value: "video", label: "موقع فيديو / بث مباشر", icon: <FaVideo /> },
  { value: "gaming", label: "موقع ألعاب", icon: <FaGamepad /> },
  { value: "government", label: "موقع حكومي", icon: <FaLandmark /> },
  { value: "finance", label: "موقع مالي / بنك", icon: <FaMoneyBillWave /> },
];

const featureOptions = [
  { value: "login", label: "تسجيل دخول", icon: <FaKey /> },
  { value: "theme", label: "الوضع الداكن والفاتح", icon: <FaAdjust /> },
  { value: "dashboard", label: "لوحة إدارة", icon: <FaTable /> },
  { value: "multiLang", label: "تعدد اللغات", icon: <FaLanguage /> },
];

/* Hero Section */
function HeroSection({ onStart }) {
  return (
    <div className="text-center py-16">
      <Group justify="center" mb="sm">
        <FaLaptopCode size={32} color={BLUE_THEME.primary} />
      </Group>
      <Title
        order={1}
        c={BLUE_THEME.primary}
        mb="xs"
        style={{ fontFamily: "inherit" }}
      >
        {"اطلب موقع الويب الخاص بك"}
      </Title>
      <Text c="dimmed" size="lg">
        من الفكرة إلى الإطلاق — تجربة تفاعلية لبناء مشروعك
      </Text>
      <Group justify="center" mt="lg">
        <Button
          size="md"
          color={BLUE_THEME.primary}
          radius="md"
          leftSection={<FaRocket />}
          onClick={onStart}
        >
          ابدأ مشروعك الآن
        </Button>
      </Group>
    </div>
  );
}

/* Live Preview متطور مع تسعير */
function LivePreview({ form, step }) {
  const typeLabel = siteTypes.find((t) => t.value === form.type)?.label || "—";

  // حساب السعر والمدة
  let price = 0;
  let duration = 0;
  switch (form.type) {
    case "ecommerce": // متجر إلكتروني كبير
      price += 3000000;
      duration += 25;
      break;
    case "blog": // مدونة
      price += 400000;
      duration += 10;
      break;
    case "company": // موقع شركة
      price += 1000000;
      duration += 17;
      break;
    case "dashboard": // لوحة تحكم
      price += 2000000;
      duration += 30;
      break;
    case "restaurant": // موقع مطعم
      price += 800000;
      duration += 12;
      break;
    case "menu": // منيو إلكتروني
      price += 600000;
      duration += 8;
      break;
    case "cv": // سيرة ذاتية إلكترونية
      price += 300000;
      duration += 5;
      break;
    case "portfolio": // معرض أعمال (بورتفوليو)
      price += 500000;
      duration += 7;
      break;
    case "magazine": // مجلة إلكترونية
      price += 1200000;
      duration += 20;
      break;
    case "news": // موقع إخباري
      price += 1500000;
      duration += 22;
      break;
    case "education": // موقع تعليمي / كورسات
      price += 1800000;
      duration += 25;
      break;
    case "landing": // صفحة هبوط تسويقية
      price += 250000;
      duration += 4;
      break;
    case "forum": // منتدى
      price += 1000000;
      duration += 18;
      break;
    case "nonprofit": // مؤسسة غير ربحية
      price += 700000;
      duration += 12;
      break;
    case "event": // فعاليات / مؤتمر
      price += 900000;
      duration += 14;
      break;
    case "personal": // موقع شخصي بسيط
      price += 350000;
      duration += 6;
      break;
    case "photography": // موقع تصوير فوتوغرافي
      price += 600000;
      duration += 9;
      break;
    case "travel": // سياحة وسفر
      price += 1300000;
      duration += 21;
      break;
    case "realestate": // عقارات
      price += 2000000;
      duration += 28;
      break;
    case "healthcare": // موقع عيادة / مستشفى
      price += 1600000;
      duration += 24;
      break;
    case "sports": // موقع رياضي / نادي
      price += 1200000;
      duration += 20;
      break;
    case "music": // موقع موسيقى / فرقة
      price += 1000000;
      duration += 18;
      break;
    case "video": // موقع فيديو / بث مباشر
      price += 2200000;
      duration += 30;
      break;
    case "gaming": // موقع ألعاب
      price += 2500000;
      duration += 32;
      break;
    case "government": // موقع حكومي / خدمات عامة
      price += 3000000;
      duration += 35;
      break;
    case "finance": // موقع مالي / بنك
      price += 2800000;
      duration += 33;
      break;
    default:
      break;
  }

  if (form.features.includes("login")) {
    price += 300000;
    duration += 3;
  }

  if (form.features.includes("dashboard")) {
    price += 1000000;
    duration += 7;
  }

  if (form.features.includes("multiLang")) {
    price += 100000;
    duration += 5;
  }

  if (form.features.includes("theme")) {
    price += 100000; // تكلفة تقريبية لميزة الثيم
    duration += 4; // مدة إضافية للتنفيذ
  }

  return (
    <Stack gap="md">
      <Card
        withBorder
        shadow="sm"
        p="md"
        style={{ background: BLUE_THEME.cardBg }}
      >
        <div
          className="flex items-center gap-2 mb-2"
          style={{ color: BLUE_THEME.primary, fontWeight: 600 }}
        >
          <FaLaptopCode /> المعاينة الحيّة
        </div>

        {step >= 1 && (
          <Card withBorder p="sm" mb="sm">
            <Text className="flex items-center gap-1" fw={600}>
              <FaGlobe /> نوع الموقع:
            </Text>
            <Text>{typeLabel}</Text>
          </Card>
        )}

        {step >= 2 && (
          <Card withBorder p="sm" mb="sm">
            <Text className="flex items-center gap-1" fw={600}>
              <FaCogs /> المميزات:
            </Text>
            <Group mt="xs">
              {form.features.includes("login") && (
                <Badge color="blue" leftSection={<FaKey />}>
                  Login
                </Badge>
              )}
              {form.features.includes("theme") && (
                <Badge color="gray" leftSection={<FaAdjust />}>
                  Dark/Light
                </Badge>
              )}
              {form.features.includes("dashboard") && (
                <Badge color="indigo" leftSection={<FaTable />}>
                  Dashboard
                </Badge>
              )}
              {form.features.includes("multiLang") && (
                <Badge color="orange" leftSection={<FaLanguage />}>
                  MultiLang
                </Badge>
              )}
            </Group>
          </Card>
        )}

        {step >= 3 && (
          <Card withBorder p="sm" mb="sm">
            <Text className="flex items-center gap-1" fw={600}>
              <FaFileCode /> تفاصيل المشروع:
            </Text>

            <Text className="flex items-center gap-1">
              <FaGlobe /> اسم الموقع: {form.siteName || "—"}
            </Text>

            <Text className="flex items-center gap-1">
              <FaFileAlt /> المحتوى الأساسي: {form.content || "—"}
            </Text>

            <Text className="flex items-center gap-1">
              <FaPalette /> الهوية البصرية: {form.branding || "—"}
            </Text>

            <Text className="flex items-center gap-1">
              <FaLink /> مواقع مشابهة: {form.references || "—"}
            </Text>

            <Text className="flex items-center gap-1">
              <FaUsers /> الجمهور المستهدف: {form.audience || "—"}
            </Text>

            <Text className="flex items-center gap-1">
              <FaStickyNote /> ملاحظات إضافية: {form.extraNote || "—"}
            </Text>
          </Card>
        )}

        {step >= 4 && (
          <Card withBorder p="sm">
            <Text fw={600}>
              <FaUser /> بيانات العميل:
            </Text>
            <Text>
              <FaUser /> {form.name || "—"}
            </Text>
            <Text>
              <FaEnvelope /> {form.email || "—"}
            </Text>
            <Text>
              <FaPhone /> {form.phone || "—"}
            </Text>
          </Card>
        )}
      </Card>

      {/* قسم السعر والمدة */}
      <Card
        withBorder
        shadow="sm"
        p="md"
        style={{ background: BLUE_THEME.cardBg }}
      >
        <div
          className="flex items-center gap-2 mb-2"
          style={{ color: BLUE_THEME.primary, fontWeight: 600 }}
        >
          <FaMoneyBill /> السعر والمدة المتوقعة
        </div>
        <Text>
          السعر التقديري:{" "}
          <b style={{ color: BLUE_THEME.primaryDark }}>
            {price.toLocaleString()}
          </b>{" "}
          جنيه سوداني
        </Text>
        <Text>
          ⏳ المدة التقديرية:{" "}
          <b style={{ color: BLUE_THEME.primaryDark }}>{duration}</b> يوم
        </Text>
        <Text size="sm" c="dimmed">
          * الأرقام تقديرية وتختلف حسب التفاصيل النهائية
        </Text>
      </Card>

      {/* JSON Summary */}
      <Card
        withBorder
        shadow="sm"
        p="md"
        style={{ background: BLUE_THEME.cardBg }}
      >
        <div
          className="flex items-center gap-2 mb-2"
          style={{ color: BLUE_THEME.primary, fontWeight: 600 }}
        >
          <FaFileCode />
          JSON Summary
        </div>
        <pre
          style={{
            margin: 0,
            color: BLUE_THEME.textDark,
            fontFamily: "inherit",
          }}
        >
          {JSON.stringify(form, null, 2)}
        </pre>
      </Card>

      {/* Terminal Log */}
      <Card
        withBorder
        shadow="sm"
        p="md"
        style={{ background: BLUE_THEME.cardBg, color: BLUE_THEME.success }}
      >
        <div
          className="flex items-center gap-2 mb-2"
          style={{ color: BLUE_THEME.primary, fontWeight: 600 }}
        >
          <FaTerminal /> Terminal Log
        </div>
        {`> building preview...
> applying features: ${form.features.join(", ") || "none"}
> calculating price & duration...
> ready ✅`}
      </Card>
    </Stack>
  );
}

/* Builder */
function Builder({ form, setForm, onLaunch, step, setStep }) {
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const progress = (step / 4) * 100;

  // ================================================
  // 🔵 دالة التحقق من صحة البيانات
  // ================================================
  const validateForm = () => {
    // التحقق من الاسم
    if (!form.name.trim()) {
      return "الاسم مطلوب";
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s]{2,}$/.test(form.name.trim())) {
      return "الاسم يجب أن يحتوي على حروف فقط ويكون أكثر من حرفين";
    }
    
    // التحقق من البريد الإلكتروني
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return "البريد الإلكتروني غير صحيح";
    }
    
    // التحقق من رقم الهاتف
    if (!/^00\d{9,13}$/.test(String(form.phone).trim())) {
      return "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 ويتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)";
    }
    
    return "";
  };

  const handleNext = () => {
    if (step === 4) {
      const validationError = validateForm();
      if (validationError) {
        alert(validationError);
        return;
      }
    }
    next();
  };

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div
          className="flex items-center gap-2 text-xl"
          style={{ color: BLUE_THEME.primary, fontWeight: 600 }}
        >
          باني المشروع التفاعلي
        </div>
        <Badge color={BLUE_THEME.primary} variant="light">
          خطوة {step} من 4
        </Badge>
      </Group>
      <Progress
        value={progress}
        size="md"
        radius="md"
        color={BLUE_THEME.primary}
      />

      {step === 1 && (
        <Stack>
          <div style={{ color: BLUE_THEME.primary, fontWeight: 600 }}>
            اختر نوع الموقع
          </div>
          <Grid>
            {siteTypes.map((t) => (
              <Grid.Col key={t.value} span={{ base: 12, sm: 6 }}>
                <Card
                  withBorder
                  shadow={form.type === t.value ? "md" : "sm"}
                  radius="md"
                  p="md"
                  style={{
                    cursor: "pointer",
                    borderColor:
                      form.type === t.value ? BLUE_THEME.primary : undefined,
                    background:
                      form.type === t.value
                        ? BLUE_THEME.background
                        : BLUE_THEME.cardBg,
                  }}
                  onClick={() => setForm({ ...form, type: t.value })}
                >
                  <Group>
                    {t.icon}
                    <Text fw={600}>{t.label}</Text>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )}

      {step === 2 && (
        <Stack>
          <div style={{ color: BLUE_THEME.primary, fontWeight: 600 }}>
            اختر المميزات
          </div>
          <Chip.Group
            multiple
            value={form.features}
            onChange={(vals) => setForm({ ...form, features: vals })}
          >
            <Group>
              {featureOptions.map((f) => {
                const isChecked = form.features.includes(f.value);
                return (
                  <div
                    key={f.value}
                    onClick={() => {
                      setForm({
                        ...form,
                        features: isChecked
                          ? form.features.filter((feat) => feat !== f.value)
                          : [...form.features, f.value],
                      });
                    }}
                    className={`chip flex items-center gap-2 text-md font-medium border rounded-md px-3 py-1 cursor-pointer ${
                      isChecked
                        ? `bg-[${BLUE_THEME.background}] border-[${BLUE_THEME.primary}]`
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {f.icon}
                    {f.label}
                  </div>
                );
              })}
            </Group>
          </Chip.Group>
        </Stack>
      )}

      {step === 3 && (
        <Stack>
          <div style={{ color: BLUE_THEME.primary, fontWeight: 600 }}>
            تفاصيل إضافية
          </div>

          <TextInput
            label="اسم الموقع"
            placeholder="مثال: موقع مطعم، متجر إلكتروني..."
            value={form.siteName}
            onChange={(e) =>
              setForm({ ...form, siteName: e.currentTarget.value })
            }
          />

          <Textarea
            label="المحتوى الأساسي"
            placeholder="هل لديك نصوص أو صور جاهزة للموقع؟ إذا نعم سيتطلب منك إرسالها"
            minRows={3}
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.currentTarget.value })
            }
          />

          <Textarea
            label="الهوية البصرية"
            placeholder="اذكر الألوان أو الشعار أو الثيم المطلوب"
            minRows={2}
            value={form.branding}
            onChange={(e) =>
              setForm({ ...form, branding: e.currentTarget.value })
            }
          />

          <Textarea
            label="مواقع مشابهة"
            placeholder="ضع روابط لمواقع تعجبك أو تريد أن يكون موقعك مشابه لها"
            minRows={2}
            value={form.references}
            onChange={(e) =>
              setForm({ ...form, references: e.currentTarget.value })
            }
          />

          <Textarea
            label="الجمهور المستهدف"
            placeholder="من هم المستخدمين الأساسيين للموقع؟"
            minRows={2}
            value={form.audience}
            onChange={(e) =>
              setForm({ ...form, audience: e.currentTarget.value })
            }
          />

          <Textarea
            label="ملاحظات إضافية"
            placeholder="أي تفاصيل أو أفكار إضافية عن الموقع"
            minRows={2}
            value={form.extraNote}
            onChange={(e) =>
              setForm({ ...form, extraNote: e.currentTarget.value })
            }
          />
        </Stack>
      )}

      {step === 4 && (
        <Stack>
          <div style={{ color: BLUE_THEME.primary, fontWeight: 600 }}>
            بيانات العميل
          </div>
          <TextInput
            label="الاسم"
            placeholder="اكتب اسمك"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
            error={form.name && !/^[\u0600-\u06FFa-zA-Z\s]{2,}$/.test(form.name.trim()) ? "الاسم يجب أن يحتوي على حروف فقط ويكون أكثر من حرفين" : null}
          />
          <TextInput
            label="البريد الإلكتروني"
            placeholder="example@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
            error={form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? "البريد الإلكتروني غير صحيح" : null}
          />
          <TextInput
            label="رقم الهاتف"
            placeholder="00xxxxxxxxxxx"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.currentTarget.value })}
            maxLength={15}
            error={form.phone && !/^00\d{9,13}$/.test(String(form.phone).trim()) ? "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 ويتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)" : null}
          />
        </Stack>
      )}

      <Group justify="space-between" mt="md">
        <Button variant="default" onClick={prev} disabled={step === 1}>
          رجوع
        </Button>
        {step < 4 ? (
          <Button color={BLUE_THEME.primary} onClick={handleNext}>
            التالي
          </Button>
        ) : (
          <Tooltip label="إطلاق المشروع ومعاينة الملخص النهائي" withArrow>
            <Button
              color={BLUE_THEME.primary}
              leftSection={<FaRocket />}
              onClick={onLaunch}
            >
              إطلاق المشروع
            </Button>
          </Tooltip>
        )}
      </Group>
    </Stack>
  );
}

/*         أمثلة من أعمال مشابهة        */
// Showcase

// function Showcase() {
//   return (
//     <Stack gap="md">
//       <Title order={3} c={BLUE_THEME.primary}>
//         أمثلة من أعمال مشابهة
//       </Title>
//       <Grid>
//         {showcaseProjects.map((p) => (
//           <Grid.Col key={p.id} span={{ base: 12, sm: 6, md: 4 }}>
//             <Card withBorder shadow="sm" p="md">
//               <Card.Section>
//                 <div
//                   style={{
//                     width: "100%",
//                     height: 140,
//                     background: BLUE_THEME.gradient,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#fff",
//                     fontWeight: 700,
//                   }}
//                 >
//                   {p.title}
//                 </div>
//               </Card.Section>
//               <Stack gap="xs" mt="sm">
//                 <Text c="dimmed">{p.description}</Text>
//                 <Group gap="xs">
//                   {p.tech.map((t) => (
//                     <Badge key={t} color="blue" variant="light">
//                       {t}
//                     </Badge>
//                   ))}
//                 </Group>
//               </Stack>
//             </Card>
//           </Grid.Col>
//         ))}
//       </Grid>
//     </Stack>
//   );
// }

/* FAQ Section */
function FAQ() {
  return (
    <Stack>
      <div style={{ color: BLUE_THEME.primary, fontWeight: 600 }}>
        أسئلة شائعة
      </div>
      <Accordion variant="separated" radius="md">
        <Accordion.Item value="time">
          <Accordion.Control>كم يستغرق بناء الموقع؟</Accordion.Control>
          <Accordion.Panel>
            يعتمد على نوع الموقع والمميزات المختارة. عادةً من أسبوعين إلى 6
            أسابيع للمشاريع المتوسطة.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="edits">
          <Accordion.Control>هل أقدر أطلب تعديلات؟</Accordion.Control>
          <Accordion.Panel>
            نعم، هناك جولات مراجعة متفق عليها ضمن العقد لضمان الوصول للشكل
            المطلوب.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="tech">
          <Accordion.Control>ما التقنيات المستخدمة؟</Accordion.Control>
          <Accordion.Panel>
            عادةً: Next.js، Mantine، تكامل الدفع (Stripe)، دعم متعدد اللغات،
            وأفضل ممارسات SEO والأداء.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}

/* الصفحة الرئيسية */
export default function OrderWeb() {
  const [started, setStarted] = useState(false);
  const [launchOpen, setLaunchOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    type: "",
    features: [],
    siteName: "",
    content: "",
    branding: "",
    references: "",
    audience: "",
    extraNote: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleLaunch = () => setLaunchOpen(true);

  // ================================================
  // 🔵 3. دالة التحقق من صحة البيانات
  // ================================================
  const validateForm = () => {
    // التحقق من الاسم
    if (!form.name.trim()) {
      return "الاسم مطلوب";
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s]{2,}$/.test(form.name.trim())) {
      return "الاسم يجب أن يحتوي على حروف فقط ويكون أكثر من حرفين";
    }
    
    // التحقق من البريد الإلكتروني
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return "البريد الإلكتروني غير صحيح";
    }
    
    // التحقق من رقم الهاتف
    if (!/^00\d{9,13}$/.test(String(form.phone).trim())) {
      return "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 ويتكون من أرقام انجليزية فقط (00 تعني + بعدها مفتاح دولتك)";
    }
    
    return "";
  };

  // ================================================
  // 🔵 4. دالة إرسال البريد الإلكتروني باستخدام EmailJS
  // ================================================
  const sendEmail = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("⚠️ إعدادات EmailJS غير مكتملة. راجع تعليمات الإعداد أعلاه.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // حساب السعر والمدة
      let price = 0;
      let duration = 0;
      switch (form.type) {
        case "ecommerce": price += 3000000; duration += 25; break;
        case "blog": price += 400000; duration += 10; break;
        case "company": price += 1000000; duration += 17; break;
        case "dashboard": price += 2000000; duration += 30; break;
        case "restaurant": price += 800000; duration += 12; break;
        case "menu": price += 600000; duration += 8; break;
        case "cv": price += 300000; duration += 5; break;
        case "portfolio": price += 500000; duration += 7; break;
        case "magazine": price += 1200000; duration += 20; break;
        case "news": price += 1500000; duration += 22; break;
        case "education": price += 1800000; duration += 25; break;
        case "landing": price += 250000; duration += 4; break;
        case "forum": price += 1000000; duration += 18; break;
        case "nonprofit": price += 700000; duration += 12; break;
        case "event": price += 900000; duration += 14; break;
        case "personal": price += 350000; duration += 6; break;
        case "photography": price += 600000; duration += 9; break;
        case "travel": price += 1300000; duration += 21; break;
        case "realestate": price += 2000000; duration += 28; break;
        case "healthcare": price += 1600000; duration += 24; break;
        case "sports": price += 1200000; duration += 20; break;
        case "music": price += 1000000; duration += 18; break;
        case "video": price += 2200000; duration += 30; break;
        case "gaming": price += 2500000; duration += 32; break;
        case "government": price += 3000000; duration += 35; break;
        case "finance": price += 2800000; duration += 33; break;
        default: break;
      }

      if (form.features.includes("login")) { price += 300000; duration += 3; }
      if (form.features.includes("dashboard")) { price += 1000000; duration += 7; }
      if (form.features.includes("multiLang")) { price += 100000; duration += 5; }
      if (form.features.includes("theme")) { price += 100000; duration += 4; }

      const templateParams = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service_type: "موقع ويب",
        submission_date: new Date().toLocaleString("ar-SA"),
        reference_id: "WEB-" + Date.now().toString().slice(-6),
        site_type:
          siteTypes.find((t) => t.value === form.type)?.label || "غير محدد",
        site_name: form.siteName || "غير محدد",
        features: form.features.map((f) => {
          const feature = featureOptions.find((opt) => opt.value === f);
          return feature ? feature.label : f;
        }),
        estimated_price: price.toLocaleString() + " جنيه سوداني",
        estimated_duration: duration + " يوم",
        content_details: form.content || "لم يتم تحديد",
        branding_details: form.branding || "لم يتم تحديد",
        references: form.references || "لا يوجد",
        target_audience: form.audience || "لم يتم تحديد",
        extra_notes: form.extraNote || "لا يوجد",
        project_details: JSON.stringify(form, null, 2),
        description: form.content,
        changes: "طلب موقع ويب جديد",
        design_id: "WEB-" + Date.now().toString().slice(-4),
        design_title: form.siteName || "موقع ويب جديد",
        design_price: (price * 1.2).toLocaleString() + " جنيه",
        design_final_price: price.toLocaleString() + " جنيه سوداني",
        design_discount: "10",
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSuccess(true);

        // تأخير 5 ثوانٍ قبل الإغلاق التلقائي
        setTimeout(() => {
          setLaunchOpen(false);
          setSuccess(false);

          // إعادة تعيين النموذج بعد الإرسال الناجح
          setForm({
            type: "",
            features: [],
            siteName: "",
            content: "",
            branding: "",
            references: "",
            audience: "",
            extraNote: "",
            name: "",
            email: "",
            phone: "",
          });
          setStep(1);
          setStarted(false);
        }, 5000); // 5000 ميلي ثانية = 5 ثوانٍ
      }
    } catch (err) {
      console.error("خطأ في إرسال البريد:", err);
      setError(
        "❌ حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل مع الدعم."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: BLUE_THEME.background,
        color: BLUE_THEME.textDark,
        minHeight: "100vh",
      }}
    >
      <div
        className="container mx-auto"
        style={{ maxWidth: 1200, padding: "24px" }}
      >
        <HeroSection onStart={() => setStarted(true)} />

        <Grid gutter="xl" mt="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card withBorder shadow="md" p="lg">
              {!started ? (
                <Stack align="center" gap="md">
                  <FaCode size={28} color={BLUE_THEME.primary} />
                  <Text c="dimmed">
                    اضغط "ابدأ مشروعك الآن" للانطلاق في الخطوات التفاعلية
                  </Text>
                </Stack>
              ) : (
                <Builder
                  form={form}
                  setForm={setForm}
                  onLaunch={handleLaunch}
                  step={step}
                  setStep={setStep}
                />
              )}
            </Card>

            {/* <Card withBorder shadow="sm" p="lg" mt="xl">
              <Showcase />
            </Card> */}

            <Card withBorder shadow="sm" p="lg" mt="xl">
              <FAQ />
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <LivePreview form={form} step={step} />
          </Grid.Col>
        </Grid>
      </div>
      {/* Launch Modal مع EmailJS */}
      <Modal
        opened={launchOpen}
        onClose={() => {
          if (!loading) setLaunchOpen(false);
        }}
        title={
          <Group>
            <FaRocket color={BLUE_THEME.primary} />
            <Text fw={700} c={BLUE_THEME.primary}>
              إطلاق مشروعك
            </Text>
          </Group>
        }
        radius="md"
        size="lg"
      >
        <Stack gap="md">
          {success ? (
            <Alert
              color="green"
              title="تم إرسال طلبك بنجاح!"
              icon={<FaCheckCircle />}
            >
              <Text>
                تم إرسال تفاصيل مشروعك بنجاح. سنتواصل معك في أقرب وقت على
                البريد:
                <br />
                <b>{form.email}</b>
              </Text>
              <Loader type="dots" color="green" size="sm" mt="sm" />
            </Alert>
          ) : error ? (
            <Alert
              color="red"
              title="⚠️ حدث خطأ"
              icon={<FaExclamationTriangle />}
            >
              <Text>{error}</Text>
            </Alert>
          ) : (
            <>
              <Text>
                مبروك! هذه نسخة ملخصة قابلة للمشاركة من مشروعك. سنراجع التفاصيل
                ونتواصل معك لإتمام الاتفاق.
              </Text>

              <Card
                withBorder
                p="md"
                style={{ background: BLUE_THEME.background }}
              >
                <div
                  className="flex items-center gap-2 mb-2"
                  style={{ color: BLUE_THEME.primary, fontWeight: 600 }}
                >
                  ملخص المشروع
                </div>
                <Stack gap="xs">
                  <Text>
                    <b>العميل:</b> {form.name || "غير محدد"}
                  </Text>
                  <Text>
                    <b>البريد:</b> {form.email || "غير محدد"}
                  </Text>
                  <Text>
                    <b>نوع الموقع:</b>{" "}
                    {siteTypes.find((t) => t.value === form.type)?.label ||
                      "غير محدد"}
                  </Text>
                  <Text>
                    <b>المميزات:</b>{" "}
                    {form.features.length > 0
                      ? form.features.join(", ")
                      : "لا يوجد"}
                  </Text>
                </Stack>
              </Card>

              <Card withBorder p="md">
                <div
                  className="flex items-center gap-2 mb-2"
                  style={{ color: BLUE_THEME.primary, fontWeight: 600 }}
                >
                  JSON البيانات
                </div>
                <pre
                  style={{
                    margin: 0,
                    color: BLUE_THEME.textDark,
                    fontFamily: "monospace",
                    fontSize: "12px",
                    maxHeight: "200px",
                    overflow: "auto",
                  }}
                >
                  {JSON.stringify(form, null, 2)}
                </pre>
              </Card>

              {/* <Alert
                color="blue"
                title="📧 سيتم الإرسال إلى:"
                icon={<FaEnvelope />}
              >
                <Text size="sm">
                  سيتم إرسال هذا الطلب إلى بريدك الإلكتروني ({form.email}) وإلى
                  فريق الدعم الفني لتتبع طلبك.
                </Text>
              </Alert> */}

              <Group justify="space-between" mt="md">
                <Button
                  variant="default"
                  onClick={() => setLaunchOpen(false)}
                  disabled={loading}
                >
                  إغلاق
                </Button>
                <Group>
                  {loading ? (
                    <Loader size="sm" color={BLUE_THEME.primary} />
                  ) : (
                    <Button
                      color={BLUE_THEME.primary}
                      leftSection={<FaPaperPlane />}
                      onClick={sendEmail}
                      disabled={loading || !form.name || !form.email}
                    >
                      {loading ? "جاري الإرسال..." : "تأكيد وإرسال"}
                    </Button>
                  )}
                </Group>
              </Group>
            </>
          )}
        </Stack>
      </Modal>
    </div>
  );
}