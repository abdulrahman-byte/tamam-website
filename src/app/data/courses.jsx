export const courses = [
    // Computer
  {
    id: 1,
    title: "كورس أساسيات الحاسوب",
    category: "حاسوب",
    description: "تعلم أساسيات استخدام الحاسوب والبرامج الأساسية.",
    details:
      "ستتعرف على مكونات الحاسوب، أنظمة التشغيل، استخدام البرامج المكتبية، وإدارة الملفات.",
    modules: [
      "مقدمة",
      "مكونات الحاسوب",
      "أنظمة التشغيل",
      "البرامج المكتبية",
      "إدارة الملفات",
    ],
    img: "https://res.cloudinary.com/dacu2uuyw/image/upload/v1766022234/computer_mw5eyd.jpg",
    price: 10000,
    duration: "أسبوع (10 ساعات تدريبية)",
    available: true,
  },
  // HTML
  {
    id: 2,
    title: "كورس HTML",
    category: "برمجة",
    description: "تعلم أساسيات لغة HTML لبناء هيكل صفحات الويب.",
    details:
      "في هذا الكورس ستتعلم كيفية إنشاء الصفحات باستخدام الوسوم الأساسية، إضافة النصوص، الصور، الروابط، والجداول، مع فهم البنية الصحيحة لأي موقع.",
    modules: [
      "مقدمة",
      "الوسوم الأساسية",
      "النصوص والروابط",
      "الجداول",
      "النماذج",
    ],
    img: "https://res.cloudinary.com/dacu2uuyw/image/upload/v1766022268/HTML_hvejdd.jpg",
    price: 10000,
    duration: "أسبوعان (12 ساعة تدريبية)",
    available: true,
  },
  // CSS
  {
    id: 3,
    title: "كورس CSS",
    category: "برمجة",
    description: "إتقان تنسيقات صفحات الويب باستخدام CSS.",
    details:
      "ستتعلم كيفية التحكم في الألوان والخطوط، تنسيق العناصر، استخدام Flexbox و Grid، وإنشاء تصميمات متجاوبة.",
    modules: [
      "مقدمة",
      "الألوان والخطوط",
      "Box Model",
      "Flexbox",
      "Grid",
      "Responsive Design",
    ],
    img: "https://res.cloudinary.com/dacu2uuyw/image/upload/v1766022272/CSS_igbqbh.jpg",
    price: 10000,
    duration: "أسبوعان (15 ساعة تدريبية)",
    available: true,
    releaseDate: "2025-11-01T00:00:00", // سيتوفر بعد هذا التاريخ
  },
  // JavaScript
  {
    id: 4,
    title: "كورس JavaScript",
    category: "برمجة",
    description: "من المبتدئ إلى المتقدم في لغة JavaScript.",
    details:
      "يغطي هذا الكورس أساسيات اللغة، المتغيرات والدوال، التعامل مع DOM، الأحداث، وميزات ES6 الحديثة.",
    modules: ["المتغيرات", "الدوال", "DOM", "الأحداث", "ES6"],
    img: "https://res.cloudinary.com/dacu2uuyw/image/upload/v1766022263/JavaScript_ykkxnq.jpg",
    price: 15000,
    duration: "3 أسابيع (20 ساعة تدريبية)",
    available: false,
  },
  // Reactjs
  {
    id: 5,
    title: "كورس React",
    category: "برمجة",
    description: "تعلم مكتبة React لبناء واجهات مستخدم تفاعلية.",
    details:
      "في هذا الكورس ستتعلم المكونات (Components)، الحالة (State)، الخصائص (Props)، التعامل مع الأحداث، واستخدام Hooks.",
    modules: [
      "مقدمة",
      "Components",
      "Props & State",
      "Events",
      "Hooks",
      "Routing",
    ],
    img: "https://res.cloudinary.com/dacu2uuyw/image/upload/v1766022227/Reactjs_pjmnmf.jpg",
    price: 20000,
    duration: "3 أسابيع (25 ساعة تدريبية)",
    available: false,
    releaseDate: "2025-11-15T00:00:00",
  },
  // NextJs
  {
    id: 6,
    title: "كورس Next.js",
    category: "برمجة",
    description: "تعلم إطار العمل Next.js لبناء تطبيقات ويب متكاملة.",
    details:
      "ستتعلم الصفحات الديناميكية، المسارات، التعامل مع API، تحسين الأداء، والنشر على Vercel.",
    modules: [
      "مقدمة",
      "الصفحات",
      "المسارات الديناميكية",
      "API Routes",
      "النشر",
    ],
    img: "https://res.cloudinary.com/dacu2uuyw/image/upload/v1766022259/NextJs_qi1rnj.jpg",
    price: 20000,
    duration: "3 أسابيع (25 ساعة تدريبية)",
    available: false,
    discount: 50,
  },
  // progCourse
  {
    id: 7,
    title:
      "الباقة الشاملة (HTML + CSS + JS + أساسيات الحاسوب + React + Next.js)",
    category: "باقة شاملة",
    description: "احصل على جميع الكورسات في باقة واحدة بسعر مخفض.",
    details:
      "هذه الباقة تضم جميع الكورسات السابقة لتأخذك من الصفر حتى الاحتراف في تطوير الويب. ستتعلم بناء المواقع من الأساسيات حتى التطبيقات المتقدمة باستخدام React و Next.js.",
    modules: [
      "أساسيات الحاسوب",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
    ],
    img: "https://res.cloudinary.com/dacu2uuyw/image/upload/v1766022230/progCourse_drsfgx.jpg",
    price: 50000, // السعر الأصلي
    discount: 30, // نسبة الخصم كرقم فقط
    duration: "شهران (100 ساعة تدريبية)",
    available: false,
  },
];
