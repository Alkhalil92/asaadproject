// Sidebar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ setCurrentPage }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  const sidebarButtonStyle = {
    background: "none",
    border: "none",
    color: "white",
    width: "100%",
    textAlign: "right",
    padding: "10px",
    cursor: "pointer",
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "250px",
        height: "100vh",
        backgroundColor: "#343a40",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>
        نظام إدارة الزوار
      </h2>
      <nav>
        {user && user.role === "officer" && (
          <Link to="/visitors">
            <button style={sidebarButtonStyle}>إضافة زوار</button>
          </Link>
        )}

        {user && user.role === "guard" && (
          <Link to="/dashboard">
            <button style={sidebarButtonStyle}>لوحة التحكم</button>
          </Link>
        )}

        {user && user.role === "guard" && (
          <Link to="/VisitTable">
            <button style={sidebarButtonStyle}>جميع الدورات</button>
          </Link>
        )}
      </nav>
      {/* signout with window.location.href = "/home"*/}
      <button style={sidebarButtonStyle} onClick={() => logout()}>
        تسجيل الخروج
      </button>
    </div>
  );
};

export default Sidebar;
