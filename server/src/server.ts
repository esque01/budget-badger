import express, { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from "./data-source"; 
import dotenv from "dotenv";
import cors from "cors";
import { User } from './entity/User';
import bcrypt, { hash } from "bcrypt";
import { InsertResult } from 'typeorm';

const SALT_ROUNDS: number = 10;

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDatabase = async() => {
    try {
        await AppDataSource.initialize();
    }
    catch (error) {
        console.log("Error initializing data source", error);
        process.exit(1);
    }
};

app.post("/api/v1/login", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user: User | null = await AppDataSource
            .getRepository(User)
            .findOne({
                where: {
                    emailAddress: email
                }
            });

        if (user === null) {
            res.status(404).json({ message: "User not found" });
        }

        const matchSuccess: boolean = await bcrypt.compare(password, user!.password);

        if (!matchSuccess) {
            res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login success" });
    } 
    catch (error: any) {
        next(error);
    }
});

app.post('/api/v1/signup', async(req: Request, res: Response, next: NextFunction) => {
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

        const newUser: InsertResult = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    firstName: firstName, 
                    lastName: lastName,
                    middleName: middleName,
                    emailAddress: emailAddress,
                    phoneNumber: phoneNumber,
                    password: hashedPassword
                }
            ])
            .execute();

        const userId: string = newUser.identifiers[0].userId;

        const createdUser = await AppDataSource
            .getRepository(User)
            .findOneBy({ userId: userId });

        res.status(201).json({ user: createdUser });
    } 
    catch (error) {
        console.log(error);
        next(error);
    }
});

app.listen(port, async() => {
    await connectDatabase();
    console.log(`[server]: Server is running at http://localhost:${port}`);
});