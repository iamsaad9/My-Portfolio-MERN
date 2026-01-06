import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "./(private)/admin/login/page";
import Admin from "./(private)/admin/page";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
