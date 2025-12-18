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
  NumberInput,
  Textarea,
  Accordion,
  Grid,
  Chip,
  Modal,
  Tooltip,
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
  FaCreditCard,
  FaLanguage,
  FaTable,
  FaFileCode,
  FaTerminal,
  FaClock,
  FaMoneyBill,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCogs,
} from "react-icons/fa";

/* بيانات العرض */
const showcaseProjects = [
  {
    id: 1,
    title: "E-Commerce Pro",
    description: "متجر سريع مع خصائص دفع وتعدد لغات",
    tech: ["Next.js", "Stripe", "Mantine", "i18n"],
  },
  {
    id: 2,
    title: "Company Landing",
    description: "صفحة شركة أنيقة قابلة للتخصيص",
    tech: ["Next.js", "SEO", "Mantine"],
  },
  {
    id: 3,
    title: "Admin Dashboard",
    description: "لوحة تحكم بصرية لعرض البيانات والتقارير",
    tech: ["Next.js", "Charts", "Mantine"],
  },
];

/* خيارات الباني */
const siteTypes = [
  { value: "ecommerce", label: "متجر إلكتروني", icon: <FaShoppingCart /> },
  { value: "blog", label: "مدونة", icon: <FaPenFancy /> },
  { value: "company", label: "موقع شركة", icon: <FaGlobe /> },
  { value: "dashboard", label: "لوحة تحكم", icon: <FaChartLine /> },
];

const featureOptions = [
  { value: "login", label: "تسجيل دخول", icon: <FaKey /> },
  { value: "payment", label: "دفع إلكتروني", icon: <FaCreditCard /> },
  { value: "dashboard", label: "لوحة إدارة", icon: <FaTable /> },
  { value: "multiLang", label: "تعدد اللغات", icon: <FaLanguage /> },
];

