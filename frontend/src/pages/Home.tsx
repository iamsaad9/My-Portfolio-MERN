import ContactForm from "@/components/Sections/ContactSection";
import Hero from "@/components/Sections/Hero";
import { HeroParallaxDemo } from "@/components/Sections/HeroParalax";
import IntroSection from "@/components/Sections/IntroSection";
import IntroSummary from "@/components/Sections/IntroSummary";
import ProjectCarousel from "@/components/Sections/ProjectCarousal";
import ProjectsSection from "@/components/Sections/Projects";
import Services from "@/components/Sections/ServicesSection";
import SkillsSection from "@/components/Sections/SkillsSection";
import { AnimatedTestimonialsDemo } from "@/components/Sections/Testimonials";
import ProjectsHeading from "@/components/ui/ProjectHeading";
import ScrollUpButton from "@/components/ui/ScrollUpButton";
import { useEffect, useState } from "react";
import { da } from "zod/v4/locales";

interface Project {
  title: string;
  description: string;
  gitHubLink?: string;
  vercelLink?: string;
  coverImage: string;
  images: string[];
  isSpecial: boolean;
  techStack: string[];
  startedAt?: string;
  endedAt?: string;
}

interface Skills {
  title: string;
  logo: string;
  description: string;
}

interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

interface About {
  bio: string;
  imageUrl: string;
  resumeUrl: string;
}

interface ProjectImages {
  thumbnail: string;
}

const Home = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projectImages, setProjectImages] = useState<ProjectImages[]>([]);
  const [specialProjects, setSpecialProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [about, setAbout] = useState<About>();

  //Fetching skills from the backend
  const fetchSkills = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/skills");
      const data = await res.json();
      console.log("Fetched skills:", data);
      setSkills(data);
    } catch (error) {
      console.log("Error fetching skills:", error);
    }
  };

  //Fetching all the projects from the backend
  const filterProjects = (projects: Project[]) => {
    return projects.filter((p) => !p.isSpecial);
  };

  const getProjectImages = (projects: any[]): ProjectImages[] => {
    return projects.flatMap((project) => {
      // Combine coverImage and the images array into one flat list of objects
      const allUrls = [project.coverImage, ...project.images];

      return allUrls.map((url) => ({
        thumbnail: url, // Wrap each URL in the object structure required
      }));
    });
  };
  const filterSpecialProjects = (projects: Project[]) => {
    return projects.filter((p) => p.isSpecial);
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/projects");
      const data = await res.json();
      console.log("Fetched projects:", data);
      const filteredProjects = filterProjects(data);
      const specialProjects = filterSpecialProjects(data);
      setAllProjects(filteredProjects);
      setSpecialProjects(specialProjects);
      setProjectImages(getProjectImages(data));
      console.log("Project images:", getProjectImages(data));
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/services");
      const data = await res.json();
      console.log("Fetched services:", data);
      setServices(data);
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/about");
      const data = await res.json();
      console.log("Fetched about:", data);
      setAbout(data);
    } catch (error) {
      console.log("Error fetching about:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchServices();
    fetchAbout();
  }, []);

  return (
    <div className="z-10">
      <ScrollUpButton />
      <Hero />
      <IntroSection about={about} />
      <IntroSummary />
      <SkillsSection skills={skills} />
      <HeroParallaxDemo projects={projectImages} />
      <Services services={services} />
      <ProjectsHeading />
      <ProjectCarousel specialProjects={specialProjects} />
      <ProjectsSection filteredProjects={allProjects} />
      <AnimatedTestimonialsDemo />
      <ContactForm />
    </div>
  );
};

export default Home;
