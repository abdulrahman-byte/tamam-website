"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");

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

  const validateMessage = (message) => {
    if (!message.trim()) {
      setMessageError("الرسالة مطلوبة");
      return false;
    }
    if (message.trim().length > 500) {
      setMessageError("الرسالة يجب أن تكون اقل من 500 حرف");
      return false;
    }
    setMessageError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // التحقق الفوري عند الكتابة
    if (name === "name") validateName(value);
    if (name === "email") validateEmail(value);
    if (name === "phone") validatePhone(value);
    if (name === "message") validateMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق النهائي من جميع الحقول
    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isMessageValid = validateMessage(formData.message);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
      return; // لا تكمل الإرسال إذا كان هناك أخطاء
    }

    const serviceID = "service_ts8enq8";
    const templateID = "template_99e82tp";
    const userID = "ZxLtSLDcogh2r5j2i";

    try {
      await emailjs.sendForm(serviceID, templateID, e.target, userID);
      setShowModal(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
      // مسح الأخطاء بعد النجاح
      setNameError("");
      setEmailError("");
      setPhoneError("");
      setMessageError("");
    } catch (err) {
      console.error("Error:", err);
      alert("حدث خطأ أثناء إرسال الرسالة، الرجاء المحاولة لاحقاً.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setShowModal(false);
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setMessageError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black relative mt-30">
      <div className="w-[90%] sm:w-[500px] bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-center text-2xl font-bold mb-6 text-primary">
          تواصل معنا
        </h2>
        <form onSubmit={handleSubmit}>
          {/* حقل الاسم */}
          <div className="relative mb-6 text-right">
            <label className="block mb-2 text-sm font-semibold text-primary">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => validateName(formData.name)}
              className={`w-full bg-transparent border-b ${
                nameError ? "border-red-500" : "border-primary"
              } py-2 px-2 text-black outline-none transition-colors`}
            />
            {nameError && (
              <p className="text-red-500 text-xs mt-1 text-right">{nameError}</p>
            )}
          </div>

          {/* حقل الهاتف */}
          <div className="relative mb-6 text-right">
            <label className="block mb-2 text-sm font-semibold text-primary">
              رقم الجوال <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => validatePhone(formData.phone)}
              maxLength={15}
              className={`w-full bg-transparent border-b ${
                phoneError ? "border-red-500" : "border-primary"
              } py-2 px-2 text-black outline-none transition-colors`}
              placeholder="00xxxxxxxxxxx"
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1 text-right">{phoneError}</p>
            )}
          </div>

          {/* حقل البريد الإلكتروني */}
          <div className="relative mb-6 text-right">
            <label className="block mb-2 text-sm font-semibold text-primary">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => validateEmail(formData.email)}
              className={`w-full bg-transparent border-b ${
                emailError ? "border-red-500" : "border-primary"
              } py-2 px-2 text-black outline-none transition-colors`}
              placeholder="example@email.com"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1 text-right">{emailError}</p>
            )}
          </div>

          {/* حقل الرسالة */}
          <div className="relative mb-8 text-right">
            <label className="block mb-2 text-sm font-semibold text-primary">
              الرسالة <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={() => validateMessage(formData.message)}
              className={`w-full bg-transparent border-b ${
                messageError ? "border-red-500" : "border-primary"
              } py-2 px-2 text-black outline-none transition-colors min-h-[100px]`}
            ></textarea>
            {messageError && (
              <p className="text-red-500 text-xs mt-1 text-right">{messageError}</p>
            )}
            <div className="text-xs text-gray-500 mt-1 text-left">
              {formData.message.length}/500 أحرف
            </div>
          </div>

          {/* أيقونات التواصل الاجتماعي */}
          <div className="flex justify-center gap-8 mb-8 text-primary text-2xl">
            <a
              href="https://wa.me/966568294139"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب"
              className="text-green-600 hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/share/g/14MmHwkHM5F/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فيسبوك"
              className="text-blue-600 hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.tiktok.com/@tamam10101"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="لينكدإن"
              className=" text-black hover:text-black/60 transition-colors"
            >
              <FaTiktok />
            </a>
          </div>

          {/* أزرار */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="btn-animated relative inline-block"
              disabled={nameError || emailError || phoneError || messageError}
            >
              إرسال
              <span></span>
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="btn-animated relative inline-block"
            >
              إلغاء
              <span></span>
            </button>
          </div>
        </form>
      </div>

      {/* المودال */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h3 className="text-xl font-bold mb-4 text-primary">
              ✅ تم إرسال رسالتك بنجاح!
            </h3>
            <p className="mb-6">
              شكراً لتواصلك معنا، سنرد عليك في أقرب وقت ممكن.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;