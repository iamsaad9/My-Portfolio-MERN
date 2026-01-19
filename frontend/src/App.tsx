import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import AdminLoginPage from "./(private)/admin/login/page";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Admin from "./(private)/admin/page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
