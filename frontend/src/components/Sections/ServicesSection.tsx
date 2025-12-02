"use client";
import { motion } from "framer-motion";
import { GradientText } from "../ui/shadcn-io/gradient-text";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ThreeDCardDemo } from "../ui/3dCard";
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid";

function Services() {
  //   const services = [
  //     {
  //       title: "Web Development",
  //       description: ".",
  //       image: "/images/Services/website.jpg",
  //     },
  //     {
  //       title: "Web Applications",
  //       description: ".",
  //       image: "/images/Services/web_app.jpg",
  //     },
  //     {
  //       title: "Portfolio Design",
  //       description:
  //         "Designing personalized and professional portfolio websites.",
  //       image: "/images/Services/portfolio.jpg",
  //     },
  //   ];
  //   const testCardData = [
  //     {
  //       cardTitle: "Floating Forest Retreat",
  //       cardDescription:
  //         "Experience tranquility by hovering over the digital forest. This card showcases stunning parallax effects.",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       linkText: "View Gallery",
  //       linkUrl: "https://example.com/gallery",
  //       buttonText: "Book Now",
  //       buttonClass: "bg-blue-600 dark:bg-blue-600 dark:text-white",
  //     },
  //     {
  //       cardTitle: "The Digital Ocean",
  //       cardDescription:
  //         "Dive into the depths of modern UI design. A seamless blend of depth and motion for a captivating user experience.",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1510214040902-60195e33d4ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       linkText: "Learn More",
  //       linkUrl: "https://example.com/details",
  //       buttonText: "Discover",
  //     },
  //     {
  //       cardTitle: "Abstract Geometric Art",
  //       cardDescription:
  //         "A testament to minimal yet dynamic design. Explore how simple shapes can create complex visual depth.",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       linkText: "Explore Project",
  //       linkUrl: "https://example.com/project",
  //       buttonText: "See Demo",
  //       buttonClass: "bg-green-600 dark:bg-green-600 dark:text-white",
  //     },
  //     {
  //       cardTitle: "Urban Nightscape",
  //       cardDescription:
  //         "Bringing the city lights to your screen. The perspective changes draw you right into the bustling metropolis.",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1515437877232-a5f1a56111f2?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       linkText: "Contact Us",
  //       linkUrl: "https://example.com/contact",
  //       buttonText: "Get Started",
  //     },
  //     // Add more items here if needed
  //   ];

  return (
    <div className="w-full py-10 mt-10 relative overflow-hidden">
      <img
        loading="lazy"
        src="/images/brand_shape.png.webp"
        alt=""
        className="absolute right-0 bottom-0 -z-10"
      />
      <div className="relative w-full flex flex-col sm:flex-row justify-around items-center p-5  sm:p-15  gap-10">
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={4}
          gridGap={6}
          flickerChance={0.1}
          color="white"
          maxOpacity={0.2}
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }} // hidden state (off screen left)
          whileInView={{ opacity: 1, x: 0 }} // animate into view
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0 }}
          className={`w-full sm:w-[40%] lg:w-[40%] xl:w-[30%] flex items-center justify-center gap-5`}
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[--text] leading-snug"
            style={{ fontFamily: "Lora, serif" }}
          >
            MAKE YOUR WORK ELEGENT AND CREATIVE
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }} // hidden state (off screen left)
          whileInView={{ opacity: 1, x: 0 }} // animate into view
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full sm:w-[40%] xl:w-[20%] flex flex-col items-center justify-center gap-5"
        >
          <span className="text-sm sm:text-base lg:text-lg xl:text-xl text-start italic">
            &quot;You can’t use up creativity. The more you use, the more you
            have in your significant mind.&quot;
          </span>
          <span className="text-xs sm:text-sm md:text-base font-semibold self-start">
            - <GradientText text="SALVADOR DALI" />
          </span>

          <div className="flex gap-5 sm:gap-10 self-end sm:self-start items-center justify-between sm:justify-center w-[70%]">
            <h1
              className={`text-7xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold `}
              style={{ fontFamily: "Lora, serif" }}
            >
              02
            </h1>
            <p className="text-lg sm:text-sm md:text-lg font-bold">
              YEARS OF DIGITAL EXPERIENCE
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full flex-col p-5 flex items-center justify-center sm:pb-10 gap-5 ">
        <span className="text-xl sm:text-2xl border-b-2 border-(--theme) uppercase font-light py-2">
          services provided
        </span>
        {/* <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-5 lg:gap-10"></div> */}
        <div className="w-full p-6 flex justify-center ">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ThreeDCardDemo item={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Services;

const items = [
  {
    title: "Website Development",
    description: "Building responsive and dynamic websites frontends",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
  {
    title: "Personal Portfolios",
    description: "Designing personalized and professional portfolio websites",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    buttonText: "Learn More",
    linkText: "Get Started",
    linkUrl: "/signup",
  },
  {
    title: "Web Applications",
    description: "Creating interactive Ui and frontend for web applications",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    buttonText: "Learn More",
    linkText: "Get Started",
    linkUrl: "/signup",
  },
  {
    title: "Landing Pages",
    description:
      "Developing high-converting landing pages for marketing campaigns",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    buttonText: "Learn More",
    linkText: "Get Started ->",
    linkUrl: "/signup",
  },
];
