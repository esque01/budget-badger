import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";
import { SavingAccount } from "../entity/SavingAccount";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { UserAccount } from "../entity/UserAccount";


const createSaving = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountId, name, balance } = req.body;

        let savingId: string = '';

        const userAccount: UserAccount | null = await appDataSource
            .getRepository(UserAccount)
            .findOne({
                where: {
                    accountId 
                }
            });

        if (!userAccount) {
            res.status(404).json({ message: "Account not found" });
        }

        await appDataSource
            .createQueryBuilder()
            .insert()
            .into(SavingAccount)
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
                savingId = value.identifiers[0].savingId;
            });

        await appDataSource
            .getRepository(SavingAccount)
            .findOne({
                where: {
                    savingId
                }
            })
            .then((value: SavingAccount | null) => {
                if (!value) {
                    return res.status(404).json({ message: 'Savings Account not found' });
                }
                return res.status(201).json({ savingAccount: value });
            });
    } 
    catch (error) {
        next(error);
    }
};


const getSaving = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { savingId } = req.body;

        await appDataSource
            .getRepository(SavingAccount)
            .findOne({
                where: {
                    savingId
                }
            })
            .then((value: SavingAccount | null) => {
                if (!value) {
                    return res.status(404).json({ message: "Savings account not found"})
                }

                return res.status(200).json({ savingAccount: value });
            });
    } catch (error) {
        next(error);
    }
};


const deleteSaving = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { savingId } = req.body;

        await appDataSource
            .createQueryBuilder()
            .softDelete()
            .from(SavingAccount)
            .where("savingId = :savingId", { savingId })
            .execute()
            .then((value: DeleteResult) => {
                if (!value.affected) {
                    return res.status(409).json({ message: "Error deleting Savings Account"})
                }

                return res.status(204).send();
            });
    } 
    catch (error) {
        next(error);
    }
};


const updateSaving = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { savingId, name, balance, deletedAt } = req.body;    

        await appDataSource
            .createQueryBuilder()
            .update(SavingAccount)
            .set({
                name,
                balance,
                deletedAt: deletedAt === null ? null : deletedAt
            })
            .where("savingId = :savingId",{ savingId })
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


const getSavings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountId } = req.body; 
        
        await appDataSource
            .getRepository(UserAccount)
            .findOne({
                where: {
                    accountId
                },
                relations: ["savingAccounts"]
            })
            .then((value: UserAccount | null) => {
                if (!value) {
                    return res.status(404).json({ message: "Savings account not found" });
                }
                return res.status(200).json({ savingAccounts: value });
            });
    }
    catch (error) {
        next(error);
    }
}

export { createSaving, getSaving, deleteSaving, updateSaving, getSavings };