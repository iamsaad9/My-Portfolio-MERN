import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../../models/User.js";

// Strategy Configuration
const strategyCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({
      $or: [
        { googleId: profile.id },
        // { githubId: profile.id },
        { email: profile.emails[0].value },
      ],
    });

    if (!user) {
      user = await User.create({
        name: profile.displayName,
        username: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.provider === "google" ? profile.id : null,
        githubId: profile.provider === "github" ? profile.id : null,
        avatar: profile.photos[0].value,
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    strategyCallback
  )
);

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     strategyCallback
//   )
// );
