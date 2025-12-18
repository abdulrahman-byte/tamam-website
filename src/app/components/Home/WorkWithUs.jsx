"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const WorkWithUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    role: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [roleError, setRoleError] = useState("");
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

  const validateAge = (age) => {
    if (!age.trim()) {
      setAgeError("العمر مطلوب");
      return false;
    }
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 70) {
      setAgeError("العمر يجب أن يكون بين 18 و 70 سنة");
      return false;
    }
    setAgeError("");
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

  const validateRole = (role) => {
    if (!role.trim()) {
      setRoleError("الدور مطلوب");
      return false;
    }
    setRoleError("");
    return true;
  };

  const validateMessage = (message) => {
    if (message.trim().length > 500) {
      setMessageError("الرسالة يجب أن تكون أقل من 500 حرف");
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
    if (name === "age") validateAge(value);
    if (name === "email") validateEmail(value);
    if (name === "phone") validatePhone(value);
    if (name === "role") validateRole(value);
    if (name === "message") validateMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق النهائي من جميع الحقول
    const isNameValid = validateName(formData.name);
    const isAgeValid = validateAge(formData.age);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isRoleValid = validateRole(formData.role);
    const isMessageValid = validateMessage(formData.message);

    if (!isNameValid || !isAgeValid || !isEmailValid || !isPhoneValid || !isRoleValid || !isMessageValid) {
      return; // لا تكمل الإرسال إذا كان هناك أخطاء
    }

    const serviceID = "service_q8b56qf";
    const templateID = "template_99e82tp";
    const userID = "ZxLtSLDcogh2r5j2i";

    try {
      await emailjs.sendForm(serviceID, templateID, e.target, userID);
      setShowModal(true);
      // مسح الأخطاء بعد النجاح
      setNameError("");
      setAgeError("");
      setEmailError("");
      setPhoneError("");
      setRoleError("");
      setMessageError("");
    } catch (err) {
      console.error("Error:", err);
      alert("حدث خطأ أثناء إرسال الطلب، الرجاء المحاولة لاحقاً.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      phone: "",
      email: "",
      role: "",
      message: "",
    });
    setShowModal(false);
    setNameError("");
    setAgeError("");
    setEmailError("");
    setPhoneError("");
    setRoleError("");
    setMessageError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black relative mt-30">
      {/* النموذج */}
      <div className="w-[90%] sm:w-[500px] bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-center text-2xl font-bold mb-6 text-primary">
          انضم للعمل معنا
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

          {/* حقل العمر */}
          <div className="relative mb-6 text-right">
            <label className="block mb-2 text-sm font-semibold text-primary">
              العمر <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={() => validateAge(formData.age)}
              min="18"
              max="70"
              className={`w-full bg-transparent border-b ${
                ageError ? "border-red-500" : "border-primary"
              } py-2 px-2 text-black outline-none transition-colors`}
            />
            {ageError && (
              <p className="text-red-500 text-xs mt-1 text-right">{ageError}</p>
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

          {/* Select */}
          <div className="relative mb-6 text-right">
            <label className="block mb-2 text-sm font-semibold text-primary">
              الدور <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              onBlur={() => validateRole(formData.role)}
              className={`w-full bg-transparent border-b ${
                roleError ? "border-red-500" : "border-primary"
              } py-2 text-black outline-none px-2 transition-colors`}
            >
              <option value="">اختر الدور</option>
              <option value="مسوق">مسوق</option>
              <option value="مبرمج">مبرمج</option>
              <option value="مصمم">مصمم</option>
              <option value="ممنتج">ممنتج</option>
              <option value="معلم">معلم</option>
            </select>
            {roleError && (
              <p className="text-red-500 text-xs mt-1 text-right">{roleError}</p>
            )}
          </div>

          {/* ملاحظات */}
          <div className="relative mb-8 text-right">
            <label className="block mb-2 text-sm font-semibold text-primary">
              ملاحظات إضافية
            </label>
            <textarea
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
              {formData.message.length}/500 حرف
            </div>
          </div>

          {/* أزرار */}
          <div className="flex justify-center gap-4 mt-10">
            <button 
              type="submit" 
              className="btn-animated relative inline-block"
              disabled={nameError || ageError || emailError || phoneError || roleError || messageError}
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

      {/* ✅ المودال */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h3 className="text-xl font-bold mb-4 text-primary">
              ✅ تم إرسال طلبك بنجاح!
            </h3>
            <p className="mb-6">
              تم استلام طلبك بنجاح، يمكنك الآن إغلاق هذه النافذة.
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

export default WorkWithUs;