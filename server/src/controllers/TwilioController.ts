import { Request, Response } from "express";
import { expenseServiceInstance, userServiceInstance } from "../services";
import { User } from "../entity/User";
import { Expense } from "../entity/Expense";
import { ExpenseData } from "../types/expense-types.interface";
import processExpense from "../utils/process-expense";
import { InsertResult } from "typeorm";


const handleExpense = async(req: Request, res: Response) => {
    const content = req.body.Body;
    const phoneNumber: string = req.body.From;
    
    const user: User = await userServiceInstance.getUserByPhoneNumber(phoneNumber.split("+")[1]);
  
    //TODO: Decide what to do with user account -- checkings, and savings (deduct from balance?)
    //const userAccount: UserAccount = await userAccountServiceInstance.getUserAccount(user.userId);

    const expenseData: ExpenseData = processExpense(content);

    const expense: Expense = new Expense({
        userId: user.userId,
        amount: expenseData.price,
        description: expenseData.item ?? "",
        paymentMethod: expenseData.payment_method ?? "", 
    });
    
    const result: InsertResult = await expenseServiceInstance.createExpense(expense);
    const newExpense: Expense = await expenseServiceInstance.getExpense(result.identifiers[0].expenseId);

    res.status(200).json({ expense: newExpense });
};

export { handleExpense };