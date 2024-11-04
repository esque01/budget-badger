import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Expense } from "../entity/Expense";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";


const getExpense = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { expenseId } = req.body;

        await AppDataSource
            .getRepository(Expense)
            .findOne({
                where: {
                    expenseId,
                }
            })
            .then((value: Expense | null) => {
                if (!value) {
                    return res.status(404).json({ message: "Expense not found" }); 
                }
                return res.status(200).json({ expense: value }); 
            });
    } catch (error) {
        next(error);
    }
}


const createExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const { userId, description, amount, category, paymentMethod } = req.body;
        
        let expenseId: string =  "";

        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Expense)
            .values({
                amount,
                category,
                description,
                date: new Date().toISOString(),
                userId,
                paymentMethod
            })
            .execute()
            .then((value: InsertResult) => {
                if (!value || !value.identifiers.length) {
                    return res.status(409).send();
                }
                expenseId = value.identifiers[0].expenseId;
            });
            
        await AppDataSource
            .getRepository(Expense)
            .findOne({
                where: {
                    expenseId
                }
            })
            .then((value: Expense | null) => {
                if (!value) {
                    return res.status(404).json({ message: 'Expense not found' });
                }
                return res.status(201).json({ expense: value });
            });
    } 
    catch (error) {
        next(error);
    }
};


const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId, amount, description, category, paymentMethod } = req.body;
        
        await AppDataSource
            .createQueryBuilder()
            .update(Expense)
            .set({
                amount,
                description,
                category,
                paymentMethod
            })
            .where("expenseId = :expenseId", { expenseId })
            .execute()
            .then((value: UpdateResult) => {
                if (!value){
                    return res.status(409).send();
                }
                res.status(204).send();
            });
    } 
    catch (error) {
        next(error);
    }
};


const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.body;

        await AppDataSource
            .getRepository(Expense)
            .createQueryBuilder()
            .softDelete()
            .where("expenseId = :expenseId", { expenseId })
            .execute()
            .then((value: DeleteResult) => {
                if (!value.affected) {
                    return res.status(409).send();
                }
                return res.status(204).send();
            });
    } 
    catch (error) {
        next(error);
    }
};


const getExpenses = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { userId } = req.body;

        await AppDataSource
            .getRepository(Expense)
            .find({
                where: {
                    userId
                }
            })
            .then((values: Expense[]) => {
                return res.status(200).json( { expenses: values });
            });
    } 
    catch (error) {
        next(error);
    }
}

export { createExpense, getExpense, updateExpense, deleteExpense, getExpenses }; 