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

interface ServicesProps {
  services: ServiceItem[];
}

interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

function Services({ services }: ServicesProps) {
  return (
    <div id="services" className="w-full py-10 mt-10 relative overflow-hidden">
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

        {services.length !== 0 ? (
          <div className="w-full p-6 flex justify-center ">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {services.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full lg:basis-1/2 xl:basis-1/2 2xl:basis-1/3"
                  >
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
        ) : (
          <div className="flex items-center justify-center h-full w-full gap-5 my-10">
            <p className="text-base sm:text-xl">
              Something doesnt seem right...
            </p>
            <span className="loader"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
