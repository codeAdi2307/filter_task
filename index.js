import express from "express";
import Router from "./router/route.js";

const app = express();

app.use(express.json());

app.use("/api",Router)

const PORT =  8000;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
