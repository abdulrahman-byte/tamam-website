import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo tamam.png";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-20 py-12 rounded-t-2xl">
      <div className="container mx-auto px-4 text-gray-700">

        <div className="flex flex-col md:flex-row md:justify-between items-center gap-8">

          {/* معلومات الاتصال */}
          <div className="flex flex-col space-y-3 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaPhoneAlt className="text-blue-600" />
              <a href="https://wa.me/966568294139" className="hover:text-blue-700">
                00966568294139
              </a>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaEnvelope className="text-blue-600" />
              <a href="mailto:fryed8488@gmail.com" className="hover:text-blue-700">
                fryed8488@gmail.com
              </a>
            </div>
          </div>

          {/* اللوجو */}
          <div className="flex justify-center md:justify-start">
            <Image src={logo} alt="logo" width={100} height={100} />
          </div>

          {/* أيقونات التواصل الاجتماعي */}
          <div className="flex gap-6 text-3xl justify-center text-gray-600">

            {/* واتساب - رابط القروب */}
            <a
              href="https://chat.whatsapp.com/IJLPVMdIi5EDFxeouI7lGp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-600 transition-colors"
            >
              <FaWhatsapp />
            </a>

            {/* فيسبوك */}
            <a
              href="https://www.facebook.com/share/g/14MmHwkHM5F/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebookF />
            </a>

            {/* تيك توك بدل لينكد إن */}
            <a
              href="https://www.tiktok.com/@tamam10101"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-black transition-colors"
            >
              <FaTiktok />
            </a>

          </div>
        </div>

        {/* حقوق الملكية */}
        <p className="text-center text-gray-500 text-sm mt-10">
          &copy; {new Date().getFullYear()} كل الحقوق محفوظة لشركة تمام
        </p>
      </div>
    </footer>
  );
};

export default Footer;
