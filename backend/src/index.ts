import express from "express";
import cors from "cors";
import apiRouter from "./routes/api";

const app = express();
const port = 8088;

// Enable All CORS Requests
app.use(cors());

// Route handling
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
