import { NextFunction, Request, Response } from "express";
import { User } from '../entity/User';
import bcrypt from "bcrypt";
import { EntityManager, UpdateResult } from 'typeorm';
import { appDataSource } from "../data-source";
import { UserAccount } from "../entity/UserAccount";
import { CheckingAccount } from "../entity/CheckingAccount";
import { SavingAccount } from "../entity/SavingAccount";
import { generateToken } from "../utils/token-helper";
import { userServiceInstance } from "../services";


const login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user: User = await userServiceInstance.getUserByEmail(email);
        const matchSuccess: boolean  = await bcrypt.compare(password, user.password);

        if (!matchSuccess) {
            res.status(401).json({ message: "Invalid password" });
        }

        const token: string = generateToken(user);

        res.cookie('session_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        const { userId, firstName, middleName, lastName, emailAddress, phoneNumber, role } = user;

        res.status(200).json({ user: { userId, role, firstName, middleName, lastName, emailAddress, phoneNumber }});
    } 
    catch (error: any) {
        next(error);
    }
}


const logout = async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('session_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: "/"
        });

        res.status(204).json({ message: "User logged out successfully" });
    }
    catch (error) {
        next(error);
    }
}  


const signup = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const SALT_ROUNDS: number = 10;

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

        await appDataSource
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
                            "userId",
                            "firstName",
                            "lastName",
                            "middleName",
                            "emailAddress",
                            "phoneNumber"
                        ]
                    });

                const token: string = generateToken(user!);
                    
                return res.status(201).json({ user: user, token: token });
            });
    } 
    catch (error) {
        next(error);
    }
}


const account = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;

        await appDataSource
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
                    "dateCreated",
                    "role"
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
        
        await appDataSource
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

export { signup, login, logout, account, updateAccount };