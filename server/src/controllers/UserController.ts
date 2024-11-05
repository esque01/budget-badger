import { NextFunction, Request, Response } from "express";
import { User } from '../entity/User';
import bcrypt from "bcrypt";
import { EntityManager, UpdateResult } from 'typeorm';
import { AppDataSource } from "../data-source";
import { UserAccount } from "../entity/UserAccount";
import { CheckingAccount } from "../entity/CheckingAccount";
import { SavingAccount } from "../entity/SavingAccount";


const SALT_ROUNDS: number = 10;


const login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        
        let userPassword: string | null = null;

        await AppDataSource
            .getRepository(User)
            .findOne({
                where: {
                    emailAddress: email
                }
            })
            .then((value: User | null) =>
            {
                if (!value) {
                    return res.status(404).json({ message: "User not found" });
                }
                userPassword = value!.password;
            });

        const passwordHash: string = userPassword!;
        
        await bcrypt.compare(password, passwordHash)
            .then((matchSuccess: boolean) => {
                if (!matchSuccess) {
                    return res.status(401).json({ message: "Invalid password" });
                }
                return res.status(200).json({ message: "Login success" });
            });
    } 
    catch (error: any) {
        next(error);
    }
}


const signup = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {
            firstName, 
            lastName, 
            middleName, 
            emailAddress, 
            phoneNumber, 
            password 
        } = req.body;

        const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        await AppDataSource
            .transaction(async(entityManager: EntityManager) => {

                const newUser: User = new User({
                    firstName, 
                    lastName,
                    middleName,
                    emailAddress,
                    phoneNumber,
                    password: hashedPassword
                });
    
                const savedUser = await entityManager.save(newUser);

                const newChecking: CheckingAccount = new CheckingAccount({
                    name: "primary",
                    balance: 0.00
                });

                const newSaving: SavingAccount = new SavingAccount({
                    name: "primary",
                    balance: 0.00
                });

                const savedChecking = await entityManager.save(newChecking);
                const savedSaving = await entityManager.save(newSaving);

                const newAccount: UserAccount = new UserAccount({
                    user: savedUser,
                    savingAccounts: [savedSaving],
                    checkingAccounts: [savedChecking],
                });
 
                await entityManager.save(newAccount);
                
                const user: User | null = await entityManager
                    .getRepository(User)
                    .findOne({
                        where: {
                            userId: newAccount.user.userId,
                        },
                        select: [
                            "firstName",
                            "lastName",
                            "middleName",
                            "emailAddress",
                            "phoneNumber"
                        ]
                    });
                    
                return res.status(201).json({ user: user });
            });
    } 
    catch (error) {
        next(error);
    }
}


const account = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;

        await AppDataSource
            .getRepository(User)
            .findOne({
                where: {
                    userId
                },
                select: [
                    "userId",
                    "firstName",
                    "lastName",
                    "middleName",
                    "emailAddress",
                    "phoneNumber",
                ]
        
            })
            .then((result: User | null) => {
                if (!result) {
                    return res.status(404).json({ message: "User not found" }); 
                }   
                return res.status(200).json({ user: result });
            });
    } 
    catch (error) {
        next(error);
    }
};


const updateAccount = async(req: Request, res: Response, next: NextFunction) => {
   try {
        const { userId, firstName, lastName, middleName, phoneNumber } = req.body;
        
        await AppDataSource
        .createQueryBuilder()
        .update(User)
        .set({
            firstName,
            lastName,
            middleName,
            phoneNumber,
        })
        .where("userId = :userId", { userId })
        .execute()
        .then((value: UpdateResult) => {
            if (!value) {
                return res.status(409).send();
            }
            return res.status(204).send();
        });
   } 
   catch (error) {
        next(error);
   }
}

export { signup, login, account, updateAccount };