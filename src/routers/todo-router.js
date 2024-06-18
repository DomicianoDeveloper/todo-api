import express from "express";

import { validationResult, matchedData } from "express-validator";

import * as schemas from "../validator/index.js";
import TodoServices from "../services/TodoServices.js";
import { authentication } from "../middlewares/validation.js";

const router = express();

router.get("/all", (req, res) => {
  return res.status(200).json(db.todos);
});

router.post(
  "/create",
  authentication,
  schemas.todo_schemas.create_todo_schema,
  (req, res) => {
    try {
      const result = validationResult(req);

      console.log(result);

      if (!result.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: result.errors[0].msg,
        });
      }

      const { title, description } = matchedData(req);
      const user_id = req.user;

      const todo = TodoServices.createTodo(user_id, title, description);
      todo.save();

      return res.status(201).json({
        success: true,
        message: "Todo created successfully",
      });
    } catch (e) {
      console.log(e);
    }
  }
);

router.put(
  "/update/:id",
  authentication,
  schemas.todo_schemas.update_todo_schema,
  (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "param id is required",
      });
    }

    const todo = TodoServices.getTodo(id);

    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "todo don't exist",
      });
    }

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: result.errors[0].msg,
      });
    }

    const { title, description } = matchedData(req);

    if (!title && !description) {
      return res.status(400).json({
        success: false,
        message: "at least one information is required",
      });
    }

    todo.update(title, description);

    return res.status(201).json({
      success: true,
      message: "todo updated successfully",
    });
  }
);

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "param id is required",
    });
  }

  const success = TodoServices.deleteTodo(id);

  if (!success) {
    return res.status(400).json({
      success: false,
      message: "todo don't exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "todo deleted successfully",
  });
});

export default router;
