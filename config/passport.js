import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const displayName = profile.displayName || "User Tanpa Nama";

        let user = await prisma.user.findUnique({
          where: { username: email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              nama: displayName,
              username: email,
              password: "",
              role: "VIEWER",
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
      //periksa apakah user sudah ada
    }
  )
);

// simpan user ke session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ambil user dari session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
export default passport;
