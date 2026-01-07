import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import React, { useEffect } from "react";

interface User {
  username: string;
  avatar: string;
  // Add other fields if needed
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/status", { withCredentials: true })
      .then((res) => setUser(res.data.user || res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
