import ExpenseService from "./ExpenseService";
import UserAccountService from "./UserAccountService";
import UserService from "./UserService";

const userServiceInstance = new UserService();
const userAccountServiceInstance = new UserAccountService();
const expenseServiceInstance = new ExpenseService();

export { userServiceInstance, userAccountServiceInstance, expenseServiceInstance };