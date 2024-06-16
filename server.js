import express from "express";
import database from "./src/database/db.js";

import * as routers from "./src/routers/index.js";

const app = express();
const port = process.env.PORT || 3000;

global.db = new database();

app.use(express.json());

app.use("/api/", routers.users);

app.all("*", async (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint don't exist!",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
