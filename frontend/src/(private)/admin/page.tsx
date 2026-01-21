"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust path as needed
import AboutForm from "@/components/Admin/AboutForm";
import SkillsForm from "@/components/Admin/SkillsForm";
import { Tabs, Tab } from "@heroui/react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectManagementForm from "@/components/Admin/ProjectForm";
import ServicesManager from "@/components/Admin/ServicesForm";
import { LuMessageSquareQuote } from "react-icons/lu";
import { CiPalette } from "react-icons/ci";
import { GoProjectRoadmap } from "react-icons/go";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import TestimonialsTable from "@/components/Admin/TestimonialTable";

export default function Admin() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If loading is finished and user is not an admin, redirect
    if (!auth?.loading) {
      if (!auth?.user || auth.user.role !== "admin") {
        navigate("/admin/login");
      }
    }
  }, [auth?.user, auth?.loading, navigate]);

  if (auth?.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!auth?.user || auth.user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex w-full flex-col mt-20 xl:mt-24 px-5 max-w-7xl mx-auto">
      <Tabs color="default" aria-label="Options" className="dark">
        <Tab
          key="about"
          title={
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>About</span>
            </div>
          }
        >
          <AboutForm />
        </Tab>
        <Tab
          key="skills"
          title={
            <div className="flex items-center space-x-2">
              <LiaProjectDiagramSolid size={16} />
              <span>Skills</span>
            </div>
          }
        >
          <SkillsForm />
        </Tab>

        <Tab
          key="projects"
          title={
            <div className="flex items-center space-x-2">
              <GoProjectRoadmap size={16} />
              <span>Projects</span>
            </div>
          }
        >
          <ProjectManagementForm />
        </Tab>

        <Tab
          key="services"
          title={
            <div className="flex items-center space-x-2">
              <CiPalette size={16} />
              <span>Services</span>
            </div>
          }
        >
          <ServicesManager />
        </Tab>

        <Tab
          key="testimonials"
          title={
            <div className="flex items-center space-x-2">
              <LuMessageSquareQuote size={16} />
              <span>Testimonials</span>
            </div>
          }
        >
          <TestimonialsTable />
        </Tab>
      </Tabs>
    </div>
  );
}
