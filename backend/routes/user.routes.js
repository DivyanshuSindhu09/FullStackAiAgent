
import { Router } from "express";
import { login, signUp } from "../controllers/user.controller.js";

const router = Router();

// SIGNUP ROUTE
router.route("/signup").post(signUp)

// LOGIN ROUTE
router.route("/login").post(login)

export default router;