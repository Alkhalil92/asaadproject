import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null); // For tracking the visitor to show details
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [selectedRank, setSelectedRank] = useState(""); // For filtering by rank

  useEffect(() => {
    const storedVisitors = JSON.parse(localStorage.getItem("visitors"));
    setVisitors(Array.isArray(storedVisitors) ? storedVisitors : []);
  }, []);

  // Handle opening the modal with selected visitor details
  const openModal = (visitor) => {
    setSelectedVisitor(visitor);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedVisitor(null);
    setIsModalOpen(false);
  };
  const handleDelete = (visitor) => {
    const updatedVisitors = visitors.filter(
      (v) => v.civilId !== visitor.civilId
    );
    setVisitors(updatedVisitors);
    localStorage.setItem("visitors", JSON.stringify(updatedVisitors));
  };

  const handleRankChange = (event) => {
    setSelectedRank(event.target.value);
  };

  const filteredVisitors = selectedRank
    ? visitors.filter((visitor) => visitor.rank === selectedRank)
    : visitors;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>قائمة الزوار المسجلين</h2>

      <div style={filterContainerStyle}>
        <label htmlFor="rankFilter" style={filterLabelStyle}>
          اختر الرتبة:
        </label>
        <select
          id="rankFilter"
          value={selectedRank}
          onChange={handleRankChange}
          style={filterSelectStyle}
        >
          <option value="">عرض الكل</option>
          <option value="كبار القادة">كبار القادة</option>
          <option value="ضباط">ضباط</option>
        </select>
      </div>

      {filteredVisitors.length === 0 ? (
        <p style={noVisitorsStyle}>لا يوجد زوار مسجلين.</p>
      ) : (
        // back button

        <div className="mx-auto max-w-7xl">
          <a
            href="/home"
            className="mb-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ← رجوع
          </a>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>اسم الزائر</th>
                <th style={tableHeaderStyle}>الرقم المدني</th>
                <th style={tableHeaderStyle}>رقم الهاتف</th>
                <th style={tableHeaderStyle}>الرتبة</th>
                <th style={tableHeaderStyle}>سبب الزيارة</th>
                <th style={tableHeaderStyle}>تاريخ الزيارة</th>
                <th style={tableHeaderStyle}>تفاصيل</th>
                <th style={tableHeaderStyle}>حذف</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((visitor, index) => {
                // Check if the visit date is today
                const isToday =
                  new Date(visitor.visitDuration).toDateString() ===
                  new Date().toDateString();
                return (
                  <tr
                    key={index}
                    // style={isToday ? { backgroundColor: "green" } : {}}
                    className={`transition-colors hover:bg-gray-50 ${
                      isToday ? "bg-green-400" : ""
                    }`}
                  >
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      {visitor.visitorName}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      {visitor.civilId}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      {visitor.visitorPhone}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      {visitor.rank}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      {visitor.visitPurpose}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      {visitor.visitDuration}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      <button
                        onClick={() => openModal(visitor)}
                        style={detailsButtonStyle}
                      >
                        عرض التفاصيل
                      </button>
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900"
                      style={tableCellStyle}
                    >
                      <button
                        onClick={() => handleDelete(visitor)}
                        style={{ color: "red" }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedVisitor && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={modalHeaderStyle}>تفاصيل الزائر</h3>
            <p>
              <strong>اسم الزائر:</strong> {selectedVisitor.visitorName}
            </p>
            <p>
              <strong>الرقم المدني:</strong> {selectedVisitor.civilId}
            </p>
            <p>
              <strong>رقم الهاتف:</strong> {selectedVisitor.visitorPhone}
            </p>
            <p>
              <strong>رقم اللوحة:</strong> {selectedVisitor.plateNumber}
            </p>
            <p>
              <strong>نوع السيارة:</strong> {selectedVisitor.carMake}
            </p>
            <p>
              <strong>موديل السيارة:</strong> {selectedVisitor.carModel}
            </p>
            <p>
              <strong>لون السيارة:</strong> {selectedVisitor.carColor}
            </p>
            <p>
              <strong>اسم الضابط:</strong> {selectedVisitor.officerName}
            </p>
            <p>
              <strong>الرتبة:</strong> {selectedVisitor.officerRank}
            </p>
            <p>
              <strong>الرقم العسكري:</strong> {selectedVisitor.militaryId}
            </p>
            <p>
              <strong>تاريخ انتهاء البطاقة:</strong>{" "}
              {selectedVisitor.cardExpiry}
            </p>
            <p>
              <strong>الوحدة:</strong> {selectedVisitor.officerDivision}
            </p>
            <p>
              <strong>موقع المكتب:</strong> {selectedVisitor.officeLocation}
            </p>
            <p>
              <strong>رقم هاتف الضابط:</strong> {selectedVisitor.officerPhone}
            </p>
            <p>
              <strong>سبب الزيارة:</strong> {selectedVisitor.visitPurpose}
            </p>
            <p>
              <strong>تاريخ الزيارة:</strong> {selectedVisitor.visitDuration}{" "}
            </p>
            <button onClick={closeModal} style={closeButtonStyle}>
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const containerStyle = {
  maxWidth: "1000px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  direction: "rtl",
};
const headerStyle = {
  textAlign: "center",
  color: "#333",
  marginBottom: "30px",
  fontSize: "24px",
  fontWeight: "bold",
};
const noVisitorsStyle = {
  textAlign: "center",
  color: "#888",
  fontSize: "18px",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
  borderRadius: "8px",
  overflow: "hidden",
};
const tableHeaderStyle = {
  padding: "12px",
  backgroundColor: "#007bff",
  color: "white",
  textAlign: "center",
  fontWeight: "bold",
};
const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
};
const detailsButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "500px",
  width: "100%",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  textAlign: "right",
};
const modalHeaderStyle = {
  marginBottom: "10px",
  fontSize: "20px",
  fontWeight: "bold",
};
const closeButtonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const filterContainerStyle = {
  marginBottom: "20px",
  textAlign: "center",
};
const filterLabelStyle = {
  marginRight: "10px",
  fontSize: "16px",
};
const filterSelectStyle = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default Dashboard;
