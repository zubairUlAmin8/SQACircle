// import Job from "../models/job";
import express from "express";
import { jobController } from "../controllers/index.js";
import { auth, checkRole } from "../middlewares/auth.js";

const router = new express.Router();

router.get("/", async (req, res) => {
  console.log(jobController.viewJob());
  res.send(await jobController.viewJob());
});

router.post("/create-job", auth, jobController.createJob);
export { router };
