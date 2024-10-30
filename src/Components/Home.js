import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import VisitorManagement from "./VisitorManagement";
const loadVisitors = () => {
  const savedVisitors = localStorage.getItem("visitors");
  return savedVisitors
    ? JSON.parse(savedVisitors)
    : [
        {
          id: "V001",
          name: "محمد أحمد",
          type: "كبار القادة",
          status: "نشط",
          startTime: "2024-01-23 09:00",
          expectedDuration: "2",
          hostOfficer: "العقيد سعيد",
          hostUnit: "وحدة التدريب",
          purpose: "اجتماع تنسيقي",
        },
        {
          id: "V002",
          name: "أحمد علي",
          type: "ضباط",
          status: "مجدول",
          startTime: "2024-01-24 10:00",
          expectedDuration: "3",
          hostOfficer: "المقدم خالد",
          hostUnit: "وحدة التطوير",
          purpose: "متابعة مشروع",
        },
      ];
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [visitors, setVisitors] = useState(loadVisitors);
  const [filterStatus, setFilterStatus] = useState("");
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    type: "",
    startTime: "",
    hostOfficer: "",
    purpose: "",
    status: "نشط",
  });
  const [editingVisitor, setEditingVisitor] = useState(null);

  useEffect(() => {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }, [visitors]);

  const handleAddVisitor = (e) => {
    e.preventDefault();
    const newId = `V${(visitors.length + 1).toString().padStart(3, "0")}`;
    const updatedVisitors = [
      ...visitors,
      { ...newVisitor, id: newId, expectedDuration: "1" },
    ];
    setVisitors(updatedVisitors);
    setNewVisitor({
      name: "",
      type: "",
      startTime: "",
      hostOfficer: "",
      purpose: "",
      status: "نشط",
    });
  };

  const handleDeleteVisitor = (id) => {
    const updatedVisitors = visitors.filter((visitor) => visitor.id !== id);
    setVisitors(updatedVisitors);
  };

  const handleEditVisitor = (visitor) => {
    setEditingVisitor(visitor);
  };

  const handleUpdateVisitor = (e) => {
    e.preventDefault();
    const updatedVisitors = visitors.map((visitor) =>
      visitor.id === editingVisitor.id ? editingVisitor : visitor
    );
    setVisitors(updatedVisitors);
    setEditingVisitor(null);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            visitors={visitors}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handleEditVisitor={handleEditVisitor}
            handleDeleteVisitor={handleDeleteVisitor}
          />
        );
      case "visitors":
        return (
          <VisitorManagement
            newVisitor={newVisitor}
            editingVisitor={editingVisitor}
            setNewVisitor={setNewVisitor}
            setEditingVisitor={setEditingVisitor}
            handleAddVisitor={handleAddVisitor}
            handleUpdateVisitor={handleUpdateVisitor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div dir="rtl" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
        <Sidebar setCurrentPage={setCurrentPage} />
        <div style={{ marginRight: "250px", padding: "20px" }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Home;
