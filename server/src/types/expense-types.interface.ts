export const PAYMENT_METHODS = ["cash", "credit", "debit", "paypal"];


export interface ExpenseData {
    price: number;
    item: string | null;
    payment_method: string | null;
}