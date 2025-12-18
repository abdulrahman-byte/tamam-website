

"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  Button,
  Title,
  Text,
  Stack,
  Group,
  Grid,
  Chip,
  Slider,
  Textarea,
  TextInput,
  Modal,
  Badge,
  Divider,
  Checkbox,
  Alert,
} from "@mantine/core";
import {
  FaVideo,
  FaFilm,
  FaYoutube,
  FaInstagram,
  FaMagic,
  FaMusic,
  FaPalette,
  FaClosedCaptioning,
  FaRocket,
  FaDollarSign,
  FaRegClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUpload,
  FaCheckCircle,
} from "react-icons/fa";

/* أنواع الفيديو */
const videoTypes = [
  { value: "ad", label: "إعلان", icon: <FaFilm /> },
  { value: "youtube", label: "يوتيوب", icon: <FaYoutube /> },
  { value: "social", label: "سوشيال ميديا", icon: <FaInstagram /> },
  { value: "documentary", label: "توثيقي", icon: <FaVideo /> },
];

/* المميزات */
const featureOptions = [
  { value: "effects", label: "مؤثرات بصرية", icon: <FaMagic /> },
  { value: "color", label: "تصحيح ألوان", icon: <FaPalette /> },
  { value: "music", label: "موسيقى مرخصة", icon: <FaMusic /> },
  { value: "subtitles", label: "ترجمة وكتابة نصوص", icon: <FaClosedCaptioning /> },
];

/* حساب السعر والمدة */
function useQuote(type, length, features) {
  return useMemo(() => {
    let price = 500;
    let days = 2;

    switch (type) {
      case "ad":
        price += 1000;
        days += 2;
        break;
      case "youtube":
        price += 700;
        days += 1;
        break;
      case "social":
        price += 500;
        days += 1;
        break;
      case "documentary":
        price += 1500;
        days += 3;
        break;
      default:
        break;
    }

    if (features.includes("effects")) { price += 800; days += 1; }
    if (features.includes("color")) { price += 400; }
    if (features.includes("music")) { price += 300; }
    if (features.includes("subtitles")) { price += 500; days += 1; }

    if (length > 0) {
      price += length * 200;
      days += Math.ceil(length / 5);
    }

    return { price, days };
  }, [type, length, features]);
}

/* بطاقة اختيار نوع الفيديو */
function VideoTypeCard({ value, label, icon, selected, onSelect }) {
  return (
    <Card
      withBorder
      shadow={selected ? "md" : "sm"}
      radius="md"
      p="md"
      style={{
        cursor: "pointer",
        borderColor: selected ? "#14b8a6" : undefined,
      }}
      onClick={() => onSelect(value)}
    >
      <Group>
        {icon}
        <Text fw={600}>{label}</Text>
      </Group>
    </Card>
  );
}

