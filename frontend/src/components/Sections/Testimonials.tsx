import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { BackgroundBeams } from "../ui/background-beams";

interface Testimonial {
  _id: string;
  name: string;
  testimonial: string;
  image: string;
  designation: string;
  email: string;
  status: "approved" | "pending" | "rejected";
}

export function AnimatedTestimonialsDemo({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div
      id="testimonials"
      className="relative py-20 flex flex-col gap-5 w-full"
    >
      <BackgroundBeams />
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
