import express, { Router } from "express";
import { AccountRoutes, CheckingRoutes, ExpenseRoutes, IncomeRoutes, SavingRoutes, UserRoutes } from "./constants";
import { login, signup, account, updateAccount } from "../controllers/UserController";
import { createExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controllers/ExpenseController";
import { createAccount, deleteAccount, getAccount, getAccounts } from "../controllers/AccountController";
import { createIncome, deleteIncome, getIncome, getIncomes, updateIncome } from "../controllers/IncomeController";
import { createSaving, deleteSaving, getSaving, getSavings, updateSaving } from "../controllers/SavingController";
import { createChecking, deleteChecking, getChecking, getCheckings, updateChecking } from "../controllers/CheckingController";


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

router.post(AccountRoutes.createAccount, createAccount);
router.get(AccountRoutes.getAccount, getAccount);
router.delete(AccountRoutes.deleteAcount, deleteAccount);
router.get(AccountRoutes.getAccounts, getAccounts);

router.get(IncomeRoutes.getIncome, getIncome);
router.get(IncomeRoutes.getIncomes, getIncomes);
router.post(IncomeRoutes.createIncome, createIncome);
router.delete(IncomeRoutes.deleteIncome, deleteIncome);
router.put(IncomeRoutes.updateIncome, updateIncome);

router.post(SavingRoutes.createSaving, createSaving);
router.get(SavingRoutes.getSaving, getSaving);
router.get(SavingRoutes.getSavings, getSavings);
router.put(SavingRoutes.updateSaving, updateSaving);
router.delete(SavingRoutes.deleteSaving, deleteSaving);

router.get(CheckingRoutes.getChecking, getChecking);
router.get(CheckingRoutes.getCheckings, getCheckings);
router.post(CheckingRoutes.createChecking, createChecking);
router.put(CheckingRoutes.updateChecking, updateChecking);
router.delete(CheckingRoutes.deleteChecking, deleteChecking);

export default router;