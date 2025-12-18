// layout.js
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Cairo } from "next/font/google";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/Footer";


const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "tamam | تمام",
  description:
    "موقع تمام يقدم خدمات تقنية رقمية متكاملة: تصميم دعوات زفاف، تخرج، تهنئة مواليد، منيو، سيرة ذاتية، بطاقات عمل، شعارات، برمجة مواقع، متاجر إلكترونية، كورسات تعليمية، تسويق رقمي، وخدمات الترجمة والمونتاج",
  keywords: [
    // خدمات التصميم التفصيلية
    "تصميم دعوات زفاف",
    "دعوات زفاف مخصصة",
    "تصميم دعوات تخرج",
    "دعوات تخرج جامعية",
    "تصميم تهنئة مواليد",
    "بطاقات تهنئة مواليد",
    "تصميم منيو مطاعم",
    "قوائم طعام مصممة",
    "منيو كافيهات",
    "تصميم منيو مقاهي",
    
    // تصاميم توضيحية وتصميمات نصيحة
    "تصاميم توضيحية",
    "تصاميم إرشادية",
    "تصاميم نصيحة",
    "تصاميم توعوية",
    "تصاميم تعليمية",
    "تصاميم إرشاد",
    "تصاميم توضيح خطوات",
    "تصاميم إجراءات",
    
    // الانفوجرافيك
    "تصميم انفوجرافيك",
    "انفوجرافيك احترافي",
    "انفوجرافيك تعليمي",
    "انفوجرافيك توعوي",
    "انفوجرافيك إحصائي",
    "انفوجرافيك مرئي",
    "انفوجرافيك معلوماتي",
    "تصميم جرافيك معلوماتي",
    
    // المنتجات والخدمات والتجارة
    "تصميم منتجات",
    "تصاميم منتجات",
    "تصميم خدمات",
    "تصاميم خدمات",
    "تصميم تجارة",
    "تصاميم تجارية",
    "تصميم علامات تجارية",
    "تصاميم تسويقية للمنتجات",
    "تصميم بطاقات منتجات",
    "تصاميم كتالوجات",
    
    // انضم كتاجر
    "انضم كتاجر",
    "تسجيل تاجر",
    "منصة تجارية",
    "متجر الكتروني",
    "تاجر الكتروني",
    "بيع الكتروني",
    "منصة بيع",
    "تسويق منتجات",
    "بيع عبر الانترنت",
    
    // سيرة ذاتية وبطاقات عمل
    "تصميم سيرة ذاتية",
    "سيرة ذاتية احترافية",
    "تصميم CV",
    "سيرة ذاتية مصممة",
    "تصميم بطاقات عمل",
    "بطاقة عمل مصممة",
    "Business Card",
    "بطاقة مهنية",
    "تصميم بطاقات أعمال",
    "بطاقات تعريفية",
    
    // شعارات وهوية بصرية
    "تصميم شعارات",
    "تصميم لوقو",
    "Logo Design",
    "تصميم هوية بصرية",
    "Brand Identity",
    "تصميم علامة تجارية",
    "شعار احترافي",
    "لوجو مخصص",
    "تصميم شعار شركات",
    "شعار مؤسسي",
    
    // أغلفة كتب
    "تصميم أغلفة كتب",
    "غلاف كتاب مصمم",
    "تصميم كتب",
    "Book Cover Design",
    "تصميم أغلفة روايات",
    "تصميم أغلفة دراسية",
    "تصميم أغلفة إلكترونية",
    "تصميم جرافيك للكتب",
    
    // خدمات التعليم والكورسات
    "كورسات تعليمية",
    "دورات تعليمية",
    "كورس HTML",
    "تعليم HTML",
    "كورس CSS",
    "تعليم CSS",
    "كورس JavaScript",
    "تعليم JS",
    "كورس Next.js",
    "تعليم Next.js",
    "كورس React.js",
    "تعليم React",
    "كورس برمجة مواقع",
    "تعليم برمجة الويب",
    "أساسيات الحاسوب",
    "مقدمة في الحاسوب",
    "كورس حاسوب للمبتدئين",
    "تعليم أساسيات الكمبيوتر",
    "دروس برمجة",
    "تعليم تطوير الويب",
    
    // خدمات البرمجة
    "برمجة مواقع إلكترونية",
    "تصميم مواقع الكترونية",
    "برمجة متاجر إلكترونية",
    "متجر الكتروني",
    "E-commerce Development",
    "تطوير مواقع الويب",
    "Web Development",
    "برمجة تطبيقات الويب",
    "تطوير واجهات مستخدم",
    "Frontend Development",
    "برمجة قوالب مواقع",
    "Website Templates",
    "برمجة مواقع متجاوبة",
    "Responsive Web Design",
    
    // خدمات التسويق
    "تسويق رقمي",
    "Digital Marketing",
    "تسويق وسائل التواصل الاجتماعي",
    "Social Media Marketing",
    "إدارة صفحات التواصل الاجتماعي",
    "Social Media Management",
    "تسويق محتوى",
    "Content Marketing",
    "تسويق بالبريد الإلكتروني",
    "Email Marketing",
    "تحسين محركات البحث",
    "SEO",
    "إعلانات مدفوعة",
    "Paid Advertising",
    "بناء الهوية التجارية",
    "Brand Building",
    "إستراتيجيات تسويق",
    "Marketing Strategies",
    "تسويق المنتجات",
    "Product Marketing",
    
    // خدمات الترجمة
    "ترجمة مستندات",
    "Document Translation",
    "ترجمة مواقع إلكترونية",
    "Website Translation",
    "ترجمة فيديوهات",
    "Video Translation",
    "ترجمة كتب",
    "Book Translation",
    "ترجمة أكاديمية",
    "Academic Translation",
    "ترجمة عربي انجليزي",
    "Arabic English Translation",
    "ترجمة احترافية",
    "Professional Translation",
    
    // خدمات المونتاج
    "مونتاج فيديو",
    "Video Editing",
    "مونتاج صوت",
    "Audio Editing",
    "تعديل صور",
    "Photo Editing",
    "مونتاج فيديوهات قصيرة",
    "Short Video Editing",
    "مونتاج فيديوهات مؤسسية",
    "Corporate Video Editing",
    "مونتاج إعلانات",
    "Advertisement Editing",
    "تعديل فيديوهات",
    "Video Production",
    
    // خدمات التعليم العام
    "دروس خصوصية",
    "Private Tutoring",
    "ورش عمل",
    "Workshops",
    "محتوى تعليمي",
    "Educational Content",
    "استشارات تعليمية",
    "Educational Consulting",
    "تدريب تقني",
    "Technical Training",
    "تعليم عن بعد",
    "Online Learning",
    
    // خدمات أخرى
    "سوشيال ميديا",
    "Social Media",
    "إدارة محتوى",
    "Content Management",
    "تصميم وإبداع",
    "Design & Creativity",
    "خدمات تقنية",
    "Technical Services",
    "حلول رقمية",
    "Digital Solutions",
    "استشارات تقنية",
    "Technical Consulting",
    "تطوير أعمال",
    "Business Development",
    "خدمات عن بعد",
    "Remote Services",
    "عمل حر",
    "Freelance",
    "فريلانسر",
    "Freelancer",
    
    // كلمات مفتاحية عامة ومحلية
    "تمام",
    "tamam",
    "خدمات تصميم",
    "Design Services",
    "خدمات برمجة",
    "Programming Services",
    "خدمات تسويق",
    "Marketing Services",
    "خدمات ترجمة",
    "Translation Services",
    "خدمات مونتاج",
    "Editing Services",
    "مصمم محترف",
    "Professional Designer",
    "مبرمج مواقع",
    "Web Developer",
    "مسوق رقمي",
    "Digital Marketer",
    "مترجم محترف",
    "Professional Translator",
    "مونتير فيديو",
    "Video Editor",
    "مصمم جرافيك",
    "Graphic Designer",
    "مصمم سيرة ذاتية",
    "CV Designer",
    "تصميم احترافي",
    "Professional Design",
    "برمجة احترافية",
    "Professional Programming",
    "تسويق احترافي",
    "Professional Marketing",
    
    // كلمات البحث الشائعة
    "تصميم في السودان",
    "برمجة في السودان",
    "تسويق في السودان",
    "مصمم في الرياض",
    "مبرمج في الرياض",
    "خدمات عن بعد في السودان",
    "فريلانسر عربي",
    "عمل حر عربي",
    "منصة خدمات عربية",
  ].join(", "),
};


export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>

       {/* <link rel="manifest" href="/manifest.json" /> */}
        <link
          rel="icon"
          href="/favicon.png"
          sizes="any"
          type="image/png+xml"
        />
        <link rel="apple-touch-icon" href="/logo.png" />
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`font-sans bg-var-background text-var-foreground antialiased ${cairo.className}`}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Navbar />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
