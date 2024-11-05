import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserAccount } from "../entity/UserAccount";
import { CheckingAccount } from "../entity/CheckingAccount";
import { InsertResult, UpdateResult } from "typeorm";


const createChecking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountId, name, balance } = req.body;

        let checkingId: string = '';

        const userAccount: UserAccount | null = await AppDataSource
            .getRepository(UserAccount)
            .findOne({
                where: {
                    accountId
                }
            });
        
        if (!userAccount) {
            res.status(404).json({ message: "Account not found "});
        }

        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(CheckingAccount)
            .values({
                userAccount: userAccount!,
                name,
                balance,
            })
            .execute()
            .then((value: InsertResult) => {
                if (!value || !value.identifiers.length) {
                    return res.status(409).send();
                }
                checkingId = value.identifiers[0].checkingId;
            });

        await AppDataSource
            .getRepository(CheckingAccount)
            .findOne({
                where: {
                    checkingId
                }
            })
            .then((value: CheckingAccount | null) => {
                if (!value) {
                    return res.status(404).json({ message: "Checkings account not found" });
                }
                return res.status(201.).json({ checkingAccount: value });
            });
    } 
    catch (error) {
        next(error);
    } 
};


const getChecking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkingId } = req.body;
        
        await AppDataSource
            .getRepository(CheckingAccount)
            .findOne({
                where: {
                    checkingId
                }
            })
            .then((value: CheckingAccount | null) => {
                if (!value) {
                    return res.status(404).json({ message: "Checkings account not found" });
                }
                return res.status(200).json({ checkingAccount: value });
            });
    } 
    catch (error) {
        next(error);
    }
};


const deleteChecking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkingId } = req.body;

        await AppDataSource
            .createQueryBuilder()
            .softDelete()
            .from(CheckingAccount)
            .where("checkingId = :checkingId", { checkingId })
            .execute()
            .then((value: UpdateResult) => {
                if (!value.affected) {
                    return res.status(409).json({ message: "Error deleting Checkings Account" });
                }
                return res.status(204).send();
            });
    } 
    catch (error) {
        next(error);
    }
};


const getCheckings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountId } = req.body;

        await AppDataSource
            .getRepository(UserAccount)
            .find({
                where: { accountId },
                relations: ["checkingAccounts"]
            })
            .then((values: UserAccount[]) => {
                if (!values) {
                    return res.status(404).json({ message: "Checkings account not found" });
                }
                return res.status(200).json({ checkingAccounts: values });
            });
    } 
    catch (error) {
        next(error);
    }
}


const updateChecking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkingId, name, balance, deletedAt } = req.body;

        await AppDataSource
            .createQueryBuilder()
            .update(CheckingAccount)
            .set({
                name,
                balance,
                deletedAt: deletedAt === null ? null : deletedAt 
            })
            .where("checkingId = :checkingId", { checkingId })
            .execute()
            .then((value: UpdateResult) => {
                if (!value || !value.affected) {
                    return res.status(409).send();
                }
                return res.status(204).send();
            });
    } 
    catch (error) {
        next(error);    
    }
};


export { createChecking, getChecking, getCheckings, deleteChecking, updateChecking };