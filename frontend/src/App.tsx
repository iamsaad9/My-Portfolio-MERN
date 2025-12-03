import Hero from "./components/Sections/Hero";
import { Header } from "./components/Sections/NavBar";
import IntroSection from "./components/Sections/IntroSection";
import IntroSummary from "./components/Sections/IntroSummary";
import SkillsSection from "./components/Sections/SkillsSection";
import { HeroParallaxDemo } from "./components/Sections/HeroParalax";
import Services from "./components/Sections/ServicesSection";
import ProjectsHeading from "./components/ui/ProjectHeading";
import ProjectCarousel from "./components/Sections/ProjectCarousal";
import ProjectsSection from "./components/Sections/Projects";
import { AnimatedTestimonialsDemo } from "./components/Sections/Testimonials";
import ContactForm from "./components/Sections/ContactSection";
import Footer from "./components/Sections/Footer";
import ScrollUpButton from "./components/ui/ScrollUpButton";

function App() {
  return (
    <div className="z-10">
      <ScrollUpButton />
      <Header />
      <Hero />
      <IntroSection />
      <IntroSummary />
      <SkillsSection />
      <HeroParallaxDemo />
      <Services />
      <ProjectsHeading />
      <ProjectCarousel />
      <ProjectsSection />
      <AnimatedTestimonialsDemo />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
