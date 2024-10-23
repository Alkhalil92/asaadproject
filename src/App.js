import React, { useState, useEffect } from 'react';

const App = () => {
  const loadVisitors = () => {
    const savedVisitors = localStorage.getItem('visitors');
    return savedVisitors
      ? JSON.parse(savedVisitors)
      : [
          {
            id: 'V001',
            name: 'محمد أحمد',
            type: 'كبار القادة',
            status: 'نشط',
            startTime: '2024-01-23 09:00',
            expectedDuration: '2',
            hostOfficer: 'العقيد سعيد',
            hostUnit: 'وحدة التدريب',
            purpose: 'اجتماع تنسيقي',
          },
          {
            id: 'V002',
            name: 'أحمد علي',
            type: 'ضباط',
            status: 'مجدول',
            startTime: '2024-01-24 10:00',
            expectedDuration: '3',
            hostOfficer: 'المقدم خالد',
            hostUnit: 'وحدة التطوير',
            purpose: 'متابعة مشروع',
          },
        ];
  };

  const [visitors, setVisitors] = useState(loadVisitors);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [newVisitor, setNewVisitor] = useState({
    name: '',
    type: '',
    startTime: '',
    hostOfficer: '',
    purpose: '',
    status: 'نشط', // Default status for a new visitor
  });
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  // Save visitors to localStorage whenever the visitors state changes
  useEffect(() => {
    localStorage.setItem('visitors', JSON.stringify(visitors));
  }, [visitors]);

  // Add new visitor handler
  const handleAddVisitor = (e) => {
    e.preventDefault();
    const newId = `V${(visitors.length + 1).toString().padStart(3, '0')}`;
    const updatedVisitors = [
      ...visitors,
      { ...newVisitor, id: newId, expectedDuration: '1' },
    ];
    setVisitors(updatedVisitors);
    setNewVisitor({
      name: '',
      type: '',
      startTime: '',
      hostOfficer: '',
      purpose: '',
      status: 'نشط',
    });
  };

  // Delete visitor handler
  const handleDeleteVisitor = (id) => {
    const updatedVisitors = visitors.filter((visitor) => visitor.id !== id);
    setVisitors(updatedVisitors);
  };

  // Edit visitor handler
  const handleEditVisitor = (visitor) => {
    setEditingVisitor(visitor);
  };

  // Update visitor handler
  const handleUpdateVisitor = (e) => {
    e.preventDefault();
    const updatedVisitors = visitors.map((visitor) =>
      visitor.id === editingVisitor.id ? editingVisitor : visitor
    );
    setVisitors(updatedVisitors);
    setEditingVisitor(null);
  };

  const renderDashboard = () => {
    const stats = {
      totalVisits: visitors.length,
      activeVisits: visitors.filter((v) => v.status === 'نشط').length,
      commanderVisits: visitors.filter((v) => v.type === 'كبار القادة').length,
      officerVisits: visitors.filter((v) => v.type === 'ضباط').length,
    };

    return (
      <div style={{ padding: '20px' }}>
        <h2>لوحة التحكم</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div style={statCardStyle}>
            <h3>إجمالي الزيارات</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
              {stats.totalVisits}
            </p>
          </div>
          <div style={statCardStyle}>
            <h3>الزيارات النشطة</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {stats.activeVisits}
            </p>
          </div>
          <div style={statCardStyle}>
            <h3>زيارات القادة</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
              {stats.commanderVisits}
            </p>
          </div>
          <div style={statCardStyle}>
            <h3>زيارات الضباط</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.officerVisits}
            </p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>الزيارات</h3>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="filterStatus">تصفية حسب الحالة:</label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">الكل</option>
              <option value="نشط">نشط</option>
              <option value="مجدول">مجدول</option>
            </select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>الزائر</th>
                <th style={tableHeaderStyle}>النوع</th>
                <th style={tableHeaderStyle}>الحالة</th>
                <th style={tableHeaderStyle}>الموعد</th>
                <th style={tableHeaderStyle}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {visitors
                .filter((v) => (filterStatus ? v.status === filterStatus : true))
                .map((visitor) => (
                  <tr key={visitor.id}>
                    <td style={tableCellStyle}>{visitor.name}</td>
                    <td style={tableCellStyle}>{visitor.type}</td>
                    <td style={tableCellStyle}>{visitor.status}</td>
                    <td style={tableCellStyle}>{visitor.startTime}</td>
                    <td style={tableCellStyle}>
                      <button
                        onClick={() => handleEditVisitor(visitor)}
                        style={{
                          marginLeft: '8px',
                          padding: '6px 12px',
                          backgroundColor: '#ffc107',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteVisitor(visitor.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderVisitorManagement = () => (
    <div style={{ padding: '20px' }}>
      <h2>إدارة الزيارات</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>{editingVisitor ? 'تعديل زائر' : 'إضافة زائر جديد'}</h3>
        <form onSubmit={editingVisitor ? handleUpdateVisitor : handleAddVisitor} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          <input
            type="text"
            placeholder="اسم الزائر"
            value={editingVisitor ? editingVisitor.name : newVisitor.name}
            onChange={(e) =>
              editingVisitor
                ? setEditingVisitor({ ...editingVisitor, name: e.target.value })
                : setNewVisitor({ ...newVisitor, name: e.target.value })
            }
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
          <select
            value={editingVisitor ? editingVisitor.type : newVisitor.type}
            onChange={(e) =>
              editingVisitor
                ? setEditingVisitor({ ...editingVisitor, type: e.target.value })
                : setNewVisitor({ ...newVisitor, type: e.target.value })
            }
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          >
            <option value="">نوع الزيارة</option>
            <option value="كبار القادة">كبار القادة</option>
            <option value="ضباط">ضباط</option>
          </select>
          <input
            type="datetime-local"
            value={editingVisitor ? editingVisitor.startTime : newVisitor.startTime}
            onChange={(e) =>
              editingVisitor
                ? setEditingVisitor({ ...editingVisitor, startTime: e.target.value })
                : setNewVisitor({ ...newVisitor, startTime: e.target.value })
            }
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
          <input
            type="text"
            placeholder="الضابط المستضيف"
            value={editingVisitor ? editingVisitor.hostOfficer : newVisitor.hostOfficer}
            onChange={(e) =>
              editingVisitor
                ? setEditingVisitor({ ...editingVisitor, hostOfficer: e.target.value })
                : setNewVisitor({ ...newVisitor, hostOfficer: e.target.value })
            }
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
          <textarea
            placeholder="الغرض من الزيارة"
            value={editingVisitor ? editingVisitor.purpose : newVisitor.purpose}
            onChange={(e) =>
              editingVisitor
                ? setEditingVisitor({ ...editingVisitor, purpose: e.target.value })
                : setNewVisitor({ ...newVisitor, purpose: e.target.value })
            }
            style={{
              gridColumn: 'span 2',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              height: '100px',
            }}
            required
          />
          <button
            type="submit"
            style={{
              gridColumn: 'span 2',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {editingVisitor ? 'تحديث الزيارة' : 'تسجيل الزيارة'}
          </button>
        </form>
      </div>
    </div>
  );

  const statCardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'right',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f8f9fa',
  };

  const tableCellStyle = {
    padding: '12px',
    textAlign: 'right',
    borderBottom: '1px solid #ddd',
  };

  const sidebarButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    width: '100%',
    textAlign: 'right',
    padding: '10px',
    cursor: 'pointer',
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'visitors':
        return renderVisitorManagement();
      default:
        return renderDashboard();
    }
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '250px',
          height: '100vh',
          backgroundColor: '#343a40',
          color: 'white',
          padding: '20px',
        }}
      >
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>نظام إدارة الزوار</h2>
        <nav>
          <button onClick={() => setCurrentPage('dashboard')} style={sidebarButtonStyle}>
            لوحة التحكم
          </button>
          <button onClick={() => setCurrentPage('visitors')} style={sidebarButtonStyle}>
            إدارة الزيارات
          </button>
        </nav>
      </div>
      <div style={{ marginRight: '250px', padding: '20px' }}>{renderContent()}</div>
    </div>
  );
};

export default App;
