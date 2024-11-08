import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Expense } from "./entity/Expense";
import { Income } from "./entity/Income";
import { UserAccount } from "./entity/UserAccount";
import { SavingAccount } from "./entity/SavingAccount";
import { CheckingAccount } from "./entity/CheckingAccount";
import path from "path";


export const appDataSource = new DataSource({
    type: "sqlite",
    database: path.join(__dirname, "../budget-badger.db"),
    synchronize: true,
    logging: false,
    entities: [ User, Expense, Income, UserAccount, SavingAccount, CheckingAccount ],
    migrations: [],
    subscribers: [],
});