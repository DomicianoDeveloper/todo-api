import { checkSchema } from "express-validator";

const create_todo_schema = checkSchema({
  title: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "title is required",
      bail: true,
    },
    matches: {
      options: {
        source: /^[a-zA-Z0-9_ ]+$/,
      },
      errorMessage: "title can only contain letters, numbers and underline",
      bail: true,
    },
    isLength: {
      options: { min: 2, max: 24 },
      errorMessage: "password must be between 2-24 characters",
      bail: true,
    },
    toLowerCase: true,
  },
  description: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "description is required",
      bail: true,
    },
    toLowerCase: true,
  },
});

const update_todo_schema = checkSchema({
  title: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: "title is required",
      bail: true,
    },
    matches: {
      options: {
        source: /^[a-zA-Z0-9_ ]+$/,
      },
      errorMessage:
        "title can only contain letters, numbers and underline and spaces",
      bail: true,
    },
    isLength: {
      options: { min: 2, max: 24 },
      errorMessage: "password must be between 2-24 characters",
      bail: true,
    },
    toLowerCase: true,
  },
  description: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: "description is required",
      bail: true,
    },
    toLowerCase: true,
  },
});

export { create_todo_schema, update_todo_schema };
