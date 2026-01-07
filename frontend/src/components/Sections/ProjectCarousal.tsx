import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "../ui/ProjectCard";

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

interface ProjectCarouselProps {
  specialProjects: Project[];
}

export default function ProjectCarousel({
  specialProjects,
}: ProjectCarouselProps) {
  return (
    <div className="w-full p-10 flex justify-center">
      <Carousel className="w-full">
        <CarouselContent>
          {specialProjects.map((p, index) => (
            <CarouselItem key={index} className="">
              <ProjectCard project={p} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
