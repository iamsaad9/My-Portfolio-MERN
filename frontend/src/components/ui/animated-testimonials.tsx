"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../index.css";
import { useContext, useEffect, useState } from "react";
import Shuffle from "./shadcn-io/shuffle";
import useLoginStore from "@/context/store/useLoginStore";
import { AuthContext } from "../../context/AuthContext";
import useModalStore from "@/context/store/useModalStore";
import { MdEditNote } from "react-icons/md";

interface Testimonial {
  _id: string;
  name: string;
  email: string;
  testimonial: string;
  image: string;
  designation: string;
  status: "approved" | "pending" | "rejected";
}

export const AnimatedTestimonials = ({
  testimonials = [],
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const { showlogin } = useLoginStore();
  const auth = useContext(AuthContext);
  const { openModal } = useModalStore();
  const user = auth?.user;

  // Filter approved ones
  const approvedTestimonials = testimonials.filter(
    (t) => t.status === "approved",
  );

  const handleNext = () => {
    if (approvedTestimonials.length > 0) {
      setActive((prev) => (prev + 1) % approvedTestimonials.length);
    }
  };

  const handlePrev = () => {
    if (approvedTestimonials.length > 0) {
      setActive(
        (prev) =>
          (prev - 1 + approvedTestimonials.length) %
          approvedTestimonials.length,
      );
    }
  };

  const isActive = (index: number) => index === active;

  const handleOpenForm = () => {
    if (user) {
      openModal(false);
    } else {
      showlogin(true);
    }
  };

  const handleUpdateForm = (_id: string) => {
    openModal(true, _id);
  };

  useEffect(() => {
    if (autoplay && approvedTestimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, approvedTestimonials.length, handleNext]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  // Render Logic Helpers
  const hasDataAtAll = testimonials.length > 0;
  const userTestimonial = approvedTestimonials.find(
    (t) => t.email === auth?.user?.email,
  );
  const hasAlreadySubmitted = !!userTestimonial;

  return (
    <div className=" w-[90%] overflow-hidden sm:mx-auto md:max-w-3xl p-5 lg:py-10 font-sans antialiased lg:min-w-4xl md:px-8 lg:px-12 bg-black/50 z-1 border border-white/50 rounded-2xl my-5">
      <div className="flex justify-between items-center text-center mb-10">
        <Shuffle
          text="Testimonials"
          className="text-foreground"
          style={{
            fontSize: "clamp(1.2rem, 6vw, 2rem)",
            fontFamily: "inherit",
          }}
        />
        {user ? (
          /* LOGGED IN VIEW */
          approvedTestimonials?.[active]?.email === user.email ? (
            /* 1. User is looking at their own testimonial -> Edit */
            <MdEditNote
              size={30}
              className="cursor-pointer hover:scale-115 hover:text-white/70 transition-all duration-200"
              onClick={() => handleUpdateForm(approvedTestimonials[active]._id)}
            />
          ) : !hasAlreadySubmitted ? (
            /* 2. User hasn't submitted yet (or is looking at someone else's) -> Create */
            <CreateButton onClick={handleOpenForm} />
          ) : null
        ) : (
          /* LOGGED OUT VIEW */
          <CreateButton onClick={handleOpenForm} />
        )}
      </div>

      {!hasDataAtAll ? (
        <div className="flex flex-col items-center justify-center py-10  border-white/20 rounded-xl">
          <p className="text-lg text-white/80 mb-4 text-center">
            No approved testimonials yet. <br /> Be the first to leave one!
          </p>
        </div>
      ) : (
        /* CASE 3: Normal Display */
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex items-center justify-center">
            {/* Parent Container: 
        - aspect-square ensures it remains a perfect box for stacking 
        - w-full ensures it fills the 50% column provided by the grid
    */}
            <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[350px] md:max-w-full flex items-center justify-center">
              <AnimatePresence>
                {approvedTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.image}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : approvedTestimonials.length + 2 - index,
                      y: isActive(index) ? [0, -40, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    /* The Card: 
               - Uses absolute inset-0 to fill the aspect-square parent
               - No more hardcoded pixel widths that exceed the parent grid
            */
                    className="absolute inset-0 w-full h-full origin-bottom"
                  >
                    <img
                      src={
                        testimonial.image
                          ? testimonial.image
                          : "/assets/pictures/defaultAvatar.jpg"
                      }
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full rounded-2xl md:rounded-3xl object-cover object-top shadow-2xl border border-white/10"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col justify-between md:px-5 gap-2">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-bold text-white">
                {approvedTestimonials[active]?.name}
              </h3>
              <p className="text-sm text-gray-500">
                {approvedTestimonials[active]?.designation}
              </p>
              <motion.p
                className=" mt-8 h-20  md:h-40 overflow-auto text-lg text-white"
                id="feedbackDiv"
              >
                {approvedTestimonials[active]?.testimonial
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block text-sm md:text-base"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
              </motion.p>
            </motion.div>
            <div className="flex gap-4 pt-5 sm:pt-10 md:pt-0">
              <button
                onClick={handlePrev}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 cursor-pointer"
              >
                <IconArrowLeft className="h-5 w-5 text-neutral-400 transition-transform duration-300 group-hover/button:rotate-12" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 cursor-pointer"
              >
                <IconArrowRight className="h-5 w-5 text-neutral-400 transition-transform duration-300 group-hover/button:-rotate-12" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CreateButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group flex items-center justify-start w-[35px] h-[35px] rounded-full border-none cursor-pointer relative overflow-hidden shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 hover:w-[120px] active:translate-x-[2px] active:translate-y-[2px]"
  >
    <div className="sign flex items-center justify-center w-full text-white text-[2.2em] transition-all duration-300 group-hover:w-[35%]">
      +
    </div>
    <div className="text absolute right-0 w-0 opacity-0 text-white text-[1.2em] font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:w-[60%] group-hover:pr-[10px] whitespace-nowrap">
      Create
    </div>
  </button>
);
