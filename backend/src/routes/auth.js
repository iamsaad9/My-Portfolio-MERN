import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const router = Router();

const signToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Google Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.redirect(process.env.FRONTEND_URL); // Redirect back to React
  },
);

// GitHub Routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.redirect(process.env.FRONTEND_URL);
  },
);

// Check if user is logged in
router.get("/status", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json(null);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if it's the admin root
    if (decoded.id === "admin_root") {
      return res.json({ name: "Admin", role: "admin", isAdmin: true });
    }

    // Otherwise, check database for normal user
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (err) {
    res.status(401).json(null);
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Create user (the pre-save hook in your schema will hash the password here!)
    const newUser = await User.create({ email, password, name });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route (Email/Password)
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);

    // Check if user was found/password matched
    if (!user) {
      return res.status(401).json({ message: info.message || "Login failed" });
    }

    // If successful, sign token and set cookie
    const token = signToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "none",
    });

    return res.json({ message: "Logged in successfully", user });
  })(req, res, next);
});

// Admin Login Route (Using .env credentials)
router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Admin login attempt:", username);

  const ADMIN_USER = process.env.ADMIN_USERNAME;
  const ADMIN_PASS = process.env.ADMIN_PASSWORD;

  // 1. Check if credentials match .env
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // 2. Create a special Admin token
    // We use a hardcoded ID or 'admin' to distinguish from regular DB users
    const token = jwt.sign(
      { id: "admin_root", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // 3. Set the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.json({
      message: "Admin logged in successfully",
      user: { name: "Admin", role: "admin" },
    });
  }

  // 4. If credentials fail
  return res.status(401).json({ message: "Invalid Admin Credentials" });
});

// Logout
router.get("/logout", (req, res) => {
  // 1. Clear the cookie by name ('token')
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Must match your login setting (false for localhost)
    sameSite: "none",
    path: "/", // Ensure path is consistent
  });

  // 2. Send a success response
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
