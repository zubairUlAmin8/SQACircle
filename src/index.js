import express from "express";
import * as routes from "./routes/index.js";
import { startDB } from "./models/db/mongodb.js";

const app = express();

startDB();
// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("You SQACircle is running");
});
app.use(routes.router);

app.listen(3000, () => {
  console.log("Your Server is Up");
});
