"use client";
import { HeroParallax } from "../ui/hero-parallax";

interface ProjectImages {
  thumbnail: string;
}

export function HeroParallaxDemo({ projects }: { projects: ProjectImages[] }) {
  return <HeroParallax projects={projects} />;
}
