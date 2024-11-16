export const AuthRoutes = {
    checkAuth: '/check-auth',
};

export const UserRoutes = {
    login: '/login',
    logout: '/logout',
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


export const AccountRoutes = {
    createAccount: '/users/accounts',
    getAccount:    '/users/accounts/:accountId',
    updateAccount: '/users/accounts/:accountId',
    deleteAcount:  '/users/accounts/:accountId',
    getAccounts:   '/users/accounts'
};


export const ExpenseRoutes = {
    getExpense:    '/users/:userId/expenses/:expenseId',
    updateExpense: '/users/:userId/expenses/:expenseId',
    deleteExpense: '/users/:userId/expenses/:expenseId',
    createExpense: '/users/:userId/expenses',
    getExpenses:   '/users/:userId/expenses'
}


export const CheckingRoutes = {
    getChecking:    '/users/:userId/accounts/:accountId/checkings/:checkingId',
    updateChecking: '/users/:userId/accounts/:accountId/checkings/:checkingId',
    deleteChecking: '/users/:userId/accounts/:accountId/checkings/:checkingId',
    createChecking: '/users/:userId/accounts/:accountId/checkings',
    getCheckings:   '/users/:userId/accounts/:accountId/checkings'
};


export const SavingRoutes = {
    getSaving:    '/users/:userId/accounts/:accountId/savings/:savingId',
    updateSaving: '/users/:userId/accounts/:accountId/savings/:savingId',
    deleteSaving: '/users/:userId/accounts/:accountId/savings/:savingId',
    createSaving: '/users/:userId/accounts/:accountId/savings',
    getSavings:   '/users/:userId/accounts/:accountId/savings'
};

