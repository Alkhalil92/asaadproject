import AfterLoggedIn from "./Components/AfterLoggedIn";
import LoginPage from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuardVisitorForm from "./Components/VisitorManagement";
import Dashboard from "./Components/Dashboard";
import VisitTable from "./Components/VisitTable";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<AfterLoggedIn />} />
        <Route path="/visitors" element={<GuardVisitorForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/VisitTable" element={<VisitTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;