import express from "express";
import { validationResult, matchedData } from "express-validator";

import * as schemas from "../validator/index.js";
import UserServices from "../services/UserServices.js";
import { authentication } from "../middlewares/validation.js";

const router = express();

router.post(
  "/register",
  schemas.user_schemas.register_user_schema,
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: result.errors[0].msg,
      });
    }

    const { username, email, password } = matchedData(req);

    const { user, msg } = UserServices.createUser(username, email, password);

    console.log(user, msg);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: msg,
      });
    }

    user.save();

    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  }
);

router.get("/info", authentication, (req, res) => {
  const user = UserServices.getUserByID(req.user);
  return res.status(200).json(user);
});

router.put(
  "/update",
  authentication,
  schemas.user_schemas.update_user_schema,
  async (req, res) => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: result.errors[0].msg,
        });
      }

      const { username, email, password } = matchedData(req);

      if (!username && !email && !password) {
        return res.status(400).json({
          success: false,
          message: "at least one information is required",
        });
      }

      const user = UserServices.getUserByID(req.user);
      user.update(username, email, password);

      return res.status(200).json({
        success: true,
        message: "user updated successfully",
      });
    } catch (e) {
      console.log(e);
    }
  }
);

router.delete("/delete", authentication, (req, res) => {
  const user_id = req.user;

  req.logout((err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "failed to logout, user not deleted",
      });
    }
    console.log(err);
  });

  UserServices.deleteUser(user_id);

  return res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});

router.get("/all", (req, res) => {
  return res.status(200).json(db.users);
});

export default router;
