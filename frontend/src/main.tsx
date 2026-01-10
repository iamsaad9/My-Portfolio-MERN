import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import App from "./App.tsx";
import { Header } from "./components/Sections/NavBar.tsx";
import Footer from "./components/Sections/Footer.tsx";
import Loader from "./components/ui/Loader.tsx";
import LoginForm from "./components/Sections/LoginForm.tsx";
import TestimonialForm from "./components/Sections/TestimonialForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Loader />
        <LoginForm />
        <TestimonialForm />
        <Header />
        <App />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
