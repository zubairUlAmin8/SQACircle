import * as jobRoutes from "./job.route.js";
import * as userRoutes from "./user.route.js";
import express from "express";

const router = express.Router();

router.use("/job", jobRoutes.router);
router.use("/user", userRoutes.router);

export { router };
