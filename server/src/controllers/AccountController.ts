import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { UserAccount } from "../entity/UserAccount";
import { EntityManager, IsNull, UpdateResult, } from "typeorm";
import { User } from "../entity/User";
import { SavingAccount } from "../entity/SavingAccount";
import { CheckingAccount } from "../entity/CheckingAccount";


const SALT_ROUNDS: number = 10;


const createAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstName, lastName, password, middleName, emailAddress, phoneNumber } = req.body;
        
        const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        await AppDataSource
            .transaction(async(entityManager: EntityManager) => {
                const user: User = new User({
                    firstName,
                    lastName,
                    middleName,
                    emailAddress,
                    phoneNumber,
                    password: hashedPassword
                });

                const savedUser = await entityManager.save(user);
                
                const newChecking: CheckingAccount = new CheckingAccount({
                    balance: 0.00
                });

                const newSaving: SavingAccount = new SavingAccount({
                    balance: 0.00
                });

                const savedChecking = await entityManager.save(newChecking);
                const savedSaving = await entityManager.save(newSaving);

                const userAccount: UserAccount =  new UserAccount({
                    checkingAccount: savedChecking,
                    savingAccount: savedSaving,
                    user: savedUser
                });

                const savedAccount = await entityManager.save(userAccount);

                return res.status(201).json({ account: savedAccount });
            });
    } 
    catch (error) {
        next(error);
    }
}


const getAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { accountId } = req.body;

        await AppDataSource.manager.findOne(UserAccount, {
            where: {
                accountId
            },
            relations: ["user", "checkingAccount", "savingAccount"],
            select: {
                user: {
                    userId: true,
                    firstName: true,
                    lastName: true,
                    middleName: true,
                    emailAddress: true,
                    phoneNumber: true
                },
            }
        })
        .then((value: UserAccount | null) => {
            if (!value) {
                return res.status(404).json({ message: "User not found"});
            }
            return res.status(200).json({ account: value });
        });
    } 
    catch (error) {
        next(error);
    }
}


const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { accountId } = req.body;

        await AppDataSource
        .transaction(async(entityManager: EntityManager) => {
            
            const userAccount: UserAccount | null = await entityManager
                .getRepository(UserAccount)
                .findOne({
                    where: {
                        accountId
                    },
                    relations: ["user"]
                });
            
            if (!userAccount) {
                return res.status(404).json({ message: "Account not found"});
            }

            await entityManager
            .getRepository(User)
            .softDelete(userAccount.user.userId)
            .then((value: UpdateResult) => {
                if (!value.affected) {
                    return res.status(409).json({ message: "Error deleting user"})
                }
                return res.status(204).send();
            });
        });
    } 
    catch (error) {
        next(error);
    }
}


const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AppDataSource
            .getRepository(UserAccount)
            .find({
                where: {
                    user: {
                        deletedAt: IsNull()
                    }     
                },
                relations: ["user"]
            })
            .then((value: UserAccount[]) => {
                return res.status(200).json({ accounts: value });
            })
    } 
    catch (error) {
        next(error);   
    }
}


export { createAccount, getAccount, deleteAccount, getAccounts };