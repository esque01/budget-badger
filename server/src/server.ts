import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.post("/api/v1/login", (req: Request, res: Response, next: NextFunction) => {
    // TODO: update client response after login
    res.status(200).json({ "FullName": "Edward Esqueda" });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});