import { checkSchema } from "express-validator";

const register_user_schema = checkSchema({
  username: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "username is required",
      bail: true,
    },
    isLength: {
      options: { min: 4, max: 24 },
      errorMessage: "password must be between 4-24 characters",
      bail: true,
    },
    matches: {
      options: {
        source: /^[a-zA-Z0-9_]+$/,
      },
      errorMessage: "username can only contain letters, numbers and underline",
      bail: true,
    },
    toLowerCase: true,
  },
  email: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "email must be in a valid format",
      bail: true,
    },
    normalizeEmail: {
      errorMessage: "email must be a valid format",
      bail: true,
    },
    toLowerCase: true,
  },
  password: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "password is required",
      bail: true,
    },
    isLength: {
      options: { min: 4, max: 24 },
      errorMessage: "password must be between 4-24 characters",
      bail: true,
    },
  },
});

const update_user_schema = checkSchema({
  username: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: "username cannot be empty",
      bail: true,
    },
    isLength: {
      options: { min: 4, max: 24 },
      errorMessage: "password must be between 4-24 characters",
      bail: true,
    },
    matches: {
      options: /^[a-zA-Z0-9_]+$/,
      errorMessage: "username can only contain letters, numbers and underline",
      bail: true,
    },
    toLowerCase: true,
  },
  email: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: "email cannot be empty",
      bail: true,
    },
    isEmail: {
      errorMessage: "email must be in a valid",
      bail: true,
    },
    normalizeEmail: true,
    toLowerCase: true,
  },
  password: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: "password cannot be empty",
      bail: true,
    },
    isLength: {
      options: { min: 4, max: 24 },
      errorMessage: "password must be between 4-24 characters",
      bail: true,
    },
  },
});

export { register_user_schema, update_user_schema };
