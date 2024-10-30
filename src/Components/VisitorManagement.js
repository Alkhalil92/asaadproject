import React, { useEffect, useState } from "react";

const GuardVisitorForm = () => {
  const today = new Date().toISOString().split("T")[0];

  const initialFormData = {
    visitorName: "",
    civilId: "",
    visitorPhone: "",
    rank: "",
    plateNumber: "",
    carMake: "",
    carModel: "",
    carColor: "",
    officerName: "",
    officerRank: "",
    militaryId: "",
    cardExpiry: "",
    officerDivision: "",
    officeLocation: "",
    officerPhone: "",
    visitPurpose: "",
    visitDuration: today,
  };

  // User state and form data
  const [formData, setFormData] = useState(initialFormData);
  const [visitors, setVisitors] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load data from localStorage if available
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("visitors"));
    if (savedData) {
      setVisitors(savedData);
    }
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedVisitors = [...visitors];

    if (editIndex !== null) {
      updatedVisitors[editIndex] = formData;
    } else {
      updatedVisitors = [...updatedVisitors, formData];
    }

    setVisitors(updatedVisitors);
    localStorage.setItem("visitors", JSON.stringify(updatedVisitors));

    alert("تم تسجيل الزيارة بنجاح");
    console.log("تم تسجيل الزيارة:", formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(visitors[index]);
    setEditIndex(index);
  };

  const handleDelte = (index) => {
    const updatedVisitors = visitors.filter((_, i) => i !== index);
    setVisitors(updatedVisitors);
    localStorage.setItem("visitors", JSON.stringify(updatedVisitors));
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>تسجيل زيارة جديدة</h2>
      <a
        href="/home"
        style={{ color: "blue", fontSize: "20px", fontWeight: "bold" }}
      >
        العودة للصفحة الرئيسية
      </a>
      <form onSubmit={handleSubmit}>
        {/* Visitor Information */}
        <Section title="بيانات الزائر">
          <InputField
            label="اسم الزائر *"
            name="visitorName"
            value={formData.visitorName}
            onChange={handleChange}
            required
          />
          <InputField
            label="الرقم المدني *"
            name="civilId"
            value={formData.civilId}
            onChange={handleChange}
            required
          />
          <InputField
            label="رقم الهاتف"
            name="visitorPhone"
            type="tel"
            value={formData.visitorPhone}
            onChange={handleChange}
          />
          {/* an option thats h aving two values,  كبار القادة , ضباط*/}
          <SelectField
            label="نوع الزيارة *"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            required
          >
            <option value="">اختر الرتبة</option>
            <option value="كبار القادة">كبار القادة</option>
            <option value="ضباط">ضباط</option>
          </SelectField>
        </Section>

        {/* Vehicle Information */}
        <Section title="بيانات السيارة">
          <InputField
            label="رقم اللوحة *"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            required
          />
          <InputField
            label="نوع السيارة *"
            name="carMake"
            value={formData.carMake}
            onChange={handleChange}
            required
          />
          <InputField
            label="موديل السيارة"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
          />
          <InputField
            label="لون السيارة *"
            name="carColor"
            value={formData.carColor}
            onChange={handleChange}
            required
          />
        </Section>

        {/* Officer Information */}
        <Section title="بيانات الضابط المستضيف">
          <InputField
            label="اسم الضابط *"
            name="officerName"
            value={formData.officerName}
            onChange={handleChange}
            required
          />
          <InputField
            label="الرتبة *"
            name="officerRank"
            value={formData.officerRank}
            onChange={handleChange}
            required
          />
          <InputField
            label="الرقم العسكري *"
            name="militaryId"
            value={formData.militaryId}
            onChange={handleChange}
            required
          />
          <InputField
            label="تاريخ انتهاء البطاقة *"
            name="cardExpiry"
            type="date"
            value={formData.cardExpiry}
            onChange={handleChange}
            required
          />
          <InputField
            label="الوحدة/القسم *"
            name="officerDivision"
            value={formData.officerDivision}
            onChange={handleChange}
            required
          />
          <InputField
            label="موقع المكتب"
            name="officeLocation"
            value={formData.officeLocation}
            onChange={handleChange}
          />
          <InputField
            label="رقم الهاتف"
            name="officerPhone"
            type="tel"
            value={formData.officerPhone}
            onChange={handleChange}
          />
        </Section>

        {/* Visit Information */}
        <Section title="تفاصيل الزيارة">
          <InputField
            label="سبب الزيارة *"
            name="visitPurpose"
            value={formData.visitPurpose}
            onChange={handleChange}
            type="textarea"
            required
          />
          <InputField
            label="تاريخ الزيارة *"
            name="visitDuration"
            type="date"
            value={formData.visitDuration}
            readOnly
            required
          />
          {/* <option value="">اختر تاريخ الزيارة</option>
            {[...Array(6)].map((_, i) => (
              <option key={i} value={i + 1}>{`${i + 1} ساعة${
                i + 1 > 1 ? "س" : ""
              }`}</option>
            ))} */}
          {/* </SelectField> */}
        </Section>

        {/* Form Control Buttons */}
        <div style={buttonContainerStyle}>
          <button type="submit" style={submitButtonStyle}>
            {editIndex !== null ? "تحديث الزيارة" : "تسجيل الزيارة"}
          </button>
          <button type="button" onClick={handleReset} style={resetButtonStyle}>
            مسح البيانات
          </button>
        </div>
      </form>

      {/* List of Visitors */}
      <Section title="الزيارات المسجلة">
        {visitors.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">لا توجد زيارات مسجلة</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {visitors.map((visitor, index) => (
              <li
                key={index}
                className="py-4 px-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-800">
                    {visitor.visitorName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {visitor.civilId}
                  </span>
                </div>
                <button
                  onClick={() => handleEdit(index)}
                  className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelte(index)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
};

// Individual Section component
const Section = ({ title, children }) => (
  <div style={sectionStyle}>
    <h3 style={sectionTitleStyle}>{title}</h3>
    <div style={gridStyle}>{children}</div>
  </div>
);

// Reusable InputField component
const InputField = ({ label, type = "text", ...props }) => (
  <div style={inputGroupStyle}>
    <label style={labelStyle}>{label}</label>
    {type === "textarea" ? (
      <textarea style={{ ...inputStyle, minHeight: "100px" }} {...props} />
    ) : (
      <input type={type} style={inputStyle} {...props} />
    )}
  </div>
);

// Reusable SelectField component
const SelectField = ({ label, children, ...props }) => (
  <div style={inputGroupStyle}>
    <label style={labelStyle}>{label}</label>
    <select style={inputStyle} {...props}>
      {children}
    </select>
  </div>
);

// Styles
const containerStyle = {
  maxWidth: "1000px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  direction: "rtl",
};
const headerStyle = {
  textAlign: "center",
  color: "#333",
  marginBottom: "30px",
};
const sectionStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};
const sectionTitleStyle = {
  color: "#333",
  borderBottom: "2px solid #007bff",
  paddingBottom: "10px",
  marginBottom: "20px",
};
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "14px",
};
const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
};
const submitButtonStyle = {
  flex: "3",
  padding: "12px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};
const resetButtonStyle = {
  flex: "1",
  padding: "12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

export default GuardVisitorForm;
