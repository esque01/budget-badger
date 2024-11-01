export const UserRoutes = {
    login: '/login',
    signup: '/signup',
    account: '/account',
};


export const IncomeRoutes = {
    getIncome:    '/users/:userId/incomes/:incomeId',
    updateIncome: '/users/:userId/incomes/:incomeId',
    deleteIncome: '/users/:userId/incomes/:incomeId',
    createIncome: '/users/:userId/incomes',
    getIncomes:   '/users/:userId/incomes'
};


export const ExpenseRoutes = {
    getExpense:    '/users/:userId/expenses/:expenseId',
    updateExpense: '/users/:userId/expenses/:expenseId',
    deleteExpense: '/users/:userId/expenses/:expenseId',
    createExpense: '/users/:userId/expenses',
    getExpenses:   '/users/:userId/expenses'
}


export const CheckingRoutes = {
    getChecking:    '/users/:userId/account/:accountId/checkings/:checkingId',
    updateChecking: '/users/:userId/account/:accountId/checkings/:checkingId',
    deleteChecking: '/users/:userId/account/:accountId/checkings/:checkingId',
    createChecking: '/users/:userId/account/:accountId/checkings',
    getCheckings:   '/users/:userId/account/:accountId/checkings'
};


export const SavingRoutes = {
    getChecking:    '/users/:userId/account/:accountId/savings/:savingId',
    updateChecking: '/users/:userId/account/:accountId/savings/:savingId',
    deleteChecking: '/users/:userId/account/:accountId/savings/:savingId',
    createChecking: '/users/:userId/account/:accountId/savings',
    getCheckings:   '/users/:userId/account/:accountId/savings'
};

