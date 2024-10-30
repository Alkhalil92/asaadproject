import React, { useState } from "react";
import { LoginData } from "../LoginData";

const LoginPage = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = false;

    LoginData.forEach((item) => {
      if (item.user === uname && item.password === password) {
        flag = true;
        // Save the logged-in user details to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(item));

        window.location.href = "/home";
        setError("إسم المستخدم أو كلمة المرور صحيحة");
      }
    });

    if (!flag) {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>نظام إدارة الزوار</h1>
          <p style={subtitleStyle}>تسجيل الدخول</p>
        </div>

        <form style={formStyle}>
          {/* اختيار نوع المستخدم */}
          <div style={inputGroupStyle}>
            <div style={userTypeContainerStyle}></div>
          </div>

          {/* حقل رقم المستخدم */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>إسم المستخدم *</label>
            <input
              type="text"
              name="id"
              style={inputStyle}
              onChange={(e) => setUname(e.target.value)}
              required
              placeholder="أدخل إسم المستخدم"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>كلمة المرور *</label>
            <input
              type="password"
              name="password"
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          {/* رسالة الخطأ */}
          {error && <div style={errorStyle}>{error}</div>}

          {/* زر تسجيل الدخول */}
          <button
            type="submit"
            style={submitButtonStyle}
            onClick={handleSubmit}
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f2f5",
  direction: "rtl",
  padding: "20px",
};

const loginBoxStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  width: "100%",
  padding: "20px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle = {
  color: "#1a73e8",
  fontSize: "24px",
  marginBottom: "10px",
};

const subtitleStyle = {
  color: "#666",
  fontSize: "16px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const labelStyle = {
  fontWeight: "bold",
  fontSize: "14px",
  color: "#555",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const userTypeContainerStyle = {
  display: "flex",
  gap: "10px",
};

const userTypeButtonStyle = {
  flex: 1,
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

const submitButtonStyle = {
  backgroundColor: "#1a73e8",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const errorStyle = {
  backgroundColor: "#ffebee",
  color: "#c62828",
  padding: "10px",
  borderRadius: "4px",
  fontSize: "14px",
  textAlign: "center",
};

export default LoginPage;
