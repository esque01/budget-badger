import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Income } from "../entity/Income";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";


const getIncome = async (req: Request, res: Response, next: NextFunction) => {
    const { incomeId } = req.body;

    await AppDataSource
        .manager.findOne(Income, {
            where: {
                incomeId
            },
        })
        .then((value: Income | null) => {
            if (!value) {
                return res.status(404).json({ message: "Income not found"});
            }
            return res.status(200).json({ income: value });
        });
}


const getIncomes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        
        await AppDataSource
            .getRepository(Income)
            .find({
                where: {
                    userId
                }
            })
            .then((value: Income[]) => {
                return res.status(200).json({ incomes: value });
            });
    } 
    catch (error) {
        next(error);
    }
}


const createIncome = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, amount, source, category } = req.body;

        let incomeId: string = '';

        await AppDataSource
            .getRepository(Income)
            .insert({
                userId,
                amount,
                source, 
                category
            })
            .then((value: InsertResult) => {
                if (!value || !value.identifiers.length) {
                    return res.status(409).send();
                }
                incomeId = value.identifiers[0].incomeId;
            });
        
        await AppDataSource
            .getRepository(Income)
            .findOne({
                where: {
                    incomeId
                }
            })
            .then((value: Income | null) => {
                if (!value) {
                    return res.status(404).json({ message: "Income not found" });
                }
                return res.status(201).json({ income: value });
            });
    } 
    catch (error) {
        next(error);
    }
}


const updateIncome = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { incomeId, amount, source, category, deletedAt } = req.body;

        await AppDataSource
            .createQueryBuilder()
            .update(Income)
            .set({
                amount,
                source,
                category,
                deletedAt: deletedAt === null ? null : deletedAt
            })
            .where("incomeId = :incomeId", { incomeId })
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
}

const deleteIncome = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { incomeId } = req.body;

        await AppDataSource
            .getRepository(Income)
            .createQueryBuilder()
            .softDelete()
            .where("incomeId = :incomeId", { incomeId })
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
}


export { getIncome, getIncomes, createIncome, updateIncome, deleteIncome };