import express, { Router } from "express";
import { AccountRoutes, AuthRoutes, CheckingRoutes, ExpenseRoutes, IncomeRoutes, SavingRoutes, UserRoutes } from "./constants";
import { login, signup, account, updateAccount, logout } from "../controllers/UserController";
import { createExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controllers/ExpenseController";
import { createAccount, deleteAccount, getAccount, getAccounts } from "../controllers/AccountController";
import { createIncome, deleteIncome, getIncome, getIncomes, updateIncome } from "../controllers/IncomeController";
import { createSaving, deleteSaving, getSaving, getSavings, updateSaving } from "../controllers/SavingController";
import { createChecking, deleteChecking, getChecking, getCheckings, updateChecking } from "../controllers/CheckingController";
import { authRequired } from "../middleware/auth";
import twilioRequestValidator from "../middleware/twilioRequestValidator";
import { handleExpense } from "../controllers/TwilioController";
import { checkAuth } from "../controllers/AuthController";


const router: Router = express.Router();

router.post(UserRoutes.signup, signup);
router.get(UserRoutes.account, authRequired, account);
router.post(UserRoutes.login, login);
router.post(UserRoutes.logout, logout);
router.put(UserRoutes.account, authRequired, updateAccount);
router.get(AuthRoutes.checkAuth, checkAuth);

router.post(ExpenseRoutes.createExpense, authRequired, createExpense);
router.get(ExpenseRoutes.getExpense, authRequired, getExpense);
router.put(ExpenseRoutes.updateExpense, authRequired, updateExpense);
router.delete(ExpenseRoutes.deleteExpense, authRequired, deleteExpense);
router.get(ExpenseRoutes.getExpenses, authRequired, getExpenses);

router.post(AccountRoutes.createAccount, createAccount);
router.get(AccountRoutes.getAccount, authRequired, getAccount);
router.delete(AccountRoutes.deleteAcount, deleteAccount);
router.get(AccountRoutes.getAccounts, getAccounts);

router.get(IncomeRoutes.getIncome, authRequired, getIncome);
router.get(IncomeRoutes.getIncomes,authRequired, getIncomes);
router.post(IncomeRoutes.createIncome, authRequired, createIncome);
router.delete(IncomeRoutes.deleteIncome, authRequired, deleteIncome);
router.put(IncomeRoutes.updateIncome, authRequired, updateIncome);

router.post(SavingRoutes.createSaving, authRequired, createSaving);
router.get(SavingRoutes.getSaving, authRequired, getSaving);
router.get(SavingRoutes.getSavings, authRequired, getSavings);
router.put(SavingRoutes.updateSaving, authRequired, updateSaving);
router.delete(SavingRoutes.deleteSaving, authRequired, deleteSaving);

router.get(CheckingRoutes.getChecking, authRequired, getChecking);
router.get(CheckingRoutes.getCheckings, authRequired, getCheckings);
router.post(CheckingRoutes.createChecking, createChecking);
router.put(CheckingRoutes.updateChecking, authRequired, updateChecking);
router.delete(CheckingRoutes.deleteChecking, deleteChecking);

router.post('/sms/reply', twilioRequestValidator, handleExpense);

export default router;