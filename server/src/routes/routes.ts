import express, { Router } from "express";
import { UserRoutes } from "./constants";
import { login, signup, account, updateAccount } from "../controllers/UserController";


const router: Router = express.Router();

router.post(UserRoutes.login, login);
router.post(UserRoutes.signup, signup);
router.get(UserRoutes.account, account);
router.put(UserRoutes.account, updateAccount)

export default router;