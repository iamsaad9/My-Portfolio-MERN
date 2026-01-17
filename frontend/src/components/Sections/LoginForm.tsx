import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import useLoginStore from "@/context/store/useLoginStore";
import axios from "axios";
import { addToast } from "@heroui/toast";

interface Loading {
  isLoading: boolean;
  status: string;
}

const LoginForm = () => {
  const [login, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // State to track validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formLoading, setFormLoading] = useState<Loading>({
    isLoading: false,
    status: "",
  });

  const { showlogin, isLogin } = useLoginStore();

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    // Email Validation
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    // Password Validation
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    // Name Validation (Only for registration)
    if (!login && !formData.name.trim()) {
      tempErrors.name = "Name is required for registration";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation before API call
    if (!validate()) return;

    const endpoint = login ? "/auth/login" : "/auth/register";
    if (login) setFormLoading({ isLoading: true, status: "Logging in..." });
    else setFormLoading({ isLoading: true, status: "Signing up..." });

    try {
      await axios.post(`${import.meta.env.VITE_DB_URL}${endpoint}`, formData, {
        withCredentials: true,
      });

      if (login) {
        window.location.reload();
      } else {
        addToast({
          title: "Registered Successfully!",
          color: "success",
          variant: "bordered",
        });
        setIsLogin(true);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        addToast({
          title: "Something went wrong",
          description: err.response?.data?.message,
          color: "danger",
          variant: "bordered",
        });
      } else {
        addToast({
          title: "Something went wrong",
          color: "danger",
          variant: "bordered",
        });
      }
    } finally {
      setFormLoading({ isLoading: false, status: "" });
    }
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_DB_URL}/auth/google`;
  };

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
                className="absolute top-1 bottom-1 bg-linear-to-r from-(--theme_1) to-(--theme_2) rounded-[10px]"
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              </motion.div>
            )}

            <div className="flex flex-col mt-2"></div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <div className="flex flex-col mt-2"></div>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            <div className="w-full flex justify-center items-center">
              <button
                // type="submit"
                onClick={handleSubmit}
                className="mt-5 bg-linear-to-r from-(--theme_1) to-(--theme_2) text-white text-[15px] font-medium rounded-[10px] p-2 w-[50%] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out content-center"
              >
                {/* {login ? "Login" : "Sign Up"} */}
                {formLoading.isLoading
                  ? formLoading.status
                  : login
                  ? "Login"
                  : "Sign Up"}
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
