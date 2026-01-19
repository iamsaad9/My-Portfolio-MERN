import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface User {
  name: string;
  avatar: string;
  githubId?: string;
  googleId?: string;
  email?: string;
  password?: string;
  role: string;
}

// 1. Define the shape of your context
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
}

// 2. Create the context with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);
