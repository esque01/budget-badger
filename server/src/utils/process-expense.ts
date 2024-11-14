import { ExpenseData } from "../types/expense-types.interface";

const PAYMENT_METHODS = ["cash", "credit", "debit", "paypal"];


function processExpense(expenseMessage: string): ExpenseData {

    const pricePattern: RegExp = /\$?\d+\.\d{2}/;
    const paymentPattern: RegExp = new RegExp(`\\b(?:${PAYMENT_METHODS.join('|')})\\b`, 'i');

    let parsedResult: ExpenseData = {
        price: 0.00,
        item: null,
        payment_method: null,
    };

    const priceMatch: RegExpMatchArray | null = expenseMessage.match(pricePattern);

    if (priceMatch) {
        parsedResult.price = parseFloat(priceMatch[0].replace('$', ''));
        expenseMessage = expenseMessage.replace(priceMatch[0], '').trim();
    }
    else {
        console.warn("Price not found.");
    }

    const paymentMatch: RegExpMatchArray | null = expenseMessage.match(paymentPattern);
    if (paymentMatch) {
        parsedResult.payment_method = paymentMatch[0].toLowerCase();
        expenseMessage = expenseMessage.replace(paymentMatch[0], '').trim();  
    }
    else {
        console.warn("Valid payment method not found.");
    }

    parsedResult.item = expenseMessage.trim();
    if (!parsedResult.item) {
        console.warn("Item not found.");
    }  

    return parsedResult;
}

export default processExpense;