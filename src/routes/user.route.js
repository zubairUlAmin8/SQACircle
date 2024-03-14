import express from "express";
import { userController } from "../controllers/index.js";
import { checkSchema, validationResult } from "express-validator";
import { userValidator } from "../validations/index.js";
import * as userMiddleware from "../middlewares/user.middleware.js";
import { auth, checkRole } from "../middlewares/auth.js";

const router = new express.Router();

router.post(
  "/create-user",
  checkSchema(userValidator),
  userMiddleware.checkValidationResult,
  userController.createUser
);

router.post("/login", userController.login);
router.get("/me", auth, checkRole(["RECRUITER"]), userController.myprofile);
router.get("/logoutAll", auth, userController.logoutAll);
router.get("/logout", auth, userController.logout);

export { router };
