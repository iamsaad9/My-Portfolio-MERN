import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface User {
  username: string;
  avatar: string;
  // Add other fields if needed
}

// 1. Define the shape of your context
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
}

// 2. Create the context with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);
