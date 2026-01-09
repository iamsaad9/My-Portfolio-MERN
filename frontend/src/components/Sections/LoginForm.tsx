import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import useLoginStore from "@/context/store/useLoginStore";

const LoginForm = () => {
  const [login, setIsLogin] = useState(true);
  const { showlogin, isLogin } = useLoginStore();

  useEffect(() => {
    if (isLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLogin]);

  if (!isLogin) return null;

  const googleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <motion.div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="relative">
        <motion.form
          className="flex relative flex-col p-5 bg-[#0a0a0a] gap-2.5 border border-white overflow-hidden w-[320px] rounded-[20px] font-sans shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="z-100">
            <div className="w-full flex items-center justify-end pb-2">
              <X
                size={20}
                className="hover:bg-(--bg-secondary) cursor-pointer transition-all duration-100 rounded-full"
                onClick={() => showlogin(false)}
              />
            </div>

            {/* Animated Toggle */}
            <div className="relative w-full mb-5 bg-[#1a1a1a] border border-white rounded-[10px] p-1 flex">
              <motion.div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-(--theme_1) to-(--theme_2) rounded-[8px]"
                initial={false}
                animate={{
                  left: login ? "4px" : "50%",
                  right: login ? "50%" : "4px",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  login ? "text-white" : "text-gray-400"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  !login ? "text-white" : "text-gray-400"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="flex flex-col"></div>

            {/* Conditional Name Field for Sign Up */}
            {!login && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="text"
                  name="name"
                  //  value={form.name}
                  //  onChange={handleChange}
                  placeholder="Enter your name"
                  className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
                />
              </motion.div>
            )}

            <div className="flex flex-col mt-2"></div>
            <Input
              type="text"
              name="name"
              //  value={form.name}
              //  onChange={handleChange}
              placeholder="Enter your name"
              className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
            />

            <div className="flex flex-col mt-2"></div>
            <Input
              type="text"
              name="name"
              //  value={form.name}
              //  onChange={handleChange}
              placeholder="Enter your name"
              className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
            />

            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="mt-5 bg-gradient-to-r from-(--theme_1) to-(--theme_2) text-white text-[15px] font-medium rounded-[10px] p-2 w-[50%] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out content-center"
              >
                {login ? "Login" : "Sign Up"}
              </button>
            </div>

            <div className="w-full flex flex-row items-center gap-2.5 mt-5 justify-between">
              <button
                onClick={googleLogin}
                type="button"
                className="mt-2.5 w-full p-2 rounded-[10px] flex justify-center items-center font-medium gap-2.5 text-black border-2 bg-white cursor-pointer transition-all duration-200 ease-in-out hover:border-(--theme_1)"
              >
                <FcGoogle size={25} />
              </button>

              <button
                type="button"
                className="mt-2.5 w-full p-2 rounded-[10px] flex justify-center items-center font-medium gap-2.5 border-2 border-[#1a1a1a] bg-[#1a1a1a] cursor-pointer transition-all duration-200 ease-in-out hover:border-white"
              >
                <FaGithub size={25} color="white" />
              </button>
            </div>
          </div>

          {/* Flickering Grid Effect */}
          <FlickeringGrid
            className="absolute right-0 left-0  top-0 "
            squareSize={3}
            gridGap={4}
            flickerChance={0.1}
            color="white"
            maxOpacity={0.2}
          />
        </motion.form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
