"use client";
import React, { useState, useMemo } from "react";
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
  SimpleGrid,
  Container,
  Select,
  Textarea,
  Radio,
} from "@mantine/core";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaStore,
  FaGlobe,
  FaShippingFast,
  FaCreditCard,
  FaShieldAlt,
  FaBullhorn,
  FaHeadset,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEdit,
  FaPaperPlane,
  FaInfoCircle,
  FaBuilding,
  FaTag,
  FaBox,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaRegClock,
  FaBoxes,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const JoinAsMerchant = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [formData, setFormData] = useState({
    // بيانات أساسية
    name: "",
    email: "",
    phone: "",
    socialPlatform: "",
    socialValue: "",

    // بيانات الشركة والمتجر
    companyName: "",
    businessType: "",
    businessOther: "",
    foundedYear: "",
    employeesCount: "",

    // الموقع والعملة
    location: "",
    locationOther: "",
    sudanState: "",
    city: "",
    addressLine: "",
    postalCode: "",
    currency: "",
    currencyOther: "",

    // المتجر والقنوات
    hasPhysicalStore: "",
    storeLink: "",
    websiteLink: "",
    instagramLink: "",
    facebookLink: "",
    twitterLink: "",
    tiktokLink: "",
    whatsappNumber: "",

    // المنتجات والتصنيفات
    productType: "",
    productOther: "",
    categoriesCount: "",
    totalProducts: "",
    brandList: "",
    hasPrivateLabel: "",
    privateLabelName: "",
    cheapestProduct: "",
    mostExpensiveProduct: "",
    averagePrice: "",
    priceNotes: "",

    // المنشأ والحالة
    productOrigin: "",
    productOriginOther: "",
    productCondition: "",
    stockAvailability: "",
    restockFrequency: "",

    // السياسات
    returnPolicy: "",
    returnPolicyOther: "",
    warranty: "",
    warrantyDuration: "",
    warrantyNotes: "",

    // التوصيل
    deliveryService: "",
    deliveryAreas: "",
    deliveryFeePolicy: "",
    deliveryFeeOther: "",
    deliveryTimeAvg: "",
    pickupOption: "",

    // الدفع
    paymentMethods: "",
    paymentOther: "",
    supportsInstallments: "",
    installmentProvider: "",

    // العروض والتسويق
    seasonalOffers: "",
    discountRange: "",
    promoChannels: "",
    promoOther: "",

    // الأهداف والخطط
    goals: "",
    futurePlans: "",
    upcomingProducts: "",

    // الامتثال القانوني
    hasCommercialRegistration: "",
    commercialRegistrationNumber: "",
    taxNumber: "",
    compliesWithLocalLaws: "",
    notesCompliance: "",

    // الدعم وخدمات ما بعد البيع
    supportChannels: "",
    supportOther: "",
    avgResponseTime: "",
    afterSalesServices: "",
    afterSalesOther: "",

    // الرسائل العامة
    message: "",
  });

  const currencyByCountry = useMemo(
    () => ({
      saudi: "ريال سعودي",
      egypt: "جنيه مصري",
      sudan: "جنيه سوداني",
      uae: "درهم إماراتي",
      qatar: "ريال قطري",
    }),
    []
  );

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
      setPhoneError(
        "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 00 و يتكون من أرقام انجليزية فقط"
      );
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // تحديد العملة تلقائيًا عند اختيار الدولة
    if (name === "location") {
      const autoCurrency = currencyByCountry[value] || "";
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        currency: autoCurrency,
        sudanState: value === "sudan" ? prev.sudanState : "",
      }));
      return;
    }

    // منطق "أخرى" لبعض الحقول
    const otherFields = [
      "businessType",
      "productType",
      "productOrigin",
      "paymentMethods",
      "returnPolicy",
      "deliveryFeePolicy",
      "promoChannels",
      "supportChannels",
    ];

    if (otherFields.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        [`${name}Other`]: value === "other" ? prev[`${name}Other`] : "",
      }));
      return;
    }

    // معالجة الحقول الشرطية
    const conditionalFields = {
      deliveryService: "deliveryAreas",
      supportsInstallments: "installmentProvider",
      warranty: "warrantyDuration",
      hasPrivateLabel: "privateLabelName",
      compliesWithLocalLaws: "notesCompliance",
    };

    if (conditionalFields[name]) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        [conditionalFields[name]]:
          value === "yes" || value === "no"
            ? prev[conditionalFields[name]]
            : "",
      }));
      return;
    }

    // التحقق الفوري للحقول الأساسية
    if (name === "name") validateName(value);
    if (name === "email") validateEmail(value);
    if (name === "phone") validatePhone(value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

    try {
      await emailjs.sendForm(
        "service_9yhrhwd",
        "template_99e82tp",
        document.querySelector("form"),
        "ZxLtSLDcogh2r5j2i"
      );
      setShowModal(true);
    } catch (err) {
      console.error("Error:", err);
      setError("حدث خطأ أثناء إرسال البيانات، الرجاء المحاولة لاحقاً.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      socialPlatform: "",
      socialValue: "",
      companyName: "",
      businessType: "",
      businessOther: "",
      foundedYear: "",
      employeesCount: "",
      location: "",
      locationOther: "",
      sudanState: "",
      city: "",
      addressLine: "",
      postalCode: "",
      currency: "",
      currencyOther: "",
      hasPhysicalStore: "",
      storeLink: "",
      websiteLink: "",
      instagramLink: "",
      facebookLink: "",
      twitterLink: "",
      tiktokLink: "",
      whatsappNumber: "",
      productType: "",
      productOther: "",
      categoriesCount: "",
      totalProducts: "",
      brandList: "",
      hasPrivateLabel: "",
      privateLabelName: "",
      cheapestProduct: "",
      mostExpensiveProduct: "",
      averagePrice: "",
      priceNotes: "",
      productOrigin: "",
      productOriginOther: "",
      productCondition: "",
      stockAvailability: "",
      restockFrequency: "",
      returnPolicy: "",
      returnPolicyOther: "",
      warranty: "",
      warrantyDuration: "",
      warrantyNotes: "",
      deliveryService: "",
      deliveryAreas: "",
      deliveryFeePolicy: "",
      deliveryFeeOther: "",
      deliveryTimeAvg: "",
      pickupOption: "",
      paymentMethods: "",
      paymentOther: "",
      supportsInstallments: "",
      installmentProvider: "",
      seasonalOffers: "",
      discountRange: "",
      promoChannels: "",
      promoOther: "",
      goals: "",
      futurePlans: "",
      upcomingProducts: "",
      hasCommercialRegistration: "",
      commercialRegistrationNumber: "",
      taxNumber: "",
      compliesWithLocalLaws: "",
      notesCompliance: "",
      supportChannels: "",
      supportOther: "",
      avgResponseTime: "",
      afterSalesServices: "",
      afterSalesOther: "",
      message: "",
    });
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setError("");
  };

  const handleCloseSuccessModal = () => {
    setShowModal(false);
    resetForm();
  };

  // بيانات الاختيارات
  const socialPlatforms = [
    { value: "whatsapp", label: "واتساب" },
    { value: "instagram", label: "إنستجرام" },
    { value: "facebook", label: "فيسبوك" },
    { value: "twitter", label: "تويتر" },
    { value: "tiktok", label: "تيك توك" },
    { value: "linkedin", label: "لينكدإن" },
    { value: "other", label: "أخرى" },
  ];

  const businessTypes = [
    { value: "electronics", label: "إلكترونيات" },
    { value: "fashion", label: "ملابس" },
    { value: "food", label: "أغذية" },
    { value: "accessories", label: "إكسسوارات" },
    { value: "home", label: "أدوات منزلية" },
    { value: "appliances", label: "أجهزة كهربائية" },
    { value: "services", label: "خدمات" },
    { value: "other", label: "أخرى" },
  ];

  const countries = [
    { value: "sudan", label: "السودان" },
    { value: "egypt", label: "مصر" },
    { value: "saudi", label: "السعودية" },
    { value: "uae", label: "الإمارات" },
    { value: "qatar", label: "قطر" },
    { value: "other", label: "أخرى" },
  ];

  const productTypes = [
    { value: "menClothes", label: "ملابس رجالية" },
    { value: "womenClothes", label: "ملابس نسائية" },
    { value: "kidsClothes", label: "ملابس أطفال" },
    { value: "homeTools", label: "أدوات منزلية" },
    { value: "electronics", label: "إلكترونيات" },
    { value: "appliances", label: "أجهزة كهربائية" },
    { value: "food", label: "أغذية" },
    { value: "stationery", label: "أدوات مكتبية" },
    { value: "accessories", label: "إكسسوارات" },
    { value: "services", label: "خدمات" },
    { value: "other", label: "أخرى" },
  ];

  const productOrigins = [
    { value: "local", label: "محلية" },
    { value: "imported", label: "مستوردة" },
    { value: "mixed", label: "مختلطة" },
    { value: "other", label: "أخرى" },
  ];

  const paymentOptions = [
    { value: "cash", label: "كاش" },
    { value: "visa", label: "فيزا" },
    { value: "mastercard", label: "ماستر كارد" },
    { value: "applepay", label: "Apple Pay" },
    { value: "paypal", label: "PayPal" },
    { value: "other", label: "أخرى" },
  ];

  if (formData.location === "sudan") {
    paymentOptions.unshift(
      { value: "bankak", label: "بنكك" },
      { value: "fawry", label: "فوري" }
    );
  }
  if (formData.location === "saudi") {
    paymentOptions.unshift({ value: "mada", label: "مدى" });
  }

  return (
    <Container size="lg" className="py-8 md:py-12 px-4">
      {/* العنوان والشعار */}
      <Box className="flex flex-col items-center text-center mb-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          انضم كتاجر إلى منصتنا
        </div>
        <Text className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
          شارك متجرك مع آلاف العملاء ووسع نطاق عملك مع خدماتنا المتكاملة
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" className="mb-8">
        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaStore className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">
              متجرك الخاص
            </Text>
            <Text size="sm" className="text-gray-600">
              أنشئ متجرك الإلكتروني بسهولة
            </Text>
          </Stack>
        </Paper>

        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaBoxes className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">
              إدارة مخزون ذكية
            </Text>
            <Text size="sm" className="text-gray-600">
              {" "}
              نظام متقدم لإدارة المخزون والمبيعات تلقائياً
            </Text>
          </Stack>
        </Paper>

        <Paper withBorder p="lg" radius="lg" className="bg-blue-50">
          <Stack align="center" className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <FaChartLine className="text-blue-600 text-2xl" />
            </div>
            <Text fw={600} size="lg" className="text-gray-800">
              تحليلات متقدمة
            </Text>
            <Text size="sm" className="text-gray-600">
              تقارير مفصلة عن أداء متجرك
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

        <form onSubmit={handleSubmit}>
          <Stack gap="xl">
            {/* القسم 1: البيانات الأساسية */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaUser className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    البيانات الأساسية
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    أدخل بيانات التواصل الأساسية
                  </Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput
                  label="الاسم الكامل"
                  placeholder="أدخل اسمك الكامل"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => validateName(formData.name)}
                  required
                  size="md"
                  radius="md"
                  error={nameError}
                  icon={<FaUser size={16} />}
                />

                <TextInput
                  label="البريد الإلكتروني"
                  placeholder="example@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => validateEmail(formData.email)}
                  required
                  size="md"
                  radius="md"
                  error={emailError}
                  icon={<FaEnvelope size={16} />}
                />

                <TextInput
                  label="رقم الهاتف"
                  placeholder="00xxxxxxxxxxx"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => validatePhone(formData.phone)}
                  required
                  size="md"
                  radius="md"
                  maxLength={15}
                  error={phoneError}
                  icon={<FaPhone size={16} />}
                />

                <Select
                  label="منصة التواصل المفضلة"
                  placeholder="اختر منصة التواصل"
                  name="socialPlatform"
                  value={formData.socialPlatform}
                  onChange={(value) =>
                    handleChange({ target: { name: "socialPlatform", value } })
                  }
                  data={socialPlatforms}
                  size="md"
                  radius="md"
                  required
                />
              </SimpleGrid>

              {formData.socialPlatform && (
                <Box className="mt-4">
                  <TextInput
                    label="الرابط أو الرقم"
                    placeholder={`أدخل ${
                      formData.socialPlatform === "whatsapp"
                        ? "رقم الواتساب"
                        : "رابط المنصة"
                    }`}
                    name="socialValue"
                    value={formData.socialValue}
                    onChange={handleChange}
                    required
                    size="md"
                    radius="md"
                  />
                </Box>
              )}
            </Box>

            {/* القسم 2: بيانات الشركة */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaBuilding className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    بيانات الشركة / المتجر
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    معلومات عن نشاطك التجاري
                  </Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput
                  label="اسم الشركة / المتجر"
                  placeholder="أدخل اسم الشركة أو المتجر"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  size="md"
                  radius="md"
                />

                <Select
                  label="نوع النشاط التجاري"
                  placeholder="اختر نوع النشاط"
                  name="businessType"
                  value={formData.businessType}
                  onChange={(value) =>
                    handleChange({ target: { name: "businessType", value } })
                  }
                  data={businessTypes}
                  size="md"
                  radius="md"
                  required
                />

                <TextInput
                  label="سنة التأسيس"
                  placeholder="مثال: 2018"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />

                <TextInput
                  label="عدد الموظفين"
                  placeholder="مثال: 5-10"
                  name="employeesCount"
                  value={formData.employeesCount}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />
              </SimpleGrid>

              {formData.businessType === "other" && (
                <Box className="mt-4">
                  <TextInput
                    label="اكتب نوع النشاط"
                    placeholder="اكتب نوع النشاط التجاري"
                    name="businessOther"
                    value={formData.businessOther}
                    onChange={handleChange}
                    size="md"
                    radius="md"
                  />
                </Box>
              )}
            </Box>

            {/* القسم 3: الموقع والعملة */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    الموقع والعملة
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    معلومات الموقع والعملة المستخدمة
                  </Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Select
                  label="الدولة"
                  placeholder="اختر الدولة"
                  name="location"
                  value={formData.location}
                  onChange={(value) =>
                    handleChange({ target: { name: "location", value } })
                  }
                  data={countries}
                  size="md"
                  radius="md"
                  required
                />

                {formData.location === "other" && (
                  <TextInput
                    label="اكتب الدولة"
                    placeholder="اكتب اسم الدولة"
                    name="locationOther"
                    value={formData.locationOther}
                    onChange={handleChange}
                    size="md"
                    radius="md"
                  />
                )}

                {formData.location === "sudan" && (
                  <TextInput
                    label="اسم الولاية"
                    placeholder="أدخل اسم الولاية"
                    name="sudanState"
                    value={formData.sudanState}
                    onChange={handleChange}
                    size="md"
                    radius="md"
                  />
                )}

                <TextInput
                  label="المدينة"
                  placeholder="أدخل اسم المدينة"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />

                <TextInput
                  label="العنوان"
                  placeholder="اسم الشارع، المبنى، الطابق..."
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />

                <TextInput
                  label="الرمز البريدي"
                  placeholder="أدخل الرمز البريدي"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />

                <Box>
                  <TextInput
                    label="العملة"
                    placeholder="العملة المستخدمة"
                    name="currency"
                    value={formData.currency}
                    readOnly={formData.location !== "other"}
                    onChange={
                      formData.location === "other" ? handleChange : undefined
                    }
                    size="md"
                    radius="md"
                  />
                  {formData.location === "other" && (
                    <Text size="sm" className="text-gray-500 mt-1">
                      اكتب العملة المستخدمة في بلدك
                    </Text>
                  )}
                </Box>
              </SimpleGrid>
            </Box>

            {/* القسم 4: المنتجات والتصنيفات */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaBox className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    المنتجات والتصنيفات
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    معلومات عن منتجاتك وتصنيفاتها
                  </Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Select
                  label="نوع المنتجات الرئيسية"
                  placeholder="اختر نوع المنتجات"
                  name="productType"
                  value={formData.productType}
                  onChange={(value) =>
                    handleChange({ target: { name: "productType", value } })
                  }
                  data={productTypes}
                  size="md"
                  radius="md"
                  required
                />

                <TextInput
                  label="عدد الفئات"
                  placeholder="مثال: 8 فئات"
                  name="categoriesCount"
                  value={formData.categoriesCount}
                  onChange={handleChange}
                  required
                  size="md"
                  radius="md"
                />

                <TextInput
                  label="عدد المنتجات الكلي"
                  placeholder="مثال: 250 منتج"
                  name="totalProducts"
                  value={formData.totalProducts}
                  onChange={handleChange}
                  required
                  size="md"
                  radius="md"
                />

                <Box>
                  <label className="block mb-2 text-sm font-semibold text-primary">
                    هل لديك علامة خاصة (Private Label)؟
                  </label>
                  <Radio.Group
                    name="hasPrivateLabel"
                    value={formData.hasPrivateLabel}
                    onChange={(value) =>
                      handleChange({
                        target: { name: "hasPrivateLabel", value },
                      })
                    }
                  >
                    <Group>
                      <Radio value="yes" label="نعم" />
                      <Radio value="no" label="لا" />
                    </Group>
                  </Radio.Group>
                </Box>
              </SimpleGrid>

              {formData.productType === "other" && (
                <Box className="mt-4">
                  <TextInput
                    label="اكتب نوع المنتجات"
                    placeholder="اكتب نوع المنتجات"
                    name="productOther"
                    value={formData.productOther}
                    onChange={handleChange}
                    size="md"
                    radius="md"
                  />
                </Box>
              )}

              {formData.hasPrivateLabel === "yes" && (
                <Box className="mt-4">
                  <TextInput
                    label="اسم العلامة الخاصة"
                    placeholder="أدخل اسم العلامة الخاصة"
                    name="privateLabelName"
                    value={formData.privateLabelName}
                    onChange={handleChange}
                    size="md"
                    radius="md"
                  />
                </Box>
              )}

              <Box className="mt-4">
                <Textarea
                  label="أسماء العلامات التجارية"
                  placeholder="اكتب العلامات التجارية الأساسية التي تتعامل معها"
                  name="brandList"
                  value={formData.brandList}
                  onChange={handleChange}
                  autosize
                  minRows={3}
                  size="md"
                  radius="md"
                />
              </Box>
            </Box>

            {/* القسم 5: الأسعار */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaMoneyBill className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    معلومات الأسعار
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    نطاق أسعار منتجاتك
                  </Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <TextInput
                  label="سعر أرخص منتج"
                  placeholder="مثال: 25 ريال"
                  name="cheapestProduct"
                  value={formData.cheapestProduct}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />

                <TextInput
                  label="سعر أغلى منتج"
                  placeholder="مثال: 1200 ريال"
                  name="mostExpensiveProduct"
                  value={formData.mostExpensiveProduct}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />

                <TextInput
                  label="متوسط الأسعار"
                  placeholder="مثال: 180 ريال"
                  name="averagePrice"
                  value={formData.averagePrice}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />
              </SimpleGrid>

              <Box className="mt-4">
                <Textarea
                  label="ملاحظات حول التسعير"
                  placeholder="سياسة التسعير، مواسم التخفيضات، فروقات حسب المناطق..."
                  name="priceNotes"
                  value={formData.priceNotes}
                  onChange={handleChange}
                  autosize
                  minRows={3}
                  size="md"
                  radius="md"
                />
              </Box>
            </Box>

            {/* القسم 6: المنشأ والحالة */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaGlobe className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    المنشأ والحالة
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    معلومات عن منشأ وحالة منتجاتك
                  </Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Select
                  label="منشأ المنتجات"
                  placeholder="اختر منشأ المنتجات"
                  name="productOrigin"
                  value={formData.productOrigin}
                  onChange={(value) =>
                    handleChange({ target: { name: "productOrigin", value } })
                  }
                  data={productOrigins}
                  size="md"
                  radius="md"
                  required
                />

                <Box>
                  <label className="block mb-2 text-sm font-semibold text-primary">
                    حالة المنتجات
                  </label>
                  <Radio.Group
                    name="productCondition"
                    value={formData.productCondition}
                    onChange={(value) =>
                      handleChange({
                        target: { name: "productCondition", value },
                      })
                    }
                  >
                    <Group>
                      <Radio value="new" label="جديدة" />
                      <Radio value="used" label="مستعملة" />
                      <Radio value="mixed" label="مختلطة" />
                    </Group>
                  </Radio.Group>
                </Box>

                <TextInput
                  label="توفر المخزون"
                  placeholder="مثال: متوفر دائمًا / حسب الطلب"
                  name="stockAvailability"
                  value={formData.stockAvailability}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />

                <TextInput
                  label="تكرار إعادة التخزين"
                  placeholder="أسبوعي، شهري..."
                  name="restockFrequency"
                  value={formData.restockFrequency}
                  onChange={handleChange}
                  size="md"
                  radius="md"
                />
              </SimpleGrid>

              {formData.productOrigin === "other" && (
                <Box className="mt-4">
                  <TextInput
                    label="اكتب تفاصيل المنشأ"
                    placeholder="اكتب تفاصيل منشأ المنتجات"
                    name="productOriginOther"
                    value={formData.productOriginOther}
                    onChange={handleChange}
                    size="md"
                    radius="md"
                  />
                </Box>
              )}
            </Box>

            {/* القسم 7: الدفع والتوصيل */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaShippingFast className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    الدفع والتوصيل
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    طرق الدفع وخدمات التوصيل
                  </Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Box>
                  <label className="block mb-2 text-sm font-semibold text-primary">
                    هل تقدم خدمة التوصيل؟
                  </label>
                  <Radio.Group
                    name="deliveryService"
                    value={formData.deliveryService}
                    onChange={(value) =>
                      handleChange({
                        target: { name: "deliveryService", value },
                      })
                    }
                  >
                    <Group>
                      <Radio value="yes" label="نعم" />
                      <Radio value="no" label="لا" />
                    </Group>
                  </Radio.Group>

                  {formData.deliveryService === "yes" && (
                    <Stack gap="md" className="mt-4">
                      <Textarea
                        label="مناطق التوصيل المتاحة"
                        placeholder="مثال: الرياض، جدة، الدمام"
                        name="deliveryAreas"
                        value={formData.deliveryAreas}
                        onChange={handleChange}
                        autosize
                        minRows={2}
                        size="md"
                        radius="md"
                      />

                      <Select
                        label="سياسة رسوم التوصيل"
                        placeholder="اختر سياسة الرسوم"
                        name="deliveryFeePolicy"
                        value={formData.deliveryFeePolicy}
                        onChange={(value) =>
                          handleChange({
                            target: { name: "deliveryFeePolicy", value },
                          })
                        }
                        data={[
                          { value: "free", label: "مجاني" },
                          { value: "fixed", label: "رسوم ثابتة" },
                          { value: "distance", label: "حسب المسافة" },
                          { value: "other", label: "أخرى" },
                        ]}
                        size="md"
                        radius="md"
                      />

                      {formData.deliveryFeePolicy === "other" && (
                        <TextInput
                          label="اكتب سياسة الرسوم"
                          placeholder="اكتب سياسة رسوم التوصيل"
                          name="deliveryFeeOther"
                          value={formData.deliveryFeeOther}
                          onChange={handleChange}
                          size="md"
                          radius="md"
                        />
                      )}

                      <TextInput
                        label="متوسط زمن التوصيل"
                        placeholder="مثال: 1-3 أيام"
                        name="deliveryTimeAvg"
                        value={formData.deliveryTimeAvg}
                        onChange={handleChange}
                        size="md"
                        radius="md"
                      />
                    </Stack>
                  )}
                </Box>

                <Box>
                  <Select
                    label="طرق الدفع المتاحة"
                    placeholder="اختر طرق الدفع"
                    name="paymentMethods"
                    value={formData.paymentMethods}
                    onChange={(value) =>
                      handleChange({
                        target: { name: "paymentMethods", value },
                      })
                    }
                    data={paymentOptions}
                    size="md"
                    radius="md"
                  />

                  {formData.paymentMethods === "other" && (
                    <Box className="mt-4">
                      <TextInput
                        label="اكتب طريقة الدفع"
                        placeholder="اكتب طريقة الدفع الأخرى"
                        name="paymentOther"
                        value={formData.paymentOther}
                        onChange={handleChange}
                        size="md"
                        radius="md"
                      />
                    </Box>
                  )}

                  <Box className="mt-4">
                    <label className="block mb-2 text-sm font-semibold text-primary">
                      هل تدعم الأقساط؟
                    </label>
                    <Radio.Group
                      name="supportsInstallments"
                      value={formData.supportsInstallments}
                      onChange={(value) =>
                        handleChange({
                          target: { name: "supportsInstallments", value },
                        })
                      }
                    >
                      <Group>
                        <Radio value="yes" label="نعم" />
                        <Radio value="no" label="لا" />
                      </Group>
                    </Radio.Group>

                    {formData.supportsInstallments === "yes" && (
                      <Box className="mt-4">
                        <TextInput
                          label="مزود خدمة الأقساط"
                          placeholder="مثال: تابي، تمارا..."
                          name="installmentProvider"
                          value={formData.installmentProvider}
                          onChange={handleChange}
                          size="md"
                          radius="md"
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>

            {/* القسم 8: الرسائل العامة */}
            <Box>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaRegClock className="text-blue-600" />
                </div>
                <div>
                  <Text fw={600} size="lg" className="text-gray-800">
                    رسائل وأهداف إضافية
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    أهدافك وخططك المستقبلية
                  </Text>
                </div>
              </div>

              <Stack gap="md">
                <Textarea
                  label="أهدافك من الانضمام للمنصة"
                  placeholder="مثال: زيادة المبيعات، الوصول لعملاء جدد..."
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  autosize
                  minRows={3}
                  size="md"
                  radius="md"
                />

                <Textarea
                  label="خططك المستقبلية للتوسع"
                  placeholder="فتح فروع جديدة، إطلاق منتجات..."
                  name="futurePlans"
                  value={formData.futurePlans}
                  onChange={handleChange}
                  autosize
                  minRows={3}
                  size="md"
                  radius="md"
                />

                <Textarea
                  label="رسالة أو ملاحظات إضافية"
                  placeholder="أي تفاصيل إضافية تريد مشاركتها"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  autosize
                  minRows={3}
                  size="md"
                  radius="md"
                />
              </Stack>
            </Box>

            {/* أزرار الإرسال */}
            <Box className="text-center pt-4">
              <Button
                size="lg"
                color="blue"
                radius="md"
                type="submit"
                leftSection={<FaPaperPlane />}
                loading={loading}
                className="px-12 py-3 text-lg font-semibold mb-3"
              >
                إرسال طلب الانضمام
              </Button>

              <Text size="sm" className="text-gray-500 mt-5">
                سنتواصل معك خلال 24 ساعة لتأكيد طلب الانضمام وتفعيل متجرك
              </Text>
            </Box>
          </Stack>
        </form>
      </Card>

      {/* مزايا إضافية */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" className="mt-8">
        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaShieldAlt className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            حماية وأمان
          </Text>
          <Text size="sm" className="text-gray-600">
            نظام دفع آمن وحماية للبيانات
          </Text>
        </Card>

        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaHeadset className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            دعم فني متكامل
          </Text>
          <Text size="sm" className="text-gray-600">
            فريق دعم متاح على مدار الساعة
          </Text>
        </Card>

        <Card withBorder p="lg" radius="lg" className="text-center bg-blue-50">
          <FaBullhorn className="text-blue-600 text-2xl mx-auto mb-3" />
          <Text fw={600} size="lg" className="mb-2 text-gray-800">
            تسويق وتطوير
          </Text>
          <Text size="sm" className="text-gray-600">
            حملات تسويقية لزيادة مبيعاتك
          </Text>
        </Card>
      </SimpleGrid>

      {/* مودال التأكيد */}
      <Modal
        opened={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="تأكيد طلب الانضمام"
        size="lg"
        centered
        radius="lg"
      >
        <Stack gap="lg">
          <Alert
            color="blue"
            icon={<FaInfoCircle />}
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
                الهاتف
              </Text>
              <Text fw={500}>{formData.phone}</Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">
                اسم الشركة
              </Text>
              <Text fw={500}>{formData.companyName}</Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">
                الدولة
              </Text>
              <Text fw={500}>
                {formData.location === "other"
                  ? formData.locationOther
                  : countries.find((c) => c.value === formData.location)?.label}
              </Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Text fw={600} size="sm" className="text-gray-500 mb-1">
                نوع النشاط
              </Text>
              <Text fw={500}>
                {formData.businessType === "other"
                  ? formData.businessOther
                  : businessTypes.find((b) => b.value === formData.businessType)
                      ?.label}
              </Text>
            </Paper>
          </SimpleGrid>

          <Paper withBorder p="md" radius="md" className="bg-blue-50">
            <Stack gap="xs">
              <div>
                <Text fw={600} size="sm" className="text-gray-500">
                  نوع المنتجات
                </Text>
                <Text fw={500}>
                  {formData.productType === "other"
                    ? formData.productOther
                    : productTypes.find((p) => p.value === formData.productType)
                        ?.label}
                </Text>
              </div>
              <div>
                <Text fw={600} size="sm" className="text-gray-500">
                  عدد المنتجات
                </Text>
                <Text fw={500}>{formData.totalProducts}</Text>
              </div>
            </Stack>
          </Paper>

          <Group justify="center" gap="md">
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
        opened={showModal}
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
              تم استلم طلب انضمامك كتاجر بنجاح وسنتواصل معك قريباً عبر البريد
              الإلكتروني
            </Text>
          </div>

          <Paper withBorder p="md" radius="md" className="w-full">
            <Stack gap="xs">
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-gray-500">
                  رقم المرجع
                </Text>
                <Badge color="blue">
                  MER-{Date.now().toString().slice(-8)}
                </Badge>
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
                  اسم المتجر
                </Text>
                <Text size="sm" fw={500}>
                  {formData.companyName}
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

          <Group gap="md" className="w-full">
            <Button
              color="blue"
              onClick={handleCloseSuccessModal}
              size="md"
              radius="md"
              fullWidth
            >
              إغلاق
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleCloseSuccessModal();
                window.location.href = "/";
              }}
              size="md"
              radius="md"
              fullWidth
            >
              الرجوع للرئيسية
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default JoinAsMerchant;
