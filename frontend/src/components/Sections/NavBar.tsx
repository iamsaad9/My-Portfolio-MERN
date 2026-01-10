import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { GoProjectRoadmap, GoHome } from "react-icons/go";
import { MdCall, MdLogout } from "react-icons/md";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { CiPalette } from "react-icons/ci";
import { LuMessageSquareQuote } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export const Header = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const setUser = auth?.setUser;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  console.log("Current User:", user);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });

      if (setUser) setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex justify-center w-full">
        <nav
          className="mx-auto rounded-full border border-white/20 my-4 fixed flex items-center z-50 bg-black/20 shadow-xl"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <ul
            className={`flex items-center p-1 px-5 ${user ? "gap-1" : "gap-4"}`}
          >
            {/* 1. USER PROFILE SECTION (Only shows if logged in) */}
            {user && (
              <li className="flex items-center gap-2 pr-4 mr-2 border-r border-white/10">
                <img
                  src={user.avatar}
                  className="w-7 h-7 rounded-full border border-white/20"
                  alt="avatar"
                />
                <span className="text-xs font-medium text-white/80 hidden sm:block">
                  {user.name.split(" ")[0]}
                </span>
              </li>
            )}

            {/* 2. NAVIGATION LINKS */}
            {[
              { href: "/", icon: <GoHome size={19} />, label: "Home" },
              {
                href: "#skills",
                icon: <LiaProjectDiagramSolid size={19} />,
                label: "Skills",
              },
              {
                href: "#services",
                icon: <CiPalette size={19} />,
                label: "Services",
              },
              {
                href: "#projects",
                icon: <GoProjectRoadmap size={19} />,
                label: "Projects",
              },
              {
                href: "#testimonials",
                icon: <LuMessageSquareQuote size={19} />,
                label: "Testimonials",
              },
              {
                href: "#contact",
                icon: <MdCall size={19} />,
                label: "Contact",
              },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="p-2.5  rounded-full block cursor-pointer hover:bg-white/10 hover:scale-110 transition-all duration-200 text-white/90 hover:text-white"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{item.icon}</span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </a>
              </li>
            ))}

            {/* 3. AUTH BUTTON SECTION */}
            {user && (
              <li className="ml-2 pl-3 border-l border-white/10 relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowLogoutModal(!showLogoutModal)}
                      className="cursor-pointer uppercase tracking-wider font-bold bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-full transition-all border border-red-500/30"
                    >
                      <MdLogout size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>

                {showLogoutModal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 absolute flex items-center justify-center flex-col rounded-2xl bg-(--bg-primary) p-3 gap-2"
                  >
                    <p className="text-sm">Are you sure you want to logout?</p>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleLogout}
                        className="m-2 px-4 py-1 cursor-pointer hover:bg-red-600 border border-red-600 text-red-600 hover:text-white rounded-[0.5rem] hover:bg-red-700 transition-all duration-200"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setShowLogoutModal(!showLogoutModal)}
                        className="m-2 px-4 py-1 cursor-pointer bg-gray-300 text-gray-800 rounded-[0.5rem] hover:bg-gray-400 transition"
                      >
                        No
                      </button>
                    </div>
                  </motion.div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </TooltipProvider>
  );
};
