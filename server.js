import express from "express";
import database from "./src/database/db.js";

const app = express();
const port = process.env.PORT || 3000;

global.db = new database();

app.use(express.json());

app.all("*", async (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint don't exist!",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
