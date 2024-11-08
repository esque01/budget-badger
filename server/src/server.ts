import express, { Express } from 'express';
import { appDataSource } from "./data-source"; 
import dotenv from "dotenv";
import cors from "cors";
import router from './routes/routes';
import { generateRSAKeyPair } from './utils/crypto-helper';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', router);

generateRSAKeyPair();

const connectDatabase = async() => {
    try {
        await appDataSource.initialize();
    }
    catch (error) {
        console.log("Error initializing data source", error);
        process.exit(1);
    }
};

app.listen(port, async() => {
    await connectDatabase();
    console.log(`[server]: Server is running at http://localhost:${port}`);
});