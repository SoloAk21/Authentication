import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import { generatePassword } from "../utils/generatePassword.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_URL}/api/auth/google/callback`,
      scope: ["profile", "email"],
      prompt: "select_account",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // Check if user already exists in our db
        let user = await User.findOne({ email });

        if (user) {
          // If user exists but is not verified, mark them as verified
          if (!user.isVerified) {
            user.isVerified = true;
            await user.save(); // Save the updated user
          }
          return done(null, user);
        }

        // If user not found, create a new user
        const hashedPassword = await generatePassword(); // Generate and hash a random password

        user = await new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          password: hashedPassword, // Save the hashed password
          isVerified: true, // Mark the user as verified
        }).save();

        done(null, user);
      } catch (err) {
        console.error("Google OAuth Error:", err);
        done(err); // Pass error to the `done` callback
      }
    }
  )
);

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
