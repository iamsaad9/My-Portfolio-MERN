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
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.redirect(process.env.FRONTEND_URL); // Redirect back to React
  }
);

// GitHub Routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.redirect(process.env.FRONTEND_URL);
  }
);

// Check if user is logged in
router.get("/status", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json(null);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (err) {
    res.status(401).json(null);
  }
});

// Logout
router.get("/logout", (req, res) => {
  // 1. Clear the cookie by name ('token')
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Must match your login setting (false for localhost)
    sameSite: "lax",
    path: "/", // Ensure path is consistent
  });

  // 2. Send a success response
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
