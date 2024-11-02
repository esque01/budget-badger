import express, { Router } from "express";
import { ExpenseRoutes, UserRoutes } from "./constants";
import { login, signup, account, updateAccount } from "../controllers/UserController";
import { createExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controllers/ExpenseController";


const router: Router = express.Router();

router.post(UserRoutes.signup, signup);
router.get(UserRoutes.account, account);
router.post(UserRoutes.login, login);
router.put(UserRoutes.account, updateAccount);

router.post(ExpenseRoutes.createExpense, createExpense);
router.get(ExpenseRoutes.getExpense, getExpense);
router.put(ExpenseRoutes.updateExpense, updateExpense);
router.delete(ExpenseRoutes.deleteExpense, deleteExpense);
router.get(ExpenseRoutes.getExpenses, getExpenses);

export default router;