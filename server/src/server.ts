import express, { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from "./data-source"; 
import dotenv from "dotenv";
import cors from "cors";

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

app.post("/api/v1/login", (req: Request, res: Response, next: NextFunction) => {
    // TODO: update client response after login
    res.status(200).json({ "FullName": "Edward Esqueda" });
});

app.listen(port, async() => {
    await connectDatabase();
    console.log(`[server]: Server is running at http://localhost:${port}`);
});