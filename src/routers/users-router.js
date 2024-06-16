import express from "express";
import { body, validationResult, matchedData } from "express-validator";

import UserServices from "../services/UserServices.js";

const router = express();

router.post(
  "/register",
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 4, max: 24 })
    .withMessage("username must be between 4-24 characters")
    .toLowerCase()
    .bail(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be in a valide format")
    .toLowerCase()
    .bail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("passowrd is required")
    .isLength({ min: 4, max: 24 })
    .withMessage("password must be between 4-24 characters")
    .bail(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        messsage: result.errors[0].msg,
      });
    }

    const { username, email, password } = matchedData(req);

    const user = UserServices.createUser(username, email, password);
    user.save();

    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  }
);

export default router;
