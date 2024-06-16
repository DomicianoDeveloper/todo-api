import "dotenv/config";
import express from "express";
import passport from "passport";
import session from "express-session";

import database from "./src/database/db.js";
import * as routers from "./src/routers/index.js";

const app = express();
const port = process.env.PORT || 3000;
global.db = new database();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.STRATEGY_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/api/users", routers.users);
app.use("/api/auth", routers.auth);

app.all("*", async (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint don't exist!",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
