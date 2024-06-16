import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";

import UserServices from "../services/UserServices.js";

const router = express();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = UserServices.getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "user not found!" });
    }

    const passwordMatch = await user.compare(password);

    if (!passwordMatch) {
      return done(null, false, { message: "invalid user credentials" });
    }

    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = db.users.find((user) => user.id === id);

  if (id === user.id) {
    done(null, user);
  } else {
    done(new Error("user not found"));
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/auth/status",
    failureRedirect: "/api/auth/unauthorized",
  })
);

router.get("/logout", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(404).json({
      success: false,
      message: "not logged",
    });
  }

  req.logout((err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "failed to logout",
      });
    }

    return res.status(200).json({
      success: true,
      message: "logout successfully",
    });
  });
});

router.get("/status", async (req, res) => {
  return res.status(202).json({
    success: true,
    message: "successfully logged in",
  });
});

router.get("/unauthorized", async (req, res) => {
  return res.status(401).json({
    success: false,
    message: "username or password is incorrect",
  });
});

export default router;
