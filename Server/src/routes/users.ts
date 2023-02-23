import express from "express";
import * as userController from "../controllers/users";

const router = express.Router();

router.get("/", userController.getAuthenticatedUser);

router.post("/signup", userController.signUp);

router.post("/login", userController.signIn);

router.post("/logout", userController.logOut);

export default router;
