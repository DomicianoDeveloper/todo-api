import express from "express";

const app = express();
const port = process.env.PORT || 3000;

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
