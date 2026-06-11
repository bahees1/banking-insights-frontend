import { Transaction } from "@/types/transaction";

export type TransactionStats = {
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
};

// used to grab the total income, expenses for individual files and overall report summary
export function calculateTransactionStats(
    transactions: Transaction[]
): TransactionStats {
    let totalIncome = 0;
    let totalExpenses = 0;

    for (const transaction of transactions) {
        if (transaction.cashFlowType === "INCOME") {
            totalIncome += Math.abs(transaction.amount);
        }

        if (transaction.cashFlowType === "EXPENSE") {
            totalExpenses += Math.abs(transaction.amount);
        }
    }

    return {
        totalIncome,
        totalExpenses,
        netCashFlow: totalIncome - totalExpenses,
    };
}