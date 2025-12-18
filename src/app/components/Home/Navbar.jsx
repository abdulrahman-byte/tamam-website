"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import logo from "/logoTamam.png";
import { NavLink, Breadcrumbs, Anchor } from "@mantine/core";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [marqueeVisible, setMarqueeVisible] = useState(true);
  useEffect(() => {
    const closed = sessionStorage.getItem("marqueeClosed");
    if (closed === "true") setMarqueeVisible(false);
  }, []);
  const handleCloseMarquee = () => {
    setMarqueeVisible(false);
    sessionStorage.setItem("marqueeClosed", "true");
  };

  const [hydrated, setHydrated] = useState(false);

useEffect(() => {
  setHydrated(true);
}, []);



useEffect(() => {
  if (!hydrated) return; // ما تعمل شيء قبل الhydration
  const closed = sessionStorage.getItem("marqueeClosed");
  if (closed !== "true") setMarqueeVisible(true);
}, [hydrated]);

  const breadcrumbMap = {
    "/": "الرئيسية",
    "/about-usPage": "من نحن",
    "/servicesPage": "الخدمات",
    "/servicesPage/designPage": "التصميم",
    "/servicesPage/designPage/socialMediaPage": "السوشيال ميديا",
    "/servicesPage/designPage/invitationsPage": "الدعوات الالكترونية",
    "/servicesPage/designPage/companyPage": "التصاميم المهنية",
    "/servicesPage/designPage/bookCoversPage": "اغلفة الكتب",
    // "/servicesPage/designPage/tsamimTwdihiaPage": "التصاميم التوضيحية",
    "/servicesPage/designPage/menuPage": "المنيو",
    "/servicesPage/translatePage": "الترجمة",
    "/servicesPage/marketingPage": "التسويق",
    "/servicesPage/MontagePage": "المونتاج",
    "/servicesPage/educationPage": "التعليم",
    "/productsPage": "المنتجات",
    "/orderPage": "اطلب خدمة",
    "/OrderWebPage": "اطلب برمجة موقع",
    "/contactPage": "تواصل معنا",
  };

  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const url = "/" + pathParts.slice(0, index + 1).join("/");
    return { title: breadcrumbMap[url] || part, href: url };
  });

  const breadcrumbItems = [
    { title: "الرئيسية", href: "/" },
    ...breadcrumbs,
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  // الخدمات القادمة للإعلان في الشريط المتحرك
  const upcomingServices = [
    {
      text: "خدمة تصميم الشعارات متاحة قريباً!",
      link: "/orderPage",
    },
    {
      text: "خدمة شراء قوالب المواقع متاحة قريباً!",
      // link: "/OrderWeb",
    },
    {
      text: "خدمة التقديم للمنح الدراسية متاحة قريباً!",
      // link: "/services/education",
    },
    {
      text: "خدمة استخراج الشهادات متاحة قريباً!",
      // link: "/services/education",
    },
    {
      text: "إذا أردت شعارات الآن يمكنك الطلب من صفحة طلب الخدمة",
      link: "/orderPage",
    },
  ];

  return (
    <nav className="sticky top-0 z-50">
      {/* شريط الإعلانات المتحرك */}
     {hydrated && marqueeVisible && (
  <div className="relative overflow-hidden">
    {/* زر الإغلاق */}
    <button
      onClick={handleCloseMarquee}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white font-bold hover:text-gray-200 z-10 cursor-pointer"
    >
      ✕
    </button>

    <div className="marquee-wrapper py-2">
      <div className="marquee-content">
        {[...upcomingServices, ...upcomingServices].map((service, index) => (
          <span key={index} className="mx-6 inline-block">
            <a href={service.link} className="text-white hover:underline">
              {service.text}
            </a>
          </span>
        ))}
      </div>
    </div>
  </div>
)}


      {/* Navbar الرئيسي */}
      <div className="bg-white shadow-lg p-4 !mb-10 rounded-b-2xl">
        {/* Breadcrumbs */}
        <div className="flex justify-center mb-2">
          <Breadcrumbs separator=" / ">{breadcrumbItems}</Breadcrumbs>
        </div>

        {/* LOGO + MENU BUTTON */}
        <div className="flex items-center justify-center lg:justify-center">
          <div className="hidden lg:flex justify-center w-full">
            <Image src="https://res.cloudinary.com/dacu2uuyw/image/upload/v1766026994/logoTamam_kq5swq.png" alt="logo" width={130} height={130} priority />
          </div>

          <div className="flex lg:hidden justify-between w-full items-center">
            <Image src="https://res.cloudinary.com/dacu2uuyw/image/upload/v1766026994/logoTamam_kq5swq.png" alt="logo" width={90} height={90} priority />
            <button
              className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div
          className={`
            mt-4 max-h-[70vh] overflow-y-auto transition-all duration-500 ease-in-out
            lg:flex lg:items-center lg:justify-center
            ${
              menuOpen
                ? "opacity-100 translate-y-0 block"
                : "opacity-0 -translate-y-5 hidden"
            }
            lg:opacity-100 lg:translate-y-0 lg:block
          `}
        >
          <ul className="flex flex-col lg:flex-row gap-6">
            <li>
              <NavLink
                href="/"
                active={pathname === "/"}
                className="font-bold"
                label="الرئيسية"
              />
            </li>

            <li>
              <NavLink
                href="/about-usPage"
                active={pathname === "/about-usPage"}
                className="font-bold"
                label="من نحن"
              />
            </li>

            <li>
              <NavLink
                label="الخدمات"
                childrenOffset={20}
                className="font-bold"
                active={pathname.startsWith("/servicesPage")}
              >
                <NavLink
                  label="التصميم"
                  childrenOffset={20}
                  className="font-bold"
                >
                  <NavLink
                    href="/servicesPage/designPage/socialMediaPage"
                    label="السوشيال ميديا"
                  />
                  <NavLink
                    href="/servicesPage/designPage/invitationsPage"
                    label="الدعوات الالكترونية"
                  />
                  <NavLink
                    href="/servicesPage/designPage/companyPage"
                    label="التصاميم المهنية"
                  />
                  <NavLink
                    href="/servicesPage/designPage/bookCoversPage"
                    label="اغلفة الكتب"
                  />
                  {/* <NavLink
                    href="/servicesPage/designPage/tsamimTwdihiaPage"
                    label="التصاميم التوضيحية"
                  /> */}
                  <NavLink href="/servicesPage/designPage/menuPage" label="المنيو" />
                </NavLink>

                <NavLink
                  label="الكتابة والترجمة"
                  childrenOffset={20}
                  className="font-bold"
                >
                  <NavLink href="/servicesPage/translatePage" label="الترجمة" />
                </NavLink>

                <NavLink
                  label="التسويق"
                  childrenOffset={20}
                  className="font-bold"
                >
                  <NavLink href="/servicesPage/marketingPage" label="التسويق" />
                </NavLink>

                {/* <NavLink
                  label="المونتاج"
                  childrenOffset={20}
                  className="font-bold"
                >
                  <NavLink href="/servicesPage/MontagePage" label="المونتاج" />
                </NavLink> */}

                <NavLink
                  label="التعليم"
                  childrenOffset={20}
                  className="font-bold"
                >
                  <NavLink href="/servicesPage/educationPage" label="التعليم" />
                </NavLink>
              </NavLink>
            </li>

            <li>
              <NavLink
                href="/productsPage"
                label="المنتجات"
                className="font-bold"
                active={pathname === "/productsPage"}
              />
            </li>

            <li>
              <NavLink
                href="/OrderWebPage"
                label="اطلب برمجة موقع"
                className="font-bold"
                active={pathname === "/OrderWebPage"}
              />
            </li>

            <li>
              <NavLink
                href="/orderPage"
                label="اطلب خدمة"
                className="font-bold"
                active={pathname === "/orderPage"}
              />
            </li>

            <li>
              <NavLink
                href="/contactPage"
                label="تواصل معنا"
                className="font-bold"
                active={pathname === "/contactPage"}
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