/* Hero Section */
function HeroSection({ onStart }) {
  return (
    <div className="text-center py-16" style={{ background: "#f9fafb" }}>
      <Group justify="center" mb="sm">
        <FaLaptopCode size={32} color="#14b8a6" />
      </Group>
      <Title order={1} c="teal" mb="xs" style={{ fontFamily: "inherit" }}>
        {"</> اطلب موقعك بقوة البرمجة"}
      </Title>
      <Text c="dimmed" size="lg">
        من الفكرة إلى الإطلاق  — تجربة تفاعلية لبناء مشروعك
      </Text>
      <Group justify="center" mt="lg">
        <Button size="md" color="teal" radius="md" leftSection={<FaRocket />} onClick={onStart}>
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
    case "ecommerce":
      price += 5000; duration += 21; break;
    case "blog":
      price += 3000; duration += 14; break;
    case "company":
      price += 4000; duration += 14; break;
    case "dashboard":
      price += 6000; duration += 28; break;
    default:
      break;
  }

  if (form.features.includes("login")) { price += 500; duration += 3; }
  if (form.features.includes("payment")) { price += 1500; duration += 7; }
  if (form.features.includes("dashboard")) { price += 2000; duration += 7; }
  if (form.features.includes("multiLang")) { price += 1000; duration += 5; }

  return (
    <Stack gap="md">
      <Card withBorder shadow="sm" p="md" style={{ background: "#fff" }}>
        <Title order={4} mb="sm"><FaLaptopCode /> المعاينة الحيّة</Title>

        {step >= 1 && (
          <Card withBorder p="sm" mb="sm">
            <Text fw={600}><FaGlobe /> نوع الموقع:</Text>
            <Text>{typeLabel}</Text>
          </Card>
        )}

        {step >= 2 && (
          <Card withBorder p="sm" mb="sm">
            <Text fw={600}><FaCogs /> المميزات:</Text>
            <Group mt="xs">
              {form.features.includes("login") && <Badge color="teal" leftSection={<FaKey />}>Login</Badge>}
              {form.features.includes("payment") && <Badge color="blue" leftSection={<FaCreditCard />}>Checkout</Badge>}
              {form.features.includes("dashboard") && <Badge color="indigo" leftSection={<FaTable />}>Dashboard</Badge>}
              {form.features.includes("multiLang") && <Badge color="orange" leftSection={<FaLanguage />}>MultiLang</Badge>}
            </Group>
          </Card>
        )}

        {step >= 3 && (
          <Card withBorder p="sm" mb="sm">
            <Text fw={600}><FaFileCode /> تفاصيل المشروع:</Text>
            <Text><FaClock /> المدة: {form.duration || "—"}</Text>
            <Text><FaMoneyBill /> الميزانية: {form.budget || "—"} جنيه سوداني</Text>
            <Text><FaFileCode /> الوصف: {form.note || "—"}</Text>
          </Card>
        )}

        {step >= 4 && (
          <Card withBorder p="sm">
            <Text fw={600}><FaUser /> بيانات العميل:</Text>
            <Text><FaUser /> {form.name || "—"}</Text>
            <Text><FaEnvelope /> {form.email || "—"}</Text>
            <Text><FaPhone /> {form.phone || "—"}</Text>
          </Card>
        )}
      </Card>

      {/* قسم السعر والمدة */}
      <Card withBorder shadow="sm" p="md" style={{ background: "#fff" }}>
        <Title order={5} mb="sm"><FaMoneyBill /> السعر والمدة المتوقعة</Title>
        <Text>السعر التقديري: <b>{price}</b> جنيه سوداني</Text>
        <Text>⏳ المدة التقديرية: <b>{duration}</b> يوم</Text>
        <Text size="sm" c="dimmed">* الأرقام تقديرية وتختلف حسب التفاصيل النهائية</Text>
      </Card>

      {/* JSON Summary */}
      <Card withBorder shadow="sm" p="md" style={{ background: "#fff" }}>
        <Title order={5} mb="sm"><FaFileCode /> JSON Summary</Title>
        <pre style={{ margin: 0, color: "#1e293b", fontFamily: "inherit" }}>
          {JSON.stringify(form, null, 2)}
        </pre>
      </Card>

      {/* Terminal Log */}
      <Card withBorder shadow="sm" p="md" style={{ background: "#fff", color: "#16a34a" }}>
        <Title order={5} mb="sm"><FaTerminal /> Terminal Log</Title>
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

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Title order={3}>باني المشروع التفاعلي</Title>
        <Badge color="teal" variant="light">خطوة {step} من 4</Badge>
      </Group>
           <Progress value={progress} size="md" radius="md" />

      {step === 1 && (
        <Stack>
          <Title order={4}>اختر نوع الموقع</Title>
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
                    borderColor: form.type === t.value ? "#14b8a6" : undefined,
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
          <Title order={4}>اختر المميزات</Title>
          <Chip.Group
            multiple
            value={form.features}
            onChange={(vals) => setForm({ ...form, features: vals })}
          >
            <Group>
              {featureOptions.map((f) => (
                <Chip
                  key={f.value}
                  value={f.value}
                  variant="outline"
                  radius="md"
                  checked={form.features.includes(f.value)}
                  styles={{
                    label: { display: "flex", alignItems: "center", gap: 8 },
                  }}
                >
                  {f.icon}
                  {f.label}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Stack>
      )}

      {step === 3 && (
        <Stack>
          <Title order={4}>تفاصيل المشروع</Title>
          <Group grow>
            <TextInput
              label="مدة التنفيذ"
              placeholder="مثال: ٣ أسابيع"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.currentTarget.value })}
            />
            <NumberInput
              label="الميزانية (جنيه سوداني)"
              placeholder="5000"
              value={form.budget}
              onChange={(val) => setForm({ ...form, budget: val || "" })}
            />
          </Group>
          <Textarea
            label="وصف مختصر"
            placeholder="اشرح باختصار المطلوب"
            minRows={3}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.currentTarget.value })}
          />
        </Stack>
      )}

      {step === 4 && (
        <Stack>
          <Title order={4}>بيانات العميل</Title>
          <TextInput
            label="الاسم"
            placeholder="اكتب اسمك"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
          />
          <TextInput
            label="البريد الإلكتروني"
            placeholder="example@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
          />
          <TextInput
            label="رقم الهاتف"
            placeholder="05xxxxxxxx"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.currentTarget.value })}
          />
        </Stack>
      )}

      <Group justify="space-between" mt="md">
        <Button variant="default" onClick={prev} disabled={step === 1}>
          رجوع
        </Button>
        {step < 4 ? (
          <Button color="teal" onClick={next}>
            التالي
          </Button>
        ) : (
          <Tooltip label="إطلاق المشروع ومعاينة الملخص النهائي" withArrow>
            <Button color="teal" leftSection={<FaRocket />} onClick={onLaunch}>
              Launch Project
            </Button>
          </Tooltip>
        )}
      </Group>
    </Stack>
  );
}

