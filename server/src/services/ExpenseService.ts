import { InsertResult, Repository } from "typeorm";
import { Expense } from "../entity/Expense";
import { appDataSource } from "../data-source";


class ExpenseService {

    private expenseRepository: Repository<Expense>;

    constructor() {
        this.expenseRepository = appDataSource.getRepository(Expense);
    }

    async createExpense(expense: Expense): Promise<InsertResult> {
        return this.expenseRepository.insert(expense);        
    }

    async getExpense(expenseId: string): Promise<Expense> {
        const expense: Expense | null = await this.expenseRepository.findOne({
            where: {
                expenseId
            }
        });

        if (!expense) {
            throw new Error("Expense not found");
        }
        return expense;
    }
}

export default ExpenseService;