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
import useLoadingStore from "@/context/store/useLoadingStore";
import { MdErrorOutline } from "react-icons/md";
import { X } from "lucide-react";
import { HiOutlineSignalSlash } from "react-icons/hi2";

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

interface Testimonial {
  _id: string;
  name: string;
  testimonial: string;
  image: string;
  designation: string;
  status: "approved" | "pending" | "rejected";
  email: string;
}

interface DatabaseStatus {
  isDown: boolean;
  displayMessage: boolean;
}

const Home = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projectImages, setProjectImages] = useState<ProjectImages[]>([]);
  const [specialProjects, setSpecialProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [about, setAbout] = useState<About>();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDatabaseDown, setIsDatabaseDown] = useState<DatabaseStatus>({
    isDown: false,
    displayMessage: false,
  });
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  //Fetching skills from the backend
  const fetchSkills = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB_URL}/api/skills`);
      // CHECK THIS: fetch only throws on network failure, not server errors
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error("fetchSkills Error:", error);
      throw error;
    }
  };

  //Fetching all the projects from the backend
  // const filterProjects = (projects: Project[]) => {
  //   return projects.filter((p) => !p.isSpecial);
  // };

  const getProjectImages = (projects: Project[]): ProjectImages[] => {
    return projects.flatMap((project) => {
      const allUrls = [project.coverImage, ...project.images];

      return allUrls.map((url) => ({
        thumbnail: url,
      }));
    });
  };
  // const filterSpecialProjects = (projects: Project[]) => {
  //   return projects.filter((p) => p.isSpecial);
  // };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB_URL}/api/projects`);
      if (!res.ok)
        throw new Error(`Server responded with status: ${res.status}`);

      const data: Project[] = await res.json();

      // 1. Filter for the "Remaining" projects section
      const normalOnes = data.filter((p) => !p.isSpecial);

      // 2. Filter for the Carousel
      const specialOnes = data.filter((p) => p.isSpecial);

      // 3. Get all images for HeroParallax
      const imagesForParallax = getProjectImages(data);

      setAllProjects(normalOnes);
      setSpecialProjects(specialOnes);
      setProjectImages(imagesForParallax);
    } catch (error) {
      console.log("Error fetching projects:", error);
      throw error;
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB_URL}/api/services`);
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.log("Error fetching services:", error);
      throw error;
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB_URL}/api/about`);
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      setAbout(data);
    } catch (error) {
      console.log("Error fetching about:", error);
      throw error;
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/testimonials`,
      );
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.log("Error fetching testimonials:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        startLoading();
        setIsDatabaseDown({
          isDown: false,
          displayMessage: false,
        }); // Reset before trying

        // If any of these fail, it will jump to the catch block
        await Promise.all([
          fetchProjects(),
          fetchSkills(),
          fetchServices(),
          fetchAbout(),
          fetchTestimonials(),
        ]);
      } catch (error) {
        console.error("Critical data fetch failed:", error);
        setIsDatabaseDown({
          isDown: true,
          displayMessage: true,
        }); // Show your banner
      } finally {
        stopLoading();
      }
    };

    loadData();
  }, []);

  return (
    <>
      {isDatabaseDown.isDown && isDatabaseDown.displayMessage && (
        <div className="p-3 m-5 flex items-center  gap-2 z-[99999] bg-red-700/20 rounded-2xl border border-red-700  fixed bottom-5 ">
          <MdErrorOutline size={20} color="red" className="hidden sm:block" />
          <HiOutlineSignalSlash size={20} color="red" className="sm:hidden" />

          <p className="text-sm hidden sm:block text-white">
            Failed to fetch data. Please try again later.
          </p>

          <X
            className="text-white cursor-pointer size-3 sm:size-4"
            onClick={() =>
              setIsDatabaseDown((prev) => ({ ...prev, displayMessage: false }))
            }
          />
        </div>
      )}
      <div className="z-10 ">
        <ScrollUpButton />
        <Hero />

        <IntroSection about={about} />
        <IntroSummary />
        <SkillsSection skills={skills} />
        {/* 1. Hero Parallax: Uses images from ALL projects */}
        {projectImages.length > 0 && (
          <HeroParallaxDemo projects={projectImages} />
        )}

        <Services services={services} />
        <ProjectsHeading />

        {/* 2. Carousel: Only shows if there are Special projects */}
        {specialProjects.length > 0 ? (
          <ProjectCarousel specialProjects={specialProjects} />
        ) : (
          allProjects.length === 0 && (
            <div className="flex items-center justify-center my-10 gap-5">
              <p>Loading projects...</p>
              <span className="loader"></span>
            </div>
          )
        )}

        {/* 3. Projects Section: Shows the non-special projects */}
        {allProjects.length > 0 && (
          <ProjectsSection filteredProjects={allProjects} />
        )}
        <AnimatedTestimonialsDemo testimonials={testimonials} />
        <ContactForm />
      </div>
    </>
  );
};

export default Home;