/* الصفحة */
export default function Montage() {
  const [type, setType] = useState("");
  const [length, setLength] = useState(5);
  const [features, setFeatures] = useState([]);
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submittedOpen, setSubmittedOpen] = useState(false);

  const { price, days } = useQuote(type, length, features);

  const previewTitle = useMemo(() => {
    const t = videoTypes.find((v) => v.value === type)?.label;
    return t ? `فيديو ${t}` : "—";
  }, [type]);

  const validate = () => {
    const errs = {};
    if (!type) errs.type = "اختر نوع الفيديو";
    if (length <= 0) errs.length = "حدّد مدة الفيديو";
    if (!name.trim()) errs.name = "الاسم مطلوب";
    if (!email.trim() || !email.includes("@")) errs.email = "بريد إلكتروني صالح مطلوب";
    if (!phone.trim()) errs.phone = "رقم الهاتف مطلوب";
    if (!agree) errs.agree = "يجب الموافقة على الشروط";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmittedOpen(true);
  };

  return (
    <div style={{ background: "#fff", color: "#1e293b", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "80px 20px", background: "#0f172a", color: "#fff" }}>
        <Title order={1} mb="sm">خدمة مونتاج احترافي للفيديو</Title>
        <Text c="dimmed" style={{ color: "#cbd5e1" }}>
          من القصّ والألوان إلى المؤثرات والترجمة — نجهز لك فيديو يليق بعلامتك
        </Text>
        <Group justify="center" mt="lg">
          <Button size="md" color="teal" leftSection={<FaRocket />}>
            ابدأ الآن
          </Button>
        </Group>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <Grid gutter="xl">
          {/* يسار */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="md">
              <Title order={3}>إعدادات مشروعك</Title>

              {/* نوع الفيديو */}
              <Card withBorder shadow="sm" p="md">
                <Group justify="space-between" mb="sm">
                  <Text fw={600}>اختر نوع الفيديو</Text>
                  {errors.type && <Badge color="red">{errors.type}</Badge>}
                </Group>
                <Grid>
                  {videoTypes.map((v) => (
                    <Grid.Col key={v.value} span={{ base: 12, sm: 6 }}>
                      <VideoTypeCard
                        value={v.value}
                        label={v.label}
                        icon={v.icon}
                        selected={type === v.value}
                        onSelect={setType}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              </Card>

              {/* المميزات */}
              <Card withBorder shadow="sm" p="md">
                <Text fw={600} mb="sm">المميزات الإضافية</Text>
                <Chip.Group multiple value={features} onChange={setFeatures}>
                  <Group>
                    {featureOptions.map((f) => (
                      <Chip key={f.value} value={f.value} radius="md" variant="outline">
                        <Group gap="xs">
                          {f.icon}
                          <span>{f.label}</span>
                        </Group>
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </Card>

              {/* مدة الفيديو */}
              <Card withBorder shadow="sm" p="md">
                <Group justify="space-between" mb="sm">
                  <Text fw={600}>مدة الفيديو (بالدقائق)</Text>
                  {errors.length && <Badge color="red">{errors.length}</Badge>}
                </Group>
                <Group align="center" gap="md">
                  <Text fw={600}>{length} دقيقة</Text>
                  <Slider min={1} max={30} step={1} value={length} onChange={setLength} style={{ flex: 1 }} />
                </Group>
              </Card>

              {/* ملاحظات */}
              <Card withBorder shadow="sm" p="md">
                <Text fw={600} mb="sm">ملاحظات خاصة</Text>
                <Textarea
                  placeholder="اكتب أي تفاصيل أو مراجع تريدها"
                  minRows={3}
                  value={note}
                  onChange={(e) => setNote(e.currentTarget.value)}
                />
              </Card>

              {/* بيانات العميل */}
              <Card withBorder shadow="sm" p="md">
                <Text fw={600} mb="sm">بيانات التواصل</Text>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="الاسم"
                      placeholder="اكتب اسمك"
                                            value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      error={errors.name}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="البريد الإلكتروني"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      error={errors.email}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="رقم الهاتف"
                      placeholder="05xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.currentTarget.value)}
                      error={errors.phone}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <div>
                      <Text fw={600} mb="xs">رفع ملف خام (اختياري)</Text>
                      <Button
                        variant="outline"
                        leftSection={<FaUpload />}
                        component="label"
                      >
                        اختر ملف
                        <input
                          type="file"
                          hidden
                          onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
                        />
                      </Button>
                      {file && (
                        <Text size="sm" c="dimmed" mt="xs">
                          تم اختيار: {file.name}
                        </Text>
                      )}
                    </div>
                  </Grid.Col>
                </Grid>

                <Group mt="md">
                  <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(e.currentTarget.checked)}
                    label="أوافق على شروط الخدمة"
                  />
                  {errors.agree && <Badge color="red">{errors.agree}</Badge>}
                </Group>

                {Object.keys(errors).length > 0 && (
                  <Alert color="red" mt="md" title="تحقق من الحقول">
                    يرجى تصحيح الأخطاء الموضحة قبل الإرسال.
                  </Alert>
                )}

                <Group justify="space-between" mt="lg">
                  <Text c="dimmed" size="sm">
                    سيتم مراجعة تفاصيلك والتواصل معك فورًا لتأكيد الطلب.
                  </Text>
                  <Button
                    color="teal"
                    leftSection={<FaCheckCircle />}
                    onClick={handleSubmit}
                  >
                    إرسال الطلب
                  </Button>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>

          {/* يمين: المعاينة والسعر */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="md">
              <Title order={3}>المعاينة الحيّة</Title>

              <Card withBorder shadow="sm" p="md">
                <Group justify="space-between" mb="sm">
                  <Text fw={600}>ملخص سريع</Text>
                  <Badge color="teal" variant="light">يتحدث لحظيًا</Badge>
                </Group>
                <Stack gap="xs">
                  <Group gap="xs">
                    <FaVideo />
                    <Text>نوع الفيديو: {previewTitle}</Text>
                  </Group>
                  <Group gap="xs">
                    <FaRegClock />
                    <Text>المدة: {length} دقيقة</Text>
                  </Group>
                  <Group gap="xs">
                    <Text fw={600}>المميزات:</Text>
                    <Group gap="xs">
                      {features.length === 0 && <Badge variant="light">بدون</Badge>}
                      {featureOptions
                        .filter((f) => features.includes(f.value))
                        .map((f) => (
                          <Badge key={f.value} variant="light">
                            <Group gap="xs">{f.icon}<span>{f.label}</span></Group>
                          </Badge>
                        ))}
                    </Group>
                  </Group>
                  <Divider my="sm" />
                  <Group gap="xs">
                    <FaDollarSign />
                    <Text fw={700}>السعر التقديري: {price} ريال</Text>
                  </Group>
                  <Group gap="xs">
                    <FaRegClock />
                    <Text fw={700}>المدة التقديرية: {days} يوم</Text>
                  </Group>
                </Stack>
              </Card>

              <Card withBorder shadow="sm" p="md">
                <Text fw={600} mb="xs">تفاصيل إضافية</Text>
                <Stack gap="xs">
                  <Text c="dimmed">ملاحظاتك: {note || "—"}</Text>
                  <Text c="dimmed">اسم العميل: {name || "—"}</Text>
                  <Text c="dimmed">البريد: {email || "—"}</Text>
                  <Text c="dimmed">الهاتف: {phone || "—"}</Text>
                  <Text c="dimmed">ملف مرفوع: {file?.name || "—"}</Text>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </div>

      {/* Modal تأكيد */}
      <Modal
        opened={submittedOpen}
        onClose={() => setSubmittedOpen(false)}
        title="تم استلام طلبك"
        radius="md"
      >
        <Stack>
          <Text>
            شكرًا لك! تم استلام طلب خدمة المونتاج. سنراجع التفاصيل ونتواصل معك للتأكيد.
          </Text>
          <Card withBorder p="md">
            <Stack gap="xs">
              <Text fw={600}>ملخص الطلب</Text>
              <Text>نوع الفيديو: {previewTitle}</Text>
              <Text>المدة: {length} دقيقة</Text>
              <Text>
                المميزات:{" "}
                {features.length
                  ? featureOptions
                      .filter((f) => features.includes(f.value))
                      .map((f) => f.label)
                      .join(", ")
                  : "—"}
              </Text>
              <Text>السعر التقديري: {price} ريال</Text>
              <Text>المدة التقديرية: {days} يوم</Text>
              <Divider my="sm" />
              <Text>الاسم: {name}</Text>
              <Text>البريد: {email}</Text>
              <Text>الهاتف: {phone}</Text>
              <Text>ملاحظات: {note || "—"}</Text>
              <Text>ملف: {file?.name || "—"}</Text>
            </Stack>
          </Card>
          <Group justify="flex-end">
            <Button onClick={() => setSubmittedOpen(false)} variant="default">
              إغلاق
            </Button>
            <Button color="teal" leftSection={<FaCheckCircle />}>
              تأكيد
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