/* Showcase Section */
function Showcase() {
  return (
    <Stack gap="md">
      <Title order={3}>أمثلة من أعمال مشابهة</Title>
      <Grid>
        {showcaseProjects.map((p) => (
          <Grid.Col key={p.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder shadow="sm" p="md">
              <Card.Section>
                <div
                  style={{
                    width: "100%",
                    height: 140,
                    background: "linear-gradient(135deg,#0ea5e9,#14b8a6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {p.title}
                </div>
              </Card.Section>
              <Stack gap="xs" mt="sm">
                <Text c="dimmed">{p.description}</Text>
                <Group gap="xs">
                  {p.tech.map((t) => (
                    <Badge key={t} color="blue" variant="light">
                      {t}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

/* FAQ Section */
function FAQ() {
  return (
    <Stack>
      <Title order={3}>أسئلة شائعة</Title>
      <Accordion variant="separated" radius="md">
        <Accordion.Item value="time">
          <Accordion.Control>كم يستغرق بناء الموقع؟</Accordion.Control>
          <Accordion.Panel>
            يعتمد على نوع الموقع والمميزات المختارة. عادةً من أسبوعين إلى 6 أسابيع للمشاريع المتوسطة.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="edits">
          <Accordion.Control>هل أقدر أطلب تعديلات؟</Accordion.Control>
          <Accordion.Panel>
            نعم، هناك جولات مراجعة متفق عليها ضمن العقد لضمان الوصول للشكل المطلوب.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="tech">
          <Accordion.Control>ما التقنيات المستخدمة؟</Accordion.Control>
          <Accordion.Panel>
            عادةً: Next.js، Mantine، تكامل الدفع (Stripe)، دعم متعدد اللغات، وأفضل ممارسات SEO والأداء.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}

/* الصفحة الرئيسية */
export default function ProgrammingPage() {
  const [started, setStarted] = useState(false);
  const [launchOpen, setLaunchOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    type: "",
    features: [],
    duration: "",
    budget: "",
    note: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleLaunch = () => setLaunchOpen(true);

  return (
    <div style={{ background: "#ffffff", color: "#1e293b", minHeight: "100vh" }}>
      <div className="container mx-auto" style={{ maxWidth: 1200, padding: "24px" }}>
        <HeroSection onStart={() => setStarted(true)} />

        <Grid gutter="xl" mt="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card withBorder shadow="md" p="lg">
              {!started ? (
                <Stack align="center" gap="md">
                  <FaCode size={28} color="#14b8a6" />
                  <Text c="dimmed">اضغط "ابدأ مشروعك الآن" للانطلاق في الخطوات التفاعلية</Text>
                </Stack>
              ) : (
                <Builder form={form} setForm={setForm} onLaunch={handleLaunch} step={step} setStep={setStep} />
              )}
            </Card>

            <Card withBorder shadow="sm" p="lg" mt="xl">
              <Showcase />
            </Card>

            <Card withBorder shadow="sm" p="lg" mt="xl">
              <FAQ />
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <LivePreview form={form} step={step} />
          </Grid.Col>
        </Grid>
      </div>

      {/* Launch Modal */}
      <Modal
        opened={launchOpen}
        onClose={() => setLaunchOpen(false)}
        title="🚀 إطلاق مشروعك"
        radius="md"
      >
        <Stack gap="sm">
          <Text>
            مبروك! هذه نسخة ملخصة قابلة للمشاركة من مشروعك. سنراجع التفاصيل ونتواصل معك لإتمام الاتفاق.
          </Text>
          <Card withBorder p="md">
            <pre style={{ margin: 0, color: "#1e293b", fontFamily: "inherit" }}>
{JSON.stringify(form, null, 2)}
            </pre>
          </Card>
          <Group justify="space-between" mt="md">
                   <Button variant="default" onClick={() => setLaunchOpen(false)}>
              إغلاق
            </Button>
            <Button
              color="teal"
              leftSection={<FaCheckCircle />}
              onClick={() => setLaunchOpen(false)}
            >
              تأكيد وإرسال
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

